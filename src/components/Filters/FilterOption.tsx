import React, { useCallback, useEffect, useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
// import { FixedSizeList as List } from 'react-window';

import { useCreators } from '../../api/creators';
import { useCategories } from '../../api/categories';
import { onFilterItemSelect } from '../../helpers/onIFiltertemSelect';
import { prepareName } from '../../helpers/prepareName';
import { IOption, IFilterOptionProps } from '../../interfaces/interfaces';
import FilterSkeleton from '../Skeletons/FilterSkeleton';
import List from './OptionsList';

import './filters.module.css';
import OptionsItem from './OptionsItem';

function FilterOption({ setOption, option, optionName }: IFilterOptionProps) {
  const { data, isLoading } = optionName === 'creators' ? useCreators() : useCategories();
  const emoji = optionName === 'creators' ? '👥' : '📚';
  const optionData = data?.data?.data?.[optionName];
  const total: number = data?.data?.data?.total || 0;

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

      return (
        <List total={total} optionData={optionData}>
          {({ data, index, style }) => {
            const { name, _id } = data[index];
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
    [optionData]
  );

  return (
    <InputGroup className="filters-item mb-2">
      <div className="w-100 d-flex align-items-center justify-content-between mb-1">
        <Form.Label id="creators" className="filters-label">
          {optionName} {emoji}
          <sup>({total})</sup>
        </Form.Label>
        <Button variant="light" size="sm" onClick={() => setOption([])}>
          🗑️ Clear all
        </Button>
      </div>
      {isLoading ? <FilterSkeleton /> : <OptionsList option={option} />}
    </InputGroup>
  );
}

export default React.memo(FilterOption);
