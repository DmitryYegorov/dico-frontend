import { http } from '../http';
import * as Types from '../../types';

export const register = (data: Types.Http.Auth.Requests.SignUp) => http.post('/auth/sign-up', data);
