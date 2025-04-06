import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    public async signIn(userId: number): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id}
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }

    public async signUp(): Promise<{ accessToken: string }> {
        const user = await this.usersService.createOne()
        const payload = {sub: user.id}
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
