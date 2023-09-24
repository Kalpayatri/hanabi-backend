import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop({ type: Date })
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
