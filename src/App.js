import { useState, useEffect } from 'react'

import fetch from './api/dataService'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const calculateRewardPoints = (amountSpent) => {
  let points = 0

  // Calculate points for dollars spent over $100
  if (amountSpent > 100) {
    points = points + (amountSpent - 100) * 2
  }

  // Calculate points for dollars spent over $50
  if (amountSpent > 50) {
    points = points + (amountSpent - 50)
  }

  return points
}

const getMonthName = (transactionDate) => {
  return new Date(transactionDate).getMonth()
}

function App() {
  const [transactions, setTransactions] = useState(null)

  const monthlyPoints = {}

  //calculate reward points for each month
  transactions?.forEach((transaction) => {
    const points = calculateRewardPoints(transaction?.amt)

    if (!monthlyPoints[months[getMonthName(transaction?.transactionDt)]]) {
      monthlyPoints[months[getMonthName(transaction?.transactionDt)]] = 0
    }

    monthlyPoints[months[getMonthName(transaction?.transactionDt)]] += points
  })

  //calculate total reward points
  const totalPoints = Object.values(monthlyPoints).reduce(
    (acc, points) => acc + points,
    0
  )

  // let pointsEarnedByCustPerMonth = transactions?.reduce((acc, cur) => {
  //   let key = cur['month']
  //   ;(acc[key] ? acc[key] : (acc[key] = null || [])).push(cur)
  //   return acc
  // }, [])

  // pointsEarnedByCustPerMonth?

  useEffect(() => {
    fetch().then((data) => {
      const newData = data?.map((item) => ({
        ...item,
        month: months[getMonthName(item?.transactionDt)],
      }))
      setTransactions(newData)
    })
  }, [])

  return (
    <div>
      <h1>Reward points calculator</h1>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Reward points</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, index) => (
            <tr key={transaction?.id}>
              <td>{transaction?.name}</td>
              <td>{transaction?.amt}</td>
              <td>{transaction?.month}</td>
              <td>{calculateRewardPoints(transaction?.amt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total rewards points: {totalPoints}</p>
    </div>
  )
}

export default App
