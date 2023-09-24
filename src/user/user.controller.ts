import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './schemas/user.schema';
import { parse } from 'date-fns';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    if (typeof user.dateOfBirth === 'string') {
      user.dateOfBirth = parse(user.dateOfBirth, 'dd/MM/yyyy', new Date());
    }
    const savedUser = await this.usersService.registerUser(user);
    return savedUser;
  }

  @Get(':username')
  async getFormByUsername(@Param('username') username: string) {
    return this.usersService.getFormByUsername(username);
  }

  @Put(':username')
  async updateFormByUsername(
    @Param('username') username: string,
    @Body() updatedForm: Partial<User>,
  ) {
    return this.usersService.updateFormByUsername(username, updatedForm);
  }
}
