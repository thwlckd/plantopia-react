import { Children } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { targetClassName, targetQuery } from '@/constants/dictionary';
import { useRecommendData } from '@/hooks';
import Progress from '@/components/progress/Progress';
import REFRESH from '@/assets/images/icons/dict_refresh.png';
import './recommend.scss';

interface RecommendProps {
  icon: string;
  title: string;
  target: keyof typeof targetQuery;
}

const RecommendCategory = ({ icon, title, target }: RecommendProps) => {
  const { data: plant, isLoading, refetch } = useRecommendData({ target });

  const onClickRefreshBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="recommend_container">
      <div className="title_wrapper">
        <div className={targetClassName[target]}>
          <img className="plant_icon" src={icon} alt="search icon" />
        </div>
        <span>{title}</span>
        <button onClick={onClickRefreshBtn}>
          <img src={REFRESH} />
        </button>
      </div>
      <Swiper
        slidesPerView={target === 'beginner' ? 2 : 3}
        spaceBetween={target === 'beginner' ? 14 : 13}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="plants_container"
      >
        {Children.toArray(
          plant?.map(item => (
            <SwiperSlide className="plant_wrapper">
              <Link to={`/dict/detail?plantName=${item.name}`} state={item}>
                <img
                  className={target === 'beginner' ? 'img_two' : 'img_three'}
                  src={item.imageUrl}
                  alt="plant image"
                />
                <div className="name_wrapper">
                  <p
                    className={
                      target === 'beginner'
                        ? 'english_name_two'
                        : 'english_name_three'
                    }
                  >
                    {item.scientificName}
                  </p>
                  <p
                    className={
                      target === 'beginner'
                        ? 'korean_name_two'
                        : 'korean_name_three'
                    }
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          )),
        )}
      </Swiper>
      {isLoading && <Progress />}
    </div>
  );
};

export default RecommendCategory;
