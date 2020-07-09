<template>
    <div id="single-blog">
        <h1>{{ blog.title }}</h1>
        <p id="author">{{ blog.author }}</p>
        <p id="date">{{ blog.postDate }}</p>
        <p id="content">{{ blog.content }}</p>
        <p id="related">Related to: </p>
        <ul>
            <li v-for="(c, index) in blog.categories" v-bind:key="c.key">{{ c }}<span v-if="index != blog.categories.length - 1">, </span> 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            blog:{}
        }
    },
    created(){
        const axios = require('axios');
        axios
        .get('https://vue-project-dff2e.firebaseio.com/posts/' + this.id + '.json')
        .then(response => {
            this.blog = response.data;
        });
    },
    mounted: function(){
    document.documentElement.style.minHeight = "100vh",
    document.documentElement.style.backgroundColor = "#121212"
  }
}
</script>

<style scoped>
#single-blog{
    margin: 0 auto;
    min-height: 100vh;
    padding: 2rem;
    max-width: 1000px;
}
*{
    list-style: none;
}
ul{
    text-align: left;
    margin-top: 2rem;
}
h1{
    font-size: 40px;
    margin-bottom: 2rem;
    text-align: center;
}
span{
    margin-right: 5px;
}
p, li{
    font-size: 21px;
}
#content{
    text-align: justify;
}
#author, #date{
    text-align: right;
}
#date{
    margin-bottom: 2rem;
}
#related, ul, li{
    display: inline-block;
}
</style>