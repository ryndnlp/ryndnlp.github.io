<template>
    <div id="multipleForecast">
        <div id="result" v-for="(value, index) in processedData" :key="index">
            <h1>{{citiesName[index]}}</h1>
            <div class="segment" v-for="data in value.hourly" :key="data.key">
                <p>{{data.date | dateFilter}}</p>
                <p>{{data.time | timeFilter}}</p>
                <template v-for="(param, pIndex) in data.hvalue">
                    <div :key="pIndex" v-if="param.unit === '%'">
                        <img src="../assets/drop.svg" :key="pIndex" class="img">
                        <p class="icontext">{{param.value}}{{param.unit}}</p>
                        <img v-if="param.unit === 'icon'" :src="getImgUrl(param.value)" :key="pIndex" class="icons">
                    </div>
                    <div :key="pIndex" v-else-if="param.unit === 'deg'">
                        <img src="../assets/compass.svg" :key="pIndex" class="img">
                        <p class="icontext">{{param.value}}{{param.unit}}</p>
                    </div>
                    <div :key="pIndex" v-else-if="param.unit === 'Kt'">
                        <img src="../assets/wind.svg" :key="pIndex" class="img">
                        <p class="icontext">{{param.value}}{{param.unit}}</p>
                    </div>
                    <template v-else>
                        <p v-if="param.unit !== 'icon'" :key="pIndex" :class="{drop: param.unit==='Kt'}">
                            <span :class="{deg: param.unit==='C'}">{{param.value}}</span>{{param.unit}}
                        </p>
                        <img v-if="param.unit === 'icon'" :src="getImgUrl(param.value)" :key="pIndex" class="icons">
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        document.documentElement.style.backgroundColor = "#121212";
        document.documentElement.style.minHeight = "100vh";
    },
    data() {
        return{
            
        }
    },
    props: [
        'processedData'
    ],
    methods:{
        check(){
            console.log(this.citiesName);
        },
        getImgUrl(value) {
            const val = parseInt(value, 10);
            const images = require.context('../assets/', false, /\.svg$/);
            let name;
                if(val === 100 || val === 0) name = 'clear';    
                else if(val === 101 || val === 1 || val === 2 || val === 102) name = 'clear-cloudy';    
                else if(val === 3 || val === 103) name = 'cloudy';    
                else if(val === 4 || val === 104) name = 'cloudy'; //overcast    
                else if(val === 5) name = 'haze';    
                else if(val === 10) name = 'smoke';    
                else if(val === 45) name = 'haze'; //fog    
                else if(val === 60) name = 'light-rain';    
                else if(val === 61) name = 'rain';    
                else if(val === 63) name = 'heavy-rain';    
                else if(val === 80) name = 'isolated-rain';
                else if(val === 95 || val === 97) name = 'thunderstorm';
                else name = 'weather';
            return images('./' + name + ".svg");
        }
    },
    computed: {
        citiesName: function(){
            if(this.processedData.length !== 0){
                return this.processedData.map(cityName => cityName.city);
            }
            else return null;
        }
    },
    filters: {
        timeFilter(value){
            return `Pukul ${value.slice(0,2)}:${value.slice(2)}`;
        },
        dateFilter(value){
            return `${value.slice(6)}-${value.slice(4,6)}-${value.slice(0,4)}`
        }
    },
    components: {
    }
}
</script>

<style scoped>
*{
    color: #f2f2f2;
    text-align: center;
}
h1{
    font-size: 5rem;
}
#multipleforecast{
    margin: 0 auto;
    text-align: center;
}
.icons{
    height: 150px;
    width: 150px;
}
#result{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem;
    margin: 2rem;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;
    align-items: center;
}
.segment{
    height: 200px;
    width: 800px;
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px #f2f2f2 solid;
    box-shadow: 0 0 15px #03dac5;
}
.segment > *{
    margin: 0 10px;
}
.icontext{
    display: inline-block;
}

.img{
    margin-right: 2px;
    width: 15px;
    height: 15px;
}
.deg::after{
    content: "\00b0";
}
p{
    font-size: 20px;
}

</style>
