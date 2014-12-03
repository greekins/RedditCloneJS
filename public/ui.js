(function($) { $(function() {
    $( document ).ready(function() {
        updateHiddenElements();
        getAndRenderData();
        username();
        $("#postEntry").click(function () {
            postLink();
        });
        $("#login").click(function () {
            login();
        });
        $("#register").click(function () {
            register();
        });
        $("#addUser").click(function () {
            addUser();
        });
        $("#logout").click(function () {
            logout();
        });
    });
    var source = $('#entriesTemplate').html();
    var entriesTemplate = Handlebars.compile(source);
    var placeholder = $("#entries");
    var getAndRenderData = function () {
        $.ajax({
            type: "GET",
            url: "/entries",
            dataType: "json",
            success: function( response ) {
                var html = entriesTemplate(response);
                placeholder.append(html);
            }
        });
    }

    var updateHiddenElements = function() {
        var placeholder = $("#usernameText");
        $.ajax({
            type: "GET",
            url: "/login",
            dataType: "json",
            success: function( response ) {
                if (response === "") {
                    document.getElementById("login-form").style.display="inline";

                    document.getElementById("usernameText").style.display="none";
                    document.getElementById("logout").style.display="none";
                    document.getElementById("addPost").style.display="none";
                } else {
                    document.getElementById("login-form").style.display="none";

                    document.getElementById("usernameText").style.display="inline";
                    document.getElementById("logout").style.display="inline";
                    document.getElementById("addPost").style.display="block";
                }
            }
        });
    }
});
    var postLink = function() {
        var title = $("#newPostTitle").val();
        var link = $("#newPostLink").val();
        var json = { title: title, url: link };
        $.post("/entry",
            json,
            function() {
                location.reload(true);
            }
        );
    }
    var login = function() {
        var username = $("#userName").val();
        var password = $("#userPassword").val();
        var json = { name: username, password: password };
        $.post("/login",
            json,
            function() {
                location.reload(true);
            }
        );
    }
    var username = function() {
        var source = $('#loginNameTemplate').html();
        var loginTemplate = Handlebars.compile(source);
        var placeholder = $("#usernameText");
        $.ajax({
            type: "GET",
            url: "/login",
            dataType: "json",
            success: function( response ) {
                var html = loginTemplate(response);
                placeholder.append(html);
            }
        });
    }
    var register = function() {
        document.getElementById("registration").style.display="block";
    }
    var addUser = function() {
        var username = $("#registerUsername").val();
        var password = $("#registerPassword").val();
        var passwordConfirmation = $("#registerPasswordConfirmation").val();
        if (password !== passwordConfirmation) {
            alert("The entered passwords don't match.");
        } else {
            var json = { name: username, password: password};
            $.ajax({
                type: "POST",
                url: "/register",
                data: json,
                dataType: "json",
                success: function(res) {
                    if (res === true) {
                        alert("Successfully registered.");
                        $.post("/login",
                            json,
                            function () {
                                location.reload(true);
                            }
                        );
                    } else {
                        alert("Username already exists or mistakes in form");
                    }
                }
            });
        }
    }
    var logout = function() {
        $.post("/logout",
            function() {
                location.reload(true);
            }
        );
    }
})(jQuery);