import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GroupsModule} from './groups/groups.module';
import {CqrsModule} from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule.forRoot(), GroupsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
