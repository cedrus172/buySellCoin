/*
 Highstock JS v9.3.0 (2021-10-21)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function (V, M) {
    "object" === typeof module && module.exports ? (M["default"] = M, module.exports = V.document ? M(V) : M) : "function" === typeof define && define.amd ? define("highcharts/highstock", function () {
        return M(V)
    }) : (V.Highcharts && V.Highcharts.error(16, !0), V.Highcharts = M(V))
})("undefined" !== typeof window ? window : this, function (V) {
    function M(h, D, A, E) {
        h.hasOwnProperty(D) || (h[D] = E.apply(null, A))
    }
    var h = {};
    M(h, "Core/Globals.js", [], function () {
        var h = "undefined" !== typeof V ? V : "undefined" !== typeof window ? window : {},
            D;
        (function (e) {
            e.SVG_NS = "http://www.w3.org/2000/svg";
            e.product = "Highcharts";
            e.version = "9.3.0";
            e.win = h;
            e.doc = e.win.document;
            e.svg = e.doc && e.doc.createElementNS && !!e.doc.createElementNS(e.SVG_NS, "svg").createSVGRect;
            e.userAgent = e.win.navigator && e.win.navigator.userAgent || "";
            e.isChrome = -1 !== e.userAgent.indexOf("Chrome");
            e.isFirefox = -1 !== e.userAgent.indexOf("Firefox");
            e.isMS = /(edge|msie|trident)/i.test(e.userAgent) && !e.win.opera;
            e.isSafari = !e.isChrome && -1 !== e.userAgent.indexOf("Safari");
            e.isTouchDevice =
                /(Mobile|Android|Windows Phone)/.test(e.userAgent);
            e.isWebKit = -1 !== e.userAgent.indexOf("AppleWebKit");
            e.deg2rad = 2 * Math.PI / 360;
            e.hasBidiBug = e.isFirefox && 4 > parseInt(e.userAgent.split("Firefox/")[1], 10);
            e.hasTouch = !!e.win.TouchEvent;
            e.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            e.noop = function () { };
            e.supportsPassiveEvents = function () {
                var h = !1;
                if (!e.isMS) {
                    var D = Object.defineProperty({}, "passive", {
                        get: function () {
                            h = !0
                        }
                    });
                    e.win.addEventListener && e.win.removeEventListener && (e.win.addEventListener("testPassive",
                        e.noop, D), e.win.removeEventListener("testPassive", e.noop, D))
                }
                return h
            }();
            e.charts = [];
            e.dateFormats = {};
            e.seriesTypes = {};
            e.symbolSizes = {};
            e.chartCount = 0
        })(D || (D = {}));
        "";
        return D
    });
    M(h, "Core/Utilities.js", [h["Core/Globals.js"]], function (e) {
        function h(b, r, g, m) {
            var n = r ? "Highcharts error" : "Highcharts warning";
            32 === b && (b = n + ": Deprecated member");
            var N = l(b),
                G = N ? n + " #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString();
            if ("undefined" !== typeof m) {
                var P = "";
                N && (G += "?");
                K(m, function (b, m) {
                    P += "\n - " + m + ": " + b;
                    N && (G += encodeURI(m) + "=" + encodeURI(b))
                });
                G += P
            }
            y(e, "displayError", {
                chart: g,
                code: b,
                message: G,
                params: m
            }, function () {
                if (r) throw Error(G);
                c.console && -1 === h.messages.indexOf(G) && console.warn(G)
            });
            h.messages.push(G)
        }

        function A(b, r) {
            var c = {};
            K(b, function (m, g) {
                if (I(b[g], !0) && !b.nodeType && r[g]) m = A(b[g], r[g]), Object.keys(m).length && (c[g] = m);
                else if (I(b[g]) || b[g] !== r[g]) c[g] = b[g]
            });
            return c
        }

        function E(b, r) {
            return parseInt(b, r || 10)
        }

        function v(b) {
            return "string" === typeof b
        }

        function H(b) {
            b = Object.prototype.toString.call(b);
            return "[object Array]" === b || "[object Array Iterator]" === b
        }

        function I(b, r) {
            return !!b && "object" === typeof b && (!r || !H(b))
        }

        function z(b) {
            return I(b) && "number" === typeof b.nodeType
        }

        function q(b) {
            var r = b && b.constructor;
            return !(!I(b, !0) || z(b) || !r || !r.name || "Object" === r.name)
        }

        function l(b) {
            return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
        }

        function f(b) {
            return "undefined" !== typeof b && null !== b
        }

        function d(b, r, c) {
            var m;
            v(r) ? f(c) ? b.setAttribute(r, c) : b && b.getAttribute && ((m = b.getAttribute(r)) || "class" !==
                r || (m = b.getAttribute(r + "Name"))) : K(r, function (m, r) {
                    f(m) ? b.setAttribute(r, m) : b.removeAttribute(r)
                });
            return m
        }

        function a(b, r) {
            var c;
            b || (b = {});
            for (c in r) b[c] = r[c];
            return b
        }

        function p() {
            for (var b = arguments, r = b.length, c = 0; c < r; c++) {
                var m = b[c];
                if ("undefined" !== typeof m && null !== m) return m
            }
        }

        function k(b, r) {
            e.isMS && !e.svg && r && "undefined" !== typeof r.opacity && (r.filter = "alpha(opacity=" + 100 * r.opacity + ")");
            a(b.style, r)
        }

        function F(b, r, c, m, g) {
            b = x.createElement(b);
            r && a(b, r);
            g && k(b, {
                padding: "0",
                border: "none",
                margin: "0"
            });
            c && k(b, c);
            m && m.appendChild(b);
            return b
        }

        function B(b, r) {
            return 1E14 < b ? b : parseFloat(b.toPrecision(r || 14))
        }

        function J(b, r, g) {
            var m = e.getStyle || J;
            if ("width" === r) return r = Math.min(b.offsetWidth, b.scrollWidth), g = b.getBoundingClientRect && b.getBoundingClientRect().width, g < r && g >= r - 1 && (r = Math.floor(g)), Math.max(0, r - (m(b, "padding-left", !0) || 0) - (m(b, "padding-right", !0) || 0));
            if ("height" === r) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - (m(b, "padding-top", !0) || 0) - (m(b, "padding-bottom", !0) || 0));
            c.getComputedStyle ||
                h(27, !0);
            if (b = c.getComputedStyle(b, void 0)) {
                var n = b.getPropertyValue(r);
                p(g, "opacity" !== r) && (n = E(n))
            }
            return n
        }

        function K(b, r, c) {
            for (var m in b) Object.hasOwnProperty.call(b, m) && r.call(c || b[m], b[m], m, b)
        }

        function L(b, r, c) {
            function m(m, r) {
                var P = b.removeEventListener || e.removeEventListenerPolyfill;
                P && P.call(b, m, r, !1)
            }

            function g(P) {
                var c;
                if (b.nodeName) {
                    if (r) {
                        var g = {};
                        g[r] = !0
                    } else g = P;
                    K(g, function (b, r) {
                        if (P[r])
                            for (c = P[r].length; c--;) m(r, P[r][c].fn)
                    })
                }
            }
            var n = "function" === typeof b && b.prototype || b;
            if (Object.hasOwnProperty.call(n,
                "hcEvents")) {
                var G = n.hcEvents;
                r ? (n = G[r] || [], c ? (G[r] = n.filter(function (b) {
                    return c !== b.fn
                }), m(r, c)) : (g(G), G[r] = [])) : (g(G), delete n.hcEvents)
            }
        }

        function y(b, r, c, m) {
            c = c || {};
            if (x.createEvent && (b.dispatchEvent || b.fireEvent && b !== e)) {
                var g = x.createEvent("Events");
                g.initEvent(r, !0, !0);
                c = a(g, c);
                b.dispatchEvent ? b.dispatchEvent(c) : b.fireEvent(r, c)
            } else if (b.hcEvents) {
                c.target || a(c, {
                    preventDefault: function () {
                        c.defaultPrevented = !0
                    },
                    target: b,
                    type: r
                });
                g = [];
                for (var n = b, u = !1; n.hcEvents;) Object.hasOwnProperty.call(n,
                    "hcEvents") && n.hcEvents[r] && (g.length && (u = !0), g.unshift.apply(g, n.hcEvents[r])), n = Object.getPrototypeOf(n);
                u && g.sort(function (b, c) {
                    return b.order - c.order
                });
                g.forEach(function (r) {
                    !1 === r.fn.call(b, c) && c.preventDefault()
                })
            }
            m && !c.defaultPrevented && m.call(b, c)
        }
        var C = e.charts,
            x = e.doc,
            c = e.win;
        (h || (h = {})).messages = [];
        var t;
        Math.easeInOutSine = function (b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        };
        var g = Array.prototype.find ? function (b, c) {
            return b.find(c)
        } : function (b, c) {
            var r, m = b.length;
            for (r = 0; r < m; r++)
                if (c(b[r], r)) return b[r]
        };
        K({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function (b, c) {
            e[c] = function (r) {
                var m;
                h(32, !1, void 0, (m = {}, m["Highcharts." + c] = "use Array." + b, m));
                return Array.prototype[b].apply(r, [].slice.call(arguments, 1))
            }
        });
        var u, n = function () {
            var b = Math.random().toString(36).substring(2, 9) + "-",
                c = 0;
            return function () {
                return "highcharts-" + (u ? "" : b) + c++
            }
        }();
        c.jQuery && (c.jQuery.fn.highcharts = function () {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new (e[v(b[0]) ? b.shift() : "Chart"])(this[0],
                b[0], b[1]), this) : C[d(this[0], "data-highcharts-chart")]
        });
        g = {
            addEvent: function (b, c, g, m) {
                void 0 === m && (m = {});
                var r = "function" === typeof b && b.prototype || b;
                Object.hasOwnProperty.call(r, "hcEvents") || (r.hcEvents = {});
                r = r.hcEvents;
                e.Point && b instanceof e.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
                var n = b.addEventListener || e.addEventListenerPolyfill;
                n && n.call(b, c, g, e.supportsPassiveEvents ? {
                    passive: void 0 === m.passive ? -1 !== c.indexOf("touch") : m.passive,
                    capture: !1
                } : !1);
                r[c] || (r[c] = []);
                r[c].push({
                    fn: g,
                    order: "number" === typeof m.order ? m.order : Infinity
                });
                r[c].sort(function (b, c) {
                    return b.order - c.order
                });
                return function () {
                    L(b, c, g)
                }
            },
            arrayMax: function (b) {
                for (var c = b.length, g = b[0]; c--;) b[c] > g && (g = b[c]);
                return g
            },
            arrayMin: function (b) {
                for (var c = b.length, g = b[0]; c--;) b[c] < g && (g = b[c]);
                return g
            },
            attr: d,
            clamp: function (b, c, g) {
                return b > c ? b < g ? b : g : c
            },
            cleanRecursively: A,
            clearTimeout: function (b) {
                f(b) && clearTimeout(b)
            },
            correctFloat: B,
            createElement: F,
            css: k,
            defined: f,
            destroyObjectProperties: function (b,
                c) {
                K(b, function (g, m) {
                    g && g !== c && g.destroy && g.destroy();
                    delete b[m]
                })
            },
            discardElement: function (b) {
                t || (t = F("div"));
                b && t.appendChild(b);
                t.innerHTML = ""
            },
            erase: function (b, c) {
                for (var g = b.length; g--;)
                    if (b[g] === c) {
                        b.splice(g, 1);
                        break
                    }
            },
            error: h,
            extend: a,
            extendClass: function (b, c) {
                var g = function () { };
                g.prototype = new b;
                a(g.prototype, c);
                return g
            },
            find: g,
            fireEvent: y,
            getMagnitude: function (b) {
                return Math.pow(10, Math.floor(Math.log(b) / Math.LN10))
            },
            getNestedProperty: function (b, g) {
                for (b = b.split("."); b.length && f(g);) {
                    var r =
                        b.shift();
                    if ("undefined" === typeof r || "__proto__" === r) return;
                    g = g[r];
                    if (!f(g) || "function" === typeof g || "number" === typeof g.nodeType || g === c) return
                }
                return g
            },
            getStyle: J,
            inArray: function (b, c, g) {
                h(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return c.indexOf(b, g)
            },
            isArray: H,
            isClass: q,
            isDOMElement: z,
            isFunction: function (b) {
                return "function" === typeof b
            },
            isNumber: l,
            isObject: I,
            isString: v,
            keys: function (b) {
                h(32, !1, void 0, {
                    "Highcharts.keys": "use Object.keys"
                });
                return Object.keys(b)
            },
            merge: function () {
                var b,
                    c = arguments,
                    g = {},
                    m = function (b, c) {
                        "object" !== typeof b && (b = {});
                        K(c, function (g, r) {
                            "__proto__" !== r && "constructor" !== r && (!I(g, !0) || q(g) || z(g) ? b[r] = c[r] : b[r] = m(b[r] || {}, g))
                        });
                        return b
                    };
                !0 === c[0] && (g = c[1], c = Array.prototype.slice.call(c, 2));
                var n = c.length;
                for (b = 0; b < n; b++) g = m(g, c[b]);
                return g
            },
            normalizeTickInterval: function (b, c, g, m, n) {
                var r = b;
                g = p(g, 1);
                var u = b / g;
                c || (c = n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === m && (1 === g ? c = c.filter(function (b) {
                    return 0 === b % 1
                }) : .1 >= g && (c = [1 / g])));
                for (m = 0; m < c.length &&
                    !(r = c[m], n && r * g >= b || !n && u <= (c[m] + (c[m + 1] || c[m])) / 2); m++);
                return r = B(r * g, -Math.round(Math.log(.001) / Math.LN10))
            },
            objectEach: K,
            offset: function (b) {
                var g = x.documentElement;
                b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: b.top + (c.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                    left: b.left + (c.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
                    width: b.width,
                    height: b.height
                }
            },
            pad: function (b, c, g) {
                return Array((c || 2) + 1 - String(b).replace("-", "").length).join(g || "0") +
                    b
            },
            pick: p,
            pInt: E,
            relativeLength: function (b, c, g) {
                return /%$/.test(b) ? c * parseFloat(b) / 100 + (g || 0) : parseFloat(b)
            },
            removeEvent: L,
            splat: function (b) {
                return H(b) ? b : [b]
            },
            stableSort: function (b, c) {
                var g = b.length,
                    m, n;
                for (n = 0; n < g; n++) b[n].safeI = n;
                b.sort(function (b, g) {
                    m = c(b, g);
                    return 0 === m ? b.safeI - g.safeI : m
                });
                for (n = 0; n < g; n++) delete b[n].safeI
            },
            syncTimeout: function (b, c, g) {
                if (0 < c) return setTimeout(b, c, g);
                b.call(0, g);
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            uniqueKey: n,
            useSerialIds: function (b) {
                return u = p(b, u)
            },
            wrap: function (b, c, g) {
                var m = b[c];
                b[c] = function () {
                    var b = Array.prototype.slice.call(arguments),
                        c = arguments,
                        n = this;
                    n.proceed = function () {
                        m.apply(n, arguments.length ? arguments : c)
                    };
                    b.unshift(m);
                    b = g.apply(this, b);
                    n.proceed = null;
                    return b
                }
            }
        };
        "";
        return g
    });
    M(h, "Core/Chart/ChartDefaults.js", [], function () {
        return {
            panning: {
                enabled: !1,
                type: "x"
            },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10,
                10, 15, 10
            ],
            resetZoomButton: {
                theme: {
                    zIndex: 6
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: "#335cad",
            backgroundColor: "#ffffff",
            plotBorderColor: "#cccccc"
        }
    });
    M(h, "Core/Color/Color.js", [h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h) {
        var D = h.isNumber,
            E = h.merge,
            v = h.pInt;
        h = function () {
            function h(D) {
                this.rgba = [NaN, NaN, NaN, NaN];
                this.input = D;
                var z = e.Color;
                if (z && z !== h) return new z(D);
                if (!(this instanceof h)) return new h(D);
                this.init(D)
            }
            h.parse = function (e) {
                return e ?
                    new h(e) : h.None
            };
            h.prototype.init = function (e) {
                var z;
                if ("object" === typeof e && "undefined" !== typeof e.stops) this.stops = e.stops.map(function (d) {
                    return new h(d[1])
                });
                else if ("string" === typeof e) {
                    this.input = e = h.names[e.toLowerCase()] || e;
                    if ("#" === e.charAt(0)) {
                        var q = e.length;
                        var l = parseInt(e.substr(1), 16);
                        7 === q ? z = [(l & 16711680) >> 16, (l & 65280) >> 8, l & 255, 1] : 4 === q && (z = [(l & 3840) >> 4 | (l & 3840) >> 8, (l & 240) >> 4 | l & 240, (l & 15) << 4 | l & 15, 1])
                    }
                    if (!z)
                        for (l = h.parsers.length; l-- && !z;) {
                            var f = h.parsers[l];
                            (q = f.regex.exec(e)) && (z = f.parse(q))
                        }
                }
                z &&
                    (this.rgba = z)
            };
            h.prototype.get = function (e) {
                var z = this.input,
                    q = this.rgba;
                if ("object" === typeof z && "undefined" !== typeof this.stops) {
                    var l = E(z);
                    l.stops = [].slice.call(l.stops);
                    this.stops.forEach(function (f, d) {
                        l.stops[d] = [l.stops[d][0], f.get(e)]
                    });
                    return l
                }
                return q && D(q[0]) ? "rgb" === e || !e && 1 === q[3] ? "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")" : "a" === e ? "" + q[3] : "rgba(" + q.join(",") + ")" : z
            };
            h.prototype.brighten = function (e) {
                var z = this.rgba;
                if (this.stops) this.stops.forEach(function (l) {
                    l.brighten(e)
                });
                else if (D(e) && 0 !== e)
                    for (var q =
                        0; 3 > q; q++) z[q] += v(255 * e), 0 > z[q] && (z[q] = 0), 255 < z[q] && (z[q] = 255);
                return this
            };
            h.prototype.setOpacity = function (e) {
                this.rgba[3] = e;
                return this
            };
            h.prototype.tweenTo = function (e, z) {
                var q = this.rgba,
                    l = e.rgba;
                if (!D(q[0]) || !D(l[0])) return e.input || "none";
                e = 1 !== l[3] || 1 !== q[3];
                return (e ? "rgba(" : "rgb(") + Math.round(l[0] + (q[0] - l[0]) * (1 - z)) + "," + Math.round(l[1] + (q[1] - l[1]) * (1 - z)) + "," + Math.round(l[2] + (q[2] - l[2]) * (1 - z)) + (e ? "," + (l[3] + (q[3] - l[3]) * (1 - z)) : "") + ")"
            };
            h.names = {
                white: "#ffffff",
                black: "#000000"
            };
            h.parsers = [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (e) {
                    return [v(e[1]), v(e[2]), v(e[3]), parseFloat(e[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (e) {
                    return [v(e[1]), v(e[2]), v(e[3]), 1]
                }
            }];
            h.None = new h("");
            return h
        }();
        "";
        return h
    });
    M(h, "Core/Color/Palettes.js", [], function () {
        return {
            colors: "#fc5f5f #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ")
        }
    });
    M(h, "Core/Time.js", [h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h) {
        var D = e.win,
            E = h.defined,
            v =
                h.error,
            H = h.extend,
            I = h.isObject,
            z = h.merge,
            q = h.objectEach,
            l = h.pad,
            f = h.pick,
            d = h.splat,
            a = h.timeUnits,
            p = e.isSafari && D.Intl && D.Intl.DateTimeFormat.prototype.formatRange,
            k = e.isSafari && D.Intl && !D.Intl.DateTimeFormat.prototype.formatRange;
        h = function () {
            function F(a) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = D.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(a)
            }
            F.prototype.get = function (a, d) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var B = d.getTime(),
                        f = B - this.getTimezoneOffset(d);
                    d.setTime(f);
                    a = d["getUTC" + a]();
                    d.setTime(B);
                    return a
                }
                return this.useUTC ? d["getUTC" + a]() : d["get" + a]()
            };
            F.prototype.set = function (a, d, f) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === this.getTimezoneOffset(d) % 36E5) return d["setUTC" + a](f);
                    var B = this.getTimezoneOffset(d);
                    B = d.getTime() - B;
                    d.setTime(B);
                    d["setUTC" + a](f);
                    a = this.getTimezoneOffset(d);
                    B = d.getTime() + a;
                    return d.setTime(B)
                }
                return this.useUTC || p && "FullYear" === a ? d["setUTC" + a](f) : d["set" + a](f)
            };
            F.prototype.update = function (a) {
                var d = f(a && a.useUTC, !0);
                this.options = a = z(!0, this.options || {}, a);
                this.Date = a.Date || D.Date || Date;
                this.timezoneOffset = (this.useUTC = d) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = d && !(!a.getTimezoneOffset && !a.timezone)
            };
            F.prototype.makeTime = function (a, d, p, F, y, C) {
                if (this.useUTC) {
                    var x = this.Date.UTC.apply(0, arguments);
                    var c = this.getTimezoneOffset(x);
                    x += c;
                    var t = this.getTimezoneOffset(x);
                    c !== t ? x += t - c : c - 36E5 !== this.getTimezoneOffset(x -
                        36E5) || k || (x -= 36E5)
                } else x = (new this.Date(a, d, f(p, 1), f(F, 0), f(y, 0), f(C, 0))).getTime();
                return x
            };
            F.prototype.timezoneOffsetFunction = function () {
                var a = this,
                    d = this.options,
                    f = d.moment || D.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a.toString())).getTimezoneOffset()
                };
                if (d.timezone) {
                    if (f) return function (a) {
                        return 6E4 * -f.tz(a, d.timezone).utcOffset()
                    };
                    v(25)
                }
                return this.useUTC && d.getTimezoneOffset ? function (a) {
                    return 6E4 * d.getTimezoneOffset(a.valueOf())
                } : function () {
                    return 6E4 * (a.timezoneOffset ||
                        0)
                }
            };
            F.prototype.dateFormat = function (a, d, p) {
                if (!E(d) || isNaN(d)) return e.defaultOptions.lang && e.defaultOptions.lang.invalidDate || "";
                a = f(a, "%Y-%m-%d %H:%M:%S");
                var B = this,
                    y = new this.Date(d),
                    C = this.get("Hours", y),
                    x = this.get("Day", y),
                    c = this.get("Date", y),
                    t = this.get("Month", y),
                    g = this.get("FullYear", y),
                    u = e.defaultOptions.lang,
                    n = u && u.weekdays,
                    b = u && u.shortWeekdays;
                y = H({
                    a: b ? b[x] : n[x].substr(0, 3),
                    A: n[x],
                    d: l(c),
                    e: l(c, 2, " "),
                    w: x,
                    b: u.shortMonths[t],
                    B: u.months[t],
                    m: l(t + 1),
                    o: t + 1,
                    y: g.toString().substr(2, 2),
                    Y: g,
                    H: l(C),
                    k: C,
                    I: l(C % 12 || 12),
                    l: C % 12 || 12,
                    M: l(this.get("Minutes", y)),
                    p: 12 > C ? "AM" : "PM",
                    P: 12 > C ? "am" : "pm",
                    S: l(y.getSeconds()),
                    L: l(Math.floor(d % 1E3), 3)
                }, e.dateFormats);
                q(y, function (b, c) {
                    for (; - 1 !== a.indexOf("%" + c);) a = a.replace("%" + c, "function" === typeof b ? b.call(B, d) : b)
                });
                return p ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
            };
            F.prototype.resolveDTLFormat = function (a) {
                return I(a, !0) ? a : (a = d(a), {
                    main: a[0],
                    from: a[1],
                    to: a[2]
                })
            };
            F.prototype.getTimeTicks = function (d, p, k, F) {
                var y = this,
                    C = [],
                    x = {},
                    c = new y.Date(p),
                    t = d.unitRange,
                    g = d.count ||
                        1,
                    u;
                F = f(F, 1);
                if (E(p)) {
                    y.set("Milliseconds", c, t >= a.second ? 0 : g * Math.floor(y.get("Milliseconds", c) / g));
                    t >= a.second && y.set("Seconds", c, t >= a.minute ? 0 : g * Math.floor(y.get("Seconds", c) / g));
                    t >= a.minute && y.set("Minutes", c, t >= a.hour ? 0 : g * Math.floor(y.get("Minutes", c) / g));
                    t >= a.hour && y.set("Hours", c, t >= a.day ? 0 : g * Math.floor(y.get("Hours", c) / g));
                    t >= a.day && y.set("Date", c, t >= a.month ? 1 : Math.max(1, g * Math.floor(y.get("Date", c) / g)));
                    if (t >= a.month) {
                        y.set("Month", c, t >= a.year ? 0 : g * Math.floor(y.get("Month", c) / g));
                        var n = y.get("FullYear",
                            c)
                    }
                    t >= a.year && y.set("FullYear", c, n - n % g);
                    t === a.week && (n = y.get("Day", c), y.set("Date", c, y.get("Date", c) - n + F + (n < F ? -7 : 0)));
                    n = y.get("FullYear", c);
                    F = y.get("Month", c);
                    var b = y.get("Date", c),
                        r = y.get("Hours", c);
                    p = c.getTime();
                    !y.variableTimezone && y.useUTC || !E(k) || (u = k - p > 4 * a.month || y.getTimezoneOffset(p) !== y.getTimezoneOffset(k));
                    p = c.getTime();
                    for (c = 1; p < k;) C.push(p), p = t === a.year ? y.makeTime(n + c * g, 0) : t === a.month ? y.makeTime(n, F + c * g) : !u || t !== a.day && t !== a.week ? u && t === a.hour && 1 < g ? y.makeTime(n, F, b, r + c * g) : p + t * g : y.makeTime(n,
                        F, b + c * g * (t === a.day ? 1 : 7)), c++;
                    C.push(p);
                    t <= a.hour && 1E4 > C.length && C.forEach(function (b) {
                        0 === b % 18E5 && "000000000" === y.dateFormat("%H%M%S%L", b) && (x[b] = "day")
                    })
                }
                C.info = H(d, {
                    higherRanks: x,
                    totalRange: t * g
                });
                return C
            };
            F.prototype.getDateFormat = function (d, p, f, k) {
                var y = this.dateFormat("%m-%d %H:%M:%S.%L", p),
                    C = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    x = "millisecond";
                for (c in a) {
                    if (d === a.week && +this.dateFormat("%w", p) === f && "00:00:00.000" === y.substr(6)) {
                        var c = "week";
                        break
                    }
                    if (a[c] > d) {
                        c = x;
                        break
                    }
                    if (C[c] && y.substr(C[c]) !==
                        "01-01 00:00:00.000".substr(C[c])) break;
                    "week" !== c && (x = c)
                }
                if (c) var t = this.resolveDTLFormat(k[c]).main;
                return t
            };
            return F
        }();
        "";
        return h
    });
    M(h, "Core/DefaultOptions.js", [h["Core/Chart/ChartDefaults.js"], h["Core/Color/Color.js"], h["Core/Globals.js"], h["Core/Color/Palettes.js"], h["Core/Time.js"], h["Core/Utilities.js"]], function (e, h, A, E, v, H) {
        h = h.parse;
        var D = H.merge,
            z = {
                colors: E.colors,
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {},
                time: {
                    Date: void 0,
                    getTimezoneOffset: void 0,
                    timezone: void 0,
                    timezoneOffset: 0,
                    useUTC: !0
                },
                chart: e,
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44
                },
                subtitle: {
                    text: "",
                    align: "center",
                    widthAdjust: -44
                },
                caption: {
                    margin: 15,
                    text: "",
                    align: "left",
                    verticalAlign: "bottom"
                },
                plotOptions: {},
                labels: {
                    style: {
                        position: "absolute",
                        color: "#333333"
                    }
                },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    className: "highcharts-no-tooltip",
                    layout: "horizontal",
                    labelFormatter: function () {
                        return this.name
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: {
                        activeColor: "#003399",
                        inactiveColor: "#cccccc"
                    },
                    itemStyle: {
                        color: "#333333",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textOverflow: "ellipsis"
                    },
                    itemHoverStyle: {
                        color: "#000000"
                    },
                    itemHiddenStyle: {
                        color: "#cccccc"
                    },
                    shadow: !1,
                    itemCheckboxStyle: {
                        position: "absolute",
                        width: "13px",
                        height: "13px"
                    },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: {
                        style: {
                            fontWeight: "bold"
                        }
                    }
                },
                loading: {
                    labelStyle: {
                        fontWeight: "bold",
                        position: "relative",
                        top: "45%"
                    },
                    style: {
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        opacity: .5,
                        textAlign: "center"
                    }
                },
                tooltip: {
                    enabled: !0,
                    animation: A.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    headerShape: "callout",
                    hideDelay: 500,
                    padding: 8,
                    shape: "callout",
                    shared: !1,
                    snap: A.isTouchDevice ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: h("#f7f7f7").setOpacity(.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    stickOnContact: !1,
                    style: {
                        color: "#333333",
                        cursor: "default",
                        fontSize: "12px",
                        whiteSpace: "nowrap"
                    },
                    useHTML: !1
                }
            };
        z.chart.styledMode = !1;
        "";
        var q = new v(D(z.global, z.time));
        e = {
            defaultOptions: z,
            defaultTime: q,
            getOptions: function () {
                return z
            },
            setOptions: function (l) {
                D(!0, z, l);
                if (l.time || l.global) A.time ? A.time.update(D(z.global, z.time,
                    l.global, l.time)) : A.time = q;
                return z
            }
        };
        "";
        return e
    });
    M(h, "Core/Animation/Fx.js", [h["Core/Color/Color.js"], h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = e.parse,
            v = h.win,
            H = A.isNumber,
            I = A.objectEach;
        return function () {
            function e(q, l, f) {
                this.pos = NaN;
                this.options = l;
                this.elem = q;
                this.prop = f
            }
            e.prototype.dSetter = function () {
                var q = this.paths,
                    l = q && q[0];
                q = q && q[1];
                var f = this.now || 0,
                    d = [];
                if (1 !== f && l && q)
                    if (l.length === q.length && 1 > f)
                        for (var a = 0; a < q.length; a++) {
                            for (var p = l[a], k = q[a], F = [], B = 0; B < k.length; B++) {
                                var J =
                                    p[B],
                                    K = k[B];
                                H(J) && H(K) && ("A" !== k[0] || 4 !== B && 5 !== B) ? F[B] = J + f * (K - J) : F[B] = K
                            }
                            d.push(F)
                        } else d = q;
                else d = this.toD || [];
                this.elem.attr("d", d, void 0, !0)
            };
            e.prototype.update = function () {
                var q = this.elem,
                    l = this.prop,
                    f = this.now,
                    d = this.options.step;
                if (this[l + "Setter"]) this[l + "Setter"]();
                else q.attr ? q.element && q.attr(l, f, null, !0) : q.style[l] = f + this.unit;
                d && d.call(q, f, this)
            };
            e.prototype.run = function (q, l, f) {
                var d = this,
                    a = d.options,
                    p = function (a) {
                        return p.stopped ? !1 : d.step(a)
                    },
                    k = v.requestAnimationFrame || function (a) {
                        setTimeout(a,
                            13)
                    },
                    F = function () {
                        for (var a = 0; a < e.timers.length; a++) e.timers[a]() || e.timers.splice(a--, 1);
                        e.timers.length && k(F)
                    };
                q !== l || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = q, this.end = l, this.unit = f, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === e.timers.push(p) && k(F)) : (delete a.curAnim[this.prop], a.complete && 0 === Object.keys(a.curAnim).length && a.complete.call(this.elem))
            };
            e.prototype.step = function (q) {
                var l = +new Date,
                    f = this.options,
                    d = this.elem,
                    a = f.complete,
                    p = f.duration,
                    k = f.curAnim;
                if (d.attr && !d.element) q = !1;
                else if (q || l >= p + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var F = k[this.prop] = !0;
                    I(k, function (a) {
                        !0 !== a && (F = !1)
                    });
                    F && a && a.call(d);
                    q = !1
                } else this.pos = f.easing((l - this.startTime) / p), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0;
                return q
            };
            e.prototype.initPath = function (q, l, f) {
                function d(a, d) {
                    for (; a.length < L;) {
                        var x = a[0],
                            c = d[L - a.length];
                        c && "M" === x[0] && (a[0] = "C" === c[0] ? ["C", x[1], x[2], x[1], x[2], x[1], x[2]] : ["L", x[1],
                            x[2]
                        ]);
                        a.unshift(x);
                        F && (x = a.pop(), a.push(a[a.length - 1], x))
                    }
                }

                function a(a, d) {
                    for (; a.length < L;)
                        if (d = a[Math.floor(a.length / B) - 1].slice(), "C" === d[0] && (d[1] = d[5], d[2] = d[6]), F) {
                            var x = a[Math.floor(a.length / B)].slice();
                            a.splice(a.length / 2, 0, d, x)
                        } else a.push(d)
                }
                var p = q.startX,
                    k = q.endX;
                f = f.slice();
                var F = q.isArea,
                    B = F ? 2 : 1;
                l = l && l.slice();
                if (!l) return [f, f];
                if (p && k && k.length) {
                    for (q = 0; q < p.length; q++)
                        if (p[q] === k[0]) {
                            var J = q;
                            break
                        } else if (p[0] === k[k.length - p.length + q]) {
                            J = q;
                            var K = !0;
                            break
                        } else if (p[p.length - 1] === k[k.length -
                            p.length + q]) {
                            J = p.length - q;
                            break
                        }
                    "undefined" === typeof J && (l = [])
                }
                if (l.length && H(J)) {
                    var L = f.length + J * B;
                    K ? (d(l, f), a(f, l)) : (d(f, l), a(l, f))
                }
                return [l, f]
            };
            e.prototype.fillSetter = function () {
                e.prototype.strokeSetter.apply(this, arguments)
            };
            e.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, D(this.start).tweenTo(D(this.end), this.pos), null, !0)
            };
            e.timers = [];
            return e
        }()
    });
    M(h, "Core/Animation/AnimationUtilities.js", [h["Core/Animation/Fx.js"], h["Core/Utilities.js"]], function (e, h) {
        function D(a) {
            return q(a) ?
                l({
                    duration: 500,
                    defer: 0
                }, a) : {
                    duration: a ? 500 : 0,
                    defer: 0
                }
        }

        function E(a, d) {
            for (var f = e.timers.length; f--;) e.timers[f].elem !== a || d && d !== e.timers[f].prop || (e.timers[f].stopped = !0)
        }
        var v = h.defined,
            H = h.getStyle,
            I = h.isArray,
            z = h.isNumber,
            q = h.isObject,
            l = h.merge,
            f = h.objectEach,
            d = h.pick;
        return {
            animate: function (a, d, k) {
                var p, B = "",
                    J, K;
                if (!q(k)) {
                    var L = arguments;
                    k = {
                        duration: L[2],
                        easing: L[3],
                        complete: L[4]
                    }
                }
                z(k.duration) || (k.duration = 400);
                k.easing = "function" === typeof k.easing ? k.easing : Math[k.easing] || Math.easeInOutSine;
                k.curAnim = l(d);
                f(d, function (f, C) {
                    E(a, C);
                    K = new e(a, k, C);
                    J = void 0;
                    "d" === C && I(d.d) ? (K.paths = K.initPath(a, a.pathArray, d.d), K.toD = d.d, p = 0, J = 1) : a.attr ? p = a.attr(C) : (p = parseFloat(H(a, C)) || 0, "opacity" !== C && (B = "px"));
                    J || (J = f);
                    "string" === typeof J && J.match("px") && (J = J.replace(/px/g, ""));
                    K.run(p, J, B)
                })
            },
            animObject: D,
            getDeferredAnimation: function (a, d, f) {
                var p = D(d),
                    k = 0,
                    l = 0;
                (f ? [f] : a.series).forEach(function (a) {
                    a = D(a.options.animation);
                    k = d && v(d.defer) ? p.defer : Math.max(k, a.duration + a.defer);
                    l = Math.min(p.duration, a.duration)
                });
                a.renderer.forExport && (k = 0);
                return {
                    defer: Math.max(0, k - l),
                    duration: Math.min(k, l)
                }
            },
            setAnimation: function (a, f) {
                f.renderer.globalAnimation = d(a, f.options.chart.animation, !0)
            },
            stop: E
        }
    });
    M(h, "Core/Renderer/HTML/AST.js", [h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h) {
        var D = e.SVG_NS,
            E = h.attr,
            v = h.createElement,
            H = h.discardElement,
            I = h.error,
            z = h.isString,
            q = h.objectEach,
            l = h.splat;
        try {
            var f = !!(new DOMParser).parseFromString("", "text/html")
        } catch (d) {
            f = !1
        }
        h = function () {
            function d(a) {
                this.nodes = "string" ===
                    typeof a ? this.parseMarkup(a) : a
            }
            d.filterUserAttributes = function (a) {
                q(a, function (f, k) {
                    var p = !0; - 1 === d.allowedAttributes.indexOf(k) && (p = !1); - 1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(k) && (p = z(f) && d.allowedReferences.some(function (a) {
                        return 0 === f.indexOf(a)
                    }));
                    p || (I("Highcharts warning: Invalid attribute '" + k + "' in config"), delete a[k])
                });
                return a
            };
            d.setElementHTML = function (a, f) {
                a.innerHTML = "";
                f && (new d(f)).addToDOM(a)
            };
            d.prototype.addToDOM = function (a) {
                function f(a, p) {
                    var k;
                    l(a).forEach(function (a) {
                        var B =
                            a.tagName,
                            l = a.textContent ? e.doc.createTextNode(a.textContent) : void 0;
                        if (B)
                            if ("#text" === B) var y = l;
                            else if (-1 !== d.allowedTags.indexOf(B)) {
                                B = e.doc.createElementNS("svg" === B ? D : p.namespaceURI || D, B);
                                var C = a.attributes || {};
                                q(a, function (a, c) {
                                    "tagName" !== c && "attributes" !== c && "children" !== c && "textContent" !== c && (C[c] = a)
                                });
                                E(B, d.filterUserAttributes(C));
                                l && B.appendChild(l);
                                f(a.children || [], B);
                                y = B
                            } else I("Highcharts warning: Invalid tagName '" + B + "' in config");
                        y && p.appendChild(y);
                        k = y
                    });
                    return k
                }
                return f(this.nodes,
                    a)
            };
            d.prototype.parseMarkup = function (a) {
                var d = [];
                a = a.trim();
                if (f) a = (new DOMParser).parseFromString(a, "text/html");
                else {
                    var k = v("div");
                    k.innerHTML = a;
                    a = {
                        body: k
                    }
                }
                var l = function (a, d) {
                    var f = a.nodeName.toLowerCase(),
                        p = {
                            tagName: f
                        };
                    "#text" === f && (p.textContent = a.textContent || "");
                    if (f = a.attributes) {
                        var k = {};
                        [].forEach.call(f, function (a) {
                            k[a.name] = a.value
                        });
                        p.attributes = k
                    }
                    if (a.childNodes.length) {
                        var C = [];
                        [].forEach.call(a.childNodes, function (a) {
                            l(a, C)
                        });
                        C.length && (p.children = C)
                    }
                    d.push(p)
                };
                [].forEach.call(a.body.childNodes,
                    function (a) {
                        return l(a, d)
                    });
                k && H(k);
                return d
            };
            d.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            d.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            d.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            return d
        }();
        "";
        return h
    });
    M(h, "Core/FormatUtilities.js", [h["Core/DefaultOptions.js"],
    h["Core/Utilities.js"]
    ], function (e, h) {
        function D(l, f, d, a) {
            l = +l || 0;
            f = +f;
            var p = E.lang,
                k = (l.toString().split(".")[1] || "").split("e")[0].length,
                F = l.toString().split("e"),
                B = f;
            if (-1 === f) f = Math.min(k, 20);
            else if (!I(f)) f = 2;
            else if (f && F[1] && 0 > F[1]) {
                var J = f + +F[1];
                0 <= J ? (F[0] = (+F[0]).toExponential(J).split("e")[0], f = J) : (F[0] = F[0].split(".")[0] || 0, l = 20 > f ? (F[0] * Math.pow(10, F[1])).toFixed(f) : 0, F[1] = 0)
            }
            J = (Math.abs(F[1] ? F[0] : l) + Math.pow(10, -Math.max(f, k) - 1)).toFixed(f);
            k = String(q(J));
            var K = 3 < k.length ? k.length % 3 :
                0;
            d = z(d, p.decimalPoint);
            a = z(a, p.thousandsSep);
            l = (0 > l ? "-" : "") + (K ? k.substr(0, K) + a : "");
            l = 0 > +F[1] && !B ? "0" : l + k.substr(K).replace(/(\d{3})(?=\d)/g, "$1" + a);
            f && (l += d + J.slice(-f));
            F[1] && 0 !== +l && (l += "e" + F[1]);
            return l
        }
        var E = e.defaultOptions,
            v = e.defaultTime,
            H = h.getNestedProperty,
            I = h.isNumber,
            z = h.pick,
            q = h.pInt;
        return {
            dateFormat: function (l, f, d) {
                return v.dateFormat(l, f, d)
            },
            format: function (l, f, d) {
                var a = "{",
                    p = !1,
                    k = /f$/,
                    F = /\.([0-9])/,
                    B = E.lang,
                    J = d && d.time || v;
                d = d && d.numberFormatter || D;
                for (var K = []; l;) {
                    var q = l.indexOf(a);
                    if (-1 === q) break;
                    var y = l.slice(0, q);
                    if (p) {
                        y = y.split(":");
                        a = H(y.shift() || "", f);
                        if (y.length && "number" === typeof a)
                            if (y = y.join(":"), k.test(y)) {
                                var C = parseInt((y.match(F) || ["", "-1"])[1], 10);
                                null !== a && (a = d(a, C, B.decimalPoint, -1 < y.indexOf(",") ? B.thousandsSep : ""))
                            } else a = J.dateFormat(y, a);
                        K.push(a)
                    } else K.push(y);
                    l = l.slice(q + 1);
                    a = (p = !p) ? "}" : "{"
                }
                K.push(l);
                return K.join("")
            },
            numberFormat: D
        }
    });
    M(h, "Core/Renderer/RendererUtilities.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.clamp,
            A = e.pick,
            E = e.stableSort,
            v;
        (function (e) {
            function v(e, q, l) {
                var f = e,
                    d = f.reducedLen || q,
                    a = function (a, d) {
                        return (d.rank || 0) - (a.rank || 0)
                    },
                    p = function (a, d) {
                        return a.target - d.target
                    },
                    k, F = !0,
                    B = [],
                    J = 0;
                for (k = e.length; k--;) J += e[k].size;
                if (J > d) {
                    E(e, a);
                    for (J = k = 0; J <= d;) J += e[k].size, k++;
                    B = e.splice(k - 1, e.length)
                }
                E(e, p);
                for (e = e.map(function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: A(a.align, .5)
                    }
                }); F;) {
                    for (k = e.length; k--;) d = e[k], a = (Math.min.apply(0, d.targets) + Math.max.apply(0, d.targets)) / 2, d.pos = h(a - d.size * d.align, 0, q - d.size);
                    k = e.length;
                    for (F = !1; k--;) 0 < k && e[k - 1].pos + e[k - 1].size > e[k].pos && (e[k - 1].size += e[k].size, e[k - 1].targets = e[k - 1].targets.concat(e[k].targets), e[k - 1].align = .5, e[k - 1].pos + e[k - 1].size > q && (e[k - 1].pos = q - e[k - 1].size), e.splice(k, 1), F = !0)
                }
                f.push.apply(f, B);
                k = 0;
                e.some(function (a) {
                    var d = 0;
                    return (a.targets || []).some(function () {
                        f[k].pos = a.pos + d;
                        if ("undefined" !== typeof l && Math.abs(f[k].pos - f[k].target) > l) return f.slice(0, k + 1).forEach(function (a) {
                            return delete a.pos
                        }), f.reducedLen = (f.reducedLen || q) - .1 * q, f.reducedLen > .1 * q && v(f,
                            q, l), !0;
                        d += f[k].size;
                        k++;
                        return !1
                    })
                });
                E(f, p);
                return f
            }
            e.distribute = v
        })(v || (v = {}));
        return v
    });
    M(h, "Core/Renderer/SVG/SVGElement.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Renderer/HTML/AST.js"], h["Core/Color/Color.js"], h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h, A, E, v) {
        var D = e.animate,
            I = e.animObject,
            z = e.stop,
            q = E.deg2rad,
            l = E.doc,
            f = E.noop,
            d = E.svg,
            a = E.SVG_NS,
            p = E.win,
            k = v.addEvent,
            F = v.attr,
            B = v.createElement,
            J = v.css,
            K = v.defined,
            L = v.erase,
            y = v.extend,
            C = v.fireEvent,
            x = v.isArray,
            c = v.isFunction,
            t = v.isNumber,
            g = v.isString,
            u = v.merge,
            n = v.objectEach,
            b = v.pick,
            r = v.pInt,
            G = v.syncTimeout,
            m = v.uniqueKey;
        e = function () {
            function w() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = a;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
            }
            w.prototype._defaultGetter = function (c) {
                c = b(this[c + "Value"], this[c], this.element ? this.element.getAttribute(c) : null, 0);
                /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
                return c
            };
            w.prototype._defaultSetter =
                function (b, c, g) {
                    g.setAttribute(c, b)
                };
            w.prototype.add = function (b) {
                var c = this.renderer,
                    g = this.element;
                b && (this.parentGroup = b);
                this.parentInverted = b && b.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && c.buildText(this);
                this.added = !0;
                if (!b || b.handleZ || this.zIndex) var m = this.zIndexSetter();
                m || (b ? b.element : c.box).appendChild(g);
                if (this.onAdd) this.onAdd();
                return this
            };
            w.prototype.addClass = function (b, c) {
                var g = c ? "" : this.attr("class") || "";
                b = (b || "").split(/ /g).reduce(function (b, c) {
                    -1 ===
                        g.indexOf(c) && b.push(c);
                    return b
                }, g ? [g] : []).join(" ");
                b !== g && this.attr("class", b);
                return this
            };
            w.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            w.prototype.align = function (c, m, n) {
                var P = {},
                    a = this.renderer,
                    r = a.alignedObjects,
                    u, N, d;
                if (c) {
                    if (this.alignOptions = c, this.alignByTranslate = m, !n || g(n)) this.alignTo = u = n || "renderer", L(r, this), r.push(this), n = void 0
                } else c = this.alignOptions, m = this.alignByTranslate, u = this.alignTo;
                n = b(n, a[u], "scrollablePlotBox" === u ?
                    a.plotBox : void 0, a);
                u = c.align;
                var t = c.verticalAlign;
                a = (n.x || 0) + (c.x || 0);
                r = (n.y || 0) + (c.y || 0);
                "right" === u ? N = 1 : "center" === u && (N = 2);
                N && (a += (n.width - (c.width || 0)) / N);
                P[m ? "translateX" : "x"] = Math.round(a);
                "bottom" === t ? d = 1 : "middle" === t && (d = 2);
                d && (r += (n.height - (c.height || 0)) / d);
                P[m ? "translateY" : "y"] = Math.round(r);
                this[this.placed ? "animate" : "attr"](P);
                this.placed = !0;
                this.alignAttr = P;
                return this
            };
            w.prototype.alignSetter = function (b) {
                var c = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                c[b] && (this.alignValue = b, this.element.setAttribute("text-anchor",
                    c[b]))
            };
            w.prototype.animate = function (c, g, m) {
                var a = this,
                    r = I(b(g, this.renderer.globalAnimation, !0));
                g = r.defer;
                b(l.hidden, l.msHidden, l.webkitHidden, !1) && (r.duration = 0);
                0 !== r.duration ? (m && (r.complete = m), G(function () {
                    a.element && D(a, c, r)
                }, g)) : (this.attr(c, void 0, m), n(c, function (b, c) {
                    r.step && r.step.call(this, b, {
                        prop: c,
                        pos: 1,
                        elem: this
                    })
                }, this));
                return this
            };
            w.prototype.applyTextOutline = function (b) {
                var c = this.element; - 1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                var g = b.split(" ");
                b = g[g.length - 1];
                if ((g = g[0]) && "none" !== g && E.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    g = g.replace(/(^[\d\.]+)(.*?)$/g, function (b, c, g) {
                        return 2 * Number(c) + g
                    });
                    this.removeTextOutline();
                    var m = l.createElementNS(a, "tspan");
                    F(m, {
                        "class": "highcharts-text-outline",
                        fill: b,
                        stroke: b,
                        "stroke-width": g,
                        "stroke-linejoin": "round"
                    });
                    [].forEach.call(c.childNodes, function (b) {
                        var c = b.cloneNode(!0);
                        c.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function (b) {
                            return c.removeAttribute(b)
                        });
                        m.appendChild(c)
                    });
                    var n = l.createElementNS(a, "tspan");
                    n.textContent = "\u200b";
                    ["x", "y"].forEach(function (b) {
                        var g = c.getAttribute(b);
                        g && n.setAttribute(b, g)
                    });
                    m.appendChild(n);
                    c.insertBefore(m, c.firstChild)
                }
            };
            w.prototype.attr = function (b, c, g, m) {
                var r = this.element,
                    a = this.symbolCustomAttribs,
                    P, O = this,
                    u, N;
                if ("string" === typeof b && "undefined" !== typeof c) {
                    var d = b;
                    b = {};
                    b[d] = c
                }
                "string" === typeof b ? O = (this[b + "Getter"] || this._defaultGetter).call(this, b, r) : (n(b, function (c, g) {
                    u = !1;
                    m || z(this, g);
                    this.symbolName && -1 !==
                        a.indexOf(g) && (P || (this.symbolAttr(b), P = !0), u = !0);
                    !this.rotation || "x" !== g && "y" !== g || (this.doTransform = !0);
                    u || (N = this[g + "Setter"] || this._defaultSetter, N.call(this, c, g, r), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g) && this.updateShadows(g, c, N))
                }, this), this.afterSetters());
                g && g.call(this);
                return O
            };
            w.prototype.clip = function (b) {
                return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none")
            };
            w.prototype.crisp = function (b, c) {
                c = c || b.strokeWidth ||
                    0;
                var g = Math.round(c) % 2 / 2;
                b.x = Math.floor(b.x || this.x || 0) + g;
                b.y = Math.floor(b.y || this.y || 0) + g;
                b.width = Math.floor((b.width || this.width || 0) - 2 * g);
                b.height = Math.floor((b.height || this.height || 0) - 2 * g);
                K(b.strokeWidth) && (b.strokeWidth = c);
                return b
            };
            w.prototype.complexColor = function (b, c, g) {
                var r = this.renderer,
                    a, P, d, t, w, N, G, f, p, k, y = [],
                    B;
                C(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    b.radialGradient ? P = "radialGradient" : b.linearGradient && (P = "linearGradient");
                    if (P) {
                        d = b[P];
                        w = r.gradients;
                        N = b.stops;
                        p = g.radialReference;
                        x(d) && (b[P] = d = {
                            x1: d[0],
                            y1: d[1],
                            x2: d[2],
                            y2: d[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === P && p && !K(d.gradientUnits) && (t = d, d = u(d, r.getRadialAttr(p, t), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        n(d, function (b, c) {
                            "id" !== c && y.push(c, b)
                        });
                        n(N, function (b) {
                            y.push(b)
                        });
                        y = y.join(",");
                        if (w[y]) k = w[y].attr("id");
                        else {
                            d.id = k = m();
                            var O = w[y] = r.createElement(P).attr(d).add(r.defs);
                            O.radAttr = t;
                            O.stops = [];
                            N.forEach(function (b) {
                                0 === b[1].indexOf("rgba") ? (a = A.parse(b[1]), G = a.get("rgb"), f = a.get("a")) : (G = b[1], f = 1);
                                b = r.createElement("stop").attr({
                                    offset: b[0],
                                    "stop-color": G,
                                    "stop-opacity": f
                                }).add(O);
                                O.stops.push(b)
                            })
                        }
                        B = "url(" + r.url + "#" + k + ")";
                        g.setAttribute(c, B);
                        g.gradient = y;
                        b.toString = function () {
                            return B
                        }
                    }
                })
            };
            w.prototype.css = function (b) {
                var c = this.styles,
                    g = {},
                    m = this.element,
                    a = ["textOutline", "textOverflow", "width"],
                    u = "",
                    t = !c;
                b && b.color && (b.fill = b.color);
                c && n(b, function (b, m) {
                    c && c[m] !== b && (g[m] = b, t = !0)
                });
                if (t) {
                    c && (b = y(c, g));
                    if (b)
                        if (null === b.width || "auto" === b.width) delete this.textWidth;
                        else if ("text" === m.nodeName.toLowerCase() && b.width) var w = this.textWidth =
                            r(b.width);
                    this.styles = b;
                    w && !d && this.renderer.forExport && delete b.width;
                    if (m.namespaceURI === this.SVG_NS) {
                        var N = function (b, c) {
                            return "-" + c.toLowerCase()
                        };
                        n(b, function (b, c) {
                            -1 === a.indexOf(c) && (u += c.replace(/([A-Z])/g, N) + ":" + b + ";")
                        });
                        u && F(m, "style", u)
                    } else J(m, b);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b && b.textOutline && this.applyTextOutline(b.textOutline))
                }
                return this
            };
            w.prototype.dashstyleSetter = function (c) {
                var g = this["stroke-width"];
                "inherit" === g && (g = 1);
                if (c = c && c.toLowerCase()) {
                    var m =
                        c.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (c = m.length; c--;) m[c] = "" + r(m[c]) * b(g, NaN);
                    c = m.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", c)
                }
            };
            w.prototype.destroy = function () {
                var b = this,
                    c = b.element || {},
                    g = b.renderer,
                    m = c.ownerSVGElement,
                    r = g.isSVG && "SPAN" === c.nodeName && b.parentGroup ||
                        void 0;
                c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
                z(b);
                if (b.clipPath && m) {
                    var a = b.clipPath;
                    [].forEach.call(m.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) {
                        -1 < b.getAttribute("clip-path").indexOf(a.element.id) && b.removeAttribute("clip-path")
                    });
                    b.clipPath = a.destroy()
                }
                if (b.stops) {
                    for (m = 0; m < b.stops.length; m++) b.stops[m].destroy();
                    b.stops.length = 0;
                    b.stops = void 0
                }
                b.safeRemoveChild(c);
                for (g.styledMode || b.destroyShadows(); r && r.div && 0 === r.div.childNodes.length;) c = r.parentGroup,
                    b.safeRemoveChild(r.div), delete r.div, r = c;
                b.alignTo && L(g.alignedObjects, b);
                n(b, function (c, g) {
                    b[g] && b[g].parentGroup === b && b[g].destroy && b[g].destroy();
                    delete b[g]
                })
            };
            w.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (b) {
                    this.safeRemoveChild(b)
                }, this);
                this.shadows = void 0
            };
            w.prototype.destroyTextPath = function (b, c) {
                var g = b.getElementsByTagName("text")[0];
                if (g) {
                    if (g.removeAttribute("dx"), g.removeAttribute("dy"), c.element.setAttribute("id", ""), this.textPathWrapper && g.getElementsByTagName("textPath").length) {
                        for (b =
                            this.textPathWrapper.element.childNodes; b.length;) g.appendChild(b[0]);
                        g.removeChild(this.textPathWrapper.element)
                    }
                } else if (b.getAttribute("dx") || b.getAttribute("dy")) b.removeAttribute("dx"), b.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            w.prototype.dSetter = function (b, c, g) {
                x(b) && ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)), this.pathArray = b, b = b.reduce(function (b, c, g) {
                    return c && c.join ? (g ? b + " " : "") + c.join(" ") : (c || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[c] !== b && (g.setAttribute(c, b), this[c] = b)
            };
            w.prototype.fadeOut = function (c) {
                var g = this;
                g.animate({
                    opacity: 0
                }, {
                    duration: b(c, 150),
                    complete: function () {
                        g.attr({
                            y: -9999
                        }).hide()
                    }
                })
            };
            w.prototype.fillSetter = function (b, c, g) {
                "string" === typeof b ? g.setAttribute(c, b) : b && this.complexColor(b, c, g)
            };
            w.prototype.getBBox = function (g, m) {
                var n = this.renderer,
                    r = this.element,
                    a = this.styles,
                    u = this.textStr,
                    d = n.cache,
                    t = n.cacheKeys,
                    Q = r.namespaceURI === this.SVG_NS;
                m = b(m, this.rotation, 0);
                var x =
                    n.styledMode ? r && w.prototype.getStyle.call(r, "font-size") : a && a.fontSize,
                    G;
                if (K(u)) {
                    var f = u.toString(); - 1 === f.indexOf("<") && (f = f.replace(/[0-9]/g, "0"));
                    f += ["", m, x, this.textWidth, a && a.textOverflow, a && a.fontWeight].join()
                }
                f && !g && (G = d[f]);
                if (!G) {
                    if (Q || n.forExport) {
                        try {
                            var N = this.fakeTS && function (b) {
                                var c = r.querySelector(".highcharts-text-outline");
                                c && J(c, {
                                    display: b
                                })
                            };
                            c(N) && N("none");
                            G = r.getBBox ? y({}, r.getBBox()) : {
                                width: r.offsetWidth,
                                height: r.offsetHeight
                            };
                            c(N) && N("")
                        } catch (U) {
                            ""
                        }
                        if (!G || 0 > G.width) G = {
                            width: 0,
                            height: 0
                        }
                    } else G = this.htmlGetBBox();
                    n.isSVG && (g = G.width, n = G.height, Q && (G.height = n = {
                        "11px,17": 14,
                        "13px,20": 16
                    }[a && a.fontSize + "," + Math.round(n)] || n), m && (a = m * q, G.width = Math.abs(n * Math.sin(a)) + Math.abs(g * Math.cos(a)), G.height = Math.abs(n * Math.cos(a)) + Math.abs(g * Math.sin(a))));
                    if (f && ("" === u || 0 < G.height)) {
                        for (; 250 < t.length;) delete d[t.shift()];
                        d[f] || t.push(f);
                        d[f] = G
                    }
                }
                return G
            };
            w.prototype.getStyle = function (b) {
                return p.getComputedStyle(this.element || this, "").getPropertyValue(b)
            };
            w.prototype.hasClass = function (b) {
                return -1 !==
                    ("" + this.attr("class")).split(" ").indexOf(b)
            };
            w.prototype.hide = function (b) {
                b ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            };
            w.prototype.htmlGetBBox = function () {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            };
            w.prototype.init = function (b, c) {
                this.element = "span" === c ? B(c) : l.createElementNS(this.SVG_NS, c);
                this.renderer = b;
                C(this, "afterInit")
            };
            w.prototype.invert = function (b) {
                this.inverted = b;
                this.updateTransform();
                return this
            };
            w.prototype.on = function (b, c) {
                var g = this.onEvents;
                if (g[b]) g[b]();
                g[b] = k(this.element,
                    b, c);
                return this
            };
            w.prototype.opacitySetter = function (b, c, g) {
                this.opacity = b = Number(Number(b).toFixed(3));
                g.setAttribute(c, b)
            };
            w.prototype.removeClass = function (b) {
                return this.attr("class", ("" + this.attr("class")).replace(g(b) ? new RegExp("(^| )" + b + "( |$)") : b, " ").replace(/ +/g, " ").trim())
            };
            w.prototype.removeTextOutline = function () {
                var b = this.element.querySelector("tspan.highcharts-text-outline");
                b && this.safeRemoveChild(b)
            };
            w.prototype.safeRemoveChild = function (b) {
                var c = b.parentNode;
                c && c.removeChild(b)
            };
            w.prototype.setRadialReference = function (b) {
                var c = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = b;
                c && c.radAttr && c.animate(this.renderer.getRadialAttr(b, c.radAttr));
                return this
            };
            w.prototype.setTextPath = function (b, c) {
                var g = this.element,
                    r = this.text ? this.text.element : g,
                    a = {
                        textAnchor: "text-anchor"
                    },
                    d = !1,
                    w = this.textPathWrapper,
                    G = !w;
                c = u(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, c);
                var x = h.filterUserAttributes(c.attributes);
                if (b && c && c.enabled) {
                    w && null === w.element.parentNode ? (G = !0, w = w.destroy()) : w && this.removeTextOutline.call(w.parentGroup);
                    this.options && this.options.padding && (x.dx = -this.options.padding);
                    w || (this.textPathWrapper = w = this.renderer.createElement("textPath"), d = !0);
                    var C = w.element;
                    (c = b.element.getAttribute("id")) || b.element.setAttribute("id", c = m());
                    if (G)
                        for (r.setAttribute("y", 0), t(x.dx) && r.setAttribute("x", -x.dx), b = [].slice.call(r.childNodes), G = 0; G < b.length; G++) {
                            var k = b[G];
                            k.nodeType !== p.Node.TEXT_NODE && "tspan" !==
                                k.nodeName || C.appendChild(k)
                        }
                    d && w && w.add({
                        element: r
                    });
                    C.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + c);
                    K(x.dy) && (C.parentNode.setAttribute("dy", x.dy), delete x.dy);
                    K(x.dx) && (C.parentNode.setAttribute("dx", x.dx), delete x.dx);
                    n(x, function (b, c) {
                        C.setAttribute(a[c] || c, b)
                    });
                    g.removeAttribute("transform");
                    this.removeTextOutline.call(w);
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = f
                } else w && (delete this.updateTransform,
                    delete this.applyTextOutline, this.destroyTextPath(g, b), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            };
            w.prototype.shadow = function (b, c, g) {
                var m = [],
                    r = this.element,
                    a = this.oldShadowOptions,
                    u = {
                        color: "#000000",
                        offsetX: this.parentInverted ? -1 : 1,
                        offsetY: this.parentInverted ? -1 : 1,
                        opacity: .15,
                        width: 3
                    },
                    P = !1,
                    d;
                !0 === b ? d = u : "object" === typeof b && (d = y(u, b));
                d && (d && a && n(d, function (b, c) {
                    b !== a[c] && (P = !0)
                }), P && this.destroyShadows(), this.oldShadowOptions =
                    d);
                if (!d) this.destroyShadows();
                else if (!this.shadows) {
                    var w = d.opacity / d.width;
                    var t = this.parentInverted ? "translate(" + d.offsetY + ", " + d.offsetX + ")" : "translate(" + d.offsetX + ", " + d.offsetY + ")";
                    for (u = 1; u <= d.width; u++) {
                        var G = r.cloneNode(!1);
                        var x = 2 * d.width + 1 - 2 * u;
                        F(G, {
                            stroke: b.color,
                            "stroke-opacity": w * u,
                            "stroke-width": x,
                            transform: t,
                            fill: "none"
                        });
                        G.setAttribute("class", (G.getAttribute("class") || "") + " highcharts-shadow");
                        g && (F(G, "height", Math.max(F(G, "height") - x, 0)), G.cutHeight = x);
                        c ? c.element.appendChild(G) :
                            r.parentNode && r.parentNode.insertBefore(G, r);
                        m.push(G)
                    }
                    this.shadows = m
                }
                return this
            };
            w.prototype.show = function (b) {
                return this.attr({
                    visibility: b ? "inherit" : "visible"
                })
            };
            w.prototype.strokeSetter = function (b, c, g) {
                this[c] = b;
                this.stroke && this["stroke-width"] ? (w.prototype.fillSetter.call(this, this.stroke, "stroke", g), g.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === c && 0 === b && this.hasStroke ? (g.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] &&
                    (g.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
            };
            w.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var b = this.getStyle("stroke-width"),
                    c = 0;
                if (b.indexOf("px") === b.length - 2) c = r(b);
                else if ("" !== b) {
                    var g = l.createElementNS(a, "rect");
                    F(g, {
                        width: b,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(g);
                    c = g.getBBox().width;
                    g.parentNode.removeChild(g)
                }
                return c
            };
            w.prototype.symbolAttr = function (c) {
                var g = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (m) {
                    g[m] =
                        b(c[m], g[m])
                });
                g.attr({
                    d: g.renderer.symbols[g.symbolName](g.x, g.y, g.width, g.height, g)
                })
            };
            w.prototype.textSetter = function (b) {
                b !== this.textStr && (delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this))
            };
            w.prototype.titleSetter = function (c) {
                var g = this.element,
                    m = g.getElementsByTagName("title")[0] || l.createElementNS(this.SVG_NS, "title");
                g.insertBefore ? g.insertBefore(m, g.firstChild) : g.appendChild(m);
                m.textContent = String(b(c, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g,
                    ">")
            };
            w.prototype.toFront = function () {
                var b = this.element;
                b.parentNode.appendChild(b);
                return this
            };
            w.prototype.translate = function (b, c) {
                return this.attr({
                    translateX: b,
                    translateY: c
                })
            };
            w.prototype.updateShadows = function (b, c, g) {
                var m = this.shadows;
                if (m)
                    for (var n = m.length; n--;) g.call(m[n], "height" === b ? Math.max(c - (m[n].cutHeight || 0), 0) : "d" === b ? this.d : c, b, m[n])
            };
            w.prototype.updateTransform = function () {
                var c = this.scaleX,
                    g = this.scaleY,
                    m = this.inverted,
                    n = this.rotation,
                    r = this.matrix,
                    a = this.element,
                    u = this.translateX ||
                        0,
                    d = this.translateY || 0;
                m && (u += this.width, d += this.height);
                u = ["translate(" + u + "," + d + ")"];
                K(r) && u.push("matrix(" + r.join(",") + ")");
                m ? u.push("rotate(90) scale(-1,1)") : n && u.push("rotate(" + n + " " + b(this.rotationOriginX, a.getAttribute("x"), 0) + " " + b(this.rotationOriginY, a.getAttribute("y") || 0) + ")");
                (K(c) || K(g)) && u.push("scale(" + b(c, 1) + " " + b(g, 1) + ")");
                u.length && a.setAttribute("transform", u.join(" "))
            };
            w.prototype.visibilitySetter = function (b, c, g) {
                "inherit" === b ? g.removeAttribute(c) : this[c] !== b && g.setAttribute(c,
                    b);
                this[c] = b
            };
            w.prototype.xGetter = function (b) {
                "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy"));
                return this._defaultGetter(b)
            };
            w.prototype.zIndexSetter = function (b, c) {
                var g = this.renderer,
                    m = this.parentGroup,
                    n = (m || g).element || g.box,
                    a = this.element;
                g = n === g.box;
                var u = !1;
                var d = this.added;
                var w;
                K(b) ? (a.setAttribute("data-z-index", b), b = +b, this[c] === b && (d = !1)) : K(this[c]) && a.removeAttribute("data-z-index");
                this[c] = b;
                if (d) {
                    (b = this.zIndex) && m && (m.handleZ = !0);
                    c = n.childNodes;
                    for (w = c.length - 1; 0 <=
                        w && !u; w--) {
                        m = c[w];
                        d = m.getAttribute("data-z-index");
                        var t = !K(d);
                        if (m !== a)
                            if (0 > b && t && !g && !w) n.insertBefore(a, c[w]), u = !0;
                            else if (r(d) <= b || t && (!K(b) || 0 <= b)) n.insertBefore(a, c[w + 1] || null), u = !0
                    }
                    u || (n.insertBefore(a, c[g ? 3 : 0] || null), u = !0)
                }
                return u
            };
            return w
        }();
        e.prototype["stroke-widthSetter"] = e.prototype.strokeSetter;
        e.prototype.yGetter = e.prototype.xGetter;
        e.prototype.matrixSetter = e.prototype.rotationOriginXSetter = e.prototype.rotationOriginYSetter = e.prototype.rotationSetter = e.prototype.scaleXSetter = e.prototype.scaleYSetter =
            e.prototype.translateXSetter = e.prototype.translateYSetter = e.prototype.verticalAlignSetter = function (b, c) {
                this[c] = b;
                this.doTransform = !0
            };
        "";
        return e
    });
    M(h, "Core/Renderer/RendererRegistry.js", [h["Core/Globals.js"]], function (e) {
        var h;
        (function (h) {
            h.rendererTypes = {};
            var D;
            h.getRendererType = function (e) {
                void 0 === e && (e = D);
                return h.rendererTypes[e] || h.rendererTypes[D]
            };
            h.registerRendererType = function (v, A, I) {
                h.rendererTypes[v] = A;
                if (!D || I) D = v, e.Renderer = A
            }
        })(h || (h = {}));
        return h
    });
    M(h, "Core/Renderer/SVG/SVGLabel.js",
        [h["Core/Renderer/SVG/SVGElement.js"], h["Core/Utilities.js"]],
        function (e, h) {
            var D = this && this.__extends || function () {
                var l = function (f, d) {
                    l = Object.setPrototypeOf || {
                        __proto__: []
                    }
                        instanceof Array && function (a, d) {
                            a.__proto__ = d
                        } || function (a, d) {
                            for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                        };
                    return l(f, d)
                };
                return function (f, d) {
                    function a() {
                        this.constructor = f
                    }
                    l(f, d);
                    f.prototype = null === d ? Object.create(d) : (a.prototype = d.prototype, new a)
                }
            }(),
                E = h.defined,
                v = h.extend,
                H = h.isNumber,
                I = h.merge,
                z = h.pick,
                q = h.removeEvent;
            return function (l) {
                function f(d, a, p, k, F, B, J, K, e, y) {
                    var C = l.call(this) || this;
                    C.paddingLeftSetter = C.paddingSetter;
                    C.paddingRightSetter = C.paddingSetter;
                    C.init(d, "g");
                    C.textStr = a;
                    C.x = p;
                    C.y = k;
                    C.anchorX = B;
                    C.anchorY = J;
                    C.baseline = e;
                    C.className = y;
                    C.addClass("button" === y ? "highcharts-no-tooltip" : "highcharts-label");
                    y && C.addClass("highcharts-" + y);
                    C.text = d.text(void 0, 0, 0, K).attr({
                        zIndex: 1
                    });
                    var x;
                    "string" === typeof F && ((x = /^url\((.*?)\)$/.test(F)) || C.renderer.symbols[F]) && (C.symbolKey = F);
                    C.bBox = f.emptyBBox;
                    C.padding =
                        3;
                    C.baselineOffset = 0;
                    C.needsBox = d.styledMode || x;
                    C.deferredAttr = {};
                    C.alignFactor = 0;
                    return C
                }
                D(f, l);
                f.prototype.alignSetter = function (d) {
                    d = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[d];
                    d !== this.alignFactor && (this.alignFactor = d, this.bBox && H(this.xSetting) && this.attr({
                        x: this.xSetting
                    }))
                };
                f.prototype.anchorXSetter = function (d, a) {
                    this.anchorX = d;
                    this.boxAttr(a, Math.round(d) - this.getCrispAdjust() - this.xSetting)
                };
                f.prototype.anchorYSetter = function (d, a) {
                    this.anchorY = d;
                    this.boxAttr(a, d - this.ySetting)
                };
                f.prototype.boxAttr = function (d,
                    a) {
                    this.box ? this.box.attr(d, a) : this.deferredAttr[d] = a
                };
                f.prototype.css = function (d) {
                    if (d) {
                        var a = {};
                        d = I(d);
                        f.textProps.forEach(function (f) {
                            "undefined" !== typeof d[f] && (a[f] = d[f], delete d[f])
                        });
                        this.text.css(a);
                        var p = "width" in a;
                        "fontSize" in a || "fontWeight" in a ? this.updateTextPadding() : p && this.updateBoxSize()
                    }
                    return e.prototype.css.call(this, d)
                };
                f.prototype.destroy = function () {
                    q(this.element, "mouseenter");
                    q(this.element, "mouseleave");
                    this.text && this.text.destroy();
                    this.box && (this.box = this.box.destroy());
                    e.prototype.destroy.call(this)
                };
                f.prototype.fillSetter = function (d, a) {
                    d && (this.needsBox = !0);
                    this.fill = d;
                    this.boxAttr(a, d)
                };
                f.prototype.getBBox = function () {
                    this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                    var d = this.padding,
                        a = z(this.paddingLeft, d);
                    return {
                        width: this.width,
                        height: this.height,
                        x: this.bBox.x - a,
                        y: this.bBox.y - d
                    }
                };
                f.prototype.getCrispAdjust = function () {
                    return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"],
                        10) : 0) % 2 / 2
                };
                f.prototype.heightSetter = function (d) {
                    this.heightSetting = d
                };
                f.prototype.onAdd = function () {
                    var d = this.textStr;
                    this.text.add(this);
                    this.attr({
                        text: E(d) ? d : "",
                        x: this.x,
                        y: this.y
                    });
                    this.box && E(this.anchorX) && this.attr({
                        anchorX: this.anchorX,
                        anchorY: this.anchorY
                    })
                };
                f.prototype.paddingSetter = function (d, a) {
                    H(d) ? d !== this[a] && (this[a] = d, this.updateTextPadding()) : this[a] = void 0
                };
                f.prototype.rSetter = function (d, a) {
                    this.boxAttr(a, d)
                };
                f.prototype.shadow = function (d) {
                    d && !this.renderer.styledMode && (this.updateBoxSize(),
                        this.box && this.box.shadow(d));
                    return this
                };
                f.prototype.strokeSetter = function (d, a) {
                    this.stroke = d;
                    this.boxAttr(a, d)
                };
                f.prototype["stroke-widthSetter"] = function (d, a) {
                    d && (this.needsBox = !0);
                    this["stroke-width"] = d;
                    this.boxAttr(a, d)
                };
                f.prototype["text-alignSetter"] = function (d) {
                    this.textAlign = d
                };
                f.prototype.textSetter = function (d) {
                    "undefined" !== typeof d && this.text.attr({
                        text: d
                    });
                    this.updateTextPadding()
                };
                f.prototype.updateBoxSize = function () {
                    var d = this.text.element.style,
                        a = {},
                        p = this.padding,
                        k = this.bBox = H(this.widthSetting) &&
                            H(this.heightSetting) && !this.textAlign || !E(this.text.textStr) ? f.emptyBBox : this.text.getBBox();
                    this.width = this.getPaddedWidth();
                    this.height = (this.heightSetting || k.height || 0) + 2 * p;
                    d = this.renderer.fontMetrics(d && d.fontSize, this.text);
                    this.baselineOffset = p + Math.min((this.text.firstLineMetrics || d).b, k.height || Infinity);
                    this.heightSetting && (this.baselineOffset += (this.heightSetting - d.h) / 2);
                    this.needsBox && (this.box || (p = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), p.addClass(("button" ===
                        this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), p.add(this)), p = this.getCrispAdjust(), a.x = p, a.y = (this.baseline ? -this.baselineOffset : 0) + p, a.width = Math.round(this.width), a.height = Math.round(this.height), this.box.attr(v(a, this.deferredAttr)), this.deferredAttr = {})
                };
                f.prototype.updateTextPadding = function () {
                    var d = this.text;
                    this.updateBoxSize();
                    var a = this.baseline ? 0 : this.baselineOffset,
                        f = z(this.paddingLeft, this.padding);
                    E(this.widthSetting) && this.bBox &&
                        ("center" === this.textAlign || "right" === this.textAlign) && (f += {
                            center: .5,
                            right: 1
                        }[this.textAlign] * (this.widthSetting - this.bBox.width));
                    if (f !== d.x || a !== d.y) d.attr("x", f), d.hasBoxWidthChanged && (this.bBox = d.getBBox(!0)), "undefined" !== typeof a && d.attr("y", a);
                    d.x = f;
                    d.y = a
                };
                f.prototype.widthSetter = function (d) {
                    this.widthSetting = H(d) ? d : void 0
                };
                f.prototype.getPaddedWidth = function () {
                    var d = this.padding,
                        a = z(this.paddingLeft, d);
                    d = z(this.paddingRight, d);
                    return (this.widthSetting || this.bBox.width || 0) + a + d
                };
                f.prototype.xSetter =
                    function (d) {
                        this.x = d;
                        this.alignFactor && (d -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0);
                        this.xSetting = Math.round(d);
                        this.attr("translateX", this.xSetting)
                    };
                f.prototype.ySetter = function (d) {
                    this.ySetting = this.y = Math.round(d);
                    this.attr("translateY", this.ySetting)
                };
                f.emptyBBox = {
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0
                };
                f.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
                return f
            }(e)
        });
    M(h, "Core/Renderer/SVG/Symbols.js",
        [h["Core/Utilities.js"]],
        function (e) {
            function h(e, q, l, f, d) {
                var a = [];
                if (d) {
                    var p = d.start || 0,
                        k = I(d.r, l);
                    l = I(d.r, f || l);
                    var F = (d.end || 0) - .001;
                    f = d.innerR;
                    var B = I(d.open, .001 > Math.abs((d.end || 0) - p - 2 * Math.PI)),
                        J = Math.cos(p),
                        K = Math.sin(p),
                        h = Math.cos(F),
                        y = Math.sin(F);
                    p = I(d.longArc, .001 > F - p - Math.PI ? 0 : 1);
                    a.push(["M", e + k * J, q + l * K], ["A", k, l, 0, p, I(d.clockwise, 1), e + k * h, q + l * y]);
                    v(f) && a.push(B ? ["M", e + f * h, q + f * y] : ["L", e + f * h, q + f * y], ["A", f, f, 0, p, v(d.clockwise) ? 1 - d.clockwise : 0, e + f * J, q + f * K]);
                    B || a.push(["Z"])
                }
                return a
            }

            function A(e,
                q, l, f, d) {
                return d && d.r ? E(e, q, l, f, d) : [
                    ["M", e, q],
                    ["L", e + l, q],
                    ["L", e + l, q + f],
                    ["L", e, q + f],
                    ["Z"]
                ]
            }

            function E(e, q, l, f, d) {
                d = d && d.r || 0;
                return [
                    ["M", e + d, q],
                    ["L", e + l - d, q],
                    ["C", e + l, q, e + l, q, e + l, q + d],
                    ["L", e + l, q + f - d],
                    ["C", e + l, q + f, e + l, q + f, e + l - d, q + f],
                    ["L", e + d, q + f],
                    ["C", e, q + f, e, q + f, e, q + f - d],
                    ["L", e, q + d],
                    ["C", e, q, e, q, e + d, q]
                ]
            }
            var v = e.defined,
                H = e.isNumber,
                I = e.pick;
            return {
                arc: h,
                callout: function (e, q, l, f, d) {
                    var a = Math.min(d && d.r || 0, l, f),
                        p = a + 6,
                        k = d && d.anchorX;
                    d = d && d.anchorY || 0;
                    var F = E(e, q, l, f, {
                        r: a
                    });
                    if (!H(k)) return F;
                    e + k >= l ?
                        d > q + p && d < q + f - p ? F.splice(3, 1, ["L", e + l, d - 6], ["L", e + l + 6, d], ["L", e + l, d + 6], ["L", e + l, q + f - a]) : F.splice(3, 1, ["L", e + l, f / 2], ["L", k, d], ["L", e + l, f / 2], ["L", e + l, q + f - a]) : 0 >= e + k ? d > q + p && d < q + f - p ? F.splice(7, 1, ["L", e, d + 6], ["L", e - 6, d], ["L", e, d - 6], ["L", e, q + a]) : F.splice(7, 1, ["L", e, f / 2], ["L", k, d], ["L", e, f / 2], ["L", e, q + a]) : d && d > f && k > e + p && k < e + l - p ? F.splice(5, 1, ["L", k + 6, q + f], ["L", k, q + f + 6], ["L", k - 6, q + f], ["L", e + a, q + f]) : d && 0 > d && k > e + p && k < e + l - p && F.splice(1, 1, ["L", k - 6, q], ["L", k, q - 6], ["L", k + 6, q], ["L", l - a, q]);
                    return F
                },
                circle: function (e,
                    q, l, f) {
                    return h(e + l / 2, q + f / 2, l / 2, f / 2, {
                        start: .5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1
                    })
                },
                diamond: function (e, q, l, f) {
                    return [
                        ["M", e + l / 2, q],
                        ["L", e + l, q + f / 2],
                        ["L", e + l / 2, q + f],
                        ["L", e, q + f / 2],
                        ["Z"]
                    ]
                },
                rect: A,
                roundedRect: E,
                square: A,
                triangle: function (e, q, l, f) {
                    return [
                        ["M", e + l / 2, q],
                        ["L", e + l, q + f],
                        ["L", e, q + f],
                        ["Z"]
                    ]
                },
                "triangle-down": function (e, q, l, f) {
                    return [
                        ["M", e, q],
                        ["L", e + l, q],
                        ["L", e + l / 2, q + f],
                        ["Z"]
                    ]
                }
            }
        });
    M(h, "Core/Renderer/SVG/TextBuilder.js", [h["Core/Renderer/HTML/AST.js"], h["Core/Globals.js"], h["Core/Utilities.js"]], function (e,
        h, A) {
        var D = h.doc,
            v = h.SVG_NS,
            H = h.win,
            I = A.attr,
            z = A.isString,
            q = A.objectEach,
            l = A.pick;
        return function () {
            function f(d) {
                var a = d.styles;
                this.renderer = d.renderer;
                this.svgElement = d;
                this.width = d.textWidth;
                this.textLineHeight = a && a.lineHeight;
                this.textOutline = a && a.textOutline;
                this.ellipsis = !(!a || "ellipsis" !== a.textOverflow);
                this.noWrap = !(!a || "nowrap" !== a.whiteSpace);
                this.fontSize = a && a.fontSize
            }
            f.prototype.buildSVG = function () {
                var d = this.svgElement,
                    a = d.element,
                    f = d.renderer,
                    k = l(d.textStr, "").toString(),
                    F = -1 !== k.indexOf("<"),
                    B = a.childNodes;
                f = this.width && !d.added && f.box;
                var J = /<br.*?>/g,
                    K = [k, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                if (K !== d.textCache) {
                    d.textCache = K;
                    delete d.actualWidth;
                    for (K = B.length; K--;) a.removeChild(B[K]);
                    F || this.ellipsis || this.width || -1 !== k.indexOf(" ") && (!this.noWrap || J.test(k)) ? "" !== k && (f && f.appendChild(a), k = new e(k), this.modifyTree(k.nodes), k.addToDOM(d.element), this.modifyDOM(), this.ellipsis && -1 !== (a.textContent || "").indexOf("\u2026") && d.attr("title",
                        this.unescapeEntities(d.textStr || "", ["&lt;", "&gt;"])), f && f.removeChild(a)) : a.appendChild(D.createTextNode(this.unescapeEntities(k)));
                    z(this.textOutline) && d.applyTextOutline && d.applyTextOutline(this.textOutline)
                }
            };
            f.prototype.modifyDOM = function () {
                var d = this,
                    a = this.svgElement,
                    f = I(a.element, "x");
                a.firstLineMetrics = void 0;
                for (var k; k = a.element.firstChild;)
                    if (/^[\s\u200B]*$/.test(k.textContent || " ")) a.element.removeChild(k);
                    else break;
                [].forEach.call(a.element.querySelectorAll("tspan.highcharts-br"), function (k,
                    p) {
                    k.nextSibling && k.previousSibling && (0 === p && 1 === k.previousSibling.nodeType && (a.firstLineMetrics = a.renderer.fontMetrics(void 0, k.previousSibling)), I(k, {
                        dy: d.getLineHeight(k.nextSibling),
                        x: f
                    }))
                });
                var e = this.width || 0;
                if (e) {
                    var B = function (k, p) {
                        var y = k.textContent || "",
                            C = y.replace(/([^\^])-/g, "$1- ").split(" "),
                            x = !d.noWrap && (1 < C.length || 1 < a.element.childNodes.length),
                            c = d.getLineHeight(p),
                            t = 0,
                            g = a.actualWidth;
                        if (d.ellipsis) y && d.truncate(k, y, void 0, 0, Math.max(0, e - parseInt(d.fontSize || 12, 10)), function (c, g) {
                            return c.substring(0,
                                g) + "\u2026"
                        });
                        else if (x) {
                            y = [];
                            for (x = []; p.firstChild && p.firstChild !== k;) x.push(p.firstChild), p.removeChild(p.firstChild);
                            for (; C.length;) C.length && !d.noWrap && 0 < t && (y.push(k.textContent || ""), k.textContent = C.join(" ").replace(/- /g, "-")), d.truncate(k, void 0, C, 0 === t ? g || 0 : 0, e, function (c, g) {
                                return C.slice(0, g).join(" ").replace(/- /g, "-")
                            }), g = a.actualWidth, t++;
                            x.forEach(function (c) {
                                p.insertBefore(c, k)
                            });
                            y.forEach(function (g) {
                                p.insertBefore(D.createTextNode(g), k);
                                g = D.createElementNS(v, "tspan");
                                g.textContent =
                                    "\u200b";
                                I(g, {
                                    dy: c,
                                    x: f
                                });
                                p.insertBefore(g, k)
                            })
                        }
                    },
                        l = function (d) {
                            [].slice.call(d.childNodes).forEach(function (f) {
                                f.nodeType === H.Node.TEXT_NODE ? B(f, d) : (-1 !== f.className.baseVal.indexOf("highcharts-br") && (a.actualWidth = 0), l(f))
                            })
                        };
                    l(a.element)
                }
            };
            f.prototype.getLineHeight = function (d) {
                var a;
                d = d.nodeType === H.Node.TEXT_NODE ? d.parentElement : d;
                this.renderer.styledMode || (a = d && /(px|em)$/.test(d.style.fontSize) ? d.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(),
                    10) : this.renderer.fontMetrics(a, d || this.svgElement.element).h
            };
            f.prototype.modifyTree = function (d) {
                var a = this,
                    f = function (k, p) {
                        var B = k.tagName,
                            e = a.renderer.styledMode,
                            l = k.attributes || {};
                        if ("b" === B || "strong" === B) e ? l["class"] = "highcharts-strong" : l.style = "font-weight:bold;" + (l.style || "");
                        else if ("i" === B || "em" === B) e ? l["class"] = "highcharts-emphasized" : l.style = "font-style:italic;" + (l.style || "");
                        z(l.style) && (l.style = l.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
                        "br" === B && (l["class"] = "highcharts-br", k.textContent =
                            "\u200b", (p = d[p + 1]) && p.textContent && (p.textContent = p.textContent.replace(/^ +/gm, "")));
                        "#text" !== B && "a" !== B && (k.tagName = "tspan");
                        k.attributes = l;
                        k.children && k.children.filter(function (a) {
                            return "#text" !== a.tagName
                        }).forEach(f)
                    };
                d.forEach(f)
            };
            f.prototype.truncate = function (d, a, f, k, l, B) {
                var p = this.svgElement,
                    e = p.renderer,
                    F = p.rotation,
                    y = [],
                    C = f ? 1 : 0,
                    x = (a || f || "").length,
                    c = x,
                    t, g = function (c, b) {
                        b = b || c;
                        var g = d.parentNode;
                        if (g && "undefined" === typeof y[b])
                            if (g.getSubStringLength) try {
                                y[b] = k + g.getSubStringLength(0,
                                    f ? b + 1 : b)
                            } catch (G) {
                                ""
                            } else e.getSpanWidth && (d.textContent = B(a || f, c), y[b] = k + e.getSpanWidth(p, d));
                        return y[b]
                    };
                p.rotation = 0;
                var u = g(d.textContent.length);
                if (k + u > l) {
                    for (; C <= x;) c = Math.ceil((C + x) / 2), f && (t = B(f, c)), u = g(c, t && t.length - 1), C === x ? C = x + 1 : u > l ? x = c - 1 : C = c;
                    0 === x ? d.textContent = "" : a && x === a.length - 1 || (d.textContent = t || B(a || f, c))
                }
                f && f.splice(0, c);
                p.actualWidth = u;
                p.rotation = F
            };
            f.prototype.unescapeEntities = function (d, a) {
                q(this.renderer.escapes, function (f, k) {
                    a && -1 !== a.indexOf(f) || (d = d.toString().replace(new RegExp(f,
                        "g"), k))
                });
                return d
            };
            return f
        }()
    });
    M(h, "Core/Renderer/SVG/SVGRenderer.js", [h["Core/Renderer/HTML/AST.js"], h["Core/Color/Color.js"], h["Core/Globals.js"], h["Core/Renderer/RendererRegistry.js"], h["Core/Renderer/SVG/SVGElement.js"], h["Core/Renderer/SVG/SVGLabel.js"], h["Core/Renderer/SVG/Symbols.js"], h["Core/Renderer/SVG/TextBuilder.js"], h["Core/Utilities.js"]], function (e, h, A, E, v, H, I, z, q) {
        var l = A.charts,
            f = A.deg2rad,
            d = A.doc,
            a = A.isFirefox,
            p = A.isMS,
            k = A.isWebKit,
            F = A.noop,
            B = A.SVG_NS,
            J = A.symbolSizes,
            K = A.win,
            L = q.addEvent,
            y = q.attr,
            C = q.createElement,
            x = q.css,
            c = q.defined,
            t = q.destroyObjectProperties,
            g = q.extend,
            u = q.isArray,
            n = q.isNumber,
            b = q.isObject,
            r = q.isString,
            G = q.merge,
            m = q.pick,
            w = q.pInt,
            N = q.uniqueKey,
            X;
        A = function () {
            function P(b, c, g, m, n, a, r) {
                this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                this.init(b, c, g, m, n, a, r)
            }
            P.prototype.init = function (b, c, g, m, n,
                r, u) {
                var O = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }),
                    w = O.element;
                u || O.css(this.getStyle(m));
                b.appendChild(w);
                y(b, "dir", "ltr"); - 1 === b.innerHTML.indexOf("xmlns") && y(w, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = w;
                this.boxWrapper = O;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
             //   this.createElement("desc").add().element.appendChild(d.createTextNode("Created with Highcharts 9.3.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = r;
                this.forExport = n;
                this.styledMode =
                    u;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(c, g, !1);
                var P;
                a && b.getBoundingClientRect && (c = function () {
                    x(b, {
                        left: 0,
                        top: 0
                    });
                    P = b.getBoundingClientRect();
                    x(b, {
                        left: Math.ceil(P.left) - P.left + "px",
                        top: Math.ceil(P.top) - P.top + "px"
                    })
                }, c(), this.unSubPixelFix = L(K, "resize", c))
            };
            P.prototype.definition = function (b) {
                return (new e([b])).addToDOM(this.defs.element)
            };
            P.prototype.getReferenceURL = function () {
                if ((a || k) && d.getElementsByTagName("base").length) {
                    if (!c(X)) {
                        var b = N();
                        b = (new e([{
                            tagName: "svg",
                            attributes: {
                                width: 8,
                                height: 8
                            },
                            children: [{
                                tagName: "defs",
                                children: [{
                                    tagName: "clipPath",
                                    attributes: {
                                        id: b
                                    },
                                    children: [{
                                        tagName: "rect",
                                        attributes: {
                                            width: 4,
                                            height: 4
                                        }
                                    }]
                                }]
                            }, {
                                tagName: "rect",
                                attributes: {
                                    id: "hitme",
                                    width: 8,
                                    height: 8,
                                    "clip-path": "url(#" + b + ")",
                                    fill: "rgba(0,0,0,0.001)"
                                }
                            }]
                        }])).addToDOM(d.body);
                        x(b, {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 9E5
                        });
                        var g = d.elementFromPoint(6, 6);
                        X = "hitme" === (g && g.id);
                        d.body.removeChild(b)
                    }
                    if (X) return K.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g,
                        "\\$1").replace(/ /g, "%20")
                }
                return ""
            };
            P.prototype.getStyle = function (b) {
                return this.style = g({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, b)
            };
            P.prototype.setStyle = function (b) {
                this.boxWrapper.css(this.getStyle(b))
            };
            P.prototype.isHidden = function () {
                return !this.boxWrapper.getBBox().width
            };
            P.prototype.destroy = function () {
                var b = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                t(this.gradients || {});
                this.gradients = null;
                b && (this.defs = b.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            };
            P.prototype.createElement = function (b) {
                var c = new this.Element;
                c.init(this, b);
                return c
            };
            P.prototype.getRadialAttr = function (b, c) {
                return {
                    cx: b[0] - b[2] / 2 + (c.cx || 0) * b[2],
                    cy: b[1] - b[2] / 2 + (c.cy || 0) * b[2],
                    r: (c.r || 0) * b[2]
                }
            };
            P.prototype.buildText = function (b) {
                (new z(b)).buildSVG()
            };
            P.prototype.getContrast = function (b) {
                b = h.parse(b).rgba;
                b[0] *= 1;
                b[1] *= 1.2;
                b[2] *= .5;
                return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
            };
            P.prototype.button = function (b, c,
                m, n, a, r, u, d, w, P) {
                var t = this.label(b, c, m, w, void 0, void 0, P, void 0, "button"),
                    x = this.styledMode,
                    O = 0,
                    f = a ? G(a) : {};
                b = f && f.style || {};
                f = e.filterUserAttributes(f);
                t.attr(G({
                    padding: 8,
                    r: 2
                }, f));
                if (!x) {
                    f = G({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, {
                        style: b
                    }, f);
                    var Q = f.style;
                    delete f.style;
                    r = G(f, {
                        fill: "#e6e6e6"
                    }, e.filterUserAttributes(r || {}));
                    var C = r.style;
                    delete r.style;
                    u = G(f, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, e.filterUserAttributes(u || {}));
                    var k = u.style;
                    delete u.style;
                    d = G(f, {
                        style: {
                            color: "#cccccc"
                        }
                    }, e.filterUserAttributes(d || {}));
                    var W = d.style;
                    delete d.style
                }
                L(t.element, p ? "mouseover" : "mouseenter", function () {
                    3 !== O && t.setState(1)
                });
                L(t.element, p ? "mouseout" : "mouseleave", function () {
                    3 !== O && t.setState(O)
                });
                t.setState = function (b) {
                    1 !== b && (t.state = O = b);
                    t.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
                    x || t.attr([f, r, u, d][b || 0]).css([Q, C, k, W][b ||
                        0
                    ])
                };
                x || t.attr(f).css(g({
                    cursor: "default"
                }, Q));
                return t.on("touchstart", function (b) {
                    return b.stopPropagation()
                }).on("click", function (b) {
                    3 !== O && n.call(t, b)
                })
            };
            P.prototype.crispLine = function (b, g, m) {
                void 0 === m && (m = "round");
                var n = b[0],
                    r = b[1];
                c(n[1]) && n[1] === r[1] && (n[1] = r[1] = Math[m](n[1]) - g % 2 / 2);
                c(n[2]) && n[2] === r[2] && (n[2] = r[2] = Math[m](n[2]) + g % 2 / 2);
                return b
            };
            P.prototype.path = function (c) {
                var m = this.styledMode ? {} : {
                    fill: "none"
                };
                u(c) ? m.d = c : b(c) && g(m, c);
                return this.createElement("path").attr(m)
            };
            P.prototype.circle =
                function (c, g, m) {
                    c = b(c) ? c : "undefined" === typeof c ? {} : {
                        x: c,
                        y: g,
                        r: m
                    };
                    g = this.createElement("circle");
                    g.xSetter = g.ySetter = function (b, c, g) {
                        g.setAttribute("c" + c, b)
                    };
                    return g.attr(c)
                };
            P.prototype.arc = function (c, g, m, n, r, a) {
                b(c) ? (n = c, g = n.y, m = n.r, c = n.x) : n = {
                    innerR: n,
                    start: r,
                    end: a
                };
                c = this.symbol("arc", c, g, m, m, n);
                c.r = m;
                return c
            };
            P.prototype.rect = function (c, g, m, n, r, a) {
                r = b(c) ? c.r : r;
                var u = this.createElement("rect");
                c = b(c) ? c : "undefined" === typeof c ? {} : {
                    x: c,
                    y: g,
                    width: Math.max(m, 0),
                    height: Math.max(n, 0)
                };
                this.styledMode ||
                    ("undefined" !== typeof a && (c["stroke-width"] = a, c = u.crisp(c)), c.fill = "none");
                r && (c.r = r);
                u.rSetter = function (b, c, g) {
                    u.r = b;
                    y(g, {
                        rx: b,
                        ry: b
                    })
                };
                u.rGetter = function () {
                    return u.r || 0
                };
                return u.attr(c)
            };
            P.prototype.setSize = function (b, c, g) {
                this.width = b;
                this.height = c;
                this.boxWrapper.animate({
                    width: b,
                    height: c
                }, {
                    step: function () {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: m(g, !0) ? void 0 : 0
                });
                this.alignElements()
            };
            P.prototype.g = function (b) {
                var c = this.createElement("g");
                return b ? c.attr({
                    "class": "highcharts-" +
                        b
                }) : c
            };
            P.prototype.image = function (b, c, g, m, r, a) {
                var u = {
                    preserveAspectRatio: "none"
                },
                    d = function (b, c) {
                        b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", c) : b.setAttribute("hc-svg-href", c)
                    };
                n(c) && (u.x = c);
                n(g) && (u.y = g);
                n(m) && (u.width = m);
                n(r) && (u.height = r);
                var w = this.createElement("image").attr(u);
                c = function (c) {
                    d(w.element, b);
                    a.call(w, c)
                };
                a ? (d(w.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), g = new K.Image, L(g, "load", c), g.src = b, g.complete && c({})) :
                    d(w.element, b);
                return w
            };
            P.prototype.symbol = function (b, n, r, a, u, w) {
                var t = this,
                    P = /^url\((.*?)\)$/,
                    G = P.test(b),
                    f = !G && (this.symbols[b] ? b : "circle"),
                    O = f && this.symbols[f],
                    Q;
                if (O) {
                    "number" === typeof n && (Q = O.call(this.symbols, Math.round(n || 0), Math.round(r || 0), a || 0, u || 0, w));
                    var k = this.path(Q);
                    t.styledMode || k.attr("fill", "none");
                    g(k, {
                        symbolName: f || void 0,
                        x: n,
                        y: r,
                        width: a,
                        height: u
                    });
                    w && g(k, w)
                } else if (G) {
                    var p = b.match(P)[1];
                    var y = k = this.image(p);
                    y.imgwidth = m(J[p] && J[p].width, w && w.width);
                    y.imgheight = m(J[p] && J[p].height,
                        w && w.height);
                    var e = function (b) {
                        return b.attr({
                            width: b.width,
                            height: b.height
                        })
                    };
                    ["width", "height"].forEach(function (b) {
                        y[b + "Setter"] = function (b, g) {
                            var m = this["img" + g];
                            this[g] = b;
                            c(m) && (w && "within" === w.backgroundSize && this.width && this.height && (m = Math.round(m * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(g, m), this.alignByTranslate || (b = ((this[g] || 0) - m) / 2, this.attr("width" === g ? {
                                translateX: b
                            } : {
                                translateY: b
                            })))
                        }
                    });
                    c(n) && y.attr({
                        x: n,
                        y: r
                    });
                    y.isImg = !0;
                    c(y.imgwidth) && c(y.imgheight) ? e(y) : (y.attr({
                        width: 0,
                        height: 0
                    }), C("img", {
                        onload: function () {
                            var b = l[t.chartIndex];
                            0 === this.width && (x(this, {
                                position: "absolute",
                                top: "-999em"
                            }), d.body.appendChild(this));
                            J[p] = {
                                width: this.width,
                                height: this.height
                            };
                            y.imgwidth = this.width;
                            y.imgheight = this.height;
                            y.element && e(y);
                            this.parentNode && this.parentNode.removeChild(this);
                            t.imgCount--;
                            if (!t.imgCount && b && !b.hasLoaded) b.onload()
                        },
                        src: p
                    }), this.imgCount++)
                }
                return k
            };
            P.prototype.clipRect = function (b, c, g, m) {
                var n = N() + "-",
                    r =
                        this.createElement("clipPath").attr({
                            id: n
                        }).add(this.defs);
                b = this.rect(b, c, g, m, 0).add(r);
                b.id = n;
                b.clipPath = r;
                b.count = 0;
                return b
            };
            P.prototype.text = function (b, g, m, n) {
                var r = {};
                if (n && (this.allowHTML || !this.forExport)) return this.html(b, g, m);
                r.x = Math.round(g || 0);
                m && (r.y = Math.round(m));
                c(b) && (r.text = b);
                b = this.createElement("text").attr(r);
                if (!n || this.forExport && !this.allowHTML) b.xSetter = function (b, c, g) {
                    for (var m = g.getElementsByTagName("tspan"), n = g.getAttribute(c), r = 0, a; r < m.length; r++) a = m[r], a.getAttribute(c) ===
                        n && a.setAttribute(c, b);
                    g.setAttribute(c, b)
                };
                return b
            };
            P.prototype.fontMetrics = function (b, c) {
                b = !this.styledMode && /px/.test(b) || !K.getComputedStyle ? b || c && c.style && c.style.fontSize || this.style && this.style.fontSize : c && v.prototype.getStyle.call(c, "font-size");
                b = /px/.test(b) ? w(b) : 12;
                c = 24 > b ? b + 3 : Math.round(1.2 * b);
                return {
                    h: c,
                    b: Math.round(.8 * c),
                    f: b
                }
            };
            P.prototype.rotCorr = function (b, c, g) {
                var m = b;
                c && g && (m = Math.max(m * Math.cos(c * f), 4));
                return {
                    x: -b / 3 * Math.sin(c * f),
                    y: m
                }
            };
            P.prototype.pathToSegments = function (b) {
                for (var c = [], g = [], m = {
                    A: 8,
                    C: 7,
                    H: 2,
                    L: 3,
                    M: 3,
                    Q: 5,
                    S: 5,
                    T: 3,
                    V: 2
                }, a = 0; a < b.length; a++) r(g[0]) && n(b[a]) && g.length === m[g[0].toUpperCase()] && b.splice(a, 0, g[0].replace("M", "L").replace("m", "l")), "string" === typeof b[a] && (g.length && c.push(g.slice(0)), g.length = 0), g.push(b[a]);
                c.push(g.slice(0));
                return c
            };
            P.prototype.label = function (b, c, g, m, n, r, a, u, d) {
                return new H(this, b, c, g, m, n, r, a, u, d)
            };
            P.prototype.alignElements = function () {
                this.alignedObjects.forEach(function (b) {
                    return b.align()
                })
            };
            return P
        }();
        g(A.prototype, {
            Element: v,
            SVG_NS: B,
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            symbols: I,
            draw: F
        });
        E.registerRendererType("svg", A, !0);
        "";
        return A
    });
    M(h, "Core/Renderer/HTML/HTMLElement.js", [h["Core/Globals.js"], h["Core/Renderer/SVG/SVGElement.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = this && this.__extends || function () {
            var a = function (d, f) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                    };
                return a(d, f)
            };
            return function (d,
                f) {
                function k() {
                    this.constructor = d
                }
                a(d, f);
                d.prototype = null === f ? Object.create(f) : (k.prototype = f.prototype, new k)
            }
        }(),
            v = e.isFirefox,
            H = e.isMS,
            I = e.isWebKit,
            z = e.win,
            q = A.css,
            l = A.defined,
            f = A.extend,
            d = A.pick,
            a = A.pInt;
        return function (p) {
            function k() {
                return null !== p && p.apply(this, arguments) || this
            }
            D(k, p);
            k.compose = function (a) {
                if (-1 === k.composedClasses.indexOf(a)) {
                    k.composedClasses.push(a);
                    var d = k.prototype,
                        f = a.prototype;
                    f.getSpanCorrection = d.getSpanCorrection;
                    f.htmlCss = d.htmlCss;
                    f.htmlGetBBox = d.htmlGetBBox;
                    f.htmlUpdateTransform = d.htmlUpdateTransform;
                    f.setSpanRotation = d.setSpanRotation
                }
                return a
            };
            k.prototype.getSpanCorrection = function (a, d, f) {
                this.xCorr = -a * f;
                this.yCorr = -d
            };
            k.prototype.htmlCss = function (a) {
                var k = "SPAN" === this.element.tagName && a && "width" in a,
                    p = d(k && a.width, void 0);
                if (k) {
                    delete a.width;
                    this.textWidth = p;
                    var l = !0
                }
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = f(this.styles, a);
                q(this.element, a);
                l && this.htmlUpdateTransform();
                return this
            };
            k.prototype.htmlGetBBox =
                function () {
                    var a = this.element;
                    return {
                        x: a.offsetLeft,
                        y: a.offsetTop,
                        width: a.offsetWidth,
                        height: a.offsetHeight
                    }
                };
            k.prototype.htmlUpdateTransform = function () {
                if (this.added) {
                    var d = this.renderer,
                        f = this.element,
                        k = this.translateX || 0,
                        p = this.translateY || 0,
                        e = this.x || 0,
                        y = this.y || 0,
                        C = this.textAlign || "left",
                        x = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[C],
                        c = this.styles;
                    c = c && c.whiteSpace;
                    q(f, {
                        marginLeft: k,
                        marginTop: p
                    });
                    !d.styledMode && this.shadows && this.shadows.forEach(function (b) {
                        q(b, {
                            marginLeft: k + 1,
                            marginTop: p + 1
                        })
                    });
                    this.inverted && [].forEach.call(f.childNodes, function (b) {
                        d.invertChild(b, f)
                    });
                    if ("SPAN" === f.tagName) {
                        var t = this.rotation,
                            g = this.textWidth && a(this.textWidth),
                            u = [t, C, f.innerHTML, this.textWidth, this.textAlign].join(),
                            n = void 0;
                        n = !1;
                        if (g !== this.oldTextWidth) {
                            if (this.textPxLength) var b = this.textPxLength;
                            else q(f, {
                                width: "",
                                whiteSpace: c || "nowrap"
                            }), b = f.offsetWidth;
                            (g > this.oldTextWidth || b > g) && (/[ \-]/.test(f.textContent || f.innerText) || "ellipsis" === f.style.textOverflow) && (q(f, {
                                width: b > g || t ? g + "px" : "auto",
                                display: "block",
                                whiteSpace: c ||
                                    "normal"
                            }), this.oldTextWidth = g, n = !0)
                        }
                        this.hasBoxWidthChanged = n;
                        u !== this.cTT && (n = d.fontMetrics(f.style.fontSize, f).b, !l(t) || t === (this.oldRotation || 0) && C === this.oldAlign || this.setSpanRotation(t, x, n), this.getSpanCorrection(!l(t) && this.textPxLength || f.offsetWidth, n, x, t, C));
                        q(f, {
                            left: e + (this.xCorr || 0) + "px",
                            top: y + (this.yCorr || 0) + "px"
                        });
                        this.cTT = u;
                        this.oldRotation = t;
                        this.oldAlign = C
                    }
                } else this.alignOnAdd = !0
            };
            k.prototype.setSpanRotation = function (a, d, f) {
                var k = {},
                    p = H && !/Edge/.test(z.navigator.userAgent) ? "-ms-transform" :
                        I ? "-webkit-transform" : v ? "MozTransform" : z.opera ? "-o-transform" : void 0;
                p && (k[p] = k.transform = "rotate(" + a + "deg)", k[p + (v ? "Origin" : "-origin")] = k.transformOrigin = 100 * d + "% " + f + "px", q(this.element, k))
            };
            k.composedClasses = [];
            return k
        }(h)
    });
    M(h, "Core/Renderer/HTML/HTMLRenderer.js", [h["Core/Renderer/HTML/AST.js"], h["Core/Renderer/SVG/SVGElement.js"], h["Core/Renderer/SVG/SVGRenderer.js"], h["Core/Utilities.js"]], function (e, h, A, E) {
        var v = this && this.__extends || function () {
            var l = function (f, d) {
                l = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                    };
                return l(f, d)
            };
            return function (f, d) {
                function a() {
                    this.constructor = f
                }
                l(f, d);
                f.prototype = null === d ? Object.create(d) : (a.prototype = d.prototype, new a)
            }
        }(),
            D = E.attr,
            I = E.createElement,
            z = E.extend,
            q = E.pick;
        return function (l) {
            function f() {
                return null !== l && l.apply(this, arguments) || this
            }
            v(f, l);
            f.compose = function (d) {
                -1 === f.composedClasses.indexOf(d) && (f.composedClasses.push(d), d.prototype.html =
                    f.prototype.html);
                return d
            };
            f.prototype.html = function (d, a, f) {
                var k = this.createElement("span"),
                    p = k.element,
                    l = k.renderer,
                    J = l.isSVG,
                    K = function (a, d) {
                        ["opacity", "visibility"].forEach(function (f) {
                            a[f + "Setter"] = function (x, c, t) {
                                var g = a.div ? a.div.style : d;
                                h.prototype[f + "Setter"].call(this, x, c, t);
                                g && (g[c] = x)
                            }
                        });
                        a.addedSetters = !0
                    };
                k.textSetter = function (a) {
                    a !== this.textStr && (delete this.bBox, delete this.oldTextWidth, e.setElementHTML(this.element, q(a, "")), this.textStr = a, k.doTransform = !0)
                };
                J && K(k, k.element.style);
                k.xSetter = k.ySetter = k.alignSetter = k.rotationSetter = function (a, d) {
                    "align" === d ? k.alignValue = k.textAlign = a : k[d] = a;
                    k.doTransform = !0
                };
                k.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                k.attr({
                    text: d,
                    x: Math.round(a),
                    y: Math.round(f)
                }).css({
                    position: "absolute"
                });
                l.styledMode || k.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                p.style.whiteSpace = "nowrap";
                k.css = k.htmlCss;
                J && (k.add = function (a) {
                    var d = l.box.parentNode,
                        f = [];
                    if (this.parentGroup = a) {
                        var x =
                            a.div;
                        if (!x) {
                            for (; a;) f.push(a), a = a.parentGroup;
                            f.reverse().forEach(function (c) {
                                function a(b, g) {
                                    c[g] = b;
                                    "translateX" === g ? n.left = b + "px" : n.top = b + "px";
                                    c.doTransform = !0
                                }
                                var g = D(c.element, "class"),
                                    u = c.styles || {};
                                x = c.div = c.div || I("div", g ? {
                                    className: g
                                } : void 0, {
                                    position: "absolute",
                                    left: (c.translateX || 0) + "px",
                                    top: (c.translateY || 0) + "px",
                                    display: c.display,
                                    opacity: c.opacity,
                                    cursor: u.cursor,
                                    pointerEvents: u.pointerEvents,
                                    visibility: c.visibility
                                }, x || d);
                                var n = x.style;
                                z(c, {
                                    classSetter: function (b) {
                                        return function (c) {
                                            this.element.setAttribute("class",
                                                c);
                                            b.className = c
                                        }
                                    }(x),
                                    on: function () {
                                        f[0].div && k.on.apply({
                                            element: f[0].div,
                                            onEvents: c.onEvents
                                        }, arguments);
                                        return c
                                    },
                                    translateXSetter: a,
                                    translateYSetter: a
                                });
                                c.addedSetters || K(c)
                            })
                        }
                    } else x = d;
                    x.appendChild(p);
                    k.added = !0;
                    k.alignOnAdd && k.htmlUpdateTransform();
                    return k
                });
                return k
            };
            f.composedClasses = [];
            return f
        }(A)
    });
    M(h, "Core/Axis/AxisDefaults.js", [], function () {
        var e;
        (function (e) {
            e.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                gridLineDashStyle: "Solid",
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: "justify",
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorGridLineDashStyle: "Solid",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    rotation: 0,
                    useHTML: !1,
                    x: 0,
                    y: 0,
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                gridLineWidth: void 0,
                tickColor: "#ccd6eb"
            };
            e.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var e = this.axis.chart.numberFormatter;
                        return e(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            e.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            e.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            e.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            e.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }
        })(e || (e = {}));
        return e
    });
    M(h, "Core/Foundation.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.addEvent,
            A = e.isFunction,
            E = e.objectEach,
            v = e.removeEvent,
            H;
        (function (e) {
            e.registerEventOptions = function (e, q) {
                e.eventOptions = e.eventOptions || {};
                E(q.events, function (l, f) {
                    e.eventOptions[f] !== l && (e.eventOptions[f] && (v(e, f, e.eventOptions[f]), delete e.eventOptions[f]), A(l) && (e.eventOptions[f] = l, h(e, f, l)))
                })
            }
        })(H || (H = {}));
        return H
    });
    M(h, "Core/Axis/Tick.js", [h["Core/FormatUtilities.js"], h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = h.deg2rad,
            v = A.clamp,
            H = A.correctFloat,
            I = A.defined,
            z = A.destroyObjectProperties,
            q = A.extend,
            l = A.fireEvent,
            f = A.isNumber,
            d = A.merge,
            a = A.objectEach,
            p = A.pick;
        h = function () {
            function k(a, d, f, k, e) {
                this.isNewLabel = this.isNew = !0;
                this.axis = a;
                this.pos = d;
                this.type = f || "";
                this.parameters = e || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                l(this, "init");
                f || k || this.addLabel()
            }
            k.prototype.addLabel = function () {
                var a = this,
                    d = a.axis,
                    k = d.options,
                    h = d.chart,
                    L = d.categories,
                    y = d.logarithmic,
                    C = d.names,
                    x = a.pos,
                    c = p(a.options && a.options.labels, k.labels),
                    t = d.tickPositions,
                    g = x === t[0],
                    u = x === t[t.length - 1],
                    n =
                        (!c.step || 1 === c.step) && 1 === d.tickInterval;
                t = t.info;
                var b = a.label,
                    r;
                L = this.parameters.category || (L ? p(L[x], C[x], x) : x);
                y && f(L) && (L = H(y.lin2log(L)));
                if (d.dateTime)
                    if (t) {
                        var G = h.time.resolveDTLFormat(k.dateTimeLabelFormats[!k.grid && t.higherRanks[x] || t.unitName]);
                        var m = G.main
                    } else f(L) && (m = d.dateTime.getXDateFormat(L, k.dateTimeLabelFormats || {}));
                a.isFirst = g;
                a.isLast = u;
                var w = {
                    axis: d,
                    chart: h,
                    dateTimeLabelFormat: m,
                    isFirst: g,
                    isLast: u,
                    pos: x,
                    tick: a,
                    tickPositionInfo: t,
                    value: L
                };
                l(this, "labelFormat", w);
                var N = function (b) {
                    return c.formatter ?
                        c.formatter.call(b, b) : c.format ? (b.text = d.defaultLabelFormatter.call(b), e.format(c.format, b, h)) : d.defaultLabelFormatter.call(b, b)
                };
                k = N.call(w, w);
                var X = G && G.list;
                a.shortenLabel = X ? function () {
                    for (r = 0; r < X.length; r++)
                        if (q(w, {
                            dateTimeLabelFormat: X[r]
                        }), b.attr({
                            text: N.call(w, w)
                        }), b.getBBox().width < d.getSlotWidth(a) - 2 * c.padding) return;
                    b.attr({
                        text: ""
                    })
                } : void 0;
                n && d._addedPlotLB && a.moveLabel(k, c);
                I(b) || a.movedLabel ? b && b.textStr !== k && !n && (!b.textWidth || c.style.width || b.styles.width || b.css({
                    width: null
                }), b.attr({
                    text: k
                }),
                    b.textPxLength = b.getBBox().width) : (a.label = b = a.createLabel({
                        x: 0,
                        y: 0
                    }, k, c), a.rotation = 0)
            };
            k.prototype.createLabel = function (a, f, k) {
                var e = this.axis,
                    p = e.chart;
                if (a = I(f) && k.enabled ? p.renderer.text(f, a.x, a.y, k.useHTML).add(e.labelGroup) : null) p.styledMode || a.css(d(k.style)), a.textPxLength = a.getBBox().width;
                return a
            };
            k.prototype.destroy = function () {
                z(this, this.axis)
            };
            k.prototype.getPosition = function (a, d, f, k) {
                var e = this.axis,
                    p = e.chart,
                    C = k && p.oldChartHeight || p.chartHeight;
                a = {
                    x: a ? H(e.translate(d + f, null, null,
                        k) + e.transB) : e.left + e.offset + (e.opposite ? (k && p.oldChartWidth || p.chartWidth) - e.right - e.left : 0),
                    y: a ? C - e.bottom + e.offset - (e.opposite ? e.height : 0) : H(C - e.translate(d + f, null, null, k) - e.transB)
                };
                a.y = v(a.y, -1E5, 1E5);
                l(this, "afterGetPosition", {
                    pos: a
                });
                return a
            };
            k.prototype.getLabelPosition = function (a, d, f, k, e, p, C, x) {
                var c = this.axis,
                    t = c.transA,
                    g = c.isLinked && c.linkedParent ? c.linkedParent.reversed : c.reversed,
                    u = c.staggerLines,
                    n = c.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    b = k || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ?
                        .5 : 1),
                    r = {},
                    G = e.y;
                I(G) || (G = 0 === c.side ? f.rotation ? -8 : -f.getBBox().height : 2 === c.side ? n.y + 8 : Math.cos(f.rotation * D) * (n.y - f.getBBox(!1, 0).height / 2));
                a = a + e.x + b + n.x - (p && k ? p * t * (g ? -1 : 1) : 0);
                d = d + G - (p && !k ? p * t * (g ? 1 : -1) : 0);
                u && (f = C / (x || 1) % u, c.opposite && (f = u - f - 1), d += c.labelOffset / u * f);
                r.x = a;
                r.y = Math.round(d);
                l(this, "afterGetLabelPosition", {
                    pos: r,
                    tickmarkOffset: p,
                    index: C
                });
                return r
            };
            k.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            k.prototype.getMarkPath =
                function (a, d, f, k, e, p) {
                    return p.crispLine([
                        ["M", a, d],
                        ["L", a + (e ? 0 : -f), d + (e ? f : 0)]
                    ], k)
                };
            k.prototype.handleOverflow = function (a) {
                var d = this.axis,
                    f = d.options.labels,
                    k = a.x,
                    e = d.chart.chartWidth,
                    l = d.chart.spacing,
                    C = p(d.labelLeft, Math.min(d.pos, l[3]));
                l = p(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, e - l[1]));
                var x = this.label,
                    c = this.rotation,
                    t = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[d.labelAlign || x.attr("align")],
                    g = x.getBBox().width,
                    u = d.getSlotWidth(this),
                    n = {},
                    b = u,
                    r = 1,
                    G;
                if (c || "justify" !== f.overflow) 0 > c && k - t * g < C ? G = Math.round(k /
                    Math.cos(c * D) - C) : 0 < c && k + t * g > l && (G = Math.round((e - k) / Math.cos(c * D)));
                else if (e = k + (1 - t) * g, k - t * g < C ? b = a.x + b * (1 - t) - C : e > l && (b = l - a.x + b * t, r = -1), b = Math.min(u, b), b < u && "center" === d.labelAlign && (a.x += r * (u - b - t * (u - Math.min(g, b)))), g > b || d.autoRotation && (x.styles || {}).width) G = b;
                G && (this.shortenLabel ? this.shortenLabel() : (n.width = Math.floor(G) + "px", (f.style || {}).textOverflow || (n.textOverflow = "ellipsis"), x.css(n)))
            };
            k.prototype.moveLabel = function (d, f) {
                var k = this,
                    e = k.label,
                    p = k.axis,
                    l = p.reversed,
                    C = !1;
                e && e.textStr === d ?
                    (k.movedLabel = e, C = !0, delete k.label) : a(p.ticks, function (c) {
                        C || c.isNew || c === k || !c.label || c.label.textStr !== d || (k.movedLabel = c.label, C = !0, c.labelPos = k.movedLabel.xy, delete c.label)
                    });
                if (!C && (k.labelPos || e)) {
                    var x = k.labelPos || e.xy;
                    e = p.horiz ? l ? 0 : p.width + p.left : x.x;
                    p = p.horiz ? x.y : l ? p.width + p.left : 0;
                    k.movedLabel = k.createLabel({
                        x: e,
                        y: p
                    }, d, f);
                    k.movedLabel && k.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            k.prototype.render = function (a, d, f) {
                var k = this.axis,
                    e = k.horiz,
                    y = this.pos,
                    C = p(this.tickmarkOffset, k.tickmarkOffset);
                y = this.getPosition(e,
                    y, C, d);
                C = y.x;
                var x = y.y;
                k = e && C === k.pos + k.len || !e && x === k.pos ? -1 : 1;
                e = p(f, this.label && this.label.newOpacity, 1);
                f = p(f, 1);
                this.isActive = !0;
                this.renderGridLine(d, f, k);
                this.renderMark(y, f, k);
                this.renderLabel(y, d, e, a);
                this.isNew = !1;
                l(this, "afterRender")
            };
            k.prototype.renderGridLine = function (a, d, f) {
                var k = this.axis,
                    e = k.options,
                    l = {},
                    C = this.pos,
                    x = this.type,
                    c = p(this.tickmarkOffset, k.tickmarkOffset),
                    t = k.chart.renderer,
                    g = this.gridLine,
                    u = e.gridLineWidth,
                    n = e.gridLineColor,
                    b = e.gridLineDashStyle;
                "minor" === this.type &&
                    (u = e.minorGridLineWidth, n = e.minorGridLineColor, b = e.minorGridLineDashStyle);
                g || (k.chart.styledMode || (l.stroke = n, l["stroke-width"] = u || 0, l.dashstyle = b), x || (l.zIndex = 1), a && (d = 0), this.gridLine = g = t.path().attr(l).addClass("highcharts-" + (x ? x + "-" : "") + "grid-line").add(k.gridGroup));
                if (g && (f = k.getPlotLinePath({
                    value: C + c,
                    lineWidth: g.strokeWidth() * f,
                    force: "pass",
                    old: a
                }))) g[a || this.isNew ? "attr" : "animate"]({
                    d: f,
                    opacity: d
                })
            };
            k.prototype.renderMark = function (a, d, f) {
                var k = this.axis,
                    e = k.options,
                    l = k.chart.renderer,
                    C =
                        this.type,
                    x = k.tickSize(C ? C + "Tick" : "tick"),
                    c = a.x;
                a = a.y;
                var t = p(e["minor" !== C ? "tickWidth" : "minorTickWidth"], !C && k.isXAxis ? 1 : 0);
                e = e["minor" !== C ? "tickColor" : "minorTickColor"];
                var g = this.mark,
                    u = !g;
                x && (k.opposite && (x[0] = -x[0]), g || (this.mark = g = l.path().addClass("highcharts-" + (C ? C + "-" : "") + "tick").add(k.axisGroup), k.chart.styledMode || g.attr({
                    stroke: e,
                    "stroke-width": t
                })), g[u ? "attr" : "animate"]({
                    d: this.getMarkPath(c, a, x[0], g.strokeWidth() * f, k.horiz, l),
                    opacity: d
                }))
            };
            k.prototype.renderLabel = function (a, d, k, e) {
                var l =
                    this.axis,
                    y = l.horiz,
                    C = l.options,
                    x = this.label,
                    c = C.labels,
                    t = c.step;
                l = p(this.tickmarkOffset, l.tickmarkOffset);
                var g = a.x;
                a = a.y;
                var u = !0;
                x && f(g) && (x.xy = a = this.getLabelPosition(g, a, x, y, c, l, e, t), this.isFirst && !this.isLast && !C.showFirstLabel || this.isLast && !this.isFirst && !C.showLastLabel ? u = !1 : !y || c.step || c.rotation || d || 0 === k || this.handleOverflow(a), t && e % t && (u = !1), u && f(a.y) ? (a.opacity = k, x[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (x.attr("y", -9999), this.isNewLabel = !0))
            };
            k.prototype.replaceMovedLabel =
                function () {
                    var a = this.label,
                        d = this.axis,
                        f = d.reversed;
                    if (a && !this.isNew) {
                        var k = d.horiz ? f ? d.left : d.width + d.left : a.xy.x;
                        f = d.horiz ? a.xy.y : f ? d.width + d.top : d.top;
                        a.animate({
                            x: k,
                            y: f,
                            opacity: 0
                        }, void 0, a.destroy);
                        delete this.label
                    }
                    d.isDirty = !0;
                    this.label = this.movedLabel;
                    delete this.movedLabel
                };
            return k
        }();
        "";
        return h
    });
    M(h, "Core/Axis/Axis.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Axis/AxisDefaults.js"], h["Core/Color/Color.js"], h["Core/DefaultOptions.js"], h["Core/Foundation.js"], h["Core/Globals.js"],
    h["Core/Axis/Tick.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H, I, z) {
        var q = e.animObject,
            l = E.defaultOptions,
            f = v.registerEventOptions,
            d = H.deg2rad,
            a = z.arrayMax,
            p = z.arrayMin,
            k = z.clamp,
            F = z.correctFloat,
            B = z.defined,
            J = z.destroyObjectProperties,
            K = z.erase,
            L = z.error,
            y = z.extend,
            C = z.fireEvent,
            x = z.getMagnitude,
            c = z.isArray,
            t = z.isNumber,
            g = z.isString,
            u = z.merge,
            n = z.normalizeTickInterval,
            b = z.objectEach,
            r = z.pick,
            G = z.relativeLength,
            m = z.removeEvent,
            w = z.splat,
            N = z.syncTimeout;
        e = function () {
            function e(b, c) {
                this.zoomEnabled =
                    this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength =
                    this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(b, c)
            }
            e.prototype.init = function (b, c) {
                var g = c.isX;
                this.chart = b;
                this.horiz = b.inverted && !this.isZAxis ? !g : g;
                this.isXAxis = g;
                this.coll = this.coll || (g ? "xAxis" : "yAxis");
                C(this, "init", {
                    userOptions: c
                });
                this.opposite = r(c.opposite, this.opposite);
                this.side = r(c.side,
                    this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(c);
                var a = this.options,
                    m = a.labels,
                    n = a.type;
                this.userOptions = c;
                this.minPixelPadding = 0;
                this.reversed = r(a.reversed, this.reversed);
                this.visible = a.visible;
                this.zoomEnabled = a.zoomEnabled;
                this.hasNames = "category" === n || !0 === a.categories;
                this.categories = a.categories || this.hasNames;
                this.names || (this.names = [], this.names.keys = {});
                this.plotLinesAndBandsGroups = {};
                this.positiveValuesOnly = !!this.logarithmic;
                this.isLinked = B(a.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = a.minRange || a.maxZoom;
                this.range = a.range;
                this.offset = a.offset || 0;
                this.min = this.max = null;
                c = r(a.crosshair, w(b.options.tooltip.crosshairs)[g ? 0 : 1]);
                this.crosshair = !0 === c ? {} : c; - 1 === b.axes.indexOf(this) && (g ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this), b[this.coll].push(this));
                this.series = this.series || [];
                b.inverted && !this.isZAxis && g && "undefined" === typeof this.reversed &&
                    (this.reversed = !0);
                this.labelRotation = t(m.rotation) ? m.rotation : void 0;
                f(this, a);
                C(this, "afterInit")
            };
            e.prototype.setOptions = function (b) {
                this.options = u(h.defaultXAxisOptions, "yAxis" === this.coll && h.defaultYAxisOptions, [h.defaultTopAxisOptions, h.defaultRightAxisOptions, h.defaultBottomAxisOptions, h.defaultLeftAxisOptions][this.side], u(l[this.coll], b));
                C(this, "afterSetOptions", {
                    userOptions: b
                })
            };
            e.prototype.defaultLabelFormatter = function (b) {
                var c = this.axis;
                b = this.chart.numberFormatter;
                var g = t(this.value) ?
                    this.value : NaN,
                    a = c.chart.time,
                    m = this.dateTimeLabelFormat,
                    n = l.lang,
                    d = n.numericSymbols;
                n = n.numericSymbolMagnitude || 1E3;
                var r = c.logarithmic ? Math.abs(g) : c.tickInterval,
                    u = d && d.length;
                if (c.categories) var f = "" + this.value;
                else if (m) f = a.dateFormat(m, g);
                else if (u && 1E3 <= r)
                    for (; u-- && "undefined" === typeof f;) c = Math.pow(n, u + 1), r >= c && 0 === 10 * g % c && null !== d[u] && 0 !== g && (f = b(g / c, -1) + d[u]);
                "undefined" === typeof f && (f = 1E4 <= Math.abs(g) ? b(g, -1) : b(g, -1, void 0, ""));
                return f
            };
            e.prototype.getSeriesExtremes = function () {
                var b = this,
                    c = b.chart,
                    g;
                C(this, "getSeriesExtremes", null, function () {
                    b.hasVisibleSeries = !1;
                    b.dataMin = b.dataMax = b.threshold = null;
                    b.softThreshold = !b.isXAxis;
                    b.stacking && b.stacking.buildStacks();
                    b.series.forEach(function (a) {
                        if (a.visible || !c.options.chart.ignoreHiddenSeries) {
                            var m = a.options,
                                n = m.threshold;
                            b.hasVisibleSeries = !0;
                            b.positiveValuesOnly && 0 >= n && (n = null);
                            if (b.isXAxis) {
                                if (m = a.xData, m.length) {
                                    m = b.logarithmic ? m.filter(b.validatePositiveValue) : m;
                                    g = a.getXExtremes(m);
                                    var d = g.min;
                                    var u = g.max;
                                    t(d) || d instanceof Date ||
                                        (m = m.filter(t), g = a.getXExtremes(m), d = g.min, u = g.max);
                                    m.length && (b.dataMin = Math.min(r(b.dataMin, d), d), b.dataMax = Math.max(r(b.dataMax, u), u))
                                }
                            } else if (a = a.applyExtremes(), t(a.dataMin) && (d = a.dataMin, b.dataMin = Math.min(r(b.dataMin, d), d)), t(a.dataMax) && (u = a.dataMax, b.dataMax = Math.max(r(b.dataMax, u), u)), B(n) && (b.threshold = n), !m.softThreshold || b.positiveValuesOnly) b.softThreshold = !1
                        }
                    })
                });
                C(this, "afterGetSeriesExtremes")
            };
            e.prototype.translate = function (b, c, g, a, m, n) {
                var d = this.linkedParent || this,
                    r = a && d.old ?
                        d.old.min : d.min,
                    u = d.minPixelPadding;
                m = (d.isOrdinal || d.brokenAxis && d.brokenAxis.hasBreaks || d.logarithmic && m) && d.lin2val;
                var f = 1,
                    w = 0;
                a = a && d.old ? d.old.transA : d.transA;
                a || (a = d.transA);
                g && (f *= -1, w = d.len);
                d.reversed && (f *= -1, w -= f * (d.sector || d.len));
                c ? (b = (b * f + w - u) / a + r, m && (b = d.lin2val(b))) : (m && (b = d.val2lin(b)), b = t(r) ? f * (b - r) * a + w + f * u + (t(n) ? a * n : 0) : void 0);
                return b
            };
            e.prototype.toPixels = function (b, c) {
                return this.translate(b, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
            };
            e.prototype.toValue = function (b, c) {
                return this.translate(b -
                    (c ? 0 : this.pos), !0, !this.horiz, null, !0)
            };
            e.prototype.getPlotLinePath = function (b) {
                function c(b, c, g) {
                    if ("pass" !== P && b < c || b > g) P ? b = k(b, c, g) : h = !0;
                    return b
                }
                var g = this,
                    a = g.chart,
                    m = g.left,
                    n = g.top,
                    d = b.old,
                    u = b.value,
                    f = b.lineWidth,
                    w = d && a.oldChartHeight || a.chartHeight,
                    G = d && a.oldChartWidth || a.chartWidth,
                    e = g.transB,
                    x = b.translatedValue,
                    P = b.force,
                    p, l, y, N, h;
                b = {
                    value: u,
                    lineWidth: f,
                    old: d,
                    force: P,
                    acrossPanes: b.acrossPanes,
                    translatedValue: x
                };
                C(this, "getPlotLinePath", b, function (b) {
                    x = r(x, g.translate(u, null, null, d));
                    x = k(x,
                        -1E5, 1E5);
                    p = y = Math.round(x + e);
                    l = N = Math.round(w - x - e);
                    t(x) ? g.horiz ? (l = n, N = w - g.bottom, p = y = c(p, m, m + g.width)) : (p = m, y = G - g.right, l = N = c(l, n, n + g.height)) : (h = !0, P = !1);
                    b.path = h && !P ? null : a.renderer.crispLine([
                        ["M", p, l],
                        ["L", y, N]
                    ], f || 1)
                });
                return b.path
            };
            e.prototype.getLinearTickPositions = function (b, c, g) {
                var a = F(Math.floor(c / b) * b);
                g = F(Math.ceil(g / b) * b);
                var m = [],
                    n;
                F(a + b) === a && (n = 20);
                if (this.single) return [c];
                for (c = a; c <= g;) {
                    m.push(c);
                    c = F(c + b, n);
                    if (c === d) break;
                    var d = c
                }
                return m
            };
            e.prototype.getMinorTickInterval = function () {
                var b =
                    this.options;
                return !0 === b.minorTicks ? r(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval
            };
            e.prototype.getMinorTickPositions = function () {
                var b = this.options,
                    c = this.tickPositions,
                    g = this.minorTickInterval,
                    a = this.pointRangePadding || 0,
                    m = this.min - a;
                a = this.max + a;
                var n = a - m,
                    d = [];
                if (n && n / g < this.len / 3) {
                    var r = this.logarithmic;
                    if (r) this.paddedTicks.forEach(function (b, c, a) {
                        c && d.push.apply(d, r.getLogTickPositions(g, a[c - 1], a[c], !0))
                    });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval()) d =
                        d.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(g), m, a, b.startOfWeek));
                    else
                        for (b = m + (c[0] - m) % g; b <= a && b !== d[0]; b += g) d.push(b)
                }
                0 !== d.length && this.trimTicks(d);
                return d
            };
            e.prototype.adjustForMinRange = function () {
                var b = this.options,
                    c = this.logarithmic,
                    g = this.min,
                    m = this.max,
                    d = 0,
                    n, u, f, w;
                this.isXAxis && "undefined" === typeof this.minRange && !c && (B(b.min) || B(b.max) || B(b.floor) || B(b.ceiling) ? this.minRange = null : (this.series.forEach(function (b) {
                    f = b.xData;
                    w = b.xIncrement ? 1 : f.length - 1;
                    if (1 < f.length)
                        for (n =
                            w; 0 < n; n--)
                            if (u = f[n] - f[n - 1], !d || u < d) d = u
                }), this.minRange = Math.min(5 * d, this.dataMax - this.dataMin)));
                if (m - g < this.minRange) {
                    var t = this.dataMax - this.dataMin >= this.minRange;
                    var G = this.minRange;
                    var e = (G - m + g) / 2;
                    e = [g - e, r(b.min, g - e)];
                    t && (e[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    g = a(e);
                    m = [g + G, r(b.max, g + G)];
                    t && (m[2] = c ? c.log2lin(this.dataMax) : this.dataMax);
                    m = p(m);
                    m - g < G && (e[0] = m - G, e[1] = r(b.min, m - G), g = a(e))
                }
                this.min = g;
                this.max = m
            };
            e.prototype.getClosest = function () {
                var b;
                this.categories ?
                    b = 1 : this.series.forEach(function (c) {
                        var g = c.closestPointRange,
                            a = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                        !c.noSharedTooltip && B(g) && a && (b = B(b) ? Math.min(b, g) : g)
                    });
                return b
            };
            e.prototype.nameToX = function (b) {
                var g = c(this.categories),
                    a = g ? this.categories : this.names,
                    m = b.options.x;
                b.series.requireSorting = !1;
                B(m) || (m = this.options.uniqueNames ? g ? a.indexOf(b.name) : r(a.keys[b.name], -1) : b.series.autoIncrement());
                if (-1 === m) {
                    if (!g) var d = a.length
                } else d = m;
                "undefined" !== typeof d && (this.names[d] = b.name, this.names.keys[b.name] =
                    d);
                return d
            };
            e.prototype.updateNames = function () {
                var b = this,
                    c = this.names;
                0 < c.length && (Object.keys(c.keys).forEach(function (b) {
                    delete c.keys[b]
                }), c.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (c) {
                    c.xIncrement = null;
                    if (!c.points || c.isDirtyData) b.max = Math.max(b.max, c.xData.length - 1), c.processData(), c.generatePoints();
                    c.data.forEach(function (g, a) {
                        if (g && g.options && "undefined" !== typeof g.name) {
                            var m = b.nameToX(g);
                            "undefined" !== typeof m && m !== g.x && (g.x = m, c.xData[a] = m)
                        }
                    })
                }))
            };
            e.prototype.setAxisTranslation =
                function () {
                    var b = this,
                        c = b.max - b.min,
                        a = b.linkedParent,
                        m = !!b.categories,
                        d = b.isXAxis,
                        n = b.axisPointRange || 0,
                        u = 0,
                        f = 0,
                        w = b.transA;
                    if (d || m || n) {
                        var t = b.getClosest();
                        a ? (u = a.minPointOffset, f = a.pointRangePadding) : b.series.forEach(function (c) {
                            var a = m ? 1 : d ? r(c.options.pointRange, t, 0) : b.axisPointRange || 0,
                                w = c.options.pointPlacement;
                            n = Math.max(n, a);
                            if (!b.single || m) c = c.is("xrange") ? !d : d, u = Math.max(u, c && g(w) ? 0 : a / 2), f = Math.max(f, c && "on" === w ? 0 : a)
                        });
                        a = b.ordinal && b.ordinal.slope && t ? b.ordinal.slope / t : 1;
                        b.minPointOffset = u *=
                            a;
                        b.pointRangePadding = f *= a;
                        b.pointRange = Math.min(n, b.single && m ? 1 : c);
                        d && (b.closestPointRange = t)
                    }
                    b.translationSlope = b.transA = w = b.staticScale || b.len / (c + f || 1);
                    b.transB = b.horiz ? b.left : b.bottom;
                    b.minPixelPadding = w * u;
                    C(this, "afterSetAxisTranslation")
                };
            e.prototype.minFromRange = function () {
                return this.max - this.range
            };
            e.prototype.setTickInterval = function (b) {
                var c = this.chart,
                    g = this.logarithmic,
                    a = this.options,
                    m = this.isXAxis,
                    d = this.isLinked,
                    u = a.tickPixelInterval,
                    f = this.categories,
                    w = this.softThreshold,
                    G = a.maxPadding,
                    e = a.minPadding,
                    k = t(a.tickInterval) && 0 <= a.tickInterval ? a.tickInterval : void 0,
                    p = t(this.threshold) ? this.threshold : null;
                this.dateTime || f || d || this.getTickAmount();
                var l = r(this.userMin, a.min);
                var P = r(this.userMax, a.max);
                if (d) {
                    this.linkedParent = c[this.coll][a.linkedTo];
                    var y = this.linkedParent.getExtremes();
                    this.min = r(y.min, y.dataMin);
                    this.max = r(y.max, y.dataMax);
                    a.type !== this.linkedParent.options.type && L(11, 1, c)
                } else {
                    if (w && B(p))
                        if (this.dataMin >= p) y = p, e = 0;
                        else if (this.dataMax <= p) {
                            var N = p;
                            G = 0
                        }
                    this.min = r(l,
                        y, this.dataMin);
                    this.max = r(P, N, this.dataMax)
                }
                g && (this.positiveValuesOnly && !b && 0 >= Math.min(this.min, r(this.dataMin, this.min)) && L(10, 1, c), this.min = F(g.log2lin(this.min), 16), this.max = F(g.log2lin(this.max), 16));
                this.range && B(this.max) && (this.userMin = this.min = l = Math.max(this.dataMin, this.minFromRange()), this.userMax = P = this.max, this.range = null);
                C(this, "foundExtremes");
                this.beforePadding && this.beforePadding();
                this.adjustForMinRange();
                !(f || this.axisPointRange || this.stacking && this.stacking.usePercentage ||
                    d) && B(this.min) && B(this.max) && (c = this.max - this.min) && (!B(l) && e && (this.min -= c * e), !B(P) && G && (this.max += c * G));
                t(this.userMin) || (t(a.softMin) && a.softMin < this.min && (this.min = l = a.softMin), t(a.floor) && (this.min = Math.max(this.min, a.floor)));
                t(this.userMax) || (t(a.softMax) && a.softMax > this.max && (this.max = P = a.softMax), t(a.ceiling) && (this.max = Math.min(this.max, a.ceiling)));
                w && B(this.dataMin) && (p = p || 0, !B(l) && this.min < p && this.dataMin >= p ? this.min = this.options.minRange ? Math.min(p, this.max - this.minRange) : p : !B(P) &&
                    this.max > p && this.dataMax <= p && (this.max = this.options.minRange ? Math.max(p, this.min + this.minRange) : p));
                t(this.min) && t(this.max) && !this.chart.polar && this.min > this.max && (B(this.options.min) ? this.max = this.min : B(this.options.max) && (this.min = this.max));
                this.tickInterval = this.min === this.max || "undefined" === typeof this.min || "undefined" === typeof this.max ? 1 : d && this.linkedParent && !k && u === this.linkedParent.options.tickPixelInterval ? k = this.linkedParent.tickInterval : r(k, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount -
                    1, 1) : void 0, f ? 1 : (this.max - this.min) * u / Math.max(this.len, u));
                if (m && !b) {
                    var h = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
                    this.series.forEach(function (b) {
                        b.forceCrop = b.forceCropping && b.forceCropping();
                        b.processData(h)
                    });
                    C(this, "postProcessData", {
                        hasExtemesChanged: h
                    })
                }
                this.setAxisTranslation();
                C(this, "initialAxisTranslation");
                this.pointRange && !k && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
                b = r(a.minTickInterval, this.dateTime && !this.series.some(function (b) {
                    return b.noSharedTooltip
                }) ?
                    this.closestPointRange : 0);
                !k && this.tickInterval < b && (this.tickInterval = b);
                this.dateTime || this.logarithmic || k || (this.tickInterval = n(this.tickInterval, void 0, x(this.tickInterval), r(a.allowDecimals, .5 > this.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (this.tickInterval = this.unsquish());
                this.setTickPositions()
            };
            e.prototype.setTickPositions = function () {
                var b = this.options,
                    c = b.tickPositions,
                    g = this.getMinorTickInterval(),
                    a = this.hasVerticalPanning(),
                    m = "colorAxis" === this.coll,
                    d = (m || !a) && b.startOnTick;
                a = (m || !a) && b.endOnTick;
                m = b.tickPositioner;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === g && this.tickInterval ? this.tickInterval / 5 : g;
                this.single = this.min === this.max && B(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = g = c && c.slice();
                !g && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ?
                    g = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (g = [this.min, this.max], L(19, !1, this.chart)), g.length > this.len && (g = [g[0], g.pop()], g[0] === g[1] && (g.length = 1)), this.tickPositions = g, m && (m = m.apply(this,
                        [this.min, this.max]))) && (this.tickPositions = g = m);
                this.paddedTicks = g.slice(0);
                this.trimTicks(g, d, a);
                this.isLinked || (this.single && 2 > g.length && !this.categories && !this.series.some(function (b) {
                    return b.is("heatmap") && "between" === b.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), c || m || this.adjustTickAmount());
                C(this, "afterSetTickPositions")
            };
            e.prototype.trimTicks = function (b, c, g) {
                var a = b[0],
                    m = b[b.length - 1],
                    d = !this.isOrdinal && this.minPointOffset || 0;
                C(this, "trimTicks");
                if (!this.isLinked) {
                    if (c && -Infinity !==
                        a) this.min = a;
                    else
                        for (; this.min - d > b[0];) b.shift();
                    if (g) this.max = m;
                    else
                        for (; this.max + d < b[b.length - 1];) b.pop();
                    0 === b.length && B(a) && !this.options.tickPositions && b.push((m + a) / 2)
                }
            };
            e.prototype.alignToOthers = function () {
                var b = {},
                    c = this.options,
                    g;
                !1 !== this.chart.options.chart.alignTicks && c.alignTicks && !1 !== c.startOnTick && !1 !== c.endOnTick && !this.logarithmic && this.chart[this.coll].forEach(function (c) {
                    var a = c.options;
                    a = [c.horiz ? a.left : a.top, a.width, a.height, a.pane].join();
                    c.series.length && (b[a] ? g = !0 : b[a] = 1)
                });
                return g
            };
            e.prototype.getTickAmount = function () {
                var b = this.options,
                    c = b.tickPixelInterval,
                    g = b.tickAmount;
                !B(b.tickInterval) && !g && this.len < c && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (g = 2);
                !g && this.alignToOthers() && (g = Math.ceil(this.len / c) + 1);
                4 > g && (this.finalTickAmt = g, g = 5);
                this.tickAmount = g
            };
            e.prototype.adjustTickAmount = function () {
                var b = this.options,
                    c = this.tickInterval,
                    g = this.tickPositions,
                    a = this.tickAmount,
                    m = this.finalTickAmt,
                    d = g && g.length,
                    n = r(this.threshold, this.softThreshold ?
                        0 : null);
                if (this.hasData() && t(this.min) && t(this.max)) {
                    if (d < a) {
                        for (; g.length < a;) g.length % 2 || this.min === n ? g.push(F(g[g.length - 1] + c)) : g.unshift(F(g[0] - c));
                        this.transA *= (d - 1) / (a - 1);
                        this.min = b.startOnTick ? g[0] : Math.min(this.min, g[0]);
                        this.max = b.endOnTick ? g[g.length - 1] : Math.max(this.max, g[g.length - 1])
                    } else d > a && (this.tickInterval *= 2, this.setTickPositions());
                    if (B(m)) {
                        for (c = b = g.length; c--;)(3 === m && 1 === c % 2 || 2 >= m && 0 < c && c < b - 1) && g.splice(c, 1);
                        this.finalTickAmt = void 0
                    }
                }
            };
            e.prototype.setScale = function () {
                var b = !1,
                    c = !1;
                this.series.forEach(function (g) {
                    b = b || g.isDirtyData || g.isDirty;
                    c = c || g.xAxis && g.xAxis.isDirty || !1
                });
                this.setAxisSize();
                var g = this.len !== (this.old && this.old.len);
                g || b || c || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = g || this.min !== (this.old && this.old.min) || this.max !==
                    (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                b && this.panningState && (this.panningState.isDirty = !0);
                C(this, "afterSetScale")
            };
            e.prototype.setExtremes = function (b, c, g, a, m) {
                var d = this,
                    n = d.chart;
                g = r(g, !0);
                d.series.forEach(function (b) {
                    delete b.kdTree
                });
                m = y(m, {
                    min: b,
                    max: c
                });
                C(d, "setExtremes", m, function () {
                    d.userMin = b;
                    d.userMax = c;
                    d.eventArgs = m;
                    g && n.redraw(a)
                })
            };
            e.prototype.zoom = function (b, c) {
                var g = this,
                    a = this.dataMin,
                    m = this.dataMax,
                    d = this.options,
                    n = Math.min(a, r(d.min, a)),
                    u = Math.max(m,
                        r(d.max, m));
                b = {
                    newMin: b,
                    newMax: c
                };
                C(this, "zoom", b, function (b) {
                    var c = b.newMin,
                        d = b.newMax;
                    if (c !== g.min || d !== g.max) g.allowZoomOutside || (B(a) && (c < n && (c = n), c > u && (c = u)), B(m) && (d < n && (d = n), d > u && (d = u))), g.displayBtn = "undefined" !== typeof c || "undefined" !== typeof d, g.setExtremes(c, d, !1, void 0, {
                        trigger: "zoom"
                    });
                    b.zoomed = !0
                });
                return b.zoomed
            };
            e.prototype.setAxisSize = function () {
                var b = this.chart,
                    c = this.options,
                    g = c.offsets || [0, 0, 0, 0],
                    a = this.horiz,
                    m = this.width = Math.round(G(r(c.width, b.plotWidth - g[3] + g[1]), b.plotWidth)),
                    d = this.height = Math.round(G(r(c.height, b.plotHeight - g[0] + g[2]), b.plotHeight)),
                    n = this.top = Math.round(G(r(c.top, b.plotTop + g[0]), b.plotHeight, b.plotTop));
                c = this.left = Math.round(G(r(c.left, b.plotLeft + g[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - d - n;
                this.right = b.chartWidth - m - c;
                this.len = Math.max(a ? m : d, 0);
                this.pos = a ? c : n
            };
            e.prototype.getExtremes = function () {
                var b = this.logarithmic;
                return {
                    min: b ? F(b.lin2log(this.min)) : this.min,
                    max: b ? F(b.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            };
            e.prototype.getThreshold = function (b) {
                var c = this.logarithmic,
                    g = c ? c.lin2log(this.min) : this.min;
                c = c ? c.lin2log(this.max) : this.max;
                null === b || -Infinity === b ? b = g : Infinity === b ? b = c : g > b ? b = g : c < b && (b = c);
                return this.translate(b, 0, 1, 0, 1)
            };
            e.prototype.autoLabelAlign = function (b) {
                var c = (r(b, 0) - 90 * this.side + 720) % 360;
                b = {
                    align: "center"
                };
                C(this, "autoLabelAlign", b, function (b) {
                    15 < c && 165 > c ? b.align = "right" : 195 < c && 345 > c && (b.align = "left")
                });
                return b.align
            };
            e.prototype.tickSize = function (b) {
                var c =
                    this.options,
                    g = r(c["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0),
                    a = c["tick" === b ? "tickLength" : "minorTickLength"];
                if (g && a) {
                    "inside" === c[b + "Position"] && (a = -a);
                    var m = [a, g]
                }
                b = {
                    tickSize: m
                };
                C(this, "afterTickSize", b);
                return b.tickSize
            };
            e.prototype.labelMetrics = function () {
                var b = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[b] && this.ticks[b].label)
            };
            e.prototype.unsquish = function () {
                var b =
                    this.options.labels,
                    c = this.horiz,
                    g = this.tickInterval,
                    a = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / g),
                    m = b.rotation,
                    n = this.labelMetrics(),
                    u = Math.max(this.max - this.min, 0),
                    f = function (b) {
                        var c = b / (a || 1);
                        c = 1 < c ? Math.ceil(c) : 1;
                        c * g > u && Infinity !== b && Infinity !== a && u && (c = Math.ceil(u / g));
                        return F(c * g)
                    },
                    w = g,
                    G, e, x = Number.MAX_VALUE;
                if (c) {
                    if (!b.staggerLines && !b.step)
                        if (t(m)) var k = [m];
                        else a < b.autoRotationLimit && (k = b.autoRotation);
                    k && k.forEach(function (b) {
                        if (b === m || b && -90 <= b && 90 >= b) {
                            e = f(Math.abs(n.h / Math.sin(d *
                                b)));
                            var c = e + Math.abs(b / 360);
                            c < x && (x = c, G = b, w = e)
                        }
                    })
                } else b.step || (w = f(n.h));
                this.autoRotation = k;
                this.labelRotation = r(G, t(m) ? m : 0);
                return w
            };
            e.prototype.getSlotWidth = function (b) {
                var c = this.chart,
                    g = this.horiz,
                    a = this.options.labels,
                    m = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    d = c.margin[3];
                if (b && t(b.slotWidth)) return b.slotWidth;
                if (g && 2 > a.step) return a.rotation ? 0 : (this.staggerLines || 1) * this.len / m;
                if (!g) {
                    b = a.style.width;
                    if (void 0 !== b) return parseInt(String(b), 10);
                    if (d) return d - c.spacing[3]
                }
                return .33 *
                    c.chartWidth
            };
            e.prototype.renderUnsquish = function () {
                var b = this.chart,
                    c = b.renderer,
                    a = this.tickPositions,
                    m = this.ticks,
                    d = this.options.labels,
                    n = d.style,
                    r = this.horiz,
                    u = this.getSlotWidth(),
                    f = Math.max(1, Math.round(u - 2 * d.padding)),
                    w = {},
                    t = this.labelMetrics(),
                    G = n.textOverflow,
                    e = 0;
                g(d.rotation) || (w.rotation = d.rotation || 0);
                a.forEach(function (b) {
                    b = m[b];
                    b.movedLabel && b.replaceMovedLabel();
                    b && b.label && b.label.textPxLength > e && (e = b.label.textPxLength)
                });
                this.maxLabelLength = e;
                if (this.autoRotation) e > f && e > t.h ? w.rotation =
                    this.labelRotation : this.labelRotation = 0;
                else if (u) {
                    var x = f;
                    if (!G) {
                        var k = "clip";
                        for (f = a.length; !r && f--;) {
                            var p = a[f];
                            if (p = m[p].label) p.styles && "ellipsis" === p.styles.textOverflow ? p.css({
                                textOverflow: "clip"
                            }) : p.textPxLength > u && p.css({
                                width: u + "px"
                            }), p.getBBox().height > this.len / a.length - (t.h - t.f) && (p.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                w.rotation && (x = e > .5 * b.chartHeight ? .33 * b.chartHeight : e, G || (k = "ellipsis"));
                if (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation)) w.align = this.labelAlign;
                a.forEach(function (b) {
                    var c =
                        (b = m[b]) && b.label,
                        g = n.width,
                        a = {};
                    c && (c.attr(w), b.shortenLabel ? b.shortenLabel() : x && !g && "nowrap" !== n.whiteSpace && (x < c.textPxLength || "SPAN" === c.element.tagName) ? (a.width = x + "px", G || (a.textOverflow = c.specificTextOverflow || k), c.css(a)) : c.styles && c.styles.width && !a.width && !g && c.css({
                        width: null
                    }), delete c.specificTextOverflow, b.rotation = w.rotation)
                }, this);
                this.tickRotCorr = c.rotCorr(t.b, this.labelRotation || 0, 0 !== this.side)
            };
            e.prototype.hasData = function () {
                return this.series.some(function (b) {
                    return b.hasData()
                }) ||
                    this.options.showEmpty && B(this.min) && B(this.max)
            };
            e.prototype.addTitle = function (b) {
                var c = this.chart.renderer,
                    g = this.horiz,
                    a = this.opposite,
                    m = this.options.title,
                    d = this.chart.styledMode,
                    n;
                this.axisTitle || ((n = m.textAlign) || (n = (g ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: a ? "right" : "left",
                    middle: "center",
                    high: a ? "left" : "right"
                })[m.align]), this.axisTitle = c.text(m.text || "", 0, 0, m.useHTML).attr({
                    zIndex: 7,
                    rotation: m.rotation,
                    align: n
                }).addClass("highcharts-axis-title"), d || this.axisTitle.css(u(m.style)), this.axisTitle.add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                d || m.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[b ? "show" : "hide"](b)
            };
            e.prototype.generateTick = function (b) {
                var c = this.ticks;
                c[b] ? c[b].addLabel() : c[b] = new I(this, b)
            };
            e.prototype.getOffset = function () {
                var c = this,
                    g = this,
                    a = g.chart,
                    m = g.horiz,
                    d = g.options,
                    n = g.side,
                    u = g.ticks,
                    f = g.tickPositions,
                    w = g.coll,
                    t = g.axisParent,
                    e = a.renderer,
                    G = a.inverted && !g.isZAxis ? [1, 0, 3, 2][n] : n,
                    x = g.hasData(),
                    k = d.title,
                    p = d.labels,
                    l = a.axisOffset;
                a = a.clipOffset;
                var y = [-1,
                    1, 1, -1
                ][n],
                    N = d.className,
                    h, q = 0,
                    J = 0,
                    F = 0;
                g.showAxis = h = x || d.showEmpty;
                g.staggerLines = g.horiz && p.staggerLines || void 0;
                if (!g.axisGroup) {
                    var K = function (b, g, a) {
                        return e.g(b).attr({
                            zIndex: a
                        }).addClass("highcharts-" + w.toLowerCase() + g + " " + (c.isRadial ? "highcharts-radial-axis" + g + " " : "") + (N || "")).add(t)
                    };
                    g.gridGroup = K("grid", "-grid", d.gridZIndex);
                    g.axisGroup = K("axis", "", d.zIndex);
                    g.labelGroup = K("axis-labels", "-labels", p.zIndex)
                }
                x || g.isLinked ? (f.forEach(function (b) {
                    g.generateTick(b)
                }), g.renderUnsquish(), g.reserveSpaceDefault =
                    0 === n || 2 === n || {
                        1: "left",
                        3: "right"
                    }[n] === g.labelAlign, r(p.reserveSpace, "center" === g.labelAlign ? !0 : null, g.reserveSpaceDefault) && f.forEach(function (b) {
                        F = Math.max(u[b].getLabelSize(), F)
                    }), g.staggerLines && (F *= g.staggerLines), g.labelOffset = F * (g.opposite ? -1 : 1)) : b(u, function (b, c) {
                        b.destroy();
                        delete u[c]
                    });
                if (k && k.text && !1 !== k.enabled && (g.addTitle(h), h && !1 !== k.reserveSpace)) {
                    g.titleOffset = q = g.axisTitle.getBBox()[m ? "height" : "width"];
                    var L = k.offset;
                    J = B(L) ? 0 : r(k.margin, m ? 5 : 10)
                }
                g.renderLine();
                g.offset = y * r(d.offset,
                    l[n] ? l[n] + (d.margin || 0) : 0);
                g.tickRotCorr = g.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                k = 0 === n ? -g.labelMetrics().h : 2 === n ? g.tickRotCorr.y : 0;
                x = Math.abs(F) + J;
                F && (x = x - k + y * (m ? r(p.y, g.tickRotCorr.y + 8 * y) : p.x));
                g.axisTitleMargin = r(L, x);
                g.getMaxLabelDimensions && (g.maxLabelDimensions = g.getMaxLabelDimensions(u, f));
                "colorAxis" !== w && (m = this.tickSize("tick"), l[n] = Math.max(l[n], (g.axisTitleMargin || 0) + q + y * g.offset, x, f && f.length && m ? m[0] + y * g.offset : 0), d = !g.axisLine || d.offset ? 0 : 2 * Math.floor(g.axisLine.strokeWidth() / 2), a[G] = Math.max(a[G],
                    d));
                C(this, "afterGetOffset")
            };
            e.prototype.getLinePath = function (b) {
                var c = this.chart,
                    g = this.opposite,
                    a = this.offset,
                    m = this.horiz,
                    d = this.left + (g ? this.width : 0) + a;
                a = c.chartHeight - this.bottom - (g ? this.height : 0) + a;
                g && (b *= -1);
                return c.renderer.crispLine([
                    ["M", m ? this.left : d, m ? a : this.top],
                    ["L", m ? c.chartWidth - this.right : d, m ? a : c.chartHeight - this.bottom]
                ], b)
            };
            e.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode ||
                    this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            };
            e.prototype.getTitlePosition = function () {
                var b = this.horiz,
                    c = this.left,
                    g = this.top,
                    a = this.len,
                    m = this.options.title,
                    d = b ? c : g,
                    n = this.opposite,
                    r = this.offset,
                    u = m.x,
                    f = m.y,
                    w = this.axisTitle,
                    t = this.chart.renderer.fontMetrics(m.style.fontSize, w);
                w = Math.max(w.getBBox(null, 0).height - t.h - 1, 0);
                a = {
                    low: d + (b ? 0 : a),
                    middle: d + a / 2,
                    high: d + (b ? a : 0)
                }[m.align];
                c = (b ? g + this.height : c) + (b ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + [-w, w,
                t.f, -w
                ][this.side];
                b = {
                    x: b ? a + u : c + (n ? this.width : 0) + r + u,
                    y: b ? c + f - (n ? this.height : 0) + r : a + f
                };
                C(this, "afterGetTitlePosition", {
                    titlePosition: b
                });
                return b
            };
            e.prototype.renderMinorTick = function (b, c) {
                var g = this.minorTicks;
                g[b] || (g[b] = new I(this, b, "minor"));
                c && g[b].isNew && g[b].render(null, !0);
                g[b].render(null, !1, 1)
            };
            e.prototype.renderTick = function (b, c, g) {
                var a = this.ticks;
                if (!this.isLinked || b >= this.min && b <= this.max || this.grid && this.grid.isColumn) a[b] || (a[b] = new I(this, b)), g && a[b].isNew && a[b].render(c, !0, -1), a[b].render(c)
            };
            e.prototype.render = function () {
                var c = this,
                    g = c.chart,
                    a = c.logarithmic,
                    m = c.options,
                    d = c.isLinked,
                    n = c.tickPositions,
                    r = c.axisTitle,
                    u = c.ticks,
                    f = c.minorTicks,
                    w = c.alternateBands,
                    e = m.stackLabels,
                    G = m.alternateGridColor,
                    x = c.tickmarkOffset,
                    k = c.axisLine,
                    p = c.showAxis,
                    l = q(g.renderer.globalAnimation),
                    y, h;
                c.labelEdge.length = 0;
                c.overlap = !1;
                [u, f, w].forEach(function (c) {
                    b(c, function (b) {
                        b.isActive = !1
                    })
                });
                if (c.hasData() || d) {
                    var B = c.chart.hasRendered && c.old && t(c.old.min);
                    c.minorTickInterval && !c.categories && c.getMinorTickPositions().forEach(function (b) {
                        c.renderMinorTick(b,
                            B)
                    });
                    n.length && (n.forEach(function (b, g) {
                        c.renderTick(b, g, B)
                    }), x && (0 === c.min || c.single) && (u[-1] || (u[-1] = new I(c, -1, null, !0)), u[-1].render(-1)));
                    G && n.forEach(function (b, m) {
                        h = "undefined" !== typeof n[m + 1] ? n[m + 1] + x : c.max - x;
                        0 === m % 2 && b < c.max && h <= c.max + (g.polar ? -x : x) && (w[b] || (w[b] = new H.PlotLineOrBand(c)), y = b + x, w[b].options = {
                            from: a ? a.lin2log(y) : y,
                            to: a ? a.lin2log(h) : h,
                            color: G,
                            className: "highcharts-alternate-grid"
                        }, w[b].render(), w[b].isActive = !0)
                    });
                    c._addedPlotLB || (c._addedPlotLB = !0, (m.plotLines || []).concat(m.plotBands || []).forEach(function (b) {
                        c.addPlotBandOrLine(b)
                    }))
                } [u, f, w].forEach(function (c) {
                    var a = [],
                        m = l.duration;
                    b(c, function (b, c) {
                        b.isActive || (b.render(c, !1, 0), b.isActive = !1, a.push(c))
                    });
                    N(function () {
                        for (var b = a.length; b--;) c[a[b]] && !c[a[b]].isActive && (c[a[b]].destroy(), delete c[a[b]])
                    }, c !== w && g.hasRendered && m ? m : 0)
                });
                k && (k[k.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(k.strokeWidth())
                }), k.isPlaced = !0, k[p ? "show" : "hide"](p));
                r && p && (m = c.getTitlePosition(), t(m.y) ? (r[r.isNew ? "attr" : "animate"](m), r.isNew = !1) : (r.attr("y",
                    -9999), r.isNew = !0));
                e && e.enabled && c.stacking && c.stacking.renderStackTotals();
                c.old = {
                    len: c.len,
                    max: c.max,
                    min: c.min,
                    transA: c.transA,
                    userMax: c.userMax,
                    userMin: c.userMin
                };
                c.isDirty = !1;
                C(this, "afterRender")
            };
            e.prototype.redraw = function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) {
                    b.render()
                }));
                this.series.forEach(function (b) {
                    b.isDirty = !0
                })
            };
            e.prototype.getKeepProps = function () {
                return this.keepProps || e.keepProps
            };
            e.prototype.destroy = function (c) {
                var g = this,
                    a = g.plotLinesAndBands,
                    d = this.eventOptions;
                C(this, "destroy", {
                    keepEvents: c
                });
                c || m(g);
                [g.ticks, g.minorTicks, g.alternateBands].forEach(function (b) {
                    J(b)
                });
                if (a)
                    for (c = a.length; c--;) a[c].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) {
                    g[b] && (g[b] = g[b].destroy())
                });
                for (var n in g.plotLinesAndBandsGroups) g.plotLinesAndBandsGroups[n] = g.plotLinesAndBandsGroups[n].destroy();
                b(g, function (b, c) {
                    -1 === g.getKeepProps().indexOf(c) && delete g[c]
                });
                this.eventOptions = d
            };
            e.prototype.drawCrosshair =
                function (b, c) {
                    var g = this.crosshair,
                        a = r(g && g.snap, !0),
                        m = this.chart,
                        d, n = this.cross;
                    C(this, "drawCrosshair", {
                        e: b,
                        point: c
                    });
                    b || (b = this.cross && this.cross.e);
                    if (g && !1 !== (B(c) || !a)) {
                        a ? B(c) && (d = r("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len - c.plotY)) : d = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos);
                        if (B(d)) {
                            var u = {
                                value: c && (this.isXAxis ? c.x : r(c.stackY, c.y)),
                                translatedValue: d
                            };
                            m.polar && y(u, {
                                isCrosshair: !0,
                                chartX: b && b.chartX,
                                chartY: b && b.chartY,
                                point: c
                            });
                            u = this.getPlotLinePath(u) ||
                                null
                        }
                        if (!B(u)) {
                            this.hideCrosshair();
                            return
                        }
                        a = this.categories && !this.isRadial;
                        n || (this.cross = n = m.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (a ? "category " : "thin ") + (g.className || "")).attr({
                            zIndex: r(g.zIndex, 2)
                        }).add(), m.styledMode || (n.attr({
                            stroke: g.color || (a ? A.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                            "stroke-width": r(g.width, 1)
                        }).css({
                            "pointer-events": "none"
                        }), g.dashStyle && n.attr({
                            dashstyle: g.dashStyle
                        })));
                        n.show().attr({
                            d: u
                        });
                        a && !g.width && n.attr({
                            "stroke-width": this.transA
                        });
                        this.cross.e = b
                    } else this.hideCrosshair();
                    C(this, "afterDrawCrosshair", {
                        e: b,
                        point: c
                    })
                };
            e.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide();
                C(this, "afterHideCrosshair")
            };
            e.prototype.hasVerticalPanning = function () {
                var b = this.chart.options.chart.panning;
                return !!(b && b.enabled && /y/.test(b.type))
            };
            e.prototype.validatePositiveValue = function (b) {
                return t(b) && 0 < b
            };
            e.prototype.update = function (b, c) {
                var g = this.chart;
                b = u(this.userOptions, b);
                this.destroy(!0);
                this.init(g, b);
                g.isDirtyBox = !0;
                r(c, !0) && g.redraw()
            };
            e.prototype.remove = function (b) {
                for (var c = this.chart, g = this.coll, a = this.series, m = a.length; m--;) a[m] && a[m].remove(!1);
                K(c.axes, this);
                K(c[g], this);
                c[g].forEach(function (b, c) {
                    b.options.index = b.userOptions.index = c
                });
                this.destroy();
                c.isDirtyBox = !0;
                r(b, !0) && c.redraw()
            };
            e.prototype.setTitle = function (b, c) {
                this.update({
                    title: b
                }, c)
            };
            e.prototype.setCategories = function (b, c) {
                this.update({
                    categories: b
                }, c)
            };
            e.defaultOptions = h.defaultXAxisOptions;
            e.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return e
        }();
        "";
        return e
    });
    M(h, "Core/Axis/DateTimeAxis.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.addEvent,
            A = e.getMagnitude,
            E = e.normalizeTickInterval,
            v = e.timeUnits,
            H;
        (function (e) {
            function z() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }

            function q(d) {
                "datetime" !== d.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new f(this))
            }
            var l = [];
            e.compose = function (d) {
                -1 === l.indexOf(d) && (l.push(d), d.keepProps.push("dateTime"), d.prototype.getTimeTicks = z, h(d, "init",
                    q));
                return d
            };
            var f = function () {
                function d(a) {
                    this.axis = a
                }
                d.prototype.normalizeTimeTickInterval = function (a, d) {
                    var f = d || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ];
                    d = f[f.length - 1];
                    var e = v[d[0]],
                        p = d[1],
                        l;
                    for (l = 0; l < f.length && !(d = f[l], e = v[d[0]], p = d[1], f[l + 1] && a <= (e * p[p.length - 1] + v[f[l + 1][0]]) / 2); l++);
                    e === v.year && a < 5 * e && (p = [1, 2, 5]);
                    a = E(a / e, p, "year" === d[0] ?
                        Math.max(A(a / e), 1) : 1);
                    return {
                        unitRange: e,
                        count: a,
                        unitName: d[0]
                    }
                };
                d.prototype.getXDateFormat = function (a, d) {
                    var f = this.axis;
                    return f.closestPointRange ? f.chart.time.getDateFormat(f.closestPointRange, a, f.options.startOfWeek, d) || d.year : d.day
                };
                return d
            }();
            e.Additions = f
        })(H || (H = {}));
        return H
    });
    M(h, "Core/Axis/LogarithmicAxis.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.addEvent,
            A = e.getMagnitude,
            E = e.normalizeTickInterval,
            v = e.pick,
            H;
        (function (e) {
            function z(d) {
                var a = this.logarithmic;
                "logarithmic" !== d.userOptions.type ?
                    this.logarithmic = void 0 : a || (this.logarithmic = new f(this))
            }

            function q() {
                var d = this.logarithmic;
                d && (this.lin2val = function (a) {
                    return d.lin2log(a)
                }, this.val2lin = function (a) {
                    return d.log2lin(a)
                })
            }
            var l = [];
            e.compose = function (d) {
                -1 === l.indexOf(d) && (l.push(d), d.keepProps.push("logarithmic"), h(d, "init", z), h(d, "afterInit", q));
                return d
            };
            var f = function () {
                function d(a) {
                    this.axis = a
                }
                d.prototype.getLogTickPositions = function (a, d, f, e) {
                    var k = this.axis,
                        p = k.len,
                        l = k.options,
                        h = [];
                    e || (this.minorAutoInterval = void 0);
                    if (.5 <=
                        a) a = Math.round(a), h = k.getLinearTickPositions(a, d, f);
                    else if (.08 <= a) {
                        var y = Math.floor(d),
                            C, x = l = void 0;
                        for (p = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; y < f + 1 && !x; y++) {
                            var c = p.length;
                            for (C = 0; C < c && !x; C++) {
                                var t = this.log2lin(this.lin2log(y) * p[C]);
                                t > d && (!e || l <= f) && "undefined" !== typeof l && h.push(l);
                                l > f && (x = !0);
                                l = t
                            }
                        }
                    } else d = this.lin2log(d), f = this.lin2log(f), a = e ? k.getMinorTickInterval() : l.tickInterval, a = v("auto" === a ? null : a, this.minorAutoInterval, l.tickPixelInterval / (e ? 5 : 1) * (f - d) / ((e ? p / k.tickPositions.length :
                        p) || 1)), a = E(a, void 0, A(a)), h = k.getLinearTickPositions(a, d, f).map(this.log2lin), e || (this.minorAutoInterval = a / 5);
                    e || (k.tickInterval = a);
                    return h
                };
                d.prototype.lin2log = function (a) {
                    return Math.pow(10, a)
                };
                d.prototype.log2lin = function (a) {
                    return Math.log(a) / Math.LN10
                };
                return d
            }();
            e.Additions = f
        })(H || (H = {}));
        return H
    });
    M(h, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.erase,
            A = e.extend,
            E = e.isNumber,
            v;
        (function (e) {
            var v = [],
                z;
            e.compose = function (e, f) {
                z || (z = e); - 1 ===
                    v.indexOf(f) && (v.push(f), A(f.prototype, q.prototype));
                return f
            };
            var q = function () {
                function e() { }
                e.prototype.getPlotBandPath = function (f, d, a) {
                    void 0 === a && (a = this.options);
                    var e = this.getPlotLinePath({
                        value: d,
                        force: !0,
                        acrossPanes: a.acrossPanes
                    }),
                        k = [],
                        l = this.horiz;
                    d = !E(this.min) || !E(this.max) || f < this.min && d < this.min || f > this.max && d > this.max;
                    f = this.getPlotLinePath({
                        value: f,
                        force: !0,
                        acrossPanes: a.acrossPanes
                    });
                    a = 1;
                    if (f && e) {
                        if (d) {
                            var h = f.toString() === e.toString();
                            a = 0
                        }
                        for (d = 0; d < f.length; d += 2) {
                            var q = f[d],
                                K = f[d +
                                    1],
                                L = e[d],
                                y = e[d + 1];
                            "M" !== q[0] && "L" !== q[0] || "M" !== K[0] && "L" !== K[0] || "M" !== L[0] && "L" !== L[0] || "M" !== y[0] && "L" !== y[0] || (l && L[1] === q[1] ? (L[1] += a, y[1] += a) : l || L[2] !== q[2] || (L[2] += a, y[2] += a), k.push(["M", q[1], q[2]], ["L", K[1], K[2]], ["L", y[1], y[2]], ["L", L[1], L[2]], ["Z"]));
                            k.isFlat = h
                        }
                    }
                    return k
                };
                e.prototype.addPlotBand = function (f) {
                    return this.addPlotBandOrLine(f, "plotBands")
                };
                e.prototype.addPlotLine = function (f) {
                    return this.addPlotBandOrLine(f, "plotLines")
                };
                e.prototype.addPlotBandOrLine = function (f, d) {
                    var a = this,
                        e = this.userOptions,
                        k = new z(this, f);
                    this.visible && (k = k.render());
                    if (k) {
                        this._addedPlotLB || (this._addedPlotLB = !0, (e.plotLines || []).concat(e.plotBands || []).forEach(function (d) {
                            a.addPlotBandOrLine(d)
                        }));
                        if (d) {
                            var l = e[d] || [];
                            l.push(f);
                            e[d] = l
                        }
                        this.plotLinesAndBands.push(k)
                    }
                    return k
                };
                e.prototype.removePlotBandOrLine = function (f) {
                    var d = this.plotLinesAndBands,
                        a = this.options,
                        e = this.userOptions;
                    if (d) {
                        for (var k = d.length; k--;) d[k].id === f && d[k].destroy();
                        [a.plotLines || [], e.plotLines || [], a.plotBands || [], e.plotBands || []].forEach(function (a) {
                            for (k = a.length; k--;)(a[k] || {}).id === f && h(a, a[k])
                        })
                    }
                };
                e.prototype.removePlotBand = function (f) {
                    this.removePlotBandOrLine(f)
                };
                e.prototype.removePlotLine = function (f) {
                    this.removePlotBandOrLine(f)
                };
                return e
            }()
        })(v || (v = {}));
        return v
    });
    M(h, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [h["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], h["Core/Utilities.js"]], function (e, h) {
        var A = h.arrayMax,
            D = h.arrayMin,
            v = h.defined,
            H = h.destroyObjectProperties,
            I = h.erase,
            z = h.fireEvent,
            q = h.merge,
            l = h.objectEach,
            f = h.pick;
        h = function () {
            function d(a, d) {
                this.axis = a;
                d && (this.options = d, this.id = d.id)
            }
            d.compose = function (a) {
                return e.compose(d, a)
            };
            d.prototype.render = function () {
                z(this, "render");
                var a = this,
                    d = a.axis,
                    e = d.horiz,
                    h = d.logarithmic,
                    B = a.options,
                    J = B.color,
                    K = f(B.zIndex, 0),
                    L = B.events,
                    y = {},
                    C = d.chart.renderer,
                    x = B.label,
                    c = a.label,
                    t = B.to,
                    g = B.from,
                    u = B.value,
                    n = a.svgElem,
                    b = [],
                    r = v(g) && v(t);
                b = v(u);
                var G = !n,
                    m = {
                        "class": "highcharts-plot-" + (r ? "band " : "line ") + (B.className || "")
                    },
                    w = r ? "bands" : "lines";
                h && (g = h.log2lin(g), t = h.log2lin(t),
                    u = h.log2lin(u));
                d.chart.styledMode || (b ? (m.stroke = J || "#999999", m["stroke-width"] = f(B.width, 1), B.dashStyle && (m.dashstyle = B.dashStyle)) : r && (m.fill = J || "#e6ebf5", B.borderWidth && (m.stroke = B.borderColor, m["stroke-width"] = B.borderWidth)));
                y.zIndex = K;
                w += "-" + K;
                (h = d.plotLinesAndBandsGroups[w]) || (d.plotLinesAndBandsGroups[w] = h = C.g("plot-" + w).attr(y).add());
                G && (a.svgElem = n = C.path().attr(m).add(h));
                if (b) b = d.getPlotLinePath({
                    value: u,
                    lineWidth: n.strokeWidth(),
                    acrossPanes: B.acrossPanes
                });
                else if (r) b = d.getPlotBandPath(g,
                    t, B);
                else return;
                !a.eventsAdded && L && (l(L, function (b, c) {
                    n.on(c, function (b) {
                        L[c].apply(a, [b])
                    })
                }), a.eventsAdded = !0);
                (G || !n.d) && b && b.length ? n.attr({
                    d: b
                }) : n && (b ? (n.show(!0), n.animate({
                    d: b
                })) : n.d && (n.hide(), c && (a.label = c = c.destroy())));
                x && (v(x.text) || v(x.formatter)) && b && b.length && 0 < d.width && 0 < d.height && !b.isFlat ? (x = q({
                    align: e && r && "center",
                    x: e ? !r && 4 : 10,
                    verticalAlign: !e && r && "middle",
                    y: e ? r ? 16 : 10 : r ? 6 : -4,
                    rotation: e && !r && 90
                }, x), this.renderLabel(x, b, r, K)) : c && c.hide();
                return a
            };
            d.prototype.renderLabel = function (a,
                d, f, e) {
                var k = this.axis,
                    l = k.chart.renderer,
                    p = this.label;
                p || (this.label = p = l.text(this.getLabelText(a), 0, 0, a.useHTML).attr({
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || ""),
                    zIndex: e
                }).add(), k.chart.styledMode || p.css(q({
                    textOverflow: "ellipsis"
                }, a.style)));
                e = d.xBounds || [d[0][1], d[1][1], f ? d[2][1] : d[0][1]];
                d = d.yBounds || [d[0][2], d[1][2], f ? d[2][2] : d[0][2]];
                f = D(e);
                l = D(d);
                p.align(a, !1, {
                    x: f,
                    y: l,
                    width: A(e) - f,
                    height: A(d) - l
                });
                p.alignValue && "left" !==
                    p.alignValue || p.css({
                        width: (90 === p.rotation ? k.height - (p.alignAttr.y - k.top) : k.width - (p.alignAttr.x - k.left)) + "px"
                    });
                p.show(!0)
            };
            d.prototype.getLabelText = function (a) {
                return v(a.formatter) ? a.formatter.call(this) : a.text
            };
            d.prototype.destroy = function () {
                I(this.axis.plotLinesAndBands, this);
                delete this.axis;
                H(this)
            };
            return d
        }();
        "";
        "";
        return h
    });
    M(h, "Core/Tooltip.js", [h["Core/FormatUtilities.js"], h["Core/Globals.js"], h["Core/Renderer/RendererUtilities.js"], h["Core/Renderer/RendererRegistry.js"], h["Core/Utilities.js"]],
        function (e, h, A, E, v) {
            var D = e.format,
                I = h.doc,
                z = A.distribute,
                q = v.addEvent,
                l = v.clamp,
                f = v.css,
                d = v.defined,
                a = v.discardElement,
                p = v.extend,
                k = v.fireEvent,
                F = v.isArray,
                B = v.isNumber,
                J = v.isString,
                K = v.merge,
                L = v.pick,
                y = v.splat,
                C = v.syncTimeout;
            e = function () {
                function e(c, a) {
                    this.allowShared = !0;
                    this.container = void 0;
                    this.crosshairs = [];
                    this.distance = 0;
                    this.isHidden = !0;
                    this.isSticky = !1;
                    this.now = {};
                    this.options = {};
                    this.outside = !1;
                    this.chart = c;
                    this.init(c, a)
                }
                e.prototype.applyFilter = function () {
                    var c = this.chart;
                    c.renderer.definition({
                        tagName: "filter",
                        attributes: {
                            id: "drop-shadow-" + c.index,
                            opacity: .5
                        },
                        children: [{
                            tagName: "feGaussianBlur",
                            attributes: {
                                "in": "SourceAlpha",
                                stdDeviation: 1
                            }
                        }, {
                            tagName: "feOffset",
                            attributes: {
                                dx: 1,
                                dy: 1
                            }
                        }, {
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncA",
                                attributes: {
                                    type: "linear",
                                    slope: .3
                                }
                            }]
                        }, {
                            tagName: "feMerge",
                            children: [{
                                tagName: "feMergeNode"
                            }, {
                                tagName: "feMergeNode",
                                attributes: {
                                    "in": "SourceGraphic"
                                }
                            }]
                        }]
                    })
                };
                e.prototype.bodyFormatter = function (c) {
                    return c.map(function (c) {
                        var g = c.series.tooltipOptions;
                        return (g[(c.point.formatPrefix ||
                            "point") + "Formatter"] || c.point.tooltipFormatter).call(c.point, g[(c.point.formatPrefix || "point") + "Format"] || "")
                    })
                };
                e.prototype.cleanSplit = function (c) {
                    this.chart.series.forEach(function (a) {
                        var g = a && a.tt;
                        g && (!g.isActive || c ? a.tt = g.destroy() : g.isActive = !1)
                    })
                };
                e.prototype.defaultFormatter = function (c) {
                    var a = this.points || y(this);
                    var g = [c.tooltipFooterHeaderFormatter(a[0])];
                    g = g.concat(c.bodyFormatter(a));
                    g.push(c.tooltipFooterHeaderFormatter(a[0], !0));
                    return g
                };
                e.prototype.destroy = function () {
                    this.label && (this.label =
                        this.label.destroy());
                    this.split && this.tt && (this.cleanSplit(!0), this.tt = this.tt.destroy());
                    this.renderer && (this.renderer = this.renderer.destroy(), a(this.container));
                    v.clearTimeout(this.hideTimer);
                    v.clearTimeout(this.tooltipTimeout)
                };
                e.prototype.getAnchor = function (c, a) {
                    var g = this.chart,
                        d = g.pointer,
                        n = g.inverted,
                        b = g.plotTop,
                        r = g.plotLeft,
                        f, m, e = 0,
                        t = 0;
                    c = y(c);
                    this.followPointer && a ? ("undefined" === typeof a.chartX && (a = d.normalize(a)), d = [a.chartX - r, a.chartY - b]) : c[0].tooltipPos ? d = c[0].tooltipPos : (c.forEach(function (c) {
                        f =
                            c.series.yAxis;
                        m = c.series.xAxis;
                        e += c.plotX || 0;
                        t += c.plotLow ? (c.plotLow + (c.plotHigh || 0)) / 2 : c.plotY || 0;
                        m && f && (n ? (e += b + g.plotHeight - m.len - m.pos, t += r + g.plotWidth - f.len - f.pos) : (e += m.pos - r, t += f.pos - b))
                    }), e /= c.length, t /= c.length, d = [n ? g.plotWidth - t : e, n ? g.plotHeight - e : t], this.shared && 1 < c.length && a && (n ? d[0] = a.chartX - r : d[1] = a.chartY - b));
                    return d.map(Math.round)
                };
                e.prototype.getLabel = function () {
                    var c = this,
                        a = this.chart.styledMode,
                        g = this.options,
                        u = this.split && this.allowShared,
                        n = "tooltip" + (d(g.className) ? " " + g.className :
                            ""),
                        b = g.style.pointerEvents || (!this.followPointer && g.stickOnContact ? "auto" : "none"),
                        r = function () {
                            c.inContact = !0
                        },
                        e = function (b) {
                            var g = c.chart.hoverSeries;
                            c.inContact = c.shouldStickOnContact() && c.chart.pointer.inClass(b.relatedTarget, "highcharts-tooltip");
                            if (!c.inContact && g && g.onMouseOut) g.onMouseOut()
                        },
                        m, w = this.chart.renderer;
                    if (c.label) {
                        var x = !c.label.hasClass("highcharts-label");
                        (u && !x || !u && x) && c.destroy()
                    }
                    if (!this.label) {
                        if (this.outside) {
                            x = this.chart.options.chart.style;
                            var k = E.getRendererType();
                            this.container = m = h.doc.createElement("div");
                            m.className = "highcharts-tooltip-container";
                            f(m, {
                                position: "absolute",
                                top: "1px",
                                pointerEvents: b,
                                zIndex: Math.max(this.options.style.zIndex || 0, (x && x.zIndex || 0) + 3)
                            });
                            q(m, "mouseenter", r);
                            q(m, "mouseleave", e);
                            h.doc.body.appendChild(m);
                            this.renderer = w = new k(m, 0, 0, x, void 0, void 0, w.styledMode)
                        }
                        u ? this.label = w.g(n) : (this.label = w.label("", 0, 0, g.shape, void 0, void 0, g.useHTML, void 0, n).attr({
                            padding: g.padding,
                            r: g.borderRadius
                        }), a || this.label.attr({
                            fill: g.backgroundColor,
                            "stroke-width": g.borderWidth
                        }).css(g.style).css({
                            pointerEvents: b
                        }).shadow(g.shadow));
                        a && g.shadow && (this.applyFilter(), this.label.attr({
                            filter: "url(#drop-shadow-" + this.chart.index + ")"
                        }));
                        if (c.outside && !c.split) {
                            var l = this.label,
                                p = l.xSetter,
                                C = l.ySetter;
                            l.xSetter = function (b) {
                                p.call(l, c.distance);
                                m.style.left = b + "px"
                            };
                            l.ySetter = function (b) {
                                C.call(l, c.distance);
                                m.style.top = b + "px"
                            }
                        }
                        this.label.on("mouseenter", r).on("mouseleave", e).attr({
                            zIndex: 8
                        }).add()
                    }
                    return this.label
                };
                e.prototype.getPosition = function (c,
                    a, g) {
                    var d = this.chart,
                        n = this.distance,
                        b = {},
                        r = d.inverted && g.h || 0,
                        f = this.outside,
                        m = f ? I.documentElement.clientWidth - 2 * n : d.chartWidth,
                        e = f ? Math.max(I.body.scrollHeight, I.documentElement.scrollHeight, I.body.offsetHeight, I.documentElement.offsetHeight, I.documentElement.clientHeight) : d.chartHeight,
                        t = d.pointer.getChartPosition(),
                        x = function (b) {
                            var r = "x" === b;
                            return [b, r ? m : e, r ? c : a].concat(f ? [r ? c * t.scaleX : a * t.scaleY, r ? t.left - n + (g.plotX + d.plotLeft) * t.scaleX : t.top - n + (g.plotY + d.plotTop) * t.scaleY, 0, r ? m : e] : [r ? c : a, r ?
                                g.plotX + d.plotLeft : g.plotY + d.plotTop, r ? d.plotLeft : d.plotTop, r ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight
                            ])
                        },
                        k = x("y"),
                        l = x("x"),
                        p;
                    x = !!g.negative;
                    !d.polar && d.hoverSeries && d.hoverSeries.yAxis && d.hoverSeries.yAxis.reversed && (x = !x);
                    var C = !this.followPointer && L(g.ttBelow, !d.inverted === x),
                        y = function (c, g, a, m, d, u, e) {
                            var w = f ? "y" === c ? n * t.scaleY : n * t.scaleX : n,
                                G = (a - m) / 2,
                                x = m < d - n,
                                k = d + n + m < g,
                                l = d - w - a + G;
                            d = d + w - G;
                            if (C && k) b[c] = d;
                            else if (!C && x) b[c] = l;
                            else if (x) b[c] = Math.min(e - m, 0 > l - r ? l : l - r);
                            else if (k) b[c] = Math.max(u, d +
                                r + a > g ? d : d + r);
                            else return !1
                        },
                        h = function (c, g, a, m, d) {
                            var r;
                            d < n || d > g - n ? r = !1 : b[c] = d < a / 2 ? 1 : d > g - m / 2 ? g - m - 2 : d - a / 2;
                            return r
                        },
                        Q = function (b) {
                            var c = k;
                            k = l;
                            l = c;
                            p = b
                        },
                        q = function () {
                            !1 !== y.apply(0, k) ? !1 !== h.apply(0, l) || p || (Q(!0), q()) : p ? b.x = b.y = 0 : (Q(!0), q())
                        };
                    (d.inverted || 1 < this.len) && Q();
                    q();
                    return b
                };
                e.prototype.hide = function (c) {
                    var a = this;
                    v.clearTimeout(this.hideTimer);
                    c = L(c, this.options.hideDelay);
                    this.isHidden || (this.hideTimer = C(function () {
                        a.getLabel().fadeOut(c ? void 0 : c);
                        a.isHidden = !0
                    }, c))
                };
                e.prototype.init = function (c,
                    a) {
                    this.chart = c;
                    this.options = a;
                    this.crosshairs = [];
                    this.now = {
                        x: 0,
                        y: 0
                    };
                    this.isHidden = !0;
                    this.split = a.split && !c.inverted && !c.polar;
                    this.shared = a.shared || this.split;
                    this.outside = L(a.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY))
                };
                e.prototype.shouldStickOnContact = function () {
                    return !(this.followPointer || !this.options.stickOnContact)
                };
                e.prototype.isStickyOnContact = function () {
                    return !(!this.shouldStickOnContact() || !this.inContact)
                };
                e.prototype.move = function (c, a, g, d) {
                    var n = this,
                        b = n.now,
                        r = !1 !== n.options.animation &&
                            !n.isHidden && (1 < Math.abs(c - b.x) || 1 < Math.abs(a - b.y)),
                        f = n.followPointer || 1 < n.len;
                    p(b, {
                        x: r ? (2 * b.x + c) / 3 : c,
                        y: r ? (b.y + a) / 2 : a,
                        anchorX: f ? void 0 : r ? (2 * b.anchorX + g) / 3 : g,
                        anchorY: f ? void 0 : r ? (b.anchorY + d) / 2 : d
                    });
                    n.getLabel().attr(b);
                    n.drawTracker();
                    r && (v.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                        n && n.move(c, a, g, d)
                    }, 32))
                };
                e.prototype.refresh = function (c, a) {
                    var g = this.chart,
                        d = this.options,
                        n = y(c),
                        b = n[0],
                        r = [],
                        f = d.formatter || this.defaultFormatter,
                        m = this.shared,
                        e = g.styledMode,
                        x = {};
                    if (d.enabled) {
                        v.clearTimeout(this.hideTimer);
                        this.allowShared = !(!F(c) && c.series && c.series.noSharedTooltip);
                        this.followPointer = !this.split && b.series.tooltipOptions.followPointer;
                        c = this.getAnchor(c, a);
                        var t = c[0],
                            l = c[1];
                        m && this.allowShared ? (g.pointer.applyInactiveState(n), n.forEach(function (b) {
                            b.setState("hover");
                            r.push(b.getLabelConfig())
                        }), x = {
                            x: b.category,
                            y: b.y
                        }, x.points = r) : x = b.getLabelConfig();
                        this.len = r.length;
                        f = f.call(x, this);
                        m = b.series;
                        this.distance = L(m.tooltipOptions.distance, 16);
                        if (!1 === f) this.hide();
                        else {
                            if (this.split && this.allowShared) this.renderSplit(f,
                                n);
                            else {
                                var p = t,
                                    C = l;
                                a && g.pointer.isDirectTouch && (p = a.chartX - g.plotLeft, C = a.chartY - g.plotTop);
                                if (g.polar || !1 === m.options.clip || n.some(function (b) {
                                    return b.series.shouldShowTooltip(p, C)
                                })) a = this.getLabel(), d.style.width && !e || a.css({
                                    width: this.chart.spacingBox.width + "px"
                                }), a.attr({
                                    text: f && f.join ? f.join("") : f
                                }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + L(b.colorIndex, m.colorIndex)), e || a.attr({
                                    stroke: d.borderColor || b.color || m.color || "#666666"
                                }), this.updatePosition({
                                    plotX: t,
                                    plotY: l,
                                    negative: b.negative,
                                    ttBelow: b.ttBelow,
                                    h: c[2] || 0
                                });
                                else {
                                    this.hide();
                                    return
                                }
                            }
                            this.isHidden && this.label && this.label.attr({
                                opacity: 1
                            }).show();
                            this.isHidden = !1
                        }
                        k(this, "refresh")
                    }
                };
                e.prototype.renderSplit = function (c, a) {
                    function g(b, c, g, a, m) {
                        void 0 === m && (m = !0);
                        g ? (c = A ? 0 : ea, b = l(b - a / 2, R.left, R.right - a - (d.outside ? D : 0))) : (c -= H, b = m ? b - a - B : b + B, b = l(b, m ? b : R.left, R.right));
                        return {
                            x: b,
                            y: c
                        }
                    }
                    var d = this,
                        n = d.chart,
                        b = d.chart,
                        r = b.chartWidth,
                        f = b.chartHeight,
                        m = b.plotHeight,
                        e = b.plotLeft,
                        x = b.plotTop,
                        t = b.pointer,
                        k = b.scrollablePixelsY;
                    k = void 0 === k ? 0 : k;
                    var C = b.scrollablePixelsX,
                        y = b.scrollingContainer;
                    y = void 0 === y ? {
                        scrollLeft: 0,
                        scrollTop: 0
                    } : y;
                    var h = y.scrollLeft;
                    y = y.scrollTop;
                    var q = b.styledMode,
                        B = d.distance,
                        Q = d.options,
                        F = d.options.positioner,
                        R = d.outside && "number" !== typeof C ? I.documentElement.getBoundingClientRect() : {
                            left: h,
                            right: h + r,
                            top: y,
                            bottom: y + f
                        },
                        K = d.getLabel(),
                        v = this.renderer || n.renderer,
                        A = !(!n.xAxis[0] || !n.xAxis[0].opposite);
                    n = t.getChartPosition();
                    var D = n.left;
                    n = n.top;
                    var H = x + y,
                        E = 0,
                        ea = m - k;
                    J(c) && (c = [!1, c]);
                    c = c.slice(0, a.length +
                        1).reduce(function (b, c, n) {
                            if (!1 !== c && "" !== c) {
                                n = a[n - 1] || {
                                    isHeader: !0,
                                    plotX: a[0].plotX,
                                    plotY: m,
                                    series: {}
                                };
                                var r = n.isHeader,
                                    f = r ? d : n.series;
                                c = c.toString();
                                var u = f.tt,
                                    w = n.isHeader;
                                var t = n.series;
                                var G = "highcharts-color-" + L(n.colorIndex, t.colorIndex, "none");
                                u || (u = {
                                    padding: Q.padding,
                                    r: Q.borderRadius
                                }, q || (u.fill = Q.backgroundColor, u["stroke-width"] = Q.borderWidth), u = v.label("", 0, 0, Q[w ? "headerShape" : "shape"], void 0, void 0, Q.useHTML).addClass((w ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + G).attr(u).add(K));
                                u.isActive = !0;
                                u.attr({
                                    text: c
                                });
                                q || u.css(Q.style).shadow(Q.shadow).attr({
                                    stroke: Q.borderColor || n.color || t.color || "#333333"
                                });
                                f = f.tt = u;
                                w = f.getBBox();
                                c = w.width + f.strokeWidth();
                                r && (E = w.height, ea += E, A && (H -= E));
                                t = n.plotX;
                                t = void 0 === t ? 0 : t;
                                G = n.plotY;
                                G = void 0 === G ? 0 : G;
                                u = n.series;
                                if (n.isHeader) {
                                    t = e + t;
                                    var k = x + m / 2
                                } else {
                                    var C = u.xAxis,
                                        p = u.yAxis;
                                    t = C.pos + l(t, -B, C.len + B);
                                    u.shouldShowTooltip(0, p.pos - x + G, {
                                        ignoreX: !0
                                    }) && (k = p.pos + G)
                                }
                                t = l(t, R.left - B, R.right + B);
                                "number" === typeof k ? (w = w.height + 1, G = F ? F.call(d, c, w, n) : g(t, k,
                                    r, c), b.push({
                                        align: F ? 0 : void 0,
                                        anchorX: t,
                                        anchorY: k,
                                        boxWidth: c,
                                        point: n,
                                        rank: L(G.rank, r ? 1 : 0),
                                        size: w,
                                        target: G.y,
                                        tt: f,
                                        x: G.x
                                    })) : f.isActive = !1
                            }
                            return b
                        }, []);
                    !F && c.some(function (b) {
                        var c = (d.outside ? D : 0) + b.anchorX;
                        return c < R.left && c + b.boxWidth < R.right ? !0 : c < D - R.left + b.boxWidth && R.right - c > c
                    }) && (c = c.map(function (b) {
                        var c = g(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
                        return p(b, {
                            target: c.y,
                            x: c.x
                        })
                    }));
                    d.cleanSplit();
                    z(c, ea);
                    var M = D,
                        Y = D;
                    c.forEach(function (b) {
                        var c = b.x,
                            g = b.boxWidth;
                        b = b.isHeader;
                        b || (d.outside &&
                            D + c < M && (M = D + c), !b && d.outside && M + g > Y && (Y = D + c))
                    });
                    c.forEach(function (b) {
                        var c = b.x,
                            g = b.anchorX,
                            a = b.pos,
                            m = b.point.isHeader;
                        a = {
                            visibility: "undefined" === typeof a ? "hidden" : "inherit",
                            x: c,
                            y: a + H,
                            anchorX: g,
                            anchorY: b.anchorY
                        };
                        if (d.outside && c < g) {
                            var n = D - M;
                            0 < n && (m || (a.x = c + n, a.anchorX = g + n), m && (a.x = (Y - M) / 2, a.anchorX = g + n))
                        }
                        b.tt.attr(a)
                    });
                    c = d.container;
                    k = d.renderer;
                    d.outside && c && k && (b = K.getBBox(), k.setSize(b.width + b.x, b.height + b.y, !1), c.style.left = M + "px", c.style.top = n + "px")
                };
                e.prototype.drawTracker = function () {
                    if (this.followPointer ||
                        !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                    else {
                        var c = this.chart,
                            a = this.label,
                            g = this.shared ? c.hoverPoints : c.hoverPoint;
                        if (a && g) {
                            var d = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0
                            };
                            g = this.getAnchor(g);
                            var n = a.getBBox();
                            g[0] += c.plotLeft - a.translateX;
                            g[1] += c.plotTop - a.translateY;
                            d.x = Math.min(0, g[0]);
                            d.y = Math.min(0, g[1]);
                            d.width = 0 > g[0] ? Math.max(Math.abs(g[0]), n.width - g[0]) : Math.max(Math.abs(g[0]), n.width);
                            d.height = 0 > g[1] ? Math.max(Math.abs(g[1]), n.height - Math.abs(g[1])) : Math.max(Math.abs(g[1]), n.height);
                            this.tracker ? this.tracker.attr(d) : (this.tracker = a.renderer.rect(d).addClass("highcharts-tracker").add(a), c.styledMode || this.tracker.attr({
                                fill: "rgba(0,0,0,0)"
                            }))
                        }
                    }
                };
                e.prototype.styledModeFormat = function (c) {
                    return c.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
                };
                e.prototype.tooltipFooterHeaderFormatter = function (c, a) {
                    var g = c.series,
                        d = g.tooltipOptions,
                        n = g.xAxis,
                        b = n && n.dateTime;
                    n = {
                        isFooter: a,
                        labelConfig: c
                    };
                    var r = d.xDateFormat,
                        f = d[a ? "footerFormat" : "headerFormat"];
                    k(this, "headerFormatter", n, function (a) {
                        b && !r && B(c.key) && (r = b.getXDateFormat(c.key, d.dateTimeLabelFormats));
                        b && r && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(function (b) {
                            f = f.replace("{point." + b + "}", "{point." + b + ":" + r + "}")
                        });
                        g.chart.styledMode && (f = this.styledModeFormat(f));
                        a.text = D(f, {
                            point: c,
                            series: g
                        }, this.chart)
                    });
                    return n.text
                };
                e.prototype.update = function (c) {
                    this.destroy();
                    K(!0, this.chart.options.tooltip.userOptions, c);
                    this.init(this.chart, K(!0, this.options, c))
                };
                e.prototype.updatePosition = function (c) {
                    var a = this.chart,
                        g = this.options,
                        d = a.pointer,
                        n = this.getLabel();
                    d = d.getChartPosition();
                    var b = (g.positioner || this.getPosition).call(this, n.width, n.height, c),
                        r = c.plotX + a.plotLeft;
                    c = c.plotY + a.plotTop;
                    if (this.outside) {
                        g = g.borderWidth + 2 * this.distance;
                        this.renderer.setSize(n.width + g, n.height + g, !1);
                        if (1 !== d.scaleX || 1 !== d.scaleY) f(this.container, {
                            transform: "scale(" + d.scaleX + ", " + d.scaleY + ")"
                        }), r *= d.scaleX, c *= d.scaleY;
                        r += d.left -
                            b.x;
                        c += d.top - b.y
                    }
                    this.move(Math.round(b.x), Math.round(b.y || 0), r, c)
                };
                return e
            }();
            "";
            return e
        });
    M(h, "Core/Series/Point.js", [h["Core/Renderer/HTML/AST.js"], h["Core/Animation/AnimationUtilities.js"], h["Core/DefaultOptions.js"], h["Core/FormatUtilities.js"], h["Core/Utilities.js"]], function (e, h, A, E, v) {
        var D = h.animObject,
            I = A.defaultOptions,
            z = E.format,
            q = v.addEvent,
            l = v.defined,
            f = v.erase,
            d = v.extend,
            a = v.fireEvent,
            p = v.getNestedProperty,
            k = v.isArray,
            F = v.isFunction,
            B = v.isNumber,
            J = v.isObject,
            K = v.merge,
            L = v.objectEach,
            y = v.pick,
            C = v.syncTimeout,
            x = v.removeEvent,
            c = v.uniqueKey;
        h = function () {
            function t() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }
            t.prototype.animateBeforeDestroy = function () {
                var c = this,
                    a = {
                        x: c.startXPos,
                        opacity: 0
                    },
                    n = c.getGraphicalProps();
                n.singular.forEach(function (b) {
                    c[b] = c[b].animate("dataLabel" === b ? {
                        x: c[b].startXPos,
                        y: c[b].startYPos,
                        opacity: 0
                    } : a)
                });
                n.plural.forEach(function (b) {
                    c[b].forEach(function (b) {
                        b.element && b.animate(d({
                            x: c.startXPos
                        }, b.startYPos ? {
                            x: b.startXPos,
                            y: b.startYPos
                        } : {}))
                    })
                })
            };
            t.prototype.applyOptions = function (c, a) {
                var g = this.series,
                    b = g.options.pointValKey || g.pointValKey;
                c = t.prototype.optionsToObject.call(this, c);
                d(this, c);
                this.options = this.options ? d(this.options, c) : c;
                c.group && delete this.group;
                c.dataLabels && delete this.dataLabels;
                b && (this.y = t.prototype.getNestedProperty.call(this, b));
                this.formatPrefix = (this.isNull =
                    y(this.isValid && !this.isValid(), null === this.x || !B(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof a && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                "undefined" === typeof this.x && g ? this.x = "undefined" === typeof a ? g.autoIncrement() : a : B(c.x) && g.options.relativeXValue && (this.x = g.autoIncrement(c.x));
                return this
            };
            t.prototype.destroy = function () {
                function c() {
                    if (a.graphic || a.dataLabel || a.dataLabels) x(a), a.destroyElements();
                    for (m in a) a[m] = null
                }
                var a =
                    this,
                    d = a.series,
                    b = d.chart;
                d = d.options.dataSorting;
                var r = b.hoverPoints,
                    e = D(a.series.chart.renderer.globalAnimation),
                    m;
                a.legendItem && b.legend.destroyItem(a);
                r && (a.setState(), f(r, a), r.length || (b.hoverPoints = null));
                if (a === b.hoverPoint) a.onMouseOut();
                d && d.enabled ? (this.animateBeforeDestroy(), C(c, e.duration)) : c();
                b.pointCount--
            };
            t.prototype.destroyElements = function (c) {
                var g = this;
                c = g.getGraphicalProps(c);
                c.singular.forEach(function (c) {
                    g[c] = g[c].destroy()
                });
                c.plural.forEach(function (c) {
                    g[c].forEach(function (b) {
                        b.element &&
                            b.destroy()
                    });
                    delete g[c]
                })
            };
            t.prototype.firePointEvent = function (c, d, n) {
                var b = this,
                    g = this.series.options;
                (g.point.events[c] || b.options && b.options.events && b.options.events[c]) && b.importEvents();
                "click" === c && g.allowPointSelect && (n = function (c) {
                    b.select && b.select(null, c.ctrlKey || c.metaKey || c.shiftKey)
                });
                a(b, c, d, n)
            };
            t.prototype.getClassName = function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") +
                    ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            };
            t.prototype.getGraphicalProps = function (c) {
                var g = this,
                    a = [],
                    b = {
                        singular: [],
                        plural: []
                    },
                    d;
                c = c || {
                    graphic: 1,
                    dataLabel: 1
                };
                c.graphic && a.push("graphic", "upperGraphic", "shadowGroup");
                c.dataLabel && a.push("dataLabel", "dataLabelUpper", "connector");
                for (d = a.length; d--;) {
                    var f = a[d];
                    g[f] &&
                        b.singular.push(f)
                } ["dataLabel", "connector"].forEach(function (a) {
                    var d = a + "s";
                    c[a] && g[d] && b.plural.push(d)
                });
                return b
            };
            t.prototype.getLabelConfig = function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            t.prototype.getNestedProperty = function (c) {
                if (c) return 0 === c.indexOf("custom.") ? p(c, this.options) : this[c]
            };
            t.prototype.getZone = function () {
                var c = this.series,
                    a = c.zones;
                c = c.zoneAxis || "y";
                var d, b = 0;
                for (d = a[b]; this[c] >= d.value;) d = a[++b];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = d && d.color && !this.options.color ? d.color : this.nonZonedColor;
                return d
            };
            t.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            };
            t.prototype.init = function (g, d, n) {
                this.series = g;
                this.applyOptions(d, n);
                this.id = l(this.id) ? this.id : c();
                this.resolveColor();
                g.chart.pointCount++;
                a(this, "afterInit");
                return this
            };
            t.prototype.optionsToObject = function (c) {
                var g = this.series,
                    a = g.options.keys,
                    b = a || g.pointArrayMap || ["y"],
                    d = b.length,
                    f = {},
                    m = 0,
                    e = 0;
                if (B(c) || null === c) f[b[0]] = c;
                else if (k(c))
                    for (!a && c.length > d && (g = typeof c[0], "string" === g ? f.name = c[0] : "number" === g && (f.x = c[0]), m++); e < d;) a && "undefined" === typeof c[m] || (0 < b[e].indexOf(".") ? t.prototype.setNestedProperty(f, c[m], b[e]) : f[b[e]] = c[m]), m++, e++;
                else "object" === typeof c && (f = c, c.dataLabels && (g._hasPointLabels = !0), c.marker && (g._hasPointMarkers = !0));
                return f
            };
            t.prototype.resolveColor = function () {
                var c = this.series,
                    a = c.chart.styledMode;
                var d = c.chart.options.chart.colorCount;
                delete this.nonZonedColor;
                if (c.options.colorByPoint) {
                    if (!a) {
                        d = c.options.colors || c.chart.options.colors;
                        var b = d[c.colorCounter];
                        d = d.length
                    }
                    a = c.colorCounter;
                    c.colorCounter++;
                    c.colorCounter === d && (c.colorCounter = 0)
                } else a || (b = c.color), a = c.colorIndex;
                this.colorIndex = y(this.options.colorIndex, a);
                this.color = y(this.options.color, b)
            };
            t.prototype.setNestedProperty = function (c, a, d) {
                d.split(".").reduce(function (b,
                    c, g, d) {
                    b[c] = d.length - 1 === g ? a : J(b[c], !0) ? b[c] : {};
                    return b[c]
                }, c);
                return c
            };
            t.prototype.tooltipFormatter = function (c) {
                var g = this.series,
                    a = g.tooltipOptions,
                    b = y(a.valueDecimals, ""),
                    d = a.valuePrefix || "",
                    f = a.valueSuffix || "";
                g.chart.styledMode && (c = g.chart.tooltip.styledModeFormat(c));
                (g.pointArrayMap || ["y"]).forEach(function (g) {
                    g = "{point." + g;
                    if (d || f) c = c.replace(RegExp(g + "}", "g"), d + g + "}" + f);
                    c = c.replace(RegExp(g + "}", "g"), g + ":,." + b + "f}")
                });
                return z(c, {
                    point: this,
                    series: this.series
                }, g.chart)
            };
            t.prototype.update =
                function (c, a, d, b) {
                    function g() {
                        n.applyOptions(c);
                        var b = f && n.hasDummyGraphic;
                        b = null === n.y ? !b : b;
                        f && b && (n.graphic = f.destroy(), delete n.hasDummyGraphic);
                        J(c, !0) && (f && f.element && c && c.marker && "undefined" !== typeof c.marker.symbol && (n.graphic = f.destroy()), c && c.dataLabels && n.dataLabel && (n.dataLabel = n.dataLabel.destroy()), n.connector && (n.connector = n.connector.destroy()));
                        x = n.index;
                        m.updateParallelArrays(n, x);
                        u.data[x] = J(u.data[x], !0) || J(c, !0) ? n.options : y(c, u.data[x]);
                        m.isDirty = m.isDirtyData = !0;
                        !m.fixedBox &&
                            m.hasCartesianSeries && (e.isDirtyBox = !0);
                        "point" === u.legendType && (e.isDirtyLegend = !0);
                        a && e.redraw(d)
                    }
                    var n = this,
                        m = n.series,
                        f = n.graphic,
                        e = m.chart,
                        u = m.options,
                        x;
                    a = y(a, !0);
                    !1 === b ? g() : n.firePointEvent("update", {
                        options: c
                    }, g)
                };
            t.prototype.remove = function (c, a) {
                this.series.removePoint(this.series.data.indexOf(this), c, a)
            };
            t.prototype.select = function (c, a) {
                var g = this,
                    b = g.series,
                    d = b.chart;
                this.selectedStaging = c = y(c, !g.selected);
                g.firePointEvent(c ? "select" : "unselect", {
                    accumulate: a
                }, function () {
                    g.selected = g.options.selected =
                        c;
                    b.options.data[b.data.indexOf(g)] = g.options;
                    g.setState(c && "select");
                    a || d.getSelectedPoints().forEach(function (b) {
                        var c = b.series;
                        b.selected && b !== g && (b.selected = b.options.selected = !1, c.options.data[c.data.indexOf(b)] = b.options, b.setState(d.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""), b.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            };
            t.prototype.onMouseOver = function (c) {
                var a = this.series.chart,
                    g = a.pointer;
                c = c ? g.normalize(c) : g.getChartCoordinatesFromPoint(this, a.inverted);
                g.runPointActions(c,
                    this)
            };
            t.prototype.onMouseOut = function () {
                var c = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (c.hoverPoints || []).forEach(function (c) {
                    c.setState()
                });
                c.hoverPoints = c.hoverPoint = null
            };
            t.prototype.importEvents = function () {
                if (!this.hasImportedEvents) {
                    var c = this,
                        a = K(c.series.options.point, c.options).events;
                    c.events = a;
                    L(a, function (a, b) {
                        F(a) && q(c, b, a)
                    });
                    this.hasImportedEvents = !0
                }
            };
            t.prototype.setState = function (c, f) {
                var g = this.series,
                    b = this.state,
                    r = g.options.states[c ||
                        "normal"] || {},
                    u = I.plotOptions[g.type].marker && g.options.marker,
                    m = u && !1 === u.enabled,
                    w = u && u.states && u.states[c || "normal"] || {},
                    x = !1 === w.enabled,
                    k = this.marker || {},
                    t = g.chart,
                    l = u && g.markerAttribs,
                    C = g.halo,
                    p, h = g.stateMarkerGraphic;
                c = c || "";
                if (!(c === this.state && !f || this.selected && "select" !== c || !1 === r.enabled || c && (x || m && !1 === w.enabled) || c && k.states && k.states[c] && !1 === k.states[c].enabled)) {
                    this.state = c;
                    l && (p = g.markerAttribs(this, c));
                    if (this.graphic && !this.hasDummyGraphic) {
                        b && this.graphic.removeClass("highcharts-point-" +
                            b);
                        c && this.graphic.addClass("highcharts-point-" + c);
                        if (!t.styledMode) {
                            var q = g.pointAttribs(this, c);
                            var Q = y(t.options.chart.animation, r.animation);
                            g.options.inactiveOtherPoints && B(q.opacity) && ((this.dataLabels || []).forEach(function (b) {
                                b && b.animate({
                                    opacity: q.opacity
                                }, Q)
                            }), this.connector && this.connector.animate({
                                opacity: q.opacity
                            }, Q));
                            this.graphic.animate(q, Q)
                        }
                        p && this.graphic.animate(p, y(t.options.chart.animation, w.animation, u.animation));
                        h && h.hide()
                    } else {
                        if (c && w) {
                            b = k.symbol || g.symbol;
                            h && h.currentSymbol !==
                                b && (h = h.destroy());
                            if (p)
                                if (h) h[f ? "animate" : "attr"]({
                                    x: p.x,
                                    y: p.y
                                });
                                else b && (g.stateMarkerGraphic = h = t.renderer.symbol(b, p.x, p.y, p.width, p.height).add(g.markerGroup), h.currentSymbol = b);
                            !t.styledMode && h && "inactive" !== this.state && h.attr(g.pointAttribs(this, c))
                        }
                        h && (h[c && this.isInside ? "show" : "hide"](), h.element.point = this, h.addClass(this.getClassName(), !0))
                    }
                    r = r.halo;
                    p = (h = this.graphic || h) && h.visibility || "inherit";
                    r && r.size && h && "hidden" !== p && !this.isCluster ? (C || (g.halo = C = t.renderer.path().add(h.parentGroup)),
                        C.show()[f ? "animate" : "attr"]({
                            d: this.haloPath(r.size)
                        }), C.attr({
                            "class": "highcharts-halo highcharts-color-" + y(this.colorIndex, g.colorIndex) + (this.className ? " " + this.className : ""),
                            visibility: p,
                            zIndex: -1
                        }), C.point = this, t.styledMode || C.attr(d({
                            fill: this.color || g.color,
                            "fill-opacity": r.opacity
                        }, e.filterUserAttributes(r.attributes || {})))) : C && C.point && C.point.haloPath && C.animate({
                            d: C.point.haloPath(0)
                        }, null, C.hide);
                    a(this, "afterSetState", {
                        state: c
                    })
                }
            };
            t.prototype.haloPath = function (c) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    c, this.plotY - c, 2 * c, 2 * c)
            };
            return t
        }();
        "";
        return h
    });
    M(h, "Core/Pointer.js", [h["Core/Color/Color.js"], h["Core/Globals.js"], h["Core/Tooltip.js"], h["Core/Utilities.js"]], function (e, h, A, E) {
        var v = e.parse,
            D = h.charts,
            I = h.noop,
            z = E.addEvent,
            q = E.attr,
            l = E.css,
            f = E.defined,
            d = E.extend,
            a = E.find,
            p = E.fireEvent,
            k = E.isNumber,
            F = E.isObject,
            B = E.objectEach,
            J = E.offset,
            K = E.pick,
            L = E.splat;
        e = function () {
            function e(a, d) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.eventsToUnbind = [];
                this.chart = a;
                this.hasDragged = !1;
                this.options = d;
                this.init(a, d)
            }
            e.prototype.applyInactiveState = function (a) {
                var d = [],
                    c;
                (a || []).forEach(function (a) {
                    c = a.series;
                    d.push(c);
                    c.linkedParent && d.push(c.linkedParent);
                    c.linkedSeries && (d = d.concat(c.linkedSeries));
                    c.navigatorSeries && d.push(c.navigatorSeries)
                });
                this.chart.series.forEach(function (c) {
                    -1 === d.indexOf(c) ? c.setState("inactive", !0) : c.options.inactiveOtherPoints && c.setAllPointsToState("inactive")
                })
            };
            e.prototype.destroy = function () {
                var a = this;
                this.eventsToUnbind.forEach(function (a) {
                    return a()
                });
                this.eventsToUnbind = [];
                h.chartCount || (e.unbindDocumentMouseUp && (e.unbindDocumentMouseUp = e.unbindDocumentMouseUp()), e.unbindDocumentTouchEnd && (e.unbindDocumentTouchEnd = e.unbindDocumentTouchEnd()));
                clearInterval(a.tooltipTimeout);
                B(a, function (d, c) {
                    a[c] = void 0
                })
            };
            e.prototype.drag = function (a) {
                var d = this.chart,
                    c = d.options.chart,
                    f = this.zoomHor,
                    g = this.zoomVert,
                    e = d.plotLeft,
                    n = d.plotTop,
                    b = d.plotWidth,
                    r = d.plotHeight,
                    k = this.mouseDownX || 0,
                    m = this.mouseDownY || 0,
                    w = F(c.panning) ? c.panning && c.panning.enabled : c.panning,
                    l = c.panKey && a[c.panKey + "Key"],
                    p = a.chartX,
                    C = a.chartY,
                    h = this.selectionMarker;
                if (!h || !h.touch)
                    if (p < e ? p = e : p > e + b && (p = e + b), C < n ? C = n : C > n + r && (C = n + r), this.hasDragged = Math.sqrt(Math.pow(k - p, 2) + Math.pow(m - C, 2)), 10 < this.hasDragged) {
                        var y = d.isInsidePlot(k - e, m - n, {
                            visiblePlotOnly: !0
                        });
                        !d.hasCartesianSeries && !d.mapView || !this.zoomX && !this.zoomY || !y || l || h || (this.selectionMarker = h = d.renderer.rect(e, n, f ? 1 : b, g ? 1 : r, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), d.styledMode || h.attr({
                            fill: c.selectionMarkerFill ||
                                v("#335cad").setOpacity(.25).get()
                        }));
                        h && f && (f = p - k, h.attr({
                            width: Math.abs(f),
                            x: (0 < f ? 0 : f) + k
                        }));
                        h && g && (f = C - m, h.attr({
                            height: Math.abs(f),
                            y: (0 < f ? 0 : f) + m
                        }));
                        y && !h && w && d.pan(a, c.panning)
                    }
            };
            e.prototype.dragStart = function (a) {
                var d = this.chart;
                d.mouseIsDown = a.type;
                d.cancelClick = !1;
                d.mouseDownX = this.mouseDownX = a.chartX;
                d.mouseDownY = this.mouseDownY = a.chartY
            };
            e.prototype.drop = function (a) {
                var e = this,
                    c = this.chart,
                    t = this.hasPinched;
                if (this.selectionMarker) {
                    var g = this.selectionMarker,
                        u = g.attr ? g.attr("x") : g.x,
                        n = g.attr ?
                            g.attr("y") : g.y,
                        b = g.attr ? g.attr("width") : g.width,
                        r = g.attr ? g.attr("height") : g.height,
                        G = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: [],
                            x: u,
                            y: n,
                            width: b,
                            height: r
                        },
                        m = !!c.mapView;
                    if (this.hasDragged || t) c.axes.forEach(function (c) {
                        if (c.zoomEnabled && f(c.min) && (t || e[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                        }[c.coll]]) && k(u) && k(n)) {
                            var g = c.horiz,
                                d = "touchend" === a.type ? c.minPixelPadding : 0,
                                w = c.toValue((g ? u : n) + d);
                            g = c.toValue((g ? u + b : n + r) - d);
                            G[c.coll].push({
                                axis: c,
                                min: Math.min(w, g),
                                max: Math.max(w, g)
                            });
                            m = !0
                        }
                    }), m && p(c, "selection", G, function (b) {
                        c.zoom(d(b,
                            t ? {
                                animation: !1
                            } : null))
                    });
                    k(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    t && this.scaleGroups()
                }
                c && k(c.index) && (l(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            e.prototype.findNearestKDPoint = function (a, d, c) {
                var f = this.chart,
                    g = f.hoverPoint;
                f = f.tooltip;
                if (g && f && f.isStickyOnContact()) return g;
                var e;
                a.forEach(function (a) {
                    var b = !(a.noSharedTooltip && d) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a =
                        a.searchPoint(c, b);
                    if ((b = F(a, !0) && a.series) && !(b = !F(e, !0))) {
                        b = e.distX - a.distX;
                        var g = e.dist - a.dist,
                            f = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex);
                        b = 0 < (0 !== b && d ? b : 0 !== g ? g : 0 !== f ? f : e.series.index > a.series.index ? -1 : 1)
                    }
                    b && (e = a)
                });
                return e
            };
            e.prototype.getChartCoordinatesFromPoint = function (a, d) {
                var c = a.series,
                    f = c.xAxis;
                c = c.yAxis;
                var g = a.shapeArgs;
                if (f && c) {
                    var e = K(a.clientX, a.plotX),
                        n = a.plotY || 0;
                    a.isNode && g && k(g.x) && k(g.y) && (e = g.x, n = g.y);
                    return d ? {
                        chartX: c.len + c.pos - n,
                        chartY: f.len +
                            f.pos - e
                    } : {
                        chartX: e + f.pos,
                        chartY: n + c.pos
                    }
                }
                if (g && g.x && g.y) return {
                    chartX: g.x,
                    chartY: g.y
                }
            };
            e.prototype.getChartPosition = function () {
                if (this.chartPosition) return this.chartPosition;
                var a = this.chart.container,
                    d = J(a);
                this.chartPosition = {
                    left: d.left,
                    top: d.top,
                    scaleX: 1,
                    scaleY: 1
                };
                var c = a.offsetWidth;
                a = a.offsetHeight;
                2 < c && 2 < a && (this.chartPosition.scaleX = d.width / c, this.chartPosition.scaleY = d.height / a);
                return this.chartPosition
            };
            e.prototype.getCoordinates = function (a) {
                var d = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function (c) {
                    d[c.isXAxis ?
                        "xAxis" : "yAxis"].push({
                            axis: c,
                            value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                        })
                });
                return d
            };
            e.prototype.getHoverData = function (d, f, c, e, g, u) {
                var n = [];
                e = !(!e || !d);
                var b = {
                    chartX: u ? u.chartX : void 0,
                    chartY: u ? u.chartY : void 0,
                    shared: g
                };
                p(this, "beforeGetHoverData", b);
                var r = f && !f.stickyTracking ? [f] : c.filter(function (c) {
                    return b.filter ? b.filter(c) : c.visible && !(!g && c.directTouch) && K(c.options.enableMouseTracking, !0) && c.stickyTracking
                });
                var k = e || !u ? d : this.findNearestKDPoint(r, g, u);
                f = k && k.series;
                k && (g && !f.noSharedTooltip ?
                    (r = c.filter(function (c) {
                        return b.filter ? b.filter(c) : c.visible && !(!g && c.directTouch) && K(c.options.enableMouseTracking, !0) && !c.noSharedTooltip
                    }), r.forEach(function (b) {
                        var c = a(b.points, function (b) {
                            return b.x === k.x && !b.isNull
                        });
                        F(c) && (b.chart.isBoosting && (c = b.getPoint(c)), n.push(c))
                    })) : n.push(k));
                b = {
                    hoverPoint: k
                };
                p(this, "afterGetHoverData", b);
                return {
                    hoverPoint: b.hoverPoint,
                    hoverSeries: f,
                    hoverPoints: n
                }
            };
            e.prototype.getPointFromEvent = function (a) {
                a = a.target;
                for (var d; a && !d;) d = a.point, a = a.parentNode;
                return d
            };
            e.prototype.onTrackerMouseOut = function (a) {
                a = a.relatedTarget || a.toElement;
                var d = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!d || !a || d.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + d.index) && this.inClass(a, "highcharts-tracker"))) d.onMouseOut()
            };
            e.prototype.inClass = function (a, d) {
                for (var c; a;) {
                    if (c = q(a, "class")) {
                        if (-1 !== c.indexOf(d)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            };
            e.prototype.init = function (a, d) {
                this.options =
                    d;
                this.chart = a;
                this.runChartClick = !(!d.chart.events || !d.chart.events.click);
                this.pinchDown = [];
                this.lastValidTouch = {};
                A && (a.tooltip = new A(a, d.tooltip), this.followTouchMove = K(d.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            e.prototype.normalize = function (a, f) {
                var c = a.touches,
                    e = c ? c.length ? c.item(0) : K(c.changedTouches, a.changedTouches)[0] : a;
                f || (f = this.getChartPosition());
                c = e.pageX - f.left;
                e = e.pageY - f.top;
                c /= f.scaleX;
                e /= f.scaleY;
                return d(a, {
                    chartX: Math.round(c),
                    chartY: Math.round(e)
                })
            };
            e.prototype.onContainerClick =
                function (a) {
                    var f = this.chart,
                        c = f.hoverPoint;
                    a = this.normalize(a);
                    var e = f.plotLeft,
                        g = f.plotTop;
                    f.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (p(c.series, "click", d(a, {
                        point: c
                    })), f.hoverPoint && c.firePointEvent("click", a)) : (d(a, this.getCoordinates(a)), f.isInsidePlot(a.chartX - e, a.chartY - g, {
                        visiblePlotOnly: !0
                    }) && p(f, "click", a)))
                };
            e.prototype.onContainerMouseDown = function (a) {
                var d = 1 === ((a.buttons || a.button) & 1);
                a = this.normalize(a);
                if (h.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
                if ("undefined" === typeof a.button || d) this.zoomOption(a), d && a.preventDefault && a.preventDefault(), this.dragStart(a)
            };
            e.prototype.onContainerMouseLeave = function (a) {
                var d = D[K(e.hoverChartIndex, -1)],
                    c = this.chart.tooltip;
                c && c.shouldStickOnContact() && this.inClass(a.relatedTarget, "highcharts-tooltip-container") || (a = this.normalize(a), d && (a.relatedTarget || a.toElement) && (d.pointer.reset(), d.pointer.chartPosition = void 0), c && !c.isHidden && this.reset())
            };
            e.prototype.onContainerMouseEnter = function (a) {
                delete this.chartPosition
            };
            e.prototype.onContainerMouseMove = function (a) {
                var d = this.chart;
                a = this.normalize(a);
                this.setHoverChartIndex();
                a.preventDefault || (a.returnValue = !1);
                ("mousedown" === d.mouseIsDown || this.touchSelect(a)) && this.drag(a);
                d.openMenu || !this.inClass(a.target, "highcharts-tracker") && !d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, {
                    visiblePlotOnly: !0
                }) || (this.inClass(a.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(a))
            };
            e.prototype.onDocumentTouchEnd = function (a) {
                var d = D[K(e.hoverChartIndex,
                    -1)];
                d && d.pointer.drop(a)
            };
            e.prototype.onContainerTouchMove = function (a) {
                if (this.touchSelect(a)) this.onContainerMouseMove(a);
                else this.touch(a)
            };
            e.prototype.onContainerTouchStart = function (a) {
                if (this.touchSelect(a)) this.onContainerMouseDown(a);
                else this.zoomOption(a), this.touch(a, !0)
            };
            e.prototype.onDocumentMouseMove = function (a) {
                var d = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                var f = d.tooltip;
                !c || f && f.isStickyOnContact() || d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, {
                    visiblePlotOnly: !0
                }) ||
                    this.inClass(a.target, "highcharts-tracker") || this.reset()
            };
            e.prototype.onDocumentMouseUp = function (a) {
                var d = D[K(e.hoverChartIndex, -1)];
                d && d.pointer.drop(a)
            };
            e.prototype.pinch = function (a) {
                var f = this,
                    c = f.chart,
                    e = f.pinchDown,
                    g = a.touches || [],
                    u = g.length,
                    n = f.lastValidTouch,
                    b = f.hasZoom,
                    r = {},
                    k = 1 === u && (f.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || f.runChartClick),
                    m = {},
                    w = f.selectionMarker;
                1 < u ? f.initiated = !0 : 1 === u && this.followTouchMove && (f.initiated = !1);
                b && f.initiated && !k && !1 !== a.cancelable &&
                    a.preventDefault();
                [].map.call(g, function (b) {
                    return f.normalize(b)
                });
                "touchstart" === a.type ? ([].forEach.call(g, function (b, c) {
                    e[c] = {
                        chartX: b.chartX,
                        chartY: b.chartY
                    }
                }), n.x = [e[0].chartX, e[1] && e[1].chartX], n.y = [e[0].chartY, e[1] && e[1].chartY], c.axes.forEach(function (b) {
                    if (b.zoomEnabled) {
                        var a = c.bounds[b.horiz ? "h" : "v"],
                            g = b.minPixelPadding,
                            d = b.toPixels(Math.min(K(b.options.min, b.dataMin), b.dataMin)),
                            m = b.toPixels(Math.max(K(b.options.max, b.dataMax), b.dataMax)),
                            f = Math.max(d, m);
                        a.min = Math.min(b.pos, Math.min(d,
                            m) - g);
                        a.max = Math.max(b.pos + b.len, f + g)
                    }
                }), f.res = !0) : f.followTouchMove && 1 === u ? this.runPointActions(f.normalize(a)) : e.length && (p(c, "touchpan", {
                    originalEvent: a
                }, function () {
                    w || (f.selectionMarker = w = d({
                        destroy: I,
                        touch: !0
                    }, c.plotBox));
                    f.pinchTranslate(e, g, r, w, m, n);
                    f.hasPinched = b;
                    f.scaleGroups(r, m)
                }), f.res && (f.res = !1, this.reset(!1, 0)))
            };
            e.prototype.pinchTranslate = function (a, d, c, f, g, e) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, c, f, g, e);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, c, f, g, e)
            };
            e.prototype.pinchTranslateDirection =
                function (a, d, c, f, g, e, n, b) {
                    var r = this.chart,
                        k = a ? "x" : "y",
                        m = a ? "X" : "Y",
                        w = "chart" + m,
                        u = a ? "width" : "height",
                        t = r["plot" + (a ? "Left" : "Top")],
                        l = r.inverted,
                        p = r.bounds[a ? "h" : "v"],
                        x = 1 === d.length,
                        h = d[0][w],
                        y = !x && d[1][w];
                    d = function () {
                        "number" === typeof J && 20 < Math.abs(h - y) && (B = b || Math.abs(R - J) / Math.abs(h - y));
                        C = (t - R) / B + h;
                        q = r["plot" + (a ? "Width" : "Height")] / B
                    };
                    var q, C, B = b || 1,
                        R = c[0][w],
                        J = !x && c[1][w];
                    d();
                    c = C;
                    if (c < p.min) {
                        c = p.min;
                        var F = !0
                    } else c + q > p.max && (c = p.max - q, F = !0);
                    F ? (R -= .8 * (R - n[k][0]), "number" === typeof J && (J -= .8 * (J - n[k][1])),
                        d()) : n[k] = [R, J];
                    l || (e[k] = C - t, e[u] = q);
                    e = l ? 1 / B : B;
                    g[u] = q;
                    g[k] = c;
                    f[l ? a ? "scaleY" : "scaleX" : "scale" + m] = B;
                    f["translate" + m] = e * t + (R - e * h)
                };
            e.prototype.reset = function (a, d) {
                var c = this.chart,
                    f = c.hoverSeries,
                    g = c.hoverPoint,
                    e = c.hoverPoints,
                    n = c.tooltip,
                    b = n && n.shared ? e : g;
                a && b && L(b).forEach(function (b) {
                    b.series.isCartesian && "undefined" === typeof b.plotX && (a = !1)
                });
                if (a) n && b && L(b).length && (n.refresh(b), n.shared && e ? e.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null,
                        b), b.series.yAxis.crosshair && b.series.yAxis.drawCrosshair(null, b))
                }) : g && (g.setState(g.state, !0), c.axes.forEach(function (b) {
                    b.crosshair && g.series[b.coll] === b && b.drawCrosshair(null, g)
                })));
                else {
                    if (g) g.onMouseOut();
                    e && e.forEach(function (b) {
                        b.setState()
                    });
                    if (f) f.onMouseOut();
                    n && n.hide(d);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    c.axes.forEach(function (b) {
                        b.hideCrosshair()
                    });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            };
            e.prototype.runPointActions = function (d, f) {
                var c = this.chart,
                    k = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
                    g = k ? k.shared : !1,
                    u = f || c.hoverPoint,
                    n = u && u.series || c.hoverSeries;
                f = this.getHoverData(u, n, c.series, (!d || "touchmove" !== d.type) && (!!f || n && n.directTouch && this.isDirectTouch), g, d);
                u = f.hoverPoint;
                n = f.hoverSeries;
                var b = f.hoverPoints;
                f = n && n.tooltipOptions.followPointer && !n.tooltipOptions.split;
                g = g && n && !n.noSharedTooltip;
                if (u && (u !== c.hoverPoint || k && k.isHidden)) {
                    (c.hoverPoints || []).forEach(function (c) {
                        -1 === b.indexOf(c) && c.setState()
                    });
                    if (c.hoverSeries !==
                        n) n.onMouseOver();
                    this.applyInactiveState(b);
                    (b || []).forEach(function (b) {
                        b.setState("hover")
                    });
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!u.series) return;
                    c.hoverPoints = b;
                    c.hoverPoint = u;
                    u.firePointEvent("mouseOver");
                    k && k.refresh(g ? b : u, d)
                } else f && k && !k.isHidden && (u = k.getAnchor([{}], d), c.isInsidePlot(u[0], u[1], {
                    visiblePlotOnly: !0
                }) && k.updatePosition({
                    plotX: u[0],
                    plotY: u[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = z(c.container.ownerDocument, "mousemove", function (b) {
                    var c = D[e.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }), this.eventsToUnbind.push(this.unDocMouseMove));
                c.axes.forEach(function (g) {
                    var f = K((g.crosshair || {}).snap, !0),
                        m;
                    f && ((m = c.hoverPoint) && m.series[g.coll] === g || (m = a(b, function (b) {
                        return b.series[g.coll] === g
                    })));
                    m || !f ? g.drawCrosshair(d, m) : g.hideCrosshair()
                })
            };
            e.prototype.scaleGroups = function (a, d) {
                var c = this.chart;
                c.series.forEach(function (f) {
                    var g = a || f.getPlotBox();
                    f.group && (f.xAxis && f.xAxis.zoomEnabled || c.mapView) && (f.group.attr(g), f.markerGroup && (f.markerGroup.attr(g),
                        f.markerGroup.clip(d ? c.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(g))
                });
                c.clipRect.attr(d || c.clipBox)
            };
            e.prototype.setDOMEvents = function () {
                var a = this,
                    d = this.chart.container,
                    c = d.ownerDocument;
                d.onmousedown = this.onContainerMouseDown.bind(this);
                d.onmousemove = this.onContainerMouseMove.bind(this);
                d.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(z(d, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(z(d, "mouseleave", this.onContainerMouseLeave.bind(this)));
                e.unbindDocumentMouseUp || (e.unbindDocumentMouseUp = z(c, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var f = this.chart.renderTo.parentElement; f && "BODY" !== f.tagName;) this.eventsToUnbind.push(z(f, "scroll", function () {
                    delete a.chartPosition
                })), f = f.parentElement;
                h.hasTouch && (this.eventsToUnbind.push(z(d, "touchstart", this.onContainerTouchStart.bind(this), {
                    passive: !1
                })), this.eventsToUnbind.push(z(d, "touchmove", this.onContainerTouchMove.bind(this), {
                    passive: !1
                })), e.unbindDocumentTouchEnd || (e.unbindDocumentTouchEnd =
                    z(c, "touchend", this.onDocumentTouchEnd.bind(this), {
                        passive: !1
                    })))
            };
            e.prototype.setHoverChartIndex = function () {
                var a = this.chart,
                    d = h.charts[K(e.hoverChartIndex, -1)];
                if (d && d !== a) d.pointer.onContainerMouseLeave({
                    relatedTarget: !0
                });
                d && d.mouseIsDown || (e.hoverChartIndex = a.index)
            };
            e.prototype.touch = function (a, d) {
                var c = this.chart,
                    f;
                this.setHoverChartIndex();
                if (1 === a.touches.length)
                    if (a = this.normalize(a), (f = c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                        visiblePlotOnly: !0
                    })) && !c.openMenu) {
                        d && this.runPointActions(a);
                        if ("touchmove" === a.type) {
                            d = this.pinchDown;
                            var g = d[0] ? 4 <= Math.sqrt(Math.pow(d[0].chartX - a.chartX, 2) + Math.pow(d[0].chartY - a.chartY, 2)) : !1
                        }
                        K(g, !0) && this.pinch(a)
                    } else d && this.reset();
                else 2 === a.touches.length && this.pinch(a)
            };
            e.prototype.touchSelect = function (a) {
                return !(!this.chart.options.chart.zoomBySingleTouch || !a.touches || 1 !== a.touches.length)
            };
            e.prototype.zoomOption = function (a) {
                var d = this.chart,
                    c = d.options.chart;
                d = d.inverted;
                var f = c.zoomType || "";
                /touch/.test(a.type) && (f = K(c.pinchType, f));
                this.zoomX =
                    a = /x/.test(f);
                this.zoomY = c = /y/.test(f);
                this.zoomHor = a && !d || c && d;
                this.zoomVert = c && !d || a && d;
                this.hasZoom = a || c
            };
            return e
        }();
        "";
        return e
    });
    M(h, "Core/MSPointer.js", [h["Core/Globals.js"], h["Core/Pointer.js"], h["Core/Utilities.js"]], function (e, h, A) {
        function D() {
            var d = [];
            d.item = function (a) {
                return this[a]
            };
            a(k, function (a) {
                d.push({
                    pageX: a.pageX,
                    pageY: a.pageY,
                    target: a.target
                })
            });
            return d
        }

        function v(a, d, f, e) {
            var k = I[h.hoverChartIndex || NaN];
            "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !k ||
                (k = k.pointer, e(a), k[d]({
                    type: f,
                    target: a.currentTarget,
                    preventDefault: q,
                    touches: D()
                }))
        }
        var H = this && this.__extends || function () {
            var a = function (d, f) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                    };
                return a(d, f)
            };
            return function (d, f) {
                function e() {
                    this.constructor = d
                }
                a(d, f);
                d.prototype = null === f ? Object.create(f) : (e.prototype = f.prototype, new e)
            }
        }(),
            I = e.charts,
            z = e.doc,
            q = e.noop,
            l = e.win,
            f = A.addEvent,
            d = A.css,
            a = A.objectEach,
            p = A.removeEvent,
            k = {},
            F = !!l.PointerEvent;
        return function (a) {
            function h() {
                return null !== a && a.apply(this, arguments) || this
            }
            H(h, a);
            h.isRequired = function () {
                return !(e.hasTouch || !l.PointerEvent && !l.MSPointerEvent)
            };
            h.prototype.batchMSEvents = function (a) {
                a(this.chart.container, F ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                a(this.chart.container, F ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(z, F ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            };
            h.prototype.destroy =
                function () {
                    this.batchMSEvents(p);
                    a.prototype.destroy.call(this)
                };
            h.prototype.init = function (f, e) {
                a.prototype.init.call(this, f, e);
                this.hasZoom && d(f.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            };
            h.prototype.onContainerPointerDown = function (a) {
                v(a, "onContainerTouchStart", "touchstart", function (a) {
                    k[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY,
                        target: a.currentTarget
                    }
                })
            };
            h.prototype.onContainerPointerMove = function (a) {
                v(a, "onContainerTouchMove", "touchmove", function (a) {
                    k[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY
                    };
                    k[a.pointerId].target || (k[a.pointerId].target = a.currentTarget)
                })
            };
            h.prototype.onDocumentPointerUp = function (a) {
                v(a, "onDocumentTouchEnd", "touchend", function (a) {
                    delete k[a.pointerId]
                })
            };
            h.prototype.setDOMEvents = function () {
                a.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(f)
            };
            return h
        }(h)
    });
    M(h, "Core/Legend/Legend.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/FormatUtilities.js"], h["Core/Globals.js"], h["Core/Series/Point.js"], h["Core/Renderer/RendererUtilities.js"],
    h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H) {
        var D = e.animObject,
            z = e.setAnimation,
            q = h.format;
        e = A.isFirefox;
        var l = A.marginNames;
        A = A.win;
        var f = v.distribute,
            d = H.addEvent,
            a = H.createElement,
            p = H.css,
            k = H.defined,
            F = H.discardElement,
            B = H.find,
            J = H.fireEvent,
            K = H.isNumber,
            L = H.merge,
            y = H.pick,
            C = H.relativeLength,
            x = H.stableSort,
            c = H.syncTimeout;
        v = H.wrap;
        H = function () {
            function e(c, a) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth =
                    this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = c;
                this.init(c, a)
            }
            e.prototype.init = function (c, a) {
                this.chart = c;
                this.setOptions(a);
                a.enabled && (this.render(), d(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }),
                    this.proximate ? this.unchartrender = d(this.chart, "render", function () {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
            };
            e.prototype.setOptions = function (c) {
                var a = y(c.padding, 8);
                this.options = c;
                this.chart.styledMode || (this.itemStyle = c.itemStyle, this.itemHiddenStyle = L(this.itemStyle, c.itemHiddenStyle));
                this.itemMarginTop = c.itemMarginTop || 0;
                this.itemMarginBottom = c.itemMarginBottom || 0;
                this.padding = a;
                this.initialItemY = a - 5;
                this.symbolWidth = y(c.symbolWidth,
                    16);
                this.pages = [];
                this.proximate = "proximate" === c.layout && !this.chart.inverted;
                this.baseline = void 0
            };
            e.prototype.update = function (c, a) {
                var d = this.chart;
                this.setOptions(L(!0, this.options, c));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                y(a, !0) && d.redraw();
                J(this, "afterUpdate")
            };
            e.prototype.colorizeItem = function (c, a) {
                c.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var d = this.options,
                        b = c.legendItem,
                        g = c.legendLine,
                        f = c.legendSymbol,
                        m = this.itemHiddenStyle.color;
                    d = a ? d.itemStyle.color : m;
                    var e = a ? c.color || m : m,
                        k = c.options && c.options.marker,
                        u = {
                            fill: e
                        };
                    b && b.css({
                        fill: d,
                        color: d
                    });
                    g && g.attr({
                        stroke: e
                    });
                    f && (k && f.isMarker && (u = c.pointAttribs(), a || (u.stroke = u.fill = m)), f.attr(u))
                }
                J(this, "afterColorizeItem", {
                    item: c,
                    visible: a
                })
            };
            e.prototype.positionItems = function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            };
            e.prototype.positionItem = function (c) {
                var a = this,
                    d = this.options,
                    b = d.symbolPadding,
                    g = !d.rtl,
                    f = c._legendItemPos;
                d =
                    f[0];
                f = f[1];
                var m = c.checkbox,
                    e = c.legendGroup;
                e && e.element && (b = {
                    translateX: g ? d : this.legendWidth - d - 2 * b - 4,
                    translateY: f
                }, g = function () {
                    J(a, "afterPositionItem", {
                        item: c
                    })
                }, k(e.translateY) ? e.animate(b, void 0, g) : (e.attr(b), g()));
                m && (m.x = d, m.y = f)
            };
            e.prototype.destroyItem = function (c) {
                var a = c.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (a) {
                    c[a] && (c[a] = c[a].destroy())
                });
                a && F(c.checkbox)
            };
            e.prototype.destroy = function () {
                function c(c) {
                    this[c] && (this[c] = this[c].destroy())
                }
                this.getAllItems().forEach(function (a) {
                    ["legendItem",
                        "legendGroup"
                    ].forEach(c, a)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(c, this);
                this.display = null
            };
            e.prototype.positionCheckboxes = function () {
                var c = this.group && this.group.alignAttr,
                    a = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                if (c) {
                    var b = c.translateY;
                    this.allItems.forEach(function (g) {
                        var f = g.checkbox;
                        if (f) {
                            var m = b + d + f.y + (this.scrollOffset || 0) + 3;
                            p(f, {
                                left: c.translateX + g.checkboxOffset + f.x - 20 + "px",
                                top: m + "px",
                                display: this.proximate || m > b - 6 && m < b + a - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            };
            e.prototype.renderTitle = function () {
                var c = this.options,
                    a = this.padding,
                    d = c.title,
                    b = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, a - 3, a - 4, null, null, null, c.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }), this.chart.styledMode || this.title.css(d.style), this.title.add(this.group)), d.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), c = this.title.getBBox(), b = c.height, this.offsetWidth = c.width, this.contentGroup.attr({
                    translateY: b
                }));
                this.titleHeight = b
            };
            e.prototype.setText = function (c) {
                var a =
                    this.options;
                c.legendItem.attr({
                    text: a.labelFormat ? q(a.labelFormat, c, this.chart) : a.labelFormatter.call(c)
                })
            };
            e.prototype.renderItem = function (c) {
                var a = this.chart,
                    d = a.renderer,
                    b = this.options,
                    g = this.symbolWidth,
                    f = b.symbolPadding || 0,
                    m = this.itemStyle,
                    e = this.itemHiddenStyle,
                    k = "horizontal" === b.layout ? y(b.itemDistance, 20) : 0,
                    l = !b.rtl,
                    p = !c.series,
                    h = !p && c.series.drawLegendSymbol ? c.series : c,
                    t = h.options,
                    x = this.createCheckboxForItem && t && t.showCheckbox,
                    q = b.useHTML,
                    C = c.options.className,
                    Q = c.legendItem;
                t = g + f + k + (x ?
                    20 : 0);
                Q || (c.legendGroup = d.g("legend-item").addClass("highcharts-" + h.type + "-series highcharts-color-" + c.colorIndex + (C ? " " + C : "") + (p ? " highcharts-series-" + c.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), c.legendItem = Q = d.text("", l ? g + f : -f, this.baseline || 0, q), a.styledMode || Q.css(L(c.visible ? m : e)), Q.attr({
                    align: l ? "left" : "right",
                    zIndex: 2
                }).add(c.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(a.styledMode ? 12 : m.fontSize, Q), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, Q.attr("y", this.baseline),
                    this.symbolHeight = b.symbolHeight || this.fontMetrics.f, b.squareSymbol && (this.symbolWidth = y(b.symbolWidth, Math.max(this.symbolHeight, 16)), t = this.symbolWidth + f + k + (x ? 20 : 0), l && Q.attr("x", this.symbolWidth + f))), h.drawLegendSymbol(this, c), this.setItemEvents && this.setItemEvents(c, Q, q));
                x && !c.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(c);
                this.colorizeItem(c, c.visible);
                !a.styledMode && m.width || Q.css({
                    width: (b.itemWidth || this.widthOption || a.spacingBox.width) - t + "px"
                });
                this.setText(c);
                a = Q.getBBox();
                c.itemWidth = c.checkboxOffset = b.itemWidth || c.legendItemWidth || a.width + t;
                this.maxItemWidth = Math.max(this.maxItemWidth, c.itemWidth);
                this.totalItemWidth += c.itemWidth;
                this.itemHeight = c.itemHeight = Math.round(c.legendItemHeight || a.height || this.symbolHeight)
            };
            e.prototype.layoutItem = function (c) {
                var a = this.options,
                    d = this.padding,
                    b = "horizontal" === a.layout,
                    g = c.itemHeight,
                    f = this.itemMarginBottom,
                    m = this.itemMarginTop,
                    e = b ? y(a.itemDistance, 20) : 0,
                    k = this.maxLegendWidth;
                a = a.alignColumns && this.totalItemWidth > k ? this.maxItemWidth :
                    c.itemWidth;
                b && this.itemX - d + a > k && (this.itemX = d, this.lastLineHeight && (this.itemY += m + this.lastLineHeight + f), this.lastLineHeight = 0);
                this.lastItemY = m + this.itemY + f;
                this.lastLineHeight = Math.max(g, this.lastLineHeight);
                c._legendItemPos = [this.itemX, this.itemY];
                b ? this.itemX += a : (this.itemY += m + g + f, this.lastLineHeight = g);
                this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - d - (c.checkbox ? 0 : e) : a) + d, this.offsetWidth)
            };
            e.prototype.getAllItems = function () {
                var c = [];
                this.chart.series.forEach(function (a) {
                    var d = a &&
                        a.options;
                    a && y(d.showInLegend, k(d.linkedTo) ? !1 : void 0, !0) && (c = c.concat(a.legendItems || ("point" === d.legendType ? a.data : a)))
                });
                J(this, "afterGetAllItems", {
                    allItems: c
                });
                return c
            };
            e.prototype.getAlignment = function () {
                var c = this.options;
                return this.proximate ? c.align.charAt(0) + "tv" : c.floating ? "" : c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0)
            };
            e.prototype.adjustMargins = function (c, a) {
                var d = this.chart,
                    b = this.options,
                    g = this.getAlignment();
                g && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (f,
                    m) {
                    f.test(g) && !k(c[m]) && (d[l[m]] = Math.max(d[l[m]], d.legend[(m + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][m] * b[m % 2 ? "x" : "y"] + y(b.margin, 12) + a[m] + (d.titleOffset[m] || 0)))
                })
            };
            e.prototype.proximatePositions = function () {
                var c = this.chart,
                    a = [],
                    d = "left" === this.options.align;
                this.allItems.forEach(function (b) {
                    var g;
                    var f = d;
                    if (b.yAxis) {
                        b.xAxis.options.reversed && (f = !f);
                        b.points && (g = B(f ? b.points : b.points.slice(0).reverse(), function (b) {
                            return K(b.plotY)
                        }));
                        f = this.itemMarginTop + b.legendItem.getBBox().height + this.itemMarginBottom;
                        var m = b.yAxis.top - c.plotTop;
                        b.visible ? (g = g ? g.plotY : b.yAxis.height, g += m - .3 * f) : g = m + b.yAxis.height;
                        a.push({
                            target: g,
                            size: f,
                            item: b
                        })
                    }
                }, this);
                f(a, c.plotHeight).forEach(function (b) {
                    b.item._legendItemPos && (b.item._legendItemPos[1] = c.plotTop - c.spacing[0] + b.pos)
                })
            };
            e.prototype.render = function () {
                var c = this.chart,
                    a = c.renderer,
                    d = this.options,
                    b = this.padding,
                    f = this.getAllItems(),
                    e = this.group,
                    m = this.box;
                this.itemX = b;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = C(d.width, c.spacingBox.width -
                    b);
                var k = c.spacingBox.width - 2 * b - d.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (k /= 2);
                this.maxLegendWidth = this.widthOption || k;
                e || (this.group = e = a.g("legend").addClass(d.className || "").attr({
                    zIndex: 7
                }).add(), this.contentGroup = a.g().attr({
                    zIndex: 1
                }).add(e), this.scrollGroup = a.g().add(this.contentGroup));
                this.renderTitle();
                x(f, function (b, c) {
                    return (b.options && b.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                });
                d.reversed && f.reverse();
                this.allItems = f;
                this.display = k = !!f.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                f.forEach(this.renderItem, this);
                f.forEach(this.layoutItem, this);
                f = (this.widthOption || this.offsetWidth) + b;
                var l = this.lastItemY + this.lastLineHeight + this.titleHeight;
                l = this.handleOverflow(l);
                l += b;
                m || (this.box = m = a.rect().addClass("highcharts-legend-box").attr({
                    r: d.borderRadius
                }).add(e), m.isNew = !0);
                c.styledMode || m.attr({
                    stroke: d.borderColor,
                    "stroke-width": d.borderWidth || 0,
                    fill: d.backgroundColor || "none"
                }).shadow(d.shadow);
                0 < f &&
                    0 < l && (m[m.isNew ? "attr" : "animate"](m.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: f,
                        height: l
                    }, m.strokeWidth())), m.isNew = !1);
                m[k ? "show" : "hide"]();
                c.styledMode && "none" === e.getStyle("display") && (f = l = 0);
                this.legendWidth = f;
                this.legendHeight = l;
                k && this.align();
                this.proximate || this.positionItems();
                J(this, "afterRender")
            };
            e.prototype.align = function (c) {
                void 0 === c && (c = this.chart.spacingBox);
                var a = this.chart,
                    d = this.options,
                    b = c.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? b += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                    0 < a.titleOffset[2] && (b -= a.titleOffset[2]);
                b !== c.y && (c = L(c, {
                    y: b
                }));
                this.group.align(L(d, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : d.verticalAlign
                }), !0, c)
            };
            e.prototype.handleOverflow = function (c) {
                var a = this,
                    d = this.chart,
                    b = d.renderer,
                    g = this.options,
                    f = g.y,
                    m = "top" === g.verticalAlign,
                    e = this.padding,
                    k = g.maxHeight,
                    l = g.navigation,
                    p = y(l.animation, !0),
                    h = l.arrowSize || 12,
                    t = this.pages,
                    x = this.allItems,
                    q = function (b) {
                        "number" === typeof b ? F.attr({
                            height: b
                        }) : F && (a.clipRect = F.destroy(),
                            a.contentGroup.clip());
                        a.contentGroup.div && (a.contentGroup.div.style.clip = b ? "rect(" + e + "px,9999px," + (e + b) + "px,0)" : "auto")
                    },
                    C = function (c) {
                        a[c] = b.circle(0, 0, 1.3 * h).translate(h / 2, h / 2).add(R);
                        d.styledMode || a[c].attr("fill", "rgba(0,0,0,0.0001)");
                        return a[c]
                    },
                    Q, B;
                f = d.spacingBox.height + (m ? -f : f) - e;
                var R = this.nav,
                    F = this.clipRect;
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (f /= 2);
                k && (f = Math.min(f, k));
                t.length = 0;
                c && 0 < f && c > f && !1 !== l.enabled ? (this.clipHeight = Q = Math.max(f - 20 - this.titleHeight -
                    e, 0), this.currentPage = y(this.currentPage, 1), this.fullHeight = c, x.forEach(function (b, c) {
                        var a = b._legendItemPos[1],
                            d = Math.round(b.legendItem.getBBox().height),
                            g = t.length;
                        if (!g || a - t[g - 1] > Q && (B || a) !== t[g - 1]) t.push(B || a), g++;
                        b.pageIx = g - 1;
                        B && (x[c - 1].pageIx = g - 1);
                        c === x.length - 1 && a + d - t[g - 1] > Q && d <= Q && (t.push(a), b.pageIx = g);
                        a !== B && (B = a)
                    }), F || (F = a.clipRect = b.clipRect(0, e, 9999, 0), a.contentGroup.clip(F)), q(Q), R || (this.nav = R = b.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = b.symbol("triangle", 0, 0, h, h).add(R), C("upTracker").on("click",
                        function () {
                            a.scroll(-1, p)
                        }), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation"), d.styledMode || this.pager.css(l.style), this.pager.add(R), this.down = b.symbol("triangle-down", 0, 0, h, h).add(R), C("downTracker").on("click", function () {
                            a.scroll(1, p)
                        })), a.scroll(0), c = f) : R && (q(), this.nav = R.destroy(), this.scrollGroup.attr({
                            translateY: 1
                        }), this.clipHeight = 0);
                return c
            };
            e.prototype.scroll = function (a, d) {
                var g = this,
                    b = this.chart,
                    f = this.pages,
                    e = f.length,
                    m = this.clipHeight,
                    k = this.options.navigation,
                    l = this.pager,
                    p = this.padding,
                    u = this.currentPage + a;
                u > e && (u = e);
                0 < u && ("undefined" !== typeof d && z(d, b), this.nav.attr({
                    translateX: p,
                    translateY: m + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function (b) {
                    b.attr({
                        "class": 1 === u ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), l.attr({
                    text: u + "/" + e
                }), [this.down, this.downTracker].forEach(function (b) {
                    b.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": u === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                },
                    this), b.styledMode || (this.up.attr({
                        fill: 1 === u ? k.inactiveColor : k.activeColor
                    }), this.upTracker.css({
                        cursor: 1 === u ? "default" : "pointer"
                    }), this.down.attr({
                        fill: u === e ? k.inactiveColor : k.activeColor
                    }), this.downTracker.css({
                        cursor: u === e ? "default" : "pointer"
                    })), this.scrollOffset = -f[u - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = u, this.positionCheckboxes(), a = D(y(d, b.renderer.globalAnimation, !0)), c(function () {
                        J(g, "afterScroll", {
                            currentPage: u
                        })
                    }, a.duration))
            };
            e.prototype.setItemEvents =
                function (c, a, d) {
                    var b = this,
                        g = b.chart.renderer.boxWrapper,
                        f = c instanceof E,
                        m = "highcharts-legend-" + (f ? "point" : "series") + "-active",
                        e = b.chart.styledMode,
                        n = function (a) {
                            b.allItems.forEach(function (b) {
                                c !== b && [b].concat(b.linkedSeries || []).forEach(function (b) {
                                    b.setState(a, !f)
                                })
                            })
                        };
                    (d ? [a, c.legendSymbol] : [c.legendGroup]).forEach(function (d) {
                        if (d) d.on("mouseover", function () {
                            c.visible && n("inactive");
                            c.setState("hover");
                            c.visible && g.addClass(m);
                            e || a.css(b.options.itemHoverStyle)
                        }).on("mouseout", function () {
                            b.chart.styledMode ||
                                a.css(L(c.visible ? b.itemStyle : b.itemHiddenStyle));
                            n("");
                            g.removeClass(m);
                            c.setState()
                        }).on("click", function (b) {
                            var a = function () {
                                c.setVisible && c.setVisible();
                                n(c.visible ? "inactive" : "")
                            };
                            g.removeClass(m);
                            b = {
                                browserEvent: b
                            };
                            c.firePointEvent ? c.firePointEvent("legendItemClick", b, a) : J(c, "legendItemClick", b, a)
                        })
                    })
                };
            e.prototype.createCheckboxForItem = function (c) {
                c.checkbox = a("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: c.selected,
                    defaultChecked: c.selected
                }, this.options.itemCheckboxStyle,
                    this.chart.container);
                d(c.checkbox, "click", function (a) {
                    J(c.series || c, "checkboxClick", {
                        checked: a.target.checked,
                        item: c
                    }, function () {
                        c.select()
                    })
                })
            };
            return e
        }();
        (/Trident\/7\.0/.test(A.navigator && A.navigator.userAgent) || e) && v(H.prototype, "positionItem", function (c, a) {
            var d = this,
                g = function () {
                    a._legendItemPos && c.call(d, a)
                };
            g();
            d.bubbleLegend || setTimeout(g)
        });
        "";
        return H
    });
    M(h, "Core/Series/SeriesRegistry.js", [h["Core/Globals.js"], h["Core/DefaultOptions.js"], h["Core/Series/Point.js"], h["Core/Utilities.js"]],
        function (e, h, A, E) {
            var v = h.defaultOptions,
                D = E.error,
                I = E.extendClass,
                z = E.merge,
                q;
            (function (l) {
                function f(d, a) {
                    var f = v.plotOptions || {},
                        e = a.defaultOptions;
                    a.prototype.pointClass || (a.prototype.pointClass = A);
                    a.prototype.type = d;
                    e && (f[d] = e);
                    l.seriesTypes[d] = a
                }
                l.seriesTypes = e.seriesTypes;
                l.getSeries = function (d, a) {
                    void 0 === a && (a = {});
                    var f = d.options.chart;
                    f = a.type || f.type || f.defaultSeriesType || "";
                    var e = l.seriesTypes[f];
                    l || D(17, !0, d, {
                        missingModuleFor: f
                    });
                    f = new e;
                    "function" === typeof f.init && f.init(d, a);
                    return f
                };
                l.registerSeriesType = f;
                l.seriesType = function (d, a, e, k, h) {
                    var p = v.plotOptions || {};
                    a = a || "";
                    p[d] = z(p[a], e);
                    f(d, I(l.seriesTypes[a] || function () { }, k));
                    l.seriesTypes[d].prototype.type = d;
                    h && (l.seriesTypes[d].prototype.pointClass = I(A, h));
                    return l.seriesTypes[d]
                }
            })(q || (q = {}));
            return q
        });
    M(h, "Core/Chart/Chart.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Axis/Axis.js"], h["Core/FormatUtilities.js"], h["Core/Foundation.js"], h["Core/Globals.js"], h["Core/Legend/Legend.js"], h["Core/MSPointer.js"], h["Core/DefaultOptions.js"],
    h["Core/Pointer.js"], h["Core/Renderer/RendererRegistry.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Renderer/SVG/SVGRenderer.js"], h["Core/Time.js"], h["Core/Utilities.js"], h["Core/Renderer/HTML/AST.js"]
    ], function (e, h, A, E, v, H, I, z, q, l, f, d, a, p, k) {
        var F = e.animate,
            B = e.animObject,
            J = e.setAnimation,
            K = A.numberFormat,
            L = E.registerEventOptions,
            y = v.charts,
            C = v.doc,
            x = v.marginNames,
            c = v.svg,
            t = v.win,
            g = z.defaultOptions,
            u = z.defaultTime,
            n = f.seriesTypes,
            b = p.addEvent,
            r = p.attr,
            G = p.cleanRecursively,
            m = p.createElement,
            w =
                p.css,
            N = p.defined,
            X = p.discardElement,
            P = p.erase,
            O = p.error,
            W = p.extend,
            Z = p.find,
            D = p.fireEvent,
            aa = p.getStyle,
            Q = p.isArray,
            ba = p.isNumber,
            R = p.isObject,
            ca = p.isString,
            T = p.merge,
            U = p.objectEach,
            S = p.pick,
            da = p.pInt,
            ia = p.relativeLength,
            M = p.removeEvent,
            fa = p.splat,
            Y = p.syncTimeout,
            ja = p.uniqueKey;
        e = function () {
            function f(b, c, a) {
                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend =
                    this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                this.sharedClips = {};
                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                this.getArgs(b, c, a)
            }
            f.chart = function (b, c, a) {
                return new f(b, c, a)
            };
            f.prototype.getArgs = function (b, c, a) {
                ca(b) || b.nodeName ? (this.renderTo = b, this.init(c, a)) : this.init(b, c)
            };
            f.prototype.init =
                function (b, c) {
                    var d = b.plotOptions || {};
                    D(this, "init", {
                        args: arguments
                    }, function () {
                        var f = T(g, b),
                            m = f.chart;
                        U(f.plotOptions, function (b, c) {
                            R(b) && (b.tooltip = d[c] && T(d[c].tooltip) || void 0)
                        });
                        f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                        this.userOptions = b;
                        this.margin = [];
                        this.spacing = [];
                        this.bounds = {
                            h: {},
                            v: {}
                        };
                        this.labelCollectors = [];
                        this.callback = c;
                        this.isResizing = 0;
                        this.options = f;
                        this.axes = [];
                        this.series = [];
                        this.time = b.time && Object.keys(b.time).length ? new a(b.time) : v.time;
                        this.numberFormatter = m.numberFormatter || K;
                        this.styledMode = m.styledMode;
                        this.hasCartesianSeries = m.showAxes;
                        this.index = y.length;
                        y.push(this);
                        v.chartCount++;
                        L(this, m);
                        this.xAxis = [];
                        this.yAxis = [];
                        this.pointCount = this.colorCounter = this.symbolCounter = 0;
                        D(this, "afterInit");
                        this.firstRender()
                    })
                };
            f.prototype.initSeries = function (b) {
                var c = this.options.chart;
                c = b.type || c.type || c.defaultSeriesType;
                var a = n[c];
                a || O(17, !0, this, {
                    missingModuleFor: c
                });
                c = new a;
                "function" === typeof c.init && c.init(this, b);
                return c
            };
            f.prototype.setSeriesData =
                function () {
                    this.getSeriesOrderByLinks().forEach(function (b) {
                        b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
                    })
                };
            f.prototype.getSeriesOrderByLinks = function () {
                return this.series.concat().sort(function (b, c) {
                    return b.linkedSeries.length || c.linkedSeries.length ? c.linkedSeries.length - b.linkedSeries.length : 0
                })
            };
            f.prototype.orderSeries = function (b) {
                var c = this.series;
                b = b || 0;
                for (var a = c.length; b < a; ++b) c[b] && (c[b].index = b, c[b].name = c[b].getName())
            };
            f.prototype.isInsidePlot = function (b, c, a) {
                void 0 ===
                    a && (a = {});
                var d = this.inverted,
                    g = this.plotBox,
                    f = this.plotLeft,
                    m = this.plotTop,
                    e = this.scrollablePlotBox,
                    n = 0;
                var r = 0;
                a.visiblePlotOnly && this.scrollingContainer && (r = this.scrollingContainer, n = r.scrollLeft, r = r.scrollTop);
                var k = a.series;
                g = a.visiblePlotOnly && e || g;
                e = a.inverted ? c : b;
                c = a.inverted ? b : c;
                b = {
                    x: e,
                    y: c,
                    isInsidePlot: !0
                };
                if (!a.ignoreX) {
                    var w = k && (d ? k.yAxis : k.xAxis) || {
                        pos: f,
                        len: Infinity
                    };
                    e = a.paneCoordinates ? w.pos + e : f + e;
                    e >= Math.max(n + f, w.pos) && e <= Math.min(n + f + g.width, w.pos + w.len) || (b.isInsidePlot = !1)
                } !a.ignoreY &&
                    b.isInsidePlot && (d = k && (d ? k.xAxis : k.yAxis) || {
                        pos: m,
                        len: Infinity
                    }, a = a.paneCoordinates ? d.pos + c : m + c, a >= Math.max(r + m, d.pos) && a <= Math.min(r + m + g.height, d.pos + d.len) || (b.isInsidePlot = !1));
                D(this, "afterIsInsidePlot", b);
                return b.isInsidePlot
            };
            f.prototype.redraw = function (b) {
                D(this, "beforeRedraw");
                var c = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                    a = this.series,
                    d = this.pointer,
                    g = this.legend,
                    f = this.userOptions.legend,
                    m = this.renderer,
                    e = m.isHidden(),
                    n = [],
                    r = this.isDirtyBox,
                    k = this.isDirtyLegend;
                this.setResponsive &&
                    this.setResponsive(!1);
                J(this.hasRendered ? b : !1, this);
                e && this.temporaryDisplay();
                this.layOutTitles();
                for (b = a.length; b--;) {
                    var w = a[b];
                    if (w.options.stacking || w.options.centerInCategory) {
                        var l = !0;
                        if (w.isDirty) {
                            var p = !0;
                            break
                        }
                    }
                }
                if (p)
                    for (b = a.length; b--;) w = a[b], w.options.stacking && (w.isDirty = !0);
                a.forEach(function (b) {
                    b.isDirty && ("point" === b.options.legendType ? ("function" === typeof b.updateTotals && b.updateTotals(), k = !0) : f && (f.labelFormatter || f.labelFormat) && (k = !0));
                    b.isDirtyData && D(b, "updatedData")
                });
                k && g &&
                    g.options.enabled && (g.render(), this.isDirtyLegend = !1);
                l && this.getStacks();
                c.forEach(function (b) {
                    b.updateNames();
                    b.setScale()
                });
                this.getMargins();
                c.forEach(function (b) {
                    b.isDirty && (r = !0)
                });
                c.forEach(function (b) {
                    var c = b.min + "," + b.max;
                    b.extKey !== c && (b.extKey = c, n.push(function () {
                        D(b, "afterSetExtremes", W(b.eventArgs, b.getExtremes()));
                        delete b.eventArgs
                    }));
                    (r || l) && b.redraw()
                });
                r && this.drawChartBox();
                D(this, "predraw");
                a.forEach(function (b) {
                    (r || b.isDirty) && b.visible && b.redraw();
                    b.isDirtyData = !1
                });
                d && d.reset(!0);
                m.draw();
                D(this, "redraw");
                D(this, "render");
                e && this.temporaryDisplay(!0);
                n.forEach(function (b) {
                    b.call()
                })
            };
            f.prototype.get = function (b) {
                function c(c) {
                    return c.id === b || c.options && c.options.id === b
                }
                for (var a = this.series, d = Z(this.axes, c) || Z(this.series, c), g = 0; !d && g < a.length; g++) d = Z(a[g].points || [], c);
                return d
            };
            f.prototype.getAxes = function () {
                var b = this,
                    c = this.options,
                    a = c.xAxis = fa(c.xAxis || {});
                c = c.yAxis = fa(c.yAxis || {});
                D(this, "getAxes");
                a.forEach(function (b, c) {
                    b.index = c;
                    b.isX = !0
                });
                c.forEach(function (b, c) {
                    b.index =
                        c
                });
                a.concat(c).forEach(function (c) {
                    new h(b, c)
                });
                D(this, "afterGetAxes")
            };
            f.prototype.getSelectedPoints = function () {
                return this.series.reduce(function (b, c) {
                    c.getPointsCollection().forEach(function (c) {
                        S(c.selectedStaging, c.selected) && b.push(c)
                    });
                    return b
                }, [])
            };
            f.prototype.getSelectedSeries = function () {
                return this.series.filter(function (b) {
                    return b.selected
                })
            };
            f.prototype.setTitle = function (b, c, a) {
                this.applyDescription("title", b);
                this.applyDescription("subtitle", c);
                this.applyDescription("caption", void 0);
                this.layOutTitles(a)
            };
            f.prototype.applyDescription = function (b, c) {
                var a = this,
                    d = "title" === b ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    };
                d = this.options[b] = T(!this.styledMode && {
                    style: d
                }, this.options[b], c);
                var g = this[b];
                g && c && (this[b] = g = g.destroy());
                d && !g && (g = this.renderer.text(d.text, 0, 0, d.useHTML).attr({
                    align: d.align,
                    "class": "highcharts-" + b,
                    zIndex: d.zIndex || 4
                }).add(), g.update = function (c) {
                    a[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    }[b]](c)
                }, this.styledMode ||
                    g.css(d.style), this[b] = g)
            };
            f.prototype.layOutTitles = function (b) {
                var c = [0, 0, 0],
                    a = this.renderer,
                    d = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function (b) {
                    var g = this[b],
                        f = this.options[b],
                        m = f.verticalAlign || "top";
                    b = "title" === b ? "top" === m ? -3 : 0 : "top" === m ? c[0] + 2 : 0;
                    var e;
                    if (g) {
                        this.styledMode || (e = f.style && f.style.fontSize);
                        e = a.fontMetrics(e, g).b;
                        g.css({
                            width: (f.width || d.width + (f.widthAdjust || 0)) + "px"
                        });
                        var n = Math.round(g.getBBox(f.useHTML).height);
                        g.align(W({
                            y: "bottom" === m ? e : b + e,
                            height: n
                        }, f), !1,
                            "spacingBox");
                        f.floating || ("top" === m ? c[0] = Math.ceil(c[0] + n) : "bottom" === m && (c[2] = Math.ceil(c[2] + n)))
                    }
                }, this);
                c[0] && "top" === (this.options.title.verticalAlign || "top") && (c[0] += this.options.title.margin);
                c[2] && "bottom" === this.options.caption.verticalAlign && (c[2] += this.options.caption.margin);
                var g = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
                this.titleOffset = c;
                D(this, "afterLayOutTitles");
                !this.isDirtyBox && g && (this.isDirtyBox = this.isDirtyLegend = g, this.hasRendered && S(b, !0) && this.isDirtyBox &&
                    this.redraw())
            };
            f.prototype.getChartSize = function () {
                var b = this.options.chart,
                    c = b.width;
                b = b.height;
                var a = this.renderTo;
                N(c) || (this.containerWidth = aa(a, "width"));
                N(b) || (this.containerHeight = aa(a, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, ia(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            };
            f.prototype.temporaryDisplay = function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (w(c, c.hcOrigStyle), delete c.hcOrigStyle),
                        c.hcOrigDetached && (C.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        C.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, C.body.appendChild(c));
                        if ("none" === aa(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), w(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === C.body) break
                    }
            };
            f.prototype.setClassName =
                function (b) {
                    this.container.className = "highcharts-container " + (b || "")
                };
            f.prototype.getContainer = function () {
                var b = this.options,
                    a = b.chart,
                    g = ja(),
                    f, e = this.renderTo;
                e || (this.renderTo = e = a.renderTo);
                ca(e) && (this.renderTo = e = C.getElementById(e));
                e || O(13, !0, this);
                var n = da(r(e, "data-highcharts-chart"));
                ba(n) && y[n] && y[n].hasRendered && y[n].destroy();
                r(e, "data-highcharts-chart", this.index);
                e.innerHTML = "";
                a.skipClone || e.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                n = this.chartWidth;
                var k = this.chartHeight;
                w(e, {
                    overflow: "hidden"
                });
                this.styledMode || (f = W({
                    position: "relative",
                    overflow: "hidden",
                    width: n + "px",
                    height: k + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    userSelect: "none",
                    "touch-action": "manipulation",
                    outline: "none"
                }, a.style || {}));
                this.container = g = m("div", {
                    id: g
                }, f, e);
                this._cursor = g.style.cursor;
                this.renderer = new (a.renderer || !c ? l.getRendererType(a.renderer) : d)(g, n, k, void 0, a.forExport, b.exporting && b.exporting.allowHTML, this.styledMode);
                J(void 0,
                    this);
                this.setClassName(a.className);
                if (this.styledMode)
                    for (var p in b.defs) this.renderer.definition(b.defs[p]);
                else this.renderer.setStyle(a.style);
                this.renderer.chartIndex = this.index;
                D(this, "afterGetContainer")
            };
            f.prototype.getMargins = function (b) {
                var c = this.spacing,
                    a = this.margin,
                    d = this.titleOffset;
                this.resetMargins();
                d[0] && !N(a[0]) && (this.plotTop = Math.max(this.plotTop, d[0] + c[0]));
                d[2] && !N(a[2]) && (this.marginBottom = Math.max(this.marginBottom, d[2] + c[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(a,
                    c);
                D(this, "getMargins");
                b || this.getAxisMargins()
            };
            f.prototype.getAxisMargins = function () {
                var b = this,
                    c = b.axisOffset = [0, 0, 0, 0],
                    a = b.colorAxis,
                    d = b.margin,
                    g = function (b) {
                        b.forEach(function (b) {
                            b.visible && b.getOffset()
                        })
                    };
                b.hasCartesianSeries ? g(b.axes) : a && a.length && g(a);
                x.forEach(function (a, g) {
                    N(d[g]) || (b[a] += c[g])
                });
                b.setChartSize()
            };
            f.prototype.reflow = function (b) {
                var c = this,
                    a = c.options.chart,
                    d = c.renderTo,
                    g = N(a.width) && N(a.height),
                    f = a.width || aa(d, "width");
                a = a.height || aa(d, "height");
                d = b ? b.target : t;
                delete c.pointer.chartPosition;
                if (!g && !c.isPrinting && f && a && (d === t || d === C)) {
                    if (f !== c.containerWidth || a !== c.containerHeight) p.clearTimeout(c.reflowTimeout), c.reflowTimeout = Y(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = f;
                    c.containerHeight = a
                }
            };
            f.prototype.setReflow = function (c) {
                var a = this;
                !1 === c || this.unbindReflow ? !1 === c && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = b(t, "resize", function (b) {
                    a.options && a.reflow(b)
                }), b(this, "destroy", this.unbindReflow))
            };
            f.prototype.setSize =
                function (b, c, a) {
                    var d = this,
                        g = d.renderer;
                    d.isResizing += 1;
                    J(a, d);
                    a = g.globalAnimation;
                    d.oldChartHeight = d.chartHeight;
                    d.oldChartWidth = d.chartWidth;
                    "undefined" !== typeof b && (d.options.chart.width = b);
                    "undefined" !== typeof c && (d.options.chart.height = c);
                    d.getChartSize();
                    d.styledMode || (a ? F : w)(d.container, {
                        width: d.chartWidth + "px",
                        height: d.chartHeight + "px"
                    }, a);
                    d.setChartSize(!0);
                    g.setSize(d.chartWidth, d.chartHeight, a);
                    d.axes.forEach(function (b) {
                        b.isDirty = !0;
                        b.setScale()
                    });
                    d.isDirtyLegend = !0;
                    d.isDirtyBox = !0;
                    d.layOutTitles();
                    d.getMargins();
                    d.redraw(a);
                    d.oldChartHeight = null;
                    D(d, "resize");
                    Y(function () {
                        d && D(d, "endResize", null, function () {
                            --d.isResizing
                        })
                    }, B(a).duration)
                };
            f.prototype.setChartSize = function (b) {
                var c = this.inverted,
                    a = this.renderer,
                    d = this.chartWidth,
                    g = this.chartHeight,
                    f = this.options.chart,
                    m = this.spacing,
                    e = this.clipOffset,
                    n, r, k, w;
                this.plotLeft = n = Math.round(this.plotLeft);
                this.plotTop = r = Math.round(this.plotTop);
                this.plotWidth = k = Math.max(0, Math.round(d - n - this.marginRight));
                this.plotHeight = w = Math.max(0, Math.round(g -
                    r - this.marginBottom));
                this.plotSizeX = c ? w : k;
                this.plotSizeY = c ? k : w;
                this.plotBorderWidth = f.plotBorderWidth || 0;
                this.spacingBox = a.spacingBox = {
                    x: m[3],
                    y: m[0],
                    width: d - m[3] - m[1],
                    height: g - m[0] - m[2]
                };
                this.plotBox = a.plotBox = {
                    x: n,
                    y: r,
                    width: k,
                    height: w
                };
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                d = Math.ceil(Math.max(c, e[3]) / 2);
                g = Math.ceil(Math.max(c, e[0]) / 2);
                this.clipBox = {
                    x: d,
                    y: g,
                    width: Math.floor(this.plotSizeX - Math.max(c, e[1]) / 2 - d),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, e[2]) / 2 - g))
                };
                b || (this.axes.forEach(function (b) {
                    b.setAxisSize();
                    b.setAxisTranslation()
                }), a.alignElements());
                D(this, "afterSetChartSize", {
                    skipAxes: b
                })
            };
            f.prototype.resetMargins = function () {
                D(this, "resetMargins");
                var b = this,
                    c = b.options.chart;
                ["margin", "spacing"].forEach(function (a) {
                    var d = c[a],
                        g = R(d) ? d : [d, d, d, d];
                    ["Top", "Right", "Bottom", "Left"].forEach(function (d, f) {
                        b[a][f] = S(c[a + d], g[f])
                    })
                });
                x.forEach(function (c, a) {
                    b[c] = S(b.margin[a], b.spacing[a])
                });
                b.axisOffset = [0, 0, 0, 0];
                b.clipOffset = [0, 0, 0, 0]
            };
            f.prototype.drawChartBox = function () {
                var b = this.options.chart,
                    c = this.renderer,
                    a = this.chartWidth,
                    d = this.chartHeight,
                    g = this.styledMode,
                    f = this.plotBGImage,
                    m = b.backgroundColor,
                    e = b.plotBackgroundColor,
                    n = b.plotBackgroundImage,
                    r = this.plotLeft,
                    k = this.plotTop,
                    w = this.plotWidth,
                    l = this.plotHeight,
                    p = this.plotBox,
                    u = this.clipRect,
                    h = this.clipBox,
                    t = this.chartBackground,
                    G = this.plotBackground,
                    x = this.plotBorder,
                    y, q = "animate";
                t || (this.chartBackground = t = c.rect().addClass("highcharts-background").add(), q = "attr");
                if (g) var Q = y = t.strokeWidth();
                else {
                    Q = b.borderWidth || 0;
                    y = Q + (b.shadow ? 8 : 0);
                    m = {
                        fill: m || "none"
                    };
                    if (Q || t["stroke-width"]) m.stroke = b.borderColor, m["stroke-width"] = Q;
                    t.attr(m).shadow(b.shadow)
                }
                t[q]({
                    x: y / 2,
                    y: y / 2,
                    width: a - y - Q % 2,
                    height: d - y - Q % 2,
                    r: b.borderRadius
                });
                q = "animate";
                G || (q = "attr", this.plotBackground = G = c.rect().addClass("highcharts-plot-background").add());
                G[q](p);
                g || (G.attr({
                    fill: e || "none"
                }).shadow(b.plotShadow), n && (f ? (n !== f.attr("href") && f.attr("href", n), f.animate(p)) : this.plotBGImage = c.image(n, r, k, w, l).add()));
                u ? u.animate({
                    width: h.width,
                    height: h.height
                }) : this.clipRect = c.clipRect(h);
                q = "animate";
                x || (q = "attr", this.plotBorder = x = c.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                g || x.attr({
                    stroke: b.plotBorderColor,
                    "stroke-width": b.plotBorderWidth || 0,
                    fill: "none"
                });
                x[q](x.crisp({
                    x: r,
                    y: k,
                    width: w,
                    height: l
                }, -x.strokeWidth()));
                this.isDirtyBox = !1;
                D(this, "afterDrawChartBox")
            };
            f.prototype.propFromSeries = function () {
                var b = this,
                    c = b.options.chart,
                    a = b.options.series,
                    d, g, f;
                ["inverted", "angular", "polar"].forEach(function (m) {
                    g = n[c.type || c.defaultSeriesType];
                    f = c[m] || g && g.prototype[m];
                    for (d = a &&
                        a.length; !f && d--;)(g = n[a[d].type]) && g.prototype[m] && (f = !0);
                    b[m] = f
                })
            };
            f.prototype.linkSeries = function () {
                var b = this,
                    c = b.series;
                c.forEach(function (b) {
                    b.linkedSeries.length = 0
                });
                c.forEach(function (c) {
                    var a = c.options.linkedTo;
                    ca(a) && (a = ":previous" === a ? b.series[c.index - 1] : b.get(a)) && a.linkedParent !== c && (a.linkedSeries.push(c), c.linkedParent = a, a.enabledDataSorting && c.setDataSortingOptions(), c.visible = S(c.options.visible, a.options.visible, c.visible))
                });
                D(this, "afterLinkSeries")
            };
            f.prototype.renderSeries = function () {
                this.series.forEach(function (b) {
                    b.translate();
                    b.render()
                })
            };
            f.prototype.renderLabels = function () {
                var b = this,
                    c = b.options.labels;
                c.items && c.items.forEach(function (a) {
                    var d = W(c.style, a.style),
                        g = da(d.left) + b.plotLeft,
                        f = da(d.top) + b.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    b.renderer.text(a.html, g, f).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            };
            f.prototype.render = function () {
                var b = this.axes,
                    c = this.colorAxis,
                    a = this.renderer,
                    d = this.options,
                    g = function (b) {
                        b.forEach(function (b) {
                            b.visible && b.render()
                        })
                    },
                    f = 0;
                this.setTitle();
                this.legend = new H(this, d.legend);
                this.getStacks &&
                    this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                d = this.plotWidth;
                b.some(function (b) {
                    if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return f = 21, !0
                });
                var m = this.plotHeight = Math.max(this.plotHeight - f, 0);
                b.forEach(function (b) {
                    b.setScale()
                });
                this.getAxisMargins();
                var e = 1.1 < d / this.plotWidth,
                    n = 1.05 < m / this.plotHeight;
                if (e || n) b.forEach(function (b) {
                    (b.horiz && e || !b.horiz && n) && b.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? g(b) : c && c.length && g(c);
                this.seriesGroup || (this.seriesGroup = a.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            };
            f.prototype.addCredits = function (b) {
                var c = this,
                    a = T(!0, this.options.credits, b);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (t.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }), c.styledMode ||
                    this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function (b) {
                        c.credits = c.credits.destroy();
                        c.addCredits(b)
                    })
            };
            f.prototype.destroy = function () {
                var b = this,
                    c = b.axes,
                    a = b.series,
                    d = b.container,
                    g = d && d.parentNode,
                    f;
                D(b, "destroy");
                b.renderer.forExport ? P(y, b) : y[b.index] = void 0;
                v.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                M(b);
                for (f = c.length; f--;) c[f] = c[f].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (f = a.length; f--;) a[f] = a[f].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (c) {
                    var a = b[c];
                    a && a.destroy && (b[c] = a.destroy())
                });
                d && (d.innerHTML = "", M(d), g && X(d));
                U(b, function (c, a) {
                    delete b[a]
                })
            };
            f.prototype.firstRender = function () {
                var b = this,
                    c = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (Q(c.series) ?
                        c.series : []).forEach(function (c) {
                            b.initSeries(c)
                        });
                    b.linkSeries();
                    b.setSeriesData();
                    D(b, "beforeRender");
                    q && (I.isRequired() ? b.pointer = new I(b, c) : b.pointer = new q(b, c));
                    b.render();
                    b.pointer.getChartPosition();
                    if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
                    b.temporaryDisplay(!0)
                }
            };
            f.prototype.onload = function () {
                this.callbacks.concat([this.callback]).forEach(function (b) {
                    b && "undefined" !== typeof this.index && b.apply(this, [this])
                }, this);
                D(this, "load");
                D(this, "render");
                N(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            };
            f.prototype.addSeries = function (b, c, a) {
                var d = this,
                    g;
                b && (c = S(c, !0), D(d, "addSeries", {
                    options: b
                }, function () {
                    g = d.initSeries(b);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    g.enabledDataSorting && g.setData(b.data, !1);
                    D(d, "afterAddSeries", {
                        series: g
                    });
                    c && d.redraw(a)
                }));
                return g
            };
            f.prototype.addAxis = function (b, c, a, d) {
                return this.createAxis(c ? "xAxis" : "yAxis", {
                    axis: b,
                    redraw: a,
                    animation: d
                })
            };
            f.prototype.addColorAxis = function (b, c, a) {
                return this.createAxis("colorAxis", {
                    axis: b,
                    redraw: c,
                    animation: a
                })
            };
            f.prototype.createAxis =
                function (b, c) {
                    b = new h(this, T(c.axis, {
                        index: this[b].length,
                        isX: "xAxis" === b
                    }));
                    S(c.redraw, !0) && this.redraw(c.animation);
                    return b
                };
            f.prototype.showLoading = function (c) {
                var a = this,
                    d = a.options,
                    g = d.loading,
                    f = function () {
                        e && w(e, {
                            left: a.plotLeft + "px",
                            top: a.plotTop + "px",
                            width: a.plotWidth + "px",
                            height: a.plotHeight + "px"
                        })
                    },
                    e = a.loadingDiv,
                    n = a.loadingSpan;
                e || (a.loadingDiv = e = m("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, a.container));
                n || (a.loadingSpan = n = m("span", {
                    className: "highcharts-loading-inner"
                },
                    null, e), b(a, "redraw", f));
                e.className = "highcharts-loading";
                k.setElementHTML(n, S(c, d.lang.loading, ""));
                a.styledMode || (w(e, W(g.style, {
                    zIndex: 10
                })), w(n, g.labelStyle), a.loadingShown || (w(e, {
                    opacity: 0,
                    display: ""
                }), F(e, {
                    opacity: g.style.opacity || .5
                }, {
                    duration: g.showDuration || 0
                })));
                a.loadingShown = !0;
                f()
            };
            f.prototype.hideLoading = function () {
                var b = this.options,
                    c = this.loadingDiv;
                c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || F(c, {
                    opacity: 0
                }, {
                    duration: b.loading.hideDuration || 100,
                    complete: function () {
                        w(c, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            };
            f.prototype.update = function (b, c, d, g) {
                var f = this,
                    m = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    e = b.isResponsiveOptions,
                    n = [],
                    r, k;
                D(f, "update", {
                    options: b
                });
                e || f.setResponsive(!1, !0);
                b = G(b, f.options);
                f.userOptions = T(f.userOptions, b);
                var w = b.chart;
                if (w) {
                    T(!0, f.options.chart, w);
                    "className" in w && f.setClassName(w.className);
                    "reflow" in w && f.setReflow(w.reflow);
                    if ("inverted" in w || "polar" in w || "type" in
                        w) {
                        f.propFromSeries();
                        var l = !0
                    }
                    "alignTicks" in w && (l = !0);
                    "events" in w && L(this, w);
                    U(w, function (b, c) {
                        -1 !== f.propsRequireUpdateSeries.indexOf("chart." + c) && (r = !0); - 1 !== f.propsRequireDirtyBox.indexOf(c) && (f.isDirtyBox = !0); - 1 !== f.propsRequireReflow.indexOf(c) && (e ? f.isDirtyBox = !0 : k = !0)
                    });
                    !f.styledMode && w.style && f.renderer.setStyle(f.options.chart.style || {})
                } !f.styledMode && b.colors && (this.options.colors = b.colors);
                b.time && (this.time === u && (this.time = new a(b.time)), T(!0, f.options.time, b.time));
                U(b, function (c,
                    a) {
                    if (f[a] && "function" === typeof f[a].update) f[a].update(c, !1);
                    else if ("function" === typeof f[m[a]]) f[m[a]](c);
                    else "colors" !== a && -1 === f.collectionsWithUpdate.indexOf(a) && T(!0, f.options[a], b[a]);
                    "chart" !== a && -1 !== f.propsRequireUpdateSeries.indexOf(a) && (r = !0)
                });
                this.collectionsWithUpdate.forEach(function (c) {
                    if (b[c]) {
                        var a = [];
                        f[c].forEach(function (b, c) {
                            b.options.isInternal || a.push(S(b.options.index, c))
                        });
                        fa(b[c]).forEach(function (b, g) {
                            var m = N(b.id),
                                e;
                            m && (e = f.get(b.id));
                            !e && f[c] && (e = f[c][a ? a[g] : g]) && m &&
                                N(e.options.id) && (e = void 0);
                            e && e.coll === c && (e.update(b, !1), d && (e.touched = !0));
                            !e && d && f.collectionsWithInit[c] && (f.collectionsWithInit[c][0].apply(f, [b].concat(f.collectionsWithInit[c][1] || []).concat([!1])).touched = !0)
                        });
                        d && f[c].forEach(function (b) {
                            b.touched || b.options.isInternal ? delete b.touched : n.push(b)
                        })
                    }
                });
                n.forEach(function (b) {
                    b.chart && b.remove && b.remove(!1)
                });
                l && f.axes.forEach(function (b) {
                    b.update({}, !1)
                });
                r && f.getSeriesOrderByLinks().forEach(function (b) {
                    b.chart && b.update({}, !1)
                }, this);
                l = w &&
                    w.width;
                w = w && (ca(w.height) ? ia(w.height, l || f.chartWidth) : w.height);
                k || ba(l) && l !== f.chartWidth || ba(w) && w !== f.chartHeight ? f.setSize(l, w, g) : S(c, !0) && f.redraw(g);
                D(f, "afterUpdate", {
                    options: b,
                    redraw: c,
                    animation: g
                })
            };
            f.prototype.setSubtitle = function (b, c) {
                this.applyDescription("subtitle", b);
                this.layOutTitles(c)
            };
            f.prototype.setCaption = function (b, c) {
                this.applyDescription("caption", b);
                this.layOutTitles(c)
            };
            f.prototype.showResetZoom = function () {
                function b() {
                    c.zoomOut()
                }
                var c = this,
                    a = g.lang,
                    d = c.options.chart.resetZoomButton,
                    f = d.theme,
                    m = f.states,
                    e = "chart" === d.relativeTo || "spacingBox" === d.relativeTo ? null : "scrollablePlotBox";
                D(this, "beforeShowResetZoom", null, function () {
                    c.resetZoomButton = c.renderer.button(a.resetZoom, null, null, b, f, m && m.hover).attr({
                        align: d.position.align,
                        title: a.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, e)
                });
                D(this, "afterShowResetZoom")
            };
            f.prototype.zoomOut = function () {
                D(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            };
            f.prototype.zoom = function (b) {
                var c = this,
                    a = c.pointer,
                    d = c.inverted ? a.mouseDownX : a.mouseDownY,
                    g = !1,
                    f;
                !b || b.resetSelection ? (c.axes.forEach(function (b) {
                    f = b.zoom()
                }), a.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function (b) {
                    var m = b.axis,
                        e = c.inverted ? m.left : m.top,
                        n = c.inverted ? e + m.width : e + m.height,
                        r = m.isXAxis,
                        k = !1;
                    if (!r && d >= e && d <= n || r || !N(d)) k = !0;
                    a[r ? "zoomX" : "zoomY"] && k && (f = m.zoom(b.min, b.max), m.displayBtn && (g = !0))
                });
                var m = c.resetZoomButton;
                g && !m ? c.showResetZoom() : !g && R(m) && (c.resetZoomButton = m.destroy());
                f && c.redraw(S(c.options.chart.animation, b && b.animation,
                    100 > c.pointCount))
            };
            f.prototype.pan = function (b, c) {
                var a = this,
                    d = a.hoverPoints;
                c = "object" === typeof c ? c : {
                    enabled: c,
                    type: "x"
                };
                var g = a.options.chart,
                    f = a.options.mapNavigation && a.options.mapNavigation.enabled;
                g && g.panning && (g.panning = c);
                var m = c.type,
                    e;
                D(this, "pan", {
                    originalEvent: b
                }, function () {
                    d && d.forEach(function (b) {
                        b.setState()
                    });
                    var c = a.xAxis;
                    "xy" === m ? c = c.concat(a.yAxis) : "y" === m && (c = a.yAxis);
                    var g = {};
                    c.forEach(function (c) {
                        if (c.options.panningEnabled && !c.options.isInternal) {
                            var d = c.horiz,
                                n = b[d ? "chartX" :
                                    "chartY"];
                            d = d ? "mouseDownX" : "mouseDownY";
                            var r = a[d],
                                k = c.minPointOffset || 0,
                                w = c.reversed && !a.inverted || !c.reversed && a.inverted ? -1 : 1,
                                l = c.getExtremes(),
                                p = c.toValue(r - n, !0) + k * w,
                                u = c.toValue(r + c.len - n, !0) - (k * w || c.isXAxis && c.pointRangePadding || 0),
                                h = u < p;
                            w = c.hasVerticalPanning();
                            r = h ? u : p;
                            p = h ? p : u;
                            var t = c.panningState;
                            !w || c.isXAxis || t && !t.isDirty || c.series.forEach(function (b) {
                                var c = b.getProcessedData(!0);
                                c = b.getExtremes(c.yData, !0);
                                t || (t = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                ba(c.dataMin) && ba(c.dataMax) &&
                                    (t.startMin = Math.min(S(b.options.threshold, Infinity), c.dataMin, t.startMin), t.startMax = Math.max(S(b.options.threshold, -Infinity), c.dataMax, t.startMax))
                            });
                            w = Math.min(S(t && t.startMin, l.dataMin), k ? l.min : c.toValue(c.toPixels(l.min) - c.minPixelPadding));
                            u = Math.max(S(t && t.startMax, l.dataMax), k ? l.max : c.toValue(c.toPixels(l.max) + c.minPixelPadding));
                            c.panningState = t;
                            c.isOrdinal || (k = w - r, 0 < k && (p += k, r = w), k = p - u, 0 < k && (p = u, r -= k), c.series.length && r !== l.min && p !== l.max && r >= w && p <= u && (c.setExtremes(r, p, !1, !1, {
                                trigger: "pan"
                            }),
                                a.resetZoomButton || f || r === w || p === u || !m.match("y") || (a.showResetZoom(), c.displayBtn = !1), e = !0), g[d] = n)
                        }
                    });
                    U(g, function (b, c) {
                        a[c] = b
                    });
                    e && a.redraw(!1);
                    w(a.container, {
                        cursor: "move"
                    })
                })
            };
            return f
        }();
        W(e.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [e.prototype.addAxis, [!0]],
                yAxis: [e.prototype.addAxis, [!1]],
                series: [e.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "series"],
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        "";
        return e
    });
    M(h, "Core/Legend/LegendSymbol.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.merge,
            A = e.pick,
            E;
        (function (e) {
            e.drawLineMarker = function (e) {
                var v = this.options,
                    z = e.symbolWidth,
                    q = e.symbolHeight,
                    l = q / 2,
                    f = this.chart.renderer,
                    d = this.legendGroup;
                e = e.baseline - Math.round(.3 * e.fontMetrics.b);
                var a = {},
                    p = v.marker;
                this.chart.styledMode || (a = {
                    "stroke-width": v.lineWidth || 0
                }, v.dashStyle && (a.dashstyle = v.dashStyle));
                this.legendLine = f.path([
                    ["M", 0, e],
                    ["L", z, e]
                ]).addClass("highcharts-graph").attr(a).add(d);
                p && !1 !== p.enabled && z && (v = Math.min(A(p.radius, l), l), 0 === this.symbol.indexOf("url") && (p = h(p, {
                    width: q,
                    height: q
                }), v = 0), this.legendSymbol = z = f.symbol(this.symbol, z / 2 - v, e - v, 2 * v, 2 * v, p).addClass("highcharts-point").add(d), z.isMarker = !0)
            };
            e.drawRectangle =
                function (e, h) {
                    var v = e.symbolHeight,
                        q = e.options.squareSymbol;
                    h.legendSymbol = this.chart.renderer.rect(q ? (e.symbolWidth - v) / 2 : 0, e.baseline - v + 1, q ? v : e.symbolWidth, v, A(e.options.symbolRadius, v / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(h.legendGroup)
                }
        })(E || (E = {}));
        return E
    });
    M(h, "Core/Series/SeriesDefaults.js", [], function () {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                animation: {},
                align: "center",
                defer: !0,
                formatter: function () {
                    var e = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : e(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }
    });
    M(h, "Core/Series/Series.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/DefaultOptions.js"], h["Core/Foundation.js"], h["Core/Globals.js"], h["Core/Legend/LegendSymbol.js"], h["Core/Series/Point.js"], h["Core/Series/SeriesDefaults.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Renderer/SVG/SVGElement.js"],
    h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H, I, z, q, l) {
        var f = e.animObject,
            d = e.setAnimation,
            a = h.defaultOptions,
            p = A.registerEventOptions,
            k = E.hasTouch,
            F = E.svg,
            B = E.win,
            J = z.seriesTypes,
            K = l.addEvent,
            L = l.arrayMax,
            y = l.arrayMin,
            C = l.clamp,
            x = l.cleanRecursively,
            c = l.correctFloat,
            t = l.defined,
            g = l.erase,
            u = l.error,
            n = l.extend,
            b = l.find,
            r = l.fireEvent,
            G = l.getNestedProperty,
            m = l.isArray,
            w = l.isNumber,
            N = l.isString,
            D = l.merge,
            P = l.objectEach,
            O = l.pick,
            W = l.removeEvent,
            Z = l.splat,
            ha = l.syncTimeout;
        e = function () {
            function e() {
                this.zones =
                    this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
            }
            e.prototype.init = function (b, c) {
                r(this, "init", {
                    options: c
                });
                var a = this,
                    d = b.series;
                this.eventsToUnbind = [];
                a.chart = b;
                a.options = a.setOptions(c);
                c = a.options;
                a.linkedSeries = [];
                a.bindAxes();
                n(a, {
                    name: c.name,
                    state: "",
                    visible: !1 !== c.visible,
                    selected: !0 === c.selected
                });
                p(this, c);
                var g =
                    c.events;
                if (g && g.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) b.runTrackerClick = !0;
                a.getColor();
                a.getSymbol();
                a.parallelArrays.forEach(function (b) {
                    a[b + "Data"] || (a[b + "Data"] = [])
                });
                a.isCartesian && (b.hasCartesianSeries = !0);
                var f;
                d.length && (f = d[d.length - 1]);
                a._i = O(f && f._i, -1) + 1;
                a.opacity = a.options.opacity;
                b.orderSeries(this.insert(d));
                c.dataSorting && c.dataSorting.enabled ? a.setDataSortingOptions() : a.points || a.data || a.setData(c.data, !1);
                r(this, "afterInit")
            };
            e.prototype.is = function (b) {
                return J[b] &&
                    this instanceof J[b]
            };
            e.prototype.insert = function (b) {
                var c = this.options.index,
                    a;
                if (w(c)) {
                    for (a = b.length; a--;)
                        if (c >= O(b[a].options.index, b[a]._i)) {
                            b.splice(a + 1, 0, this);
                            break
                        } - 1 === a && b.unshift(this);
                    a += 1
                } else b.push(this);
                return O(a, b.length - 1)
            };
            e.prototype.bindAxes = function () {
                var b = this,
                    c = b.options,
                    a = b.chart,
                    d;
                r(this, "bindAxes", null, function () {
                    (b.axisTypes || []).forEach(function (g) {
                        var f = 0;
                        a[g].forEach(function (a) {
                            d = a.options;
                            if (c[g] === f && !d.isInternal || "undefined" !== typeof c[g] && c[g] === d.id || "undefined" ===
                                typeof c[g] && 0 === d.index) b.insert(a.series), b[g] = a, a.isDirty = !0;
                            d.isInternal || f++
                        });
                        b[g] || b.optionalAxis === g || u(18, !0, a)
                    })
                });
                r(this, "afterBindAxes")
            };
            e.prototype.updateParallelArrays = function (b, c) {
                var a = b.series,
                    d = arguments,
                    g = w(c) ? function (d) {
                        var g = "y" === d && a.toYData ? a.toYData(b) : b[d];
                        a[d + "Data"][c] = g
                    } : function (b) {
                        Array.prototype[c].apply(a[b + "Data"], Array.prototype.slice.call(d, 2))
                    };
                a.parallelArrays.forEach(g)
            };
            e.prototype.hasData = function () {
                return this.visible && "undefined" !== typeof this.dataMax &&
                    "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
            };
            e.prototype.autoIncrement = function (b) {
                var c = this.options,
                    a = c.pointIntervalUnit,
                    d = c.relativeXValue,
                    g = this.chart.time,
                    f = this.xIncrement,
                    e;
                f = O(f, c.pointStart, 0);
                this.pointInterval = e = O(this.pointInterval, c.pointInterval, 1);
                d && w(b) && (e *= b);
                a && (c = new g.Date(f), "day" === a ? g.set("Date", c, g.get("Date", c) + e) : "month" === a ? g.set("Month", c, g.get("Month", c) + e) : "year" === a && g.set("FullYear", c, g.get("FullYear", c) + e), e = c.getTime() - f);
                if (d &&
                    w(b)) return f + e;
                this.xIncrement = f + e;
                return f
            };
            e.prototype.setDataSortingOptions = function () {
                var b = this.options;
                n(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                t(b.pointRange) || (b.pointRange = 1)
            };
            e.prototype.setOptions = function (b) {
                var c = this.chart,
                    d = c.options,
                    g = d.plotOptions,
                    f = c.userOptions || {};
                b = D(b);
                c = c.styledMode;
                var e = {
                    plotOptions: g,
                    userOptions: b
                };
                r(this, "setOptions", e);
                var m = e.plotOptions[this.type],
                    n = f.plotOptions || {};
                this.userOptions = e.userOptions;
                f = D(m, g.series, f.plotOptions &&
                    f.plotOptions[this.type], b);
                this.tooltipOptions = D(a.tooltip, a.plotOptions.series && a.plotOptions.series.tooltip, a.plotOptions[this.type].tooltip, d.tooltip.userOptions, g.series && g.series.tooltip, g[this.type].tooltip, b.tooltip);
                this.stickyTracking = O(b.stickyTracking, n[this.type] && n[this.type].stickyTracking, n.series && n.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : f.stickyTracking);
                null === m.marker && delete f.marker;
                this.zoneAxis = f.zoneAxis;
                g = this.zones = (f.zones || []).slice();
                !f.negativeColor && !f.negativeFillColor || f.zones || (d = {
                    value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
                    className: "highcharts-negative"
                }, c || (d.color = f.negativeColor, d.fillColor = f.negativeFillColor), g.push(d));
                g.length && t(g[g.length - 1].value) && g.push(c ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                r(this, "afterSetOptions", {
                    options: f
                });
                return f
            };
            e.prototype.getName = function () {
                return O(this.options.name, "Series " + (this.index + 1))
            };
            e.prototype.getCyclic = function (b, c, a) {
                var d = this.chart,
                    g = this.userOptions,
                    f = b + "Index",
                    e = b + "Counter",
                    m = a ? a.length : O(d.options.chart[b + "Count"], d[b + "Count"]);
                if (!c) {
                    var n = O(g[f], g["_" + f]);
                    t(n) || (d.series.length || (d[e] = 0), g["_" + f] = n = d[e] % m, d[e] += 1);
                    a && (c = a[n])
                }
                "undefined" !== typeof n && (this[f] = n);
                this[b] = c
            };
            e.prototype.getColor = function () {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || a.plotOptions[this.type].color, this.chart.options.colors)
            };
            e.prototype.getPointsCollection = function () {
                return (this.hasGroupedData ?
                    this.points : this.data) || []
            };
            e.prototype.getSymbol = function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            };
            e.prototype.findPointIndex = function (c, a) {
                var d = c.id,
                    g = c.x,
                    f = this.points,
                    e = this.options.dataSorting,
                    m, n;
                if (d) e = this.chart.get(d), e instanceof H && (m = e);
                else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue)
                    if (m = function (b) {
                        return !b.touched && b.index === c.index
                    }, e && e.matchByName ? m = function (b) {
                        return !b.touched && b.name === c.name
                    } : this.options.relativeXValue &&
                        (m = function (b) {
                            return !b.touched && b.options.x === c.x
                        }), m = b(f, m), !m) return;
                if (m) {
                    var r = m && m.index;
                    "undefined" !== typeof r && (n = !0)
                }
                "undefined" === typeof r && w(g) && (r = this.xData.indexOf(g, a)); - 1 !== r && "undefined" !== typeof r && this.cropped && (r = r >= this.cropStart ? r - this.cropStart : r);
                !n && w(r) && f[r] && f[r].touched && (r = void 0);
                return r
            };
            e.prototype.updateData = function (b, c) {
                var a = this.options,
                    d = a.dataSorting,
                    g = this.points,
                    f = [],
                    e = this.requireSorting,
                    m = b.length === g.length,
                    n, r, k, l = !0;
                this.xIncrement = null;
                b.forEach(function (b,
                    c) {
                    var r = t(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b) || {},
                        l = r.x;
                    if (r.id || w(l)) {
                        if (r = this.findPointIndex(r, k), -1 === r || "undefined" === typeof r ? f.push(b) : g[r] && b !== a.data[r] ? (g[r].update(b, !1, null, !1), g[r].touched = !0, e && (k = r + 1)) : g[r] && (g[r].touched = !0), !m || c !== r || d && d.enabled || this.hasDerivedData) n = !0
                    } else f.push(b)
                }, this);
                if (n)
                    for (b = g.length; b--;)(r = g[b]) && !r.touched && r.remove && r.remove(!1, c);
                else !m || d && d.enabled ? l = !1 : (b.forEach(function (b, c) {
                    b !== g[c].y && g[c].update && g[c].update(b,
                        !1, null, !1)
                }), f.length = 0);
                g.forEach(function (b) {
                    b && (b.touched = !1)
                });
                if (!l) return !1;
                f.forEach(function (b) {
                    this.addPoint(b, !1, null, null, !1)
                }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = L(this.xData), this.autoIncrement());
                return !0
            };
            e.prototype.setData = function (b, c, a, d) {
                var g = this,
                    f = g.points,
                    e = f && f.length || 0,
                    n = g.options,
                    r = g.chart,
                    k = n.dataSorting,
                    l = g.xAxis,
                    p = n.turboThreshold,
                    h = this.xData,
                    t = this.yData,
                    x = g.pointArrayMap;
                x = x && x.length;
                var G = n.keys,
                    y, q = 0,
                    C = 1,
                    B = null;
                b = b || [];
                var Q = b.length;
                c = O(c, !0);
                k && k.enabled && (b = this.sortData(b));
                !1 !== d && Q && e && !g.cropped && !g.hasGroupedData && g.visible && !g.isSeriesBoosting && (y = this.updateData(b, a));
                if (!y) {
                    g.xIncrement = null;
                    g.colorCounter = 0;
                    this.parallelArrays.forEach(function (b) {
                        g[b + "Data"].length = 0
                    });
                    if (p && Q > p)
                        if (B = g.getFirstValidPoint(b), w(B))
                            for (a = 0; a < Q; a++) h[a] = this.autoIncrement(), t[a] = b[a];
                        else if (m(B))
                            if (x)
                                if (B.length === x)
                                    for (a = 0; a < Q; a++) h[a] = this.autoIncrement(), t[a] = b[a];
                                else
                                    for (a = 0; a < Q; a++) d = b[a], h[a] = d[0], t[a] = d.slice(1,
                                        x + 1);
                            else if (G && (q = G.indexOf("x"), C = G.indexOf("y"), q = 0 <= q ? q : 0, C = 0 <= C ? C : 1), 1 === B.length && (C = 0), q === C)
                                for (a = 0; a < Q; a++) h[a] = this.autoIncrement(), t[a] = b[a][C];
                            else
                                for (a = 0; a < Q; a++) d = b[a], h[a] = d[q], t[a] = d[C];
                        else u(12, !1, r);
                    else
                        for (a = 0; a < Q; a++) "undefined" !== typeof b[a] && (d = {
                            series: g
                        }, g.pointClass.prototype.applyOptions.apply(d, [b[a]]), g.updateParallelArrays(d, a));
                    t && N(t[0]) && u(14, !0, r);
                    g.data = [];
                    g.options.data = g.userOptions.data = b;
                    for (a = e; a--;) f[a] && f[a].destroy && f[a].destroy();
                    l && (l.minRange = l.userMinRange);
                    g.isDirty = r.isDirtyBox = !0;
                    g.isDirtyData = !!f;
                    a = !1
                }
                "point" === n.legendType && (this.processData(), this.generatePoints());
                c && r.redraw(a)
            };
            e.prototype.sortData = function (b) {
                var c = this,
                    a = c.options.dataSorting.sortKey || "y",
                    d = function (b, c) {
                        return t(c) && b.pointClass.prototype.optionsToObject.call({
                            series: b
                        }, c) || {}
                    };
                b.forEach(function (a, g) {
                    b[g] = d(c, a);
                    b[g].index = g
                }, this);
                b.concat().sort(function (b, c) {
                    b = G(a, b);
                    c = G(a, c);
                    return c < b ? -1 : c > b ? 1 : 0
                }).forEach(function (b, c) {
                    b.x = c
                }, this);
                c.linkedSeries && c.linkedSeries.forEach(function (c) {
                    var a =
                        c.options,
                        g = a.data;
                    a.dataSorting && a.dataSorting.enabled || !g || (g.forEach(function (a, f) {
                        g[f] = d(c, a);
                        b[f] && (g[f].x = b[f].x, g[f].index = f)
                    }), c.setData(g, !1))
                });
                return b
            };
            e.prototype.getProcessedData = function (b) {
                var c = this.xAxis,
                    a = this.options,
                    d = a.cropThreshold,
                    g = b || this.getExtremesFromAll || a.getExtremesFromAll,
                    f = this.isCartesian;
                b = c && c.val2lin;
                a = !(!c || !c.logarithmic);
                var e = 0,
                    m = this.xData,
                    n = this.yData,
                    r = this.requireSorting;
                var k = !1;
                var w = m.length;
                if (c) {
                    k = c.getExtremes();
                    var l = k.min;
                    var p = k.max;
                    k = c.categories &&
                        !c.names.length
                }
                if (f && this.sorted && !g && (!d || w > d || this.forceCrop))
                    if (m[w - 1] < l || m[0] > p) m = [], n = [];
                    else if (this.yData && (m[0] < l || m[w - 1] > p)) {
                        var h = this.cropData(this.xData, this.yData, l, p);
                        m = h.xData;
                        n = h.yData;
                        e = h.start;
                        h = !0
                    }
                for (d = m.length || 1; --d;)
                    if (c = a ? b(m[d]) - b(m[d - 1]) : m[d] - m[d - 1], 0 < c && ("undefined" === typeof t || c < t)) var t = c;
                    else 0 > c && r && !k && (u(15, !1, this.chart), r = !1);
                return {
                    xData: m,
                    yData: n,
                    cropped: h,
                    cropStart: e,
                    closestPointRange: t
                }
            };
            e.prototype.processData = function (b) {
                var c = this.xAxis;
                if (this.isCartesian &&
                    !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !b) return !1;
                b = this.getProcessedData();
                this.cropped = b.cropped;
                this.cropStart = b.cropStart;
                this.processedXData = b.xData;
                this.processedYData = b.yData;
                this.closestPointRange = this.basePointRange = b.closestPointRange;
                r(this, "afterProcessData")
            };
            e.prototype.cropData = function (b, c, a, d, g) {
                var f = b.length,
                    e, m = 0,
                    n = f;
                g = O(g, this.cropShoulder);
                for (e = 0; e < f; e++)
                    if (b[e] >= a) {
                        m = Math.max(0, e - g);
                        break
                    } for (a = e; a < f; a++)
                    if (b[a] > d) {
                        n = a + g;
                        break
                    } return {
                        xData: b.slice(m, n),
                        yData: c.slice(m,
                            n),
                        start: m,
                        end: n
                    }
            };
            e.prototype.generatePoints = function () {
                var b = this.options,
                    c = b.data,
                    a = this.processedXData,
                    d = this.processedYData,
                    g = this.pointClass,
                    f = a.length,
                    e = this.cropStart || 0,
                    m = this.hasGroupedData,
                    k = b.keys,
                    w = [];
                b = b.dataGrouping && b.dataGrouping.groupAll ? e : 0;
                var l, p, h = this.data;
                if (!h && !m) {
                    var u = [];
                    u.length = c.length;
                    h = this.data = u
                }
                k && m && (this.options.keys = !1);
                for (p = 0; p < f; p++) {
                    u = e + p;
                    if (m) {
                        var t = (new g).init(this, [a[p]].concat(Z(d[p])));
                        t.dataGroup = this.groupMap[b + p];
                        t.dataGroup.options && (t.options =
                            t.dataGroup.options, n(t, t.dataGroup.options), delete t.dataLabels)
                    } else (t = h[u]) || "undefined" === typeof c[u] || (h[u] = t = (new g).init(this, c[u], a[p]));
                    t && (t.index = m ? b + p : u, w[p] = t)
                }
                this.options.keys = k;
                if (h && (f !== (l = h.length) || m))
                    for (p = 0; p < l; p++) p !== e || m || (p += f), h[p] && (h[p].destroyElements(), h[p].plotX = void 0);
                this.data = h;
                this.points = w;
                r(this, "afterGeneratePoints")
            };
            e.prototype.getXExtremes = function (b) {
                return {
                    min: y(b),
                    max: L(b)
                }
            };
            e.prototype.getExtremes = function (b, c) {
                var a = this.xAxis,
                    d = this.yAxis,
                    g = this.processedXData ||
                        this.xData,
                    f = [],
                    e = this.requireSorting ? this.cropShoulder : 0;
                d = d ? d.positiveValuesOnly : !1;
                var n, k = 0,
                    l = 0,
                    p = 0;
                b = b || this.stackedYData || this.processedYData || [];
                var h = b.length;
                if (a) {
                    var t = a.getExtremes();
                    k = t.min;
                    l = t.max
                }
                for (n = 0; n < h; n++) {
                    var u = g[n];
                    t = b[n];
                    var x = (w(t) || m(t)) && (t.length || 0 < t || !d);
                    u = c || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !a || (g[n + e] || u) >= k && (g[n - e] || u) <= l;
                    if (x && u)
                        if (x = t.length)
                            for (; x--;) w(t[x]) && (f[p++] = t[x]);
                        else f[p++] = t
                }
                b = {
                    activeYData: f,
                    dataMin: y(f),
                    dataMax: L(f)
                };
                r(this, "afterGetExtremes", {
                    dataExtremes: b
                });
                return b
            };
            e.prototype.applyExtremes = function () {
                var b = this.getExtremes();
                this.dataMin = b.dataMin;
                this.dataMax = b.dataMax;
                return b
            };
            e.prototype.getFirstValidPoint = function (b) {
                for (var c = b.length, a = 0, d = null; null === d && a < c;) d = b[a], a++;
                return d
            };
            e.prototype.translate = function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var b = this.options,
                    a = b.stacking,
                    d = this.xAxis,
                    g = d.categories,
                    f = this.enabledDataSorting,
                    e = this.yAxis,
                    n = this.points,
                    k = n.length,
                    l =
                        this.pointPlacementToXValue(),
                    p = !!l,
                    h = b.threshold,
                    u = b.startFromThreshold ? h : 0,
                    x = this.zoneAxis || "y",
                    G, q, y = Number.MAX_VALUE;
                for (G = 0; G < k; G++) {
                    var B = n[G],
                        N = B.x,
                        F = void 0,
                        J = void 0,
                        K = B.y,
                        L = B.low,
                        v = a && e.stacking && e.stacking.stacks[(this.negStacks && K < (u ? 0 : h) ? "-" : "") + this.stackKey];
                    if (e.positiveValuesOnly && !e.validatePositiveValue(K) || d.positiveValuesOnly && !d.validatePositiveValue(N)) B.isNull = !0;
                    B.plotX = q = c(C(d.translate(N, 0, 0, 0, 1, l, "flags" === this.type), -1E5, 1E5));
                    if (a && this.visible && v && v[N]) {
                        var z = this.getStackIndicator(z,
                            N, this.index);
                        B.isNull || (F = v[N], J = F.points[z.key])
                    }
                    m(J) && (L = J[0], K = J[1], L === u && z.key === v[N].base && (L = O(w(h) && h, e.min)), e.positiveValuesOnly && 0 >= L && (L = null), B.total = B.stackTotal = F.total, B.percentage = F.total && B.y / F.total * 100, B.stackY = K, this.irregularWidths || F.setOffset(this.pointXOffset || 0, this.barW || 0));
                    B.yBottom = t(L) ? C(e.translate(L, 0, 1, 0, 1), -1E5, 1E5) : null;
                    this.dataModify && (K = this.dataModify.modifyValue(K, G));
                    B.plotY = void 0;
                    w(K) && (F = e.translate(K, !1, !0, !1, !0), "undefined" !== typeof F && (B.plotY = C(F,
                        -1E5, 1E5)));
                    B.isInside = this.isPointInside(B);
                    B.clientX = p ? c(d.translate(N, 0, 0, 0, 1, l)) : q;
                    B.negative = B[x] < (b[x + "Threshold"] || h || 0);
                    B.category = g && "undefined" !== typeof g[B.x] ? g[B.x] : B.x;
                    if (!B.isNull && !1 !== B.visible) {
                        "undefined" !== typeof P && (y = Math.min(y, Math.abs(q - P)));
                        var P = q
                    }
                    B.zone = this.zones.length ? B.getZone() : void 0;
                    !B.graphic && this.group && f && (B.isNew = !0)
                }
                this.closestPointRangePx = y;
                r(this, "afterTranslate")
            };
            e.prototype.getValidPoints = function (b, c, a) {
                var d = this.chart;
                return (b || this.points || []).filter(function (b) {
                    return c &&
                        !d.isInsidePlot(b.plotX, b.plotY, {
                            inverted: d.inverted
                        }) ? !1 : !1 !== b.visible && (a || !b.isNull)
                })
            };
            e.prototype.getClipBox = function () {
                var b = this.chart,
                    c = this.xAxis,
                    a = this.yAxis,
                    d = D(b.clipBox);
                c && c.len !== b.plotSizeX && (d.width = c.len);
                a && a.len !== b.plotSizeY && (d.height = a.len);
                return d
            };
            e.prototype.getSharedClipKey = function () {
                return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0)
            };
            e.prototype.setClip = function () {
                var b = this.chart,
                    c = this.group,
                    a = this.markerGroup,
                    d = b.sharedClips;
                b = b.renderer;
                var g = this.getClipBox(),
                    f = this.getSharedClipKey(),
                    e = d[f];
                e ? e.animate(g) : d[f] = e = b.clipRect(g);
                c && c.clip(!1 === this.options.clip ? void 0 : e);
                a && a.clip()
            };
            e.prototype.animate = function (b) {
                var c = this.chart,
                    a = this.group,
                    d = this.markerGroup,
                    g = c.inverted,
                    e = f(this.options.animation),
                    m = [this.getSharedClipKey(), e.duration, e.easing, e.defer].join(),
                    n = c.sharedClips[m],
                    r = c.sharedClips[m + "m"];
                if (b && a) e = this.getClipBox(), n ? n.attr("height", e.height) : (e.width = 0, g && (e.x = c.plotHeight), n = c.renderer.clipRect(e), c.sharedClips[m] =
                    n, r = c.renderer.clipRect({
                        x: g ? (c.plotSizeX || 0) + 99 : -99,
                        y: g ? -c.plotLeft : -c.plotTop,
                        width: 99,
                        height: g ? c.chartWidth : c.chartHeight
                    }), c.sharedClips[m + "m"] = r), a.clip(n), d && d.clip(r);
                else if (n && !n.hasClass("highcharts-animating")) {
                    c = this.getClipBox();
                    var k = e.step;
                    d && d.element.childNodes.length && (e.step = function (b, c) {
                        k && k.apply(c, arguments);
                        r && r.element && r.attr(c.prop, "width" === c.prop ? b + 99 : b)
                    });
                    n.addClass("highcharts-animating").animate(c, e)
                }
            };
            e.prototype.afterAnimate = function () {
                var b = this;
                this.setClip();
                P(this.chart.sharedClips,
                    function (c, a, d) {
                        c && !b.chart.container.querySelector('[clip-path="url(#' + c.id + ')"]') && (c.destroy(), delete d[a])
                    });
                this.finishedAnimating = !0;
                r(this, "afterAnimate")
            };
            e.prototype.drawPoints = function () {
                var b = this.points,
                    c = this.chart,
                    a = this.options.marker,
                    d = this[this.specialGroup] || this.markerGroup,
                    g = this.xAxis,
                    f = O(a.enabled, !g || g.isRadial ? !0 : null, this.closestPointRangePx >= a.enabledThreshold * a.radius),
                    e, m;
                if (!1 !== a.enabled || this._hasPointMarkers)
                    for (e = 0; e < b.length; e++) {
                        var n = b[e];
                        var r = (m = n.graphic) ? "animate" :
                            "attr";
                        var k = n.marker || {};
                        var w = !!n.marker;
                        if ((f && "undefined" === typeof k.enabled || k.enabled) && !n.isNull && !1 !== n.visible) {
                            var l = O(k.symbol, this.symbol, "rect");
                            var p = this.markerAttribs(n, n.selected && "select");
                            this.enabledDataSorting && (n.startXPos = g.reversed ? -(p.width || 0) : g.width);
                            var t = !1 !== n.isInside;
                            m ? m[t ? "show" : "hide"](t).animate(p) : t && (0 < (p.width || 0) || n.hasImage) && (n.graphic = m = c.renderer.symbol(l, p.x, p.y, p.width, p.height, w ? k : a).add(d), this.enabledDataSorting && c.hasRendered && (m.attr({
                                x: n.startXPos
                            }),
                                r = "animate"));
                            m && "animate" === r && m[t ? "show" : "hide"](t).animate(p);
                            if (m && !c.styledMode) m[r](this.pointAttribs(n, n.selected && "select"));
                            m && m.addClass(n.getClassName(), !0)
                        } else m && (n.graphic = m.destroy())
                    }
            };
            e.prototype.markerAttribs = function (b, c) {
                var a = this.options,
                    d = a.marker,
                    g = b.marker || {},
                    f = g.symbol || d.symbol,
                    e = O(g.radius, d.radius);
                c && (d = d.states[c], c = g.states && g.states[c], e = O(c && c.radius, d && d.radius, e + (d && d.radiusPlus || 0)));
                b.hasImage = f && 0 === f.indexOf("url");
                b.hasImage && (e = 0);
                b = {
                    x: a.crisp ? Math.floor(b.plotX -
                        e) : b.plotX - e,
                    y: b.plotY - e
                };
                e && (b.width = b.height = 2 * e);
                return b
            };
            e.prototype.pointAttribs = function (b, c) {
                var a = this.options.marker,
                    d = b && b.options,
                    g = d && d.marker || {},
                    f = d && d.color,
                    e = b && b.color,
                    m = b && b.zone && b.zone.color,
                    n = this.color;
                b = O(g.lineWidth, a.lineWidth);
                d = 1;
                n = f || m || e || n;
                f = g.fillColor || a.fillColor || n;
                e = g.lineColor || a.lineColor || n;
                c = c || "normal";
                a = a.states[c] || {};
                c = g.states && g.states[c] || {};
                b = O(c.lineWidth, a.lineWidth, b + O(c.lineWidthPlus, a.lineWidthPlus, 0));
                f = c.fillColor || a.fillColor || f;
                e = c.lineColor ||
                    a.lineColor || e;
                d = O(c.opacity, a.opacity, d);
                return {
                    stroke: e,
                    "stroke-width": b,
                    fill: f,
                    opacity: d
                }
            };
            e.prototype.destroy = function (b) {
                var c = this,
                    a = c.chart,
                    d = /AppleWebKit\/533/.test(B.navigator.userAgent),
                    f = c.data || [],
                    e, m, n, k;
                r(c, "destroy");
                this.removeEvents(b);
                (c.axisTypes || []).forEach(function (b) {
                    (k = c[b]) && k.series && (g(k.series, c), k.isDirty = k.forceRedraw = !0)
                });
                c.legendItem && c.chart.legend.destroyItem(c);
                for (m = f.length; m--;)(n = f[m]) && n.destroy && n.destroy();
                c.clips && c.clips.forEach(function (b) {
                    return b.destroy()
                });
                l.clearTimeout(c.animationTimeout);
                P(c, function (b, c) {
                    b instanceof q && !b.survive && (e = d && "group" === c ? "hide" : "destroy", b[e]())
                });
                a.hoverSeries === c && (a.hoverSeries = void 0);
                g(a.series, c);
                a.orderSeries();
                P(c, function (a, d) {
                    b && "hcEvents" === d || delete c[d]
                })
            };
            e.prototype.applyZones = function () {
                var b = this,
                    c = this.chart,
                    a = c.renderer,
                    d = this.zones,
                    g = this.clips || [],
                    f = this.graph,
                    e = this.area,
                    m = Math.max(c.chartWidth, c.chartHeight),
                    n = this[(this.zoneAxis || "y") + "Axis"],
                    r = c.inverted,
                    k, w, l, p, t, h, u, x, G = !1;
                if (d.length && (f ||
                    e) && n && "undefined" !== typeof n.min) {
                    var q = n.reversed;
                    var y = n.horiz;
                    f && !this.showLine && f.hide();
                    e && e.hide();
                    var B = n.getExtremes();
                    d.forEach(function (d, N) {
                        k = q ? y ? c.plotWidth : 0 : y ? 0 : n.toPixels(B.min) || 0;
                        k = C(O(w, k), 0, m);
                        w = C(Math.round(n.toPixels(O(d.value, B.max), !0) || 0), 0, m);
                        G && (k = w = n.toPixels(B.max));
                        p = Math.abs(k - w);
                        t = Math.min(k, w);
                        h = Math.max(k, w);
                        n.isXAxis ? (l = {
                            x: r ? h : t,
                            y: 0,
                            width: p,
                            height: m
                        }, y || (l.x = c.plotHeight - l.x)) : (l = {
                            x: 0,
                            y: r ? h : t,
                            width: m,
                            height: p
                        }, y && (l.y = c.plotWidth - l.y));
                        r && a.isVML && (l = n.isXAxis ? {
                            x: 0,
                            y: q ? t : h,
                            height: l.width,
                            width: c.chartWidth
                        } : {
                            x: l.y - c.plotLeft - c.spacingBox.x,
                            y: 0,
                            width: l.height,
                            height: c.chartHeight
                        });
                        g[N] ? g[N].animate(l) : g[N] = a.clipRect(l);
                        u = b["zone-area-" + N];
                        x = b["zone-graph-" + N];
                        f && x && x.clip(g[N]);
                        e && u && u.clip(g[N]);
                        G = d.value > B.max;
                        b.resetZones && 0 === w && (w = void 0)
                    });
                    this.clips = g
                } else b.visible && (f && f.show(!0), e && e.show(!0))
            };
            e.prototype.invertGroups = function (b) {
                function c() {
                    ["group", "markerGroup"].forEach(function (c) {
                        a[c] && (d.renderer.isVML && a[c].attr({
                            width: a.yAxis.len,
                            height: a.xAxis.len
                        }),
                            a[c].width = a.yAxis.len, a[c].height = a.xAxis.len, a[c].invert(a.isRadialSeries ? !1 : b))
                    })
                }
                var a = this,
                    d = a.chart;
                a.xAxis && (a.eventsToUnbind.push(K(d, "resize", c)), c(), a.invertGroups = c)
            };
            e.prototype.plotGroup = function (b, c, a, d, g) {
                var f = this[b],
                    e = !f;
                a = {
                    visibility: a,
                    zIndex: d || .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (a.opacity = this.opacity);
                e && (this[b] = f = this.chart.renderer.g().add(g));
                f.addClass("highcharts-" + c + " highcharts-series-" + this.index + " highcharts-" + this.type +
                    "-series " + (t(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr(a)[e ? "attr" : "animate"](this.getPlotBox());
                return f
            };
            e.prototype.getPlotBox = function () {
                var b = this.chart,
                    c = this.xAxis,
                    a = this.yAxis;
                b.inverted && (c = a, a = this.xAxis);
                return {
                    translateX: c ? c.left : b.plotLeft,
                    translateY: a ? a.top : b.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            };
            e.prototype.removeEvents = function (b) {
                b || W(this);
                this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (b) {
                    b()
                }),
                    this.eventsToUnbind.length = 0)
            };
            e.prototype.render = function () {
                var b = this,
                    c = b.chart,
                    a = b.options,
                    d = f(a.animation),
                    g = b.visible ? "inherit" : "hidden",
                    e = a.zIndex,
                    m = b.hasRendered,
                    n = c.seriesGroup,
                    k = c.inverted;
                c = !b.finishedAnimating && c.renderer.isSVG ? d.duration : 0;
                r(this, "render");
                var w = b.plotGroup("group", "series", g, e, n);
                b.markerGroup = b.plotGroup("markerGroup", "markers", g, e, n);
                !1 !== a.clip && b.setClip();
                b.animate && c && b.animate(!0);
                w.inverted = O(b.invertible, b.isCartesian) ? k : !1;
                b.drawGraph && (b.drawGraph(), b.applyZones());
                b.visible && b.drawPoints();
                b.drawDataLabels && b.drawDataLabels();
                b.redrawPoints && b.redrawPoints();
                b.drawTracker && !1 !== b.options.enableMouseTracking && b.drawTracker();
                b.invertGroups(k);
                b.animate && c && b.animate();
                m || (c && d.defer && (c += d.defer), b.animationTimeout = ha(function () {
                    b.afterAnimate()
                }, c || 0));
                b.isDirty = !1;
                b.hasRendered = !0;
                r(b, "afterRender")
            };
            e.prototype.redraw = function () {
                var b = this.chart,
                    c = this.isDirty || this.isDirtyData,
                    a = this.group,
                    d = this.xAxis,
                    g = this.yAxis;
                a && (b.inverted && a.attr({
                    width: b.plotWidth,
                    height: b.plotHeight
                }), a.animate({
                    translateX: O(d && d.left, b.plotLeft),
                    translateY: O(g && g.top, b.plotTop)
                }));
                this.translate();
                this.render();
                c && delete this.kdTree
            };
            e.prototype.searchPoint = function (b, c) {
                var a = this.xAxis,
                    d = this.yAxis,
                    g = this.chart.inverted;
                return this.searchKDTree({
                    clientX: g ? a.len - b.chartY + a.pos : b.chartX - a.pos,
                    plotY: g ? d.len - b.chartX + d.pos : b.chartY - d.pos
                }, c, b)
            };
            e.prototype.buildKDTree = function (b) {
                function c(b, d, g) {
                    var f = b && b.length;
                    if (f) {
                        var e = a.kdAxisArray[d % g];
                        b.sort(function (b, c) {
                            return b[e] -
                                c[e]
                        });
                        f = Math.floor(f / 2);
                        return {
                            point: b[f],
                            left: c(b.slice(0, f), d + 1, g),
                            right: c(b.slice(f + 1), d + 1, g)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var a = this,
                    d = -1 < a.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete a.kdTree;
                ha(function () {
                    a.kdTree = c(a.getValidPoints(null, !a.directTouch), d, d);
                    a.buildingKdTree = !1
                }, a.options.kdNow || b && "touchstart" === b.type ? 0 : 1)
            };
            e.prototype.searchKDTree = function (b, c, a) {
                function d(b, c, a, n) {
                    var r = c.point,
                        k = g.kdAxisArray[a % n],
                        w = r,
                        l = t(b[f]) && t(r[f]) ? Math.pow(b[f] - r[f], 2) : null;
                    var p = t(b[e]) && t(r[e]) ?
                        Math.pow(b[e] - r[e], 2) : null;
                    p = (l || 0) + (p || 0);
                    r.dist = t(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    r.distX = t(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    k = b[k] - r[k];
                    p = 0 > k ? "left" : "right";
                    l = 0 > k ? "right" : "left";
                    c[p] && (p = d(b, c[p], a + 1, n), w = p[m] < w[m] ? p : r);
                    c[l] && Math.sqrt(k * k) < w[m] && (b = d(b, c[l], a + 1, n), w = b[m] < w[m] ? b : w);
                    return w
                }
                var g = this,
                    f = this.kdAxisArray[0],
                    e = this.kdAxisArray[1],
                    m = c ? "distX" : "dist";
                c = -1 < g.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(a);
                if (this.kdTree) return d(b,
                    this.kdTree, c, c)
            };
            e.prototype.pointPlacementToXValue = function () {
                var b = this.options,
                    c = b.pointRange,
                    a = this.xAxis;
                b = b.pointPlacement;
                "between" === b && (b = a.reversed ? -.5 : .5);
                return w(b) ? b * (c || a.pointRange) : 0
            };
            e.prototype.isPointInside = function (b) {
                var c = this.chart,
                    a = this.xAxis,
                    d = this.yAxis;
                return "undefined" !== typeof b.plotY && "undefined" !== typeof b.plotX && 0 <= b.plotY && b.plotY <= (d ? d.len : c.plotHeight) && 0 <= b.plotX && b.plotX <= (a ? a.len : c.plotWidth)
            };
            e.prototype.drawTracker = function () {
                var b = this,
                    c = b.options,
                    a = c.trackByArea,
                    d = [].concat(a ? b.areaPath : b.graphPath),
                    g = b.chart,
                    f = g.pointer,
                    e = g.renderer,
                    m = g.options.tooltip.snap,
                    n = b.tracker,
                    w = function (c) {
                        if (g.hoverSeries !== b) b.onMouseOver()
                    },
                    l = "rgba(192,192,192," + (F ? .0001 : .002) + ")";
                n ? n.attr({
                    d: d
                }) : b.graph && (b.tracker = e.path(d).attr({
                    visibility: b.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(a ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b.group), g.styledMode || b.tracker.attr({
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    stroke: l,
                    fill: a ? l : "none",
                    "stroke-width": b.graph.strokeWidth() +
                        (a ? 0 : 2 * m)
                }), [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (b) {
                    if (b && (b.addClass("highcharts-tracker").on("mouseover", w).on("mouseout", function (b) {
                        f.onTrackerMouseOut(b)
                    }), c.cursor && !g.styledMode && b.css({
                        cursor: c.cursor
                    }), k)) b.on("touchstart", w)
                }));
                r(this, "afterDrawTracker")
            };
            e.prototype.addPoint = function (b, c, a, d, g) {
                var f = this.options,
                    e = this.data,
                    m = this.chart,
                    n = this.xAxis;
                n = n && n.hasNames && n.names;
                var k = f.data,
                    w = this.xData,
                    l;
                c = O(c, !0);
                var p = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(p,
                    [b]);
                var t = p.x;
                var h = w.length;
                if (this.requireSorting && t < w[h - 1])
                    for (l = !0; h && w[h - 1] > t;) h--;
                this.updateParallelArrays(p, "splice", h, 0, 0);
                this.updateParallelArrays(p, h);
                n && p.name && (n[t] = p.name);
                k.splice(h, 0, b);
                l && (this.data.splice(h, 0, null), this.processData());
                "point" === f.legendType && this.generatePoints();
                a && (e[0] && e[0].remove ? e[0].remove(!1) : (e.shift(), this.updateParallelArrays(p, "shift"), k.shift()));
                !1 !== g && r(this, "addPoint", {
                    point: p
                });
                this.isDirtyData = this.isDirty = !0;
                c && m.redraw(d)
            };
            e.prototype.removePoint =
                function (b, c, a) {
                    var g = this,
                        f = g.data,
                        e = f[b],
                        m = g.points,
                        n = g.chart,
                        r = function () {
                            m && m.length === f.length && m.splice(b, 1);
                            f.splice(b, 1);
                            g.options.data.splice(b, 1);
                            g.updateParallelArrays(e || {
                                series: g
                            }, "splice", b, 1);
                            e && e.destroy();
                            g.isDirty = !0;
                            g.isDirtyData = !0;
                            c && n.redraw()
                        };
                    d(a, n);
                    c = O(c, !0);
                    e ? e.firePointEvent("remove", null, r) : r()
                };
            e.prototype.remove = function (b, c, a, d) {
                function g() {
                    f.destroy(d);
                    e.isDirtyLegend = e.isDirtyBox = !0;
                    e.linkSeries();
                    O(b, !0) && e.redraw(c)
                }
                var f = this,
                    e = f.chart;
                !1 !== a ? r(f, "remove", null,
                    g) : g()
            };
            e.prototype.update = function (b, c) {
                b = x(b, this.userOptions);
                r(this, "update", {
                    options: b
                });
                var a = this,
                    d = a.chart,
                    g = a.userOptions,
                    f = a.initialType || a.type,
                    e = d.options.plotOptions,
                    m = J[f].prototype,
                    k = a.finishedAnimating && {
                        animation: !1
                    },
                    w = {},
                    l, p = ["eventOptions", "navigatorSeries", "baseSeries"],
                    t = b.type || g.type || d.options.chart.type,
                    h = !(this.hasDerivedData || t && t !== this.type || "undefined" !== typeof b.pointStart || "undefined" !== typeof b.pointInterval || "undefined" !== typeof b.relativeXValue || a.hasOptionChanged("dataGrouping") ||
                        a.hasOptionChanged("pointStart") || a.hasOptionChanged("pointInterval") || a.hasOptionChanged("pointIntervalUnit") || a.hasOptionChanged("keys"));
                t = t || f;
                h && (p.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== b.visible && p.push("area", "graph"), a.parallelArrays.forEach(function (b) {
                    p.push(b + "Data")
                }), b.data && (b.dataSorting && n(a.options.dataSorting, b.dataSorting),
                    this.setData(b.data, !1)));
                b = D(g, k, {
                    index: "undefined" === typeof g.index ? a.index : g.index,
                    pointStart: O(e && e.series && e.series.pointStart, g.pointStart, a.xData[0])
                }, !h && {
                    data: a.options.data
                }, b);
                h && b.data && (b.data = a.options.data);
                p = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(p);
                p.forEach(function (b) {
                    p[b] = a[b];
                    delete a[b]
                });
                e = !1;
                if (J[t]) {
                    if (e = t !== a.type, a.remove(!1, !1, !1, !0), e)
                        if (Object.setPrototypeOf) Object.setPrototypeOf(a, J[t].prototype);
                        else {
                            k = Object.hasOwnProperty.call(a, "hcEvents") &&
                                a.hcEvents;
                            for (l in m) a[l] = void 0;
                            n(a, J[t].prototype);
                            k ? a.hcEvents = k : delete a.hcEvents
                        }
                } else u(17, !0, d, {
                    missingModuleFor: t
                });
                p.forEach(function (b) {
                    a[b] = p[b]
                });
                a.init(d, b);
                if (h && this.points) {
                    var G = a.options;
                    !1 === G.visible ? (w.graphic = 1, w.dataLabel = 1) : a._hasPointLabels || (b = G.marker, m = G.dataLabels, !b || !1 !== b.enabled && (g.marker && g.marker.symbol) === b.symbol || (w.graphic = 1), m && !1 === m.enabled && (w.dataLabel = 1));
                    this.points.forEach(function (b) {
                        b && b.series && (b.resolveColor(), Object.keys(w).length && b.destroyElements(w),
                            !1 === G.showInLegend && b.legendItem && d.legend.destroyItem(b))
                    }, this)
                }
                a.initialType = f;
                d.linkSeries();
                e && a.linkedSeries.length && (a.isDirtyData = !0);
                r(this, "afterUpdate");
                O(c, !0) && d.redraw(h ? void 0 : !1)
            };
            e.prototype.setName = function (b) {
                this.name = this.options.name = this.userOptions.name = b;
                this.chart.isDirtyLegend = !0
            };
            e.prototype.hasOptionChanged = function (b) {
                var c = this.options[b],
                    a = this.chart.options.plotOptions,
                    d = this.userOptions[b];
                return d ? c !== d : c !== O(a && a[this.type] && a[this.type][b], a && a.series && a.series[b],
                    c)
            };
            e.prototype.onMouseOver = function () {
                var b = this.chart,
                    c = b.hoverSeries;
                b.pointer.setHoverChartIndex();
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && r(this, "mouseOver");
                this.setState("hover");
                b.hoverSeries = this
            };
            e.prototype.onMouseOut = function () {
                var b = this.options,
                    c = this.chart,
                    a = c.tooltip,
                    d = c.hoverPoint;
                c.hoverSeries = null;
                if (d) d.onMouseOut();
                this && b.events.mouseOut && r(this, "mouseOut");
                !a || this.stickyTracking || a.shared && !this.noSharedTooltip || a.hide();
                c.series.forEach(function (b) {
                    b.setState("",
                        !0)
                })
            };
            e.prototype.setState = function (b, c) {
                var a = this,
                    d = a.options,
                    g = a.graph,
                    f = d.inactiveOtherPoints,
                    e = d.states,
                    m = O(e[b || "normal"] && e[b || "normal"].animation, a.chart.options.chart.animation),
                    n = d.lineWidth,
                    r = 0,
                    k = d.opacity;
                b = b || "";
                if (a.state !== b && ([a.group, a.markerGroup, a.dataLabelsGroup].forEach(function (c) {
                    c && (a.state && c.removeClass("highcharts-series-" + a.state), b && c.addClass("highcharts-series-" + b))
                }), a.state = b, !a.chart.styledMode)) {
                    if (e[b] && !1 === e[b].enabled) return;
                    b && (n = e[b].lineWidth || n + (e[b].lineWidthPlus ||
                        0), k = O(e[b].opacity, k));
                    if (g && !g.dashstyle)
                        for (d = {
                            "stroke-width": n
                        }, g.animate(d, m); a["zone-graph-" + r];) a["zone-graph-" + r].animate(d, m), r += 1;
                    f || [a.group, a.markerGroup, a.dataLabelsGroup, a.labelBySeries].forEach(function (b) {
                        b && b.animate({
                            opacity: k
                        }, m)
                    })
                }
                c && f && a.points && a.setAllPointsToState(b || void 0)
            };
            e.prototype.setAllPointsToState = function (b) {
                this.points.forEach(function (c) {
                    c.setState && c.setState(b)
                })
            };
            e.prototype.setVisible = function (b, c) {
                var a = this,
                    d = a.chart,
                    g = a.legendItem,
                    f = d.options.chart.ignoreHiddenSeries,
                    e = a.visible,
                    m = (a.visible = b = a.options.visible = a.userOptions.visible = "undefined" === typeof b ? !e : b) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (b) {
                    if (a[b]) a[b][m]()
                });
                if (d.hoverSeries === a || (d.hoverPoint && d.hoverPoint.series) === a) a.onMouseOut();
                g && d.legend.colorizeItem(a, b);
                a.isDirty = !0;
                a.options.stacking && d.series.forEach(function (b) {
                    b.options.stacking && b.visible && (b.isDirty = !0)
                });
                a.linkedSeries.forEach(function (c) {
                    c.setVisible(b, !1)
                });
                f && (d.isDirtyBox = !0);
                r(a, m);
                !1 !== c && d.redraw()
            };
            e.prototype.show = function () {
                this.setVisible(!0)
            };
            e.prototype.hide = function () {
                this.setVisible(!1)
            };
            e.prototype.select = function (b) {
                this.selected = b = this.options.selected = "undefined" === typeof b ? !this.selected : b;
                this.checkbox && (this.checkbox.checked = b);
                r(this, b ? "select" : "unselect")
            };
            e.prototype.shouldShowTooltip = function (b, c, a) {
                void 0 === a && (a = {});
                a.series = this;
                a.visiblePlotOnly = !0;
                return this.chart.isInsidePlot(b, c, a)
            };
            e.defaultOptions = I;
            return e
        }();
        n(e.prototype, {
            axisTypes: ["xAxis",
                "yAxis"
            ],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            drawLegendSymbol: v.drawLineMarker,
            isCartesian: !0,
            kdAxisArray: ["clientX", "plotY"],
            parallelArrays: ["x", "y"],
            pointClass: H,
            requireSorting: !0,
            sorted: !0
        });
        z.series = e;
        "";
        "";
        return e
    });
    M(h, "Extensions/ScrollablePlotArea.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Axis/Axis.js"], h["Core/Chart/Chart.js"], h["Core/Series/Series.js"], h["Core/Renderer/RendererRegistry.js"], h["Core/Utilities.js"]], function (e, h, A, E, v, H) {
        var D = e.stop,
            z =
                H.addEvent,
            q = H.createElement,
            l = H.merge,
            f = H.pick;
        z(A, "afterSetChartSize", function (d) {
            var a = this.options.chart.scrollablePlotArea,
                f = a && a.minWidth;
            a = a && a.minHeight;
            if (!this.renderer.forExport) {
                if (f) {
                    if (this.scrollablePixelsX = f = Math.max(0, f - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = l(this.plotBox);
                        this.plotBox.width = this.plotWidth += f;
                        this.inverted ? this.clipBox.height += f : this.clipBox.width += f;
                        var e = {
                            1: {
                                name: "right",
                                value: f
                            }
                        }
                    }
                } else a && (this.scrollablePixelsY = f = Math.max(0,
                    a - this.chartHeight)) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = l(this.plotBox), this.plotBox.height = this.plotHeight += f, this.inverted ? this.clipBox.width += f : this.clipBox.height += f, e = {
                        2: {
                            name: "bottom",
                            value: f
                        }
                    });
                e && !d.skipAxes && this.axes.forEach(function (a) {
                    e[a.side] ? a.getPlotLinePath = function () {
                        var d = e[a.side].name,
                            f = this[d];
                        this[d] = f - e[a.side].value;
                        var k = h.prototype.getPlotLinePath.apply(this, arguments);
                        this[d] = f;
                        return k
                    } : (a.setAxisSize(), a.setAxisTranslation())
                })
            }
        });
        z(A, "render", function () {
            this.scrollablePixelsX ||
                this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        A.prototype.setUpScrolling = function () {
            var d = this,
                a = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (a.overflowX = "auto");
            this.scrollablePixelsY && (a.overflowY = "auto");
            this.scrollingParent = q("div", {
                className: "highcharts-scrolling-parent"
            }, {
                position: "relative"
            }, this.renderTo);
            this.scrollingContainer = q("div", {
                className: "highcharts-scrolling"
            },
                a, this.scrollingParent);
            z(this.scrollingContainer, "scroll", function () {
                d.pointer && delete d.pointer.chartPosition
            });
            this.innerContainer = q("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        A.prototype.moveFixedElements = function () {
            var d = this.container,
                a = this.fixedRenderer,
                f = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                e;
            this.scrollablePixelsX && !this.inverted ? e = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? e = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? e = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (e = ".highcharts-yaxis");
            e && f.push(e + ":not(.highcharts-radial-axis)", e + "-labels:not(.highcharts-radial-axis-labels)");
            f.forEach(function (f) {
                [].forEach.call(d.querySelectorAll(f), function (d) {
                    (d.namespaceURI === a.SVG_NS ? a.box : a.box.parentNode).appendChild(d);
                    d.style.pointerEvents = "auto"
                })
            })
        };
        A.prototype.applyFixed = function () {
            var d = !this.fixedDiv,
                a = this.options.chart,
                e = a.scrollablePlotArea,
                k = v.getRendererType();
            d ? (this.fixedDiv = q("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: (a.style && a.style.zIndex || 0) + 2,
                top: 0
            }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = a = new k(this.fixedDiv, this.chartWidth, this.chartHeight,
                this.options.chart.style), this.scrollableMask = a.path().attr({
                    fill: this.options.chart.backgroundColor || "#fff",
                    "fill-opacity": f(e.opacity, .85),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), z(this, "afterShowResetZoom", this.moveFixedElements), z(this, "afterDrilldown", this.moveFixedElements), z(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            if (this.scrollableDirty || d) this.scrollableDirty = !1, this.moveFixedElements();
            a = this.chartWidth +
                (this.scrollablePixelsX || 0);
            k = this.chartHeight + (this.scrollablePixelsY || 0);
            D(this.container);
            this.container.style.width = a + "px";
            this.container.style.height = k + "px";
            this.renderer.boxWrapper.attr({
                width: a,
                height: k,
                viewBox: [0, 0, a, k].join(" ")
            });
            this.chartBackground.attr({
                width: a,
                height: k
            });
            this.scrollingContainer.style.height = this.chartHeight + "px";
            d && (e.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * e.scrollPositionX), e.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY *
                e.scrollPositionY));
            k = this.axisOffset;
            d = this.plotTop - k[0] - 1;
            e = this.plotLeft - k[3] - 1;
            a = this.plotTop + this.plotHeight + k[2] + 1;
            k = this.plotLeft + this.plotWidth + k[1] + 1;
            var l = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                h = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            d = this.scrollablePixelsX ? [
                ["M", 0, d],
                ["L", this.plotLeft - 1, d],
                ["L", this.plotLeft - 1, a],
                ["L", 0, a],
                ["Z"],
                ["M", l, d],
                ["L", this.chartWidth, d],
                ["L", this.chartWidth, a],
                ["L", l, a],
                ["Z"]
            ] : this.scrollablePixelsY ? [
                ["M", e, 0],
                ["L", e, this.plotTop -
                    1
                ],
                ["L", k, this.plotTop - 1],
                ["L", k, 0],
                ["Z"],
                ["M", e, h],
                ["L", e, this.chartHeight],
                ["L", k, this.chartHeight],
                ["L", k, h],
                ["Z"]
            ] : [
                ["M", 0, 0]
            ];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: d
            })
        };
        z(h, "afterInit", function () {
            this.chart.scrollableDirty = !0
        });
        z(E, "show", function () {
            this.chart.scrollableDirty = !0
        });
        ""
    });
    M(h, "Core/Axis/StackingAxis.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Axis/Axis.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = e.getDeferredAnimation,
            v = A.addEvent,
            H =
                A.destroyObjectProperties,
            I = A.fireEvent,
            z = A.isNumber,
            q = A.objectEach,
            l;
        (function (f) {
            function d() {
                var a = this.stacking;
                if (a) {
                    var d = a.stacks;
                    q(d, function (a, f) {
                        H(a);
                        d[f] = null
                    });
                    a && a.stackTotalGroup && a.stackTotalGroup.destroy()
                }
            }

            function a() {
                this.stacking || (this.stacking = new k(this))
            }
            var e = [];
            f.compose = function (f) {
                -1 === e.indexOf(f) && (e.push(f), v(f, "init", a), v(f, "destroy", d));
                return f
            };
            var k = function () {
                function a(a) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = a
                }
                a.prototype.buildStacks =
                    function () {
                        var a = this.axis,
                            d = a.series,
                            f = a.options.reversedStacks,
                            e = d.length,
                            k;
                        if (!a.isXAxis) {
                            this.usePercentage = !1;
                            for (k = e; k--;) {
                                var l = d[f ? k : e - k - 1];
                                l.setStackedPoints();
                                l.setGroupedPoints()
                            }
                            for (k = 0; k < e; k++) d[k].modifyStacks();
                            I(a, "afterBuildStacks")
                        }
                    };
                a.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var a = this.stacks = this.oldStacks;
                        q(a, function (a) {
                            q(a, function (a) {
                                a.cumulative = a.total
                            })
                        })
                    }
                };
                a.prototype.resetStacks = function () {
                    var a = this,
                        d = a.stacks;
                    a.axis.isXAxis || q(d, function (d) {
                        q(d,
                            function (f, e) {
                                z(f.touched) && f.touched < a.stacksTouched ? (f.destroy(), delete d[e]) : (f.total = null, f.cumulative = null)
                            })
                    })
                };
                a.prototype.renderStackTotals = function () {
                    var a = this.axis,
                        d = a.chart,
                        f = d.renderer,
                        e = this.stacks;
                    a = D(d, a.options.stackLabels && a.options.stackLabels.animation || !1);
                    var k = this.stackTotalGroup = this.stackTotalGroup || f.g("stack-labels").attr({
                        visibility: "visible",
                        zIndex: 6,
                        opacity: 0
                    }).add();
                    k.translate(d.plotLeft, d.plotTop);
                    q(e, function (a) {
                        q(a, function (a) {
                            a.render(k)
                        })
                    });
                    k.animate({
                        opacity: 1
                    },
                        a)
                };
                return a
            }();
            f.Additions = k
        })(l || (l = {}));
        return l
    });
    M(h, "Extensions/Stacking.js", [h["Core/Axis/Axis.js"], h["Core/Chart/Chart.js"], h["Core/FormatUtilities.js"], h["Core/Globals.js"], h["Core/Series/Series.js"], h["Core/Axis/StackingAxis.js"], h["Core/Utilities.js"]], function (e, h, A, E, v, H, I) {
        var z = A.format,
            q = I.correctFloat,
            l = I.defined,
            f = I.destroyObjectProperties,
            d = I.isArray,
            a = I.isNumber,
            p = I.objectEach,
            k = I.pick,
            F = function () {
                function d(a, d, f, e, k) {
                    var l = a.chart.inverted;
                    this.axis = a;
                    this.isNegative = f;
                    this.options =
                        d = d || {};
                    this.x = e;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = k;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = {
                        align: d.align || (l ? f ? "left" : "right" : "center"),
                        verticalAlign: d.verticalAlign || (l ? "middle" : f ? "bottom" : "top"),
                        y: d.y,
                        x: d.x
                    };
                    this.textAlign = d.textAlign || (l ? f ? "right" : "left" : "center")
                }
                d.prototype.destroy = function () {
                    f(this, this.axis)
                };
                d.prototype.render = function (a) {
                    var d = this.axis.chart,
                        f = this.options,
                        e = f.format;
                    e = e ? z(e, this, d) : f.formatter.call(this);
                    this.label ? this.label.attr({
                        text: e,
                        visibility: "hidden"
                    }) : (this.label = d.renderer.label(e, null, null, f.shape, null, null, f.useHTML, !1, "stack-labels"), e = {
                        r: f.borderRadius || 0,
                        text: e,
                        rotation: f.rotation,
                        padding: k(f.padding, 5),
                        visibility: "hidden"
                    }, d.styledMode || (e.fill = f.backgroundColor, e.stroke = f.borderColor, e["stroke-width"] = f.borderWidth, this.label.css(f.style)), this.label.attr(e), this.label.added || this.label.add(a));
                    this.label.labelrank = d.plotSizeY
                };
                d.prototype.setOffset = function (d, f, e, p, h) {
                    var x = this.axis,
                        c = x.chart;
                    p = x.translate(x.stacking.usePercentage ?
                        100 : p ? p : this.total, 0, 0, 0, 1);
                    e = x.translate(e ? e : 0);
                    e = l(p) && Math.abs(p - e);
                    d = k(h, c.xAxis[0].translate(this.x)) + d;
                    x = l(p) && this.getStackBox(c, this, d, p, f, e, x);
                    f = this.label;
                    e = this.isNegative;
                    d = "justify" === k(this.options.overflow, "justify");
                    var t = this.textAlign;
                    f && x && (h = f.getBBox(), p = f.padding, t = "left" === t ? c.inverted ? -p : p : "right" === t ? h.width : c.inverted && "center" === t ? h.width / 2 : c.inverted ? e ? h.width + p : -p : h.width / 2, e = c.inverted ? h.height / 2 : e ? -p : h.height, this.alignOptions.x = k(this.options.x, 0), this.alignOptions.y =
                        k(this.options.y, 0), x.x -= t, x.y -= e, f.align(this.alignOptions, null, x), c.isInsidePlot(f.alignAttr.x + t - this.alignOptions.x, f.alignAttr.y + e - this.alignOptions.y) ? f.show() : (f.alignAttr.y = -9999, d = !1), d && v.prototype.justifyDataLabel.call(this.axis, f, this.alignOptions, f.alignAttr, h, x), f.attr({
                            x: f.alignAttr.x,
                            y: f.alignAttr.y
                        }), k(!d && this.options.crop, !0) && ((c = a(f.x) && a(f.y) && c.isInsidePlot(f.x - p + f.width, f.y) && c.isInsidePlot(f.x + p, f.y)) || f.hide()))
                };
                d.prototype.getStackBox = function (a, d, f, e, k, l, c) {
                    var p = d.axis.reversed,
                        g = a.inverted,
                        h = c.height + c.pos - (g ? a.plotLeft : a.plotTop);
                    d = d.isNegative && !p || !d.isNegative && p;
                    return {
                        x: g ? d ? e - c.right : e - l + c.pos - a.plotLeft : f + a.xAxis[0].transB - a.plotLeft,
                        y: g ? c.height - f - k : d ? h - e - l : h - e,
                        width: g ? l : k,
                        height: g ? k : l
                    }
                };
                return d
            }();
        h.prototype.getStacks = function () {
            var a = this,
                d = a.inverted;
            a.yAxis.forEach(function (a) {
                a.stacking && a.stacking.stacks && a.hasVisibleSeries && (a.stacking.oldStacks = a.stacking.stacks)
            });
            a.series.forEach(function (f) {
                var e = f.xAxis && f.xAxis.options || {};
                !f.options.stacking || !0 !==
                    f.visible && !1 !== a.options.chart.ignoreHiddenSeries || (f.stackKey = [f.type, k(f.options.stack, ""), d ? e.top : e.left, d ? e.height : e.width].join())
            })
        };
        H.compose(e);
        v.prototype.setGroupedPoints = function () {
            var a = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? v.prototype.setStackedPoints.call(this, "group") : a && p(a.stacks, function (d, f) {
                "group" === f.slice(-5) && (p(d, function (a) {
                    return a.destroy()
                }), delete a.stacks[f])
            })
        };
        v.prototype.setStackedPoints = function (a) {
            var f = a || this.options.stacking;
            if (f && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var e = this.processedXData,
                    p = this.processedYData,
                    h = [],
                    C = p.length,
                    x = this.options,
                    c = x.threshold,
                    t = k(x.startFromThreshold && c, 0);
                x = x.stack;
                a = a ? this.type + "," + f : this.stackKey;
                var g = "-" + a,
                    u = this.negStacks,
                    n = this.yAxis,
                    b = n.stacking.stacks,
                    r = n.stacking.oldStacks,
                    G, m;
                n.stacking.stacksTouched += 1;
                for (m = 0; m < C; m++) {
                    var w = e[m];
                    var N = p[m];
                    var B = this.getStackIndicator(B,
                        w, this.index);
                    var v = B.key;
                    var O = (G = u && N < (t ? 0 : c)) ? g : a;
                    b[O] || (b[O] = {});
                    b[O][w] || (r[O] && r[O][w] ? (b[O][w] = r[O][w], b[O][w].total = null) : b[O][w] = new F(n, n.options.stackLabels, G, w, x));
                    O = b[O][w];
                    null !== N ? (O.points[v] = O.points[this.index] = [k(O.cumulative, t)], l(O.cumulative) || (O.base = v), O.touched = n.stacking.stacksTouched, 0 < B.index && !1 === this.singleStacks && (O.points[v][0] = O.points[this.index + "," + w + ",0"][0])) : O.points[v] = O.points[this.index] = null;
                    "percent" === f ? (G = G ? a : g, u && b[G] && b[G][w] ? (G = b[G][w], O.total = G.total =
                        Math.max(G.total, O.total) + Math.abs(N) || 0) : O.total = q(O.total + (Math.abs(N) || 0))) : "group" === f ? (d(N) && (N = N[0]), null !== N && (O.total = (O.total || 0) + 1)) : O.total = q(O.total + (N || 0));
                    O.cumulative = "group" === f ? (O.total || 1) - 1 : k(O.cumulative, t) + (N || 0);
                    null !== N && (O.points[v].push(O.cumulative), h[m] = O.cumulative, O.hasValidPoints = !0)
                }
                "percent" === f && (n.stacking.usePercentage = !0);
                "group" !== f && (this.stackedYData = h);
                n.stacking.oldStacks = {}
            }
        };
        v.prototype.modifyStacks = function () {
            var a = this,
                d = a.stackKey,
                f = a.yAxis.stacking.stacks,
                e = a.processedXData,
                k, l = a.options.stacking;
            a[l + "Stacker"] && [d, "-" + d].forEach(function (d) {
                for (var c = e.length, p, g; c--;)
                    if (p = e[c], k = a.getStackIndicator(k, p, a.index, d), g = (p = f[d] && f[d][p]) && p.points[k.key]) a[l + "Stacker"](g, p, c)
            })
        };
        v.prototype.percentStacker = function (a, d, f) {
            d = d.total ? 100 / d.total : 0;
            a[0] = q(a[0] * d);
            a[1] = q(a[1] * d);
            this.stackedYData[f] = a[1]
        };
        v.prototype.getStackIndicator = function (a, d, f, e) {
            !l(a) || a.x !== d || e && a.key !== e ? a = {
                x: d,
                index: 0,
                key: e
            } : a.index++;
            a.key = [f, d, a.index].join();
            return a
        };
        E.StackItem =
            F;
        "";
        return E.StackItem
    });
    M(h, "Series/Line/LineSeries.js", [h["Core/Series/Series.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = this && this.__extends || function () {
            var e = function (h, q) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, f) {
                        e.__proto__ = f
                    } || function (e, f) {
                        for (var d in f) f.hasOwnProperty(d) && (e[d] = f[d])
                    };
                return e(h, q)
            };
            return function (h, q) {
                function l() {
                    this.constructor = h
                }
                e(h, q);
                h.prototype = null === q ? Object.create(q) : (l.prototype = q.prototype,
                    new l)
            }
        }(),
            v = A.defined,
            H = A.merge;
        A = function (h) {
            function z() {
                var e = null !== h && h.apply(this, arguments) || this;
                e.data = void 0;
                e.options = void 0;
                e.points = void 0;
                return e
            }
            D(z, h);
            z.prototype.drawGraph = function () {
                var e = this,
                    l = this.options,
                    f = (this.gappedPath || this.getGraphPath).call(this),
                    d = this.chart.styledMode,
                    a = [
                        ["graph", "highcharts-graph"]
                    ];
                d || a[0].push(l.lineColor || this.color || "#cccccc", l.dashStyle);
                a = e.getZonesGraphs(a);
                a.forEach(function (a, k) {
                    var p = a[0],
                        h = e[p],
                        q = h ? "animate" : "attr";
                    h ? (h.endX = e.preventGraphAnimation ?
                        null : f.xMap, h.animate({
                            d: f
                        })) : f.length && (e[p] = h = e.chart.renderer.path(f).addClass(a[1]).attr({
                            zIndex: 1
                        }).add(e.group));
                    h && !d && (p = {
                        stroke: a[2],
                        "stroke-width": l.lineWidth,
                        fill: e.fillGraph && e.color || "none"
                    }, a[3] ? p.dashstyle = a[3] : "square" !== l.linecap && (p["stroke-linecap"] = p["stroke-linejoin"] = "round"), h[q](p).shadow(2 > k && l.shadow));
                    h && (h.startX = f.xMap, h.isArea = f.isArea)
                })
            };
            z.prototype.getGraphPath = function (e, l, f) {
                var d = this,
                    a = d.options,
                    h = [],
                    k = [],
                    q, B = a.step;
                e = e || d.points;
                var J = e.reversed;
                J && e.reverse();
                (B = {
                    right: 1,
                    center: 2
                }[B] || B && 3) && J && (B = 4 - B);
                e = this.getValidPoints(e, !1, !(a.connectNulls && !l && !f));
                e.forEach(function (p, F) {
                    var y = p.plotX,
                        C = p.plotY,
                        x = e[F - 1];
                    (p.leftCliff || x && x.rightCliff) && !f && (q = !0);
                    p.isNull && !v(l) && 0 < F ? q = !a.connectNulls : p.isNull && !l ? q = !0 : (0 === F || q ? F = [
                        ["M", p.plotX, p.plotY]
                    ] : d.getPointSpline ? F = [d.getPointSpline(e, p, F)] : B ? (F = 1 === B ? [
                        ["L", x.plotX, C]
                    ] : 2 === B ? [
                        ["L", (x.plotX + y) / 2, x.plotY],
                        ["L", (x.plotX + y) / 2, C]
                    ] : [
                        ["L", y, x.plotY]
                    ], F.push(["L", y, C])) : F = [
                        ["L", y, C]
                    ], k.push(p.x), B && (k.push(p.x),
                        2 === B && k.push(p.x)), h.push.apply(h, F), q = !1)
                });
                h.xMap = k;
                return d.graphPath = h
            };
            z.prototype.getZonesGraphs = function (e) {
                this.zones.forEach(function (l, f) {
                    f = ["zone-graph-" + f, "highcharts-graph highcharts-zone-graph-" + f + " " + (l.className || "")];
                    this.chart.styledMode || f.push(l.color || this.color, l.dashStyle || this.options.dashStyle);
                    e.push(f)
                }, this);
                return e
            };
            z.defaultOptions = H(e.defaultOptions, {});
            return z
        }(e);
        h.registerSeriesType("line", A);
        "";
        return A
    });
    M(h, "Series/Area/AreaSeries.js", [h["Core/Color/Color.js"],
    h["Core/Legend/LegendSymbol.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E) {
        var v = this && this.__extends || function () {
            var f = function (d, a) {
                f = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                    };
                return f(d, a)
            };
            return function (d, a) {
                function e() {
                    this.constructor = d
                }
                f(d, a);
                d.prototype = null === a ? Object.create(a) : (e.prototype = a.prototype, new e)
            }
        }(),
            D = e.parse,
            I = A.seriesTypes.line;
        e =
            E.extend;
        var z = E.merge,
            q = E.objectEach,
            l = E.pick;
        E = function (f) {
            function d() {
                var a = null !== f && f.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            v(d, f);
            d.prototype.drawGraph = function () {
                this.areaPath = [];
                f.prototype.drawGraph.apply(this);
                var a = this,
                    d = this.areaPath,
                    e = this.options,
                    h = [
                        ["area", "highcharts-area", this.color, e.fillColor]
                    ];
                this.zones.forEach(function (d, f) {
                    h.push(["zone-area-" + f, "highcharts-area highcharts-zone-area-" + f + " " + d.className, d.color || a.color, d.fillColor ||
                        e.fillColor
                    ])
                });
                h.forEach(function (f) {
                    var k = f[0],
                        h = a[k],
                        p = h ? "animate" : "attr",
                        q = {};
                    h ? (h.endX = a.preventGraphAnimation ? null : d.xMap, h.animate({
                        d: d
                    })) : (q.zIndex = 0, h = a[k] = a.chart.renderer.path(d).addClass(f[1]).add(a.group), h.isArea = !0);
                    a.chart.styledMode || (q.fill = l(f[3], D(f[2]).setOpacity(l(e.fillOpacity, .75)).get()));
                    h[p](q);
                    h.startX = d.xMap;
                    h.shiftUnit = e.step ? 2 : 1
                })
            };
            d.prototype.getGraphPath = function (a) {
                var d = I.prototype.getGraphPath,
                    f = this.options,
                    e = f.stacking,
                    h = this.yAxis,
                    q, v = [],
                    z = [],
                    y = this.index,
                    C =
                        h.stacking.stacks[this.stackKey],
                    x = f.threshold,
                    c = Math.round(h.getThreshold(f.threshold));
                f = l(f.connectNulls, "percent" === e);
                var t = function (b, d, f) {
                    var g = a[b];
                    b = e && C[g.x].points[y];
                    var n = g[f + "Null"] || 0;
                    f = g[f + "Cliff"] || 0;
                    g = !0;
                    if (f || n) {
                        var r = (n ? b[0] : b[1]) + f;
                        var k = b[0] + f;
                        g = !!n
                    } else !e && a[d] && a[d].isNull && (r = k = x);
                    "undefined" !== typeof r && (z.push({
                        plotX: u,
                        plotY: null === r ? c : h.getThreshold(r),
                        isNull: g,
                        isCliff: !0
                    }), v.push({
                        plotX: u,
                        plotY: null === k ? c : h.getThreshold(k),
                        doCurve: !1
                    }))
                };
                a = a || this.points;
                e && (a = this.getStackPoints(a));
                for (q = 0; q < a.length; q++) {
                    e || (a[q].leftCliff = a[q].rightCliff = a[q].leftNull = a[q].rightNull = void 0);
                    var g = a[q].isNull;
                    var u = l(a[q].rectPlotX, a[q].plotX);
                    var n = e ? l(a[q].yBottom, c) : c;
                    if (!g || f) f || t(q, q - 1, "left"), g && !e && f || (z.push(a[q]), v.push({
                        x: q,
                        plotX: u,
                        plotY: n
                    })), f || t(q, q + 1, "right")
                }
                q = d.call(this, z, !0, !0);
                v.reversed = !0;
                g = d.call(this, v, !0, !0);
                (n = g[0]) && "M" === n[0] && (g[0] = ["L", n[1], n[2]]);
                g = q.concat(g);
                g.length && g.push(["Z"]);
                d = d.call(this, z, !1, f);
                g.xMap = q.xMap;
                this.areaPath = g;
                return d
            };
            d.prototype.getStackPoints =
                function (a) {
                    var d = this,
                        f = [],
                        e = [],
                        h = this.xAxis,
                        v = this.yAxis,
                        z = v.stacking.stacks[this.stackKey],
                        D = {},
                        y = v.series,
                        C = y.length,
                        x = v.options.reversedStacks ? 1 : -1,
                        c = y.indexOf(d);
                    a = a || this.points;
                    if (this.options.stacking) {
                        for (var t = 0; t < a.length; t++) a[t].leftNull = a[t].rightNull = void 0, D[a[t].x] = a[t];
                        q(z, function (c, a) {
                            null !== c.total && e.push(a)
                        });
                        e.sort(function (c, a) {
                            return c - a
                        });
                        var g = y.map(function (c) {
                            return c.visible
                        });
                        e.forEach(function (a, n) {
                            var b = 0,
                                r, k;
                            if (D[a] && !D[a].isNull) f.push(D[a]), [-1, 1].forEach(function (b) {
                                var f =
                                    1 === b ? "rightNull" : "leftNull",
                                    m = 0,
                                    w = z[e[n + b]];
                                if (w)
                                    for (var h = c; 0 <= h && h < C;) {
                                        var l = y[h].index;
                                        r = w.points[l];
                                        r || (l === d.index ? D[a][f] = !0 : g[h] && (k = z[a].points[l]) && (m -= k[1] - k[0]));
                                        h += x
                                    }
                                D[a][1 === b ? "rightCliff" : "leftCliff"] = m
                            });
                            else {
                                for (var m = c; 0 <= m && m < C;) {
                                    if (r = z[a].points[y[m].index]) {
                                        b = r[1];
                                        break
                                    }
                                    m += x
                                }
                                b = l(b, 0);
                                b = v.translate(b, 0, 1, 0, 1);
                                f.push({
                                    isNull: !0,
                                    plotX: h.translate(a, 0, 0, 0, 1),
                                    x: a,
                                    plotY: b,
                                    yBottom: b
                                })
                            }
                        })
                    }
                    return f
                };
            d.defaultOptions = z(I.defaultOptions, {
                threshold: 0
            });
            return d
        }(I);
        e(E.prototype, {
            singleStacks: !1,
            drawLegendSymbol: h.drawRectangle
        });
        A.registerSeriesType("area", E);
        "";
        return E
    });
    M(h, "Series/Spline/SplineSeries.js", [h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]], function (e, h) {
        var D = this && this.__extends || function () {
            var e = function (h, q) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, f) {
                        e.__proto__ = f
                    } || function (e, f) {
                        for (var d in f) f.hasOwnProperty(d) && (e[d] = f[d])
                    };
                return e(h, q)
            };
            return function (h, q) {
                function l() {
                    this.constructor = h
                }
                e(h, q);
                h.prototype = null === q ? Object.create(q) :
                    (l.prototype = q.prototype, new l)
            }
        }(),
            E = e.seriesTypes.line,
            v = h.merge,
            H = h.pick;
        h = function (e) {
            function h() {
                var h = null !== e && e.apply(this, arguments) || this;
                h.data = void 0;
                h.options = void 0;
                h.points = void 0;
                return h
            }
            D(h, e);
            h.prototype.getPointSpline = function (e, h, f) {
                var d = h.plotX || 0,
                    a = h.plotY || 0,
                    l = e[f - 1];
                f = e[f + 1];
                if (l && !l.isNull && !1 !== l.doCurve && !h.isCliff && f && !f.isNull && !1 !== f.doCurve && !h.isCliff) {
                    e = l.plotY || 0;
                    var k = f.plotX || 0;
                    f = f.plotY || 0;
                    var q = 0;
                    var B = (1.5 * d + (l.plotX || 0)) / 2.5;
                    var v = (1.5 * a + e) / 2.5;
                    k = (1.5 * d +
                        k) / 2.5;
                    var z = (1.5 * a + f) / 2.5;
                    k !== B && (q = (z - v) * (k - d) / (k - B) + a - z);
                    v += q;
                    z += q;
                    v > e && v > a ? (v = Math.max(e, a), z = 2 * a - v) : v < e && v < a && (v = Math.min(e, a), z = 2 * a - v);
                    z > f && z > a ? (z = Math.max(f, a), v = 2 * a - z) : z < f && z < a && (z = Math.min(f, a), v = 2 * a - z);
                    h.rightContX = k;
                    h.rightContY = z
                }
                h = ["C", H(l.rightContX, l.plotX, 0), H(l.rightContY, l.plotY, 0), H(B, d, 0), H(v, a, 0), d, a];
                l.rightContX = l.rightContY = void 0;
                return h
            };
            h.defaultOptions = v(E.defaultOptions);
            return h
        }(E);
        e.registerSeriesType("spline", h);
        "";
        return h
    });
    M(h, "Series/AreaSpline/AreaSplineSeries.js",
        [h["Series/Area/AreaSeries.js"], h["Series/Spline/SplineSeries.js"], h["Core/Legend/LegendSymbol.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]],
        function (e, h, A, E, v) {
            var D = this && this.__extends || function () {
                var e = function (f, d) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                        instanceof Array && function (a, d) {
                            a.__proto__ = d
                        } || function (a, d) {
                            for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                        };
                    return e(f, d)
                };
                return function (f, d) {
                    function a() {
                        this.constructor = f
                    }
                    e(f, d);
                    f.prototype = null === d ? Object.create(d) :
                        (a.prototype = d.prototype, new a)
                }
            }(),
                I = e.prototype,
                z = v.extend,
                q = v.merge;
            v = function (l) {
                function f() {
                    var d = null !== l && l.apply(this, arguments) || this;
                    d.data = void 0;
                    d.points = void 0;
                    d.options = void 0;
                    return d
                }
                D(f, l);
                f.defaultOptions = q(h.defaultOptions, e.defaultOptions);
                return f
            }(h);
            z(v.prototype, {
                getGraphPath: I.getGraphPath,
                getStackPoints: I.getStackPoints,
                drawGraph: I.drawGraph,
                drawLegendSymbol: A.drawRectangle
            });
            E.registerSeriesType("areaspline", v);
            "";
            return v
        });
    M(h, "Series/Column/ColumnSeries.js", [h["Core/Animation/AnimationUtilities.js"],
    h["Core/Color/Color.js"], h["Core/Globals.js"], h["Core/Legend/LegendSymbol.js"], h["Core/Series/Series.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H, I) {
        var z = this && this.__extends || function () {
            var a = function (d, c) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (c, a) {
                        c.__proto__ = a
                    } || function (c, a) {
                        for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d])
                    };
                return a(d, c)
            };
            return function (d, c) {
                function f() {
                    this.constructor = d
                }
                a(d, c);
                d.prototype = null === c ? Object.create(c) :
                    (f.prototype = c.prototype, new f)
            }
        }(),
            q = e.animObject,
            l = h.parse,
            f = A.hasTouch;
        e = A.noop;
        var d = I.clamp,
            a = I.css,
            p = I.defined,
            k = I.extend,
            F = I.fireEvent,
            B = I.isArray,
            J = I.isNumber,
            D = I.merge,
            L = I.pick,
            y = I.objectEach;
        I = function (e) {
            function h() {
                var c = null !== e && e.apply(this, arguments) || this;
                c.borderWidth = void 0;
                c.data = void 0;
                c.group = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            z(h, e);
            h.prototype.animate = function (c) {
                var a = this,
                    f = this.yAxis,
                    e = a.options,
                    n = this.chart.inverted,
                    b = {},
                    r = n ? "translateX" : "translateY";
                if (c) b.scaleY =
                    .001, c = d(f.toPixels(e.threshold), f.pos, f.pos + f.len), n ? b.translateX = c - f.len : b.translateY = c, a.clipBox && a.setClip(), a.group.attr(b);
                else {
                    var h = Number(a.group.attr(r));
                    a.group.animate({
                        scaleY: 1
                    }, k(q(a.options.animation), {
                        step: function (c, d) {
                            a.group && (b[r] = h + d.pos * (f.pos - h), a.group.attr(b))
                        }
                    }))
                }
            };
            h.prototype.init = function (c, a) {
                e.prototype.init.apply(this, arguments);
                var d = this;
                c = d.chart;
                c.hasRendered && c.series.forEach(function (c) {
                    c.type === d.type && (c.isDirty = !0)
                })
            };
            h.prototype.getColumnMetrics = function () {
                var c =
                    this,
                    a = c.options,
                    d = c.xAxis,
                    f = c.yAxis,
                    e = d.options.reversedStacks;
                e = d.reversed && !e || !d.reversed && e;
                var b = {},
                    r, k = 0;
                !1 === a.grouping ? k = 1 : c.chart.series.forEach(function (a) {
                    var d = a.yAxis,
                        g = a.options;
                    if (a.type === c.type && (a.visible || !c.chart.options.chart.ignoreHiddenSeries) && f.len === d.len && f.pos === d.pos) {
                        if (g.stacking && "group" !== g.stacking) {
                            r = a.stackKey;
                            "undefined" === typeof b[r] && (b[r] = k++);
                            var e = b[r]
                        } else !1 !== g.grouping && (e = k++);
                        a.columnIndex = e
                    }
                });
                var m = Math.min(Math.abs(d.transA) * (d.ordinal && d.ordinal.slope ||
                    a.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
                    h = m * a.groupPadding,
                    l = (m - 2 * h) / (k || 1);
                a = Math.min(a.maxPointWidth || d.len, L(a.pointWidth, l * (1 - 2 * a.pointPadding)));
                c.columnMetrics = {
                    width: a,
                    offset: (l - a) / 2 + (h + ((c.columnIndex || 0) + (e ? 1 : 0)) * l - m / 2) * (e ? -1 : 1),
                    paddedWidth: l,
                    columnCount: k
                };
                return c.columnMetrics
            };
            h.prototype.crispCol = function (c, a, d, f) {
                var g = this.chart,
                    b = this.borderWidth,
                    e = -(b % 2 ? .5 : 0);
                b = b % 2 ? .5 : 1;
                g.inverted && g.renderer.isVML && (b += 1);
                this.options.crisp && (d = Math.round(c + d) + e, c = Math.round(c) +
                    e, d -= c);
                f = Math.round(a + f) + b;
                e = .5 >= Math.abs(a) && .5 < f;
                a = Math.round(a) + b;
                f -= a;
                e && f && (--a, f += 1);
                return {
                    x: c,
                    y: a,
                    width: d,
                    height: f
                }
            };
            h.prototype.adjustForMissingColumns = function (c, a, d, f) {
                var g = this,
                    b = this.options.stacking;
                if (!d.isNull && 1 < f.columnCount) {
                    var e = 0,
                        k = 0;
                    y(this.yAxis.stacking && this.yAxis.stacking.stacks, function (c) {
                        if ("number" === typeof d.x && (c = c[d.x.toString()])) {
                            var a = c.points[g.index],
                                f = c.total;
                            b ? (a && (e = k), c.hasValidPoints && k++) : B(a) && (e = a[1], k = f || 0)
                        }
                    });
                    c = (d.plotX || 0) + ((k - 1) * f.paddedWidth + a) /
                        2 - a - e * f.paddedWidth
                }
                return c
            };
            h.prototype.translate = function () {
                var c = this,
                    a = c.chart,
                    f = c.options,
                    e = c.dense = 2 > c.closestPointRange * c.xAxis.transA;
                e = c.borderWidth = L(f.borderWidth, e ? 0 : 1);
                var n = c.xAxis,
                    b = c.yAxis,
                    r = f.threshold,
                    k = c.translatedThreshold = b.getThreshold(r),
                    m = L(f.minPointLength, 5),
                    h = c.getColumnMetrics(),
                    l = h.width,
                    x = c.pointXOffset = h.offset,
                    q = c.dataMin,
                    y = c.dataMax,
                    C = c.barW = Math.max(l, 1 + 2 * e);
                a.inverted && (k -= .5);
                f.pointPadding && (C = Math.ceil(C));
                v.prototype.translate.apply(c);
                c.points.forEach(function (g) {
                    var e =
                        L(g.yBottom, k),
                        w = 999 + Math.abs(e),
                        t = g.plotX || 0;
                    w = d(g.plotY, -w, b.len + w);
                    var u = Math.min(w, e),
                        G = Math.max(w, e) - u,
                        N = l,
                        B = t + x,
                        F = C;
                    m && Math.abs(G) < m && (G = m, t = !b.reversed && !g.negative || b.reversed && g.negative, J(r) && J(y) && g.y === r && y <= r && (b.min || 0) < r && (q !== y || (b.max || 0) <= r) && (t = !t), u = Math.abs(u - k) > m ? e - m : k - (t ? m : 0));
                    p(g.options.pointWidth) && (N = F = Math.ceil(g.options.pointWidth), B -= Math.round((N - l) / 2));
                    f.centerInCategory && (B = c.adjustForMissingColumns(B, N, g, h));
                    g.barX = B;
                    g.pointWidth = N;
                    g.tooltipPos = a.inverted ? [d(b.len +
                        b.pos - a.plotLeft - w, b.pos - a.plotLeft, b.len + b.pos - a.plotLeft), n.len + n.pos - a.plotTop - B - F / 2, G] : [n.left - a.plotLeft + B + F / 2, d(w + b.pos - a.plotTop, b.pos - a.plotTop, b.len + b.pos - a.plotTop), G];
                    g.shapeType = c.pointClass.prototype.shapeType || "rect";
                    g.shapeArgs = c.crispCol.apply(c, g.isNull ? [B, k, F, 0] : [B, u, F, G])
                })
            };
            h.prototype.drawGraph = function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            };
            h.prototype.pointAttribs = function (c, a) {
                var d = this.options,
                    f = this.pointAttrToOptions || {},
                    e = f.stroke ||
                        "borderColor",
                    b = f["stroke-width"] || "borderWidth",
                    r = c && c.color || this.color,
                    k = c && c[e] || d[e] || r;
                f = c && c.options.dashStyle || d.dashStyle;
                var m = c && c[b] || d[b] || this[b] || 0,
                    h = L(c && c.opacity, d.opacity, 1);
                if (c && this.zones.length) {
                    var p = c.getZone();
                    r = c.options.color || p && (p.color || c.nonZonedColor) || this.color;
                    p && (k = p.borderColor || k, f = p.dashStyle || f, m = p.borderWidth || m)
                }
                a && c && (c = D(d.states[a], c.options.states && c.options.states[a] || {}), a = c.brightness, r = c.color || "undefined" !== typeof a && l(r).brighten(c.brightness).get() ||
                    r, k = c[e] || k, m = c[b] || m, f = c.dashStyle || f, h = L(c.opacity, h));
                e = {
                    fill: r,
                    stroke: k,
                    "stroke-width": m,
                    opacity: h
                };
                f && (e.dashstyle = f);
                return e
            };
            h.prototype.drawPoints = function () {
                var c = this,
                    a = this.chart,
                    d = c.options,
                    f = a.renderer,
                    e = d.animationLimit || 250,
                    b;
                c.points.forEach(function (g) {
                    var n = g.graphic,
                        m = !!n,
                        k = n && a.pointCount < e ? "animate" : "attr";
                    if (J(g.plotY) && null !== g.y) {
                        b = g.shapeArgs;
                        n && g.hasNewShapeType() && (n = n.destroy());
                        c.enabledDataSorting && (g.startXPos = c.xAxis.reversed ? -(b ? b.width || 0 : 0) : c.xAxis.width);
                        n || (g.graphic =
                            n = f[g.shapeType](b).add(g.group || c.group)) && c.enabledDataSorting && a.hasRendered && a.pointCount < e && (n.attr({
                                x: g.startXPos
                            }), m = !0, k = "animate");
                        if (n && m) n[k](D(b));
                        if (d.borderRadius) n[k]({
                            r: d.borderRadius
                        });
                        a.styledMode || n[k](c.pointAttribs(g, g.selected && "select")).shadow(!1 !== g.allowShadow && d.shadow, null, d.stacking && !d.borderRadius);
                        n && (n.addClass(g.getClassName(), !0), n.attr({
                            visibility: g.visible ? "inherit" : "hidden"
                        }))
                    } else n && (g.graphic = n.destroy())
                })
            };
            h.prototype.drawTracker = function () {
                var c = this,
                    d =
                        c.chart,
                    g = d.pointer,
                    e = function (b) {
                        var c = g.getPointFromEvent(b);
                        "undefined" !== typeof c && (g.isDirectTouch = !0, c.onMouseOver(b))
                    },
                    n;
                c.points.forEach(function (b) {
                    n = B(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : [];
                    b.graphic && (b.graphic.element.point = b);
                    n.forEach(function (c) {
                        c.div ? c.div.point = b : c.element.point = b
                    })
                });
                c._hasTracking || (c.trackerGroups.forEach(function (b) {
                    if (c[b]) {
                        c[b].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (b) {
                            g.onTrackerMouseOut(b)
                        });
                        if (f) c[b].on("touchstart",
                            e);
                        !d.styledMode && c.options.cursor && c[b].css(a).css({
                            cursor: c.options.cursor
                        })
                    }
                }), c._hasTracking = !0);
                F(this, "afterDrawTracker")
            };
            h.prototype.remove = function () {
                var c = this,
                    a = c.chart;
                a.hasRendered && a.series.forEach(function (a) {
                    a.type === c.type && (a.isDirty = !0)
                });
                v.prototype.remove.apply(c, arguments)
            };
            h.defaultOptions = D(v.defaultOptions, {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000"
                    }
                },
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    y: void 0
                },
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            });
            return h
        }(v);
        k(I.prototype, {
            cropShoulder: 0,
            directTouch: !0,
            drawLegendSymbol: E.drawRectangle,
            getSymbol: e,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        H.registerSeriesType("column", I);
        "";
        "";
        return I
    });
    M(h, "Core/Series/DataLabel.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/FormatUtilities.js"],
    h["Core/Utilities.js"]
    ], function (e, h, A) {
        var D = e.getDeferredAnimation,
            v = h.format,
            H = A.defined,
            I = A.extend,
            z = A.fireEvent,
            q = A.isArray,
            l = A.merge,
            f = A.objectEach,
            d = A.pick,
            a = A.splat,
            p;
        (function (e) {
            function k(a, c, f, g, e) {
                var n = this,
                    b = this.chart,
                    k = this.isCartesian && b.inverted,
                    h = this.enabledDataSorting,
                    m = d(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                    w = d(a.plotY, -9999),
                    l = c.getBBox(),
                    p = f.rotation,
                    t = f.align,
                    u = b.isInsidePlot(m, Math.round(w), {
                        inverted: k,
                        paneCoordinates: !0,
                        series: n
                    }),
                    x = function (b) {
                        h && n.xAxis && !q && n.setDataLabelStartPos(a,
                            c, e, u, b)
                    },
                    q = "justify" === d(f.overflow, h ? "none" : "justify"),
                    y = this.visible && !1 !== a.visible && (a.series.forceDL || h && !q || u || d(f.inside, !!this.options.stacking) && g && b.isInsidePlot(m, k ? g.x + 1 : g.y + g.height - 1, {
                        inverted: k,
                        paneCoordinates: !0,
                        series: n
                    }));
                if (y) {
                    var C = b.renderer.fontMetrics(b.styledMode ? void 0 : f.style.fontSize, c).b;
                    g = I({
                        x: k ? this.yAxis.len - w : m,
                        y: Math.round(k ? this.xAxis.len - m : w),
                        width: 0,
                        height: 0
                    }, g);
                    I(f, {
                        width: l.width,
                        height: l.height
                    });
                    p ? (q = !1, m = b.renderer.rotCorr(C, p), m = {
                        x: g.x + (f.x || 0) + g.width / 2 +
                            m.x,
                        y: g.y + (f.y || 0) + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[f.verticalAlign] * g.height
                    }, x(m), c[e ? "attr" : "animate"](m).attr({
                        align: t
                    }), x = (p + 720) % 360, x = 180 < x && 360 > x, "left" === t ? m.y -= x ? l.height : 0 : "center" === t ? (m.x -= l.width / 2, m.y -= l.height / 2) : "right" === t && (m.x -= l.width, m.y -= x ? 0 : l.height), c.placed = !0, c.alignAttr = m) : (x(g), c.align(f, void 0, g), m = c.alignAttr);
                    q && 0 <= g.height ? this.justifyDataLabel(c, f, m, l, g, e) : d(f.crop, !0) && (y = b.isInsidePlot(m.x, m.y, {
                        paneCoordinates: !0,
                        series: n
                    }) && b.isInsidePlot(m.x + l.width, m.y + l.height, {
                        paneCoordinates: !0,
                        series: n
                    }));
                    if (f.shape && !p) c[e ? "attr" : "animate"]({
                        anchorX: k ? b.plotWidth - a.plotY : a.plotX,
                        anchorY: k ? b.plotHeight - a.plotX : a.plotY
                    })
                }
                e && h && (c.placed = !1);
                y || h && !q || (c.hide(!0), c.placed = !1)
            }

            function h(a, c) {
                var d = c.filter;
                return d ? (c = d.operator, a = a[d.property], d = d.value, ">" === c && a > d || "<" === c && a < d || ">=" === c && a >= d || "<=" === c && a <= d || "==" === c && a == d || "===" === c && a === d ? !0 : !1) : !0
            }

            function p() {
                var e = this,
                    c = e.chart,
                    k = e.options,
                    g = e.points,
                    l = e.hasRendered || 0,
                    n = c.renderer,
                    b = k.dataLabels,
                    r, p = b.animation;
                p = b.defer ? D(c,
                    p, e) : {
                    defer: 0,
                    duration: 0
                };
                b = L(L(c.options.plotOptions && c.options.plotOptions.series && c.options.plotOptions.series.dataLabels, c.options.plotOptions && c.options.plotOptions[e.type] && c.options.plotOptions[e.type].dataLabels), b);
                z(this, "drawDataLabels");
                if (q(b) || b.enabled || e._hasPointLabels) {
                    var m = e.plotGroup("dataLabelsGroup", "data-labels", l ? "inherit" : "hidden", b.zIndex || 6);
                    m.attr({
                        opacity: +l
                    });
                    !l && (l = e.dataLabelsGroup) && (e.visible && m.show(!0), l[k.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, p));
                    g.forEach(function (g) {
                        r =
                            a(L(b, g.dlOptions || g.options && g.options.dataLabels));
                        r.forEach(function (b, a) {
                            var r = b.enabled && (!g.isNull || g.dataLabelOnNull) && h(g, b),
                                l = g.connectors ? g.connectors[a] : g.connector,
                                w = g.dataLabels ? g.dataLabels[a] : g.dataLabel,
                                p = d(b.distance, g.labelDistance),
                                u = !w;
                            if (r) {
                                var t = g.getLabelConfig();
                                var q = d(b[g.formatPrefix + "Format"], b.format);
                                t = H(q) ? v(q, t, c) : (b[g.formatPrefix + "Formatter"] || b.formatter).call(t, b);
                                q = b.style;
                                var x = b.rotation;
                                c.styledMode || (q.color = d(b.color, q.color, e.color, "#000000"), "contrast" ===
                                    q.color ? (g.contrastColor = n.getContrast(g.color || e.color), q.color = !H(p) && b.inside || 0 > p || k.stacking ? g.contrastColor : "#000000") : delete g.contrastColor, k.cursor && (q.cursor = k.cursor));
                                var G = {
                                    r: b.borderRadius || 0,
                                    rotation: x,
                                    padding: b.padding,
                                    zIndex: 1
                                };
                                c.styledMode || (G.fill = b.backgroundColor, G.stroke = b.borderColor, G["stroke-width"] = b.borderWidth);
                                f(G, function (b, c) {
                                    "undefined" === typeof b && delete G[c]
                                })
                            } !w || r && H(t) ? r && H(t) && (w ? G.text = t : (g.dataLabels = g.dataLabels || [], w = g.dataLabels[a] = x ? n.text(t, 0, -9999, b.useHTML).addClass("highcharts-data-label") :
                                n.label(t, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label"), a || (g.dataLabel = w), w.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (b.className || "") + (b.useHTML ? " highcharts-tracker" : ""))), w.options = b, w.attr(G), c.styledMode || w.css(q).shadow(b.shadow), w.added || w.add(m), b.textPath && !b.useHTML && (w.setTextPath(g.getDataLabelPath && g.getDataLabelPath(w) || g.graphic, b.textPath), g.dataLabelPath && !b.textPath.enabled && (g.dataLabelPath = g.dataLabelPath.destroy())), e.alignDataLabel(g, w, b, null, u)) : (g.dataLabel =
                                    g.dataLabel && g.dataLabel.destroy(), g.dataLabels && (1 === g.dataLabels.length ? delete g.dataLabels : delete g.dataLabels[a]), a || delete g.dataLabel, l && (g.connector = g.connector.destroy(), g.connectors && (1 === g.connectors.length ? delete g.connectors : delete g.connectors[a])))
                        })
                    })
                }
                z(this, "afterDrawDataLabels")
            }

            function A(a, c, d, f, e, n) {
                var b = this.chart,
                    g = c.align,
                    k = c.verticalAlign,
                    m = a.box ? 0 : a.padding || 0,
                    h = c.x;
                h = void 0 === h ? 0 : h;
                var l = c.y;
                l = void 0 === l ? 0 : l;
                var p = (d.x || 0) + m;
                if (0 > p) {
                    "right" === g && 0 <= h ? (c.align = "left", c.inside = !0) : h -= p;
                    var u = !0
                }
                p = (d.x || 0) + f.width - m;
                p > b.plotWidth && ("left" === g && 0 >= h ? (c.align = "right", c.inside = !0) : h += b.plotWidth - p, u = !0);
                p = d.y + m;
                0 > p && ("bottom" === k && 0 <= l ? (c.verticalAlign = "top", c.inside = !0) : l -= p, u = !0);
                p = (d.y || 0) + f.height - m;
                p > b.plotHeight && ("top" === k && 0 >= l ? (c.verticalAlign = "bottom", c.inside = !0) : l += b.plotHeight - p, u = !0);
                u && (c.x = h, c.y = l, a.placed = !n, a.align(c, void 0, e));
                return u
            }

            function L(a, c) {
                var d = [],
                    f;
                if (q(a) && !q(c)) d = a.map(function (a) {
                    return l(a, c)
                });
                else if (q(c) && !q(a)) d = c.map(function (c) {
                    return l(a,
                        c)
                });
                else if (q(a) || q(c))
                    for (f = Math.max(a.length, c.length); f--;) d[f] = l(a[f], c[f]);
                else d = l(a, c);
                return d
            }

            function y(a, c, d, f, e) {
                var g = this.chart,
                    b = g.inverted,
                    k = this.xAxis,
                    h = k.reversed,
                    m = b ? c.height / 2 : c.width / 2;
                a = (a = a.pointWidth) ? a / 2 : 0;
                c.startXPos = b ? e.x : h ? -m - a : k.width - m + a;
                c.startYPos = b ? h ? this.yAxis.height - m + a : -m - a : e.y;
                f ? "hidden" === c.visibility && (c.show(), c.attr({
                    opacity: 0
                }).animate({
                    opacity: 1
                })) : c.attr({
                    opacity: 1
                }).animate({
                    opacity: 0
                }, void 0, c.hide);
                g.hasRendered && (d && c.attr({
                    x: c.startXPos,
                    y: c.startYPos
                }),
                    c.placed = !0)
            }
            var C = [];
            e.compose = function (a) {
                if (-1 === C.indexOf(a)) {
                    var c = a.prototype;
                    C.push(a);
                    c.alignDataLabel = k;
                    c.drawDataLabels = p;
                    c.justifyDataLabel = A;
                    c.setDataLabelStartPos = y
                }
            }
        })(p || (p = {}));
        "";
        return p
    });
    M(h, "Series/Column/ColumnDataLabel.js", [h["Core/Series/DataLabel.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = h.series,
            v = A.merge,
            H = A.pick,
            I;
        (function (h) {
            function q(f, d, a, e, k) {
                var h = this.chart.inverted,
                    l = f.series,
                    p = (l.xAxis ? l.xAxis.len : this.chart.plotSizeX) ||
                        0;
                l = (l.yAxis ? l.yAxis.len : this.chart.plotSizeY) || 0;
                var q = f.dlBox || f.shapeArgs,
                    z = H(f.below, f.plotY > H(this.translatedThreshold, l)),
                    y = H(a.inside, !!this.options.stacking);
                q && (e = v(q), 0 > e.y && (e.height += e.y, e.y = 0), q = e.y + e.height - l, 0 < q && q < e.height && (e.height -= q), h && (e = {
                    x: l - e.y - e.height,
                    y: p - e.x - e.width,
                    width: e.height,
                    height: e.width
                }), y || (h ? (e.x += z ? 0 : e.width, e.width = 0) : (e.y += z ? e.height : 0, e.height = 0)));
                a.align = H(a.align, !h || y ? "center" : z ? "right" : "left");
                a.verticalAlign = H(a.verticalAlign, h || y ? "middle" : z ? "top" :
                    "bottom");
                D.prototype.alignDataLabel.call(this, f, d, a, e, k);
                a.inside && f.contrastColor && d.css({
                    color: f.contrastColor
                })
            }
            var l = [];
            h.compose = function (f) {
                e.compose(D); - 1 === l.indexOf(f) && (l.push(f), f.prototype.alignDataLabel = q)
            }
        })(I || (I = {}));
        return I
    });
    M(h, "Series/Bar/BarSeries.js", [h["Series/Column/ColumnSeries.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = this && this.__extends || function () {
            var e = function (h, q) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array &&
                    function (e, f) {
                        e.__proto__ = f
                    } || function (e, f) {
                        for (var d in f) f.hasOwnProperty(d) && (e[d] = f[d])
                    };
                return e(h, q)
            };
            return function (h, q) {
                function l() {
                    this.constructor = h
                }
                e(h, q);
                h.prototype = null === q ? Object.create(q) : (l.prototype = q.prototype, new l)
            }
        }(),
            v = A.extend,
            H = A.merge;
        A = function (h) {
            function v() {
                var e = null !== h && h.apply(this, arguments) || this;
                e.data = void 0;
                e.options = void 0;
                e.points = void 0;
                return e
            }
            D(v, h);
            v.defaultOptions = H(e.defaultOptions, {});
            return v
        }(e);
        v(A.prototype, {
            inverted: !0
        });
        h.registerSeriesType("bar",
            A);
        "";
        return A
    });
    M(h, "Series/Scatter/ScatterSeries.js", [h["Series/Column/ColumnSeries.js"], h["Series/Line/LineSeries.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]], function (e, h, A, E) {
        var v = this && this.__extends || function () {
            var e = function (h, f) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (d, a) {
                        d.__proto__ = a
                    } || function (d, a) {
                        for (var f in a) a.hasOwnProperty(f) && (d[f] = a[f])
                    };
                return e(h, f)
            };
            return function (h, f) {
                function d() {
                    this.constructor = h
                }
                e(h, f);
                h.prototype = null ===
                    f ? Object.create(f) : (d.prototype = f.prototype, new d)
            }
        }(),
            D = E.addEvent,
            I = E.extend,
            z = E.merge;
        E = function (e) {
            function l() {
                var f = null !== e && e.apply(this, arguments) || this;
                f.data = void 0;
                f.options = void 0;
                f.points = void 0;
                return f
            }
            v(l, e);
            l.prototype.applyJitter = function () {
                var f = this,
                    d = this.options.jitter,
                    a = this.points.length;
                d && this.points.forEach(function (e, k) {
                    ["x", "y"].forEach(function (h, l) {
                        var p = "plot" + h.toUpperCase();
                        if (d[h] && !e.isNull) {
                            var q = f[h + "Axis"];
                            var B = d[h] * q.transA;
                            if (q && !q.isLog) {
                                var y = Math.max(0,
                                    e[p] - B);
                                q = Math.min(q.len, e[p] + B);
                                l = 1E4 * Math.sin(k + l * a);
                                e[p] = y + (q - y) * (l - Math.floor(l));
                                "x" === h && (e.clientX = e.plotX)
                            }
                        }
                    })
                })
            };
            l.prototype.drawGraph = function () {
                this.options.lineWidth ? e.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
            };
            l.defaultOptions = z(h.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            });
            return l
        }(h);
        I(E.prototype, {
            drawTracker: e.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1
        });
        D(E, "afterTranslate", function () {
            this.applyJitter()
        });
        A.registerSeriesType("scatter", E);
        "";
        return E
    });
    M(h, "Series/CenteredUtilities.js", [h["Core/Globals.js"], h["Core/Series/Series.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = e.deg2rad,
            v = A.isNumber,
            H = A.pick,
            I = A.relativeLength,
            z;
        (function (e) {
            e.getCenter = function () {
                var e =
                    this.options,
                    f = this.chart,
                    d = 2 * (e.slicedOffset || 0),
                    a = f.plotWidth - 2 * d,
                    p = f.plotHeight - 2 * d,
                    k = e.center,
                    q = Math.min(a, p),
                    B = e.size,
                    v = e.innerSize || 0;
                "string" === typeof B && (B = parseFloat(B));
                "string" === typeof v && (v = parseFloat(v));
                e = [H(k[0], "50%"), H(k[1], "50%"), H(B && 0 > B ? void 0 : e.size, "100%"), H(v && 0 > v ? void 0 : e.innerSize || 0, "0%")];
                !f.angular || this instanceof h || (e[3] = 0);
                for (k = 0; 4 > k; ++k) B = e[k], f = 2 > k || 2 === k && /%$/.test(B), e[k] = I(B, [a, p, q, e[2]][k]) + (f ? d : 0);
                e[3] > e[2] && (e[3] = e[2]);
                return e
            };
            e.getStartAndEndRadians = function (e,
                f) {
                e = v(e) ? e : 0;
                f = v(f) && f > e && 360 > f - e ? f : e + 360;
                return {
                    start: D * (e + -90),
                    end: D * (f + -90)
                }
            }
        })(z || (z = {}));
        "";
        return z
    });
    M(h, "Series/Pie/PiePoint.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Series/Point.js"], h["Core/Utilities.js"]], function (e, h, A) {
        var D = this && this.__extends || function () {
            var f = function (d, a) {
                f = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f])
                    };
                return f(d, a)
            };
            return function (d, a) {
                function e() {
                    this.constructor =
                        d
                }
                f(d, a);
                d.prototype = null === a ? Object.create(a) : (e.prototype = a.prototype, new e)
            }
        }(),
            v = e.setAnimation,
            H = A.addEvent,
            I = A.defined;
        e = A.extend;
        var z = A.isNumber,
            q = A.pick,
            l = A.relativeLength;
        h = function (f) {
            function d() {
                var a = null !== f && f.apply(this, arguments) || this;
                a.labelDistance = void 0;
                a.options = void 0;
                a.series = void 0;
                return a
            }
            D(d, f);
            d.prototype.getConnectorPath = function () {
                var a = this.labelPosition,
                    d = this.series.options.dataLabels,
                    f = this.connectorShapes,
                    e = d.connectorShape;
                f[e] && (e = f[e]);
                return e.call(this, {
                    x: a.final.x,
                    y: a.final.y,
                    alignment: a.alignment
                }, a.connectorPosition, d)
            };
            d.prototype.getTranslate = function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            };
            d.prototype.haloPath = function (a) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, {
                    innerR: d.r - 1,
                    start: d.start,
                    end: d.end
                })
            };
            d.prototype.init = function () {
                var a = this;
                f.prototype.init.apply(this, arguments);
                this.name = q(this.name, "Slice");
                var d = function (d) {
                    a.slice("select" ===
                        d.type)
                };
                H(this, "select", d);
                H(this, "unselect", d);
                return this
            };
            d.prototype.isValid = function () {
                return z(this.y) && 0 <= this.y
            };
            d.prototype.setVisible = function (a, d) {
                var f = this,
                    e = this.series,
                    h = e.chart,
                    l = e.options.ignoreHiddenPoint;
                d = q(d, l);
                a !== this.visible && (this.visible = this.options.visible = a = "undefined" === typeof a ? !this.visible : a, e.options.data[e.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (d) {
                    if (f[d]) f[d][a ? "show" : "hide"](a)
                }), this.legendItem && h.legend.colorizeItem(this,
                    a), a || "hover" !== this.state || this.setState(""), l && (e.isDirty = !0), d && h.redraw())
            };
            d.prototype.slice = function (a, d, f) {
                var e = this.series;
                v(f, e.chart);
                q(d, !0);
                this.sliced = this.options.sliced = I(a) ? a : !this.sliced;
                e.options.data[e.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            };
            return d
        }(h);
        e(h.prototype, {
            connectorShapes: {
                fixedOffset: function (f, d, a) {
                    var e = d.breakAt;
                    d = d.touchingSliceAt;
                    return [
                        ["M", f.x,
                            f.y
                        ], a.softConnector ? ["C", f.x + ("left" === f.alignment ? -5 : 5), f.y, 2 * e.x - d.x, 2 * e.y - d.y, e.x, e.y] : ["L", e.x, e.y],
                        ["L", d.x, d.y]
                    ]
                },
                straight: function (e, d) {
                    d = d.touchingSliceAt;
                    return [
                        ["M", e.x, e.y],
                        ["L", d.x, d.y]
                    ]
                },
                crookedLine: function (e, d, a) {
                    d = d.touchingSliceAt;
                    var f = this.series,
                        h = f.center[0],
                        q = f.chart.plotWidth,
                        B = f.chart.plotLeft;
                    f = e.alignment;
                    var v = this.shapeArgs.r;
                    a = l(a.crookDistance, 1);
                    q = "left" === f ? h + v + (q + B - h - v) * (1 - a) : B + (h - v) * a;
                    a = ["L", q, e.y];
                    h = !0;
                    if ("left" === f ? q > e.x || q < d.x : q < e.x || q > d.x) h = !1;
                    e = [
                        ["M", e.x, e.y]
                    ];
                    h && e.push(a);
                    e.push(["L", d.x, d.y]);
                    return e
                }
            }
        });
        return h
    });
    M(h, "Series/Pie/PieSeries.js", [h["Series/CenteredUtilities.js"], h["Series/Column/ColumnSeries.js"], h["Core/Globals.js"], h["Core/Legend/LegendSymbol.js"], h["Series/Pie/PiePoint.js"], h["Core/Series/Series.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Renderer/SVG/Symbols.js"], h["Core/Utilities.js"]], function (e, h, A, E, v, H, I, z, q) {
        var l = this && this.__extends || function () {
            var a = function (d, e) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array &&
                    function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e])
                    };
                return a(d, e)
            };
            return function (d, e) {
                function f() {
                    this.constructor = d
                }
                a(d, e);
                d.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
            }
        }(),
            f = e.getStartAndEndRadians;
        A = A.noop;
        var d = q.clamp,
            a = q.extend,
            p = q.fireEvent,
            k = q.merge,
            F = q.pick,
            B = q.relativeLength;
        q = function (a) {
            function e() {
                var d = null !== a && a.apply(this, arguments) || this;
                d.center = void 0;
                d.data = void 0;
                d.maxLabelDistance = void 0;
                d.options = void 0;
                d.points =
                    void 0;
                return d
            }
            l(e, a);
            e.prototype.animate = function (a) {
                var d = this,
                    e = d.points,
                    f = d.startAngleRad;
                a || e.forEach(function (c) {
                    var a = c.graphic,
                        e = c.shapeArgs;
                    a && e && (a.attr({
                        r: F(c.startR, d.center && d.center[3] / 2),
                        start: f,
                        end: f
                    }), a.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, d.options.animation))
                })
            };
            e.prototype.drawEmpty = function () {
                var a = this.startAngleRad,
                    d = this.endAngleRad,
                    e = this.options;
                if (0 === this.total && this.center) {
                    var f = this.center[0];
                    var c = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(f,
                        c, this.center[1] / 2, 0, a, d).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: z.arc(f, c, this.center[2] / 2, 0, {
                            start: a,
                            end: d,
                            innerR: this.center[3] / 2
                        })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": e.borderWidth,
                        fill: e.fillColor || "none",
                        stroke: e.color || "#cccccc"
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            };
            e.prototype.drawPoints = function () {
                var a = this.chart.renderer;
                this.points.forEach(function (d) {
                    d.graphic && d.hasNewShapeType() && (d.graphic = d.graphic.destroy());
                    d.graphic ||
                        (d.graphic = a[d.shapeType](d.shapeArgs).add(d.series.group), d.delayedRendering = !0)
                })
            };
            e.prototype.generatePoints = function () {
                a.prototype.generatePoints.call(this);
                this.updateTotals()
            };
            e.prototype.getX = function (a, e, f) {
                var h = this.center,
                    c = this.radii ? this.radii[f.index] || 0 : h[2] / 2;
                a = Math.asin(d((a - h[1]) / (c + f.labelDistance), -1, 1));
                return h[0] + (e ? -1 : 1) * Math.cos(a) * (c + f.labelDistance) + (0 < f.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0)
            };
            e.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            e.prototype.redrawPoints = function () {
                var a = this,
                    d = a.chart,
                    e = d.renderer,
                    f = a.options.shadow,
                    c, h, g, l;
                this.drawEmpty();
                !f || a.shadowGroup || d.styledMode || (a.shadowGroup = e.g("shadow").attr({
                    zIndex: -1
                }).add(a.group));
                a.points.forEach(function (n) {
                    var b = {};
                    h = n.graphic;
                    if (!n.isNull && h) {
                        var r = void 0;
                        l = n.shapeArgs;
                        c = n.getTranslate();
                        d.styledMode || (r = n.shadowGroup, f && !r && (r = n.shadowGroup = e.g("shadow").add(a.shadowGroup)), r && r.attr(c), g = a.pointAttribs(n, n.selected && "select"));
                        n.delayedRendering ? (h.setRadialReference(a.center).attr(l).attr(c),
                            d.styledMode || h.attr(g).attr({
                                "stroke-linejoin": "round"
                            }).shadow(f, r), n.delayedRendering = !1) : (h.setRadialReference(a.center), d.styledMode || k(!0, b, g), k(!0, b, l, c), h.animate(b));
                        h.attr({
                            visibility: n.visible ? "inherit" : "hidden"
                        });
                        h.addClass(n.getClassName(), !0)
                    } else h && (n.graphic = h.destroy())
                })
            };
            e.prototype.sortByAngle = function (a, d) {
                a.sort(function (a, e) {
                    return "undefined" !== typeof a.angle && (e.angle - a.angle) * d
                })
            };
            e.prototype.translate = function (a) {
                this.generatePoints();
                var d = this.options,
                    e = d.slicedOffset,
                    h = e + (d.borderWidth || 0),
                    c = f(d.startAngle, d.endAngle),
                    k = this.startAngleRad = c.start;
                c = (this.endAngleRad = c.end) - k;
                var g = this.points,
                    l = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var n = g.length,
                    b, r = 0;
                a || (this.center = a = this.getCenter());
                for (b = 0; b < n; b++) {
                    var q = g[b];
                    var m = k + r * c;
                    !q.isValid() || d && !q.visible || (r += q.percentage / 100);
                    var w = k + r * c;
                    var N = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * m) / 1E3,
                        end: Math.round(1E3 * w) / 1E3
                    };
                    q.shapeType = "arc";
                    q.shapeArgs = N;
                    q.labelDistance = F(q.options.dataLabels &&
                        q.options.dataLabels.distance, l);
                    q.labelDistance = B(q.labelDistance, N.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, q.labelDistance);
                    w = (w + m) / 2;
                    w > 1.5 * Math.PI ? w -= 2 * Math.PI : w < -Math.PI / 2 && (w += 2 * Math.PI);
                    q.slicedTranslation = {
                        translateX: Math.round(Math.cos(w) * e),
                        translateY: Math.round(Math.sin(w) * e)
                    };
                    N = Math.cos(w) * a[2] / 2;
                    var v = Math.sin(w) * a[2] / 2;
                    q.tooltipPos = [a[0] + .7 * N, a[1] + .7 * v];
                    q.half = w < -Math.PI / 2 || w > Math.PI / 2 ? 1 : 0;
                    q.angle = w;
                    m = Math.min(h, q.labelDistance / 5);
                    q.labelPosition = {
                        natural: {
                            x: a[0] + N +
                                Math.cos(w) * q.labelDistance,
                            y: a[1] + v + Math.sin(w) * q.labelDistance
                        },
                        "final": {},
                        alignment: 0 > q.labelDistance ? "center" : q.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: a[0] + N + Math.cos(w) * m,
                                y: a[1] + v + Math.sin(w) * m
                            },
                            touchingSliceAt: {
                                x: a[0] + N,
                                y: a[1] + v
                            }
                        }
                    }
                }
                p(this, "afterTranslate")
            };
            e.prototype.updateTotals = function () {
                var a = this.points,
                    d = a.length,
                    e = this.options.ignoreHiddenPoint,
                    f, c = 0;
                for (f = 0; f < d; f++) {
                    var h = a[f];
                    !h.isValid() || e && !h.visible || (c += h.y)
                }
                this.total = c;
                for (f = 0; f < d; f++) h = a[f], h.percentage = 0 < c && (h.visible ||
                    !e) ? h.y / c * 100 : 0, h.total = c
            };
            e.defaultOptions = k(H.defaultOptions, {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    connectorPadding: 5,
                    connectorShape: "fixedOffset",
                    crookDistance: "70%",
                    distance: 30,
                    enabled: !0,
                    formatter: function () {
                        return this.point.isNull ? void 0 : this.point.name
                    },
                    softConnector: !0,
                    x: 0
                },
                fillColor: void 0,
                ignoreHiddenPoint: !0,
                inactiveOtherPoints: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: "#ffffff",
                borderWidth: 1,
                lineWidth: void 0,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
            });
            return e
        }(H);
        a(q.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawLegendSymbol: E.drawRectangle,
            drawTracker: h.prototype.drawTracker,
            getCenter: e.getCenter,
            getSymbol: A,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: h.prototype.pointAttribs,
            pointClass: v,
            requireSorting: !1,
            searchPoint: A,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        I.registerSeriesType("pie", q);
        "";
        return q
    });
    M(h, "Series/Pie/PieDataLabel.js", [h["Core/Series/DataLabel.js"],
    h["Core/Globals.js"], h["Core/Renderer/RendererUtilities.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E, v) {
        var D = h.noop,
            I = A.distribute,
            z = E.series,
            q = v.arrayMax,
            l = v.clamp,
            f = v.defined,
            d = v.merge,
            a = v.pick,
            p = v.relativeLength,
            k;
        (function (h) {
            function k() {
                var e = this,
                    h = e.data,
                    c = e.chart,
                    k = e.options.dataLabels || {},
                    g = k.connectorPadding,
                    l = c.plotWidth,
                    n = c.plotHeight,
                    b = c.plotLeft,
                    r = Math.round(c.chartWidth / 3),
                    p = e.center,
                    m = p[2] / 2,
                    w = p[1],
                    y = [
                        [],
                        []
                    ],
                    B = [0, 0, 0, 0],
                    v = e.dataLabelPositioners,
                    F, D, A, J, E, K, H, L, M, T, U, S;
                e.visible && (k.enabled || e._hasPointLabels) && (h.forEach(function (b) {
                    b.dataLabel && b.visible && b.dataLabel.shortened && (b.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), b.dataLabel.shortened = !1)
                }), z.prototype.drawDataLabels.apply(e), h.forEach(function (b) {
                    b.dataLabel && (b.visible ? (y[b.half].push(b), b.dataLabel._pos = null, !f(k.style.width) && !f(b.options.dataLabels && b.options.dataLabels.style && b.options.dataLabels.style.width) && b.dataLabel.getBBox().width > r && (b.dataLabel.css({
                        width: Math.round(.7 *
                            r) + "px"
                    }), b.dataLabel.shortened = !0)) : (b.dataLabel = b.dataLabel.destroy(), b.dataLabels && 1 === b.dataLabels.length && delete b.dataLabels))
                }), y.forEach(function (d, h) {
                    var r = d.length,
                        u = [],
                        q;
                    if (r) {
                        e.sortByAngle(d, h - .5);
                        if (0 < e.maxLabelDistance) {
                            var t = Math.max(0, w - m - e.maxLabelDistance);
                            var G = Math.min(w + m + e.maxLabelDistance, c.plotHeight);
                            d.forEach(function (b) {
                                0 < b.labelDistance && b.dataLabel && (b.top = Math.max(0, w - m - b.labelDistance), b.bottom = Math.min(w + m + b.labelDistance, c.plotHeight), q = b.dataLabel.getBBox().height ||
                                    21, b.distributeBox = {
                                        target: b.labelPosition.natural.y - b.top + q / 2,
                                        size: q,
                                        rank: b.y
                                    }, u.push(b.distributeBox))
                            });
                            t = G + q - t;
                            I(u, t, t / 5)
                        }
                        for (U = 0; U < r; U++) {
                            F = d[U];
                            K = F.labelPosition;
                            J = F.dataLabel;
                            T = !1 === F.visible ? "hidden" : "inherit";
                            M = t = K.natural.y;
                            u && f(F.distributeBox) && ("undefined" === typeof F.distributeBox.pos ? T = "hidden" : (H = F.distributeBox.size, M = v.radialDistributionY(F)));
                            delete F.positionIndex;
                            if (k.justify) L = v.justify(F, m, p);
                            else switch (k.alignTo) {
                                case "connectors":
                                    L = v.alignToConnectors(d, h, l, b);
                                    break;
                                case "plotEdges":
                                    L =
                                        v.alignToPlotEdges(J, h, l, b);
                                    break;
                                default:
                                    L = v.radialDistributionX(e, F, M, t)
                            }
                            J._attr = {
                                visibility: T,
                                align: K.alignment
                            };
                            S = F.options.dataLabels || {};
                            J._pos = {
                                x: L + a(S.x, k.x) + ({
                                    left: g,
                                    right: -g
                                }[K.alignment] || 0),
                                y: M + a(S.y, k.y) - 10
                            };
                            K.final.x = L;
                            K.final.y = M;
                            a(k.crop, !0) && (E = J.getBBox().width, t = null, L - E < g && 1 === h ? (t = Math.round(E - L + g), B[3] = Math.max(t, B[3])) : L + E > l - g && 0 === h && (t = Math.round(L + E - l + g), B[1] = Math.max(t, B[1])), 0 > M - H / 2 ? B[0] = Math.max(Math.round(-M + H / 2), B[0]) : M + H / 2 > n && (B[2] = Math.max(Math.round(M + H / 2 - n), B[2])),
                                J.sideOverflow = t)
                        }
                    }
                }), 0 === q(B) || this.verifyDataLabelOverflow(B)) && (this.placeDataLabels(), this.points.forEach(function (b) {
                    S = d(k, b.options.dataLabels);
                    if (D = a(S.connectorWidth, 1)) {
                        var f;
                        A = b.connector;
                        if ((J = b.dataLabel) && J._pos && b.visible && 0 < b.labelDistance) {
                            T = J._attr.visibility;
                            if (f = !A) b.connector = A = c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(e.dataLabelsGroup), c.styledMode || A.attr({
                                "stroke-width": D,
                                stroke: S.connectorColor ||
                                    b.color || "#666666"
                            });
                            A[f ? "attr" : "animate"]({
                                d: b.getConnectorPath()
                            });
                            A.attr("visibility", T)
                        } else A && (b.connector = A.destroy())
                    }
                }))
            }

            function v() {
                this.points.forEach(function (a) {
                    var d = a.dataLabel,
                        c;
                    d && a.visible && ((c = d._pos) ? (d.sideOverflow && (d._attr.width = Math.max(d.getBBox().width - d.sideOverflow, 0), d.css({
                        width: d._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), d.shortened = !0), d.attr(d._attr), d[d.moved ? "animate" : "attr"](c), d.moved = !0) : d && d.attr({
                        y: -9999
                    }));
                    delete a.distributeBox
                }, this)
            }

            function F(a) {
                var d = this.center,
                    c = this.options,
                    e = c.center,
                    f = c.minSize || 80,
                    h = null !== c.size;
                if (!h) {
                    if (null !== e[0]) var n = Math.max(d[2] - Math.max(a[1], a[3]), f);
                    else n = Math.max(d[2] - a[1] - a[3], f), d[0] += (a[3] - a[1]) / 2;
                    null !== e[1] ? n = l(n, f, d[2] - Math.max(a[0], a[2])) : (n = l(n, f, d[2] - a[0] - a[2]), d[1] += (a[0] - a[2]) / 2);
                    n < d[2] ? (d[2] = n, d[3] = Math.min(p(c.innerSize || 0, n), n), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : h = !0
                }
                return h
            }
            var A = [],
                y = {
                    radialDistributionY: function (a) {
                        return a.top +
                            a.distributeBox.pos
                    },
                    radialDistributionX: function (a, d, c, e) {
                        return a.getX(c < d.top + 2 || c > d.bottom - 2 ? e : c, d.half, d)
                    },
                    justify: function (a, d, c) {
                        return c[0] + (a.half ? -1 : 1) * (d + a.labelDistance)
                    },
                    alignToPlotEdges: function (a, d, c, e) {
                        a = a.getBBox().width;
                        return d ? a + e : c - a - e
                    },
                    alignToConnectors: function (a, d, c, e) {
                        var f = 0,
                            h;
                        a.forEach(function (a) {
                            h = a.dataLabel.getBBox().width;
                            h > f && (f = h)
                        });
                        return d ? f + e : c - f - e
                    }
                };
            h.compose = function (a) {
                e.compose(z); - 1 === A.indexOf(a) && (A.push(a), a = a.prototype, a.dataLabelPositioners = y, a.alignDataLabel =
                    D, a.drawDataLabels = k, a.placeDataLabels = v, a.verifyDataLabelOverflow = F)
            }
        })(k || (k = {}));
        return k
    });
    M(h, "Extensions/OverlappingDataLabels.js", [h["Core/Chart/Chart.js"], h["Core/Utilities.js"]], function (e, h) {
        function D(e, f) {
            var d = !1;
            if (e) {
                var a = e.newOpacity;
                e.oldOpacity !== a && (e.alignAttr && e.placed ? (e[a ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), d = !0, e.alignAttr.opacity = a, e[e.isOld ? "animate" : "attr"](e.alignAttr, null, function () {
                    f.styledMode || e.css({
                        pointerEvents: a ? "auto" : "none"
                    })
                }), v(f, "afterHideOverlappingLabel")) :
                    e.attr({
                        opacity: a
                    }));
                e.isOld = !0
            }
            return d
        }
        var E = h.addEvent,
            v = h.fireEvent,
            H = h.isArray,
            I = h.isNumber,
            z = h.objectEach,
            q = h.pick;
        E(e, "render", function () {
            var e = this,
                f = [];
            (this.labelCollectors || []).forEach(function (d) {
                f = f.concat(d())
            });
            (this.yAxis || []).forEach(function (d) {
                d.stacking && d.options.stackLabels && !d.options.stackLabels.allowOverlap && z(d.stacking.stacks, function (a) {
                    z(a, function (a) {
                        a.label && "hidden" !== a.label.visibility && f.push(a.label)
                    })
                })
            });
            (this.series || []).forEach(function (d) {
                var a = d.options.dataLabels;
                d.visible && (!1 !== a.enabled || d._hasPointLabels) && (a = function (a) {
                    return a.forEach(function (a) {
                        a.visible && (H(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : []).forEach(function (d) {
                            var h = d.options;
                            d.labelrank = q(h.labelrank, a.labelrank, a.shapeArgs && a.shapeArgs.height);
                            h.allowOverlap ? (d.oldOpacity = d.opacity, d.newOpacity = 1, D(d, e)) : f.push(d)
                        })
                    })
                }, a(d.nodes || []), a(d.points))
            });
            this.hideOverlappingLabels(f)
        });
        e.prototype.hideOverlappingLabels = function (e) {
            var f = this,
                d = e.length,
                a = f.renderer,
                h, k, l, q = !1;
            var z = function (d) {
                var e, f = d.box ? 0 : d.padding || 0,
                    c = e = 0,
                    h;
                if (d && (!d.alignAttr || d.placed)) {
                    var g = d.alignAttr || {
                        x: d.attr("x"),
                        y: d.attr("y")
                    };
                    var k = d.parentGroup;
                    d.width || (e = d.getBBox(), d.width = e.width, d.height = e.height, e = a.fontMetrics(null, d.element).h);
                    var n = d.width - 2 * f;
                    (h = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    }[d.alignValue]) ? c = +h * n : I(d.x) && Math.round(d.x) !== d.translateX && (c = d.x - d.translateX);
                    return {
                        x: g.x + (k.translateX || 0) + f - (c || 0),
                        y: g.y + (k.translateY || 0) + f - e,
                        width: d.width - 2 * f,
                        height: d.height - 2 * f
                    }
                }
            };
            for (k =
                0; k < d; k++)
                if (h = e[k]) h.oldOpacity = h.opacity, h.newOpacity = 1, h.absoluteBox = z(h);
            e.sort(function (a, d) {
                return (d.labelrank || 0) - (a.labelrank || 0)
            });
            for (k = 0; k < d; k++) {
                var A = (z = e[k]) && z.absoluteBox;
                for (h = k + 1; h < d; ++h) {
                    var E = (l = e[h]) && l.absoluteBox;
                    !A || !E || z === l || 0 === z.newOpacity || 0 === l.newOpacity || E.x >= A.x + A.width || E.x + E.width <= A.x || E.y >= A.y + A.height || E.y + E.height <= A.y || ((z.labelrank < l.labelrank ? z : l).newOpacity = 0)
                }
            }
            e.forEach(function (a) {
                D(a, f) && (q = !0)
            });
            q && v(f, "afterHideAllOverlappingLabels")
        }
    });
    M(h, "Core/Responsive.js",
        [h["Core/Utilities.js"]],
        function (e) {
            var h = e.extend,
                A = e.find,
                E = e.isArray,
                v = e.isObject,
                H = e.merge,
                I = e.objectEach,
                z = e.pick,
                q = e.splat,
                l = e.uniqueKey,
                f;
            (function (d) {
                var a = [];
                d.compose = function (d) {
                    -1 === a.indexOf(d) && (a.push(d), h(d.prototype, e.prototype));
                    return d
                };
                var e = function () {
                    function a() { }
                    a.prototype.currentOptions = function (a) {
                        function d(a, f, h, k) {
                            var c;
                            I(a, function (a, g) {
                                if (!k && -1 < e.collectionsWithUpdate.indexOf(g) && f[g])
                                    for (a = q(a), h[g] = [], c = 0; c < Math.max(a.length, f[g].length); c++) f[g][c] && (void 0 ===
                                        a[c] ? h[g][c] = f[g][c] : (h[g][c] = {}, d(a[c], f[g][c], h[g][c], k + 1)));
                                else v(a) ? (h[g] = E(a) ? [] : {}, d(a, f[g] || {}, h[g], k + 1)) : h[g] = "undefined" === typeof f[g] ? null : f[g]
                            })
                        }
                        var e = this,
                            f = {};
                        d(a, this.options, f, 0);
                        return f
                    };
                    a.prototype.matchResponsiveRule = function (a, d) {
                        var e = a.condition;
                        (e.callback || function () {
                            return this.chartWidth <= z(e.maxWidth, Number.MAX_VALUE) && this.chartHeight <= z(e.maxHeight, Number.MAX_VALUE) && this.chartWidth >= z(e.minWidth, 0) && this.chartHeight >= z(e.minHeight, 0)
                        }).call(this) && d.push(a._id)
                    };
                    a.prototype.setResponsive =
                        function (a, d) {
                            var e = this,
                                f = this.options.responsive,
                                h = this.currentResponsive,
                                k = [];
                            !d && f && f.rules && f.rules.forEach(function (a) {
                                "undefined" === typeof a._id && (a._id = l());
                                e.matchResponsiveRule(a, k)
                            }, this);
                            d = H.apply(void 0, k.map(function (a) {
                                return A((f || {}).rules || [], function (d) {
                                    return d._id === a
                                })
                            }).map(function (a) {
                                return a && a.chartOptions
                            }));
                            d.isResponsiveOptions = !0;
                            k = k.toString() || void 0;
                            k !== (h && h.ruleIds) && (h && this.update(h.undoOptions, a, !0), k ? (h = this.currentOptions(d), h.isResponsiveOptions = !0, this.currentResponsive = {
                                ruleIds: k,
                                mergedOptions: d,
                                undoOptions: h
                            }, this.update(d, a, !0)) : this.currentResponsive = void 0)
                        };
                    return a
                }()
            })(f || (f = {}));
            "";
            "";
            return f
        });
    M(h, "masters/highcharts.src.js", [h["Core/Globals.js"], h["Core/Utilities.js"], h["Core/DefaultOptions.js"], h["Core/Animation/Fx.js"], h["Core/Animation/AnimationUtilities.js"], h["Core/Renderer/HTML/AST.js"], h["Core/FormatUtilities.js"], h["Core/Renderer/RendererUtilities.js"], h["Core/Renderer/SVG/SVGElement.js"], h["Core/Renderer/SVG/SVGRenderer.js"], h["Core/Renderer/HTML/HTMLElement.js"],
    h["Core/Renderer/HTML/HTMLRenderer.js"], h["Core/Axis/Axis.js"], h["Core/Axis/DateTimeAxis.js"], h["Core/Axis/LogarithmicAxis.js"], h["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], h["Core/Axis/Tick.js"], h["Core/Tooltip.js"], h["Core/Series/Point.js"], h["Core/Pointer.js"], h["Core/MSPointer.js"], h["Core/Legend/Legend.js"], h["Core/Chart/Chart.js"], h["Core/Series/Series.js"], h["Core/Series/SeriesRegistry.js"], h["Series/Column/ColumnSeries.js"], h["Series/Column/ColumnDataLabel.js"], h["Series/Pie/PieSeries.js"],
    h["Series/Pie/PieDataLabel.js"], h["Core/Series/DataLabel.js"], h["Core/Responsive.js"], h["Core/Color/Color.js"], h["Core/Time.js"]
    ], function (e, h, A, E, v, H, I, z, q, l, f, d, a, p, k, F, B, J, K, L, y, C, x, c, t, g, u, n, b, r, G, m, w) {
        e.animate = v.animate;
        e.animObject = v.animObject;
        e.getDeferredAnimation = v.getDeferredAnimation;
        e.setAnimation = v.setAnimation;
        e.stop = v.stop;
        e.timers = E.timers;
        e.AST = H;
        e.Axis = a;
        e.Chart = x;
        e.chart = x.chart;
        e.Fx = E;
        e.Legend = C;
        e.PlotLineOrBand = F;
        e.Point = K;
        e.Pointer = y.isRequired() ? y : L;
        e.Series = c;
        e.SVGElement =
            q;
        e.SVGRenderer = l;
        e.Tick = B;
        e.Time = w;
        e.Tooltip = J;
        e.Color = m;
        e.color = m.parse;
        d.compose(l);
        f.compose(q);
        e.defaultOptions = A.defaultOptions;
        e.getOptions = A.getOptions;
        e.time = A.defaultTime;
        e.setOptions = A.setOptions;
        e.dateFormat = I.dateFormat;
        e.format = I.format;
        e.numberFormat = I.numberFormat;
        e.addEvent = h.addEvent;
        e.arrayMax = h.arrayMax;
        e.arrayMin = h.arrayMin;
        e.attr = h.attr;
        e.clearTimeout = h.clearTimeout;
        e.correctFloat = h.correctFloat;
        e.createElement = h.createElement;
        e.css = h.css;
        e.defined = h.defined;
        e.destroyObjectProperties =
            h.destroyObjectProperties;
        e.discardElement = h.discardElement;
        e.distribute = z.distribute;
        e.erase = h.erase;
        e.error = h.error;
        e.extend = h.extend;
        e.extendClass = h.extendClass;
        e.find = h.find;
        e.fireEvent = h.fireEvent;
        e.getMagnitude = h.getMagnitude;
        e.getStyle = h.getStyle;
        e.inArray = h.inArray;
        e.isArray = h.isArray;
        e.isClass = h.isClass;
        e.isDOMElement = h.isDOMElement;
        e.isFunction = h.isFunction;
        e.isNumber = h.isNumber;
        e.isObject = h.isObject;
        e.isString = h.isString;
        e.keys = h.keys;
        e.merge = h.merge;
        e.normalizeTickInterval = h.normalizeTickInterval;
        e.objectEach = h.objectEach;
        e.offset = h.offset;
        e.pad = h.pad;
        e.pick = h.pick;
        e.pInt = h.pInt;
        e.relativeLength = h.relativeLength;
        e.removeEvent = h.removeEvent;
        e.seriesType = t.seriesType;
        e.splat = h.splat;
        e.stableSort = h.stableSort;
        e.syncTimeout = h.syncTimeout;
        e.timeUnits = h.timeUnits;
        e.uniqueKey = h.uniqueKey;
        e.useSerialIds = h.useSerialIds;
        e.wrap = h.wrap;
        u.compose(g);
        r.compose(c);
        p.compose(a);
        k.compose(a);
        b.compose(n);
        F.compose(a);
        G.compose(x);
        return e
    });
    M(h, "Core/Axis/OrdinalAxis.js", [h["Core/Axis/Axis.js"], h["Core/Globals.js"],
    h["Core/Series/Series.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E) {
        var v = E.addEvent,
            D = E.correctFloat,
            I = E.css,
            z = E.defined,
            q = E.error,
            l = E.pick,
            f = E.timeUnits,
            d = [],
            a;
        (function (a) {
            function e(a, c, b, d, e, g, h) {
                void 0 === e && (e = []);
                void 0 === g && (g = 0);
                var m = {},
                    n = this.options.tickPixelInterval,
                    k = this.chart.time,
                    r = [],
                    l, w, p = 0,
                    u = [],
                    t = -Number.MAX_VALUE;
                if (!this.options.ordinal && !this.options.breaks || !e || 3 > e.length || "undefined" === typeof c) return k.getTimeTicks.apply(k, arguments);
                var G = e.length;
                for (l = 0; l < G; l++) {
                    var x =
                        l && e[l - 1] > b;
                    e[l] < c && (p = l);
                    if (l === G - 1 || e[l + 1] - e[l] > 5 * g || x) {
                        if (e[l] > t) {
                            for (w = k.getTimeTicks(a, e[p], e[l], d); w.length && w[0] <= t;) w.shift();
                            w.length && (t = w[w.length - 1]);
                            r.push(u.length);
                            u = u.concat(w)
                        }
                        p = l + 1
                    }
                    if (x) break
                }
                if (w) {
                    w = w.info;
                    if (h && w.unitRange <= f.hour) {
                        l = u.length - 1;
                        for (p = 1; p < l; p++)
                            if (k.dateFormat("%d", u[p]) !== k.dateFormat("%d", u[p - 1])) {
                                m[u[p]] = "day";
                                var y = !0
                            } y && (m[u[0]] = "day");
                        w.higherRanks = m
                    }
                    w.segmentStarts = r;
                    u.info = w
                } else q(12, !1, this.chart);
                if (h && z(n)) {
                    w = u.length;
                    k = [];
                    p = [];
                    l = void 0;
                    for (y = w; y--;) r =
                        this.translate(u[y]), l && (p[y] = l - r), k[y] = l = r;
                    p.sort();
                    p = p[Math.floor(p.length / 2)];
                    p < .6 * n && (p = null);
                    y = u[w - 1] > b ? w - 1 : w;
                    for (l = void 0; y--;) r = k[y], w = Math.abs(l - r), l && w < .8 * n && (null === p || w < .8 * p) ? (m[u[y]] && !m[u[y + 1]] ? (w = y + 1, l = r) : w = y, u.splice(w, 1)) : l = r
                }
                return u
            }

            function p(a) {
                var c = this.ordinal.positions;
                if (!c) return a;
                var b = c.length - 1;
                if (0 > a) a = c[0];
                else if (a > b) a = c[b];
                else {
                    b = Math.floor(a);
                    var d = a - b
                }
                return "undefined" !== typeof d && "undefined" !== typeof c[b] ? c[b] + (d ? d * (c[b + 1] - c[b]) : 0) : a
            }

            function B(a) {
                var c = this.ordinal,
                    b = c.positions;
                if (!b) return a;
                var d = (a - (this.old ? this.old.min : this.min)) * (this.old ? this.old.transA : this.transA) + this.minPixelPadding;
                0 < d && d < this.left + this.len || (c.extendedOrdinalPositions || (c.extendedOrdinalPositions = c.getExtendedPositions()), b = c.extendedOrdinalPositions);
                if (b && b.length) {
                    a = c.getIndexOfPoint(d, b);
                    c = D(a % 1);
                    if (0 <= a && a < b.length - 1) return b[Math.floor(a)] + c * (b[Math.ceil(a)] - b[Math.floor(a)]);
                    c = b.length;
                    d = b[0];
                    b = b[c - 1];
                    var e = (b - d) / (c - 1);
                    return 0 > a ? d + e * a : b + e * (a - c)
                }
                return a
            }

            function J(c, d) {
                var b =
                    a.Additions.findIndexOf(c, d, !0);
                return c[b] === d ? b : b + (d - c[b]) / (c[b + 1] - c[b])
            }

            function E() {
                this.ordinal || (this.ordinal = new a.Additions(this))
            }

            function H() {
                this.isXAxis && z(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && z(this.userMin) && (this.min += this.options.overscroll))
            }

            function y() {
                this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal &&
                    this.chart.navigator && !this.chart.navigator.adaptToUpdatedData)
            }

            function C() {
                this.ordinal && (this.ordinal.beforeSetTickPositions(), this.tickInterval = this.ordinal.postProcessTickInterval(this.tickInterval))
            }

            function x(a) {
                var c = this.xAxis[0],
                    b = c.options.overscroll,
                    d = a.originalEvent.chartX,
                    e = this.options.chart.panning,
                    f = !1;
                if (e && "y" !== e.type && c.options.ordinal && c.series.length) {
                    var g = this.mouseDownX,
                        h = c.getExtremes(),
                        k = h.dataMax,
                        l = h.min,
                        p = h.max,
                        q = this.hoverPoints,
                        u = c.closestPointRange || c.ordinal && c.ordinal.overscrollPointsRange;
                    g = (g - d) / (c.translationSlope * (c.ordinal.slope || u));
                    u = {
                        ordinal: {
                            positions: c.ordinal.getExtendedPositions()
                        }
                    };
                    var t = c.index2val,
                        x = c.val2lin,
                        y = void 0,
                        v = y = void 0,
                        B = void 0;
                    u.ordinal.positions ? 1 < Math.abs(g) && (q && q.forEach(function (b) {
                        b.setState()
                    }), 0 > g ? (v = u, B = c.ordinal.positions ? c : u) : (v = c.ordinal.positions ? c : u, B = u), y = B.ordinal.positions, k > y[y.length - 1] && y.push(k), this.fixedRange = p - l, y = c.navigatorAxis.toFixedRange(null, null, t.apply(v, [x.apply(v, [l, !0]) + g]), t.apply(B, [x.apply(B, [p, !0]) + g])), y.min >= Math.min(h.dataMin,
                        l) && y.max <= Math.max(k, p) + b && c.setExtremes(y.min, y.max, !0, !1, {
                            trigger: "pan"
                        }), this.mouseDownX = d, I(this.container, {
                            cursor: "move"
                        })) : f = !0
                } else f = !0;
                f || e && /y/.test(e.type) ? b && (c.max = c.dataMax + b) : a.preventDefault()
            }

            function c() {
                var a = this.xAxis;
                a && a.options.ordinal && (delete a.ordinal.index, delete a.ordinal.extendedOrdinalPositions)
            }

            function t(a, c) {
                var b = this.ordinal,
                    d = b.positions,
                    e = b.slope,
                    f = b.extendedOrdinalPositions;
                if (!d) return a;
                var g = d.length;
                if (d[0] <= a && d[g - 1] >= a) a = J(d, a);
                else {
                    f || (f = b.getExtendedPositions &&
                        b.getExtendedPositions(), b.extendedOrdinalPositions = f);
                    if (!f || !f.length) return a;
                    g = f.length;
                    e || (e = (f[g - 1] - f[0]) / g);
                    d = J(f, d[0]);
                    a >= f[0] && a <= f[g - 1] ? a = J(f, a) - d : a < f[0] ? (a = f[0] - a, a = -d - a / e) : (a -= f[g - 1], a = a / e + g - d)
                }
                return c ? a : e * (a || 0) + b.offset
            }
            a.compose = function (a, f, b) {
                if (-1 === d.indexOf(a)) {
                    d.push(a);
                    var g = a.prototype;
                    g.getTimeTicks = e;
                    g.index2val = p;
                    g.lin2val = B;
                    g.val2lin = t;
                    g.ordinal2lin = g.val2lin;
                    v(a, "afterInit", E);
                    v(a, "foundExtremes", H);
                    v(a, "afterSetScale", y);
                    v(a, "initialAxisTranslation", C)
                } - 1 === d.indexOf(b) &&
                    (d.push(b), v(b, "pan", x)); - 1 === d.indexOf(f) && (d.push(f), v(f, "updatedData", c));
                return a
            };
            var g = function () {
                function a(a) {
                    this.index = {};
                    this.axis = a
                }
                a.prototype.beforeSetTickPositions = function () {
                    var a = this.axis,
                        b = a.ordinal,
                        c = a.getExtremes(),
                        d = c.min,
                        e = c.max,
                        f = a.isXAxis && !!a.options.breaks;
                    c = a.options.ordinal;
                    var g = a.chart.options.chart.ignoreHiddenSeries,
                        h, k, p = [],
                        q = Number.MAX_VALUE,
                        t = !1;
                    if (c || f) {
                        a.series.forEach(function (b, a) {
                            h = [];
                            if (!(g && !1 === b.visible || !1 === b.takeOrdinalPosition && !f) && (p = p.concat(b.processedXData),
                                u = p.length, p.sort(function (b, a) {
                                    return b - a
                                }), q = Math.min(q, l(b.closestPointRange, q)), u)) {
                                for (a = 0; a < u - 1;) p[a] !== p[a + 1] && h.push(p[a + 1]), a++;
                                h[0] !== p[0] && h.unshift(p[0]);
                                p = h
                            }
                        });
                        var u = p.length;
                        if (2 < u) {
                            var x = p[1] - p[0];
                            for (k = u - 1; k-- && !t;) p[k + 1] - p[k] !== x && (t = !0);
                            !a.options.keepOrdinalPadding && (p[0] - d > x || e - p[p.length - 1] > x) && (t = !0)
                        } else a.options.overscroll && (2 === u ? q = p[1] - p[0] : 1 === u ? (q = a.options.overscroll, p = [p[0], p[0] + q]) : q = b.overscrollPointsRange);
                        t || a.forceOrdinal ? (a.options.overscroll && (b.overscrollPointsRange =
                            q, p = p.concat(b.getOverscrollPositions())), b.positions = p, x = a.ordinal2lin(Math.max(d, p[0]), !0), k = Math.max(a.ordinal2lin(Math.min(e, p[p.length - 1]), !0), 1), b.slope = e = (e - d) / (k - x), b.offset = d - x * e) : (b.overscrollPointsRange = l(a.closestPointRange, b.overscrollPointsRange), b.positions = a.ordinal.slope = b.offset = void 0)
                    }
                    a.isOrdinal = c && t;
                    b.groupIntervalFactor = null
                };
                a.findIndexOf = function (a, b, c) {
                    for (var d = 0, e = a.length - 1, f; d < e;) f = Math.ceil((d + e) / 2), a[f] <= b ? d = f : e = f - 1;
                    return a[d] === b ? d : c ? d : -1
                };
                a.prototype.getExtendedPositions =
                    function () {
                        var a = this,
                            b = a.axis,
                            c = b.constructor.prototype,
                            d = b.chart,
                            e = b.series[0].currentDataGrouping,
                            f = e ? e.count + e.unitName : "raw",
                            g = b.options.overscroll,
                            k = b.getExtremes(),
                            l = void 0,
                            p = a.index;
                        p || (p = a.index = {});
                        if (!p[f]) {
                            var q = {
                                series: [],
                                chart: d,
                                forceOrdinal: !1,
                                getExtremes: function () {
                                    return {
                                        min: k.dataMin,
                                        max: k.dataMax + g
                                    }
                                },
                                getGroupPixelWidth: c.getGroupPixelWidth,
                                getTimeTicks: c.getTimeTicks,
                                options: {
                                    ordinal: !0
                                },
                                ordinal: {
                                    getGroupIntervalFactor: this.getGroupIntervalFactor
                                },
                                ordinal2lin: c.ordinal2lin,
                                getIndexOfPoint: c.getIndexOfPoint,
                                val2lin: c.val2lin
                            };
                            q.ordinal.axis = q;
                            b.series.forEach(function (b) {
                                l = {
                                    xAxis: q,
                                    xData: b.xData.slice(),
                                    chart: d,
                                    destroyGroupedData: h.noop,
                                    getProcessedData: A.prototype.getProcessedData,
                                    applyGrouping: A.prototype.applyGrouping
                                };
                                l.xData = l.xData.concat(a.getOverscrollPositions());
                                l.options = {
                                    dataGrouping: e ? {
                                        firstAnchor: "firstPoint",
                                        anchor: "middle",
                                        lastAnchor: "lastPoint",
                                        enabled: !0,
                                        forced: !0,
                                        approximation: "open",
                                        units: [
                                            [e.unitName, [e.count]]
                                        ]
                                    } : {
                                        enabled: !1
                                    }
                                };
                                q.series.push(l);
                                b.processData.apply(l)
                            });
                            b.applyGrouping.call(q, {
                                hasExtemesChanged: !1
                            });
                            l.closestPointRange !== l.basePointRange && l.currentDataGrouping && (q.forceOrdinal = !0);
                            b.ordinal.beforeSetTickPositions.apply({
                                axis: q
                            });
                            p[f] = q.ordinal.positions
                        }
                        return p[f]
                    };
                a.prototype.getGroupIntervalFactor = function (a, b, c) {
                    c = c.processedXData;
                    var d = c.length,
                        e = [];
                    var f = this.groupIntervalFactor;
                    if (!f) {
                        for (f = 0; f < d - 1; f++) e[f] = c[f + 1] - c[f];
                        e.sort(function (b, a) {
                            return b - a
                        });
                        e = e[Math.floor(d / 2)];
                        a = Math.max(a, c[0]);
                        b = Math.min(b, c[d - 1]);
                        this.groupIntervalFactor = f = d * e / (b - a)
                    }
                    return f
                };
                a.prototype.getIndexOfPoint =
                    function (c, b) {
                        var d = this.axis,
                            e = this.positions ? this.positions[0] : 0,
                            f = d.series[0].points && d.series[0].points[0] && d.series[0].points[0].plotX || d.minPixelPadding;
                        1 < d.series.length && d.series.forEach(function (b) {
                            b.points && z(b.points[0]) && z(b.points[0].plotX) && b.points[0].plotX < f && (f = b.points[0].plotX)
                        });
                        c = (c - f) / (d.translationSlope * (this.slope || d.closestPointRange || this.overscrollPointsRange));
                        return a.findIndexOf(b, e) + c
                    };
                a.prototype.getOverscrollPositions = function () {
                    var a = this.axis,
                        b = a.options.overscroll,
                        c = this.overscrollPointsRange,
                        d = [],
                        e = a.dataMax;
                    if (z(c))
                        for (; e <= a.dataMax + b;) e += c, d.push(e);
                    return d
                };
                a.prototype.postProcessTickInterval = function (a) {
                    var b = this.axis,
                        c = this.slope;
                    return c ? b.options.breaks ? b.closestPointRange || a : a / (c / b.closestPointRange) : a
                };
                return a
            }();
            a.Additions = g
        })(a || (a = {}));
        return a
    });
    M(h, "Series/DataModifyComposition.js", [h["Core/Axis/Axis.js"], h["Core/Series/Point.js"], h["Core/Series/Series.js"], h["Core/Utilities.js"]], function (e, h, A, E) {
        var v = h.prototype.tooltipFormatter,
            D = E.addEvent,
            I = E.arrayMax,
            z = E.arrayMin,
            q = E.correctFloat,
            l = E.defined,
            f = E.isArray,
            d = E.isNumber,
            a = E.isString,
            p = E.pick,
            k;
        (function (e) {
            function h(c, b, d) {
                this.isXAxis || (this.series.forEach(function (d) {
                    "compare" === c && "boolean" !== typeof b ? d.setCompare(b, !1) : "cumulative" !== c || a(b) || d.setCumulative(b, !1)
                }), p(d, !0) && this.chart.redraw())
            }

            function k(a) {
                var b = this,
                    c = b.series.chart.numberFormatter,
                    d = function (d) {
                        a = a.replace("{point." + d + "}", (0 < b[d] && "change" === d ? "+" : "") + c(b[d], p(b.series.tooltipOptions.changeDecimals, 2)))
                    };
                l(b.change) &&
                    d("change");
                l(b.cumulativeSum) && d("cumulativeSum");
                return v.apply(this, [a])
            }

            function F() {
                var a = this.options.compare;
                if ("percent" === a || "value" === a || this.options.cumulative) {
                    var b = new u(this);
                    "percent" === a || "value" === a ? b.initCompare(a) : b.initCumulative()
                }
                this.dataModify = b
            }

            function A(a) {
                a = a.dataExtremes;
                var b = a.activeYData;
                if (this.dataModify && a) {
                    var c = void 0;
                    this.options.compare ? c = [this.dataModify.modifyValue(a.dataMin), this.dataModify.modifyValue(a.dataMax)] : this.options.cumulative && f(b) && 2 <= b.length &&
                        (c = u.getCumulativeExtremes(b));
                    c && (a.dataMin = z(c), a.dataMax = I(c))
                }
            }

            function y(a, b) {
                this.options.compare = this.userOptions.compare = a;
                this.update({}, p(b, !0));
                !this.dataModify || "value" !== a && "percent" !== a ? this.points.forEach(function (b) {
                    delete b.change
                }) : this.dataModify.initCompare(a)
            }

            function C() {
                if (this.xAxis && this.processedYData && this.dataModify) {
                    var a = this.processedXData,
                        b = this.processedYData,
                        c = b.length,
                        e = !0 === this.options.compareStart ? 0 : 1,
                        f = -1,
                        g;
                    this.pointArrayMap && (f = this.pointArrayMap.indexOf(this.options.pointValKey ||
                        this.pointValKey || "y"));
                    for (g = 0; g < c - e; g++) {
                        var h = b[g] && -1 < f ? b[g][f] : b[g];
                        if (d(h) && 0 !== h && a[g + e] >= (this.xAxis.min || 0)) {
                            this.dataModify.compareValue = h;
                            break
                        }
                    }
                }
            }

            function x(a, b) {
                this.setModifier("compare", a, b)
            }

            function c(a, b) {
                a = p(a, !1);
                this.options.cumulative = this.userOptions.cumulative = a;
                this.update({}, p(b, !0));
                this.dataModify ? this.dataModify.initCumulative() : this.points.forEach(function (b) {
                    delete b.cumulativeSum
                })
            }

            function t(a, b) {
                this.setModifier("cumulative", a, b)
            }
            var g = [];
            e.compose = function (a, b, d) {
                if (-1 ===
                    g.indexOf(a)) {
                    g.push(a);
                    var e = a.prototype;
                    e.setCompare = y;
                    e.setCumulative = c;
                    D(a, "afterInit", F);
                    D(a, "afterGetExtremes", A);
                    D(a, "afterProcessData", C)
                } - 1 === g.indexOf(b) && (g.push(b), b = b.prototype, b.setCompare = x, b.setModifier = h, b.setCumulative = t); - 1 === g.indexOf(d) && (g.push(d), d.prototype.tooltipFormatter = k);
                return a
            };
            var u = function () {
                function a(b) {
                    this.series = b
                }
                a.prototype.modifyValue = function () {
                    return 0
                };
                a.getCumulativeExtremes = function (b) {
                    var a = Infinity,
                        c = -Infinity;
                    b.reduce(function (b, d) {
                        d = b + d;
                        a = Math.min(a,
                            d, b);
                        c = Math.max(c, d, b);
                        return d
                    });
                    return [a, c]
                };
                a.prototype.initCompare = function (b) {
                    this.modifyValue = function (a, c) {
                        null === a && (a = 0);
                        var d = this.compareValue;
                        return "undefined" !== typeof a && "undefined" !== typeof d ? (a = "value" === b ? a - d : a / d * 100 - (100 === this.series.options.compareBase ? 0 : 100), "undefined" !== typeof c && (c = this.series.points[c]) && (c.change = a), a) : 0
                    }
                };
                a.prototype.initCumulative = function () {
                    this.modifyValue = function (b, a) {
                        null === b && (b = 0);
                        if (void 0 !== b && void 0 !== a) {
                            var c = 0 < a ? this.series.points[a - 1] : null;
                            c && c.cumulativeSum && (b = q(c.cumulativeSum + b));
                            if (a = this.series.points[a]) a.cumulativeSum = b;
                            return b
                        }
                        return 0
                    }
                };
                return a
            }();
            e.Additions = u
        })(k || (k = {}));
        "";
        return k
    });
    M(h, "Core/Axis/BrokenAxis.js", [h["Extensions/Stacking.js"], h["Core/Utilities.js"]], function (e, h) {
        var A = h.addEvent,
            D = h.find,
            v = h.fireEvent,
            H = h.isArray,
            I = h.isNumber,
            z = h.pick,
            q;
        (function (h) {
            function f() {
                "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1)
            }

            function d() {
                this.brokenAxis && this.brokenAxis.hasBreaks &&
                    (this.options.ordinal = !1)
            }

            function a() {
                var a = this.brokenAxis;
                if (a && a.hasBreaks) {
                    for (var d = this.tickPositions, e = this.tickPositions.info, c = [], f = 0; f < d.length; f++) a.isInAnyBreak(d[f]) || c.push(d[f]);
                    this.tickPositions = c;
                    this.tickPositions.info = e
                }
            }

            function l() {
                this.brokenAxis || (this.brokenAxis = new L(this))
            }

            function k() {
                var a = this.options.connectNulls,
                    d = this.points,
                    e = this.xAxis,
                    c = this.yAxis;
                if (this.isDirty)
                    for (var f = d.length; f--;) {
                        var g = d[f],
                            h = !(null === g.y && !1 === a) && (e && e.brokenAxis && e.brokenAxis.isInAnyBreak(g.x,
                                !0) || c && c.brokenAxis && c.brokenAxis.isInAnyBreak(g.y, !0));
                        g.visible = h ? !1 : !1 !== g.options.visible
                    }
            }

            function q() {
                this.drawBreaks(this.xAxis, ["x"]);
                this.drawBreaks(this.yAxis, z(this.pointArrayMap, ["y"]))
            }

            function B(a, d) {
                var e = this,
                    c = e.points,
                    f, g, h, k;
                if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
                    var b = a.brokenAxis;
                    d.forEach(function (d) {
                        f = b && b.breakArray || [];
                        g = a.isXAxis ? a.min : z(e.options.threshold, a.min);
                        c.forEach(function (b) {
                            k = z(b["stack" + d.toUpperCase()], b[d]);
                            f.forEach(function (c) {
                                if (I(g) && I(k)) {
                                    h = !1;
                                    if (g <
                                        c.from && k > c.to || g > c.from && k < c.from) h = "pointBreak";
                                    else if (g < c.from && k > c.from && k < c.to || g > c.from && k > c.to && k < c.from) h = "pointInBreak";
                                    h && v(a, h, {
                                        point: b,
                                        brk: c
                                    })
                                }
                            })
                        })
                    })
                }
            }

            function J() {
                var a = this.currentDataGrouping,
                    d = a && a.gapSize;
                a = this.points.slice();
                var f = this.yAxis,
                    c = this.options.gapSize,
                    h = a.length - 1,
                    g;
                if (c && 0 < h)
                    for ("value" !== this.options.gapUnit && (c *= this.basePointRange), d && d > c && d >= this.basePointRange && (c = d), g = void 0; h--;) g && !1 !== g.visible || (g = a[h + 1]), d = a[h], !1 !== g.visible && !1 !== d.visible && (g.x - d.x >
                        c && (g = (d.x + g.x) / 2, a.splice(h + 1, 0, {
                            isNull: !0,
                            x: g
                        }), f.stacking && this.options.stacking && (g = f.stacking.stacks[this.stackKey][g] = new e(f, f.options.stackLabels, !1, g, this.stack), g.total = 0)), g = d);
                return this.getGraphPath(a)
            }
            var E = [];
            h.compose = function (e, h) {
                -1 === E.indexOf(e) && (E.push(e), e.keepProps.push("brokenAxis"), A(e, "init", l), A(e, "afterInit", f), A(e, "afterSetTickPositions", a), A(e, "afterSetOptions", d));
                if (-1 === E.indexOf(h)) {
                    E.push(h);
                    var p = h.prototype;
                    p.drawBreaks = B;
                    p.gappedPath = J;
                    A(h, "afterGeneratePoints",
                        k);
                    A(h, "afterRender", q)
                }
                return e
            };
            var L = function () {
                function a(a) {
                    this.hasBreaks = !1;
                    this.axis = a
                }
                a.isInBreak = function (a, d) {
                    var c = a.repeat || Infinity,
                        e = a.from,
                        f = a.to - a.from;
                    d = d >= e ? (d - e) % c : c - (e - d) % c;
                    return a.inclusive ? d <= f : d < f && 0 !== d
                };
                a.lin2Val = function (d) {
                    var e = this.brokenAxis;
                    e = e && e.breakArray;
                    if (!e || !I(d)) return d;
                    var c;
                    for (c = 0; c < e.length; c++) {
                        var f = e[c];
                        if (f.from >= d) break;
                        else f.to < d ? d += f.len : a.isInBreak(f, d) && (d += f.len)
                    }
                    return d
                };
                a.val2Lin = function (d) {
                    var e = this.brokenAxis;
                    e = e && e.breakArray;
                    if (!e ||
                        !I(d)) return d;
                    var c = d,
                        f;
                    for (f = 0; f < e.length; f++) {
                        var g = e[f];
                        if (g.to <= d) c -= g.len;
                        else if (g.from >= d) break;
                        else if (a.isInBreak(g, d)) {
                            c -= d - g.from;
                            break
                        }
                    }
                    return c
                };
                a.prototype.findBreakAt = function (a, d) {
                    return D(d, function (c) {
                        return c.from < a && a < c.to
                    })
                };
                a.prototype.isInAnyBreak = function (d, e) {
                    var c = this.axis,
                        f = c.options.breaks || [],
                        g = f.length,
                        h;
                    if (g && I(d)) {
                        for (; g--;)
                            if (a.isInBreak(f[g], d)) {
                                var k = !0;
                                h || (h = z(f[g].showPoints, !c.isXAxis))
                            } var b = k && e ? k && !h : k
                    }
                    return b
                };
                a.prototype.setBreaks = function (d, e) {
                    var c =
                        this,
                        f = c.axis,
                        g = H(d) && !!d.length;
                    f.isDirty = c.hasBreaks !== g;
                    c.hasBreaks = g;
                    f.options.breaks = f.userOptions.breaks = d;
                    f.forceRedraw = !0;
                    f.series.forEach(function (a) {
                        a.isDirty = !0
                    });
                    g || f.val2lin !== a.val2Lin || (delete f.val2lin, delete f.lin2val);
                    g && (f.userOptions.ordinal = !1, f.lin2val = a.lin2Val, f.val2lin = a.val2Lin, f.setExtremes = function (a, d, b, e, g) {
                        if (c.hasBreaks) {
                            for (var m = this.options.breaks || [], h; h = c.findBreakAt(a, m);) a = h.to;
                            for (; h = c.findBreakAt(d, m);) d = h.from;
                            d < a && (d = a)
                        }
                        f.constructor.prototype.setExtremes.call(this,
                            a, d, b, e, g)
                    }, f.setAxisTranslation = function () {
                        f.constructor.prototype.setAxisTranslation.call(this);
                        c.unitLength = void 0;
                        if (c.hasBreaks) {
                            var d = f.options.breaks || [],
                                e = [],
                                b = [],
                                g = z(f.pointRangePadding, 0),
                                h = 0,
                                m, k = f.userMin || f.min,
                                l = f.userMax || f.max,
                                p;
                            d.forEach(function (b) {
                                m = b.repeat || Infinity;
                                I(k) && I(l) && (a.isInBreak(b, k) && (k += b.to % m - k % m), a.isInBreak(b, l) && (l -= l % m - b.from % m))
                            });
                            d.forEach(function (b) {
                                t = b.from;
                                m = b.repeat || Infinity;
                                if (I(k) && I(l)) {
                                    for (; t - m > k;) t -= m;
                                    for (; t < k;) t += m;
                                    for (p = t; p < l; p += m) e.push({
                                        value: p,
                                        move: "in"
                                    }), e.push({
                                        value: p + b.to - b.from,
                                        move: "out",
                                        size: b.breakSize
                                    })
                                }
                            });
                            e.sort(function (b, a) {
                                return b.value === a.value ? ("in" === b.move ? 0 : 1) - ("in" === a.move ? 0 : 1) : b.value - a.value
                            });
                            var q = 0;
                            var t = k;
                            e.forEach(function (a) {
                                q += "in" === a.move ? 1 : -1;
                                1 === q && "in" === a.move && (t = a.value);
                                0 === q && I(t) && (b.push({
                                    from: t,
                                    to: a.value,
                                    len: a.value - t - (a.size || 0)
                                }), h += a.value - t - (a.size || 0))
                            });
                            c.breakArray = b;
                            I(k) && I(l) && I(f.min) && (c.unitLength = l - k - h + g, v(f, "afterBreaks"), f.staticScale ? f.transA = f.staticScale : c.unitLength && (f.transA *=
                                (l - f.min + g) / c.unitLength), g && (f.minPixelPadding = f.transA * (f.minPointOffset || 0)), f.min = k, f.max = l)
                        }
                    });
                    z(e, !0) && f.chart.redraw()
                };
                return a
            }();
            h.Additions = L
        })(q || (q = {}));
        return q
    });
    M(h, "masters/modules/broken-axis.src.js", [h["Core/Globals.js"], h["Core/Axis/BrokenAxis.js"]], function (e, h) {
        h.compose(e.Axis, e.Series)
    });
    M(h, "Extensions/DataGrouping.js", [h["Core/Axis/Axis.js"], h["Core/Axis/DateTimeAxis.js"], h["Core/FormatUtilities.js"], h["Core/Globals.js"], h["Core/Series/Point.js"], h["Core/Series/Series.js"],
    h["Core/Tooltip.js"], h["Core/DefaultOptions.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H, I, z, q) {
        var l = A.format,
            f = H.prototype;
        A = q.addEvent;
        var d = q.arrayMax,
            a = q.arrayMin,
            p = q.correctFloat,
            k = q.defined,
            F = q.error,
            B = q.extend,
            J = q.isNumber,
            D = q.merge,
            L = q.pick;
        "";
        var y = E.approximations = {
            sum: function (a) {
                var c = a.length;
                if (!c && a.hasNulls) var b = null;
                else if (c)
                    for (b = 0; c--;) b += a[c];
                return b
            },
            average: function (a) {
                var c = a.length;
                a = y.sum(a);
                J(a) && c && (a = p(a / c));
                return a
            },
            averages: function () {
                var a = [];
                [].forEach.call(arguments,
                    function (c) {
                        a.push(y.average(c))
                    });
                return "undefined" === typeof a[0] ? void 0 : a
            },
            open: function (a) {
                return a.length ? a[0] : a.hasNulls ? null : void 0
            },
            high: function (a) {
                return a.length ? d(a) : a.hasNulls ? null : void 0
            },
            low: function (c) {
                return c.length ? a(c) : c.hasNulls ? null : void 0
            },
            close: function (a) {
                return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
            },
            hlc: function (a, c, b) {
                a = y.high(a);
                c = y.low(c);
                b = y.close(b);
                if (J(a) || J(c) || J(b)) return [a, c, b]
            },
            ohlc: function (a, c, b, d) {
                a = y.open(a);
                c = y.high(c);
                b = y.low(b);
                d = y.close(d);
                if (J(a) ||
                    J(c) || J(b) || J(d)) return [a, c, b, d]
            },
            range: function (a, c) {
                a = y.low(a);
                c = y.high(c);
                if (J(a) || J(c)) return [a, c];
                if (null === a && null === c) return null
            }
        };
        q = function (a, c, b, d) {
            var e = this,
                f = e.data,
                g = e.options && e.options.data,
                h = [],
                l = [],
                n = [],
                r = a.length,
                p = !!c,
                q = [],
                t = e.pointArrayMap,
                u = t && t.length,
                x = ["x"].concat(t || ["y"]),
                v = this.options.dataGrouping && this.options.dataGrouping.groupAll,
                B = 0,
                F = 0,
                z;
            d = "function" === typeof d ? d : y[d] ? y[d] : y[e.getDGApproximation && e.getDGApproximation() || "average"];
            u ? t.forEach(function () {
                q.push([])
            }) :
                q.push([]);
            var C = u || 1;
            for (z = 0; z <= r && !(a[z] >= b[0]); z++);
            for (z; z <= r; z++) {
                for (;
                    "undefined" !== typeof b[B + 1] && a[z] >= b[B + 1] || z === r;) {
                    var A = b[B];
                    e.dataGroupInfo = {
                        start: v ? F : e.cropStart + F,
                        length: q[0].length
                    };
                    var E = d.apply(e, q);
                    e.pointClass && !k(e.dataGroupInfo.options) && (e.dataGroupInfo.options = D(e.pointClass.prototype.optionsToObject.call({
                        series: e
                    }, e.options.data[e.cropStart + F])), x.forEach(function (b) {
                        delete e.dataGroupInfo.options[b]
                    }));
                    "undefined" !== typeof E && (h.push(A), l.push(E), n.push(e.dataGroupInfo));
                    F = z;
                    for (A = 0; A < C; A++) q[A].length = 0, q[A].hasNulls = !1;
                    B += 1;
                    if (z === r) break
                }
                if (z === r) break;
                if (t) {
                    A = e.options.dataGrouping && e.options.dataGrouping.groupAll ? z : e.cropStart + z;
                    E = f && f[A] || e.pointClass.prototype.applyOptions.apply({
                        series: e
                    }, [g[A]]);
                    var H = void 0;
                    for (A = 0; A < u; A++) H = E[t[A]], J(H) ? q[A].push(H) : null === H && (q[A].hasNulls = !0)
                } else A = p ? c[z] : null, J(A) ? q[0].push(A) : null === A && (q[0].hasNulls = !0)
            }
            return {
                groupedXData: h,
                groupedYData: l,
                groupMap: n
            }
        };
        var C = {
            approximations: y,
            groupData: q
        },
            x = f.generatePoints,
            c = {
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            },
            t = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                arearange: {},
                column: {
                    groupPixelWidth: 10
                },
                columnrange: {
                    groupPixelWidth: 10
                },
                candlestick: {
                    groupPixelWidth: 10
                },
                ohlc: {
                    groupPixelWidth: 5
                },
                hlc: {
                    groupPixelWidth: 5
                },
                heikinashi: {
                    groupPixelWidth: 10
                }
            },
            g = E.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ];
        f.getDGApproximation = function () {
            return this.is("arearange") ? "range" : this.is("ohlc") ? "ohlc" : this.is("hlc") ? "hlc" : this.is("column") ? "sum" :
                "average"
        };
        f.groupData = q;
        f.applyGrouping = function (a) {
            var c = this.chart,
                b = this.options.dataGrouping,
                d = !1 !== this.allowDG && b && L(b.enabled, c.options.isStock),
                e = this.visible || !c.options.chart.ignoreHiddenSeries,
                m, l = this.currentDataGrouping,
                p = !1;
            d && !this.requireSorting && (this.requireSorting = p = !0);
            a = !1 === !(this.isCartesian && !this.isDirty && !this.xAxis.isDirty && !this.yAxis.isDirty && !a) || !d;
            p && (this.requireSorting = !1);
            if (!a) {
                this.destroyGroupedData();
                d = b.groupAll ? this.xData : this.processedXData;
                var q = b.groupAll ?
                    this.yData : this.processedYData;
                a = c.plotSizeX;
                p = this.xAxis;
                var t = p.options.ordinal,
                    u = this.groupPixelWidth;
                if (u && d && d.length) {
                    this.isDirty = m = !0;
                    this.points = null;
                    var x = p.getExtremes();
                    var y = x.min;
                    x = x.max;
                    t = t && p.ordinal && p.ordinal.getGroupIntervalFactor(y, x, this) || 1;
                    a = p.getTimeTicks(h.Additions.prototype.normalizeTimeTickInterval(u * (x - y) / a * t, b.units || g), Math.min(y, d[0]), Math.max(x, d[d.length - 1]), p.options.startOfWeek, d, this.closestPointRange);
                    u = f.groupData.apply(this, [d, q, a, b.approximation]);
                    d = u.groupedXData;
                    q = u.groupedYData;
                    t = 0;
                    b && b.smoothed && d.length && (b.firstAnchor = "firstPoint", b.anchor = "middle", b.lastAnchor = "lastPoint", F(32, !1, c, {
                        "dataGrouping.smoothed": "use dataGrouping.anchor"
                    }));
                    c = d;
                    var v = this.options.dataGrouping;
                    y = this.currentDataGrouping && this.currentDataGrouping.gapSize;
                    if (v && this.xData && y && this.groupMap) {
                        var B = c.length - 1;
                        var z = v.anchor;
                        var C = L(v.firstAnchor, z);
                        v = L(v.lastAnchor, z);
                        if (z && "start" !== z) {
                            var A = y * {
                                middle: .5,
                                end: 1
                            }[z];
                            for (z = c.length - 1; z-- && 0 < z;) c[z] += A
                        }
                        if (C && "start" !== C && this.xData[0] >=
                            c[0]) {
                            z = this.groupMap[0].start;
                            A = this.groupMap[0].length;
                            var E = void 0;
                            J(z) && J(A) && (E = z + (A - 1));
                            c[0] = {
                                middle: c[0] + .5 * y,
                                end: c[0] + y,
                                firstPoint: this.xData[0],
                                lastPoint: E && this.xData[E]
                            }[C]
                        }
                        v && "start" !== v && y && c[B] >= x - y && (x = this.groupMap[this.groupMap.length - 1].start, c[B] = {
                            middle: c[B] + .5 * y,
                            end: c[B] + y,
                            firstPoint: x && this.xData[x],
                            lastPoint: this.xData[this.xData.length - 1]
                        }[v])
                    }
                    for (x = 1; x < a.length; x++) a.info.segmentStarts && -1 !== a.info.segmentStarts.indexOf(x) || (t = Math.max(a[x] - a[x - 1], t));
                    x = a.info;
                    x.gapSize = t;
                    this.closestPointRange = a.info.totalRange;
                    this.groupMap = u.groupMap;
                    if (e) {
                        e = d;
                        if (k(e[0]) && J(p.min) && J(p.dataMin) && e[0] < p.min) {
                            if (!k(p.options.min) && p.min <= p.dataMin || p.min === p.dataMin) p.min = Math.min(e[0], p.min);
                            p.dataMin = Math.min(e[0], p.dataMin)
                        }
                        if (k(e[e.length - 1]) && J(p.max) && J(p.dataMax) && e[e.length - 1] > p.max) {
                            if (!k(p.options.max) && J(p.dataMax) && p.max >= p.dataMax || p.max === p.dataMax) p.max = Math.max(e[e.length - 1], p.max);
                            p.dataMax = Math.max(e[e.length - 1], p.dataMax)
                        }
                    }
                    b.groupAll && (this.allGroupedData = q, b = this.cropData(d,
                        q, p.min, p.max, 1), d = b.xData, q = b.yData, this.cropStart = b.start);
                    this.processedXData = d;
                    this.processedYData = q
                } else this.groupMap = null;
                this.hasGroupedData = m;
                this.currentDataGrouping = x;
                this.preventGraphAnimation = (l && l.totalRange) !== (x && x.totalRange)
            }
        };
        f.destroyGroupedData = function () {
            this.groupedData && (this.groupedData.forEach(function (a, c) {
                a && (this.groupedData[c] = a.destroy ? a.destroy() : null)
            }, this), this.groupedData.length = 0)
        };
        f.generatePoints = function () {
            x.apply(this);
            this.destroyGroupedData();
            this.groupedData =
                this.hasGroupedData ? this.points : null
        };
        e.prototype.applyGrouping = function (a) {
            var c = this;
            c.series.forEach(function (b) {
                b.groupPixelWidth = void 0;
                b.groupPixelWidth = c.getGroupPixelWidth && c.getGroupPixelWidth();
                b.groupPixelWidth && (b.hasProcessed = !0);
                b.applyGrouping(!!a.hasExtemesChanged)
            })
        };
        e.prototype.getGroupPixelWidth = function () {
            var a = this.series,
                d = a.length,
                b, e = 0,
                f = !1,
                g;
            for (b = d; b--;)(g = a[b].options.dataGrouping) && (e = Math.max(e, L(g.groupPixelWidth, c.groupPixelWidth)));
            for (b = d; b--;)
                if (g = a[b].options.dataGrouping)
                    if (d =
                        (a[b].processedXData || a[b].data).length, a[b].groupPixelWidth || d > this.chart.plotSizeX / e || d && g.forced) f = !0;
            return f ? e : 0
        };
        e.prototype.setDataGrouping = function (a, c) {
            var b;
            c = L(c, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof e)
                for (b = this.series.length; b--;) this.series[b].update({
                    dataGrouping: a
                }, !1);
            else this.chart.options.series.forEach(function (b) {
                b.dataGrouping = a
            }, !1);
            this.ordinal && (this.ordinal.slope = void 0);
            c && this.chart.redraw()
        };
        A(e, "postProcessData", e.prototype.applyGrouping);
        A(v, "update",
            function () {
                if (this.dataGroup) return F(24, !1, this.series.chart), !1
            });
        A(I, "headerFormatter", function (a) {
            var d = this.chart,
                b = d.time,
                e = a.labelConfig,
                f = e.series,
                g = f.tooltipOptions,
                h = f.options.dataGrouping,
                k = g.xDateFormat,
                p = f.xAxis,
                q = g[a.isFooter ? "footerFormat" : "headerFormat"];
            if (p && "datetime" === p.options.type && h && J(e.key)) {
                var t = f.currentDataGrouping;
                h = h.dateTimeLabelFormats || c.dateTimeLabelFormats;
                if (t)
                    if (g = h[t.unitName], 1 === t.count) k = g[0];
                    else {
                        k = g[1];
                        var u = g[2]
                    }
                else !k && h && p.dateTime && (k = p.dateTime.getXDateFormat(e.x,
                    g.dateTimeLabelFormats));
                k = b.dateFormat(k, e.key);
                u && (k += b.dateFormat(u, e.key + t.totalRange - 1));
                f.chart.styledMode && (q = this.styledModeFormat(q));
                a.text = l(q, {
                    point: B(e.point, {
                        key: k
                    }),
                    series: f
                }, d);
                a.preventDefault()
            }
        });
        A(H, "destroy", f.destroyGroupedData);
        A(H, "afterSetOptions", function (a) {
            a = a.options;
            var d = this.type,
                b = this.chart.options.plotOptions,
                e = z.defaultOptions.plotOptions[d].dataGrouping,
                f = this.useCommonDataGrouping && c;
            if (t[d] || f) {
                e || (e = D(c, t[d]));
                var g = this.chart.rangeSelector;
                a.dataGrouping = D(f,
                    e, b.series && b.series.dataGrouping, b[d].dataGrouping, this.userOptions.dataGrouping, !a.isInternal && g && J(g.selected) && g.buttonOptions[g.selected].dataGrouping)
            }
        });
        A(e, "afterSetScale", function () {
            this.series.forEach(function (a) {
                a.hasProcessed = !1
            })
        });
        E.dataGrouping = C;
        "";
        return C
    });
    M(h, "Series/HLC/HLCPoint.js", [h["Core/Series/SeriesRegistry.js"]], function (e) {
        var h = this && this.__extends || function () {
            var e = function (h, v) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, h) {
                        e.__proto__ = h
                    } || function (e,
                        h) {
                        for (var v in h) h.hasOwnProperty(v) && (e[v] = h[v])
                    };
                return e(h, v)
            };
            return function (h, v) {
                function A() {
                    this.constructor = h
                }
                e(h, v);
                h.prototype = null === v ? Object.create(v) : (A.prototype = v.prototype, new A)
            }
        }();
        return function (e) {
            function A() {
                var h = null !== e && e.apply(this, arguments) || this;
                h.close = void 0;
                h.high = void 0;
                h.low = void 0;
                h.options = void 0;
                h.plotClose = void 0;
                h.series = void 0;
                return h
            }
            h(A, e);
            return A
        }(e.seriesTypes.column.prototype.pointClass)
    });
    M(h, "Series/HLC/HLCSeries.js", [h["Series/HLC/HLCPoint.js"],
    h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]
    ], function (e, h, A) {
        var E = this && this.__extends || function () {
            var e = function (h, l) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, d) {
                        e.__proto__ = d
                    } || function (e, d) {
                        for (var a in d) d.hasOwnProperty(a) && (e[a] = d[a])
                    };
                return e(h, l)
            };
            return function (h, l) {
                function f() {
                    this.constructor = h
                }
                e(h, l);
                h.prototype = null === l ? Object.create(l) : (f.prototype = l.prototype, new f)
            }
        }(),
            v = h.seriesTypes.column,
            D = A.extend,
            I = A.merge;
        A = function (e) {
            function h() {
                var h =
                    null !== e && e.apply(this, arguments) || this;
                h.data = void 0;
                h.options = void 0;
                h.points = void 0;
                h.yData = void 0;
                return h
            }
            E(h, e);
            h.prototype.extendStem = function (e, f, d) {
                var a = e[0];
                e = e[1];
                "number" === typeof a[2] && (a[2] = Math.max(d + f, a[2]));
                "number" === typeof e[2] && (e[2] = Math.min(d - f, e[2]))
            };
            h.prototype.getPointPath = function (e, f) {
                f = f.strokeWidth();
                var d = e.series,
                    a = f % 2 / 2,
                    h = Math.round(e.plotX) - a,
                    k = Math.round(e.shapeArgs.width / 2);
                var l = [
                    ["M", h, Math.round(e.yBottom)],
                    ["L", h, Math.round(e.plotHigh)]
                ];
                null !== e.close && (e =
                    Math.round(e.plotClose) + a, l.push(["M", h, e], ["L", h + k, e]), d.extendStem(l, f / 2, e));
                return l
            };
            h.prototype.drawSinglePoint = function (e) {
                var f = e.series,
                    d = f.chart,
                    a = e.graphic,
                    h = !a;
                "undefined" !== typeof e.plotY && (a || (e.graphic = a = d.renderer.path().add(f.group)), d.styledMode || a.attr(f.pointAttribs(e, e.selected && "select")), f = f.getPointPath(e, a), a[h ? "attr" : "animate"]({
                    d: f
                }).addClass(e.getClassName(), !0))
            };
            h.prototype.drawPoints = function () {
                this.points.forEach(this.drawSinglePoint)
            };
            h.prototype.init = function () {
                e.prototype.init.apply(this,
                    arguments);
                this.options.stacking = void 0
            };
            h.prototype.pointAttribs = function (h, f) {
                h = e.prototype.pointAttribs.call(this, h, f);
                delete h.fill;
                return h
            };
            h.prototype.toYData = function (e) {
                return [e.high, e.low, e.close]
            };
            h.prototype.translate = function () {
                var h = this,
                    f = h.yAxis,
                    d = this.pointArrayMap && this.pointArrayMap.slice() || [],
                    a = d.map(function (a) {
                        return "plot" + (a.charAt(0).toUpperCase() + a.slice(1))
                    });
                a.push("yBottom");
                d.push("low");
                e.prototype.translate.apply(h);
                h.points.forEach(function (e) {
                    d.forEach(function (d,
                        l) {
                        d = e[d];
                        null !== d && (h.dataModify && (d = h.dataModify.modifyValue(d)), e[a[l]] = f.toPixels(d, !0))
                    });
                    e.tooltipPos[1] = e.plotHigh + f.pos - h.chart.plotTop
                })
            };
            h.defaultOptions = I(v.defaultOptions, {
                lineWidth: 1,
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
                },
                threshold: null,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                stickyTracking: !0
            });
            return h
        }(v);
        D(A.prototype, {
            animate: null,
            directTouch: !1,
            pointArrayMap: ["high",
                "low", "close"
            ],
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointValKey: "close"
        });
        A.prototype.pointClass = e;
        h.registerSeriesType("hlc", A);
        "";
        return A
    });
    M(h, "Series/OHLC/OHLCPoint.js", [h["Core/Series/SeriesRegistry.js"]], function (e) {
        var h = this && this.__extends || function () {
            var e = function (h, v) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, h) {
                        e.__proto__ = h
                    } || function (e, h) {
                        for (var v in h) h.hasOwnProperty(v) && (e[v] = h[v])
                    };
                return e(h, v)
            };
            return function (h, v) {
                function A() {
                    this.constructor =
                        h
                }
                e(h, v);
                h.prototype = null === v ? Object.create(v) : (A.prototype = v.prototype, new A)
            }
        }();
        return function (e) {
            function A() {
                var h = null !== e && e.apply(this, arguments) || this;
                h.open = void 0;
                h.options = void 0;
                h.plotOpen = void 0;
                h.series = void 0;
                return h
            }
            h(A, e);
            A.prototype.getClassName = function () {
                return e.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            };
            A.prototype.resolveUpColor = function () {
                this.open < this.close && !this.options.color && this.series.options.upColor &&
                    (this.color = this.series.options.upColor)
            };
            A.prototype.resolveColor = function () {
                e.prototype.resolveColor.call(this);
                this.resolveUpColor()
            };
            A.prototype.getZone = function () {
                var h = e.prototype.getZone.call(this);
                this.resolveUpColor();
                return h
            };
            A.prototype.applyOptions = function () {
                e.prototype.applyOptions.apply(this, arguments);
                this.resolveColor && this.resolveColor();
                return this
            };
            return A
        }(e.seriesTypes.hlc.prototype.pointClass)
    });
    M(h, "Series/OHLC/OHLCSeries.js", [h["Series/OHLC/OHLCPoint.js"], h["Core/Series/SeriesRegistry.js"],
    h["Core/Utilities.js"]
    ], function (e, h, A) {
        var D = this && this.__extends || function () {
            var e = function (d, a) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e])
                    };
                return e(d, a)
            };
            return function (d, a) {
                function f() {
                    this.constructor = d
                }
                e(d, a);
                d.prototype = null === a ? Object.create(a) : (f.prototype = a.prototype, new f)
            }
        }(),
            v = h.series,
            H = h.seriesTypes.hlc,
            I = A.addEvent,
            z = A.extend,
            q = A.merge,
            l = function (e) {
                function d() {
                    var a = null !==
                        e && e.apply(this, arguments) || this;
                    a.data = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    return a
                }
                D(d, e);
                d.prototype.getPointPath = function (a, d) {
                    var f = e.prototype.getPointPath.call(this, a, d);
                    d = d.strokeWidth();
                    var h = d % 2 / 2,
                        l = Math.round(a.plotX) - h,
                        p = Math.round(a.shapeArgs.width / 2);
                    null !== a.open && (a = Math.round(a.plotOpen) + h, f.push(["M", l, a], ["L", l - p, a]), e.prototype.extendStem.call(this, f, d / 2, a));
                    return f
                };
                d.prototype.pointAttribs = function (a, d) {
                    d = e.prototype.pointAttribs.call(this, a, d);
                    var f = this.options;
                    delete d.fill;
                    !a.options.color && f.upColor && a.open < a.close && (d.stroke = f.upColor);
                    return d
                };
                d.prototype.toYData = function (a) {
                    return [a.open, a.high, a.low, a.close]
                };
                d.defaultOptions = q(H.defaultOptions, {
                    tooltip: {
                        pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
                    }
                });
                return d
            }(H);
        z(l.prototype, {
            pointArrayMap: ["open", "high", "low", "close"]
        });
        l.prototype.pointClass = e;
        h.registerSeriesType("ohlc",
            l);
        I(v, "init", function (e) {
            e = e.options;
            e.useOhlcData && "highcharts-navigator-series" !== e.id && z(this, {
                pointValKey: l.prototype.pointValKey,
                pointArrayMap: l.prototype.pointArrayMap,
                toYData: l.prototype.toYData
            })
        });
        I(v, "afterSetOptions", function (e) {
            e = e.options;
            var d = e.dataGrouping;
            d && e.useOhlcData && "highcharts-navigator-series" !== e.id && (d.approximation = "ohlc")
        });
        "";
        return l
    });
    M(h, "Series/Candlestick/CandlestickSeries.js", [h["Core/DefaultOptions.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]],
        function (e, h, A) {
            var D = this && this.__extends || function () {
                var e = function (h, f) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                        instanceof Array && function (d, a) {
                            d.__proto__ = a
                        } || function (d, a) {
                            for (var e in a) a.hasOwnProperty(e) && (d[e] = a[e])
                        };
                    return e(h, f)
                };
                return function (h, f) {
                    function d() {
                        this.constructor = h
                    }
                    e(h, f);
                    h.prototype = null === f ? Object.create(f) : (d.prototype = f.prototype, new d)
                }
            }(),
                v = e.defaultOptions;
            e = h.seriesTypes;
            var H = e.column,
                I = e.ohlc,
                z = A.merge;
            A = function (e) {
                function h() {
                    var f = null !== e && e.apply(this, arguments) ||
                        this;
                    f.data = void 0;
                    f.options = void 0;
                    f.points = void 0;
                    return f
                }
                D(h, e);
                h.prototype.pointAttribs = function (e, d) {
                    var a = H.prototype.pointAttribs.call(this, e, d),
                        f = this.options,
                        h = e.open < e.close,
                        l = f.lineColor || this.color,
                        q = e.color || this.color;
                    a["stroke-width"] = f.lineWidth;
                    a.fill = e.options.color || (h ? f.upColor || q : q);
                    a.stroke = e.options.lineColor || (h ? f.upLineColor || l : l);
                    d && (e = f.states[d], a.fill = e.color || a.fill, a.stroke = e.lineColor || a.stroke, a["stroke-width"] = e.lineWidth || a["stroke-width"]);
                    return a
                };
                h.prototype.drawPoints =
                    function () {
                        var e = this,
                            d = e.chart,
                            a = e.yAxis.reversed;
                        e.points.forEach(function (f) {
                            var h = f.graphic,
                                l = !h;
                            if ("undefined" !== typeof f.plotY) {
                                h || (f.graphic = h = d.renderer.path().add(e.group));
                                e.chart.styledMode || h.attr(e.pointAttribs(f, f.selected && "select")).shadow(e.options.shadow);
                                var p = h.strokeWidth() % 2 / 2;
                                var q = Math.round(f.plotX) - p;
                                var v = f.plotOpen;
                                var z = f.plotClose;
                                var y = Math.min(v, z);
                                v = Math.max(v, z);
                                var C = Math.round(f.shapeArgs.width / 2);
                                z = a ? v !== f.yBottom : Math.round(y) !== Math.round(f.plotHigh);
                                var x = a ?
                                    Math.round(y) !== Math.round(f.plotHigh) : v !== f.yBottom;
                                y = Math.round(y) + p;
                                v = Math.round(v) + p;
                                p = [];
                                p.push(["M", q - C, v], ["L", q - C, y], ["L", q + C, y], ["L", q + C, v], ["Z"], ["M", q, y], ["L", q, z ? Math.round(a ? f.yBottom : f.plotHigh) : y], ["M", q, v], ["L", q, x ? Math.round(a ? f.plotHigh : f.yBottom) : v]);
                                h[l ? "attr" : "animate"]({
                                    d: p
                                }).addClass(f.getClassName(), !0)
                            }
                        })
                    };
                h.defaultOptions = z(I.defaultOptions, v.plotOptions, {
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    tooltip: v.plotOptions.ohlc.tooltip,
                    threshold: null,
                    lineColor: "#000000",
                    lineWidth: 1,
                    upColor: "#31BAA0",
                    stickyTracking: !0
                });
                return h
            }(I);
            h.registerSeriesType("candlestick", A);
            "";
            return A
        });
    M(h, "Series/Flags/FlagsPoint.js", [h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]], function (e, h) {
        var A = this && this.__extends || function () {
            var e = function (h, v) {
                e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, h) {
                        e.__proto__ = h
                    } || function (e, h) {
                        for (var l in h) h.hasOwnProperty(l) && (e[l] = h[l])
                    };
                return e(h, v)
            };
            return function (h, v) {
                function z() {
                    this.constructor = h
                }
                e(h, v);
                h.prototype = null === v ? Object.create(v) :
                    (z.prototype = v.prototype, new z)
            }
        }(),
            D = h.isNumber;
        return function (e) {
            function h() {
                var h = null !== e && e.apply(this, arguments) || this;
                h.options = void 0;
                h.series = void 0;
                return h
            }
            A(h, e);
            h.prototype.isValid = function () {
                return D(this.y) || "undefined" === typeof this.y
            };
            h.prototype.hasNewShapeType = function () {
                var e = this.options.shape || this.series.options.shape;
                return this.graphic && e && e !== this.graphic.symbolKey
            };
            return h
        }(e.seriesTypes.column.prototype.pointClass)
    });
    M(h, "Series/OnSeriesComposition.js", [h["Series/Column/ColumnSeries.js"],
    h["Core/Series/Series.js"], h["Core/Utilities.js"]
    ], function (e, h, A) {
        var D = e.prototype,
            v = h.prototype,
            H = A.defined,
            I = A.stableSort,
            z;
        (function (e) {
            function h() {
                return v.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            }

            function f() {
                D.translate.apply(this);
                var a = this,
                    d = a.options,
                    e = a.chart,
                    f = a.points,
                    h = d.onSeries,
                    l = (h = h && e.get(h)) && h.options.step,
                    q = h && h.points,
                    v = e.inverted,
                    y = a.xAxis,
                    z = a.yAxis;
                e = f.length - 1;
                var x;
                d = d.onKey || "y";
                var c = q && q.length,
                    t = 0,
                    g;
                if (h && h.visible && c) {
                    t =
                        (h.pointXOffset || 0) + (h.barW || 0) / 2;
                    var u = h.currentDataGrouping;
                    var n = q[c - 1].x + (u ? u.totalRange : 0);
                    I(f, function (b, a) {
                        return b.x - a.x
                    });
                    for (d = "plot" + d[0].toUpperCase() + d.substr(1); c-- && f[e];) {
                        var b = q[c];
                        u = f[e];
                        u.y = b.y;
                        if (b.x <= u.x && "undefined" !== typeof b[d]) {
                            if (u.x <= n && (u.plotY = b[d], b.x < u.x && !l && (g = q[c + 1]) && "undefined" !== typeof g[d])) {
                                var r = (u.x - b.x) / (g.x - b.x);
                                u.plotY += r * (g[d] - b[d]);
                                u.y += r * (g.y - b.y)
                            }
                            e--;
                            c++;
                            if (0 > e) break
                        }
                    }
                }
                f.forEach(function (b, c) {
                    b.plotX += t;
                    if ("undefined" === typeof b.plotY || v) 0 <= b.plotX &&
                        b.plotX <= y.len ? v ? (b.plotY = y.translate(b.x, 0, 1, 0, 1), b.plotX = H(b.y) ? z.translate(b.y, 0, 0, 0, 1) : 0) : b.plotY = (y.opposite ? 0 : a.yAxis.len) + y.offset : b.shapeArgs = {};
                    if ((x = f[c - 1]) && x.plotX === b.plotX) {
                        "undefined" === typeof x.stackIndex && (x.stackIndex = 0);
                        var d = x.stackIndex + 1
                    }
                    b.stackIndex = d
                });
                this.onSeries = h
            }
            var d = [];
            e.compose = function (a) {
                if (-1 === d.indexOf(a)) {
                    d.push(a);
                    var e = a.prototype;
                    e.getPlotBox = h;
                    e.translate = f
                }
                return a
            };
            e.getPlotBox = h;
            e.translate = f
        })(z || (z = {}));
        return z
    });
    M(h, "Series/Flags/FlagsSymbols.js",
        [h["Core/Renderer/RendererRegistry.js"], h["Core/Renderer/SVG/SVGRenderer.js"]],
        function (e, h) {
            function A(e) {
                D[e + "pin"] = function (h, v, z, q, l) {
                    var f = l && l.anchorX;
                    l = l && l.anchorY;
                    "circle" === e && q > z && (h -= Math.round((q - z) / 2), z = q);
                    var d = D[e](h, v, z, q);
                    if (f && l) {
                        var a = f;
                        "circle" === e ? a = h + z / 2 : (h = d[0], z = d[1], "M" === h[0] && "L" === z[0] && (a = (h[1] + z[1]) / 2));
                        d.push(["M", a, v > l ? v : v + q], ["L", f, l]);
                        d = d.concat(D.circle(f - 1, l - 1, 2, 2))
                    }
                    return d
                }
            }
            var D = h.prototype.symbols;
            D.flag = function (e, h, A, z, q) {
                var l = q && q.anchorX || e;
                q = q && q.anchorY ||
                    h;
                var f = D.circle(l - 1, q - 1, 2, 2);
                f.push(["M", l, q], ["L", e, h + z], ["L", e, h], ["L", e + A, h], ["L", e + A, h + z], ["L", e, h + z], ["Z"]);
                return f
            };
            A("circle");
            A("square");
            e = e.getRendererType();
            e !== h && (e.prototype.symbols.circlepin = D.circlepin, e.prototype.symbols.flag = D.flag, e.prototype.symbols.squarepin = D.squarepin);
            return D
        });
    M(h, "Series/Flags/FlagsSeries.js", [h["Series/Flags/FlagsPoint.js"], h["Core/Globals.js"], h["Series/OnSeriesComposition.js"], h["Core/Renderer/RendererUtilities.js"], h["Core/Series/SeriesRegistry.js"],
    h["Core/Renderer/SVG/SVGElement.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H, I) {
        var z = this && this.__extends || function () {
            var a = function (d, e) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e])
                    };
                return a(d, e)
            };
            return function (d, e) {
                function f() {
                    this.constructor = d
                }
                a(d, e);
                d.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
            }
        }();
        h = h.noop;
        var q = E.distribute,
            l = v.series,
            f = v.seriesTypes.column,
            d = I.addEvent,
            a = I.defined;
        E = I.extend;
        var p = I.merge,
            k = I.objectEach,
            F = I.wrap;
        I = function (e) {
            function h() {
                var a = null !== e && e.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            z(h, e);
            h.prototype.animate = function (a) {
                a && this.setClip()
            };
            h.prototype.drawPoints = function () {
                var d = this.points,
                    e = this.chart,
                    f = e.renderer,
                    h = e.inverted,
                    l = this.options,
                    c = l.y,
                    t, g = this.yAxis,
                    u = {},
                    n = [];
                for (t = d.length; t--;) {
                    var b = d[t];
                    var r = (h ? b.plotY : b.plotX) > this.xAxis.len;
                    var v = b.plotX;
                    var m = b.stackIndex;
                    var w = b.options.shape || l.shape;
                    var B = b.plotY;
                    "undefined" !== typeof B && (B = b.plotY + c - ("undefined" !== typeof m && m * l.stackDistance));
                    b.anchorX = m ? void 0 : b.plotX;
                    var z = m ? void 0 : b.plotY;
                    var A = "flag" !== w;
                    m = b.graphic;
                    "undefined" !== typeof B && 0 <= v && !r ? (m && b.hasNewShapeType() && (m = m.destroy()), m || (m = b.graphic = f.label("", null, null, w, null, null, l.useHTML).addClass("highcharts-point").add(this.markerGroup), b.graphic.div && (b.graphic.div.point = b), m.isNew = !0), m.attr({
                        align: A ? "center" : "left",
                        width: l.width,
                        height: l.height,
                        "text-align": l.textAlign
                    }), e.styledMode || m.attr(this.pointAttribs(b)).css(p(l.style, b.style)).shadow(l.shadow), 0 < v && (v -= m.strokeWidth() % 2), w = {
                        y: B,
                        anchorY: z
                    }, l.allowOverlapX && (w.x = v, w.anchorX = b.anchorX), m.attr({
                        text: b.options.title || l.title || "A"
                    })[m.isNew ? "attr" : "animate"](w), l.allowOverlapX || (u[b.plotX] ? u[b.plotX].size = Math.max(u[b.plotX].size, m.width) : u[b.plotX] = {
                        align: A ? .5 : 0,
                        size: m.width,
                        target: v,
                        anchorX: v
                    }), b.tooltipPos = [v, B + g.pos - e.plotTop]) : m && (b.graphic = m.destroy())
                }
                if (!l.allowOverlapX) {
                    var D =
                        100;
                    k(u, function (b) {
                        b.plotX = b.anchorX;
                        n.push(b);
                        D = Math.max(b.size, D)
                    });
                    q(n, h ? g.len : this.xAxis.len, D);
                    d.forEach(function (b) {
                        var c = b.graphic && u[b.plotX];
                        c && (b.graphic[b.graphic.isNew ? "attr" : "animate"]({
                            x: c.pos + c.align * c.size,
                            anchorX: b.anchorX
                        }), a(c.pos) ? b.graphic.isNew = !1 : (b.graphic.attr({
                            x: -9999,
                            anchorX: -9999
                        }), b.graphic.isNew = !0))
                    })
                }
                l.useHTML && F(this.markerGroup, "on", function (b) {
                    return H.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            };
            h.prototype.drawTracker =
                function () {
                    var a = this.points;
                    e.prototype.drawTracker.call(this);
                    a.forEach(function (e) {
                        var f = e.graphic;
                        f && (e.unbindMouseOver && e.unbindMouseOver(), e.unbindMouseOver = d(f.element, "mouseover", function () {
                            0 < e.stackIndex && !e.raised && (e._y = f.y, f.attr({
                                y: e._y - 8
                            }), e.raised = !0);
                            a.forEach(function (a) {
                                a !== e && a.raised && a.graphic && (a.graphic.attr({
                                    y: a._y
                                }), a.raised = !1)
                            })
                        }))
                    })
                };
            h.prototype.pointAttribs = function (a, d) {
                var e = this.options,
                    f = a && a.color || this.color,
                    h = e.lineColor,
                    c = a && a.lineWidth;
                a = a && a.fillColor || e.fillColor;
                d && (a = e.states[d].fillColor, h = e.states[d].lineColor, c = e.states[d].lineWidth);
                return {
                    fill: a || f,
                    stroke: h || f,
                    "stroke-width": c || e.lineWidth || 0
                }
            };
            h.prototype.setClip = function () {
                l.prototype.setClip.apply(this, arguments);
                !1 !== this.options.clip && this.sharedClipKey && this.markerGroup && this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey])
            };
            h.defaultOptions = p(f.defaultOptions, {
                pointRange: 0,
                allowOverlapX: !1,
                shape: "flag",
                stackDistance: 12,
                textAlign: "center",
                tooltip: {
                    pointFormat: "{point.text}"
                },
                threshold: null,
                y: -30,
                fillColor: "#ffffff",
                lineWidth: 1,
                states: {
                    hover: {
                        lineColor: "#000000",
                        fillColor: "#ccd6eb"
                    }
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold"
                }
            });
            return h
        }(f);
        A.compose(I);
        E(I.prototype, {
            allowDG: !1,
            forceCrop: !0,
            invertible: !1,
            noSharedTooltip: !0,
            pointClass: e,
            sorted: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            buildKDTree: h,
            init: l.prototype.init,
            invertGroups: h
        });
        v.registerSeriesType("flags", I);
        "";
        "";
        return I
    });
    M(h, "Core/Axis/ScrollbarAxis.js", [h["Core/Utilities.js"]], function (e) {
        var h = e.addEvent,
            A = e.defined,
            E = e.pick;
        return function () {
            function e() { }
            e.compose = function (v, D) {
                if (-1 === e.composed.indexOf(v)) e.composed.push(v);
                else return v;
                var z = function (e) {
                    var h = E(e.options && e.options.min, e.min),
                        f = E(e.options && e.options.max, e.max);
                    return {
                        axisMin: h,
                        axisMax: f,
                        scrollMin: A(e.dataMin) ? Math.min(h, e.min, e.dataMin, E(e.threshold, Infinity)) : h,
                        scrollMax: A(e.dataMax) ? Math.max(f, e.max, e.dataMax, E(e.threshold, -Infinity)) : f
                    }
                };
                h(v, "afterInit", function () {
                    var e = this;
                    e.options && e.options.scrollbar && e.options.scrollbar.enabled &&
                        (e.options.scrollbar.vertical = !e.horiz, e.options.startOnTick = e.options.endOnTick = !1, e.scrollbar = new D(e.chart.renderer, e.options.scrollbar, e.chart), h(e.scrollbar, "changed", function (h) {
                            var f = z(e),
                                d = f.axisMax,
                                a = f.scrollMin,
                                l = f.scrollMax - a;
                            A(f.axisMin) && A(d) && (e.horiz && !e.reversed || !e.horiz && e.reversed ? (f = a + l * this.to, a += l * this.from) : (f = a + l * (1 - this.from), a += l * (1 - this.to)), this.shouldUpdateExtremes(h.DOMType) ? e.setExtremes(a, f, !0, "mousemove" !== h.DOMType && "touchmove" !== h.DOMType, h) : this.setRange(this.from,
                                this.to))
                        }))
                });
                h(v, "afterRender", function () {
                    var e = z(this),
                        h = e.scrollMin,
                        f = e.scrollMax;
                    e = this.scrollbar;
                    var d = this.axisTitleMargin + (this.titleOffset || 0),
                        a = this.chart.scrollbarsOffsets,
                        p = this.options.margin || 0;
                    e && (this.horiz ? (this.opposite || (a[1] += d), e.position(this.left, this.top + this.height + 2 + a[1] - (this.opposite ? p : 0), this.width, this.height), this.opposite || (a[1] += p), d = 1) : (this.opposite && (a[0] += d), e.position(e.options.opposite ? this.left + this.width + 2 + a[0] - (this.opposite ? 0 : p) : this.opposite ? 0 : p, this.top,
                        this.width, this.height), this.opposite && (a[0] += p), d = 0), a[d] += e.size + e.options.margin, isNaN(h) || isNaN(f) || !A(this.min) || !A(this.max) || this.min === this.max ? e.setRange(0, 1) : (a = (this.min - h) / (f - h), h = (this.max - h) / (f - h), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(a, h) : e.setRange(1 - h, 1 - a)))
                });
                h(v, "afterGetOffset", function () {
                    var e = this.scrollbar && !this.scrollbar.options.opposite;
                    e = this.horiz ? 2 : e ? 3 : 1;
                    var h = this.scrollbar;
                    h && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[e] += h.size +
                        h.options.margin)
                });
                return v
            };
            e.composed = [];
            return e
        }()
    });
    M(h, "Core/ScrollbarDefaults.js", [h["Core/Globals.js"]], function (e) {
        return {
            height: e.isTouchDevice ? 20 : 14,
            barBorderRadius: 0,
            buttonBorderRadius: 0,
            liveRedraw: void 0,
            margin: 10,
            minWidth: 6,
            opposite: !0,
            step: .2,
            zIndex: 3,
            barBackgroundColor: "#cccccc",
            barBorderWidth: 1,
            barBorderColor: "#cccccc",
            buttonArrowColor: "#333333",
            buttonBackgroundColor: "#e6e6e6",
            buttonBorderColor: "#cccccc",
            buttonBorderWidth: 1,
            rifleColor: "#333333",
            trackBackgroundColor: "#f2f2f2",
            trackBorderColor: "#f2f2f2",
            trackBorderWidth: 1
        }
    });
    M(h, "Core/Scrollbar.js", [h["Core/DefaultOptions.js"], h["Core/Globals.js"], h["Core/Axis/ScrollbarAxis.js"], h["Core/ScrollbarDefaults.js"], h["Core/Utilities.js"]], function (e, h, A, E, v) {
        var D = e.defaultOptions,
            I = v.addEvent,
            z = v.correctFloat,
            q = v.defined,
            l = v.destroyObjectProperties,
            f = v.fireEvent,
            d = v.merge,
            a = v.pick,
            p = v.removeEvent;
        e = function () {
            function e(a, d, e) {
                this._events = [];
                this.chart = void 0;
                this.from = this.chartY = this.chartX = 0;
                this.scrollbar = this.renderer = this.options = this.group = void 0;
                this.scrollbarButtons = [];
                this.scrollbarGroup = void 0;
                this.scrollbarLeft = 0;
                this.scrollbarRifles = void 0;
                this.scrollbarStrokeWidth = 1;
                this.to = this.size = this.scrollbarTop = 0;
                this.track = void 0;
                this.trackBorderWidth = 1;
                this.userOptions = void 0;
                this.y = this.x = 0;
                this.init(a, d, e)
            }
            e.compose = function (a) {
                A.compose(a, e)
            };
            e.swapXY = function (a, d) {
                d && a.forEach(function (a) {
                    for (var d = a.length, e, f = 0; f < d; f += 2) e = a[f + 1], "number" === typeof e && (a[f + 1] = a[f + 2], a[f + 2] = e)
                });
                return a
            };
            e.prototype.addEvents = function () {
                var a = this.options.inverted ? [1, 0] : [0, 1],
                    d = this.scrollbarButtons,
                    e = this.scrollbarGroup.element,
                    f = this.track.element,
                    k = this.mouseDownHandler.bind(this),
                    l = this.mouseMoveHandler.bind(this),
                    p = this.mouseUpHandler.bind(this);
                a = [
                    [d[a[0]].element, "click", this.buttonToMinClick.bind(this)],
                    [d[a[1]].element, "click", this.buttonToMaxClick.bind(this)],
                    [f, "click", this.trackClick.bind(this)],
                    [e, "mousedown", k],
                    [e.ownerDocument, "mousemove", l],
                    [e.ownerDocument, "mouseup", p]
                ];
                h.hasTouch && a.push([e, "touchstart", k], [e.ownerDocument, "touchmove", l],
                    [e.ownerDocument, "touchend", p]);
                a.forEach(function (a) {
                    I.apply(null, a)
                });
                this._events = a
            };
            e.prototype.buttonToMaxClick = function (d) {
                var e = (this.to - this.from) * a(this.options.step, .2);
                this.updatePosition(this.from + e, this.to + e);
                f(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: d
                })
            };
            e.prototype.buttonToMinClick = function (d) {
                var e = z(this.to - this.from) * a(this.options.step, .2);
                this.updatePosition(z(this.from - e), z(this.to - e));
                f(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: d
                })
            };
            e.prototype.cursorToScrollbarPosition = function (a) {
                var d = this.options;
                d = d.minWidth > this.calculatedWidth ? d.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - d),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - d)
                }
            };
            e.prototype.destroy = function () {
                var a = this,
                    d = a.chart.scroller;
                a.removeEvents();
                ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (d) {
                    a[d] && a[d].destroy && (a[d] = a[d].destroy())
                });
                d && a === d.scrollbar && (d.scrollbar = null, l(d.scrollbarButtons))
            };
            e.prototype.drawScrollbarButton = function (a) {
                var d = this.renderer,
                    f = this.scrollbarButtons,
                    h = this.options,
                    k = this.size,
                    l = d.g().add(this.group);
                f.push(l);
                l = d.rect().addClass("highcharts-scrollbar-button").add(l);
                this.chart.styledMode || l.attr({
                    stroke: h.buttonBorderColor,
                    "stroke-width": h.buttonBorderWidth,
                    fill: h.buttonBackgroundColor
                });
                l.attr(l.crisp({
                    x: -.5,
                    y: -.5,
                    width: k + 1,
                    height: k + 1,
                    r: h.buttonBorderRadius
                }, l.strokeWidth()));
                l = d.path(e.swapXY([
                    ["M", k / 2 + (a ? -1 : 1), k / 2 - 3],
                    ["L", k / 2 + (a ? -1 : 1), k / 2 + 3],
                    ["L", k / 2 + (a ?
                        2 : -2), k / 2]
                ], h.vertical)).addClass("highcharts-scrollbar-arrow").add(f[a]);
                this.chart.styledMode || l.attr({
                    fill: h.buttonArrowColor
                })
            };
            e.prototype.init = function (e, f, h) {
                this.scrollbarButtons = [];
                this.renderer = e;
                this.userOptions = f;
                this.options = d(E, D.scrollbar, f);
                this.chart = h;
                this.size = a(this.options.size, this.options.height);
                f.enabled && (this.render(), this.addEvents())
            };
            e.prototype.mouseDownHandler = function (a) {
                a = this.chart.pointer.normalize(a);
                a = this.cursorToScrollbarPosition(a);
                this.chartX = a.chartX;
                this.chartY =
                    a.chartY;
                this.initPositions = [this.from, this.to];
                this.grabbedCenter = !0
            };
            e.prototype.mouseMoveHandler = function (a) {
                var d = this.chart.pointer.normalize(a),
                    e = this.options.vertical ? "chartY" : "chartX",
                    h = this.initPositions || [];
                !this.grabbedCenter || a.touches && 0 === a.touches[0][e] || (d = this.cursorToScrollbarPosition(d)[e], e = this[e], e = d - e, this.hasDragged = !0, this.updatePosition(h[0] + e, h[1] + e), this.hasDragged && f(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: a.type,
                    DOMEvent: a
                }))
            };
            e.prototype.mouseUpHandler =
                function (a) {
                    this.hasDragged && f(this, "changed", {
                        from: this.from,
                        to: this.to,
                        trigger: "scrollbar",
                        DOMType: a.type,
                        DOMEvent: a
                    });
                    this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
                };
            e.prototype.position = function (a, d, e, f) {
                var h = this.options.vertical,
                    k = this.rendered ? "animate" : "attr",
                    l = 0;
                this.x = a;
                this.y = d + this.trackBorderWidth;
                this.width = e;
                this.xOffset = this.height = f;
                this.yOffset = l;
                h ? (this.width = this.yOffset = e = l = this.size, this.xOffset = d = 0, this.barWidth = f - 2 * e, this.x = a += this.options.margin) : (this.height =
                    this.xOffset = f = d = this.size, this.barWidth = e - 2 * f, this.y += this.options.margin);
                this.group[k]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[k]({
                    width: e,
                    height: f
                });
                this.scrollbarButtons[1][k]({
                    translateX: h ? 0 : e - d,
                    translateY: h ? f - l : 0
                })
            };
            e.prototype.removeEvents = function () {
                this._events.forEach(function (a) {
                    p.apply(null, a)
                });
                this._events.length = 0
            };
            e.prototype.render = function () {
                var a = this.renderer,
                    d = this.options,
                    f = this.size,
                    h = this.chart.styledMode,
                    k = a.g("scrollbar").attr({
                        zIndex: d.zIndex,
                        translateY: -99999
                    }).add();
                this.group = k;
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: d.trackBorderRadius || 0,
                    height: f,
                    width: f
                }).add(k);
                h || this.track.attr({
                    fill: d.trackBackgroundColor,
                    stroke: d.trackBorderColor,
                    "stroke-width": d.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = a.g().add(k);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: f,
                    width: f,
                    r: d.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(e.swapXY([
                    ["M", -3, f / 4],
                    ["L", -3, 2 * f / 3],
                    ["M", 0, f / 4],
                    ["L", 0, 2 * f / 3],
                    ["M", 3, f / 4],
                    ["L", 3, 2 * f / 3]
                ], d.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                h || (this.scrollbar.attr({
                    fill: d.barBackgroundColor,
                    stroke: d.barBorderColor,
                    "stroke-width": d.barBorderWidth
                }), this.scrollbarRifles.attr({
                    stroke: d.rifleColor,
                    "stroke-width": 1
                }));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth %
                    2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            };
            e.prototype.setRange = function (a, d) {
                var e = this.options,
                    f = e.vertical,
                    h = e.minWidth,
                    k = this.barWidth,
                    l = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                if (q(k)) {
                    var p = k * Math.min(d, 1);
                    a = Math.max(a, 0);
                    var c = Math.ceil(k * a);
                    this.calculatedWidth = p = z(p - c);
                    p < h && (c = (k - h + p) * a, p = h);
                    h = Math.floor(c + this.xOffset + this.yOffset);
                    k = p / 2 - .5;
                    this.from = a;
                    this.to = d;
                    f ? (this.scrollbarGroup[l]({
                        translateY: h
                    }), this.scrollbar[l]({
                        height: p
                    }),
                        this.scrollbarRifles[l]({
                            translateY: k
                        }), this.scrollbarTop = h, this.scrollbarLeft = 0) : (this.scrollbarGroup[l]({
                            translateX: h
                        }), this.scrollbar[l]({
                            width: p
                        }), this.scrollbarRifles[l]({
                            translateX: k
                        }), this.scrollbarLeft = h, this.scrollbarTop = 0);
                    12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0);
                    !1 === e.showFull && (0 >= a && 1 <= d ? this.group.hide() : this.group.show());
                    this.rendered = !0
                }
            };
            e.prototype.shouldUpdateExtremes = function (d) {
                return a(this.options.liveRedraw, h.svg && !h.isTouchDevice && !this.chart.isBoosting) ||
                    "mouseup" === d || "touchend" === d || !q(d)
            };
            e.prototype.trackClick = function (a) {
                var d = this.chart.pointer.normalize(a),
                    e = this.to - this.from,
                    h = this.y + this.scrollbarTop,
                    k = this.x + this.scrollbarLeft;
                this.options.vertical && d.chartY > h || !this.options.vertical && d.chartX > k ? this.updatePosition(this.from + e, this.to + e) : this.updatePosition(this.from - e, this.to - e);
                f(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: a
                })
            };
            e.prototype.update = function (a) {
                this.destroy();
                this.init(this.chart.renderer, d(!0,
                    this.options, a), this.chart)
            };
            e.prototype.updatePosition = function (a, d) {
                1 < d && (a = z(1 - z(d - a)), d = 1);
                0 > a && (d = z(d - a), a = 0);
                this.from = a;
                this.to = d
            };
            e.defaultOptions = E;
            return e
        }();
        D.scrollbar = d(!0, e.defaultOptions, D.scrollbar);
        return e
    });
    M(h, "Core/Axis/NavigatorAxis.js", [h["Core/Globals.js"], h["Core/Utilities.js"]], function (e, h) {
        var A = e.isTouchDevice,
            D = h.addEvent,
            v = h.correctFloat,
            H = h.defined,
            I = h.isNumber,
            z = h.pick,
            q = function () {
                function e(e) {
                    this.axis = e
                }
                e.prototype.destroy = function () {
                    this.axis = void 0
                };
                e.prototype.toFixedRange =
                    function (e, d, a, h) {
                        var f = this.axis,
                            l = f.chart;
                        l = l && l.fixedRange;
                        var p = (f.pointRange || 0) / 2;
                        e = z(a, f.translate(e, !0, !f.horiz));
                        d = z(h, f.translate(d, !0, !f.horiz));
                        f = l && (d - e) / l;
                        H(a) || (e = v(e + p));
                        H(h) || (d = v(d - p));
                        .7 < f && 1.3 > f && (h ? e = d - l : d = e + l);
                        I(e) && I(d) || (e = d = void 0);
                        return {
                            min: e,
                            max: d
                        }
                    };
                return e
            }();
        return function () {
            function e() { }
            e.compose = function (e) {
                e.keepProps.push("navigatorAxis");
                D(e, "init", function () {
                    this.navigatorAxis || (this.navigatorAxis = new q(this))
                });
                D(e, "zoom", function (d) {
                    var a = this.chart.options,
                        e = a.navigator,
                        f = this.navigatorAxis,
                        h = a.chart.pinchType,
                        l = a.rangeSelector;
                    a = a.chart.zoomType;
                    this.isXAxis && (e && e.enabled || l && l.enabled) && ("y" === a ? d.zoomed = !1 : (!A && "xy" === a || A && "xy" === h) && this.options.range && (e = f.previousZoom, H(d.newMin) ? f.previousZoom = [this.min, this.max] : e && (d.newMin = e[0], d.newMax = e[1], f.previousZoom = void 0)));
                    "undefined" !== typeof d.zoomed && d.preventDefault()
                })
            };
            e.AdditionsClass = q;
            return e
        }()
    });
    M(h, "Core/Navigator.js", [h["Core/Axis/Axis.js"], h["Core/Chart/Chart.js"], h["Core/Color/Color.js"],
    h["Core/Globals.js"], h["Core/Axis/NavigatorAxis.js"], h["Core/DefaultOptions.js"], h["Core/Renderer/RendererRegistry.js"], h["Core/Scrollbar.js"], h["Core/Series/Series.js"], h["Core/Series/SeriesRegistry.js"], h["Core/Utilities.js"]
    ], function (e, h, A, E, v, H, I, z, q, l, f) {
        A = A.parse;
        var d = E.hasTouch,
            a = E.isTouchDevice,
            p = H.defaultOptions,
            k = f.addEvent,
            D = f.clamp,
            B = f.correctFloat,
            J = f.defined,
            K = f.destroyObjectProperties,
            L = f.erase,
            y = f.extend,
            C = f.find,
            x = f.isArray,
            c = f.isNumber,
            t = f.merge,
            g = f.pick,
            u = f.removeEvent,
            n = f.splat,
            b = function (a) {
                for (var b = [], d = 1; d < arguments.length; d++) b[d - 1] = arguments[d];
                b = [].filter.call(b, c);
                if (b.length) return Math[a].apply(0, b)
            };
        H = "undefined" === typeof l.seriesTypes.areaspline ? "line" : "areaspline";
        y(p, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: A("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: H,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        firstAnchor: "firstPoint",
                        anchor: "middle",
                        lastAnchor: "lastPoint",
                        units: [
                            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ["second", [1, 2, 5, 10, 15, 30]],
                            ["minute", [1, 2, 5, 10, 15, 30]],
                            ["hour", [1, 2, 3, 4, 6, 8, 12]],
                            ["day", [1, 2, 3, 4]],
                            ["week", [1, 2, 3]],
                            ["month", [1, 3, 6]],
                            ["year", null]
                        ]
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        I.getRendererType().prototype.symbols["navigator-handle"] = function (a, b, c,
            d, e) {
            a = (e && e.width || 0) / 2;
            b = Math.round(a / 3) + .5;
            e = e && e.height || 0;
            return [
                ["M", -a - 1, .5],
                ["L", a, .5],
                ["L", a, e + .5],
                ["L", -a - 1, e + .5],
                ["L", -a - 1, .5],
                ["M", -b, 4],
                ["L", -b, e - 3],
                ["M", b - 1, 4],
                ["L", b - 1, e - 3]
            ]
        };
        var r = function () {
            function f(a) {
                this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height =
                    this.handles = this.chart = this.baseSeries = void 0;
                this.init(a)
            }
            f.prototype.drawHandle = function (a, b, c, d) {
                var e = this.navigatorOptions.handles.height;
                this.handles[b][d](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5 - e)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - e / 2 - 1)
                })
            };
            f.prototype.drawOutline = function (a, b, c, d) {
                var e = this.navigatorOptions.maskInside,
                    f = this.outline.strokeWidth(),
                    g = f / 2,
                    h = f % 2 / 2;
                f = this.outlineHeight;
                var m = this.scrollbarHeight || 0,
                    k = this.size,
                    l = this.left - m,
                    n = this.top;
                c ? (l -= g, c = n + b + h, b = n + a + h, h = [
                    ["M", l + f, n - m - h],
                    ["L", l + f, c],
                    ["L", l, c],
                    ["L", l, b],
                    ["L", l + f, b],
                    ["L", l + f, n + k + m]
                ], e && h.push(["M", l + f, c - g], ["L", l + f, b + g])) : (a += l + m - h, b += l + m - h, n += g, h = [
                    ["M", l, n],
                    ["L", a, n],
                    ["L", a, n + f],
                    ["L", b, n + f],
                    ["L", b, n],
                    ["L", l + k + 2 * m, n]
                ], e && h.push(["M", a - g, n], ["L", b + g, n]));
                this.outline[d]({
                    d: h
                })
            };
            f.prototype.drawMasks = function (a, b, c, d) {
                var e = this.left,
                    f = this.top,
                    g = this.height;
                if (c) {
                    var h = [e, e, e];
                    var m = [f, f + a, f + b];
                    var k = [g, g, g];
                    var l = [a, b - a, this.size - b]
                } else h = [e, e + a, e + b], m = [f, f, f], k = [a, b - a, this.size - b], l = [g, g, g];
                this.shades.forEach(function (a, b) {
                    a[d]({
                        x: h[b],
                        y: m[b],
                        width: k[b],
                        height: l[b]
                    })
                })
            };
            f.prototype.renderElements = function () {
                var a = this,
                    b = a.navigatorOptions,
                    c = b.maskInside,
                    d = a.chart,
                    e = d.renderer,
                    f, g = {
                        cursor: d.inverted ? "ns-resize" : "ew-resize"
                    };
                a.navigatorGroup = f = e.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                [!c, c, !c].forEach(function (c, h) {
                    a.shades[h] = e.rect().addClass("highcharts-navigator-mask" + (1 === h ?
                        "-inside" : "-outside")).add(f);
                    d.styledMode || a.shades[h].attr({
                        fill: c ? b.maskFill : "rgba(0,0,0,0)"
                    }).css(1 === h && g)
                });
                a.outline = e.path().addClass("highcharts-navigator-outline").add(f);
                d.styledMode || a.outline.attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                });
                b.handles.enabled && [0, 1].forEach(function (c) {
                    b.handles.inverted = d.inverted;
                    a.handles[c] = e.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                    a.handles[c].attr({
                        zIndex: 7 - c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(f);
                    if (!d.styledMode) {
                        var h = b.handles;
                        a.handles[c].attr({
                            fill: h.backgroundColor,
                            stroke: h.borderColor,
                            "stroke-width": h.lineWidth
                        }).css(g)
                    }
                })
            };
            f.prototype.update = function (a) {
                (this.series || []).forEach(function (a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                t(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            };
            f.prototype.render = function (a, b, d, e) {
                var f = this.chart,
                    h = this.scrollbarHeight,
                    m, k = this.xAxis,
                    l = k.pointRange || 0;
                var n = k.navigatorAxis.fake ?
                    f.xAxis[0] : k;
                var r = this.navigatorEnabled,
                    p, w = this.rendered;
                var q = f.inverted;
                var t = f.xAxis[0].minRange,
                    u = f.xAxis[0].options.maxRange;
                if (!this.hasDragged || J(d)) {
                    a = B(a - l / 2);
                    b = B(b + l / 2);
                    if (!c(a) || !c(b))
                        if (w) d = 0, e = g(k.width, n.width);
                        else return;
                    this.left = g(k.left, f.plotLeft + h + (q ? f.plotWidth : 0));
                    this.size = p = m = g(k.len, (q ? f.plotHeight : f.plotWidth) - 2 * h);
                    f = q ? h : m + 2 * h;
                    d = g(d, k.toPixels(a, !0));
                    e = g(e, k.toPixels(b, !0));
                    c(d) && Infinity !== Math.abs(d) || (d = 0, e = f);
                    a = k.toValue(d, !0);
                    b = k.toValue(e, !0);
                    var x = Math.abs(B(b -
                        a));
                    x < t ? this.grabbedLeft ? d = k.toPixels(b - t - l, !0) : this.grabbedRight && (e = k.toPixels(a + t + l, !0)) : J(u) && B(x - l) > u && (this.grabbedLeft ? d = k.toPixels(b - u - l, !0) : this.grabbedRight && (e = k.toPixels(a + u + l, !0)));
                    this.zoomedMax = D(Math.max(d, e), 0, p);
                    this.zoomedMin = D(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(d, e), 0, p);
                    this.range = this.zoomedMax - this.zoomedMin;
                    p = Math.round(this.zoomedMax);
                    d = Math.round(this.zoomedMin);
                    r && (this.navigatorGroup.attr({
                        visibility: "visible"
                    }), w = w && !this.hasDragged ? "animate" : "attr",
                        this.drawMasks(d, p, q, w), this.drawOutline(d, p, q, w), this.navigatorOptions.handles.enabled && (this.drawHandle(d, 0, q, w), this.drawHandle(p, 1, q, w)));
                    this.scrollbar && (q ? (q = this.top - h, n = this.left - h + (r || !n.opposite ? 0 : (n.titleOffset || 0) + n.axisTitleMargin), h = m + 2 * h) : (q = this.top + (r ? this.height : -h), n = this.left - h), this.scrollbar.position(n, q, f, h), this.scrollbar.setRange(this.zoomedMin / (m || 1), this.zoomedMax / (m || 1)));
                    this.rendered = !0
                }
            };
            f.prototype.addMouseEvents = function () {
                var a = this,
                    b = a.chart,
                    c = b.container,
                    e = [],
                    f,
                    g;
                a.mouseMoveHandler = f = function (b) {
                    a.onMouseMove(b)
                };
                a.mouseUpHandler = g = function (b) {
                    a.onMouseUp(b)
                };
                e = a.getPartsEvents("mousedown");
                e.push(k(b.renderTo, "mousemove", f), k(c.ownerDocument, "mouseup", g));
                d && (e.push(k(b.renderTo, "touchmove", f), k(c.ownerDocument, "touchend", g)), e.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = e;
                a.series && a.series[0] && e.push(k(a.series[0].xAxis, "foundExtremes", function () {
                    b.navigator.modifyNavigatorAxisExtremes()
                }))
            };
            f.prototype.getPartsEvents = function (a) {
                var b = this,
                    c = [];
                ["shades", "handles"].forEach(function (d) {
                    b[d].forEach(function (e, f) {
                        c.push(k(e.element, a, function (a) {
                            b[d + "Mousedown"](a, f)
                        }))
                    })
                });
                return c
            };
            f.prototype.shadesMousedown = function (a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    g = this.size,
                    h = this.range,
                    m = a.chartX;
                c.inverted && (m = a.chartY, f = this.top);
                if (1 === b) this.grabbedCenter = m, this.fixedWidth = h, this.dragOffset = m - e;
                else {
                    a = m - f - h / 2;
                    if (0 === b) a = Math.max(0, a);
                    else if (2 === b && a + h >= g)
                        if (a = g - h, this.reversedExtremes) {
                            a -=
                                h;
                            var k = this.getUnionExtremes().dataMin
                        } else var l = this.getUnionExtremes().dataMax;
                    a !== e && (this.fixedWidth = h, b = d.navigatorAxis.toFixedRange(a, a + h, k, l), J(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                        trigger: "navigator"
                    }))
                }
            };
            f.prototype.handlesMousedown = function (a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d = this.reversedExtremes;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            };
            f.prototype.onMouseMove = function (b) {
                var c = this,
                    d = c.chart,
                    e = c.left,
                    f = c.navigatorSize,
                    h = c.range,
                    m = c.dragOffset,
                    k = d.inverted;
                b.touches && 0 === b.touches[0].pageX || (b = d.pointer.normalize(b), d = b.chartX, k && (e = c.top, d = b.chartY), c.grabbedLeft ? (c.hasDragged = !0, c.render(0, 0, d - e, c.otherHandlePos)) : c.grabbedRight ? (c.hasDragged = !0, c.render(0, 0, c.otherHandlePos, d - e)) : c.grabbedCenter && (c.hasDragged = !0, d < m ? d = m : d > f + m - h && (d = f + m -
                    h), c.render(0, 0, d - m, d - m + h)), c.hasDragged && c.scrollbar && g(c.scrollbar.options.liveRedraw, E.svg && !a && !this.chart.isBoosting) && (b.DOMType = b.type, setTimeout(function () {
                        c.onMouseUp(b)
                    }, 0)))
            };
            f.prototype.onMouseUp = function (a) {
                var b = this.chart,
                    d = this.xAxis,
                    e = this.scrollbar,
                    f = a.DOMEvent || a,
                    g = b.inverted,
                    h = this.rendered && !this.hasDragged ? "animate" : "attr";
                if (this.hasDragged && (!e || !e.hasDragged) || "scrollbar" === a.trigger) {
                    e = this.getUnionExtremes();
                    if (this.zoomedMin === this.otherHandlePos) var m = this.fixedExtreme;
                    else if (this.zoomedMax === this.otherHandlePos) var k = this.fixedExtreme;
                    this.zoomedMax === this.size && (k = this.reversedExtremes ? e.dataMin : e.dataMax);
                    0 === this.zoomedMin && (m = this.reversedExtremes ? e.dataMax : e.dataMin);
                    d = d.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, m, k);
                    J(d.min) && b.xAxis[0].setExtremes(Math.min(d.min, d.max), Math.max(d.min, d.max), !0, this.hasDragged ? !1 : null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: f
                    })
                }
                "mousemove" !== a.DOMType && "touchmove" !== a.DOMType && (this.grabbedLeft =
                    this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
                this.navigatorEnabled && c(this.zoomedMin) && c(this.zoomedMax) && (b = Math.round(this.zoomedMin), a = Math.round(this.zoomedMax), this.shades && this.drawMasks(b, a, g, h), this.outline && this.drawOutline(b, a, g, h), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(b, 0, g, h), this.drawHandle(a, 1, g, h)))
            };
            f.prototype.removeEvents = function () {
                this.eventsToUnbind &&
                    (this.eventsToUnbind.forEach(function (a) {
                        a()
                    }), this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            };
            f.prototype.removeBaseSeriesEvents = function () {
                var a = this.baseSeries || [];
                this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function (a) {
                    u(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && u(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            };
            f.prototype.init = function (a) {
                var c = a.options,
                    d = c.navigator,
                    f = d.enabled,
                    h = c.scrollbar,
                    m = h.enabled;
                c = f ? d.height :
                    0;
                var l = m ? h.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = c;
                this.scrollbarHeight = l;
                this.scrollbarEnabled = m;
                this.navigatorEnabled = f;
                this.navigatorOptions = d;
                this.scrollbarOptions = h;
                this.outlineHeight = c + l;
                this.opposite = g(d.opposite, !(f || !a.inverted));
                var n = this;
                f = n.baseSeries;
                h = a.xAxis.length;
                m = a.yAxis.length;
                var r = f && f[0] && f[0].xAxis || a.xAxis[0] || {
                    options: {}
                };
                a.isDirtyBox = !0;
                n.navigatorEnabled ? (n.xAxis = new e(a, t({
                    breaks: r.options.breaks,
                    ordinal: r.options.ordinal
                },
                    d.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: h,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                }, a.inverted ? {
                    offsets: [l, 0, -l, 0],
                    width: c
                } : {
                    offsets: [0, -l, 0, l],
                    height: c
                })), n.yAxis = new e(a, t(d.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: m,
                    isInternal: !0,
                    reversed: g(d.yAxis && d.yAxis.reversed, a.yAxis[0] && a.yAxis[0].reversed, !1),
                    zoomEnabled: !1
                }, a.inverted ? {
                    width: c
                } : {
                    height: c
                })), f || d.series.data ?
                        n.updateNavigatorSeries(!1) : 0 === a.series.length && (n.unbindRedraw = k(a, "beforeRedraw", function () {
                            0 < a.series.length && !n.series && (n.setBaseSeries(), n.unbindRedraw())
                        })), n.reversedExtremes = a.inverted && !n.xAxis.reversed || !a.inverted && n.xAxis.reversed, n.renderElements(), n.addMouseEvents()) : (n.xAxis = {
                            chart: a,
                            navigatorAxis: {
                                fake: !0
                            },
                            translate: function (c, d) {
                                var e = a.xAxis[0],
                                    f = e.getExtremes(),
                                    g = e.len - 2 * l,
                                    h = b("min", e.options.min, f.dataMin);
                                e = b("max", e.options.max, f.dataMax) - h;
                                return d ? c * e / g + h : g * (c - h) / e
                            },
                            toPixels: function (a) {
                                return this.translate(a)
                            },
                            toValue: function (a) {
                                return this.translate(a, !0)
                            }
                        }, n.xAxis.navigatorAxis.axis = n.xAxis, n.xAxis.navigatorAxis.toFixedRange = v.AdditionsClass.prototype.toFixedRange.bind(n.xAxis.navigatorAxis));
                a.options.scrollbar.enabled && (a.scrollbar = n.scrollbar = new z(a.renderer, t(a.options.scrollbar, {
                    margin: n.navigatorEnabled ? 0 : 10,
                    vertical: a.inverted
                }), a), k(n.scrollbar, "changed", function (a) {
                    var b = n.size,
                        c = b * this.to;
                    b *= this.from;
                    n.hasDragged = n.scrollbar.hasDragged;
                    n.render(0, 0, b, c);
                    this.shouldUpdateExtremes(a.DOMType) &&
                        setTimeout(function () {
                            n.onMouseUp(a)
                        })
                }));
                n.addBaseSeriesEvents();
                n.addChartEvents()
            };
            f.prototype.getUnionExtremes = function (a) {
                var c = this.chart.xAxis[0],
                    d = this.xAxis,
                    e = d.options,
                    f = c.options,
                    h;
                a && null === c.dataMin || (h = {
                    dataMin: g(e && e.min, b("min", f.min, c.dataMin, d.dataMin, d.min)),
                    dataMax: g(e && e.max, b("max", f.max, c.dataMax, d.dataMax, d.max))
                });
                return h
            };
            f.prototype.setBaseSeries = function (a, b) {
                var c = this.chart,
                    d = this.baseSeries = [];
                a = a || c.options && c.options.navigator.baseSeries || (c.series.length ? C(c.series,
                    function (a) {
                        return !a.options.isInternal
                    }).index : 0);
                (c.series || []).forEach(function (b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) || d.push(b)
                });
                this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, b)
            };
            f.prototype.updateNavigatorSeries = function (a, b) {
                var c = this,
                    d = c.chart,
                    e = c.baseSeries,
                    f, h, m = c.navigatorOptions.series,
                    k, l = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: void 0,
                        isInternal: !0,
                        states: {
                            inactive: {
                                opacity: 1
                            }
                        }
                    },
                    r = c.series = (c.series || []).filter(function (a) {
                        var b = a.baseSeries;
                        return 0 > e.indexOf(b) ? (b && (u(b, "updatedData", c.updatedDataHandler), delete b.navigatorSeries), a.chart && a.destroy(), !1) : !0
                    });
                e && e.length && e.forEach(function (a) {
                    var w = a.navigatorSeries,
                        q = y({
                            color: a.color,
                            visible: a.visible
                        }, x(m) ? p.navigator.series : m);
                    w && !1 === c.navigatorOptions.adaptToUpdatedData || (l.name = "Navigator " + e.length, f = a.options || {}, k = f.navigatorOptions || {}, q.dataLabels = n(q.dataLabels), h = t(f, l, q, k), h.pointRange = g(q.pointRange, k.pointRange, p.plotOptions[h.type || "line"].pointRange), q = k.data || q.data, c.hasNavigatorData = c.hasNavigatorData || !!q, h.data = q || f.data && f.data.slice(0), w && w.options ? w.update(h, b) : (a.navigatorSeries = d.initSeries(h), a.navigatorSeries.baseSeries = a, r.push(a.navigatorSeries)))
                });
                if (m.data && (!e || !e.length) || x(m)) c.hasNavigatorData = !1, m = n(m), m.forEach(function (a, b) {
                    l.name = "Navigator " + (r.length + 1);
                    h = t(p.navigator.series, {
                        color: d.series[b] && !d.series[b].options.isInternal && d.series[b].color || d.options.colors[b] || d.options.colors[0]
                    }, l, a);
                    h.data = a.data;
                    h.data && (c.hasNavigatorData = !0, r.push(d.initSeries(h)))
                });
                a && this.addBaseSeriesEvents()
            };
            f.prototype.addBaseSeriesEvents = function () {
                var a = this,
                    b = a.baseSeries || [];
                b[0] && b[0].xAxis && b[0].eventsToUnbind.push(k(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
                b.forEach(function (b) {
                    b.eventsToUnbind.push(k(b, "show", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0,
                            !1)
                    }));
                    b.eventsToUnbind.push(k(b, "hide", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    }));
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && b.eventsToUnbind.push(k(b, "updatedData", this.updatedDataHandler));
                    b.eventsToUnbind.push(k(b, "remove", function () {
                        this.navigatorSeries && (L(a.series, this.navigatorSeries), J(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    }))
                }, this)
            };
            f.prototype.getBaseSeriesMin = function (a) {
                return this.baseSeries.reduce(function (a,
                    b) {
                    return Math.min(a, b.xData ? b.xData[0] : a)
                }, a)
            };
            f.prototype.modifyNavigatorAxisExtremes = function () {
                var a = this.xAxis,
                    b;
                "undefined" !== typeof a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            };
            f.prototype.modifyBaseAxisExtremes = function () {
                var a = this.chart.navigator,
                    b = this.getExtremes(),
                    d = b.dataMin,
                    e = b.dataMax;
                b = b.max - b.min;
                var f = a.stickToMin,
                    h = a.stickToMax,
                    k = g(this.options.overscroll, 0),
                    l = a.series && a.series[0],
                    n = !!this.setExtremes;
                if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
                    if (f) {
                        var r = d;
                        var p = r + b
                    }
                    h && (p = e + k, f || (r = Math.max(d, p - b, a.getBaseSeriesMin(l && l.xData ? l.xData[0] : -Number.MAX_VALUE))));
                    n && (f || h) && c(r) && (this.min = this.userMin = r, this.max = this.userMax = p)
                }
                a.stickToMin = a.stickToMax = null
            };
            f.prototype.updatedDataHandler = function () {
                var a = this.chart.navigator,
                    b = this.navigatorSeries;
                a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = a.shouldStickToMin(this,
                    a);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            };
            f.prototype.shouldStickToMin = function (a, b) {
                b = b.getBaseSeriesMin(a.xData[0]);
                var d = a.xAxis;
                a = d.max;
                var e = d.min;
                d = d.options.range;
                return c(a) && c(e) ? d && 0 < a - b ? a - b < d : e <= b : !1
            };
            f.prototype.addChartEvents = function () {
                this.eventsToUnbind || (this.eventsToUnbind = []);
                this.eventsToUnbind.push(k(this.chart, "redraw", function () {
                    var a = this.navigator,
                        b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || this.xAxis[0]);
                    b && a.render(b.min, b.max)
                }), k(this.chart, "getMargins", function () {
                    var a = this.navigator,
                        b = a.opposite ? "plotTop" : "marginBottom";
                    this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                    this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
            };
            f.prototype.destroy = function () {
                this.removeEvents();
                this.xAxis && (L(this.chart.xAxis, this.xAxis), L(this.chart.axes, this.xAxis));
                this.yAxis && (L(this.chart.yAxis, this.yAxis), L(this.chart.axes, this.yAxis));
                (this.series || []).forEach(function (a) {
                    a.destroy &&
                        a.destroy()
                });
                "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                [this.handles].forEach(function (a) {
                    K(a)
                }, this)
            };
            return f
        }();
        E.Navigator || (E.Navigator = r, v.compose(e), k(h, "beforeShowResetZoom", function () {
            var b = this.options,
                c = b.navigator,
                d = b.rangeSelector;
            if ((c && c.enabled || d && d.enabled) && (!a && "x" === b.chart.zoomType || a && "x" === b.chart.pinchType)) return !1
        }),
            k(h, "beforeRender", function () {
                var a = this.options;
                if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new r(this)
            }), k(h, "afterSetChartSize", function () {
                var a = this.legend,
                    b = this.navigator;
                if (b) {
                    var c = a && a.options;
                    var d = b.xAxis;
                    var e = b.yAxis;
                    var f = b.scrollbarHeight;
                    this.inverted ? (b.left = b.opposite ? this.chartWidth - f - b.height : this.spacing[3] + f, b.top = this.plotTop + f) : (b.left = g(d.left, this.plotLeft + f), b.top = b.navigatorOptions.top || this.chartHeight - b.height - f - this.spacing[2] - (this.rangeSelector &&
                        this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (c && "bottom" === c.verticalAlign && "proximate" !== c.layout && c.enabled && !c.floating ? a.legendHeight + g(c.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0));
                    d && e && (this.inverted ? d.options.left = e.options.left = b.left : d.options.top = e.options.top = b.top, d.setAxisSize(), e.setAxisSize())
                }
            }), k(h, "update", function (a) {
                var b = a.options.navigator || {},
                    c = a.options.scrollbar || {};
                this.navigator || this.scroller || !b.enabled && !c.enabled || (t(!0, this.options.navigator,
                    b), t(!0, this.options.scrollbar, c), delete a.options.navigator, delete a.options.scrollbar)
            }), k(h, "afterUpdate", function (a) {
                this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new r(this), g(a.redraw, !0) && this.redraw(a.animation))
            }), k(h, "afterAddSeries", function () {
                this.navigator && this.navigator.setBaseSeries(null, !1)
            }), k(q, "afterUpdate", function () {
                this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null,
                    !1)
            }), h.prototype.callbacks.push(function (a) {
                var b = a.navigator;
                b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
            }));
        E.Navigator = r;
        return E.Navigator
    });
    M(h, "Extensions/RangeSelector.js", [h["Core/Axis/Axis.js"], h["Core/Chart/Chart.js"], h["Core/Globals.js"], h["Core/DefaultOptions.js"], h["Core/Renderer/SVG/SVGElement.js"], h["Core/Utilities.js"]], function (e, h, A, E, v, H) {
        function D(a) {
            if (-1 !== a.indexOf("%L")) return "text";
            var b = "aAdewbBmoyY".split("").some(function (b) {
                return -1 !== a.indexOf("%" +
                    b)
            }),
                c = "HkIlMS".split("").some(function (b) {
                    return -1 !== a.indexOf("%" + b)
                });
            return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text"
        }
        var z = E.defaultOptions,
            q = H.addEvent,
            l = H.createElement,
            f = H.css,
            d = H.defined,
            a = H.destroyObjectProperties,
            p = H.discardElement,
            k = H.extend,
            F = H.find,
            B = H.fireEvent,
            J = H.isNumber,
            K = H.merge,
            L = H.objectEach,
            y = H.pad,
            C = H.pick,
            x = H.pInt,
            c = H.splat;
        k(z, {
            rangeSelector: {
                allButtonsEnabled: !1,
                buttons: void 0,
                buttonSpacing: 5,
                dropdown: "responsive",
                enabled: void 0,
                verticalAlign: "top",
                buttonTheme: {
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputBoxBorderColor: "none",
                inputBoxHeight: 17,
                inputBoxWidth: void 0,
                inputDateFormat: "%b %e, %Y",
                inputDateParser: void 0,
                inputEditDateFormat: "%Y-%m-%d",
                inputEnabled: !0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                inputSpacing: 5,
                selected: void 0,
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                inputStyle: {
                    color: "#335cad",
                    cursor: "pointer"
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        k(z.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "",
            rangeSelectorTo: "\u2192"
        });
        var t =
            function () {
                function g(a) {
                    this.buttons = void 0;
                    this.buttonOptions = g.prototype.defaultButtons;
                    this.initialButtonGroupWidth = 0;
                    this.options = void 0;
                    this.chart = a;
                    this.init(a)
                }
                g.prototype.clickButton = function (a, f) {
                    var b = this.chart,
                        g = this.buttonOptions[a],
                        h = b.xAxis[0],
                        k = b.scroller && b.scroller.getUnionExtremes() || h || {},
                        l = k.dataMin,
                        n = k.dataMax,
                        r = h && Math.round(Math.min(h.max, C(n, h.max))),
                        p = g.type;
                    k = g._range;
                    var t, u = g.dataGrouping;
                    if (null !== l && null !== n) {
                        b.fixedRange = k;
                        this.setSelected(a);
                        u && (this.forcedDataGrouping = !0, e.prototype.setDataGrouping.call(h || {
                            chart: this.chart
                        }, u, !1), this.frozenStates = g.preserveDataGrouping);
                        if ("month" === p || "year" === p)
                            if (h) {
                                p = {
                                    range: g,
                                    max: r,
                                    chart: b,
                                    dataMin: l,
                                    dataMax: n
                                };
                                var x = h.minFromRange.call(p);
                                J(p.newMax) && (r = p.newMax)
                            } else k = g;
                        else if (k) x = Math.max(r - k, l), r = Math.min(x + k, n);
                        else if ("ytd" === p)
                            if (h) "undefined" === typeof n && (l = Number.MAX_VALUE, n = Number.MIN_VALUE, b.series.forEach(function (a) {
                                a = a.xData;
                                l = Math.min(a[0], l);
                                n = Math.max(a[a.length - 1], n)
                            }), f = !1), r = this.getYTDExtremes(n, l,
                                b.time.useUTC), x = t = r.min, r = r.max;
                            else {
                                this.deferredYTDClick = a;
                                return
                            }
                        else "all" === p && h && (b.navigator && b.navigator.baseSeries[0] && (b.navigator.baseSeries[0].xAxis.options.range = void 0), x = l, r = n);
                        d(x) && (x += g._offsetMin);
                        d(r) && (r += g._offsetMax);
                        this.dropdown && (this.dropdown.selectedIndex = a + 1);
                        if (h) h.setExtremes(x, r, C(f, !0), void 0, {
                            trigger: "rangeSelectorButton",
                            rangeSelectorButton: g
                        });
                        else {
                            var v = c(b.options.xAxis)[0];
                            var y = v.range;
                            v.range = k;
                            var z = v.min;
                            v.min = t;
                            q(b, "load", function () {
                                v.range = y;
                                v.min = z
                            })
                        }
                        B(this,
                            "afterBtnClick")
                    }
                };
                g.prototype.setSelected = function (a) {
                    this.selected = this.options.selected = a
                };
                g.prototype.init = function (a) {
                    var b = this,
                        c = a.options.rangeSelector,
                        d = c.buttons || b.defaultButtons.slice(),
                        e = c.selected,
                        f = function () {
                            var a = b.minInput,
                                c = b.maxInput;
                            a && a.blur && B(a, "blur");
                            c && c.blur && B(c, "blur")
                        };
                    b.chart = a;
                    b.options = c;
                    b.buttons = [];
                    b.buttonOptions = d;
                    this.eventsToUnbind = [];
                    this.eventsToUnbind.push(q(a.container, "mousedown", f));
                    this.eventsToUnbind.push(q(a, "resize", f));
                    d.forEach(b.computeButtonRange);
                    "undefined" !== typeof e && d[e] && this.clickButton(e, !1);
                    this.eventsToUnbind.push(q(a, "load", function () {
                        a.xAxis && a.xAxis[0] && q(a.xAxis[0], "setExtremes", function (c) {
                            this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1)
                        })
                    }))
                };
                g.prototype.updateButtonStates = function () {
                    var a = this,
                        c = this.chart,
                        d = this.dropdown,
                        e = c.xAxis[0],
                        f = Math.round(e.max - e.min),
                        g = !e.hasVisibleSeries,
                        h = c.scroller && c.scroller.getUnionExtremes() ||
                            e,
                        k = h.dataMin,
                        l = h.dataMax;
                    c = a.getYTDExtremes(l, k, c.time.useUTC);
                    var n = c.min,
                        p = c.max,
                        q = a.selected,
                        t = J(q),
                        u = a.options.allButtonsEnabled,
                        x = a.buttons;
                    a.buttonOptions.forEach(function (b, c) {
                        var h = b._range,
                            m = b.type,
                            r = b.count || 1,
                            w = x[c],
                            v = 0,
                            y = b._offsetMax - b._offsetMin;
                        b = c === q;
                        var z = h > l - k,
                            A = h < e.minRange,
                            G = !1,
                            B = !1;
                        h = h === f;
                        ("month" === m || "year" === m) && f + 36E5 >= 864E5 * {
                            month: 28,
                            year: 365
                        }[m] * r - y && f - 36E5 <= 864E5 * {
                            month: 31,
                            year: 366
                        }[m] * r + y ? h = !0 : "ytd" === m ? (h = p - n + y === f, G = !b) : "all" === m && (h = e.max - e.min >= l - k, B = !b && t && h);
                        m = !u && (z || A || B || g);
                        r = b && h || h && !t && !G || b && a.frozenStates;
                        m ? v = 3 : r && (t = !0, v = 2);
                        w.state !== v && (w.setState(v), d && (d.options[c + 1].disabled = m, 2 === v && (d.selectedIndex = c + 1)), 0 === v && q === c && a.setSelected())
                    })
                };
                g.prototype.computeButtonRange = function (a) {
                    var b = a.type,
                        c = a.count || 1,
                        d = {
                            millisecond: 1,
                            second: 1E3,
                            minute: 6E4,
                            hour: 36E5,
                            day: 864E5,
                            week: 6048E5
                        };
                    if (d[b]) a._range = d[b] * c;
                    else if ("month" === b || "year" === b) a._range = 864E5 * {
                        month: 30,
                        year: 365
                    }[b] * c;
                    a._offsetMin = C(a.offsetMin, 0);
                    a._offsetMax = C(a.offsetMax, 0);
                    a._range +=
                        a._offsetMax - a._offsetMin
                };
                g.prototype.getInputValue = function (a) {
                    a = "min" === a ? this.minInput : this.maxInput;
                    var b = this.chart.options.rangeSelector,
                        c = this.chart.time;
                    return a ? ("text" === a.type && b.inputDateParser || this.defaultInputDateParser)(a.value, c.useUTC, c) : 0
                };
                g.prototype.setInputValue = function (a, c) {
                    var b = this.options,
                        e = this.chart.time,
                        f = "min" === a ? this.minInput : this.maxInput;
                    a = "min" === a ? this.minDateBox : this.maxDateBox;
                    if (f) {
                        var g = f.getAttribute("data-hc-time");
                        g = d(g) ? Number(g) : void 0;
                        d(c) && (d(g) &&
                            f.setAttribute("data-hc-time-previous", g), f.setAttribute("data-hc-time", c), g = c);
                        f.value = e.dateFormat(this.inputTypeFormats[f.type] || b.inputEditDateFormat, g);
                        a && a.attr({
                            text: e.dateFormat(b.inputDateFormat, g)
                        })
                    }
                };
                g.prototype.setInputExtremes = function (a, c, d) {
                    if (a = "min" === a ? this.minInput : this.maxInput) {
                        var b = this.inputTypeFormats[a.type],
                            e = this.chart.time;
                        b && (c = e.dateFormat(b, c), a.min !== c && (a.min = c), d = e.dateFormat(b, d), a.max !== d && (a.max = d))
                    }
                };
                g.prototype.showInput = function (a) {
                    var b = "min" === a ? this.minDateBox :
                        this.maxDateBox;
                    if ((a = "min" === a ? this.minInput : this.maxInput) && b && this.inputGroup) {
                        var c = "text" === a.type,
                            d = this.inputGroup,
                            e = d.translateX;
                        d = d.translateY;
                        var g = this.options.inputBoxWidth;
                        f(a, {
                            width: c ? b.width + (g ? -2 : 20) + "px" : "auto",
                            height: c ? b.height - 2 + "px" : "auto",
                            border: "2px solid silver"
                        });
                        c && g ? f(a, {
                            left: e + b.x + "px",
                            top: d + "px"
                        }) : f(a, {
                            left: Math.min(Math.round(b.x + e - (a.offsetWidth - b.width) / 2), this.chart.chartWidth - a.offsetWidth) + "px",
                            top: d - (a.offsetHeight - b.height) / 2 + "px"
                        })
                    }
                };
                g.prototype.hideInput = function (a) {
                    (a =
                        "min" === a ? this.minInput : this.maxInput) && f(a, {
                            top: "-9999em",
                            border: 0,
                            width: "1px",
                            height: "1px"
                        })
                };
                g.prototype.defaultInputDateParser = function (a, c, d) {
                    var b = a.split("/").join("-").split(" ").join("T"); - 1 === b.indexOf("T") && (b += "T00:00");
                    if (c) b += "Z";
                    else {
                        var e;
                        if (e = A.isSafari) e = b, e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length - 6));
                        e && (e = (new Date(b)).getTimezoneOffset() / 60, b += 0 >= e ? "+" + y(-e) + ":00" : "-" + y(e) + ":00")
                    }
                    b = Date.parse(b);
                    J(b) || (a = a.split("-"), b = Date.UTC(x(a[0]), x(a[1]) -
                        1, x(a[2])));
                    d && c && J(b) && (b += d.getTimezoneOffset(b));
                    return b
                };
                g.prototype.drawInput = function (a) {
                    function b() {
                        var b = g.getInputValue(a),
                            d = c.xAxis[0],
                            e = c.scroller && c.scroller.xAxis ? c.scroller.xAxis : d,
                            f = e.dataMin;
                        e = e.dataMax;
                        var h = g.maxInput,
                            k = g.minInput;
                        b !== Number(u.getAttribute("data-hc-time-previous")) && J(b) && (u.setAttribute("data-hc-time-previous", b), q && h && J(f) ? b > Number(h.getAttribute("data-hc-time")) ? b = void 0 : b < f && (b = f) : k && J(e) && (b < Number(k.getAttribute("data-hc-time")) ? b = void 0 : b > e && (b = e)), "undefined" !==
                            typeof b && d.setExtremes(q ? b : d.min, q ? d.max : b, void 0, void 0, {
                                trigger: "rangeSelectorInput"
                            }))
                    }
                    var c = this.chart,
                        d = this.div,
                        e = this.inputGroup,
                        g = this,
                        h = c.renderer.style || {},
                        n = c.renderer,
                        p = c.options.rangeSelector,
                        q = "min" === a,
                        t = z.lang[q ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
                    t = n.label(t, 0).addClass("highcharts-range-label").attr({
                        padding: t ? 2 : 0,
                        height: t ? p.inputBoxHeight : 0
                    }).add(e);
                    n = n.label("", 0).addClass("highcharts-range-input").attr({
                        padding: 2,
                        width: p.inputBoxWidth,
                        height: p.inputBoxHeight,
                        "text-align": "center"
                    }).on("click",
                        function () {
                            g.showInput(a);
                            g[a + "Input"].focus()
                        });
                    c.styledMode || n.attr({
                        stroke: p.inputBoxBorderColor,
                        "stroke-width": 1
                    });
                    n.add(e);
                    var u = l("input", {
                        name: a,
                        className: "highcharts-range-selector"
                    }, void 0, d);
                    u.setAttribute("type", D(p.inputDateFormat || "%b %e, %Y"));
                    c.styledMode || (t.css(K(h, p.labelStyle)), n.css(K({
                        color: "#333333"
                    }, h, p.inputStyle)), f(u, k({
                        position: "absolute",
                        border: 0,
                        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        textAlign: "center",
                        fontSize: h.fontSize,
                        fontFamily: h.fontFamily,
                        top: "-9999em"
                    }, p.inputStyle)));
                    u.onfocus = function () {
                        g.showInput(a)
                    };
                    u.onblur = function () {
                        u === A.doc.activeElement && b();
                        g.hideInput(a);
                        g.setInputValue(a);
                        u.blur()
                    };
                    var x = !1;
                    u.onchange = function () {
                        x || (b(), g.hideInput(a), u.blur())
                    };
                    u.onkeypress = function (a) {
                        13 === a.keyCode && b()
                    };
                    u.onkeydown = function (a) {
                        x = !0;
                        38 !== a.keyCode && 40 !== a.keyCode || b()
                    };
                    u.onkeyup = function () {
                        x = !1
                    };
                    return {
                        dateBox: n,
                        input: u,
                        label: t
                    }
                };
                g.prototype.getPosition = function () {
                    var a = this.chart,
                        c = a.options.rangeSelector;
                    a = "top" === c.verticalAlign ?
                        a.plotTop - a.axisOffset[0] : 0;
                    return {
                        buttonTop: a + c.buttonPosition.y,
                        inputTop: a + c.inputPosition.y - 10
                    }
                };
                g.prototype.getYTDExtremes = function (a, c, d) {
                    var b = this.chart.time,
                        e = new b.Date(a),
                        f = b.get("FullYear", e);
                    d = d ? b.Date.UTC(f, 0, 1) : +new b.Date(f, 0, 1);
                    c = Math.max(c, d);
                    e = e.getTime();
                    return {
                        max: Math.min(a || e, e),
                        min: c
                    }
                };
                g.prototype.render = function (a, c) {
                    var b = this.chart,
                        e = b.renderer,
                        f = b.container,
                        g = b.options,
                        h = g.rangeSelector,
                        k = C(g.chart.style && g.chart.style.zIndex, 0) + 1;
                    g = h.inputEnabled;
                    if (!1 !== h.enabled) {
                        this.rendered ||
                            (this.group = e.g("range-selector-group").attr({
                                zIndex: 7
                            }).add(), this.div = l("div", void 0, {
                                position: "relative",
                                height: 0,
                                zIndex: k
                            }), this.buttonOptions.length && this.renderButtons(), f.parentNode && f.parentNode.insertBefore(this.div, f), g && (this.inputGroup = e.g("input-group").add(this.group), e = this.drawInput("min"), this.minDateBox = e.dateBox, this.minLabel = e.label, this.minInput = e.input, e = this.drawInput("max"), this.maxDateBox = e.dateBox, this.maxLabel = e.label, this.maxInput = e.input));
                        if (g && (this.setInputValue("min",
                            a), this.setInputValue("max", c), a = b.scroller && b.scroller.getUnionExtremes() || b.xAxis[0] || {}, d(a.dataMin) && d(a.dataMax) && (b = b.xAxis[0].minRange || 0, this.setInputExtremes("min", a.dataMin, Math.min(a.dataMax, this.getInputValue("max")) - b), this.setInputExtremes("max", Math.max(a.dataMin, this.getInputValue("min")) + b, a.dataMax)), this.inputGroup)) {
                            var n = 0;
                            [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function (a) {
                                if (a) {
                                    var b = a.getBBox().width;
                                    b && (a.attr({
                                        x: n
                                    }), n += b + h.inputSpacing)
                                }
                            })
                        }
                        this.alignElements();
                        this.rendered = !0
                    }
                };
                g.prototype.renderButtons = function () {
                    var a = this,
                        c = this.buttons,
                        d = this.options,
                        e = z.lang,
                        f = this.chart.renderer,
                        g = K(d.buttonTheme),
                        h = g && g.states,
                        k = g.width || 28;
                    delete g.width;
                    delete g.states;
                    this.buttonGroup = f.g("range-selector-buttons").add(this.group);
                    var n = this.dropdown = l("select", void 0, {
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        border: 0,
                        top: "-9999em",
                        cursor: "pointer",
                        opacity: .0001
                    }, this.div);
                    q(n, "touchstart", function () {
                        n.style.fontSize = "16px"
                    });
                    [
                        [A.isMS ? "mouseover" :
                            "mouseenter"
                        ],
                        [A.isMS ? "mouseout" : "mouseleave"],
                        ["change", "click"]
                    ].forEach(function (b) {
                        var d = b[0],
                            e = b[1];
                        q(n, d, function () {
                            var b = c[a.currentButtonIndex()];
                            b && B(b.element, e || d)
                        })
                    });
                    this.zoomText = f.label(e && e.rangeSelectorZoom || "", 0).attr({
                        padding: d.buttonTheme.padding,
                        height: d.buttonTheme.height,
                        paddingLeft: 0,
                        paddingRight: 0
                    }).add(this.buttonGroup);
                    this.chart.styledMode || (this.zoomText.css(d.labelStyle), g["stroke-width"] = C(g["stroke-width"], 0));
                    l("option", {
                        textContent: this.zoomText.textStr,
                        disabled: !0
                    },
                        void 0, n);
                    this.buttonOptions.forEach(function (b, d) {
                        l("option", {
                            textContent: b.title || b.text
                        }, void 0, n);
                        c[d] = f.button(b.text, 0, 0, function (c) {
                            var e = b.events && b.events.click,
                                f;
                            e && (f = e.call(b, c));
                            !1 !== f && a.clickButton(d);
                            a.isActive = !0
                        }, g, h && h.hover, h && h.select, h && h.disabled).attr({
                            "text-align": "center",
                            width: k
                        }).add(a.buttonGroup);
                        b.title && c[d].attr("title", b.title)
                    })
                };
                g.prototype.alignElements = function () {
                    var a = this,
                        c = this.buttonGroup,
                        d = this.buttons,
                        e = this.chart,
                        f = this.group,
                        g = this.inputGroup,
                        h = this.options,
                        k = this.zoomText,
                        l = e.options,
                        n = l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions;
                    l = h.buttonPosition;
                    var p = h.inputPosition,
                        q = h.verticalAlign,
                        t = function (b, c) {
                            return n && a.titleCollision(e) && "top" === q && "right" === c.align && c.y - b.getBBox().height - 12 < (n.y || 0) + (n.height || 0) + e.spacing[0] ? -40 : 0
                        },
                        u = e.plotLeft;
                    if (f && l && p) {
                        var x = l.x - e.spacing[3];
                        if (c) {
                            this.positionButtons();
                            if (!this.initialButtonGroupWidth) {
                                var v = 0;
                                k && (v += k.getBBox().width + 5);
                                d.forEach(function (a, b) {
                                    v += a.width;
                                    b !==
                                        d.length - 1 && (v += h.buttonSpacing)
                                });
                                this.initialButtonGroupWidth = v
                            }
                            u -= e.spacing[3];
                            this.updateButtonStates();
                            k = t(c, l);
                            this.alignButtonGroup(k);
                            f.placed = c.placed = e.hasLoaded
                        }
                        c = 0;
                        g && (c = t(g, p), "left" === p.align ? x = u : "right" === p.align && (x = -Math.max(e.axisOffset[1], -c)), g.align({
                            y: p.y,
                            width: g.getBBox().width,
                            align: p.align,
                            x: p.x + x - 2
                        }, !0, e.spacingBox), g.placed = e.hasLoaded);
                        this.handleCollision(c);
                        f.align({
                            verticalAlign: q
                        }, !0, e.spacingBox);
                        g = f.alignAttr.translateY;
                        c = f.getBBox().height + 20;
                        t = 0;
                        "bottom" === q && (t =
                            (t = e.legend && e.legend.options) && "bottom" === t.verticalAlign && t.enabled && !t.floating ? e.legend.legendHeight + C(t.margin, 10) : 0, c = c + t - 20, t = g - c - (h.floating ? 0 : h.y) - (e.titleOffset ? e.titleOffset[2] : 0) - 10);
                        if ("top" === q) h.floating && (t = 0), e.titleOffset && e.titleOffset[0] && (t = e.titleOffset[0]), t += e.margin[0] - e.spacing[0] || 0;
                        else if ("middle" === q)
                            if (p.y === l.y) t = g;
                            else if (p.y || l.y) t = 0 > p.y || 0 > l.y ? t - Math.min(p.y, l.y) : g - c;
                        f.translate(h.x, h.y + Math.floor(t));
                        l = this.minInput;
                        p = this.maxInput;
                        g = this.dropdown;
                        h.inputEnabled &&
                            l && p && (l.style.marginTop = f.translateY + "px", p.style.marginTop = f.translateY + "px");
                        g && (g.style.marginTop = f.translateY + "px")
                    }
                };
                g.prototype.alignButtonGroup = function (a, c) {
                    var b = this.chart,
                        d = this.buttonGroup,
                        e = this.options.buttonPosition,
                        f = b.plotLeft - b.spacing[3],
                        g = e.x - b.spacing[3];
                    "right" === e.align ? g += a - f : "center" === e.align && (g -= f / 2);
                    d && d.align({
                        y: e.y,
                        width: C(c, this.initialButtonGroupWidth),
                        align: e.align,
                        x: g
                    }, !0, b.spacingBox)
                };
                g.prototype.positionButtons = function () {
                    var a = this.buttons,
                        c = this.chart,
                        d = this.options,
                        e = this.zoomText,
                        f = c.hasLoaded ? "animate" : "attr",
                        g = d.buttonPosition,
                        h = c.plotLeft,
                        k = h;
                    e && "hidden" !== e.visibility && (e[f]({
                        x: C(h + g.x, h)
                    }), k += g.x + e.getBBox().width + 5);
                    this.buttonOptions.forEach(function (b, c) {
                        if ("hidden" !== a[c].visibility) a[c][f]({
                            x: k
                        }), k += a[c].width + d.buttonSpacing;
                        else a[c][f]({
                            x: h
                        })
                    })
                };
                g.prototype.handleCollision = function (a) {
                    var b = this,
                        c = this.chart,
                        d = this.buttonGroup,
                        e = this.inputGroup,
                        f = this.options,
                        g = f.buttonPosition,
                        h = f.dropdown,
                        k = f.inputPosition;
                    f = function () {
                        var a = 0;
                        b.buttons.forEach(function (b) {
                            b =
                                b.getBBox();
                            b.width > a && (a = b.width)
                        });
                        return a
                    };
                    var l = function (b) {
                        if (e && d) {
                            var c = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2,
                                f = e.alignOptions.width,
                                h = d.alignAttr.translateX + d.getBBox().x;
                            return h + b > c && c + f > h && g.y < k.y + e.getBBox().height
                        }
                        return !1
                    },
                        n = function () {
                            e && d && e.attr({
                                translateX: e.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a),
                                translateY: e.alignAttr.translateY + d.getBBox().height + 10
                            })
                        };
                    if (d) {
                        if ("always" === h) {
                            this.collapseButtons(a);
                            l(f()) && n();
                            return
                        }
                        "never" === h && this.expandButtons()
                    }
                    e &&
                        d ? k.align === g.align || l(this.initialButtonGroupWidth + 20) ? "responsive" === h ? (this.collapseButtons(a), l(f()) && n()) : n() : "responsive" === h && this.expandButtons() : d && "responsive" === h && (this.initialButtonGroupWidth > c.plotWidth ? this.collapseButtons(a) : this.expandButtons())
                };
                g.prototype.collapseButtons = function (a) {
                    var b = this.buttons,
                        c = this.buttonOptions,
                        d = this.chart,
                        e = this.dropdown,
                        f = this.options,
                        g = this.zoomText,
                        h = d.userOptions.rangeSelector && d.userOptions.rangeSelector.buttonTheme || {},
                        k = function (a) {
                            return {
                                text: a ?
                                    a + " \u25be" : "\u25be",
                                width: "auto",
                                paddingLeft: C(f.buttonTheme.paddingLeft, h.padding, 8),
                                paddingRight: C(f.buttonTheme.paddingRight, h.padding, 8)
                            }
                        };
                    g && g.hide();
                    var l = !1;
                    c.forEach(function (a, c) {
                        c = b[c];
                        2 !== c.state ? c.hide() : (c.show(), c.attr(k(a.text)), l = !0)
                    });
                    l || (e && (e.selectedIndex = 0), b[0].show(), b[0].attr(k(this.zoomText && this.zoomText.textStr)));
                    c = f.buttonPosition.align;
                    this.positionButtons();
                    "right" !== c && "center" !== c || this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
                    this.showDropdown()
                };
                g.prototype.expandButtons = function () {
                    var a = this.buttons,
                        c = this.buttonOptions,
                        d = this.options,
                        e = this.zoomText;
                    this.hideDropdown();
                    e && e.show();
                    c.forEach(function (b, c) {
                        c = a[c];
                        c.show();
                        c.attr({
                            text: b.text,
                            width: d.buttonTheme.width || 28,
                            paddingLeft: C(d.buttonTheme.paddingLeft, "unset"),
                            paddingRight: C(d.buttonTheme.paddingRight, "unset")
                        });
                        2 > c.state && c.setState(0)
                    });
                    this.positionButtons()
                };
                g.prototype.currentButtonIndex = function () {
                    var a = this.dropdown;
                    return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
                };
                g.prototype.showDropdown =
                    function () {
                        var a = this.buttonGroup,
                            c = this.buttons,
                            d = this.chart,
                            e = this.dropdown;
                        if (a && e) {
                            var g = a.translateX;
                            a = a.translateY;
                            c = c[this.currentButtonIndex()].getBBox();
                            f(e, {
                                left: d.plotLeft + g + "px",
                                top: a + .5 + "px",
                                width: c.width + "px",
                                height: c.height + "px"
                            });
                            this.hasVisibleDropdown = !0
                        }
                    };
                g.prototype.hideDropdown = function () {
                    var a = this.dropdown;
                    a && (f(a, {
                        top: "-9999em",
                        width: "1px",
                        height: "1px"
                    }), this.hasVisibleDropdown = !1)
                };
                g.prototype.getHeight = function () {
                    var a = this.options,
                        c = this.group,
                        d = a.y,
                        e = a.buttonPosition.y,
                        f = a.inputPosition.y;
                    if (a.height) return a.height;
                    this.alignElements();
                    a = c ? c.getBBox(!0).height + 13 + d : 0;
                    c = Math.min(f, e);
                    if (0 > f && 0 > e || 0 < f && 0 < e) a += Math.abs(c);
                    return a
                };
                g.prototype.titleCollision = function (a) {
                    return !(a.options.title.text || a.options.subtitle.text)
                };
                g.prototype.update = function (a) {
                    var b = this.chart;
                    K(!0, b.options.rangeSelector, a);
                    this.destroy();
                    this.init(b);
                    this.render()
                };
                g.prototype.destroy = function () {
                    var b = this,
                        c = b.minInput,
                        d = b.maxInput;
                    b.eventsToUnbind && (b.eventsToUnbind.forEach(function (a) {
                        return a()
                    }),
                        b.eventsToUnbind = void 0);
                    a(b.buttons);
                    c && (c.onfocus = c.onblur = c.onchange = null);
                    d && (d.onfocus = d.onblur = d.onchange = null);
                    L(b, function (a, c) {
                        a && "chart" !== c && (a instanceof v ? a.destroy() : a instanceof window.HTMLElement && p(a));
                        a !== g.prototype[c] && (b[c] = null)
                    }, this)
                };
                return g
            }();
        t.prototype.defaultButtons = [{
            type: "month",
            count: 1,
            text: "1m",
            title: "View 1 month"
        }, {
            type: "month",
            count: 3,
            text: "3m",
            title: "View 3 months"
        }, {
            type: "month",
            count: 6,
            text: "6m",
            title: "View 6 months"
        }, {
            type: "ytd",
            text: "YTD",
            title: "View year to date"
        },
        {
            type: "year",
            count: 1,
            text: "1y",
            title: "View 1 year"
        }, {
            type: "all",
            text: "All",
            title: "View all"
        }
        ];
        t.prototype.inputTypeFormats = {
            "datetime-local": "%Y-%m-%dT%H:%M:%S",
            date: "%Y-%m-%d",
            time: "%H:%M:%S"
        };
        e.prototype.minFromRange = function () {
            var a = this.range,
                b = a.type,
                c = this.max,
                d = this.chart.time,
                e = function (a, c) {
                    var e = "year" === b ? "FullYear" : "Month",
                        f = new d.Date(a),
                        g = d.get(e, f);
                    d.set(e, f, g + c);
                    g === d.get(e, f) && d.set("Date", f, 0);
                    return f.getTime() - a
                };
            if (J(a)) {
                var f = c - a;
                var g = a
            } else f = c + e(c, -a.count), this.chart && (this.chart.fixedRange =
                c - f);
            var h = C(this.dataMin, Number.MIN_VALUE);
            J(f) || (f = h);
            f <= h && (f = h, "undefined" === typeof g && (g = e(f, a.count)), this.newMax = Math.min(f + g, this.dataMax));
            J(c) || (f = void 0);
            return f
        };
        if (!A.RangeSelector) {
            var g = [],
                u = function (a) {
                    function b() {
                        d && (c = a.xAxis[0].getExtremes(), e = a.legend, h = d && d.options.verticalAlign, J(c.min) && d.render(c.min, c.max), e.display && "top" === h && h === e.options.verticalAlign && (f = K(a.spacingBox), f.y = "vertical" === e.options.layout ? a.plotTop : f.y + d.getHeight(), e.group.placed = !1, e.align(f)))
                    }
                    var c,
                        d = a.rangeSelector,
                        e, f, h;
                    d && (F(g, function (b) {
                        return b[0] === a
                    }) || g.push([a, [q(a.xAxis[0], "afterSetExtremes", function (a) {
                        d && d.render(a.min, a.max)
                    }), q(a, "redraw", b)]]), b())
                };
            q(h, "afterGetContainer", function () {
                this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new t(this))
            });
            q(h, "beforeRender", function () {
                var a = this.axes,
                    b = this.rangeSelector;
                b && (J(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick), a.forEach(function (a) {
                    a.updateNames();
                    a.setScale()
                }),
                    this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
            });
            q(h, "update", function (a) {
                var b = a.options.rangeSelector;
                a = this.rangeSelector;
                var c = this.extraBottomMargin,
                    e = this.extraTopMargin;
                b && b.enabled && !d(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0, this.rangeSelector = a = new t(this));
                this.extraTopMargin = this.extraBottomMargin = !1;
                a && (u(this), b = b && b.verticalAlign || a.options &&
                    a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== c || this.extraTopMargin !== e) && (this.isDirtyBox = !0)
            });
            q(h, "render", function () {
                var a = this.rangeSelector;
                a && !a.options.floating && (a.render(), a = a.options.verticalAlign, "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
            });
            q(h, "getMargins", function () {
                var a = this.rangeSelector;
                a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop +=
                    a), this.extraBottomMargin && (this.marginBottom += a))
            });
            h.prototype.callbacks.push(u);
            q(h, "destroy", function () {
                for (var a = 0; a < g.length; a++) {
                    var b = g[a];
                    if (b[0] === this) {
                        b[1].forEach(function (a) {
                            return a()
                        });
                        g.splice(a, 1);
                        break
                    }
                }
            });
            A.RangeSelector = t
        }
        return t
    });
    M(h, "Core/Chart/StockChart.js", [h["Core/Animation/AnimationUtilities.js"], h["Core/Axis/Axis.js"], h["Core/Chart/Chart.js"], h["Core/FormatUtilities.js"], h["Core/DefaultOptions.js"], h["Core/Series/Series.js"], h["Core/Renderer/SVG/SVGRenderer.js"], h["Core/Utilities.js"]],
        function (e, h, A, E, v, H, I, z) {
            function q(a, c) {
                return "xAxis" === a ? {
                    minPadding: 0,
                    maxPadding: 0,
                    overscroll: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                } : "yAxis" === a ? {
                    labels: {
                        y: -2
                    },
                    opposite: y(c.opposite, !0),
                    showLastLabel: !(!c.categories && "category" !== c.type),
                    title: {
                        text: null
                    }
                } : {}
            }

            function l(d, c) {
                if ("xAxis" === d) {
                    d = a();
                    var e = {
                        type: "datetime",
                        categories: void 0
                    };
                    y(c.navigator && c.navigator.enabled, d.navigator.enabled, !0) && (e.startOnTick = !1, e.endOnTick = !1);
                    return e
                }
                return {}
            }
            var f = this &&
                this.__extends || function () {
                    var a = function (c, d) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                            instanceof Array && function (a, c) {
                                a.__proto__ = c
                            } || function (a, c) {
                                for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                            };
                        return a(c, d)
                    };
                    return function (c, d) {
                        function e() {
                            this.constructor = c
                        }
                        a(c, d);
                        c.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e)
                    }
                }(),
                d = E.format,
                a = v.getOptions;
            e = z.addEvent;
            var p = z.clamp,
                k = z.defined,
                D = z.extend,
                B = z.find,
                J = z.isNumber,
                K = z.isString,
                L = z.merge,
                y = z.pick,
                C = z.splat;
            z = function (d) {
                function c() {
                    return null !==
                        d && d.apply(this, arguments) || this
                }
                f(c, d);
                c.prototype.init = function (c, e) {
                    var f = a(),
                        g = c.xAxis,
                        b = c.yAxis,
                        h = y(c.navigator && c.navigator.enabled, f.navigator.enabled, !0);
                    c.xAxis = c.yAxis = void 0;
                    h = L({
                        chart: {
                            panning: {
                                enabled: !0,
                                type: "x"
                            },
                            pinchType: "x"
                        },
                        navigator: {
                            enabled: h
                        },
                        scrollbar: {
                            enabled: y(f.scrollbar && f.scrollbar.enabled, !0)
                        },
                        rangeSelector: {
                            enabled: y(f.rangeSelector.enabled, !0)
                        },
                        title: {
                            text: null
                        },
                        tooltip: {
                            split: y(f.tooltip.split, !0),
                            crosshairs: !0
                        },
                        legend: {
                            enabled: !1
                        }
                    }, c, {
                        isStock: !0
                    });
                    c.xAxis = g;
                    c.yAxis =
                        b;
                    h.xAxis = C(c.xAxis || {}).map(function (a, b) {
                        return L(q("xAxis", a), f.xAxis, f.xAxis && f.xAxis[b], a, l("xAxis", c))
                    });
                    h.yAxis = C(c.yAxis || {}).map(function (a, b) {
                        return L(q("yAxis", a), f.yAxis, f.yAxis && f.yAxis[b], a)
                    });
                    d.prototype.init.call(this, h, e)
                };
                c.prototype.createAxis = function (a, c) {
                    c.axis = L(q(a, c.axis), c.axis, l(a, this.userOptions));
                    return d.prototype.createAxis.call(this, a, c)
                };
                return c
            }(A);
            (function (a) {
                a.stockChart = function (c, d, e) {
                    return new a(c, d, e)
                }
            })(z || (z = {}));
            e(H, "setOptions", function (a) {
                var c;
                this.chart.options.isStock &&
                    (this.is("column") || this.is("columnrange") ? c = {
                        borderWidth: 0,
                        shadow: !1
                    } : this.is("scatter") || this.is("sma") || (c = {
                        marker: {
                            enabled: !1,
                            radius: 2
                        }
                    }), c && (a.plotOptions[this.type] = L(a.plotOptions[this.type], c)))
            });
            e(h, "autoLabelAlign", function (a) {
                var c = this.chart,
                    d = this.options;
                c = c._labelPanes = c._labelPanes || {};
                var e = this.options.labels;
                this.chart.options.isStock && "yAxis" === this.coll && (d = d.top + "," + d.height, !c[d] && e.enabled && (15 === e.x && (e.x = 0), "undefined" === typeof e.align && (e.align = "right"), c[d] = this, a.align =
                    "right", a.preventDefault()))
            });
            e(h, "destroy", function () {
                var a = this.chart,
                    c = this.options && this.options.top + "," + this.options.height;
                c && a._labelPanes && a._labelPanes[c] === this && delete a._labelPanes[c]
            });
            e(h, "getPlotLinePath", function (a) {
                function c(a) {
                    var b = "xAxis" === a ? "yAxis" : "xAxis";
                    a = d.options[b];
                    return J(a) ? [f[b][a]] : K(a) ? [f.get(a)] : e.map(function (a) {
                        return a[b]
                    })
                }
                var d = this,
                    e = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                    f = d.chart,
                    h = f.renderer,
                    b = d.left,
                    l = d.top,
                    q, m, w, v, x = [],
                    z = [],
                    A = a.translatedValue,
                    C = a.value,
                    D = a.force;
                if (f.options.isStock && !1 !== a.acrossPanes && "xAxis" === d.coll || "yAxis" === d.coll) {
                    a.preventDefault();
                    z = c(d.coll);
                    var E = d.isXAxis ? f.yAxis : f.xAxis;
                    E.forEach(function (a) {
                        if (k(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                            var b = a.isXAxis ? "yAxis" : "xAxis";
                            b = k(a.options[b]) ? f[b][a.options[b]] : f[b][0];
                            d === b && z.push(a)
                        }
                    });
                    var F = z.length ? [] : [d.isXAxis ? f.yAxis[0] : f.xAxis[0]];
                    z.forEach(function (a) {
                        -1 !== F.indexOf(a) || B(F, function (b) {
                            return b.pos === a.pos && b.len === a.len
                        }) ||
                            F.push(a)
                    });
                    var H = y(A, d.translate(C, null, null, a.old));
                    J(H) && (d.horiz ? F.forEach(function (a) {
                        var c;
                        m = a.pos;
                        v = m + a.len;
                        q = w = Math.round(H + d.transB);
                        "pass" !== D && (q < b || q > b + d.width) && (D ? q = w = p(q, b, b + d.width) : c = !0);
                        c || x.push(["M", q, m], ["L", w, v])
                    }) : F.forEach(function (a) {
                        var b;
                        q = a.pos;
                        w = q + a.len;
                        m = v = Math.round(l + d.height - H);
                        "pass" !== D && (m < l || m > l + d.height) && (D ? m = v = p(m, l, l + d.height) : b = !0);
                        b || x.push(["M", q, m], ["L", w, v])
                    }));
                    a.path = 0 < x.length ? h.crispPolyLine(x, a.lineWidth || 1) : null
                }
            });
            I.prototype.crispPolyLine = function (a,
                c) {
                for (var d = 0; d < a.length; d += 2) {
                    var e = a[d],
                        f = a[d + 1];
                    e[1] === f[1] && (e[1] = f[1] = Math.round(e[1]) - c % 2 / 2);
                    e[2] === f[2] && (e[2] = f[2] = Math.round(e[2]) + c % 2 / 2)
                }
                return a
            };
            e(h, "afterHideCrosshair", function () {
                this.crossLabel && (this.crossLabel = this.crossLabel.hide())
            });
            e(h, "afterDrawCrosshair", function (a) {
                var c, e;
                if (this.crosshair && this.crosshair.label && this.crosshair.label.enabled && this.cross && J(this.min) && J(this.max)) {
                    var f = this.chart,
                        h = this.logarithmic,
                        k = this.crosshair.label,
                        b = this.horiz,
                        l = this.opposite,
                        p = this.left,
                        m = this.top,
                        q = this.crossLabel,
                        v = k.format,
                        x = "",
                        z = "inside" === this.options.tickPosition,
                        A = !1 !== this.crosshair.snap,
                        B = 0,
                        C = a.e || this.cross && this.cross.e;
                    a = a.point;
                    var E = this.min,
                        F = this.max;
                    h && (E = h.lin2log(E), F = h.lin2log(F));
                    h = b ? "center" : l ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                    q || (q = this.crossLabel = f.renderer.label("", 0, void 0, k.shape || "callout").addClass("highcharts-crosshair-label highcharts-color-" + (a ? a.series.colorIndex : this.series[0] && this.series[0].colorIndex)).attr({
                        align: k.align ||
                            h,
                        padding: y(k.padding, 8),
                        r: y(k.borderRadius, 3),
                        zIndex: 2
                    }).add(this.labelGroup), f.styledMode || q.attr({
                        fill: k.backgroundColor || a && a.series && a.series.color || "#666666",
                        stroke: k.borderColor || "",
                        "stroke-width": k.borderWidth || 0
                    }).css(D({
                        color: "#ffffff",
                        fontWeight: "normal",
                        fontSize: "11px",
                        textAlign: "center"
                    }, k.style || {})));
                    b ? (h = A ? (a.plotX || 0) + p : C.chartX, m += l ? 0 : this.height) : (h = l ? this.width + p : 0, m = A ? (a.plotY || 0) + m : C.chartY);
                    v || k.formatter || (this.dateTime && (x = "%b %d, %Y"), v = "{value" + (x ? ":" + x : "") + "}");
                    x = A ? this.isXAxis ?
                        a.x : a.y : this.toValue(b ? C.chartX : C.chartY);
                    A = a ? a.series.isPointInside(a) : J(x) && x > E && x < F;
                    C = "";
                    v ? C = d(v, {
                        value: x
                    }, f) : k.formatter && J(x) && (C = k.formatter.call(this, x));
                    q.attr({
                        text: C,
                        x: h,
                        y: m,
                        visibility: A ? "visible" : "hidden"
                    });
                    k = q.getBBox();
                    if (J(q.y))
                        if (b) {
                            if (z && !l || !z && l) m = q.y - k.height
                        } else m = q.y - k.height / 2;
                    b ? (c = p - k.x, e = p + this.width - k.x) : (c = "left" === this.labelAlign ? p : 0, e = "right" === this.labelAlign ? p + this.width : f.chartWidth);
                    q.translateX < c && (B = c - q.translateX);
                    q.translateX + k.width >= e && (B = -(q.translateX + k.width -
                        e));
                    q.attr({
                        x: h + B,
                        y: m,
                        anchorX: b ? h : this.opposite ? 0 : f.chartWidth,
                        anchorY: b ? this.opposite ? f.chartHeight : 0 : m + k.height / 2
                    })
                }
            });
            H.prototype.forceCropping = function () {
                var a = this.chart,
                    c = this.options.dataGrouping;
                return !1 !== this.allowDG && c && y(c.enabled, a.options.isStock)
            };
            e(A, "update", function (a) {
                a = a.options;
                "scrollbar" in a && this.navigator && (L(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar)
            });
            return z
        });
    M(h, "masters/modules/stock.src.js", [h["Core/Globals.js"], h["Core/Axis/OrdinalAxis.js"],
    h["Series/DataModifyComposition.js"], h["Core/Scrollbar.js"], h["Core/Chart/StockChart.js"]
    ], function (e, h, A, E, v) {
        e.Scrollbar = E;
        e.StockChart = e.stockChart = v.stockChart;
        E.compose(e.Axis);
        h.compose(e.Axis, e.Series, e.Chart);
        A.compose(e.Series, e.Axis, e.Point)
    });
    M(h, "masters/highstock.src.js", [h["masters/highcharts.src.js"]], function (e) {
        e.product = "Highstock";
        return e
    });
    h["masters/highstock.src.js"]._modules = h;
    return h["masters/highstock.src.js"]
});
//# sourceMappingURL=highstock.js.map