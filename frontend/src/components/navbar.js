import React, { useContext } from 'react'

import Login from './LoginForm'
import Form from './Form'
import userContext from '../contexts/context'

function Navbar() {
  let user = useContext(userContext)
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
    debugger
    if (user.admin) {
      return(
        <>
          <Login/>
          <div>Youre The admin</div>
          <Form fields={fields} formType="edit" />
        </>
      )} else {
      return(
        <>
        <Login/>
        <Form fields={fields} formType="edit" />
        </>
        )
      }
}

export default Navbar