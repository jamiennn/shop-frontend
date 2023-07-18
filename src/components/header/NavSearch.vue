<script setup lang="ts">

</script>
<template>
  <div class="nav-search-wrapper">
    <div class="nav-search-input-wrapper">
      <input type="text" class="nav-search-input" maxlength="15">
      <button class="btn-search">
        <p class="search-icon">search</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../assets/main.scss';

.nav-search-wrapper {
  height: 50px;
  width: 40%
}

.nav-search-input-wrapper {
  @extend %input-style;
  margin: 10px 0 0 0;
  height: 80%;
}

.nav-search-input {
  width: 70%;
  height: 100%;
  border: 0px;
  background-color: var(--form-gray);
}

.btn-search {
  @extend %standard-button;
  margin-left: 10px;
}
</style>