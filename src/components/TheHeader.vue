<script lang="ts" setup>
import AppSelect from './AppSelect.vue'
import AppOption from './AppOption.vue'
</script>

<template>
  <div class="page-header">
    <div class="header">
      <div class="header__logo">
        <img src="@/assets/coingecko-logo-white.webp" alt="" />
      </div>
      <div class="header__lang">
        <span class="lang__label">{{ $t('chooseLang') }}</span>
        <div class="lang__select">
          <app-select v-model="$i18n.locale" :placeholder="$t('lang')">
            <app-option
              v-for="locale in $i18n.availableLocales"
              :key="locale"
              :label="$t('lang', locale)"
              :value="locale"
              >{{ $t('lang', locale) }}</app-option
            >
          </app-select>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 60px;
  background: rgb(10, 20, 110);
  border-bottom: 1px solid rgb(60, 75, 147);
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
}
.page-header .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 120px;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .page-header .header {
    width: 90%;
    padding: 0;
    margin: 0 auto;
  }
}
.header__logo {
  text-align: left;
}
.header__logo img {
  height: 48px;
  padding: 6px 0;
}
.header__lang {
  display: flex;
  align-items: center;
}
.lang__label {
  margin-right: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
@media (max-width: 640px) {
  .lang__label {
    display: none;
  }
  .lang__select {
    width: 120px;
  }
}
</style>
