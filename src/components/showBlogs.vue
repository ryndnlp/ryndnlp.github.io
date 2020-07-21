<template>
    <div id="show-blogs">
        <h1>All Blogs</h1>
        <input
        type="text"
        placeholder="search title"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'search title'"
        v-model="search"
        v-focus
        />
        <div id="container">
            <p id="result">{{ filteredBlogs.length }} blog(s) found</p>
            <template v-for="blog in filteredBlogs">
                <a
                :href="'/projects/blog/' + blog.id"
                class="single-blog"
                v-bind:key="blog.key"
                >
                <h3>{{ blog.title | toUpperCase }}</h3>
                <p>{{ blog.content | snippet }}</p>
                </a>
            </template>
        </div>
    </div>
</template>

<script>
import searchMixin from "../mixins/searchMixin";
export default {
    data() {
        return {
            blogs: [],
            search: ""
        }
    },
    mounted: function() {
        document.body.style.minHeight = "100vh",
        document.documentElement.style.backgroundColor = "#121212"
    },
    created() {
        const axios = require("axios");
        let arrayBlogs = [];
        axios
        .get("https://vue-project-dff2e.firebaseio.com/posts.json")
        .then(function(response) {
            return response.data;
        })
        .then(data => {
            for (let key in data) {
                data[key].id = key;
                arrayBlogs.push(data[key]);
            }
        this.blogs = arrayBlogs;
        });
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    filters: {
        toUpperCase(value) {
            return value.toUpperCase();
        },
        snippet(value, limit = 100) {
            const newVal = [];
            if (value.length > limit) {
                value.split(' ').reduce((acc, cur) => {
                    if (cur.length + acc <= limit) {
                        newVal.push(cur);
                    }
                    return acc + cur.length;
                }, 0);
                return `${newVal.join(" ")} ...`;
            }
        return value;
        }
    },
    mixins: [searchMixin]
};
</script>

<style scoped>
#show-blogs {
    max-width: 800px;
    padding: 2rem;
    margin: 0 auto;
}
h1 {
    margin-bottom: 1rem;
}
.single-blog {
    display: block;
    color: #f2f2f2;
    border: 2px #f2f2f2 solid;
    box-shadow: 0 0 10px #03dac5;
    min-height: 100px;
    width: 100%;
    padding: 1rem;
    margin-top: 2rem;
    background-color: #121212;
}
#container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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
::placeholder {
    color: #f2f2f2;
    opacity: 1;
}
h3 {
    margin-bottom: 5px;
}
#result {
    margin-top: 0.5rem;
    font-size: 10px;
}

textarea:focus, input:focus{
    outline: none;
}
</style>
