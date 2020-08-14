import React, { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/context";

const _ = require("lodash");

const apiUtil = require("../../util/apiUtil");

function DishItem(props) {
  
    const [dishState, setDish] = useState(() => ({
      description: {
        hebrew: "",
        english: "",
      },
      name: {
        hebrew: "",
        english: "",
      },
      image: {
        fileLink: "",
        s3_key: ""
      },
      price: 0,
      businessId: "",
      isHidden: true,
    }));
    
    const { formType, dish, setFormInfo, isAdmin, setFormCallback } = props;
    const setUrl = useContext(userContext).setUrl;
    
    useEffect(() => {
      if (formType === "edit") {
        setDish(() => {
          const { description, name, image, isHidden, price, businessId } = dish;
          
          return {
            description, name,  image, price, businessId, isHidden
          };
        })
      }
    }, []);
  
    function createFormFields() {
      let fields = [

      ]

      _.forEach(dishState, (value, key) => {
        debugger

        let type
        if (value === undefined) {
          type = "string"
        } else if (value.hebrew !== undefined) {
          debugger
          type = "TextString";
        } else if (key === "image" || key === "date") {
          debugger
          type = key
        } else {
          debugger
          type = typeof value
        }

        fields.push({
          type,
          name: key,
          info: value,
        });
         
      })
      debugger
      setFormInfo(fields)
      setFormCallback(() => {
        if (formType === "edit") {
          return sendEditForm.bind(null, dish._id)
        } else {
          return sendNewForm
        }
      })
      setUrl("/form")
    }

    function sendNewForm(formState) {
      debugger
        let form = new FormData();
        _.forEach(formState, function (value, key) {
          if (typeof value === "object" && key !== "image") {
            debugger
            value = JSON.stringify(value);
          }
          form.append(key, value);
        });
        apiUtil.post('/dish', form, res => {
          debugger
        }, err => {
          debugger
        })

    }

    function sendEditForm(id, formState) {
      let form = new FormData();
        _.forEach(formState, function (value, key) {
          if (typeof value === "object" && key !== "image") {
            debugger
            value = JSON.stringify(value);
          }
          form.append(key, value);
        });
        apiUtil.put(`/dish/${id}`, form, res => {
          debugger
        }, err => {
          debugger
        })
    }

    const imagestyle = {
      height: '90px',
      width: '90px'
    }

    const listStyle = {
      margin: '10px',
      border: '1px black solid',
      width: '150px'
    }

  return (
    <ul style={listStyle}>
      <li>
        <p>{dishState.description.english}</p>
      </li>
      <li>
        <p>{dishState.name.english}</p>
      </li>
      <li>
        <p>{dishState.price}</p>
      </li>
      <li>
        <img src={dishState.image.fileLink} alt="Raz" style={imagestyle}></img>
      </li>
      <li>
        {isAdmin ? (
          <div>
            <button onClick={createFormFields}>
              {`${formType} Dish`}
            </button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default DishItem;
