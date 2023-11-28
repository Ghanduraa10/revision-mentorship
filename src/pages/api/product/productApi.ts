import axios from "axios";
import { z } from 'zod';




// Validation Schema

export const validationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.number().min(1, { message: 'Price is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;


// Axios Request To API

export const fetchProduct = async () => {
  const response = await axios.get('/api/product');
  return response.data;
};

export const fetchProductDetail = async (id : number) => {
  const response = await axios.get(`/api/product/${id}`);
  return response.data;
};

export const deleteProduct = async (id: number) => {
 const response = await axios.delete(`/api/product/${id}`);
  return response
};

export const createProduct = async (newProduct: ValidationSchema) => {
  try {
    await axios.post('/api/product', newProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

export const patchData = async ({product,id,}: {product: any;id: number;}): Promise<any> => {
  try {    
    const newData = await axios.patch(`/api/product/${id}`, product)
    return newData
  } catch (error) {
    console.log(error);
  }

};

