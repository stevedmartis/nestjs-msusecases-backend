import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) { }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepo.find()
    }
    
    public async getById(id: number): Promise<User> {
        return this.userRepo.findOne({where:{id:id}});
    }

    public async saveUser(user: User): Promise<User> {
        return this.userRepo.save(user);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return this.userRepo.delete(id);
    }

}