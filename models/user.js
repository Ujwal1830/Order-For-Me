import mongoose, { model, models} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      // Add any other fields specific to your user model
    }, { timestamps: true });

    const User = models?.User || model('User', userSchema)
    export default User;
