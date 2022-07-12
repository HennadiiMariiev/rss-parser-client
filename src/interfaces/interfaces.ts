import { ListChildComponentProps } from 'react-window';
import React, { ComponentType } from 'react';

export interface IHtmlPluginOptions {
  template?: string;
  title?: string;
  jsPath?: string[];
  cssPath?: string[];
  faviconPath?: string[];
}

export interface IOptions {
  limit?: number;
  page?: number;
  sortBy?: string;
  search?: string;
  sortOrder?: string;
  creators: string[];
  categories: string[];
}

export interface IOption {
  _id: string;
  name: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ICategoriesProps {
  setCategories: Function;
  categories: string[];
}

export interface ICreator {
  _id: string;
  name: string;
}

export interface IFilterOptionProps {
  setOption: Function;
  option: string[];
  optionName: string;
}

export interface IOptionsListProps {
  total: number;
  optionData: IOption[];
  children: ComponentType<ListChildComponentProps<IOption[]>>;
}

export interface IOptionsItemProps {
  style: React.CSSProperties;
  optionName: string;
  _id: string;
  name: string;
  index: number;
  onChange: Function;
  checked: boolean[];
  setChecked: Function;
}

export interface IUsePostsProps {
  pagination: IPagination;
  sortBy: string;
  sortOrder: string;
  search?: string;
  creators: string[];
  categories: string[];
}

export interface ICreatorsProps {
  setCreators: Function;
  creators: string[];
}

export interface IPagination {
  page: number;
  pageCount: number;
  total: number;
  limit: number;
}

export interface IFiltersProps {
  setSortBy: Function;
  setSortOrder: Function;
  setSearch: Function;
  creators: string[];
  categories: string[];
  setCategories: Function;
  setCreators: Function;
  pagination: IPagination;
  setPagination: Function;
}

export interface IMobileMenuProps {
  show: boolean;
  setShow: Function;
  children: React.ReactNode;
}

export interface IPaginationProps {
  pagination: IPagination;
  setPagination: Function;
}

export interface IPostsProps {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  posts: IPost[];
}

export interface IPost {
  categories: { _id: string, name: string }[];
  createdAt: Date;
  creator: { _id: string, name: string };
  description: string;
  image: string;
  link: string;
  publication_date: Date;
  title: string;
  updatedAt: Date;
  _id: string;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export interface IQueryProviderProps {
  children: React.ReactNode;
}
