<template>
    <div>
        <div id="landing">
            <div class="container1">
                <div class="inner">
                    <h1 data-aos="fade-left" data-aos-delay="0">Welcome to My Website!</h1>
                    <h1 data-aos="fade-right" data-aos-delay="500">
                        I'm
                        <span id="name">Ryan Daniel</span>
                    </h1>
                </div>
            </div>
        </div>
        <div class="container2" id="more">
            <p data-aos="fade">My name is Ryan Daniel. I'm a second year Informatics student at Institut Teknologi Bandung. I always aspire to learn a lot about things related to Computer Science. Currently, I'm deeply interested to Front End Development.</p>
            <div class="stuffs" @mouseover="isHovering = true">
                <router-link to="/projects/" id="projects" data-aos="fade-up" :style="{'transition': isHovering? 'all 0.3s ease-out 0s': ''}"></router-link>
                <a href="#" id="game" data-aos="fade-up" data-aos-delay="500" :style="{'transition': isHovering? 'all 0.3s ease-out 0s': ''}"></a>
                <a href="#" id="unknown" data-aos="fade-up" data-aos-delay="1000" :style="{'transition': isHovering? 'all 0.3s ease-out 0s': ''}"></a>
            </div>
        </div>
    <div class="footer">
        <h1>Reach me out</h1>
            <ul class="wrapper">
                <li class="tab">
                    <div class="sm line">
                        <a href="https://line.me/ti/p/ryndnlp" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>Line</h1>
                        <p>I mostly use this, so yeah, probably just reach me out from this for fastest response.</p>
                    </div>
                </li>
                <li class="tab">
                    <div class="sm instagram">
                        <a href="https://www.instagram.com/ryndnlp/" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>Instagram</h1>
                        <p>Please do follow my account if you wanna see my hectic yet interesting life!</p>
                    </div>
                </li>
                <li class="tab">
                    <div class="sm linkedin">
                        <a href="https://www.linkedin.com/in/ryandanielp" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>LinkedIn</h1>
                        <p>
                        The place where you can see the professional me. Trying to make some projects or get any achievements
                        because I don't have any. Like, literally.
                        </p>
                    </div>
                </li>
                <li class="tab">
                    <div class="sm github">
                        <a href="https://github.com/ryndnlp" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>GitHub</h1>
                        <p>
                        One of my favourite platform because you know, show off, hahaha. Kidding. Looking forward
                        to learn how to use this platform correctly.
                        </p>
                    </div>
                </li>
                <li class="tab" id="last">
                    <div class="sm gitlab">
                        <a href="https://gitlab.informatika.org/ryndnlp" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>GitLab</h1>
                        <p>I'm new to this so you can only see one project here.</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isHovering: false
        }
    }
}
</script>

<style scoped>
#type-animation {
    font-size: 2.5rem;
    display: inline-block;
}
#logo {
    width: 250px;
    height: 250px;
    display: block;
    margin: 0 auto;
}
#landing {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("../assets/picture/bg.jpg");
}
img{
    width: 500px;
    height: 500px;
}
a {
    text-align: center;
    text-decoration: none;
}
#name {
    color: #03dac5;
    display: inline-block;
}

.container1 {
    color: #f2f2f2;
    display: table;
    width: 100%;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
}
.inner {
    display: table-cell;
    vertical-align: middle;
    font-size: 30px;
}
.trans{
    transition: all 0.3s ease-in-out 0s;
}
.container2 {
    background-color: #121212;
    padding: 3rem;
    text-align: center;
}
.container2 > p {
    border-top: 2px #03dac5 solid;
    border-bottom: 2px #03dac5 solid;
    font-size: 1.5rem;
    color: #f2f2f2;
    padding: 2rem 0;
}
.stuffs {
    display: flex;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
}
.stuffs > a {
    color: #00abcc;
    background-color: #121212;
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1.5rem;
    border: 1px #f2f2f2 solid;
    box-shadow: 0 0 15px #03dac5;
    background-size: contain;
    transition: all 0.2s ease-in-out 0s;
    font-size: 9rem;
    font-weight: 700;
    font-family: "Font Awesome 5 Free";
}
#projects::before {
    content: "\f121";
}
#game::before{
    content: "\f11b";
}
#unknown::before{
    content: "\f128";
}
.stuffs > a:hover {
    color: #f2f2f2;
    background-color: #00abcc;
}
.footer {
    color: #121212;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #121212;
}

.footer > h1 {
    display: inline-block;
    margin-right: 2rem;
    text-align: center;
    color: #f2f2f2;
}
.wrapper {
    display: flex;
    text-align: left;
    display: inline-block;
    min-width: 650px;
    list-style-type: none;
    overflow: hidden;
    height: 150px;
    font-size: 0;
}

.tab{
    display: inline-block;
    height: 150px;
    background-color: #121212;
    position: relative;
    overflow: hidden;
    width: 60px;
    border-left: 4px #03dac5 solid;
    transition: all 0.5s ease-in-out 0.1s;
}

.tab:hover{
    width: 350px;
    border: 0;
    transition: all 0.5s ease-in-out 0.1s;
    border-left: 4px #03dac5 solid;
}

.tab > .content{
    background-color: #f2f2f2;
    height: 150px;
    width: 290px;
    margin-left: 60px;
    position: relative;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.tab > .content > h1{
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

.tab > .content > p{
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1rem;
    text-align: justify;
}
.tab:hover > .sm a::before{
    margin-left: -3.8rem;
}
.tab:hover > .sm a::after{
    margin-left: 0rem;
}
.sm a::after, .sm a::before{
    transition: all 0.5s ease-in-out 0.1s;
    width: 60px;
    height: 150px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font: normal 2rem "Font Awesome 5 Brands";
    color: #f2f2f2;
    position: absolute;
    cursor: pointer;
    font-weight: 300;
}
.sm a::after{
    margin-left: 60px;
    font-size: 3rem;
}
.line a::after, .line a::before{
    content: '\f3c0';
    
}

.line a::after{
    background-color: #00c300;
}

.instagram a::after, .instagram a::before{
    content: '\f16d';
}

.instagram a::after{
    background-image: linear-gradient(45deg, #515bd4, #8134af, #dd2a7b, #feda77, #f58529);
}
.linkedin a::after, .linkedin a::before{
    content: '\f0e1';
}

.linkedin a::after{
    background-color: #0e76a8;
}

.github a::after, .github a::before{
    content: '\f09b';
}

.github a::after{
    background-color: #333;
}

.gitlab a::after, .gitlab a::before{
    content: '\f296';
}

.gitlab a::after{
    background-color: #292961;
}
@media only screen and (max-width: 900px) {
    .inner > h1{
        transition: none;
    }
    .stuffs > * {
        transition-delay: 0;
    }
    .container1{
        padding: 1rem;
    }
    .container2 {
        padding: 1rem 2rem;
    }
    .container2 > p {
        margin: 0 1rem;
        margin-top: 2rem;
    }
    .footer > h1 {
        display: block;
        margin-bottom: 1rem;
        text-align: center;
        margin-left: 2rem;
    }
    .footer {
        display: block;
    }
    .tab {
        display: block;
        width: 100%;
        border-bottom: 4px #121212 solid;
        border-left: 4px #f2f2f2 solid;
    }
    .wrapper {
        height: auto;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: auto;
        border-top: 4px #f2f2f2 solid;
        box-shadow: 0 0 10px #03dac5;
        border-bottom: 4px #f2f2f2 solid;
    }
    #last {
        border-bottom: none;
    }
    .tab > .content {
        width: 100%;
        padding-right: 4.5rem;
    }
    .tab:hover {
        width: 100%;
        border-bottom: 4px #121212 solid;
        border-left: 4px #f2f2f2 solid;
    }
}
</style>
