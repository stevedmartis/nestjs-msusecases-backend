import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {

    @IsNumber()
    @ApiProperty()
    postId: number;

    @IsNumber()
    @ApiProperty()
    id: number;


    @IsString()
    @ApiProperty()
    name: string;


    @IsString()
    @ApiProperty()
    email: string;


    @IsString()
    @ApiProperty()
    body: string;
}