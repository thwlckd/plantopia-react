import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { User } from 'firebase/auth';
import { db } from '@/firebaseApp.ts';
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { Diary } from '@/@types/diary.type';
import { successNoti } from '@/utils/alarmUtil';

const getDiaryDocuments = async (user: User | undefined) => {
  const q = query(
    collection(db, 'diary'),
    where('userEmail', '==', user?.email),
  );
  const querySnapshot = await getDocs(q);
  const data: Diary[] = [];
  querySnapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() } as Diary);
  });

  return data;
};

const useDiaryData = (user: User | undefined) => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery(
    ['diary', user?.email],
    () => getDiaryDocuments(user),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: data =>
        data.sort(
          (a, b) =>
            b.postedAt.toDate().getTime() - a.postedAt.toDate().getTime(),
        ),
    },
  );

  const addDiaryItem = async (item: Partial<Diary>) => {
    await addDoc(collection(db, 'diary'), item);
  };

  const updateDiaryItem = async (diaryId: string, item: Partial<Diary>) => {
    const diaryRef = doc(db, 'diary', diaryId);
    await updateDoc(diaryRef, item);
  };

  const deleteDiaryItem = async (diaryId: string) => {
    await deleteDoc(doc(db, 'diary', diaryId));
    successNoti('삭제가 완료되었어요!');
    navigate('/diary');
  };

  return {
    data,
    isLoading,
    refetch,
    addDiaryItem,
    updateDiaryItem,
    deleteDiaryItem,
  };
};

export default useDiaryData;
