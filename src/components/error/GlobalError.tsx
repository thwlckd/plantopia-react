import './globalError.scss';

const GlobalError = () => {
  return (
    <div className="error_container layout">
      <main className="inner">
        <section className="error_wrapper">
          <h2>
            🚨 <strong>에러</strong>가 발생했습니다!
          </h2>
          <a href="/">메인으로 이동하기</a>
        </section>
      </main>
    </div>
  );
};

export default GlobalError;
