import React, { useState } from 'react'
import Todo from './components/Todo'
import Header from './components/Header'
import Auth from './components/Auth';
import AuthContext from './auth-context'

const App= (props)=> {
  const [page, setPage]= useState("Auth")
  const [authStatus, setAuthStatus]= useState(false)
  const switchPage=(pageName)=>{
    setPage(pageName)
  }
  const Login=()=>{
    setAuthStatus(true)
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{status: authStatus, login:Login}}>
      <Header onLoadTodos={switchPage.bind(this, "todos")} onLoadAuth={switchPage.bind(this,"Auth")}/>
      <hr/>
      {page==='Auth'?<Auth/>:<Todo/>}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
