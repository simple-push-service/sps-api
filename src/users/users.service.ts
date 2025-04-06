import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {
    }

    public async findOne(id: number): Promise<User | null> {
        return this.prismaService.user.findUnique({where: {id: id}});
    }

    public async createOne(): Promise<User> {
        return this.prismaService.user.create({
            data: {}
        })
    }
}
