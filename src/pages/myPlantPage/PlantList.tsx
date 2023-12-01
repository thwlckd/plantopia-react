import { Link, useNavigate } from 'react-router-dom';
import { UserPlant } from '@/@types/plant.type';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import { successNoti } from '@/utils/alarmUtil';
import '@/pages/myPlantPage/plantList.scss';

interface PlantListProps {
  plantData: UserPlant[] | undefined;
  setMainPlant: (data: UserPlant) => void;
  updateMainPlant: (data: UserPlant) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<UserPlant[], unknown>>;
}

const PlantList = ({
  plantData,
  setMainPlant,
  updateMainPlant,
  refetch,
}: PlantListProps) => {
  const navigate = useNavigate();

  const handleClickIsMain = (clickedPlant: UserPlant) => {
    const updateToNormalPlant = plantData?.find(({ isMain }) => isMain);

    if (!updateToNormalPlant) return;

    updateMainPlant({
      ...updateToNormalPlant,
      isMain: false,
    });
    updateMainPlant({
      ...clickedPlant,
      isMain: true,
    });
    refetch();

    setMainPlant(clickedPlant);

    successNoti('메인 식물을 변경하였습니다.');
  };

  const handleEditData = (clickedPlant: UserPlant) => {
    const dataFromList = {
      imgUrlFromList: clickedPlant.imgUrl,
      nicknameFromList: clickedPlant.nickname,
      plantNameFromList: clickedPlant.plantName,
      purchasedDayFromList: clickedPlant.purchasedDay,
      wateredDayFromList: clickedPlant.wateredDays.at(-1),
      frequencyFromList: clickedPlant.frequency,
    };
    navigate(`/myplant/${clickedPlant.id}/edit`, { state: dataFromList });
  };

  return (
    <>
      <div className="subplant_container">
        {plantData?.map(plant => (
          <Link
            key={plant.id}
            to={`/myplant/${plant.id}`}
            className="subplant_list_box_link"
          >
            <div className="subplant_list_box">
              <div className="subplant_main_data">
                <span>
                  <img
                    className="subplant_img"
                    src={plant.imgUrl}
                    alt="subPlantImg"
                  />
                </span>
                <p className="subplant_name">{plant.nickname}</p>
              </div>
              <div className="main_check_and_edit">
                <button
                  onClick={e => {
                    e.preventDefault();
                    handleClickIsMain(plant);
                  }}
                >
                  <img
                    className="main_tag_img"
                    src={plant.isMain ? mainPlantTrueIcon : mainPlantFalseIcon}
                    alt="mainPlantOrNotImg"
                  />
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    handleEditData(plant);
                  }}
                >
                  <img
                    className="edit_button_img"
                    src={myPlantEditIcon}
                    alt="EditPlantImg"
                  />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PlantList;
