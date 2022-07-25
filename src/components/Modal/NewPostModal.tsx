import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

import { useGetCategories } from '../../api/categories';
import { useGetCreators } from '../../api/creators';
import OptionsModalList from './OptionsModalList';
import { IDialogModalProps, INewPostFormValues } from '../../interfaces/interfaces';
import PostModalMarkup from './PostModalMarkup';
import { useAddPost } from '../../api/posts';
import { useAppContext } from '../../providers/ContextProvider';
import { extractAddErrors, getErrorMessage } from '../../helpers/getErrorMessage';

function NewPostModal({ showModal, onCloseModal }: IDialogModalProps) {
  const [loading, setLoading] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const {setMessage} = useAppContext();
  const addPost = useAddPost();
  const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, reset } = useForm<INewPostFormValues>();
  const { data: creatorsData } = useGetCreators();
  const { data: categoriesData } = useGetCategories();

  useEffect(() => {
    setLoading(addPost.isLoading);
  }, [addPost.isLoading, setLoading]);

  useEffect(() => {
    if(addPost.isSuccess) {
      reset();
      setMessage({show: true, text: "Post has been added successfully 👌", isError: false})
      onCloseModal();
    }
    if(addPost.isError) {
      const errors = extractAddErrors(addPost);
      const message = getErrorMessage(errors);
      setMessage({show: true, text: message, isError: true});
    }
  }, [addPost.isSuccess, addPost.isError]);

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

    return <OptionsModalList data={data!} checked={checked} setChecked={setChecked} optionName='category' height={200} />;
  }, [categoriesData?.data?.data?.categories]);

  const onConfirmClick : SubmitHandler<INewPostFormValues> = (_) => {
    setValue('publication_date', new Date());
    setValue('categories', checkedOptions);
    addPost.mutate(getValues());
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
      />
  );
}

export default React.memo(NewPostModal);
