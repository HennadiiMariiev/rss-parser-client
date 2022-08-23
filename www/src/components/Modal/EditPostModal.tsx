import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useGetCategories } from '../../api/categories';
import { useGetCreators } from '../../api/creators';
import OptionsModalList from './OptionsModalList';
import {
  IEditPostModalProps,
  INewPostFormValues,
} from '../../interfaces/interfaces';
import PostModalMarkup from './PostModalMarkup';
import { addValuesOnEdit } from '../../helpers/addValuesOnEditPost';

function EditPostModal({
  editModal,
  onCloseModal,
  updatePost,
}: IEditPostModalProps) {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    reset,
  } = useForm<INewPostFormValues>();
  const { data: creatorsData } = useGetCreators();
  const { data: categoriesData } = useGetCategories();

  useEffect(() => {
    addValuesOnEdit(setValue, editModal.post);
  }, [editModal.post]);

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
    const data = Array.isArray(categoriesData?.data?.data?.categories)
      ? categoriesData?.data?.data?.categories
      : [];
    const [checked, setChecked] = useState<string[]>([]);

    useEffect(() => setCheckedOptions(checked), [checked]);

    useEffect(() => {
      if (editModal.post) {
        setChecked(editModal.post?.categories.map((item) => item._id));
      }
    }, [editModal.post, setChecked]);

    return (
      <OptionsModalList
        data={data!}
        checked={checked}
        setChecked={setChecked}
        optionName="category"
        height={200}
      />
    );
  }, [categoriesData?.data?.data?.categories, editModal.post]);

  const onConfirmClick: SubmitHandler<INewPostFormValues> = (_) => {
    setValue('_id', editModal.post?._id);
    setValue('publication_date', editModal.post?.publication_date);
    setValue('categories', checkedOptions);
    updatePost.mutate(getValues());
  };

  const onHide = useCallback(() => {
    clearErrors();
    onCloseModal();
  }, [clearErrors, onCloseModal]);

  return (
    <PostModalMarkup
      show={editModal.show}
      onHide={onHide}
      loading={updatePost.isLoading}
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
