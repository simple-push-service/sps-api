import {Module} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {GroupsController} from './groups.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [GroupsController],
    providers: [GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
