import { _baseURL } from '../constant/api';

export const payPalClient = (): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await fetch(`${_baseURL}/config/paypal`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error('Response was not in JSON format');
      }
    } catch (error) {
      reject(error);
    }
  });
};
