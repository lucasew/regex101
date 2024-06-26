! function(e) {
    var r = {};

    function t(n) {
        if (r[n]) return r[n].exports;
        var a = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports
    }
    t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: n
        })
    }, t.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, r) {
        if (1 & r && (e = t(e)), 8 & r) return e;
        if (4 & r && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (t.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e)
            for (var a in e) t.d(n, a, function(r) {
                return e[r]
            }.bind(null, a));
        return n
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, t.p = "/static/", t(t.s = 2)
}({
    "./app/js/matchers/PCRE.js": function(e, r) {
        importScripts("/static/pcrelib.js");
        e = Module();
        var t, n, a, o, u = 1,
            c = 2,
            s = 4,
            i = 8,
            l = 16,
            b = 32,
            f = 64,
            p = 512,
            m = 2048,
            g = 4096,
            d = 16384,
            P = 524288,
            v = 2097152,
            _ = 67108864,
            E = 268435456,
            h = 536870912,
            A = 2,
            S = 7,
            k = 8,
            H = 9,
            w = -1,
            j = e.cwrap("pcre16_compile", "number", ["number", "number", "number", "number", "number"]),
            x = e.cwrap("pcre16_exec", "number", ["number", "number", "number", "number", "number", "number", "number", "number"]),
            y = e.cwrap("pcre16_fullinfo", "number", ["number", "number", "number", "number"]),
            T = e.cwrap("getCalloutAddress", "number", []),
            L = e.cwrap("getExtraAddress", "number", []),
            M = !1,
            C = {},
            O = e.addFunction(function(r) {
                if (M) {
                    var u = r >> 2,
                        c = e.HEAP32[u + 5],
                        s = e.HEAP32[u + 6],
                        i = e.HEAP32[u + 10],
                        l = e.HEAP32[u + 11];
                    o[a] || (o[a] = []), o[a][n] = {
                        patternStart: i,
                        patternEnd: l,
                        stringStart: c,
                        stringEnd: s - c
                    }
                }
                t++, n++
            });

        function U(e) {
            M && (o[a] || (o[a] = []), o[a].steps = n, o[a].status = e, n = 0, a++)
        }

        function D() {
            C.namedSubpatternTable && e._free(C.namedSubpatternTable), C.regex && e._free(C.regex), C = {}
        }
        self.onmessage = function(r) {
            try {
                var F = r.data,
                    N = F.debugging,
                    R = F.regex,
                    z = F.flags,
                    Y = F.testString,
                    B = F.bumpalong;
                self.postMessage("onload");
                var J = function(r, t) {
                    if (t += "C", C) {
                        if (C.pattern === r && C.flags === t) return;
                        D()
                    }
                    for (var n = 0, a = !1, o = 0, E = t.length; o < E; o++) switch (t[o]) {
                        case "g":
                            a = !0;
                            break;
                        case "i":
                            n |= u;
                            break;
                        case "m":
                            n |= c;
                            break;
                        case "s":
                            n |= s;
                            break;
                        case "x":
                            n |= i;
                            break;
                        case "A":
                            n |= l;
                            break;
                        case "C":
                            n |= d;
                            break;
                        case "D":
                        case "E":
                            n |= b;
                            break;
                        case "J":
                            n |= P;
                            break;
                        case "N":
                            n |= g;
                            break;
                        case "S":
                            break;
                        case "U":
                            n |= p;
                            break;
                        case "X":
                            n |= f;
                            break;
                        case "Y":
                            n |= _;
                            break;
                        case "u":
                            n |= m | h;
                            break;
                        case "P":
                            n |= m;
                            break;
                        default:
                            throw new Error("Unknown option '".concat(t[o], "' supplied."))
                    }
                    C.pattern = r, C.flags = t, C.optionBits = n | v, C.globalMatch = a;
                    var w = 2 * (2 * r.length + 1),
                        x = e._malloc(w);
                    e.stringToUTF16(r, x, w);
                    var M = e._malloc(4),
                        U = e._malloc(4),
                        F = j(x, n, M, U, null);
                    if (!F) {
                        var N = "".concat(e.Pointer_stringify(e.HEAP32[M >> 2]), " - offset: ").concat(e.HEAP32[U >> 2]);
                        return e._free(x), e._free(M), e._free(U), D(), N || "Unknown compilation error"
                    }
                    e.HEAP32[T() >> 2] = O;
                    var R = e._malloc(4);
                    y(F, null, k, R), C.namedSubpatternCount = e.HEAP32[R >> 2], e._free(R);
                    var z = e._malloc(4);
                    y(F, null, H, z), C.namedSubpatternTable = z;
                    var Y = e._malloc(4);
                    y(F, null, S, Y), C.namedSubpatternSize = e.HEAP32[Y >> 2], e._free(Y);
                    var B = e._malloc(4);
                    y(F, null, A, B), C.ovectorLen = 3 * (e.HEAP32[B >> 2] + 1), e._free(B), C.matchLimit = L(), C.regex = F, e._free(x), e._free(M), e._free(U)
                }(R, z + ((M = !!N) ? "Y" : ""));
                if (J) return void self.postMessage({
                    error: J
                });
                var X = new Date,
                    q = function(r, u) {
                        if (!C.regex) throw new Error("No pattern supplied to matching function!");
                        if (t = 0, n = 0, a = 0, o = [], C.subject !== r || !C.testStringPointer) {
                            C.testStringPointer && e._free(C.testStringPointer);
                            var c = r.length,
                                s = 2 * (2 * c + 1),
                                i = e._malloc(s);
                            e.stringToUTF16(r, i, s), C.testStringPointer = i, C.subject = r, C.subjectLength = c
                        }
                        var b, f = e._malloc(4 * C.ovectorLen),
                            p = f >> 2,
                            m = 0,
                            g = 0,
                            d = [],
                            P = 0,
                            v = null;
                        do {
                            if ((b = x(C.regex, C.matchLimit, C.testStringPointer, C.subjectLength, m, g, f, C.ovectorLen)) >= 0) {
                                U(b), n = 0, 0 === b && (b = C.ovectorLen / 3);
                                for (var _ = new Array(b), h = 0, A = 0; A < 2 * b; A += 2) {
                                    var S = e.HEAP32[p + A],
                                        k = e.HEAP32[p + A + 1],
                                        H = A / 2,
                                        j = -1 !== S;
                                    if (_[h++] = {
                                            isParticipating: j,
                                            groupNum: H,
                                            start: S,
                                            end: k,
                                            content: r.substring(S, k),
                                            match: P
                                        }, j && k >= S && C.namedSubpatternCount > 0)
                                        for (var y = e.HEAP32[C.namedSubpatternTable >> 2], T = 0; T < C.namedSubpatternCount; T++) {
                                            var L = e.HEAP8[y];
                                            void 0 !== _[L] && (_[L].groupName = e.UTF16ToString(y + 2)), y += 2 * C.namedSubpatternSize
                                        }
                                }
                                d[P++] = _
                            } else {
                                if (b !== w) {
                                    m >= C.subjectLength || (U(b), v = b);
                                    break
                                }
                                if (!(0 !== g && m < C.subjectLength)) {
                                    n > 0 && U(b);
                                    break
                                }
                                e.HEAP32[p] = m, e.HEAP32[p + 1] = m + 1, m < C.subjectLength - 1 && "\r" === r.charAt(m) && "\n" === r.charAt(m + 1) && (e.HEAP32[p + 1] += 1), U(b)
                            }
                            var M = e.HEAP32[p + 1] === e.HEAP32[p];
                            u ? m = e.HEAP32[p + 1] + (M ? 1 : 0) : (g = M ? E | l : 0, m = e.HEAP32[p + 1])
                        } while (C.globalMatch);
                        return e._free(f), {
                            matchResult: d,
                            error: v,
                            calloutData: o,
                            steps: t
                        }
                    }(Y, B);
                q.time = new Date - X, self.postMessage(q)
            } catch (G) {
                console.error("An unhandled error was thrown, please report this", G), self.postMessage({
                    error: G.message || "Unknown error occured"
                })
            }
        }
    },
    2: function(e, r, t) {
        e.exports = t("./app/js/matchers/PCRE.js")
    }
});