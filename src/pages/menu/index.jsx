import React, { useCallback, useEffect, useState } from 'react';

import { CartSkeleton } from '@/components/skeleton';
import { publicRequest } from '@/config/axios.config';
import Cart from '@/components/cart';
import HomeModal from '@/components/homeModal';
import RegulerMenu from '@/components/regulerMenu';
const menu = () => {
   
  return (
<main className='mt-20'><RegulerMenu/></main>
  );
};

export default menu;