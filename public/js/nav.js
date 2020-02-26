$(document).ready(function () {
    $.ajax("/api/user_data", {
        type: "GET"
      }).then(
        function (res) {
            console.log(res);
            if(res === undefined || res === null) {
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

