import { Loader2, X } from 'lucide-react';
import * as React from 'react';

import { api } from '@/lib/api';

import { Product } from '@/schema/product';

api;
type AddModalFormProps = {
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
};

const AddModalForm = ({ setProduct }: AddModalFormProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState(0);
  const [productImage, setProductImage] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      productName === '' ||
      productDescription === '' ||
      productImage === '' ||
      productPrice === 0
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post<{ data: Product }>('/api/product', {
        title: productName,
        price: productPrice,
        image: productImage,
        description: productDescription,
      });
      const createdProduct = response.data.data;
      setProduct((prevState) => [...prevState, createdProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className='rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Add Product
      </button>
      {isOpen && (
        <div>
          <div className='fixed inset-0 bg-black/50' onClick={closeModal}></div>
          <form
            onSubmit={(_e) => handleAddProduct(_e)}
            className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow '
          >
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='dark:text-dark text-xl font-semibold'>
                Add Product
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
            </div>
            <div className='mb-2 mt-5 px-5'>
              <label className='dark:text-dark mb-2 block text-sm font-medium'>
                Description
              </label>
              <input
                type='text'
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
            </div>
            <div className='mb-2 mt-5 px-5'>
              <label className='dark:text-dark mb-2 block text-sm font-medium'>
                Price
              </label>
              <input
                type='number'
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
            </div>
            <div className='mb-2 mt-5 px-5'>
              <label className='dark:text-dark mb-2 block text-sm font-medium'>
                Image
              </label>
              <input
                type='text'
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
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
                Add Product
                <div role='status'>{isLoading && <Loader2 />}</div>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddModalForm;
