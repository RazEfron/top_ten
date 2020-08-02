import React from 'react'
import userContext from '../contexts/userContext';

import Login from './LoginForm'
import Form from './Form'

function Navbar() {

    let fields = [
      {
        type: "TextString",
        name: "someName",
        info: {
          hebrew: "hebrew",
          english: "english",
        },
      },
      {
        type: "TextString",
        name: "someName2",
        info: {
          hebrew: "hafuch",
          english: "upsidedown",
        },
      },
      {
        type: "Boolean",
        name: "isHidden",
        info: true,
      },
    ];
    
    return(
        <>
        <userContext.Consumer>
            {value => <Login value={value}/>}
        </userContext.Consumer>
        <Form fields={fields} formType="edit" />
        </>
    )
}

export default Navbar