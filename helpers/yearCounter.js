const yearCounter = (date) => {
  const formatedDate = new Date(date);
  const year = formatedDate.getFullYear();
  return Number(year);
};

module.exports = yearCounter;
