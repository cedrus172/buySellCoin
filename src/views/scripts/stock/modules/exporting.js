/*
 Highcharts JS v9.3.0 (2021-10-21)

 Exporting module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/exporting", ["highcharts"], function (h) {
        a(h);
        a.Highcharts = h;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function h(a, k, n, f) {
        a.hasOwnProperty(k) || (a[k] = f.apply(null, n))
    }
    a = a ? a._modules : {};
    h(a, "Extensions/FullScreen.js", [a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/Renderer/HTML/AST.js"], a["Core/Utilities.js"]],
        function (a, k, n, f) {
            var g = f.addEvent;
            f = function () {
                function a(d) {
                    this.chart = d;
                    this.isOpen = !1;
                    d = d.renderTo;
                    this.browserProps || ("function" === typeof d.requestFullscreen ? this.browserProps = {
                        fullscreenChange: "fullscreenchange",
                        requestFullscreen: "requestFullscreen",
                        exitFullscreen: "exitFullscreen"
                    } : d.mozRequestFullScreen ? this.browserProps = {
                        fullscreenChange: "mozfullscreenchange",
                        requestFullscreen: "mozRequestFullScreen",
                        exitFullscreen: "mozCancelFullScreen"
                    } : d.webkitRequestFullScreen ? this.browserProps = {
                        fullscreenChange: "webkitfullscreenchange",
                        requestFullscreen: "webkitRequestFullScreen",
                        exitFullscreen: "webkitExitFullscreen"
                    } : d.msRequestFullscreen && (this.browserProps = {
                        fullscreenChange: "MSFullscreenChange",
                        requestFullscreen: "msRequestFullscreen",
                        exitFullscreen: "msExitFullscreen"
                    }))
                }
                a.prototype.close = function () {
                    var d = this.chart,
                        a = d.options.chart;
                    if (this.isOpen && this.browserProps && d.container.ownerDocument instanceof Document) d.container.ownerDocument[this.browserProps.exitFullscreen]();
                    this.unbindFullscreenEvent && (this.unbindFullscreenEvent =
                        this.unbindFullscreenEvent());
                    d.setSize(this.origWidth, this.origHeight, !1);
                    this.origHeight = this.origWidth = void 0;
                    a.width = this.origWidthOption;
                    a.height = this.origHeightOption;
                    this.origHeightOption = this.origWidthOption = void 0;
                    this.isOpen = !1;
                    this.setButtonText()
                };
                a.prototype.open = function () {
                    var d = this,
                        a = d.chart,
                        b = a.options.chart;
                    b && (d.origWidthOption = b.width, d.origHeightOption = b.height);
                    d.origWidth = a.chartWidth;
                    d.origHeight = a.chartHeight;
                    if (d.browserProps) {
                        var p = g(a.container.ownerDocument, d.browserProps.fullscreenChange,
                            function () {
                                d.isOpen ? (d.isOpen = !1, d.close()) : (a.setSize(null, null, !1), d.isOpen = !0, d.setButtonText())
                            }),
                            f = g(a, "destroy", p);
                        d.unbindFullscreenEvent = function () {
                            p();
                            f()
                        };
                        if (b = a.renderTo[d.browserProps.requestFullscreen]()) b["catch"](function () {
                            alert("Full screen is not supported inside a frame.")
                        })
                    }
                };
                a.prototype.setButtonText = function () {
                    var d = this.chart,
                        a = d.exportDivElements,
                        b = d.options.exporting,
                        p = b && b.buttons && b.buttons.contextButton.menuItems;
                    d = d.options.lang;
                    b && b.menuItemDefinitions && d && d.exitFullscreen &&
                        d.viewFullscreen && p && a && (a = a[p.indexOf("viewFullscreen")]) && n.setElementHTML(a, this.isOpen ? d.exitFullscreen : b.menuItemDefinitions.viewFullscreen.text || d.viewFullscreen)
                };
                a.prototype.toggle = function () {
                    this.isOpen ? this.close() : this.open()
                };
                return a
            }();
            k.Fullscreen = f;
            g(a, "beforeRender", function () {
                this.fullscreen = new k.Fullscreen(this)
            });
            return k.Fullscreen
        });
    h(a, "Core/Chart/ChartNavigationComposition.js", [], function () {
        var a;
        (function (a) {
            a.compose = function (a) {
                a.navigation || (a.navigation = new g(a));
                return a
            };
            var g = function () {
                function a(a) {
                    this.updates = [];
                    this.chart = a
                }
                a.prototype.addUpdate = function (a) {
                    this.chart.navigation.updates.push(a)
                };
                a.prototype.update = function (a, p) {
                    var d = this;
                    this.updates.forEach(function (g) {
                        g.call(d.chart, a, p)
                    })
                };
                return a
            }();
            a.Additions = g
        })(a || (a = {}));
        return a
    });
    h(a, "Extensions/Exporting/ExportingDefaults.js", [a["Core/Globals.js"]], function (a) {
        return {
            exporting: {
                type: "image/png",
                url: "https://export.highcharts.com/",
                printMaxWidth: 780,
                scale: 2,
                buttons: {
                    contextButton: {
                        className: "highcharts-contextbutton",
                        menuClassName: "highcharts-contextmenu",
                        symbol: "menu",
                        titleKey: "contextButtonTitle",
                        menuItems: "viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")
                    }
                },
                menuItemDefinitions: {
                    viewFullscreen: {
                        textKey: "viewFullscreen",
                        onclick: function () {
                            this.fullscreen.toggle()
                        }
                    },
                    printChart: {
                        textKey: "printChart",
                        onclick: function () {
                            this.print()
                        }
                    },
                    separator: {
                        separator: !0
                    },
                    downloadPNG: {
                        textKey: "downloadPNG",
                        onclick: function () {
                            this.exportChart()
                        }
                    },
                    downloadJPEG: {
                        textKey: "downloadJPEG",
                        onclick: function () {
                            this.exportChart({
                                type: "image/jpeg"
                            })
                        }
                    },
                    downloadPDF: {
                        textKey: "downloadPDF",
                        onclick: function () {
                            this.exportChart({
                                type: "application/pdf"
                            })
                        }
                    },
                    downloadSVG: {
                        textKey: "downloadSVG",
                        onclick: function () {
                            this.exportChart({
                                type: "image/svg+xml"
                            })
                        }
                    }
                }
            },
            lang: {
                viewFullscreen: "View in full screen",
                exitFullscreen: "Exit from full screen",
                printChart: "Print chart",
                downloadPNG: "Download PNG image",
                downloadJPEG: "Download JPEG image",
                downloadPDF: "Download PDF document",
                downloadSVG: "Download SVG vector image",
                contextButtonTitle: "Chart context menu"
            },
            navigation: {
                buttonOptions: {
                    symbolSize: 14,
                    symbolX: 12.5,
                    symbolY: 10.5,
                    align: "right",
                    buttonSpacing: 3,
                    height: 22,
                    verticalAlign: "top",
                    width: 24,
                    symbolFill: "#666666",
                    symbolStroke: "#666666",
                    symbolStrokeWidth: 3,
                    theme: {
                        padding: 5
                    }
                },
                menuStyle: {
                    border: "1px solid #999999",
                    background: "#ffffff",
                    padding: "5px 0"
                },
                menuItemStyle: {
                    padding: "0.5em 1em",
                    color: "#333333",
                    background: "none",
                    fontSize: a.isTouchDevice ? "14px" : "11px",
                    transition: "background 250ms, color 250ms"
                },
                menuItemHoverStyle: {
                    background: "#335cad",
                    color: "#ffffff"
                }
            }
        }
    });
    h(a, "Extensions/Exporting/ExportingSymbols.js", [], function () {
        var a;
        (function (a) {
            function g(a, d, g, b) {
                return [
                    ["M", a, d + 2.5],
                    ["L", a + g, d + 2.5],
                    ["M", a, d + b / 2 + .5],
                    ["L", a + g, d + b / 2 + .5],
                    ["M", a, d + b - 1.5],
                    ["L", a + g, d + b - 1.5]
                ]
            }

            function f(a, d, g, b) {
                a = b / 3 - 2;
                b = [];
                return b = b.concat(this.circle(g - a, d, a, a), this.circle(g - a, d + a + 4, a, a), this.circle(g - a, d + 2 * (a + 4), a, a))
            }
            var k = [];
            a.compose = function (a) {
                -1 === k.indexOf(a) && (k.push(a), a = a.prototype.symbols, a.menu = g, a.menuball = f.bind(a))
            }
        })(a || (a = {}));
        return a
    });
    h(a, "Core/HttpUtilities.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, k) {
        var g = a.doc,
            f = k.createElement,
            h = k.discardElement,
            p = k.merge,
            d = k.objectEach,
            H = {
                ajax: function (a) {
                    var b = p(!0, {
                        url: !1,
                        type: "get",
                        dataType: "json",
                        success: !1,
                        error: !1,
                        data: !1,
                        headers: {}
                    }, a);
                    a = {
                        json: "application/json",
                        xml: "application/xml",
                        text: "text/plain",
                        octet: "application/octet-stream"
                    };
                    var g = new XMLHttpRequest;
                    if (!b.url) return !1;
                    g.open(b.type.toUpperCase(), b.url, !0);
                    b.headers["Content-Type"] || g.setRequestHeader("Content-Type",
                        a[b.dataType] || a.text);
                    d(b.headers, function (a, d) {
                        g.setRequestHeader(d, a)
                    });
                    g.onreadystatechange = function () {
                        if (4 === g.readyState) {
                            if (200 === g.status) {
                                var a = g.responseText;
                                if ("json" === b.dataType) try {
                                    a = JSON.parse(a)
                                } catch (q) {
                                    b.error && b.error(g, q);
                                    return
                                }
                                return b.success && b.success(a)
                            }
                            b.error && b.error(g, g.responseText)
                        }
                    };
                    try {
                        b.data = JSON.stringify(b.data)
                    } catch (x) { }
                    g.send(b.data || !0)
                },
                getJSON: function (a, d) {
                    H.ajax({
                        url: a,
                        success: d,
                        dataType: "json",
                        headers: {
                            "Content-Type": "text/plain"
                        }
                    })
                },
                post: function (a, k,
                    n) {
                    var b = f("form", p({
                        method: "post",
                        action: a,
                        enctype: "multipart/form-data"
                    }, n), {
                        display: "none"
                    }, g.body);
                    d(k, function (a, d) {
                        f("input", {
                            type: "hidden",
                            name: d,
                            value: a
                        }, null, b)
                    });
                    b.submit();
                    h(b)
                }
            };
        "";
        return H
    });
    h(a, "Extensions/Exporting/Exporting.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Chart/Chart.js"], a["Core/Chart/ChartNavigationComposition.js"], a["Core/DefaultOptions.js"], a["Extensions/Exporting/ExportingDefaults.js"], a["Extensions/Exporting/ExportingSymbols.js"], a["Core/Globals.js"], a["Core/HttpUtilities.js"],
    a["Core/Utilities.js"]
    ], function (a, k, h, f, A, p, d, H, b) {
        f = f.defaultOptions;
        var g = d.doc,
            n = d.win,
            x = b.addEvent,
            q = b.css,
            B = b.createElement,
            J = b.discardElement,
            C = b.extend,
            P = b.find,
            D = b.fireEvent,
            Q = b.isObject,
            t = b.merge,
            K = b.objectEach,
            u = b.pick,
            R = b.removeEvent,
            S = b.uniqueKey,
            E;
        (function (f) {
            function A(a) {
                var c = this,
                    d = c.renderer,
                    b = t(c.options.navigation.buttonOptions, a),
                    g = b.onclick,
                    l = b.menuItems,
                    f = b.symbolSize || 12;
                c.btnCount || (c.btnCount = 0);
                c.exportDivElements || (c.exportDivElements = [], c.exportSVGElements = []);
                if (!1 !==
                    b.enabled && b.theme) {
                    var e = b.theme,
                        y = e.states,
                        k = y && y.hover;
                    y = y && y.select;
                    var z;
                    c.styledMode || (e.fill = u(e.fill, "#ffffff"), e.stroke = u(e.stroke, "none"));
                    delete e.states;
                    g ? z = function (a) {
                        a && a.stopPropagation();
                        g.call(c, a)
                    } : l && (z = function (a) {
                        a && a.stopPropagation();
                        c.contextMenu(r.menuClassName, l, r.translateX, r.translateY, r.width, r.height, r);
                        r.setState(2)
                    });
                    b.text && b.symbol ? e.paddingLeft = u(e.paddingLeft, 30) : b.text || C(e, {
                        width: b.width,
                        height: b.height,
                        padding: 0
                    });
                    c.styledMode || (e["stroke-linecap"] = "round",
                        e.fill = u(e.fill, "#ffffff"), e.stroke = u(e.stroke, "none"));
                    var r = d.button(b.text, 0, 0, z, e, k, y).addClass(a.className).attr({
                        title: u(c.options.lang[b._titleKey || b.titleKey], "")
                    });
                    r.menuClassName = a.menuClassName || "highcharts-menu-" + c.btnCount++;
                    if (b.symbol) {
                        var n = d.symbol(b.symbol, b.symbolX - f / 2, b.symbolY - f / 2, f, f, {
                            width: f,
                            height: f
                        }).addClass("highcharts-button-symbol").attr({
                            zIndex: 1
                        }).add(r);
                        c.styledMode || n.attr({
                            stroke: b.symbolStroke,
                            fill: b.symbolFill,
                            "stroke-width": b.symbolStrokeWidth || 1
                        })
                    }
                    r.add(c.exportingGroup).align(C(b, {
                        width: r.width,
                        x: u(b.x, c.buttonOffset)
                    }), !0, "spacingBox");
                    c.buttonOffset += (r.width + b.buttonSpacing) * ("right" === b.align ? -1 : 1);
                    c.exportSVGElements.push(r, n)
                }
            }

            function E() {
                if (this.printReverseInfo) {
                    var a = this.printReverseInfo,
                        b = a.childNodes,
                        d = a.origDisplay;
                    a = a.resetParams;
                    this.moveContainers(this.renderTo);
                    [].forEach.call(b, function (a, c) {
                        1 === a.nodeType && (a.style.display = d[c] || "")
                    });
                    this.isPrinting = !1;
                    a && this.setSize.apply(this, a);
                    delete this.printReverseInfo;
                    G = void 0;
                    D(this, "afterPrint")
                }
            }

            function T() {
                var a =
                    g.body,
                    b = this.options.exporting.printMaxWidth,
                    d = {
                        childNodes: a.childNodes,
                        origDisplay: [],
                        resetParams: void 0
                    };
                this.isPrinting = !0;
                this.pointer.reset(null, 0);
                D(this, "beforePrint");
                b && this.chartWidth > b && (d.resetParams = [this.options.chart.width, void 0, !1], this.setSize(b, void 0, !1));
                [].forEach.call(d.childNodes, function (a, c) {
                    1 === a.nodeType && (d.origDisplay[c] = a.style.display, a.style.display = "none")
                });
                this.moveContainers(a);
                this.printReverseInfo = d
            }

            function U(a) {
                a.renderExporting();
                x(a, "redraw", a.renderExporting);
                x(a, "destroy", a.destroyExport)
            }

            function V(c, d, F, f, k, l, I) {
                var e = this,
                    w = e.options.navigation,
                    L = e.chartWidth,
                    z = e.chartHeight,
                    r = "cache-" + c,
                    v = Math.max(k, l),
                    m = e[r];
                if (!m) {
                    e.exportContextMenu = e[r] = m = B("div", {
                        className: c
                    }, {
                        position: "absolute",
                        zIndex: 1E3,
                        padding: v + "px",
                        pointerEvents: "auto"
                    }, e.fixedDiv || e.container);
                    var h = B("ul", {
                        className: "highcharts-menu"
                    }, {
                        listStyle: "none",
                        margin: 0,
                        padding: 0
                    }, m);
                    e.styledMode || q(h, C({
                        MozBoxShadow: "3px 3px 10px #888",
                        WebkitBoxShadow: "3px 3px 10px #888",
                        boxShadow: "3px 3px 10px #888"
                    },
                        w.menuStyle));
                    m.hideMenu = function () {
                        q(m, {
                            display: "none"
                        });
                        I && I.setState(0);
                        e.openMenu = !1;
                        q(e.renderTo, {
                            overflow: "hidden"
                        });
                        q(e.container, {
                            overflow: "hidden"
                        });
                        b.clearTimeout(m.hideTimer);
                        D(e, "exportMenuHidden")
                    };
                    e.exportEvents.push(x(m, "mouseleave", function () {
                        m.hideTimer = n.setTimeout(m.hideMenu, 500)
                    }), x(m, "mouseenter", function () {
                        b.clearTimeout(m.hideTimer)
                    }), x(g, "mouseup", function (a) {
                        e.pointer.inClass(a.target, c) || m.hideMenu()
                    }), x(m, "click", function () {
                        e.openMenu && m.hideMenu()
                    }));
                    d.forEach(function (c) {
                        "string" ===
                            typeof c && (c = e.options.exporting.menuItemDefinitions[c]);
                        if (Q(c, !0)) {
                            var b = void 0;
                            c.separator ? b = B("hr", void 0, void 0, h) : ("viewData" === c.textKey && e.isDataTableVisible && (c.textKey = "hideData"), b = B("li", {
                                className: "highcharts-menu-item",
                                onclick: function (a) {
                                    a && a.stopPropagation();
                                    m.hideMenu();
                                    c.onclick && c.onclick.apply(e, arguments)
                                }
                            }, void 0, h), a.setElementHTML(b, c.text || e.options.lang[c.textKey]), e.styledMode || (b.onmouseover = function () {
                                q(this, w.menuItemHoverStyle)
                            }, b.onmouseout = function () {
                                q(this, w.menuItemStyle)
                            },
                                q(b, C({
                                    cursor: "pointer"
                                }, w.menuItemStyle))));
                            e.exportDivElements.push(b)
                        }
                    });
                    e.exportDivElements.push(h, m);
                    e.exportMenuWidth = m.offsetWidth;
                    e.exportMenuHeight = m.offsetHeight
                }
                d = {
                    display: "block"
                };
                F + e.exportMenuWidth > L ? d.right = L - F - k - v + "px" : d.left = F - v + "px";
                f + l + e.exportMenuHeight > z && "top" !== I.alignOptions.verticalAlign ? d.bottom = z - f - v + "px" : d.top = f + l - v + "px";
                q(m, d);
                q(e.renderTo, {
                    overflow: ""
                });
                q(e.container, {
                    overflow: ""
                });
                e.openMenu = !0;
                D(e, "exportMenuShown")
            }

            function W(a) {
                var c = a ? a.target : this,
                    d = c.exportSVGElements,
                    g = c.exportDivElements;
                a = c.exportEvents;
                var f;
                d && (d.forEach(function (a, b) {
                    a && (a.onclick = a.ontouchstart = null, f = "cache-" + a.menuClassName, c[f] && delete c[f], d[b] = a.destroy())
                }), d.length = 0);
                c.exportingGroup && (c.exportingGroup.destroy(), delete c.exportingGroup);
                g && (g.forEach(function (a, c) {
                    a && (b.clearTimeout(a.hideTimer), R(a, "mouseleave"), g[c] = a.onmouseout = a.onmouseover = a.ontouchstart = a.onclick = null, J(a))
                }), g.length = 0);
                a && (a.forEach(function (a) {
                    a()
                }), a.length = 0)
            }

            function X(a, b) {
                b = this.getSVGForExport(a, b);
                a = t(this.options.exporting, a);
                H.post(a.url, {
                    filename: a.filename ? a.filename.replace(/\//g, "-") : this.getFilename(),
                    type: a.type,
                    width: a.width || 0,
                    scale: a.scale,
                    svg: b
                }, a.formAttributes)
            }

            function Y() {
                this.styledMode && this.inlineStyles();
                return this.container.innerHTML
            }

            function Z() {
                var a = this.userOptions.title && this.userOptions.title.text,
                    b = this.options.exporting.filename;
                if (b) return b.replace(/\//g, "-");
                "string" === typeof a && (b = a.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g,
                    "").replace(/^[\-]+/g, "").replace(/[\-]+/g, "-").substr(0, 24).replace(/[\-]+$/g, ""));
                if (!b || 5 > b.length) b = "chart";
                return b
            }

            function aa(a) {
                var b, c = t(this.options, a);
                c.plotOptions = t(this.userOptions.plotOptions, a && a.plotOptions);
                c.time = t(this.userOptions.time, a && a.time);
                var d = B("div", null, {
                    position: "absolute",
                    top: "-9999em",
                    width: this.chartWidth + "px",
                    height: this.chartHeight + "px"
                }, g.body),
                    f = this.renderTo.style.width;
                var l = this.renderTo.style.height;
                f = c.exporting.sourceWidth || c.chart.width || /px$/.test(f) &&
                    parseInt(f, 10) || (c.isGantt ? 800 : 600);
                l = c.exporting.sourceHeight || c.chart.height || /px$/.test(l) && parseInt(l, 10) || 400;
                C(c.chart, {
                    animation: !1,
                    renderTo: d,
                    forExport: !0,
                    renderer: "SVGRenderer",
                    width: f,
                    height: l
                });
                c.exporting.enabled = !1;
                delete c.data;
                c.series = [];
                this.series.forEach(function (a) {
                    b = t(a.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: a.visible
                    });
                    b.isInternal || c.series.push(b)
                });
                var n = {};
                this.axes.forEach(function (a) {
                    a.userOptions.internalKey || (a.userOptions.internalKey =
                        S());
                    a.options.isInternal || (n[a.coll] || (n[a.coll] = !0, c[a.coll] = []), c[a.coll].push(t(a.userOptions, {
                        visible: a.visible
                    })))
                });
                var e = new k(c, this.callback);
                a && ["xAxis", "yAxis", "series"].forEach(function (c) {
                    var b = {};
                    a[c] && (b[c] = a[c], e.update(b))
                });
                this.axes.forEach(function (a) {
                    var c = P(e.axes, function (c) {
                        return c.options.internalKey === a.userOptions.internalKey
                    }),
                        b = a.getExtremes(),
                        d = b.userMin;
                    b = b.userMax;
                    c && ("undefined" !== typeof d && d !== c.min || "undefined" !== typeof b && b !== c.max) && c.setExtremes(d, b, !0, !1)
                });
                l = e.getChartHTML();
                D(this, "getSVG", {
                    chartCopy: e
                });
                l = this.sanitizeSVG(l, c);
                c = null;
                e.destroy();
                J(d);
                return l
            }

            function ba(a, b) {
                var c = this.options.exporting;
                return this.getSVG(t({
                    chart: {
                        borderRadius: 0
                    }
                }, c.chartOptions, b, {
                    exporting: {
                        sourceWidth: a && a.sourceWidth || c.sourceWidth,
                        sourceHeight: a && a.sourceHeight || c.sourceHeight
                    }
                }))
            }

            function M(a) {
                return a.replace(/([A-Z])/g, function (a, c) {
                    return "-" + c.toLowerCase()
                })
            }

            function ca() {
                function a(c) {
                    function g(a, d) {
                        f = w = !1;
                        if (k.length) {
                            for (l = k.length; l-- && !w;) w = k[l].test(d);
                            f = !w
                        }
                        "transform" === d && "none" === a && (f = !0);
                        for (l = b.length; l-- && !f;) f = b[l].test(d) || "function" === typeof a;
                        f || F[d] === a && "svg" !== c.nodeName || h[c.nodeName][d] === a || (N && -1 === N.indexOf(d) ? e += M(d) + ":" + a + ";" : a && c.setAttribute(M(d), a))
                    }
                    var e = "",
                        f, w, l;
                    if (1 === c.nodeType && -1 === da.indexOf(c.nodeName)) {
                        var m = n.getComputedStyle(c, null);
                        var F = "svg" === c.nodeName ? {} : n.getComputedStyle(c.parentNode, null);
                        if (!h[c.nodeName]) {
                            v = p.getElementsByTagName("svg")[0];
                            var q = p.createElementNS(c.namespaceURI, c.nodeName);
                            v.appendChild(q);
                            h[c.nodeName] = t(n.getComputedStyle(q, null));
                            "text" === c.nodeName && delete h.text.fill;
                            v.removeChild(q)
                        }
                        if (d.isFirefox || d.isMS)
                            for (var u in m) g(m[u], u);
                        else K(m, g);
                        e && (m = c.getAttribute("style"), c.setAttribute("style", (m ? m + ";" : "") + e));
                        "svg" === c.nodeName && c.setAttribute("stroke-width", "1px");
                        "text" !== c.nodeName && [].forEach.call(c.children || c.childNodes, a)
                    }
                }
                var b = ea,
                    k = f.inlineWhitelist,
                    h = {},
                    v, l = g.createElement("iframe");
                q(l, {
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                });
                g.body.appendChild(l);
                var p = l.contentWindow.document;
                p.open();
                p.write('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
                p.close();
                a(this.container.querySelector("svg"));
                v.parentNode.removeChild(v);
                l.parentNode.removeChild(l)
            }

            function fa(a) {
                (this.fixedDiv ? [this.fixedDiv, this.scrollingContainer] : [this.container]).forEach(function (c) {
                    a.appendChild(c)
                })
            }

            function ha() {
                var a = this;
                a.exporting = {
                    update: function (c, b) {
                        a.isDirtyExporting = !0;
                        t(!0, a.options.exporting, c);
                        u(b, !0) && a.redraw()
                    }
                };
                h.compose(a).navigation.addUpdate(function (c, b) {
                    a.isDirtyExporting = !0;
                    t(!0,
                        a.options.navigation, c);
                    u(b, !0) && a.redraw()
                })
            }

            function ia() {
                var a = this;
                a.isPrinting || (G = a, d.isSafari || a.beforePrint(), setTimeout(function () {
                    n.focus();
                    n.print();
                    d.isSafari || setTimeout(function () {
                        a.afterPrint()
                    }, 1E3)
                }, 1))
            }

            function ja() {
                var a = this,
                    b = a.options.exporting,
                    d = b.buttons,
                    g = a.isDirtyExporting || !a.exportSVGElements;
                a.buttonOffset = 0;
                a.isDirtyExporting && a.destroyExport();
                g && !1 !== b.enabled && (a.exportEvents = [], a.exportingGroup = a.exportingGroup || a.renderer.g("exporting-group").attr({
                    zIndex: 3
                }).add(),
                    K(d, function (b) {
                        a.addButton(b)
                    }), a.isDirtyExporting = !1)
            }

            function ka(a, b) {
                var c = a.indexOf("</svg>") + 6,
                    d = a.substr(c);
                a = a.substr(0, c);
                b && b.exporting && b.exporting.allowHTML && d && (d = '<foreignObject x="0" y="0" width="' + b.chart.width + '" height="' + b.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + d.replace(/(<(?:img|br).*?(?=>))>/g, "$1 />") + "</body></foreignObject>", a = a.replace("</svg>", d + "</svg>"));
                a = a.replace(/zIndex="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g,
                    "").replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+:)href=/g, " xlink:href=").replace(/\n/, " ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, "\u00a0").replace(/&shy;/g, "\u00ad");
                this.ieSanitizeSVG && (a = this.ieSanitizeSVG(a));
                return a
            }
            var O = [],
                ea = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/,
                    /[lL]ogical(Width|Height)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/
                ],
                N = "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
            f.inlineWhitelist = [];
            var da = ["clipPath", "defs", "desc"],
                G;
            f.compose = function (a, b) {
                p.compose(b); - 1 === O.indexOf(a) && (O.push(a), b = a.prototype, b.afterPrint = E, b.exportChart = X, b.inlineStyles = ca, b.print = ia, b.sanitizeSVG = ka, b.getChartHTML = Y, b.getSVG = aa, b.getSVGForExport = ba, b.getFilename = Z, b.moveContainers = fa, b.beforePrint = T, b.contextMenu =
                    V, b.addButton = A, b.destroyExport = W, b.renderExporting = ja, b.callbacks.push(U), x(a, "init", ha), d.isSafari && d.win.matchMedia("print").addListener(function (a) {
                        G && (a.matches ? G.beforePrint() : G.afterPrint())
                    }))
            }
        })(E || (E = {}));
        f.exporting = t(A.exporting, f.exporting);
        f.lang = t(A.lang, f.lang);
        f.navigation = t(A.navigation, f.navigation);
        "";
        "";
        return E
    });
    h(a, "masters/modules/exporting.src.js", [a["Core/Globals.js"], a["Extensions/Exporting/Exporting.js"], a["Core/HttpUtilities.js"]], function (a, k, h) {
        a.HttpUtilities = h;
        a.ajax =
            h.ajax;
        a.getJSON = h.getJSON;
        a.post = h.post;
        k.compose(a.Chart, a.Renderer)
    })
});
//# sourceMappingURL=exporting.js.map