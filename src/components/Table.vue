<template>
  <div>
    <template v-if="rows && rows.length == 0">
      <h5 class="text-secondary fs-6">
        No data. <router-link to="/form">Add your first contact.</router-link >
      </h5>
    </template>
    <template v-if="rows && rows.length > 0">
      <input
        type="search"
        class="form-control mb-2"
        placeholder="Write to find a contact"
        v-model="textFilterInputValue"
      />
      <div class="table-responsive" v-if="rowsToRender.length > 0">
        <table class="table table-striped table-light table-hover">
          <thead class="table-primary">
            <tr>
              <th v-for="header in Object.keys(headers)" :key="header.id">
                <i v-if="headers[header].icon" :class="headers[header].icon"></i>
                {{ headers[header].label }}
              </th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="slide-up" mode="out-in" appear>
            <tr
              class="cursor-pointer"
              v-for="(row, index) in rowsToRender"
              :key="`row-${index}`"
            >
              <td
                v-for="(item, index) in Object.keys(headers)"
                :key="`item-${index}`"
                @click="rowClicked(row, rowsToRender)"
              >
                <slot
                  :name="item"
                  :value="row[item]"
                  :row="row"
                >
                  {{ row[item] }}
                </slot>
              </td>
            </tr>
          </transition-group>
        </table>
      </div>
      <div v-else>
        <h5 class="text-secondary fs-6">
          <i class="fas fa-search"></i>
          No results
        </h5>
      </div>
    </template>
  </div>
</template>

<script>
import helpers from '@/helpers';

export default {
  name: 'Table',
  timeoutFilter: null,
  filteredItems: null,
  props: ['headers', 'rows'],
  data() {
    return {
      textFilterInputValue: '',
      textFilterQuery: '',
    };
  },
  watch: {
    textFilterInputValue() {
      clearTimeout(this.timeoutFilter);

      if (
        this.textFilterInputValue === ''
        || this.textFilterInputValue.length < 3
      ) {
        this.textFilterQuery = '';
        return;
      }

      this.timeoutFilter = setTimeout(() => {
        this.textFilterQuery = this.textFilterInputValue;
      }, 750);
    },
  },
  computed: {
    rowsToRender() {
      if (!this.rows) return [];

      const filteredItems = this.rows.filter((row) => {
        if (this.textFilterQuery) {
          return helpers.filters.matchStringFromQuery(
            this.textFilterQuery,
            JSON.stringify(row),
          );
        }
        return true;
      });

      return filteredItems;
    },
  },
  methods: {
    rowClicked(row, rows, event) {
      this.$emit(
        'row-clicked',
        row,
        rows,
        event,
      );
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}

th {
   white-space: nowrap;
  background-color: purple !important;
  color: white;
}
</style>
