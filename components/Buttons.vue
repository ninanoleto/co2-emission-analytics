<template>
  <div class="wrapper">
    <div :class="[page === 1 && 'change-flex', 'btns-wrapper']">
      <button
        class="btn-prev"
        :hidden="page === 1 || shipmentsLength === 0"
        @click="$emit('prev-page')"
      >
        &#8592; Prev
      </button>
      <div class="page" v-if="shipmentsLength > 0">{{ page }}</div>
      <button
        class="btn-next"
        :hidden="page === lastPage || shipmentsLength === 0"
        @click="$emit('next-page')"
      >
        Next &#8594;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: {
    page: Number,
    lastPage: Number,
    shipmentsLength: Number,
  },
};
</script>

<style>
.btns-wrapper {
  display: flex;
  align-content: center;
  justify-content: space-around;
  width: 50%;
  margin: 5px 3rem;
}
.wrapper {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 5px 3rem;
}

.btns-wrapper::selection,
.btn-prev::selection,
.btn-next::selection,
.page::selection {
  background-color: white;
}
/* 
.change-flex {
  justify-content: flex-end;
} */

.btn-prev,
.btn-next {
  color: rgb(47, 58, 51);
  border: none;
  background-color: white;
  font-weight: 800;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 2px;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
  height: 2rem;
  margin: 0 5px;
}

.page {
  color: rgb(47, 58, 51);
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  margin: 0 5px;
}

@media only screen and (max-width: 768px) {
  .btns-wrapper {
    margin: 5px 1rem;
  }
}

@media only screen and (max-width: 480px) {
  .btns-wrapper {
    margin: 5px 0.5rem;
  }
}

@media only screen and (max-width: 410px) {
  .btns-wrapper {
    margin: 5px 0rem;
  }
}
</style>
