<template>
    <div id="forecast">
        <forecast-form @formSubmitted="handleSubmit($event)" ref="form"></forecast-form>
        <forecast-result v-show="isCalled" :processedData="processData()"></forecast-result>
    </div>
</template>

<script>
import ForecastForm from './forecastForm';
import ForecastResult from './forecastResult';
import resetMixin from '../mixins/resetMixin';
export default {    
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
        processInput: function(rawQuery){
            if(!rawQuery) return;
            const query = rawQuery.toLowerCase().split(' ').join('');
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
            this.$refs.form.showAlert('error', 'We are pretty sure that area doesn\'t exist.', 'Please try again!');
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
            const landData = this.dataBMKGFiltered.filter(data => data.$.type === 'land');
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
            return result;
        },
        handleSubmit: function(query){
            this.fetchData(this.processInput(query));
        }
    },
    data() {
        return {
            query: '',
            cities: [],
            data: [],
            isCalled: false
        }
    },
    computed: {   
        dataBMKGFiltered: function(){
            if(this.data){
                const filtered = this.data
                .filter((element, index, arr) => {
                    return arr.indexOf(element) === index;
                })
                .filter(element => {
                    return element.parameter !== null;
                });
                return filtered;
            }
            return null; 
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
        'forecast-result': ForecastResult
    },
    mixins: [resetMixin]
}
</script>

<style scoped>
*{
    color: #f2f2f2;
}
</style>
