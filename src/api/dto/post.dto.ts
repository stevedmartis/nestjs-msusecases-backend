import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    body: string;
}