import { _productURL } from '../constant/api';

export const createProductAPI = async (data: {} | any) => {
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const response: any | {} = await fetch(`${_productURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the product create api ==> ', error);
  }
};
