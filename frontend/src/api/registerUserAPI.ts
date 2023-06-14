import { _baseURL } from '../constant/api';

export const registerUserAPI = async (
  name: string | any,
  email: string | any,
  password: string | number | any
) => {
  try {
    const response: any | {} = await fetch(`${_baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the user register api ==> ', error);
  }
};
