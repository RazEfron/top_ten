import React, { useState, useContext } from "react";
import userContext from "../../contexts/context";
const _ = require("lodash");

const apiUtil = require("../../util/apiUtil");
function DishForm() {
    const [imagePreview, setImagePreview] = useState(() => ({}))
    const [dishState, setDish] = useState(() => ({
        description: {
        hebrew: "",
        english: "",
        },
        name: {
        hebrew: "",
        english: "",
        },
        image: {},
        isHidden: true,
        price: 0
    }));

    function handleSubmit(e) {
        e.preventDefault();
        let form = new FormData();
        _.forEach(dishState, function (value, key) {
          if (typeof value === 'object' && key !== 'image') {
            value = JSON.stringify(value)
          }
          form.append(key, value)
        });
        apiUtil.post('/dish', form, (res) => {
          
          setImagePreview(res.image.fileLink);
          console.log(res)
        }, (err) => console.log(err))
    }

    function update(field) {
        if (field === "hebrew" || field === "english") {
            return (e) => {
              e.persist();
                
                setDish(oldState => {
                  
                    oldState[e.target.id][field] = e.target.value;
                    let newState = Object.assign({}, oldState)
                    return newState;
                })
            }
        } else if (field === "image") {
            return (e) => {
                
              e.persist()
              setImagePreview(URL.createObjectURL(e.target.files[0]));
              setDish((oldState) => ({
                ...oldState,
                [field]: e.target.files[0],
              }));
            };
        } else {
            return (e) => {
                e.persist()
              if (e.target.type === "checkbox") {
                setDish((oldState) => ({
                ...oldState,
                [field]: e.target.checked,
                    }));
              } else {
                setDish((oldState) => ({
                    ...oldState,
                    [field]: e.target.value
                    }));
                };
            }
        }
    }
    
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={dishState["description"]["hebrew"]}
          name={"TextString"}
          id={"description"}
          onChange={update("hebrew")}
          placeholder={"description"}
        />
        <input
          type="text"
          value={dishState["description"]["english"]}
          name={"TextString"}
          id={"description"}
          onChange={update("english")}
          placeholder={"description"}
        />
        <input
          type="text"
          value={dishState["name"]["hebrew"]}
          name={"TextString"}
          id={"name"}
          onChange={update("hebrew")}
          placeholder={"name"}
        />
        <input
          type="text"
          value={dishState["name"]["english"]}
          name={"TextString"}
          id={"name"}
          onChange={update("english")}
          placeholder={"name"}
        />
        <input
          type="number"
          value={dishState["price"]}
          onChange={update("price")}
        />
        <input
          type="file"
          name="myImage"
          onChange={update("image")}
          accept="image/*"
        />
        <img src={imagePreview} alt="" />
        <input
          type="checkbox"
          checked={dishState.isHidden}
          onChange={update("isHidden")}
        />
        <button>Submit</button>
      </form>
    </>
  );
}

export default DishForm;
