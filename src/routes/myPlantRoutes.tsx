import { lazy } from 'react';

const MyPlantPage = lazy(() => import('@/pages/myPlantPage/MyPlantPage'));
const MyPlantDetailPage = lazy(
  () => import('@/pages/myPlantPage/myPlantDetailPage/MyPlantDetailPage'),
);
const MyPlantRegisterPage = lazy(
  () => import('@/pages/myPlantPage/myPlantRegisterPage/MyPlantRegisterPage'),
);
const MyPlantEditPage = lazy(
  () => import('@/pages/myPlantPage/myPlantEditPage/MyPlantEditPage'),
);

const myPlantRoutes = [
  { path: '/myplant', element: <MyPlantPage /> },
  { path: '/myplant/:docId', element: <MyPlantDetailPage /> },
  { path: '/myplant/:docId/edit', element: <MyPlantEditPage /> },
  { path: '/myplant/register', element: <MyPlantRegisterPage /> },
];

export default myPlantRoutes;
