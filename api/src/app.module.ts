import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatModule,
  ],
})
export class AppModule {}
