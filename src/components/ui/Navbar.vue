<template>
  <ul class="nav mt-2">
    <li class="nav-item">
      <router-link
        to="/"
        v-slot="{ route, isActive }"
        custom
      >
        <a
          :class="isActive ? 'nav-link active' : 'nav-link'"
          :href="route.fullPath"
        >
          <i class="fas fa-home"/>
          Home
        </a>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        to="/form"
        v-slot="{ route, isActive }"
        custom
      >
        <a
          :class="isActive ? 'nav-link active' : 'nav-link'"
          :href="route.fullPath"
        >
          <i class="fas fa-address-book"></i>
          New contact
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style>
</style>
