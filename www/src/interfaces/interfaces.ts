import { ListChildComponentProps } from 'react-window';
import React, { ComponentType } from 'react';
import { UseFormHandleSubmit, UseFormRegister, SubmitHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';

export interface IHtmlPluginOptions {
  template?: string;
  title?: string;
  jsPath?: string[];
  cssPath?: string[];
  faviconPath?: string[];
  isProduction?: boolean;
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
  createdAt: Date;
  updatedAt: Date;
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
  optionName: string;
}

export interface IOptionsListProps {
  total: number;
  optionData: IOption[];
  height?: number;
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

export interface IOptionsModalItemProps {
  style: React.CSSProperties;
  optionName: string;
  _id: string;
  name: string;
  checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
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
  total: number | undefined;
  limit: number;
}

export interface IFiltersProps {
  setSortBy: Function;
  setSortOrder: Function;
  setSearch: Function;
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
  posts: IPost[] | undefined;
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

export interface IPostsResponse {
  data: {
    posts: IPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    }
    message: string;
  };
}
export interface IAddOptionResponse {
  data: IOption;
  message: string;
}

export interface IAddPostResponse {
  data: IPost;
  message: string;
}

export interface IGetOptionsResponse {
  data: {
    creators?: IOption[];
    categories?: IOption[];
    total: number;
  };
  message: string;
}

export interface IDeleteOptionResponse {
  message: string;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export interface IQueryProviderProps {
  children: React.ReactNode;
}

export interface IFormMarkupProps {
  onSubmit: SubmitHandler<IFormValues>;
  handleSubmit: UseFormHandleSubmit<IFormValues>;
  register: UseFormRegister<IFormValues>;
  errors: FieldErrorsImpl<DeepRequired<IFormValues>>;
  isSignLoading: boolean;
  isSignError: boolean;
  signError: unknown;
}

export interface IFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface ISignButton {
  isRegistration: boolean;
  isSignLoading: boolean;
}

export interface IToastMessageProps {
  error?: unknown;
  message?: string; 
}

export interface IAdminState {
    name: string,
    email: string,
    isEmailVerified: boolean,
    isLoggedIn?: boolean,
    accessToken?: string;
    refreshToken?: string;
    isAuthInProgress?: boolean,
}

export interface IAppContext {
  admin: IAdminState;
  message: IMessage;
  creators: string[];
  categories: string[];
  setAdmin: React.Dispatch<
    React.SetStateAction<{
      name: string,
      email: string,
      isLoggedIn?: boolean,
      accessToken?: string;
      refreshToken?: string;
      isAuthInProgress?: boolean,
      isEmailVerified: boolean,
    }>
  >;
  setCreators: React.Dispatch<React.SetStateAction<string[]>>;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAdmin {
  name: string | undefined;
  email: string;
  emailVerified: boolean;
}

export type TError = null | string;
export interface IAdminResponse {
  data: {
    admin: IAdminState;
    tokens: ITokens;
    message: string;
  };
}

export interface ISinglePostProps {
  post: IPost;
  setModal : React.Dispatch<React.SetStateAction<{
    show: boolean;
    _id: string;
  }>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<{
    show: boolean;
    post: IPost | undefined;
  }>>;
  isLoading: boolean;
}

export interface IResponseError {
  response: {
    data: {
      message: string;
    }
  }
}

export interface IDialogModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onConfirm?: () => void;
  post?: IPost;
}

export interface IEditPostModalProps {
  editModal: {
    show: boolean,
    post: IPost | undefined,
  };
  onCloseModal: () => void;
  updatePost: UseMutationResult<AxiosResponse<IAddPostResponse, any>, unknown, INewPostFormValues, unknown>
}

export interface IEditOptionModalProps {
  optionName: string;
  optionData: IOption[];
  showModal: boolean;
  onCloseModal: () => void;
}

export interface IOptionForm {

  name: string;
}

export interface IMessage {
  text: string | null | unknown;
  isError: boolean;
  show: boolean;
}

export interface IOptionsModalListProps {
  data: IOption[];
  optionName: string;
  checked: string[];
  height?: number;
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface IPostModalMarkupProps {
  show: boolean;
  loading: boolean;
  onHide: () => void;
  OptionsList: () => JSX.Element;
  register: UseFormRegister<INewPostFormValues>;
  errors: FieldErrorsImpl<DeepRequired<INewPostFormValues>>;
  creatorsOptions: JSX.Element[];
  onSubmit: SubmitHandler<INewPostFormValues>;
  handleSubmit: UseFormHandleSubmit<INewPostFormValues>;
  isEdit?: boolean; 
}

export interface INewPostFormValues {
  _id?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  creator: string;
  categories: string[];
  publication_date?: Date;
}