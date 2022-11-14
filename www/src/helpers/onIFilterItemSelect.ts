export function onFilterItemSelect(
  e: React.ChangeEvent<HTMLInputElement>,
  array: string[],
  callback: React.Dispatch<React.SetStateAction<string[]>>,
) {
  const { checked, value } = e.target;
  if (!Array.isArray(array)) {
    return;
  }
  if (checked && !array.find((_id) => _id === value)) {
    callback((prev: string[]) => [...prev, value]);
  } else {
    callback((prev: string[]) => [...prev.filter((_id) => _id !== value)]);
  }
}
