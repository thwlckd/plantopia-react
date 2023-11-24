import { useCallback } from 'react';
import { weatherContents } from '@/constants/weather';

import LOCATION from '@/assets/images/icons/location.png';
import { useWeatherData } from '@/hooks';

const WeatherSection = () => {
  const {
    data: weatherInfo,
    // isLoading,
  } = useWeatherData();

  const formatTemperature = useCallback(
    (temp: number) => `${Math.floor(temp)}°`,
    [],
  );

  const getWeatherContent = useCallback((code?: number) => {
    if (!code) return;

    return weatherContents[code] || weatherContents[code - (code % 100)];
  }, []);

  const content = getWeatherContent(weatherInfo?.data.weather[0].id);

  return weatherInfo && content ? (
    <div className="weather_wrapper">
      <div className="text_wrapper">
        <div className="location_wrapper">
          <img src={LOCATION} className="weather_icon" alt="location" />
          <span className="text">{weatherInfo.data.name}</span>
        </div>
        <div className="weather_text_box temperature_wrapper">
          <span className="text_lg">
            {content.title} {formatTemperature(weatherInfo.data.main.temp)}
          </span>
          <span className="text_sm">
            {formatTemperature(weatherInfo.data.main.temp_max)}
          </span>
          <span className="text_sm">
            {formatTemperature(weatherInfo.data.main.temp_min)}
          </span>
        </div>
        <div className="weather_text_box">{content.description}</div>
      </div>
      <img src={content.imgSrc} className="weather_icon" alt="weather" />
    </div>
  ) : (
    <div>loading..</div>
  );
};

export default WeatherSection;
