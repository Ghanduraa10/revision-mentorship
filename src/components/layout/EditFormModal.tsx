import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useQueryClient, useMutation } from 'react-query';
import { patchData } from '@/pages/api/product/productApi';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function EditFormModal({ product }: any) {
  const [isLoading, setIsLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: 0,
    image: '',
  });

  React.useEffect(() => {
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  }, [product]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateProductMutation = useMutation(patchData, {
    onSuccess: async (data) => {
      try {
        await queryClient.setQueryData(['data', { id: data.id }], data);
        await queryClient.refetchQueries('data');
        setIsLoading(false);
      } catch (error) {
        console.error('Error updating product:', error);
        setIsLoading(false);
      }
    },
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const updatedData = {
        id: product.id,
        product: {
          title: formData.title,
          description: formData.description,
          price: parseInt(formData.price.toString()),
          image: formData.image,
        },
      };
      setIsLoading(true);
      await updateProductMutation.mutateAsync(updatedData);
      toast.success('Successfully Edit Data!');
      router.push(`/app`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <Dialog.Root>
        <Dialog.Trigger className='hover: bg-gray rounded-200 p-2'>
          Edit
        </Dialog.Trigger>
        <Dialog.Portal>
          <form onSubmit={handleFormSubmit}>
            <Dialog.Overlay className='fixed inset-0 bg-black/50' />
            <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl'>Edit Product</h2>
                <Dialog.Close>
                  <Cross1Icon />
                </Dialog.Close>
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='large-input'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Title
                </label>
                <input
                  type='text'
                  defaultValue={formData.title}
                  onChange={handleInputChange}
                  name='title'
                  id='large-input'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='large-input'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Description
                </label>
                <input
                  type='text'
                  defaultValue={formData.description}
                  onChange={handleInputChange}
                  name='description'
                  id='large-input'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='large-input'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Price
                </label>
                <input
                  type='number'
                  defaultValue={formData.price}
                  onChange={handleInputChange}
                  name='price'
                  id='large-input'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mt-6'>
                <label
                  htmlFor='large-input'
                  className='dark:text-dark mb-2 block text-sm font-medium text-gray-900'
                >
                  Image
                </label>
                <input
                  type='text'
                  defaultValue={formData.image}
                  onChange={handleInputChange}
                  name='image'
                  id='large-input'
                  className='sm:text-md bg-white-50 dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className=' mt-6 flex justify-end'>
                <button
                  type='submit'
                  className='mb-2 me-2 flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
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
                  Save
                </button>
              </div>
            </Dialog.Content>
          </form>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
