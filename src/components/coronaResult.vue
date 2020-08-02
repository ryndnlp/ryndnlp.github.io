<template>
    <div id="result">
        <h1>{{result.province}}</h1>
        <div id="res">
            <div v-for="(data, index) in result" class="data" :key="data.key">
                <template v-if="index !== 'province'">
                    <p>{{index.toUpperCase()}}</p>
                    <h2>{{data}}</h2>
                </template>
            </div>
        </div>
        <p>Last update: {{lastUpdate}}</p>
        <p>Source: Gugus Tugas Percepatan Penanganan COVID-19 Indonesia</p>
    </div>
</template>

<script>
export default {
    props: ['result', 'lastUpdate']
}
</script>

<style scoped>
*{
    text-align: center;
}
#result{
    padding: 0 2rem 2rem 2rem;
}
h1{
    font-size: 5rem;
}
h2{
    font-size: 50px;
}
p{
    font-size: 30px;
}
#res{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 2rem;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto 1rem auto;
}
.data{
    min-width: 200px;
    font-weight: 900;
}
.data:first-child{
    display: none;
}
.data:nth-child(2) > p{
    color: #b00020;
}
.data:nth-child(3) > p{
    color: yellow;
}
.data:last-child > p{
    color: #00abcc;
}
</style>
