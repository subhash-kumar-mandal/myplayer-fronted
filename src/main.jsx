import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import RootStore from './utils/Store.js'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    {/* <StrictMode> */}
    <Provider store={RootStore}>
      <Toaster />
      <App />
    </Provider>
    {/* </StrictMode> */}
  </BrowserRouter>
)
