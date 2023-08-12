import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  }
});

const Users = model('Users', UserSchema);

export default Users;