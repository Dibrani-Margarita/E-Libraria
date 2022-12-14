const userController = require('../controllers/user.controller');

module.exports = (app) => {
  app.get('/api/users', userController.getUsers);
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.post('/logout', userController.logout);
  app.get('/api/current-user', userController.getLoggedInUser);
};