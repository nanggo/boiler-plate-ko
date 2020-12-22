const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = 'secretKey';

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

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, encrypted) => {
        if (err) return next(err);
        user.password = encrypted;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainText, cb) {
  bcrypt
    .compare(plainText, this.password)
    .then(result => cb(null, result))
    .catch(error => cb(error));
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), secretKey);
  user.token = token;

  user.save((err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) throw err;

    user
      .findOne({token, _id: decoded})
      .then(user => cb(null, user))
      .catch(error => cb(error));

    /* 
    user.findOne({token, _id: decoded}, function (error, result) {
      if (error) return cb(error);
      cb(null, result);
    }); 
    */
  });
};

const User = mongoose.model('User', userSchema);

module.exports = {User};
