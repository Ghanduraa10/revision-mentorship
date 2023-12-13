import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { api } from '@/lib/api';

import { EditFormModal } from '@/components/layout/EditModalForm';
import StarIcon from '@/components/svgs/StarIcon';

import { Product } from '@/schema/product';

export default function ProductDetail() {
  const router = useRouter();
  const productId = router.query.product as string;

  const [products, setProducts] = React.useState<Product>();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchDataById(productId);
  }, [productId]);

  const fetchDataById = async (id: string) => {
    try {
      const response = await api.get(`/api/product/${id}`);
      const result = response.data;
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/product/${productId}`);
      router.push('/home');
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mt-10 flex justify-center'>
        <div className='w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
          <div className='px-5 py-5 pb-5'>
            <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              {products?.title}
            </h5>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              {products?.description}
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
              <EditFormModal products={products} />
              <button
                type='button'
                className='mb-2 me-2 flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={handleDelete}
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
