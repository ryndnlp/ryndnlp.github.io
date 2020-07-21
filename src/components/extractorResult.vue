<template>
    <div id="result" v-show="resFound">
        <div id="noresult" v-show="noResult" >
            <div id="nores"></div>
            <h1>No Result Found</h1>
            <p>Sorry, we can't find any match for your search.</p>
        </div>
        <template v-if="!noResult">
            <h1>Results</h1>
            <div v-for="(result,index) in resDistinct" :key="result.key" class="res">
                <h2>{{index+1}}. {{ result.text }}</h2>
                <p>Tanggal: {{ result.time | resFilter }}</p>
                <p>Waktu: {{ result.hour | resFilter }}</p>
                <p>Jumlah: {{ result.num | resFilter }}</p>
                <p>Filename: {{ result.filename }}</p>
            </div>
        </template>
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
    props: ['resDistinct', 'resFound', 'noResult']
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
#nores::before{
    font-family: "Font Awesome 5 Free";
    content: "\f05e";
    font-size: 8rem;
    font-weight: 700;
    color: #b00020;
}
#nores, #noresult{
    display: block;
    margin: 0 auto;
    text-align: center;
}
.res{
    margin-top: 2rem;
}
#noresult > h1{
    margin: 0.5rem 0;
}
</style>
