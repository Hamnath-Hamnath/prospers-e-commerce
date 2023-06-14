import { _baseURL } from '../constant/api';

export const loginAPI = async (
  email: string | any,
  password: string | number | any
) => {
  try {
    const response: any | {} = await fetch(`${_baseURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the user login api ==> ', error);
  }
};
