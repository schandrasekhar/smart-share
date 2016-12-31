'use strict';

//requires jquery
//requires utils

smartshare.create = function() {
    var templateId = "#create-template";
    var formElementId = "#create-form";
    var usernameNameAttr = "[name='createusername']";
    var passNameAttr = "[name='createpass']";
    var postUrl = "/register";
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
                createUser(username, pass);
            }
        });
    };

    var bindOnSession = function() {
        $(document).on(sessionSetEvent, function() {
            utils.toggleView(templateId, false);
        });
    };

    var createUser = function(username, pass) {
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