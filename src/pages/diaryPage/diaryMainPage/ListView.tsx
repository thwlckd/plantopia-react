import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Diary } from '@/@types/diary.type';
import { showAlert } from '@/utils/alarmUtil';

import NoContent from './NoContent';
import './listView.scss';

interface ListViewProps {
  diaryData: Diary[] | undefined;
  handleDelete: (diaryId: string) => void;
}

const ListView = ({ diaryData, handleDelete }: ListViewProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);

  const handleToggleModal = (diary: Diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setSelectedDiary(null);
    setIsModalOpen(false);
  };

  const navigateToEdit = (diary: Diary) => {
    navigate(`/diary/${diary.id}/edit`);
    closeModal();
  };

  return (
    <div className="list_view">
      <ul className="diary_list_wrap">
        {diaryData ? (
          diaryData.map(diary => (
            <li className="diary_list" key={diary.id}>
              <Link to={`/diary/${diary.id}`}>
                <div className="left_box">
                  <h5 className="title">{diary.title}</h5>
                  <p className="content">{diary.content}</p>
                  <span className="date">
                    {diary.postedAt.toDate().toLocaleDateString()}
                  </span>
                </div>
                <div
                  className={`main_img ${
                    diary.imgUrls.length > 1 ? 'many' : ''
                  }`}
                  style={{
                    backgroundImage: `url('${
                      diary.imgUrls && diary.imgUrls.length > 0
                        ? diary.imgUrls[0]
                        : ''
                    }')`,
                  }}
                ></div>
              </Link>
              <button
                className="more"
                onClick={() => handleToggleModal(diary)}
              ></button>
              {isModalOpen && selectedDiary === diary && (
                <div className="more_modal">
                  <div
                    className="btn modify"
                    onClick={() => navigateToEdit(diary)}
                  >
                    게시글 수정
                  </div>
                  <div
                    className="btn delete"
                    onClick={() => {
                      showAlert('글을 삭제하시겠습니까?', '', () => {
                        handleDelete(diary.id);
                        closeModal();
                      });
                    }}
                  >
                    삭제
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <NoContent />
        )}
      </ul>
    </div>
  );
};

export default ListView;
