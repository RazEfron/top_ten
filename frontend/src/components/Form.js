import React, { useState, useEffect } from "react";

const _ = require('lodash');

function Form(props) {
    
    const [formState, setFormField] = useState({});

    useEffect(() => {
        debugger
        _.forEach(fields, createState);
        setFormField(() => newState);
    }, []);

    function createForm() {
        if (Object.keys(formState).length > 0) {
            return _.map(fields, inputMaker);
        } else {
            return [];
        }
    }

    let { fields, formType } = props;
    function update(field) {
        if (field === "hebrew" || field === "english") {
            return (e) => {
                setFormField(oldState => {
                    oldState[e.currentTarget.id][field] = e.currentTarget.value;
                    
                    return oldState
                })
            }
        } else if (field === "image") {
            return (e) => {
              setFormField((oldState) => ({
                ...oldState,
                [field]: URL.createObjectURL(e.target.files[0]),
              }));
            };
        } else {
            return (e) => {
              if (e.currentTarget.type === "checkbox") {
                setFormField((oldState) => ({
                ...oldState,
                [field]: e.target.checked,
                    }));
              } else {
                setFormField((oldState) => ({
                    ...oldState,
                    [field]: e.currentTarget.value
                    }));
                };
            }
        }
    }

    function inputMaker(field) {
        switch (field.type) {
          case "TextString":
            debugger
            return (
              <>
                <input
                  type="text"
                  value={formState[field.name]["hebrew"]}
                  name={field.type}
                  id={field.name}
                  onChange={update("hebrew")}
                  placeholder={field.name}
                />
                <input
                  type="text"
                  value={formState[field.name]["english"]}
                  name={field.type}
                  id={field.name}
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
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Date":
            return (
              <input
                type="date"
                value={formState.name}
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
                onChange={update(field.name)}
                placeholder={field.name}
              />
            );
          case "Number":
            return (
              <input
                type="number"
                value={formState.name}
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
                onChange={update(field.name)}
                accept="image/*"
              />
              <img src={formState.image}/>
            </>
            );
          default:
            break;
        }
    }

    let newState = {};
    function createState(field) {
        if (field.type === "TextString") {
            newState[field.name] = {
              hebrew: field.info.hebrew,
              english: field.info.english,
            };
        } else {
            newState[field.name] = field.info
        }
    }

    return (
        <form>
            {createForm()}
        </form>
    )
}

export default Form