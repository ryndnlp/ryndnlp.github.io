<template>
  <nav>
      <ul>
          <router-link to="/projects/blog-project/">View Blogs</router-link>
          <router-link to="/projects/blog-project/create">Add Blog</router-link>
      </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
nav{
    background: #018786;
    padding: 14px 0;
}

.router-link-exact-active{
    background: #eee;
    color: #018786;
}
</style>
