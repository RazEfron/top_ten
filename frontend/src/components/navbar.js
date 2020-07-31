import React from 'react'
import userContext from '../contexts/userContext';

import Login from './LoginForm'

function Navbar() {
    
    return(
        <userContext.Consumer>
            {value => <Login value={value}/>}
        </userContext.Consumer>
    )
}

export default Navbar