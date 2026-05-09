const userService = require('../services/user.service');

async function getProfile(req, res, next) {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    res.json({ status: 'success', data: profile });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const payload = req.validated.body;
    const profile = await userService.updateUserProfile(req.user.id, payload);
    res.json({ status: 'success', data: profile });
  } catch (error) {
    next(error);
  }
}

async function deleteMe(req, res, next) {
  try {
    await userService.deleteUserAccount(req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteMe,
};
