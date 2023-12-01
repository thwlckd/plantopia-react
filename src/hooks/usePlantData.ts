import { useMutation, useQuery } from 'react-query';
import { User } from 'firebase/auth';
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseApp';
import { UserPlant } from '@/@types/plant.type';

const getPlantDocuments = async (user: User | undefined) => {
  const q = query(
    collection(db, 'plant'),
    where('userEmail', '==', user?.email),
  );
  const querySnapshot = await getDocs(q);
  const data: UserPlant[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<UserPlant, 'id'>),
  }));

  return data;
};

const updatePlantInfo = (plant: UserPlant) => {
  const { id, ...newData } = plant;
  const plantRef = doc(db, 'plant', id);

  return updateDoc(plantRef, newData);
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

  const { mutate } = useMutation(updatePlantInfo);

  return { data, isLoading, refetch, mutate };
};

export default usePlantData;
