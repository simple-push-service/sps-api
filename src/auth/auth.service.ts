import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/request/create-user.dto';
import { GetAuthorizationDto } from './dto/request/get.authorization.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  public async signIn(dto: GetAuthorizationDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmail(dto);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }

  public async signUp(dto: CreateUserDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.createOne(dto);
    const payload = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
