import EditFormModal from '@/components/layout/EditFormModal';
import {
  fetchProductDetail,
  deleteProduct,
} from '@/pages/api/product/productApi';
import { Card, Inset, Button } from '@radix-ui/themes';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import React from 'react';
import { Trash } from 'lucide-react';
import { Pencil1Icon } from '@radix-ui/react-icons';
import toast, { Toaster } from 'react-hot-toast';

export default function DetailProduct(id: number) {
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isDelete, setIsDelete] = React.useState(false);

  const { data, isLoading, error } = useQuery(['data', +query.product!], () =>
    fetchProductDetail(+query.product!)
  );

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries('products');
        await queryClient.refetchQueries('data');
        setIsDelete(false);
      } catch (error) {
        console.error('Error deleting product:', error);
        setIsDelete(false);
      }
    },
  });

  const handleDelete = async (id: number) => {
    try {
      setIsDelete(true);
      await deleteProductMutation.mutateAsync(id);
      toast.success('Success For Delete Product');
      router.push('/app');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return (
      <>
        <div>Error</div>;
      </>
    );
  }

  return (
    <div className='mt-20 flex justify-center'>
      <Card
        size='2'
        className='flex max-w-sm justify-start rounded-md border-2 border-gray-800'
      >
        <Inset clip='padding-box' side='top' pb='current'>
          <img src={data?.data.image} alt='Bold typography' />
        </Inset>
        <h5 className='mt-2 px-2 text-xl font-semibold tracking-tight text-gray-900'>
          {data?.data.title}
        </h5>
        <p className='mb-5 px-2 text-base text-gray-900 sm:text-lg'>
          {data?.data.description}
        </p>
        <div className='mb-5 mt-2.5 flex items-center px-2'>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <span className='ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800'>
            5.0
          </span>
        </div>
        <div className='flex items-center justify-between px-2'>
          <span className='text-3xl font-bold text-gray-900'>
            ${data?.data.price}
          </span>
        </div>
        <div className='m-2 flex justify-center'>
          <Button
            className='mr-6 flex items-center rounded bg-red-800 px-3 py-2 font-bold text-white'
            onClick={() => handleDelete(data?.data.id)}
          >
            {' '}
            {isDelete && (
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
            <Trash width='16' height='16' className='mr-2' /> Delete
          </Button>
          <Button
            variant='soft'
            className='mr-6 flex items-center rounded bg-blue-800 px-3 py-2 font-bold text-white'
          >
            <Pencil1Icon className='mr-2' />
            <EditFormModal product={data?.data} />
          </Button>
        </div>
      </Card>
    </div>
  );
}