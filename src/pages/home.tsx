import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import CardList from '@/components/layout/CardList';
import Navbar from '@/components/layout/Navbar';

import { fetchProduct } from '@/pages/api/product/productApi';

export default function Home() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({ queryKey: ['data'], queryFn: fetchProduct });

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
      <Navbar />;
      <div className='mt-32'>
        <div role='status' className='flex justify-center'>
          {isLoading && <Loader2 />}
        </div>
        <CardList products={products} />
      </div>
    </>
  );
}
