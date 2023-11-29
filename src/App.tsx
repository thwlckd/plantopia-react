import { useEffect, Suspense } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';

import GlobalError from './components/error/GlobalError';
import Progress from './components/progress/Progress';
import Toast from './components/notification/ToastContainer';
import AppRoutes from './routes/AppRoutes';
import { setBodyHeight } from './utils/setBodyHeight';
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
      <ErrorBoundary fallback={<GlobalError />}>
        <Suspense fallback={<Progress />}>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
