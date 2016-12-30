'use strict';

//requires jquery

smartshare.create = function() {
    var formElementId = "#create";
    var usernameNameAttr = "[name='createusername']";
    var passNameAttr = "[name='createpass']";
    var postUrl = "/register";

    var construct = function() {
        bindOnSubmit();
    };

    var bindOnSubmit = function() {
        $(formElementId).on('submit', function(event) {
            event.preventDefault();
            var username = $(usernameNameAttr).val();
            var pass = $(passNameAttr).val();
            if (valid(username, pass)) {
                createUser(username, pass);
            }
        });
    };

    var createUser = function(username, pass) {
        var data = {
            "username": username,
            "pass": pass
        };

        $.post(postUrl, data)
         .done(function(data) {
            console.log(data);
         })
         .fail(function(err) {
            console.log(err);
         });
    };

    var valid = function(username, pass) {
        return true;
    };

    construct();
};