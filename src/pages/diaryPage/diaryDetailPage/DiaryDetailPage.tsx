import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Diary } from '@/@types/diary.type';
import { showAlert } from '@/utils/alarmUtil';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useAuth } from '@/hooks';
import useDiaryData from '@/hooks/useDiaryData';

import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import NotFoundPage from '@/pages/notFoundPage/NotFoundPage';
import './diaryDetailPage.scss';

const DiaryDetailPage = () => {
  const user = useAuth();
  const { docId } = useParams();
  const navigate = useNavigate();
  const slideSectionPrevBtn = useRef<HTMLDivElement>(null);
  const slideSectionNextBtn = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diaryItem, setDiaryItem] = useState<Diary>();
  const { data, deleteDiaryItem } = useDiaryData(user);

  useEffect(() => {
    setDiaryItem(data?.find(diary => diary.id == docId));
  }, [data]);

  const handleUpdatePost = () => {
    navigate(`/diary/${docId}/edit`);
    setIsModalOpen(false);
  };

  const handleDeletePost = () => {
    if (!docId) return;

    showAlert('글을 삭제하시겠습니까?', '', async () => {
      await deleteDiaryItem(docId);
      setIsModalOpen(false);
    });
  };

  if (!docId) {
    return <NotFoundPage />;
  }

  return (
    <div className="diary_detail_wrap layout">
      <HeaderBefore ex={false} title="다이어리" />
      <div className="more_btn_wrap">
        <button
          className="more"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        ></button>
        {isModalOpen && (
          <div className="more_modal">
            <div className="btn modify" onClick={handleUpdatePost}>
              게시글 수정
            </div>
            <div className="btn delete" onClick={handleDeletePost}>
              삭제
            </div>
          </div>
        )}
      </div>
      <main className="diary_detail_page">
        <div className="diary_detail_container">
          {diaryItem && diaryItem.imgUrls && diaryItem.imgUrls.length > 0 && (
            <section className="slide_section">
              <Swiper
                className="diary_img_swiper swiper "
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                onInit={swiper => {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
              >
                {diaryItem.imgUrls.map((imgUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="slide_container">
                      <img
                        src={imgUrl}
                        className="slide_img"
                        alt="슬라이드 이미지"
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper_nav">
                  <div
                    ref={slideSectionPrevBtn}
                    className="swiper_nav_prev nav_btn"
                  >
                    <div className="prev_btn"></div>
                  </div>
                  <div
                    ref={slideSectionNextBtn}
                    className="swiper_nav_next nav_btn"
                  >
                    <div className="next_btn"></div>
                  </div>
                </div>
              </Swiper>
            </section>
          )}
          <section className="content_section inner">
            <h5 className="diary_title">{diaryItem?.title}</h5>
            <div className="plant_list">
              {diaryItem?.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <div className="text_wrap">
              <p className="diary_text">{diaryItem?.content}</p>
              <p className="diary_date">
                {diaryItem?.postedAt?.toDate().toLocaleDateString()}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DiaryDetailPage;
