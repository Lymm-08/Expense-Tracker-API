const dashboardService = require('../services/dashboard.service');

async function getSummary(req, res, next) {
  try {
    const summary = await dashboardService.getDashboardSummary(req.user.id);
    res.json({ status: 'success', data: summary });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary,
};
