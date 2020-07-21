<template>
    <div id="container">
        <blog-header></blog-header>
        <router-view></router-view>
    </div>
</template>

<script>
import BlogHeader from './blogHeader'

export default {
    components:{
        'blog-header': BlogHeader
    }
}
</script>

<style scoped>
*{
    color: #f2f2f2;
}

</style>
