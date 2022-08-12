
const calculateTip = (totalAmount, tipPercentage) => {
  const tip = totalAmount + (totalAmount * tipPercentage)
  return tip
}

const calculateTipWithDefaultValue = (totalAmount, tipPercentage = .2) => {
  const tip = totalAmount + (totalAmount * tipPercentage)
  return tip
}

module.exports = {
  calculateTip,
  calculateTipWithDefaultValue
}