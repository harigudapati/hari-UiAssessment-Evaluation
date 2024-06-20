export const calculateResult = (sampleData) => {
  //calculate points per transaction
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const pointsperTransaction = sampleData?.map((transaction) => {
    let points = 0

    // checking for negative amount
    if (transaction?.amt < 0) {
      return
    }

    // Calculate points for dollars spent over $100
    if (transaction?.amt > 100) {
      points = points + (transaction?.amt - 100) * 2
    }

    // Calculate points for dollars spent over $50
    if (transaction?.amt > 50) {
      points = points + 50
    }
    const month = new Date(transaction.transactionDt).getMonth()
    return { ...transaction, points, month }
  })

  let totalPointsPerCustomer = {}
  let totalPointsPerMonth = {}
  pointsperTransaction?.forEach((item) => {
    if (!totalPointsPerCustomer[item?.name]) {
      totalPointsPerCustomer[item?.name] = 0
    }
    if (!totalPointsPerMonth[item?.custid]) {
      totalPointsPerMonth[item?.custid] = []
    }
    totalPointsPerCustomer[item?.name] += item?.points
    if (totalPointsPerMonth[item?.custid][item?.month]) {
      totalPointsPerMonth[item?.custid][item?.month].points += item?.points
      totalPointsPerMonth[item?.custid][item?.month].monthNumber = item?.month
      totalPointsPerMonth[item?.custid][item?.month].numTransactions++
    } else {
      totalPointsPerMonth[item?.custid][item?.month] = {
        custid: item?.custid,
        name: item?.name,
        monthNumber: item?.month,
        month: months[item?.month],
        numTransactions: 1,
        points: item?.points,
      }
    }
  })

  let totalByMonth = []
  for (let custKey in totalPointsPerMonth) {
    totalPointsPerMonth[custKey].forEach((item) => {
      totalByMonth.push(item)
    })
  }

  let totalByCustomer = []
  for (let custKey in totalPointsPerCustomer) {
    totalByCustomer.push({
      name: custKey,
      points: totalPointsPerCustomer[custKey],
    })
  }
  return { totalByCustomer: totalByCustomer, totalByMonth: totalByMonth }
}
