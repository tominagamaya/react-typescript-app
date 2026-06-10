type Props<T extends string> = {
  options: ReadonlyArray<{ value: T; label: string }>;
  handleFilter?: (selectedValue: T) => void;
};

/**
 * セレクターコンポーネント
 */
export function Selector<T extends string>({
  options,
  handleFilter,
}: Props<T>) {
  return (
    <select
      onChange={(e) => handleFilter && handleFilter(e.target.value as T)}
      className={"input-standard"}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
