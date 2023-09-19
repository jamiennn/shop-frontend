<script setup lang="ts">
import NavItem from '@/components/header/NavItem.vue'
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
</script>
<template>
  <input type="checkbox" class="nav-toggle" id="nav-toggle">
  <ul class="nav-list-wrapper">
    <NavItem :role="authenticator.role" :user="authenticator?.currentMember" />
  </ul>
  <label for="nav-toggle" class="nav-toggle-label">
    <span class="hamburger"></span>
  </label>
</template>

<style lang="scss">
.nav-toggle {
  visibility: hidden;
  position: absolute;

  &:checked~.nav-list-wrapper {
    transform: scale(1, 1);
    transform-origin: top right;
    flex-direction: column;
    align-items: end;

    .tooltip,
    #tooltip-logout {
      opacity: 1;
      top: 0;
      right: 40px;
    }
  }
}

.nav-list-wrapper {
  display: flex;
  position: absolute;
  top: 80px;
  right: 10px;
  width: 200px;
  border-radius: 5px;
  background-color: var(--info);
  @extend %standard-boxshadow;
  transform: scale(0, 0);
  transform-origin: top right;
  transition: transform .3s ease-in;
}

.nav-toggle-label {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  .hamburger,
  .hamburger::before,
  .hamburger::after {
    width: 30px;
    height: 3px;
    background-color: var(--dark-blue);
  }

  .hamburger {
    position: relative;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    left: 0;
  }

  .hamburger::before {
    bottom: 8px
  }

  .hamburger::after {
    top: 8px
  }
}

/////////////////電腦版/////////////////
@media screen and (min-width: 480px) {
  .nav-toggle-label {
    display: none;
  }


  .nav-list-wrapper,
  .nav-toggle:checked~.nav-list-wrapper {
    transform: unset;
    transition: unset;
    position: relative;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    background-color: var(--vt-c-white-soft);
    box-shadow: none;
  }
}
</style>