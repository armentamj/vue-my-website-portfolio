<template>
  <div class="home">
    <div class="main-content">
      <div class="home-info main-sub">
        <h1>Joel Armenta</h1>
        <p class="saying">{{ $t('home.saying') }}</p>
        <h2>{{ $t('home.job_title') }}</h2>
        <p class="p-intro">{{ $t('home.intro') }}</p>
        <h2>{{ $t('home.h2') }}</h2>
        <div class="home-ul">
          <img src="../assets/html-5.svg" :alt="$t('home.html')" :title="$t('home.html')" class="ul-img html">
          <img src="../assets/css-4.svg" :alt="$t('home.css')" :title="$t('home.css')" class="ul-img css">
          <img src="../assets/logo-javascript.svg" :alt="$t('home.js')" :title="$t('home.js')" class="ul-img js">
          <img src="../assets/ruby.svg" :alt="$t('home.ruby')" :title="$t('home.ruby')" class="ul-img ruby">
          <img src="../assets/rubyonrails.svg" :alt="$t('home.rails')" :title="$t('home.rails')" class="ul-img rails">
          <img src="../assets/logo-vue.svg" :alt="$t('home.vue')" :title="$t('home.vue')" class="ul-img vue">
          <img src="../assets/brand-docker.svg" :alt="$t('home.docker')" :title="$t('home.docker')" class="ul-img docker">
          <img src="../assets/database-sql.svg" :alt="$t('home.sql')" :title="$t('home.sql')" class="ul-img sql">
          <img src="../assets/pinia-logo.svg" :alt="$t('home.pinia')" :title="$t('home.pinia')" class="ul-img pinia">
        </div>
      </div>
      <div class="joel-pic main-sub">
        <img src="../assets/joel_garden.jpg" :alt="$t('home.garden')" :title="$t('home.garden')">
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  /* This is the main container of the home page */
  .home {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 3%;
    flex: 1 1 0;
  }

  /* The main sub divs that contain the info and the image*/
  .joel-pic {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 90vh;
  }

  .home-info {
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: left;
    height: 90vh;
  }

  .home-info h1 {
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
    line-height: 1.3;
  }

  .saying {
    margin-top: 0;
    line-height: 0;
    font-family: "Yellowtail", cursive;
    font-weight: 300;
    font-style: normal;
    font-size: 25px;
  }

  .home-info h2 {
    font-weight: 300s;
  }

  .home-info h3 {
    font-weight: 200s;
  }

  .p-intro {
    margin-top: 10vh;
    margin-top: 0;
  }

  .home-ul {
    width: 100%;
    list-style: none;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    border-radius: 5px;
  }

  .ul-img {
    width: auto;
    height: clamp(60px, 80px, 80px);
  }

  .joel-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    object-fit: cover;
    border-radius: 10px;
  }
</style>