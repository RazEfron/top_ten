import TextInput from "../components/inputs/TextInput";
import NumberInput from "../components/inputs/NumberInput";
import FileInput from "../components/inputs/FileInput";
import BooleanInput from "../components/inputs/BooleanInput";

export function fields(dish, language) {
  return [
    {
      key: "name",
      type: TextInput,
      value: dish.name ? dish.name[language] : "",
    },
    {
      key: "description",
      type: TextInput,
      value: dish.description ? dish.description[language] : "",
    },
    {
      key: "image",
      type: FileInput,
      value: dish.image ? dish.image.fileLink : "",
    },
    {
      key: "price",
      type: NumberInput,
      value: dish.price,
    },
    {
      key: "isHidden",
      type: BooleanInput,
      value: dish.isHidden,
    },
  ];
}
