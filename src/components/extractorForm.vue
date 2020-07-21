<template>
    <div id="eForm">
    <h1>Text File Extractor</h1>
        <div id="container">
            <label id="upload">Upload your file(s)!</label>
            <input type="file" accept=".txt" @change="loadTextFromFile" @click="$emit('clearFiles')" multiple/>
            <label id="keyword">Keyword:</label>
            <input type="text" id="keyword" v-model="keyword" v-focus/>
            <label id="algorithm">Choose the algorithm!</label>
            <template v-for="alg in availAlgorithm">
                <span :key="alg.key">
                    <input type="radio" v-model="algorithm" :value="alg" name="algorithm" class="radio" checked/>
                    <label class="algorithm">{{ alg }}</label>
                </span>
            </template>
            <button :disabled="isDisabled" @click="sendForm">EXTRACT</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            availAlgorithm: ['Boyer-Moore', 'Knuth-Morris-Pratt'],
            algorithm: '',
            keyword: ''
        }
    },
    computed: {
        isDisabled: function(){
            return !this.keyword || !this.algorithm || this.texts === null;
        }
    },
    methods: {
        loadTextFromFile(ev) {
            const files = ev.target.files
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = e => {
                    const retVal = {
                        content: e.target.result, 
                        filename: file.name
                    };
                    this.$emit('load', retVal);
                };
                reader.readAsText(file);
            });   
        },
        clear(){
            this.algorithm = '';
            this.keyword = '';
        },
        sendForm: function(){
            const value = [this.keyword, this.algorithm];
            this.$emit('formSubmitted', value);
            this.clear();
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    }
}
</script>

<style scoped>
#eForm{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
}
h1{
    text-align: center;
    margin-bottom: 2rem;
    font-size: 3rem;
}
#container{
    padding: 2rem;
    box-shadow: 0 0 10px #03dac5;
    border: 1px #f2f2f2 solid;
    margin-bottom: 3rem;
    width: 100%;
}
#upload, #keyword{
    display: inline-block;
}
#algorithm{
    display: block;
    margin-bottom: 0.5rem;
}
#container > input:not(#keyword):not(.radio){
    display: block;
}

label:not(#upload):not(#algorithm):not(#keyword){
    padding: 1rem 0;
}
#keyword{
    margin-top: 1rem;
}
#upload{
    padding-bottom: 1rem;
}
.radio{
    margin-right: 0.5rem;
    background-color: #03dac5;
    display: inline-block;
}
#keyword{
    margin-right: 0.5rem;
}
span{
    display: block;
}
button{
    margin-top: 0.5rem;
    display: block;
    background-color: #03dac5;
    border: none;
    padding: 5px 15px;
    color: white;
    padding: 0.3rem 2rem;
    margin: 1rem auto 0 auto;
    width: 40%;
    height: 1.8rem;
}
button:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}
button:active{
    opacity: 0.5;
}
input[type="text"] {
    display: block;
    width: 100%;
    background: none;
    border: none;
    border-bottom: 2px #03dac5 solid;
    color: #f2f2f2;
    margin-bottom: 1rem;
}
textarea:focus, input:focus{
    outline: none;
}
</style>
