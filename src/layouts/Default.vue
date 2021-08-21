<template>
  <div>
    <header class="bg-light py-3">
      <h1 class="text-white text-center text-primary">
        <i class="fas fa-address-book text-primary"></i>
        CONTACTS
      </h1>
    </header>
    <div class="container">
      <navbar-vue/>
      <hr>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
};
</script>
