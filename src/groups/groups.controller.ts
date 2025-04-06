import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/request/create-group.dto';
import { UpdateGroupDto } from './dto/request/update-group.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { User } from '@prisma/client';
import { CurrentUser } from '../commons/interceptor/current.user';

@Controller('api/v1/groups')
@UseGuards(AuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @CurrentUser() user: User) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.groupsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() user: User) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto, @CurrentUser() user: User) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @CurrentUser() user: User) {
    return this.groupsService.remove(+id);
  }
}
