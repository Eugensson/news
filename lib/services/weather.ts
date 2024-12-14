export const getCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=dbe190140250d3087dbd292674c0b7da`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather data");
  }
};
