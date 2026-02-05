<template>
  <div class="main-content">
    <div class="main-sub sub-two">
      <div class="row-one">
        <button class="switch" :title="$t('showcase.switch_to')" @click="cToF">{{ fAndC }}</button>
        <p class="name">{{searchQuery}}</p>
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
    </div>
    <div class="main-sub sub-one">
      <div class="img-container" :style="{ backgroundImage: `url(${cityImage})` }">
        <p class="pretty_city_name">{{searchQuery}}</p>
        <input type="text" :placeholder="$t('showcase.search_placeholder')" v-model="searchQuery" @keyup.enter="handleSearch">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const test = fetch('/api/weather?search=test')
const searchQuery = ref('Miami')
const apiKey = '46c9ee8f1274c2734c84066d7b4ffabe'
const pexelsApiKey = 'CYJ2yN02aKa6NXFHENRS20ck9BV76yEJYQyWwiWaZt1wYBV1pv6sJfhE'
const coordinates = ref(null)
const weatherData = ref(null)
const cityImage = ref('')
const error = ref(null)
const loading = ref(null)
const celsius = ref(true)
const cOrf = ref('C')
const fAndC = ref('F')

function getFallbackImage(city) {
  const seed = city.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 100)
  return `https://picsum.photos/seed/${seed}/1920/1080`
}

async function loadCityBackground(city) {
  if (!city?.trim()) return
  try {
    const query = `${city} skyline`.trim()
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`
    const response = await fetch(url, { headers: { Authorization: pexelsApiKey } })
    if (!response.ok) throw new Error(`Pexels failed: ${response.status}`)
    const data = await response.json()
    if (data.photos?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.photos.length)
      cityImage.value = data.photos[randomIndex].src.large2x
    } else {
      cityImage.value = getFallbackImage(city)
    }
  } catch (error) {
    console.error('Pexels image load error:', error)
    cityImage.value = getFallbackImage(city)
  }
}

async function fetchCoordinates() {
  const findie = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=1&appid=${apiKey}`)
  coordinates.value = await findie.json()
  console.log('Coordinates:', coordinates.value)
}

async function fetchWeather() {
  if (!coordinates.value?.length) return
  const { lat, lon } = coordinates.value[0]
  const lookUp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
  weatherData.value = await lookUp.json()
  console.log('Weather:', weatherData.value)
  if (!celsius.value) convertToCurrentUnit()
}

function capitalize(str = "") {
  return str.trim().split(/\s+/g).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
}

function convertToCurrentUnit() {
  if (!weatherData.value?.main) return
  const main = weatherData.value.main
  main.temp = Math.round(main.temp * 1.8 + 32)
  main.feels_like = Math.round(main.feels_like * 1.8 + 32)
  main.temp_max = Math.round(main.temp_max * 1.8 + 32)
  main.temp_min = Math.round(main.temp_min * 1.8 + 32)
}

function cToF() {
  if (!weatherData.value?.main) return
  const main = weatherData.value.main
  if (celsius.value) {
    // °C → °F
    main.temp = Math.round(main.temp * 1.8 + 32)
    main.feels_like = Math.round(main.feels_like * 1.8 + 32)
    main.temp_max = Math.round(main.temp_max * 1.8 + 32)
    main.temp_min = Math.round(main.temp_min * 1.8 + 32)
    cOrf.value = 'F'
    fAndC.value = 'C'
  } else {
    // °F → °C
    main.temp = Math.round((main.temp - 32) / 1.8)
    main.feels_like = Math.round((main.feels_like - 32) / 1.8)
    main.temp_max = Math.round((main.temp_max - 32) / 1.8)
    main.temp_min = Math.round((main.temp_min - 32) / 1.8)
    cOrf.value = 'C'
    fAndC.value = 'F'
  }
  celsius.value = !celsius.value
}

async function handleSearch() {
  await loadCityBackground(searchQuery.value)
  await fetchCoordinates()
  await fetchWeather()
  searchQuery.value = capitalize(searchQuery.value)
}

function getIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

handleSearch()

</script>

<style>
  .img-container {
    border-radius: 3px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
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
    justify-content: space-between;
    align-content: center;
  }
  .main-content > .sub-one {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 90vh;
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
    font-size: 50px;
    margin-bottom: 0;
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
    font-size: clamp( 70px, 7vw, 130px);
    margin: 0;
  }
  .row-four {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .info {
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: 1fr;
  }
  .info > p {
    font-size: clamp( 25px, 1.25vw, 2vw);
  }
  .big-icon {
    width: 60%;
    height: auto;
  }
  .big-icon > img {
    width: clamp(100px, 250px, 350px);
    height: clamp(100px, 250px, 350px);
    object-fit: cover;
  }

  .pretty_city_name {
    position: absolute;
    left: 25px;
    top: 25px;
    transform: rotateZ(-45deg);
    font-family: "Yellowtail", cursive;
    font-size: 50px;
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