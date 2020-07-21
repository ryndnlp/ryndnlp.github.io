<template>
    <div id="projects">
        <div id="header">
            <h1>Projects</h1>
            <p>So much <span>free time</span>. Holiday is fun eh?</p>
        </div>
        <div id="container">
            <router-link to="/projects/blog/" class="project" id="blogicon"></router-link>
            <router-link to="/projects/extractor/" class="project" id="extractoricon"></router-link>
            <router-link to="/projects/forecast/" class="project" id="forecast"></router-link>
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
    padding: 2rem;
}
#projects{
    max-width: 1000px;
    margin: 0 auto;
}
.project{
    height: 300px;
    width: 300px;
    margin: 1.5rem;
    border: 1px #f2f2f2 solid;
    box-shadow: 0 0 15px #03dac5;
    background-size: contain;
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00abcc;
    font-family: "Font Awesome 5 Free";
    font-size: 8rem;
    font-weight: 800;
}
.project:hover {
    background-color: #00abcc;
    color: #f2f2f2;
}
#blogicon::after{
    content: '\f1ea';
}
#extractoricon::after{
    content: '\f0c5';
}
#forecast::after{
    content: '\f0c2';
}
#header > h1{
    font-size: 5rem;
}
</style>
