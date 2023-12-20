
import { AxiosResponse } from 'axios';

import { api } from "@/lib/api";

import { Product } from '@/schema/product';

type newProductProps = {
  products: Product[];
};


export const fetchProduct = async () => {
  try {
    const response = await api.get('/api/product');
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const fetchProductDetail = async (id : number) => {
  try {
    const response = await api.get(`/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const deleteProduct = async (id: number) : Promise<AxiosResponse<number, number>> =>  {
    const response = await api.delete(`/api/product/${id}`);
    return response;
};

export const createProduct = async(newProduct : newProductProps) : Promise<AxiosResponse<newProductProps, newProductProps>>  => {
    const response = await api.post('/api/product', newProduct);
    return response
}

export const patchData = async ({product,id}: {product: any;id: number;}) : Promise<AxiosResponse<any> | undefined> => {
  try {    
    const newData = await api.patch(`/api/product/${id}`, product)
    return newData
  } catch (error) {
    console.error(error);
  }
}









