<template>
  <div class="row mt-4">
    <div class="mb-4" v-if="contactUuid">
      <button
        type="button"
        class="btn btn-primary btn-sm"
        @click="$router.push(`/detail/${contactUuid}`)"
        :disabled="submitted"
      >
        <i class="fas fa-arrow-circle-left mr"></i>
        Back to detail
      </button>
    </div>

    <form>
      <input-group-vue
        name="name"
        id="name"
        :error="errors.first('name')"
        icon="fas fa-user-alt mr"
        label="Name"
        v-model="name"
        type="text"
        v-validate="'required'"
        @keyup-enter="validateBeforeSubmit()"
      />

      <input-group-vue
        name="lastName"
        id="lastName"
        :error="errors.first('lastName')"
        icon="fas fa-user-alt mr"
        label="Last Name"
        v-model="lastName"
        type="text"
        v-validate="'required'"
        @keyup-enter="validateBeforeSubmit()"
      />

      <input-group-vue
        name="birthdate"
        id="birthdate"
        :error="errors.first('birthdate')"
        icon="fas fa-birthday-cake mr"
        label="Birthdate"
        v-model="birthdate"
        type="date"
        v-validate="'required'"
        @keyup-enter="validateBeforeSubmit()"
      />

      <div class="mb-3">
        <i class="fas fa-flag  text-primary mr"></i>
        <label for="country" class="form-label text-primary">Country</label>
        <select
          :class="errors.first('country') ? 'form-select form-error' : 'form-select'"
          v-model="country"
          name="country"
          id="country"
          v-validate="'required'"
        >
          <option value=''>Select a country</option>
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Colombia">Colombia</option>
          <option value="England">England</option>
          <option value="France">France</option>
        </select>

        <div class="form-text text-danger" v-if="errors.first('country')">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.first('country') }}
        </div>
      </div>

      <input-group-vue
        name="email"
        id="email"
        :error="errors.first('email')"
        icon="fas fa-envelope mr"
        label="Email"
        v-model="email"
        type="text"
        v-validate="'required|email'"
        @keyup-enter="validateBeforeSubmit()"
      />

      <input-group-vue
        name="phone"
        id="phone"
        :error="errors.first('phone')"
        icon="fas fa-phone mr"
        label="Phone"
        v-model="phone"
        type="text"
        v-validate="'required|numeric'"
        @keyup-enter="validateBeforeSubmit()"
      />

      <div class="mb-3">
        <i class="fas fa-info-circle  text-primary mr"></i>
        <label class="form-label text-primary">Estatus</label>
        <div class="form-check">
          <input
            class="form-check-input"
            v-model="estatus"
            value="Active"
            type="radio"
            name="estatus"
            id="active"
            v-validate="'required'"
          >
          <label class="form-check-label" for="active">
            Active
          </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            v-model="estatus"
            value="Inactive"
            type="radio"
            name="estatus"
            id="inactive"
            v-validate="'required'"
          >
          <label class="form-check-label" for="inactive">
            Inactive
          </label>
        </div>

        <div class="form-text text-danger" v-if="errors.first('estatus')">
          <i class="fas fa-exclamation-circle"></i>
          {{ errors.first('estatus') }}
        </div>
      </div>

      <i class="fas fa-futbol  text-primary mr"></i>
      <label for="hobbies" class="form-label text-primary">Hobbies</label>
      <div class="mb-3 form-check">
        <input
          type="checkbox" class="form-check-input" v-validate="'required'"
          id="programming" value="Programming" v-model="hobbies" name="hobbies"
        >
        <label class="form-check-label" for="programming">Programming</label>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox" class="form-check-input" v-validate="'required'"
          id="design" value="Design" v-model="hobbies" name="hobbies"
        >
        <label class="form-check-label" for="design">Design</label>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox" class="form-check-input" v-validate="'required'"
          id="marketing" value="Marketing" v-model="hobbies" name="hobbies"
        >
        <label class="form-check-label" for="marketing">Marketing</label>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox" class="form-check-input" v-validate="'required'"
          id="business" value="Business" v-model="hobbies" name="hobbies"
        >
        <label class="form-check-label" for="business">Business</label>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox" class="form-check-input" v-validate="'required'"
          id="education" value="Education" v-model="hobbies" name="hobbies"
        >
        <label class="form-check-label" for="education">Education</label>
      </div>

      <div class="form-text text-danger" v-if="errors.first('hobbies')">
        <i class="fas fa-exclamation-circle"></i>
        {{ errors.first('hobbies') }}
      </div>

      <hr>

      <div class="d-grid">
        <button
          type="button"
          class="btn btn-primary btn-block"
          @click="validateBeforeSubmit()"
          :disabled="submitted"
        >
          <i class="fas fa-save"></i>
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import helpers from '@/helpers';

export default {
  name: 'Form',
  props: ['contactUuid'],
  data() {
    return {
      name: '',
      lastName: '',
      birthdate: '',
      country: '',
      email: '',
      phone: '',
      estatus: '',
      hobbies: [],
      submitted: false,
    };
  },
  computed: {
    contact() {
      if (!this.contactUuid) return null;
      return this.$store.state.contacts.find((item) => item.uuid === this.contactUuid);
    },
  },
  mounted() {
    if (this.contact) {
      this.name = this.contact.name;
      this.lastName = this.contact.lastName;
      this.birthdate = this.contact.birthdate;
      this.country = this.contact.country;
      this.email = this.contact.email;
      this.phone = this.contact.phone;
      this.estatus = this.contact.estatus;
      this.hobbies = this.contact.hobbies;
    }
  },
  methods: {
    async validateBeforeSubmit() {
      try {
        this.submitted = true;

        const isValidForm = await this.$validator.validateAll();

        if (isValidForm) {
          const body = {
            name: this.name,
            lastName: this.lastName,
            birthdate: this.birthdate,
            country: this.country,
            email: this.email,
            phone: this.phone,
            estatus: this.estatus,
            hobbies: this.hobbies,
          };

          const contactFullName = helpers.filters.getPersonFullName(body);

          if (this.contact) {
            body.uuid = this.contact.uuid;
            this.$store.dispatch('updateContact', body);
            this.$router.push(`/detail/${body.uuid}?successMessage=${contactFullName} actualizado con éxito`);
          } else {
            body.uuid = uuidv4();
            this.$store.dispatch('addContact', body);
            this.$router.push(`/detail/${body.uuid}?successMessage=${contactFullName} registrado con éxito`);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitted = false;
      }
    },
  },
};
</script>
