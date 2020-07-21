<template>
    <div>
        <router-view></router-view>
        <div id="landing">
            <div class="container1">
                <div class="inner">
                    <h1>Welcome to My Website!</h1>
                    <h1>
                        My Name is
                        <span id="name">Ryan Daniel</span>
                    </h1>
                    <button onclick="window.location.href = '#more';" id="vm">VIEW MORE</button>
                </div>
            </div>
        </div>
        <div class="container2" id="more">
            <p>My name is Ryan Daniel. I'm a second year Informatics student at Institut Teknologi Bandung. I always aspire to learn a lot about things related to Computer Science. Currently, I'm deeply interested to Front End Development.</p>
            <div class="stuffs">
                <router-link to="/projects/" id="projects"></router-link>
                <a href="#" id="game"></a>
                <a href="#" id="unknown"></a>
            </div>
        </div>
    <div class="footer">
        <h1>Reach me out</h1>
            <ul class="wrapper">
                <li class="tab">
                    <div class="sm line">
                        <a hthis="https://line.me/ti/p/ryndnlp" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>Line</h1>
                        <p>I mostly use this, so yeah, probably just reach me out from this for fastest response.</p>
                    </div>
                </li>
                <li class="tab">
                    <div class="sm instagram">
                        <a hthis="https://www.instagram.com/ryndnlp/" target="_blank"></a>
                    </div>
                    <div class="content">
                        <h1>Instagram</h1>
                        <p>Please do follow my account if you wanna see my hectic yet interesting life!</p>
                    </div>
                </li>
                <li class="tab">
                    <div class="sm linkedin">
                        <a hthis="https://www.linkedin.com/in/ryandanielp" target="_blank"></a>
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
                        <a hthis="https://github.com/ryndnlp" target="_blank"></a>
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
                        <a hthis="https://gitlab.informatika.org/ryndnlp" target="_blank"></a>
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
        return{

        }
    }
};
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
        url("../assets/ryan.png");
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    max-width: 100%;
    background-color: #03dac5;
}
a {
    background-color: inherit;
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
                    url("../assets/bg.jpg");

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    padding-left: 2rem;
    padding-bottom: 2rem;
    clip-path: polygon(0 100%, 0 0, 75% 0, 25% 100%);
}
.container1 > .inner {
    display: table-cell;
    vertical-align: middle;
    text-align: left;
}
#vm {
    margin-top: 2rem;
    font-size: 0.8rem;
    background: none;
}

button::-moz-focus-inner {
    border: 0;
}

button {
    border: 0;
    display: block;
    color: #f2f2f2;
    border: 2px #f2f2f2 solid;
    padding: 0.7rem 1.6rem;
    transition: all 0.3s ease-out 0s;
}

#vm:hover {
    color: #f2f2f2;
    background-color: #03dac5;
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
    color: #f2f2f2;
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

.tab {
    display: inline-block;
    height: 150px;
    background-color: #121212;
    position: relative;
    overflow: hidden;
    width: 60px;
    border-left: 4px #03dac5 solid;
    color: #121212;
    transition: all 0.5s ease-in-out 0.1s;
}

.tab:hover {
    width: 350px;
    border: 0;
    transition: all 0.5s ease-in-out 0.1s;
    border-left: 4px #03dac5 solid;
}

.tab > .content {
    background-color: #f2f2f2;
    height: 150px;
    width: 290px;
    margin-left: 60px;
    position: relative;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.tab > .content > h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

.tab > .content > p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1rem;
    text-align: justify;
}
.tab:hover > .sm a::before {
    margin-left: -3.8rem;
}
.tab:hover > .sm a::after {
    margin-left: 0rem;
}
.sm a::after,
.sm a::before {
    transition: all 0.5s ease-in-out 0.1s;
    width: 60px;
    height: 150px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font: normal 2rem "Font Awesome 5 Brands";
    font-style: normal;
    font-size: 2rem;
    color: #f2f2f2;
    position: absolute;
    font-weight: 300;
}
.sm a::after {
    margin-left: 60px;
    font-size: 3rem;
}
.line a::after,
.line a::before {
    content: "\f3c0";
}

.line a::after {
    background-color: #00c300;
}

.instagram a::after,
.instagram a::before {
    content: "\f16d";
}

.instagram a::after {
    background-image: linear-gradient(45deg,#515bd4,#8134af,#dd2a7b,#feda77,#f58529);
}
.linkedin a::after,
.linkedin a::before {
    content: "\f0e1";
}

.linkedin a::after {
    background-color: #0e76a8;
}

.github a::after,
.github a::before {
    content: "\f09b";
}

.github a::after {
    background-color: #333;
}

.gitlab a::after,
.gitlab a::before {
    content: "\f296";
}

.gitlab a::after {
    background-color: #292961;
}

@media only screen and (max-width: 900px) {
    .container1,
    .container2 > .inner {
            clip-path: none;
    }
    .container2 {
        padding: 1rem 2rem;
    }
    .container2 > p {
        margin: 0 1rem;
        margin-top: 2rem;
    }
    .container1 {
        background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
        url("../assets/bg.jpg");
    }
    .container1 > .inner {
        text-align: center;
        vertical-align: middle;
        padding-right: 2rem;
    }
    #landing {
        background: none;
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
    #vm{
        margin: 1rem auto;
    }
}
</style>
