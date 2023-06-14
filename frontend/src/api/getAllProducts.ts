import { _productURL } from '../constant/api';

export const getAllProducts = async (Keyword:string,pageNumber:string|number) => {
  try {
    const response = await fetch(`${_productURL}?search=${Keyword}&pageNumber=${pageNumber}`);
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log('Error occured in the getAllProducts api ==> ', error);
  }
};
