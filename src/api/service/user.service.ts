import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    /* @InjectRepository(User) private userRepository: Repository<User>, */
    private userRepository: UserRepository
  ) { }

  getAll() {
    /* console.log(await this.userRepository.find({})) */
    /* console.log(await this.userRepository.getAllUsers()) */
    return this.userRepository.getAllUsers();
  }

  async getById(id) {
    const result = await this.userRepository.getById(id);
    if (result) return result
    else throw new NotFoundException('Error - No existen datos para el id ingresado')
  }

  createUser(user: UserDTO) {
    const { name, lastname, email } = user;
    const newUser = new User();
    newUser.name = name;
    newUser.lastname = lastname;
    newUser.email = email;
    return this.userRepository.saveUser(newUser);
  }

  async deleteUser(id) {
    const user = await this.getById(id);
    await this.userRepository.deleteUser(id);
    return user;
  }

  async updateUser(id, user: UserDTO) {
    const { name, lastname, email } = user;
    const userUpdate = await this.userRepository.getById(id);
    userUpdate.name = name;
    userUpdate.lastname = lastname;
    userUpdate.email = email;
    return this.userRepository.saveUser(userUpdate);

  }




}