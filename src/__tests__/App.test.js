import { render, screen } from '@testing-library/react'
import { act } from 'react'
import App from '../App'
import mock_data from '../mocks/mockData.json'
import { CalculateResult } from '../CalculateResult'
import calculate_result_mock from '../mocks/calculateResult.json'

it('Should have the title Total Reward Points (each customer)', async () => {
  await act(async () => render(<App />))
  expect(
    screen.getByText('Total Reward Points (each customer)')
  ).toBeInTheDocument()
})

it('Should have the title Customer Reward Points (per month)', async () => {
  await act(async () => render(<App />))
  expect(
    screen.getByText('Customer Reward Points (per month)')
  ).toBeInTheDocument()
})

it('should calculate the result', async () => {
  await act(async () => render(<App />))
  const result = CalculateResult(mock_data)
  expect(result).toStrictEqual(calculate_result_mock)
})
