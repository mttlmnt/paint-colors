import React from "react";
import { useState } from 'react';
import { FilterOptions } from "@/FilterOptions";

type HeaderProps = {
  onFilterOptionsChanged: (filterOptions: FilterOptions) => void
}

function Header({onFilterOptionsChanged}: HeaderProps) {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({} as FilterOptions);

    return (
      <div className='p-2 bg-gray-50 text-sm'>
        <Checkbox
          label={"Cool-colors"}
          onCheckboxChange={ (checked) => {
            const newFilterOptions = {...filterOptions, coolColorsOnly: checked};
            setFilterOptions(newFilterOptions);
            onFilterOptionsChanged(newFilterOptions);
          }}
        />
      </div>
    )
}

type CheckboxProps = {
  label: string;
  onCheckboxChange: (checked: boolean) => void
}

const Checkbox = ({ label, onCheckboxChange }: CheckboxProps) => (
  <div className="">
    <label>
      <input
        type="checkbox"
        name={label}
        onChange={ (event) => { onCheckboxChange(event.target.checked) } }
        className=""
      />
      {label}
    </label>
  </div>
);

export { Header };
