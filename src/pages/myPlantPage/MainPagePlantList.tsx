import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/pages/myPlantPage/mainPagePlantList.scss';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import { UserPlant } from '@/@types/plant.type';
import Toast from '@/components/notification/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/custom-toast-styles.scss';
import { successNoti } from '@/utils/myPlantUtil';
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

import { db } from '@/firebaseApp';

const MainPagePlantList = ({ userEmail, setMyMainPlant, setPlantCount }) => {
  const navigate = useNavigate();
  const [myPlantData, setMyPlantData] = useState<UserPlant[]>([]);
  const getUserPlants = async () => {
    const q = query(
      collection(db, 'plant'),
      where('userEmail', '==', userEmail),
    );
    const querySnapshot = await getDocs(q);
    const plantData: Array<UserPlant> = [];
    querySnapshot.forEach(doc => {
      plantData.push({ ...doc.data(), id: doc.id });
    });
    plantData.sort(compare);
    setMyPlantData(plantData);
    setPlantCount(plantData.length);
  };

  const navigateEdit = () => {
    navigate(`/myplant/${plant?.id}`);
  };

  const handleClickIsMain = async (clickedPlant: UserPlant) => {
    if (clickedPlant.isMain === false) {
      const previousMain = myPlantData.find(item => (item.isMain = true));
      if (!previousMain) {
        return;
      }
      const documentTrueRef = doc(db, 'plant', clickedPlant.id);
      const documentFalseRef = doc(db, 'plant', previousMain.id);
      const updatedTrueFields = {
        isMain: true,
      };
      const updatedFalseFields = {
        isMain: false,
      };
      try {
        await updateDoc(documentTrueRef, updatedTrueFields);
        await updateDoc(documentFalseRef, updatedFalseFields);
        const updatedDocSnapshot = await getDoc(documentTrueRef);
        const updatedData = updatedDocSnapshot.data();
        setMyMainPlant(updatedData);
        await getUserPlants();
        successNoti('메인 식물을 변경하였습니다.');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
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
  const compare = (a: UserPlant, b: UserPlant): number => {
    if (a.isMain === b.isMain) {
      return 0;
    } else if (a.isMain) {
      return -1;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    const getUserPlants = async () => {
      const q = query(
        collection(db, 'plant'),
        where('userEmail', '==', userEmail),
      );
      const querySnapshot = await getDocs(q);
      const plantData: Array<UserPlant> = [];
      querySnapshot.forEach(doc => {
        plantData.push({ ...doc.data(), id: doc.id });
      });
      plantData.sort(compare);
      setMyPlantData(plantData);
      setPlantCount(plantData.length);
    };
    getUserPlants();
  }, []);

  return (
    <>
      <Toast />
      <div className="subplant_container">
        {myPlantData.map(plant => (
          <Link to={`/myplant/${plant.id}`} style={{ width: '100%' }}>
            <div key={plant.id} className="subplant_list_box">
              <div className="subplant_main_data">
                <img
                  className="subplant_img"
                  src={plant.imgUrl}
                  alt="subPlantImg"
                />
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
                    className="mainPlantOrNot"
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

export default MainPagePlantList;
