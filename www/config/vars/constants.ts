const POSTS_LIMIT = 12;
const MOBILE_SLICE_COUNT = 7;
const DEFAULT_SLICE_COUNT = 15;
const SIGNUP_SUCCESS_MESSAGE = "Please, check your email to complete registration";

const QUERY_OPTIONS = {
  keepPreviousData: true,
  staleTime: 1000 * 60 * 30,
};

export { POSTS_LIMIT, MOBILE_SLICE_COUNT, DEFAULT_SLICE_COUNT, QUERY_OPTIONS, SIGNUP_SUCCESS_MESSAGE };
