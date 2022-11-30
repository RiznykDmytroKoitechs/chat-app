import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  SingUp(@Body() dto: AuthDTO) {
    return this.authService.SignUp(dto);
  }

  @Post('signin')
  Login(@Body() dto: AuthDTO) {
    return this.authService.SingIn(dto);
  }
}
