import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BACKEND_ROUTES } from 'src/constants/routes.const';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller(BACKEND_ROUTES.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
