import {
  Controller, Get, Param, Body, Post, Delete, Put, Inject
} from '@nestjs/common';
import { UserMemoryService } from '../service';
import { ApiCreatedResponse, ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../entities';
import { UserEntity } from '../interface/user.interface';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@ApiTags('Users Cache')
@Controller('memory/users')
export class UserMemoryController {
  private readonly message: string;

  constructor(
    private readonly userService: UserMemoryService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) { }


  /**
 * Function get all users.
 * @author  David Martínez
 * @param null
 * @return {[User]} List of users in nemory database.
 */
  @ApiOperation({ description: 'Get all users in nemory database' })
  @ApiCreatedResponse({
    description: 'List of Users.',
    type: [User],
  })
  @Get('')
  async getAll() {
    const users = await this.userService.getAllUsers();
    this.logger.info(`method: delete, req: null, response:${JSON.stringify(users)}`);

    return users;
  }

  /**
 * Function get user by Id.
 * @author  David Martínez
 * @param id user id
 * @return {User} user in nemory database
 */
  @ApiOperation({ description: 'Get User in nemory database' })
  @ApiCreatedResponse({
    description: 'User.',
    type: User,
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async getById(@Param('id') id) {
    const user = await this.userService.getById(id);
    this.logger.info(`method: delete, req:${id}, response:${JSON.stringify(user)}`);

    return user;
  }

  /**
* Function create new user.
* @author  David Martínez
* @param UserEntity  user to create
* @return {UserEntity} user created in nemory database
*/
  @ApiOperation({ description: 'Create a new User in nemory database, To create use Postman!!' })
  @ApiCreatedResponse({
    description: 'The user that was successfully created.',
    type: User,
  })
  @Post('')
  async create(@Body() user: UserEntity) {
    this.logger.info(`method: create, req:${user}`);
    const result = await this.userService.createUser(user);
    this.logger.info(`response:${JSON.stringify(result)}`);
    return result;
  }

  /**
* Function delete user by Id.
* @author  David Martínez
* @param id user id
* @return {User} user deleted in nemory database
*/
  @ApiOperation({ description: 'Delete User by Id in nemory database' })
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
* @param {id, UserEntity} - id of user to be update and data in body
* @return {User} user updated in nemory database
*/
  @ApiOperation({ description: 'Update User by Id in nemory database, To create use Postman!!' })
  @ApiCreatedResponse({
    description: 'The user that was successfully update .',
    type: User,
  })
  @ApiParam({ name: 'id' })
  @Put(':id')
  async updateUser(@Param('id') id, @Body() user: UserEntity) {
    this.logger.info(`method: updateUser, req:${id},${user}`)
    const userUpdate = await this.userService.updateUser(id, user);
    this.logger.info(`response:${JSON.stringify(userUpdate)}`)
    return userUpdate;
  }


}
