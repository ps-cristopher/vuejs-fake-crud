import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        uuid: '0f667f52-b536-457d-8206-b74652d38b35',
        name: 'Cristopher',
        lastName: 'Paniagua',
        birthdate: '1994-07-16',
        country: 'México',
        email: 'info@cristopherps.com',
        phone: '7776589347',
        estatus: 'Active',
        hobbies: ['Programming', 'Design', 'Marketing', 'Business', 'Education'],
      },
    ],
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    DELETE_CONTACT(state, index) {
      state.contacts.splice(index, 1);
    },
    UPDATE_CONTACT(state, data) {
      state.contacts[data.index] = data.contact;
    },
  },
  actions: {
    addContact({ commit }, contact) {
      commit('ADD_CONTACT', contact);
    },
    deleteContact({ commit, state }, contactUuid) {
      const contactIndex = state.contacts.findIndex((contact) => contact.uuid === contactUuid);
      commit('DELETE_CONTACT', contactIndex);
    },
    updateContact({ commit, state }, contact) {
      const contactIndex = state.contacts.findIndex((item) => item.uuid === contact.uuid);
      const data = {
        index: contactIndex,
        contact,
      };
      commit('UPDATE_CONTACT', data);
    },
  },
  plugins: [new VuexPersistence().plugin],
});
