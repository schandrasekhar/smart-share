'use strict';

smartshare.upload = function() {
    var postUrl = "/upload";
    var templateId = "upload-template";
    var formElementId = "#upload-form";
    var dataNameAttr = "[name='data']";
    var sessionVar = "smartshare-session";
    var getAllEvent = "getall-list";

    var construct = function() {
        bindOnSumbit();
    };

    var bindOnSumbit = function() {
        $(formElementId).on('submit', function(event) {
            event.preventDefault();
            var data = parseData($(dataNameAttr).val());
            if (valid(data)) {
                uploadData(data);
            }
        });
    };

    var uploadData = function(data) {
        var sessionKey = getSessionKey(),
            postData = {};
        if (sessionKey) {
            postData.id = sessionKey;
            postData.data = data;
            $.post(postUrl, postData)
             .done(function(data) {
                triggerGetAllEvent();
            })
            .fail(function(err) {
                console.log(err);
            });
        }
    };

    var triggerGetAllEvent = function() {
        $(document).trigger(getAllEvent);
    };

    var parseData = function(value) {
        return value;
    };

    var getSessionKey = function() {
        var sessionKey;
        if (localStorage) {
            sessionKey = localStorage.getItem(sessionVar);
            if (sessionKey && (sessionKey.length > 0)) {
                return sessionKey;
            } else {
                return null;
            }
        } else {
            alert("Browser not supported");
        }
    };

    var valid = function(value) {
        return true;
    };

    construct();
};