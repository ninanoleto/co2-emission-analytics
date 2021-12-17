<template>
  <div :class="[page === 1 && 'change-flex', 'btns-wrapper']">
    <button
      class="btn-prev"
      :hidden="(page === 1 && 'null') || shipmentsLength === 0"
      @click="$emit('prev-page')"
    >
      &#8592; Prev
    </button>
    <button
      class="btn-next"
      :hidden="
        ((hideNextButton || lastPage === 1) && 'null') || shipmentsLength === 0
      "
      @click="$emit('next-page')"
    >
      Next &#8594;
    </button>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: {
    page: Number,
    lastPage: Number,
    shipmentsLength: Number,
    hideNextButton: Boolean,
  },
};
</script>

<style>
.btns-wrapper {
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin: 5px 3rem;
}

.change-flex {
  justify-content: flex-end;
}

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
