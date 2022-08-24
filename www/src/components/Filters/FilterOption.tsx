import React, { useCallback, useEffect, useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

import { useAppContext } from '../../providers/ContextProvider';
import { useGetCreators } from '../../api/creators';
import { useGetCategories } from '../../api/categories';
import { onFilterItemSelect } from '../../helpers/onIFilterItemSelect';
import { addNoOptionItem } from '../../helpers/addNoOptionItem';
import { IFilterOptionProps, IOption } from '../../interfaces/interfaces';
import { resetOption } from '../../helpers/resetOption';
import { getEmoji } from '../../helpers/getEmoji';
import { getOptionIndexes } from '../../helpers/findCallback';
import NewOptionModal from '../Modal/EditOptionModal';
import OptionsItem from './OptionsItem';
import FilterSkeleton from '../Skeletons/FilterSkeleton';
import List from './OptionsList';
import LightButton from '../Buttons/LightButton';

import './filters.module.css';

function FilterOption({ optionName }: IFilterOptionProps) {
  const [showModal, setShowModal] = useState(false);
  const { admin, setCreators, setCategories, creators, categories } =
    useAppContext();
  const { data, isLoading, isError, isFetching, refetch } =
    optionName === 'creators' ? useGetCreators() : useGetCategories();
  let optionData: IOption[] = addNoOptionItem(
    data?.data?.data?.[optionName],
    optionName,
  );
  const total: number = data?.data?.data?.total! + 1 || 0;

  const onReset = useCallback(() => {
    optionName === 'creators'
      ? resetOption(creators, setCreators, refetch)
      : resetOption(categories, setCategories, refetch);
  }, [refetch, optionName, setCreators, setCategories, creators, categories]);

  const OptionsList = useCallback(() => {
    const indexes =
      optionName === 'creators'
        ? getOptionIndexes(creators, optionData)
        : getOptionIndexes(categories, optionData);
    const [checked, setChecked] = useState(
      Array.from({ length: total }, (_, idx) => indexes.includes(idx)),
    );

    useEffect(() => {
      setChecked((prev) => {
        indexes.forEach((idx) => (prev[idx] = true));
        return prev;
      });
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      optionName === 'creators'
        ? onFilterItemSelect(e, creators, setCreators)
        : onFilterItemSelect(e, categories, setCategories);
    };

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
              onChange={onChange}
              checked={checked}
              setChecked={setChecked}
            />
          );
        }}
      </List>
    );
  }, [data?.data?.data?.[optionName], isLoading, isFetching, isError]);

  return (
    <React.Fragment>
      <InputGroup className="filters-item mb-2">
        <div className="w-100 d-flex align-items-center justify-content-between mb-1">
          <Form.Label id="creators" className="filters-label">
            {optionName} {getEmoji(optionName)}
            <sup>({total})</sup>
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
        optionData={data?.data?.data?.[optionName]}
      />
    </React.Fragment>
  );
}

export default React.memo(FilterOption);
