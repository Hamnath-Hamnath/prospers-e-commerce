import { _productURL } from '../constant/api';

export const topProductAPI = async (id: number | any) => {
  try {
    const response = await fetch(`${_productURL}/top`);
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the get top product api ==> ', error);
  }
};
