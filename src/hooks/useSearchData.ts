import { db } from '@/firebaseApp';
import {
  collection,
  getDocs,
  query,
  startAt,
  endAt,
  orderBy,
} from 'firebase/firestore';
import { koreanRe } from '@/constants/regEx';
import { PlantType } from '@/@types/dictionary.type';
import { useQuery } from 'react-query';

const getDouments = async (plantName: string) => {
  if (!plantName) return;
  let fieldName = 'name';
  if (!koreanRe.test(plantName)) {
    fieldName = 'scientificName';
    plantName =
      plantName[0] &&
      plantName.replace(plantName[0], plantName[0].toUpperCase());
  }
  const dictRef = collection(db, 'dictionary');
  const q = query(
    dictRef,
    orderBy(fieldName),
    startAt(`${plantName}`),
    endAt(`${plantName}\uf8ff`),
  );
  const querySnapshot = await getDocs(q);
  const queriedData: PlantType[] = [];
  querySnapshot.forEach(doc => {
    queriedData.push(doc.data() as PlantType);
  });
  return queriedData;
};

const useSearchData = (plantName: string) => {
  const { data, isLoading, refetch } = useQuery(['searchData', plantName], () =>
    getDouments(plantName),
  );

  return { data, isLoading, refetch };
};

export default useSearchData;
