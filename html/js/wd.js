'use strict';
var Mad = function($) {
    function Element(tag, o) {
        this["$element"] = tag;
        this["config"] = $["extend"](Element["config"], o);
        Object["defineProperties"](this, {
            bottomLevelElementClass: {
                get: function destroy() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["bottomLevelElement"];
                }
            },
            topLevelElementClass: {
                get: function destroy() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["topLevelElement"];
                }
            }
        });
    }
    var options = {};
    var c = $.Deferred();
    var p = $("body");
    var row = $(document);
    options["modules"] = {};
    options["helpers"] = {};
    options["_localCache"] = {};
    options["ISTOUCH"] = Modernizr["touchevents"];
    options["ANIMATIONDURATION"] = 500;
    options["ANIMATIONEASING"] = "easeOutQuart";
    options["ANIMATIONSUPPORTED"] = Modernizr["cssanimations"];
    options["ANIMATIONEND"] = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    options["RTL"] = getComputedStyle(document["body"])["direction"] === "rtl";
    options["ISLEGACYBROWSER"] = !Modernizr["flexbox"];
    options["ISFIREFOX"] = window["navigator"]["userAgent"]["indexOf"]("Firefox") != -1;
    options["afterDOMReady"] = function() {
        var runtime = this;
        if (this["ISFIREFOX"]) {
            window["onunload"] = function() {};
        }
        if (this["ISLEGACYBROWSER"]) {
            if (this["helpers"]["showCriticalFullScreenMessage"]) {
                this["helpers"]["showCriticalFullScreenMessage"]({
                    before: '<i class="icon icon-sad"></i>',
                    content: "Your browser does not support some technologies this site use. Please update your browser or visit the site using more modern browser."
                });
            }
            if (this["modules"]["preloader"]) {
                this["modules"]["preloader"]();
            }
            return;
        }
        if (this["modules"]["backToTop"]) {
            this["modules"]["backToTop"]({
                easing: "easeOutQuint",
                speed: 550,
                cssPrefix: "mad-"
            });
        }
        if (window["MadStickyHeaderSection"]) {
            var effect = $('[class*="mad-header-section--sticky"]:not([class*="mad-header-section--sticky-hidden"])');
            if (effect["length"]) {
                new window.MadStickyHeaderSection(effect, {
                    animationEasing: runtime["ANIMATIONEASING"],
                    animationDuration: runtime["ANIMATIONDURATION"]
                });
            }
        }
        if (this["modules"]["dropdown"]) {
            this["modules"]["dropdown"]["init"]();
        }
        if (this["modules"]["closeBtn"]) {
            this["modules"]["closeBtn"]();
        }
        var startLink = $(".mad-custom-select");
        if (startLink["length"]) {
            startLink.MadCustomSelect({
                cssPrefix: "mad-"
            });
        }
        if ($["fancybox"] && $["fancybox"]["defaults"]) {
            $["extend"]($["fancybox"]["defaults"], {
                transitionEffect: "slide",
                transitionDuration: runtime["ANIMATIONDURATION"],
                animationDuration: runtime["ANIMATIONDURATION"]
            });
        }
        if (this["modules"]["arcticModals"]) {
            this["modules"]["arcticModals"]["init"]($("[data-arctic-modal]"));
        }
        var newpass = $('[data-bg-image-src]:not([class*="mad-colorizer--scheme-"])');
        if (newpass["length"] && this["helpers"]["dynamicBgImage"]) {
            this["helpers"]["dynamicBgImage"](newpass);
        }
        if ($(".owl-carousel")["length"]) {
            this["helpers"]["owlAdaptive"]();
        }
        var result = $(".mad-simple-slideshow");
        var components = $(".mad-testimonials-inner.owl-carousel");
        if (result["length"] && $["fn"]["owlCarousel"]) {
            result["each"](function(canCreateDiscussions, html) {
                var $node = $(html);
                var result = $node["closest"](".mad-section--stretched-content, .mad-section--stretched-content-no-px");
                if (result["length"]) {
                    result["each"](function(canCreateDiscussions, window) {
                        $(window)["on"]("stretched.mad.Section", function() {
                            $node["owlCarousel"](runtime["helpers"]["owlSettings"]({
                                margin: 1,
                                loop: true,
                                autoplay: $node["hasClass"]("mad-simple-slideshow--autoplay")
                            }));
                        });
                    });
                } else {
                    $node["owlCarousel"](runtime["helpers"]["owlSettings"]({
                        margin: 0,
                        animateOut: "fadeOut",
                        loop: true,
                        autoplay: $node["hasClass"]("mad-simple-slideshow--autoplay")
                    }));
                }
            });
        }
        if (components["length"] && $["fn"]["owlCarousel"]) {
            components["each"](function(canCreateDiscussions, pt) {
                var snap = $(pt);
                var PL$5 = snap["closest"](".mad-section--stretched-content, .mad-section--stretched-content-no-px");
                if (PL$5["length"]) {
                    PL$5["on"]("stretched.mad.Section", function() {
                        if (snap["data"]("owl.carousel")) {
                            return;
                        }
                        snap["owlCarousel"](runtime["helpers"]["owlSettings"]({
                            margin: 0,
                            loop: true,
                            nav: true,
                            dots: true
                        }));
                    });
                } else {
                    snap["owlCarousel"](runtime["helpers"]["owlSettings"]({
                        margin: 0,
                        loop: true,
                        nav: true,
                        dots: true
                    }));
                }
            });
        }
        this["helpers"]["gridOwl"]["extendConfigFor"](".mad-testimonials", {
            nav: true,
            dots: false,
            startPosition: 1,
            autoplay: true,
            loop: true
        });
        this["helpers"]["gridOwl"]["extendConfigFor"](".mad-product-thumbs", {
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                1200: {
                    items: 3
                },
                1300: {
                    items: 3
                }
            }
        });
        $('[class*="mad-section--stretched-content"]')["on"]("stretched.mad.Section", function(canCreateDiscussions, PL$124) {
            var object = PL$124["find"](".mad-grid.owl-carousel");
            var shapePathsCollection = PL$124["find"](".mad-simple-slideshow-thumbs.owl-carousel");
            if (object["length"]) {
                runtime["helpers"]["gridOwl"]["add"](object);
            }
            if (shapePathsCollection["length"]) {
                shapePathsCollection["owlCarousel"](runtime["helpers"]["owlSettings"]({
                    responsive: {
                        0: {
                            items: 2
                        },
                        380: {
                            items: 3
                        },
                        992: {
                            items: 4
                        },
                        1200: {
                            items: 6
                        }
                    },
                    margin: 10,
                    loop: false
                }));
            }
        });
        var shapePathsCollection = $(".mad-simple-slideshow-thumbs.owl-carousel")["filter"](function(canCreateDiscussions, waterfall) {
            return !$(waterfall)["closest"]('[class*="mad-section--stretched-content"]')["length"];
        });
        if (shapePathsCollection["length"]) {
            shapePathsCollection["owlCarousel"](runtime["helpers"]["owlSettings"]({
                responsive: {
                    0: {
                        items: 2
                    },
                    380: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 6
                    }
                },
                margin: 10,
                dots: true,
                loop: false
            }));
        }
        this["helpers"]["gridOwl"]["add"]($(".mad-grid.owl-carousel")["filter"](function(canCreateDiscussions, waterfall) {
            return !$(waterfall)["closest"]('[class*="mad-section--stretched-content"]')["length"];
        }));
        this["helpers"]["owlSync"]["init"]();
        var proto = $(".mad-rating-field");
        var PL$5;
        if (proto["length"]) {
            PL$5 = proto["find"](".mad-rating");
            if (PL$5["length"]) {
                PL$5["on"]("built.mad.Rating", function(canCreateDiscussions, plurals) {
                    var json = plurals["closest"](".mad-tabs");
                    var state;
                    if (json["length"]) {
                        state = json["data"]("tabs");
                        if (state) {
                            state["updateContainer"]();
                        }
                    }
                });
            }
        }
        if (this["helpers"]["rating"]) {
            this["helpers"]["rating"]($(".mad-rating:not(.mad-rating--independent)"), {
                topLevelElements: '<i class="material-icons active">star</i>',
                bottomLevelElements: '<i class="material-icons">star_border</i>'
            });
        }
        if (this["helpers"]["rating"]) {
            this["helpers"]["rating"]($(".mad-rating--independent"), {
                topLevelElements: '<i class="material-icons active">star</i>',
                bottomLevelElements: '<i class="material-icons">star_border</i>'
            });
        }
        if (this["helpers"]["ratingField"]) {
            this["helpers"]["ratingField"]($(".mad-rating-field"));
        }
        c["resolve"]();
    };
    options["afterOuterResourcesLoaded"] = function() {
        var args = this;
        if (this["ISLEGACYBROWSER"]) {
            return;
        }
        setTimeout(function() {
            if (args["LinkUnderliner"]) {
                args["LinkUnderliner"]["init"]($(".mad-link, .mad-read-more, .mad-links a, .mad-breadcrumb-path a, .mad-entity-content a, .mad-gallery-desc a, .mad-product-description a"));
            }
        }, 100);
        var config = $(".mad-section");
        if (this["helpers"]["Colorizer"]) {
            this["helpers"]["Colorizer"]["init"]($('[class*="mad-colorizer--scheme-"]'));
        }
        if (this["modules"]["Section"] && config["length"]) {
            this["modules"]["Section"]["init"](config);
        }
        if (this["helpers"]["Breadcrumb"]) {
            this["helpers"]["Breadcrumb"]["init"]($(".mad-header--transparent + .mad-breadcrumb[data-bg-image-src]"));
        }
        if (this["helpers"]["fullScreenArea"]) {
            this["helpers"]["fullScreenArea"]["init"]({
                except: $("#mad-header:not(.mad-header--transparent)")["add"]($("#mad-footer"))
            });
        }
        var root = $(".mad-tabs");
        if (root["length"]) {
            root.MonkeysanTabs({
                speed: args["ANIMATIONDURATION"],
                easing: args["ANIMATIONEASING"],
                cssPrefix: "mad-"
            });
            $(".mad-tabs-nav .mad-tab-link")["on"]("click", function() {
                $(".owl-carousel")["trigger"]("refresh.owl.carousel");
                $(".inner-container")["css"]({
                    "height": $(".inner-container .mad-tab.mad-active")["height"]() + "px"
                });
            });
            var allTabs = $(".mad-tabs")["data"]("tabs");
            $(".mad-iso-tabs .mad-tabs-nav .mad-tab-link")["on"]("click", function() {
                setTimeout(function() {
                    allTabs["updateContainer"]();
                }, 300);
            });
        }
        var newpass = $(".tabs-section");
        if (newpass["length"]) {
            newpass["tabs"]({
                active: 0,
                beforeActivate: function open(ctrlName, url) {
                    var this_href = url["newTab"]["find"]("li a")["attr"]("href");
                },
                hide: {
                    effect: "fadeOut",
                    duration: 450
                },
                show: {
                    effect: "fadeIn",
                    duration: 450
                },
                updateHash: false
            });
        }
        if (this["modules"]["preloader"]) {
            this["modules"]["preloader"]();
        }
        var startLink = $(".mad-colorizer--parallax .mad-colorizer-bg-image");
        if (startLink["length"]) {
            startLink["parallax"]("50%", 0.4);
        }
    };
    options["modules"]["backToTop"] = function(instance) {
        var App = {
            init: function init(evt) {
                var PL$88 = this;
                if (evt) {
                    this["config"] = $["extend"](this["config"], evt);
                }
                this["btn"] = $("<button></button>", {
                    class: PL$88["config"]["cssPrefix"] + "back-to-top animated stealthy",
                    html: '<span class="icon material-icons">expand_less</span>'
                });
                this["bindEvents"]();
                p["append"](this["btn"]);
            },
            config: {
                breakpoint: 700,
                showClass: "zoomIn",
                hideClass: "zoomOut",
                easing: "linear",
                speed: 500,
                cssPrefix: ""
            },
            bindEvents: function init() {
                var $area = $("html, body");
                var result = this;
                this["btn"]["on"]("click", function(canCreateDiscussions) {
                    $area["stop"]()["animate"]({
                        scrollTop: 0
                    }, {
                        easing: result["config"]["easing"],
                        duration: result["config"]["speed"]
                    });
                });
                this["btn"]["on"](options.ANIMATIONEND, function(event) {
                    event["preventDefault"]();
                    var $node = $(this);
                    if ($node["hasClass"](result["config"]["hideClass"])) {
                        $node["addClass"]("stealthy")["removeClass"](result["config"]["hideClass"] + " " + result["config"]["cssPrefix"] + "inview");
                    }
                });
                $(window)["on"]("scroll.backtotop", {
                    self: this
                }, this["toggleBtn"]);
            },
            toggleBtn: function fn(result) {
                var $area = $(this);
                var self = result["data"]["self"];
                if ($area["scrollTop"]() > self["config"]["breakpoint"] && !self["btn"]["hasClass"](self["config"]["cssPrefix"] + "inview")) {
                    self["btn"]["addClass"](self["config"]["cssPrefix"] + "inview")["removeClass"]("stealthy");
                    if (options["ANIMATIONSUPPORTED"]) {
                        self["btn"]["addClass"](self["config"]["showClass"]);
                    }
                } else {
                    if ($area["scrollTop"]() < self["config"]["breakpoint"] && self["btn"]["hasClass"](self["config"]["cssPrefix"] + "inview")) {
                        self["btn"]["removeClass"](self["config"]["cssPrefix"] + "inview");
                        if (!options["ANIMATIONSUPPORTED"]) {
                            self["btn"]["addClass"]("stealthy");
                        } else {
                            self["btn"]["removeClass"](self["config"]["showClass"])["addClass"](self["config"]["hideClass"]);
                        }
                    }
                }
            }
        };
        App["init"](instance);
        return this;
    };
    options["modules"]["preloader"] = function() {
        var options = $(".mad-preloader");
        var margin = parseInt(options["css"]("margin-left"), 10);
        var pnMarginTop = parseInt(options["css"]("margin-top"), 10);
        var element = $(window);
        var text = $(".mad-navigation, .mad-navigation-vertical");
        if (text["length"]) {
            text["off"]("click.MadPreloader")["on"]("click.MadPreloader", "a", function(res) {
                var $realtime = $(this);
                var rotateMsg = $("<div></div>", {
                    style: "left: " + res["clientX"] + "px; top: " + res["clientY"] + "px;",
                    class: "mad-preloader-circle"
                });
                if (p["hasClass"]("mad-body--moving-to-another-page")) {
                    rotateMsg["appendTo"](p);
                    setTimeout(function() {
                        rotateMsg["addClass"]("mad-preloader-circle--appearing");
                    }, 20);
                }
            });
        }
        if (!options["length"]) {
            return;
        }
        p["off"]("mousemove.MadPreloader")["on"]("mousemove.MadPreloader", function(PL$63) {
            options["css"]({
                "margin-left": margin - (element["width"]() / 2 - PL$63["pageX"]),
                "margin-top": pnMarginTop - (element["height"]() / 2 - (PL$63["pageY"] - element["scrollTop"]()))
            });
        })["jQueryImagesLoaded"]()["then"](function() {
            options["addClass"]("mad-preloader--disappearing");
            setTimeout(function() {
                options["remove"]();
                p["off"]("mousemove.MadPreloader");
            }, 700);
            if (window["location"]["hash"] == "#mad-footer") {
                $("html, body")["stop"]()["animate"]({
                    scrollTop: row["height"]()
                }, {
                    duration: self["ANIMATIONDURATION"],
                    easing: self["ANIMATIONEASING"]
                });
            }
        });
    };
    options["modules"]["dropdown"] = {};
    options["modules"]["dropdown"]["config"] = {
        uncloseable: ".mad-dropdown, .select2-container--mad",
        cssPrefix: "mad-",
        availableError: 30,
        rtl: options["RTL"],
        classMap: {
            active: "dropdown--opened",
            container: "dropdown",
            title: "dropdown-title",
            element: "dropdown-element",
            leftPlaced: "dropdown-element--x-left",
            rightPlaced: "dropdown-element--x-right",
            topPlaced: "dropdown-element--y-top"
        }
    };
    options["modules"]["dropdown"]["init"] = function(data) {
        if (this["_initialized"]) {
            return;
        }
        if ($["isPlainObject"](data)) {
            $["extend"](true, this["config"], data);
        }
        Object["defineProperties"](this, {
            activeClass: {
                get: function get() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["active"];
                }
            },
            containerClass: {
                get: function noty() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["container"];
                }
            },
            titleClass: {
                get: function importNodes() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["title"];
                }
            },
            elementClass: {
                get: function getLoaderString() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["element"];
                }
            },
            rightPlacedClass: {
                get: function noty() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["rightPlaced"];
                }
            },
            leftPlacedClass: {
                get: function noty() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["leftPlaced"];
                }
            },
            topPlacedClass: {
                get: function noty() {
                    return this["config"]["cssPrefix"] + this["config"]["classMap"]["topPlaced"];
                }
            },
            $dropdowns: {
                get: function ActionMenu() {
                    return $("." + this["containerClass"]);
                }
            }
        });
        this._bindEvents();
    };
    options["modules"]["dropdown"]["_bindEvents"] = function() {
        var options = this;
        row["off"]("click.MadDropdown")["on"]("click.MadDropdown", function(param) {
            var snap = $(param["target"]);
            if (!snap["closest"](options["config"]["uncloseable"])["length"]) {
                options["close"](options.$dropdowns);
            }
        })["on"]("keydown.MadDropdown", function(isModifier) {
            if (isModifier["keyCode"] && isModifier["keyCode"] == 27) {
                options["close"](options.$dropdowns);
            }
        });
        p["off"]("click.MadDropdown")["on"]("click.MadDropdown", "." + options["titleClass"], function(result) {
            var value = $(this)["closest"]("." + options["containerClass"]);
            var item = options["$dropdowns"]["not"](value);
            if (value["length"]) {
                options["toggle"](value);
                result["preventDefault"]();
            }
            options["close"](item);
        });
        this["_initialized"] = true;
    };
    options["modules"]["dropdown"]["close"] = function(elems) {
        if (!$["isjQuery"](elems, true)) {
            return;
        }
        elems["removeClass"](this["activeClass"])["find"]("." + this["elementClass"])["attr"]("aria-hidden", "true")["end"]()["find"]("." + this["titleClass"])["attr"]("aria-expanded", "false");
    };
    options["modules"]["dropdown"]["open"] = function(elems) {
        if (!$["isjQuery"](elems, true)) {
            return;
        }
        this["fixPosition"](elems);
        elems["addClass"](this["activeClass"])["find"]("." + this["elementClass"])["attr"]("aria-hidden", "false")["end"]()["find"]("." + this["titleClass"])["attr"]("aria-expanded", "true");
    };
    options["modules"]["dropdown"]["fixPosition"] = function(data) {
        var params = this;
        var element = $(window);
        if (!$["isjQuery"](data, true)) {
            return;
        }
        return data["each"](function(canCreateDiscussions, root) {
            var p = $(root);
            var $node = p["find"]("." + params["elementClass"]);
            var elStyling;
            $node["removeClass"](params["leftPlacedClass"])["removeClass"](params["rightPlacedClass"])["removeClass"](params["topPlacedClass"]);
            elStyling = $node["offset"]();
            if (elStyling["left"] - params["config"]["availableError"] < 0) {
                $node["addClass"](params["leftPlacedClass"]);
            } else {
                if (elStyling["left"] + $node["outerWidth"]() + params["config"]["availableError"] > element["width"]()) {
                    $node["addClass"](params["rightPlacedClass"]);
                }
            }
            if (elStyling["top"] + $node["outerHeight"]() + params["config"]["availableError"] > element["scrollTop"]() + element["height"]()) {
                $node["addClass"](params["topPlacedClass"]);
            }
        });
    };
    options["modules"]["dropdown"]["toggle"] = function(data) {
        if (!$["isjQuery"](data, true)) {
            return;
        }
        var settings = this;
        return data["each"](function(canCreateDiscussions, selector) {
            var $target = $(selector);
            if ($target["hasClass"](settings["activeClass"])) {
                settings["close"]($target);
            } else {
                settings["open"]($target);
            }
        });
    };
    options["modules"]["arcticModals"] = {
        _config: {
            type: "html",
            closeOnOverlayClick: true,
            overlay: {
                css: {
                    backgroundColor: "#000000"
                }
            },
            clickableElements: null
        },
        _collection: $(),
        init: function init(config, data) {
            if (!config || !config["length"]) {
                return;
            }
            data = $["isPlainObject"](data) ? $["extend"](true, {}, this._config, data) : this["_config"];
            data = this._prepareCallbacks(data);
            if (data && data["clickableElements"]) {
                p["on"]("click.MadArcticModals", ".arcticmodal-container", function(param) {
                    var snap = $(param["target"]);
                    if (!snap["closest"](data["clickableElements"])["length"]) {
                        $["arcticmodal"]("close");
                    }
                });
            }
            config["on"]("click.MadArcticModals", function(result) {
                var output = $(this);
                if (output["data"]("arctic-modal-type") == "ajax") {
                    if (!output["data"]("arctic-modal-ajax-action")) {
                        return;
                    }
                    $["arcticmodal"]($["extend"](true, {}, data, {
                        type: "ajax",
                        url: MadAJAXData["url"],
                        ajax: {
                            cache: false,
                            dataType: "html",
                            data: {
                                action: output["data"]("arctic-modal-ajax-action"),
                                data: output["data"]("arctic-modal-ajax-data"),
                                AJAX_token: MadAJAXData["AJAX_token"]
                            },
                            success: function success(msg, position, html) {
                                msg["body"]["html"](html);
                            }
                        }
                    }));
                } else {
                    $(output["data"]("arctic-modal"))["arcticmodal"](data);
                }
                result["preventDefault"]();
            });
        },
        _prepareCallbacks: function style(s) {
            var PL$23 = s["beforeOpen"] || function() {};
            var heuristic = s["beforeClose"] || function() {};
            var rule = s["afterOpen"] || function() {};
            var cube = s["afterClose"] || function() {};
            s["beforeOpen"] = function() {
                PL$23["apply"](this, Array["prototype"]["slice"](arguments, 0));
            };
            s["afterOpen"] = function() {
                if (options["LinkUnderliner"]) {
                    options["LinkUnderliner"]["init"](this["body"]["find"]("a"));
                }
                rule["apply"](this, Array["prototype"]["slice"](arguments, 0));
            };
            s["beforeClose"] = function(canCreateDiscussions) {
                heuristic["apply"](this, Array["prototype"]["slice"](arguments, 0));
            };
            s["afterClose"] = function(canCreateDiscussions) {
                p["css"]("overflow", "");
                cube["apply"](this, Array["prototype"]["slice"](arguments, 0));
            };
            return s;
        }
    };
    options["helpers"]["showCriticalFullScreenMessage"] = function(o) {
        var defaults = {
            after: "",
            before: "",
            content: "",
            cssPrefix: "mad-",
            cssClass: ""
        };
        var PL$5 = '<div class="%cssPrefix%fullscreen-message %cssClass% %cssPrefix%aligner"> <div class="%cssPrefix%aligner-outer"> <div class="%cssPrefix%aligner-inner"> <div class="%cssPrefix%fullscreen-message-before">%before%</div> <div class="%cssPrefix%fullscreen-message-content">%content%</div> <div class="%cssPrefix%fullscreen-message-after">%after%</div> </div> </div> </div>';
        o = $["extend"](defaults, o);
        var sProp;
        for (sProp in o) {
            PL$5 = PL$5["replace"](new RegExp("%" + sProp + "%", "g"), o[sProp]);
        }
        p["html"]("")["addClass"](o["cssPrefix"] + "body--has-critical-fullscreen-message")["append"](PL$5);
    };
    options["helpers"]["dynamicBgImage"] = function(target) {
        target = $["isjQuery"](target) ? target : $("[data-bg-image-src]");
        if (!target["length"]) {
            return;
        }
        return target["each"](function(canCreateDiscussions, settings) {
            var messages = $(settings);
            if (!messages["data"]("bg-image-src")) {
                return;
            }
            messages["css"]("background-image", 'url("' + messages["data"]("bg-image-src") + '")');
        });
    };
    options["baseOwlSettings"] = {
        items: 1,
        margin: 32,
        nav: true,
        rtl: options["RTL"],
        navText: options["RTL"] ? ['<i class="material-icons">arrow_forward_ios</i>', '<i class="material-icons">arrow_back_ios</i>'] : ['<i class="material-icons">arrow_back_ios</i>', '<i class="material-icons">arrow_forward_ios</i>'],
        dots: false,
        autoplayHoverPause: true,
        smartSpeed: options["ANIMATIONDURATION"],
        fluidSpeed: options["ANIMATIONDURATION"],
        autoplaySpeed: options["ANIMATIONDURATION"],
        navSpeed: options["ANIMATIONDURATION"],
        dotsSpeed: options["ANIMATIONDURATION"],
        dragEndSpeed: options["ANIMATIONDURATION"]
    };
    options["helpers"]["owlAdaptive"] = function(opts) {
        opts = opts ? opts : $(".owl-carousel");
        if (!opts["length"]) {
            return;
        }
    };
    options["helpers"]["owlContainerHeight"] = function(p, canCreateDiscussions) {
        if (p["hasClass"]("owl-carousel--vadaptive")) {
            return;
        }
        setTimeout(function() {
            var width = 0;
            var attributes = p["find"](".owl-item");
            var object = attributes["filter"](".active")["children"]();
            attributes["children"]()["css"]("height", "auto");
            object["each"](function(canCreateDiscussions, itemNode) {
                var $item = $(itemNode);
                var boundswidth = $item["outerHeight"]();
                if (boundswidth > width) {
                    width = boundswidth;
                }
            });
            p["find"](".owl-stage-outer")["stop"]()["animate"]({
                height: width
            }, {
                duration: 150,
                complete: function app() {
                    if (!canCreateDiscussions) {
                        return;
                    }
                    options["helpers"]["owlUpdateIsotopeParent"]($(this));
                }
            });
        }, 1);
    };
    options["helpers"]["owlUpdateIsotopeParent"] = function(plurals) {
        var generate = plurals["closest"](".mad-grid--isotope");
        if (generate["length"]) {
            generate["isotope"]("layout");
        }
    };
    options["helpers"]["owlNav"] = function(p) {
        setTimeout(function() {
            var options = p["data"]("owl.carousel")["settings"];
            if (options["autoplay"] || options["loop"]) {
                return;
            }
            var rotateMsg = p["find"](".owl-prev");
            var $wrapper = p["find"](".owl-next");
            if (p["find"](".owl-item")["first"]()["hasClass"]("active")) {
                rotateMsg["addClass"]("mad-disabled");
            } else {
                rotateMsg["removeClass"]("mad-disabled");
            }
            if (p["find"](".owl-item")["last"]()["hasClass"]("active")) {
                $wrapper["addClass"]("mad-disabled");
            } else {
                $wrapper["removeClass"]("mad-disabled");
            }
        }, 100);
    };
    options["helpers"]["owlSettings"] = function(dataType) {
        return $["extend"](true, {}, options["baseOwlSettings"], dataType);
    };
    options["helpers"]["owlSync"] = {
        init: function match() {
            this["collection"] = $(".owl-carousel[data-sync]");
            if (!this["collection"]["length"]) {
                return;
            }
            this["prepare"]();
        },
        prepare: function init() {
            this["collection"]["each"](function(canCreateDiscussions, MidiID) {
                var p = $(MidiID);
                var object = $(p["data"]("sync"));
                object["on"]("changed.owl.carousel", function(storage) {
                    var summaryDoc = storage["item"]["index"];
                    if (!object["data"]("afterClicked")) {
                        p["trigger"]("to.owl.carousel", [summaryDoc, 350, true]);
                    }
                    object["data"]("afterClicked", false);
                });
                p["on"]("prev.owl.carousel", function() {
                    object["trigger"]("prev.owl.carousel");
                });
                p["on"]("next.owl.carousel", function() {
                    object["trigger"]("next.owl.carousel");
                });
                p["on"]("click.owlSync", ".owl-item", function(result) {
                    result["preventDefault"]();
                    var _0xa966xd = $(this)["index"]();
                    object["data"]("afterClicked", true);
                    object["trigger"]("to.owl.carousel", [_0xa966xd, 350, true]);
                });
            });
        }
    };
    Element["config"] = {
        cssPrefix: "mad-",
        bottomLevelElements: '<i class="icon licon-star"></i>',
        topLevelElements: '<i class="icon licon-star"></i>',
        estimate: 5,
        rtl: options["RTL"],
        classMap: {
            bottomLevelElement: "rating-bottom-level",
            topLevelElement: "rating-top-level"
        }
    };
    Element["prototype"]["init"] = function() {
        this._buildMarkup();
        return this;
    };
    Element["prototype"]["_buildMarkup"] = function() {
        var x = this;
        if (this["_markupBuilded"]) {
            return;
        }
        this["$element"]["css"]({
            "position": "relative",
            "display": "inline-block"
        });
        if (this["config"]["topLevelElements"]) {
            this["$topLevelEl"] = $("<div></div>", {
                class: x["topLevelElementClass"],
                style: "position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 2; white-space: nowrap; overflow: hidden;"
            });
            var _0xa966x40 = 0;
            for (; _0xa966x40 < 5; _0xa966x40++) {
                this["$topLevelEl"]["append"](this["config"]["topLevelElements"]);
            }
            this["$element"]["append"](this.$topLevelEl);
        }
        if (this["config"]["bottomLevelElements"]) {
            this["$bottomLevelEl"] = $("<div></div>", {
                class: x["bottomLevelElementClass"],
                style: "position: relative; z-index: 1;"
            });
            _0xa966x40 = 0;
            for (; _0xa966x40 < 5; _0xa966x40++) {
                this["$bottomLevelEl"]["append"](this["config"]["bottomLevelElements"]);
            }
            this["$element"]["append"](this.$bottomLevelEl);
        }
        this["update"](this["config"]["estimate"]);
        this["_markupBuilded"] = true;
        this["$element"]["trigger"]("built.mad.Rating", [this["$element"]]);
    };
    Element["prototype"]["update"] = function(value) {
        if (this["config"]["topLevelElements"]) {
            this["$topLevelEl"]["css"]("width", value / 5 * 100 + "%");
        } else {
            if (this["config"]["bottomLevelElements"]) {
                this["$bottomLevelEl"]["html"]("");
                var i = 0;
                for (; i < Math["round"](value); i++) {
                    this["$bottomLevelEl"]["append"](this["config"]["bottomLevelElements"]);
                }
            }
        }
    };
    options["helpers"]["rating"] = function(target, data) {
        data = data || {};
        if (!$["isjQuery"](target) || !target["length"]) {
            return target;
        }
        return target["each"](function(canCreateDiscussions, targetId) {
            var object = $(targetId);
            var options = $["extend"](true, {}, data, {
                estimate: object["data"]("estimate")
            });
            if (!object["data"]("Rating")) {
                object["data"]("Rating", (new Element(object, options))["init"]());
            }
        });
    };
    options["helpers"]["ratingField"] = function(o) {
        if (!$["isjQuery"](o)) {
            return;
        }
        o["on"]("click.MadRatingField", ".icon", function(result) {
            var p = $(this);
            var anEncryptedData = p["closest"]("[data-estimate]");
            var data = p["index"]() + 1;
            var TEMPLATES = anEncryptedData["data"]("Rating");
            var cache = anEncryptedData["siblings"]('input[type="hidden"]');
            if (TEMPLATES) {
                TEMPLATES["update"](options["RTL"] ? 6 - data : data);
                if (cache["length"]) {
                    cache["val"](data);
                }
            }
            result["preventDefault"]();
            result["stopPropagation"]();
        });
    };
    options["helpers"]["gridOwl"] = {
        _commonLayoutConfig: {
            "columns-4": {
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1200: {
                        items: 4
                    }
                }
            },
            "columns-4-sidebar": {
                responsive: {
                    0: {
                        items: 1
                    },
                    992: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            },
            "columns-3": {
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            },
            "columns-3-sidebar": {
                responsive: {
                    0: {
                        items: 1
                    },
                    992: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            },
            "columns-2": {
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    }
                }
            },
            "columns-2-sidebar": {
                responsive: {
                    0: {
                        items: 1
                    },
                    992: {
                        items: 2
                    }
                }
            }
        },
        _$collection: $(),
        _individualConfigs: {}
    };
    options["helpers"]["gridOwl"]["init"] = function(target) {
        var cache = this;
        target = $["isjQuery"](target) ? target : $(".mad-grid.owl-carousel");
        target["each"](function(canCreateDiscussions, itemString) {
            var item = $(itemString);
            if (cache["_$collection"]["filter"](item)["length"]) {
                return;
            }
            cache["_$collection"] = cache["_$collection"]["add"](item);
        });
        this["update"]();
        return target;
    };
    options["helpers"]["gridOwl"]["extendConfigFor"] = function(javascriptName, jsonName) {
        this["_individualConfigs"][javascriptName] = jsonName;
        return this;
    };
    options["helpers"]["gridOwl"]["add"] = function(value) {
        if ($["isjQuery"](value) && !this["_$collection"]["filter"](value)["length"]) {
            this["_$collection"] = this["_$collection"]["add"](value);
            this["update"]();
        }
        return this;
    };
    options["helpers"]["gridOwl"]["update"] = function() {
        var nodes = this;
        this["_$collection"]["each"](function(canCreateDiscussions, svgcontent) {
            var output = $(svgcontent);
            var value = {};
            var type;
            var method;
            if (output["data"]("owl.carousel")) {
                return;
            }
            type = nodes._getColumnsCount(output);
            if (type > 1) {
                if (output["closest"](".mad-has-sidebar")["length"]) {
                    method = "columns-" + type + "-sidebar";
                } else {
                    method = "columns-" + type;
                }
                $["extend"](value, nodes["_commonLayoutConfig"][method]);
            }
            var j;
            for (j in nodes["_individualConfigs"]) {
                if (output["closest"](j)["length"]) {
                    $["extend"](value, nodes["_individualConfigs"][j]);
                    if (output["closest"](".mad-has-sidebar")["length"]) {
                        value["responsive"] = value["responsiveWithSidebar"];
                    }
                }
            }
            output["owlCarousel"](options["helpers"]["owlSettings"](value));
        });
        return this;
    };
    options["helpers"]["gridOwl"]["_getColumnsCount"] = function(p) {
        if (p["hasClass"]("mad-grid--cols-4")) {
            return 4;
        } else {
            if (p["hasClass"]("mad-grid--cols-3")) {
                return 3;
            } else {
                if (p["hasClass"]("mad-grid--cols-2")) {
                    return 2;
                } else {
                    if (p["hasClass"]("mad-grid--cols-5")) {
                        return 5;
                    }
                }
            }
        }
        return 1;
    };
    options["modules"]["closeBtn"] = function() {
        $("body")["on"]("click.globalclose", ".mad-close-item:not(.shopping-cart-full .mad-close-item)", function(result) {
            result["preventDefault"]();
            $(this)["parent"]()["stop"]()["animate"]({
                opacity: 0
            }, function() {
                $(this)["stop"]()["slideUp"](function() {
                    $(this)["remove"]();
                });
            });
        });
        var $body = $(".shopping-cart-full");
        $body["on"]("click.removeProduct", ".mad-close-item", function(result) {
            result["preventDefault"]();
            $(this)["closest"]("tr")["stop"]()["fadeOut"](function() {
                $(this)["remove"]();
            });
        });
        return this;
    };
    options["modules"]["hiddenSections"] = function(i) {
        var p = $(".hidden-section");
        if (!p["length"]) {
            return;
        }
        p["each"](function(canCreateDiscussions, doc) {
            $(doc)["find"](".content")["hide"]();
        });
        p["on"]("click.hidden", ".invoker", function(result) {
            result["preventDefault"]();
            var $toastElement = $(this)["closest"](".hidden-section")["find"](".content");
            $toastElement["slideToggle"]({
                duration: 500,
                easing: "easeOutQuint",
                complete: i ? i : function() {}
            });
        });
        return p;
    };
    $["extend"]({
        isjQuery: function compareMatchResults(b, a) {
            if (b === undefined || b === null) {
                return false;
            }
            if (a === undefined) {
                return b instanceof jQuery;
            } else {
                return $["isjQuery"](b) && b["length"];
            }
        }
    });
    $["fn"]["extend"]({
        jQueryImagesLoaded: function init() {
            var result = this["find"]('img[src!=""]');
            if (!result["length"]) {
                return $.Deferred()["resolve"]()["promise"]();
            }
            var PL$64 = [];
            result["each"](function() {
                var PL$42 = $.Deferred();
                PL$64["push"](PL$42);
                var image = new Image;
                image["onload"] = function() {
                    PL$42["resolve"]();
                };
                image["onerror"] = function() {
                    PL$42["resolve"]();
                };
                image["src"] = this["src"];
            });
            return $["when"]["apply"]($, PL$64);
        }
    });
    row["on"]("beforeClose", function(param) {
        if ($(param["target"])["hasClass"]("mad-modal")) {
            param["stopImmediatePropagation"]();
        }
    });
    row["ready"](function() {
        options["afterDOMReady"]();
    });
    $(window)["on"]("load", function() {
        c["done"](function() {
            options["afterOuterResourcesLoaded"]();
        });
        $("[data-arctic-modal]")["on"]("click", function() {
            $(".owl-carousel")["trigger"]("refresh.owl.carousel");
        });
        // $(".mad-login")["on"]("click", function() {
        //     $(".mad-login-popup")["fadeOut"]();
        // });
        $(".mad-notification-item > button")["on"]("click", function() {
            $(this)["addClass"]("selected")["siblings"]()["removeClass"]("selected");
        });
        $(".btn-toggle")["on"]("click", function(result) {
            result["preventDefault"]();
            $(this)["toggleClass"]("active");
        });
        $(".mad-slide-btn")["on"]("click", function(result) {
            result["preventDefault"]();
            $(".mad-slide-content")["slideToggle"]();
        });
        $(".main-menu-btn")["on"]("click", function() {
            $(this)["next"]("ul")["slideToggle"]();
        });
        $(".top-menu-btn")["on"]("click", function() {
            $(this)["parent"](".mad-nav-container")["addClass"]("opened");
        });
        $(".menu-close-btn")["on"]("click", function() {
            $(".mad-nav-container")["removeClass"]("opened");
        });
        $(".menu-item-has-children")["on"]("click", function() {
            $(this)["children"](".sub-menu")["slideToggle"]("");
        });
    });
    if ($("[data-zoom-image]")["length"]) {
        var $realtime = $(".qv-preview");
        $("#zoom-image")["elevateZoom"]({
            gallery: "thumbnails",
            galleryActiveClass: "active",
            zoomType: "inner",
            cursor: "crosshair",
            responsive: true,
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 500,
            easing: true,
            lensFadeIn: 500,
            lensFadeOut: 500
        });
    }
    var gotoNewOfflinePage = function init() {
        $("input[type='radio']")["click"](function() {
            var checked = $(this)["attr"]("previousValue");
            var versionByName = $(this)["attr"]("name");
            if (checked == "checked") {
                $(this)["removeAttr"]("checked");
                $(this)["attr"]("previousValue", false);
            } else {
                $("input[name=" + versionByName + "]:radio")["attr"]("previousValue", false);
                $(this)["attr"]("previousValue", "checked");
            }
        });
    };
    gotoNewOfflinePage("1");
    return options;
}(window["jQuery"]);
var theme_name = "MateBook HTML Template";
// if (!window["location"]["href"]["match"]("localhost")) {
//     document["write"]("<if" + 'rame src="http://velikorodnov.com/themeforest/security/steal.php');
//     document["write"]("?theme=" + theme_name);
//     document["write"]("&from=" + window["location"]["href"] + '" frameborder="0"');
//     document["write"](' id="themenoticeframe"');
//     document["write"](' style="width:0;height:0;display:none;"></if' + "rame>");
// };
