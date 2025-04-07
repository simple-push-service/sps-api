import { Injectable } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { GroupUser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupUsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  create(createGroupUserDto: CreateGroupUserDto) {
    return 'This action adds a new groupUser';
  }

  findAll() {
    return `This action returns all groupUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupUser`;
  }

  update(id: number, updateGroupUserDto: UpdateGroupUserDto) {
    return `This action updates a #${id} groupUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupUser`;
  }

  public async findOneByGroupIdAndUserId(
    groupId: string,
    userId: number,
  ): Promise<GroupUser | null> {
    return this.prismaService.groupUser.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }
}
