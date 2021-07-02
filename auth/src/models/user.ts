import { Document, Schema, model, Model } from 'mongoose';

// 1. Create an interface representing
//    properties required to create a new user
interface IUser {
  email: string;
  password: string;
}

// 2. An interface to describe the
//    properties a user has
interface UserModel extends Model<UserDoc> {
  build(user: IUser): UserDoc;
}

// 3. An interface that describes the
//    properties that a user document has
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };
