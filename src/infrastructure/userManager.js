

 const UserManager = {


    Save : function (user) {

        localStorage.setItem("user" , JSON.stringify(user));
    },

    Load : function (){
        return JSON.parse(localStorage.getItem("user"));
    },

    DefaultUser : function() {

        return "demo:demo"
    },

     IsAuthenticated : function() {
        const result = this.Load()!=null;     
        
        return result;
    }
}

export default UserManager;