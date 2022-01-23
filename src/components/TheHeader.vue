<script lang="ts" setup></script>

<template>
  <div class="page-header">
    <div class="header">
      <div class="header__logo">
        <img src="@/assets/coingecko-logo-white.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<style>
.page-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background: rgb(10, 20, 110);
  border-bottom: 1px solid rgb(60, 75, 147);
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
}
.page-header .header {
  height: 60px;
  padding: 0 120px;
  box-sizing: border-box;
}
.header__logo {
  text-align: left;
}
.header__logo img {
  height: 48px;
  padding: 6px 0;
}
</style>
