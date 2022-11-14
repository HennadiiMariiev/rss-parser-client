import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";

import { IResponseError, IAddOptionResponse, IDeleteOptionResponse, IOptionForm, IAddPostResponse, INewPostFormValues} from "../interfaces/interfaces";

interface IGetErrorProps {
    isAddError?: boolean; 
    addError?: unknown;
    isDeleteError?: boolean;
    deleteError?: unknown; 
    isSignError?: boolean;
    signError?: unknown; 
}

export const extractErrors = (useAdd: UseMutationResult<AxiosResponse<IAddOptionResponse, any>, unknown, {
        option: IOptionForm;
        optionName: string;
}, unknown>, 
    useDelete? : UseMutationResult<AxiosResponse<IDeleteOptionResponse, any>, unknown, {
        options: string[];
        optionName: string;
}, unknown>) => {
    const {isError: isAddError, error: addError} = useAdd;
    if(!useDelete) {
        return { isAddError, addError };
    }
    const {isError: isDeleteError, error: deleteError} = useDelete;
    return { isAddError, addError, isDeleteError, deleteError };
} 

export const extractAddErrors = (useAdd : UseMutationResult<AxiosResponse<IAddPostResponse, any>, unknown, INewPostFormValues, unknown>) => {
    const {isError: isAddError, error: addError} = useAdd;
    return { isAddError, addError };
}

export const getErrorMessage = ({ isAddError, addError, isDeleteError, deleteError, isSignError, signError } : IGetErrorProps) => {
    let message = '';
    let error:IResponseError; 

    if(isAddError) {
        error = addError as IResponseError;
        message = error.response?.data?.message;
    }
    if(isDeleteError) {
        error = deleteError as IResponseError;
        message = error.response?.data?.message;
    }
    if(isSignError) {
        error = signError as IResponseError;
        message = error.response?.data?.message;
    }

    return message;
}