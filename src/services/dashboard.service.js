const prisma = require('../prisma/client');

async function getDashboardSummary(userId) {
  const [incomeResult, expenseResult, transactions] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'income' },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: 'expense' },
    }),
    prisma.transaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
  ]);

  const totalIncome = incomeResult._sum.amount || 0;
  const totalExpenses = expenseResult._sum.amount || 0;
  const balance = totalIncome - totalExpenses;

  const monthlySummary = buildMonthlySummary(transactions);
  const categoryBreakdown = await buildCategoryBreakdown(userId, totalExpenses);

  return {
    balance,
    totalIncome,
    totalExpenses,
    monthlySummary,
    expenseByCategory: categoryBreakdown,
  };
}

function buildMonthlySummary(transactions) {
  const monthly = {};
  const now = new Date();
  const currentYear = now.getFullYear();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    if (date.getFullYear() !== currentYear) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthly[key] = monthly[key] || { income: 0, expense: 0 };
    monthly[key][transaction.type] += transaction.amount;
  });

  return Object.entries(monthly).map(([month, totals]) => ({ month, ...totals }));
}

async function buildCategoryBreakdown(userId, totalExpenses) {
  const groups = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: { userId, type: 'expense' },
    _sum: { amount: true },
  });

  if (!groups.length) return [];

  const categoryIds = groups.map((item) => item.categoryId);
  const categories = await prisma.category.findMany({ where: { id: { in: categoryIds } } });
  const lookup = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  return groups.map((group) => ({
    categoryId: group.categoryId,
    category: lookup[group.categoryId] || 'Unknown',
    amount: group._sum.amount || 0,
    percentage: totalExpenses ? Number(((group._sum.amount || 0) / totalExpenses * 100).toFixed(2)) : 0,
  }));
}

module.exports = {
  getDashboardSummary,
};
