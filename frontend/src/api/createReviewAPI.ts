import { _productURL } from '../constant/api';

export const createReviewAPI = async (productID: any, review:any) => {
  console.log(productID,review)
  try {
    let user: {} | any = {};
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const response: any | {} = await fetch(`${_productURL}/${productID}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body:JSON.stringify(review)
    });
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log('Error occurred in the product review create api ==> ', error);
  }
};
