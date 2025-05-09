import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './prisma/prisma.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GroupUsersModule } from './group-users/group-users.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    PrismaModule,
    GroupsModule,
    AuthModule,
    UsersModule,
    GroupUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
