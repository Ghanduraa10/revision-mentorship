import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export function EditFormModal({ product }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    setFormData({
      title: product?.title,
      description: product?.description,
      price: product?.price,
      image: product?.image,
    });
  }, [product]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      const responese = await axios.patch(`/api/product/${product.id}`, {
        title: formData.title,
        price: formData.price,
        image: formData.image,
        description: formData.description,
      });
      console.log(responese);
      if (responese.status == 200) {
        setLoading(true);
        router.push('/home');
      }
    } catch (error) {
      console.error('Error editing product:', error);
    } finally {
      setLoading(false);
    }
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
            <div className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow '>
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
                  <svg
                    className='h-3 w-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
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
                  defaultValue={formData.title}
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
                  defaultValue={formData.description}
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
                  defaultValue={formData.price}
                  onChange={handleInputChange}
                  className='sm:text-md dark:bg-white-700 dark:text-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
              </div>
              <div className='mb-2 mt-5 px-5'>
                <label className='dark:text-dark mb-2 block text-sm font-medium'>
                  Image
                </label>
                <input
                  type='text'
                  name='image'
                  defaultValue={formData.image}
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
                  type='button'
                  onClick={handleEdit}
                  className='mb-2 me-2 flex items-center rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                  Edit Product
                  <div role='status'>
                    {isLoading && (
                      <svg
                        aria-hidden='true'
                        className='ml-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
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
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
