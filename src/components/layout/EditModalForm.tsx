import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { patchData } from '@/pages/api/product/productApi';
import { Product } from '@/schema/product';

type cardListProps = {
  products: { data: Product };
};

export function EditFormModal({ products }: cardListProps) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: products.data.title,
      description: products.data.description,
      price: products.data.price,
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: 0,
  });

  React.useEffect(() => {
    setFormData({
      title: products.data.title,
      description: products.data.description as string,
      price: products.data.price as number,
    });
    setValue('title', products.data.title);
    setValue('description', products.data.description);
    setValue('price', products.data.price);
  }, [products, setValue]);

  const editProductMutations = useMutation<any, Error, any, unknown>({
    mutationFn: () =>
      patchData({
        product: {
          title: formData.title,
          description: formData.description,
          price: formData.price as number,
        },
        id: products.data.id as number,
      }),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['data', { id: data.id }], data);
      queryClient.refetchQueries({ queryKey: ['data', null] });
      setLoading(false);
      router.push('/home');
    },
  });

  const handleFormSubmit: SubmitHandler<any> = () => {
    const updatedData = {
      id: products.data.id,
      product: {
        title: formData.title,
        description: formData.description,
        price: formData.price as number,
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

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger className='mb-2 me-2 flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Edit Product
        </Dialog.Trigger>
        <Dialog.Portal>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Dialog.Overlay className='fixed inset-0 bg-black/50' />
            <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow'>
              <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
                <h3 className='dark:text-dark text-xl font-semibold'>
                  Edit Product
                </h3>
                <Dialog.Close>
                  <X />
                </Dialog.Close>
              </div>
              <div className='mb-2 mt-5 px-5'>
                <label className='dark:text-dark mb-2 block text-sm font-medium'>
                  Title
                </label>
                <input
                  {...register('title')}
                  type='text'
                  name='title'
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mb-2 mt-5 px-5'>
                <label className='dark:text-dark mb-2 block text-sm font-medium'>
                  Description
                </label>
                <input
                  {...register('description')}
                  type='text'
                  name='description'
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mb-2 mt-5 px-5'>
                <label className='dark:text-dark mb-2 block text-sm font-medium'>
                  Price
                </label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type='number'
                  name='price'
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mb-2 mt-5 flex justify-end'>
                <Dialog.Close className='mb-2 me-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                  Cancel
                </Dialog.Close>
                <button
                  type='submit'
                  className='mb-2 me-2 flex items-center rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                  Edit Product
                  <div role='status'>{isLoading && <Loader2 />}</div>
                </button>
              </div>
            </Dialog.Content>
          </form>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
