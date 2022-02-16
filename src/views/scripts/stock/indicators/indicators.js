/*
 Highstock JS v9.3.0 (2021-10-21)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawel Fus, Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/indicators/indicators", ["highcharts", "highcharts/modules/stock"], function (h) {
        a(h);
        a.Highcharts = h;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function h(a, c, l, h) {
        a.hasOwnProperty(c) || (a[c] = h.apply(null, l))
    }
    a = a ? a._modules : {};
    h(a, "Stock/Indicators/SMA/SMAComposition.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
        function (a, c) { });
    h(a, "Stock/Indicators/SMA/SMAIndicator.js", [a["Core/Chart/Chart.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, c, l) {
        var h = this && this.__extends || function () {
            var a = function (e, b) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (b, f) {
                        b.__proto__ = f
                    } || function (b, f) {
                        for (var d in f) f.hasOwnProperty(d) && (b[d] = f[d])
                    };
                return a(e, b)
            };
            return function (e, b) {
                function d() {
                    this.constructor = e
                }
                a(e, b);
                e.prototype = null === b ? Object.create(b) : (d.prototype = b.prototype,
                    new d)
            }
        }(),
            r = c.seriesTypes.line,
            q = l.addEvent,
            t = l.error,
            u = l.extend,
            v = l.isArray,
            e = l.merge,
            g = l.pick,
            n = l.splat;
        l = function (m) {
            function k() {
                var b = null !== m && m.apply(this, arguments) || this;
                b.data = void 0;
                b.dataEventsToUnbind = void 0;
                b.linkedParent = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            h(k, m);
            k.prototype.destroy = function () {
                this.dataEventsToUnbind.forEach(function (b) {
                    b()
                });
                m.prototype.destroy.apply(this, arguments)
            };
            k.prototype.getName = function () {
                var b = this.name,
                    d = [];
                b || ((this.nameComponents || []).forEach(function (b,
                    e) {
                    d.push(this.options.params[b] + g(this.nameSuffixes[e], ""))
                }, this), b = (this.nameBase || this.type.toUpperCase()) + (this.nameComponents ? " (" + d.join(", ") + ")" : ""));
                return b
            };
            k.prototype.getValues = function (b, d) {
                var f = d.period,
                    e = b.xData;
                b = b.yData;
                var a = b.length,
                    g = 0,
                    n = 0,
                    k = [],
                    m = [],
                    l = [],
                    c = -1;
                if (!(e.length < f)) {
                    for (v(b[0]) && (c = d.index ? d.index : 0); g < f - 1;) n += 0 > c ? b[g] : b[g][c], g++;
                    for (d = g; d < a; d++) {
                        n += 0 > c ? b[d] : b[d][c];
                        var h = [e[d], n / f];
                        k.push(h);
                        m.push(h[0]);
                        l.push(h[1]);
                        n -= 0 > c ? b[d - g] : b[d - g][c]
                    }
                    return {
                        values: k,
                        xData: m,
                        yData: l
                    }
                }
            };
            k.prototype.init = function (b, d) {
                var f = this;
                m.prototype.init.call(f, b, d);
                d = q(a, "afterLinkSeries", function () {
                    var d = !!f.dataEventsToUnbind.length;
                    if (f.linkedParent)
                        if (d || f.dataEventsToUnbind.push(q(f.bindTo.series ? f.linkedParent : f.linkedParent.xAxis, f.bindTo.eventName, function () {
                            f.recalculateValues()
                        })), "init" === f.calculateOn) f.processedYData || f.recalculateValues();
                        else {
                            if (!d) var e = q(f.chart, f.calculateOn, function () {
                                f.recalculateValues();
                                e()
                            })
                        }
                    else return t("Series " + f.options.linkedTo + " not found! Check `linkedTo`.",
                        !1, b)
                }, {
                    order: 0
                });
                f.dataEventsToUnbind = [];
                f.eventsToUnbind.push(d)
            };
            k.prototype.recalculateValues = function () {
                var b = this.points || [],
                    d = (this.xData || []).length,
                    f = this.getValues(this.linkedParent, this.options.params) || {
                        values: [],
                        xData: [],
                        yData: []
                    },
                    e = [],
                    a = !0;
                if (d && !this.hasGroupedData && this.visible && this.points)
                    if (this.cropped) {
                        if (this.xAxis) {
                            var g = this.xAxis.min;
                            var k = this.xAxis.max
                        }
                        d = this.cropData(f.xData, f.yData, g, k);
                        for (g = 0; g < d.xData.length; g++) e.push([d.xData[g]].concat(n(d.yData[g])));
                        d = f.xData.indexOf(this.xData[0]);
                        g = f.xData.indexOf(this.xData[this.xData.length - 1]); - 1 === d && g === f.xData.length - 2 && e[0][0] === b[0].x && e.shift();
                        this.updateData(e)
                    } else f.xData.length !== d - 1 && f.xData.length !== d + 1 && (a = !1, this.updateData(f.values));
                a && (this.xData = f.xData, this.yData = f.yData, this.options.data = f.values);
                !1 === this.bindTo.series && (delete this.processedXData, this.isDirty = !0, this.redraw());
                this.isDirtyData = !1
            };
            k.prototype.processData = function () {
                var b = this.options.compareToMain,
                    d = this.linkedParent;
                m.prototype.processData.apply(this,
                    arguments);
                this.dataModify && d && d.dataModify && d.dataModify.compareValue && b && (this.dataModify.compareValue = d.dataModify.compareValue)
            };
            k.defaultOptions = e(r.defaultOptions, {
                name: void 0,
                tooltip: {
                    valueDecimals: 4
                },
                linkedTo: void 0,
                compareToMain: !1,
                params: {
                    index: 3,
                    period: 14
                }
            });
            return k
        }(r);
        u(l.prototype, {
            bindTo: {
                series: !0,
                eventName: "updatedData"
            },
            calculateOn: "init",
            hasDerivedData: !0,
            nameComponents: ["period"],
            nameSuffixes: [],
            useCommonDataGrouping: !0
        });
        c.registerSeriesType("sma", l);
        "";
        return l
    });
    h(a, "Stock/Indicators/EMA/EMAIndicator.js",
        [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
        function (a, c) {
            var l = this && this.__extends || function () {
                var a = function (c, e) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                        instanceof Array && function (e, a) {
                            e.__proto__ = a
                        } || function (e, a) {
                            for (var g in a) a.hasOwnProperty(g) && (e[g] = a[g])
                        };
                    return a(c, e)
                };
                return function (c, e) {
                    function g() {
                        this.constructor = c
                    }
                    a(c, e);
                    c.prototype = null === e ? Object.create(e) : (g.prototype = e.prototype, new g)
                }
            }(),
                h = a.seriesTypes.sma,
                r = c.correctFloat,
                q = c.isArray,
                t = c.merge;
            c = function (a) {
                function c() {
                    var e =
                        null !== a && a.apply(this, arguments) || this;
                    e.data = void 0;
                    e.options = void 0;
                    e.points = void 0;
                    return e
                }
                l(c, a);
                c.prototype.accumulatePeriodPoints = function (a, g, c) {
                    for (var e = 0, k = 0, b; k < a;) b = 0 > g ? c[k] : c[k][g], e += b, k++;
                    return e
                };
                c.prototype.calculateEma = function (a, g, c, h, k, b, d) {
                    a = a[c - 1];
                    g = 0 > b ? g[c - 1] : g[c - 1][b];
                    h = "undefined" === typeof k ? d : r(g * h + k * (1 - h));
                    return [a, h]
                };
                c.prototype.getValues = function (a, c) {
                    var e = c.period,
                        g = a.xData,
                        k = (a = a.yData) ? a.length : 0,
                        b = 2 / (e + 1),
                        d = [],
                        f = [],
                        h = [],
                        l = -1;
                    if (!(k < e)) {
                        q(a[0]) && (l = c.index ? c.index :
                            0);
                        c = this.accumulatePeriodPoints(e, l, a);
                        for (c /= e; e < k + 1; e++) {
                            var p = this.calculateEma(g, a, e, b, p, l, c);
                            d.push(p);
                            f.push(p[0]);
                            h.push(p[1]);
                            p = p[1]
                        }
                        return {
                            values: d,
                            xData: f,
                            yData: h
                        }
                    }
                };
                c.defaultOptions = t(h.defaultOptions, {
                    params: {
                        index: 3,
                        period: 9
                    }
                });
                return c
            }(h);
            a.registerSeriesType("ema", c);
            "";
            return c
        });
    h(a, "masters/indicators/indicators.src.js", [], function () { })
});
//# sourceMappingURL=indicators.js.map