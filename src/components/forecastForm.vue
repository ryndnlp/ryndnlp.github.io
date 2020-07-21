<template>
    <div id="question">
        <h1>Which area do you want to know the weather forecast?</h1>
        <input type="text" v-model="query" v-on:keyup.enter="sendForm(), clear()" v-focus/>
        <p>try: 'bandung' or 'Jawa tengah' or 'jaksel'</p>
    </div>
</template>

<script>

export default {
    mounted: function(){
        document.documentElement.style.backgroundColor = "#121212";
        document.documentElement.style.minHeight = "100vh";
    },
    data() {
        return {
            query: '',
        }
    },
    computed: {   
        dataBMKGFiltered: function(){
            const filtered = this.data
            .filter((element, index, arr) => {
                return arr.indexOf(element) === index;
            })
            .filter(element => {
                return element.parameter !== null;
            });
            return filtered;
        },
        processedData: function(){
            return this.processData();
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
    }
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

textarea:focus, input:focus{
    outline: none;
}
</style>
