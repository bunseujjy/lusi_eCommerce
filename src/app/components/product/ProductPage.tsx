"use client";

import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import { filteredOptions, sorting } from "@/app/helper/items-list";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ProductType } from "@/types/productType";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";
import FilterOnMobile from "@/app/components/product/FilterOnMobile";
import ProductCard from "@/app/components/product/ProductCard";
import { TbAdjustmentsSearch } from "react-icons/tb";
import Loading from "@/app/(route)/(product)/loading";
import Link from "next/link";
import { PaginationSection } from "./Pagination";
import {
  CheckboxAndRadioItem,
  CheckboxesAndRadioButtons,
  checkValidQuery,
  convertValidStringQueries,
  isProductAvailable,
  saveAllUserOptions,
} from "@/app/helper/functions";

const ProductPage = ({ product }: any) => {
  const [isClient, setIsClient] = useState(false);
  const {
    isOpen,
    setIsOpen,
    closeCate,
    setCloseCate,
    closeSort,
    setCloseSort,
    closePrice,
    setClosePrice,
  } = useBetween(StateProps);
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const [selectedFilterQueries, setSelectedFilterQueries] = useState<
    Record<string, string[]>
  >({});
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 110]);

  const min = selectedPrice[0];
  const max = selectedPrice[1];
  const paramsObj = saveAllUserOptions(searchParams);
  const searchQ = searchParams.get("query") ?? "";

  let filteredProduct = product.filter((product: ProductType) => {
    const hasCategories = isProductAvailable(
      product.category,
      paramsObj?.category
    );

    return hasCategories;
  });

  filteredProduct = filteredProduct.sort((product1: any, product2: any) => {
    switch (paramsObj?.sort?.[0]) {
      case "new arrivals":
        return product1?.createdAt - product2?.createdAt;
      case "latest":
        return product2?.createdAt - product1?.createdAt;
      case "price: high to low":
        return product2?.price - product1?.price;
      case "price: low to high":
        return product1?.price - product2?.price;
      default:
        return 0;
    }
  });

  filteredProduct = filteredProduct.filter(
    (item: ProductType) => item.price >= min && item.price <= max
  );

  filteredProduct = filteredProduct.filter((product: ProductType) => {
    return (
      product.category.toString() &&
      product.title.toLowerCase().includes(searchQ && searchQ.toLowerCase())
    );
  });

  if (Object.keys(paramsObj).length === 0) {
    filteredProduct = product;
  }

  const page = searchParams.get("page") || (1 as any);
  const per_page = searchParams.get("per_page") || (6 as any);
  const totalItems = filteredProduct.length;
  const lastItemsIndex = page * per_page;
  const firstItemsIndex = lastItemsIndex - per_page;
  let currentItems = filteredProduct.slice(firstItemsIndex, lastItemsIndex);

  function selectedFilterOptions(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    const filterType = event.target.type;
    let selectedQueries = selectedFilterQueries;

    if (selectedQueries[name]) {
      if (filterType === "radio") {
        selectedQueries[name] = [value];
      } else if (selectedQueries[name].includes(value)) {
        selectedQueries[name] = selectedQueries[name].filter(
          (query) => query !== value
        );
        if (!checkValidQuery(selectedQueries[name])) {
          delete selectedFilterQueries[name];
        }
      } else {
        selectedQueries[name].push(value);
      }
    } else if (selectedQueries) {
      selectedQueries[name] = [value];
    }
    setSelected(selectedQueries);

    router.push(`${path}?${convertValidStringQueries(selectedQueries)}`, {
      scroll: false,
    });
  }

  function isOptionChecked(id: string, options: string) {
    return (
      Boolean(selectedFilterQueries[id]) &&
      selectedFilterQueries[id].includes(options && options.toLowerCase())
    );
  }

  const handleChange = (event: any) => {
    setSelectedPrice(event.target.value);
    const minPrice = searchParams.get("productPrice") ?? min;
    const maxPrice = searchParams.get("productPrice") ?? max;
    const querys = "";
    const query = querys ? "" : "";

    router.push(
      convertValidStringQueries
        ? `${path}/?minPrice=${minPrice}&maxPrice=${maxPrice}${convertValidStringQueries(
            selected
          )}`
        : `${path}/?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    return query;
  };

  const onInput = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      const params = new URLSearchParams(searchParams);
      if (text) {
        params.set("query", text);
      } else {
        params.delete("query");
      }
      router.push(`${path}/?${params.toString()}`);
    },
    400
  );

  const onSearch = (e: React.FormEvent) => {
    const params = new URLSearchParams(searchParams);
    router.push(`${path}/?${params.toString()}`);
  };

  useEffect(() => {
    setIsClient(true);
    const paramsObj = saveAllUserOptions(searchParams);
    setSelectedFilterQueries(paramsObj);
  }, [searchParams]);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-50 dark:bg-navy-900">
          <FilterOnMobile
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSearch={onSearch}
            searchParams={searchParams}
            CheckboxesAndRadioButtons={CheckboxesAndRadioButtons}
            CheckboxAndRadioItem={CheckboxAndRadioItem}
            filteredOptions={filteredOptions}
            selectedFilterOptions={selectedFilterOptions}
            isOptionChecked={isOptionChecked}
            selectedPrice={selectedPrice}
            handleChange={handleChange}
          />
          <div className="max-w-3xl mx-auto text-center lg:max-w-7xl lg:px-8 px-4">
            <div className="py-10 md:py-24">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                New Arrivals
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500">
                Thoughtfully designed objects for the workspace, home, and
                travel.
              </p>
            </div>

            <section
              aria-labelledby="filter-heading"
              className="border-t border-gray-200 py-6 flex items-center justify-between md:block"
            >
              <h2 id="filter-heading" className="sr-only">
                Product filters
              </h2>

              <div className="flex items-center justify-between">
                {filteredOptions.map(
                  ({
                    id,
                    title,
                    options,
                    filterType,
                    onClick,
                    className,
                  }: any) => {
                    return (
                      <div
                        className={`relative inline-block text-left ${
                          className === "sorting"
                            ? "md:flex-1"
                            : "" || className === "category"
                            ? "flex-2"
                            : ""
                        }`}
                        key={id}
                      >
                        <div className="flex items-center">
                          {filterType !== "sorting" ? (
                            <form
                              onSubmit={onSearch}
                              className={`flex-1 mr-4 hidden ${
                                className === "category" ? "hidden" : "md:block"
                              }`}
                            >
                              <div className="flex">
                                <button
                                  className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-navy-700 dark:hover:bg-navy-600 dark:focus:ring-navy-700 dark:text-white dark:border-navy-600"
                                  type="button"
                                  onClick={() =>
                                    onClick === "sorting"
                                      ? setCloseSort(!closeSort)
                                      : null || onClick === "category"
                                      ? setCloseCate(!closeCate)
                                      : null
                                  }
                                >
                                  {title}
                                  {(id === "sort" && closeSort) ||
                                  (id === "category" && closeCate) ? (
                                    <IoIosArrowDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white dark:hover:text-navy-200" />
                                  ) : (
                                    <IoIosArrowUp className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                  )}
                                </button>
                                <div
                                  id="dropdown"
                                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-navy-700"
                                  style={{
                                    position: "absolute",
                                    inset: "auto auto 0px 0px; margin: 0px",
                                    transform:
                                      "translate3d(897px, 5637px, 0px)",
                                  }}
                                ></div>
                                <div className="relative w-full">
                                  <input
                                    type="search"
                                    name="search"
                                    onChange={onInput}
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-navy-700 dark:border-l-navy-700  dark:border-navy-600 dark:placeholder-white dark:text-white dark:focus:border-navy-500 outline-none"
                                    defaultValue={searchParams
                                      .get("query")
                                      ?.toString()}
                                    placeholder="Search Product by Title or Category"
                                  />
                                  <button
                                    type="submit"
                                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    <TbAdjustmentsSearch className="w-5 h-5" />

                                    <span className="sr-only">Search</span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          ) : null}
                          <button
                            type="button"
                            className={`group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-navy-200 ${
                              className === "sorting" ? "hidden" : ""
                            }`}
                            onClick={() =>
                              onClick === "sorting"
                                ? setCloseSort(!closeSort)
                                : null || onClick === "category"
                                ? setCloseCate(!closeCate)
                                : null
                            }
                          >
                            {title}
                            {(id === "sort" && closeSort) ||
                            (id === "category" && closeCate) ? (
                              <IoIosArrowDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                            ) : (
                              <IoIosArrowUp className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                            )}
                          </button>
                        </div>

                        <div
                          className={`origin-top-left absolute left-0 z-10 mt-2 w-50 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-navy-700 dark:ring-navy-200 ${
                            onClick === "sorting"
                              ? closeSort
                                ? "block"
                                : "hidden"
                              : onClick === "category"
                              ? closeCate
                                ? "block"
                                : "hidden"
                              : onClick === "price"
                              ? closePrice
                                ? "block"
                                : "hidden"
                              : null
                          }`}
                        >
                          {options.map(({ value, label, min, max }: any) => (
                            <CheckboxesAndRadioButtons key={value}>
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
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
                <div className="relative hidden md:block">
                  <div className=" pl-6">
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-navy-200"
                      onClick={() => setClosePrice(!closePrice)}
                    >
                      Filter Price
                      {closePrice ? (
                        <IoIosArrowDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      ) : (
                        <IoIosArrowUp className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div
                    className={`origin-top-left absolute right-0 z-10 mt-2 w-50 rounded-md shadow-2xl px-6 py-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none block ${
                      closePrice ? "block" : "hidden"
                    }`}
                  >
                    <Box sx={{ width: 300 }}>
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
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-baseline sm:space-x-8">
                  <div className="relative z-10 inline-block text-left"></div>
                </div>
              </div>
              <button
                type="button"
                className="inline-block md:hidden text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-navy-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                Filters
              </button>
            </section>
          </div>
          <Suspense fallback={<Loading />}>
            <section className="py-[96px] px-6 md:px-10">
              <div className="max-w-6xl mx-auto">
                {currentItems.length > 0 ? (
                  <div className="max-w-3xl mx-auto lg:max-w-7xl lg:px-8 px-4 text-gray-400 dark:text-white">
                    <p>Showing all {currentItems.length} results</p>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto lg:max-w-7xl lg:px-8 px-4 text-gray-400 dark:text-white">
                    <p>Showing 0 results</p>
                  </div>
                )}
                {currentItems.length > 0 ? (
                  <ProductCard
                    totalItems={totalItems}
                    currentItems={currentItems}
                    convertValidStringQueries={convertValidStringQueries}
                    selected={selected}
                    selectedPrice={selectedPrice}
                    product={product}
                    onSearch={onSearch}
                  />
                ) : (
                  <div className="flex items-center justify-center text-center py-5">
                    <div className="flex items-center flex-col my-5">
                      <h1>
                        Opps... We could not find any products matching your
                        criteria.
                      </h1>
                      <Link
                        href="/collection"
                        className="underline text-blue-500 py-2"
                      >
                        Check all the products available in our store here
                      </Link>
                    </div>
                  </div>
                )}

                <div className="flex justify-end py-10 pr-5">
                  <PaginationSection
                    convertValidStringQueries={convertValidStringQueries}
                    selected={selected}
                    totalItems={totalItems}
                  />
                </div>
              </div>
            </section>
          </Suspense>
        </div>
      ) : null}
    </>
  );
};

export default ProductPage;
