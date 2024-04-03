import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { useBetween } from "use-between";
import { StateProps } from "../../../lib/StateProps";
import { useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProp = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProp = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProp = {
  options: SelectOption[];
} & (SingleSelectProp | MultipleSelectProp);

const MultipleSelect = ({ options, multiple, onChange, value }: SelectProp) => {
  const { drop, setDrop } = useBetween(StateProps);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOptions = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };
  return (
    <div className="relative">
      <div className="w-full  svelte-1l8159u">
        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
          <div className="flex flex-auto flex-wrap">
            {multiple
              ? value.map((v) => (
                  <div
                    className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
                    key={v.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectOptions(v);
                    }}
                  >
                    <div className="text-xs font-normal leading-none max-w-full flex-initial">
                      {v.label}
                    </div>
                    <div className="flex flex-auto flex-row-reverse pl-2 pt-[1px]">
                      <IoMdCloseCircleOutline />
                    </div>
                  </div>
                ))
              : value?.value}
            <div className="flex-1">
              <input
                placeholder=""
                className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
              />
            </div>
          </div>
          <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
            <div
              className="flex items-center cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              onClick={() => setDrop(!drop)}
            >
              {drop ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto ${
          drop ? "hidden" : "block"
        }`}
      >
        <div className="flex flex-col w-full">
          {options.map((option, idx) => (
            <div
              className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                selectOptions(option);
                setDrop(false);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                <div className="w-full items-center flex">
                  <div className="mx-2 leading-6  ">{option.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultipleSelect;
