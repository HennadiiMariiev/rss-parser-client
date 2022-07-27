import { UseFormSetValue } from "react-hook-form";
import { INewPostFormValues, IPost } from "../interfaces/interfaces";

export const addValuesOnEdit = (setValue: UseFormSetValue<INewPostFormValues>, post: IPost | undefined) => {
    if(!post) {
        return;
    }
    setValue('creator', post.creator?._id);
    setValue('title', post.title);
    setValue('description', post.description);
    setValue('image', post.image);
    setValue('link', post.link);
}