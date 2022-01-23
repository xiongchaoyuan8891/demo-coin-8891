<script lang="ts" setup>
interface SectionProps {
  title: string
}
const props = defineProps<SectionProps>()
</script>

<template>
  <div class="section section__container">
    <h2 class="section__heading">{{ props.title }}</h2>
    <div class="section__body">
      <slot />
    </div>
  </div>
</template>

<style>
.section__container {
  width: 80%;
  margin: 32px auto;
}
.section__heading {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: rgb(10, 20, 110);
}
.section__body {
  padding: 24px 0;
}
@media (max-width: 768px) {
  .section__container {
    width: 90%;
  }
}
</style>
