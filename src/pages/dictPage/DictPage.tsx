import { Children, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommend } from '@/constants/dictionary';
import { useAuth } from '@/hooks';
import Recommend from './Recommend';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import SEARCH_ICON from '@/assets/images/icons/dict_search.png';
import './dictPage.scss';

const DictPage = () => {
  const user = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dict/search', {
      state: {
        inputValue: searchInput,
      },
    });
  };

  return (
    <div className="dict_conatiner layout">
      <Header />
      <main className="dict_wrapper ">
        <h2 className="dict_title">
          <span>{user?.displayName}</span>님, 어떤 식물을 찾고있나요?
        </h2>
        <section className="search_wrapper">
          <form onSubmit={handleSubmit}>
            <div className="input_wrapper">
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="식물 이름으로 검색하기"
              />
              <button>
                <img
                  className="search_img"
                  src={SEARCH_ICON}
                  alt="search icon"
                />
              </button>
            </div>
          </form>
        </section>
        {Children.toArray(
          recommend.map(({ icon, title, target }) => (
            <Recommend icon={icon} title={title} target={target} />
          )),
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DictPage;
