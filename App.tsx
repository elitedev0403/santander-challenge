import React from 'react';
import Main from './src';
import { ClosestBranchProvider } from './src/ClosestBranchProvider';

export default function App() {
  return (
    <ClosestBranchProvider>
      <Main />
    </ClosestBranchProvider>
  );
}
