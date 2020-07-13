export const utils = (startDate, endDate, transaction) => {
    // Search by date
  let filterByDate = transaction.filter(item => {
    let date = new Date(item.date);
    return date >= startDate && date <= endDate;
  })

  return filterByDate;
} 