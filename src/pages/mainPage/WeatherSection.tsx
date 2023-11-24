import { useCallback } from 'react';
import { weatherContents } from '@/constants/weather';
import Skeleton from 'react-loading-skeleton';

import LOCATION from '@/assets/images/icons/location.png';
import { useWeatherData } from '@/hooks';

const WeatherSection = () => {
  const { data: weatherInfo, isLoading } = useWeatherData();

  const formatTemperature = useCallback(
    (temp: number | undefined) => temp && `${Math.floor(temp)}°`,
    [],
  );

  const getWeatherContent = useCallback((code?: number) => {
    if (!code) return;

    return weatherContents[code] || weatherContents[code - (code % 100)];
  }, []);

  const content = getWeatherContent(weatherInfo?.data.weather[0].id);

  return isLoading ? (
    <WeatherSkeleton />
  ) : (
    <div className="weather_wrapper">
      <div className="text_wrapper">
        <div className="location_wrapper">
          <img src={LOCATION} className="weather_icon" alt="location" />
          <span className="text">{weatherInfo?.data.name}</span>
        </div>
        <div className="weather_text_box temperature_wrapper">
          <span className="text_lg">
            {content?.title} {formatTemperature(weatherInfo?.data.main.temp)}
          </span>
          <span className="text_sm">
            {formatTemperature(weatherInfo?.data.main.temp_max)}
          </span>
          <span className="text_sm">
            {formatTemperature(weatherInfo?.data.main.temp_min)}
          </span>
        </div>
        <div className="weather_text_box">{content?.description}</div>
      </div>
      <img src={content?.imgSrc} className="weather_icon" alt="weather" />
    </div>
  );
};

const WeatherSkeleton = () => {
  return (
    <div className="weather_wrapper">
      <div className="text_wrapper">
        <Skeleton
          containerClassName="line_skeleton"
          width="5rem"
          height="1.5rem"
        />
        <Skeleton
          containerClassName="line_skeleton"
          width="10rem"
          height="1.5rem"
        />
        <Skeleton
          containerClassName="line_skeleton"
          width="15rem"
          height="1.5rem"
        />
      </div>
      <Skeleton
        className="img_skeleton"
        width="7rem"
        height="7rem"
        borderRadius="50%"
      />
    </div>
  );
};

export default WeatherSection;
