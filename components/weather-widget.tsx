"use client";

import moment from "moment";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { getCurrentWeather } from "@/lib/services/weather";

export const WeatherWidget = () => {
  const currentDate = moment();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [data, setData] = useState({
    coord: {
      lon: 32.048,
      lat: 49.4438,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 2.39,
      feels_like: -0.66,
      temp_min: 2.39,
      temp_max: 2.39,
      pressure: 1018,
      humidity: 62,
      sea_level: 1018,
      grnd_level: 1005,
    },
    visibility: 10000,
    wind: {
      speed: 3.04,
      deg: 325,
      gust: 4.06,
    },
    clouds: {
      all: 0,
    },
    dt: 1709967878,
    sys: {
      country: "UA",
      sunrise: 1709957863,
      sunset: 1709999225,
    },
    timezone: 7200,
    id: 710791,
    name: "Cherkasy",
    cod: 200,
  });

  const currentDayOfWeek = currentDate.format("ddd");
  const formattedDate = currentDate.format("D MMM YYYY");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!latitude && !longitude) return;

    getCurrentWeather(latitude, longitude).then((response) =>
      setData(response)
    );
  }, [latitude, longitude]);

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <Card className="bg-violet-800 px-9 pt-8 pb-20 h-full">
      <CardContent className="h-full flex flex-col items-center justify-between font-secondary text-white">
        <div className="flex gap-3">
          <p className="px-2 py-1 text-7xl border-r-2 border-white my-auto">
            {Math.round(data.main.temp)}&deg;
          </p>
          <div className="flex flex-col gap-1 w-fit">
            <p className="text-3xl font-normal">{data.weather[0].main}</p>
            <p className="flex items-center gap-1 text-base p-2 bg-white/20 rounded-lg">
              <MapPin size={20} />
              {data.name}
            </p>
          </div>
        </div>

        <Image
          src={iconUrl}
          width={300}
          height={300}
          alt={data.weather[0].main}
          className="aspect-square"
        />

        <div>
          <p className="text-4xl text-center">{currentDayOfWeek}</p>
          <p className="text-4xl text-center">{formattedDate}</p>
        </div>
      </CardContent>
    </Card>
  );
};
