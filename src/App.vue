<template>
  <div id="app">
    <component v-if="$route.meta.layout" :is="$route.meta.layout">
      <transition name="fade" appear mode="out-in">
        <router-view/>
      </transition>
    </component>
    <transition v-else name="fade" appear mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
body {
  font-family: 'Dosis', sans-serif;
  padding-bottom: 40px;
}

/* TRANSITIONS */

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
  }

.slide-up-enter-active {
  transition: all 0.5s ease;
}

.slide-up-move {
  transition: transform 0.5s ease-out;
}

/* --------------------------------------------- */

.form-error {
  border-color: #b12020;
  padding-right: calc(1.5em + .75rem);
}

.mr {
  margin-right: 5px !important;
}

.text-primary {
  color: purple !important;
}

.nav-link {
  color: purple !important;
}

.nav-link:hover {
  color: darkmagenta !important;
}

.btn-primary {
  background-color: purple !important;
  border-color: purple !important;
}

.btn-primary:hover {
  box-shadow: 0 0 10px purple !important;
  outline-offset: 0px !important;
  outline: none !important;
}

.text-danger {
  color: b12020 !important;
}

</style>
