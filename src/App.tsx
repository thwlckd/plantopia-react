import { useEffect, Suspense } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { setBodyHeight } from './utils/setBodyHeight';
import Progress from './components/progress/Progress';
import Toast from './components/notification/ToastContainer';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/customToastStyles.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '@/styles/alertStyle.scss';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setBodyHeight();
  }, []);

  return (
    <>
      <Toast />
      <Suspense fallback={<Progress />}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </Suspense>
    </>
  );
};

export default App;
