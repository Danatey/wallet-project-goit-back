const monthCounter = (month) => {
  const date = new Date(Date.parse(month));
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const monthRange = [Date.parse(firstDay), Date.parse(lastDay)];

  return monthRange;
};

module.exports = monthCounter;
