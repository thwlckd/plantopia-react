import { differenceInDays, format, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { UserPlant } from '@/@types/plant.type';
import { showAlert } from '@/utils/myPlantUtil';

import 'react-confirm-alert/src/react-confirm-alert.css';
import WATERING from '@/assets/images/icons/watering.png';
import MAIN_PLANT from '@/assets/images/plants/main_plant.png';
import EDIT_ICON from '@/assets/images/icons/my_plant_detail_edit_icon.png';
import { useAuth } from '@/hooks';
interface MainPlantProps {
  plant?: UserPlant;
  onWaterPlant: (plantId: string) => void;
}

// username
const EmptyPlant = () => {
  const user = useAuth();
  const userName = user?.displayName || '회원';

  return (
    <>
      <div className="main_plant">
        <div className="inner_circle">
          <img src={MAIN_PLANT} alt="plant" />
        </div>
      </div>
      <p className="welcome_text">
        <strong>{userName}</strong>님, 플랜토피아와 함께 슬기로운 식집사 생활을
        시작하세요!
      </p>
      <Link to="/myplant/register" className="register_btn">
        <img src={EDIT_ICON} alt="edit" />
        <p>내 식물 등록하기</p>
      </Link>
    </>
  );
};

const MainPlant = ({ plant, onWaterPlant }: MainPlantProps) => {
  if (!plant) return <EmptyPlant />;

  const getWateringDday = (
    lastWateringDate: number,
    frequency: number,
  ): string => {
    const nextWateringDate = addDays(lastWateringDate, frequency);
    const diffDays = differenceInDays(Date.now(), nextWateringDate);

    /* 물을 주어야할 날이 지났다면 모두 D-day로 표시 */
    if (diffDays > 0) {
      return 'D-day';
    }

    return diffDays === 0 ? `D-${diffDays}` : `D${diffDays}`;
  };

  const onClickWatering = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    showAlert(
      '식물에 물을 주시겠습니까?',
      '물을 주려면 확인을 눌러주세요!',
      () => onWaterPlant(plant.id),
    );
  };

  const lastWateringDate = (plant.wateredDays.at(-1)?.seconds || 0) * 1000;
  const registerDate = plant.purchasedDay.seconds * 1000;

  return (
    <>
      <Link to={`/myplant/${plant.id}`} className="main_plant">
        <div className="inner_circle">
          <img src={plant.imgUrl} alt="plant" />
        </div>
        <button className="watering_btn" onClick={onClickWatering}>
          <img src={WATERING} alt="watering" />
          <div className="watering_label">물주기</div>
        </button>
      </Link>
      {/* main_plant_info */}
      <div className="main_plant_info">
        <div className="eng_name_label">{plant.plantName}</div>
        <h2 className="nickname">
          <span className={`${plant.isMain && 'main-plant'}`}>
            {plant.nickname}
          </span>
        </h2>
        <div className="plant_info_wrapper">
          <div className="plant_info">
            <span className="title">물주기</span>
            <div className="content cotent_label">
              <span>
                {getWateringDday(
                  lastWateringDate || registerDate,
                  plant.frequency,
                )}
              </span>
            </div>
          </div>
          <div className="plant_info">
            <span className="title">마지막 물준 날</span>
            <span className="content">
              {lastWateringDate ? format(lastWateringDate, 'yyyy-MM-dd') : '-'}
            </span>
          </div>
          <div className="plant_info">
            <span className="title">처음 함께한 날</span>
            <span className="content">
              {format(registerDate, 'yyyy-MM-dd')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPlant;
