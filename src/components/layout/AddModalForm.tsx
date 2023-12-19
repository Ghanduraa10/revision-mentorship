import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createProduct } from '@/pages/api/product/productApi';
import { Product, productSchema } from '@/schema/product';

const AddModalForm = () => {
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState(0);
  const [productDescription, setProductDescription] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createProductMutation = useMutation<any, Error, any, unknown>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.refetchQueries({ queryKey: ['data'] });
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddProduct: SubmitHandler<Product> = (data) => {
    try {
      createProductMutation.mutate({
        title: productName,
        description: productDescription,
        price: productPrice,
      });
    } catch (error) {
      console.error('Error In Create Product', error);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className='rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Add Product
      </button>
      {isOpen && (
        <div>
          <div className='fixed inset-0 bg-black/50' onClick={closeModal}></div>
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow '
          >
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='dark:text-dark text-xl font-semibold'>
                Add Product
              </h3>
              <button
                type='button'
                className='dark:hover:bg-white-600 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:text-white'
                data-modal-hide='default-modal'
                onClick={closeModal}
              >
                <X />
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <div className='mb-2 mt-5 px-5'>
              <label className='dark:text-dark mb-2 block text-sm font-medium'>
                Title
              </label>
              <input
                {...register('title')}
                type='text'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
              {errors.title && (
                <p className='text-red-500'>{errors.title.message}</p>
              )}
            </div>
            <div className='mb-2 mt-5 px-5'>
              <label className='dark:text-dark mb-2 block text-sm font-medium'>
                Description
              </label>
              <input
                type='text'
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
            </div>
            <div className='mb-2 mt-5 px-5'>
              <label className='dark:text-dark mb-2 block text-sm font-medium'>
                Price
              </label>
              <input
                {...register('price')}
                type='number'
                value={productPrice}
                onChange={(e) => setProductPrice(parseInt(e.target.value))}
                className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
              {errors.price && (
                <p className='text-red-500'>{errors.price.message}</p>
              )}
            </div>
            <div className='mb-2 mt-5 flex justify-end'>
              <button
                type='button'
                className='mb-2 me-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='mb-2 me-2 flex items-center rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                Add Product
                <div role='status'>{isLoading && <Loader2 />}</div>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddModalForm;
