import { useQuery } from 'react-query';
import { User } from 'firebase/auth';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { UserPlant } from '@/@types/plant.type';

const getPlantDocuments = async (user: User | undefined) => {
  const q = query(
    collection(db, 'plant'),
    where('userEmail', '==', user?.email),
  );
  const querySnapshot = await getDocs(q);
  const data: UserPlant[] = querySnapshot.docs.map(
    doc => doc.data() as UserPlant,
  );

  return data;
};

const usePlantData = (user: User | undefined) => {
  const { data, isLoading, refetch } = useQuery(
    ['plant', user?.email],
    () => getPlantDocuments(user),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );

  return { data, isLoading, refetch };
};

export default usePlantData;
