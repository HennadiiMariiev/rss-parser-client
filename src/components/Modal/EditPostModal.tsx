import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

import { useGetCategories } from '../../api/categories';
import { useGetCreators } from '../../api/creators';
import OptionsModalList from './OptionsModalList';
import { IDialogModalProps, INewPostFormValues } from '../../interfaces/interfaces';
import PostModalMarkup from './PostModalMarkup';
import { useUpdatePost } from '../../api/posts';
import { useAppContext } from '../../providers/ContextProvider';
import { extractAddErrors, getErrorMessage } from '../../helpers/getErrorMessage';
import { showError, showInfo } from '../../helpers/messageHelpers';
import { addValuesOnEdit } from '../../helpers/addValuesOnEditPost';

function EditPostModal({ showModal, onCloseModal, post }: IDialogModalProps) {
  const [loading, setLoading] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const {setMessage} = useAppContext();
  const updatePost = useUpdatePost();
  const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, reset } = useForm<INewPostFormValues>();
  const { data: creatorsData } = useGetCreators();
  const { data: categoriesData } = useGetCategories();

  useEffect(() => {
    addValuesOnEdit(setValue, post);
  }, [post]);

  useEffect(() => {
    setLoading(updatePost.isLoading);
  }, [updatePost.isLoading, setLoading]);

  useEffect(() => {
    if(updatePost.isSuccess) {
      reset();
      showInfo(setMessage, "Post has been added successfully 👌")
      onCloseModal();
    }
    if(updatePost.isError) {
      const errors = extractAddErrors(updatePost);
      const message = getErrorMessage(errors);
      showError(setMessage, message);
    }
  }, [updatePost.isSuccess, updatePost.isError]);

  const creatorsOptions = useMemo(() => {
    const creators = creatorsData?.data?.data?.creators;
    return Array.isArray(creators)
      ? creators.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))
      : [];
  }, [creatorsData]);

  const OptionsList = useCallback(() => {
    const data = Array.isArray(categoriesData?.data?.data?.categories) ? categoriesData?.data?.data?.categories : []
    const [checked, setChecked] = useState<string[]>([]);

    useEffect(() => setCheckedOptions(checked), [checked]);

    useEffect(() =>  {
        if(post) {
            setChecked(post?.categories.map((item) => item._id));
        }
    }, [post, setChecked]);

    return <OptionsModalList data={data!} checked={checked} setChecked={setChecked} optionName='category' height={200} />;
  }, [categoriesData?.data?.data?.categories, post]);

  const onConfirmClick : SubmitHandler<INewPostFormValues> = (_) => {
    setValue('_id', post?._id);
    setValue('publication_date', post?.publication_date);
    setValue('categories', checkedOptions);
    updatePost.mutate(getValues());
  };

  const onHide = () => {
    clearErrors();
    onCloseModal();
  }

  return (
    <PostModalMarkup 
      show={showModal} 
      onHide={onHide} 
      loading={loading} 
      OptionsList={OptionsList} 
      creatorsOptions={creatorsOptions} 
      register={register} 
      errors={errors}
      handleSubmit={handleSubmit} 
      onSubmit={onConfirmClick}
      isEdit
      />
  );
}

export default React.memo(EditPostModal);
