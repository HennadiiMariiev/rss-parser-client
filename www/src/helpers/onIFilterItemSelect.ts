import { MutableRefObject } from "react";
import { FixedSizeList } from "react-window";

export function onFilterItemSelect(e: React.ChangeEvent<HTMLInputElement>, array: string[], callback: Function, listRef: MutableRefObject<FixedSizeList<any> | null>, index: number) {
  const { checked, value } = e.target;
  if (!Array.isArray(array)) {
    return;
  }
  if (checked && !array.find((_id) => _id === value)) {
    callback((prev: string[]) => [...prev, value]);
  } else {
    callback((prev: string[]) => [...prev.filter((_id) => _id !== value)]);
  }
  if(typeof index === 'number') {
    setTimeout(() => {
      listRef?.current?.scrollToItem(index, 'center');
    }, 0);
  }
}
