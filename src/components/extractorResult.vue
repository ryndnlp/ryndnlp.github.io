<template>
    <div id="result" v-show="resFound">
        <h1>Results</h1>
        <div v-for="(result,index) in resDistinct" :key="result.key" class="res">
            <h2>{{index+1}}. {{ result.text }}</h2>
            <p>Tanggal: {{ result.time | resFilter }}</p>
            <p>Waktu: {{ result.hour | resFilter }}</p>
            <p>Jumlah: {{ result.num | resFilter }}</p>
            <p>Filename: {{ result.filename }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    filters: {
        resFilter: function(value){
            if(value === undefined){
                return '-';
            }else if(value.length === 1){
                return value[0];
            }else{
                let str = '';
                for(let i=0;i<value.length;i++){
                    if(value.length-1 === i){
                        str += value[i];
                    }else{
                        str += value[i] + ', '
                    }
                }
                return str;
            }
        }
    },
    props: ['resDistinct', 'resFound']
}
</script>

<style scoped>
#result{
    padding: 2rem;
    margin: 0 auto;
    box-shadow: 0 0 10px #03dac5;
    border: 1px #f2f2f2 solid;
    margin-bottom: 3rem;
    margin-top: 1rem;
}
#result{
    max-width: 800px;
}
#result > h1{
    text-align: center;
}
.res{
    margin-top: 2rem;
}
</style>
