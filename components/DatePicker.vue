<template>
  <client-only>
    <form class="form" @submit.prevent>
      <div class="form-container">
        <span class="title">Select Range</span>
        <v-date-picker v-model="range" mode="dateTime" :masks="masks" is-range>
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="container-1">
              <div class="subcontainer">
                <div class="input-container">
                  <input
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                  />
                  <input
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                  />
                </div>
              </div>
              <button class="btn" type="submit" @click="onSubmit">go</button>
            </div>
          </template>
        </v-date-picker>
      </div>
    </form>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      range: {
        start: Date,
        end: Date,
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit('set-shipments', this.range);
    },
  },
};
</script>

<style scoped>
.form {
  background-color: white;
  box-shadow: 0 3px 5px rgb(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 6px 10px;
}

.form-container {
  margin-bottom: 4;
  /* display: flex;
  align-content: center;
  justify-content: center; */
}

.title {
  display: block;
  font-size: 1rem;
  color: #526488;
  font-weight: 600;
  text-align: left;
  margin-bottom: 2px;
  /* block text-gray-600 text-sm text-left font-bold mb-2 */
}

.container-1 {
  display: flex;
  align-content: center;
  justify-content: flex-start;

  /* flex flex-col sm:flex-row justify-start items-center */
}

.subcontainer {
  /* position: relative; */
  /* flex-grow: 1; */
  /* relative flex-grow */
}

.input-container {
  display: flex;
  align-content: center;
  justify-content: flex-start;

  flex-direction: column;
}

.svg {
  font-weight: 600;
  color: #526488;
  width: 10%;
  /* height: 100%; */
  margin: 2px;
  position: absolute;
  /* text-gray-600 w-4 h-full mx-2 absolute pointer-events-none */
}

.input {
  /* flex-grow: 1;
  padding: 8px 1px 2px;
  background-color: gray;
  font-weight: 100;
  border-radius: 5px;
  border: none;
  width: 100%; */
  /* flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full */
}
</style>
