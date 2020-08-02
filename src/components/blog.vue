<template>
    <div id="container">
        <blog-header></blog-header>
        <router-view></router-view>
    </div>
</template>

<script>
import BlogHeader from './blogHeader'
import resetMixin from '../mixins/resetMixin';
export default {
    components:{
        'blog-header': BlogHeader
    },
    mixins: [resetMixin]
}
</script>

<style scoped>
*{
    color: #f2f2f2;
}

</style>
