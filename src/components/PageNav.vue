<template>
  <nav>
    <router-link to="/" :title="$t('nav.home')">
      <fa icon="house" class="svg" />
    </router-link>

    <router-link to="/Showcase" :title="$t('nav.showcase')">
      <fa icon="play" class="svg" />
    </router-link>

    <router-link to="/Contact" :title="$t('nav.contact')">
      <fa icon="envelope" class="svg" />
    </router-link>

    <router-link to="/About" :title="$t('nav.about')">
      <fa icon="info" class="svg" />
    </router-link>
  </nav>
</template>
<style>
nav {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  width: 47px;
  text-align: center;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.2);
}

.svg-inline--fa {
  width: 100%;
}

.path {
  width: 100%;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  font-size: 140%;
}

nav a.router-link-exact-active .svg {
  border-bottom: solid red 3px;
}

.router {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100vw;
  padding: 0;
  margin: 0;
}
</style>