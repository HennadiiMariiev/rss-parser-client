export const defaultAdminValue = { name: '', email: '', accessToken: '', refreshToken: '', isAuthInProgress: false, isLoggedIn: false, isEmailVerified: true };

export const defaultContextValue = {
    admin: defaultAdminValue,
    message: {
      text: '',
      isError: false,
      show: false,
    },
    setAdmin: () => {},
    setMessage: () => {},
  };

export const defaultMessageValue = {
    text: "", 
    isError: false,
    show: false,
};