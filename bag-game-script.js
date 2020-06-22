new Vue({
    el: "#vue-app",
    data:{
        health: 100, 
        isDone: false
    },
    methods:{
        punch: function(){ 
            this.health -= this.randomNumber();
            if(this.health === 0){
                this.isDone = true;
            }
        },
        reset: function(){
            this.health = 100;
            this.isDone = false;
        },
        randomNumber : function(){
            return Math.floor(Math.random() * this.health) + 1;
        }
    },
    computed:{

    }
})