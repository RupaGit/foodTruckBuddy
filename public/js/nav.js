$(document).ready(function () {
    $.ajax("/api/user_data", {
        type: "GET"
      }).then(
        function (res) {
            if(Object.keys(res).length === 0) {
                $("#loginHandler").html("LogIn / SignUp");
                $("#loginHandler").attr("href", "/logIn");
            }
            else {
                $("#loginHandler").html("Log Out");
                $("#loginHandler").attr("href", "/logOut");
            }
        });
}); 

