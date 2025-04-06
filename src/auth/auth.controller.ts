import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.public';
import { CreateUserDto } from '../users/dto/request/create-user.dto';
import { GetAuthorizationDto } from './dto/request/get.authorization.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Post('sign-up')
  public async signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('sign-in')
  public async signIn(@Body()dto: GetAuthorizationDto) {
    return this.authService.signIn(dto);
  }
}
