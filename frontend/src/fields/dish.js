import TextInput from "../components/inputs/TextInput";

export function fields(dish) {
  return [
    {
      key: "name",
      type: TextInput,
      value: dish.name ? dish.name.hebrew : "",
    },
    {
      key: "description",
      type: TextInput,
      value: dish.description ? dish.description.hebrew : "",
    },
    // ,
    // {
    //   key: image,
    //   type: File,
    //   value: dish.image,
    // },
    // {
    //   key: price,
    //   type: Number,
    //   value: dish.price,
    // },
    // {
    //   key: isHidden,
    //   type: Boolean,
    //   value: dish.isHidden,
    // },
  ];
}
