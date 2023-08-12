import { Model, Schema, model } from 'mongoose';

interface IUser {
  name: string;
}

interface UserModel extends Model<IUser> {
  usersCount(): number;
}

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    require: true
  }
});

UserSchema.static('usersCount', async () => {
  const users = await Users.find();
  return users.length;
});

const Users = model<IUser, UserModel>('Users', UserSchema);

export default Users;