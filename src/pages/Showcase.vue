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
          <p>{{ $t('showcase.feels_like') }}: {{weatherData?Math.round(weatherData.main.feels_like)+'°'+cOrf:$t('showcase.loading')}}</p>
          <p>{{ $t('showcase.humidity') }}: {{weatherData?weatherData.main.humidity+'%':$t('showcase.loading')}}</p>
          <p>{{ $t('showcase.precipitation') }}: {{ weatherData ? (weatherData.rain?.['1h'] ?? weatherData.snow?.['1h'] ?? 0) + ' ' + rainUnit : $t('showcase.loading') }}</p>
          <p>{{ $t('showcase.wind') }}: {{ weatherData ? $t(`directions.${getWindDirection(weatherData.wind.deg)}`) + ' / ' + Math.round(weatherData.wind.speed) + ' ' + standardMetric : $t('showcase.loading') }}</p>
          <p>{{ $t('showcase.hi_low') }}: {{weatherData?Math.round(weatherData.main.temp_max)+'°'+cOrf+' / '+Math.round(weatherData.main.temp_min)+'°'+cOrf:$t('showcase.loading')}}</p>
          <p>{{ $t('showcase.sun') }}: {{ formatHour(weatherData.sys.sunrise) }}/{{ formatHour(weatherData.sys.sunset) }} UTC</p>
        </div>
      </div>
      <div class="row-five" v-if="forecast?.list?.length">
        <div class="days"> 
          <p class="date">{{ formatMonthDay(weatherData?.dt) }}</p>
          <img :src="weatherData?.weather?.[0]?.icon ? getIconUrl(weatherData.weather[0].icon) : '../assets/loading.gif'" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ weatherData?.main ? Math.round(weatherData.main.temp_max)+'°'+cOrf+' / '+Math.round(weatherData.main.temp_min)+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(dayTwo?.items?.[0]?.dt) }}</p>
          <img :src="dayTwo?.items?.[0]?.weather?.[0]?.icon ? getIconUrl(dayTwo.items[0].weather[0].icon) : '../assets/loading.gif'" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ dayTwo?.min?.length ? Math.round(dayTwo.max[dayTwo.max.length-1])+'°'+cOrf+' / '+Math.round(dayTwo.min[0])+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(dayThree?.items?.[0]?.dt) }}</p>
          <img :src="dayThree?.items?.[0]?.weather?.[0]?.icon ? getIconUrl(dayThree.items[0].weather[0].icon) : '../assets/loading.gif'" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ dayThree?.min?.length ? Math.round(dayThree.max[dayThree.max.length-1])+'°'+cOrf+' / '+Math.round(dayThree.min[0])+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(dayFour?.items?.[0]?.dt) }}</p>
          <img :src="dayFour?.items?.[0]?.weather?.[0]?.icon ? getIconUrl(dayFour.items[0].weather[0].icon) : '../assets/loading.gif'" alt="Weather icon" class="small-weather-icon">
          <p class="s-min-max">{{ dayFour?.min?.length ? Math.round(dayFour.max[dayFour.max.length-1])+'°'+cOrf+' / '+Math.round(dayFour.min[0])+'°'+cOrf : $t('showcase.loading') }}</p>
        </div>
        <div class="days">
          <p class="date">{{ formatMonthDay(dayFive?.items?.[0]?.dt) }}</p>
          <img :src="dayFive?.items?.[0]?.weather?.[0]?.icon ? getIconUrl(dayFive.items[0].weather[0].icon) : '../assets/loading.gif'" alt="Weather icon" class="-small-weather-icon">
          <p class="s-min-max">{{ dayFive?.min?.length ? Math.round(dayFive.max[dayFive.max.length-1])+'°'+cOrf+' / '+Math.round(dayFive.min[0])+'°'+cOrf : $t('showcase.loading') }}</p>
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
import { useHead } from '@vueuse/head' // This is needed for the SEO
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location'
import { useWeatherStore } from '@/stores/weather'
import { useImageStore } from '@/stores/image'
import { useLanguageStore } from '@/stores/language'

const locationStore = useLocationStore()
const { city } = storeToRefs(locationStore)
const languageStore = useLanguageStore()
const { formatMonthDay } = languageStore
const weatherStore = useWeatherStore()
const { weatherData } = storeToRefs(weatherStore)
const { forecast } = storeToRefs(weatherStore)
const imageStore = useImageStore()
const { cityImage } = storeToRefs(imageStore)
const { dayOne } = storeToRefs(weatherStore)
const { dayTwo } = storeToRefs(weatherStore)
const { dayThree } = storeToRefs(weatherStore)
const { dayFour } = storeToRefs(weatherStore)
const { dayFive } = storeToRefs(weatherStore)

// This is for SEO
useHead({
  title: 'Joel Armenta - Jr. Fullstack Web Developer',
  meta: [
    { name: 'description', content: 'Junior Fullstack Web Developer skilled in Ruby, Ruby on Rails, HTML, CSS, Sass, JavaScript, Vue, Pinia, SQL, i18n, VueMeta, Docker.' },
    { name: 'keywords', content: 'vue, ruby, rails, html, css, sass, javascript, pinia, sql, i18n, vue-meta, docker, web developer' },
    { property: 'og:title', content: 'Joel Armenta - Jr. Fullstack Web Developer' },
    { property: 'og:description', content: 'Portfolio of a Jr. Fullstack Web Developer proficient in Ruby, Rails, Vue.js, and modern web development tools.' },
  ],
})

const standardMetric = ref("kph")
const rainUnit = ref('mm')
const celsius = ref(true)

if (city.value === '') city.value = 'Miami'

const cOrf = ref('C')
const fAndC = ref('F')

// This function turns not only Celsius to Fahrenheit but also kph to mph milimeters to inches
function cToF() {
  if (!weatherData.value?.main) return
  const main = weatherData.value.main

  if (celsius.value) {
    // °C → °F
    localStorage.setItem('celsius', true)
    main.temp = Math.round(main.temp * 1.8 + 32)
    main.feels_like = Math.round(main.feels_like * 1.8 + 32)
    main.temp_max = Math.round(main.temp_max * 1.8 + 32)
    main.temp_min = Math.round(main.temp_min * 1.8 + 32)
    if (weatherData.value?.rain?.['1h']) {
      weatherData.value.rain['1h'] = Math.round(weatherData.value.rain['1h'] / 25.4 * 100) / 100
    }
    if (weatherData.value?.snow?.['1h']) {
      weatherData.value.snow['1h'] = Math.round(weatherData.value.snow['1h'] / 25.4 * 100) / 100
    }
    if (dayOne?.value?.min?.length) dayOne.value.min[0] = Math.round(dayOne.value.min[0] * 1.8 + 32)
    if (dayOne?.value?.max?.length) dayOne.value.max[dayOne.value.max.length - 1] = Math.round(dayOne.value.max[dayOne.value.max.length - 1] * 1.8 + 32)
    if (dayTwo?.value?.min?.length) dayTwo.value.min[0] = Math.round(dayTwo.value.min[0] * 1.8 + 32)
    if (dayTwo?.value?.max?.length) dayTwo.value.max[dayTwo.value.max.length - 1] = Math.round(dayTwo.value.max[dayTwo.value.max.length - 1] * 1.8 + 32)
    if (dayThree?.value?.min?.length) dayThree.value.min[0] = Math.round(dayThree.value.min[0] * 1.8 + 32)
    if (dayThree?.value?.max?.length) dayThree.value.max[dayThree.value.max.length - 1] = Math.round(dayThree.value.max[dayThree.value.max.length - 1] * 1.8 + 32)
    if (dayFour?.value?.min?.length) dayFour.value.min[0] = Math.round(dayFour.value.min[0] * 1.8 + 32)
    if (dayFour?.value?.max?.length) dayFour.value.max[dayFour.value.max.length - 1] = Math.round(dayFour.value.max[dayFour.value.max.length - 1] * 1.8 + 32)
    if (dayFive?.value?.min?.length) dayFive.value.min[0] = Math.round(dayFive.value.min[0] * 1.8 + 32)
    if (dayFive?.value?.max?.length) dayFive.value.max[dayFive.value.max.length - 1] = Math.round(dayFive.value.max[dayFive.value.max.length - 1] * 1.8 + 32)
    weatherData.value.wind.speed = Math.round(weatherData.value.wind.speed / 1.6)
    standardMetric.value = "mph"
    cOrf.value = 'F'
    fAndC.value = 'C'
    rainUnit.value = "in"
  } else {
    // °F → °C
    localStorage.setItem('celsius', false)
    main.temp = Math.round((main.temp - 32) / 1.8)
    main.feels_like = Math.round((main.feels_like - 32) / 1.8)
    main.temp_max = Math.round((main.temp_max - 32) / 1.8)
    main.temp_min = Math.round((main.temp_min - 32) / 1.8)
    if (weatherData.value?.rain?.['1h']) {
      weatherData.value.rain['1h'] = Math.round(weatherData.value.rain['1h'] * 25.4)
    }
    if (weatherData.value?.snow?.['1h']) {
      weatherData.value.snow['1h'] = Math.round(weatherData.value.snow['1h'] * 25.4)
    }
    if (dayOne?.value?.min?.length) dayOne.value.min[0] = Math.round((dayOne.value.min[0] - 32) / 1.8)
    if (dayOne?.value?.max?.length) dayOne.value.max[dayOne.value.max.length - 1] = Math.round((dayOne.value.max[dayOne.value.max.length - 1] - 32) / 1.8)
    if (dayTwo?.value?.min?.length) dayTwo.value.min[0] = Math.round((dayTwo.value.min[0] - 32) / 1.8)
    if (dayTwo?.value?.max?.length) dayTwo.value.max[dayTwo.value.max.length - 1] = Math.round((dayTwo.value.max[dayTwo.value.max.length - 1] - 32) / 1.8)
    if (dayThree?.value?.min?.length) dayThree.value.min[0] = Math.round((dayThree.value.min[0] - 32) / 1.8)
    if (dayThree?.value?.max?.length) dayThree.value.max[dayThree.value.max.length - 1] = Math.round((dayThree.value.max[dayThree.value.max.length - 1] - 32) / 1.8)
    if (dayFour?.value?.min?.length) dayFour.value.min[0] = Math.round((dayFour.value.min[0] - 32) / 1.8)
    if (dayFour?.value?.max?.length) dayFour.value.max[dayFour.value.max.length - 1] = Math.round((dayFour.value.max[dayFour.value.max.length - 1] - 32) / 1.8)
    if (dayFive?.value?.min?.length) dayFive.value.min[0] = Math.round((dayFive.value.min[0] - 32) / 1.8)
    if (dayFive?.value?.max?.length) dayFive.value.max[dayFive.value.max.length - 1] = Math.round((dayFive.value.max[dayFive.value.max.length - 1] - 32) / 1.8)
    weatherData.value.wind.speed = Math.round(weatherData.value.wind.speed * 1.6)
    standardMetric.value = "kph"
    cOrf.value = 'C'
    fAndC.value = 'F'
    rainUnit.value = "mm"
  }
  celsius.value = !celsius.value
}

function formatHour(dt) {
  if (!dt) return '';
  const date = new Date(dt * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function getIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

function getWindDirection(deg) {
  if (deg === undefined || deg === null) return '—';

  deg = deg % 360;
  if (deg < 0) deg += 360;

  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;  // 22.5° per direction

  return directions[index];
}
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
    min-height: 0;
    overflow-y: auto;
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
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.300);
  }

  .row-one > .name {
    font-size: 25px;
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
    flex-grow: 1;
    padding-left: 50px;
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
    font-size: min(2.5vw, 14px);
    margin: 0 auto;
  }

  .days :last-child {
    margin-bottom: 5px;
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