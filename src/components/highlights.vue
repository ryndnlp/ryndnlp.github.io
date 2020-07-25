<template>
    <div id="projects">
        <h1>Random Highlights</h1>
        <video controls loop>
            <source src="../assets/video/csgo.mp4" type="video/mp4">
        </video>
        <p><i>1v4 clutch situation? Doesn't really matter.</i></p>
    </div>
</template>

<script>
import resetMixin from '../mixins/resetMixin';
export default {
    mixins: [resetMixin]
}
</script>

<style scoped>
*{
    color: #f2f2f2;
    text-align: center;
}
#projects{
    padding: 2rem;
}
h1{
    font-size: 50px;
    margin-bottom: 2rem;
}
video{
    height: 30%;
    width: 60%;
}
@media only screen and (max-width: 600px) {
    video{
        height: 60%;
        width: 90%;
    }
}
</style>
