import TextInput from "../components/inputs/TextInput";
import BooleanInput from "../components/inputs/BooleanInput";

export function fields(branch) {
  return [
    {
      key: "googlePlaceId",
      type: TextInput,
      value: branch.googlePlaceId,
    },
    {
      key: "isHidden",
      type: BooleanInput,
      value: branch.isHidden ? branch.isHidden : false,
    },
  ];
}
