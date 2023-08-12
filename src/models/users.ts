import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
});

const Users = mongoose.model('Users', UserSchema);

export default Users;