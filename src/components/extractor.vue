<template>
    <div>
        <extractor-form @load="pushLoadedData($event)" @clearFiles="clear()" @formSubmitted="handleSubmit($event)"></extractor-form>
        <extractor-result :resDistinct="resDistinct" :resFound="resFound" :noResult="noResult"></extractor-result>
    </div>
</template>

<script>
import ExtractorForm from './extractorForm';
import ExtractorResult from './extractorResult';
export default {
    components:{
        'extractor-form': ExtractorForm,
        'extractor-result': ExtractorResult
    },
    data() {
        return {
            results: [],
            noResult: false,
            resFound: false,
            texts: []
        }
    },
    mounted(){
        document.documentElement.style.backgroundColor = "#121212",
        document.documentElement.style.minHeight = "100vh"
    },
    methods: {
        handleSubmit(value){
            this.findResult(value[0], this.texts, value[1]);
        },
        clear(){
            this.texts = [];
        },
        pushLoadedData(fileObject){
            this.texts.push(fileObject);
        },
        lastOccurence(pattern){
            let last = []
            for(let i=0;i<128;i++) last.push(-1);
            for(let i=0;i<pattern.length;i++)
                last[pattern.charCodeAt(i)] = i;
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
            if(res.length === 0) return -1;
            else return res;
            
        },
        findResult(pattern, texts, algorithm){
            const timeRegex = /(?:Senin|Selasa|Rabu|Kamis|Jumat|Jum'at|Sabtu|Minggu)?[,]?[\s]?[(]?(?:\d{1,2})[-/\s](?:Jan(?:uari)?|Feb(?:ruari)?|Mar(?:et)?|Apr(?:il)?|Mei|Jun(?:i)?|Jul(?:i)?|Agustus|Sep(?:tember)?|Okt(?:ober)?|Nov(?:ember)?|Des(?:ember)?){1}[\s]?(?:\d{1,2})?[-/)\s,]?(?:\d{2,4})?/g;
            const numRegex = /(?:\d{1,}[,.]?\d{1,}%?)[\s]?(?:juta|ribu)?[\s]?(?:orang|jiwa|penduduk|kasus|pasien){1}/g
            const hourRegex = /(?:pukul\s)?(?:\d{1,2}[:|.]{1}){1}(?:\d{1,2})(?:\sWI[B|TA|T])?/g
            
            this.results = [];

            texts.forEach(text => {
                let results = -1;
                if(algorithm === 'Knuth-Morris-Pratt'){
                    results = this.kmpMatch(pattern, text.content);
                }else{
                    results = this.boyerMoore(pattern, text.content);
                }                
                if(results !== -1){
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
                this.noResult = results === -1;
                this.resFound = true;
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
            return fail;
        },
        kmpMatch(pattern, text){
            let m = pattern.length;
            let n = text.length;
            let fail = this.computeFail(pattern);
            let res = [];
            let i = 0;
            let j = 0;
    
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
                    if (j !== 0) j = fail[j-1];
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
        resDistinct: function(){
            let value = this.results;
            let retval = [];
            for(let i=0;i<this.results.length;i++){
                const before = JSON.stringify(this.results[i]);
                const after = JSON.stringify(this.results[i+1]);
                if(!(before === after) && i!=this.results.length){
                    retval.push(value[i]);
                }
            }
            return retval;
        }
    }
};
</script>

<style scoped>
*{
    color: #f2f2f2;
}
#extractor{
    padding: 0 2rem;
}
</style>
