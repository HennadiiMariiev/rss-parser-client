import React, { useCallback, useEffect, useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';

import { useAppContext } from '../../providers/ContextProvider';
import { useGetCreators } from '../../api/creators';
import { useGetCategories } from '../../api/categories';
import { onFilterItemSelect } from '../../helpers/onIFilterItemSelect';
import { addNoOptionItem } from '../../helpers/addNoOptionItem';
import { IFilterOptionProps, IOption } from '../../interfaces/interfaces';
import NewOptionModal from '../Modal/EditOptionModal';
import OptionsItem from './OptionsItem';
import FilterSkeleton from '../Skeletons/FilterSkeleton';
import List from './OptionsList';

import './filters.module.css';

function FilterOption({ setOption, option, optionName }: IFilterOptionProps) {
  const emoji = optionName === 'creators' ? '👥' : '📚';
  const { data, isLoading, isError } = optionName === 'creators' ? useGetCreators() : useGetCategories();
  const [showModal, setShowModal] = useState(false);
  const { admin } = useAppContext();
  let optionData: IOption[] = addNoOptionItem(data?.data?.data?.[optionName], optionName);
  const total: number = data?.data?.data?.total! + 1 || 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => onFilterItemSelect(e, option, setOption);

  const OptionsList = useCallback(
    ({ option }: { option: string[] }) => {
      const indexes = option.map((item) => optionData.findIndex(({ _id }: { _id: string }) => _id === item));
      const [checked, setChecked] = useState(Array.from({ length: total }, (_, idx) => indexes.includes(idx)));

      useEffect(() => {
        if (!option.length) setChecked((prev) => prev.map(() => false));
        setChecked((prev) => {
          indexes.forEach((idx) => (prev[idx] = true));
          return prev;
        });
      }, [option]);

      if (isLoading && !isError) {
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
    },
    [data?.data?.data?.[optionName], isLoading, isError]
  );

  return (
    <React.Fragment>
      <InputGroup className="filters-item mb-2">
        <div className="w-100 d-flex align-items-center justify-content-between mb-1">
          <Form.Label id="creators" className="filters-label">
            {optionName} {emoji}
            <sup>({total})</sup>
          </Form.Label>
          {admin.isLoggedIn && (
            <Button variant="light" size="sm" onClick={() => setShowModal(true)}>
              ✍🏻 Edit
            </Button>
          )}
          <Button variant="light" size="sm" onClick={() => setOption([])}>
            Reset
          </Button>
        </div>
        <OptionsList option={option} />
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
