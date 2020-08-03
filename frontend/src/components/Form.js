import React, { useState } from "react";

const _ = require('lodash');

function Form(props) {
    
    const [formState, setFormField] = useState(() => setInitialState({}, props.fields));

    function setInitialState(newState, fields) {
        
        _.forEach(fields, (field) => {
            if (field.type === "TextString") {
            newState[field.name] = {
              hebrew: field.info.hebrew,
              english: field.info.english,
            };
          } else {
            newState[field.name] = field.info;
          }
        });
        return newState
    }

    function createForm() {
        
        if (Object.keys(formState).length > 0) {
            return _.map(props.fields, inputMaker);
        } else {
            return [];
        }
    }

    function update(field) {
        
        if (field === "hebrew" || field === "english") {
            
            return (e) => {
              e.persist();
                
                setFormField(oldState => {
                  
                    oldState[e.target.id][field] = e.target.value;
                    let newState = Object.assign({}, oldState)
                    return newState;
                })
            }
        } else if (field === "image") {
            return (e) => {
              e.persist()
              setFormField((oldState) => ({
                ...oldState,
                [field]: URL.createObjectURL(e.target.files[0]),
              }));
            };
        } else {
            return (e) => {
                
                e.persist()
              if (e.target.type === "checkbox") {
                setFormField((oldState) => ({
                ...oldState,
                [field]: e.target.checked,
                    }));
              } else {
                setFormField((oldState) => ({
                    ...oldState,
                    [field]: e.target.value
                    }));
                };
            }
        }
    }

    function inputMaker(field) {
        
        switch (field.type) {
          case "TextString":
            
            return (
              <>
                <input
                  type="text"
                  value={formState[field.name]["hebrew"]}
                  name={field.type}
                  id={field.name}
                //   key={}
                  onChange={update("hebrew")}
                  placeholder={field.name}
                />
                <input
                  type="text"
                  value={formState[field.name]["english"]}
                  name={field.type}
                  id={field.name}
                //   key={}
                  onChange={update("english")}
                  placeholder={field.name}
                />
              </>
            );
          case "String":
            return (
              <input
                type="text"
                value={formState.name}
                // key={}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Date":
            return (
              <input
                type="date"
                value={formState.name}
                // key={}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Boolean":
            return (
              <input
                type="checkbox"
                checked={formState.name}
                name={field.type}
                // key={}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Number":
            return (
              <input
                type="number"
                value={formState.name}
                // key={}
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Image":
            return (
            <>
              <input
                type="file"
                value={formState.name}
                // key={}
                onChange={update(field.name)}
                accept="image/*"
              />
              <img src={formState.image} alt=""/>
            </>
            );
          default:
            break;
        }
    }

    return (
        <form>
            {createForm()}
        </form>
    )
}

export default Form