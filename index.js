const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

app.use(cookieParser());

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/users/register', (request, response) => {
  const user = new User(request.body);

  user.save((err, userInfo) => {
    if (err) return response.json({success: false, err});
    return response.status(200).json({success: true});
  });
});

app.post('/api/users/login', (request, response) => {
  User.findOne({email: request.body.email}, (err, user) => {
    if (err)
      return response.json({
        loginSuccess: false,
        message: err.message,
      });
    if (!user) {
      response.json({
        loginSuccess: false,
        message: '해당하는 이메일이 존재하지 않습니다.',
      });
    }
    user.comparePassword(request.body.password, (err, isMatch) => {
      if (err)
        return response
          .status(400)
          .json({loginSuccess: false, message: err.message});
      if (!isMatch)
        return response.json({
          loginSuccess: false,
          message: '비밀번호가 일치하지 않습니다.',
        });

      // 비번 매칭됐을 때
      user.generateToken((err, result) => {
        if (err) return response.status(400).send(err);
        response
          .cookie('x_auth', result.token)
          .status(200)
          .json({loginSuccess: true, userId: result._id});
      });
    });
  });
});

app.get('/api/users/auth', auth, (request, response) => {
  response.status(200).json({
    id: request.user._id,
    name: request.user.name,
    email: request.user.email,
    role: request.user.role,
    image: request.user.image,
    isAuth: true,
    isAdmin: request.user.role === 0 ? true : false,
  });
});

app.get('/api/users/logout', auth, (request, response) => {
  User.findOneAndUpdate({_id: request.user._id}, {token: ''}, (err, res) => {
    if (err) return response.json({success: false, error});
    response.status(200).json({success: true});
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
