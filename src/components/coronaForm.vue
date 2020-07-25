<template>
    <div id="question">
        <h1>Which province do you want to know the amount of corona cases?</h1>
        <input type="text" v-model="query" v-on:keyup.enter="sendForm(), clear()" v-focus/>
        <p>try: 'Aceh' or 'jakarta' or 'sumsel'</p>
    </div>
</template>

<script>
import swalMixin from '../mixins/swalMixin';
import resetMixin from '../mixins/resetMixin';
export default {
    data() {
        return {
            query: '',
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    methods: {
        sendForm: function(){
            this.$emit('formSubmitted', this.query);
            this.clear();
        },
        clear: function(){
            this.query = '';
        }
    },
    mixins: [swalMixin, resetMixin]
}
</script>

<style scoped>
*{
    color: #f2f2f2;
}
h1{
    font-size: 4rem;
    margin-bottom: 1rem;
}
p{
    margin-bottom: 2rem;
    width: 100%;
}
#question{
    margin: 0 auto;
    max-width: 1000px;
    min-height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input[type="text"] {
    display: block;
    background: none;
    border: none;
    border-bottom: 2px #03dac5 solid;
    color: #f2f2f2;
    font-size: 15px;
    font-size: 2rem;
}

input:focus{
    outline: none;
}
@media only screen and (max-width: 500px) {
    input[type="text"] {
        width: 100%;
    }
}
</style>
