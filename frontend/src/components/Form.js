import React, { useState } from 'react';
import e from 'express';

const _ = require('lodash');


function Form(props) {
    const [formState, setFormField] = useState({});

    let { fields, formType } = props;

    // {
    //     type: "TextString",
    //     name: "someName",
    //     info: {
    //         hebrew: "",
    //         english: ""
    //     }
    // }
    // {
    //     name: {
    //         hebrew: "",
    //         english: ""
    //     }
    // }

    function update(field) {
        debugger
        if (field === "hebrew" || field === "english") {
            return (e) => {
                debugger
                setFormField(oldState => {
                    oldState[e.currentTarget.id][field] = e.currentTarget.value;
                    debugger
                    return oldState
                })
            }
        } else if () {

        } else {
            return (e) => {
              debugger;
              setFormField((oldState) => ({
                ...oldState,
                [field]: e.currentTarget.value
              }));
            };
        }


      
    }

    function inputMaker(field) {
        switch (field.type) {
          case "TextString":
            setFormField(oldState => ({
                ...oldState,
                [field.name]: {
                    hebrew: field.info.hebrew,
                    english: field.info.english
                }
            }))

            return (
              <>
                <input
                  type="text"
                  value={formState[name][hebrew]}
                  name={field.type}
                  id={field.name}
                  onChange={update("hebrew")}
                  placeholder={field.name}
                />
                <input
                  type="text"
                  value={formState[name][english]}
                  name={field.type}
                  id={field.name}
                  onChange={update("english")}
                  placeholder={field.name}
                />
              </>
            );
          case "String":
            setFormField(oldState => ({
            ...oldState,
            [field.name]: field.info
            }))

            return (
              <input
                type="text"
                value={formState[name]}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Date":
            setFormField(oldState => ({
            ...oldState,
            [field.name]: field.info
            }))

            return (
              <input
                type="date"
                value={formState[name]}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Boolean":
            setFormField(oldState => ({
            ...oldState,
            [field.name]: field.info
            }))
            return (
              <input
                type="checkbox"
                value={formState[name]}
                name={field.type}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Number":
            setFormField(oldState => ({
            ...oldState,
            [field.name]: field.info
            }))

            return (
              <input
                type="number"
                value={formState[name]}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={field.name}
              />
            );
          case "Image":
            setFormField(oldState => ({
            ...oldState,
            [field.name]: field.info
            }))

            return (
            <>
              <input
                type="file"
                value={formState[name]}
                onChange={(e) => setEmail(e.target.value)} // URL.createObjectURL(event.target.files[0])
                accept="image/*"
              />
              <img src={formState.image}/>
            </>
            );
          default:
            break;
        }
    }

    // {
    //   name: {
    //     hebrew: "",
    //     english: ""
    //   },
    //   description: {
    //     hebrew: "",
    //     english: ""
    //   },
    //   image: "",
    //   isHidden: Boolean
    // }


    let form = _.map(fields, inputMaker)
    // props.fields = array of objects with two keys type and name. type coresponds to what input type will be rendered and name is the name of that input field
    // <input
    //   type="text"
    //   value={email}
    //   onChange={(e) => setEmail(e.target.value)}
    //   placeholder="Email"
    // />;

    
}

export default Form