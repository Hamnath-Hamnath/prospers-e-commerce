import { _productURL } from '../constant/api';

export const updateProductAPI = async (productDetails: any) => {
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const response: any | {} = await fetch(`${_productURL}/${productDetails._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body:JSON.stringify(productDetails)
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occurred in the product update by admin api ==> ', error);
  }
};
