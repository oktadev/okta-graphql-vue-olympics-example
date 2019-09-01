<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <h1>{{name}}</h1>
        <h2>{{subtitle}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'Home',
    title: 'Olympic Events',
    subtitle: 'Using Vue, Node, and GraphQL'
  }),
}
</script>

<style scoped>
.container {
  padding-top: 50px;
}

h1, h2 {
  text-align: center;
}
</style>
