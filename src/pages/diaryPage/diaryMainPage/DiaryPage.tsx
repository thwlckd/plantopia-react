import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DIARY_IMAGES } from '@/constants/diary';
import { useAuth, useDiaryData, usePlantData } from '@/hooks';
import { showAlert } from '@/utils/alarmUtil';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Progress from '@/components/progress/Progress';
import ListView from './ListView';
import GalleryView from './GalleryView';
import './diaryPage.scss';

const TAB_DATA = [
  {
    name: 'list_tab',
    label: 'List',
    onImage: DIARY_IMAGES.LISTON,
    offImage: DIARY_IMAGES.LISTOFF,
  },
  {
    name: 'gallery_tab',
    label: 'Gallery',
    onImage: DIARY_IMAGES.GALLERYON,
    offImage: DIARY_IMAGES.GALLERYOFF,
  },
];

const DiaryPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('list_tab');
  const {
    data: diaryData,
    deleteDiaryItem,
    isLoading,
    refetch,
  } = useDiaryData(user);
  const { data: plantData } = usePlantData(user);

  useEffect(() => {
    user && refetch();
  }, [user]);

  const handleTabChange = (tab: string) => {
    if (tab !== currentTab) {
      setCurrentTab(tab);
    }
  };

  const handleRedirect = async () => {
    if (!plantData) {
      showAlert(
        '등록된 식물이 없습니다.',
        '내 식물을 등록하시겠습니까?',
        () => {
          navigate('/myplant/register');
        },
      );
    } else {
      navigate('/diary/write');
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className="diary_page">
        <div className="diary_container">
          <h2 className="title inner">
            <span>{user?.displayName ?? '사용자'}</span>님, 식물의 성장 기록을
            남겨보세요.
            <span className="plant_icon"></span>
          </h2>
          <section className="tab_section">
            {TAB_DATA.map((tab, index) => (
              <div
                key={index}
                className={`view_tab ${tab.name} ${
                  currentTab === tab.name ? 'on' : ''
                }`}
                onClick={() => handleTabChange(tab.name)}
              >
                <img
                  src={currentTab === tab.name ? tab.onImage : tab.offImage}
                  className="tab_img"
                  alt={`Tab ${tab.label}`}
                />
              </div>
            ))}
          </section>
          <section className="content_section">
            {currentTab === 'list_tab' ? (
              <ListView diaryData={diaryData} handleDelete={deleteDiaryItem} />
            ) : (
              <GalleryView diaryData={diaryData} />
            )}
          </section>
          <div className="top_btn"></div>
        </div>
        <button onClick={handleRedirect} className="write_btn_wrap">
          <div className="write_btn"></div>
        </button>
      </main>
      <Footer />
      {isLoading && <Progress />}
    </div>
  );
};

export default DiaryPage;
