import { render, screen } from '@testing-library/react'
import { act } from 'react'
import App from './App'
import api from './api/dataService'

it('Should have the title Reward points calculator per customer', async () => {
  await act(async () => render(<App />))
  expect(
    screen.getByText('Reward points calculator per customer')
  ).toBeInTheDocument()
})

it('Should have the title Reward points calculator per month', async () => {
  await act(async () => render(<App />))
  expect(
    screen.getByText('Reward points calculator per month')
  ).toBeInTheDocument()
})
