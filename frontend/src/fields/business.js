import TextInput from "../components/inputs/TextInput";
import BooleanInput from "../components/inputs/BooleanInput";

export function fields(business, language) {
  debugger
  return [
    {
      key: "displayName",
      type: TextInput,
      value: business.displayName ? business.displayName[language] : "",
    },
    {
      key: "description",
      type: TextInput,
      value: business.description ? business.description[language] : "",
    },
    {
      key: "isHidden",
      type: BooleanInput,
      value: business.isHidden,
    },
  ];
}
