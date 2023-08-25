import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';
import { db } from '@/utils/firebaseApp';
import { addDoc, collection } from 'firebase/firestore';

import './diaryWritePage.scss';

const DiaryWritePage = () => {
  const userId = 'test@test.com';
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title) {
      alert('제목을 작성해주세요.')
      return;
    }

    if (chosenPlants.length === 0) {
      alert('관련 식물을 1가지 이상 선택해주세요.');  
      return
    }

    if (!content) {
      alert('내용을 작성해주세요.')
      return;
    }

    setSaving(true);
    const timestamp = new Date();

    const dataToSave = {
      userEmail: userId,
      content: content,
      postedAt: timestamp,
      tags: chosenPlants,
      title: title,
      imgUrls: imgUrls,
    };

    await addDoc(collection(db, 'diary'), dataToSave);

    setChosenPlants([]);
    titleRef.current.value = '';
    contentRef.current.value = '';
    setImgUrls([]);
    setSaving(false);

    navigate('/diary');
  };

  return (
    <>
      <header className="sub_header">
        <strong>글쓰기</strong>
        <Link to="/diary">
          <button className="close_btn"></button>
        </Link>
      </header>
      <main className="diary_write_wrap">
        <SectionPhoto
          userId={userId}
          imgUrls={imgUrls}
          setImgUrls={setImgUrls}
        />
        <SectionBoard
          titleRef={titleRef}
          contentRef={contentRef}
          chosenPlants={chosenPlants}
          setChosenPlants={setChosenPlants}
        />
        <button
          className="save_button"
          onClick={handleSaveClick}
          disabled={saving}
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </main>
    </>
  );
};

export default DiaryWritePage;
