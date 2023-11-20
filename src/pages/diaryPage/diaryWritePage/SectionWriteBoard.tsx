import { useEffect } from 'react';
import { useAuth, usePlantData } from '@/hooks';
import { ARROW_IMAGES } from '@/constants/diary';

import './sectionWriteBoard.scss';

interface SectionWriteBoardProps {
  state: {
    title: string;
    content: string;
    saving: boolean;
    isVisible: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      saving: boolean;
      isVisible: boolean;
    }>
  >;
  chosenPlants: string[];
  toggleSelect(): void;
  handleChosenPlantClick(plant: string): void;
  handlePlantSelection(event: React.ChangeEvent<HTMLInputElement>): void;
}

const SectionWriteBoard = ({
  state,
  setState,
  chosenPlants,
  toggleSelect,
  handleChosenPlantClick,
  handlePlantSelection,
}: SectionWriteBoardProps) => {
  const user = useAuth();
  const { data: plantData, refetch } = usePlantData(user);

  useEffect(() => {
    if (!user) return;

    refetch();
  }, [user]);

  return (
    <div className="section_board">
      <section className="board">
        <div className="title_wrapper">
          <input
            type="text"
            placeholder="제목을 작성하세요."
            className="title"
            value={state.title}
            onChange={e =>
              setState(prev => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="plant_select_wrapper">
          <div className="plant_select">
            {chosenPlants.length === 0 ? (
              <div className="choose_text" onClick={toggleSelect}>
                식물을 선택하세요.
              </div>
            ) : (
              <div className="chosen_wrap">
                {chosenPlants.map(plant => (
                  <div
                    key={plant}
                    className="chosen_plant"
                    onClick={() => handleChosenPlantClick(plant)}
                  >
                    {plant}
                    <span className="cancel"></span>
                  </div>
                ))}
              </div>
            )}
            <div className="arrow_icon" onClick={toggleSelect}>
              <img
                src={
                  state.isVisible
                    ? ARROW_IMAGES.ARROW_UP
                    : ARROW_IMAGES.ARROW_DOWN
                }
                alt={state.isVisible ? 'Up' : 'Down'}
              />
            </div>
          </div>
          {state.isVisible && (
            <div className="plant_list">
              <ul>
                {(plantData || []).map(plant => (
                  <li key={plant.nickname}>
                    <input
                      type="checkbox"
                      name={plant.nickname}
                      id={plant.nickname}
                      value={plant.nickname}
                      onChange={handlePlantSelection}
                      checked={chosenPlants.includes(plant.nickname)}
                    />
                    <label htmlFor={plant.nickname}>{plant.nickname}</label>
                  </li>
                ))}
              </ul>
              <button className="choose_complete" onClick={toggleSelect}>
                선택 완료
              </button>
            </div>
          )}
        </div>
        <textarea
          placeholder="내용을 작성하세요."
          value={state.content}
          onChange={e =>
            setState(prev => ({ ...prev, content: e.target.value }))
          }
          className="content"
        />
      </section>
    </div>
  );
};

export default SectionWriteBoard;
