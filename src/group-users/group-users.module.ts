import { Module } from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { GroupUsersController } from './group-users.controller';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [GroupUsersController],
  providers: [GroupUsersService],
  exports: [GroupUsersService],
})
export class GroupUsersModule {}
