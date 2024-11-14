import mongoose from "mongoose";
import bcrypty from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")){
    next();
  }

  const salt = await bcrypty.genSalt(10);
  this.password = await bcrypty.hash(this.password, salt)
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypty.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;
