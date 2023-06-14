import { _productURL } from '../constant/api';

export const getProduct = async (id: number | any) => {
  try {
    const response = await fetch(`${_productURL}/${id}`);
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the getAllProducts api ==> ', error);
  }
};
