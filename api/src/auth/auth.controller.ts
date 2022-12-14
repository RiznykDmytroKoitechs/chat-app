import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, RegisterDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  SingUp(@Body() dto: RegisterDTO) {
    return this.authService.SignUp(dto);
  }

  @Post('signin')
  Login(@Body() dto: AuthDTO) {
    return this.authService.SingIn(dto);
  }
}
