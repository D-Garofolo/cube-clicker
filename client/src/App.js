import './App.css'
import React from 'react'
import { HomeWrapper } from './components'
import { GlobalStoreContextProvider } from './store'
import { AuthContextProvider } from './auth'

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <HomeWrapper/>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App