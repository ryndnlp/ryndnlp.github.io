<template>
    <div id="container">
        
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
        this.showAlert()
    },
    methods: {
        redirect(){
            clearTimeout(this.delay);
            this.$router.push("/");
        },
        showAlert: function(){
            this.$swal({
                icon: 'info',
                title: '404 Page not Found!',
                text: 'Sorry, the page you are looking for are not available.',
                confirmButtonText: 'Redirect'
            }).then(() => this.redirect());
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
