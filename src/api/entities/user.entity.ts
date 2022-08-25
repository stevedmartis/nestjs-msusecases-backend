import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: true })
    name: string;

    @ApiProperty()
    @Column({ nullable: true })
    lastname: string;

    @ApiProperty()
    @Column({ nullable: true })
    email: string;
}