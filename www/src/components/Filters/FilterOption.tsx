import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { InputGroup, Form } from 'react-bootstrap';

import { useAppContext } from '../../providers/ContextProvider';
import { useGetCreators } from '../../api/creators';
import { useGetCategories } from '../../api/categories';
import { onFilterItemSelect } from '../../helpers/onIFilterItemSelect';
import { addNoOptionItem } from '../../helpers/addNoOptionItem';
import {
  IFilterOptionProps,
  IKeys,
  IOption,
} from '../../interfaces/interfaces';
import { resetOption } from '../../helpers/resetOption';
import { getEmoji } from '../../helpers/getEmoji';
import { getOptionIndexes } from '../../helpers/findCallback';
import NewOptionModal from '../Modal/EditOptionModal';
import OptionsItem from './OptionsItem';
import FilterSkeleton from '../Skeletons/FilterSkeleton';
import List from './OptionsList';
import LightButton from '../Buttons/LightButton';

import classes from './filters.module.scss';

function FilterOption({ optionName }: IFilterOptionProps) {
  const [showModal, setShowModal] = useState(false);
  const { admin, setCreators, setCategories, creators, categories } =
    useAppContext();
  const { data, isLoading, isError, isFetching, refetch } =
    optionName === 'creators' ? useGetCreators() : useGetCategories();
  const option = optionName === 'creators' ? creators : categories;
  const callback = optionName === 'creators' ? setCreators : setCategories;
  const total: number = data?.data?.data?.pagination?.total! + 1 || 0;

  let optionData: IOption[] = addNoOptionItem(
    data?.data?.data?.[optionName as keyof IKeys]!,
    optionName,
  );

  const onReset = useCallback(
    () => resetOption(option, callback, refetch),
    [refetch, optionName, option, callback],
  );

  const OptionsList = useCallback(() => {
    const idxs = getOptionIndexes(option, optionData);
    const initState = Array.from({ length: total }, (_, i) => idxs.includes(i));
    const [checked, setChecked] = useState(initState);

    useEffect(() => {
      setChecked((prev) => {
        idxs.forEach((i) => (prev[i] = true));
        return prev;
      });
    }, []);

    if (isLoading || (isFetching && !isError)) {
      return <FilterSkeleton />;
    }

    return (
      <List total={total} optionData={optionData}>
        {({ data, index, style }) => {
          if (!data.length) {
            return null;
          }
          const { _id, name } = data[index];
          return (
            <OptionsItem
              style={style}
              _id={_id}
              optionName={optionName}
              name={name}
              index={index}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFilterItemSelect(e, option, callback)
              }
              checked={checked}
              setChecked={setChecked}
            />
          );
        }}
      </List>
    );
  }, [
    data?.data?.data?.[optionName as keyof IKeys],
    isLoading,
    isFetching,
    isError,
  ]);

  return (
    <React.Fragment>
      <InputGroup className={cn(classes['filters-item'], 'mb-2')}>
        <div className="w-100 d-flex align-items-center justify-content-between mb-1">
          <Form.Label id="creators" className={classes['filters-label']}>
            {optionName} {getEmoji(optionName)}
            <sup className={classes['filters-sup']}>({total})</sup>
          </Form.Label>
          {admin.isLoggedIn && (
            <LightButton onClick={() => setShowModal(true)} text="✍🏻 Edit" />
          )}
          <LightButton onClick={onReset} text="Reset" />
        </div>
        <OptionsList />
      </InputGroup>
      <NewOptionModal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        optionName={optionName}
        optionData={data?.data?.data?.[optionName as keyof IKeys]!}
      />
    </React.Fragment>
  );
}

export default React.memo(FilterOption);
