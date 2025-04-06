import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from "../auth/auth.gaurd";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CurrentUser} from "../commons/interceptor/current.user";
import {User} from "@prisma/client";

@ApiTags('users')
@Controller('api/v1/users')
@ApiBearerAuth('accessToken')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    public async getUser(@CurrentUser() user: User) {
        return this.usersService.findOneById(user.id);
    }
}
