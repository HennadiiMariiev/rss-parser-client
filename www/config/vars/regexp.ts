export const namePattern = /^([A-z]+([ ]?[.]?[ ]?[a-z]?['-]?[A-z]+)*){1,50}$/;
export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,_-])[A-Za-z\d@$!%*?&.,_-]{6,12}$/;
export const LHLinkPattern = /^((https:)\/\/)?((?:www)\.)?((?:lifehacker\.com))(\/(?:[\w\-]+\?)?)([\w\-]+)(\S+)?$/;
export const imageUrlPattern = /^((?:(?:https?:\/\/))?[-a-zA-Z0-9@:%_\+.~#?&,//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|svg)/g;
