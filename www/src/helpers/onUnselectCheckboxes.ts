export const onUnselectCheckboxes = (refEl: HTMLElement, callback: Function) => {
  const checkBoxElems = Array.from(refEl.querySelectorAll('input'));
  if (Array.isArray(checkBoxElems)) {
    checkBoxElems.forEach((checkbox) => (checkbox.checked = false));
    callback([]);
  }
};
