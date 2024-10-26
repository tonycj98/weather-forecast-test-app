<template>
  <div class="home">
    <SearchCity @place-changed="handlePlaceChange" />
    <WeatherForecast :place="place" />
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
