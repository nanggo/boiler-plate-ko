const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

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

app.post('/register', (request, response) => {
  const user = new User(request.body);

  user.save((err, userInfo) => {
    if (err) return response.json({success: false, err});
    return response.status(200).json({success: true});
  });
});

app.post('/login', function (req, response) {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return response.json({loginSuccess: false, message: err.message});
    if (!user) {
      response.json({
        loginSuccess: false,
        message: '해당하는 이메일이 존재하지 않습니다.',
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return response.status(400).json({loginSuccess: false, message: err.message});
      if (!isMatch) return response.json({loginSuccess: false, message: '비밀번호가 일치하지 않습니다.'});

      // 비번 매칭됐을 때
      user.generateToken((err, result) => {
        if (err) return response.status(400).send(err);
        response.status(200).json({loginSuccess: true, message: result._id});
      });
    });
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
