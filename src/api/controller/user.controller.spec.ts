import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '.';
import { UserService } from '../service';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from '../../config';


const logger: LoggerConfig = new LoggerConfig();

describe('UserController', () => {

  let userController: UserController;
  const mockUser = {
    createUser: jest.fn((dto) => {
      return {
        id: Math.random() * (1000 - 1) + 1,
        ...dto
      }
    }),
    updateUser: jest.fn((id, dto) => {
      return {
        id: id,
        ...dto,
      };
    }),

  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot(logger.console()),
      ],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUser)
      .compile();

    userController = app.get<UserController>(UserController);
  });
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      name: 'testing',
      lastname: 'lasttesting',
      email: 'test@example.com',
    };

    expect(await userController.create(createUserDto)).toEqual({
      id: expect.any(Number),
      ...createUserDto,
    });
  });

  it('should update a user', async () => {
    const updateUserDto = {
      name: 'testing',
      lastname: 'lasttesting',
      email: 'test@example.com',
    };
    const productId = 1;


    expect(await userController.updateUser(productId, updateUserDto)).toEqual({
      id: productId,
      ...updateUserDto,
    });
  });

});
