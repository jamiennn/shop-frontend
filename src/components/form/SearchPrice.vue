<script setup lang="ts">

// 從父元件傳下來的prop，是 model value
defineProps<{
  priceMin: string,
  priceMax: string,
}>()

// 定義要往父元件傳的 prop
const emit = defineEmits(['update:priceMin', 'update:priceMax'])

const handleMax = (e) => {
  emit('update:priceMax', e.target.value)
}
const handleMin = (e) => {
  emit('update:priceMin', e.target.value)
}

</script>
<template>
  <div class="search-price-wrapper">
    <div class="search-price-title">金額</div>
    <div class="search-price-input-wrapper">
      <input type="number" class="search-price-input" min="0" max="999999" :value="priceMin" @input="handleMin">
      <span class="tilde">～</span>
      <input type="number" class="search-price-input" min="0" max="999999" :value="priceMax" @input="handleMax">
    </div>
  </div>
</template>

<style lang="scss">
.search-price-wrapper {
  width: 100%
}

.search-price-title {
  margin-left: 15px;
}

.search-price-input-wrapper {
  text-align: center
}

.search-price-input {
  @extend %input-style;
  margin: 10px 0 0 0;
  height: 80%;
  width: 45%;
  height: 100%;
  background-color: var(--form-gray);
  font-size: 10px
}



@media screen and (min-width: 480px) {

  .search-price-title {
    margin-left: 0px;
  }

  .search-price-input-wrapper {
    text-align: start
  }

}
</style>