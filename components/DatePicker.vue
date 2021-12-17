<template>
  <form class="form" @submit.prevent>
    <div>
      <span class="title">Select Drop Off Time</span>
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
          placement: $screens({ default: 'bottom', md: 'left-start' }),
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
        start: undefined,
        end: undefined,
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
  background-color: rgb(47, 58, 51);
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

@media only screen and (max-width: 1024px) {
  .form {
    padding: 0.8rem 2rem;
  }

  .title {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }

  .input-container {
    margin-right: 10px;
  }

  input {
    padding: 3px;
    font-size: 0.7rem;
  }

  input:first-of-type {
    margin-bottom: 3px;
  }

  .btn {
    padding: 0.3rem 1rem;
    font-size: 0.7rem;

    height: 1.8rem;
  }
}

@media only screen and (max-width: 768px) {
  .form {
    padding: 0.5rem 1rem;
    margin-top: 10px;
  }

  .title {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .btn {
    padding: 0.2rem 0.8rem;
    font-size: 0.65rem;

    height: 1.8rem;
  }
}
</style>
