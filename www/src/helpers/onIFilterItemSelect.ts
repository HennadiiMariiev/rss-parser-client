export function onFilterItemSelect(e: React.ChangeEvent<HTMLInputElement>, array: string[], callback: Function) {
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
