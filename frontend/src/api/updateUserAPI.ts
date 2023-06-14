import { _baseURL } from '../constant/api';

export const updateUserAPI = async (userDetails: any) => {
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const response: any | {} = await fetch(`${_baseURL}/users/${userDetails._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body:JSON.stringify(userDetails)
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the user update by admin api ==> ', error);
  }
};
