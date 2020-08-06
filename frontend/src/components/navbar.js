import React, { useContext } from 'react'

import Login from './LoginForm'
import userContext from '../contexts/context'

function Navbar() {
  let user = useContext(userContext)
    
    if (user.admin) {
      return(
        <>
          <Login/>
          <div>Youre The admin</div>
        </>
      )} else {
      return(
        <>
        <Login/>
        </>
        )
      }
}

export default Navbar