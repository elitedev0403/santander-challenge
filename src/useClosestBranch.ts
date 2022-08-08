import React, { useContext } from 'react';
import { closestBranchContext } from './ClosestBranchProvider';

export const useClosestBranch = () => {
  return useContext(closestBranchContext);
};
