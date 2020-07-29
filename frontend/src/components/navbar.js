import React, { useState } from 'react'
import userContext from '../contexts/userContext';

import Login from './loginForm'

function Navbar() {
    debugger
    return(
        <userContext.Consumer>
            {value => <Login value={value}/>}
        </userContext.Consumer>
    )
}

export default Navbar