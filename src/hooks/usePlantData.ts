import { useQuery } from 'react-query';
import { User } from 'firebase/auth';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { Plant } from '../@types/diary.type';

const getPlantDocuments = async (user: User | undefined) => {
  const q = query(
    collection(db, 'diary'),
    where('userEmail', '==', user?.email),
  );
  const querySnapshot = await getDocs(q);
  const data: Plant[] = querySnapshot.docs.map(doc => doc.data() as Plant);

  return data;
};

const usePlantData = (user: User | undefined) => {
  const { data, isLoading, refetch } = useQuery(
    ['plant'],
    () => getPlantDocuments(user),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );

  return { data, isLoading, refetch };
};

export default usePlantData;
