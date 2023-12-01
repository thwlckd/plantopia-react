import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { WeatherResponse } from '@/@types/weather.type';
import { Coordinates, getGeolocation } from '@/utils/getGeolocation';

const fetchWeatherInfo = ({
  latitude,
  longitude,
}: Coordinates): Promise<AxiosResponse<WeatherResponse>> => {
  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
      units: 'metric',
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
    },
  });

  return instance.get('weather');
};

const useWeatherData = () => {
  const { data, isLoading } = useQuery(
    ['weather'],
    async () => {
      const coor = await getGeolocation();
      return fetchWeatherInfo(coor);
    },
    {
      staleTime: 600000,
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading };
};

export default useWeatherData;
