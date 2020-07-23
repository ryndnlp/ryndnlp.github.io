<template>
    <div id="corona">
        <corona-form @formSubmitted="handleSubmit($event)"></corona-form>
        <corona-result v-if="isCalled" :result="result" :lastUpdate="lastUpdate"></corona-result>
    </div>
</template>

<script>
import CoronaForm from './coronaForm';
import CoronaResult from './coronaResult';
export default {
    mounted: function(){
        document.documentElement.style.backgroundColor = "#121212";
        document.documentElement.style.minHeight = "100vh";
    },
    methods: {
        handleSubmit: function(query){
            this.processInput(query);
        },
        processInput: function(rawQuery){
            if(!rawQuery) return;
            const query = rawQuery.toLowerCase().split(' ').join('');
            const keys = Object.keys(this.cities);
            //Check if province
            for(let key of keys){
                const k = key.toLowerCase().split(' ').join('');
                if(k.includes(query) || this.abbrArea(key, query)){
                    this.getResult(key);
                    return;
                }
            }
            return;
        },
        getResult: function(key){
            this.result = this.data.filter(d => d.province === key)[0];
            this.isCalled = true;
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
    },
    data(){
        return {
            data: [],
            lastUpdate: '',
            result: {},
            isCalled: false
        }
    },
    async created(){
        const axios = require('axios');
        //Fetch cases    
        const data = await axios
                    .get('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Kasus_Posi,Kasus_Semb,Kasus_Meni,Provinsi&outSR=4326&f=json')
                    .catch(err => console.log(err));
        const lastUpdate = data.headers['last-modified'];
        //this.data = data.data.features;
        this.lastUpdate = lastUpdate;
        //Fetch cities
        const cities = await axios
                    .get('https://vue-project-38cbb.firebaseio.com/cities/-MCSJ7Hd9Tgyx6STLHDL.json')
                    .catch(err => console.log(err));
        const res = cities.data;
        this.cities = res;
        //Handle data
        const retVal = data.data.features.map(d => d.attributes).slice(0,34)
            .map(provs => {
                return {
                    province: provs.Provinsi,
                    meninggal: provs['Kasus_Meni'],
                    positif: provs['Kasus_Posi'],
                    sembuh: provs['Kasus_Semb']
                }
            });
        this.data = retVal;
        return retVal;
    },
    components: {
        'corona-form': CoronaForm,
        'corona-result': CoronaResult
    }
}
</script>

<style scoped>
*{
    color: #f2f2f2;
}
#corona{
    padding: 0 2rem;
}
</style>
