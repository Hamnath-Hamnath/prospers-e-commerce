import { _baseURL } from '../constant/api';

export const deleteUserAPI = async (id:string|number) => {
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const response: any | {} = await fetch(`${_baseURL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occurred in the user delete api ==> ', error);
  }
};
