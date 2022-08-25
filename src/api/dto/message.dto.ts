import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostDTO, UniversityDTO } from '.';

export class MessageDTO {

    @IsArray()
    @ApiProperty()
    posts: PostDTO[];

    @IsArray()
    @ApiProperty()
    universities: UniversityDTO[];

}