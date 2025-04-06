import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateGroupDto {
    @ApiProperty({
        description: '그룹 명',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: '그룹 설명',
        nullable: true,
    })
    @IsString()
    description: string | null;

    @ApiProperty({
        description: '초대하는 유저들',
        type: [Number],
    })
    @IsArray()
    @IsNumber({}, { each: true })
    userIds: number[]
}
