import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/request/create-group.dto';
import { UpdateGroupDto } from './dto/request/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Group, GroupRole, User, UserGroup } from '@prisma/client';
import { UsersService } from '../users/users.service';
import * as domain from 'node:domain';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService
  ) {
  }

  public async create(dto: CreateGroupDto, user: User): Promise<Group> {
    const users: (User | null)[] = await Promise.all(
      dto.userIds.map((userId) => this.usersService.findOneById(userId))
    );
    return this.prismaService.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          ...dto
        }
      });
      const groupUsers = users.filter((user) => user !== null)
        .map((user) => {
          return {
            userId: user.id,
            groupId: group.id,
            role: GroupRole.INVITER
          };
        });
      const adminUser = {
        userId: user.id,
        groupId: group.id,
        role: GroupRole.ADMIN
      };
      await tx.userGroup.createMany({
        data: groupUsers
      });
      await tx.userGroup.create({
        data: adminUser
      });
      return group;
    });
  }

  public async findAll(user: User) {
    return this.prismaService.group.findMany({
      where: {
        users: {
          some: {
            user
          }
        }
      }
    });
  }

  public async findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  public async update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
