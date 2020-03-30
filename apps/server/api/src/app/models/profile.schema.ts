import * as mongoose from 'mongoose';

export interface IProfile extends mongoose.Document {
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
}

const ProfileSchema: mongoose.Schema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false }
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);
