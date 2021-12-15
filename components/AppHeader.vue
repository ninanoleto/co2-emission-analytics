<template>
  <header class="header">
    <h1 class="title">CO&sup2; Emission Analytics</h1>
    <button class="btn">select day</button>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted #ccc;
  padding: 0 1rem;
}

.title {
  font-size: 2.5rem;

  color: #526488;
  font-weight: 300;
  margin: 1rem;
}

.btn {
  display: inline-block;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
