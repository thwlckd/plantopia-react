import { Link } from 'react-router-dom';
import { DiaryProps } from '@/@types/diary.type';

import NoContent from './NoContent';
import './galleryView.scss';

interface GalleryViewProps {
  diaryData: DiaryProps[] | undefined;
}

const GalleryView = ({ diaryData }: GalleryViewProps) => {
  const getMainImage = (imgUrls: string[]) => {
    return `url(${imgUrls[0]})`;
  };

  return (
    <>
      {diaryData ? (
        <div className="gallery_view">
          {diaryData.map((diary, index) => (
            <Link
              to={`/diary/${diary.id}`}
              key={index}
              style={{ backgroundImage: getMainImage(diary.imgUrls) }}
              className={`card ${
                diary.imgUrls.length === 0 ? 'hide' : 'show'
              } ${diary.imgUrls.length > 1 ? 'many' : ''}`}
            />
          ))}
        </div>
      ) : (
        <NoContent />
      )}
    </>
  );
};

export default GalleryView;
