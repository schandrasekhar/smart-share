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
            partial;
        for (; i < length; i++) {
            partial = createPartial(keys[i], data[keys[i]])
            fragment.appendChild(partial);
        }

        $(listElementId).empty().append(fragment);
    };

    var createPartial = function(timestamp, data) {
        var listChildEl = document.createElement("li"),
            divChild = document.createElement("div"),
            divInnerChild = document.createElement("div"),
            divSecondInnerChild = document.createElement("div"),
            date = new Date(+timestamp);
        divChild.classList.add("pure-g");

        divInnerChild.classList.add("pure-u-1", "pure-u-md-1-3", "list-item-timestamp");
        divInnerChild.textContent = date.toDateString() + " " + date.toTimeString();

        divSecondInnerChild.classList.add("pure-u-1", "pure-u-md-2-3", "list-item-data");
        divSecondInnerChild.textContent = data;
        
        divChild.appendChild(divInnerChild);
        divChild.appendChild(divSecondInnerChild);

        listChildEl.classList.add("getall-list-item");
        listChildEl.appendChild(divChild);
        return listChildEl;
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