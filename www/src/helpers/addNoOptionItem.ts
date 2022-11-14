import { IOption } from '../interfaces/interfaces';

export const addNoOptionItem = (optionData: IOption[], optionName: string) => {
    if(optionData && optionData.length) {
        const temp = [...optionData];
        temp.unshift({ _id: '[]', name: `- no ${optionName} -` } as IOption);
        return temp;
    }
    return [{ _id: '[]', name: `- no ${optionName} -` } as IOption];
};
