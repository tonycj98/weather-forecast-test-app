<template>
  <div class="font-poppins flex justify-center my-14">
    <div
      :class="`max-w-sm rounded-lg bg-gradient-to-r ${temperatureClass} shadow-lg hover:scale-110 transition-transform`"
    >
      <div class="bg-slate-50 rounded-lg overflow-hidden shadow-lg m-1.5 p-4">
        <h2 class="text-2xl font-bold text-zinc-700">Weather Forecast</h2>
        <div class="text-6xl my-4">
          <span
            :class="`bg-gradient-to-r ${temperatureClass} inline-block text-transparent bg-clip-text`"
            >{{ forecast.current_weather.temperature || "--" }}°C</span
          >
        </div>
        <div class="text-gray-600">
          <table class="table-auto">
            <tbody>
              <tr>
                <td class="text-right">Wind:</td>
                <td class="text-left pl-2 font-bold">
                  {{ forecast.current_weather.windspeed || "--" }} km/h
                </td>
              </tr>
              <tr>
                <td class="text-right">Wind Direction:</td>
                <td class="text-left pl-2 font-bold">
                  {{ forecast.current_weather.winddirection || "--" }}°
                </td>
              </tr>
              <tr>
                <td class="text-right">Weather Code:</td>
                <td class="text-left pl-2 font-bold">
                  {{ forecast.current_weather.weathercode || "--" }}
                </td>
              </tr>
              <tr>
                <td class="text-right">Time:</td>
                <td class="text-left pl-2 font-bold w-28">
                  {{
                    forecast.current_weather.time
                      ? new Date(forecast.current_weather.time).toLocaleString()
                      : "--"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { ForecastModel } from "@/services/weather-service.service";

const props = defineProps<{
  weatherData: { data: ForecastModel | null; error: boolean; loading: boolean };
}>();

const forecast = computed(() => {
  const nullCurrentWeatherData = {
    temperature: null,
    windspeed: null,
    winddirection: null,
    weathercode: null,
    time: null,
  };

  if (props?.weatherData?.data?.current_weather) {
    return props?.weatherData?.data;
  }
  if (props?.weatherData?.data) {
    return {
      ...props?.weatherData?.data,
      current_weather: nullCurrentWeatherData,
    };
  }
  return {
    latitude: null,
    longitude: null,
    elevation: null,
    current_weather: nullCurrentWeatherData,
  };
});

/*
const forecast = {
  value: {
    latitude: 37.7749,
    longitude: -122.4194,
    elevation: 16,
    current_weather: {
      temperature: 38,
      windspeed: 15,
      winddirection: 180,
      weathercode: 0,
      time: new Date(),
    },
  },
};
*/
const temperatureClass = computed(() => {
  const temp = forecast.value.current_weather.temperature || 0;
  if (temp <= 0) {
    return "from-indigo-500 to-blue-500";
  } else if (temp > 0 && temp <= 15) {
    return "from-blue-500 to-cyan-500";
  } else if (temp > 15 && temp <= 30) {
    return "from-green-500 to-yellow-500";
  } else {
    return "from-orange-500 to-red-500";
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
