const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const payload = req.validated.body;
    const user = await authService.registerUser(payload);
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const payload = req.validated.body;
    const result = await authService.loginUser(payload);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const payload = req.validated.body;
    const result = await authService.refreshTokens(payload);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const payload = req.validated.body;
    await authService.logoutUser(payload);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
};
