import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { patchData } from '@/pages/api/product/productApi';
import { Product } from '@/schema/product';

type cardListProps = {
  products: { data: Product };
};

export function EditFormModal({ products }: cardListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: 0,
  });

  React.useEffect(() => {
    setFormData({
      title: products?.data.title,
      description: products?.data.description as string,
      price: products?.data.price,
    });
  }, [products]);

  const editProductMutations = useMutation<any, Error, any, unknown>({
    mutationFn: () =>
      patchData({
        product: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
        },
        id: products.data.id,
      }),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['data', { id: data.data.id }], data.data);
      queryClient.refetchQueries({ queryKey: ['data', null] });
      router.push('/home');
    },
  });

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const updatedData = {
      id: products.data.id,
      product: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
      },
    };
    editProductMutations.mutateAsync(updatedData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className='mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        >
          Edit Product
        </button>
        {isOpen && (
          <div>
            <div
              className='fixed inset-0 bg-black/50'
              onClick={closeModal}
            ></div>
            <form
              onSubmit={handleFormSubmit}
              className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow '
            >
              <div className='flex justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
                <h3 className='dark:text-dark text-xl font-semibold'>
                  Edit Product
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
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mb-2 mt-5 px-5'>
                <label className='dark:text-dark mb-2 block text-sm font-medium'>
                  Description
                </label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mb-2 mt-5 px-5'>
                <label className='dark:text-dark mb-2 block text-sm font-medium'>
                  Price
                </label>
                <input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
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
                  Edit Product
                  <div role='status'>{isLoading && <Loader2 />}</div>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
