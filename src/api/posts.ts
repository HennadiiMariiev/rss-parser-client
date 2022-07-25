import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { prepareParams } from '../helpers/prepareParams';
import { IOptions, IPostsResponse, IUsePostsProps, IAddPostResponse, INewPostFormValues } from '../interfaces/interfaces';
import { QUERY_OPTIONS } from '../../config/vars';
import instance from './instance';

function getAllPosts(options : IOptions) {
  const params = prepareParams(options);
  return instance.get<IPostsResponse>('/posts', {params} as AxiosRequestConfig);
}

function deleteSinglePost(_id : string) {
  return instance.delete(`/posts/${_id}`);
}

function addPost(post : INewPostFormValues) {
  return instance.post<IAddPostResponse>('/posts', post as AxiosRequestConfig)
}

function updatePost(post : INewPostFormValues) {
  return instance.patch<IAddPostResponse>(`/posts/${post?._id}`, post as AxiosRequestConfig)
}

export function useGetPosts({pagination, sortBy, sortOrder, search, creators, categories} : IUsePostsProps) {
  const {page, limit} = pagination;
  return useQuery(
    ['posts', page, limit, sortBy, sortOrder, search, creators, categories],
    () =>
      getAllPosts({ page, limit, sortBy, sortOrder, search, creators, categories }),
      QUERY_OPTIONS
  );
}

export function useDeleteSinglePost() {
  const queryClient = useQueryClient();
  return useMutation(deleteSinglePost, {
    onSuccess: () => queryClient.invalidateQueries('posts')
  });
}

export function useAddPost() {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: () => queryClient.invalidateQueries('posts')
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation(updatePost, {
    onSuccess: () => queryClient.invalidateQueries('posts')
  });
}