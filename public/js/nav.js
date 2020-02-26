$(document).ready(function () {
    $.ajax("/api/user_data", {
        type: "GET"
      }).then(
        function (res) {
            console.log(res);
            if(Object.keys(res).length === 0) {
                $("#loginHandler").html("LogIn / SignUp");
                $("#loginHandler").attr("href", "/logIn");
            }
            else {
                console.log("I am logged in");
                $("#loginHandler").html("Log Out");
                $("#loginHandler").attr("href", "/logOut");
            }
        });
}); 

