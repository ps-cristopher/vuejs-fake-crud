<template>
  <div>
    <alert-vue
      :message="successMessage"
      title="Ok!"
      type="alert-success"
      @message-closed="closeSuccessMessage()"
    />

    <div class="mb-4">
      <button
        type="button"
        class="btn btn-primary btn-sm"
        @click="$router.push('/')"
      >
        <i class="fas fa-arrow-circle-left mr"></i>
        Back to home
      </button>
    </div>

    <div class="row mb-4">
      <p class="fs-1 mb-0 text-primary">
        <i class="fas fa-user-alt"></i>
        {{ contact.fullName }}
      </p>
    </div>

    <div class="row">
      <div class="col-sm">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-key"></i>
          Id
        </p>
        <p>{{ contact.uuid }}</p>
      </div>
      <div class="col-sm">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-birthday-cake"></i>
          Birthdate
        </p>
        <p>{{ contact.birthdate }}</p>
      </div>
      <div class="col-sm">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-flag"></i>
          Country
        </p>
        <p>{{ contact.country }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-sm mb-3">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-envelope"></i>
          Email
        </p>
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </div>
      <div class="col-sm mb-3">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-phone"></i>
          Phone
        </p>
        <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
      </div>
      <div class="col-sm mb-3">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-info-circle"></i>
          Estatus
        </p>
        <h5>
          <span class="badge bg-success" v-if="contact.estatus == 'Active'">
            {{ contact.estatus }}
          </span>
          <span class="badge bg-danger badge-xl" v-else>
            {{ contact.estatus }}
          </span>
        </h5>
      </div>
    </div>

    <div class="row">
      <div class="col-lg">
        <p class="fs-5 mb-0 text-primary">
          <i class="fas fa-futbol"></i>
          Hobbies
        </p>
        <ul>
          <li v-for="(hobby, index) in contact.hobbies" :key="`hobby-${index}`">
            {{ hobby }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md mb-2">
        <button
          type="button"
          class="btn btn-danger btn-sm w-100"
          @click="deleteContact()"
        >
          <i class="fas fa-trash"></i>
          Delete
        </button>
      </div>

      <div class="col-md">
        <button
          type="button"
          class="btn btn-primary btn-sm w-100"
          @click="$router.push(`/form/${contactUuid}`)"
        >
          <i class="fas fa-edit"></i>
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '@/helpers';

export default {
  name: 'Detail',
  props: ['contactUuid'],
  mounted() {
    this.successMessage = this.$route.query.successMessage;
  },
  data() {
    return {
      successMessage: '',
    };
  },
  computed: {
    contact() {
      const contact = this.$store.state.contacts.find((item) => item.uuid === this.contactUuid);
      contact.fullName = helpers.filters.getPersonFullName(contact);
      return contact;
    },
  },
  methods: {
    deleteContact() {
      // eslint-disable-next-line
      const confirmed = confirm('Are you sure to delete this contact?');

      if (!confirmed) return;

      this.$store.dispatch('deleteContact', this.contactUuid);

      this.$router.push('/');
    },
    closeSuccessMessage() {
      this.successMessage = '';
      this.$router.push({ query: { successMessage: '' } });
    },
  },
};
</script>
