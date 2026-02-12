<template>
  <div class="main-content">
    <div class="cntct-shwcs-main-sub about-sub">
      <h1>{{ $t('about.h1') }}</h1>
      <h2 class="about-h2">{{ $t('about.h2one') }}</h2>
      <div class="grid">
        <div class="card1 cards"> <!--Cards sizes and layouts are determined by the perents grid-template-area. This also contrains the images -->
          <img src="../assets/london-bridge.jpg" :alt="$t('about.london')" :title="$t('about.london')"> <!--Images are set to 100% width and 100% hieght-->
        </div>
        <div class="card2 cards">
          <img src="../assets/madrid.jpg" :alt="$t('about.madrid')" :title="$t('about.madrid')">
        </div>
        <div class="card3 cards">
          <img src="../assets/mallorca_callador_carusel.jpg" :alt="$t('about.mallorca')" :title="$t('about.mallorca')">
        </div>
        <div class="card4 cards">
          <img src="../assets/los_angeles_carusel.jpg" :alt="$t('about.los_angeles')" :title="$t('about.los_angeles')">
        </div>
        <div class="card5 cards">
          <img src="../assets/miami_beach_carusel.jpg" :alt="$t('about.miami')" :title="$t('about.miami')">
        </div>
      </div>
      <h2 class="about-h2">{{ $t('about.h2two') }}</h2>
      <div class="carousels-container">
        <div class="carousel" :style="{ transform: `rotateY(${currentAngle}deg)` }">
          <div class="hobby-card1 hobbies-cards" ref="hobby1">
            <div class="flip-inner">
              <img class="front" src="../assets/gym.gif" :alt="$t('about.gym_alt')" :title="$t('about.gym_title')">
              <p class="backface">{{ $t('about.gym_backface') }}</p>
            </div>
          </div>
          <div class="hobby-card2 hobbies-cards" ref="hobby2">
            <div class="flip-inner">
              <img class="front" src="../assets/travelling.gif" :alt="$t('about.travel_alt')" :title="$t('about.travel_title')">
              <p class="backface">{{ $t('about.travel_backface') }}</p>
            </div>
          </div>
          <div class="hobby-card3 hobbies-cards" ref="hobby3">
            <div class="flip-inner">
              <img class="front" src="../assets/video-game-rage.gif" :alt="$t('about.video_games_alt')" :title="$t('about.video_games_title')">
              <p class="backface">{{ $t('about.video_games_backface') }}</p>
            </div>
          </div>
          <div class="hobby-card4 hobbies-cards" ref="hobby4">
            <div class="flip-inner">
              <img class="front" src="../assets/cooking.gif" :alt="$t('about.cooking_alt')" :title="$t('about.cooking_title')">
              <p class="backface">{{ $t('about.cooking_backface') }}</p>
            </div>
          </div>
          <div class="hobby-card5 hobbies-cards" ref="hobby5">
            <div class="flip-inner">
              <img class="front" src="../assets/beach.gif" :alt="$t('about.beach_alt')" :title="$t('about.beach_title')">
              <p class="backface">{{ $t('about.beach_backface') }}</p>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="button" @click="[prev(), handleAngle()]" :title="$t('about.prev')">{{ $t('about.prev') }}</button>
          <button class="button" @click="[next(), handleAngle()]" :title="$t('about.next')">{{ $t('about.next') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

  const currentAngle = ref(0)
  const step = 72  // 360° / 5 cards = 72°

  const next = () => {
    currentAngle.value -= step   //Clockwise rotation
    console.log(currentAngle)
  }

  const prev = () => {
    currentAngle.value += step   //Counter-clockwise rotation
    console.log(currentAngle)
  }

  const hobby1 = ref(null)
  const hobby2 = ref(null)
  const hobby3 = ref(null)
  const hobby4 = ref(null)
  const hobby5 = ref(null)

  function handleAngle() {
    // Remove 'turn' from all first (cleanup)
    [hobby1, hobby2, hobby3, hobby4, hobby5].forEach(hobby => {
      if (hobby.value.classList) {
        hobby.value.classList.remove('turn')
      }
    })

    // Add 'turn' to the matching one
    if (currentAngle.value === 0) {
      hobby1.value.classList.add('turn')
    } else if (currentAngle.value === 72) {
      hobby2.value.classList.add('turn')
    } else if (currentAngle.value === 144) {
      hobby3.value.classList.add('turn')
    } else if (currentAngle.value === 216) {
      hobby4.value.classList.add('turn')
    } else if (currentAngle.value === 288) {
      hobby5.value.classList.add('turn')
    }
  }
</script>

<style>
.main-content > .about-sub {
  height: fit-content;
  box-sizing: border-box;
}

.about-h2 {
  font-family: "Yellowtail", cursive;
  padding: 20px auto;
  font-size: 35px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
  grid-template-areas: "cardone cardone cardtwo" "cardthree cardfour cardtwo" "cardthree cardfive cardfive";
}

.cards {
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
}

.card1 {
  grid-area: cardone;
}
.card2 {
  grid-area: cardtwo;
}
.card3 {
  grid-area: cardthree;
}
.card4 {
  grid-area: cardfour;
}
.card5 {
  grid-area: cardfive;
}

.cards > img {
  border: solid 4px white;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-sizing: border-box;

}

.cards > img:hover {
  transform: scale(1.2);
  transition: transform ease-out 0.8s;
}

.carousels-container {
  margin: 40px auto;
  height: 537px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  perspective: 1500px;
  overflow: hidden;
}

.carousel {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-out;
}

.hobbies-cards {
  position: absolute;
  width: 250px;
  height: 300px;
  left: 50%;
  top: 50%;
  margin-left: -125px;
  margin-top: -150px;
  border-radius: 10px;
  transition: transform 0.7s ease-out;
  box-sizing: border-box;
  perspective: 1200px;
}

/* Initial positions – only base angles and also make the cards be 250px away from carousel center. */
.hobby-card1 {
  transform: rotateY(  0deg) translateZ(250px);
}
.hobby-card2 {
  transform: rotateY( 72deg) translateZ(250px);
}
.hobby-card3 {
  transform: rotateY(144deg) translateZ(250px);
}
.hobby-card4 {
  transform: rotateY(216deg) translateZ(250px);
}
.hobby-card5 {
  transform: rotateY(288deg) translateZ(250px);
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s ease-out;
  transform-style: preserve-3d;
}

.hobbies-cards:hover .flip-inner {
  transform: rotateY(180deg) scale(1.25);
}

.front {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border: white solid 4px;
  box-sizing: border-box;
}

.backface {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  inset: 0;
  margin: 0;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  font-size: 20px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  box-sizing: border-box;
  border: white solid 4px;
  box-sizing: border-box;
  text-shadow: none;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1;
  width: fit-content;
  height: fit-content;
  gap: 80px;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  position: absolute;
  margin-top: 40px;
}

.button {
  width: 130px;
  height: fit-content;
  font-size: 25px;
  border-radius: 4px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.336);
  border: none;
  transition: background-color 1s ease, color 0.3s ease;
  cursor: pointer;
  background-color: transparent;
  box-sizing: border-box;
}
</style>