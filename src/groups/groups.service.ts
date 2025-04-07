import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/request/create-group.dto';
import { UpdateGroupDto } from './dto/request/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Group, GroupRole, GroupUser, User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { GroupUsersService } from '../group-users/group-users.service';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly groupUsersService: GroupUsersService,
  ) {}

  public async create(dto: CreateGroupDto, user: User): Promise<Group> {
    return this.prismaService.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          ...dto,
        },
      });
      await tx.groupUser.create({
        data: {
          userId: user.id,
          groupId: group.id,
          role: GroupRole.ADMIN,
        },
      });
      return group;
    });
  }

  public async findAllByUser(user: User) {
    return this.prismaService.group.findMany({
      where: {
        users: {
          some: {
            user,
          },
        },
      },
    });
  }

  public async findOneById(id: string): Promise<Group | null> {
    return this.prismaService.group.findUnique({
      where: {
        id,
      },
    });
  }

  public async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
    user: User,
  ): Promise<Group> {
    const group = await this.findOneById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const groupUser = await this.groupUsersService.findOneByGroupIdAndUserId(
      group.id,
      user.id,
    );
    if (!groupUser) {
      throw new NotFoundException('Group User not found');
    }
    if (groupUser.role !== GroupRole.ADMIN) {
      throw new UnauthorizedException('Modify group required admin access');
    }
    return this.prismaService.group.update({
      where: {
        id,
      },
      data: {
        name: updateGroupDto.name,
        description: updateGroupDto.description,
      },
    });
  }

  public async remove(id: string, user: User) {
    const groupUser = await this.groupUsersService.findOneByGroupIdAndUserId(
      id,
      user.id,
    );
    if (!groupUser) {
      throw new NotFoundException('Group User not found');
    }
    if (groupUser.role !== GroupRole.ADMIN) {
      throw new UnauthorizedException('Delete group required admin access');
    }
    await this.prismaService.group.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
