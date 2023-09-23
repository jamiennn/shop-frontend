<script setup lang="ts">

</script>
<template>
  <div class="search-category-wrapper">
    <div class="search-category-title">分類</div>
    <div class="search-category-input-wrapper">

    </div>
  </div>
</template>

<style scoped lang="scss">
.search-category-wrapper {
  width: 100%;
  margin-top: 10px;
}

.search-category-title {
  margin-left: 15px;
}

.search-category-input-wrapper {
  text-align: center
}


@media screen and (min-width: 480px) {

  .search-category-title {
    margin-left: 0px;
  }

  .search-category-input-wrapper {
    text-align: start
  }

  .btn-search-category {
    width: 100%
  }

}
</style>