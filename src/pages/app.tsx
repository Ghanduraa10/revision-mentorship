import CardList from '@/components/layout/CardList';
import Navigation from '@/components/layout/Navigation';
import * as React from 'react';

function App() {
  return (
    <>
      <Navigation />
      <div className='mt-6 px-8'>
        <CardList />
      </div>
    </>
  );
}

export default App;
