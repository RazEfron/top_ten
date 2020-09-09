import TextInput from "../components/inputs/TextInput";
import FileInput from "../components/inputs/FileInput";
import BooleanInput from "../components/inputs/BooleanInput";
import DateInput from "../components/inputs/DateInput";

export function fields(list, language) {
  debugger
  return [
    {
      key: "name",
      type: TextInput,
      value: list.name ? list.name[language] : "",
    },
    {
      key: "description",
      type: TextInput,
      value: list.description ? list.description[language] : "",
    },
    {
      key: "image",
      type: FileInput,
      value: list.image ? list.image.fileLink : "",
    },
    {
      key: "date",
      type: DateInput,
      value: list.date
    },
    {
      key: "isHidden",
      type: BooleanInput,
      value: list.isHidden ? list.isHidden : false,
    },
  ];
}

