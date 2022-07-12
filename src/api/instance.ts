import axios from 'axios';
import { MODE } from '../../config/vars';

const API_URL = 'www.google.com';
const URL = MODE ? 'localhost:4000' : API_URL;

export default axios.create({
  baseURL: `http://${URL}/api`,
});
