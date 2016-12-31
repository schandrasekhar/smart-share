'use strict';

smartshare.getAll = function() {
    var getUrl = "/getAll";
    var templateId = "#getall-template";
    var listElementId = "#getall-list"
    var sessionVar = "smartshare-session";
    var sessionSetEvent = "smartshare-session-set";
    var getAllEvent = "getall-list";

    var construct = function() {
        getAllData();
        bindOnSessionEvent();
        bindOnGetAllEvent();
    };

    var bindOnSessionEvent = function() {
        $(document).on(sessionSetEvent, function() {
            getAllData();
        });
    };

    var bindOnGetAllEvent = function() {
        $(document).on(getAllEvent, function() {
            getAllData();
        });
    };

    var getAllData = function() {
        var sessionKey = getSessionKey(),
            url;
        if (sessionKey) {
            url = getUrl + "?id=" + sessionKey;
            $.get(url)
             .done(function(data) {
                if (data.status) {
                    appendToDom(data.data);
                } else {
                    console.error("Not able to get data");
                    console.error(data);
                }
            })
            .fail(function(err) {
                console.log(err);
            });
        }
    };

    var appendToDom = function(data) {
        var keys = Object.keys(data),
            i = 0,
            length = keys.length,
            fragment = document.createDocumentFragment(),
            listChildEl;
        for (; i < length; i++) {
            listChildEl = document.createElement("li");
            listChildEl.textContent = keys[i] + "  ===>  " + data[keys[i]];
            fragment.appendChild(listChildEl);
        }

        $(listElementId).empty().append(fragment);
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

    construct();
};