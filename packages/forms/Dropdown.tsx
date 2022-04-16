import { FC, useContext } from "react";

import StoryIDropdownBlack, {
  IDropdown,
} from "@/packages/forms/dropdown-black/Dropdown";
import StoryIDropdownWhite, {
  Option,
} from "@/packages/forms/dropdown/Dropdown";
import { ThemeContext } from "@/contexts/ThemeContext";

type Props = {
  selectedOptions: IDropdown["selectedOptions"];
  isWhite?: boolean;
} & Omit<IDropdown, "error">;

const Dropdown: FC<Props> = ({
  label,
  isWhite = false,
  options,
  selectedOptions,
  onChange,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return theme === "light" ? (
    <StoryIDropdownWhite
      label={label}
      onChange={onChange}
      selectedOptions={selectedOptions}
      options={options}
    />
  ) : (
    <StoryIDropdownBlack
      label={label}
      onChange={onChange}
      selectedOptions={selectedOptions}
      options={options}
    />
  );
};

export default Dropdown;
