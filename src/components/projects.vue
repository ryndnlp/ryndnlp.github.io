<template>
    <div id="projects">
        <div id="header">
            <h1>Projects</h1>
            <p>So much <span>free time</span>. Holiday is fun eh?</p>
        </div>
        <div id="container">
            <router-link to="/projects/blog-project/" class="project">
                <div id="blogicon" class="icon"></div>
            </router-link>
            <router-link to="/projects/extractor/" class="project">
                <div id="extractoricon" class="icon"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    mounted: function(){
        document.documentElement.style.backgroundColor = "#121212",
        document.documentElement.style.minHeight = "100vh"
    }
}
</script>

<style scoped>
*{
    color: #f2f2f2;
    text-align: center;

}
span{
    color: #03dac5;
}
#container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    background-color: #121212;
    padding: 2rem;
}
#projects{
    padding: 2rem;
}
.project{
    color: #03dac5;
    background-color: #121212;
    height: 250px;
    width: 250px;
    margin: 1.5rem;
    border: 1px #f2f2f2 solid;
    box-shadow: 0 0 15px #03dac5;
    background-size: contain;
    transition: all 0.2s ease-in-out 0s;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.project:hover {
    background-color: #f2f2f2;
    color: #121212;
}
#blogicon:after{
    content: '\f1ea';
}
.icon{
    font-family: "Font Awesome 5 Free";
    font-size: 8rem;
    color: #00abcc;
    font-weight: 800;
    display: block;
}
#extractoricon:after{
    content: '\f0c5';
}
#header > h1{
    font-size: 5rem;
}
</style>
