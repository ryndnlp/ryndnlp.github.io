<template>
    <div id="forecast">
        <div id="question">
        <h1>Which area do you want to know the weather forecast?</h1>
        <input type="text" v-model="query" v-on:keyup.enter="fetchData(processInput())" />
        <p>try: 'bandung' or 'Jawa tengah' or 'jaksel'</p>
        </div>
        <component :is="component" v-show="isCalled" :processedData="processedData"></component>
    </div>
</template>

<script>
import SingleForecast from './singleForecast'
import MultipleForecast from './multipleForecast'
import ForecastForm from './forecastForm'

export default {
    mounted: function(){
        document.documentElement.style.backgroundColor = "#121212";
        document.documentElement.style.minHeight = "100vh";
    },
    methods: {
        fetchData: async function(query){
            if(!query) return;
            let result;
            const parseString = require('xml2js').parseString;
            const axios = require('axios');
            
            if(query){
                const temp = await axios
                            .get(`https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-${query.type === 'province'? query.value: query.province}.xml`)
                            .catch(err => console.log(err));
                parseString(temp.data, (err, res) => {
                    result = res.data.forecast[0].area;
                });
            }
            if(query.type === "city") result = result.filter(r => r.$.description === query.value);
            
            this.data = result;
            this.isCalled = true;
            return result;
        },
        processInput: function(){
            if(!this.query) return;
            const query = this.query.toLowerCase().split(' ').join('');
            const keys = Object.keys(this.cities);
            //Check if province
            for(let key of keys){
                const k = key.toLowerCase().split(' ').join('');
                if(k.includes(query) || this.abbrArea(key, query)){
                    return {
                        type: "province",
                        value: key.split(' ').join('')
                    }
                }
            }
            //Check if city
            for(let key of keys){
                for(let city of this.cities[key]) {
                    const c = city.toLowerCase().split(' ').join('')
                    if(query.includes(c) || this.abbrArea(city, query)){
                        return {
                            type: "city",
                            value: city,
                            province: key.split(' ').join('')
                        }                        
                    }
                }
            }
            // Not found
            return;
        },
        abbrArea(province, query){
            const compass = ['utara', 'selatan', 'barat', 'timur', 'tenggara'];
            const p = province.toLowerCase().split(' ');
            if(!compass.includes(p[1])) return false;
            if(p.length === 2 && p[0].length > 3){
                let end0 = 3;
                let end1 = 3;
                if(p[1] === 'utara') end1 = 2;
                if(p[0] === 'jawa') end0 = 2;
                return p[0].slice(0,end0) + p[1].slice(0,end1) === query;
            }
            return false;
        },
        inverseMatrix(oldMatrix){
            let newMatrix = [];
            for(let i = 0; i<oldMatrix[0].length; i++){
                let localRet = [];
                for(let j = 0; j<oldMatrix.length; j++){
                    localRet.push(oldMatrix[j][i]);
                }
                newMatrix.push(localRet);
            }
            return newMatrix;
        },
        processData(count = 4){
            const landData = this.data.filter(data => data.$.type === 'land');
                let i = 0;
                let j = 0;
                const result = landData.map(data => {
                //process daily
                const dateTimeDaily = data.parameter[1].timerange.map(dt => dt.$.datetime); //1 Max humidity Daily
                const dValues = data.parameter.filter(val => val.$.type === 'daily')
                    .map(param => param.timerange);
                const inversedDaily = this.inverseMatrix(dValues);
                const retDaily = inversedDaily.map(val => {
                    const retVal = val.map(v => {
                        return {
                            value: v.value[0]._,
                            unit: v.value[0].$.unit
                        }
                    });
                    return retVal;
                });
                const retDailyDT = retDaily.map(ret => {
                    const temp = {
                        hvalue: ret,
                        datetime: dateTimeDaily[j]
                    }
                    j++;
                    return temp;
                });
                //Process hourly
                const dateTimeHourly = data.parameter[0].timerange.map(dt => dt.$.datetime); //0 Humidity hourly
                const hValues = data.parameter.filter(val => val.$.type === 'hourly')
                    .map(param => param.timerange);
                const inversedHour = this.inverseMatrix(hValues);
                const retHourly = inversedHour.map(val => {
                    const retVal = val.map(v => {
                        return {
                            value: v.value[0]._,
                            unit: v.value[0].$.unit
                        };
                    });
                    return retVal;
                });
                const retHourlyDT = retHourly.map(ret => {
                    const temp = {
                        hvalue: ret,
                        date: dateTimeHourly[i].slice(0,8),
                        time: dateTimeHourly[i].slice(8)
                    }
                    i++;
                    if(i==12) i=0;
                    return temp;
                }).slice(0, count);
                return {
                    hourly: retHourlyDT,
                    daily: retDailyDT,
                    city: data.$.description
                };
            });
            if(result.length === 1) this.component = 'single-forecast';
            else this.component = 'multiple-forecast';
            return result;
        }
    },
    data() {
        return {
            query: '',
            cities: [],
            data: [],
            isCalled: false,
            component: 'multiple-forecast',
            imgs: ''
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
    created: async function(){
        const axios = require('axios');
        const data = await axios
                    .get('https://vue-project-38cbb.firebaseio.com/cities/-MCSJ7Hd9Tgyx6STLHDL.json')
                    .catch(err => console.log(err));
        const res = data.data;
        this.cities = res;
        return res;
    },
    components:{
        'forecast-form': ForecastForm,
        'single-forecast': SingleForecast,
        'multiple-forecast': MultipleForecast
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
