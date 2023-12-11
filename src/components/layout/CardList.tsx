import Link from 'next/link';
import * as React from 'react';

import StarIcon from '@/components/svgs/StarIcon';

import { Product } from '@/schema/product';

type cardListProps = {
  products: Product[];
};

export default function CardList({ products }: cardListProps) {
  return (
    <div className='grid grid-cols-3 gap-4 px-10'>
      {products?.map((product) => (
        <div
          className='w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'
          key={product.id}
        >
          <div className='px-3 py-5 pb-5'>
            <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
              {product.title}
            </h5>
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
            <div className='flex items-center justify-between'>
              <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                ${product.price}
              </span>
              <Link
                href={`/${product.id}`}
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                View Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
