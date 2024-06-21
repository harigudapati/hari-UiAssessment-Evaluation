import { useState, useEffect } from 'react'
import api from './api/dataService'
import { CalculateResult } from './CalculateResult'

function App() {
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    try {
      api().then((data) => {
        const results = CalculateResult(data)
        setTransactions(results)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return transactions == null ? (
    <div>Loading...</div>
  ) : (
    <>
      <div>
        <h1 data-testid='first-header'>Total Reward Points (each customer)</h1>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total reward points</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.totalByCustomer?.map((transaction, index) => (
              <tr key={transaction?.name}>
                <td>{transaction?.name}</td>
                <td>{transaction?.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 data-testid='second-header'>Customer Reward Points (per month)</h1>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Month</th>
              <th>Total reward points</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.totalByMonth?.map((transaction, index) => (
              <tr key={`${transaction?.month}-${transaction?.name}`}>
                <td>{transaction?.name}</td>
                <td>{transaction?.month}</td>
                <td>{transaction?.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
