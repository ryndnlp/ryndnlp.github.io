<template>
  <div id="container">
      <div id="logo"></div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, but the page you are looking for are not available! We will redirect you in a second.</p>
      <button @click="redirect()">GO TO HOMEPAGE</button>
  </div>
</template>

<script>

export default {
    data(){
        return{
            delay: 0
        }
    },
    mounted: function(){
        document.documentElement.style.backgroundColor = "#121212";
        document.documentElement.style.minHeight = "100vh";
    },
    created(){
        this.delay = 5000;
            
        setTimeout(function () {
                    this.$router.push({path: "/"});
        }.bind(this), 
        this.delay);
    },
    methods: {
        redirect(){
            clearTimeout(this.delay);
            this.$router.push({path: "/"}).bind(this);
        }
    }
}
</script>

<style scoped>
*{
    color: #f2f2f2;
    text-align: center;
}
#container{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
}
h1{
    font-size: 3rem;
}
#logo{
    font-family: "Font Awesome 5 Free";
    font-weight: 700;
    font-size: 15rem;
}
#logo::before{
    content: "\f06a";
    color: #b00020;
}
button {
    margin-top: 1rem;
    display: block;
    background-color: #03dac5;
    border: none;
    padding: 5px 15px;
    color: white;
    border-radius: 10px;
}
button:active{
    opacity: 0.5;
}
</style>
