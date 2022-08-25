import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { UserEntity } from '../interface/user.interface'
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserMemoryService {

  constructor(
    private userRepository: InMemoryDBService<UserEntity>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger

  ) {
  }

  getAllUsers() {
    return this.userRepository.getAll();
  }

  async getById(id) {
    const result = await this.userRepository.get(id);
    if (result) return result
    else throw new NotFoundException('Error - No existen datos para el id ingresado')
  }

  createUser(user: UserEntity) {
    return this.userRepository.create(user);
  }

  async deleteUser(id) {
    const user = await this.getById(id);
    await this.userRepository.delete(id);
    return user;
  }

  async updateUser(id, user: UserEntity) {
    const { name, lastname, email } = user;
    const userUpdate = await this.getById(id);
    userUpdate.name = name;
    userUpdate.lastname = lastname;
    userUpdate.email = email;
    await this.userRepository.update(userUpdate);
    return userUpdate;
  }



}