import { IMessage } from "../interfaces/interfaces";

export const showInfo = (callback: React.Dispatch<React.SetStateAction<IMessage>>, text: string) => {
    callback((prev) => ({...prev, isError: false, text}));
}

export const showError = (callback: React.Dispatch<React.SetStateAction<IMessage>>, text: string) => {
    callback((prev) => ({...prev, isError: true, text}));
}