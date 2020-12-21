const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});



userSchema.pre('save',function(next){
  var user = this;
  
  if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, (err, encrypted) => {
        if(err) return next(err);
        user.password = salt;
        next();
      })
    })
  }
});
const User = mongoose.model("User", userSchema);

module.exports = { User };
