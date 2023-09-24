import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async registerUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getFormByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async updateFormByUsername(
    username: string,
    updatedForm: Partial<User>,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ username }, updatedForm, { new: true })
      .exec();
  }
}
