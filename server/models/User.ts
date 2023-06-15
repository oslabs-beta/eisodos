import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';

// Below is the typegoose equivalent of:
// const userSchema: Schema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cluster: {
//     name: { type: String, default: null },
//   },
// });

// TODO: need to figure out what this schema should look like
class User {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;

  // @prop()
  // public cluster?: {
  //   name?: string;
  // };
}

const UserModel = getModelForClass(User);
export default UserModel;
export type UserDocument = User & ReturnModelType<typeof User>;
