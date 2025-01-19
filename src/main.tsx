import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import App from './App'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

