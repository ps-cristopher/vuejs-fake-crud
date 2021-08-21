<template>
  <transition name="fade" mode="out-in">
    <div
      :class="`alert pt-3 px-3 pb-1 ${type}`"
      v-if="isShowingMessage && message"
    >
      <div class="row">
        <div class="col">
          <h4 class="alert-heading" v-if="title">
            <i class="fas fa-info-circle"/>
            OK!
          </h4>
        </div>
        <div class="col d-flex justify-content-end">
          <button
            type="button"
            class="btn-close"
            @click="closeMessage()"
          />
        </div>
      </div>
      <div class="row">
        <p v-if="message">
          {{ message }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: [
    'title',
    'message',
    'type',
  ],
  data() {
    return {
      isShowingMessage: true,
    };
  },
  methods: {
    closeMessage() {
      this.isShowingMessage = false;
      this.$emit('message-closed');
    },
  },
};
</script>
