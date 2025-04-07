import { Injectable } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/request/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/request/update-group-user.dto';
import { GroupUser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupUsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService
  ) {
  }

  public async create(groupId: string, dto: CreateGroupUserDto) {

    return this.prismaService.groupUser.upsert({
      where: {
        userId_groupId: {
          userId: dto.userId,
          groupId
        }
      },
      create: {
        groupId,
        ...dto
      },
      update: {
        role: dto.role,
        deletedAt: null
      }
    });
  }

  public async findManyByGroupId(groupId: string): Promise<GroupUser[]> {
    return this.prismaService.groupUser.findMany({
      where: {
        groupId
      }
    });
  }

  public async findOne(id: number) {
    return this.prismaService.groupUser.findUnique({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  public async update(id: number, dto: UpdateGroupUserDto): Promise<GroupUser | null> {
    return this.prismaService.groupUser.update({
      where: {
        id,
        deletedAt: null
      },
      data: { ...dto }
    });
  }

  public async remove(id: number) {
    return this.prismaService.groupUser.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  public async findOneByGroupIdAndUserId(
    groupId: string,
    userId: number
  ): Promise<GroupUser | null> {
    return this.prismaService.groupUser.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId
        }
      }
    });
  }
}
