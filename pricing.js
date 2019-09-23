function formatPrice(price) {
  return parseInt(price * 100) / 100
}

function calculateEmployerContribution(price, product) {
  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    var dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }

  return price
}

function calculateVolLifePrice(product, coverageLevels) {
  var price = 0

  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage

    price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  }
  return price
}

function calculateLtdPrice(product, employee, ) {
  var salaryPercentage = product.coveragePercentage / 100

  return ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price
}

module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var discountedPrice

  switch (product.type) {
    case 'volLife':
      var volLifePrice = calculateVolLifePrice(product, coverageLevels)
      discountedPrice = calculateEmployerContribution(volLifePrice, product)
      return formatPrice(discountedPrice)
    case 'ltd':
      var ltdPrice = calculateLtdPrice(product, employee)
      discountedPrice = calculateEmployerContribution(ltdPrice, product)
      return formatPrice(discountedPrice)
    default:
      return 0
  }
}

