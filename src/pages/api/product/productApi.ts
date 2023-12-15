
import { AxiosResponse } from 'axios';

import { api } from "@/lib/api";


export const fetchProduct = async () => {
  const response = await api.get('/api/product');
  return response.data;
};

export const fetchProductDetail = async (id : number) => {
  const response = await api.get(`/api/product/${id}`);
  return response.data;
};

export const deleteProduct = async (id: number) : Promise<AxiosResponse<any, any>> =>  {
  const response = await api.delete(`/api/product/${id}`);
  return response;
};




