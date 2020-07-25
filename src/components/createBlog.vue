<template>
    <div id="add-blog">
        <h1>Add a New Blog Post</h1>
        <form v-if="!this.submitted">
            <label for="title">Title:</label>
            <input type="text" v-model.lazy="blog.title" v-focus />
            <label for="checkboxes">Categories?</label>
            <div id="checkboxes">
                <template v-for="c in availableCategories">
                    <label v-bind:key="c.key" class="category">{{ c }}</label>
                    <input type="checkbox" v-bind:value="c" v-model.lazy="blog.categories" v-bind:key="c.key" />
                </template>
            </div>
            <label for="content">Content:</label>
            <textarea id="content" type="text" v-model.lazy="blog.content" spellcheck="false"></textarea>
            <label for="select" id="select">Author:</label>
            <select v-model="blog.author" id="blog-author">
                <option v-for="author in authors" v-bind:value="author" v-bind:key="author.key">{{ author }}</option>
            </select>
            <button v-on:click.prevent="setDate(), post()">Submit</button>
        </form>
        <div id="preview">
            <h1>Blog preview</h1>
            <p>Title: {{ blog.title }}</p>
            <p>Categories:</p>
            <ul>
                <li v-for="category in blog.categories" v-bind:key="category.key">{{ category }}</li>
            </ul>
            <p id="contents">{{ blog.content }}</p>
            <p id="author">Author: {{ blog.author }}</p>
            <p>Submitted on: {{ getDate() }}</p>
        </div>
    </div>
</template>

<script>
import swalMixin from '../mixins/swalMixin';
import resetMixin from '../mixins/resetMixin';
export default {
    data() {
        return {
            blog: {
                title: "",
                content: "",
                categories: [],
                author: "",
                postDate: ""
            },
            authors: ["Ryan Daniel", "Ryan's friend", "Anonymous"],
            submitted: false,
            availableCategories: [
                "Informatics",
                "Organization",
                "Community Service",
                "Daily"
            ]
        };
    },
    methods: {
        async post() {
            if(!this.isDisabled){
                const axios = require("axios");
                await axios
                .post("https://vue-project-dff2e.firebaseio.com/posts.json", this.blog);
                this.showAlert('success', 'Post was submitted successfully.', 'Thank you!');
            }else{
                this.showAlert('error', 'Please complete the form first.', 'Thank you!');
            }
        },
        getDate() {
            const today = new Date();
            const date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            return date;
        },
        setDate() {
            const today = new Date();
            const date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            this.blog.postDate = date;
        },
        clear(){
            this.title = '';
            this.categories = [];
            this.content = '',
            this.author = ''
        }
    },
    computed: {
        isDisabled: function () {
            return !this.blog.title || !this.blog.content || !this.blog.author;
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    mixins: [swalMixin, resetMixin]
}
</script>

<style scoped>
option {
    font-family: Arial, Helvetica, sans-serif;
}
textarea:focus, input:focus{
    outline: none;
}
input[type="text"] {
    display: block;
    width: 100%;
    background: none;
    border: none;
    border-bottom: 2px #03dac5 solid;
    color: #f2f2f2;
    font-size: 15px;
}

textarea {
    display: block;
    width: 100%;
    resize: none;
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    border-bottom: 2px #03dac5 solid;
    color: #f2f2f2;
    height: 2.7rem;
}

#add-blog {
    margin: 0 auto;
    max-width: 800px;
    padding: 2rem;
}

label {
    display: block;
    margin: 1rem 0;
}

#preview {
    padding: 2rem;
    border: 1px #f2f2f2 solid;
    box-shadow: 0 0 10px #03dac5;
    margin-top: 2rem;
    word-break: break-all;
}

#preview>h1 {
    margin-bottom: 1.5rem;
}

#preview>ul,
#preview>p {
    margin-bottom: 1rem;
}

h3 {
    margin-top: 10px;
}

#checkboxes>label,
#checkboxes>input {
    display: inline-block;
}

#checkboxes>input {
    margin-right: 5px;
}

#checkboxes>input {
    margin-right: 1rem;
    margin-left: 5px;
}

#select {
    display: inline-block;
    margin-right: 0.5rem;
}

button {
    margin-top: 0.5rem;
    display: block;
    background-color: #03dac5;
    border: none;
    padding: 5px 15px;
    color: white;
}
::placeholder {
    color: #f2f2f2;
    opacity: 1;
}

li {
    margin-left: 1rem;
}

.category {
    margin: 0;
}

#blog-author {
    padding: 1px 0;
}

button:active {
    opacity: 0.5;
}

#contents {
    text-align: justify;
}
</style>