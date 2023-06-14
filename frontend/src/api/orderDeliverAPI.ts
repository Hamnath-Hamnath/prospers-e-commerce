import { _baseURL } from '../constant/api';


export const orderDeliverAPI = async (id: string | number) => {
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const response: any | {} = await fetch(`${_baseURL}/orders/${id}/deliver`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body : JSON.stringify({})
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the  order deliver api ==> ', error);
  }
};
