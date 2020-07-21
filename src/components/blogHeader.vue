<template>
    <nav>
        <ul>
            <router-link to="/projects/blog/">View Blogs</router-link>
            <router-link to="/projects/blog/create">Add Blog</router-link>
        </ul>
    </nav>
</template>

<script>
export default {
   
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
