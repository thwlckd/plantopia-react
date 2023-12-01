import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { useAuth, usePlantData } from '@/hooks';
import { UserPlant } from '@/@types/plant.type';
import { Timestamp } from 'firebase/firestore';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Progress from '@/components/progress/Progress';
import MainPlantSection from './MainPlantSection';
import WeatherSection from './WeatherSection';
import { successNoti } from '@/utils/alarmUtil';
import './mainPage.scss';

interface PlantListProps {
  plants: UserPlant[];
  onClickItem: (plant: UserPlant) => void;
}

const PlantList = ({ plants, onClickItem }: PlantListProps) => {
  if (plants.length > 0) {
    return (
      <div className="slide_wrapper">
        <Swiper slidesPerView={3.5} className="swiper">
          {plants.map(plant => (
            <SwiperSlide key={nanoid()}>
              <button className="slide" onClick={() => onClickItem(plant)}>
                <div className="avatar">
                  <img src={plant.imgUrl} alt="plant" />
                </div>
                <span className="name">{plant.nickname}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};

const MainPage = () => {
  const user = useAuth();
  const [focusPlant, setFocusPlant] = useState<UserPlant>();
  const { data, isLoading, refetch, mutate } = usePlantData(user);

  useEffect(() => {
    user && refetch();
  }, [user]);

  const onWaterPlant = () => {
    const toUpdateData =
      focusPlant || data?.find(({ isMain }) => isMain === true);

    if (!toUpdateData) return;

    mutate({
      ...toUpdateData,
      wateredDays: [
        ...toUpdateData.wateredDays,
        Timestamp.fromDate(new Date()),
      ],
    });

    setFocusPlant({
      ...toUpdateData,
      wateredDays: [
        ...toUpdateData.wateredDays,
        Timestamp.fromDate(new Date()),
      ],
    });

    successNoti('물을 잘 먹었어요!');
  };

  return (
    <div className="layout">
      <Header isMainPage />
      <main className="main_page">
        <section>
          <WeatherSection />
          {data && (
            <>
              <MainPlantSection
                plant={focusPlant || data.find(({ isMain }) => isMain === true)}
                onWaterPlant={onWaterPlant}
              />
              <PlantList
                plants={data}
                onClickItem={(plant: UserPlant) => setFocusPlant(plant)}
              />
            </>
          )}
        </section>
      </main>
      <Footer />
      {isLoading && <Progress />}
    </div>
  );
};

export default MainPage;
