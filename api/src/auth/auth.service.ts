import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async SignUp(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ForbiddenException('Credentials taken');
      throw error;
    }
  }

  async SingIn(dto: AuthDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userid: number,
    email: string,
  ): Promise<{ access_string: string }> {
    const payload = {
      sub: userid,
      email: email,
    };
    const secret = this.config.get('JWT_LOGIN_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { access_string: token };
  }
}
