'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const client = new QueryClient();

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Wrapper;
