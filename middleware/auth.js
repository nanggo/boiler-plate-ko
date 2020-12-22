const {User} = require('../models/User');

const auth = (request, response, next) => {
  const token = request.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return response.json({
        isAuth: false,
        error: true,
        message: 'User not found.',
      });
    request.token = token;
    request.user = user;

    next();
  });
};

module.exports = {auth};
