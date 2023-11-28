import * as React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import AddFormModal from '@/components/layout/AddFormModal';

function Navigation() {
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      <>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'></div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <Menu as='div' className='relative ml-3'>
                <div>
                  <AddFormModal />
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}

export default Navigation;
