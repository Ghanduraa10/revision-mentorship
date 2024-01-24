
import { AxiosResponse } from 'axios';

import { api } from "@/lib/api";

import { Product } from '@/schema/product';

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

export const createProduct = async(newProduct : Product) : Promise<AxiosResponse<Product, Product>>  => {
    const response = await api.post('/api/product', newProduct , {
      headers : {
        'Content-Type': 'application/json',
      }
    });
    return response
}

export const patchData = async ({product,id}: {product: Product;id: number;}) : Promise<AxiosResponse<any> | undefined> => {
  try {        
    const newData = await api.patch(`/api/product/${id}`, product)
    return newData
  } catch (error) {
    console.error(error);
  }
}









