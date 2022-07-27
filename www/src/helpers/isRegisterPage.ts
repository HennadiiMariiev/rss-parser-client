import { Location } from 'react-router-dom';

export const isRegisterPage = (location: Location) => location?.pathname.includes('register');
