import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/request/create-user.dto';
import { GetAuthorizationDto } from '../auth/dto/request/get.authorization.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {
  }

  public async findOneById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id: id } });
  }

  public async findOneByEmail(dto: GetAuthorizationDto): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { ...dto } });
  }

  public async createOne(dto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...dto
      }
    });
  }
}
