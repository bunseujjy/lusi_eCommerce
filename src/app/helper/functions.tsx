import { ReadonlyURLSearchParams } from "next/navigation";

export function checkValidQuery(queries: string[]) {
  return queries.filter((query) => query !== "").length > 0;
}

export function saveAllUserOptions(searchParams: ReadonlyURLSearchParams) {
  let selectedQueries: Record<string, string[]> = {};
  searchParams.forEach((value, key) => {
    const queries = value.split(",");
    if (selectedQueries[key]) {
      selectedQueries[key].push(...queries);
    } else {
      selectedQueries[key] = queries;
    }
  });
  return selectedQueries;
}

export function convertValidStringQueries(queries: Record<string, string[]>) {
  let query = "";
  for (let [key, value] of Object.entries(queries)) {
    query = query + `${query === "" ? "" : "&"}${key}=${value}`;
  }
  return query;
}

interface FilteringUsingCheckboxAndRadioButtons {
  children: React.ReactNode;
}

interface CheckboxAndRadioItems
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  type: string;
  onChange: any;
  value: string;
  name: string;
  checked: any;
  min: number;
  max: number;
}

export function CheckboxesAndRadioButtons({
  children,
}: FilteringUsingCheckboxAndRadioButtons) {
  return <div>{children}</div>;
}

export function CheckboxAndRadioItem({
  id,
  label,
  type,
  value,
  name,
  onChange,
  checked,
  min,
  max,
  ...props
}: CheckboxAndRadioItems) {
  return (
    <div className="flex items-center px-3">
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-navy-600 dark:border-navy-700 dark:text-white dark:focus:ring-navy-600"
      />
      <label
        htmlFor={id}
        className="ml-3 pr-6 py-1 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {label}
      </label>
    </div>
  );
}

export function isProductAvailable(arr1?: string[], arr2?: string[]) {
  if (!arr1 || !arr2) {
    return true;
  }
  return arr1 && arr1.some((item) => arr2?.includes(item));
}
