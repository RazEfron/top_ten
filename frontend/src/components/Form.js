import React, { useState } from "react";

const _ = require('lodash');

function Form(props) {
    debugger
    const [formState, setFormField] = useState(() => setInitialState({}, props.fields));

    function handleSubmit(e) {
      
    }

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
      debugger
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
          debugger
            return (e) => {
              e.persist()
              setFormField((oldState) => ({
                ...oldState,
                [field]: e.target.files[0],
              }));
            };
        } else {
          debugger
            return (e) => {
                e.persist()
              if (e.target.type === "checkbox") {
                debugger
                setFormField((oldState) => ({
                ...oldState,
                [field]: e.target.checked,
                    }));
              } else {
                debugger
                setFormField((oldState) => {
                  debugger
                  return {
                    ...oldState,
                    [field]: e.target.value
                    }
                  });
                };
            }
        }
    }

    function inputMaker(field) {
        
        switch (field.type) {
          case "TextString":
            
            return (
              <div>
                <label>{field.name}
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
                </label>
              </div>
            );
          case "string":
            return (
              <div>
                <label>
                  {field.name}
                  <input
                    type="text"
                    value={formState[field.name]}
                    // key={}
                    onChange={update(field.name)}
                    placeholder={field.name}
                  />
                </label>
              </div>
            );
          case "date":
            return (
              <div>
                <label>
                  {field.name}
                  <input
                    type="date"
                    value={formState[field.name]}
                    // key={}
                    onChange={update(field.name)}
                  />
                </label>
              </div>
            );
          case "boolean":
            return (
              <div>
                <label>
                  {field.name}
                  <input
                    type="checkbox"
                    checked={formState[field.name]}
                    name={field.type}
                    // key={}
                    onChange={update(field.name)}
                  />
                </label>
              </div>
            );
          case "number":
            return (
              <div>
                <label>
                  {field.name}
                  <input
                    type="number"
                    value={formState[field.name]}
                    // key={}
                    onChange={update(field.name)}
                    placeholder={field.name}
                  />
                </label>
              </div>
            );
          case "image":
            return (
              <div>
                <label>{field.name}
                <input
                  type="file"
                  name="myImage"
                  onChange={update("image")}
                  accept="image/*"
                />
                <img src={formState["image"]["fileLink"]} alt="" />
                </label>
              </div>
            );
          default:
            break;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {createForm()}
            <button>
              submit form
            </button>
        </form>
    )
}

export default Form