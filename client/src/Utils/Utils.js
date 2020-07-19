// Utils functions
export const utils = (startDate, endDate, transaction) => {
    // Search by date
  let filterByDate = transaction.filter(item => {
    let date = new Date(item.date);
    return date >= startDate && date <= endDate;
  })

  return filterByDate;
} 

export const utilsFilterBudget = (startDate, endDate, budget) => {
let valueAnual = 0;
  
// Search by date
let filterBudgetByDate = budget.filter(item => {
  let date = new Date(item.month + '-01-' + item.year);
  return date >= startDate && date <= endDate;
})

filterBudgetByDate.map( (budget) => {
  valueAnual = Number(budget.value) + Number(valueAnual);
  return valueAnual
} )

return valueAnual;
} 