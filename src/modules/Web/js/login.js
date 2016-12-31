'use strict';

//requires jquery
//requires utils

smartshare.login = function() {
    var templateId = "#login-template";
    var formElementId = "#login-form";
    var usernameNameAttr = "[name='loginusername']";
    var passNameAttr = "[name='loginpass']";
    var postUrl = "/login";
    var sessionVar = "smartshare-session";
    var sessionSetEvent = "smartshare-session-set";

    var construct = function() {
        checkForSession();
        bindOnSession();
    };

    var checkForSession = function() {
        var sessionValue;
        if (localStorage) {
            sessionValue = localStorage.getItem(sessionVar);
            if (!sessionValue) {
                utils.toggleView(templateId, true);
                bindOnSubmit();
            }
        } else {
            alert("Browser not supported");
        }
    }

    var bindOnSubmit = function() {
        $(formElementId).on('submit', function(event) {
            event.preventDefault();
            var username = $(usernameNameAttr).val();
            var pass = $(passNameAttr).val();
            if (valid(username, pass)) {
                loginUser(username, pass);
            }
        });
    };

    var bindOnSession = function() {
        $(document).on(sessionSetEvent, function() {
            utils.toggleView(templateId, false);
        });
    };

    var loginUser = function(username, pass) {
        var data = {
            "username": username,
            "pass": pass
        };

        $.post(postUrl, data)
         .done(function(data) {
            if (data.status) {
                setSessionKey(data);
            }
         })
         .fail(function(err) {
            console.log(err);
         });
    };

    var setSessionKey = function(data) {
        localStorage.setItem(sessionVar, data.sessionKey);
        utils.toggleView(templateId, false);
        $(document).trigger(sessionSetEvent);
    };

    var valid = function(username, pass) {
        return true;
    };

    construct();
};