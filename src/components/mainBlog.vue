<template>
  <div id="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './header'

export default {
  data() {
    return {

    }
  },
  components:{
    'app-header': Header
  }
}
</script>

<style scoped>
*{
  color: #f2f2f2;
}

</style>
