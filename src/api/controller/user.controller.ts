import {
  Controller, Get, Param, Body, Post, Delete, Put, Inject
} from '@nestjs/common';
import { UserService } from '../service';
import { UserDTO } from '../dto/user.dto';
import { ApiCreatedResponse, ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../entities';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@ApiTags('Users Postgresql')
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) { }

  /**
 * Function get all users.
 * @author David Martínez
 * @param null
 * @return {[User]} List of users.
 */
  @ApiOperation({ description: 'Get all users' })
  @ApiCreatedResponse({
    description: 'List of Users.',
    type: [User],
  })
  @Get('')
  async getAll() {
    const users = await this.userService.getAll();
    this.logger.info(`method: getAll, req:null, response:${JSON.stringify(users)}`)
    return users;
  }

  /**
 * Function get user by Id.
 * @author David Martínez
 * @param id user id
 * @return {User} user
 */
  @ApiOperation({ description: 'Get User' })
  @ApiCreatedResponse({
    description: 'User.',
    type: User,
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async getById(@Param('id') id) {
    const user = await this.userService.getById(id);
    this.logger.info(`method: getById, req:${id}, response:${JSON.stringify(user)}`)
    return user;
  }

  /**
* Function create new user.
* @author David Martínez
* @param UserDTO  user to create
* @return {UserDTO} user created
*/
  @ApiOperation({ description: 'Create a new User' })
  @ApiCreatedResponse({
    description: 'The user that was successfully created.',
    type: User,
  })
  @Post('')
  async create(@Body() newUser: UserDTO) {
    this.logger.info(`method: create, req:${newUser}`)
    const user = await this.userService.createUser(newUser);
    this.logger.info(`response:${JSON.stringify(user)}`)
    return user;
  }

  /**
* Function delete user by Id.
* @author  David Martínez
* @param id user id
* @return {User} user deleted
*/
  @ApiOperation({ description: 'Delete User by Id' })
  @ApiParam({ name: 'id' })
  @ApiCreatedResponse({
    description: 'The user that was deleted.',
    type: User,
  })
  @Delete(':id')
  async delete(@Param('id') id) {
    this.logger.info(`method: delete, req:${id}`)
    const deleteUser = await this.userService.deleteUser(id);
    this.logger.info(`response:${JSON.stringify(deleteUser)}`)
    return deleteUser;
  }

  /**
* Function update user.
* @author  David Martínez
* @param {id, UserDTO} - id of user to be update and data in body
* @return {User} user updated
*/
  @ApiOperation({ description: 'Update User by Id' })
  @ApiCreatedResponse({
    description: 'The user that was successfully update.',
    type: User,
  })
  @ApiParam({ name: 'id' })
  @Put(':id')
  async updateUser(@Param('id') id, @Body() user: UserDTO) {
    this.logger.info(`method: updateUser, req:${id},${user}`)
    const userUpdate = await this.userService.updateUser(id, user);
    this.logger.info(`response:${JSON.stringify(userUpdate)}`)
    return userUpdate;
  }




}
