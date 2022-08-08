import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Branch } from './Branch';
import { closestBranchTo } from './distances';
import { SearchLocation } from './SearchLocation';
import useLoading from './useLoading';

export interface ClosestBranchContextParams {
  state: 'loading-fonts' | 'loading-branches' | 'ready' | 'error';
  branches: undefined | Branch[];
  search: SearchLocation;
  setSearch: Dispatch<SetStateAction<SearchLocation>>;
  closest: undefined | Branch;
}

export const closestBranchContext = createContext<
  undefined | ClosestBranchContextParams
>(undefined);

interface Props {
  children: React.ReactElement;
}

export const ClosestBranchProvider = ({ children }: Props) => {
  const [state, branches] = useLoading();
  const [search, setSearch] = useState<SearchLocation>();
  const [closest, setClosest] = useState<undefined | Branch>();
  useEffect(() => {
    if (branches && typeof search === 'object') {
      setClosest(closestBranchTo(search, branches));
    } else {
      setClosest(undefined);
    }
  }, [search, branches]);

  useEffect(() => {
    if (branches && typeof search === 'object') {
      setClosest(closestBranchTo(search, branches));
    } else {
      setClosest(undefined);
    }
  }, [search, branches]);

  return (
    <closestBranchContext.Provider
      value={{ state, branches, search, setSearch, closest }}>
      {children}
    </closestBranchContext.Provider>
  );
};
