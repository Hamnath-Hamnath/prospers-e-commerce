import { _baseURL } from '../constant/api';


export const getMyListAPI = async () => {
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
      console.log(user.token)
    }
    const response: any | {} = await fetch(`${_baseURL}/orders/myorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the my order list api ==> ', error);
  }
};
