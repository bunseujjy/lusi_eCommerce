import { Transition } from "@headlessui/react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoMdCloseCircleOutline } from "react-icons/io";

const FilterOnMobile = ({
  isOpen,
  setIsOpen,
  selectedFilterOptions,
  filteredOptions,
  CheckboxesAndRadioButtons,
  CheckboxAndRadioItem,
  onSearch,
  searchParams,
  isOptionChecked,
  selectedPrice,
  handleChange,
}: any) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex  ${isOpen ? "block" : "hidden"}`}
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-25 ${
          isOpen ? "block " : "hidden"
        }`}
      >
        <Transition
          show={isOpen}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        ></Transition>
      </div>
      <div
        className={`ml-auto relative max-w-xs w-full h-full bg-white dark:bg-navy-800 shadow-xl py-4 pb-6 flex flex-col overflow-y-auto  ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="px-4 flex items-center justify-between z-50">
            <h2 className="uppercase text-lg font-medium text-gray-900 dark:text-white">
              Lusishoe
            </h2>
            <button
              className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Close menu</span>
              {/* Heroicon name: outline/x */}
              <IoMdCloseCircleOutline className="h-6 w-6" />
            </button>
          </div>

          {/* <!-- Filters --> */}
          <form className="mt-4">
            <div className="mb-3 md:w-96 px-4">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  name="search"
                  onChange={(event) => onSearch(event.target.value)}
                  defaultValue={searchParams.get("query")?.toString()}
                  className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search Product"
                />

                {/* <!--Search button--> */}
                <button
                  className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="submit"
                >
                  <CiSearch className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-4 flex items-start justify-between flex-col py-5">
              {filteredOptions.map(
                ({ id, title, options, filterType, className }: any) => {
                  return (
                    <div
                      className="flex items-start justify-between flex-col py-2"
                      key={id}
                    >
                      <div className="flex items-start justify-between flex-col">
                        <div className="flex-justify-between">
                          <button
                            type="button"
                            className={`group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-navy-200 px-3 ${
                              className === "category" ? "hidden" : ""
                            }`}
                          >
                            {title}
                            <IoIosArrowDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          </button>
                        </div>
                        {options.map(({ value, label, min, max }: any) => (
                          <div
                            key={value}
                            className={`py-2 ${
                              className === "category" ? "hidden" : ""
                            }`}
                          >
                            <CheckboxesAndRadioButtons>
                              <CheckboxAndRadioItem
                                name={id}
                                type={filterType}
                                label={label}
                                min={min}
                                max={max}
                                id={value && value.toLowerCase().trim()}
                                value={value && value.toLowerCase().trim()}
                                onChange={selectedFilterOptions}
                                checked={isOptionChecked(id, value)}
                              />
                            </CheckboxesAndRadioButtons>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
              <div className="">
                <Box sx={{ width: 200 }} className="mx-5">
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={selectedPrice}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    step={1}
                    max={110}
                  />
                </Box>
                <div className="flex items-center px-4">
                  <input
                    type="text"
                    value={selectedPrice}
                    onChange={handleChange}
                    min={0}
                    step={1}
                    max={110}
                    className="border boder-1 border-gray-300 rounded-sm w-14 px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </form>
        </Transition>
      </div>
    </div>
  );
};

export default FilterOnMobile;
