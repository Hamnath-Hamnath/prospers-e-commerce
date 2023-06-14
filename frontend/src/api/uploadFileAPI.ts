import { _baseURL } from '../constant/api';

export const uploadFileAPI = async (image: any) => {
  try {
    const response: any | {} = await fetch(`${_baseURL}/uploads`, {
      method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${user.token}`,
    //   },
      body:image
    });
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log('Error occured in the file upload api ==> ', error);
  }
};
