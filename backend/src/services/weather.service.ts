import { getAPI } from "../adapters/xhr";

export interface ForecastModel {
  latitude: number;
  longitude: number;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: Date;
  };
}

export async function getWeatherForecast(
  lat: number,
  lng: number
): Promise<ForecastModel> {
  // TODO: make a call to this API with latitude and longitude from the frontend
  // use axios to make the call
  //  https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true

  let response: any;

  try {
    response = await getAPI(
      `/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );

    if (response?.statusText !== "OK") {
      console.error("Response not OK", response);
      throw new Error("Response not OK");
    }
  } catch (error) {
    console.log(
      `Error in getAPI "/forecast?latitude=${lat}&longitude=${lng}&current_weather=true"`
    );
    throw error;
  }

  const {
    latitude,
    longitude,
    elevation,
    current_weather: {
      temperature,
      windspeed,
      winddirection,
      weathercode,
      time,
    },
  } = response?.data || {};

  if (
    latitude == null ||
    longitude == null ||
    elevation == null ||
    temperature == null ||
    windspeed == null ||
    winddirection == null ||
    weathercode == null ||
    time == null
  ) {
    console.log(
      "One or more extracted data is null or undefined",
      response?.data
    );
    throw new Error("One or more extracted data is null or undefined");
  }

  return {
    latitude,
    longitude,
    elevation,
    current_weather: {
      temperature,
      windspeed,
      winddirection,
      weathercode,
      time,
    },
  };

  // return {
  //   latitude: 52.52,
  //   longitude: 13.41,
  //   elevation: 0,
  //   current_weather: {
  //     temperature: 10,
  //     windspeed: 10,
  //     winddirection: 10,
  //     weathercode: 10,
  //     time: new Date(),
  //   },
  // };
}
