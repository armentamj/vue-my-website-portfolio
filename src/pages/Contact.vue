<template>
  <div class="main-content">
    <div class="cntct-shwcs-main-sub">
      <h1>{{ $t('contact.title') }}</h1>
      <p class="p1">Joel M. Armenta</p>
      <p class="p2">
        {{ $t('contact.contact_message') }}
      </p>
      <div class="contact-icons">
        <a href="https://github.com/armentamj" target="_blank" :title="$t('contact.github')" class="contact-a"><fa :icon="['fab', 'github']" class="svg" /></a>
        <a href="http://linkedin.com/in/joel-armenta-821a80315" target="_blank" :title="$t('contact.linkedin')" class="contact-a"><fa :icon="['fab', 'linkedin']" class="svg" /></a>
        <a href="mailto:armentamj+jobprospects@gmail.com" :title="$t('contact.email')" class="contact-a"><fa icon="envelope" class="svg" /></a>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style>
  .cntct-shwcs-main-sub > .p1 {
    font-size: 40px;
  }

  .cntct-shwcs-main-sub > .p2{
    font-size: 20px;
    width: 50%;
    text-align: center;
    margin: 0 auto;
  }

  .contact-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    align-content: center;
    padding: 20px;
  }

  .contact-a svg {
    font-size: 200%;
  }
</style>