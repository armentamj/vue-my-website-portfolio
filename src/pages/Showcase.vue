<template>
  <div v-if="weatherData" class="main-content">
    <div class="main-sub sub-two">
      <div class="row-one">
        <button class="switch" :title="$t('showcase.switch_to')" @click="cToF">{{ fAndC }}</button>
        <p class="name">{{weatherData.name}}, {{ weatherData.sys.country }}</p>
      </div>
      <div class="row-two">
        <p>{{ $t('showcase.current_temp') }}</p>
        <div class="row-three">
          <h2>{{weatherData?Math.round(weatherData.main.temp)+'°'+cOrf:$t('showcase.loading')}}</h2>
        </div>
      </div>
      <div class="row-four">
        <div class="big-icon">
          <img :src="weatherData?getIconUrl(weatherData.weather[0].icon):'../assets/loading.gif'" :alt="weatherData?weatherData.weather[0].description:$t('showcase.loading')">
        </div>
        <div class="info">
          <p>{{ $t('showcase.humidity') }}: {{weatherData?weatherData.main.humidity+'%':$t('showcase.loading')}}</p>
          <p>{{ $t('showcase.precipitation') }}: {{ weatherData ? Math.round(weatherData.rain?.['1h'] || 0) + ' mm' : $t('showcase.loading') }}</p>
          <p>{{ $t('showcase.wind') }}: {{weatherData?weatherData.wind.deg+'° / '+Math.round(weatherData.wind.speed)+' kph':$t('showcase.loading')}}</p>
          <p>{{ $t('showcase.hi_low') }}: {{weatherData?Math.round(weatherData.main.temp_max)+'°'+cOrf+' / '+Math.round(weatherData.main.temp_min)+'°'+cOrf:$t('showcase.loading')}}</p>
          <p>{{ $t('showcase.feels_like') }}: {{weatherData?Math.round(weatherData.main.feels_like)+'°'+cOrf:$t('showcase.loading')}}</p>
        </div>
      </div>
      <div class="row-five" v-if="forecast?.list?.length">
        <div class="days">
          
          <p class="date">{{ formatMonthDay(forecast.list[6].dt) }}</p>
          <img :src="`https://openweathermap.org/img/wn/${forecast.list[6].weather[0].icon}@2x.png`" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ forecast?.list?.[6] ? Math.round(forecast.list[6].main.temp_max)+'°'+cOrf+' / '+Math.round(forecast.list[2].main.temp_min)+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(forecast.list[14].dt) }}</p>
          <img :src="`https://openweathermap.org/img/wn/${forecast.list[14].weather[0].icon}@2x.png`" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ forecast?.list?.[14] ? Math.round(forecast.list[14].main.temp_max)+'°'+cOrf+' / '+Math.round(forecast.list[10].main.temp_min)+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(forecast.list[22].dt) }}</p>
          <img :src="`https://openweathermap.org/img/wn/${forecast.list[22].weather[0].icon}@2x.png`" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ forecast?.list?.[22] ? Math.round(forecast.list[22].main.temp_max)+'°'+cOrf+' / '+Math.round(forecast.list[18].main.temp_min)+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(forecast.list[30].dt) }}</p>
          <img :src="`https://openweathermap.org/img/wn/${forecast.list[30].weather[0].icon}@2x.png`" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ forecast?.list?.[30] ? Math.round(forecast.list[30].main.temp_max)+'°'+cOrf+' / '+Math.round(forecast.list[26].main.temp_min)+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(forecast.list[38].dt) }}</p>
          <img :src="`https://openweathermap.org/img/wn/${forecast.list[38].weather[0].icon}@2x.png`" alt="Weather icon" class="-small-weather-icon">
          <p class="s-min-max">{{ forecast?.list?.[38] ? Math.round(forecast.list[38].main.temp_max)+'°'+cOrf+' / '+Math.round(forecast.list[34].main.temp_min)+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
      </div>
      <div v-else class="row-five-loading">
        <a>Loading 5-day forecast...</a>
      </div>
    </div>
    <div class="main-sub sub-one">
      <div class="img-container" :style="{ backgroundImage: `url(${cityImage})` }">
        <input type="text" :placeholder="$t('about.place_holder')" v-model="city">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location'
import { useWeatherStore } from '@/stores/weather'
import { useImageStore } from '@/stores/image'

const locationStore = useLocationStore()
const { city, location } = storeToRefs(locationStore)
const weatherStore = useWeatherStore()
const { weatherData } = storeToRefs(weatherStore)
const { forecast } = storeToRefs(weatherStore)
const imageStore = useImageStore()
const { cityImage } = storeToRefs(imageStore)

if (city.value === '') city.value = 'Miami'

const searchQuery = ref('Miami')
const apiKey = '46c9ee8f1274c2734c84066d7b4ffabe'
const pexelsApiKey = 'CYJ2yN02aKa6NXFHENRS20ck9BV76yEJYQyWwiWaZt1wYBV1pv6sJfhE'
const coordinates = ref(null)
const forecastError = ref(null)
const celsius = ref(true)
const cOrf = ref('C')
const fAndC = ref('F')

function getFallbackImage(city) {
  const seed = city.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 100)
  return `https://picsum.photos/seed/${seed}/1920/1080`
}

// async function loadCityBackground(city) {
//   if (!city?.trim()) return
//   try {
//     const query = `${city} skyline`.trim()
//     const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`
//     const response = await fetch(url, { headers: { Authorization: pexelsApiKey } })
//     if (!response.ok) throw new Error(`Pexels failed: ${response.status}`)
//     const data = await response.json()
//     if (data.photos?.length > 0) {
//       const randomIndex = Math.floor(Math.random() * data.photos.length)
//       cityImage.value = data.photos[randomIndex].src.large2x
//     } else {
//       cityImage.value = getFallbackImage(city)
//     }
//   } catch (error) {
//     console.error('Pexels image load error:', error)
//     cityImage.value = getFallbackImage(city)
//   }
// }


// async function fetchCoordinates() {
//   const findie = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=1&appid=${apiKey}`)
//   coordinates.value = await findie.json()
//   console.log('Coordinates:', coordinates.value)
// }

// async function fetchWeather() {
//   if (!location.value?.length) return
//   const { lat, lon } = location.value[0]
//   const lookUp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
//   weatherData.value = await lookUp.json()
//   console.log("weather api loaded:", weatherData.value)
// }

// async function fetchFiveDay() {
//   if (!coordinates.value?.[0]?.lat || !coordinates.value?.[0]?.lon) {
//     console.warn("Coordinates not available for forecast fetch");
//     forecastError.value = "Missing coordinates";
//     return;
//   }

//   const  lat = coordinates.value[0].lat;
//   const  lon = coordinates.value[0].lon;

//   try {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`Forecast API failed: ${response.status} ${response.statusText}`);
//     }
    
//     const data = await response.json();
//     forecast.value = data;
//     console.log("5-day forecast loaded:", forecast.value);
//   } catch (err) {
//     forecastError.value = err.message || 'Failed to load 5-day forecast';
//     console.error("Forecast error:", err);
//   }
// }

// function capitalize(str = "") {
//   return str.trim().split(/\s+/g).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
// }

function cToF() {
  if (!weatherData.value?.main) return
  const main = weatherData.value.main
  console.log("forecast loaded", forecast)
  if (celsius.value) {
    // °C to °F
    main.temp = Math.round(main.temp * 1.8 + 32)
    main.feels_like = Math.round(main.feels_like * 1.8 + 32)
    main.temp_max = Math.round(main.temp_max * 1.8 + 32)
    main.temp_min = Math.round(main.temp_min * 1.8 + 32)
    // forecast.value[2].main.temp_min = Math.round(forecast.value.list[2].main.temp_min * 1.8 + 32)
    // forecast[6].main.temp_max = Math.round(forecast.list[6].main.temp_max * 1.8 + 32)
    // forecast[10].main.temp_min = Math.round(forecast.list[10].main.temp_min * 1.8 + 32)
    // forecast[14].main.temp_max = Math.round(forecast.list[14].main.temp_max * 1.8 + 32)
    // forecast[18].main.temp_min = Math.round(forecast.list[18].main.temp_min * 1.8 + 32)
    // forecast[22].main.temp_max = Math.round(forecast.list[22].main.temp_max * 1.8 + 32)
    // forecast[26].main.temp_min = Math.round(forecast.list[26].main.temp_min * 1.8 + 32)
    // forecast[30].main.temp_max = Math.round(forecast.list[30].main.temp_max * 1.8 + 32)
    // forecast[34].main.temp_min = Math.round(forecast.list[34].main.temp_min * 1.8 + 32)
    // forecast[38].main.temp_max = Math.round(forecast.list[38].main.temp_max * 1.8 + 32)
    cOrf.value = 'F'
    fAndC.value = 'C'
  } else {
    // °F to °C
    main.temp = Math.round((main.temp - 32) / 1.8)
    main.feels_like = Math.round((main.feels_like - 32) / 1.8)
    main.temp_max = Math.round((main.temp_max - 32) / 1.8)
    main.temp_min = Math.round((main.temp_min - 32) / 1.8)
    // forecast.value[2].main.temp_min = Math.round((forecast.value[2].main.temp_min - 32) / 1.8)
    // forecast.value[6].main.temp_max = Math.round((forecast.list[6].main.temp_max - 32) / 1.8)
    // forecast.value[10].main.temp_min = Math.round((forecast.list[10].main.temp_min - 32) / 1.8)
    // forecast.value[14].main.temp_max = Math.round((forecast.list[14].main.temp_max - 32) / 1.8)
    // forecast.value[18].main.temp_min = Math.round((forecast.list[18].main.temp_min - 32) / 1.8)
    // forecast.value[22].main.temp_max = Math.round((forecast.list[22].main.temp_max - 32) / 1.8)
    // forecast.value[26].main.temp_min = Math.round((forecast.list[26].main.temp_min - 32) / 1.8)
    // forecast.value[30].main.temp_max = Math.round((forecast.list[30].main.temp_max - 32) / 1.8)
    // forecast.value[34].main.temp_min = Math.round((forecast.list[34].main.temp_min - 32) / 1.8)
    // forecast.value[38].main.temp_max = Math.round((forecast.list[38].main.temp_max - 32) / 1.8)
    cOrf.value = 'C'
    fAndC.value = 'F'
  }
  celsius.value = !celsius.value
}

function formatMonthDay(dt) {
  if (!dt) return
  const date = new Date(dt * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric'
  });
}

async function handleSearch() {
  // await loadCityBackground(searchQuery.value)
  // await fetchCoordinates()
  // await fetchWeather()
  // await fetchFiveDay()
  // searchQuery.value = capitalize(searchQuery.value)
}

function getIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

handleSearch()

</script>

<style>
  .img-container {
    border-radius: 3px;
    width: 100%;
    height: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-content: center;
  }


  .main-content > .sub-two {
    height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
  }

  .main-content > .sub-one {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 90vh;
    box-sizing: border-box;
  }

  .row-one {
    text-align: center;
  }
  
  .switch {
    position: absolute;
    top: 15px;
    left: 15px;
    margin: 0;
    padding: 0;
    font-size: 30px;
    height: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    cursor: pointer;
    background-color: transparent;
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.2);
  }

  .row-one > .name {
    font-size: 40px;
    margin-top: 0;
    height: 76px;
  }
  .row-two {
    text-align: center;
  }
  
  .row-two > p {
    margin: 0;
  }
  
  .row-three {
    text-align: center;
  }
  .row-three > h2 {
    font-size: 80px;
    margin: 0;
    line-height: 0.8;
  }
  .row-four {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 50px;
    flex-wrap: nowrap;
  }
  .info {
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: 1fr;
  }
  .info > p {
    font-size: min(4vw, 20px);
    margin: 10px 0;
  }
  .big-icon {
    width: fit-content;
    height: fit-content;
  }
  .big-icon > img {
    width: 225px;
    height: 225px;
    object-fit: cover;
    filter: brightness(150%);
  }

  .row-five {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    border: 1px solid white;
    border-radius: 5px;
    margin-top: 10px;
  }

  .row-five-loading {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    border-radius: 5px;
    margin-top: 10px;
  }

  .row-five-loading > a {
    font-size: 32px;
    text-align: center;
  }

  .days {
    display: grid;
    grid-template-rows: 3fr;
    grid-template-columns: 1fr;
    row-gap: 20px;
  }

  .row-five > *:not(:last-child) {
    border-right: 1px white solid;
  }

  .days > p {
    font-size: min(3vw, 16px);
    margin: 0 auto;
  }

  .days > img {
    max-width: 90px;
    width: 15vw;
    aspect-ratio: 1/1;
    height: auto;
    place-self: center;
    filter: brightness(150%);
  }

  .img-container > input {
    margin: 10px 30px;
    border-radius: 6px;
    height: 40px;
    box-shadow: none;
    font-size: large;
    border: none;
    padding-left: 20px;
  }
</style>