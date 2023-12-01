import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, usePlantData } from '@/hooks';

import editIcon from '@/assets/images/icons/my_plant_detail_edit_icon.png';
import samplePlant from '@/assets/images/icons/sample_plant1.png';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Progress from '@/components/progress/Progress';
import PlantList from '@/pages/myPlantPage/PlantList';
import { UserPlant } from '@/@types/plant.type';
import './myPlantPage.scss';

const MyPlantPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [mainPlant, setMainPlant] = useState<UserPlant>();

  const { data, isLoading, refetch, mutate } = usePlantData(user);

  useEffect(() => {
    if (!user) return;

    refetch();
    setMainPlant(() => data?.find(({ isMain }) => isMain));
  }, [user, isLoading]);

  return (
    <div className="layout">
      <Header />
      <main className="my_plant_wrapper">
        <h2 className="my_plant_info_message">
          <span className="username">{user?.displayName}</span>님의 식물을 한
          눈에 보기!
        </h2>
        <div className="main_plant_info_box inner">
          {mainPlant ? (
            <div className="main_plant_main_data">
              <span>
                <img
                  className="main_plant_img"
                  src={mainPlant?.imgUrl}
                  alt="mainPlantImg"
                />
              </span>
              <div className="main_plant_head">
                <img src={mainPlantTrueIcon} alt="" />{' '}
                <p className="main_plant_title">메인 식물</p>
              </div>
              <p className="main_plant_name">{mainPlant?.plantName}</p>
              <p className="main_plant_nickname">{mainPlant?.nickname}</p>
              <p
                className="plant_plus_btn"
                onClick={() => navigate('/myplant/register')}
              >
                <img
                  src={plusIcon}
                  alt="plusIcon"
                  className="plant_plus_icon"
                />
                식물 등록
              </p>
            </div>
          ) : (
            <div className="main_plant_main_data">
              <img
                className="main_plant_sample_img"
                src={samplePlant}
                alt="samplePlantImg"
              />
              <button
                className="my_plant_main_add_btn_inner_contents"
                onClick={() => navigate('/myplant/register')}
              >
                <div className="my_plant_main_add_btn_inner_contents_box">
                  <img src={editIcon} alt="editIcon" />
                  <p>내 식물 등록하기</p>
                </div>
              </button>
            </div>
          )}
          {user?.email && (
            <PlantList
              plantData={data || undefined}
              setMainPlant={setMainPlant}
              updateMainPlant={mutate}
              refetch={refetch}
            />
          )}
        </div>
      </main>
      <Footer />
      {isLoading && <Progress />}
    </div>
  );
};

export default MyPlantPage;
