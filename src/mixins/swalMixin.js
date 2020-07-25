export default{
    methods:{
        showAlert: function(icon, title, text){
            this.$swal({
                icon,
                title,
                text
            });
        }
    }
}