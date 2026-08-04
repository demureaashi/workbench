var ou = Object.defineProperty;
var iu = (e, t, n) => t in e ? ou(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Se = (e, t, n) => iu(e, typeof t != "symbol" ? t + "" : t, n);
var bn, oe, hl, St, si, vl, Hr, _l, xo, zr, Br, wl, mn = {}, yl = [], lu = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, er = Array.isArray;
function ot(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function So(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function P(e, t, n) {
  var r, o, i, l = {};
  for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : l[i] = t[i];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? bn.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (i in e.defaultProps) l[i] === void 0 && (l[i] = e.defaultProps[i]);
  return sn(e, l, r, o, null);
}
function sn(e, t, n, r, o) {
  var i = { type: e, props: t, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o ?? ++hl, __i: -1, __u: 0 };
  return o == null && oe.vnode != null && oe.vnode(i), i;
}
function tr() {
  return { current: null };
}
function fe(e) {
  return e.children;
}
function Be(e, t) {
  this.props = e, this.context = t;
}
function jt(e, t) {
  if (t == null) return e.__ ? jt(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? jt(e) : null;
}
function bl(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
      e.__e = e.__c.base = n.__e;
      break;
    }
    return bl(e);
  }
}
function jr(e) {
  (!e.__d && (e.__d = !0) && St.push(e) && !Wn.__r++ || si !== oe.debounceRendering) && ((si = oe.debounceRendering) || vl)(Wn);
}
function Wn() {
  var e, t, n, r, o, i, l, s;
  for (St.sort(Hr); e = St.shift(); ) e.__d && (t = St.length, r = void 0, i = (o = (n = e).__v).__e, l = [], s = [], n.__P && ((r = ot({}, o)).__v = o.__v + 1, oe.vnode && oe.vnode(r), Co(n.__P, r, o, n.__n, n.__P.namespaceURI, 32 & o.__u ? [i] : null, l, i ?? jt(o), !!(32 & o.__u), s), r.__v = o.__v, r.__.__k[r.__i] = r, Cl(l, r, s), r.__e != i && bl(r)), St.length > t && St.sort(Hr));
  Wn.__r = 0;
}
function xl(e, t, n, r, o, i, l, s, a, u, c) {
  var d, m, f, g, h, v, x = r && r.__k || yl, w = t.length;
  for (a = su(n, t, x, a, w), d = 0; d < w; d++) (f = n.__k[d]) != null && (m = f.__i === -1 ? mn : x[f.__i] || mn, f.__i = d, v = Co(e, f, m, o, i, l, s, a, u, c), g = f.__e, f.ref && m.ref != f.ref && (m.ref && Eo(m.ref, null, f), c.push(f.ref, f.__c || g, f)), h == null && g != null && (h = g), 4 & f.__u || m.__k === f.__k ? a = Sl(f, a, e) : typeof f.type == "function" && v !== void 0 ? a = v : g && (a = g.nextSibling), f.__u &= -7);
  return n.__e = h, a;
}
function su(e, t, n, r, o) {
  var i, l, s, a, u, c = n.length, d = c, m = 0;
  for (e.__k = new Array(o), i = 0; i < o; i++) (l = t[i]) != null && typeof l != "boolean" && typeof l != "function" ? (a = i + m, (l = e.__k[i] = typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? sn(null, l, null, null, null) : er(l) ? sn(fe, { children: l }, null, null, null) : l.constructor === void 0 && l.__b > 0 ? sn(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : l).__ = e, l.__b = e.__b + 1, s = null, (u = l.__i = au(l, n, a, d)) !== -1 && (d--, (s = n[u]) && (s.__u |= 2)), s == null || s.__v === null ? (u == -1 && m--, typeof l.type != "function" && (l.__u |= 4)) : u != a && (u == a - 1 ? m-- : u == a + 1 ? m++ : (u > a ? m-- : m++, l.__u |= 4))) : e.__k[i] = null;
  if (d) for (i = 0; i < c; i++) (s = n[i]) != null && (2 & s.__u) == 0 && (s.__e == r && (r = jt(s)), El(s, s));
  return r;
}
function Sl(e, t, n) {
  var r, o;
  if (typeof e.type == "function") {
    for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = e, t = Sl(r[o], t, n));
    return t;
  }
  e.__e != t && (t && e.type && !n.contains(t) && (t = jt(e)), n.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function it(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (er(e) ? e.some(function(n) {
    it(n, t);
  }) : t.push(e)), t;
}
function au(e, t, n, r) {
  var o, i, l = e.key, s = e.type, a = t[n];
  if (a === null || a && l == a.key && s === a.type && (2 & a.__u) == 0) return n;
  if (r > (a != null && (2 & a.__u) == 0 ? 1 : 0)) for (o = n - 1, i = n + 1; o >= 0 || i < t.length; ) {
    if (o >= 0) {
      if ((a = t[o]) && (2 & a.__u) == 0 && l == a.key && s === a.type) return o;
      o--;
    }
    if (i < t.length) {
      if ((a = t[i]) && (2 & a.__u) == 0 && l == a.key && s === a.type) return i;
      i++;
    }
  }
  return -1;
}
function ai(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || lu.test(t) ? n : n + "px";
}
function Pn(e, t, n, r, o) {
  var i;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ai(e.style, t, "");
    if (n) for (t in n) r && n[t] === r[t] || ai(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") i = t != (t = t.replace(_l, "$1")), t = t.toLowerCase() in e || t == "onFocusOut" || t == "onFocusIn" ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + i] = n, n ? r ? n.u = r.u : (n.u = xo, e.addEventListener(t, i ? Br : zr, i)) : e.removeEventListener(t, i ? Br : zr, i);
  else {
    if (o == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function ui(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t.t == null) t.t = xo++;
      else if (t.t < n.u) return;
      return n(oe.event ? oe.event(t) : t);
    }
  };
}
function Co(e, t, n, r, o, i, l, s, a, u) {
  var c, d, m, f, g, h, v, x, w, y, C, $, O, R, _, b, S, E = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (a = !!(32 & n.__u), i = [s = t.__e = n.__e]), (c = oe.__b) && c(t);
  e: if (typeof E == "function") try {
    if (x = t.props, w = "prototype" in E && E.prototype.render, y = (c = E.contextType) && r[c.__c], C = c ? y ? y.props.value : c.__ : r, n.__c ? v = (d = t.__c = n.__c).__ = d.__E : (w ? t.__c = d = new E(x, C) : (t.__c = d = new Be(x, C), d.constructor = E, d.render = cu), y && y.sub(d), d.props = x, d.state || (d.state = {}), d.context = C, d.__n = r, m = d.__d = !0, d.__h = [], d._sb = []), w && d.__s == null && (d.__s = d.state), w && E.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = ot({}, d.__s)), ot(d.__s, E.getDerivedStateFromProps(x, d.__s))), f = d.props, g = d.state, d.__v = t, m) w && E.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), w && d.componentDidMount != null && d.__h.push(d.componentDidMount);
    else {
      if (w && E.getDerivedStateFromProps == null && x !== f && d.componentWillReceiveProps != null && d.componentWillReceiveProps(x, C), !d.__e && (d.shouldComponentUpdate != null && d.shouldComponentUpdate(x, d.__s, C) === !1 || t.__v == n.__v)) {
        for (t.__v != n.__v && (d.props = x, d.state = d.__s, d.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(T) {
          T && (T.__ = t);
        }), $ = 0; $ < d._sb.length; $++) d.__h.push(d._sb[$]);
        d._sb = [], d.__h.length && l.push(d);
        break e;
      }
      d.componentWillUpdate != null && d.componentWillUpdate(x, d.__s, C), w && d.componentDidUpdate != null && d.__h.push(function() {
        d.componentDidUpdate(f, g, h);
      });
    }
    if (d.context = C, d.props = x, d.__P = e, d.__e = !1, O = oe.__r, R = 0, w) {
      for (d.state = d.__s, d.__d = !1, O && O(t), c = d.render(d.props, d.state, d.context), _ = 0; _ < d._sb.length; _++) d.__h.push(d._sb[_]);
      d._sb = [];
    } else do
      d.__d = !1, O && O(t), c = d.render(d.props, d.state, d.context), d.state = d.__s;
    while (d.__d && ++R < 25);
    d.state = d.__s, d.getChildContext != null && (r = ot(ot({}, r), d.getChildContext())), w && !m && d.getSnapshotBeforeUpdate != null && (h = d.getSnapshotBeforeUpdate(f, g)), s = xl(e, er(b = c != null && c.type === fe && c.key == null ? c.props.children : c) ? b : [b], t, n, r, o, i, l, s, a, u), d.base = t.__e, t.__u &= -161, d.__h.length && l.push(d), v && (d.__E = d.__ = null);
  } catch (T) {
    if (t.__v = null, a || i != null) if (T.then) {
      for (t.__u |= a ? 160 : 128; s && s.nodeType == 8 && s.nextSibling; ) s = s.nextSibling;
      i[i.indexOf(s)] = null, t.__e = s;
    } else for (S = i.length; S--; ) So(i[S]);
    else t.__e = n.__e, t.__k = n.__k;
    oe.__e(T, t, n);
  }
  else i == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = uu(n.__e, t, n, r, o, i, l, a, u);
  return (c = oe.diffed) && c(t), 128 & t.__u ? void 0 : s;
}
function Cl(e, t, n) {
  for (var r = 0; r < n.length; r++) Eo(n[r], n[++r], n[++r]);
  oe.__c && oe.__c(t, e), e.some(function(o) {
    try {
      e = o.__h, o.__h = [], e.some(function(i) {
        i.call(o);
      });
    } catch (i) {
      oe.__e(i, o.__v);
    }
  });
}
function uu(e, t, n, r, o, i, l, s, a) {
  var u, c, d, m, f, g, h, v = n.props, x = t.props, w = t.type;
  if (w == "svg" ? o = "http://www.w3.org/2000/svg" : w == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), i != null) {
    for (u = 0; u < i.length; u++) if ((f = i[u]) && "setAttribute" in f == !!w && (w ? f.localName == w : f.nodeType == 3)) {
      e = f, i[u] = null;
      break;
    }
  }
  if (e == null) {
    if (w == null) return document.createTextNode(x);
    e = document.createElementNS(o, w, x.is && x), s && (oe.__m && oe.__m(t, i), s = !1), i = null;
  }
  if (w === null) v === x || s && e.data === x || (e.data = x);
  else {
    if (i = i && bn.call(e.childNodes), v = n.props || mn, !s && i != null) for (v = {}, u = 0; u < e.attributes.length; u++) v[(f = e.attributes[u]).name] = f.value;
    for (u in v) if (f = v[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") d = f;
      else if (!(u in x)) {
        if (u == "value" && "defaultValue" in x || u == "checked" && "defaultChecked" in x) continue;
        Pn(e, u, null, f, o);
      }
    }
    for (u in x) f = x[u], u == "children" ? m = f : u == "dangerouslySetInnerHTML" ? c = f : u == "value" ? g = f : u == "checked" ? h = f : s && typeof f != "function" || v[u] === f || Pn(e, u, f, v[u], o);
    if (c) s || d && (c.__html === d.__html || c.__html === e.innerHTML) || (e.innerHTML = c.__html), t.__k = [];
    else if (d && (e.innerHTML = ""), xl(e, er(m) ? m : [m], t, n, r, w == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, i, l, i ? i[0] : n.__k && jt(n, 0), s, a), i != null) for (u = i.length; u--; ) So(i[u]);
    s || (u = "value", w == "progress" && g == null ? e.removeAttribute("value") : g !== void 0 && (g !== e[u] || w == "progress" && !g || w == "option" && g !== v[u]) && Pn(e, u, g, v[u], o), u = "checked", h !== void 0 && h !== e[u] && Pn(e, u, h, v[u], o));
  }
  return e;
}
function Eo(e, t, n) {
  try {
    if (typeof e == "function") {
      var r = typeof e.__u == "function";
      r && e.__u(), r && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (o) {
    oe.__e(o, n);
  }
}
function El(e, t, n) {
  var r, o;
  if (oe.unmount && oe.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || Eo(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (i) {
      oe.__e(i, t);
    }
    r.base = r.__P = null;
  }
  if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && El(r[o], t, n || typeof e.type != "function");
  n || So(e.__e), e.__c = e.__ = e.__e = void 0;
}
function cu(e, t, n) {
  return this.constructor(e, n);
}
function gn(e, t, n) {
  var r, o, i, l;
  t == document && (t = document.documentElement), oe.__ && oe.__(e, t), o = (r = typeof n == "function") ? null : n && n.__k || t.__k, i = [], l = [], Co(t, e = (!r && n || t).__k = P(fe, null, [e]), o || mn, mn, t.namespaceURI, !r && n ? [n] : o ? null : t.firstChild ? bn.call(t.childNodes) : null, i, !r && n ? n : o ? o.__e : t.firstChild, r, l), Cl(i, e, l);
}
function Rl(e, t) {
  gn(e, t, Rl);
}
function du(e, t, n) {
  var r, o, i, l, s = ot({}, e.props);
  for (i in e.type && e.type.defaultProps && (l = e.type.defaultProps), t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : s[i] = t[i] === void 0 && l !== void 0 ? l[i] : t[i];
  return arguments.length > 2 && (s.children = arguments.length > 3 ? bn.call(arguments, 2) : n), sn(e.type, s, r || e.key, o || e.ref, null);
}
function me(e, t) {
  var n = { __c: t = "__cC" + wl++, __: e, Consumer: function(r, o) {
    return r.children(o);
  }, Provider: function(r) {
    var o, i;
    return this.getChildContext || (o = /* @__PURE__ */ new Set(), (i = {})[t] = this, this.getChildContext = function() {
      return i;
    }, this.componentWillUnmount = function() {
      o = null;
    }, this.shouldComponentUpdate = function(l) {
      this.props.value !== l.value && o.forEach(function(s) {
        s.__e = !0, jr(s);
      });
    }, this.sub = function(l) {
      o.add(l);
      var s = l.componentWillUnmount;
      l.componentWillUnmount = function() {
        o && o.delete(l), s && s.call(l);
      };
    }), r.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
bn = yl.slice, oe = { __e: function(e, t, n, r) {
  for (var o, i, l; t = t.__; ) if ((o = t.__c) && !o.__) try {
    if ((i = o.constructor) && i.getDerivedStateFromError != null && (o.setState(i.getDerivedStateFromError(e)), l = o.__d), o.componentDidCatch != null && (o.componentDidCatch(e, r || {}), l = o.__d), l) return o.__E = o;
  } catch (s) {
    e = s;
  }
  throw e;
} }, hl = 0, Be.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ot({}, this.state), typeof e == "function" && (e = e(ot({}, n), this.props)), e && ot(n, e), e != null && this.__v && (t && this._sb.push(t), jr(this));
}, Be.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), jr(this));
}, Be.prototype.render = fe, St = [], vl = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Hr = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, Wn.__r = 0, _l = /(PointerCapture)$|Capture$/i, xo = 0, zr = ui(!1), Br = ui(!0), wl = 0;
var st, pe, br, ci, Ut = 0, $l = [], _e = oe, di = _e.__b, fi = _e.__r, pi = _e.diffed, mi = _e.__c, gi = _e.unmount, hi = _e.__;
function Ft(e, t) {
  _e.__h && _e.__h(pe, e, Ut || t), Ut = 0;
  var n = pe.__H || (pe.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function H(e) {
  return Ut = 1, at(Tl, e);
}
function at(e, t, n) {
  var r = Ft(st++, 2);
  if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Tl(void 0, t), function(s) {
    var a = r.__N ? r.__N[0] : r.__[0], u = r.t(a, s);
    a !== u && (r.__N = [u, r.__[1]], r.__c.setState({}));
  }], r.__c = pe, !pe.u)) {
    var o = function(s, a, u) {
      if (!r.__c.__H) return !0;
      var c = r.__c.__H.__.filter(function(m) {
        return !!m.__c;
      });
      if (c.every(function(m) {
        return !m.__N;
      })) return !i || i.call(this, s, a, u);
      var d = r.__c.props !== s;
      return c.forEach(function(m) {
        if (m.__N) {
          var f = m.__[0];
          m.__ = m.__N, m.__N = void 0, f !== m.__[0] && (d = !0);
        }
      }), i && i.call(this, s, a, u) || d;
    };
    pe.u = !0;
    var i = pe.shouldComponentUpdate, l = pe.componentWillUpdate;
    pe.componentWillUpdate = function(s, a, u) {
      if (this.__e) {
        var c = i;
        i = void 0, o(s, a, u), i = c;
      }
      l && l.call(this, s, a, u);
    }, pe.shouldComponentUpdate = o;
  }
  return r.__N || r.__;
}
function re(e, t) {
  var n = Ft(st++, 3);
  !_e.__s && To(n.__H, t) && (n.__ = e, n.i = t, pe.__H.__h.push(n));
}
function Je(e, t) {
  var n = Ft(st++, 4);
  !_e.__s && To(n.__H, t) && (n.__ = e, n.i = t, pe.__h.push(n));
}
function k(e) {
  return Ut = 5, W(function() {
    return { current: e };
  }, []);
}
function Ro(e, t, n) {
  Ut = 6, Je(function() {
    return typeof e == "function" ? (e(t()), function() {
      return e(null);
    }) : e ? (e.current = t(), function() {
      return e.current = null;
    }) : void 0;
  }, n == null ? n : n.concat(e));
}
function W(e, t) {
  var n = Ft(st++, 7);
  return To(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function ie(e, t) {
  return Ut = 8, W(function() {
    return e;
  }, t);
}
function ae(e) {
  var t = pe.context[e.__c], n = Ft(st++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(pe)), t.props.value) : e.__;
}
function $o(e, t) {
  _e.useDebugValue && _e.useDebugValue(t ? t(e) : e);
}
function fu(e) {
  var t = Ft(st++, 10), n = H();
  return t.__ = e, pe.componentDidCatch || (pe.componentDidCatch = function(r, o) {
    t.__ && t.__(r, o), n[1](r);
  }), [n[0], function() {
    n[1](void 0);
  }];
}
function Me() {
  var e = Ft(st++, 11);
  if (!e.__) {
    for (var t = pe.__v; t !== null && !t.__m && t.__ !== null; ) t = t.__;
    var n = t.__m || (t.__m = [0, 0]);
    e.__ = "P" + n[0] + "-" + n[1]++;
  }
  return e.__;
}
function pu() {
  for (var e; e = $l.shift(); ) if (e.__P && e.__H) try {
    e.__H.__h.forEach(Bn), e.__H.__h.forEach(Ur), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], _e.__e(t, e.__v);
  }
}
_e.__b = function(e) {
  pe = null, di && di(e);
}, _e.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), hi && hi(e, t);
}, _e.__r = function(e) {
  fi && fi(e), st = 0;
  var t = (pe = e.__c).__H;
  t && (br === pe ? (t.__h = [], pe.__h = [], t.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.i = n.__N = void 0;
  })) : (t.__h.forEach(Bn), t.__h.forEach(Ur), t.__h = [], st = 0)), br = pe;
}, _e.diffed = function(e) {
  pi && pi(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && ($l.push(t) !== 1 && ci === _e.requestAnimationFrame || ((ci = _e.requestAnimationFrame) || mu)(pu)), t.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.i = void 0;
  })), br = pe = null;
}, _e.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(Bn), n.__h = n.__h.filter(function(r) {
        return !r.__ || Ur(r);
      });
    } catch (r) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], _e.__e(r, n.__v);
    }
  }), mi && mi(e, t);
}, _e.unmount = function(e) {
  gi && gi(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      Bn(r);
    } catch (o) {
      t = o;
    }
  }), n.__H = void 0, t && _e.__e(t, n.__v));
};
var vi = typeof requestAnimationFrame == "function";
function mu(e) {
  var t, n = function() {
    clearTimeout(r), vi && cancelAnimationFrame(t), setTimeout(e);
  }, r = setTimeout(n, 100);
  vi && (t = requestAnimationFrame(n));
}
function Bn(e) {
  var t = pe, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), pe = t;
}
function Ur(e) {
  var t = pe;
  e.__c = e.__(), pe = t;
}
function To(e, t) {
  return !e || e.length !== t.length || t.some(function(n, r) {
    return n !== e[r];
  });
}
function Tl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Il(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Wr(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function nr(e, t) {
  var n = t(), r = H({ t: { __: n, u: t } }), o = r[0].t, i = r[1];
  return Je(function() {
    o.__ = n, o.u = t, xr(o) && i({ t: o });
  }, [e, n, t]), re(function() {
    return xr(o) && i({ t: o }), e(function() {
      xr(o) && i({ t: o });
    });
  }, [e]), n;
}
function xr(e) {
  var t, n, r = e.u, o = e.__;
  try {
    var i = r();
    return !((t = o) === (n = i) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
  } catch {
    return !0;
  }
}
function Io(e) {
  e();
}
function Oo(e) {
  return e;
}
function Mo() {
  return [!1, Io];
}
var Fo = Je;
function Gn(e, t) {
  this.props = e, this.context = t;
}
function Ol(e, t) {
  function n(o) {
    var i = this.props.ref, l = i == o.ref;
    return !l && i && (i.call ? i(null) : i.current = null), t ? !t(this.props, o) || !l : Wr(this.props, o);
  }
  function r(o) {
    return this.shouldComponentUpdate = n, P(e, o);
  }
  return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}
(Gn.prototype = new Be()).isPureReactComponent = !0, Gn.prototype.shouldComponentUpdate = function(e, t) {
  return Wr(this.props, e) || Wr(this.state, t);
};
var _i = oe.__b;
oe.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), _i && _i(e);
};
var gu = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function de(e) {
  function t(n) {
    var r = Il({}, n);
    return delete r.ref, e(r, n.ref || null);
  }
  return t.$$typeof = gu, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var wi = function(e, t) {
  return e == null ? null : it(it(e).map(t));
}, Ml = { map: wi, forEach: wi, count: function(e) {
  return e ? it(e).length : 0;
}, only: function(e) {
  var t = it(e);
  if (t.length !== 1) throw "Children.only";
  return t[0];
}, toArray: it }, hu = oe.__e;
oe.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, i = t; i = i.__; ) if ((o = i.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  hu(e, t, n, r);
};
var yi = oe.unmount;
function Fl(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = Il({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Fl(r, t, n);
  })), e;
}
function Pl(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Pl(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function an() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Al(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function Nl(e) {
  var t, n, r;
  function o(i) {
    if (t || (t = e()).then(function(l) {
      n = l.default || l;
    }, function(l) {
      r = l;
    }), r) throw r;
    if (!n) throw t;
    return P(n, i);
  }
  return o.displayName = "Lazy", o.__f = !0, o;
}
function Vt() {
  this.i = null, this.l = null;
}
oe.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), yi && yi(e);
}, (an.prototype = new Be()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = Al(r.__v), i = !1, l = function() {
    i || (i = !0, n.__R = null, o ? o(s) : s());
  };
  n.__R = l;
  var s = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var a = r.state.__a;
        r.__v.__k[0] = Pl(a, a.__c.__P, a.__c.__O);
      }
      var u;
      for (r.setState({ __a: r.__b = null }); u = r.o.pop(); ) u.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(l, l);
}, an.prototype.componentWillUnmount = function() {
  this.o = [];
}, an.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Fl(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && P(fe, null, e.fallback);
  return o && (o.__u &= -33), [P(fe, null, t.__a ? null : e.children), o];
};
var bi = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
function vu(e) {
  return this.getChildContext = function() {
    return e.context;
  }, e.children;
}
function _u(e) {
  var t = this, n = e.h;
  t.componentWillUnmount = function() {
    gn(null, t.v), t.v = null, t.h = null;
  }, t.h && t.h !== n && t.componentWillUnmount(), t.v || (t.h = n, t.v = { nodeType: 1, parentNode: n, childNodes: [], contains: function() {
    return !0;
  }, appendChild: function(r) {
    this.childNodes.push(r), t.h.appendChild(r);
  }, insertBefore: function(r, o) {
    this.childNodes.push(r), t.h.insertBefore(r, o);
  }, removeChild: function(r) {
    this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), t.h.removeChild(r);
  } }), gn(P(vu, { context: t.context }, e.__v), t.v);
}
function xn(e, t) {
  var n = P(_u, { __v: e, h: t });
  return n.containerInfo = t, n;
}
(Vt.prototype = new Be()).__a = function(e) {
  var t = this, n = Al(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var i = function() {
      t.props.revealOrder ? (r.push(o), bi(t, e, r)) : o();
    };
    n ? n(i) : i();
  };
}, Vt.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = it(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, Vt.prototype.componentDidUpdate = Vt.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    bi(e, n, t);
  });
};
var kl = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, wu = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, yu = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, bu = /[A-Z0-9]/g, xu = typeof document < "u", Su = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function Po(e, t, n) {
  return t.__k == null && (t.textContent = ""), gn(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function Dl(e, t, n) {
  return Rl(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
Be.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(Be.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var xi = oe.event;
function Cu() {
}
function Eu() {
  return this.cancelBubble;
}
function Ru() {
  return this.defaultPrevented;
}
oe.event = function(e) {
  return xi && (e = xi(e)), e.persist = Cu, e.isPropagationStopped = Eu, e.isDefaultPrevented = Ru, e.nativeEvent = e;
};
var Ao, $u = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, Si = oe.vnode;
oe.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, i = r.indexOf("-") === -1;
    for (var l in n) {
      var s = n[l];
      if (!(l === "value" && "defaultValue" in n && s == null || xu && l === "children" && r === "noscript" || l === "class" || l === "className")) {
        var a = l.toLowerCase();
        l === "defaultValue" && "value" in n && n.value == null ? l = "value" : l === "download" && s === !0 ? s = "" : a === "translate" && s === "no" ? s = !1 : a[0] === "o" && a[1] === "n" ? a === "ondoubleclick" ? l = "ondblclick" : a !== "onchange" || r !== "input" && r !== "textarea" || Su(n.type) ? a === "onfocus" ? l = "onfocusin" : a === "onblur" ? l = "onfocusout" : yu.test(l) && (l = a) : a = l = "oninput" : i && wu.test(l) ? l = l.replace(bu, "-$&").toLowerCase() : s === null && (s = void 0), a === "oninput" && o[l = a] && (l = "oninputCapture"), o[l] = s;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = it(n.children).forEach(function(u) {
      u.props.selected = o.value.indexOf(u.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = it(n.children).forEach(function(u) {
      u.props.selected = o.multiple ? o.defaultValue.indexOf(u.props.value) != -1 : o.defaultValue == u.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", $u)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = kl, Si && Si(e);
};
var Ci = oe.__r;
oe.__r = function(e) {
  Ci && Ci(e), Ao = e.__c;
};
var Ei = oe.diffed;
oe.diffed = function(e) {
  Ei && Ei(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), Ao = null;
};
var Ll = { ReactCurrentDispatcher: { current: { readContext: function(e) {
  return Ao.__n[e.__c].props.value;
}, useCallback: ie, useContext: ae, useDebugValue: $o, useDeferredValue: Oo, useEffect: re, useId: Me, useImperativeHandle: Ro, useInsertionEffect: Fo, useLayoutEffect: Je, useMemo: W, useReducer: at, useRef: k, useState: H, useSyncExternalStore: nr, useTransition: Mo } } }, Tu = "18.3.1";
function Vl(e) {
  return P.bind(null, e);
}
function Kt(e) {
  return !!e && e.$$typeof === kl;
}
function Hl(e) {
  return Kt(e) && e.type === fe;
}
function zl(e) {
  return !!e && !!e.displayName && (typeof e.displayName == "string" || e.displayName instanceof String) && e.displayName.startsWith("Memo(");
}
function No(e) {
  return Kt(e) ? du.apply(null, arguments) : e;
}
function ko(e) {
  return !!e.__k && (gn(null, e), !0);
}
function Bl(e) {
  return e && (e.base || e.nodeType === 1 && e) || null;
}
var jl = function(e, t) {
  return e(t);
}, De = function(e, t) {
  return e(t);
}, Ul = fe, Wl = Kt, D = { useState: H, useId: Me, useReducer: at, useEffect: re, useLayoutEffect: Je, useInsertionEffect: Fo, useTransition: Mo, useDeferredValue: Oo, useSyncExternalStore: nr, startTransition: Io, useRef: k, useImperativeHandle: Ro, useMemo: W, useCallback: ie, useContext: ae, useDebugValue: $o, version: "18.3.1", Children: Ml, render: Po, hydrate: Dl, unmountComponentAtNode: ko, createPortal: xn, createElement: P, createContext: me, createFactory: Vl, cloneElement: No, createRef: tr, Fragment: fe, isValidElement: Kt, isElement: Wl, isFragment: Hl, isMemo: zl, findDOMNode: Bl, Component: Be, PureComponent: Gn, memo: Ol, forwardRef: de, flushSync: De, unstable_batchedUpdates: jl, StrictMode: Ul, Suspense: an, SuspenseList: Vt, lazy: Nl, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Ll };
const Gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Children: Ml,
  Component: Be,
  Fragment: fe,
  PureComponent: Gn,
  StrictMode: Ul,
  Suspense: an,
  SuspenseList: Vt,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Ll,
  cloneElement: No,
  createContext: me,
  createElement: P,
  createFactory: Vl,
  createPortal: xn,
  createRef: tr,
  default: D,
  findDOMNode: Bl,
  flushSync: De,
  forwardRef: de,
  hydrate: Dl,
  isElement: Wl,
  isFragment: Hl,
  isMemo: zl,
  isValidElement: Kt,
  lazy: Nl,
  memo: Ol,
  render: Po,
  startTransition: Io,
  unmountComponentAtNode: ko,
  unstable_batchedUpdates: jl,
  useCallback: ie,
  useContext: ae,
  useDebugValue: $o,
  useDeferredValue: Oo,
  useEffect: re,
  useErrorBoundary: fu,
  useId: Me,
  useImperativeHandle: Ro,
  useInsertionEffect: Fo,
  useLayoutEffect: Je,
  useMemo: W,
  useReducer: at,
  useRef: k,
  useState: H,
  useSyncExternalStore: nr,
  useTransition: Mo,
  version: Tu
}, Symbol.toStringTag, { value: "Module" }));
function Iu(e) {
  return {
    // eslint-disable-next-line
    render: function(t) {
      Po(t, e);
    },
    // eslint-disable-next-line
    unmount: function() {
      ko(e);
    }
  };
}
var Ou = 0;
function p(e, t, n, r, o, i) {
  t || (t = {});
  var l, s, a = t;
  if ("ref" in a) for (s in a = {}, t) s == "ref" ? l = t[s] : a[s] = t[s];
  var u = { type: e, props: a, key: n, ref: l, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Ou, __i: -1, __u: 0, __source: o, __self: i };
  if (typeof e == "function" && (l = e.defaultProps)) for (s in l) a[s] === void 0 && (a[s] = l[s]);
  return oe.vnode && oe.vnode(u), u;
}
function Gl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Gl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Mu() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Gl(e)) && (r && (r += " "), r += t);
  return r;
}
const Ri = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, $i = Mu, wt = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return $i(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: i } = t, l = Object.keys(o).map((u) => {
    const c = n == null ? void 0 : n[u], d = i == null ? void 0 : i[u];
    if (c === null) return null;
    const m = Ri(c) || Ri(d);
    return o[u][m];
  }), s = n && Object.entries(n).reduce((u, c) => {
    let [d, m] = c;
    return m === void 0 || (u[d] = m), u;
  }, {}), a = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
    let { class: d, className: m, ...f } = c;
    return Object.entries(f).every((g) => {
      let [h, v] = g;
      return Array.isArray(v) ? v.includes({
        ...i,
        ...s
      }[h]) : {
        ...i,
        ...s
      }[h] === v;
    }) ? [
      ...u,
      d,
      m
    ] : u;
  }, []);
  return $i(e, l, a, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Fu = wt(
  "text-center inline-block font-semibold px-3 py-2 rounded-md text-sm",
  {
    variants: {
      variant: {
        primary: "shadow-xs bg-hello-csv-primary text-white",
        secondary: "bg-white text-hello-csv-primary ring-1 shadow-xs ring-bg-hello-csv-primary ring-inset",
        tertiary: "bg-white text-gray-900 ring-1 shadow-xs ring-hello-csv-tertiary ring-inset",
        success: "shadow-xs bg-hello-csv-success text-white",
        danger: "shadow-xs bg-hello-csv-danger text-white"
      },
      withFullWidth: {
        true: "w-full",
        false: ""
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "cursor-pointer"
      }
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: !1,
        className: "hover:bg-hello-csv-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-primary"
      },
      {
        variant: "secondary",
        disabled: !1,
        className: "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-secondary"
      },
      {
        variant: "tertiary",
        disabled: !1,
        className: "hover:bg-hello-csv-tertiary-light"
      },
      {
        variant: "success",
        disabled: !1,
        className: "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-success"
      },
      {
        variant: "danger",
        disabled: !1,
        className: "hover:bg-hello-csv-danger-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hello-csv-danger"
      }
    ],
    defaultVariants: {
      withFullWidth: !1,
      variant: "primary",
      disabled: !1
    }
  }
);
function He({
  children: e,
  variant: t,
  disabled: n,
  onClick: r,
  withFullWidth: o
}) {
  const i = Fu({ variant: t, disabled: n, withFullWidth: o });
  return /* @__PURE__ */ p(
    "div",
    {
      role: "button",
      tabIndex: 0,
      className: i,
      onClick: r,
      "aria-disabled": n,
      children: e
    }
  );
}
const Pu = wt("overflow-hidden rounded-md border border-gray-200", {
  variants: {
    variant: {
      default: "bg-white",
      muted: "bg-hello-csv-muted"
    },
    withPadding: {
      true: "px-4 py-5 sm:p-6",
      false: ""
    }
  },
  defaultVariants: {
    variant: "default",
    withPadding: !0
  }
}), ql = de(
  ({ children: e, className: t, variant: n, withPadding: r = !0 }, o) => {
    const i = Pu({ variant: n, withPadding: r });
    return /* @__PURE__ */ p("div", { ref: o, className: `${i} ${t}`, children: e });
  }
);
function Kl({ checked: e, setChecked: t, label: n }) {
  const r = Me();
  return /* @__PURE__ */ p("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ p("div", { className: "flex h-6 shrink-0 items-center", children: /* @__PURE__ */ p("div", { className: "group grid size-4 grid-cols-1", children: [
      /* @__PURE__ */ p(
        "input",
        {
          checked: e,
          onChange: (o) => t(o.target.checked),
          id: r,
          type: "checkbox",
          className: "checked:border-hello-csv-primary checked:bg-hello-csv-primary indeterminate:border-hello-csv-primary indeterminate:bg-hello-csv-primary focus-visible:outline-hello-csv-hello-csv-primary col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
        }
      ),
      /* @__PURE__ */ p(
        "svg",
        {
          fill: "none",
          viewBox: "0 0 14 14",
          className: "pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25",
          children: [
            /* @__PURE__ */ p(
              "path",
              {
                d: "M3 8L6 11L11 3.5",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "opacity-0 group-has-checked:opacity-100"
              }
            ),
            /* @__PURE__ */ p(
              "path",
              {
                d: "M3 7H11",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "opacity-0 group-has-indeterminate:opacity-100"
              }
            )
          ]
        }
      )
    ] }) }),
    n && /* @__PURE__ */ p("div", { className: "text-sm/6", children: /* @__PURE__ */ p("label", { htmlFor: r, className: "font-medium text-gray-900", children: n }) })
  ] });
}
let Au = !1;
function Do() {
  return Au;
}
const Yl = typeof document < "u" ? D.useLayoutEffect : () => {
};
function Nu(e) {
  const t = k(null);
  return Yl(() => {
    t.current = e;
  }, [
    e
  ]), ie((...n) => {
    const r = t.current;
    return r == null ? void 0 : r(...n);
  }, []);
}
const yt = (e) => {
  var t;
  return (t = e == null ? void 0 : e.ownerDocument) !== null && t !== void 0 ? t : document;
}, Et = (e) => e && "window" in e && e.window === e ? e : yt(e).defaultView || window;
function ku(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && typeof e.nodeType == "number";
}
function Du(e) {
  return ku(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
function Xl(e, t) {
  if (!Do()) return t && e ? e.contains(t) : !1;
  if (!e || !t) return !1;
  let n = t;
  for (; n !== null; ) {
    if (n === e) return !0;
    n.tagName === "SLOT" && n.assignedSlot ? n = n.assignedSlot.parentNode : Du(n) ? n = n.host : n = n.parentNode;
  }
  return !1;
}
const qr = (e = document) => {
  var t;
  if (!Do()) return e.activeElement;
  let n = e.activeElement;
  for (; n && "shadowRoot" in n && (!((t = n.shadowRoot) === null || t === void 0) && t.activeElement); ) n = n.shadowRoot.activeElement;
  return n;
};
function Zl(e) {
  return Do() && e.target.shadowRoot && e.composedPath ? e.composedPath()[0] : e.target;
}
function Lu(e) {
  var t;
  return typeof window > "u" || window.navigator == null ? !1 : ((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.brands.some((n) => e.test(n.brand))) || e.test(window.navigator.userAgent);
}
function Vu(e) {
  var t;
  return typeof window < "u" && window.navigator != null ? e.test(((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.platform) || window.navigator.platform) : !1;
}
function Jl(e) {
  let t = null;
  return () => (t == null && (t = e()), t);
}
const Hu = Jl(function() {
  return Vu(/^Mac/i);
}), zu = Jl(function() {
  return Lu(/Android/i);
});
function Ql() {
  let e = k(/* @__PURE__ */ new Map()), t = ie((o, i, l, s) => {
    let a = s != null && s.once ? (...u) => {
      e.current.delete(l), l(...u);
    } : l;
    e.current.set(l, {
      type: i,
      eventTarget: o,
      fn: a,
      options: s
    }), o.addEventListener(i, a, s);
  }, []), n = ie((o, i, l, s) => {
    var a;
    let u = ((a = e.current.get(l)) === null || a === void 0 ? void 0 : a.fn) || l;
    o.removeEventListener(i, u, s), e.current.delete(l);
  }, []), r = ie(() => {
    e.current.forEach((o, i) => {
      n(o.eventTarget, o.type, i, o.options);
    });
  }, [
    n
  ]);
  return re(() => r, [
    r
  ]), {
    addGlobalListener: t,
    removeGlobalListener: n,
    removeAllGlobalListeners: r
  };
}
function Bu(e) {
  return e.mozInputSource === 0 && e.isTrusted ? !0 : zu() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function es(e) {
  let t = e;
  return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {
  }, t;
}
function ju(e, t) {
  Object.defineProperty(e, "target", {
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    value: t
  });
}
function ts(e) {
  let t = k({
    isFocused: !1,
    observer: null
  });
  Yl(() => {
    const r = t.current;
    return () => {
      r.observer && (r.observer.disconnect(), r.observer = null);
    };
  }, []);
  let n = Nu((r) => {
    e == null || e(r);
  });
  return ie((r) => {
    if (r.target instanceof HTMLButtonElement || r.target instanceof HTMLInputElement || r.target instanceof HTMLTextAreaElement || r.target instanceof HTMLSelectElement) {
      t.current.isFocused = !0;
      let o = r.target, i = (l) => {
        if (t.current.isFocused = !1, o.disabled) {
          let s = es(l);
          n(s);
        }
        t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
      };
      o.addEventListener("focusout", i, {
        once: !0
      }), t.current.observer = new MutationObserver(() => {
        if (t.current.isFocused && o.disabled) {
          var l;
          (l = t.current.observer) === null || l === void 0 || l.disconnect();
          let s = o === document.activeElement ? null : document.activeElement;
          o.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: s
          })), o.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: s
          }));
        }
      }), t.current.observer.observe(o, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    n
  ]);
}
let Uu = !1, Sn = null, Kr = /* @__PURE__ */ new Set(), un = /* @__PURE__ */ new Map(), It = !1, Yr = !1;
const Wu = {
  Tab: !0,
  Escape: !0
};
function Lo(e, t) {
  for (let n of Kr) n(e, t);
}
function Gu(e) {
  return !(e.metaKey || !Hu() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function qn(e) {
  It = !0, Gu(e) && (Sn = "keyboard", Lo("keyboard", e));
}
function zt(e) {
  Sn = "pointer", (e.type === "mousedown" || e.type === "pointerdown") && (It = !0, Lo("pointer", e));
}
function ns(e) {
  Bu(e) && (It = !0, Sn = "virtual");
}
function rs(e) {
  e.target === window || e.target === document || Uu || !e.isTrusted || (!It && !Yr && (Sn = "virtual", Lo("virtual", e)), It = !1, Yr = !1);
}
function os() {
  It = !1, Yr = !0;
}
function Xr(e) {
  if (typeof window > "u" || un.get(Et(e))) return;
  const t = Et(e), n = yt(e);
  let r = t.HTMLElement.prototype.focus;
  t.HTMLElement.prototype.focus = function() {
    It = !0, r.apply(this, arguments);
  }, n.addEventListener("keydown", qn, !0), n.addEventListener("keyup", qn, !0), n.addEventListener("click", ns, !0), t.addEventListener("focus", rs, !0), t.addEventListener("blur", os, !1), typeof PointerEvent < "u" && (n.addEventListener("pointerdown", zt, !0), n.addEventListener("pointermove", zt, !0), n.addEventListener("pointerup", zt, !0)), t.addEventListener("beforeunload", () => {
    is(e);
  }, {
    once: !0
  }), un.set(t, {
    focus: r
  });
}
const is = (e, t) => {
  const n = Et(e), r = yt(e);
  t && r.removeEventListener("DOMContentLoaded", t), un.has(n) && (n.HTMLElement.prototype.focus = un.get(n).focus, r.removeEventListener("keydown", qn, !0), r.removeEventListener("keyup", qn, !0), r.removeEventListener("click", ns, !0), n.removeEventListener("focus", rs, !0), n.removeEventListener("blur", os, !1), typeof PointerEvent < "u" && (r.removeEventListener("pointerdown", zt, !0), r.removeEventListener("pointermove", zt, !0), r.removeEventListener("pointerup", zt, !0)), un.delete(n));
};
function qu(e) {
  const t = yt(e);
  let n;
  return t.readyState !== "loading" ? Xr(e) : (n = () => {
    Xr(e);
  }, t.addEventListener("DOMContentLoaded", n)), () => is(e, n);
}
typeof document < "u" && qu();
function ls() {
  return Sn !== "pointer";
}
const Ku = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function Yu(e, t, n) {
  let r = yt(n == null ? void 0 : n.target);
  const o = typeof window < "u" ? Et(n == null ? void 0 : n.target).HTMLInputElement : HTMLInputElement, i = typeof window < "u" ? Et(n == null ? void 0 : n.target).HTMLTextAreaElement : HTMLTextAreaElement, l = typeof window < "u" ? Et(n == null ? void 0 : n.target).HTMLElement : HTMLElement, s = typeof window < "u" ? Et(n == null ? void 0 : n.target).KeyboardEvent : KeyboardEvent;
  return e = e || r.activeElement instanceof o && !Ku.has(r.activeElement.type) || r.activeElement instanceof i || r.activeElement instanceof l && r.activeElement.isContentEditable, !(e && t === "keyboard" && n instanceof s && !Wu[n.key]);
}
function Xu(e, t, n) {
  Xr(), re(() => {
    let r = (o, i) => {
      Yu(!!(n != null && n.isTextInput), o, i) && e(ls());
    };
    return Kr.add(r), () => {
      Kr.delete(r);
    };
  }, t);
}
function Zu(e) {
  let { isDisabled: t, onFocus: n, onBlur: r, onFocusChange: o } = e;
  const i = ie((a) => {
    if (a.target === a.currentTarget)
      return r && r(a), o && o(!1), !0;
  }, [
    r,
    o
  ]), l = ts(i), s = ie((a) => {
    const u = yt(a.target), c = u ? qr(u) : qr();
    a.target === a.currentTarget && c === Zl(a.nativeEvent) && (n && n(a), o && o(!0), l(a));
  }, [
    o,
    n,
    l
  ]);
  return {
    focusProps: {
      onFocus: !t && (n || o || r) ? s : void 0,
      onBlur: !t && (r || o) ? i : void 0
    }
  };
}
function Ju(e) {
  let { isDisabled: t, onBlurWithin: n, onFocusWithin: r, onFocusWithinChange: o } = e, i = k({
    isFocusWithin: !1
  }), { addGlobalListener: l, removeAllGlobalListeners: s } = Ql(), a = ie((d) => {
    d.currentTarget.contains(d.target) && i.current.isFocusWithin && !d.currentTarget.contains(d.relatedTarget) && (i.current.isFocusWithin = !1, s(), n && n(d), o && o(!1));
  }, [
    n,
    o,
    i,
    s
  ]), u = ts(a), c = ie((d) => {
    if (!d.currentTarget.contains(d.target)) return;
    const m = yt(d.target), f = qr(m);
    if (!i.current.isFocusWithin && f === Zl(d.nativeEvent)) {
      r && r(d), o && o(!0), i.current.isFocusWithin = !0, u(d);
      let g = d.currentTarget;
      l(m, "focus", (h) => {
        if (i.current.isFocusWithin && !Xl(g, h.target)) {
          let v = new m.defaultView.FocusEvent("blur", {
            relatedTarget: h.target
          });
          ju(v, g);
          let x = es(v);
          a(x);
        }
      }, {
        capture: !0
      });
    }
  }, [
    r,
    o,
    u,
    l,
    a
  ]);
  return t ? {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus: c,
      onBlur: a
    }
  };
}
let Zr = !1, Sr = 0;
function Qu() {
  Zr = !0, setTimeout(() => {
    Zr = !1;
  }, 50);
}
function Ti(e) {
  e.pointerType === "touch" && Qu();
}
function ec() {
  if (!(typeof document > "u"))
    return typeof PointerEvent < "u" && document.addEventListener("pointerup", Ti), Sr++, () => {
      Sr--, !(Sr > 0) && typeof PointerEvent < "u" && document.removeEventListener("pointerup", Ti);
    };
}
function ss(e) {
  let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, isDisabled: o } = e, [i, l] = H(!1), s = k({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  re(ec, []);
  let { addGlobalListener: a, removeAllGlobalListeners: u } = Ql(), { hoverProps: c, triggerHoverEnd: d } = W(() => {
    let m = (h, v) => {
      if (s.pointerType = v, o || v === "touch" || s.isHovered || !h.currentTarget.contains(h.target)) return;
      s.isHovered = !0;
      let x = h.currentTarget;
      s.target = x, a(yt(h.target), "pointerover", (w) => {
        s.isHovered && s.target && !Xl(s.target, w.target) && f(w, w.pointerType);
      }, {
        capture: !0
      }), t && t({
        type: "hoverstart",
        target: x,
        pointerType: v
      }), n && n(!0), l(!0);
    }, f = (h, v) => {
      let x = s.target;
      s.pointerType = "", s.target = null, !(v === "touch" || !s.isHovered || !x) && (s.isHovered = !1, u(), r && r({
        type: "hoverend",
        target: x,
        pointerType: v
      }), n && n(!1), l(!1));
    }, g = {};
    return typeof PointerEvent < "u" && (g.onPointerEnter = (h) => {
      Zr && h.pointerType === "mouse" || m(h, h.pointerType);
    }, g.onPointerLeave = (h) => {
      !o && h.currentTarget.contains(h.target) && f(h, h.pointerType);
    }), {
      hoverProps: g,
      triggerHoverEnd: f
    };
  }, [
    t,
    n,
    r,
    o,
    s,
    a,
    u
  ]);
  return re(() => {
    o && d({
      currentTarget: s.target
    }, s.pointerType);
  }, [
    o
  ]), {
    hoverProps: c,
    isHovered: i
  };
}
function as(e = {}) {
  let { autoFocus: t = !1, isTextInput: n, within: r } = e, o = k({
    isFocused: !1,
    isFocusVisible: t || ls()
  }), [i, l] = H(!1), [s, a] = H(() => o.current.isFocused && o.current.isFocusVisible), u = ie(() => a(o.current.isFocused && o.current.isFocusVisible), []), c = ie((f) => {
    o.current.isFocused = f, l(f), u();
  }, [
    u
  ]);
  Xu((f) => {
    o.current.isFocusVisible = f, u();
  }, [], {
    isTextInput: n
  });
  let { focusProps: d } = Zu({
    isDisabled: r,
    onFocusChange: c
  }), { focusWithinProps: m } = Ju({
    isDisabled: !r,
    onFocusWithinChange: c
  });
  return {
    isFocused: i,
    isFocusVisible: s,
    focusProps: r ? m : d
  };
}
var tc = Object.defineProperty, nc = (e, t, n) => t in e ? tc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Cr = (e, t, n) => (nc(e, typeof t != "symbol" ? t + "" : t, n), n);
let rc = class {
  constructor() {
    Cr(this, "current", this.detect()), Cr(this, "handoffState", "pending"), Cr(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, Tt = new rc();
function Yt(e) {
  return Tt.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function rr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function Xe() {
  let e = [], t = { addEventListener(n, r, o, i) {
    return n.addEventListener(r, o, i), t.add(() => n.removeEventListener(r, o, i));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    return t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...n));
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    return t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return rr(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, o) {
    let i = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: o }), this.add(() => {
      Object.assign(n.style, { [r]: i });
    });
  }, group(n) {
    let r = Xe();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.includes(n) || e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let o of e.splice(r, 1)) o();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
function Pt() {
  let [e] = H(Xe);
  return re(() => () => e.dispose(), [e]), e;
}
let ce = (e, t) => {
  Tt.isServer ? re(e, t) : Je(e, t);
};
function bt(e) {
  let t = k(e);
  return ce(() => {
    t.current = e;
  }, [e]), t;
}
let U = function(e) {
  let t = bt(e);
  return D.useCallback((...n) => t.current(...n), [t]);
};
function oc(e) {
  let t = e.width / 2, n = e.height / 2;
  return { top: e.clientY - n, right: e.clientX + t, bottom: e.clientY + n, left: e.clientX - t };
}
function ic(e, t) {
  return !(!e || !t || e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom);
}
function lc({ disabled: e = !1 } = {}) {
  let t = k(null), [n, r] = H(!1), o = Pt(), i = U(() => {
    t.current = null, r(!1), o.dispose();
  }), l = U((s) => {
    if (o.dispose(), t.current === null) {
      t.current = s.currentTarget, r(!0);
      {
        let a = Yt(s.currentTarget);
        o.addEventListener(a, "pointerup", i, !1), o.addEventListener(a, "pointermove", (u) => {
          if (t.current) {
            let c = oc(u);
            r(ic(c, t.current.getBoundingClientRect()));
          }
        }, !1), o.addEventListener(a, "pointercancel", i, !1);
      }
    }
  });
  return { pressed: n, pressProps: e ? {} : { onPointerDown: l, onPointerUp: i, onClick: i } };
}
let sc = me(void 0);
function Vo() {
  return ae(sc);
}
function Jr(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function ke(e, t, ...n) {
  if (e in t) {
    let o = t[e];
    return typeof o == "function" ? o(...n) : o;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, ke), r;
}
var Wt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Wt || {}), pt = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(pt || {});
function Ee() {
  let e = uc();
  return ie((t) => ac({ mergeRefs: e, ...t }), [e]);
}
function ac({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: o, visible: i = !0, name: l, mergeRefs: s }) {
  s = s ?? cc;
  let a = us(t, e);
  if (i) return An(a, n, r, l, s);
  let u = o ?? 0;
  if (u & 2) {
    let { static: c = !1, ...d } = a;
    if (c) return An(d, n, r, l, s);
  }
  if (u & 1) {
    let { unmount: c = !0, ...d } = a;
    return ke(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return An({ ...d, hidden: !0, style: { display: "none" } }, n, r, l, s);
    } });
  }
  return An(a, n, r, l, s);
}
function An(e, t = {}, n, r, o) {
  let { as: i = n, children: l, refName: s = "ref", ...a } = Er(e, ["unmount", "static"]), u = e.ref !== void 0 ? { [s]: e.ref } : {}, c = typeof l == "function" ? l(t) : l;
  "className" in a && a.className && typeof a.className == "function" && (a.className = a.className(t)), a["aria-labelledby"] && a["aria-labelledby"] === a.id && (a["aria-labelledby"] = void 0);
  let d = {};
  if (t) {
    let m = !1, f = [];
    for (let [g, h] of Object.entries(t)) typeof h == "boolean" && (m = !0), h === !0 && f.push(g.replace(/([A-Z])/g, (v) => `-${v.toLowerCase()}`));
    if (m) {
      d["data-headlessui-state"] = f.join(" ");
      for (let g of f) d[`data-${g}`] = "";
    }
  }
  if (i === fe && (Object.keys(ft(a)).length > 0 || Object.keys(ft(d)).length > 0)) if (!Kt(c) || Array.isArray(c) && c.length > 1) {
    if (Object.keys(ft(a)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(ft(a)).concat(Object.keys(ft(d))).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
  } else {
    let m = c.props, f = m == null ? void 0 : m.className, g = typeof f == "function" ? (...x) => Jr(f(...x), a.className) : Jr(f, a.className), h = g ? { className: g } : {}, v = us(c.props, ft(Er(a, ["ref"])));
    for (let x in d) x in v && delete d[x];
    return No(c, Object.assign({}, v, d, u, { ref: o(dc(c), u.ref) }, h));
  }
  return P(i, Object.assign({}, Er(a, ["ref"]), i !== fe && u, i !== fe && d), c);
}
function uc() {
  let e = k([]), t = ie((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function cc(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function us(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let o in r) o.startsWith("on") && typeof r[o] == "function" ? (n[o] != null || (n[o] = []), n[o].push(r[o])) : t[o] = r[o];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(o) => {
    var i;
    return (i = o == null ? void 0 : o.preventDefault) == null ? void 0 : i.call(o);
  }]);
  for (let r in n) Object.assign(t, { [r](o, ...i) {
    let l = n[r];
    for (let s of l) {
      if ((o instanceof Event || (o == null ? void 0 : o.nativeEvent) instanceof Event) && o.defaultPrevented) return;
      s(o, ...i);
    }
  } });
  return t;
}
function Ho(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let o in r) o.startsWith("on") && typeof r[o] == "function" ? (n[o] != null || (n[o] = []), n[o].push(r[o])) : t[o] = r[o];
  for (let r in n) Object.assign(t, { [r](...o) {
    let i = n[r];
    for (let l of i) l == null || l(...o);
  } });
  return t;
}
function xe(e) {
  var t;
  return Object.assign(de(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function ft(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function Er(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function dc(e) {
  return D.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function fc(e, t, n) {
  let [r, o] = H(n), i = e !== void 0, l = k(i), s = k(!1), a = k(!1);
  return i && !l.current && !s.current ? (s.current = !0, l.current = i, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !i && l.current && !a.current && (a.current = !0, l.current = i, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [i ? e : r, U((u) => (i || o(u), t == null ? void 0 : t(u)))];
}
function pc(e) {
  let [t] = H(e);
  return t;
}
function cs(e = {}, t = null, n = []) {
  for (let [r, o] of Object.entries(e)) fs(n, ds(t, r), o);
  return n;
}
function ds(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function fs(e, t, n) {
  if (Array.isArray(n)) for (let [r, o] of n.entries()) fs(e, ds(t, r.toString()), o);
  else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == "boolean" ? e.push([t, n ? "1" : "0"]) : typeof n == "string" ? e.push([t, n]) : typeof n == "number" ? e.push([t, `${n}`]) : n == null ? e.push([t, ""]) : cs(n, t, e);
}
let mc = "span";
var Gt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Gt || {});
function gc(e, t) {
  var n;
  let { features: r = 1, ...o } = e, i = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = o["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return Ee()({ ourProps: i, theirProps: o, slot: {}, defaultTag: mc, name: "Hidden" });
}
let hn = xe(gc), hc = me(null);
function vc({ children: e }) {
  let t = ae(hc);
  if (!t) return D.createElement(D.Fragment, null, e);
  let { target: n } = t;
  return n ? xn(D.createElement(D.Fragment, null, e), n) : null;
}
function _c({ data: e, form: t, disabled: n, onReset: r, overrides: o }) {
  let [i, l] = H(null), s = Pt();
  return re(() => {
    if (r && i) return s.addEventListener(i, "reset", r);
  }, [i, t, r]), D.createElement(vc, null, D.createElement(wc, { setForm: l, formId: t }), cs(e).map(([a, u]) => D.createElement(hn, { features: Gt.Hidden, ...ft({ key: a, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: t, disabled: n, name: a, value: u, ...o }) })));
}
function wc({ setForm: e, formId: t }) {
  return re(() => {
    if (t) {
      let n = document.getElementById(t);
      n && e(n);
    }
  }, [e, t]), t ? null : D.createElement(hn, { features: Gt.Hidden, as: "input", type: "hidden", hidden: !0, readOnly: !0, ref: (n) => {
    if (!n) return;
    let r = n.closest("form");
    r && e(r);
  } });
}
let yc = me(void 0);
function ps() {
  return ae(yc);
}
function bc(e) {
  let t = e.parentElement, n = null;
  for (; t && !(t instanceof HTMLFieldSetElement); ) t instanceof HTMLLegendElement && (n = t), t = t.parentElement;
  let r = (t == null ? void 0 : t.getAttribute("disabled")) === "";
  return r && xc(n) ? !1 : r;
}
function xc(e) {
  if (!e) return !1;
  let t = e.previousElementSibling;
  for (; t !== null; ) {
    if (t instanceof HTMLLegendElement) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
let ms = Symbol();
function Sc(e, t = !0) {
  return Object.assign(e, { [ms]: t });
}
function Ae(...e) {
  let t = k(e);
  re(() => {
    t.current = e;
  }, [e]);
  let n = U((r) => {
    for (let o of t.current) o != null && (typeof o == "function" ? o(r) : o.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[ms])) ? void 0 : n;
}
let or = me(null);
or.displayName = "DescriptionContext";
function gs() {
  let e = ae(or);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, gs), t;
  }
  return e;
}
function Cc() {
  var e, t;
  return (t = (e = ae(or)) == null ? void 0 : e.value) != null ? t : void 0;
}
function Ec() {
  let [e, t] = H([]);
  return [e.length > 0 ? e.join(" ") : void 0, W(() => function(n) {
    let r = U((i) => (t((l) => [...l, i]), () => t((l) => {
      let s = l.slice(), a = s.indexOf(i);
      return a !== -1 && s.splice(a, 1), s;
    }))), o = W(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return D.createElement(or.Provider, { value: o }, n.children);
  }, [t])];
}
let Rc = "p";
function $c(e, t) {
  let n = Me(), r = Vo(), { id: o = `headlessui-description-${n}`, ...i } = e, l = gs(), s = Ae(t);
  ce(() => l.register(o), [o, l.register]);
  let a = r || !1, u = W(() => ({ ...l.slot, disabled: a }), [l.slot, a]), c = { ref: s, ...l.props, id: o };
  return Ee()({ ourProps: c, theirProps: i, slot: u, defaultTag: Rc, name: l.name || "Description" });
}
let Tc = xe($c), Ic = Object.assign(Tc, {});
var Ie = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Ie || {});
let ir = me(null);
ir.displayName = "LabelContext";
function hs() {
  let e = ae(ir);
  if (e === null) {
    let t = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, hs), t;
  }
  return e;
}
function lr(e) {
  var t, n, r;
  let o = (n = (t = ae(ir)) == null ? void 0 : t.value) != null ? n : void 0;
  return ((r = e == null ? void 0 : e.length) != null ? r : 0) > 0 ? [o, ...e].filter(Boolean).join(" ") : o;
}
function Oc({ inherit: e = !1 } = {}) {
  let t = lr(), [n, r] = H([]), o = e ? [t, ...n].filter(Boolean) : n;
  return [o.length > 0 ? o.join(" ") : void 0, W(() => function(i) {
    let l = U((a) => (r((u) => [...u, a]), () => r((u) => {
      let c = u.slice(), d = c.indexOf(a);
      return d !== -1 && c.splice(d, 1), c;
    }))), s = W(() => ({ register: l, slot: i.slot, name: i.name, props: i.props, value: i.value }), [l, i.slot, i.name, i.props, i.value]);
    return D.createElement(ir.Provider, { value: s }, i.children);
  }, [r])];
}
let Mc = "label";
function Fc(e, t) {
  var n;
  let r = Me(), o = hs(), i = ps(), l = Vo(), { id: s = `headlessui-label-${r}`, htmlFor: a = i ?? ((n = o.props) == null ? void 0 : n.htmlFor), passive: u = !1, ...c } = e, d = Ae(t);
  ce(() => o.register(s), [s, o.register]);
  let m = U((v) => {
    let x = v.currentTarget;
    if (x instanceof HTMLLabelElement && v.preventDefault(), o.props && "onClick" in o.props && typeof o.props.onClick == "function" && o.props.onClick(v), x instanceof HTMLLabelElement) {
      let w = document.getElementById(x.htmlFor);
      if (w) {
        let y = w.getAttribute("disabled");
        if (y === "true" || y === "") return;
        let C = w.getAttribute("aria-disabled");
        if (C === "true" || C === "") return;
        (w instanceof HTMLInputElement && (w.type === "radio" || w.type === "checkbox") || w.role === "radio" || w.role === "checkbox" || w.role === "switch") && w.click(), w.focus({ preventScroll: !0 });
      }
    }
  }), f = l || !1, g = W(() => ({ ...o.slot, disabled: f }), [o.slot, f]), h = { ref: d, ...o.props, id: s, htmlFor: a, onClick: m };
  return u && ("onClick" in h && (delete h.htmlFor, delete h.onClick), "onClick" in c && delete c.onClick), Ee()({ ourProps: h, theirProps: c, slot: g, defaultTag: a ? Mc : "div", name: o.name || "Label" });
}
let Pc = xe(Fc), Ac = Object.assign(Pc, {}), Nc = me(() => {
});
function kc({ value: e, children: t }) {
  return D.createElement(Nc.Provider, { value: e }, t);
}
function Lt(e, t, n) {
  let r = n.initialDeps ?? [], o;
  function i() {
    var l, s, a, u;
    let c;
    n.key && ((l = n.debug) != null && l.call(n)) && (c = Date.now());
    const d = e();
    if (!(d.length !== r.length || d.some((g, h) => r[h] !== g)))
      return o;
    r = d;
    let f;
    if (n.key && ((s = n.debug) != null && s.call(n)) && (f = Date.now()), o = t(...d), n.key && ((a = n.debug) != null && a.call(n))) {
      const g = Math.round((Date.now() - c) * 100) / 100, h = Math.round((Date.now() - f) * 100) / 100, v = h / 16, x = (w, y) => {
        for (w = String(w); w.length < y; )
          w = " " + w;
        return w;
      };
      console.info(
        `%c⏱ ${x(h, 5)} /${x(g, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * v, 120)
        )}deg 100% 31%);`,
        n == null ? void 0 : n.key
      );
    }
    return (u = n == null ? void 0 : n.onChange) == null || u.call(n, o), o;
  }
  return i.updateDeps = (l) => {
    r = l;
  }, i;
}
function Ii(e, t) {
  if (e === void 0)
    throw new Error("Unexpected undefined");
  return e;
}
const Dc = (e, t) => Math.abs(e - t) <= 1, Lc = (e, t, n) => {
  let r;
  return function(...o) {
    e.clearTimeout(r), r = e.setTimeout(() => t.apply(this, o), n);
  };
};
var nn = { NODE_ENV: "production" };
const Oi = (e) => {
  const { offsetWidth: t, offsetHeight: n } = e;
  return { width: t, height: n };
}, Vc = (e) => e, Hc = (e) => {
  const t = Math.max(e.startIndex - e.overscan, 0), n = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
  for (let o = t; o <= n; o++)
    r.push(o);
  return r;
}, zc = (e, t) => {
  const n = e.scrollElement;
  if (!n)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  const o = (l) => {
    const { width: s, height: a } = l;
    t({ width: Math.round(s), height: Math.round(a) });
  };
  if (o(Oi(n)), !r.ResizeObserver)
    return () => {
    };
  const i = new r.ResizeObserver((l) => {
    const s = () => {
      const a = l[0];
      if (a != null && a.borderBoxSize) {
        const u = a.borderBoxSize[0];
        if (u) {
          o({ width: u.inlineSize, height: u.blockSize });
          return;
        }
      }
      o(Oi(n));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(s) : s();
  });
  return i.observe(n, { box: "border-box" }), () => {
    i.unobserve(n);
  };
}, Mi = {
  passive: !0
}, Fi = typeof window > "u" ? !0 : "onscrollend" in window, Bc = (e, t) => {
  const n = e.scrollElement;
  if (!n)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  let o = 0;
  const i = e.options.useScrollendEvent && Fi ? () => {
  } : Lc(
    r,
    () => {
      t(o, !1);
    },
    e.options.isScrollingResetDelay
  ), l = (c) => () => {
    const { horizontal: d, isRtl: m } = e.options;
    o = d ? n.scrollLeft * (m && -1 || 1) : n.scrollTop, i(), t(o, c);
  }, s = l(!0), a = l(!1);
  a(), n.addEventListener("scroll", s, Mi);
  const u = e.options.useScrollendEvent && Fi;
  return u && n.addEventListener("scrollend", a, Mi), () => {
    n.removeEventListener("scroll", s), u && n.removeEventListener("scrollend", a);
  };
}, jc = (e, t, n) => {
  if (t != null && t.borderBoxSize) {
    const r = t.borderBoxSize[0];
    if (r)
      return Math.round(
        r[n.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return e[n.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, Uc = (e, {
  adjustments: t = 0,
  behavior: n
}, r) => {
  var o, i;
  const l = e + t;
  (i = (o = r.scrollElement) == null ? void 0 : o.scrollTo) == null || i.call(o, {
    [r.options.horizontal ? "left" : "top"]: l,
    behavior: n
  });
};
class Wc {
  constructor(t) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollToIndexTimeoutId = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let n = null;
      const r = () => n || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : n = new this.targetWindow.ResizeObserver((o) => {
        o.forEach((i) => {
          const l = () => {
            this._measureElement(i.target, i);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(l) : l();
        });
      }));
      return {
        disconnect: () => {
          var o;
          (o = r()) == null || o.disconnect(), n = null;
        },
        observe: (o) => {
          var i;
          return (i = r()) == null ? void 0 : i.observe(o, { box: "border-box" });
        },
        unobserve: (o) => {
          var i;
          return (i = r()) == null ? void 0 : i.unobserve(o);
        }
      };
    })(), this.range = null, this.setOptions = (n) => {
      Object.entries(n).forEach(([r, o]) => {
        typeof o > "u" && delete n[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: Vc,
        rangeExtractor: Hc,
        onChange: () => {
        },
        measureElement: jc,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        ...n
      };
    }, this.notify = (n) => {
      var r, o;
      (o = (r = this.options).onChange) == null || o.call(r, this, n);
    }, this.maybeNotify = Lt(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (n) => {
        this.notify(n);
      },
      {
        key: nn.NODE_ENV !== "production",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((n) => n()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var n;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((n = this.scrollElement) == null ? void 0 : n.window) ?? null, this.elementsCache.forEach((o) => {
          this.observer.observe(o);
        }), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        }), this.unsubs.push(
          this.options.observeElementRect(this, (o) => {
            this.scrollRect = o, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (o, i) => {
            this.scrollAdjustments = 0, this.scrollDirection = i ? this.getScrollOffset() < o ? "forward" : "backward" : null, this.scrollOffset = o, this.isScrolling = i, this.maybeNotify();
          })
        );
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (n, r) => {
      const o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
      for (let l = r - 1; l >= 0; l--) {
        const s = n[l];
        if (o.has(s.lane))
          continue;
        const a = i.get(
          s.lane
        );
        if (a == null || s.end > a.end ? i.set(s.lane, s) : s.end < a.end && o.set(s.lane, !0), o.size === this.options.lanes)
          break;
      }
      return i.size === this.options.lanes ? Array.from(i.values()).sort((l, s) => l.end === s.end ? l.index - s.index : l.end - s.end)[0] : void 0;
    }, this.getMeasurementOptions = Lt(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (n, r, o, i, l) => (this.pendingMeasuredCacheIndexes = [], {
        count: n,
        paddingStart: r,
        scrollMargin: o,
        getItemKey: i,
        enabled: l
      }),
      {
        key: !1
      }
    ), this.getMeasurements = Lt(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: n, paddingStart: r, scrollMargin: o, getItemKey: i, enabled: l }, s) => {
        if (!l)
          return this.measurementsCache = [], this.itemSizeCache.clear(), [];
        this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((c) => {
          this.itemSizeCache.set(c.key, c.size);
        }));
        const a = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const u = this.measurementsCache.slice(0, a);
        for (let c = a; c < n; c++) {
          const d = i(c), m = this.options.lanes === 1 ? u[c - 1] : this.getFurthestMeasurement(u, c), f = m ? m.end + this.options.gap : r + o, g = s.get(d), h = typeof g == "number" ? g : this.options.estimateSize(c), v = f + h, x = m ? m.lane : c % this.options.lanes;
          u[c] = {
            index: c,
            start: f,
            size: h,
            end: v,
            key: d,
            lane: x
          };
        }
        return this.measurementsCache = u, u;
      },
      {
        key: nn.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.calculateRange = Lt(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (n, r, o, i) => this.range = n.length > 0 && r > 0 ? Gc({
        measurements: n,
        outerSize: r,
        scrollOffset: o,
        lanes: i
      }) : null,
      {
        key: nn.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = Lt(
      () => {
        let n = null, r = null;
        const o = this.calculateRange();
        return o && (n = o.startIndex, r = o.endIndex), this.maybeNotify.updateDeps([this.isScrolling, n, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          n,
          r
        ];
      },
      (n, r, o, i, l) => i === null || l === null ? [] : n({
        startIndex: i,
        endIndex: l,
        overscan: r,
        count: o
      }),
      {
        key: nn.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (n) => {
      const r = this.options.indexAttribute, o = n.getAttribute(r);
      return o ? parseInt(o, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (n, r) => {
      const o = this.indexFromElement(n), i = this.measurementsCache[o];
      if (!i)
        return;
      const l = i.key, s = this.elementsCache.get(l);
      s !== n && (s && this.observer.unobserve(s), this.observer.observe(n), this.elementsCache.set(l, n)), n.isConnected && this.resizeItem(o, this.options.measureElement(n, r, this));
    }, this.resizeItem = (n, r) => {
      const o = this.measurementsCache[n];
      if (!o)
        return;
      const i = this.itemSizeCache.get(o.key) ?? o.size, l = r - i;
      l !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(o, l, this) : o.start < this.getScrollOffset() + this.scrollAdjustments) && this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += l,
        behavior: void 0
      }), this.pendingMeasuredCacheIndexes.push(o.index), this.itemSizeCache = new Map(this.itemSizeCache.set(o.key, r)), this.notify(!1));
    }, this.measureElement = (n) => {
      if (!n) {
        this.elementsCache.forEach((r, o) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(o));
        });
        return;
      }
      this._measureElement(n, void 0);
    }, this.getVirtualItems = Lt(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (n, r) => {
        const o = [];
        for (let i = 0, l = n.length; i < l; i++) {
          const s = n[i], a = r[s];
          o.push(a);
        }
        return o;
      },
      {
        key: nn.NODE_ENV !== "production",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (n) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return Ii(
          r[vs(
            0,
            r.length - 1,
            (o) => Ii(r[o]).start,
            n
          )]
        );
    }, this.getOffsetForAlignment = (n, r, o = 0) => {
      const i = this.getSize(), l = this.getScrollOffset();
      r === "auto" && (r = n >= l + i ? "end" : "start"), r === "center" ? n += (o - i) / 2 : r === "end" && (n -= i);
      const s = this.getTotalSize() - i;
      return Math.max(Math.min(s, n), 0);
    }, this.getOffsetForIndex = (n, r = "auto") => {
      n = Math.max(0, Math.min(n, this.options.count - 1));
      const o = this.measurementsCache[n];
      if (!o)
        return;
      const i = this.getSize(), l = this.getScrollOffset();
      if (r === "auto")
        if (o.end >= l + i - this.options.scrollPaddingEnd)
          r = "end";
        else if (o.start <= l + this.options.scrollPaddingStart)
          r = "start";
        else
          return [l, r];
      const s = r === "end" ? o.end + this.options.scrollPaddingEnd : o.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(s, r, o.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.cancelScrollToIndex = () => {
      this.scrollToIndexTimeoutId !== null && this.targetWindow && (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null);
    }, this.scrollToOffset = (n, { align: r = "start", behavior: o } = {}) => {
      this.cancelScrollToIndex(), o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(n, r), {
        adjustments: void 0,
        behavior: o
      });
    }, this.scrollToIndex = (n, { align: r = "auto", behavior: o } = {}) => {
      n = Math.max(0, Math.min(n, this.options.count - 1)), this.cancelScrollToIndex(), o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      );
      const i = this.getOffsetForIndex(n, r);
      if (!i) return;
      const [l, s] = i;
      this._scrollToOffset(l, { adjustments: void 0, behavior: o }), o !== "smooth" && this.isDynamicMode() && this.targetWindow && (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
        if (this.scrollToIndexTimeoutId = null, this.elementsCache.has(
          this.options.getItemKey(n)
        )) {
          const u = this.getOffsetForIndex(n, s);
          if (!u) return;
          const [c] = u, d = this.getScrollOffset();
          Dc(c, d) || this.scrollToIndex(n, { align: s, behavior: o });
        } else
          this.scrollToIndex(n, { align: s, behavior: o });
      }));
    }, this.scrollBy = (n, { behavior: r } = {}) => {
      this.cancelScrollToIndex(), r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + n, {
        adjustments: void 0,
        behavior: r
      });
    }, this.getTotalSize = () => {
      var n;
      const r = this.getMeasurements();
      let o;
      if (r.length === 0)
        o = this.options.paddingStart;
      else if (this.options.lanes === 1)
        o = ((n = r[r.length - 1]) == null ? void 0 : n.end) ?? 0;
      else {
        const i = Array(this.options.lanes).fill(null);
        let l = r.length - 1;
        for (; l >= 0 && i.some((s) => s === null); ) {
          const s = r[l];
          i[s.lane] === null && (i[s.lane] = s.end), l--;
        }
        o = Math.max(...i.filter((s) => s !== null));
      }
      return Math.max(
        o - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (n, {
      adjustments: r,
      behavior: o
    }) => {
      this.options.scrollToFn(n, { behavior: o, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(t);
  }
}
const vs = (e, t, n, r) => {
  for (; e <= t; ) {
    const o = (e + t) / 2 | 0, i = n(o);
    if (i < r)
      e = o + 1;
    else if (i > r)
      t = o - 1;
    else
      return o;
  }
  return e > 0 ? e - 1 : 0;
};
function Gc({
  measurements: e,
  outerSize: t,
  scrollOffset: n,
  lanes: r
}) {
  const o = e.length - 1, i = (a) => e[a].start;
  if (e.length <= r)
    return {
      startIndex: 0,
      endIndex: o
    };
  let l = vs(
    0,
    o,
    i,
    n
  ), s = l;
  if (r === 1)
    for (; s < o && e[s].end < n + t; )
      s++;
  else if (r > 1) {
    const a = Array(r).fill(0);
    for (; s < o && a.some((c) => c < n + t); ) {
      const c = e[s];
      a[c.lane] = c.end, s++;
    }
    const u = Array(r).fill(n + t);
    for (; l >= 0 && u.some((c) => c >= n); ) {
      const c = e[l];
      u[c.lane] = c.start, l--;
    }
    l = Math.max(0, l - l % r), s = Math.min(o, s + (r - 1 - s % r));
  }
  return { startIndex: l, endIndex: s };
}
const Pi = typeof document < "u" ? Je : re;
function qc(e) {
  const t = at(() => ({}), {})[1], n = {
    ...e,
    onChange: (o, i) => {
      var l;
      i ? De(t) : t(), (l = e.onChange) == null || l.call(e, o, i);
    }
  }, [r] = H(
    () => new Wc(n)
  );
  return r.setOptions(n), Pi(() => r._didMount(), []), Pi(() => r._willUpdate()), r;
}
function _s(e) {
  return qc({
    observeElementRect: zc,
    observeElementOffset: Bc,
    scrollToFn: Uc,
    ...e
  });
}
function Kc(e, t) {
  return e !== null && t !== null && typeof e == "object" && typeof t == "object" && "id" in e && "id" in t ? e.id === t.id : e === t;
}
function Yc(e = Kc) {
  return ie((t, n) => {
    if (typeof e == "string") {
      let r = e;
      return (t == null ? void 0 : t[r]) === (n == null ? void 0 : n[r]);
    }
    return e(t, n);
  }, [e]);
}
function Xc(e) {
  if (e === null) return { width: 0, height: 0 };
  let { width: t, height: n } = e.getBoundingClientRect();
  return { width: t, height: n };
}
function Ai(e, t = !1) {
  let [n, r] = at(() => ({}), {}), o = W(() => Xc(e), [e, n]);
  return ce(() => {
    if (!e) return;
    let i = new ResizeObserver(r);
    return i.observe(e), () => {
      i.disconnect();
    };
  }, [e]), t ? { width: `${o.width}px`, height: `${o.height}px` } : o;
}
let Zc = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
function ws(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(o) {
    return r.add(o), () => r.delete(o);
  }, dispatch(o, ...i) {
    let l = t[o].call(n, ...i);
    l && (n = l, r.forEach((s) => s()));
  } };
}
function ys(e) {
  return nr(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let Jc = new Zc(() => ws(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function Xt(e, t) {
  let n = Jc.get(t), r = Me(), o = ys(n);
  if (ce(() => {
    if (e) return n.dispatch("ADD", r), () => n.dispatch("REMOVE", r);
  }, [n, e]), !e) return !1;
  let i = o.indexOf(r), l = o.length;
  return i === -1 && (i = l, l += 1), i === l - 1;
}
let Qr = /* @__PURE__ */ new Map(), cn = /* @__PURE__ */ new Map();
function Ni(e) {
  var t;
  let n = (t = cn.get(e)) != null ? t : 0;
  return cn.set(e, n + 1), n !== 0 ? () => ki(e) : (Qr.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => ki(e));
}
function ki(e) {
  var t;
  let n = (t = cn.get(e)) != null ? t : 1;
  if (n === 1 ? cn.delete(e) : cn.set(e, n - 1), n !== 1) return;
  let r = Qr.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, Qr.delete(e));
}
function bs(e, { allowed: t, disallowed: n } = {}) {
  let r = Xt(e, "inert-others");
  ce(() => {
    var o, i;
    if (!r) return;
    let l = Xe();
    for (let a of (o = n == null ? void 0 : n()) != null ? o : []) a && l.add(Ni(a));
    let s = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let a of s) {
      if (!a) continue;
      let u = Yt(a);
      if (!u) continue;
      let c = a.parentElement;
      for (; c && c !== u.body; ) {
        for (let d of c.children) s.some((m) => d.contains(m)) || l.add(Ni(d));
        c = c.parentElement;
      }
    }
    return l.dispose;
  }, [r, t, n]);
}
function xs(e, t, n) {
  let r = bt((o) => {
    let i = o.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && n();
  });
  re(() => {
    if (!e) return;
    let o = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!o) return;
    let i = Xe();
    if (typeof ResizeObserver < "u") {
      let l = new ResizeObserver(() => r.current(o));
      l.observe(o), i.add(() => l.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let l = new IntersectionObserver(() => r.current(o));
      l.observe(o), i.add(() => l.disconnect());
    }
    return () => i.dispose();
  }, [t, r, e]);
}
let Kn = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Qc = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var nt = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(nt || {}), eo = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(eo || {}), ed = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(ed || {});
function td(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Kn)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function nd(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Qc)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Ss = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Ss || {});
function rd(e, t = 0) {
  var n;
  return e === ((n = Yt(e)) == null ? void 0 : n.body) ? !1 : ke(t, { 0() {
    return e.matches(Kn);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(Kn)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var od = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(od || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function lt(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let id = ["textarea", "input"].join(",");
function ld(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, id)) != null ? n : !1;
}
function Cs(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let o = t(n), i = t(r);
    if (o === null || i === null) return 0;
    let l = o.compareDocumentPosition(i);
    return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function dn(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: o = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, l = Array.isArray(e) ? n ? Cs(e) : e : t & 64 ? nd(e) : td(e);
  o.length > 0 && l.length > 1 && (l = l.filter((f) => !o.some((g) => g != null && "current" in g ? (g == null ? void 0 : g.current) === f : g === f))), r = r ?? i.activeElement;
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), a = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, l.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, l.indexOf(r)) + 1;
    if (t & 8) return l.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: !0 } : {}, c = 0, d = l.length, m;
  do {
    if (c >= d || c + d <= 0) return 0;
    let f = a + c;
    if (t & 16) f = (f + d) % d;
    else {
      if (f < 0) return 3;
      if (f >= d) return 1;
    }
    m = l[f], m == null || m.focus(u), c += s;
  } while (m !== i.activeElement);
  return t & 6 && ld(m) && m.select(), 2;
}
function Es() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function sd() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Rs() {
  return Es() || sd();
}
function rn(e, t, n, r) {
  let o = bt(n);
  re(() => {
    if (!e) return;
    function i(l) {
      o.current(l);
    }
    return document.addEventListener(t, i, r), () => document.removeEventListener(t, i, r);
  }, [e, t, r]);
}
function $s(e, t, n, r) {
  let o = bt(n);
  re(() => {
    if (!e) return;
    function i(l) {
      o.current(l);
    }
    return window.addEventListener(t, i, r), () => window.removeEventListener(t, i, r);
  }, [e, t, r]);
}
const Di = 30;
function Ts(e, t, n) {
  let r = Xt(e, "outside-click"), o = bt(n), i = ie(function(a, u) {
    if (a.defaultPrevented) return;
    let c = u(a);
    if (c === null || !c.getRootNode().contains(c) || !c.isConnected) return;
    let d = function m(f) {
      return typeof f == "function" ? m(f()) : Array.isArray(f) || f instanceof Set ? f : [f];
    }(t);
    for (let m of d) if (m !== null && (m.contains(c) || a.composed && a.composedPath().includes(m))) return;
    return !rd(c, Ss.Loose) && c.tabIndex !== -1 && a.preventDefault(), o.current(a, c);
  }, [o, t]), l = k(null);
  rn(r, "pointerdown", (a) => {
    var u, c;
    l.current = ((c = (u = a.composedPath) == null ? void 0 : u.call(a)) == null ? void 0 : c[0]) || a.target;
  }, !0), rn(r, "mousedown", (a) => {
    var u, c;
    l.current = ((c = (u = a.composedPath) == null ? void 0 : u.call(a)) == null ? void 0 : c[0]) || a.target;
  }, !0), rn(r, "click", (a) => {
    Rs() || l.current && (i(a, () => l.current), l.current = null);
  }, !0);
  let s = k({ x: 0, y: 0 });
  rn(r, "touchstart", (a) => {
    s.current.x = a.touches[0].clientX, s.current.y = a.touches[0].clientY;
  }, !0), rn(r, "touchend", (a) => {
    let u = { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
    if (!(Math.abs(u.x - s.current.x) >= Di || Math.abs(u.y - s.current.y) >= Di)) return i(a, () => a.target instanceof HTMLElement ? a.target : null);
  }, !0), $s(r, "blur", (a) => i(a, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function At(...e) {
  return W(() => Yt(...e), [...e]);
}
function zo(e, t, n, r) {
  let o = bt(n);
  re(() => {
    e = e ?? window;
    function i(l) {
      o.current(l);
    }
    return e.addEventListener(t, i, r), () => e.removeEventListener(t, i, r);
  }, [e, t, r]);
}
function Is(e) {
  let t = k({ value: "", selectionStart: null, selectionEnd: null });
  return zo(e, "blur", (n) => {
    let r = n.target;
    r instanceof HTMLInputElement && (t.current = { value: r.value, selectionStart: r.selectionStart, selectionEnd: r.selectionEnd });
  }), U(() => {
    if (document.activeElement !== e && e instanceof HTMLInputElement && e.isConnected) {
      if (e.focus({ preventScroll: !0 }), e.value !== t.current.value) e.setSelectionRange(e.value.length, e.value.length);
      else {
        let { selectionStart: n, selectionEnd: r } = t.current;
        n !== null && r !== null && e.setSelectionRange(n, r);
      }
      t.current = { value: "", selectionStart: null, selectionEnd: null };
    }
  });
}
function ad(e, t) {
  return W(() => {
    var n;
    if (e.type) return e.type;
    let r = (n = e.as) != null ? n : "button";
    if (typeof r == "string" && r.toLowerCase() === "button" || (t == null ? void 0 : t.tagName) === "BUTTON" && !t.hasAttribute("type")) return "button";
  }, [e.type, e.as, t]);
}
function ud() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, o = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, o.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, o = Math.max(0, r.clientWidth - r.offsetWidth), i = Math.max(0, e - o);
    n.style(r, "paddingRight", `${i}px`);
  } };
}
function cd() {
  return Es() ? { before({ doc: e, d: t, meta: n }) {
    function r(o) {
      return n.containers.flatMap((i) => i()).some((i) => i.contains(o));
    }
    t.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = Xe();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let i = (o = window.scrollY) != null ? o : window.pageYOffset, l = null;
      t.addEventListener(e, "click", (s) => {
        if (s.target instanceof HTMLElement) try {
          let a = s.target.closest("a");
          if (!a) return;
          let { hash: u } = new URL(a.href), c = e.querySelector(u);
          c && !r(c) && (l = c);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (s) => {
        if (s.target instanceof HTMLElement) if (r(s.target)) {
          let a = s.target;
          for (; a.parentElement && r(a.parentElement); ) a = a.parentElement;
          t.style(a, "overscrollBehavior", "contain");
        } else t.style(s.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (s) => {
        if (s.target instanceof HTMLElement) {
          if (s.target.tagName === "INPUT") return;
          if (r(s.target)) {
            let a = s.target;
            for (; a.parentElement && a.dataset.headlessuiPortal !== "" && !(a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth); ) a = a.parentElement;
            a.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let a = (s = window.scrollY) != null ? s : window.pageYOffset;
        i !== a && window.scrollTo(0, i), l && l.isConnected && (l.scrollIntoView({ block: "nearest" }), l = null);
      });
    });
  } } : {};
}
function dd() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function fd(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let Rt = ws(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: Xe(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: fd(n) }, o = [cd(), ud(), dd()];
  o.forEach(({ before: i }) => i == null ? void 0 : i(r)), o.forEach(({ after: i }) => i == null ? void 0 : i(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Rt.subscribe(() => {
  let e = Rt.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", o = n.count !== 0;
    (o && !r || !o && r) && Rt.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && Rt.dispatch("TEARDOWN", n);
  }
});
function pd(e, t, n = () => ({ containers: [] })) {
  let r = ys(Rt), o = t ? r.get(t) : void 0, i = o ? o.count > 0 : !1;
  return ce(() => {
    if (!(!t || !e)) return Rt.dispatch("PUSH", t, n), () => Rt.dispatch("POP", t, n);
  }, [e, t]), i;
}
function Os(e, t, n = () => [document.body]) {
  let r = Xt(e, "scroll-lock");
  pd(r, t, (o) => {
    var i;
    return { containers: [...(i = o.containers) != null ? i : [], n] };
  });
}
function Li(e) {
  return [e.screenX, e.screenY];
}
function md() {
  let e = k([-1, -1]);
  return { wasMoved(t) {
    let n = Li(t);
    return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0);
  }, update(t) {
    e.current = Li(t);
  } };
}
function gd(e = 0) {
  let [t, n] = H(e), r = ie((a) => n(a), [t]), o = ie((a) => n((u) => u | a), [t]), i = ie((a) => (t & a) === a, [t]), l = ie((a) => n((u) => u & ~a), [n]), s = ie((a) => n((u) => u ^ a), [n]);
  return { flags: t, setFlag: r, addFlag: o, hasFlag: i, removeFlag: l, toggleFlag: s };
}
var hd = { NODE_ENV: "production" }, Vi, Hi;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Vi = process == null ? void 0 : hd) == null ? void 0 : Vi.NODE_ENV) === "test" && typeof ((Hi = Element == null ? void 0 : Element.prototype) == null ? void 0 : Hi.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var vd = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(vd || {});
function Ms(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function Fs(e, t, n, r) {
  let [o, i] = H(n), { hasFlag: l, addFlag: s, removeFlag: a } = gd(e && o ? 3 : 0), u = k(!1), c = k(!1), d = Pt();
  return ce(() => {
    var m;
    if (e) {
      if (n && i(!0), !t) {
        n && s(3);
        return;
      }
      return (m = r == null ? void 0 : r.start) == null || m.call(r, n), _d(t, { inFlight: u, prepare() {
        c.current ? c.current = !1 : c.current = u.current, u.current = !0, !c.current && (n ? (s(3), a(4)) : (s(4), a(2)));
      }, run() {
        c.current ? n ? (a(3), s(4)) : (a(4), s(3)) : n ? a(1) : s(1);
      }, done() {
        var f;
        c.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (u.current = !1, a(7), n || i(!1), (f = r == null ? void 0 : r.end) == null || f.call(r, n));
      } });
    }
  }, [e, n, t, d]), e ? [o, { closed: l(1), enter: l(2), leave: l(4), transition: l(2) || l(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function _d(e, { prepare: t, run: n, done: r, inFlight: o }) {
  let i = Xe();
  return yd(e, { prepare: t, inFlight: o }), i.nextFrame(() => {
    n(), i.requestAnimationFrame(() => {
      i.add(wd(e, r));
    });
  }), i.dispose;
}
function wd(e, t) {
  var n, r;
  let o = Xe();
  if (!e) return o.dispose;
  let i = !1;
  o.add(() => {
    i = !0;
  });
  let l = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((s) => s instanceof CSSTransition)) != null ? r : [];
  return l.length === 0 ? (t(), o.dispose) : (Promise.allSettled(l.map((s) => s.finished)).then(() => {
    i || t();
  }), o.dispose);
}
function yd(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function bd(e, { container: t, accept: n, walk: r }) {
  let o = k(n), i = k(r);
  re(() => {
    o.current = n, i.current = r;
  }, [n, r]), ce(() => {
    if (!t || !e) return;
    let l = Yt(t);
    if (!l) return;
    let s = o.current, a = i.current, u = Object.assign((d) => s(d), { acceptNode: s }), c = l.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, u, !1);
    for (; c.nextNode(); ) a(c.currentNode);
  }, [t, e, o, i]);
}
function vn(e, t) {
  let n = k([]), r = U(e);
  re(() => {
    let o = [...n.current];
    for (let [i, l] of t.entries()) if (n.current[i] !== l) {
      let s = r(t, o);
      return n.current = t, s;
    }
  }, [r, ...t]);
}
function sr() {
  return typeof window < "u";
}
function Zt(e) {
  return Ps(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Le(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Qe(e) {
  var t;
  return (t = (Ps(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ps(e) {
  return sr() ? e instanceof Node || e instanceof Le(e).Node : !1;
}
function Fe(e) {
  return sr() ? e instanceof Element || e instanceof Le(e).Element : !1;
}
function Ze(e) {
  return sr() ? e instanceof HTMLElement || e instanceof Le(e).HTMLElement : !1;
}
function zi(e) {
  return !sr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Le(e).ShadowRoot;
}
function Cn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ue(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function xd(e) {
  return ["table", "td", "th"].includes(Zt(e));
}
function ar(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Bo(e) {
  const t = jo(), n = Fe(e) ? Ue(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Sd(e) {
  let t = ht(e);
  for (; Ze(t) && !qt(t); ) {
    if (Bo(t))
      return t;
    if (ar(t))
      return null;
    t = ht(t);
  }
  return null;
}
function jo() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function qt(e) {
  return ["html", "body", "#document"].includes(Zt(e));
}
function Ue(e) {
  return Le(e).getComputedStyle(e);
}
function ur(e) {
  return Fe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ht(e) {
  if (Zt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    zi(e) && e.host || // Fallback.
    Qe(e)
  );
  return zi(t) ? t.host : t;
}
function As(e) {
  const t = ht(e);
  return qt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ze(t) && Cn(t) ? t : As(t);
}
function _n(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = As(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), l = Le(o);
  if (i) {
    const s = to(l);
    return t.concat(l, l.visualViewport || [], Cn(o) ? o : [], s && n ? _n(s) : []);
  }
  return t.concat(o, _n(o, [], n));
}
function to(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Cd() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
const Ot = Math.min, Oe = Math.max, wn = Math.round, Nn = Math.floor, Ye = (e) => ({
  x: e,
  y: e
}), Ed = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Rd = {
  start: "end",
  end: "start"
};
function Bi(e, t, n) {
  return Oe(e, Ot(t, n));
}
function Jt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function En(e) {
  return e.split("-")[1];
}
function Ns(e) {
  return e === "x" ? "y" : "x";
}
function ks(e) {
  return e === "y" ? "height" : "width";
}
function gt(e) {
  return ["top", "bottom"].includes(vt(e)) ? "y" : "x";
}
function Ds(e) {
  return Ns(gt(e));
}
function $d(e, t, n) {
  n === void 0 && (n = !1);
  const r = En(e), o = Ds(e), i = ks(o);
  let l = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (l = Yn(l)), [l, Yn(l)];
}
function Td(e) {
  const t = Yn(e);
  return [no(e), t, no(t)];
}
function no(e) {
  return e.replace(/start|end/g, (t) => Rd[t]);
}
function Id(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], i = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? i : l;
    default:
      return [];
  }
}
function Od(e, t, n, r) {
  const o = En(e);
  let i = Id(vt(e), n === "start", r);
  return o && (i = i.map((l) => l + "-" + o), t && (i = i.concat(i.map(no)))), i;
}
function Yn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Ed[t]);
}
function Md(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Fd(e) {
  return typeof e != "number" ? Md(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Xn(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function ji(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = gt(t), l = Ds(t), s = ks(l), a = vt(t), u = i === "y", c = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, m = r[s] / 2 - o[s] / 2;
  let f;
  switch (a) {
    case "top":
      f = {
        x: c,
        y: r.y - o.height
      };
      break;
    case "bottom":
      f = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      f = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      f = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      f = {
        x: r.x,
        y: r.y
      };
  }
  switch (En(t)) {
    case "start":
      f[l] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      f[l] += m * (n && u ? -1 : 1);
      break;
  }
  return f;
}
const Pd = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: l
  } = n, s = i.filter(Boolean), a = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let u = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: c,
    y: d
  } = ji(u, r, a), m = r, f = {}, g = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: v,
      fn: x
    } = s[h], {
      x: w,
      y,
      data: C,
      reset: $
    } = await x({
      x: c,
      y: d,
      initialPlacement: r,
      placement: m,
      strategy: o,
      middlewareData: f,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = w ?? c, d = y ?? d, f = {
      ...f,
      [v]: {
        ...f[v],
        ...C
      }
    }, $ && g <= 50 && (g++, typeof $ == "object" && ($.placement && (m = $.placement), $.rects && (u = $.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : $.rects), {
      x: c,
      y: d
    } = ji(u, m, a)), h = -1);
  }
  return {
    x: c,
    y: d,
    placement: m,
    strategy: o,
    middlewareData: f
  };
};
async function cr(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: l,
    elements: s,
    strategy: a
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: f = 0
  } = Jt(t, e), g = Fd(f), v = s[m ? d === "floating" ? "reference" : "floating" : d], x = Xn(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(v))) == null || n ? v : v.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: a
  })), w = d === "floating" ? {
    x: r,
    y: o,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), C = await (i.isElement == null ? void 0 : i.isElement(y)) ? await (i.getScale == null ? void 0 : i.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, $ = Xn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: y,
    strategy: a
  }) : w);
  return {
    top: (x.top - $.top + g.top) / C.y,
    bottom: ($.bottom - x.bottom + g.bottom) / C.y,
    left: (x.left - $.left + g.left) / C.x,
    right: ($.right - x.right + g.right) / C.x
  };
}
const Ad = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: i,
        rects: l,
        initialPlacement: s,
        platform: a,
        elements: u
      } = t, {
        mainAxis: c = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: h = !0,
        ...v
      } = Jt(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const x = vt(o), w = gt(s), y = vt(s) === s, C = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), $ = m || (y || !h ? [Yn(s)] : Td(s)), O = g !== "none";
      !m && O && $.push(...Od(s, h, g, C));
      const R = [s, ...$], _ = await cr(t, v), b = [];
      let S = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (c && b.push(_[x]), d) {
        const j = $d(o, l, C);
        b.push(_[j[0]], _[j[1]]);
      }
      if (S = [...S, {
        placement: o,
        overflows: b
      }], !b.every((j) => j <= 0)) {
        var E, T;
        const j = (((E = i.flip) == null ? void 0 : E.index) || 0) + 1, G = R[j];
        if (G) {
          var F;
          const V = d === "alignment" ? w !== gt(G) : !1, M = ((F = S[0]) == null ? void 0 : F.overflows[0]) > 0;
          if (!V || M)
            return {
              data: {
                index: j,
                overflows: S
              },
              reset: {
                placement: G
              }
            };
        }
        let z = (T = S.filter((V) => V.overflows[0] <= 0).sort((V, M) => V.overflows[1] - M.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!z)
          switch (f) {
            case "bestFit": {
              var A;
              const V = (A = S.filter((M) => {
                if (O) {
                  const K = gt(M.placement);
                  return K === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  K === "y";
                }
                return !0;
              }).map((M) => [M.placement, M.overflows.filter((K) => K > 0).reduce((K, N) => K + N, 0)]).sort((M, K) => M[1] - K[1])[0]) == null ? void 0 : A[0];
              V && (z = V);
              break;
            }
            case "initialPlacement":
              z = s;
              break;
          }
        if (o !== z)
          return {
            reset: {
              placement: z
            }
          };
      }
      return {};
    }
  };
};
async function Nd(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), l = vt(n), s = En(n), a = gt(n) === "y", u = ["left", "top"].includes(l) ? -1 : 1, c = i && a ? -1 : 1, d = Jt(t, e);
  let {
    mainAxis: m,
    crossAxis: f,
    alignmentAxis: g
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return s && typeof g == "number" && (f = s === "end" ? g * -1 : g), a ? {
    x: f * c,
    y: m * u
  } : {
    x: m * u,
    y: f * c
  };
}
const kd = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: i,
        placement: l,
        middlewareData: s
      } = t, a = await Nd(t, e);
      return l === ((n = s.offset) == null ? void 0 : n.placement) && (r = s.arrow) != null && r.alignmentOffset ? {} : {
        x: o + a.x,
        y: i + a.y,
        data: {
          ...a,
          placement: l
        }
      };
    }
  };
}, Dd = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: i = !0,
        crossAxis: l = !1,
        limiter: s = {
          fn: (v) => {
            let {
              x,
              y: w
            } = v;
            return {
              x,
              y: w
            };
          }
        },
        ...a
      } = Jt(e, t), u = {
        x: n,
        y: r
      }, c = await cr(t, a), d = gt(vt(o)), m = Ns(d);
      let f = u[m], g = u[d];
      if (i) {
        const v = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", w = f + c[v], y = f - c[x];
        f = Bi(w, f, y);
      }
      if (l) {
        const v = d === "y" ? "top" : "left", x = d === "y" ? "bottom" : "right", w = g + c[v], y = g - c[x];
        g = Bi(w, g, y);
      }
      const h = s.fn({
        ...t,
        [m]: f,
        [d]: g
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r,
          enabled: {
            [m]: i,
            [d]: l
          }
        }
      };
    }
  };
}, Ld = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: i,
        platform: l,
        elements: s
      } = t, {
        apply: a = () => {
        },
        ...u
      } = Jt(e, t), c = await cr(t, u), d = vt(o), m = En(o), f = gt(o) === "y", {
        width: g,
        height: h
      } = i.floating;
      let v, x;
      d === "top" || d === "bottom" ? (v = d, x = m === (await (l.isRTL == null ? void 0 : l.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (x = d, v = m === "end" ? "top" : "bottom");
      const w = h - c.top - c.bottom, y = g - c.left - c.right, C = Ot(h - c[v], w), $ = Ot(g - c[x], y), O = !t.middlewareData.shift;
      let R = C, _ = $;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (_ = y), (r = t.middlewareData.shift) != null && r.enabled.y && (R = w), O && !m) {
        const S = Oe(c.left, 0), E = Oe(c.right, 0), T = Oe(c.top, 0), F = Oe(c.bottom, 0);
        f ? _ = g - 2 * (S !== 0 || E !== 0 ? S + E : Oe(c.left, c.right)) : R = h - 2 * (T !== 0 || F !== 0 ? T + F : Oe(c.top, c.bottom));
      }
      await a({
        ...t,
        availableWidth: _,
        availableHeight: R
      });
      const b = await l.getDimensions(s.floating);
      return g !== b.width || h !== b.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ls(e) {
  const t = Ue(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Ze(e), i = o ? e.offsetWidth : n, l = o ? e.offsetHeight : r, s = wn(n) !== i || wn(r) !== l;
  return s && (n = i, r = l), {
    width: n,
    height: r,
    $: s
  };
}
function Uo(e) {
  return Fe(e) ? e : e.contextElement;
}
function Bt(e) {
  const t = Uo(e);
  if (!Ze(t))
    return Ye(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = Ls(t);
  let l = (i ? wn(n.width) : n.width) / r, s = (i ? wn(n.height) : n.height) / o;
  return (!l || !Number.isFinite(l)) && (l = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: l,
    y: s
  };
}
const Vd = /* @__PURE__ */ Ye(0);
function Vs(e) {
  const t = Le(e);
  return !jo() || !t.visualViewport ? Vd : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Hd(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Le(e) ? !1 : t;
}
function Mt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = Uo(e);
  let l = Ye(1);
  t && (r ? Fe(r) && (l = Bt(r)) : l = Bt(e));
  const s = Hd(i, n, r) ? Vs(i) : Ye(0);
  let a = (o.left + s.x) / l.x, u = (o.top + s.y) / l.y, c = o.width / l.x, d = o.height / l.y;
  if (i) {
    const m = Le(i), f = r && Fe(r) ? Le(r) : r;
    let g = m, h = to(g);
    for (; h && r && f !== g; ) {
      const v = Bt(h), x = h.getBoundingClientRect(), w = Ue(h), y = x.left + (h.clientLeft + parseFloat(w.paddingLeft)) * v.x, C = x.top + (h.clientTop + parseFloat(w.paddingTop)) * v.y;
      a *= v.x, u *= v.y, c *= v.x, d *= v.y, a += y, u += C, g = Le(h), h = to(g);
    }
  }
  return Xn({
    width: c,
    height: d,
    x: a,
    y: u
  });
}
function Wo(e, t) {
  const n = ur(e).scrollLeft;
  return t ? t.left + n : Mt(Qe(e)).left + n;
}
function Hs(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Wo(e, r)
  )), i = r.top + t.scrollTop;
  return {
    x: o,
    y: i
  };
}
function zd(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const i = o === "fixed", l = Qe(r), s = t ? ar(t.floating) : !1;
  if (r === l || s && i)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Ye(1);
  const c = Ye(0), d = Ze(r);
  if ((d || !d && !i) && ((Zt(r) !== "body" || Cn(l)) && (a = ur(r)), Ze(r))) {
    const f = Mt(r);
    u = Bt(r), c.x = f.x + r.clientLeft, c.y = f.y + r.clientTop;
  }
  const m = l && !d && !i ? Hs(l, a, !0) : Ye(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - a.scrollLeft * u.x + c.x + m.x,
    y: n.y * u.y - a.scrollTop * u.y + c.y + m.y
  };
}
function Bd(e) {
  return Array.from(e.getClientRects());
}
function jd(e) {
  const t = Qe(e), n = ur(e), r = e.ownerDocument.body, o = Oe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = Oe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let l = -n.scrollLeft + Wo(e);
  const s = -n.scrollTop;
  return Ue(r).direction === "rtl" && (l += Oe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: l,
    y: s
  };
}
function Ud(e, t) {
  const n = Le(e), r = Qe(e), o = n.visualViewport;
  let i = r.clientWidth, l = r.clientHeight, s = 0, a = 0;
  if (o) {
    i = o.width, l = o.height;
    const u = jo();
    (!u || u && t === "fixed") && (s = o.offsetLeft, a = o.offsetTop);
  }
  return {
    width: i,
    height: l,
    x: s,
    y: a
  };
}
function Wd(e, t) {
  const n = Mt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = Ze(e) ? Bt(e) : Ye(1), l = e.clientWidth * i.x, s = e.clientHeight * i.y, a = o * i.x, u = r * i.y;
  return {
    width: l,
    height: s,
    x: a,
    y: u
  };
}
function Ui(e, t, n) {
  let r;
  if (t === "viewport")
    r = Ud(e, n);
  else if (t === "document")
    r = jd(Qe(e));
  else if (Fe(t))
    r = Wd(t, n);
  else {
    const o = Vs(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Xn(r);
}
function zs(e, t) {
  const n = ht(e);
  return n === t || !Fe(n) || qt(n) ? !1 : Ue(n).position === "fixed" || zs(n, t);
}
function Gd(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = _n(e, [], !1).filter((s) => Fe(s) && Zt(s) !== "body"), o = null;
  const i = Ue(e).position === "fixed";
  let l = i ? ht(e) : e;
  for (; Fe(l) && !qt(l); ) {
    const s = Ue(l), a = Bo(l);
    !a && s.position === "fixed" && (o = null), (i ? !a && !o : !a && s.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Cn(l) && !a && zs(e, l)) ? r = r.filter((c) => c !== l) : o = s, l = ht(l);
  }
  return t.set(e, r), r;
}
function qd(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const l = [...n === "clippingAncestors" ? ar(t) ? [] : Gd(t, this._c) : [].concat(n), r], s = l[0], a = l.reduce((u, c) => {
    const d = Ui(t, c, o);
    return u.top = Oe(d.top, u.top), u.right = Ot(d.right, u.right), u.bottom = Ot(d.bottom, u.bottom), u.left = Oe(d.left, u.left), u;
  }, Ui(t, s, o));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function Kd(e) {
  const {
    width: t,
    height: n
  } = Ls(e);
  return {
    width: t,
    height: n
  };
}
function Yd(e, t, n) {
  const r = Ze(t), o = Qe(t), i = n === "fixed", l = Mt(e, !0, i, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = Ye(0);
  function u() {
    a.x = Wo(o);
  }
  if (r || !r && !i)
    if ((Zt(t) !== "body" || Cn(o)) && (s = ur(t)), r) {
      const f = Mt(t, !0, i, t);
      a.x = f.x + t.clientLeft, a.y = f.y + t.clientTop;
    } else o && u();
  i && !r && o && u();
  const c = o && !r && !i ? Hs(o, s) : Ye(0), d = l.left + s.scrollLeft - a.x - c.x, m = l.top + s.scrollTop - a.y - c.y;
  return {
    x: d,
    y: m,
    width: l.width,
    height: l.height
  };
}
function Rr(e) {
  return Ue(e).position === "static";
}
function Wi(e, t) {
  if (!Ze(e) || Ue(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Qe(e) === n && (n = n.ownerDocument.body), n;
}
function Bs(e, t) {
  const n = Le(e);
  if (ar(e))
    return n;
  if (!Ze(e)) {
    let o = ht(e);
    for (; o && !qt(o); ) {
      if (Fe(o) && !Rr(o))
        return o;
      o = ht(o);
    }
    return n;
  }
  let r = Wi(e, t);
  for (; r && xd(r) && Rr(r); )
    r = Wi(r, t);
  return r && qt(r) && Rr(r) && !Bo(r) ? n : r || Sd(e) || n;
}
const Xd = async function(e) {
  const t = this.getOffsetParent || Bs, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Yd(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Zd(e) {
  return Ue(e).direction === "rtl";
}
const Jd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: zd,
  getDocumentElement: Qe,
  getClippingRect: qd,
  getOffsetParent: Bs,
  getElementRects: Xd,
  getClientRects: Bd,
  getDimensions: Kd,
  getScale: Bt,
  isElement: Fe,
  isRTL: Zd
};
function js(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Qd(e, t) {
  let n = null, r;
  const o = Qe(e);
  function i() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), n = null;
  }
  function l(s, a) {
    s === void 0 && (s = !1), a === void 0 && (a = 1), i();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: d,
      width: m,
      height: f
    } = u;
    if (s || t(), !m || !f)
      return;
    const g = Nn(d), h = Nn(o.clientWidth - (c + m)), v = Nn(o.clientHeight - (d + f)), x = Nn(c), y = {
      rootMargin: -g + "px " + -h + "px " + -v + "px " + -x + "px",
      threshold: Oe(0, Ot(1, a)) || 1
    };
    let C = !0;
    function $(O) {
      const R = O[0].intersectionRatio;
      if (R !== a) {
        if (!C)
          return l();
        R ? l(!1, R) : r = setTimeout(() => {
          l(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !js(u, e.getBoundingClientRect()) && l(), C = !1;
    }
    try {
      n = new IntersectionObserver($, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver($, y);
    }
    n.observe(e);
  }
  return l(!0), i;
}
function ef(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = r, u = Uo(e), c = o || i ? [...u ? _n(u) : [], ..._n(t)] : [];
  c.forEach((x) => {
    o && x.addEventListener("scroll", n, {
      passive: !0
    }), i && x.addEventListener("resize", n);
  });
  const d = u && s ? Qd(u, n) : null;
  let m = -1, f = null;
  l && (f = new ResizeObserver((x) => {
    let [w] = x;
    w && w.target === u && f && (f.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var y;
      (y = f) == null || y.observe(t);
    })), n();
  }), u && !a && f.observe(u), f.observe(t));
  let g, h = a ? Mt(e) : null;
  a && v();
  function v() {
    const x = Mt(e);
    h && !js(h, x) && n(), h = x, g = requestAnimationFrame(v);
  }
  return n(), () => {
    var x;
    c.forEach((w) => {
      o && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), d == null || d(), (x = f) == null || x.disconnect(), f = null, a && cancelAnimationFrame(g);
  };
}
const $r = cr, tf = kd, nf = Dd, rf = Ad, of = Ld, lf = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Jd,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return Pd(e, t, {
    ...o,
    platform: i
  });
};
var jn = typeof document < "u" ? Je : re;
function Zn(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!Zn(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !Zn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Us(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Gi(e, t) {
  const n = Us(e);
  return Math.round(t * n) / n;
}
function Tr(e) {
  const t = k(e);
  return jn(() => {
    t.current = e;
  }), t;
}
function sf(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: i,
      floating: l
    } = {},
    transform: s = !0,
    whileElementsMounted: a,
    open: u
  } = e, [c, d] = H({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, f] = H(r);
  Zn(m, r) || f(r);
  const [g, h] = H(null), [v, x] = H(null), w = ie((V) => {
    V !== O.current && (O.current = V, h(V));
  }, []), y = ie((V) => {
    V !== R.current && (R.current = V, x(V));
  }, []), C = i || g, $ = l || v, O = k(null), R = k(null), _ = k(c), b = a != null, S = Tr(a), E = Tr(o), T = Tr(u), F = ie(() => {
    if (!O.current || !R.current)
      return;
    const V = {
      placement: t,
      strategy: n,
      middleware: m
    };
    E.current && (V.platform = E.current), lf(O.current, R.current, V).then((M) => {
      const K = {
        ...M,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: T.current !== !1
      };
      A.current && !Zn(_.current, K) && (_.current = K, De(() => {
        d(K);
      }));
    });
  }, [m, t, n, E, T]);
  jn(() => {
    u === !1 && _.current.isPositioned && (_.current.isPositioned = !1, d((V) => ({
      ...V,
      isPositioned: !1
    })));
  }, [u]);
  const A = k(!1);
  jn(() => (A.current = !0, () => {
    A.current = !1;
  }), []), jn(() => {
    if (C && (O.current = C), $ && (R.current = $), C && $) {
      if (S.current)
        return S.current(C, $, F);
      F();
    }
  }, [C, $, F, S, b]);
  const j = W(() => ({
    reference: O,
    floating: R,
    setReference: w,
    setFloating: y
  }), [w, y]), G = W(() => ({
    reference: C,
    floating: $
  }), [C, $]), z = W(() => {
    const V = {
      position: n,
      left: 0,
      top: 0
    };
    if (!G.floating)
      return V;
    const M = Gi(G.floating, c.x), K = Gi(G.floating, c.y);
    return s ? {
      ...V,
      transform: "translate(" + M + "px, " + K + "px)",
      ...Us(G.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: M,
      top: K
    };
  }, [n, s, G.floating, c.x, c.y]);
  return W(() => ({
    ...c,
    update: F,
    refs: j,
    elements: G,
    floatingStyles: z
  }), [c, F, j, G, z]);
}
const Ws = (e, t) => ({
  ...tf(e),
  options: [e, t]
}), af = (e, t) => ({
  ...nf(e),
  options: [e, t]
}), uf = (e, t) => ({
  ...rf(e),
  options: [e, t]
}), cf = (e, t) => ({
  ...of(e),
  options: [e, t]
}), Gs = {
  ...Gr
}, df = Gs.useInsertionEffect, ff = df || ((e) => e());
function qs(e) {
  const t = k(() => {
  });
  return ff(() => {
    t.current = e;
  }), ie(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
var ro = typeof document < "u" ? Je : re;
let qi = !1, pf = 0;
const Ki = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + pf++
);
function mf() {
  const [e, t] = H(() => qi ? Ki() : void 0);
  return ro(() => {
    e == null && t(Ki());
  }, []), re(() => {
    qi = !0;
  }, []), e;
}
const gf = Gs.useId, hf = gf || mf;
function vf() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((o) => o(n));
    },
    on(t, n) {
      e.set(t, [...e.get(t) || [], n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((o) => o !== n)) || []);
    }
  };
}
const _f = /* @__PURE__ */ me(null), wf = /* @__PURE__ */ me(null), yf = () => {
  var e;
  return ((e = ae(_f)) == null ? void 0 : e.id) || null;
}, bf = () => ae(wf), xf = "data-floating-ui-focusable";
function Sf(e) {
  const {
    open: t = !1,
    onOpenChange: n,
    elements: r
  } = e, o = hf(), i = k({}), [l] = H(() => vf()), s = yf() != null, [a, u] = H(r.reference), c = qs((f, g, h) => {
    i.current.openEvent = f ? g : void 0, l.emit("openchange", {
      open: f,
      event: g,
      reason: h,
      nested: s
    }), n == null || n(f, g, h);
  }), d = W(() => ({
    setPositionReference: u
  }), []), m = W(() => ({
    reference: a || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [a, r.reference, r.floating]);
  return W(() => ({
    dataRef: i,
    open: t,
    onOpenChange: c,
    elements: m,
    events: l,
    floatingId: o,
    refs: d
  }), [t, c, m, l, o, d]);
}
function Cf(e) {
  e === void 0 && (e = {});
  const {
    nodeId: t
  } = e, n = Sf({
    ...e,
    elements: {
      reference: null,
      floating: null,
      ...e.elements
    }
  }), r = e.rootContext || n, o = r.elements, [i, l] = H(null), [s, a] = H(null), c = (o == null ? void 0 : o.domReference) || i, d = k(null), m = bf();
  ro(() => {
    c && (d.current = c);
  }, [c]);
  const f = sf({
    ...e,
    elements: {
      ...o,
      ...s && {
        reference: s
      }
    }
  }), g = ie((y) => {
    const C = Fe(y) ? {
      getBoundingClientRect: () => y.getBoundingClientRect(),
      contextElement: y
    } : y;
    a(C), f.refs.setReference(C);
  }, [f.refs]), h = ie((y) => {
    (Fe(y) || y === null) && (d.current = y, l(y)), (Fe(f.refs.reference.current) || f.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    y !== null && !Fe(y)) && f.refs.setReference(y);
  }, [f.refs]), v = W(() => ({
    ...f.refs,
    setReference: h,
    setPositionReference: g,
    domReference: d
  }), [f.refs, h, g]), x = W(() => ({
    ...f.elements,
    domReference: c
  }), [f.elements, c]), w = W(() => ({
    ...f,
    ...r,
    refs: v,
    elements: x,
    nodeId: t
  }), [f, v, x, t, r]);
  return ro(() => {
    r.dataRef.current.floatingContext = w;
    const y = m == null ? void 0 : m.nodesRef.current.find((C) => C.id === t);
    y && (y.context = w);
  }), W(() => ({
    ...f,
    context: w,
    refs: v,
    elements: x
  }), [f, v, x, w]);
}
const Yi = "active", Xi = "selected";
function Ir(e, t, n) {
  const r = /* @__PURE__ */ new Map(), o = n === "item";
  let i = e;
  if (o && e) {
    const {
      [Yi]: l,
      [Xi]: s,
      ...a
    } = e;
    i = a;
  }
  return {
    ...n === "floating" && {
      tabIndex: -1,
      [xf]: ""
    },
    ...i,
    ...t.map((l) => {
      const s = l ? l[n] : null;
      return typeof s == "function" ? e ? s(e) : null : s;
    }).concat(e).reduce((l, s) => (s && Object.entries(s).forEach((a) => {
      let [u, c] = a;
      if (!(o && [Yi, Xi].includes(u)))
        if (u.indexOf("on") === 0) {
          if (r.has(u) || r.set(u, []), typeof c == "function") {
            var d;
            (d = r.get(u)) == null || d.push(c), l[u] = function() {
              for (var m, f = arguments.length, g = new Array(f), h = 0; h < f; h++)
                g[h] = arguments[h];
              return (m = r.get(u)) == null ? void 0 : m.map((v) => v(...g)).find((v) => v !== void 0);
            };
          }
        } else
          l[u] = c;
    }), l), {})
  };
}
function Ef(e) {
  e === void 0 && (e = []);
  const t = e.map((s) => s == null ? void 0 : s.reference), n = e.map((s) => s == null ? void 0 : s.floating), r = e.map((s) => s == null ? void 0 : s.item), o = ie(
    (s) => Ir(s, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), i = ie(
    (s) => Ir(s, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), l = ie(
    (s) => Ir(s, e, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    r
  );
  return W(() => ({
    getReferenceProps: o,
    getFloatingProps: i,
    getItemProps: l
  }), [o, i, l]);
}
function Zi(e, t) {
  return {
    ...e,
    rects: {
      ...e.rects,
      floating: {
        ...e.rects.floating,
        height: t
      }
    }
  };
}
const Rf = (e) => ({
  name: "inner",
  options: e,
  async fn(t) {
    const {
      listRef: n,
      overflowRef: r,
      onFallbackChange: o,
      offset: i = 0,
      index: l = 0,
      minItemsVisible: s = 4,
      referenceOverflowThreshold: a = 0,
      scrollRef: u,
      ...c
    } = Jt(e, t), {
      rects: d,
      elements: {
        floating: m
      }
    } = t, f = n.current[l], g = (u == null ? void 0 : u.current) || m, h = m.clientTop || g.clientTop, v = m.clientTop !== 0, x = g.clientTop !== 0, w = m === g;
    if (!f)
      return {};
    const y = {
      ...t,
      ...await Ws(-f.offsetTop - m.clientTop - d.reference.height / 2 - f.offsetHeight / 2 - i).fn(t)
    }, C = await $r(Zi(y, g.scrollHeight + h + m.clientTop), c), $ = await $r(y, {
      ...c,
      elementContext: "reference"
    }), O = Oe(0, C.top), R = y.y + O, S = (g.scrollHeight > g.clientHeight ? (E) => E : wn)(Oe(0, g.scrollHeight + (v && w || x ? h * 2 : 0) - O - Oe(0, C.bottom)));
    if (g.style.maxHeight = S + "px", g.scrollTop = O, o) {
      const E = g.offsetHeight < f.offsetHeight * Ot(s, n.current.length) - 1 || $.top >= -a || $.bottom >= -a;
      De(() => o(E));
    }
    return r && (r.current = await $r(Zi({
      ...y,
      y: R
    }, g.offsetHeight + h + m.clientTop), c)), {
      y: R
    };
  }
});
function $f(e, t) {
  const {
    open: n,
    elements: r
  } = e, {
    enabled: o = !0,
    overflowRef: i,
    scrollRef: l,
    onChange: s
  } = t, a = qs(s), u = k(!1), c = k(null), d = k(null);
  re(() => {
    if (!o) return;
    function f(h) {
      if (h.ctrlKey || !g || i.current == null)
        return;
      const v = h.deltaY, x = i.current.top >= -0.5, w = i.current.bottom >= -0.5, y = g.scrollHeight - g.clientHeight, C = v < 0 ? -1 : 1, $ = v < 0 ? "max" : "min";
      g.scrollHeight <= g.clientHeight || (!x && v > 0 || !w && v < 0 ? (h.preventDefault(), De(() => {
        a((O) => O + Math[$](v, y * C));
      })) : /firefox/i.test(Cd()) && (g.scrollTop += v));
    }
    const g = (l == null ? void 0 : l.current) || r.floating;
    if (n && g)
      return g.addEventListener("wheel", f), requestAnimationFrame(() => {
        c.current = g.scrollTop, i.current != null && (d.current = {
          ...i.current
        });
      }), () => {
        c.current = null, d.current = null, g.removeEventListener("wheel", f);
      };
  }, [o, n, r.floating, i, l, a]);
  const m = W(() => ({
    onKeyDown() {
      u.current = !0;
    },
    onWheel() {
      u.current = !1;
    },
    onPointerMove() {
      u.current = !1;
    },
    onScroll() {
      const f = (l == null ? void 0 : l.current) || r.floating;
      if (!(!i.current || !f || !u.current)) {
        if (c.current !== null) {
          const g = f.scrollTop - c.current;
          (i.current.bottom < -0.5 && g < -1 || i.current.top < -0.5 && g > 1) && De(() => a((h) => h + g));
        }
        requestAnimationFrame(() => {
          c.current = f.scrollTop;
        });
      }
    }
  }), [r.floating, a, i, l]);
  return W(() => o ? {
    floating: m
  } : {}, [o, m]);
}
let Rn = me({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
Rn.displayName = "FloatingContext";
let Go = me(null);
Go.displayName = "PlacementContext";
function Tf(e) {
  return W(() => e ? typeof e == "string" ? { to: e } : e : null, [e]);
}
function If() {
  return ae(Rn).setReference;
}
function Of() {
  let { getFloatingProps: e, slot: t } = ae(Rn);
  return ie((...n) => Object.assign({}, e(...n), { "data-anchor": t.anchor }), [e, t]);
}
function Mf(e = null) {
  e === !1 && (e = null), typeof e == "string" && (e = { to: e });
  let t = ae(Go), n = W(() => e, [JSON.stringify(e, (o, i) => {
    var l;
    return (l = i == null ? void 0 : i.outerHTML) != null ? l : i;
  })]);
  ce(() => {
    t == null || t(n ?? null);
  }, [t, n]);
  let r = ae(Rn);
  return W(() => [r.setFloating, e ? r.styles : {}], [r.setFloating, e, r.styles]);
}
let Ji = 4;
function Ff({ children: e, enabled: t = !0 }) {
  let [n, r] = H(null), [o, i] = H(0), l = k(null), [s, a] = H(null);
  Pf(s);
  let u = t && n !== null && s !== null, { to: c = "bottom", gap: d = 0, offset: m = 0, padding: f = 0, inner: g } = Af(n, s), [h, v = "center"] = c.split(" ");
  ce(() => {
    u && i(0);
  }, [u]);
  let { refs: x, floatingStyles: w, context: y } = Cf({ open: u, placement: h === "selection" ? v === "center" ? "bottom" : `bottom-${v}` : v === "center" ? `${h}` : `${h}-${v}`, strategy: "absolute", transform: !1, middleware: [Ws({ mainAxis: h === "selection" ? 0 : d, crossAxis: m }), af({ padding: f }), h !== "selection" && uf({ padding: f }), h === "selection" && g ? Rf({ ...g, padding: f, overflowRef: l, offset: o, minItemsVisible: Ji, referenceOverflowThreshold: f, onFallbackChange(E) {
    var T, F;
    if (!E) return;
    let A = y.elements.floating;
    if (!A) return;
    let j = parseFloat(getComputedStyle(A).scrollPaddingBottom) || 0, G = Math.min(Ji, A.childElementCount), z = 0, V = 0;
    for (let M of (F = (T = y.elements.floating) == null ? void 0 : T.childNodes) != null ? F : []) if (M instanceof HTMLElement) {
      let K = M.offsetTop, N = K + M.clientHeight + j, B = A.scrollTop, I = B + A.clientHeight;
      if (K >= B && N <= I) G--;
      else {
        V = Math.max(0, Math.min(N, I) - Math.max(K, B)), z = M.clientHeight;
        break;
      }
    }
    G >= 1 && i((M) => {
      let K = z * G - V + j;
      return M >= K ? M : K;
    });
  } }) : null, cf({ padding: f, apply({ availableWidth: E, availableHeight: T, elements: F }) {
    Object.assign(F.floating.style, { overflow: "auto", maxWidth: `${E}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${T}px)` });
  } })].filter(Boolean), whileElementsMounted: ef }), [C = h, $ = v] = y.placement.split("-");
  h === "selection" && (C = "selection");
  let O = W(() => ({ anchor: [C, $].filter(Boolean).join(" ") }), [C, $]), R = $f(y, { overflowRef: l, onChange: i }), { getReferenceProps: _, getFloatingProps: b } = Ef([R]), S = U((E) => {
    a(E), x.setFloating(E);
  });
  return P(Go.Provider, { value: r }, P(Rn.Provider, { value: { setFloating: S, setReference: x.setReference, styles: w, getReferenceProps: _, getFloatingProps: b, slot: O } }, e));
}
function Pf(e) {
  ce(() => {
    if (!e) return;
    let t = new MutationObserver(() => {
      let n = window.getComputedStyle(e).maxHeight, r = parseFloat(n);
      if (isNaN(r)) return;
      let o = parseInt(n);
      isNaN(o) || r !== o && (e.style.maxHeight = `${Math.ceil(r)}px`);
    });
    return t.observe(e, { attributes: !0, attributeFilter: ["style"] }), () => {
      t.disconnect();
    };
  }, [e]);
}
function Af(e, t) {
  var n, r, o;
  let i = Or((n = e == null ? void 0 : e.gap) != null ? n : "var(--anchor-gap, 0)", t), l = Or((r = e == null ? void 0 : e.offset) != null ? r : "var(--anchor-offset, 0)", t), s = Or((o = e == null ? void 0 : e.padding) != null ? o : "var(--anchor-padding, 0)", t);
  return { ...e, gap: i, offset: l, padding: s };
}
function Or(e, t, n = void 0) {
  let r = Pt(), o = U((a, u) => {
    if (a == null) return [n, null];
    if (typeof a == "number") return [a, null];
    if (typeof a == "string") {
      if (!u) return [n, null];
      let c = Qi(a, u);
      return [c, (d) => {
        let m = Ks(a);
        {
          let f = m.map((g) => window.getComputedStyle(u).getPropertyValue(g));
          r.requestAnimationFrame(function g() {
            r.nextFrame(g);
            let h = !1;
            for (let [x, w] of m.entries()) {
              let y = window.getComputedStyle(u).getPropertyValue(w);
              if (f[x] !== y) {
                f[x] = y, h = !0;
                break;
              }
            }
            if (!h) return;
            let v = Qi(a, u);
            c !== v && (d(v), c = v);
          });
        }
        return r.dispose;
      }];
    }
    return [n, null];
  }), i = W(() => o(e, t)[0], [e, t]), [l = i, s] = H();
  return ce(() => {
    let [a, u] = o(e, t);
    if (s(a), !!u) return u(s);
  }, [e, t]), l;
}
function Ks(e) {
  let t = /var\((.*)\)/.exec(e);
  if (t) {
    let n = t[1].indexOf(",");
    if (n === -1) return [t[1]];
    let r = t[1].slice(0, n).trim(), o = t[1].slice(n + 1).trim();
    return o ? [r, ...Ks(o)] : [r];
  }
  return [];
}
function Qi(e, t) {
  let n = document.createElement("div");
  t.appendChild(n), n.style.setProperty("margin-top", "0px", "important"), n.style.setProperty("margin-top", e, "important");
  let r = parseFloat(window.getComputedStyle(n).marginTop) || 0;
  return t.removeChild(n), r;
}
function Nf({ children: e, freeze: t }) {
  let n = oo(t, e);
  return D.createElement(D.Fragment, null, n);
}
function oo(e, t) {
  let [n, r] = H(t);
  return !e && n !== t && r(t), e ? n : t;
}
let dr = me(null);
dr.displayName = "OpenClosedContext";
var Pe = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(Pe || {});
function $n() {
  return ae(dr);
}
function Ys({ value: e, children: t }) {
  return D.createElement(dr.Provider, { value: e }, t);
}
function kf({ children: e }) {
  return D.createElement(dr.Provider, { value: null }, e);
}
function Df(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let Ke = [];
Df(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || Ke[0] === t.target) return;
    let n = t.target;
    n = n.closest(Kn), Ke.unshift(n ?? t.target), Ke = Ke.filter((r) => r != null && r.isConnected), Ke.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Lf(e) {
  throw new Error("Unexpected object: " + e);
}
var be = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(be || {});
function el(e, t) {
  let n = t.resolveItems();
  if (n.length <= 0) return null;
  let r = t.resolveActiveIndex(), o = r ?? -1;
  switch (e.focus) {
    case 0: {
      for (let i = 0; i < n.length; ++i) if (!t.resolveDisabled(n[i], i, n)) return i;
      return r;
    }
    case 1: {
      o === -1 && (o = n.length);
      for (let i = o - 1; i >= 0; --i) if (!t.resolveDisabled(n[i], i, n)) return i;
      return r;
    }
    case 2: {
      for (let i = o + 1; i < n.length; ++i) if (!t.resolveDisabled(n[i], i, n)) return i;
      return r;
    }
    case 3: {
      for (let i = n.length - 1; i >= 0; --i) if (!t.resolveDisabled(n[i], i, n)) return i;
      return r;
    }
    case 4: {
      for (let i = 0; i < n.length; ++i) if (t.resolveId(n[i], i, n) === e.id) return i;
      return r;
    }
    case 5:
      return null;
    default:
      Lf(e);
  }
}
var qo = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(qo || {});
function Xs(e) {
  let t = U(e), n = k(!1);
  re(() => (n.current = !1, () => {
    n.current = !0, rr(() => {
      n.current && t();
    });
  }), [t]);
}
function Vf() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Gr ? ((t) => t.useSyncExternalStore)(Gr)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Tn() {
  let e = Vf(), [t, n] = H(Tt.isHandoffComplete);
  return t && Tt.isHandoffComplete === !1 && n(!1), re(() => {
    t !== !0 && n(!0);
  }, [t]), re(() => Tt.handoff(), []), e ? !1 : t;
}
let Zs = me(!1);
function Hf() {
  return ae(Zs);
}
function tl(e) {
  return D.createElement(Zs.Provider, { value: e.force }, e.children);
}
function zf(e) {
  let t = Hf(), n = ae(Qs), r = At(e), [o, i] = H(() => {
    var l;
    if (!t && n !== null) return (l = n.current) != null ? l : null;
    if (Tt.isServer) return null;
    let s = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (s) return s;
    if (r === null) return null;
    let a = r.createElement("div");
    return a.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(a);
  });
  return re(() => {
    o !== null && (r != null && r.body.contains(o) || r == null || r.body.appendChild(o));
  }, [o, r]), re(() => {
    t || n !== null && i(n.current);
  }, [n, i, t]), o;
}
let Js = fe, Bf = xe(function(e, t) {
  let n = e, r = k(null), o = Ae(Sc((d) => {
    r.current = d;
  }), t), i = At(r), l = zf(r), [s] = H(() => {
    var d;
    return Tt.isServer ? null : (d = i == null ? void 0 : i.createElement("div")) != null ? d : null;
  }), a = ae(io), u = Tn();
  ce(() => {
    !l || !s || l.contains(s) || (s.setAttribute("data-headlessui-portal", ""), l.appendChild(s));
  }, [l, s]), ce(() => {
    if (s && a) return a.register(s);
  }, [a, s]), Xs(() => {
    var d;
    !l || !s || (s instanceof Node && l.contains(s) && l.removeChild(s), l.childNodes.length <= 0 && ((d = l.parentElement) == null || d.removeChild(l)));
  });
  let c = Ee();
  return u ? !l || !s ? null : xn(c({ ourProps: { ref: o }, theirProps: n, slot: {}, defaultTag: Js, name: "Portal" }), s) : null;
});
function jf(e, t) {
  let n = Ae(t), { enabled: r = !0, ...o } = e, i = Ee();
  return r ? D.createElement(Bf, { ...o, ref: n }) : i({ ourProps: { ref: n }, theirProps: o, slot: {}, defaultTag: Js, name: "Portal" });
}
let Uf = fe, Qs = me(null);
function Wf(e, t) {
  let { target: n, ...r } = e, o = { ref: Ae(t) }, i = Ee();
  return D.createElement(Qs.Provider, { value: n }, i({ ourProps: o, theirProps: r, defaultTag: Uf, name: "Popover.Group" }));
}
let io = me(null);
function Gf() {
  let e = ae(io), t = k([]), n = U((i) => (t.current.push(i), e && e.register(i), () => r(i))), r = U((i) => {
    let l = t.current.indexOf(i);
    l !== -1 && t.current.splice(l, 1), e && e.unregister(i);
  }), o = W(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, W(() => function({ children: i }) {
    return D.createElement(io.Provider, { value: o }, i);
  }, [o])];
}
let qf = xe(jf), ea = xe(Wf), ta = Object.assign(qf, { Group: ea });
var Kf = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Kf || {}), Yf = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Yf || {}), Xf = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))(Xf || {}), Zf = ((e) => (e[e.OpenCombobox = 0] = "OpenCombobox", e[e.CloseCombobox = 1] = "CloseCombobox", e[e.GoToOption = 2] = "GoToOption", e[e.SetTyping = 3] = "SetTyping", e[e.RegisterOption = 4] = "RegisterOption", e[e.UnregisterOption = 5] = "UnregisterOption", e[e.SetActivationTrigger = 6] = "SetActivationTrigger", e[e.UpdateVirtualConfiguration = 7] = "UpdateVirtualConfiguration", e[e.SetInputElement = 8] = "SetInputElement", e[e.SetButtonElement = 9] = "SetButtonElement", e[e.SetOptionsElement = 10] = "SetOptionsElement", e))(Zf || {});
function Mr(e, t = (n) => n) {
  let n = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, r = t(e.options.slice()), o = r.length > 0 && r[0].dataRef.current.order !== null ? r.sort((l, s) => l.dataRef.current.order - s.dataRef.current.order) : Cs(r, (l) => l.dataRef.current.domRef.current), i = n ? o.indexOf(n) : null;
  return i === -1 && (i = null), { options: o, activeOptionIndex: i };
}
let Jf = { 1(e) {
  var t;
  return (t = e.dataRef.current) != null && t.disabled || e.comboboxState === 1 ? e : { ...e, activeOptionIndex: null, comboboxState: 1, isTyping: !1, activationTrigger: 2, __demoMode: !1 };
}, 0(e) {
  var t, n;
  if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 0) return e;
  if ((n = e.dataRef.current) != null && n.value) {
    let r = e.dataRef.current.calculateIndex(e.dataRef.current.value);
    if (r !== -1) return { ...e, activeOptionIndex: r, comboboxState: 0, __demoMode: !1 };
  }
  return { ...e, comboboxState: 0, __demoMode: !1 };
}, 3(e, t) {
  return e.isTyping === t.isTyping ? e : { ...e, isTyping: t.isTyping };
}, 2(e, t) {
  var n, r, o, i;
  if ((n = e.dataRef.current) != null && n.disabled || e.optionsElement && !((r = e.dataRef.current) != null && r.optionsPropsRef.current.static) && e.comboboxState === 1) return e;
  if (e.virtual) {
    let { options: u, disabled: c } = e.virtual, d = t.focus === be.Specific ? t.idx : el(t, { resolveItems: () => u, resolveActiveIndex: () => {
      var f, g;
      return (g = (f = e.activeOptionIndex) != null ? f : u.findIndex((h) => !c(h))) != null ? g : null;
    }, resolveDisabled: c, resolveId() {
      throw new Error("Function not implemented.");
    } }), m = (o = t.trigger) != null ? o : 2;
    return e.activeOptionIndex === d && e.activationTrigger === m ? e : { ...e, activeOptionIndex: d, activationTrigger: m, isTyping: !1, __demoMode: !1 };
  }
  let l = Mr(e);
  if (l.activeOptionIndex === null) {
    let u = l.options.findIndex((c) => !c.dataRef.current.disabled);
    u !== -1 && (l.activeOptionIndex = u);
  }
  let s = t.focus === be.Specific ? t.idx : el(t, { resolveItems: () => l.options, resolveActiveIndex: () => l.activeOptionIndex, resolveId: (u) => u.id, resolveDisabled: (u) => u.dataRef.current.disabled }), a = (i = t.trigger) != null ? i : 2;
  return e.activeOptionIndex === s && e.activationTrigger === a ? e : { ...e, ...l, isTyping: !1, activeOptionIndex: s, activationTrigger: a, __demoMode: !1 };
}, 4: (e, t) => {
  var n, r, o;
  if ((n = e.dataRef.current) != null && n.virtual) return { ...e, options: [...e.options, t.payload] };
  let i = t.payload, l = Mr(e, (a) => (a.push(i), a));
  e.activeOptionIndex === null && (r = e.dataRef.current) != null && r.isSelected(t.payload.dataRef.current.value) && (l.activeOptionIndex = l.options.indexOf(i));
  let s = { ...e, ...l, activationTrigger: 2 };
  return (o = e.dataRef.current) != null && o.__demoMode && e.dataRef.current.value === void 0 && (s.activeOptionIndex = 0), s;
}, 5: (e, t) => {
  var n;
  if ((n = e.dataRef.current) != null && n.virtual) return { ...e, options: e.options.filter((o) => o.id !== t.id) };
  let r = Mr(e, (o) => {
    let i = o.findIndex((l) => l.id === t.id);
    return i !== -1 && o.splice(i, 1), o;
  });
  return { ...e, ...r, activationTrigger: 2 };
}, 6: (e, t) => e.activationTrigger === t.trigger ? e : { ...e, activationTrigger: t.trigger }, 7: (e, t) => {
  var n, r;
  if (e.virtual === null) return { ...e, virtual: { options: t.options, disabled: (n = t.disabled) != null ? n : () => !1 } };
  if (e.virtual.options === t.options && e.virtual.disabled === t.disabled) return e;
  let o = e.activeOptionIndex;
  if (e.activeOptionIndex !== null) {
    let i = t.options.indexOf(e.virtual.options[e.activeOptionIndex]);
    i !== -1 ? o = i : o = null;
  }
  return { ...e, activeOptionIndex: o, virtual: { options: t.options, disabled: (r = t.disabled) != null ? r : () => !1 } };
}, 8: (e, t) => e.inputElement === t.element ? e : { ...e, inputElement: t.element }, 9: (e, t) => e.buttonElement === t.element ? e : { ...e, buttonElement: t.element }, 10: (e, t) => e.optionsElement === t.element ? e : { ...e, optionsElement: t.element } }, Ko = me(null);
Ko.displayName = "ComboboxActionsContext";
function In(e) {
  let t = ae(Ko);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, In), n;
  }
  return t;
}
let na = me(null);
function Qf(e) {
  let t = Qt("VirtualProvider"), { options: n } = t.virtual, [r, o] = W(() => {
    let u = t.optionsElement;
    if (!u) return [0, 0];
    let c = window.getComputedStyle(u);
    return [parseFloat(c.paddingBlockStart || c.paddingTop), parseFloat(c.paddingBlockEnd || c.paddingBottom)];
  }, [t.optionsElement]), i = _s({ enabled: n.length !== 0, scrollPaddingStart: r, scrollPaddingEnd: o, count: n.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return t.optionsElement;
  }, overscan: 12 }), [l, s] = H(0);
  ce(() => {
    s((u) => u + 1);
  }, [n]);
  let a = i.getVirtualItems();
  return a.length === 0 ? null : D.createElement(na.Provider, { value: i }, D.createElement("div", { style: { position: "relative", width: "100%", height: `${i.getTotalSize()}px` }, ref: (u) => {
    u && t.activationTrigger !== 0 && t.activeOptionIndex !== null && n.length > t.activeOptionIndex && i.scrollToIndex(t.activeOptionIndex);
  } }, a.map((u) => {
    var c;
    return D.createElement(fe, { key: u.key }, D.cloneElement((c = e.children) == null ? void 0 : c.call(e, { ...e.slot, option: n[u.index] }), { key: `${l}-${u.key}`, "data-index": u.index, "aria-setsize": n.length, "aria-posinset": u.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${u.start}px)`, overflowAnchor: "none" } }));
  })));
}
let yn = me(null);
yn.displayName = "ComboboxDataContext";
function Qt(e) {
  let t = ae(yn);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Qt), n;
  }
  return t;
}
function ep(e, t) {
  return ke(t.type, Jf, e, t);
}
let tp = fe;
function np(e, t) {
  var n, r;
  let o = Vo(), { value: i, defaultValue: l, onChange: s, form: a, name: u, by: c, disabled: d = o || !1, onClose: m, __demoMode: f = !1, multiple: g = !1, immediate: h = !1, virtual: v = null, nullable: x, ...w } = e, y = pc(l), [C = g ? [] : void 0, $] = fc(i, s, y), [O, R] = at(ep, { dataRef: tr(), comboboxState: f ? 0 : 1, isTyping: !1, options: [], virtual: v ? { options: v.options, disabled: (n = v.disabled) != null ? n : () => !1 } : null, activeOptionIndex: null, activationTrigger: 2, inputElement: null, buttonElement: null, optionsElement: null, __demoMode: f }), _ = k(!1), b = k({ static: !1, hold: !1 }), S = Yc(c), E = U((L) => v ? c === null ? v.options.indexOf(L) : v.options.findIndex((Y) => S(Y, L)) : O.options.findIndex((Y) => S(Y.dataRef.current.value, L))), T = ie((L) => ke(A.mode, { 1: () => C.some((Y) => S(Y, L)), 0: () => S(C, L) }), [C]), F = U((L) => O.activeOptionIndex === E(L)), A = W(() => ({ ...O, immediate: h, optionsPropsRef: b, value: C, defaultValue: y, disabled: d, mode: g ? 1 : 0, virtual: v ? O.virtual : null, get activeOptionIndex() {
    if (_.current && O.activeOptionIndex === null && (v ? v.options.length > 0 : O.options.length > 0)) {
      if (v) {
        let Y = v.options.findIndex((Q) => {
          var Re, ne;
          return !((ne = (Re = v.disabled) == null ? void 0 : Re.call(v, Q)) != null && ne);
        });
        if (Y !== -1) return Y;
      }
      let L = O.options.findIndex((Y) => !Y.dataRef.current.disabled);
      if (L !== -1) return L;
    }
    return O.activeOptionIndex;
  }, calculateIndex: E, compare: S, isSelected: T, isActive: F }), [C, y, d, g, f, O, v]);
  ce(() => {
    var L;
    v && R({ type: 7, options: v.options, disabled: (L = v.disabled) != null ? L : null });
  }, [v, v == null ? void 0 : v.options, v == null ? void 0 : v.disabled]), ce(() => {
    O.dataRef.current = A;
  }, [A]);
  let j = A.comboboxState === 0;
  Ts(j, [A.buttonElement, A.inputElement, A.optionsElement], () => q.closeCombobox());
  let G = W(() => {
    var L, Y, Q;
    return { open: A.comboboxState === 0, disabled: d, activeIndex: A.activeOptionIndex, activeOption: A.activeOptionIndex === null ? null : A.virtual ? A.virtual.options[(L = A.activeOptionIndex) != null ? L : 0] : (Q = (Y = A.options[A.activeOptionIndex]) == null ? void 0 : Y.dataRef.current.value) != null ? Q : null, value: C };
  }, [A, d, C]), z = U(() => {
    if (A.activeOptionIndex !== null) {
      if (q.setIsTyping(!1), A.virtual) I(A.virtual.options[A.activeOptionIndex]);
      else {
        let { dataRef: L } = A.options[A.activeOptionIndex];
        I(L.current.value);
      }
      q.goToOption(be.Specific, A.activeOptionIndex);
    }
  }), V = U(() => {
    R({ type: 0 }), _.current = !0;
  }), M = U(() => {
    R({ type: 1 }), _.current = !1, m == null || m();
  }), K = U((L) => {
    R({ type: 3, isTyping: L });
  }), N = U((L, Y, Q) => (_.current = !1, L === be.Specific ? R({ type: 2, focus: be.Specific, idx: Y, trigger: Q }) : R({ type: 2, focus: L, trigger: Q }))), B = U((L, Y) => (R({ type: 4, payload: { id: L, dataRef: Y } }), () => {
    A.isActive(Y.current.value) && (_.current = !0), R({ type: 5, id: L });
  })), I = U((L) => ke(A.mode, { 0() {
    return $ == null ? void 0 : $(L);
  }, 1() {
    let Y = A.value.slice(), Q = Y.findIndex((Re) => S(Re, L));
    return Q === -1 ? Y.push(L) : Y.splice(Q, 1), $ == null ? void 0 : $(Y);
  } })), se = U((L) => {
    R({ type: 6, trigger: L });
  }), te = U((L) => {
    R({ type: 8, element: L });
  }), ue = U((L) => {
    R({ type: 9, element: L });
  }), le = U((L) => {
    R({ type: 10, element: L });
  }), q = W(() => ({ onChange: I, registerOption: B, goToOption: N, setIsTyping: K, closeCombobox: M, openCombobox: V, setActivationTrigger: se, selectActiveOption: z, setInputElement: te, setButtonElement: ue, setOptionsElement: le }), []), [ee, ge] = Oc(), J = t === null ? {} : { ref: t }, he = ie(() => {
    if (y !== void 0) return $ == null ? void 0 : $(y);
  }, [$, y]), we = Ee();
  return D.createElement(ge, { value: ee, props: { htmlFor: (r = A.inputElement) == null ? void 0 : r.id }, slot: { open: A.comboboxState === 0, disabled: d } }, D.createElement(Ff, null, D.createElement(Ko.Provider, { value: q }, D.createElement(yn.Provider, { value: A }, D.createElement(Ys, { value: ke(A.comboboxState, { 0: Pe.Open, 1: Pe.Closed }) }, u != null && D.createElement(_c, { disabled: d, data: C != null ? { [u]: C } : {}, form: a, onReset: he }), we({ ourProps: J, theirProps: w, slot: G, defaultTag: tp, name: "Combobox" }))))));
}
let rp = "input";
function op(e, t) {
  var n, r, o, i, l;
  let s = Qt("Combobox.Input"), a = In("Combobox.Input"), u = Me(), c = ps(), { id: d = c || `headlessui-combobox-input-${u}`, onChange: m, displayValue: f, disabled: g = s.disabled || !1, autoFocus: h = !1, type: v = "text", ...x } = e, w = k(null), y = Ae(w, t, If(), a.setInputElement), C = At(s.inputElement), $ = Pt(), O = U(() => {
    a.onChange(null), s.optionsElement && (s.optionsElement.scrollTop = 0), a.goToOption(be.Nothing);
  }), R = W(() => {
    var I;
    return typeof f == "function" && s.value !== void 0 ? (I = f(s.value)) != null ? I : "" : typeof s.value == "string" ? s.value : "";
  }, [s.value, f]);
  vn(([I, se], [te, ue]) => {
    if (s.isTyping) return;
    let le = w.current;
    le && ((ue === 0 && se === 1 || I !== te) && (le.value = I), requestAnimationFrame(() => {
      if (s.isTyping || !le || (C == null ? void 0 : C.activeElement) !== le) return;
      let { selectionStart: q, selectionEnd: ee } = le;
      Math.abs((ee ?? 0) - (q ?? 0)) === 0 && q === 0 && le.setSelectionRange(le.value.length, le.value.length);
    }));
  }, [R, s.comboboxState, C, s.isTyping]), vn(([I], [se]) => {
    if (I === 0 && se === 1) {
      if (s.isTyping) return;
      let te = w.current;
      if (!te) return;
      let ue = te.value, { selectionStart: le, selectionEnd: q, selectionDirection: ee } = te;
      te.value = "", te.value = ue, ee !== null ? te.setSelectionRange(le, q, ee) : te.setSelectionRange(le, q);
    }
  }, [s.comboboxState]);
  let _ = k(!1), b = U(() => {
    _.current = !0;
  }), S = U(() => {
    $.nextFrame(() => {
      _.current = !1;
    });
  }), E = U((I) => {
    switch (a.setIsTyping(!0), I.key) {
      case Ie.Enter:
        if (s.comboboxState !== 0 || _.current) return;
        if (I.preventDefault(), I.stopPropagation(), s.activeOptionIndex === null) {
          a.closeCombobox();
          return;
        }
        a.selectActiveOption(), s.mode === 0 && a.closeCombobox();
        break;
      case Ie.ArrowDown:
        return I.preventDefault(), I.stopPropagation(), ke(s.comboboxState, { 0: () => a.goToOption(be.Next), 1: () => a.openCombobox() });
      case Ie.ArrowUp:
        return I.preventDefault(), I.stopPropagation(), ke(s.comboboxState, { 0: () => a.goToOption(be.Previous), 1: () => {
          De(() => a.openCombobox()), s.value || a.goToOption(be.Last);
        } });
      case Ie.Home:
        if (I.shiftKey) break;
        return I.preventDefault(), I.stopPropagation(), a.goToOption(be.First);
      case Ie.PageUp:
        return I.preventDefault(), I.stopPropagation(), a.goToOption(be.First);
      case Ie.End:
        if (I.shiftKey) break;
        return I.preventDefault(), I.stopPropagation(), a.goToOption(be.Last);
      case Ie.PageDown:
        return I.preventDefault(), I.stopPropagation(), a.goToOption(be.Last);
      case Ie.Escape:
        return s.comboboxState !== 0 ? void 0 : (I.preventDefault(), s.optionsElement && !s.optionsPropsRef.current.static && I.stopPropagation(), s.mode === 0 && s.value === null && O(), a.closeCombobox());
      case Ie.Tab:
        if (s.comboboxState !== 0) return;
        s.mode === 0 && s.activationTrigger !== 1 && a.selectActiveOption(), a.closeCombobox();
        break;
    }
  }), T = U((I) => {
    m == null || m(I), s.mode === 0 && I.target.value === "" && O(), a.openCombobox();
  }), F = U((I) => {
    var se, te, ue;
    let le = (se = I.relatedTarget) != null ? se : Ke.find((q) => q !== I.currentTarget);
    if (!((te = s.optionsElement) != null && te.contains(le)) && !((ue = s.buttonElement) != null && ue.contains(le)) && s.comboboxState === 0) return I.preventDefault(), s.mode === 0 && s.value === null && O(), a.closeCombobox();
  }), A = U((I) => {
    var se, te, ue;
    let le = (se = I.relatedTarget) != null ? se : Ke.find((q) => q !== I.currentTarget);
    (te = s.buttonElement) != null && te.contains(le) || (ue = s.optionsElement) != null && ue.contains(le) || s.disabled || s.immediate && s.comboboxState !== 0 && $.microTask(() => {
      De(() => a.openCombobox()), a.setActivationTrigger(1);
    });
  }), j = lr(), G = Cc(), { isFocused: z, focusProps: V } = as({ autoFocus: h }), { isHovered: M, hoverProps: K } = ss({ isDisabled: g }), N = W(() => ({ open: s.comboboxState === 0, disabled: g, hover: M, focus: z, autofocus: h }), [s, M, z, h, g]), B = Ho({ ref: y, id: d, role: "combobox", type: v, "aria-controls": (n = s.optionsElement) == null ? void 0 : n.id, "aria-expanded": s.comboboxState === 0, "aria-activedescendant": s.activeOptionIndex === null ? void 0 : s.virtual ? (r = s.options.find((I) => !I.dataRef.current.disabled && s.compare(I.dataRef.current.value, s.virtual.options[s.activeOptionIndex]))) == null ? void 0 : r.id : (o = s.options[s.activeOptionIndex]) == null ? void 0 : o.id, "aria-labelledby": j, "aria-describedby": G, "aria-autocomplete": "list", defaultValue: (l = (i = e.defaultValue) != null ? i : s.defaultValue !== void 0 ? f == null ? void 0 : f(s.defaultValue) : null) != null ? l : s.defaultValue, disabled: g || void 0, autoFocus: h, onCompositionStart: b, onCompositionEnd: S, onKeyDown: E, onChange: T, onFocus: A, onBlur: F }, V, K);
  return Ee()({ ourProps: B, theirProps: x, slot: N, defaultTag: rp, name: "Combobox.Input" });
}
let ip = "button";
function lp(e, t) {
  var n;
  let r = Qt("Combobox.Button"), o = In("Combobox.Button"), i = Ae(t, o.setButtonElement), l = Me(), { id: s = `headlessui-combobox-button-${l}`, disabled: a = r.disabled || !1, autoFocus: u = !1, ...c } = e, d = Is(r.inputElement), m = U((R) => {
    switch (R.key) {
      case Ie.Space:
      case Ie.Enter:
        R.preventDefault(), R.stopPropagation(), r.comboboxState === 1 && De(() => o.openCombobox()), d();
        return;
      case Ie.ArrowDown:
        R.preventDefault(), R.stopPropagation(), r.comboboxState === 1 && (De(() => o.openCombobox()), r.value || o.goToOption(be.First)), d();
        return;
      case Ie.ArrowUp:
        R.preventDefault(), R.stopPropagation(), r.comboboxState === 1 && (De(() => o.openCombobox()), r.value || o.goToOption(be.Last)), d();
        return;
      case Ie.Escape:
        if (r.comboboxState !== 0) return;
        R.preventDefault(), r.optionsElement && !r.optionsPropsRef.current.static && R.stopPropagation(), De(() => o.closeCombobox()), d();
        return;
      default:
        return;
    }
  }), f = U((R) => {
    R.preventDefault(), !bc(R.currentTarget) && (R.button === qo.Left && (r.comboboxState === 0 ? o.closeCombobox() : o.openCombobox()), d());
  }), g = lr([s]), { isFocusVisible: h, focusProps: v } = as({ autoFocus: u }), { isHovered: x, hoverProps: w } = ss({ isDisabled: a }), { pressed: y, pressProps: C } = lc({ disabled: a }), $ = W(() => ({ open: r.comboboxState === 0, active: y || r.comboboxState === 0, disabled: a, value: r.value, hover: x, focus: h }), [r, x, h, y, a]), O = Ho({ ref: i, id: s, type: ad(e, r.buttonElement), tabIndex: -1, "aria-haspopup": "listbox", "aria-controls": (n = r.optionsElement) == null ? void 0 : n.id, "aria-expanded": r.comboboxState === 0, "aria-labelledby": g, disabled: a || void 0, autoFocus: u, onMouseDown: f, onKeyDown: m }, v, w, C);
  return Ee()({ ourProps: O, theirProps: c, slot: $, defaultTag: ip, name: "Combobox.Button" });
}
let sp = "div", ap = Wt.RenderStrategy | Wt.Static;
function up(e, t) {
  var n, r, o;
  let i = Me(), { id: l = `headlessui-combobox-options-${i}`, hold: s = !1, anchor: a, portal: u = !1, modal: c = !0, transition: d = !1, ...m } = e, f = Qt("Combobox.Options"), g = In("Combobox.Options"), h = Tf(a);
  h && (u = !0);
  let [v, x] = Mf(h), [w, y] = H(null), C = Of(), $ = Ae(t, h ? v : null, g.setOptionsElement, y), O = At(f.optionsElement), R = $n(), [_, b] = Fs(d, w, R !== null ? (R & Pe.Open) === Pe.Open : f.comboboxState === 0);
  xs(_, f.inputElement, g.closeCombobox);
  let S = f.__demoMode ? !1 : c && f.comboboxState === 0;
  Os(S, O);
  let E = f.__demoMode ? !1 : c && f.comboboxState === 0;
  bs(E, { allowed: ie(() => [f.inputElement, f.buttonElement, f.optionsElement], [f.inputElement, f.buttonElement, f.optionsElement]) }), ce(() => {
    var B;
    f.optionsPropsRef.current.static = (B = e.static) != null ? B : !1;
  }, [f.optionsPropsRef, e.static]), ce(() => {
    f.optionsPropsRef.current.hold = s;
  }, [f.optionsPropsRef, s]), bd(f.comboboxState === 0, { container: f.optionsElement, accept(B) {
    return B.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : B.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(B) {
    B.setAttribute("role", "none");
  } });
  let T = lr([(n = f.buttonElement) == null ? void 0 : n.id]), F = W(() => ({ open: f.comboboxState === 0, option: void 0 }), [f.comboboxState]), A = U(() => {
    g.setActivationTrigger(0);
  }), j = U((B) => {
    B.preventDefault(), g.setActivationTrigger(0);
  }), G = Ho(h ? C() : {}, { "aria-labelledby": T, role: "listbox", "aria-multiselectable": f.mode === 1 ? !0 : void 0, id: l, ref: $, style: { ...m.style, ...x, "--input-width": Ai(f.inputElement, !0).width, "--button-width": Ai(f.buttonElement, !0).width }, onWheel: f.activationTrigger === 0 ? void 0 : A, onMouseDown: j, ...Ms(b) }), z = _ && f.comboboxState === 1, V = oo(z, (r = f.virtual) == null ? void 0 : r.options), M = oo(z, f.value), K = U((B) => f.compare(M, B));
  if (f.virtual) {
    if (V === void 0) throw new Error("Missing `options` in virtual mode");
    Object.assign(m, { children: D.createElement(yn.Provider, { value: V !== f.virtual.options ? { ...f, virtual: { ...f.virtual, options: V } } : f }, D.createElement(Qf, { slot: F }, m.children)) });
  }
  let N = Ee();
  return D.createElement(ta, { enabled: u ? e.static || _ : !1 }, D.createElement(yn.Provider, { value: f.mode === 1 ? f : { ...f, isSelected: K } }, N({ ourProps: G, theirProps: { ...m, children: D.createElement(Nf, { freeze: z }, typeof m.children == "function" ? (o = m.children) == null ? void 0 : o.call(m, F) : m.children) }, slot: F, defaultTag: sp, features: ap, visible: _, name: "Combobox.Options" })));
}
let cp = "div";
function dp(e, t) {
  var n, r, o, i;
  let l = Qt("Combobox.Option"), s = In("Combobox.Option"), a = Me(), { id: u = `headlessui-combobox-option-${a}`, value: c, disabled: d = (o = (r = (n = l.virtual) == null ? void 0 : n.disabled) == null ? void 0 : r.call(n, c)) != null ? o : !1, order: m = null, ...f } = e, g = Is(l.inputElement), h = l.virtual ? l.activeOptionIndex === l.calculateIndex(c) : l.activeOptionIndex === null ? !1 : ((i = l.options[l.activeOptionIndex]) == null ? void 0 : i.id) === u, v = l.isSelected(c), x = k(null), w = bt({ disabled: d, value: c, domRef: x, order: m }), y = ae(na), C = Ae(t, x, y ? y.measureElement : null), $ = U(() => {
    s.setIsTyping(!1), s.onChange(c);
  });
  ce(() => s.registerOption(u, w), [w, u]);
  let O = k(!(l.virtual || l.__demoMode));
  ce(() => {
    if (!l.virtual && !l.__demoMode) return Xe().requestAnimationFrame(() => {
      O.current = !0;
    });
  }, [l.virtual, l.__demoMode]), ce(() => {
    if (O.current && l.comboboxState === 0 && h && l.activationTrigger !== 0) return Xe().requestAnimationFrame(() => {
      var j, G;
      (G = (j = x.current) == null ? void 0 : j.scrollIntoView) == null || G.call(j, { block: "nearest" });
    });
  }, [x, h, l.comboboxState, l.activationTrigger, l.activeOptionIndex]);
  let R = U((j) => {
    j.preventDefault(), j.button === qo.Left && (d || ($(), Rs() || requestAnimationFrame(() => g()), l.mode === 0 && s.closeCombobox()));
  }), _ = U(() => {
    if (d) return s.goToOption(be.Nothing);
    let j = l.calculateIndex(c);
    s.goToOption(be.Specific, j);
  }), b = md(), S = U((j) => b.update(j)), E = U((j) => {
    if (!b.wasMoved(j) || d || h) return;
    let G = l.calculateIndex(c);
    s.goToOption(be.Specific, G, 0);
  }), T = U((j) => {
    b.wasMoved(j) && (d || h && (l.optionsPropsRef.current.hold || s.goToOption(be.Nothing)));
  }), F = W(() => ({ active: h, focus: h, selected: v, disabled: d }), [h, v, d]), A = { id: u, ref: C, role: "option", tabIndex: d === !0 ? void 0 : -1, "aria-disabled": d === !0 ? !0 : void 0, "aria-selected": v, disabled: void 0, onMouseDown: R, onFocus: _, onPointerEnter: S, onMouseEnter: S, onPointerMove: E, onMouseMove: E, onPointerLeave: T, onMouseLeave: T };
  return Ee()({ ourProps: A, theirProps: f, slot: F, defaultTag: cp, name: "Combobox.Option" });
}
let fp = xe(np), lo = xe(lp), ra = xe(op), pp = Ac, oa = xe(up), so = xe(dp), mp = Object.assign(fp, { Input: ra, Button: lo, Label: pp, Options: oa, Option: so });
function gp(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = Xt(e, "escape");
  zo(t, "keydown", (o) => {
    r && (o.defaultPrevented || o.key === Ie.Escape && n(o));
  });
}
function hp() {
  var e;
  let [t] = H(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = H((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return ce(() => {
    if (!t) return;
    function o(i) {
      r(i.matches);
    }
    return t.addEventListener("change", o), () => t.removeEventListener("change", o);
  }, [t]), n;
}
function vp({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = At(n), o = U(() => {
    var i, l;
    let s = [];
    for (let a of e) a !== null && (a instanceof HTMLElement ? s.push(a) : "current" in a && a.current instanceof HTMLElement && s.push(a.current));
    if (t != null && t.current) for (let a of t.current) s.push(a);
    for (let a of (i = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? i : []) a !== document.body && a !== document.head && a instanceof HTMLElement && a.id !== "headlessui-portal-root" && (n && (a.contains(n) || a.contains((l = n == null ? void 0 : n.getRootNode()) == null ? void 0 : l.host)) || s.some((u) => a.contains(u)) || s.push(a));
    return s;
  });
  return { resolveContainers: o, contains: U((i) => o().some((l) => l.contains(i))) };
}
let ia = me(null);
function nl({ children: e, node: t }) {
  let [n, r] = H(null), o = la(t ?? n);
  return D.createElement(ia.Provider, { value: o }, e, o === null && D.createElement(hn, { features: Gt.Hidden, ref: (i) => {
    var l, s;
    if (i) {
      for (let a of (s = (l = Yt(i)) == null ? void 0 : l.querySelectorAll("html > *, body > *")) != null ? s : []) if (a !== document.body && a !== document.head && a instanceof HTMLElement && a != null && a.contains(i)) {
        r(a);
        break;
      }
    }
  } }));
}
function la(e = null) {
  var t;
  return (t = ae(ia)) != null ? t : e;
}
function Yo() {
  let e = k(!1);
  return ce(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var ln = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(ln || {});
function _p() {
  let e = k(0);
  return $s(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function sa(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.current) n.current instanceof HTMLElement && t.add(n.current);
  return t;
}
let wp = "div";
var Ct = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(Ct || {});
function yp(e, t) {
  let n = k(null), r = Ae(n, t), { initialFocus: o, initialFocusFallback: i, containers: l, features: s = 15, ...a } = e;
  Tn() || (s = 0);
  let u = At(n);
  Cp(s, { ownerDocument: u });
  let c = Ep(s, { ownerDocument: u, container: n, initialFocus: o, initialFocusFallback: i });
  Rp(s, { ownerDocument: u, container: n, containers: l, previousActiveElement: c });
  let d = _p(), m = U((w) => {
    let y = n.current;
    y && ((C) => C())(() => {
      ke(d.current, { [ln.Forwards]: () => {
        dn(y, nt.First, { skipElements: [w.relatedTarget, i] });
      }, [ln.Backwards]: () => {
        dn(y, nt.Last, { skipElements: [w.relatedTarget, i] });
      } });
    });
  }), f = Xt(!!(s & 2), "focus-trap#tab-lock"), g = Pt(), h = k(!1), v = { ref: r, onKeyDown(w) {
    w.key == "Tab" && (h.current = !0, g.requestAnimationFrame(() => {
      h.current = !1;
    }));
  }, onBlur(w) {
    if (!(s & 4)) return;
    let y = sa(l);
    n.current instanceof HTMLElement && y.add(n.current);
    let C = w.relatedTarget;
    C instanceof HTMLElement && C.dataset.headlessuiFocusGuard !== "true" && (aa(y, C) || (h.current ? dn(n.current, ke(d.current, { [ln.Forwards]: () => nt.Next, [ln.Backwards]: () => nt.Previous }) | nt.WrapAround, { relativeTo: w.target }) : w.target instanceof HTMLElement && lt(w.target)));
  } }, x = Ee();
  return D.createElement(D.Fragment, null, f && D.createElement(hn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: m, features: Gt.Focusable }), x({ ourProps: v, theirProps: a, defaultTag: wp, name: "FocusTrap" }), f && D.createElement(hn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: m, features: Gt.Focusable }));
}
let bp = xe(yp), xp = Object.assign(bp, { features: Ct });
function Sp(e = !0) {
  let t = k(Ke.slice());
  return vn(([n], [r]) => {
    r === !0 && n === !1 && rr(() => {
      t.current.splice(0);
    }), r === !1 && n === !0 && (t.current = Ke.slice());
  }, [e, Ke, t]), U(() => {
    var n;
    return (n = t.current.find((r) => r != null && r.isConnected)) != null ? n : null;
  });
}
function Cp(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = Sp(n);
  vn(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && lt(r());
  }, [n]), Xs(() => {
    n && lt(r());
  });
}
function Ep(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: o }) {
  let i = k(null), l = Xt(!!(e & 1), "focus-trap#initial-focus"), s = Yo();
  return vn(() => {
    if (e === 0) return;
    if (!l) {
      o != null && o.current && lt(o.current);
      return;
    }
    let a = n.current;
    a && rr(() => {
      if (!s.current) return;
      let u = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === u) {
          i.current = u;
          return;
        }
      } else if (a.contains(u)) {
        i.current = u;
        return;
      }
      if (r != null && r.current) lt(r.current);
      else {
        if (e & 16) {
          if (dn(a, nt.First | nt.AutoFocus) !== eo.Error) return;
        } else if (dn(a, nt.First) !== eo.Error) return;
        if (o != null && o.current && (lt(o.current), (t == null ? void 0 : t.activeElement) === o.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [o, l, e]), i;
}
function Rp(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: o }) {
  let i = Yo(), l = !!(e & 4);
  zo(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!l || !i.current) return;
    let a = sa(r);
    n.current instanceof HTMLElement && a.add(n.current);
    let u = o.current;
    if (!u) return;
    let c = s.target;
    c && c instanceof HTMLElement ? aa(a, c) ? (o.current = c, lt(c)) : (s.preventDefault(), s.stopPropagation(), lt(u)) : lt(o.current);
  }, !0);
}
function aa(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function ua(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : da) !== fe || D.Children.count(e.children) === 1;
}
let fr = me(null);
fr.displayName = "TransitionContext";
var $p = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))($p || {});
function Tp() {
  let e = ae(fr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Ip() {
  let e = ae(pr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let pr = me(null);
pr.displayName = "NestingContext";
function mr(e) {
  return "children" in e ? mr(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function ca(e, t) {
  let n = bt(e), r = k([]), o = Yo(), i = Pt(), l = U((f, g = pt.Hidden) => {
    let h = r.current.findIndex(({ el: v }) => v === f);
    h !== -1 && (ke(g, { [pt.Unmount]() {
      r.current.splice(h, 1);
    }, [pt.Hidden]() {
      r.current[h].state = "hidden";
    } }), i.microTask(() => {
      var v;
      !mr(r) && o.current && ((v = n.current) == null || v.call(n));
    }));
  }), s = U((f) => {
    let g = r.current.find(({ el: h }) => h === f);
    return g ? g.state !== "visible" && (g.state = "visible") : r.current.push({ el: f, state: "visible" }), () => l(f, pt.Unmount);
  }), a = k([]), u = k(Promise.resolve()), c = k({ enter: [], leave: [] }), d = U((f, g, h) => {
    a.current.splice(0), t && (t.chains.current[g] = t.chains.current[g].filter(([v]) => v !== f)), t == null || t.chains.current[g].push([f, new Promise((v) => {
      a.current.push(v);
    })]), t == null || t.chains.current[g].push([f, new Promise((v) => {
      Promise.all(c.current[g].map(([x, w]) => w)).then(() => v());
    })]), g === "enter" ? u.current = u.current.then(() => t == null ? void 0 : t.wait.current).then(() => h(g)) : h(g);
  }), m = U((f, g, h) => {
    Promise.all(c.current[g].splice(0).map(([v, x]) => x)).then(() => {
      var v;
      (v = a.current.shift()) == null || v();
    }).then(() => h(g));
  });
  return W(() => ({ children: r, register: s, unregister: l, onStart: d, onStop: m, wait: u, chains: c }), [s, l, r, d, m, c, u]);
}
let da = fe, fa = Wt.RenderStrategy;
function Op(e, t) {
  var n, r;
  let { transition: o = !0, beforeEnter: i, afterEnter: l, beforeLeave: s, afterLeave: a, enter: u, enterFrom: c, enterTo: d, entered: m, leave: f, leaveFrom: g, leaveTo: h, ...v } = e, [x, w] = H(null), y = k(null), C = ua(e), $ = Ae(...C ? [y, t, w] : t === null ? [] : [t]), O = (n = v.unmount) == null || n ? pt.Unmount : pt.Hidden, { show: R, appear: _, initial: b } = Tp(), [S, E] = H(R ? "visible" : "hidden"), T = Ip(), { register: F, unregister: A } = T;
  ce(() => F(y), [F, y]), ce(() => {
    if (O === pt.Hidden && y.current) {
      if (R && S !== "visible") {
        E("visible");
        return;
      }
      return ke(S, { hidden: () => A(y), visible: () => F(y) });
    }
  }, [S, y, F, A, R, O]);
  let j = Tn();
  ce(() => {
    if (C && j && S === "visible" && y.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [y, S, j, C]);
  let G = b && !_, z = _ && R && b, V = k(!1), M = ca(() => {
    V.current || (E("hidden"), A(y));
  }, T), K = U((le) => {
    V.current = !0;
    let q = le ? "enter" : "leave";
    M.onStart(y, q, (ee) => {
      ee === "enter" ? i == null || i() : ee === "leave" && (s == null || s());
    });
  }), N = U((le) => {
    let q = le ? "enter" : "leave";
    V.current = !1, M.onStop(y, q, (ee) => {
      ee === "enter" ? l == null || l() : ee === "leave" && (a == null || a());
    }), q === "leave" && !mr(M) && (E("hidden"), A(y));
  });
  re(() => {
    C && o || (K(R), N(R));
  }, [R, C, o]);
  let B = !(!o || !C || !j || G), [, I] = Fs(B, x, R, { start: K, end: N }), se = ft({ ref: $, className: ((r = Jr(v.className, z && u, z && c, I.enter && u, I.enter && I.closed && c, I.enter && !I.closed && d, I.leave && f, I.leave && !I.closed && g, I.leave && I.closed && h, !I.transition && R && m)) == null ? void 0 : r.trim()) || void 0, ...Ms(I) }), te = 0;
  S === "visible" && (te |= Pe.Open), S === "hidden" && (te |= Pe.Closed), I.enter && (te |= Pe.Opening), I.leave && (te |= Pe.Closing);
  let ue = Ee();
  return D.createElement(pr.Provider, { value: M }, D.createElement(Ys, { value: te }, ue({ ourProps: se, theirProps: v, defaultTag: da, features: fa, visible: S === "visible", name: "Transition.Child" })));
}
function Mp(e, t) {
  let { show: n, appear: r = !1, unmount: o = !0, ...i } = e, l = k(null), s = ua(e), a = Ae(...s ? [l, t] : t === null ? [] : [t]);
  Tn();
  let u = $n();
  if (n === void 0 && u !== null && (n = (u & Pe.Open) === Pe.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, d] = H(n ? "visible" : "hidden"), m = ca(() => {
    n || d("hidden");
  }), [f, g] = H(!0), h = k([n]);
  ce(() => {
    f !== !1 && h.current[h.current.length - 1] !== n && (h.current.push(n), g(!1));
  }, [h, n]);
  let v = W(() => ({ show: n, appear: r, initial: f }), [n, r, f]);
  ce(() => {
    n ? d("visible") : !mr(m) && l.current !== null && d("hidden");
  }, [n, m]);
  let x = { unmount: o }, w = U(() => {
    var $;
    f && g(!1), ($ = e.beforeEnter) == null || $.call(e);
  }), y = U(() => {
    var $;
    f && g(!1), ($ = e.beforeLeave) == null || $.call(e);
  }), C = Ee();
  return D.createElement(pr.Provider, { value: m }, D.createElement(fr.Provider, { value: v }, C({ ourProps: { ...x, as: fe, children: D.createElement(pa, { ref: a, ...x, ...i, beforeEnter: w, beforeLeave: y }) }, theirProps: {}, defaultTag: fe, features: fa, visible: c === "visible", name: "Transition" })));
}
function Fp(e, t) {
  let n = ae(fr) !== null, r = $n() !== null;
  return D.createElement(D.Fragment, null, !n && r ? D.createElement(ao, { ref: t, ...e }) : D.createElement(pa, { ref: t, ...e }));
}
let ao = xe(Mp), pa = xe(Op), Xo = xe(Fp), Pp = Object.assign(ao, { Child: Xo, Root: ao });
var Ap = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Ap || {}), Np = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(Np || {});
let kp = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Zo = me(null);
Zo.displayName = "DialogContext";
function gr(e) {
  let t = ae(Zo);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, gr), n;
  }
  return t;
}
function Dp(e, t) {
  return ke(t.type, kp, e, t);
}
let rl = xe(function(e, t) {
  let n = Me(), { id: r = `headlessui-dialog-${n}`, open: o, onClose: i, initialFocus: l, role: s = "dialog", autoFocus: a = !0, __demoMode: u = !1, unmount: c = !1, ...d } = e, m = k(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (m.current || (m.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let f = $n();
  o === void 0 && f !== null && (o = (f & Pe.Open) === Pe.Open);
  let g = k(null), h = Ae(g, t), v = At(g), x = o ? 0 : 1, [w, y] = at(Dp, { titleId: null, descriptionId: null, panelRef: tr() }), C = U(() => i(!1)), $ = U((N) => y({ type: 0, id: N })), O = Tn() ? x === 0 : !1, [R, _] = Gf(), b = { get current() {
    var N;
    return (N = w.panelRef.current) != null ? N : g.current;
  } }, S = la(), { resolveContainers: E } = vp({ mainTreeNode: S, portals: R, defaultContainers: [b] }), T = f !== null ? (f & Pe.Closing) === Pe.Closing : !1;
  bs(u || T ? !1 : O, { allowed: U(() => {
    var N, B;
    return [(B = (N = g.current) == null ? void 0 : N.closest("[data-headlessui-portal]")) != null ? B : null];
  }), disallowed: U(() => {
    var N;
    return [(N = S == null ? void 0 : S.closest("body > *:not(#headlessui-portal-root)")) != null ? N : null];
  }) }), Ts(O, E, (N) => {
    N.preventDefault(), C();
  }), gp(O, v == null ? void 0 : v.defaultView, (N) => {
    N.preventDefault(), N.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), C();
  }), Os(u || T ? !1 : O, v, E), xs(O, g, C);
  let [F, A] = Ec(), j = W(() => [{ dialogState: x, close: C, setTitleId: $, unmount: c }, w], [x, w, C, $, c]), G = W(() => ({ open: x === 0 }), [x]), z = { ref: h, id: r, role: s, tabIndex: -1, "aria-modal": u ? void 0 : x === 0 ? !0 : void 0, "aria-labelledby": w.titleId, "aria-describedby": F, unmount: c }, V = !hp(), M = Ct.None;
  O && !u && (M |= Ct.RestoreFocus, M |= Ct.TabLock, a && (M |= Ct.AutoFocus), V && (M |= Ct.InitialFocus));
  let K = Ee();
  return D.createElement(kf, null, D.createElement(tl, { force: !0 }, D.createElement(ta, null, D.createElement(Zo.Provider, { value: j }, D.createElement(ea, { target: g }, D.createElement(tl, { force: !1 }, D.createElement(A, { slot: G }, D.createElement(_, null, D.createElement(xp, { initialFocus: l, initialFocusFallback: g, containers: E, features: M }, D.createElement(kc, { value: C }, K({ ourProps: z, theirProps: d, slot: G, defaultTag: Lp, features: Vp, visible: x === 0, name: "Dialog" })))))))))));
}), Lp = "div", Vp = Wt.RenderStrategy | Wt.Static;
function Hp(e, t) {
  let { transition: n = !1, open: r, ...o } = e, i = $n(), l = e.hasOwnProperty("open") || i !== null, s = e.hasOwnProperty("onClose");
  if (!l && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!l) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !o.static ? D.createElement(nl, null, D.createElement(Pp, { show: r, transition: n, unmount: o.unmount }, D.createElement(rl, { ref: t, ...o }))) : D.createElement(nl, null, D.createElement(rl, { ref: t, open: r, ...o }));
}
let zp = "div";
function Bp(e, t) {
  let n = Me(), { id: r = `headlessui-dialog-panel-${n}`, transition: o = !1, ...i } = e, [{ dialogState: l, unmount: s }, a] = gr("Dialog.Panel"), u = Ae(t, a.panelRef), c = W(() => ({ open: l === 0 }), [l]), d = U((v) => {
    v.stopPropagation();
  }), m = { ref: u, id: r, onClick: d }, f = o ? Xo : fe, g = o ? { unmount: s } : {}, h = Ee();
  return D.createElement(f, { ...g }, h({ ourProps: m, theirProps: i, slot: c, defaultTag: zp, name: "Dialog.Panel" }));
}
let jp = "div";
function Up(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: o, unmount: i }] = gr("Dialog.Backdrop"), l = W(() => ({ open: o === 0 }), [o]), s = { ref: t, "aria-hidden": !0 }, a = n ? Xo : fe, u = n ? { unmount: i } : {}, c = Ee();
  return D.createElement(a, { ...u }, c({ ourProps: s, theirProps: r, slot: l, defaultTag: jp, name: "Dialog.Backdrop" }));
}
let Wp = "h2";
function Gp(e, t) {
  let n = Me(), { id: r = `headlessui-dialog-title-${n}`, ...o } = e, [{ dialogState: i, setTitleId: l }] = gr("Dialog.Title"), s = Ae(t);
  re(() => (l(r), () => l(null)), [r, l]);
  let a = W(() => ({ open: i === 0 }), [i]), u = { ref: s, id: r };
  return Ee()({ ourProps: u, theirProps: o, slot: a, defaultTag: Wp, name: "Dialog.Title" });
}
let qp = xe(Hp), ma = xe(Bp), Kp = xe(Up), ga = xe(Gp), Yp = Object.assign(qp, { Panel: ma, Title: ga, Description: Ic });
function Xp({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
  }));
}
const Zp = /* @__PURE__ */ de(Xp);
function Jp({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  }));
}
const Qp = /* @__PURE__ */ de(Jp);
function em({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 12.75 6 6 9-13.5"
  }));
}
const tm = /* @__PURE__ */ de(em);
function nm({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const rm = /* @__PURE__ */ de(nm);
function om({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const im = /* @__PURE__ */ de(om);
function lm({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  }));
}
const sm = /* @__PURE__ */ de(lm);
function am({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const um = /* @__PURE__ */ de(am);
function cm({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const dm = /* @__PURE__ */ de(cm);
function fm({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const pm = /* @__PURE__ */ de(fm);
function mm({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const gm = /* @__PURE__ */ de(mm);
function hm({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const vm = /* @__PURE__ */ de(hm);
function _m({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const wm = /* @__PURE__ */ de(_m);
function ym({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const ha = /* @__PURE__ */ de(ym), bm = { confirmationModal: { defaultConfirm: "Confirm", cancel: "Cancel" }, select: { optionPlaceholder: "Select an option", noOptions: "No options", clear: "Clear", invalidOption: "{{value}} (invalid)" }, input: { clear: "Clear" } }, xm = { upload: "Upload", uploadBlocked: "Your data has validation errors. Fix them before uploading.", back: "Back", loader: { failed: "Something went wrong", uploading: "Uploading", success: "Success", retry: "Try again", backToPreview: "Back to edit" }, backToMappingConfirmation: { title: "Are you sure?", subTitle: "This will discard all changes made after the data was mapped", confirmationText: "Yes, go back", cancelText: "No, stay here" } }, Sm = { uploadAFile: "Upload a file", requiredColumns: "Required columns", optionalColumns: "Optional columns", requiredColumnsTooltip: "This column is required for the import", optionalColumnsTooltip: "This column is optional for the import", importerInformation: "Make sure your file includes all the required columns.", dragAndDrop: "Drag and drop your file here", maxFileSizeInBytes: "Limit {{size}}", browseFiles: "Browse Files", enterManually: "Or just manually enter your data", unsupportedFileType: "Unsupported file type. Please upload a {{formats}} file.", fileTooLarge: "File is too large. Maximum size is {{size}}." }, Cm = { numberRowsImported: "{{count}} Rows Imported", back: "Back", confirm: "Confirm", noData: "No preview data", used: "Used", unused: "Unused", importedColumn: "Imported column", destinationColumn: "Destination column", dataPreview: "Data preview for {{csvHeader}}", mappingsNotValid: "Please set all required mappings", reviewAndConfirm: "Review and confirm each mapping" }, Em = { sheetTitle: "Uploaded data", validationPassed: "All rows pass validation!", removeConfirmationModalTitle: "Remove rows", removeConfirmationModalConfirmationText: "Remove", removeConfirmationModalSubTitle: "Are you sure you want to remove {{rowsCount}} rows?", readOnly: "Read Only", editTooltip: "Double click to edit", all: "All", valid: "Valid", invalid: "Invalid", filterByError: "Filter by error", search: "Search", removeRowsTooltip: "Remove rows", removeRowsTooltipNoRowsSelected: "Please select at least one record in order to delete it", addRowsTooltip: "Add a new row", downloadSheetTooltip: "Download this sheet", reset: "Start over", resetTooltip: "Start over", resetConfirmationModalTitle: "Start over", resetConfirmationModalConfirmationText: "Start over", resetConfirmationModalSubTitle: "Are you sure you want to start over? This will remove all data and reset the sheet to its initial state." }, Rm = { includes: "Value is not in the list of allowed values", integer: "This is not a valid number", multiIncludes: "This value is not valid", regex: "This value is invalid", required: "This value is required", unique: "This value is not unique" }, $m = { success: "Success", importSuccessful: "Import successful", importSuccessfulWithErrors: "Import successful with errors", successDescription: "{{totalRecords}} records were processed in your import", successDescriptionWithStats: "{{recordsImported}} out of {{totalRecords}} records were imported and are now available in your database", error: "Error", importFailed: "Import failed", failedDescription: "An error occurred while importing your data. Please try again", importDetails: "Import details", importDetailsDescription: "Details about your recent data import", fileInformation: "File information", dataEnteredManually: "Data entered manually", original: "Original", processed: "Processed", downloadProcessedData: "Download processed data", importResults: "Import results", totalRows: "{{totalRows}} rows", status: "Status", failed: "Failed", dataImport: "Data import", statisticsSkipped: "{{skipped}} skipped", statisticsFailed: "{{failed}} failed", statisticsImported: "{{imported}} imported", continue: "Continue" }, Tm = {
  components: bm,
  importer: xm,
  uploader: Sm,
  mapper: Cm,
  sheet: Em,
  validators: Rm,
  importStatus: $m
}, Im = { confirmationModal: { defaultConfirm: "Confirmer", cancel: "Annuler" }, select: { optionPlaceholder: "Sélectionnez une option", noOptions: "Pas d'options", clear: "Effacer", invalidOption: "{{value}} (invalide)" }, input: { clear: "Effacer" } }, Om = { upload: "Télécharger", uploadBlocked: "Vos données comportent des erreurs de validation. Corrigez-les avant de les télécharger.", back: "Retour", loader: { failed: "Quelque chose a mal tourné", uploading: "Téléchargement en cours", success: "Succès", retry: "Réessayer", backToPreview: "Retour à modifier" }, backToMappingConfirmation: { title: "Êtes-vous sûr ?", subTitle: "Cela annulera toutes les modifications effectuées après le mappage des données", confirmationText: "Oui, revenir en arrière", cancelText: "Non, rester ici" } }, Mm = { uploadAFile: "Télécharger un fichier", requiredColumns: "Colonnes requises", optionalColumns: "Colonnes optionnelles", requiredColumnsTooltip: "Cette colonne est requise pour l'importation", optionalColumnsTooltip: "Cette colonne est optionnelle pour l'importation", importerInformation: "Assurez-vous que votre fichier inclut toutes les colonnes requises.", dragAndDrop: "Glissez et déposez votre fichier ici", maxFileSizeInBytes: "Limite {{size}}", browseFiles: "Parcourir les fichiers", enterManually: "Ou saisissez vos données manuellement", unsupportedFileType: "Type de fichier non pris en charge. Veuillez télécharger un fichier {{formats}}.", fileTooLarge: "Le fichier est trop volumineux. La taille maximale est {{size}}." }, Fm = { numberRowsImported: "{{count}} lignes importées", back: "Retour", confirm: "Confirmer", noData: "Aucune donnée prévue", unused: "Non utilisées", used: "Utilisées", importedColumn: "Colonne importée", destinationColumn: "Colonne de destination", dataPreview: "Aperçu des données pour {{csvHeader}}", mappingsNotValid: "Veuillez définir toutes les mappings requis", reviewAndConfirm: "Revoir et confirmer chaque mapping" }, Pm = { sheetTitle: "Données importées", validationPassed: "Toutes les lignes passent la validation !", removeConfirmationModalTitle: "Supprimer les lignes", removeConfirmationModalConfirmationText: "Supprimer", removeConfirmationModalSubTitle: "Êtes-vous sûr de vouloir supprimer {{rowsCount}} lignes ?", readOnly: "Lecture seule", editTooltip: "Double-cliquez pour modifier", all: "Toutes", valid: "Valides", invalid: "Invalides", filterByError: "Filtrer par erreur", search: "Recherche", removeRowsTooltip: "Supprimer les lignes", removeRowsTooltipNoRowsSelected: "Veuillez sélectionner au moins un enregistrement avant de le supprimer", addRowsTooltip: "Ajouter une nouvelle ligne", downloadSheetTooltip: "Télécharger cette feuille", reset: "Recommencer", resetTooltip: "Recommencer", resetConfirmationModalTitle: "Recommencer", resetConfirmationModalConfirmationText: "Recommencer", resetConfirmationModalSubTitle: "Êtes-vous sûr de vouloir recommencer ? Cela supprimera toutes les données et réinitialisera la feuille à son état initial." }, Am = { includes: "La valeur n'est pas dans la liste des valeurs autorisées", integer: "Ce n'est pas un nombre valide", multiIncludes: "Cette valeur n'est pas valide", regex: "Cette valeur est invalide", required: "Cette valeur est obligatoire", unique: "Cette valeur n'est pas unique" }, Nm = { success: "Importation réussie", importSuccessful: "Importation réussie", importSuccessfulWithErrors: "Importation réussie avec erreurs", successDescription: "{{count}} enregistrements ont été importés avec succès", successDescriptionWithStats: "{{recordsImported}} sur {{totalRecords}} enregistrements ont été importés avec succès", error: "Importation échouée", errorDescription: "Une erreur est survenue lors de l'importation. Veuillez réessayer", importFailed: "Importation échouée", failedDescription: "Une erreur est survenue lors de l'importation. Veuillez réessayer", importDetails: "Détails de l'importation", importDetailsDescription: "Détails sur votre dernière importation", fileInformation: "Informations sur le fichier", dataEnteredManually: "Données saisies manuellement", original: "Original", processed: "Traité", downloadProcessedData: "Télécharger les données traitées", importResults: "Résultats de l'importation", totalRows: "{{totalRows}} enregistrements", status: "Statut", failed: "Échoué", dataImport: "Importation de données", statisticsSkipped: "{{skipped}} ignorés", statisticsFailed: "{{failed}} échoués", statisticsImported: "{{imported}} importés", continue: "Continuer" }, km = {
  components: Im,
  importer: Om,
  uploader: Mm,
  mapper: Fm,
  sheet: Pm,
  validators: Am,
  importStatus: Nm
}, Dm = { confirmationModal: { defaultConfirm: "Confirmar", cancel: "Cancelar" }, select: { optionPlaceholder: "Selecione uma opção", noOptions: "Sem opções", clear: "Limpar", invalidOption: "{{value}} (inválido)" }, input: { clear: "Limpar" } }, Lm = { upload: "Enviar", uploadBlocked: "Seus dados têm erros de validação. Corrija-os antes de enviar.", back: "Voltar", loader: { failed: "Algo deu errado", uploading: "Enviando", success: "Sucesso", retry: "Tentar novamente", backToPreview: "Voltar para editar" }, backToMappingConfirmation: { title: "Tem certeza?", subTitle: "Isso descartará todas as alterações feitas após o mapeamento dos dados", confirmationText: "Sim, voltar", cancelText: "Não, permanecer aqui" } }, Vm = { uploadAFile: "Enviar um arquivo", requiredColumns: "Colunas obrigatórias", optionalColumns: "Colunas opcionais", requiredColumnsTooltip: "Esta coluna é obrigatória para a importação", optionalColumnsTooltip: "Esta coluna é opcional para a importação", importerInformation: "Certifique-se de que seu arquivo inclua todas as colunas obrigatórias.", dragAndDrop: "Arraste e solte seu arquivo aqui", maxFileSizeInBytes: "Limite {{size}}", browseFiles: "Procurar arquivos", enterManually: "Ou apenas insira seus dados manualmente", unsupportedFileType: "Tipo de arquivo não suportado. Por favor, envie um arquivo {{formats}}.", fileTooLarge: "O arquivo é muito grande. O tamanho máximo é {{size}}." }, Hm = { numberRowsImported: "{{count}} linhas importadas", back: "Voltar", confirm: "Confirmar", noData: "Nenhum dado de pré-visualização", used: "Usado", unused: "Não usado", importedColumn: "Coluna importada", destinationColumn: "Coluna de destino", dataPreview: "Pré-visualização de dados para {{csvHeader}}", mappingsNotValid: "Por favor, defina todos os mapeamentos obrigatórios", reviewAndConfirm: "Revise e confirme cada mapeamento" }, zm = { sheetTitle: "Dados enviados", validationPassed: "Todas as linhas passaram na validação!", removeConfirmationModalTitle: "Remover linhas", removeConfirmationModalConfirmationText: "Remover", removeConfirmationModalSubTitle: "Tem certeza que deseja remover {{rowsCount}} linhas?", readOnly: "Somente leitura", editTooltip: "Clique duas vezes para editar", all: "Todas", valid: "Válido", invalid: "Inválido", filterByError: "Filtrar por erro", search: "Buscar", removeRowsTooltip: "Remover linhas", removeRowsTooltipNoRowsSelected: "Selecione pelo menos um registro para deletá-lo", addRowsTooltip: "Adicionar nova linha", downloadSheetTooltip: "Baixar esta planilha", reset: "Recomeçar", resetTooltip: "Recomeçar", resetConfirmationModalTitle: "Recomeçar", resetConfirmationModalConfirmationText: "Recomeçar", resetConfirmationModalSubTitle: "Tem certeza que deseja recomeçar? Isso removerá todos os dados e resetará a planilha ao seu estado inicial." }, Bm = { includes: "O valor não está na lista de valores permitidos", integer: "Este não é um número válido", multiIncludes: "Este valor não é válido", regex: "Este valor é inválido", required: "Este valor é obrigatório", unique: "Este valor não é único" }, jm = { success: "Sucesso", importSuccessful: "Importação bem-sucedida", importSuccessfulWithErrors: "Importação concluída com erros", successDescription: "{{totalRecords}} registros foram processados na sua importação", successDescriptionWithStats: "{{recordsImported}} de {{totalRecords}} registros foram importados e estão disponíveis na sua base de dados", error: "Erro", importFailed: "Falha na importação", failedDescription: "Ocorreu um erro ao importar seus dados. Tente novamente", importDetails: "Detalhes da importação", importDetailsDescription: "Detalhes sobre sua importação recente de dados", fileInformation: "Informações do arquivo", dataEnteredManually: "Dados inseridos manualmente", original: "Original", processed: "Processado", downloadProcessedData: "Baixar dados processados", importResults: "Resultados da importação", totalRows: "{{totalRows}} linhas", status: "Status", failed: "Falhou", dataImport: "Importação de dados", statisticsSkipped: "{{skipped}} ignoradas", statisticsFailed: "{{failed}} falharam", statisticsImported: "{{imported}} importadas", continue: "Continuar" }, Um = {
  components: Dm,
  importer: Lm,
  uploader: Vm,
  mapper: Hm,
  sheet: zm,
  validators: Bm,
  importStatus: jm
}, va = me(
  {}
);
function Wm({
  importerDefintion: e,
  children: t
}) {
  return /* @__PURE__ */ p(va.Provider, { value: e, children: t });
}
function ze() {
  return ae(va);
}
const Gm = {
  en: Tm,
  fr: km,
  "pt-BR": Um
}, qm = "en";
function ol(e, t, n) {
  const r = t.split(".");
  let o = (n == null ? void 0 : n[e]) ?? Gm[e];
  for (const i of r)
    if (o && typeof o == "object")
      o = o[i];
    else
      return t;
  return typeof o == "string" ? o : t;
}
function Km(e, t) {
  return e.replace(/{{([^}]+)}}/g, (n, r) => `${t[r] ?? `{${r}}`}`);
}
function Ym(e, t) {
  const n = e.split(/({{[^}]+}})/g);
  return /* @__PURE__ */ p("span", { children: n.map((r) => {
    const o = r.match(/{{([^}]+)}}/);
    let i = r;
    if (o) {
      const l = o[1];
      i = t[l] ?? `{${l}}`;
    }
    return /* @__PURE__ */ p(fe, { children: i }, r);
  }) });
}
const _a = me(
  {}
);
function Xm({ children: e }) {
  const { translationResources: t, locale: n } = ze(), r = n ?? qm;
  function o(l, s = {}) {
    const a = ol(r, l, t);
    return Km(a, s);
  }
  function i(l, s = {}) {
    const a = ol(r, l, t);
    return Ym(a, s);
  }
  return /* @__PURE__ */ p(_a.Provider, { value: { t: o, tHtml: i }, children: e });
}
function ye() {
  return ae(_a);
}
function uo({
  open: e,
  setOpen: t,
  title: n,
  subTitle: r,
  confirmationText: o,
  cancelText: i,
  onConfirm: l,
  variant: s = "default"
}) {
  const { t: a } = ye(), u = {
    danger: {
      icon: /* @__PURE__ */ p(
        sm,
        {
          className: "text-hello-csv-danger size-6",
          "aria-hidden": "true"
        }
      ),
      btnVariant: "danger",
      bgColor: "bg-hello-csv-danger-extra-light"
    },
    default: {
      btnVariant: "primary"
    }
  }, { icon: c, btnVariant: d, bgColor: m } = u[s];
  return /* @__PURE__ */ p(Yp, { open: e, onClose: t, className: "relative z-10", children: [
    /* @__PURE__ */ p(
      Kp,
      {
        transition: !0,
        className: "fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      }
    ),
    /* @__PURE__ */ p("div", { className: "fixed inset-0 z-10 w-screen overflow-y-auto", children: /* @__PURE__ */ p("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ p(
      ma,
      {
        transition: !0,
        className: "relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95",
        children: [
          /* @__PURE__ */ p("div", { className: "sm:flex sm:items-start", children: [
            c && /* @__PURE__ */ p(
              "div",
              {
                className: `mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${m} sm:mx-0 sm:size-10`,
                children: c
              }
            ),
            /* @__PURE__ */ p("div", { className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left", children: [
              /* @__PURE__ */ p(
                ga,
                {
                  as: "h3",
                  className: "text-base font-semibold text-gray-900",
                  children: n
                }
              ),
              r && /* @__PURE__ */ p("div", { className: "mt-2", children: /* @__PURE__ */ p("p", { className: "text-sm text-gray-500", children: r }) })
            ] })
          ] }),
          /* @__PURE__ */ p("div", { className: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse", children: [
            /* @__PURE__ */ p("div", { className: "sm:ml-3 sm:w-auto", children: /* @__PURE__ */ p(
              He,
              {
                variant: d,
                onClick: () => {
                  l(), t(!1);
                },
                withFullWidth: !0,
                children: o ?? a("components.confirmationModal.defaultConfirm")
              }
            ) }),
            /* @__PURE__ */ p("div", { className: "mt-3 sm:mt-0 sm:w-auto", children: /* @__PURE__ */ p(
              He,
              {
                variant: "tertiary",
                "data-autofocus": !0,
                onClick: () => t(!1),
                withFullWidth: !0,
                children: i ?? a("components.confirmationModal.cancel")
              }
            ) })
          ] })
        ]
      }
    ) }) })
  ] });
}
const Zm = 100, wa = 5, Jm = [
  "text/csv",
  "text/tab-separated-values"
], Qm = [".csv", ".tsv"], il = ",", eg = 500, tg = "headlessui-portal-root", co = "hello-csv", ng = 52.62, fo = "checkbox-column-id", rg = 110, og = 50, ig = 500, lg = 150, ya = "Yes", ba = "No", sg = de(function({ children: t }, n) {
  return re(() => {
    const r = new MutationObserver((o) => {
      for (const i of o)
        i.addedNodes.forEach((l) => {
          l.nodeType === Node.ELEMENT_NODE && l.id === tg && l.classList.add(co);
        });
    });
    return r.observe(document.body, { childList: !0, subtree: !1 }), () => r.disconnect();
  }, []), /* @__PURE__ */ p(
    "div",
    {
      role: "group",
      "aria-label": "Hello CSV",
      className: `${co}`,
      style: { display: "contents" },
      children: /* @__PURE__ */ p("div", { ref: n, className: "min-h-0 w-full overflow-auto bg-white", children: t })
    }
  );
});
function ag({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z",
    clipRule: "evenodd"
  }));
}
const ug = /* @__PURE__ */ de(ag);
function cg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",
    clipRule: "evenodd"
  }));
}
const dg = /* @__PURE__ */ de(cg);
function fg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z",
    clipRule: "evenodd"
  }));
}
const pg = /* @__PURE__ */ de(fg);
function mg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z",
    clipRule: "evenodd"
  }));
}
const gg = /* @__PURE__ */ de(mg);
function hg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    clipRule: "evenodd"
  }));
}
const vg = /* @__PURE__ */ de(hg);
function _g({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
  }));
}
const xa = /* @__PURE__ */ de(_g), Sa = de(
  ({
    value: e,
    onBlur: t,
    onChange: n,
    placeholder: r,
    iconBuilder: o,
    classes: i,
    clearable: l,
    type: s = "text",
    ...a
  }, u) => {
    const { t: c } = ye(), [d, m] = H(e);
    re(() => {
      m(e);
    }, [e]);
    const f = l && e != null && e !== "";
    function g(h) {
      const v = h.target, x = s === "number" ? v == null ? void 0 : v.valueAsNumber : v == null ? void 0 : v.value;
      return (typeof x == "number" && isNaN(x) ? "" : x) ?? "";
    }
    return /* @__PURE__ */ p("div", { className: "grid grid-cols-1", children: [
      /* @__PURE__ */ p(
        "input",
        {
          "aria-label": a["aria-label"],
          ref: u,
          type: s,
          inputMode: s === "number" ? "numeric" : "text",
          placeholder: r,
          value: typeof d == "boolean" ? d.toString() : Array.isArray(d) ? "" : d ?? "",
          onChange: (h) => (n == null ? void 0 : n(g(h))) ?? m(g(h)),
          className: `${i} ${o != null ? "pl-10" : ""} ${l ? "pr-10" : ""} focus:outline-hello-csv-primary col-start-1 row-start-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6`,
          onBlur: (h) => t == null ? void 0 : t(g(h))
        }
      ),
      o == null ? void 0 : o({
        "aria-hidden": "true",
        className: "pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
      }),
      f && /* @__PURE__ */ p(
        "span",
        {
          role: "button",
          tabIndex: 0,
          "aria-label": c("components.input.clear"),
          onClick: (h) => {
            h.stopPropagation(), n == null || n("");
          },
          className: "col-end-2 row-start-1 flex cursor-pointer items-center justify-self-end pr-2",
          children: /* @__PURE__ */ p(
            xa,
            {
              className: "h-5 w-5 text-gray-500 hover:text-gray-700",
              "aria-hidden": "true"
            }
          )
        }
      )
    ] });
  }
);
function $t({
  value: e,
  options: t,
  onChange: n,
  onClose: r,
  multiple: o = !1,
  compareFunction: i = (m, f) => m === f,
  clearable: l = !1,
  searchable: s = !1,
  placeholder: a,
  classes: u,
  displayPlaceholderWhenSelected: c = !1,
  ...d
}) {
  const { t: m } = ye(), [f, g] = H(""), h = (E) => o && Array.isArray(e) ? e.some((T) => i(T, E)) : i(e, E), v = (E) => {
    if (g(""), o) {
      const T = Array.isArray(E) ? E : [E];
      n(T);
    } else
      n(E);
  }, x = () => {
    g(""), n(o ? [] : null);
  }, w = t.filter((E) => h(E.value)), y = w.map((E) => E.label).join(", "), C = f && s ? t.filter(
    (E) => String(E.label).toLowerCase().includes(f.toLowerCase())
  ) : t, $ = a ?? m("components.select.optionPlaceholder"), O = () => s ? y : w.length > 0 ? c ? `${$}: ${y}` : y : "", _ = C.some((E) => E.group) ? Object.entries(
    C.reduce(
      (E, T) => {
        const F = T.group || "ungrouped";
        return E[F] = E[F] || [], E[F].push(T), E;
      },
      {}
    )
  ).map(([E, T]) => ({
    label: E,
    items: T
  })) : [{ label: null, items: C }], b = _.every(({ items: E }) => E.length === 0), S = l && w.length > 0;
  return /* @__PURE__ */ p(
    mp,
    {
      value: e,
      onChange: v,
      onClose: r,
      multiple: o,
      children: /* @__PURE__ */ p("div", { className: "relative", children: [
        /* @__PURE__ */ p(
          lo,
          {
            className: "w-full",
            "aria-label": d["aria-label"] ?? a,
            children: /* @__PURE__ */ p(
              ra,
              {
                className: `${u} focus:outline-hello-csv-primary block w-full cursor-pointer truncate rounded-md bg-white py-1.5 focus:cursor-text ${S ? "pr-12" : "pr-2"} pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm`,
                displayValue: O,
                onChange: (E) => s && g(E.target.value),
                placeholder: $,
                readOnly: !s
              }
            )
          }
        ),
        S && /* @__PURE__ */ p(
          "span",
          {
            role: "button",
            tabIndex: 0,
            "aria-label": m("components.select.clear"),
            onClick: (E) => {
              E.stopPropagation(), x();
            },
            className: "absolute inset-y-0 right-6 flex cursor-pointer items-center text-gray-500 hover:text-gray-700",
            children: /* @__PURE__ */ p(
              xa,
              {
                className: "h-5 w-5 text-gray-500 hover:text-gray-700",
                "aria-hidden": "true"
              }
            )
          }
        ),
        /* @__PURE__ */ p(lo, { className: "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2", children: /* @__PURE__ */ p(
          pg,
          {
            "aria-hidden": "true",
            className: "col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          }
        ) }),
        /* @__PURE__ */ p(
          oa,
          {
            anchor: "bottom",
            transition: !0,
            className: "absolute z-99 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm",
            children: [
              b && /* @__PURE__ */ p(
                so,
                {
                  disabled: !0,
                  value: null,
                  className: "pointer-events-none relative flex items-center justify-center py-2 pr-9 pl-3 text-gray-400 select-none",
                  children: /* @__PURE__ */ p("span", { className: "block truncate font-normal", children: m("components.select.noOptions") })
                },
                "no-options"
              ),
              _.map(({ label: E, items: T }) => /* @__PURE__ */ p("div", { children: [
                E && /* @__PURE__ */ p("div", { className: "py-2 pr-9 pl-3 text-gray-400 uppercase", children: E }),
                T.map((F) => /* @__PURE__ */ p(
                  so,
                  {
                    value: F.value,
                    className: "group data-focus:bg-hello-csv-primary relative flex cursor-default items-center py-2 pr-9 pl-3 text-gray-900 select-none data-focus:text-white data-focus:outline-hidden",
                    children: [
                      F.icon,
                      /* @__PURE__ */ p("span", { className: "block truncate font-normal group-data-selected:font-semibold", children: F.label }),
                      h(F.value) && /* @__PURE__ */ p("span", { className: "text-hello-csv-primary absolute inset-y-0 right-0 flex items-center pr-4 group-data-focus:text-white", children: /* @__PURE__ */ p(ug, { "aria-hidden": "true", className: "h-5 w-5" }) })
                    ]
                  },
                  typeof F.value == "object" ? JSON.stringify(F.value) : String(F.value)
                ))
              ] }, E || "all"))
            ]
          }
        )
      ] })
    }
  );
}
function wg({
  tabs: e,
  activeTab: t,
  onTabChange: n,
  idPrefix: r
}) {
  return /* @__PURE__ */ p("div", { children: [
    /* @__PURE__ */ p("div", { className: "grid grid-cols-1 sm:hidden", children: /* @__PURE__ */ p(
      $t,
      {
        options: e,
        value: t,
        onChange: (o) => n(o)
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "hidden sm:block", children: /* @__PURE__ */ p("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ p(
      "nav",
      {
        "aria-label": "Tabs",
        className: "-mb-px flex space-x-8",
        role: "tablist",
        children: e.map((o) => /* @__PURE__ */ p(
          "button",
          {
            id: `${r}-tab-${o.value}`,
            role: "tab",
            "aria-selected": o.value === t,
            "aria-current": o.value === t ? "page" : void 0,
            "aria-controls": `${r}-tabpanel-${o.value}`,
            onClick: () => n(o.value),
            className: ` ${o.value === t ? "border-hello-csv-primary text-hello-csv-primary" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} flex cursor-pointer items-center border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap`,
            children: [
              o.icon,
              o.label
            ]
          },
          o.label
        ))
      }
    ) }) })
  ] });
}
const yg = wt(
  "bg-gray-50 text-gray-900 absolute outline top-full w-full whitespace-normal z-5 mb-2 hidden px-2 py-4 text-xs group-focus-within:block group-hover:block",
  {
    variants: {
      variant: {
        error: "outline-hello-csv-danger",
        info: "outline-gray-500"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
), bg = wt("group relative h-full w-full", {
  variants: {
    variant: {
      error: "focus-within:outline-hello-csv-danger hover:outline-hello-csv-danger",
      info: "focus-within:outline-gray-500 hover:outline-gray-500"
    },
    withOutline: {
      true: "focus-within:outline hover:outline hover:z-5 focus-within:z-5",
      false: ""
    }
  },
  defaultVariants: {
    variant: "info",
    withOutline: !1
  }
});
function xg({
  variant: e,
  children: t,
  tooltipText: n
}) {
  const r = yg({ variant: e }), o = bg({
    variant: e,
    withOutline: !!n
  });
  return /* @__PURE__ */ p("div", { className: o, tabIndex: 0, children: [
    t,
    n && /* @__PURE__ */ p("span", { className: r, children: n })
  ] });
}
const Sg = wt(
  "relative inline-flex cursor-pointer items-center px-3 py-2 text-sm font-semibold ring-gray-300 ring-1 ring-inset focus:z-10",
  {
    variants: {
      active: {
        true: "",
        false: "bg-white hover:bg-gray-50"
      },
      variant: {
        default: "",
        danger: "text-hello-csv-danger"
      },
      location: {
        left: "rounded-l-md",
        center: "-ml-px",
        right: "rounded-r-md -ml-px "
      }
    },
    compoundVariants: [
      {
        active: !0,
        variant: "default",
        className: "bg-gray-900 text-white"
      },
      {
        active: !0,
        variant: "danger",
        className: "bg-hello-csv-danger text-white"
      },
      {
        active: !1,
        variant: "default",
        className: "text-gray-900"
      },
      {
        active: !1,
        variant: "danger",
        className: "text-hello-csv-danger"
      }
    ]
  }
);
function Cg({ activeButton: e, buttons: t }) {
  return /* @__PURE__ */ p("span", { className: "isolate inline-flex rounded-md shadow-xs", children: t.map((n, r) => /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      onClick: n.onClick,
      "aria-current": n.value === e,
      className: Sg({
        active: n.value === e,
        variant: n.variant,
        location: r === 0 ? "left" : r === t.length - 1 ? "right" : "center"
      }),
      children: n.label
    },
    n.value
  )) });
}
function Ca(e, t) {
  return e.indexOf(t) !== -1;
}
function Ea(e, t) {
  const n = {};
  return e.forEach((r) => {
    t(r, n);
  }), n;
}
function Ra(e) {
  const t = { ...e };
  return delete t.rowIndex, Object.values(t).length > 0;
}
class On {
  constructor(t) {
    Se(this, "definition");
    this.definition = t;
  }
  transform(t) {
    const n = this.parse(t);
    return n ?? t;
  }
  parse(t) {
    throw new Error("Not Implemented");
  }
}
class Eg extends On {
  constructor(n) {
    super(n);
    Se(this, "key");
    Se(this, "parse");
    const { key: r, transformFn: o } = n;
    this.key = r, this.parse = o;
  }
}
class Rg extends On {
  parse(t) {
    if (typeof t == "string")
      return t.replace(/[^0-9]/g, "");
  }
}
class $g extends On {
  parse(t) {
    if (typeof t == "string" && Ca(t, "-"))
      return t.split("-")[0];
  }
}
const ll = [
  ["Arizona", "AZ"],
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"]
];
class Tg extends On {
  parse(t) {
    const n = ll.map((r) => r[0].toLowerCase());
    if (typeof t == "string" && Ca(n, t.toLowerCase())) {
      const r = n.indexOf(t.toLowerCase());
      return ll[r][1];
    }
  }
}
class Ig extends On {
  parse(t) {
    if (typeof t == "string")
      return t.trim();
  }
}
function Og(e) {
  const t = {
    phone_number: Rg,
    postal_code: $g,
    state_code: Tg,
    strip: Ig,
    custom: Eg
  };
  if (!(e.transformer in t))
    throw new Error(
      `Missing transformer for ${e.transformer}. Valid transformer options are ${Object.keys(t).join(", ")}`
    );
  const n = t[e.transformer];
  return new n(e);
}
function Mg(e, t) {
  const n = Ea(
    e.columns,
    (r, o) => {
      o[r.id] = new Fg(), r.transformers && r.transformers.forEach((i) => {
        o[r.id].push(
          Og(i)
        );
      });
    }
  );
  return e.columns.forEach((r) => {
    const o = r.id, i = n[o];
    t.rows.forEach((l) => {
      if (!Ra(l))
        return;
      const s = l[o];
      hr(s) || (l[o] = i.transform(s));
    });
  }), t.rows;
}
function po(e, t) {
  const n = [];
  return e.forEach((r) => {
    const o = t.find(
      (i) => i.sheetId === r.id
    );
    if (o) {
      const i = Mg(r, o);
      n.push({ sheetId: r.id, rows: i });
    }
  }), n;
}
class Fg {
  // Series of transformations
  constructor(t = []) {
    Se(this, "steps");
    this.steps = t;
  }
  push(t) {
    this.steps.push(t);
  }
  transform(t) {
    let n = t;
    return this.steps.forEach((r) => {
      n = r.transform(n);
    }), n;
  }
}
const Pg = (e) => e == null, Ag = (e) => e.rows.filter((t) => Object.keys(t).length > 0);
function hr(e) {
  return Pg(e) ? !0 : typeof e == "string" ? e.trim() === "" : Array.isArray(e) ? e.length === 0 : !1;
}
const sl = (e) => [...new Set(e)];
function kn(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Jn(e) {
  if (e == null)
    return null;
  const t = ["_", " ", ".", "-", "/"];
  return e.toString().toLowerCase().replace(
    new RegExp(t.map((n) => `\\${n}`).join("|"), "g"),
    ""
  );
}
function al(e) {
  if (e == null)
    return "";
  let t = String(e);
  return t = t.replace(/"/g, '""'), /[",\n\r]/.test(t) && (t = `"${t}"`), t;
}
function Jo(e, t, n, r) {
  const o = e.columns.map(
    (s) => al(r === "label" ? s.label : s.id)
  ).join(il), i = t.map(
    (s) => e.columns.map((a) => {
      const u = s[a.id];
      let c;
      return r === "value" || u == null ? c = Array.isArray(u) ? u.join(", ") : u : c = Ia(
        e,
        a,
        u,
        n
      ), al(c);
    }).join(il)
  ), l = [o, ...i].join(`
`);
  return new Blob([l], { type: "text/csv" });
}
function $a(e, t, n, r) {
  const o = Jo(
    e,
    t,
    n,
    r
  ), i = URL.createObjectURL(o), l = document.createElement("a");
  l.href = i, l.download = `${e.label}.csv`, l.click(), URL.revokeObjectURL(i);
}
function Ta(e, t) {
  const { sheetId: n, sheetColumnId: r } = e.typeArguments;
  return t[n][r] ?? {};
}
function mo(e, t) {
  return Array.isArray(t) ? t.map((n) => e[n] ?? n).join(", ") : typeof t != "string" ? t : e[t] ?? t;
}
function Ia(e, t, n, r) {
  var o, i, l;
  if (t.type === "enum")
    return mo(
      ((o = r[e.id]) == null ? void 0 : o[t.id]) ?? {},
      n
    );
  if (t.type === "reference" && n != null)
    return mo(
      Ta(t, r),
      n
    );
  if (t.type === "boolean") {
    if (n === !0)
      return ((i = t.typeArguments) == null ? void 0 : i.trueLabel) ?? ya;
    if (n === !1)
      return ((l = t.typeArguments) == null ? void 0 : l.falseLabel) ?? ba;
  }
  return n;
}
function Qo(e, t) {
  return po(
    e,
    t.map((n) => ({ ...n, rows: Ag(n) }))
  );
}
const xt = 8, Dn = 8, dt = 8, Ln = -4, Ng = wt(
  "absolute z-50 w-max rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg transition-opacity duration-200",
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none"
      },
      hidden: {
        true: "hidden",
        false: ""
      }
    }
  }
);
function Ht({
  tooltipText: e,
  children: t,
  className: n,
  hidden: r
}) {
  const [o, i] = H(!1), [l, s] = H({ top: 0, left: 0 }), [a, u] = H("bottom"), [c, d] = H(0), m = k(null), f = k(null), [g, h] = H(null);
  re(() => {
    const y = document.createElement("div");
    return y.classList.add(co), document.body.appendChild(y), h(y), () => {
      document.body.removeChild(y);
    };
  }, []);
  const v = () => {
    requestAnimationFrame(() => {
      if (!m.current || !f.current) return;
      const y = m.current.getBoundingClientRect(), C = f.current.getBoundingClientRect(), $ = window.innerWidth, O = window.innerHeight, R = O - y.bottom, _ = y.top, b = $ - y.right;
      let S = "bottom";
      R >= C.height + xt ? S = "bottom" : _ >= C.height + xt ? S = "top" : b >= C.width + xt ? S = "right" : S = "left";
      let E = 0, T = 0;
      switch (S) {
        case "bottom":
          E = y.bottom + xt + window.scrollY, T = y.left + y.width / 2 - C.width / 2 + window.scrollX;
          break;
        case "top":
          E = y.top - C.height - xt + window.scrollY, T = y.left + y.width / 2 - C.width / 2 + window.scrollX;
          break;
        case "right":
          E = y.top + y.height / 2 - C.height / 2 + window.scrollY, T = y.right + xt + window.scrollX;
          break;
        case "left":
          E = y.top + y.height / 2 - C.height / 2 + window.scrollY, T = y.left - C.width - xt + window.scrollX;
          break;
      }
      E = kn(
        E,
        Dn + window.scrollY,
        window.scrollY + O - C.height - Dn
      ), T = kn(
        T,
        Dn + window.scrollX,
        window.scrollX + $ - C.width - Dn
      );
      const F = y.left + y.width / 2 + window.scrollX, A = y.top + y.height / 2 + window.scrollY;
      let j = 0;
      if (S === "top" || S === "bottom") {
        const G = F - T;
        j = kn(
          G,
          dt,
          C.width - dt
        );
      } else {
        const G = A - E;
        j = kn(
          G,
          dt,
          C.height - dt
        );
      }
      u(S), s({ top: E, left: T }), d(j), i(!0);
    });
  }, x = () => i(!1), w = Me();
  return /* @__PURE__ */ p(
    "div",
    {
      ref: m,
      tabIndex: 0,
      className: `${n ?? ""} relative inline-block`,
      onMouseEnter: v,
      onMouseLeave: x,
      onFocus: v,
      onBlur: x,
      "aria-describedby": w,
      children: [
        t,
        g && xn(
          /* @__PURE__ */ p(
            "div",
            {
              id: w,
              role: "tooltip",
              "aria-label": e,
              "aria-hidden": !o,
              ref: f,
              className: Ng({ visible: o, hidden: r }),
              style: {
                top: `${l.top}px`,
                left: `${l.left}px`
              },
              children: [
                e,
                /* @__PURE__ */ p(
                  "div",
                  {
                    className: "absolute h-2 w-2 rotate-45 bg-gray-900",
                    style: a === "bottom" ? { top: Ln, left: c - dt / 2 } : a === "top" ? {
                      bottom: Ln,
                      left: c - dt / 2
                    } : a === "left" ? {
                      right: Ln,
                      top: c - dt / 2
                    } : {
                      left: Ln,
                      top: c - dt / 2
                    }
                  }
                )
              ]
            }
          ),
          g
        )
      ]
    }
  );
}
const kg = wt("inline-flex items-center rounded-md px-1.5 py-0.5", {
  variants: {
    variant: {
      primary: "bg-hello-csv-primary-extra-light text-xs font-medium",
      success: "bg-hello-csv-success-extra-light text-hello-csv-success text-xs font-medium",
      error: "bg-hello-csv-danger-extra-light text-hello-csv-danger text-xs font-medium"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});
function ei({ children: e, variant: t }) {
  const n = kg({ variant: t });
  return /* @__PURE__ */ p("div", { className: n, children: e });
}
function Dg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
    clipRule: "evenodd"
  }));
}
const Oa = /* @__PURE__ */ de(Dg);
function Lg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const Vg = /* @__PURE__ */ de(Lg);
function Hg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const go = /* @__PURE__ */ de(Hg);
function zg({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const Bg = /* @__PURE__ */ de(zg), jg = {
  info: {
    icon: /* @__PURE__ */ p(
      Bg,
      {
        className: "text-hello-csv-primary-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-primary-extra-light text-hello-csv-primary rounded-md p-4"
  },
  success: {
    icon: /* @__PURE__ */ p(
      Oa,
      {
        className: "text-hello-csv-success-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-success-extra-light text-hello-csv-success rounded-md p-4"
  },
  error: {
    icon: /* @__PURE__ */ p(
      go,
      {
        className: "text-hello-csv-danger-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-danger-extra-light text-hello-csv-danger rounded-md p-4"
  },
  warning: {
    icon: /* @__PURE__ */ p(
      go,
      {
        className: "text-hello-csv-warning-light size-5",
        "aria-hidden": "true"
      }
    ),
    classes: "bg-hello-csv-warning-extra-light text-hello-csv-warning rounded-md p-4"
  }
};
function ti({
  variant: e = "info",
  header: t,
  description: n
}) {
  const { icon: r, classes: o } = jg[e];
  return /* @__PURE__ */ p("div", { className: o, children: /* @__PURE__ */ p("div", { className: "flex", children: [
    /* @__PURE__ */ p("div", { className: "mt-1 shrink-0", children: r }),
    /* @__PURE__ */ p("div", { className: "ml-3", children: [
      t && /* @__PURE__ */ p("div", { className: "text-md", children: t }),
      /* @__PURE__ */ p("div", { className: "text-sm", children: n })
    ] })
  ] }) });
}
function Ma({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "flex", children: [
    /* @__PURE__ */ p("div", { className: "shrink-0", children: /* @__PURE__ */ p(
      wm,
      {
        "aria-hidden": "true",
        className: "text-hello-csv-danger size-5"
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "ml-3 flex-1 md:flex md:justify-between", children: /* @__PURE__ */ p("p", { className: "text-hello-csv-danger text-sm", children: e }) })
  ] });
}
const Ug = wt(
  "inline-block rounded-full animate-spin border-t-transparent h-4 w-4 border-2",
  {
    variants: {
      color: {
        light: "border-white",
        dark: "border-black"
      }
    },
    defaultVariants: {
      color: "dark"
    }
  }
);
function Fa({ color: e = "dark" }) {
  return /* @__PURE__ */ p("span", { className: `${Ug({ color: e })}` });
}
class Nt {
  constructor(t) {
    Se(this, "definition");
    this.definition = t;
  }
  isValid(t, n) {
    throw new Error("Not Implemented");
  }
}
class Wg extends Nt {
  constructor(n) {
    super(n);
    Se(this, "key");
    Se(this, "validateFn");
    this.key = n.key, this.validateFn = n.validateFn;
  }
  isValid(n, r) {
    return this.validateFn(n, r);
  }
}
function Gg(e) {
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
class vr extends Nt {
  constructor(n) {
    super(n);
    Se(this, "regexp");
    typeof n.regex == "object" ? this.regexp = n.regex : this.regexp = new RegExp(Gg(n.regex));
  }
  isValid(n) {
    if (!this.regexp.test((n == null ? void 0 : n.toString()) ?? ""))
      return this.definition.error || "validators.regex";
  }
}
class qg extends vr {
  constructor(t) {
    super({
      ...t,
      regex: /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i
    });
  }
}
class Kg extends Nt {
  constructor(n) {
    super(n);
    Se(this, "values");
    if (this.values = n.values, !this.values)
      throw new Error("Missing `values` for `includes` validator");
  }
  isValid(n) {
    if (n == null || !this.values.includes(n))
      return this.definition.error || "validators.includes";
  }
}
class Yg extends Nt {
  isValid(t) {
    if (!(typeof t == "number" && Number.isFinite(t)))
      return this.definition.error || "validators.integer";
  }
}
class Xg extends Nt {
  constructor(n) {
    super(n);
    Se(this, "delimiter");
    Se(this, "values");
    if (this.delimiter = n.delimiter || /[,|]/, this.values = n.values, !this.values)
      throw new Error("Missing values for `multi_includes` validator");
  }
  isValid(n) {
    var o;
    if (Array.isArray(n))
      return n.some((i) => !this.values.includes(i)) ? this.definition.error || "validators.multiIncludes" : void 0;
    if ((((o = n == null ? void 0 : n.toString()) == null ? void 0 : o.split(this.delimiter)) ?? []).some((i) => !this.values.includes(i.trim())))
      return this.definition.error || "validators.multiIncludes";
  }
}
class Zg extends vr {
  constructor(t) {
    super({
      ...t,
      regex: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
    });
  }
}
class Jg extends vr {
  constructor(t) {
    super({
      ...t,
      regex: /^\d{5}(-\d{4})?$/
    });
  }
}
class Qg extends Nt {
  constructor(n) {
    super(n);
    Se(this, "when");
    this.when = n.when ?? (() => !0);
  }
  isValid(n, r) {
    if (this.when(r) && hr(n))
      return this.definition.error || "validators.required";
  }
}
class eh extends Nt {
  constructor(n) {
    super(n);
    Se(this, "seen");
    Se(this, "caseInsensitive");
    this.caseInsensitive = n.caseInsensitive || !1, this.seen = /* @__PURE__ */ new Set();
  }
  comparableValue(n) {
    if (Array.isArray(n)) {
      const r = [...n].sort();
      return this.caseInsensitive ? JSON.stringify(r.map((o) => o.toLocaleLowerCase())) : JSON.stringify(r);
    }
    return this.caseInsensitive && typeof n == "string" ? n.toLocaleLowerCase() : n;
  }
  isValid(n) {
    const r = this.comparableValue(n);
    if (this.seen.has(r))
      return this.definition.error || "validators.unique";
    this.seen.add(r);
  }
}
function th(e) {
  const t = {
    regex_matches: vr,
    required: Qg,
    unique: eh,
    includes: Kg,
    multi_includes: Xg,
    is_integer: Yg,
    postal_code: Jg,
    phone_number: Zg,
    email: qg,
    custom: Wg
  };
  if (!(e.validate in t))
    throw new Error(
      `Missing validator for ${e.validate}. Valid validator options are ${Object.keys(t).join(", ")}`
    );
  const n = t[e.validate];
  return new n(e);
}
function Pa(e, t) {
  var o, i, l;
  const n = e.typeArguments, r = t.find(
    (s) => s.sheetId === n.sheetId
  );
  return ((l = (i = (o = r == null ? void 0 : r.rows) == null ? void 0 : o.map((s) => s[n.sheetColumnId])) == null ? void 0 : i.filter((s) => !hr(s))) == null ? void 0 : l.filter((s, a, u) => u.indexOf(s) === a)) ?? [];
}
function Aa(e, t, n) {
  return e.find((r) => r.sheetId === t).rows.indexOf(n);
}
function nh(e, t, n, r, o, i, l, s) {
  return W(() => {
    let u = e.rows;
    switch (n) {
      case "errors":
        u = e.rows.filter(
          (c, d) => r.some((m) => m.rowIndex === d)
        );
        break;
      case "valid":
        u = e.rows.filter(
          (c, d) => !r.some((m) => m.rowIndex === d)
        );
        break;
      case "all":
      default:
        u = e.rows;
    }
    if (o != null && (u = u.filter((c) => {
      const d = Aa(t, i.id, c);
      return r.find(
        (f) => f.rowIndex === d && f.columnId === o
      ) != null;
    })), l.trim() !== "") {
      const c = Jn(l);
      u = u.filter(
        (d) => i.columns.some((m) => {
          var h;
          const f = d[m.id], { displayValue: g } = ka(
            i,
            m,
            f,
            s
          );
          return (h = Jn(g)) == null ? void 0 : h.includes(c);
        })
      );
    }
    return u;
  }, [
    e,
    n,
    r,
    o,
    i,
    t,
    l,
    s
  ]);
}
function Na(e) {
  return e.type === "calculated" ? !0 : !!e.isReadOnly;
}
function rh(e) {
  return Object.fromEntries(
    e.map((t) => [
      t.id,
      Object.fromEntries(
        t.columns.filter((n) => n.type === "enum").map((n) => [
          n.id,
          Object.fromEntries(
            n.typeArguments.values.map(({ label: r, value: o }) => [
              o,
              r
            ])
          )
        ])
      )
    ])
  );
}
function oh(e, t, n, r) {
  const o = Array.isArray(e) ? e : [], i = new Set(t.map((s) => s.value));
  return [...o.filter((s) => !i.has(s)).map((s) => ({
    label: n(String(s)),
    value: s,
    icon: r
  })), ...t];
}
function ka(e, t, n, r) {
  const o = Ia(
    e,
    t,
    n,
    r
  ), i = hr(o);
  return { displayValue: i ? " " : o, valueEmpty: i };
}
function Mn(e, { skipConditionCheck: t } = {}) {
  if (e.validators && e.validators.length > 0) {
    const n = e.validators.find(
      (r) => r.validate === "required"
    );
    return n != null && (t ? !0 : n.when == null);
  }
  return !1;
}
function ih(e, t) {
  const n = [];
  if (e.type === "enum") {
    const { values: r, multiple: o } = e.typeArguments, i = r.map((l) => l.value);
    o ? n.push({
      values: i,
      validate: "multi_includes"
    }) : n.push({
      values: i,
      validate: "includes"
    });
  }
  if (e.type === "reference") {
    const r = Pa(
      e,
      t
    );
    n.push({
      values: r,
      validate: "includes"
    });
  }
  return n;
}
async function lh(e, t, n) {
  const r = [], o = [], i = Ea(e.columns, (l, s) => {
    s[l.id] = [], [
      ...l.validators ?? [],
      ...ih(l, n)
    ].forEach((u) => {
      s[l.id].push(
        th(u)
      );
    });
  });
  return e.columns.forEach((l) => {
    t.rows.forEach((s, a) => {
      if (!Ra(s) || !(l.id in s) && !Mn(l, { skipConditionCheck: !0 }))
        return;
      const u = s[l.id];
      i[l.id].forEach((d) => {
        const m = Promise.resolve(d.isValid(u, s)).then(
          (f) => {
            f != null && r.push({
              sheetId: e.id,
              columnId: l.id,
              rowIndex: a,
              message: f
            });
          }
        );
        o.push(m);
      });
    });
  }), await Promise.all(o), r;
}
async function sh(e, t) {
  const n = e.map(async (o) => {
    const i = t.find(
      (l) => l.sheetId === o.id
    );
    return i ? await lh(
      o,
      i,
      t
    ) : [];
  });
  return (await Promise.all(n)).flat();
}
const ah = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, Da = Math.pow(2, 53), uh = -Da;
function La(e, t, n) {
  return t.map((r) => {
    const o = e.find(
      (l) => l.id === r.sheetId
    );
    if (o == null)
      return r;
    const i = r.rows.map((l, s) => {
      const a = { ...l };
      return n(o.columns, a, l, s), a;
    });
    return {
      ...r,
      rows: i
    };
  });
}
function ch(e, t) {
  return La(
    e,
    t,
    (n, r, o, i) => {
      n.filter((l) => l.type === "reference").forEach((l) => {
        const s = t.find(
          (a) => a.sheetId === l.typeArguments.sheetId
        );
        if (s != null) {
          const u = s.rows.map(
            (c) => c[l.typeArguments.sheetColumnId]
          )[i];
          r[l.id] = u;
        }
      });
    }
  );
}
function dh(e, t) {
  return La(
    e,
    t,
    (n, r, o) => {
      n.filter((i) => i.type === "calculated").forEach((i) => {
        r[i.id] = i.typeArguments.getValue(o);
      });
    }
  );
}
function fh(e) {
  if (ah.test(e)) {
    const t = parseFloat(e);
    if (t > uh && t < Da)
      return !0;
  }
  return !1;
}
function ph(e, t) {
  const n = t.typeArguments, r = n.values;
  if (n.multiple) {
    const i = n.delimiter ?? ",", l = (e == null ? void 0 : e.toString()) ?? "";
    return l.trim() === "" ? [] : l.split(i).map((a) => a.trim()).filter((a) => a !== "").map((a) => {
      const u = r.find((c) => c.label === a);
      return (u == null ? void 0 : u.value) ?? a;
    });
  }
  const o = r.find(
    (i) => i.label === e
  );
  return (o == null ? void 0 : o.value) ?? e;
}
function mh(e) {
  return fh(e) ? parseFloat(e) : e;
}
function gh(e, t) {
  return t.type === "enum" ? ph(e, t) : t.type === "number" ? mh(e) : e;
}
function hh(e, t, n) {
  return e.map((r) => {
    const o = [], i = t.filter(
      (l) => l.sheetId === r.id
    );
    return n.map((l) => {
      const s = {};
      r.columns.forEach((a) => {
        const u = i.find(
          (c) => c.sheetColumnId === a.id
        );
        u != null && (s[u.sheetColumnId] = gh(
          l[u.csvColumnName],
          a
        ));
      }), o.push(s);
    }), {
      sheetId: r.id,
      rows: o
    };
  });
}
function vh(e, t, n) {
  const r = n.data, o = hh(e, t, r), i = dh(
    e,
    o
  );
  return ch(e, i);
}
function _r(e) {
  return e.type !== "reference" && e.type !== "calculated";
}
function _h(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    t.has(n.csvColumnName) || t.set(n.csvColumnName, n);
  }), Array.from(t.values());
}
function wh(e, t) {
  const n = [];
  return t.forEach((r) => {
    const o = e.columns.find((i) => {
      if (!_r(i))
        return !1;
      const l = [
        i.id,
        ...i.suggestedMappingKeywords || []
      ].map((a) => Jn(a)), s = Jn(r);
      return l.includes(s);
    });
    o && n.push({
      csvColumnName: r,
      sheetId: e.id,
      sheetColumnId: o.id
    });
  }), n;
}
const yh = (e, t) => {
  const n = [];
  return e.forEach((r) => {
    const o = wh(r, t);
    n.push(...o);
  }), _h(n);
};
function bh(e, t, n) {
  return n == null ? e.filter((o) => o.csvColumnName !== t) : [...e.filter(
    (o) => (o.sheetId !== n.sheetId || o.sheetColumnId !== n.sheetColumnId) && o.csvColumnName !== t
  ), { ...n, csvColumnName: t }];
}
function xh(e, t) {
  const n = Sh(e, t), r = Ch(n);
  return Eh(r);
}
function Sh(e, t) {
  return e.map((n) => n[t]).filter((n) => n != null && n.trim() !== "").slice(0, wa);
}
function Ch(e) {
  return [
    ...e,
    ...Array(wa - e.length).fill("")
  ];
}
function Eh(e) {
  const t = [...e];
  let n = t.reduce(
    (r, o) => r + o.length,
    0
  );
  for (; n > eg && t.length > 1; )
    t.pop(), n = t.reduce(
      (r, o) => r + o.length,
      0
    );
  return t;
}
function Rh(e, t) {
  const { t: n } = ye();
  return e.flatMap(
    (o) => o.columns.filter((i) => _r(i)).map((i) => ({
      label: `${i.label}${Mn(i) ? " *" : ""}`,
      value: {
        sheetId: o.id,
        sheetColumnId: i.id
      },
      group: t.some(
        (l) => l.sheetId === o.id && l.sheetColumnId === i.id
      ) ? n("mapper.used") : n("mapper.unused")
    }))
  ).sort((o, i) => $h(o, i, n("mapper.unused")));
}
function $h(e, t, n) {
  return e.group === n && t.group !== n ? -1 : e.group !== n && t.group === n ? 1 : e.label.localeCompare(t.label);
}
function Th(e, t) {
  for (const n of e)
    for (const r of n.columns)
      if (Mn(r) && _r(r) && t.find(
        (i) => i.sheetId === n.id && i.sheetColumnId === r.id
      ) == null)
        return !1;
  return !0;
}
function Ih({
  examples: e,
  csvHeader: t
}) {
  const { t: n, tHtml: r } = ye();
  return t && /* @__PURE__ */ p("div", { className: "m-4 rounded-sm border border-gray-300 bg-white px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ p("div", { className: "mt-6 flow-root", children: /* @__PURE__ */ p("div", { className: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8", children: /* @__PURE__ */ p("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ p("table", { className: "min-w-full divide-y divide-gray-300", children: [
    /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p(
      "th",
      {
        scope: "col",
        className: "py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8",
        children: r("mapper.dataPreview", {
          csvHeader: /* @__PURE__ */ p(ei, { children: t })
        })
      }
    ) }) }),
    /* @__PURE__ */ p("tbody", { className: "divide-y divide-gray-300", children: e == null ? void 0 : e.map((o, i) => /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", { className: "h-12 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8", children: o || i === 0 && /* @__PURE__ */ p("span", { className: "text-gray-500 italic", children: n("mapper.noData") }) }) }, i)) })
  ] }) }) }) }) });
}
function Oh({
  csvHeader: e,
  setMapping: t,
  currentMapping: n,
  mappingSelectionOptions: r,
  onMouseEnter: o
}) {
  var l;
  const i = n == null ? null : ((l = r.find(
    (s) => s.value.sheetId === n.sheetId && s.value.sheetColumnId === n.sheetColumnId
  )) == null ? void 0 : l.value) ?? null;
  return /* @__PURE__ */ p(
    "div",
    {
      className: "hover:bg-hello-csv-muted rounded-sm",
      onMouseEnter: o,
      children: /* @__PURE__ */ p("div", { className: "flex items-center py-2.5", children: [
        /* @__PURE__ */ p("div", { className: "mx-2.5 flex flex-1 justify-between", children: [
          /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(ei, { children: e.slice(0, 30) }) }),
          /* @__PURE__ */ p("div", { className: "mx-5", children: /* @__PURE__ */ p(Qp, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ p("div", { className: "mx-2.5 flex-1", children: /* @__PURE__ */ p(
          $t,
          {
            "aria-label": `column mapping for ${e}`,
            searchable: !0,
            clearable: !0,
            compareFunction: (s, a) => s == null || a == null ? !1 : s.sheetColumnId === a.sheetColumnId && s.sheetId === a.sheetId,
            value: i,
            options: r,
            onChange: (s) => t(s)
          }
        ) })
      ] })
    }
  );
}
const Va = "HelloCSV", Ha = 1, rt = "state";
async function Mh(e, t) {
  return new Promise((n, r) => {
    const o = Ba(e, t), i = indexedDB.open(Va, Ha);
    i.onerror = () => r(i.error), i.onsuccess = () => {
      const u = i.result.transaction(rt, "readonly").objectStore(rt).get(o);
      u.onerror = () => n(null), u.onsuccess = () => {
        try {
          const c = u.result;
          c.sheetDefinitions = e, n(c);
        } catch {
          n(null);
        }
      };
    }, i.onupgradeneeded = (l) => {
      const s = l.target.result;
      s.objectStoreNames.contains(rt) && s.deleteObjectStore(rt), s.createObjectStore(rt);
    };
  });
}
async function za(e, t) {
  return new Promise((n, r) => {
    const o = Ba(e.sheetDefinitions, t), i = { ...e };
    delete i.sheetDefinitions;
    const l = indexedDB.open(Va, Ha);
    l.onerror = () => r(l.error), l.onsuccess = () => {
      const c = l.result.transaction(rt, "readwrite").objectStore(rt).put(i, o);
      c.onerror = () => r(c.error), c.onsuccess = () => n();
    }, l.onupgradeneeded = (s) => {
      const a = s.target.result;
      a.objectStoreNames.contains(rt) || a.createObjectStore(rt);
    };
  });
}
function Ba(e, t) {
  const n = t ? `importer-state-${t}` : "importer-state", r = JSON.stringify(e);
  return `${n}-${Fh(r)}`;
}
function Fh(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Ph(e) {
  const t = {
    required: [],
    optional: []
  };
  return e.forEach((n) => {
    n.columns.filter((r) => _r(r)).forEach((r) => {
      const o = {
        sheetId: n.id,
        columnId: r.id,
        columnLabel: r.label
      };
      Mn(r) ? t.required.push(o) : t.optional.push(o);
    });
  }), t;
}
const Ah = (e) => "." + (e.split(".").pop() ?? "").toLowerCase(), fn = (e) => {
  const t = ["B", "KB", "MB", "GB"];
  let n = e, r = 0;
  for (; n >= 1024 && r < t.length - 1; )
    n /= 1024, r++;
  return `${Math.round(n)} ${t[r]}`;
}, Nh = async (e) => new Promise((t) => {
  const n = new FileReader();
  n.onload = (r) => {
    t(r);
  }, n.readAsArrayBuffer(e);
}), kh = async (e, t) => {
  const n = t == null ? void 0 : t.find(
    (r) => r.mimeType === e.type
  );
  if (n) {
    const r = await Nh(e), { fileName: o, csvData: i } = await n.convert(
      r,
      e
    ), l = new Blob([i], { type: "text/csv" });
    return new File([l], o, {
      type: "text/csv"
    });
  }
  return e;
};
function Dh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Un = { exports: {} };
/* @license
Papa Parse
v5.5.2
https://github.com/mholt/PapaParse
License: MIT
*/
var Lh = Un.exports, ul;
function Vh() {
  return ul || (ul = 1, function(e, t) {
    ((n, r) => {
      e.exports = r();
    })(Lh, function n() {
      var r = typeof self < "u" ? self : typeof window < "u" ? window : r !== void 0 ? r : {}, o, i = !r.document && !!r.postMessage, l = r.IS_PAPA_WORKER || !1, s = {}, a = 0, u = {};
      function c(_) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(b) {
          var S = $(b);
          S.chunkSize = parseInt(S.chunkSize), b.step || b.chunk || (S.chunkSize = null), this._handle = new h(S), (this._handle.streamer = this)._config = S;
        }).call(this, _), this.parseChunk = function(b, S) {
          var E = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < E) {
            let F = this._config.newline;
            F || (T = this._config.quoteChar || '"', F = this._handle.guessLineEndings(b, T)), b = [...b.split(F).slice(E)].join(F);
          }
          this.isFirstChunk && R(this._config.beforeFirstChunk) && (T = this._config.beforeFirstChunk(b)) !== void 0 && (b = T), this.isFirstChunk = !1, this._halted = !1;
          var E = this._partialLine + b, T = (this._partialLine = "", this._handle.parse(E, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            if (b = T.meta.cursor, E = (this._finished || (this._partialLine = E.substring(b - this._baseIndex), this._baseIndex = b), T && T.data && (this._rowCount += T.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), l) r.postMessage({ results: T, workerId: u.WORKER_ID, finished: E });
            else if (R(this._config.chunk) && !S) {
              if (this._config.chunk(T, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
              this._completeResults = T = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(T.data), this._completeResults.errors = this._completeResults.errors.concat(T.errors), this._completeResults.meta = T.meta), this._completed || !E || !R(this._config.complete) || T && T.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), E || T && T.meta.paused || this._nextChunk(), T;
          }
          this._halted = !0;
        }, this._sendError = function(b) {
          R(this._config.error) ? this._config.error(b) : l && this._config.error && r.postMessage({ workerId: u.WORKER_ID, error: b, finished: !1 });
        };
      }
      function d(_) {
        var b;
        (_ = _ || {}).chunkSize || (_.chunkSize = u.RemoteChunkSize), c.call(this, _), this._nextChunk = i ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(S) {
          this._input = S, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (b = new XMLHttpRequest(), this._config.withCredentials && (b.withCredentials = this._config.withCredentials), i || (b.onload = O(this._chunkLoaded, this), b.onerror = O(this._chunkError, this)), b.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !i), this._config.downloadRequestHeaders) {
              var S, E = this._config.downloadRequestHeaders;
              for (S in E) b.setRequestHeader(S, E[S]);
            }
            var T;
            this._config.chunkSize && (T = this._start + this._config.chunkSize - 1, b.setRequestHeader("Range", "bytes=" + this._start + "-" + T));
            try {
              b.send(this._config.downloadRequestBody);
            } catch (F) {
              this._chunkError(F.message);
            }
            i && b.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          b.readyState === 4 && (b.status < 200 || 400 <= b.status ? this._chunkError() : (this._start += this._config.chunkSize || b.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((S) => (S = S.getResponseHeader("Content-Range")) !== null ? parseInt(S.substring(S.lastIndexOf("/") + 1)) : -1)(b), this.parseChunk(b.responseText)));
        }, this._chunkError = function(S) {
          S = b.statusText || S, this._sendError(new Error(S));
        };
      }
      function m(_) {
        (_ = _ || {}).chunkSize || (_.chunkSize = u.LocalChunkSize), c.call(this, _);
        var b, S, E = typeof FileReader < "u";
        this.stream = function(T) {
          this._input = T, S = T.slice || T.webkitSlice || T.mozSlice, E ? ((b = new FileReader()).onload = O(this._chunkLoaded, this), b.onerror = O(this._chunkError, this)) : b = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var T = this._input, F = (this._config.chunkSize && (F = Math.min(this._start + this._config.chunkSize, this._input.size), T = S.call(T, this._start, F)), b.readAsText(T, this._config.encoding));
          E || this._chunkLoaded({ target: { result: F } });
        }, this._chunkLoaded = function(T) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(T.target.result);
        }, this._chunkError = function() {
          this._sendError(b.error);
        };
      }
      function f(_) {
        var b;
        c.call(this, _ = _ || {}), this.stream = function(S) {
          return b = S, this._nextChunk();
        }, this._nextChunk = function() {
          var S, E;
          if (!this._finished) return S = this._config.chunkSize, b = S ? (E = b.substring(0, S), b.substring(S)) : (E = b, ""), this._finished = !b, this.parseChunk(E);
        };
      }
      function g(_) {
        c.call(this, _ = _ || {});
        var b = [], S = !0, E = !1;
        this.pause = function() {
          c.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          c.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(T) {
          this._input = T, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          E && b.length === 1 && (this._finished = !0);
        }, this._nextChunk = function() {
          this._checkIsFinished(), b.length ? this.parseChunk(b.shift()) : S = !0;
        }, this._streamData = O(function(T) {
          try {
            b.push(typeof T == "string" ? T : T.toString(this._config.encoding)), S && (S = !1, this._checkIsFinished(), this.parseChunk(b.shift()));
          } catch (F) {
            this._streamError(F);
          }
        }, this), this._streamError = O(function(T) {
          this._streamCleanUp(), this._sendError(T);
        }, this), this._streamEnd = O(function() {
          this._streamCleanUp(), E = !0, this._streamData("");
        }, this), this._streamCleanUp = O(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function h(_) {
        var b, S, E, T, F = Math.pow(2, 53), A = -F, j = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, G = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, z = this, V = 0, M = 0, K = !1, N = !1, B = [], I = { data: [], errors: [], meta: {} };
        function se(q) {
          return _.skipEmptyLines === "greedy" ? q.join("").trim() === "" : q.length === 1 && q[0].length === 0;
        }
        function te() {
          if (I && E && (le("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + u.DefaultDelimiter + "'"), E = !1), _.skipEmptyLines && (I.data = I.data.filter(function(J) {
            return !se(J);
          })), ue()) {
            let J = function(he, we) {
              R(_.transformHeader) && (he = _.transformHeader(he, we)), B.push(he);
            };
            if (I) if (Array.isArray(I.data[0])) {
              for (var q = 0; ue() && q < I.data.length; q++) I.data[q].forEach(J);
              I.data.splice(0, 1);
            } else I.data.forEach(J);
          }
          function ee(J, he) {
            for (var we = _.header ? {} : [], L = 0; L < J.length; L++) {
              var Y = L, Q = J[L], Q = ((Re, ne) => ((ve) => (_.dynamicTypingFunction && _.dynamicTyping[ve] === void 0 && (_.dynamicTyping[ve] = _.dynamicTypingFunction(ve)), (_.dynamicTyping[ve] || _.dynamicTyping) === !0))(Re) ? ne === "true" || ne === "TRUE" || ne !== "false" && ne !== "FALSE" && (((ve) => {
                if (j.test(ve) && (ve = parseFloat(ve), A < ve && ve < F))
                  return 1;
              })(ne) ? parseFloat(ne) : G.test(ne) ? new Date(ne) : ne === "" ? null : ne) : ne)(Y = _.header ? L >= B.length ? "__parsed_extra" : B[L] : Y, Q = _.transform ? _.transform(Q, Y) : Q);
              Y === "__parsed_extra" ? (we[Y] = we[Y] || [], we[Y].push(Q)) : we[Y] = Q;
            }
            return _.header && (L > B.length ? le("FieldMismatch", "TooManyFields", "Too many fields: expected " + B.length + " fields but parsed " + L, M + he) : L < B.length && le("FieldMismatch", "TooFewFields", "Too few fields: expected " + B.length + " fields but parsed " + L, M + he)), we;
          }
          var ge;
          I && (_.header || _.dynamicTyping || _.transform) && (ge = 1, !I.data.length || Array.isArray(I.data[0]) ? (I.data = I.data.map(ee), ge = I.data.length) : I.data = ee(I.data, 0), _.header && I.meta && (I.meta.fields = B), M += ge);
        }
        function ue() {
          return _.header && B.length === 0;
        }
        function le(q, ee, ge, J) {
          q = { type: q, code: ee, message: ge }, J !== void 0 && (q.row = J), I.errors.push(q);
        }
        R(_.step) && (T = _.step, _.step = function(q) {
          I = q, ue() ? te() : (te(), I.data.length !== 0 && (V += q.data.length, _.preview && V > _.preview ? S.abort() : (I.data = I.data[0], T(I, z))));
        }), this.parse = function(q, ee, ge) {
          var J = _.quoteChar || '"', J = (_.newline || (_.newline = this.guessLineEndings(q, J)), E = !1, _.delimiter ? R(_.delimiter) && (_.delimiter = _.delimiter(q), I.meta.delimiter = _.delimiter) : ((J = ((he, we, L, Y, Q) => {
            var Re, ne, ve, ct;
            Q = Q || [",", "	", "|", ";", u.RECORD_SEP, u.UNIT_SEP];
            for (var kt = 0; kt < Q.length; kt++) {
              for (var We, en = Q[kt], $e = 0, Ge = 0, Ce = 0, Ne = (ve = void 0, new x({ comments: Y, delimiter: en, newline: we, preview: 10 }).parse(he)), et = 0; et < Ne.data.length; et++) L && se(Ne.data[et]) ? Ce++ : (We = Ne.data[et].length, Ge += We, ve === void 0 ? ve = We : 0 < We && ($e += Math.abs(We - ve), ve = We));
              0 < Ne.data.length && (Ge /= Ne.data.length - Ce), (ne === void 0 || $e <= ne) && (ct === void 0 || ct < Ge) && 1.99 < Ge && (ne = $e, Re = en, ct = Ge);
            }
            return { successful: !!(_.delimiter = Re), bestDelimiter: Re };
          })(q, _.newline, _.skipEmptyLines, _.comments, _.delimitersToGuess)).successful ? _.delimiter = J.bestDelimiter : (E = !0, _.delimiter = u.DefaultDelimiter), I.meta.delimiter = _.delimiter), $(_));
          return _.preview && _.header && J.preview++, b = q, S = new x(J), I = S.parse(b, ee, ge), te(), K ? { meta: { paused: !0 } } : I || { meta: { paused: !1 } };
        }, this.paused = function() {
          return K;
        }, this.pause = function() {
          K = !0, S.abort(), b = R(_.chunk) ? "" : b.substring(S.getCharIndex());
        }, this.resume = function() {
          z.streamer._halted ? (K = !1, z.streamer.parseChunk(b, !0)) : setTimeout(z.resume, 3);
        }, this.aborted = function() {
          return N;
        }, this.abort = function() {
          N = !0, S.abort(), I.meta.aborted = !0, R(_.complete) && _.complete(I), b = "";
        }, this.guessLineEndings = function(he, J) {
          he = he.substring(0, 1048576);
          var J = new RegExp(v(J) + "([^]*?)" + v(J), "gm"), ge = (he = he.replace(J, "")).split("\r"), J = he.split(`
`), he = 1 < J.length && J[0].length < ge[0].length;
          if (ge.length === 1 || he) return `
`;
          for (var we = 0, L = 0; L < ge.length; L++) ge[L][0] === `
` && we++;
          return we >= ge.length / 2 ? `\r
` : "\r";
        };
      }
      function v(_) {
        return _.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function x(_) {
        var b = (_ = _ || {}).delimiter, S = _.newline, E = _.comments, T = _.step, F = _.preview, A = _.fastMode, j = null, G = !1, z = _.quoteChar == null ? '"' : _.quoteChar, V = z;
        if (_.escapeChar !== void 0 && (V = _.escapeChar), (typeof b != "string" || -1 < u.BAD_DELIMITERS.indexOf(b)) && (b = ","), E === b) throw new Error("Comment character same as delimiter");
        E === !0 ? E = "#" : (typeof E != "string" || -1 < u.BAD_DELIMITERS.indexOf(E)) && (E = !1), S !== `
` && S !== "\r" && S !== `\r
` && (S = `
`);
        var M = 0, K = !1;
        this.parse = function(N, B, I) {
          if (typeof N != "string") throw new Error("Input must be a string");
          var se = N.length, te = b.length, ue = S.length, le = E.length, q = R(T), ee = [], ge = [], J = [], he = M = 0;
          if (!N) return $e();
          if (A || A !== !1 && N.indexOf(z) === -1) {
            for (var we = N.split(S), L = 0; L < we.length; L++) {
              if (J = we[L], M += J.length, L !== we.length - 1) M += S.length;
              else if (I) return $e();
              if (!E || J.substring(0, le) !== E) {
                if (q) {
                  if (ee = [], ct(J.split(b)), Ge(), K) return $e();
                } else ct(J.split(b));
                if (F && F <= L) return ee = ee.slice(0, F), $e(!0);
              }
            }
            return $e();
          }
          for (var Y = N.indexOf(b, M), Q = N.indexOf(S, M), Re = new RegExp(v(V) + v(z), "g"), ne = N.indexOf(z, M); ; ) if (N[M] === z) for (ne = M, M++; ; ) {
            if ((ne = N.indexOf(z, ne + 1)) === -1) return I || ge.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: ee.length, index: M }), We();
            if (ne === se - 1) return We(N.substring(M, ne).replace(Re, z));
            if (z === V && N[ne + 1] === V) ne++;
            else if (z === V || ne === 0 || N[ne - 1] !== V) {
              Y !== -1 && Y < ne + 1 && (Y = N.indexOf(b, ne + 1));
              var ve = kt((Q = Q !== -1 && Q < ne + 1 ? N.indexOf(S, ne + 1) : Q) === -1 ? Y : Math.min(Y, Q));
              if (N.substr(ne + 1 + ve, te) === b) {
                J.push(N.substring(M, ne).replace(Re, z)), N[M = ne + 1 + ve + te] !== z && (ne = N.indexOf(z, M)), Y = N.indexOf(b, M), Q = N.indexOf(S, M);
                break;
              }
              if (ve = kt(Q), N.substring(ne + 1 + ve, ne + 1 + ve + ue) === S) {
                if (J.push(N.substring(M, ne).replace(Re, z)), en(ne + 1 + ve + ue), Y = N.indexOf(b, M), ne = N.indexOf(z, M), q && (Ge(), K)) return $e();
                if (F && ee.length >= F) return $e(!0);
                break;
              }
              ge.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: ee.length, index: M }), ne++;
            }
          }
          else if (E && J.length === 0 && N.substring(M, M + le) === E) {
            if (Q === -1) return $e();
            M = Q + ue, Q = N.indexOf(S, M), Y = N.indexOf(b, M);
          } else if (Y !== -1 && (Y < Q || Q === -1)) J.push(N.substring(M, Y)), M = Y + te, Y = N.indexOf(b, M);
          else {
            if (Q === -1) break;
            if (J.push(N.substring(M, Q)), en(Q + ue), q && (Ge(), K)) return $e();
            if (F && ee.length >= F) return $e(!0);
          }
          return We();
          function ct(Ce) {
            ee.push(Ce), he = M;
          }
          function kt(Ce) {
            var Ne = 0;
            return Ne = Ce !== -1 && (Ce = N.substring(ne + 1, Ce)) && Ce.trim() === "" ? Ce.length : Ne;
          }
          function We(Ce) {
            return I || (Ce === void 0 && (Ce = N.substring(M)), J.push(Ce), M = se, ct(J), q && Ge()), $e();
          }
          function en(Ce) {
            M = Ce, ct(J), J = [], Q = N.indexOf(S, M);
          }
          function $e(Ce) {
            if (_.header && !B && ee.length && !G) {
              var Ne = ee[0], et = {}, yr = new Set(Ne);
              let ii = !1;
              for (let Dt = 0; Dt < Ne.length; Dt++) {
                let qe = Ne[Dt];
                if (et[qe = R(_.transformHeader) ? _.transformHeader(qe, Dt) : qe]) {
                  let tn, li = et[qe];
                  for (; tn = qe + "_" + li, li++, yr.has(tn); ) ;
                  yr.add(tn), Ne[Dt] = tn, et[qe]++, ii = !0, (j = j === null ? {} : j)[tn] = qe;
                } else et[qe] = 1, Ne[Dt] = qe;
                yr.add(qe);
              }
              ii && console.warn("Duplicate headers found and renamed."), G = !0;
            }
            return { data: ee, errors: ge, meta: { delimiter: b, linebreak: S, aborted: K, truncated: !!Ce, cursor: he + (B || 0), renamedHeaders: j } };
          }
          function Ge() {
            T($e()), ee = [], ge = [];
          }
        }, this.abort = function() {
          K = !0;
        }, this.getCharIndex = function() {
          return M;
        };
      }
      function w(_) {
        var b = _.data, S = s[b.workerId], E = !1;
        if (b.error) S.userError(b.error, b.file);
        else if (b.results && b.results.data) {
          var T = { abort: function() {
            E = !0, y(b.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: C, resume: C };
          if (R(S.userStep)) {
            for (var F = 0; F < b.results.data.length && (S.userStep({ data: b.results.data[F], errors: b.results.errors, meta: b.results.meta }, T), !E); F++) ;
            delete b.results;
          } else R(S.userChunk) && (S.userChunk(b.results, T, b.file), delete b.results);
        }
        b.finished && !E && y(b.workerId, b.results);
      }
      function y(_, b) {
        var S = s[_];
        R(S.userComplete) && S.userComplete(b), S.terminate(), delete s[_];
      }
      function C() {
        throw new Error("Not implemented.");
      }
      function $(_) {
        if (typeof _ != "object" || _ === null) return _;
        var b, S = Array.isArray(_) ? [] : {};
        for (b in _) S[b] = $(_[b]);
        return S;
      }
      function O(_, b) {
        return function() {
          _.apply(b, arguments);
        };
      }
      function R(_) {
        return typeof _ == "function";
      }
      return u.parse = function(_, b) {
        var S = (b = b || {}).dynamicTyping || !1;
        if (R(S) && (b.dynamicTypingFunction = S, S = {}), b.dynamicTyping = S, b.transform = !!R(b.transform) && b.transform, !b.worker || !u.WORKERS_SUPPORTED) return S = null, u.NODE_STREAM_INPUT, typeof _ == "string" ? (_ = ((E) => E.charCodeAt(0) !== 65279 ? E : E.slice(1))(_), S = new (b.download ? d : f)(b)) : _.readable === !0 && R(_.read) && R(_.on) ? S = new g(b) : (r.File && _ instanceof File || _ instanceof Object) && (S = new m(b)), S.stream(_);
        (S = (() => {
          var E;
          return !!u.WORKERS_SUPPORTED && (E = (() => {
            var T = r.URL || r.webkitURL || null, F = n.toString();
            return u.BLOB_URL || (u.BLOB_URL = T.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", F, ")();"], { type: "text/javascript" })));
          })(), (E = new r.Worker(E)).onmessage = w, E.id = a++, s[E.id] = E);
        })()).userStep = b.step, S.userChunk = b.chunk, S.userComplete = b.complete, S.userError = b.error, b.step = R(b.step), b.chunk = R(b.chunk), b.complete = R(b.complete), b.error = R(b.error), delete b.worker, S.postMessage({ input: _, config: b, workerId: S.id });
      }, u.unparse = function(_, b) {
        var S = !1, E = !0, T = ",", F = `\r
`, A = '"', j = A + A, G = !1, z = null, V = !1, M = ((() => {
          if (typeof b == "object") {
            if (typeof b.delimiter != "string" || u.BAD_DELIMITERS.filter(function(B) {
              return b.delimiter.indexOf(B) !== -1;
            }).length || (T = b.delimiter), typeof b.quotes != "boolean" && typeof b.quotes != "function" && !Array.isArray(b.quotes) || (S = b.quotes), typeof b.skipEmptyLines != "boolean" && typeof b.skipEmptyLines != "string" || (G = b.skipEmptyLines), typeof b.newline == "string" && (F = b.newline), typeof b.quoteChar == "string" && (A = b.quoteChar), typeof b.header == "boolean" && (E = b.header), Array.isArray(b.columns)) {
              if (b.columns.length === 0) throw new Error("Option columns is empty");
              z = b.columns;
            }
            b.escapeChar !== void 0 && (j = b.escapeChar + A), b.escapeFormulae instanceof RegExp ? V = b.escapeFormulae : typeof b.escapeFormulae == "boolean" && b.escapeFormulae && (V = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(v(A), "g"));
        if (typeof _ == "string" && (_ = JSON.parse(_)), Array.isArray(_)) {
          if (!_.length || Array.isArray(_[0])) return K(null, _, G);
          if (typeof _[0] == "object") return K(z || Object.keys(_[0]), _, G);
        } else if (typeof _ == "object") return typeof _.data == "string" && (_.data = JSON.parse(_.data)), Array.isArray(_.data) && (_.fields || (_.fields = _.meta && _.meta.fields || z), _.fields || (_.fields = Array.isArray(_.data[0]) ? _.fields : typeof _.data[0] == "object" ? Object.keys(_.data[0]) : []), Array.isArray(_.data[0]) || typeof _.data[0] == "object" || (_.data = [_.data])), K(_.fields || [], _.data || [], G);
        throw new Error("Unable to serialize unrecognized input");
        function K(B, I, se) {
          var te = "", ue = (typeof B == "string" && (B = JSON.parse(B)), typeof I == "string" && (I = JSON.parse(I)), Array.isArray(B) && 0 < B.length), le = !Array.isArray(I[0]);
          if (ue && E) {
            for (var q = 0; q < B.length; q++) 0 < q && (te += T), te += N(B[q], q);
            0 < I.length && (te += F);
          }
          for (var ee = 0; ee < I.length; ee++) {
            var ge = (ue ? B : I[ee]).length, J = !1, he = ue ? Object.keys(I[ee]).length === 0 : I[ee].length === 0;
            if (se && !ue && (J = se === "greedy" ? I[ee].join("").trim() === "" : I[ee].length === 1 && I[ee][0].length === 0), se === "greedy" && ue) {
              for (var we = [], L = 0; L < ge; L++) {
                var Y = le ? B[L] : L;
                we.push(I[ee][Y]);
              }
              J = we.join("").trim() === "";
            }
            if (!J) {
              for (var Q = 0; Q < ge; Q++) {
                0 < Q && !he && (te += T);
                var Re = ue && le ? B[Q] : Q;
                te += N(I[ee][Re], Q);
              }
              ee < I.length - 1 && (!se || 0 < ge && !he) && (te += F);
            }
          }
          return te;
        }
        function N(B, I) {
          var se, te;
          return B == null ? "" : B.constructor === Date ? JSON.stringify(B).slice(1, 25) : (te = !1, V && typeof B == "string" && V.test(B) && (B = "'" + B, te = !0), se = B.toString().replace(M, j), (te = te || S === !0 || typeof S == "function" && S(B, I) || Array.isArray(S) && S[I] || ((ue, le) => {
            for (var q = 0; q < le.length; q++) if (-1 < ue.indexOf(le[q])) return !0;
            return !1;
          })(se, u.BAD_DELIMITERS) || -1 < se.indexOf(T) || se.charAt(0) === " " || se.charAt(se.length - 1) === " ") ? A + se + A : se);
        }
      }, u.RECORD_SEP = "", u.UNIT_SEP = "", u.BYTE_ORDER_MARK = "\uFEFF", u.BAD_DELIMITERS = ["\r", `
`, '"', u.BYTE_ORDER_MARK], u.WORKERS_SUPPORTED = !i && !!r.Worker, u.NODE_STREAM_INPUT = 1, u.LocalChunkSize = 10485760, u.RemoteChunkSize = 5242880, u.DefaultDelimiter = ",", u.Parser = x, u.ParserHandle = h, u.NetworkStreamer = d, u.FileStreamer = m, u.StringStreamer = f, u.ReadableStreamStreamer = g, r.jQuery && ((o = r.jQuery).fn.parse = function(_) {
        var b = _.config || {}, S = [];
        return this.each(function(F) {
          if (!(o(this).prop("tagName").toUpperCase() === "INPUT" && o(this).attr("type").toLowerCase() === "file" && r.FileReader) || !this.files || this.files.length === 0) return !0;
          for (var A = 0; A < this.files.length; A++) S.push({ file: this.files[A], inputElem: this, instanceConfig: o.extend({}, b) });
        }), E(), this;
        function E() {
          if (S.length === 0) R(_.complete) && _.complete();
          else {
            var F, A, j, G, z = S[0];
            if (R(_.before)) {
              var V = _.before(z.file, z.inputElem);
              if (typeof V == "object") {
                if (V.action === "abort") return F = "AbortError", A = z.file, j = z.inputElem, G = V.reason, void (R(_.error) && _.error({ name: F }, A, j, G));
                if (V.action === "skip") return void T();
                typeof V.config == "object" && (z.instanceConfig = o.extend(z.instanceConfig, V.config));
              } else if (V === "skip") return void T();
            }
            var M = z.instanceConfig.complete;
            z.instanceConfig.complete = function(K) {
              R(M) && M(K, z.file, z.inputElem), T();
            }, u.parse(z.file, z.instanceConfig);
          }
        }
        function T() {
          S.splice(0, 1), E();
        }
      }), l && (r.onmessage = function(_) {
        _ = _.data, u.WORKER_ID === void 0 && _ && (u.WORKER_ID = _.workerId), typeof _.input == "string" ? r.postMessage({ workerId: u.WORKER_ID, results: u.parse(_.input, _.config), finished: !0 }) : (r.File && _.input instanceof File || _.input instanceof Object) && (_ = u.parse(_.input, _.config)) && r.postMessage({ workerId: u.WORKER_ID, results: _, finished: !0 });
      }), (d.prototype = Object.create(c.prototype)).constructor = d, (m.prototype = Object.create(c.prototype)).constructor = m, (f.prototype = Object.create(f.prototype)).constructor = f, (g.prototype = Object.create(c.prototype)).constructor = g, u;
    });
  }(Un)), Un.exports;
}
var Hh = Vh();
const zh = /* @__PURE__ */ Dh(Hh);
async function Bh({ file: e }) {
  return new Promise((t, n) => {
    zh.parse(e, {
      skipEmptyLines: !0,
      header: !0,
      complete: (r) => {
        t(r);
      },
      error: (r) => {
        n(r);
      }
    });
  });
}
let Fr = 0;
function jh() {
  return Fr = (Fr + 1) % Number.MAX_SAFE_INTEGER, `${Date.now()}-${Fr}`;
}
async function Uh(e, t) {
  const n = Fn(e);
  try {
    return t.enabled ? await Wh(e, t) : n;
  } catch {
    return n;
  }
}
function Fn(e) {
  return {
    sheetDefinitions: e,
    currentSheetId: e[0].id,
    mode: "upload",
    validationErrors: [],
    validationInProgress: !1,
    sheetData: e.map((t) => ({
      sheetId: t.id,
      rows: []
    })),
    importProgress: 0
  };
}
async function Wh(e, t) {
  const n = await Mh(
    e,
    t.customKey
  );
  if (n != null)
    return n;
  const r = Fn(e);
  return za(r, t.customKey), r;
}
class ja {
  constructor(t, n) {
    Se(this, "initialState");
    Se(this, "importerDefinition");
    Se(this, "buildSteps");
    this.importerDefinition = t, this.initialState = n ?? Fn(t.sheets), this.buildSteps = [];
  }
  async getState() {
    let t = this.initialState;
    this.buildSteps.forEach((r) => {
      t = Ua(t, r);
    });
    const n = await sh(
      this.importerDefinition.sheets,
      t.sheetData
    ).catch(() => t.validationErrors);
    return { ...t, validationErrors: n };
  }
  async uploadFile(t) {
    const n = await kh(
      t,
      this.importerDefinition.customFileLoaders
    ), r = await Bh({ file: n }), o = r.meta.fields, i = this.importerDefinition.customSuggestedMapper != null ? await this.importerDefinition.customSuggestedMapper(
      this.importerDefinition.sheets,
      o
    ) : yh(
      this.importerDefinition.sheets,
      o
    );
    this.buildSteps.push({
      type: "FILE_PARSED",
      payload: { parsed: r, rowFile: t }
    }), this.buildSteps.push({
      type: "COLUMN_MAPPING_CHANGED",
      payload: {
        mappings: i
      }
    });
  }
  setEnterDataManually(t) {
    this.buildSteps.push({
      type: "ENTER_DATA_MANUALLY",
      payload: {
        amountOfEmptyRowsToAdd: t ?? Zm
      }
    });
  }
  setMappings(t) {
    this.buildSteps.push({
      type: "COLUMN_MAPPING_CHANGED",
      payload: { mappings: t }
    });
  }
  async confirmMappings() {
    const t = await this.getState(), n = vh(
      this.importerDefinition.sheets,
      t.columnMappings ?? [],
      t.parsedFile
    ), r = this.importerDefinition.onDataColumnsMapped != null ? await this.importerDefinition.onDataColumnsMapped(n) : n;
    this.buildSteps.push({
      type: "DATA_MAPPED",
      payload: { mappedData: r }
    });
  }
  changeCell(t) {
    this.buildSteps.push({ type: "CELL_CHANGED", payload: t });
  }
  removeRows(t) {
    this.buildSteps.push({ type: "REMOVE_ROWS", payload: t });
  }
}
class b0 extends ja {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(t) {
    super(t);
  }
}
const Qn = class Qn extends ja {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(t, n) {
    super(t, n);
  }
  async dispatchChange(t) {
    const n = this.buildSteps.some(
      (o) => Qn.actionTypesThatRequireValidation.has(o.type)
    ), r = jh();
    if (n && t({ type: "VALIDATION_STARTED", payload: { runId: r } }), this.buildSteps.forEach((o) => {
      t(o);
    }), n) {
      const o = await this.getState();
      t({
        type: "VALIDATION_COMPLETED",
        payload: { errors: o.validationErrors, runId: r }
      });
    }
  }
};
Se(Qn, "actionTypesThatRequireValidation", /* @__PURE__ */ new Set([
  "DATA_MAPPED",
  "CELL_CHANGED",
  "REMOVE_ROWS"
]));
let ho = Qn;
function Gh(e, t, n) {
  const r = n.sheetDefinitions.find(
    (o) => o.id === t.sheetId
  );
  return r != null && r.columns.filter(
    (i) => i.type === "calculated"
  ).forEach((i) => {
    e[i.id] = i.typeArguments.getValue(e);
  }), e;
}
const Ua = (e, t) => {
  switch (t.type) {
    case "ENTER_DATA_MANUALLY": {
      const n = e.sheetDefinitions.map((r) => ({
        sheetId: r.id,
        rows: Array.from(
          { length: t.payload.amountOfEmptyRowsToAdd },
          () => ({})
        )
      }));
      return { ...e, mode: "preview", sheetData: n };
    }
    case "FILE_PARSED":
      return {
        ...e,
        parsedFile: t.payload.parsed,
        rowFile: t.payload.rowFile,
        mode: "mapping"
      };
    case "UPLOAD":
      return { ...e, mode: "upload" };
    case "COLUMN_MAPPING_CHANGED":
      return {
        ...e,
        columnMappings: t.payload.mappings
      };
    case "DATA_MAPPED":
      return {
        ...e,
        sheetData: po(
          e.sheetDefinitions,
          t.payload.mappedData
        ),
        mode: "preview"
      };
    case "CELL_CHANGED": {
      const r = e.sheetData.map((o) => {
        if (o.sheetId === t.payload.sheetId) {
          const i = [...o.rows];
          return i[t.payload.rowIndex] = Gh(
            t.payload.value,
            t.payload,
            e
          ), { ...o, rows: i };
        } else
          return o;
      });
      return {
        ...e,
        sheetData: po(e.sheetDefinitions, r)
      };
    }
    case "REMOVE_ROWS": {
      const n = e.sheetData.map((r) => r.sheetId === t.payload.sheetId ? {
        ...r,
        rows: r.rows.filter(
          (o) => !t.payload.rows.includes(o)
        )
      } : r);
      return {
        ...e,
        sheetData: n
      };
    }
    case "ADD_EMPTY_ROW": {
      const n = e.sheetData.map((r) => r.sheetId !== e.currentSheetId ? r : {
        ...r,
        rows: [...r.rows, {}]
      });
      return { ...e, sheetData: n };
    }
    case "SHEET_CHANGED":
      return { ...e, currentSheetId: t.payload.sheetId };
    case "SUBMIT":
      return { ...e, mode: "submit" };
    case "PROGRESS":
      return { ...e, importProgress: t.payload.progress };
    case "COMPLETED":
      return {
        ...e,
        mode: "completed",
        importStatistics: t.payload.importStatistics
      };
    case "FAILED":
      return { ...e, mode: "failed" };
    case "PREVIEW":
      return { ...e, mode: "preview" };
    case "MAPPING":
      return { ...e, mode: "mapping" };
    case "RESET":
      return Fn(e.sheetDefinitions);
    case "SET_STATE":
      return t.payload.state;
    case "VALIDATION_STARTED":
      return {
        ...e,
        validationInProgress: !0,
        validationRunId: t.payload.runId
      };
    case "VALIDATION_COMPLETED":
      return e.validationRunId !== t.payload.runId ? e : {
        ...e,
        validationErrors: t.payload.errors,
        validationInProgress: !1,
        validationRunId: void 0
      };
    default:
      return e;
  }
}, qh = (e, t, n) => {
  const [r, o] = at(
    Ua,
    n ?? Fn(e)
  );
  return re(() => {
    const i = async () => {
      const l = await Uh(e, t);
      o({ type: "SET_STATE", payload: { state: l } });
    };
    n == null && i();
  }, []), re(() => {
    t.enabled && za(r, t.customKey);
  }, [r, t]), [r, o];
}, Wa = me({}), Ga = me(
  {}
);
function Kh({
  sheets: e,
  persistenceConfig: t,
  initialState: n,
  onStateChanged: r,
  children: o
}) {
  const [i, l] = qh(
    e,
    t,
    n
  ), s = k(i);
  return re(() => {
    s.current !== i && (r == null || r(s.current, i), s.current = i);
  }, [i, r]), /* @__PURE__ */ p(Wa.Provider, { value: i, children: /* @__PURE__ */ p(Ga.Provider, { value: l, children: o }) });
}
function ut() {
  return ae(Wa);
}
function Yh() {
  return ae(Ga);
}
function Xh({
  onMappingsChanged: e,
  onMappingsSet: t,
  onBack: n
}) {
  const { columnMappings: r, parsedFile: o } = ut(), { sheets: i } = ze(), { t: l } = ye(), [s, a] = H(null), u = r ?? [], c = o, d = c.data, m = c.meta.fields, f = Rh(
    i,
    u
  ), g = Th(
    i,
    u
  ), h = W(() => s ? xh(d, s) : [], [s, d]), [v, x] = H(!1);
  async function w() {
    try {
      x(!0), await t();
    } finally {
      x(!1);
    }
  }
  return /* @__PURE__ */ p("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ p("div", { className: "flex-none text-2xl", children: l("mapper.reviewAndConfirm") }),
    /* @__PURE__ */ p("div", { className: "min-h-0 flex-auto", children: /* @__PURE__ */ p("div", { className: "flex h-full justify-between space-x-5", children: [
      /* @__PURE__ */ p("div", { className: "flex flex-2 flex-col", children: [
        /* @__PURE__ */ p("div", { className: "my-5 flex text-sm font-light uppercase", children: [
          /* @__PURE__ */ p("div", { className: "flex-1", children: l("mapper.importedColumn") }),
          /* @__PURE__ */ p("div", { className: "flex-1", children: l("mapper.destinationColumn") })
        ] }),
        /* @__PURE__ */ p("div", { className: "flex-1 overflow-y-auto", children: m.map((y, C) => {
          const $ = u.find(
            (O) => O.csvColumnName === y
          ) ?? null;
          return /* @__PURE__ */ p(
            Oh,
            {
              csvHeader: y,
              currentMapping: $,
              setMapping: (O) => {
                const R = bh(
                  u,
                  y,
                  O
                );
                e(R);
              },
              mappingSelectionOptions: f,
              onMouseEnter: () => {
                a(y);
              }
            },
            C
          );
        }) })
      ] }),
      /* @__PURE__ */ p("div", { className: "bg-hello-csv-muted hidden flex-1 overflow-y-auto sm:block", children: /* @__PURE__ */ p(
        Ih,
        {
          examples: h,
          csvHeader: s ?? ""
        }
      ) })
    ] }) }),
    !g && /* @__PURE__ */ p("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ p(Ma, { children: l("mapper.mappingsNotValid") }) }),
    /* @__PURE__ */ p("div", { className: "mt-auto flex-none", children: /* @__PURE__ */ p("div", { className: "mt-5 flex justify-between", children: [
      /* @__PURE__ */ p(
        He,
        {
          variant: "secondary",
          outline: !0,
          onClick: n,
          disabled: v,
          children: l("mapper.back")
        }
      ),
      /* @__PURE__ */ p(
        He,
        {
          onClick: w,
          disabled: !g || v,
          children: /* @__PURE__ */ p("div", { className: "flex items-center", children: [
            v && /* @__PURE__ */ p(fe, { children: [
              /* @__PURE__ */ p(Fa, { color: "light" }),
              /* @__PURE__ */ p("div", { className: "mr-2" })
            ] }),
            l("mapper.confirm")
          ] })
        }
      )
    ] }) })
  ] });
}
var Zh = { NODE_ENV: "production" };
function mt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ve(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: mt(n, r[e])
    }));
  };
}
function wr(e) {
  return e instanceof Function;
}
function Jh(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Qh(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const l = t(i);
      l != null && l.length && r(l);
    });
  };
  return r(e), n;
}
function X(e, t, n) {
  let r = [], o;
  return (i) => {
    let l;
    n.key && n.debug && (l = Date.now());
    const s = e(i);
    if (!(s.length !== r.length || s.some((c, d) => r[d] !== c)))
      return o;
    r = s;
    let u;
    if (n.key && n.debug && (u = Date.now()), o = t(...s), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const c = Math.round((Date.now() - l) * 100) / 100, d = Math.round((Date.now() - u) * 100) / 100, m = d / 16, f = (g, h) => {
        for (g = String(g); g.length < h; )
          g = " " + g;
        return g;
      };
      console.info(`%c⏱ ${f(d, 5)} /${f(c, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * m, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function Z(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: Zh.NODE_ENV === "development",
    onChange: r
  };
}
function ev(e, t, n, r) {
  const o = () => {
    var l;
    return (l = i.getValue()) != null ? l : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: X(() => [e, n, t, i], (l, s, a, u) => ({
      table: l,
      column: s,
      row: a,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), Z(e.options, "debugCells"))
  };
  return e._features.forEach((l) => {
    l.createCell == null || l.createCell(i, n, t, e);
  }, {}), i;
}
function tv(e, t, n, r) {
  var o, i;
  const s = {
    ...e._getDefaultColumnDef(),
    ...t
  }, a = s.accessorKey;
  let u = (o = (i = s.id) != null ? i : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? o : typeof s.header == "string" ? s.header : void 0, c;
  if (s.accessorFn ? c = s.accessorFn : a && (a.includes(".") ? c = (m) => {
    let f = m;
    for (const h of a.split(".")) {
      var g;
      f = (g = f) == null ? void 0 : g[h];
    }
    return f;
  } : c = (m) => m[s.accessorKey]), !u)
    throw new Error();
  let d = {
    id: `${String(u)}`,
    accessorFn: c,
    parent: r,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: X(() => [!0], () => {
      var m;
      return [d, ...(m = d.columns) == null ? void 0 : m.flatMap((f) => f.getFlatColumns())];
    }, Z(e.options, "debugColumns")),
    getLeafColumns: X(() => [e._getOrderColumnsFn()], (m) => {
      var f;
      if ((f = d.columns) != null && f.length) {
        let g = d.columns.flatMap((h) => h.getLeafColumns());
        return m(g);
      }
      return [d];
    }, Z(e.options, "debugColumns"))
  };
  for (const m of e._features)
    m.createColumn == null || m.createColumn(d, e);
  return d;
}
const Te = "debugHeaders";
function cl(e, t, n) {
  var r;
  let i = {
    id: (r = n.id) != null ? r : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const l = [], s = (a) => {
        a.subHeaders && a.subHeaders.length && a.subHeaders.map(s), l.push(a);
      };
      return s(i), l;
    },
    getContext: () => ({
      table: e,
      header: i,
      column: t
    })
  };
  return e._features.forEach((l) => {
    l.createHeader == null || l.createHeader(i, e);
  }), i;
}
const nv = {
  createTable: (e) => {
    e.getHeaderGroups = X(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, l;
      const s = (i = r == null ? void 0 : r.map((d) => n.find((m) => m.id === d)).filter(Boolean)) != null ? i : [], a = (l = o == null ? void 0 : o.map((d) => n.find((m) => m.id === d)).filter(Boolean)) != null ? l : [], u = n.filter((d) => !(r != null && r.includes(d.id)) && !(o != null && o.includes(d.id)));
      return Vn(t, [...s, ...u, ...a], e);
    }, Z(e.options, Te)), e.getCenterHeaderGroups = X(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Vn(t, n, e, "center")), Z(e.options, Te)), e.getLeftHeaderGroups = X(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? o : [];
      return Vn(t, i, e, "left");
    }, Z(e.options, Te)), e.getRightHeaderGroups = X(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? o : [];
      return Vn(t, i, e, "right");
    }, Z(e.options, Te)), e.getFooterGroups = X(() => [e.getHeaderGroups()], (t) => [...t].reverse(), Z(e.options, Te)), e.getLeftFooterGroups = X(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), Z(e.options, Te)), e.getCenterFooterGroups = X(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), Z(e.options, Te)), e.getRightFooterGroups = X(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), Z(e.options, Te)), e.getFlatHeaders = X(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, Te)), e.getLeftFlatHeaders = X(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, Te)), e.getCenterFlatHeaders = X(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, Te)), e.getRightFlatHeaders = X(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, Te)), e.getCenterLeafHeaders = X(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Z(e.options, Te)), e.getLeftLeafHeaders = X(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Z(e.options, Te)), e.getRightLeafHeaders = X(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Z(e.options, Te)), e.getLeafHeaders = X(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, l, s, a, u;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = r[0]) == null ? void 0 : u.headers) != null ? a : []].map((c) => c.getLeafHeaders()).flat();
    }, Z(e.options, Te));
  }
};
function Vn(e, t, n, r) {
  var o, i;
  let l = 0;
  const s = function(m, f) {
    f === void 0 && (f = 1), l = Math.max(l, f), m.filter((g) => g.getIsVisible()).forEach((g) => {
      var h;
      (h = g.columns) != null && h.length && s(g.columns, f + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (m, f) => {
    const g = {
      depth: f,
      id: [r, `${f}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    m.forEach((v) => {
      const x = [...h].reverse()[0], w = v.column.depth === g.depth;
      let y, C = !1;
      if (w && v.column.parent ? y = v.column.parent : (y = v.column, C = !0), x && (x == null ? void 0 : x.column) === y)
        x.subHeaders.push(v);
      else {
        const $ = cl(n, y, {
          id: [r, f, y.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: C,
          placeholderId: C ? `${h.filter((O) => O.column === y).length}` : void 0,
          depth: f,
          index: h.length
        });
        $.subHeaders.push(v), h.push($);
      }
      g.headers.push(v), v.headerGroup = g;
    }), a.push(g), f > 0 && u(h, f - 1);
  }, c = t.map((m, f) => cl(n, m, {
    depth: l,
    index: f
  }));
  u(c, l - 1), a.reverse();
  const d = (m) => m.filter((g) => g.column.getIsVisible()).map((g) => {
    let h = 0, v = 0, x = [0];
    g.subHeaders && g.subHeaders.length ? (x = [], d(g.subHeaders).forEach((y) => {
      let {
        colSpan: C,
        rowSpan: $
      } = y;
      h += C, x.push($);
    })) : h = 1;
    const w = Math.min(...x);
    return v = v + w, g.colSpan = h, g.rowSpan = v, {
      colSpan: h,
      rowSpan: v
    };
  });
  return d((o = (i = a[0]) == null ? void 0 : i.headers) != null ? o : []), a;
}
const rv = (e, t, n, r, o, i, l) => {
  let s = {
    id: t,
    index: r,
    original: n,
    depth: o,
    parentId: l,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (a) => {
      if (s._valuesCache.hasOwnProperty(a))
        return s._valuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return s._valuesCache[a] = u.accessorFn(s.original, r), s._valuesCache[a];
    },
    getUniqueValues: (a) => {
      if (s._uniqueValuesCache.hasOwnProperty(a))
        return s._uniqueValuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (s._uniqueValuesCache[a] = u.columnDef.getUniqueValues(s.original, r), s._uniqueValuesCache[a]) : (s._uniqueValuesCache[a] = [s.getValue(a)], s._uniqueValuesCache[a]);
    },
    renderValue: (a) => {
      var u;
      return (u = s.getValue(a)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => Qh(s.subRows, (a) => a.subRows),
    getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
    getParentRows: () => {
      let a = [], u = s;
      for (; ; ) {
        const c = u.getParentRow();
        if (!c) break;
        a.push(c), u = c;
      }
      return a.reverse();
    },
    getAllCells: X(() => [e.getAllLeafColumns()], (a) => a.map((u) => ev(e, s, u, u.id)), Z(e.options, "debugRows")),
    _getAllCellsByColumnId: X(() => [s.getAllCells()], (a) => a.reduce((u, c) => (u[c.column.id] = c, u), {}), Z(e.options, "debugRows"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, ov = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, qa = (e, t, n) => {
  var r, o;
  const i = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((o = e.getValue(t)) == null || (o = o.toString()) == null || (o = o.toLowerCase()) == null) && o.includes(i));
};
qa.autoRemove = (e) => je(e);
const Ka = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Ka.autoRemove = (e) => je(e);
const Ya = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Ya.autoRemove = (e) => je(e);
const Xa = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Xa.autoRemove = (e) => je(e);
const Za = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Za.autoRemove = (e) => je(e) || !(e != null && e.length);
const Ja = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Ja.autoRemove = (e) => je(e) || !(e != null && e.length);
const Qa = (e, t, n) => e.getValue(t) === n;
Qa.autoRemove = (e) => je(e);
const eu = (e, t, n) => e.getValue(t) == n;
eu.autoRemove = (e) => je(e);
const ni = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
ni.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, l = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > l) {
    const s = i;
    i = l, l = s;
  }
  return [i, l];
};
ni.autoRemove = (e) => je(e) || je(e[0]) && je(e[1]);
const tt = {
  includesString: qa,
  includesStringSensitive: Ka,
  equalsString: Ya,
  arrIncludes: Xa,
  arrIncludesAll: Za,
  arrIncludesSome: Ja,
  equals: Qa,
  weakEquals: eu,
  inNumberRange: ni
};
function je(e) {
  return e == null || e === "";
}
const iv = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Ve("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? tt.includesString : typeof r == "number" ? tt.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? tt.equals : Array.isArray(r) ? tt.arrIncludes : tt.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return wr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : tt[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, r, o;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((r = t.options.enableColumnFilters) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((r) => r.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, r;
      return (n = (r = t.getState().columnFilters) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((r) => {
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((c) => c.id === e.id), l = mt(n, i ? i.value : void 0);
        if (dl(o, l, e)) {
          var s;
          return (s = r == null ? void 0 : r.filter((c) => c.id !== e.id)) != null ? s : [];
        }
        const a = {
          id: e.id,
          value: l
        };
        if (i) {
          var u;
          return (u = r == null ? void 0 : r.map((c) => c.id === e.id ? a : c)) != null ? u : [];
        }
        return r != null && r.length ? [...r, a] : [a];
      });
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), r = (o) => {
        var i;
        return (i = mt(t, o)) == null ? void 0 : i.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (dl(a, l.value, s))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.resetColumnFilters = (t) => {
      var n, r;
      e.setColumnFilters(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function dl(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const lv = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), sv = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, av = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, uv = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const l = i.getValue(e);
    l != null && (r === void 0 ? l >= l && (r = o = l) : (r > l && (r = l), o < l && (o = l)));
  }), [r, o];
}, cv = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n) return r / n;
}, dv = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Jh(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, l) => i - l);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, fv = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), pv = (e, t) => new Set(t.map((n) => n.getValue(e))).size, mv = (e, t) => t.length, Pr = {
  sum: lv,
  min: sv,
  max: av,
  extent: uv,
  mean: cv,
  median: dv,
  unique: fv,
  uniqueCount: pv,
  count: mv
}, gv = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var t, n;
      return (t = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? t : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: Ve("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, t) => {
    e.toggleGrouping = () => {
      t.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((r) => r !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, r;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((r = t.options.enableGrouping) != null ? r : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      if (typeof r == "number")
        return Pr.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Pr.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return wr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : Pr[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
      var n, r;
      e.setGrouping(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, t) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const r = t.getColumn(n);
      return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, t, n, r) => {
    e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
      var o;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((o = n.subRows) != null && o.length);
    };
  }
};
function hv(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((l) => l.id === i)).filter(Boolean), ...r];
}
const vv = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Ve("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = X((n) => [pn(t, n)], (n) => n.findIndex((r) => r.id === e.id), Z(t.options, "debugColumns")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = pn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = pn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = X(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const l = [...t], s = [...o];
        for (; s.length && l.length; ) {
          const a = l.shift(), u = s.findIndex((c) => c.id === a);
          u > -1 && i.push(s.splice(u, 1)[0]);
        }
        i = [...i, ...s];
      }
      return hv(i, n, r);
    }, Z(e.options, "debugTable"));
  }
}, Ar = () => ({
  left: [],
  right: []
}), _v = {
  getInitialState: (e) => ({
    columnPinning: Ar(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Ve("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, l;
        if (n === "right") {
          var s, a;
          return {
            left: ((s = o == null ? void 0 : o.left) != null ? s : []).filter((d) => !(r != null && r.includes(d))),
            right: [...((a = o == null ? void 0 : o.right) != null ? a : []).filter((d) => !(r != null && r.includes(d))), ...r]
          };
        }
        if (n === "left") {
          var u, c;
          return {
            left: [...((u = o == null ? void 0 : o.left) != null ? u : []).filter((d) => !(r != null && r.includes(d))), ...r],
            right: ((c = o == null ? void 0 : o.right) != null ? c : []).filter((d) => !(r != null && r.includes(d)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((d) => !(r != null && r.includes(d))),
          right: ((l = o == null ? void 0 : o.right) != null ? l : []).filter((d) => !(r != null && r.includes(d)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((r) => {
      var o, i, l;
      return ((o = r.columnDef.enablePinning) != null ? o : !0) && ((i = (l = t.options.enableColumnPinning) != null ? l : t.options.enablePinning) != null ? i : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((s) => s.id), {
        left: r,
        right: o
      } = t.getState().columnPinning, i = n.some((s) => r == null ? void 0 : r.includes(s)), l = n.some((s) => o == null ? void 0 : o.includes(s));
      return i ? "left" : l ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      return o ? (n = (r = t.getState().columnPinning) == null || (r = r[o]) == null ? void 0 : r.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, t) => {
    e.getCenterVisibleCells = X(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((l) => !i.includes(l.column.id));
    }, Z(t.options, "debugRows")), e.getLeftVisibleCells = X(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((l) => l.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), Z(t.options, "debugRows")), e.getRightVisibleCells = X(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((l) => l.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), Z(t.options, "debugRows"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? Ar() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Ar());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = X(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), Z(e.options, "debugColumns")), e.getRightLeafColumns = X(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), Z(e.options, "debugColumns")), e.getCenterLeafColumns = X(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, Z(e.options, "debugColumns"));
  }
}, Hn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Nr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), wv = {
  getDefaultColumnDef: () => Hn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Nr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Ve("columnSizing", e),
    onColumnSizingInfoChange: Ve("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Hn.minSize, (r = i ?? e.columnDef.size) != null ? r : Hn.size), (o = e.columnDef.maxSize) != null ? o : Hn.maxSize);
    }, e.getStart = X((n) => [n, pn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), Z(t.options, "debugColumns")), e.getAfter = X((n) => [n, pn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), Z(t.options, "debugColumns")), e.resetSize = () => {
      t.setColumnSizing((n) => {
        let {
          [e.id]: r,
          ...o
        } = n;
        return o;
      });
    }, e.getCanResize = () => {
      var n, r;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((r = t.options.enableColumnResizing) != null ? r : !0);
    }, e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, t) => {
    e.getSize = () => {
      let n = 0;
      const r = (o) => {
        if (o.subHeaders.length)
          o.subHeaders.forEach(r);
        else {
          var i;
          n += (i = o.column.getSize()) != null ? i : 0;
        }
      };
      return r(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const r = t.getColumn(e.column.id), o = r == null ? void 0 : r.getCanResize();
      return (i) => {
        if (!r || !o || (i.persist == null || i.persist(), kr(i) && i.touches && i.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((x) => [x.column.id, x.column.getSize()]) : [[r.id, r.getSize()]], a = kr(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, c = (x, w) => {
          typeof w == "number" && (t.setColumnSizingInfo((y) => {
            var C, $;
            const O = t.options.columnResizeDirection === "rtl" ? -1 : 1, R = (w - ((C = y == null ? void 0 : y.startOffset) != null ? C : 0)) * O, _ = Math.max(R / (($ = y == null ? void 0 : y.startSize) != null ? $ : 0), -0.999999);
            return y.columnSizingStart.forEach((b) => {
              let [S, E] = b;
              u[S] = Math.round(Math.max(E + E * _, 0) * 100) / 100;
            }), {
              ...y,
              deltaOffset: R,
              deltaPercentage: _
            };
          }), (t.options.columnResizeMode === "onChange" || x === "end") && t.setColumnSizing((y) => ({
            ...y,
            ...u
          })));
        }, d = (x) => c("move", x), m = (x) => {
          c("end", x), t.setColumnSizingInfo((w) => ({
            ...w,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, f = n || typeof document < "u" ? document : null, g = {
          moveHandler: (x) => d(x.clientX),
          upHandler: (x) => {
            f == null || f.removeEventListener("mousemove", g.moveHandler), f == null || f.removeEventListener("mouseup", g.upHandler), m(x.clientX);
          }
        }, h = {
          moveHandler: (x) => (x.cancelable && (x.preventDefault(), x.stopPropagation()), d(x.touches[0].clientX), !1),
          upHandler: (x) => {
            var w;
            f == null || f.removeEventListener("touchmove", h.moveHandler), f == null || f.removeEventListener("touchend", h.upHandler), x.cancelable && (x.preventDefault(), x.stopPropagation()), m((w = x.touches[0]) == null ? void 0 : w.clientX);
          }
        }, v = yv() ? {
          passive: !1
        } : !1;
        kr(i) ? (f == null || f.addEventListener("touchmove", h.moveHandler, v), f == null || f.addEventListener("touchend", h.upHandler, v)) : (f == null || f.addEventListener("mousemove", g.moveHandler, v), f == null || f.addEventListener("mouseup", g.upHandler, v)), t.setColumnSizingInfo((x) => ({
          ...x,
          startOffset: a,
          startSize: l,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: s,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
      var n;
      e.setColumnSizing(t ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (t) => {
      var n;
      e.setColumnSizingInfo(t ? Nr() : (n = e.initialState.columnSizingInfo) != null ? n : Nr());
    }, e.getTotalSize = () => {
      var t, n;
      return (t = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getLeftTotalSize = () => {
      var t, n;
      return (t = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getCenterTotalSize = () => {
      var t, n;
      return (t = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getRightTotalSize = () => {
      var t, n;
      return (t = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    };
  }
};
let zn = null;
function yv() {
  if (typeof zn == "boolean") return zn;
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return zn = e, zn;
}
function kr(e) {
  return e.type === "touchstart";
}
const bv = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Ve("columnVisibility", e)
  }),
  createColumn: (e, t) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && t.setColumnVisibility((r) => ({
        ...r,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, r;
      const o = e.columns;
      return (n = o.length ? o.some((i) => i.getIsVisible()) : (r = t.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, r;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((r = t.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = X(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), Z(t.options, "debugRows")), e.getVisibleCells = X(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], Z(t.options, "debugRows"));
  },
  createTable: (e) => {
    const t = (n, r) => X(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), Z(e.options, "debugColumns"));
    e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var r;
      e.setColumnVisibility(n ? {} : (r = e.initialState.columnVisibility) != null ? r : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var r;
      n = (r = n) != null ? r : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((o, i) => ({
        ...o,
        [i.id]: n || !(i.getCanHide != null && i.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var r;
      e.toggleAllColumnsVisible((r = n.target) == null ? void 0 : r.checked);
    };
  }
};
function pn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const xv = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Sv = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Ve("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getCanGlobalFilter = () => {
      var n, r, o, i;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((r = t.options.enableGlobalFilter) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && ((i = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => tt.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return wr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : tt[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Cv = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Ve("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetExpanded = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetExpanded) != null ? r : !e.options.manualExpanding) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (r) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(r), e.toggleAllRowsExpanded = (r) => {
      r ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (r) => {
      var o, i;
      e.setExpanded(r ? {} : (o = (i = e.initialState) == null ? void 0 : i.expanded) != null ? o : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const r = e.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const r = e.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || e.getRowModel().flatRows.some((o) => !o.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let r = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((i) => {
        const l = i.split(".");
        r = Math.max(r, l.length);
      }), r;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, t) => {
    e.toggleExpanded = (n) => {
      t.setExpanded((r) => {
        var o;
        const i = r === !0 ? !0 : !!(r != null && r[e.id]);
        let l = {};
        if (r === !0 ? Object.keys(t.getRowModel().rowsById).forEach((s) => {
          l[s] = !0;
        }) : l = r, n = (o = n) != null ? o : !i, !i && n)
          return {
            ...l,
            [e.id]: !0
          };
        if (i && !n) {
          const {
            [e.id]: s,
            ...a
          } = l;
          return a;
        }
        return r;
      });
    }, e.getIsExpanded = () => {
      var n;
      const r = t.getState().expanded;
      return !!((n = t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) != null ? n : r === !0 || r != null && r[e.id]);
    }, e.getCanExpand = () => {
      var n, r, o;
      return (n = t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) != null ? n : ((r = t.options.enableExpanding) != null ? r : !0) && !!((o = e.subRows) != null && o.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, r = e;
      for (; n && r.parentId; )
        r = t.getRow(r.parentId, !0), n = r.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, vo = 0, _o = 10, Dr = () => ({
  pageIndex: vo,
  pageSize: _o
}), Ev = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Dr(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Ve("pagination", e)
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetPageIndex = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetPageIndex) != null ? r : !e.options.manualPagination) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (r) => {
      const o = (i) => mt(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Dr() : (o = e.initialState.pagination) != null ? o : Dr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = mt(r, o.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, l)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? vo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : vo);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? _o : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : _o);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, mt(r, o.pageSize)), l = o.pageSize * o.pageIndex, s = Math.floor(l / i);
        return {
          ...o,
          pageIndex: s,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let l = mt(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof l == "number" && (l = Math.max(-1, l)), {
        ...o,
        pageCount: l
      };
    }), e.getPageOptions = X(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, l) => l)), o;
    }, Z(e.options, "debugTable")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, o = e.getPageCount();
      return o === -1 ? !0 : o === 0 ? !1 : r < o - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var r;
      return (r = e.options.rowCount) != null ? r : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Lr = () => ({
  top: [],
  bottom: []
}), Rv = {
  getInitialState: (e) => ({
    rowPinning: Lr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Ve("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, r, o) => {
      const i = r ? e.getLeafRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], l = o ? e.getParentRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], s = /* @__PURE__ */ new Set([...l, e.id, ...i]);
      t.setRowPinning((a) => {
        var u, c;
        if (n === "bottom") {
          var d, m;
          return {
            top: ((d = a == null ? void 0 : a.top) != null ? d : []).filter((h) => !(s != null && s.has(h))),
            bottom: [...((m = a == null ? void 0 : a.bottom) != null ? m : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var f, g;
          return {
            top: [...((f = a == null ? void 0 : a.top) != null ? f : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)],
            bottom: ((g = a == null ? void 0 : a.bottom) != null ? g : []).filter((h) => !(s != null && s.has(h)))
          };
        }
        return {
          top: ((u = a == null ? void 0 : a.top) != null ? u : []).filter((h) => !(s != null && s.has(h))),
          bottom: ((c = a == null ? void 0 : a.bottom) != null ? c : []).filter((h) => !(s != null && s.has(h)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: r,
        enablePinning: o
      } = t.options;
      return typeof r == "function" ? r(e) : (n = r ?? o) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: r,
        bottom: o
      } = t.getState().rowPinning, i = n.some((s) => r == null ? void 0 : r.includes(s)), l = n.some((s) => o == null ? void 0 : o.includes(s));
      return i ? "top" : l ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      if (!o) return -1;
      const i = (n = o === "top" ? t.getTopRows() : t.getBottomRows()) == null ? void 0 : n.map((l) => {
        let {
          id: s
        } = l;
        return s;
      });
      return (r = i == null ? void 0 : i.indexOf(e.id)) != null ? r : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, r;
      return e.setRowPinning(t ? Lr() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Lr());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = (t, n, r) => {
      var o;
      return ((o = e.options.keepPinnedRows) == null || o ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((l) => {
          const s = e.getRow(l, !0);
          return s.getIsAllParentsExpanded() ? s : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((l) => t.find((s) => s.id === l))
      )).filter(Boolean).map((l) => ({
        ...l,
        position: r
      }));
    }, e.getTopRows = X(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), Z(e.options, "debugRows")), e.getBottomRows = X(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), Z(e.options, "debugRows")), e.getCenterRows = X(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, Z(e.options, "debugRows"));
  }
}, $v = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Ve("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => {
      var n;
      return e.setRowSelection(t ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (t) => {
      e.setRowSelection((n) => {
        t = typeof t < "u" ? t : !e.getIsAllRowsSelected();
        const r = {
          ...n
        }, o = e.getPreGroupedRowModel().flatRows;
        return t ? o.forEach((i) => {
          i.getCanSelect() && (r[i.id] = !0);
        }) : o.forEach((i) => {
          delete r[i.id];
        }), r;
      });
    }, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
      const r = typeof t < "u" ? t : !e.getIsAllPageRowsSelected(), o = {
        ...n
      };
      return e.getRowModel().rows.forEach((i) => {
        wo(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = X(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Vr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Z(e.options, "debugTable")), e.getFilteredSelectedRowModel = X(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Vr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Z(e.options, "debugTable")), e.getGroupedSelectedRowModel = X(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Vr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Z(e.options, "debugTable")), e.getIsAllRowsSelected = () => {
      const t = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let r = !!(t.length && Object.keys(n).length);
      return r && t.some((o) => o.getCanSelect() && !n[o.id]) && (r = !1), r;
    }, e.getIsAllPageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows.filter((o) => o.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let r = !!t.length;
      return r && t.some((o) => !n[o.id]) && (r = !1), r;
    }, e.getIsSomeRowsSelected = () => {
      var t;
      const n = Object.keys((t = e.getState().rowSelection) != null ? t : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : t.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (t) => {
      e.toggleAllRowsSelected(t.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
      e.toggleAllPageRowsSelected(t.target.checked);
    };
  },
  createRow: (e, t) => {
    e.toggleSelected = (n, r) => {
      const o = e.getIsSelected();
      t.setRowSelection((i) => {
        var l;
        if (n = typeof n < "u" ? n : !o, e.getCanSelect() && o === n)
          return i;
        const s = {
          ...i
        };
        return wo(s, e.id, n, (l = r == null ? void 0 : r.selectChildren) != null ? l : !0, t), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ri(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return yo(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return yo(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : (n = t.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : (n = t.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : (n = t.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (r) => {
        var o;
        n && e.toggleSelected((o = r.target) == null ? void 0 : o.checked);
      };
    };
  }
}, wo = (e, t, n, r, o) => {
  var i;
  const l = o.getRow(t, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = l.subRows) != null && i.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => wo(e, s.id, n, r, o));
};
function Vr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(l, s) {
    return l.map((a) => {
      var u;
      const c = ri(a, n);
      if (c && (r.push(a), o[a.id] = a), (u = a.subRows) != null && u.length && (a = {
        ...a,
        subRows: i(a.subRows)
      }), c)
        return a;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function ri(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function yo(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((l) => {
    if (!(i && !o) && (l.getCanSelect() && (ri(l, t) ? i = !0 : o = !1), l.subRows && l.subRows.length)) {
      const s = yo(l, t);
      s === "all" ? i = !0 : (s === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const bo = /([0-9]+)/gm, Tv = (e, t, n) => tu(_t(e.getValue(n)).toLowerCase(), _t(t.getValue(n)).toLowerCase()), Iv = (e, t, n) => tu(_t(e.getValue(n)), _t(t.getValue(n))), Ov = (e, t, n) => oi(_t(e.getValue(n)).toLowerCase(), _t(t.getValue(n)).toLowerCase()), Mv = (e, t, n) => oi(_t(e.getValue(n)), _t(t.getValue(n))), Fv = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, Pv = (e, t, n) => oi(e.getValue(n), t.getValue(n));
function oi(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function _t(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function tu(e, t) {
  const n = e.split(bo).filter(Boolean), r = t.split(bo).filter(Boolean);
  for (; n.length && r.length; ) {
    const o = n.shift(), i = r.shift(), l = parseInt(o, 10), s = parseInt(i, 10), a = [l, s].sort();
    if (isNaN(a[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(a[1]))
      return isNaN(l) ? -1 : 1;
    if (l > s)
      return 1;
    if (s > l)
      return -1;
  }
  return n.length - r.length;
}
const on = {
  alphanumeric: Tv,
  alphanumericCaseSensitive: Iv,
  text: Ov,
  textCaseSensitive: Mv,
  datetime: Fv,
  basic: Pv
}, Av = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Ve("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return on.datetime;
        if (typeof i == "string" && (r = !0, i.split(bo).length > 1))
          return on.alphanumeric;
      }
      return r ? on.text : on.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return wr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : on[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((l) => {
        const s = l == null ? void 0 : l.find((f) => f.id === e.id), a = l == null ? void 0 : l.findIndex((f) => f.id === e.id);
        let u = [], c, d = i ? n : o === "desc";
        if (l != null && l.length && e.getCanMultiSort() && r ? s ? c = "toggle" : c = "add" : l != null && l.length && a !== l.length - 1 ? c = "replace" : s ? c = "toggle" : c = "replace", c === "toggle" && (i || o || (c = "remove")), c === "add") {
          var m;
          u = [...l, {
            id: e.id,
            desc: d
          }], u.splice(0, u.length - ((m = t.options.maxMultiSortColCount) != null ? m : Number.MAX_SAFE_INTEGER));
        } else c === "toggle" ? u = l.map((f) => f.id === e.id ? {
          ...f,
          desc: d
        } : f) : c === "remove" ? u = l.filter((f) => f.id !== e.id) : u = [{
          id: e.id,
          desc: d
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var n, r;
      return ((n = (r = e.columnDef.sortDescFirst) != null ? r : t.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var r, o;
      const i = e.getFirstSortDir(), l = e.getIsSorted();
      return l ? l !== i && ((r = t.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(n && (o = t.options.enableMultiRemove) != null) || o) ? !1 : l === "desc" ? "asc" : "desc" : i;
    }, e.getCanSort = () => {
      var n, r;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((r = t.options.enableSorting) != null ? r : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, r;
      return (n = (r = e.columnDef.enableMultiSort) != null ? r : t.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const r = (n = t.getState().sorting) == null ? void 0 : n.find((o) => o.id === e.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, r;
      return (n = (r = t.getState().sorting) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      t.setSorting((n) => n != null && n.length ? n.filter((r) => r.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (r) => {
        n && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
      var n, r;
      e.setSorting(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, Nv = [
  nv,
  bv,
  vv,
  _v,
  ov,
  iv,
  xv,
  //depends on ColumnFaceting
  Sv,
  //depends on ColumnFiltering
  Av,
  gv,
  //depends on RowSorting
  Cv,
  Ev,
  Rv,
  $v,
  wv
];
function kv(e) {
  var t, n;
  const r = [...Nv, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((m, f) => Object.assign(m, f.getDefaultOptions == null ? void 0 : f.getDefaultOptions(o)), {}), l = (m) => o.options.mergeOptions ? o.options.mergeOptions(i, m) : {
    ...i,
    ...m
  };
  let a = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((m) => {
    var f;
    a = (f = m.getInitialState == null ? void 0 : m.getInitialState(a)) != null ? f : a;
  });
  const u = [];
  let c = !1;
  const d = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: a,
    _queue: (m) => {
      u.push(m), c || (c = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        c = !1;
      }).catch((f) => setTimeout(() => {
        throw f;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (m) => {
      const f = mt(m, o.options);
      o.options = l(f);
    },
    getState: () => o.options.state,
    setState: (m) => {
      o.options.onStateChange == null || o.options.onStateChange(m);
    },
    _getRowId: (m, f, g) => {
      var h;
      return (h = o.options.getRowId == null ? void 0 : o.options.getRowId(m, f, g)) != null ? h : `${g ? [g.id, f].join(".") : f}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (m, f) => {
      let g = (f ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[m];
      if (!g && (g = o.getCoreRowModel().rowsById[m], !g))
        throw new Error();
      return g;
    },
    _getDefaultColumnDef: X(() => [o.options.defaultColumn], (m) => {
      var f;
      return m = (f = m) != null ? f : {}, {
        header: (g) => {
          const h = g.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (g) => {
          var h, v;
          return (h = (v = g.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? h : null;
        },
        ...o._features.reduce((g, h) => Object.assign(g, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...m
      };
    }, Z(e, "debugColumns")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: X(() => [o._getColumnDefs()], (m) => {
      const f = function(g, h, v) {
        return v === void 0 && (v = 0), g.map((x) => {
          const w = tv(o, x, v, h), y = x;
          return w.columns = y.columns ? f(y.columns, w, v + 1) : [], w;
        });
      };
      return f(m);
    }, Z(e, "debugColumns")),
    getAllFlatColumns: X(() => [o.getAllColumns()], (m) => m.flatMap((f) => f.getFlatColumns()), Z(e, "debugColumns")),
    _getAllFlatColumnsById: X(() => [o.getAllFlatColumns()], (m) => m.reduce((f, g) => (f[g.id] = g, f), {}), Z(e, "debugColumns")),
    getAllLeafColumns: X(() => [o.getAllColumns(), o._getOrderColumnsFn()], (m, f) => {
      let g = m.flatMap((h) => h.getLeafColumns());
      return f(g);
    }, Z(e, "debugColumns")),
    getColumn: (m) => o._getAllFlatColumnsById()[m]
  };
  Object.assign(o, d);
  for (let m = 0; m < o._features.length; m++) {
    const f = o._features[m];
    f == null || f.createTable == null || f.createTable(o);
  }
  return o;
}
function Dv() {
  return (e) => X(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, l) {
      i === void 0 && (i = 0);
      const s = [];
      for (let u = 0; u < o.length; u++) {
        const c = rv(e, e._getRowId(o[u], u, l), o[u], u, i, void 0, l == null ? void 0 : l.id);
        if (n.flatRows.push(c), n.rowsById[c.id] = c, s.push(c), e.options.getSubRows) {
          var a;
          c.originalSubRows = e.options.getSubRows(o[u], u), (a = c.originalSubRows) != null && a.length && (c.subRows = r(c.originalSubRows, i + 1, c));
        }
      }
      return s;
    };
    return n.rows = r(t), n;
  }, Z(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Lv() {
  return (e) => X(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, o = [], i = r.filter((a) => {
      var u;
      return (u = e.getColumn(a.id)) == null ? void 0 : u.getCanSort();
    }), l = {};
    i.forEach((a) => {
      const u = e.getColumn(a.id);
      u && (l[a.id] = {
        sortUndefined: u.columnDef.sortUndefined,
        invertSorting: u.columnDef.invertSorting,
        sortingFn: u.getSortingFn()
      });
    });
    const s = (a) => {
      const u = a.map((c) => ({
        ...c
      }));
      return u.sort((c, d) => {
        for (let f = 0; f < i.length; f += 1) {
          var m;
          const g = i[f], h = l[g.id], v = h.sortUndefined, x = (m = g == null ? void 0 : g.desc) != null ? m : !1;
          let w = 0;
          if (v) {
            const y = c.getValue(g.id), C = d.getValue(g.id), $ = y === void 0, O = C === void 0;
            if ($ || O) {
              if (v === "first") return $ ? -1 : 1;
              if (v === "last") return $ ? 1 : -1;
              w = $ && O ? 0 : $ ? v : -v;
            }
          }
          if (w === 0 && (w = h.sortingFn(c, d, g.id)), w !== 0)
            return x && (w *= -1), h.invertSorting && (w *= -1), w;
        }
        return c.index - d.index;
      }), u.forEach((c) => {
        var d;
        o.push(c), (d = c.subRows) != null && d.length && (c.subRows = s(c.subRows));
      }), u;
    };
    return {
      rows: s(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, Z(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function fl(e, t) {
  return e ? Vv(e) ? /* @__PURE__ */ P(e, t) : e : null;
}
function Vv(e) {
  return Hv(e) || typeof e == "function" || zv(e);
}
function Hv(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function zv(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Bv(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = H(() => ({
    current: kv(t)
  })), [r, o] = H(() => n.current.initialState);
  return n.current.setOptions((i) => ({
    ...i,
    ...e,
    state: {
      ...r,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (l) => {
      o(l), e.onStateChange == null || e.onStateChange(l);
    }
  })), n.current;
}
const jv = 500, pl = 10;
function Uv(e, { disabled: t = !1 } = {}) {
  const n = k(null), r = k(0), o = k(0), i = k(!1), l = ie(
    (u) => {
      if (t) return;
      const c = u.touches[0];
      r.current = c.clientX, o.current = c.clientY, i.current = !1, n.current = setTimeout(() => {
        i.current || e();
      }, jv);
    },
    [e, t]
  ), s = ie(() => {
    n.current && (clearTimeout(n.current), n.current = null);
  }, []), a = ie(
    (u) => {
      const c = u.touches[0], d = Math.abs(c.clientX - r.current), m = Math.abs(c.clientY - o.current);
      (d > pl || m > pl) && (i.current = !0, s());
    },
    [s]
  );
  return {
    onTouchStart: l,
    onTouchMove: a,
    onTouchEnd: s,
    onTouchCancel: s,
    onMouseLeave: s
  };
}
function Wv({
  rowId: e,
  sheetDefinition: t,
  columnDefinition: n,
  value: r,
  onUpdated: o,
  allData: i,
  clearRowsSelection: l,
  errorsText: s,
  enumLabelDict: a
}) {
  const { t: u } = ye(), { availableActions: c } = ze(), [d, m] = H(!1), f = k(null);
  re(() => {
    d && (l(), f.current && f.current.focus());
  }, [d]);
  const { displayValue: g, valueEmpty: h } = ka(
    t,
    n,
    r,
    a
  ), v = Na(n) || !c.includes("editRows"), x = Uv(
    () => {
      v || m(!0);
    },
    { disabled: v }
  ), w = s ? "bg-hello-csv-danger-extra-light" : v ? "bg-hello-csv-muted" : "";
  if (!d)
    return /* @__PURE__ */ p(
      xg,
      {
        variant: s ? "error" : "info",
        tooltipText: s || (v ? u("sheet.readOnly") : ""),
        children: /* @__PURE__ */ p(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-label": `row ${Number(e) + 1} ${n.label} ${g}`,
            ...x,
            onClick: (C) => !v && C.detail > 1 && m(!0),
            className: `h-full w-full py-4 pr-3 pl-4 ${w} touch-manipulation truncate overflow-hidden whitespace-nowrap`,
            title: h ? void 0 : `${g}`,
            children: n.customRender ? n.customRender(r, g) : g
          }
        )
      }
    );
  function y(C) {
    m(!1), n.type === "number" && C !== "" && !isNaN(Number(C)) ? o(Number(C)) : o(C ?? "");
  }
  if (n.type === "boolean") {
    const C = [!0, !1].map(($) => {
      var O, R;
      return {
        label: $ ? ((O = n.typeArguments) == null ? void 0 : O.trueLabel) ?? ya : ((R = n.typeArguments) == null ? void 0 : R.falseLabel) ?? ba,
        value: $
      };
    });
    return /* @__PURE__ */ p(
      $t,
      {
        options: C,
        value: r,
        onChange: ($) => y($ ?? "")
      }
    );
  }
  if (n.type === "reference") {
    const C = Pa(
      n,
      i
    ), $ = Ta(n, a), O = C.map((R) => ({
      label: String(mo($, R)),
      value: R
    }));
    return /* @__PURE__ */ p(
      $t,
      {
        searchable: !0,
        options: O,
        value: r,
        onChange: (R) => y(R ?? "")
      }
    );
  }
  if (n.type === "enum") {
    const { values: C, multiple: $ } = n.typeArguments;
    if ($) {
      const O = oh(
        r,
        C,
        (R) => u("components.select.invalidOption", { value: R }),
        /* @__PURE__ */ p(
          vg,
          {
            className: "text-hello-csv-danger mr-2 h-5 w-5 shrink-0",
            "aria-hidden": "true"
          }
        )
      );
      return /* @__PURE__ */ p(
        $t,
        {
          searchable: !0,
          clearable: !0,
          multiple: !0,
          options: O,
          value: r,
          onChange: (R) => o(R ?? []),
          onClose: () => m(!1)
        }
      );
    }
    return /* @__PURE__ */ p(
      $t,
      {
        searchable: !0,
        options: C,
        value: r,
        onChange: (O) => y(O ?? "")
      }
    );
  }
  return /* @__PURE__ */ p(
    Sa,
    {
      "aria-label": `edit row ${Number(e) + 1}'s ${n.label}`,
      type: n.type === "number" ? "number" : "text",
      classes: "block w-full",
      value: r,
      onBlur: y,
      ref: f
    }
  );
}
function Gv({
  table: e,
  sheetDefinition: t,
  allData: n,
  sheetValidationErrors: r,
  onCellValueChanged: o,
  setSelectedRows: i,
  tableContainerRef: l,
  enumLabelDict: s
}) {
  const { t: a } = ye(), { availableActions: u } = ze();
  function c(y, C) {
    return r.filter(
      ($) => $.columnId === y && $.rowIndex === C
    );
  }
  const d = "bg-hello-csv-muted py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap border-y border-gray-300", m = "text-sm font-medium whitespace-nowrap text-gray-900 border-b border-gray-300", f = e.getRowModel().rows, g = _s({
    count: f.length,
    getScrollElement: () => l.current,
    estimateSize: () => ng,
    measureElement: (y) => y == null ? void 0 : y.getBoundingClientRect().height,
    overscan: 20
  }), h = g.getVirtualItems().map((y) => ({
    row: f[y.index],
    index: y.index,
    start: y.start,
    end: y.end
  })), [v, x] = h.length > 0 ? [
    Math.max(
      0,
      h[0].start - g.options.scrollMargin
    ),
    Math.max(
      0,
      g.getTotalSize() - h[h.length - 1].end
    )
  ] : [0, 0], w = ie(
    (y) => {
      y && g.measureElement(y);
    },
    [g]
  );
  return /* @__PURE__ */ p(
    "table",
    {
      className: "w-full table-fixed border-separate border-spacing-0",
      "aria-label": a("sheet.sheetTitle"),
      children: [
        /* @__PURE__ */ p("thead", { className: "bg-hello-csv-muted sticky top-0 z-10", children: e.getHeaderGroups().map((y) => /* @__PURE__ */ p("tr", { children: y.headers.map((C) => /* @__PURE__ */ p(
          "th",
          {
            className: C.column.id === fo ? `${d} sticky left-0 z-20` : `relative z-10 ${d}`,
            colSpan: C.colSpan,
            style: { width: C.getSize() },
            children: /* @__PURE__ */ p(
              "div",
              {
                className: `flex w-full ${C.column.getCanSort() ? "cursor-pointer select-none" : ""}`,
                onClick: C.column.getToggleSortingHandler(),
                children: [
                  C.isPlaceholder ? null : /* @__PURE__ */ p("div", { children: fl(
                    C.column.columnDef.header,
                    C.getContext()
                  ) }, `header-${y.id}-${C.id}`),
                  /* @__PURE__ */ p(
                    "span",
                    {
                      className: "ml-2 flex-none rounded-sm bg-gray-500 text-gray-200",
                      children: {
                        asc: /* @__PURE__ */ p(gg, { "aria-hidden": "true", className: "size-5" }),
                        desc: /* @__PURE__ */ p(
                          dg,
                          {
                            "aria-hidden": "true",
                            className: "size-5"
                          }
                        )
                      }[C.column.getIsSorted()] ?? null
                    },
                    `sort-icon-${y.id}-${C.id}`
                  ),
                  C.column.getCanResize() && /* @__PURE__ */ p(
                    "div",
                    {
                      onMouseDown: C.getResizeHandler(),
                      onTouchStart: C.getResizeHandler(),
                      className: "absolute top-0 right-0 h-full w-0.5 cursor-col-resize touch-none bg-gray-200 select-none"
                    },
                    `resize-icon-${y.id}-${C.id}`
                  )
                ]
              }
            )
          },
          C.id
        )) }, y.id)) }),
        /* @__PURE__ */ p(
          "tbody",
          {
            className: "divide-y divide-gray-200",
            style: {
              height: `${g.getTotalSize()}px`
            },
            children: [
              /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", { style: { height: v } }) }),
              h.map(({ row: y, index: C }) => /* @__PURE__ */ p("tr", { "data-index": C, ref: w, children: y.getVisibleCells().map(($, O) => {
                if ($.column.id === fo)
                  return /* @__PURE__ */ p(
                    "td",
                    {
                      "aria-label": `Select row ${Number(y.id) + 1}`,
                      className: `bg-hello-csv-muted ${m} sticky left-0 z-6 pr-3 pl-4`,
                      style: { width: $.column.getSize() },
                      children: fl($.column.columnDef.cell, $.getContext())
                    },
                    $.id
                  );
                const R = u.includes("removeRows"), _ = t.columns[O - (R ? 1 : 0)].id, b = Aa(
                  n,
                  t.id,
                  y.original
                ), S = c(_, b).map((E) => a(E.message)).join(", ");
                return /* @__PURE__ */ p(
                  "td",
                  {
                    className: m,
                    style: { width: $.column.getSize() },
                    children: /* @__PURE__ */ p(
                      Wv,
                      {
                        rowId: y.id,
                        sheetDefinition: t,
                        columnDefinition: t.columns.find((E) => E.id === _),
                        allData: n,
                        value: $.getValue(),
                        onUpdated: (E) => o(b, _, E),
                        clearRowsSelection: () => i([]),
                        errorsText: S,
                        enumLabelDict: s
                      }
                    )
                  },
                  $.id
                );
              }) }, y.id)),
              /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", { style: { height: x } }) })
            ]
          }
        )
      ]
    }
  );
}
function qv({ column: e }) {
  const { t } = ye(), n = Na(e);
  return /* @__PURE__ */ p(
    "div",
    {
      className: "flex items-center",
      title: n ? t("sheet.readOnly") : void 0,
      children: [
        n && /* @__PURE__ */ p("div", { className: "relative mr-3 h-5 w-5", children: [
          /* @__PURE__ */ p(ha, { className: "absolute top-0 left-0 h-5 w-5 text-gray-400" }),
          /* @__PURE__ */ p(pm, { className: "absolute top-0 left-0 h-5 w-5 text-gray-500" })
        ] }),
        e.label,
        " ",
        Mn(e) && "*"
      ]
    }
  );
}
function Kv({
  sheetDefinition: e,
  rowData: t,
  selectedRows: n,
  setSelectedRows: r,
  viewMode: o,
  setViewMode: i,
  searchPhrase: l,
  setSearchPhrase: s,
  errorColumnFilter: a,
  setErrorColumnFilter: u,
  removeRows: c,
  addEmptyRow: d,
  sheetValidationErrors: m,
  rowValidationSummary: f,
  resetState: g,
  enumLabelDict: h
}) {
  const { csvDownloadMode: v, availableActions: x } = ze(), { t: w } = ye(), { validationInProgress: y } = ut(), [C, $] = H(!1), [O, R] = H(!1), _ = "pointer-events-none cursor-not-allowed opacity-50";
  function b(F) {
    const A = e.columns.find(
      (G) => G.id === F
    ), j = sl(
      m.filter((G) => G.columnId === F).map((G) => G.rowIndex)
    ).length;
    return {
      label: `${(A == null ? void 0 : A.label) || F} (${j})`,
      value: F
    };
  }
  const S = sl(
    m.map((F) => F.columnId)
  ).map((F) => b(F));
  a != null && S.find((F) => F.value === a) == null && S.push(b(a));
  const E = [
    {
      value: "all",
      label: w("sheet.all") + ` (${f.all})`,
      onClick: () => {
        r([]), i("all");
      },
      variant: "default"
    },
    {
      value: "valid",
      label: w("sheet.valid") + ` (${f.valid})`,
      onClick: () => {
        r([]), i("valid");
      },
      variant: "default"
    },
    {
      value: "errors",
      label: w("sheet.invalid") + ` (${f.errors})`,
      onClick: () => {
        r([]), i("errors");
      },
      variant: "danger"
    }
  ];
  function T() {
    c({ rows: n, sheetId: e.id }), r([]);
  }
  return /* @__PURE__ */ p("div", { className: "my-5 flex items-center", children: [
    /* @__PURE__ */ p("div", { className: "flex grow flex-wrap items-center gap-5", children: [
      /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(Cg, { activeButton: o, buttons: E }) }),
      x.includes("search") && /* @__PURE__ */ p(
        Sa,
        {
          clearable: !0,
          value: l,
          onChange: (F) => s(F),
          placeholder: w("sheet.search"),
          iconBuilder: (F) => /* @__PURE__ */ p(dm, { ...F })
        }
      ),
      x.includes("removeRows") && /* @__PURE__ */ p(
        Ht,
        {
          tooltipText: w(
            n.length <= 0 ? "sheet.removeRowsTooltipNoRowsSelected" : "sheet.removeRowsTooltip"
          ),
          children: /* @__PURE__ */ p(
            vm,
            {
              role: "button",
              tabIndex: 0,
              "aria-label": w(
                n.length <= 0 ? "sheet.removeRowsTooltipNoRowsSelected" : "sheet.removeRowsTooltip"
              ),
              className: `h-6 w-6 ${n.length > 0 ? "cursor-pointer" : _}`,
              onClick: () => $(!0)
            }
          )
        }
      ),
      x.includes("addRows") && /* @__PURE__ */ p(Ht, { tooltipText: w("sheet.addRowsTooltip"), children: /* @__PURE__ */ p(
        gm,
        {
          className: "h-6 w-6 cursor-pointer",
          onClick: d
        }
      ) }),
      x.includes("downloadCsv") && /* @__PURE__ */ p(Ht, { tooltipText: w("sheet.downloadSheetTooltip"), children: /* @__PURE__ */ p(
        Zp,
        {
          className: `h-6 w-6 ${t.length > 0 ? "cursor-pointer" : _}`,
          onClick: () => $a(
            e,
            t,
            h,
            v
          )
        }
      ) }),
      /* @__PURE__ */ p(
        $t,
        {
          clearable: !0,
          displayPlaceholderWhenSelected: !0,
          placeholder: w("sheet.filterByError"),
          classes: "min-w-48",
          options: S,
          value: a,
          onChange: (F) => u(F)
        }
      ),
      x.includes("removeRows") && /* @__PURE__ */ p(
        uo,
        {
          open: C,
          setOpen: $,
          onConfirm: T,
          title: w("sheet.removeConfirmationModalTitle"),
          confirmationText: w(
            "sheet.removeConfirmationModalConfirmationText"
          ),
          subTitle: w("sheet.removeConfirmationModalSubTitle", {
            rowsCount: n.length
          }),
          variant: "danger"
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "ml-5 flex items-center", children: [
      y && /* @__PURE__ */ p(fe, { children: [
        /* @__PURE__ */ p(Fa, { color: "dark" }),
        /* @__PURE__ */ p("div", { className: "mr-2" })
      ] }),
      x.includes("resetState") && /* @__PURE__ */ p(fe, { children: [
        /* @__PURE__ */ p(Ht, { tooltipText: w("sheet.resetTooltip"), children: /* @__PURE__ */ p(
          ha,
          {
            className: "h-6 w-6 cursor-pointer",
            onClick: () => R(!0)
          }
        ) }),
        /* @__PURE__ */ p(
          uo,
          {
            open: O,
            setOpen: R,
            onConfirm: g,
            title: w("sheet.resetConfirmationModalTitle"),
            confirmationText: w(
              "sheet.resetConfirmationModalConfirmationText"
            ),
            subTitle: w("sheet.resetConfirmationModalSubTitle"),
            variant: "danger"
          }
        )
      ] })
    ] })
  ] });
}
function Yv({
  visibleData: e,
  selectedRows: t,
  setSelectedRows: n
}) {
  const r = t.length === e.length && e.length > 0;
  function o() {
    n(r ? [] : e);
  }
  return /* @__PURE__ */ p(Kl, { checked: r, setChecked: o });
}
function Xv({
  row: e,
  selectedRows: t,
  setSelectedRows: n
}) {
  function r(o) {
    t.includes(o) ? n((i) => i.filter((l) => l !== o)) : n((i) => [...i, o]);
  }
  return /* @__PURE__ */ p(
    Kl,
    {
      checked: t.includes(e.original),
      setChecked: () => r(e.original),
      label: `${Number(e.id) + 1}`
    }
  );
}
function Zv({
  sheetDefinition: e,
  data: t,
  sheetValidationErrors: n,
  setRowData: r,
  removeRows: o,
  addEmptyRow: i,
  resetState: l,
  enumLabelDict: s
}) {
  const { sheetData: a } = ut(), { availableActions: u } = ze(), [c, d] = H([]), [m, f] = H("all"), [g, h] = H(""), [v, x] = H(
    null
  );
  re(() => {
    d([]), f("all");
  }, [e]);
  const w = nh(
    t,
    a,
    m,
    n,
    v,
    e,
    g,
    s
  ), y = W(() => {
    const _ = t.rows, b = _.filter(
      (E, T) => !n.some((F) => F.rowIndex === T)
    ), S = _.filter(
      (E, T) => n.some((F) => F.rowIndex === T)
    );
    return {
      all: _.length,
      valid: b.length,
      errors: S.length
    };
  }, [t, n]), C = W(() => [
    ...u.includes(
      "removeRows"
    ) ? [
      {
        id: fo,
        header: () => /* @__PURE__ */ p(
          Yv,
          {
            visibleData: w,
            selectedRows: c,
            setSelectedRows: d
          }
        ),
        cell: ({ row: b }) => /* @__PURE__ */ p(
          Xv,
          {
            row: b,
            selectedRows: c,
            setSelectedRows: d
          }
        ),
        enableResizing: !1,
        enableSorting: !1,
        enableColumnFilter: !1,
        enableMultiSort: !1,
        enableGlobalFilter: !1,
        size: rg
      }
    ] : [],
    ...e.columns.map(
      (b) => ({
        id: b.id,
        accessorFn: (S) => S[b.id],
        header: () => /* @__PURE__ */ p(qv, { column: b }),
        sortUndefined: "last",
        sortingFn: "auto",
        meta: { columnLabel: b.label },
        enableResizing: !0
      })
    )
  ], [e, c, w, u]), $ = Bv({
    data: w,
    columns: C,
    getCoreRowModel: Dv(),
    getSortedRowModel: Lv(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    defaultColumn: {
      minSize: og,
      maxSize: ig,
      size: lg
    }
  });
  function O(_, b, S) {
    const E = { ...t.rows[_] };
    E[b] = S, r({
      sheetId: e.id,
      value: E,
      rowIndex: _
    });
  }
  const R = k(null);
  return /* @__PURE__ */ p("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ p("div", { className: "flex-none", children: /* @__PURE__ */ p(
      Kv,
      {
        sheetDefinition: e,
        rowData: w,
        selectedRows: c,
        setSelectedRows: d,
        viewMode: m,
        setViewMode: f,
        searchPhrase: g,
        setSearchPhrase: h,
        errorColumnFilter: v,
        setErrorColumnFilter: x,
        removeRows: o,
        addEmptyRow: i,
        sheetValidationErrors: n,
        rowValidationSummary: y,
        resetState: l,
        enumLabelDict: s
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "min-h-0 flex-1 overflow-auto", ref: R, children: /* @__PURE__ */ p(
      Gv,
      {
        tableContainerRef: R,
        table: $,
        sheetDefinition: e,
        allData: a,
        sheetValidationErrors: n,
        onCellValueChanged: O,
        setSelectedRows: d,
        enumLabelDict: s
      }
    ) })
  ] });
}
function nu(e) {
  return e.reduce((t, n) => t + n.rows.length, 0);
}
function Jv(e, t, n, r) {
  e.forEach((o) => {
    const i = t.find(
      (l) => l.id === o.sheetId
    );
    i && $a(
      i,
      o.rows,
      n,
      r
    );
  });
}
const ml = (e, t, n, r) => e.length ? e.reduce((o, i) => {
  const l = t.find(
    (s) => s.id === i.sheetId
  );
  return l ? o + Jo(
    l,
    i.rows,
    n,
    r
  ).size : o;
}, 0) : 0;
function Qv({
  completedWithErrors: e,
  enumLabelDict: t
}) {
  const {
    rowFile: n,
    mode: r,
    sheetData: o,
    importStatistics: i,
    sheetDefinitions: l
  } = ut(), s = Qo(l, o), { csvDownloadMode: a } = ze(), { t: u } = ye(), c = nu(s);
  return /* @__PURE__ */ p("div", { className: "flex flex-row px-4 pt-3 pb-2", children: /* @__PURE__ */ p("div", { className: "flex-1 space-y-4", children: [
    /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p("div", { className: "flex flex-row", children: [
      /* @__PURE__ */ p("div", { className: "my-2 mr-5 text-center", children: /* @__PURE__ */ p(im, { className: "text-hello-csv-primary h-8 w-8" }) }),
      /* @__PURE__ */ p("div", { className: "flex-1", children: [
        /* @__PURE__ */ p("div", { className: "my-2 text-sm font-light uppercase", children: u("importStatus.fileInformation") }),
        /* @__PURE__ */ p("div", { className: "text-md my-2 font-medium", children: (n == null ? void 0 : n.name) || "Data entered manually" }),
        /* @__PURE__ */ p("div", { className: "my-2 text-sm text-gray-500", children: n ? `${u("importStatus.original")}: ${fn((n == null ? void 0 : n.size) || 0)} · ${u("importStatus.processed")}: ${fn(ml(s, l, t, a))}` : `${u("importStatus.processed")}: ${fn(ml(s, l, t, a))}` }),
        /* @__PURE__ */ p("div", { className: "mt-5", children: /* @__PURE__ */ p(
          He,
          {
            variant: "tertiary",
            outline: !0,
            onClick: () => Jv(
              s,
              l,
              t,
              a
            ),
            children: u("importStatus.downloadProcessedData")
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ p("div", { className: "border-b border-gray-200 pb-2" }),
    /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p("div", { className: "flex flex-row", children: [
      /* @__PURE__ */ p("div", { className: "my-2 mr-5 text-center", children: r === "failed" ? /* @__PURE__ */ p(go, { className: "text-hello-csv-danger-light h-8 w-8" }) : e ? /* @__PURE__ */ p(Vg, { className: "text-hello-csv-warning-light h-8 w-8" }) : /* @__PURE__ */ p(Oa, { className: "text-hello-csv-success-light h-8 w-8" }) }),
      /* @__PURE__ */ p("div", { className: "flex-1", children: [
        /* @__PURE__ */ p("div", { className: "my-2 text-sm font-light uppercase", children: u("importStatus.importResults") }),
        /* @__PURE__ */ p("div", { className: "text-md my-2 font-medium", children: u("importStatus.totalRows", { totalRows: c }) }),
        i && /* @__PURE__ */ p("div", { className: "my-2 text-sm text-gray-500", children: [
          i.skipped >= 0 && /* @__PURE__ */ p("span", { children: [
            u("importStatus.statisticsSkipped", {
              skipped: i.skipped
            }),
            " · "
          ] }),
          i.failed >= 0 && /* @__PURE__ */ p("span", { children: [
            u("importStatus.statisticsFailed", {
              failed: i.failed
            }),
            " · "
          ] }),
          i.imported >= 0 && /* @__PURE__ */ p("span", { children: u("importStatus.statisticsImported", {
            imported: i.imported
          }) })
        ] }),
        r === "failed" && /* @__PURE__ */ p("div", { className: "my-2 text-sm text-gray-500", children: [
          u("importStatus.status"),
          ":",
          " ",
          /* @__PURE__ */ p(ei, { variant: "error", children: u("importStatus.failed") })
        ] })
      ] })
    ] }) })
  ] }) });
}
function ru({ completedWithErrors: e, enumLabelDict: t }) {
  const { t: n } = ye();
  return /* @__PURE__ */ p(ql, { withPadding: !1, className: "h-full", children: /* @__PURE__ */ p("div", { className: "flex flex-col py-5", children: [
    /* @__PURE__ */ p("div", { className: "px-4 pb-2 text-xl", children: n("importStatus.importDetails") }),
    /* @__PURE__ */ p("div", { className: "px-4 pb-2 text-sm text-gray-500", children: n("importStatus.importDetailsDescription") }),
    /* @__PURE__ */ p("div", { className: "border-b border-gray-200 pb-2" }),
    /* @__PURE__ */ p(
      Qv,
      {
        completedWithErrors: e,
        enumLabelDict: t
      }
    )
  ] }) });
}
function e0({ resetState: e, enumLabelDict: t }) {
  const {
    sheetDefinitions: n,
    sheetData: r,
    importStatistics: o
  } = ut(), { onSummaryFinished: i } = ze(), { t: l } = ye(), s = Qo(n, r), a = nu(s), u = (o == null ? void 0 : o.imported) ?? 0, c = !!(o != null && o.failed) || !!(o != null && o.skipped);
  return /* @__PURE__ */ p("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ p("div", { className: "flex-none text-2xl", children: l("importStatus.dataImport") }),
    /* @__PURE__ */ p("div", { className: "grow overflow-auto", children: [
      /* @__PURE__ */ p("div", { className: "mt-4", children: /* @__PURE__ */ p(
        ti,
        {
          variant: c ? "warning" : "success",
          header: l(
            `importStatus.${c ? "importSuccessfulWithErrors" : "importSuccessful"}`
          ),
          description: l(
            `importStatus.successDescription${o ? "WithStats" : ""}`,
            {
              totalRecords: a,
              recordsImported: u
            }
          )
        }
      ) }),
      /* @__PURE__ */ p("div", { className: "mt-6", children: /* @__PURE__ */ p(
        ru,
        {
          completedWithErrors: c,
          enumLabelDict: t
        }
      ) })
    ] }),
    /* @__PURE__ */ p("div", { className: "flex-none", children: /* @__PURE__ */ p("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ p(He, { variant: "primary", onClick: i || e, children: l("importStatus.continue") }) }) })
  ] });
}
function t0({
  onRetry: e,
  onBackToPreview: t,
  enumLabelDict: n
}) {
  const { t: r } = ye();
  return /* @__PURE__ */ p("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ p("div", { className: "text-2xl", children: r("importStatus.dataImport") }),
    /* @__PURE__ */ p("div", { className: "grow overflow-auto", children: [
      /* @__PURE__ */ p("div", { className: "mt-4", children: /* @__PURE__ */ p(
        ti,
        {
          variant: "error",
          header: r("importStatus.importFailed"),
          description: r("importStatus.failedDescription")
        }
      ) }),
      /* @__PURE__ */ p("div", { className: "mt-6", children: /* @__PURE__ */ p(ru, { completedWithErrors: !1, enumLabelDict: n }) })
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-6 flex justify-between", children: [
      /* @__PURE__ */ p(He, { onClick: t, variant: "secondary", outline: !0, children: r("importer.loader.backToPreview") }),
      /* @__PURE__ */ p(He, { onClick: e, variant: "primary", children: r("importer.loader.retry") })
    ] })
  ] });
}
function n0({ progress: e, pending: t }) {
  const r = 2 * Math.PI * 40, o = r - e / 100 * r, [i, l] = H(!1);
  return re(() => {
    if (e === 0) {
      const s = setTimeout(() => {
        l(!0);
      }, 3e3);
      return () => clearTimeout(s);
    }
  }, [e]), i ? /* @__PURE__ */ p("div", { className: "flex justify-center", children: /* @__PURE__ */ p(
    "div",
    {
      className: `border-hello-csv-success-light h-22 w-22 rounded-full border-10 ${t && "animate-spin border-t-transparent"}`
    }
  ) }) : /* @__PURE__ */ p("svg", { className: "mx-auto h-24 w-24 rotate-[-90deg]", width: "100", height: "100", children: [
    /* @__PURE__ */ p(
      "circle",
      {
        cx: "50",
        cy: "50",
        r: 40,
        fill: "transparent",
        className: "text-gray-200",
        strokeWidth: "10",
        stroke: "currentColor"
      }
    ),
    /* @__PURE__ */ p(
      "circle",
      {
        cx: "50",
        cy: "50",
        r: 40,
        fill: "transparent",
        strokeWidth: "10",
        strokeDasharray: r,
        strokeDashoffset: o,
        className: "stroke-hello-csv-success-light transition-[stroke-dashoffset] duration-500"
      }
    )
  ] });
}
function r0() {
  return /* @__PURE__ */ p(tm, { className: "text-hello-csv-success absolute inset-0 m-auto h-12 w-12 stroke-4" });
}
function o0({ resetState: e }) {
  const { importProgress: t, mode: n } = ut(), r = n === "submit", { t: o } = ye();
  return /* @__PURE__ */ p("div", { className: "flex h-full p-10", children: /* @__PURE__ */ p("div", { className: "flex h-full w-full flex-col", children: /* @__PURE__ */ p("div", { className: "my-16 text-center", children: [
    /* @__PURE__ */ p("div", { className: "relative mx-auto h-24 w-24", children: [
      /* @__PURE__ */ p(n0, { progress: t, pending: r }),
      r && /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ p("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ p("b", { className: "text-lg", children: [
          t,
          "%"
        ] }) }),
        /* @__PURE__ */ p("h2", { className: "text-2xl", children: o("importer.loader.uploading") })
      ] }),
      !r && /* @__PURE__ */ p(r0, {})
    ] }),
    !r && /* @__PURE__ */ p("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ p("h2", { className: "text-2xl", children: o("importer.loader.success") }),
      /* @__PURE__ */ p("div", { className: "h-5" }),
      /* @__PURE__ */ p(He, { variant: "secondary", onClick: e, children: o("sheet.reset") })
    ] })
  ] }) }) });
}
function i0({
  onRetry: e,
  onBackToPreview: t,
  resetState: n,
  enumLabelDict: r
}) {
  const { mode: o } = ut();
  return /* @__PURE__ */ p("div", { className: "h-full overflow-auto", children: [
    o === "submit" && /* @__PURE__ */ p(o0, { resetState: n }),
    o === "failed" && /* @__PURE__ */ p(
      t0,
      {
        onRetry: e,
        onBackToPreview: t,
        enumLabelDict: r
      }
    ),
    o === "completed" && /* @__PURE__ */ p(e0, { resetState: n, enumLabelDict: r })
  ] });
}
async function gl(e) {
  await new Promise((t) => {
    setTimeout(t, e);
  });
}
const l0 = [
  "addRows",
  "removeRows",
  "editRows",
  "downloadCsv",
  "search",
  "resetState",
  "backToPreviousStep"
], s0 = ({ children: e }) => {
  const { theme: t } = ze();
  return re(() => {
    t && document.documentElement.setAttribute("hello-csv-data-theme", t);
  }, [t]), /* @__PURE__ */ p(fe, { children: e });
};
function a0({
  title: e,
  titleId: t,
  ...n
}, r) {
  return /* @__PURE__ */ P("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ P("title", {
    id: t
  }, e) : null, /* @__PURE__ */ P("path", {
    fillRule: "evenodd",
    d: "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    clipRule: "evenodd"
  }));
}
const u0 = /* @__PURE__ */ de(a0);
function c0({
  onSheetChange: e,
  sheetCountDict: t,
  idPrefix: n
}) {
  const { currentSheetId: r, validationErrors: o } = ut(), { sheets: i } = ze();
  return /* @__PURE__ */ p(
    wg,
    {
      tabs: i.map((l) => ({
        label: l.label + ` (${t[l.id]})`,
        value: l.id,
        icon: o.some((s) => s.sheetId === l.id) ? /* @__PURE__ */ p(u0, { className: "mr-3 h-4 w-4" }) : void 0
      })),
      activeTab: r,
      onTabChange: e,
      idPrefix: n
    }
  );
}
function d0({ onBackToMapping: e }) {
  const { t } = ye(), [n, r] = H(!1);
  return /* @__PURE__ */ p(fe, { children: [
    /* @__PURE__ */ p(
      He,
      {
        onClick: () => r(!0),
        variant: "secondary",
        children: t("importer.back")
      }
    ),
    /* @__PURE__ */ p(
      uo,
      {
        variant: "danger",
        onConfirm: e,
        open: n,
        setOpen: r,
        title: t("importer.backToMappingConfirmation.title"),
        subTitle: t("importer.backToMappingConfirmation.subTitle"),
        confirmationText: t(
          "importer.backToMappingConfirmation.confirmationText"
        ),
        cancelText: t("importer.backToMappingConfirmation.cancelText")
      }
    )
  ] });
}
function f0({ importerRequirements: e }) {
  const { t } = ye();
  return /* @__PURE__ */ p("div", { className: "h-full w-full space-y-5 overflow-y-auto", children: Object.entries(e).filter(([, n]) => n.length > 0).map(([n, r]) => {
    const o = n === "required" ? "required" : "optional";
    return /* @__PURE__ */ p("div", { className: "me-3", children: [
      /* @__PURE__ */ p("div", { className: "my-3 border-b border-gray-200 pb-4 text-sm font-light uppercase", children: t(`uploader.${o}Columns`) }),
      /* @__PURE__ */ p("div", { className: "mt-4", children: r.map((i) => /* @__PURE__ */ p(
        "div",
        {
          className: "my-3 flex justify-between",
          children: [
            /* @__PURE__ */ p("div", { className: "text-xs", children: i.columnLabel }),
            /* @__PURE__ */ p("div", { className: "text-xs font-light", children: /* @__PURE__ */ p(
              Ht,
              {
                tooltipText: t(`uploader.${o}ColumnsTooltip`),
                children: /* @__PURE__ */ p(um, { className: "size-5 text-gray-500" })
              }
            ) })
          ]
        },
        `${i.sheetId}-${i.columnId}`
      )) })
    ] }, n);
  }) });
}
function p0({ importerRequirements: e }) {
  const { t } = ye();
  return /* @__PURE__ */ p("div", { className: "flex h-full flex-col space-y-5", children: [
    /* @__PURE__ */ p("div", { className: "me-3", children: /* @__PURE__ */ p(ti, { variant: "info", description: t("uploader.importerInformation") }) }),
    /* @__PURE__ */ p("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ p(f0, { importerRequirements: e }) })
  ] });
}
function m0({ setFile: e, onEnterDataManually: t }) {
  const { maxFileSizeInBytes: n, customFileLoaders: r, allowManualDataEntry: o } = ze(), { t: i, tHtml: l } = ye(), s = k(null), [a, u] = H(!1), [c, d] = H(null), m = Jm.concat(
    (r == null ? void 0 : r.map((w) => w.mimeType)) ?? []
  ), f = Qm, g = ["CSV", "TSV"].concat((r == null ? void 0 : r.map((w) => w.label)) ?? []).join(", "), h = (w, y) => {
    const C = Ah(w.name);
    if (!(m.includes(w.type) || f.includes(C))) {
      d(
        i("uploader.unsupportedFileType", { formats: g })
      );
      return;
    }
    if (w.size > y) {
      d(
        i("uploader.fileTooLarge", { size: fn(y) })
      );
      return;
    }
    d(null), e(w);
  }, v = (w) => {
    var C;
    const y = w.target;
    (C = y.files) != null && C.length && h(y.files[0], n);
  }, x = (w) => {
    var y;
    w.preventDefault(), u(!1), (y = w.dataTransfer) != null && y.files.length && h(w.dataTransfer.files[0], n);
  };
  return /* @__PURE__ */ p(ql, { variant: "muted", withPadding: !1, className: "h-full", children: /* @__PURE__ */ p(
    "div",
    {
      className: `flex h-full flex-col p-5 transition-colors ${a ? "bg-hello-csv-muted-light" : "bg-hello-csv-muted"}`,
      onClick: () => {
        var w;
        return (w = s.current) == null ? void 0 : w.click();
      },
      onDragOver: (w) => {
        w.preventDefault(), u(!0);
      },
      onDragEnter: () => u(!0),
      onDragLeave: () => u(!1),
      onDrop: (w) => x(w),
      children: [
        /* @__PURE__ */ p("div", { className: "flex flex-1 flex-col items-center justify-center", children: [
          /* @__PURE__ */ p(rm, { className: "text-hello-csv-primary h-12 w-12" }),
          /* @__PURE__ */ p("p", { className: "mt-3 text-center", children: i("uploader.dragAndDrop") }),
          /* @__PURE__ */ p("div", { className: "mt-3 text-sm text-gray-500", children: [
            l("uploader.maxFileSizeInBytes", {
              size: /* @__PURE__ */ p("b", { children: fn(n) })
            }),
            " ",
            "•",
            " ",
            ["CSV", "TSV"].concat((r == null ? void 0 : r.map((w) => w.label)) ?? []).join(", ")
          ] }),
          /* @__PURE__ */ p("div", { className: "mt-3", children: /* @__PURE__ */ p(He, { children: i("uploader.browseFiles") }) }),
          c && /* @__PURE__ */ p("div", { className: "mt-2", children: /* @__PURE__ */ p(Ma, { children: c }) }),
          o && /* @__PURE__ */ p("div", { className: "mt-3 text-sm", children: /* @__PURE__ */ p(
            "p",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": i("uploader.enterManually"),
              onClick: (w) => {
                w.stopPropagation(), t == null || t();
              },
              className: "text-hello-csv-primary hover:text-hello-csv-primary cursor-pointer decoration-2 opacity-90 hover:underline focus:underline focus:outline-none",
              children: i("uploader.enterManually")
            }
          ) })
        ] }),
        /* @__PURE__ */ p(
          "input",
          {
            "aria-label": i("uploader.uploadAFile"),
            ref: s,
            type: "file",
            accept: m.concat(f).join(","),
            className: "sr-only",
            onChange: (w) => v(w)
          }
        )
      ]
    }
  ) });
}
function g0({
  onFileUploaded: e,
  onEnterDataManually: t
}) {
  const { sheets: n } = ze(), r = Ph(n), { t: o } = ye();
  return /* @__PURE__ */ p("div", { className: "flex h-full flex-col space-y-4", children: [
    /* @__PURE__ */ p("div", { className: "flex-none text-2xl", children: o("uploader.uploadAFile") }),
    /* @__PURE__ */ p("div", { className: "flex-auto md:min-h-0", children: /* @__PURE__ */ p("div", { className: "flex h-full flex-col-reverse gap-5 md:flex-row", children: [
      /* @__PURE__ */ p("div", { className: "h-full flex-1 lg:flex-1", children: /* @__PURE__ */ p(p0, { importerRequirements: r }) }),
      /* @__PURE__ */ p("div", { className: "flex-1 lg:flex-2", children: /* @__PURE__ */ p(
        m0,
        {
          setFile: e,
          onEnterDataManually: t
        }
      ) })
    ] }) })
  ] });
}
function h0(e) {
  const {
    onComplete: t,
    sheets: n,
    preventUploadOnValidationErrors: r,
    availableActions: o
  } = e, { t: i } = ye(), l = k(!0), s = k(null), a = ut(), u = Yh(), c = Me(), { mode: d, currentSheetId: m, sheetData: f, columnMappings: g, validationErrors: h } = a;
  re(() => {
    var M;
    if (l.current) {
      l.current = !1;
      return;
    }
    (M = s.current) == null || M.scrollIntoView({ behavior: "smooth" });
  }, [d]);
  const v = f.find(
    (M) => M.sheetId === m
  ), x = W(() => Object.fromEntries(
    f.map((M) => [M.sheetId, M.rows.length])
  ), [f]), w = n.find(
    (M) => M.id === m
  ), y = rh(n), $ = (typeof r == "function" ? (r == null ? void 0 : r(h)) ?? !1 : r ?? !1) && h.length > 0, O = new ho(e, a);
  async function R(M) {
    await O.uploadFile(M), O.dispatchChange(u);
  }
  function _() {
    O.setEnterDataManually(), O.dispatchChange(u);
  }
  function b(M) {
    O.setMappings(M), O.dispatchChange(u);
  }
  async function S() {
    await O.confirmMappings(), O.dispatchChange(u);
  }
  function E(M) {
    O.changeCell(M), O.dispatchChange(u);
  }
  function T(M) {
    O.removeRows(M), O.dispatchChange(u);
  }
  function F() {
    u({ type: "ADD_EMPTY_ROW" });
  }
  function A() {
    u({ type: "RESET" });
  }
  async function j() {
    u({ type: "PROGRESS", payload: { progress: 0 } }), u({ type: "SUBMIT" });
    try {
      const M = Qo(n, f), K = await t(
        { ...a, sheetData: M },
        (N) => {
          u({ type: "PROGRESS", payload: { progress: N } });
        },
        a.sheetDefinitions.map((N) => {
          var B;
          return {
            file: Jo(
              N,
              ((B = M.find((I) => I.sheetId === N.id)) == null ? void 0 : B.rows) ?? [],
              {},
              "value"
            ),
            sheetId: N.id
          };
        })
      );
      await gl(400), u({ type: "PROGRESS", payload: { progress: 100 } }), await gl(200), u({
        type: "COMPLETED",
        payload: { importStatistics: K ?? void 0 }
      });
    } catch {
      u({ type: "FAILED" });
    }
  }
  function G() {
    u({ type: "PREVIEW" });
  }
  function z() {
    u({ type: "UPLOAD" });
  }
  function V() {
    u({ type: "MAPPING" });
  }
  return /* @__PURE__ */ p(s0, { children: /* @__PURE__ */ p(sg, { ref: s, children: [
    d === "upload" && /* @__PURE__ */ p(
      g0,
      {
        onFileUploaded: R,
        onEnterDataManually: _
      }
    ),
    d === "mapping" && /* @__PURE__ */ p(
      Xh,
      {
        onMappingsChanged: b,
        onMappingsSet: S,
        onBack: z
      }
    ),
    d === "preview" && // TODO: Move these to separate component in future PR
    /* @__PURE__ */ p("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ p("div", { className: "flex-none", children: /* @__PURE__ */ p(
        c0,
        {
          idPrefix: c,
          sheetCountDict: x,
          onSheetChange: (M) => u({ type: "SHEET_CHANGED", payload: { sheetId: M } })
        }
      ) }),
      /* @__PURE__ */ p(
        "div",
        {
          className: "flex-1 overflow-auto",
          role: "tabpanel",
          id: `${c}-tabpanel-${m}`,
          "aria-labelledby": `${c}-tab-${m}`,
          tabIndex: 0,
          children: /* @__PURE__ */ p(
            Zv,
            {
              data: v,
              sheetDefinition: w,
              sheetValidationErrors: h.filter(
                (M) => M.sheetId === (w == null ? void 0 : w.id)
              ),
              setRowData: E,
              removeRows: T,
              addEmptyRow: F,
              resetState: A,
              enumLabelDict: y
            }
          )
        }
      ),
      /* @__PURE__ */ p("div", { className: "flex-none", children: v.rows.length > 0 && /* @__PURE__ */ p("div", { className: "mt-5 flex justify-between", children: [
        /* @__PURE__ */ p("div", { children: g != null && o.includes("backToPreviousStep") && /* @__PURE__ */ p(
          d0,
          {
            onBackToMapping: V
          }
        ) }),
        /* @__PURE__ */ p(
          Ht,
          {
            tooltipText: i("importer.uploadBlocked"),
            hidden: !$,
            children: /* @__PURE__ */ p(He, { onClick: j, disabled: $, children: i("importer.upload") })
          }
        )
      ] }) })
    ] }),
    (d === "submit" || d === "failed" || d === "completed") && /* @__PURE__ */ p(
      i0,
      {
        onRetry: j,
        onBackToPreview: G,
        resetState: A,
        enumLabelDict: y
      }
    )
  ] }) });
}
function v0(e) {
  const t = {
    ...e,
    maxFileSizeInBytes: e.maxFileSizeInBytes ?? 20971520,
    // 20MB,
    persistenceConfig: e.persistenceConfig ?? { enabled: !1 },
    csvDownloadMode: e.csvDownloadMode ?? "value",
    allowManualDataEntry: e.allowManualDataEntry ?? !1,
    availableActions: e.availableActions ?? [...l0]
  };
  return /* @__PURE__ */ p(Wm, { importerDefintion: t, children: /* @__PURE__ */ p(
    Kh,
    {
      sheets: t.sheets,
      persistenceConfig: t.persistenceConfig,
      initialState: t.initialState,
      onStateChanged: t.onStateChanged,
      children: /* @__PURE__ */ p(Xm, { children: /* @__PURE__ */ p(h0, { ...t }) })
    }
  ) });
}
function x0(e, t) {
  Iu(e).render(P(v0, t));
}
export {
  b0 as CsvImporterStateBuilder,
  l0 as availableActionList,
  v0 as default,
  x0 as renderImporter
};
