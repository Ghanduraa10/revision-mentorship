import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import {
  createProduct,
  validationSchema,
} from '@/pages/api/product/productApi';

type ValidationSchema = z.infer<typeof validationSchema>;

export default function AddFormModal() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const createProductMutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      queryClient.refetchQueries('data');
      toast.success('Successfully Add Data!');
      reset();
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      setIsLoading(false);
    },
  });

  const onCreateProduct = async (data: ValidationSchema) => {
    try {
      setIsLoading(true);
      await createProductMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className='text-white-800 inline-flex items-center rounded bg-gray-300 px-4 py-2 font-bold hover:bg-gray-400'>
          Add Product
        </Dialog.Trigger>
        <Dialog.Portal>
          <form onSubmit={handleSubmit(onCreateProduct)}>
            <Dialog.Overlay className='fixed inset-0 bg-black/50' />
            <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl'>Add Product</h2>
                <Dialog.Close>
                  <Cross1Icon />
                </Dialog.Close>
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='title'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Title
                </label>
                <input
                  {...register('title')}
                  type='text'
                  id='title'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
                {errors.title && (
                  <p className='text-red-500'>{errors.title.message}</p>
                )}
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='description'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Description
                </label>
                <input
                  {...register('description')}
                  type='text'
                  id='description'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
                {errors.description && (
                  <p className='text-red-500'>{errors.description.message}</p>
                )}
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='price'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Price
                </label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type='number'
                  id='price'
                  defaultValue={0}
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
                {errors.price && (
                  <p className='text-red-500'>{errors.price.message}</p>
                )}
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='image'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Image
                </label>
                <input
                  {...register('image')}
                  type='text'
                  id='image'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
                {errors.image && (
                  <p className='text-red-500'>{errors.image.message}</p>
                )}
              </div>
              <div className='mt-6 flex justify-end'>
                <button
                  type='button'
                  className='mb-2 me-2 flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                  onClick={handleSubmit(onCreateProduct)}
                >
                  {' '}
                  {isLoading && (
                    <svg
                      aria-hidden='true'
                      className='mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  )}
                  Save Change
                </button>
              </div>
            </Dialog.Content>
          </form>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
