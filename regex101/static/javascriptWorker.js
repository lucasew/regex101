! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) n.d(r, a, function(t) {
                return e[t]
            }.bind(null, a));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "/static/", n(n.s = 3)
}({
    "./app/js/matchers/Javascript.js": function(e, t) {
        self.onmessage = function(e) {
            self.postMessage("onload");
            try {
                var t = new Date,
                    n = function(e, t, n) {
                        var r, a = new RegExp(e, t),
                            o = [],
                            s = -1 !== t.indexOf("g");
                        for (; r = a.exec(n);) {
                            r.index === a.lastIndex && a.lastIndex++;
                            for (var i = [], u = 0; u < r.length; u++) {
                                var f = {
                                    content: r[u],
                                    groupNum: u,
                                    isParticipating: void 0 !== r[u],
                                    match: o.length
                                };
                                0 === u && (f.start = r.index, f.end = r.index + r[0].length), i.push(f)
                            }
                            if (o.push(i), !s) break
                        }
                        return {
                            matchResult: o
                        }
                    }(e.data.regex, e.data.flags, e.data.testString);
                n.time = new Date - t, self.postMessage(n)
            } catch (r) {
                self.postMessage({
                    error: r.message
                })
            }
        }
    },
    3: function(e, t, n) {
        e.exports = n("./app/js/matchers/Javascript.js")
    }
});
