export const defaultAdminValue = { name: '', email: '', accessToken: '', refreshToken: '', isAuthInProgress: false, isLoggedIn: false, isEmailVerified: true };

export const defaultContextValue = {
    admin: defaultAdminValue,
    message: {
      text: '',
      isError: false,
      show: false,
    },
    creators: [],
    categories: [],
    setAdmin: () => {},
    setMessage: () => {},
    setCreators: () => {},
    setCategories: () => {},
  };

export const defaultMessageValue = {
    text: "", 
    isError: false,
    show: false,
};