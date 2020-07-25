<template>
    <div :class="{singleForecast: isSingle, multipleForecast: !isSingle}">
        <template v-if="citiesName.length === 1">
            <h1 data-aos="fade" data-aos-delay="0">{{citiesName[0]}}</h1>
            <p class="date" data-aos="fade">{{dataDate | dateFilter}}</p>
        </template>
        <div :class="{singResult: isSingle, mulResult: !isSingle}" v-for="(value, index) in processedData" :key="index">
            <template v-if="citiesName.length > 1">
                <h1 v-if="citiesName.length > 1" data-aos="fade" data-aos-delay="0">{{citiesName[index]}}</h1>
                <p>{{dataDate | dateFilter}}</p>
            </template>
            <div data-aos="fade-up" :class="{singSegment: isSingle, mulSegment: !isSingle}" v-for="data in value.hourly" :key="data.key">
                <p>{{data.time | timeFilter}}</p>
                <template v-for="(param, pIndex) in data.hvalue">
                    <div :key="pIndex" v-if="param.unit === '%'">
                        <img src="../assets/weather/drop.svg" :key="pIndex" class="img">
                        <p class="icontext">{{param.value}}{{param.unit}}</p>
                    </div>
                    <div :key="pIndex" v-else-if="param.unit === 'deg'">
                        <img src="../assets/weather/compass.svg" :key="pIndex" class="img">
                        <p class="icontext">{{param.value}}{{param.unit}}</p>
                    </div>
                    <div :key="pIndex" v-else-if="param.unit === 'Kt'">
                        <img src="../assets/weather/wind.svg" :key="pIndex" class="img">
                        <p class="icontext">{{param.value}}{{param.unit}}</p>
                    </div>
                    <template v-else>
                        <p v-if="param.unit !== 'icon'" :key="pIndex" :class="{drop: param.unit==='Kt'}">
                            <span :class="{deg: param.unit==='C'}">{{param.value}}</span>{{param.unit}}
                        </p>
                        <img v-if="param.unit === 'icon'" :src="getImgUrl(param.value)" :key="pIndex" :class="{singIcons: isSingle, mulIcons: !isSingle}">
                    </template>
                </template>
            </div>
        </div>
        <p id="source">Source: Badan Meteorologi Klimatologi dan Geofisika Indonesia</p>
    </div>
</template>

<script>
export default {
    props: [
        'processedData'
    ],
    methods:{
        getImgUrl(value) {
            const val = parseInt(value, 10);
            const images = require.context('../assets/weather', false, /\.svg$/);
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
            return images('./' + name + '.svg');
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
    computed: {
        isSingle: function(){
            return this.citiesName.length === 1;
        },
        citiesName: function(){
            if(this.processedData) return this.processedData.map(cityName => cityName.city);
            else return null;
        },
        dataDate: function(){
            return this.processedData[0].hourly[0].date;
        }       
    }
}
</script>

<style scoped>
*{
    text-align: center;
}
h1{
    font-size: 5rem;
}
.multipleForecast, .singleForecast{
    margin: 0 auto;
    text-align: center;
    padding: 0 2rem 2rem 2rem;
}
.mulIcons{
    height: 150px;
    width: 150px;
}
.singIcons{
    height: 200px;
    width: 200px;
    margin: -10px 0
}
.mulResult{
    flex-direction: column;
    margin: 2rem;
    align-items: center;
}
.singResult{
    flex-direction: row;
    margin: 2rem;
}
.mulResult, .singResult{
    margin: 0 auto;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1000px;
    display: flex;
    padding: 2rem;
}
.mulSegment{
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
.singSegment{
    height: 400px;
    width: 300px;
    margin: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px #f2f2f2 solid;
    box-shadow: 0 0 15px #03dac5;
}
.mulSegment > *{
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
    font-size: 24px;
}
#source, .date{
    font-size: 30px;
}
@media only screen and (max-width: 800px) {
    .multipleForecast, .singleForecast, .mulResult, .singResult{
        padding: 0;
    }
}
</style>
