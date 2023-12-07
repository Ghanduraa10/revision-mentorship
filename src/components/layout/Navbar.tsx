import * as React from 'react';

import AddModalForm from '@/components/layout/AddModalForm';

import { Product } from '@/schema/product';

type AddModalFormProps = {
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function Navbar({ setProduct }: AddModalFormProps) {
  return (
    <>
      <nav className='fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <a
            href='https://flowbite.com/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              Revision MentorShip
            </span>
          </a>
          <div className='flex space-x-3 rtl:space-x-reverse md:order-2 md:space-x-0'>
            <AddModalForm setProduct={setProduct} />
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            ></button>
          </div>
          <div
            className='hidden w-full items-center justify-between md:order-1 md:flex md:w-auto'
            id='navbar-sticky'
          >
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900'>
              <li>
                <a
                  href='#'
                  className='block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500'
                  aria-current='page'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
