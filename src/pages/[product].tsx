import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { EditFormModal } from '@/components/layout/EditModalForm';
import StarIcon from '@/components/svgs/StarIcon';

import {
  deleteProduct,
  fetchProductDetail,
} from '@/pages/api/product/productApi';

export default function ProductDetail() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const productId = router.query.product as string;

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['data', productId],
    queryFn: () => fetchProductDetail(+productId),
  });

  const deleteProductMutation = useMutation<any, Error, number, unknown>({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['products'] });
        await queryClient.refetchQueries({ queryKey: ['data'] });
        router.push('/home');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      router.push('/home');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) {
    return (
      <span>
        <Loader2 />
      </span>
    );
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className='mt-10 flex justify-center'>
        <div className='w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
          <div className='px-5 py-5 pb-5'>
            <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              {products?.data.title}
            </h5>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              {products?.data.description}
            </p>
            <div className='mb-5 mt-2.5 flex items-center'>
              <div className='flex items-center space-x-1 rtl:space-x-reverse'>
                <StarIcon className='text-yellow-300' />
                <StarIcon className='text-yellow-300' />
                <StarIcon className='text-yellow-300' />
                <StarIcon className='text-yellow-300' />
                <StarIcon className='text-gray-300' />
              </div>
              <span className='ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800'>
                5.0
              </span>
            </div>
            <div className='flex items-center justify-end'>
              {products && <EditFormModal products={products} />}
              <button
                type='button'
                className='mb-2 me-2 flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={() => handleDelete(products?.data.id)}
                disabled={isLoading}
              >
                Delete
                <div role='status'>{isLoading && <Loader2 />}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
