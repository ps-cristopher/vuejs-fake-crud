<template>
  <div class="mb-3">
    <i v-if="icon" :class="icon" class="text-primary"></i>
    <label :for="name" :class="finalClassLabel">{{ label }}</label>
    <input
      :type="type"
      :class="finalClass"
      :id="id"
      :placeholder="placeholder"
      ref="input"
      :value="value"
      @input="updateValue()"
      @keyup="onKeyUp()"
      @keyup.enter="onKeyUpEnter()"
      @change="change()"
    >

    <div class="form-text text-danger" v-if="error">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
    </div>

    <div class="form-text" v-if="description">
      <i class="fas fa-info-circle"></i>
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputGroup',
  props: [
    'label',
    'description',
    'error',
    'placeholder',
    'type',
    'name',
    'autofocus',
    'value',
    'id',
    'icon',
  ],
  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  },
  computed: {
    finalClass() {
      const finalClass = ['form-control'];
      if (this.error) finalClass.push('form-error');
      return finalClass;
    },
    finalClassLabel() {
      const finalClass = ['form-label', 'text-primary'];
      if (this.error) finalClass.push('form-error');
      return finalClass;
    },
  },
  methods: {
    updateValue() {
      this.$emit('input', this.$refs.input.value);
    },
    onKeyUp() {
      this.$emit('keyup');
    },
    onKeyUpEnter() {
      this.$emit('keyup-enter');
    },
    change() {
      this.$emit('change');
    },
  },
};
</script>
