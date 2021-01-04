var express = require('express');
var router = express.Router();
const {auth} = require('../middleware/auth');

router.post('/register', (request, response) => {
  const user = new User(request.body);

  user.save((err, userInfo) => {
    if (err) return response.json({success: false, err});
    return response.status(200).json({success: true});
  });
});

router.post('/login', (request, response) => {
  User.findOne({email: request.body.email}, (err, user) => {
    if (err)
      return response.json({
        loginSuccess: false,
        message: err.message,
      });
    if (!user) {
      return response.json({
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
        response.cookie('x_authExp', user.tokenExp);
        response
          .cookie('x_auth', result.token)
          .status(200)
          .json({loginSuccess: true, userId: result._id});
      });
    });
  });
});

router.get('/auth', auth, (request, response) => {
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

router.get('/logout', auth, (request, response) => {
  User.findOneAndUpdate(
    {_id: request.user._id},
    {token: '', tokenExp: ''},
    (err, res) => {
      if (err) return response.json({success: false, error});
      response.status(200).json({success: true});
    },
  );
});

module.exports = router;
