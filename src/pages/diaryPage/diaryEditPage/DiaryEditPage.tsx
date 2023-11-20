import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDiaryData from '@/hooks/useDiaryData';
import { Diary } from '@/@types/diary.type';
import { errorNoti, successNoti } from '@/utils/alarmUtil';
import { useAuth } from '@/hooks';

import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import SectionEditBoard from './SectionEditBoard';
import SectionEditPhoto from './SectionEditPhoto';
import NotFoundPage from '@/pages/notFoundPage/NotFoundPage';
import './diaryEditPage.scss';

const DiaryEditPage = () => {
  const user = useAuth();
  const { docId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const {
    data: diaryData,
    updateDiaryItem,
    isLoading,
    refetch: diaryRefetch,
  } = useDiaryData(user);

  useEffect(() => {
    if (!user) return;

    diaryRefetch();
  }, [user]);

  useEffect(() => {
    const diaryToUpdate = diaryData?.find((diary: Diary) => diary.id === docId);
    if (!diaryToUpdate) {
      return;
    }

    setTitle(diaryToUpdate.title);
    setContent(diaryToUpdate.content);
    setChosenPlants(diaryToUpdate.tags);
    setImgUrls(diaryToUpdate.imgUrls);
  }, [diaryData]);

  const toggleSelect = () => {
    setIsVisible(prevVisible => !prevVisible);
  };

  const handleChosenPlantClick = (plant: string) => {
    setChosenPlants(prev => prev.filter(p => p !== plant));
  };

  const handlePlantSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPlant = event.target.value;

    setChosenPlants(prev =>
      prev.includes(selectedPlant)
        ? prev.filter(p => p !== selectedPlant)
        : [...prev, selectedPlant],
    );
  };

  const handleSaveClick = async () => {
    if (!title || chosenPlants.length === 0 || !content) {
      errorNoti(
        !title
          ? '제목을 작성해주세요.'
          : chosenPlants.length === 0
          ? '관련 식물을 1가지 이상 선택해주세요.'
          : '내용을 작성해주세요.',
      );
      return;
    }

    if (!docId) return;
    await updateDiaryItem(docId, {
      content: content,
      tags: chosenPlants,
      title: title,
      imgUrls: imgUrls,
    });
    successNoti('수정이 완료되었어요!');
    navigate('/diary');
  };

  if (!docId) {
    return <NotFoundPage />;
  }

  return (
    <div className="layout">
      <HeaderBefore ex={true} title="수정하기" />
      <main className="diary_write_wrap">
        <SectionEditPhoto imgUrls={imgUrls} setImgUrls={setImgUrls} />
        <SectionEditBoard
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          chosenPlants={chosenPlants}
          handleChosenPlantClick={handleChosenPlantClick}
          handlePlantSelection={handlePlantSelection}
          isVisible={isVisible}
          toggleSelect={toggleSelect}
        />
        <button
          className="save_button"
          onClick={handleSaveClick}
          disabled={isLoading}
        >
          {isLoading ? '수정 중...' : '수정하기'}
        </button>
      </main>
    </div>
  );
};

export default DiaryEditPage;
