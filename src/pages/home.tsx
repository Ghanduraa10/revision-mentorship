import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

import CardList from '@/components/layout/CardList';
import Navbar from '@/components/layout/Navbar';

import { Product } from '@/schema/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get<{ data: Product[] }>('/api/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar setProduct={setProducts} />;
      <div className='mt-32'>
        <div role='status' className='flex justify-center'>
          {isLoading && <Loader2 />}
        </div>
        <CardList products={products} />
      </div>
    </>
  );
}
