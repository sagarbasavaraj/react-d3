import React from "react";

type DropdownProps = Readonly<{
  options: { value: string; label: string }[];
  id: string;
  selectedValue: string | undefined | null;
  onSelectedValueChange: (value: string) => void;
}>;

export const Dropdown = ({
  options,
  id,
  selectedValue,
  onSelectedValueChange,
}: DropdownProps): JSX.Element => (
  <select
    id={id}
    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
      onSelectedValueChange(event.target.value)
    }
  >
    {options.map(({ value, label }: { value: string; label: string }) => (
      <option value={value} selected={value === selectedValue}>
        {label}
      </option>
    ))}
  </select>
);
