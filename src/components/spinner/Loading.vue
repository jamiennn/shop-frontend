<template>
  <span class="loader"></span>
</template>

<style lang="scss">
.loader {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  background: var(--light-blue);
  border-radius: 50%;
  overflow: hidden;
}

.loader:after {
  content: '';
  position: absolute;
  inset: 8px;
  margin: auto;
  background: white;
  border-radius: 50%;
}

.loader:before {
  content: '';
  position: absolute;
  inset: 0px;
  margin: auto;
  background: var(--blue);
  animation: crlMugLoader 2s linear infinite alternate;
}

@keyframes crlMugLoader {

  0%,
  10% {
    transform: translateY(64px)
  }

  90%,
  100% {
    transform: translateY(0px)
  }
}
</style>