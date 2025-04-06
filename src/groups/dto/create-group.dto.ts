import {ApiProperty} from "@nestjs/swagger";

export class CreateGroupDto {
    @ApiProperty({
        description: '그룹 명',
        type: String,
    })
    name: string;


}
