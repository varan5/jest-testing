const { calculateTip, calculateTipWithDefaultValue } = require('./math')

test('Working of calculateTip function', () => {
  const tipTest = calculateTip(10, .1)
  expect(tipTest).toBe(11)
})

test('Working of calculateTip with defalut percentage', () => {
  const tipTest = calculateTipWithDefaultValue(10)
  expect(tipTest).toBe(12)
})