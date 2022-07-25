import { IOption } from '../interfaces/interfaces';

export const addNoOptionItem = (optionData: IOption[], optionName: string) => {
    const temp = [...optionData];
    temp.unshift({ _id: '[]', name: `- no ${optionName} -` } as IOption);
    return temp;
};
