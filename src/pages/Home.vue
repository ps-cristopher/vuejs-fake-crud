<template>
  <div class="row mt-4 justify-content-center">
    <table-vue :rows="rowsToRender" :headers="tableHeaders" @row-clicked="onRowClick">
      <template slot="hobbies" slot-scope="item">
        {{ item.value.join(', ') }}
      </template>
    </table-vue>
  </div>
</template>

<script>
import helpers from '@/helpers';

export default {
  name: 'Home',
  mounted() {
    this.successMessage = this.$route.query.successMessage;
  },
  data() {
    return {
      tableHeaders: {
        fullName: {
          label: 'Name',
          icon: 'fas fa-user-alt mr',
        },
        birthdate: {
          label: 'Birthdate',
          icon: 'fas fa-birthday-cake mr',
        },
        country: {
          label: 'Country',
          icon: 'fas fa-flag mr',
        },
        email: {
          label: 'Email',
          icon: 'fas fa-envelope mr',
        },
        phone: {
          label: 'Phone',
          icon: 'fas fa-phone mr',
        },
        estatus: {
          label: 'Estatus',
          icon: 'fas fa-info-circle mr',
        },
        hobbies: {
          label: 'Hobbies',
          icon: 'fas fa-futbol mr',
        },
      },
      successMessage: '',
    };
  },
  computed: {
    rowsToRender() {
      return this.$store.state.contacts.map((contact) => ({
        ...contact,
        fullName: helpers.filters.getPersonFullName(contact),
      }));
    },
  },
  methods: {
    onRowClick(row) {
      this.$router.push(`/detail/${row.uuid}`);
    },
  },
};
</script>
