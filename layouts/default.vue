<template>
  <div id="app">
    <PageHeader />
    <PageNavigation />
    <Nuxt />
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
import PageNavigation from '@/components/PageNavigation.vue'

export default {
  name: 'Default',
  components: {
    PageHeader,
    PageNavigation,
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700');
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 1110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}
</style>
