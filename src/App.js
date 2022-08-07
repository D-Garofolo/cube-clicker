import './App.css'
import React from 'react'
import { HomeWrapper } from './components'
import { GlobalStoreContextProvider } from './store'

const App = () => {
  return (
    <div className="App">
      <GlobalStoreContextProvider>
        <HomeWrapper/>
      </GlobalStoreContextProvider>
    </div>
  );
}

export default App