import React, { useEffect, useState } from "react";

const apiUtil = require("../util/apiUtil");

function Dish() {
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
        contentType: "",
        data: [],
      },
      visible: true
    }));
    debugger

    function getDishSucces(dish) {
        debugger
        const { description,name,image,visible } = dish
        setDish({
          description: {
            hebrew: description.hebrew,
            english: description.english,
          },
          name: {
            hebrew: name.hebrew,
            english: name.english,
          },
          image: {
            contentType: image.contentType,
            data: image.data.data,
          },
          visible,
        });
    }

    useEffect(() => {
        debugger
        apiUtil.get("/dish/5f0f26e85095a459fded9fa7", getDishSucces, (err) => {
            debugger
            console.log(err)
        });
    }, [])
  return (
    <>
      <div>
        <div>
          <p>{dishState.description.english}</p>
        </div>
        <div>
          <p>{dishState.name.english}</p>
        </div>
        <div>
          <img
            src={`data:${dishState.image.contentType};base64,${Buffer.from(
              dishState.image.data
            ).toString("base64")}`}
            alt="Raz"
          ></img>
        </div>
        <div>
          <img
            src="https://www.w3schools.com/images/picture.jpg"
            alt="Raz"
          ></img>
        </div>
        <div>
          <input
            type="file"
            // value={formState.name}
            // key={}
            // onChange={update(field.name)}
            accept="image/*"
          />
        </div>
      </div>
    </>
  );
}

export default Dish;
