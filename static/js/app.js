!function (a) {
    window.WPHJS = {
        GOOGLE_MAPS_API_KEY: "AIzaSyBVrrJLTmmDoRk5nCE3xglH496gj1Ff-gE", childrenTotalHeight: function (e) {
            var t = 0;
            return a(e).find("> *").each(function () {
                t += a(this).outerHeight()
            }), t
        }, getContainerOuterWidth: function () {
            var e = a('<div class="container"/>').appendTo(a("body")), t = e.outerWidth();
            return e.remove(), t
        }, getContainerInnerWidth: function () {
            var e = a('<div class="container"><div></div></div>').appendTo(a("body")), t = e.find("> div").outerWidth();
            return e.remove(), t
        }
    }
}(jQuery), function (g) {
    "use strict";

    function p(e, t) {
        return e = new Date(e.getFullYear(), e.getMonth(), e.getDate()).valueOf(), ((t = new Date(t.getFullYear(), t.getMonth(), t.getDate()).valueOf()) < e) - (e < t)
    }

    function s(e) {
        return [e.getFullYear(), (e.getMonth() + 1 + "").padStart(2, "0"), (e.getDate() + "").padStart(2, "0")].join("-")
    }

    function m(e) {
        return new Date(e.getFullYear(), e.getMonth(), 1)
    }

    function y(e) {
        return new Date(e.getFullYear(), e.getMonth() + 1, 0)
    }

    var e = function (e) {
        e.version = "0.1.0";

        function l(e) {
            this.message = e, this.toString = function () {
                return this.constructor.name + ": " + this.message
            }
        }

        function t(e) {
            this.firstWeekDay = e || 0
        }

        t.prototype = {
            constructor: t, weekStartDate: function (e) {
                for (var t = new Date(e.getTime()); t.getDay() !== this.firstWeekDay;) t.setDate(t.getDate() - 1);
                return t
            }, monthDates: function (e, t, a, n) {
                if ("number" != typeof e || e < 1970) throw new l("year must be a number >= 1970");
                if ("number" != typeof t || t < 0 || 11 < t) throw new l("month must be a number (Jan is 0)");
                var i = [], o = [], r = 0, s = this.weekStartDate(new Date(e, t, 1));
                do {
                    for (r = 0; r < 7; r++) o.push(a ? a(s) : s), (s = new Date(s.getTime())).setDate(s.getDate() + 1);
                    i.push(n ? n(o) : o), o = []
                } while (s.getMonth() <= t && s.getFullYear() === e);
                return i
            }, monthDays: function (e, t) {
                return this.monthDates(e, t, function (e) {
                    return e.getMonth() === t ? e.getDate() : 0
                })
            }, monthText: function (e, a) {
                if (void 0 === e) {
                    var t = new Date;
                    e = t.getFullYear(), a = t.getMonth()
                }
                return this.monthDates(e, a, function (e) {
                    for (var t = e.getMonth() === a ? e.getDate().toString() : "  "; t.length < 2;) t = " " + t;
                    return t
                }, function (e) {
                    return e.join(" ")
                }).join("\n")
            }
        };
        for (var a = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" "), n = 0; n < a.length; n++) t[a[n]] = n;
        return e.Calendar = t, e.Calendar
    }({}), t = new Date, l = {
        year: t.getFullYear(),
        month: t.getMonth(),
        firstWeekDay: 1,
        dayItemContents: ["month-full", "day"],
        months: [{short: "Jan", full: "January"}, {short: "Feb", full: "February"}, {
            short: "Mar",
            full: "March"
        }, {short: "Apr", full: "April"}, {short: "May", full: "May"}, {short: "Jun", full: "June"}, {
            short: "Jul",
            full: "July"
        }, {short: "Aug", full: "August"}, {short: "Sep", full: "September"}, {
            short: "Oct",
            full: "October"
        }, {short: "Nov", full: "November"}, {short: "Dec", full: "December"}],
        weekdays: [{short: "Sun", full: "Sunday"}, {short: "Mon", full: "Monday"}, {
            short: "Tue",
            full: "Tuesday"
        }, {short: "Wed", full: "Wednesday"}, {short: "Thu", full: "Thursday"}, {
            short: "Fri",
            full: "Friday"
        }, {short: "Sat", full: "Saturday"}]
    };
    g.fn.calendar = function (c) {
        c = g.extend(l, c);
        var f = new e(c.firstWeekDay), t = g(this), u = new Date(c.year, c.month),
            n = g('<div class="calendar-month-selector"/>').appendTo(t),
            a = g('<div class="calendar-weekdays-container"/>').appendTo(t),
            h = g('<div class="calendar-dates-container"/>').appendTo(t),
            i = g('<input type="date" class="calendar-native-input form-control"/>').appendTo(t);
        c.nativeInputName && i.attr("name", c.nativeInputName), c.maxDate && i.attr("max", s(c.maxDate)), c.minDate && i.attr("min", s(c.minDate));

        function o(e) {
            n.empty().append(g('<button class="btn btn-square btn-light btn-sm prev-month"/>').html('<i class="material-icons">keyboard_arrow_left</i>'), g('<div class="current-month"/>').text(c.months[e.getMonth()].full + " " + e.getFullYear()), g('<button class="btn btn-square btn-light btn-sm next-month"/>').html('<i class="material-icons">keyboard_arrow_right</i>'));
            var t = new Date(e.getFullYear(), e.getMonth() - 1);
            c.minDate && 1 === p(c.minDate, y(t)) && n.find(".prev-month").addClass("disabled");
            var a = new Date(e.getFullYear(), e.getMonth() + 1);
            c.maxDate && -1 === p(c.maxDate, m(a)) && n.find(".next-month").addClass("disabled")
        }

        function r(e) {
            h.empty();
            for (var t, a, n = f.monthDates(e.getFullYear(), e.getMonth()), i = 0; i < n.length; i++) for (var o = n[i], r = 0; r < o.length; r++) {
                var s = o[r], l = ["calendar-date", "weekday-" + (s.getDay() + 1)];
                switch (a = u, t = 12 * (t = s).getFullYear() + t.getMonth(), ((a = 12 * a.getFullYear() + a.getMonth()) < t) - (t < a)) {
                    case-1:
                        l.push("prev-month");
                        break;
                    case 0:
                        l.push("current-month");
                        break;
                    case 1:
                        l.push("next-month")
                }
                0 === p(s, y(s)) ? l.push("last-date-of-month") : 0 === p(s, m(s)) && l.push("first-date-of-month"), c.selectedDay && 0 === p(s, c.selectedDay) && l.push("selected"), (c.maxDate && 1 === p(s, c.maxDate) || c.minDate && -1 === p(s, c.minDate)) && l.push("disabled");
                var d = g("<div/>", {class: l.join(" ")}).data("date", s).appendTo(h);
                g("<div/>", {class: "calendar-date-content"}).appendTo(d).append(g.map(c.dayItemContents, function (e) {
                    return "month-full" === e ? g('<div class="month-full"/>').text(c.months[s.getMonth()].full) : "month-short" === e ? g('<div class="month-short"/>').text(c.months[s.getMonth()].short) : "day" === e ? g('<div class="day"/>').text(s.getDate()) : "weekday-full" === e ? g('<div class="weekday-full"/>').text(c.weekdays[s.getDay()].full) : "weekday-short" === e ? g('<div class="weekday-short"/>').text(c.weekdays[s.getDay()].short) : void 0
                }))
            }
        }

        return o(u), function () {
            a.empty();
            for (var e = 0; e < c.weekdays.length; e++) {
                var t = (e + c.firstWeekDay) % c.weekdays.length;
                a.append(g('<div class="weekday"/>').text(c.weekdays[t].short))
            }
        }(), r(u), t.on("click", ".calendar-date:not(.disabled)", function () {
            var e = g(this).addClass("selected");
            t.find(".calendar-date").not(e).removeClass("selected"), t.trigger("select-a-date", [e.data("date")]), i.val(s(e.data("date")))
        }), n.on("click", ".prev-month:not(.disabled), .next-month:not(.disabled)", function () {
            var e = g(this);
            u = e.hasClass("prev-month") ? new Date(u.getFullYear(), u.getMonth() - 1) : new Date(u.getFullYear(), u.getMonth() + 1), o(u), r(u)
        }), i.on("change", function () {
            var e = new Date(this.value);
            c.selectedDay = new Date(e.getFullYear(), e.getMonth(), e.getDate()), u = new Date(c.selectedDay.getFullYear(), c.selectedDay.getMonth()), o(u), r(u), t.trigger("select-a-date", [c.selectedDay])
        }), t.trigger("init"), this
    }, g(".calendar").calendar({
        minDate: t,
        maxDate: new Date(t.getFullYear(), t.getMonth(), t.getDate() + 90),
        selectedDay: new Date,
        dayItemContents: ["month-short", "day"]
    }).on("select-a-date", function (e, t) {
        console.log(t)
    })
}(jQuery), function (r) {
    "use strict";

    function e(e) {
        var t = WPHJS.getContainerInnerWidth(), a = r(window).outerWidth(),
            n = "ready" === e.type && "flickity" === e.namespace, i = a < 576 ? 0 : (a - t) / 2;
        if (r(this).find(".card-slider-item:first").css("padding-left", i), r(this).find(".card-slider-item:last").css("padding-right", i), r(this).css({
            marginLeft: -1 * i,
            marginRight: -1 * i
        }), r(this).data("flickity")) r(this).flickity("resize"); else if (n) {
            var o = this;
            setTimeout(function () {
                r(o).flickity("resize")
            }, 0)
        }
    }

    var t = r(".card-slider");
    t.filter(".card-slider-viewport").on("ready.flickity", e), r(window).on("resize", function () {
        t.filter(".card-slider-viewport").each(e)
    }), r('[data-target][data-action][data-toggle="card-slider"]').each(function () {
        var i = r(this), t = r(i.data("target")), o = i.data("action");
        "prevSlide" === o ? i.on("click", function (e) {
            e.preventDefault(), t.flickity("previous")
        }) : "nextSlide" === o && i.on("click", function (e) {
            e.preventDefault(), t.flickity("next")
        }), t.on("ready.flickity change.flickity", function () {
            var n = this;
            setTimeout(function () {
                var e = r(n).data("flickity"), t = e.slides.length ? e.slides.length - 1 : 0,
                    a = "prevSlide" === o ? 0 : t;
                i.toggleClass("disabled", !e.options.wrapAround && e.selectedIndex === a), i.prop("disabled", !e.options.wrapAround && e.selectedIndex === a)
            }, 0)
        })
    }), r('[data-target][data-control="card-slider-dots"]').each(function () {
        var o = r(this);
        r(o.data("target")).on("ready.flickity change.flickity", function () {
            var i = this;
            setTimeout(function () {
                var t = r(i).data("flickity");
                o.html('<ul class="card-slider-dots"></ul>');
                for (var e = o.find(".card-slider-dots"), a = 0; a < t.slides.length; a++) {
                    var n = r('<li class="card-slider-dot"/>');
                    n.append(r('<a href="#"/>').data("index", a).text(a + 1)), a === t.selectedIndex && n.addClass("card-slider-dot-active"), e.append(n)
                }
                o.find("a").on("click", function (e) {
                    e.preventDefault(), t.select(r(this).data("index"))
                })
            }, 0)
        })
    }), t.each(function () {
        r(this).flickity(r.extend({
            imagesLoaded: !0,
            watchCSS: !0,
            groupCells: !0,
            percentPosition: !1,
            cellAlign: "left",
            sellSelector: ".card-slider-item",
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0
        }, r(this).data("options")))
    })
}(jQuery), function (i) {
    "use strict";
    var o = i(".custom-checkbox, .custom-radio");
    o.each(function () {
        var t = i(this), e = "custom-" + t.attr("type"), a = i("<div/>", {class: e + "-wrap"}),
            n = i("<div/>", {class: e + "-presenter"});
        t.wrap(a), (a = t.parent()).append(n), t.on("refresh", function (e) {
            e.stopPropagation(), t.prop("checked") ? a.addClass("checked") : a.removeClass("checked")
        }), t.on("change", function () {
            o.trigger("refresh")
        }), n.on("click", function (e) {
            e.stopPropagation(), "radio" === t.attr("type") ? t.prop("checked", !0) : t.prop("checked", !t.prop("checked")), t.trigger("change")
        }), t.trigger("change")
    })
}(jQuery), function (e) {
    "use strict";
    e(".faq").on("hide.bs.collapse", function () {
        e(this).removeClass("faq-open")
    }).on("show.bs.collapse", function () {
        e(this).addClass("faq-open")
    })
}(jQuery), function (n) {
    "use strict";
    n(".form-collapsible-section").each(function () {
        var e = n(this), t = e.find(".form-collapsible-section-head"), a = e.find(".form-collapsible-section-body");
        t.on("click", function () {
            a.collapse("toggle")
        }), a.addClass("collapse"), "true" === e.attr("aria-expanded") && a.addClass("show")
    }).on("hide.bs.collapse", function () {
        n(this).attr("aria-expanded", !1)
    }).on("show.bs.collapse", function () {
        n(this).attr("aria-expanded", !0)
    })
}(jQuery), function (n) {
    "use strict";
    var a = [];
    n(".form-selectable-label[data-input]").each(function () {
        var e = n(this).attr("data-input"), t = document.querySelector(e);
        t && a.push(t)
    }).on("click", function (e) {
        var t = n(this).attr("data-input"), a = n(t);
        a && (a.is('[type="radio"]') ? a.prop("checked", !0) : a.prop("checked", !a.prop("checked")), a.trigger("change"))
    });

    function t() {
        var e = n(this), t = e.closest(".form-selectable-label");
        e.prop("checked") ? t.addClass("selected") : t.removeClass("selected")
    }

    n(a).each(t).on("change", function () {
        n(a).trigger("refresh")
    }).on("refresh", function (e) {
        e.stopPropagation(), t.apply(this)
    })
}(jQuery), function (e) {
    "use strict";
    var t = e(".header"), a = t.next(".header-spacing-helper");
    a.length || (a = e('<div class="header-spacing-helper"/>').insertAfter(t)), a.css("height", t.outerHeight());

    function n() {
        150 < window.scrollY ? i.addClass("page-scrolled") : i.removeClass("page-scrolled")
    }

    var i = e("body");
    e(window).on("scroll", n), e(n)
}(jQuery), function (t) {
    "use strict";

    function a(e) {
        return t(e).hasClass("hero-fullscreen") ? function () {
            e.each(function () {
                t(this).css("min-height", function (e) {
                    return Math.max(t(window).outerHeight() - t(e).position().top, WPHJS.childrenTotalHeight(t(e).find(".hero-foreground")))
                }(this) + "px")
            })
        } : function () {
        }
    }

    t(".hero").each(function () {
        var e = t(this);
        e.imagesLoaded(function () {
            e.hasClass("jarallax") ? jarallax(e.get(0), {
                videoSrc: e.attr("data-video"),
                automaticResize: !0,
                onInit: function () {
                    t(a(e)), t(window).on("resize orientationchange", a(e)), e.addClass("hero-bg-ready")
                }
            }) : (t(a(e)), t(window).on("resize orientationchange", a(e)), e.addClass("hero-bg-ready"))
        })
    })
}(jQuery), function (o) {
    "use strict";
    var e = o(".image-slider");
    e.find(".image-slider-prev, .image-slider-next").on("click", function (e) {
        var t = o(this), a = t.closest(".image-slider").find(".image-slider-contents");
        "function" == typeof a.flickity && (e.preventDefault(), t.hasClass("image-slider-prev") && a.flickity("previous"), t.hasClass("image-slider-next") && a.flickity("next"))
    }), e.find(".image-slider-contents").on("ready.flickity change.flickity", function () {
        var a = this, e = o(a).closest(".image-slider"), n = e.find(".image-slider-prev"),
            i = e.find(".image-slider-next");
        setTimeout(function () {
            var e = o(a).data("flickity"), t = e.slides.length ? e.slides.length - 1 : 0;
            n.toggleClass("disabled", 0 === e.selectedIndex).prop("disabled", 0 === e.selectedIndex), i.toggleClass("disabled", e.selectedIndex === t).prop("disabled", e.selectedIndex === t)
        }, 0)
    }), e.find(".image-slider-contents").flickity({
        draggable: !0,
        imagesLoaded: !0,
        watchCSS: !1,
        groupCells: !1,
        percentPosition: !1,
        adaptiveHeight: !0,
        sellSelector: ".image-slider-item",
        prevNextButtons: !1,
        pageDots: !1
    })
}(jQuery), jQuery(window).one("wph.google_maps_loaded", function () {
    "use strict";
    if ("undefined" != typeof google && void 0 !== google.maps) {
        var l = jQuery, e = l(".gmap"), i = {
            zoom: 14,
            disableDefaultUI: !0,
            openFirstInfobox: !0,
            draggable: !0,
            styles: [{
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{color: "#d3d3d3"}]
            }, {
                featureType: "transit",
                stylers: [{color: "#808080"}, {visibility: "off"}]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{visibility: "on"}, {color: "#b3b3b3"}]
            }, {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{color: "#ffffff"}]
            }, {
                featureType: "road.local",
                elementType: "geometry.fill",
                stylers: [{visibility: "on"}, {color: "#ffffff"}, {weight: 1.8}]
            }, {
                featureType: "road.local",
                elementType: "geometry.stroke",
                stylers: [{color: "#d7d7d7"}]
            }, {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [{visibility: "on"}, {color: "#ebebeb"}]
            }, {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{color: "#a7a7a7"}]
            }, {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{color: "#ffffff"}]
            }, {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{color: "#ffffff"}]
            }, {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{visibility: "on"}, {color: "#efefef"}]
            }, {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{color: "#696969"}]
            }, {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{visibility: "on"}, {color: "#737373"}]
            }, {featureType: "poi", elementType: "labels.icon", stylers: [{visibility: "off"}]}, {
                featureType: "poi",
                elementType: "labels",
                stylers: [{visibility: "off"}]
            }, {
                featureType: "road.arterial",
                elementType: "geometry.stroke",
                stylers: [{color: "#d6d6d6"}]
            }, {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{visibility: "off"}]
            }, {}, {featureType: "poi", elementType: "geometry.fill", stylers: [{color: "#dadada"}]}],
            mapTypeId: "roadmap"
        };
        e.each(function () {
            var e = l(this).find(".gmap-embed-inner"), t = l(this).find(".gmap-infobox"), a = e.data("options"),
                n = parseInt(l(this).find(".gmap-embed").data("parallax-speed")), r = l.extend(i, a),
                s = new google.maps.Map(e.get(0), r);
            l(t.get().reverse()).each(function () {
                var e = l(this), t = e.data("latlng").split(" "), a = {lat: parseFloat(t[0]), lng: parseFloat(t[1])};
                void 0 === r.center && s.setCenter(a);
                var n = !1, i = new GoogleMaps_InfoBox_Factory({
                    content: e.html(),
                    maxWidth: 350,
                    boxClass: "gmap-infobox",
                    pixelOffset: new google.maps.Size(57, e.find(".gmap-infobox-header").outerHeight() / 2 * -1),
                    closeBoxURL: "",
                    zIndex: 1,
                    infoBoxClearance: new google.maps.Size(32, 32),
                    enableEventPropagation: !1
                }), o = new google.maps.Marker({
                    position: a,
                    map: s,
                    icon: {
                        url: "assets/images/map-marker.png",
                        anchor: new google.maps.Point(31, 31),
                        scaledSize: new google.maps.Size(62, 62)
                    }
                });
                o.addListener("click", function () {
                    n ? i.close() : i.open(s, o), n = !n
                })
            }), 0 !== n && (e.css({top: -1 * n / 2, bottom: -1 * n / 2}), e.jarallax({
                type: "element",
                speed: n.toString() + " 0"
            }))
        })
    }
}), function (e) {
    "use strict";
    if (e(".gmap").length) if ("undefined" == typeof google || void 0 === google.maps) {
        var t = "https://maps.google.com/maps/api/js?key=" + WPHJS.GOOGLE_MAPS_API_KEY;
        e.getScript(t, function () {
            e(window).trigger("wph.google_maps_loaded")
        })
    } else e(window).trigger("wph.google_maps_loaded")
}(jQuery), function () {
    "use strict";
    jQuery('[data-toggle="popover"]').popover()
}(), function (i) {
    "use strict";
    i(".radio-buttons-group-disabled .btn").addClass("disabled"), i(".radio-buttons-group:not(.radio-buttons-group-disabled)").each(function () {
        var a = i(this), n = a.find(".btn");
        n.on("click", function (e) {
            e.preventDefault();
            var t = i(this);
            n.removeClass("selected"), t.addClass("selected"), a.trigger("change", t.data("value"))
        })
    })
}(jQuery), function (n) {
    "use strict";
    n(".shuffle-grid").each(function () {
        n(this).data("shufflejs-instance", new Shuffle(this, {itemSelector: ".shuffle-grid-item", delimiter: ","}))
    }).on("set-filter.shufflejs", function (e, t) {
        n(this).closest(".shuffle-grid").data("shufflejs-instance").filter(-1 !== ["all", "*"].indexOf(t) ? Shuffle.ALL_ITEMS : t)
    }), n('.radio-buttons-group[data-toggle="shuffle-grid"][data-target]').on("change", function (e, t) {
        var a = n(this);
        n(a.data("target")).trigger("set-filter.shufflejs", t)
    })
}(jQuery), function (i) {
    "use strict";
    var o = i(".header"), r = 0;
    i('[data-toggle="smooth-scroll"]').on("click", function (e) {
        e.preventDefault();
        var t = i(this).data("target") || i(this).attr("href"), a = document.querySelector(t);
        if ("fixed" === o.css("position") && (r = o.outerHeight()), a) {
            var n = Math.max(0, i(a).offset().top - r);
            "scrollBehavior" in document.documentElement.style ? window.scrollTo({
                top: n,
                behavior: "smooth"
            }) : i("html, body").animate({scrollTop: n}, 1e3)
        }
    })
}(jQuery), function () {
    "use strict";
    jQuery(".sticky-sidebar").stickySidebar({topSpacing: 30, bottomSpacing: 30})
}();
