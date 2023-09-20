import { useQuery } from 'react-query';
import { PlantType } from '@/@types/dictionary.type';
import { db } from '@/firebaseApp';
import { orderDirection, targetQuery } from '@/constants/dictionary';
import { getRandomIndex, shuffleArray } from '@/utils/arrayUtil';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';

interface UseRecommendProps {
  target: keyof typeof targetQuery;
}

const getDouments = async (target: keyof typeof targetQuery) => {
  const dictRef = collection(db, 'dictionary');
  const q = query(
    dictRef,
    where(targetQuery[target][0], '==', targetQuery[target][1]),
    orderBy(
      Object.values(targetQuery)[getRandomIndex(4)][0],
      orderDirection[getRandomIndex(2)],
    ),
    limit(8),
  );
  const querySnapshot = await getDocs(q);
  const queriedData: PlantType[] = [];
  querySnapshot.forEach(doc => {
    queriedData.push(doc.data() as PlantType);
  });
  return queriedData;
};

const useRecommend = ({ target }: UseRecommendProps) => {
  const { data, isLoading, refetch } = useQuery(
    ['recommend', target],
    () => getDouments(target),
    {
      staleTime: 300000,
      refetchOnWindowFocus: false,
      onSuccess: data => data && shuffleArray(data),
    },
  );

  return { data, isLoading, refetch };
};

export default useRecommend;
