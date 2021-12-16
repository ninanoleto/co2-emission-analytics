<template>
  <form class="form" @submit.prevent>
    <div>
      <span class="title">Select date range</span>
      <v-date-picker
        v-model="range"
        mode="dateTime"
        :masks="masks"
        is-range
        is24hr
        :minute-increment="5"
        color="teal"
        :attributes="attrs"
        :popover="{
          placement: $screens({ default: 'top', md: 'left-start' }),
        }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <div class="date-container">
            <div class="input-container">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                readonly="readonly"
              />
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                readonly="readonly"
              />
            </div>
            <div class="btn-container">
              <button class="btn" type="submit" @click="onSubmit">go</button>
            </div>
          </div>
        </template>
      </v-date-picker>
    </div>
  </form>
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
        input: 'YYYY-MM-DD h:mm ',
      },
      attrs: [
        {
          key: 'today',
          highlight: true,
          dates: new Date(),
        },
      ],
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
  background-color: rgb(230, 240, 234);
  border-radius: 5px;
  padding: 1rem 2.5rem;
}

.title {
  display: block;
  font-size: 1rem;
  color: rgb(47, 58, 51);
  font-weight: 500;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}

.date-container {
  display: flex;
  align-content: center;
  justify-content: center;
}

.input-container {
  display: flex;
  align-content: center;
  justify-content: flex-start;

  flex-direction: column;

  margin-right: 20px;
}

input {
  color: rgb(47, 58, 51);
  padding: 5px;
  text-align: center;
  border: none;
  outline: none;
}

input:first-of-type {
  margin-bottom: 5px;
}

.btn {
  display: inline-block;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;

  height: 2rem;
}

.btn-container {
  display: flex;
  align-content: center;
  justify-content: center;

  flex-direction: column;
}
</style>
