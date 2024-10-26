import WeatherService from "@/services/weather-service.service";
import { Options, Vue } from "vue-class-component";
import { Inject, Prop, Watch } from "vue-property-decorator";
import WeatherCard from "@/components/WeatherCard.vue";

@Options({
  props: {
    place: Object,
  },
  components: {
    WeatherCard,
  },
})
export default class WeatherForecast extends Vue {
  @Inject("weatherService")
  public weatherService!: WeatherService;

  @Prop()
  place!: { lat: number; lng: number } | null;

  /*
  mounted() {
    // TODO - use the latitude and longitude from the search city component
    // TODO - display the weather forecast in the template
    // TODO - Error handling, if the API call fails we should display an error message
    this.weatherService.getWeatherForecast(52.52, 13.419998).then((res) => {
      console.log(res);
    });
  }
  */

  @Watch("place", { immediate: true, deep: true })
  onPlaceChanged(newPlace: { lat: number; lng: number }) {
    if (newPlace) {
      this.fetchWeather(newPlace);
    }
  }

  fetchWeather({ lat, lng }: { lat: number; lng: number }) {
    this.weatherService
      .getWeatherForecast(lat, lng)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
