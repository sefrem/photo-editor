import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import StoreProvider from './utils/store'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)
