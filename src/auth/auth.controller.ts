import {Controller, Param, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Public} from "./auth.public";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @Post()
    public async signUp() {
        return this.authService.signUp();
    }

    @Public()
    @Post(':id')
    public async signIn(@Param('id') id: number) {
        return this.authService.signIn(id);
    }
}
