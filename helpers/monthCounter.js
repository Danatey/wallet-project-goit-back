const monthCounter = (month) => {
  const date = new Date(month);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const monthRange = [firstDay, lastDay];

  return monthRange;
};

module.exports = monthCounter;
