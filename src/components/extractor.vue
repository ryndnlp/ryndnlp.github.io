<template>
  <div id="extractor">
    <h1>Text File Extractor</h1>
    <div id="container">
        <label id="upload">Upload your file(s)!</label>
        <input type="file" accept=".txt" @change="loadTextFromFile" multiple/>
        <label id="keyword">Keyword:</label>
        <input type="text" id="keyword" v-model="keyword" v-focus/>
        <label id="algorithm">Choose the algorithm!</label>
        <template v-for="a in availAlgorithm">
            <span v-bind:key="a.key">
                <input type="radio" v-model="algorithm" v-bind:value="a" name="algorithm" class="radio" checked/>
                <label class="algorithm">{{ a }}</label>
            </span>
        </template>
        <button v-bind:disabled="isDisabled" @click="findResult(keyword, texts), noResult = isNoResult, resFound = true, clear()">EXTRACT</button>
    </div>
    <div id="result" v-show="resFound">
        <div id="noresult" v-show="noResult">
            <div id="nores"></div>
            <h1>No Result Found</h1>
            <p>Sorry, we can't find any match for your search.</p>
        </div>
        <template v-if="!noResult">
            <h1>Results</h1>
            <div v-for="(result,index) in resDistinct" v-bind:key="result.key" class="res">
                <h2>{{index+1}}. {{ result.text }}</h2>
                <p>Tanggal: {{ result.time | beautify }}</p>
                <p>Waktu: {{ result.hour | beautify }}</p>
                <p>Jumlah: {{ result.num | beautify }}</p>
                <p>Filename: {{ result.filename }}</p>
            </div>
        </template>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            texts: null,
            availAlgorithm: ['Boyer-Moore', 'Knuth-Morris-Pratt'],
            keyword: '',
            results: [],
            noResult: false,
            resFound: false,
            algorithm: ''
        }
    },
    methods: {
        clear(){
            this.algorithm = '',
            this.keyword = ''
        },
        loadTextFromFile(ev) {
            const files = ev.target.files

            files.forEach(file => {
                const reader = new FileReader();
                this.texts = [];
                reader.onload = (e) => {
                    this.texts.push({
                        content: e.target.result, 
                        filename: file.name
                    });
                };
                reader.readAsText(file);

            });    
        },
        lastOccurence(pattern){
            let last = []
            for(let i=0;i<128;i++) last.push(-1);
            for(let i=0;i<pattern.length;i++)
                last[pattern.charCodeAt(i)] = i
    
            return last;
        },
        boyerMoore(pattern, text){
            let last = this.lastOccurence(pattern)
            let m = pattern.length
            let n = text.length
            let i = m - 1
            let res = []

            if(i > n-1) return -1;
            
            let j = m - 1;
            
            for(;;){
                if(pattern[j] === text[i]){
                    if(j === 0) {
                        res.push(i);
                        i++;
                        j=0;
                    }
                    else{
                        i--;
                        j--;
                    }        
                }else{
                    let lo = last[text.charCodeAt(i)];
                    i += m - Math.min(j, 1+lo);
                    j = m - 1;
                }
                if(i > n-1) break;
            }
            if(!res) return -1;
            else return res;
            
        },
        findResult(pattern, texts){
            const timeRegex = /(?:Senin|Selasa|Rabu|Kamis|Jumat|Jum'at|Sabtu|Minggu)?[,]?[\s]?[(]?(?:\d{1,2})[-/\s](?:Jan(?:uari)?|Feb(?:ruari)?|Mar(?:et)?|Apr(?:il)?|Mei|Jun(?:i)?|Jul(?:i)?|Agustus|Sep(?:tember)?|Okt(?:ober)?|Nov(?:ember)?|Des(?:ember)?){1}[\s]?(?:\d{1,2})?[-/)\s,]?(?:\d{2,4})?/g;
            const numRegex = /(?:\d{1,}[,.]?\d{1,}%?)[\s]?(?:juta|ribu)?[\s]?(?:orang|jiwa|penduduk|kasus|pasien){1}/g
            const hourRegex = /(?:pukul\s)?(?:\d{1,2}[:|.]{1}){1}(?:\d{1,2})(?:\sWI[B|TA|T])?/g
            
            this.results = [];

            texts.forEach(text => {
                let results;
                if(this.algorithm === 'Knuth-Morris-Pratt'){
                    results = this.kmpMatch(pattern, text.content);
                }else{
                    results = this.boyerMoore(pattern, text.content);
                }

                if(results !== -1){
                    this.texts = [];
                    results.forEach(result => {
                        let res = this.findSentence(text.content, result);
                        let times;
                        let nums;
                        let hours;
                        if(res.match(timeRegex) !== null) {
                            times = res.match(timeRegex).map(el => el.trim());
                        }
                        if(res.match(numRegex) !== null){
                            nums = res.match(numRegex).map(el => el.trim());
                        }
                        if(res.match(hourRegex) !== null){
                            hours = res.match(hourRegex).map(el => el.trim());
                        }
                        const retVal = {
                            time: times,
                            num: nums,
                            filename: text.filename,
                            text: res,
                            hour: hours
                        }
                        this.results.push(retVal);
                    });
                }
            });
        },
        computeFail(pattern){
            let length = pattern.length;
            let i = 1;
            let j = 0;
            let fail = [];
            for(let i=0;i<length;i++) fail.push(0);

            while(i<length){
                if(pattern[i] === pattern[j]){
                    fail[i] = j+1;
                    i+=1;
                    j+=1;
                }else if(j>0){
                    j = fail[j-1];
                }else{
                    fail[i] = 0;
                    i+=1;
                }
            }
            return fail
        },
        kmpMatch(pattern, text){
            let m = pattern.length
            let n = text.length 
            let fail = this.computeFail(pattern)
            let res = []
            let i = 0
            let j = 0
    
            while(i < n){ 
                if (pattern[j] === text[i]){
                    i += 1;
                    j += 1;
                }
                    
                if (j === m){
                    res.push(i-j);
                    j = fail[j-1];
                }
                else if(i < n && pattern[j] !== text[i]){
                    if (j !== 0) j = fail[j-1] ;
                    else i += 1;
                }
                    
            }
            if(res.length === 0) return -1;
            else return res;
        },
        findSentence(text, index){
            let m = text.length;
            let start = index;
            let end = index;
            let foundBegin = false;
            let foundEnd = false;

            while(!foundBegin && start>0){
                if(text[start] === '.' && text[start+1] === ' '){
                    start+=2;
                    foundBegin = true;
                }else if(text[start] === '\n'){
                    start+=1;
                    foundBegin = true;
                }else start-=1;
            }
            
            while(!foundEnd && end < m){
                if(end+1<m){
                    if(text[end] === '.' && text[end+1] === ' ') foundEnd = true;
                    else end+=1;
                }else if(text[end] === '\n'){
                    end-=1;
                    foundEnd = true;
                }else end+=1;
            }
            let res = '';
            if(end === m){
                end--;
            }
            for(let i=start;i<end+1;i++){
                res += text[i];
            }
            return res;
        }
    },
    computed:{
        isDisabled: function(){
            return !this.keyword || !this.algorithm || this.texts === null;
        },
        isNoResult: function(){
            return this.results[0] === undefined;
        },
        output: function(results){
            results.map(result =>{
                if (!("time" in result)) result.time = '-';
                if (!("hour" in result)) result.time = '-';
                if (!("num" in result)) result.time = '-';
            });
            return results;
        },
        resDistinct: function(){
            let value = this.results;
            let retval = [];
            for(let i=0;i<this.results.length;i++){
                if((!(JSON.stringify(this.results[i]) === JSON.stringify(this.results[i+1]))) && i!=this.results.length){
                    retval.push(value[i]);
                }
            }
            return retval;
        }
    },
    mounted(){
        document.documentElement.style.backgroundColor = "#121212",
        document.documentElement.style.minHeight = "100vh"
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    filters: {
        beautify: function(value){
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
    }
};
</script>

<style scoped>

#extractor{
    padding: 2rem;
    color: #f2f2f2;
}
#result, #container{
    padding: 2rem;
    margin: 0 auto;
    box-shadow: 0 0 10px #03dac5;
    border: 1px #f2f2f2 solid;
    margin-bottom: 3rem;
}
#container{
    max-width: 500px;
}
#result{
    max-width: 800px;
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
#extractor > h1{
    margin-bottom: 2rem;
    text-align: center;
}
#result > h1{
    text-align: center;
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
