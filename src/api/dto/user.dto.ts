import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    lastname: string;

    @IsString()
    @ApiProperty()
    email: string;

}