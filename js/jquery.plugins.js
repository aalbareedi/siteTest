/**
 * Stellar.js v0.6.2
 * Copyright 2013, Mark Dalgleish
 * http://markdalgleish.com/projects/stellar.js
 * http://markdalgleish.mit-license.org
 **/
!(function (a, b, c, d) {
  function e(b, c) {
    (this.element = b),
      (this.options = a.extend({}, g, c)),
      (this._defaults = g),
      (this._name = f),
      this.init();
  }
  var f = "stellar",
    g = {
      scrollProperty: "scroll",
      positionProperty: "position",
      horizontalScrolling: !0,
      verticalScrolling: !0,
      horizontalOffset: 0,
      verticalOffset: 0,
      responsive: !1,
      parallaxBackgrounds: !0,
      parallaxElements: !0,
      hideDistantElements: !0,
      hideElement: function (a) {
        a.hide();
      },
      showElement: function (a) {
        a.show();
      },
    },
    h = {
      scroll: {
        getLeft: function (a) {
          return a.scrollLeft();
        },
        setLeft: function (a, b) {
          a.scrollLeft(b);
        },
        getTop: function (a) {
          return a.scrollTop();
        },
        setTop: function (a, b) {
          a.scrollTop(b);
        },
      },
      position: {
        getLeft: function (a) {
          return -1 * parseInt(a.css("left"), 10);
        },
        getTop: function (a) {
          return -1 * parseInt(a.css("top"), 10);
        },
      },
      margin: {
        getLeft: function (a) {
          return -1 * parseInt(a.css("margin-left"), 10);
        },
        getTop: function (a) {
          return -1 * parseInt(a.css("margin-top"), 10);
        },
      },
      transform: {
        getLeft: function (a) {
          var b = getComputedStyle(a[0])[k];
          return "none" !== b
            ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[4], 10)
            : 0;
        },
        getTop: function (a) {
          var b = getComputedStyle(a[0])[k];
          return "none" !== b
            ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[5], 10)
            : 0;
        },
      },
    },
    i = {
      position: {
        setLeft: function (a, b) {
          a.css("left", b);
        },
        setTop: function (a, b) {
          a.css("top", b);
        },
      },
      transform: {
        setPosition: function (a, b, c, d, e) {
          a[0].style[k] =
            "translate3d(" + (b - c) + "px, " + (d - e) + "px, 0)";
        },
      },
    },
    j = (function () {
      var b,
        c = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        d = a("script")[0].style,
        e = "";
      for (b in d)
        if (c.test(b)) {
          e = b.match(c)[0];
          break;
        }
      return (
        "WebkitOpacity" in d && (e = "Webkit"),
        "KhtmlOpacity" in d && (e = "Khtml"),
        function (a) {
          return (
            e + (e.length > 0 ? a.charAt(0).toUpperCase() + a.slice(1) : a)
          );
        }
      );
    })(),
    k = j("transform"),
    l =
      a("<div />", { style: "background:#fff" }).css(
        "background-position-x"
      ) !== d,
    m = l
      ? function (a, b, c) {
          a.css({ "background-position-x": b, "background-position-y": c });
        }
      : function (a, b, c) {
          a.css("background-position", b + " " + c);
        },
    n = l
      ? function (a) {
          return [
            a.css("background-position-x"),
            a.css("background-position-y"),
          ];
        }
      : function (a) {
          return a.css("background-position").split(" ");
        },
    o =
      b.requestAnimationFrame ||
      b.webkitRequestAnimationFrame ||
      b.mozRequestAnimationFrame ||
      b.oRequestAnimationFrame ||
      b.msRequestAnimationFrame ||
      function (a) {
        setTimeout(a, 1e3 / 60);
      };
  (e.prototype = {
    init: function () {
      (this.options.name = f + "_" + Math.floor(1e9 * Math.random())),
        this._defineElements(),
        this._defineGetters(),
        this._defineSetters(),
        this._handleWindowLoadAndResize(),
        this._detectViewport(),
        this.refresh({ firstLoad: !0 }),
        "scroll" === this.options.scrollProperty
          ? this._handleScrollEvent()
          : this._startAnimationLoop();
    },
    _defineElements: function () {
      this.element === c.body && (this.element = b),
        (this.$scrollElement = a(this.element)),
        (this.$element = this.element === b ? a("body") : this.$scrollElement),
        (this.$viewportElement =
          this.options.viewportElement !== d
            ? a(this.options.viewportElement)
            : this.$scrollElement[0] === b ||
              "scroll" === this.options.scrollProperty
            ? this.$scrollElement
            : this.$scrollElement.parent());
    },
    _defineGetters: function () {
      var a = this,
        b = h[a.options.scrollProperty];
      (this._getScrollLeft = function () {
        return b.getLeft(a.$scrollElement);
      }),
        (this._getScrollTop = function () {
          return b.getTop(a.$scrollElement);
        });
    },
    _defineSetters: function () {
      var b = this,
        c = h[b.options.scrollProperty],
        d = i[b.options.positionProperty],
        e = c.setLeft,
        f = c.setTop;
      (this._setScrollLeft =
        "function" == typeof e
          ? function (a) {
              e(b.$scrollElement, a);
            }
          : a.noop),
        (this._setScrollTop =
          "function" == typeof f
            ? function (a) {
                f(b.$scrollElement, a);
              }
            : a.noop),
        (this._setPosition =
          d.setPosition ||
          function (a, c, e, f, g) {
            b.options.horizontalScrolling && d.setLeft(a, c, e),
              b.options.verticalScrolling && d.setTop(a, f, g);
          });
    },
    _handleWindowLoadAndResize: function () {
      var c = this,
        d = a(b);
      c.options.responsive &&
        d.bind("load." + this.name, function () {
          c.refresh();
        }),
        d.bind("resize." + this.name, function () {
          c._detectViewport(), c.options.responsive && c.refresh();
        });
    },
    refresh: function (c) {
      var d = this,
        e = d._getScrollLeft(),
        f = d._getScrollTop();
      (c && c.firstLoad) || this._reset(),
        this._setScrollLeft(0),
        this._setScrollTop(0),
        this._setOffsets(),
        this._findParticles(),
        this._findBackgrounds(),
        c &&
          c.firstLoad &&
          /WebKit/.test(navigator.userAgent) &&
          a(b).load(function () {
            var a = d._getScrollLeft(),
              b = d._getScrollTop();
            d._setScrollLeft(a + 1),
              d._setScrollTop(b + 1),
              d._setScrollLeft(a),
              d._setScrollTop(b);
          }),
        this._setScrollLeft(e),
        this._setScrollTop(f);
    },
    _detectViewport: function () {
      var a = this.$viewportElement.offset(),
        b = null !== a && a !== d;
      (this.viewportWidth = this.$viewportElement.width()),
        (this.viewportHeight = this.$viewportElement.height()),
        (this.viewportOffsetTop = b ? a.top : 0),
        (this.viewportOffsetLeft = b ? a.left : 0);
    },
    _findParticles: function () {
      {
        var b = this;
        this._getScrollLeft(), this._getScrollTop();
      }
      if (this.particles !== d)
        for (var c = this.particles.length - 1; c >= 0; c--)
          this.particles[c].$element.data("stellar-elementIsActive", d);
      (this.particles = []),
        this.options.parallaxElements &&
          this.$element.find("[data-stellar-ratio]").each(function () {
            var c,
              e,
              f,
              g,
              h,
              i,
              j,
              k,
              l,
              m = a(this),
              n = 0,
              o = 0,
              p = 0,
              q = 0;
            if (m.data("stellar-elementIsActive")) {
              if (m.data("stellar-elementIsActive") !== this) return;
            } else m.data("stellar-elementIsActive", this);
            b.options.showElement(m),
              m.data("stellar-startingLeft")
                ? (m.css("left", m.data("stellar-startingLeft")),
                  m.css("top", m.data("stellar-startingTop")))
                : (m.data("stellar-startingLeft", m.css("left")),
                  m.data("stellar-startingTop", m.css("top"))),
              (f = m.position().left),
              (g = m.position().top),
              (h =
                "auto" === m.css("margin-left")
                  ? 0
                  : parseInt(m.css("margin-left"), 10)),
              (i =
                "auto" === m.css("margin-top")
                  ? 0
                  : parseInt(m.css("margin-top"), 10)),
              (k = m.offset().left - h),
              (l = m.offset().top - i),
              m.parents().each(function () {
                var b = a(this);
                return b.data("stellar-offset-parent") === !0
                  ? ((n = p), (o = q), (j = b), !1)
                  : ((p += b.position().left), void (q += b.position().top));
              }),
              (c =
                m.data("stellar-horizontal-offset") !== d
                  ? m.data("stellar-horizontal-offset")
                  : j !== d && j.data("stellar-horizontal-offset") !== d
                  ? j.data("stellar-horizontal-offset")
                  : b.horizontalOffset),
              (e =
                m.data("stellar-vertical-offset") !== d
                  ? m.data("stellar-vertical-offset")
                  : j !== d && j.data("stellar-vertical-offset") !== d
                  ? j.data("stellar-vertical-offset")
                  : b.verticalOffset),
              b.particles.push({
                $element: m,
                $offsetParent: j,
                isFixed: "fixed" === m.css("position"),
                horizontalOffset: c,
                verticalOffset: e,
                startingPositionLeft: f,
                startingPositionTop: g,
                startingOffsetLeft: k,
                startingOffsetTop: l,
                parentOffsetLeft: n,
                parentOffsetTop: o,
                stellarRatio:
                  m.data("stellar-ratio") !== d ? m.data("stellar-ratio") : 1,
                width: m.outerWidth(!0),
                height: m.outerHeight(!0),
                isHidden: !1,
              });
          });
    },
    _findBackgrounds: function () {
      var b,
        c = this,
        e = this._getScrollLeft(),
        f = this._getScrollTop();
      (this.backgrounds = []),
        this.options.parallaxBackgrounds &&
          ((b = this.$element.find("[data-stellar-background-ratio]")),
          this.$element.data("stellar-background-ratio") &&
            (b = b.add(this.$element)),
          b.each(function () {
            var b,
              g,
              h,
              i,
              j,
              k,
              l,
              o = a(this),
              p = n(o),
              q = 0,
              r = 0,
              s = 0,
              t = 0;
            if (o.data("stellar-backgroundIsActive")) {
              if (o.data("stellar-backgroundIsActive") !== this) return;
            } else o.data("stellar-backgroundIsActive", this);
            o.data("stellar-backgroundStartingLeft")
              ? m(
                  o,
                  o.data("stellar-backgroundStartingLeft"),
                  o.data("stellar-backgroundStartingTop")
                )
              : (o.data("stellar-backgroundStartingLeft", p[0]),
                o.data("stellar-backgroundStartingTop", p[1])),
              (h =
                "auto" === o.css("margin-left")
                  ? 0
                  : parseInt(o.css("margin-left"), 10)),
              (i =
                "auto" === o.css("margin-top")
                  ? 0
                  : parseInt(o.css("margin-top"), 10)),
              (j = o.offset().left - h - e),
              (k = o.offset().top - i - f),
              o.parents().each(function () {
                var b = a(this);
                return b.data("stellar-offset-parent") === !0
                  ? ((q = s), (r = t), (l = b), !1)
                  : ((s += b.position().left), void (t += b.position().top));
              }),
              (b =
                o.data("stellar-horizontal-offset") !== d
                  ? o.data("stellar-horizontal-offset")
                  : l !== d && l.data("stellar-horizontal-offset") !== d
                  ? l.data("stellar-horizontal-offset")
                  : c.horizontalOffset),
              (g =
                o.data("stellar-vertical-offset") !== d
                  ? o.data("stellar-vertical-offset")
                  : l !== d && l.data("stellar-vertical-offset") !== d
                  ? l.data("stellar-vertical-offset")
                  : c.verticalOffset),
              c.backgrounds.push({
                $element: o,
                $offsetParent: l,
                isFixed: "fixed" === o.css("background-attachment"),
                horizontalOffset: b,
                verticalOffset: g,
                startingValueLeft: p[0],
                startingValueTop: p[1],
                startingBackgroundPositionLeft: isNaN(parseInt(p[0], 10))
                  ? 0
                  : parseInt(p[0], 10),
                startingBackgroundPositionTop: isNaN(parseInt(p[1], 10))
                  ? 0
                  : parseInt(p[1], 10),
                startingPositionLeft: o.position().left,
                startingPositionTop: o.position().top,
                startingOffsetLeft: j,
                startingOffsetTop: k,
                parentOffsetLeft: q,
                parentOffsetTop: r,
                stellarRatio:
                  o.data("stellar-background-ratio") === d
                    ? 1
                    : o.data("stellar-background-ratio"),
              });
          }));
    },
    _reset: function () {
      var a, b, c, d, e;
      for (e = this.particles.length - 1; e >= 0; e--)
        (a = this.particles[e]),
          (b = a.$element.data("stellar-startingLeft")),
          (c = a.$element.data("stellar-startingTop")),
          this._setPosition(a.$element, b, b, c, c),
          this.options.showElement(a.$element),
          a.$element
            .data("stellar-startingLeft", null)
            .data("stellar-elementIsActive", null)
            .data("stellar-backgroundIsActive", null);
      for (e = this.backgrounds.length - 1; e >= 0; e--)
        (d = this.backgrounds[e]),
          d.$element
            .data("stellar-backgroundStartingLeft", null)
            .data("stellar-backgroundStartingTop", null),
          m(d.$element, d.startingValueLeft, d.startingValueTop);
    },
    destroy: function () {
      this._reset(),
        this.$scrollElement
          .unbind("resize." + this.name)
          .unbind("scroll." + this.name),
        (this._animationLoop = a.noop),
        a(b)
          .unbind("load." + this.name)
          .unbind("resize." + this.name);
    },
    _setOffsets: function () {
      var c = this,
        d = a(b);
      d
        .unbind("resize.horizontal-" + this.name)
        .unbind("resize.vertical-" + this.name),
        "function" == typeof this.options.horizontalOffset
          ? ((this.horizontalOffset = this.options.horizontalOffset()),
            d.bind("resize.horizontal-" + this.name, function () {
              c.horizontalOffset = c.options.horizontalOffset();
            }))
          : (this.horizontalOffset = this.options.horizontalOffset),
        "function" == typeof this.options.verticalOffset
          ? ((this.verticalOffset = this.options.verticalOffset()),
            d.bind("resize.vertical-" + this.name, function () {
              c.verticalOffset = c.options.verticalOffset();
            }))
          : (this.verticalOffset = this.options.verticalOffset);
    },
    _repositionElements: function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = this._getScrollLeft(),
        l = this._getScrollTop(),
        n = !0,
        o = !0;
      if (
        this.currentScrollLeft !== k ||
        this.currentScrollTop !== l ||
        this.currentWidth !== this.viewportWidth ||
        this.currentHeight !== this.viewportHeight
      ) {
        for (
          this.currentScrollLeft = k,
            this.currentScrollTop = l,
            this.currentWidth = this.viewportWidth,
            this.currentHeight = this.viewportHeight,
            j = this.particles.length - 1;
          j >= 0;
          j--
        )
          (a = this.particles[j]),
            (b = a.isFixed ? 1 : 0),
            this.options.horizontalScrolling
              ? ((f =
                  (k +
                    a.horizontalOffset +
                    this.viewportOffsetLeft +
                    a.startingPositionLeft -
                    a.startingOffsetLeft +
                    a.parentOffsetLeft) *
                    -(a.stellarRatio + b - 1) +
                  a.startingPositionLeft),
                (h = f - a.startingPositionLeft + a.startingOffsetLeft))
              : ((f = a.startingPositionLeft), (h = a.startingOffsetLeft)),
            this.options.verticalScrolling
              ? ((g =
                  (l +
                    a.verticalOffset +
                    this.viewportOffsetTop +
                    a.startingPositionTop -
                    a.startingOffsetTop +
                    a.parentOffsetTop) *
                    -(a.stellarRatio + b - 1) +
                  a.startingPositionTop),
                (i = g - a.startingPositionTop + a.startingOffsetTop))
              : ((g = a.startingPositionTop), (i = a.startingOffsetTop)),
            this.options.hideDistantElements &&
              ((o =
                !this.options.horizontalScrolling ||
                (h + a.width > (a.isFixed ? 0 : k) &&
                  h <
                    (a.isFixed ? 0 : k) +
                      this.viewportWidth +
                      this.viewportOffsetLeft)),
              (n =
                !this.options.verticalScrolling ||
                (i + a.height > (a.isFixed ? 0 : l) &&
                  i <
                    (a.isFixed ? 0 : l) +
                      this.viewportHeight +
                      this.viewportOffsetTop))),
            o && n
              ? (a.isHidden &&
                  (this.options.showElement(a.$element), (a.isHidden = !1)),
                this._setPosition(
                  a.$element,
                  f,
                  a.startingPositionLeft,
                  g,
                  a.startingPositionTop
                ))
              : a.isHidden ||
                (this.options.hideElement(a.$element), (a.isHidden = !0));
        for (j = this.backgrounds.length - 1; j >= 0; j--)
          (c = this.backgrounds[j]),
            (b = c.isFixed ? 0 : 1),
            (d = this.options.horizontalScrolling
              ? (k +
                  c.horizontalOffset -
                  this.viewportOffsetLeft -
                  c.startingOffsetLeft +
                  c.parentOffsetLeft -
                  c.startingBackgroundPositionLeft) *
                  (b - c.stellarRatio) +
                "px"
              : c.startingValueLeft),
            (e = this.options.verticalScrolling
              ? (l +
                  c.verticalOffset -
                  this.viewportOffsetTop -
                  c.startingOffsetTop +
                  c.parentOffsetTop -
                  c.startingBackgroundPositionTop) *
                  (b - c.stellarRatio) +
                "px"
              : c.startingValueTop),
            m(c.$element, d, e);
      }
    },
    _handleScrollEvent: function () {
      var a = this,
        b = !1,
        c = function () {
          a._repositionElements(), (b = !1);
        },
        d = function () {
          b || (o(c), (b = !0));
        };
      this.$scrollElement.bind("scroll." + this.name, d), d();
    },
    _startAnimationLoop: function () {
      var a = this;
      (this._animationLoop = function () {
        o(a._animationLoop), a._repositionElements();
      }),
        this._animationLoop();
    },
  }),
    (a.fn[f] = function (b) {
      var c = arguments;
      return b === d || "object" == typeof b
        ? this.each(function () {
            a.data(this, "plugin_" + f) ||
              a.data(this, "plugin_" + f, new e(this, b));
          })
        : "string" == typeof b && "_" !== b[0] && "init" !== b
        ? this.each(function () {
            var d = a.data(this, "plugin_" + f);
            d instanceof e &&
              "function" == typeof d[b] &&
              d[b].apply(d, Array.prototype.slice.call(c, 1)),
              "destroy" === b && a.data(this, "plugin_" + f, null);
          })
        : void 0;
    }),
    (a[f] = function () {
      var c = a(b);
      return c.stellar.apply(c, Array.prototype.slice.call(arguments, 0));
    }),
    (a[f].scrollProperty = h),
    (a[f].positionProperty = i),
    (b.Stellar = e);
})(jQuery, this, document);

/**
 * Before After
 * TwentyTwenty
 * http://zurb.com/playground/twentytwenty
 */

!(function (_) {
  _.fn.twentytwenty = function (h) {
    h = _.extend(
      {
        default_offset_pct: 0.5,
        orientation: "horizontal",
        before_label: "Before",
        after_label: "After",
        no_overlay: !1,
        move_slider_on_hover: !1,
        move_with_handle_only: !0,
        click_to_move: !1,
      },
      h
    );
    return this.each(function () {
      var e = h.default_offset_pct,
        a = _(this),
        i = h.orientation,
        t = "vertical" === i ? "down" : "left",
        n = "vertical" === i ? "up" : "right";
      a.data("before") && (h.before_label = a.data("before")),
        a.data("after") && (h.after_label = a.data("after")),
        a.wrap(
          "<div class='twentytwenty-wrapper twentytwenty-" + i + "'></div>"
        ),
        h.no_overlay ||
          (a.append("<div class='twentytwenty-overlay'></div>"),
          (y = a.find(".twentytwenty-overlay")).append(
            "<div class='twentytwenty-before-label' data-content='" +
              h.before_label +
              "'></div>"
          ),
          y.append(
            "<div class='twentytwenty-after-label' data-content='" +
              h.after_label +
              "'></div>"
          ));
      var o = a.find("img:first"),
        s = a.find("img:last");
      a.append("<div class='twentytwenty-handle'></div>");
      var r = a.find(".twentytwenty-handle");
      r.append("<span class='twentytwenty-" + t + "-arrow'></span>"),
        r.append("<span class='twentytwenty-" + n + "-arrow'></span>"),
        a.addClass("twentytwenty-container"),
        o.addClass("twentytwenty-before"),
        s.addClass("twentytwenty-after");
      function d(t) {
        var e,
          n,
          t =
            ((e = t),
            (n = o.width()),
            (t = o.height()),
            { w: n + "px", h: t + "px", cw: e * n + "px", ch: e * t + "px" });
        r.css(
          "vertical" === i ? "top" : "left",
          "vertical" === i ? t.ch : t.cw
        ),
          (t = t),
          "vertical" === i
            ? (o.css("clip", "rect(0," + t.w + "," + t.ch + ",0)"),
              s.css("clip", "rect(" + t.ch + "," + t.w + "," + t.h + ",0)"))
            : (o.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"),
              s.css("clip", "rect(0," + t.w + "," + t.h + "," + t.cw + ")")),
          a.css("height", t.h);
      }
      function l(t, e) {
        var n;
        return (
          (n = "vertical" === i ? (e - w) / p : (t - f) / v),
          (e = 0),
          (t = 1),
          Math.max(e, Math.min(t, n))
        );
      }
      _(window).on("resize.twentytwenty", function (t) {
        d(e);
      });
      function c(t) {
        ((((t.distX > t.distY && t.distX < -t.distY) ||
          (t.distX < t.distY && t.distX > -t.distY)) &&
          "vertical" !== i) ||
          (((t.distX < t.distY && t.distX < -t.distY) ||
            (t.distX > t.distY && t.distX > -t.distY)) &&
            "vertical" === i)) &&
          t.preventDefault(),
          a.addClass("active"),
          (f = a.offset().left),
          (w = a.offset().top),
          (v = o.width()),
          (p = o.height());
      }
      var f = 0,
        w = 0,
        v = 0,
        p = 0,
        y = function (t) {
          a.hasClass("active") && ((e = l(t.pageX, t.pageY)), d(e));
        },
        t = function () {
          a.removeClass("active");
        },
        n = h.move_with_handle_only ? r : a;
      n.on("movestart", c),
        n.on("move", y),
        n.on("moveend", t),
        h.move_slider_on_hover &&
          (a.on("mouseenter", c), a.on("mousemove", y), a.on("mouseleave", t)),
        r.on("touchmove", function (t) {
          t.preventDefault();
        }),
        a.find("img").on("mousedown", function (t) {
          t.preventDefault();
        }),
        h.click_to_move &&
          a.on("click", function (t) {
            (f = a.offset().left),
              (w = a.offset().top),
              (v = o.width()),
              (p = o.height()),
              (e = l(t.pageX, t.pageY)),
              d(e);
          }),
        _(window).trigger("resize.twentytwenty");
    });
  };
})(jQuery);

/**
 * Event Move
 * required for: TwentyTwenty
 * 2.0.0 | Stephen Band
 */

!(function (e) {
  "function" == typeof define && define.amd
    ? define([], e)
    : "undefined" != typeof module && null !== module && module.exports
    ? (module.exports = e)
    : e();
})(function () {
  var e = Object.assign || (window.jQuery && jQuery.extend),
    t = 8,
    n =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (e, t) {
        return window.setTimeout(function () {
          e();
        }, 25);
      },
    i = { textarea: !0, input: !0, select: !0, button: !0 },
    o = { move: "mousemove", cancel: "mouseup dragstart", end: "mouseup" },
    a = { move: "touchmove", cancel: "touchend", end: "touchend" },
    c = /\s+/,
    u = { bubbles: !0, cancelable: !0 },
    r = Symbol("events");
  function d(e) {
    return e[r] || (e[r] = {});
  }
  function m(e, t, n, i, o) {
    t = t.split(c);
    var a,
      u = d(e),
      r = t.length;
    function m(e) {
      n(e, i);
    }
    for (; r--; )
      (u[(a = t[r])] || (u[a] = [])).push([n, m]), e.addEventListener(a, m);
  }
  function f(e, t, n, i) {
    t = t.split(c);
    var o,
      a,
      u,
      r = d(e),
      m = t.length;
    if (r)
      for (; m--; )
        if ((a = r[(o = t[m])]))
          for (u = a.length; u--; )
            a[u][0] === n &&
              (e.removeEventListener(o, a[u][1]), a.splice(u, 1));
  }
  function v(t, n, i) {
    var o = (function (e) {
      return new CustomEvent(e, u);
    })(n);
    i && e(o, i), t.dispatchEvent(o);
  }
  function s(e) {
    var t = e,
      i = !1,
      o = !1;
    function a(e) {
      i ? (t(), n(a), (o = !0), (i = !1)) : (o = !1);
    }
    (this.kick = function (e) {
      (i = !0), o || a();
    }),
      (this.end = function (e) {
        var n = t;
        e &&
          (o
            ? ((t = i
                ? function () {
                    n(), e();
                  }
                : e),
              (i = !0))
            : e());
      });
  }
  function l() {}
  function g(e) {
    e.preventDefault();
  }
  function p(e, t) {
    var n, i;
    if (e.identifiedTouch) return e.identifiedTouch(t);
    for (n = -1, i = e.length; ++n < i; )
      if (e[n].identifier === t) return e[n];
  }
  function h(e, t) {
    var n = p(e.changedTouches, t.identifier);
    if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n;
  }
  function X(e, t) {
    T(e, t, e, y);
  }
  function Y(e, t) {
    y();
  }
  function y() {
    f(document, o.move, X), f(document, o.cancel, Y);
  }
  function w(e) {
    f(document, a.move, e.touchmove), f(document, a.cancel, e.touchend);
  }
  function T(e, n, i, o) {
    var a = i.pageX - n.pageX,
      c = i.pageY - n.pageY;
    a * a + c * c < t * t ||
      (function (e, t, n, i, o, a) {
        var c = e.targetTouches,
          u = e.timeStamp - t.timeStamp,
          r = {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            startX: t.pageX,
            startY: t.pageY,
            distX: i,
            distY: o,
            deltaX: i,
            deltaY: o,
            pageX: n.pageX,
            pageY: n.pageY,
            velocityX: i / u,
            velocityY: o / u,
            identifier: t.identifier,
            targetTouches: c,
            finger: c ? c.length : 1,
            enableMove: function () {
              (this.moveEnabled = !0),
                (this.enableMove = l),
                e.preventDefault();
            },
          };
        v(t.target, "movestart", r), a(t);
      })(e, n, i, a, c, o);
  }
  function b(e, t) {
    var n = t.timer;
    (t.touch = e), (t.timeStamp = e.timeStamp), n.kick();
  }
  function S(e, t) {
    var n = t.target,
      i = t.event,
      a = t.timer;
    f(document, o.move, b),
      f(document, o.end, S),
      K(n, i, a, function () {
        setTimeout(function () {
          f(n, "click", g);
        }, 0);
      });
  }
  function k(e, t) {
    var n = t.target,
      i = t.event,
      o = t.timer;
    p(e.changedTouches, i.identifier) &&
      (!(function (e) {
        f(document, a.move, e.activeTouchmove),
          f(document, a.end, e.activeTouchend);
      })(t),
      K(n, i, o));
  }
  function K(e, t, n, i) {
    n.end(function () {
      return v(e, "moveend", t), i && i();
    });
  }
  if (
    (m(document, "mousedown", function (e) {
      (function (e) {
        return 1 === e.which && !e.ctrlKey && !e.altKey;
      })(e) &&
        ((function (e) {
          return !!e.target.tagName && !!i[e.target.tagName.toLowerCase()];
        })(e) ||
          (m(document, o.move, X, e), m(document, o.cancel, Y, e)));
    }),
    m(document, "touchstart", function (e) {
      if (!i[e.target.tagName.toLowerCase()]) {
        var t = e.changedTouches[0],
          n = {
            target: t.target,
            pageX: t.pageX,
            pageY: t.pageY,
            identifier: t.identifier,
            touchmove: function (e, t) {
              !(function (e, t) {
                var n = h(e, t);
                n && T(e, t, n, w);
              })(e, t);
            },
            touchend: function (e, t) {
              !(function (e, t) {
                p(e.changedTouches, t.identifier) && w(t);
              })(e, t);
            },
          };
        m(document, a.move, n.touchmove, n),
          m(document, a.cancel, n.touchend, n);
      }
    }),
    m(document, "movestart", function (e) {
      if (!e.defaultPrevented && e.moveEnabled) {
        var t = {
            startX: e.startX,
            startY: e.startY,
            pageX: e.pageX,
            pageY: e.pageY,
            distX: e.distX,
            distY: e.distY,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            velocityX: e.velocityX,
            velocityY: e.velocityY,
            identifier: e.identifier,
            targetTouches: e.targetTouches,
            finger: e.finger,
          },
          n = {
            target: e.target,
            event: t,
            timer: new s(function (e) {
              (function (e, t, n) {
                var i = n - e.timeStamp;
                (e.distX = t.pageX - e.startX),
                  (e.distY = t.pageY - e.startY),
                  (e.deltaX = t.pageX - e.pageX),
                  (e.deltaY = t.pageY - e.pageY),
                  (e.velocityX = 0.3 * e.velocityX + (0.7 * e.deltaX) / i),
                  (e.velocityY = 0.3 * e.velocityY + (0.7 * e.deltaY) / i),
                  (e.pageX = t.pageX),
                  (e.pageY = t.pageY);
              })(t, n.touch, n.timeStamp),
                v(n.target, "move", t);
            }),
            touch: void 0,
            timeStamp: e.timeStamp,
          };
        void 0 === e.identifier
          ? (m(e.target, "click", g),
            m(document, o.move, b, n),
            m(document, o.end, S, n))
          : ((n.activeTouchmove = function (e, t) {
              !(function (e, t) {
                var n = t.event,
                  i = t.timer,
                  o = h(e, n);
                o &&
                  (e.preventDefault(),
                  (n.targetTouches = e.targetTouches),
                  (t.touch = o),
                  (t.timeStamp = e.timeStamp),
                  i.kick());
              })(e, t);
            }),
            (n.activeTouchend = function (e, t) {
              k(e, t);
            }),
            m(document, a.move, n.activeTouchmove, n),
            m(document, a.end, n.activeTouchend, n));
      }
    }),
    window.jQuery)
  ) {
    var j =
      "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(
        " "
      );
    (jQuery.event.special.movestart = {
      setup: function () {
        return m(this, "movestart", E), !1;
      },
      teardown: function () {
        return f(this, "movestart", E), !1;
      },
      add: A,
    }),
      (jQuery.event.special.move = {
        setup: function () {
          return m(this, "movestart", Q), !1;
        },
        teardown: function () {
          return f(this, "movestart", Q), !1;
        },
        add: A,
      }),
      (jQuery.event.special.moveend = {
        setup: function () {
          return m(this, "movestart", q), !1;
        },
        teardown: function () {
          return f(this, "movestart", q), !1;
        },
        add: A,
      });
  }
  function E(e) {
    e.enableMove();
  }
  function Q(e) {
    e.enableMove();
  }
  function q(e) {
    e.enableMove();
  }
  function A(e) {
    var t = e.handler;
    e.handler = function (e) {
      for (var n, i = j.length; i--; ) e[(n = j[i])] = e.originalEvent[n];
      t.apply(this, arguments);
    };
  }
});

/**
 * Chart
 * easyPieChart
 * 2.1.7 | Robert Fleischmann
 */

!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery);
})(this, function (a) {
  var b = function (a, b) {
      var c,
        d = document.createElement("canvas");
      a.appendChild(d),
        "object" == typeof G_vmlCanvasManager &&
          G_vmlCanvasManager.initElement(d);
      var e = d.getContext("2d");
      d.width = d.height = b.size;
      var f = 1;
      window.devicePixelRatio > 1 &&
        ((f = window.devicePixelRatio),
        (d.style.width = d.style.height = [b.size, "px"].join("")),
        (d.width = d.height = b.size * f),
        e.scale(f, f)),
        e.translate(b.size / 2, b.size / 2),
        e.rotate((-0.5 + b.rotate / 180) * Math.PI);
      var g = (b.size - b.lineWidth) / 2;
      b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2),
        (Date.now =
          Date.now ||
          function () {
            return +new Date();
          });
      var h = function (a, b, c) {
          c = Math.min(Math.max(-1, c || 0), 1);
          var d = 0 >= c ? !0 : !1;
          e.beginPath(),
            e.arc(0, 0, g, 0, 2 * Math.PI * c, d),
            (e.strokeStyle = a),
            (e.lineWidth = b),
            e.stroke();
        },
        i = function () {
          var a, c;
          (e.lineWidth = 1), (e.fillStyle = b.scaleColor), e.save();
          for (var d = 24; d > 0; --d)
            d % 6 === 0
              ? ((c = b.scaleLength), (a = 0))
              : ((c = 0.6 * b.scaleLength), (a = b.scaleLength - c)),
              e.fillRect(-b.size / 2 + a, 0, c, 1),
              e.rotate(Math.PI / 12);
          e.restore();
        },
        j = (function () {
          return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (a) {
              window.setTimeout(a, 1e3 / 60);
            }
          );
        })(),
        k = function () {
          b.scaleColor && i(),
            b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1);
        };
      (this.getCanvas = function () {
        return d;
      }),
        (this.getCtx = function () {
          return e;
        }),
        (this.clear = function () {
          e.clearRect(b.size / -2, b.size / -2, b.size, b.size);
        }),
        (this.draw = function (a) {
          b.scaleColor || b.trackColor
            ? e.getImageData && e.putImageData
              ? c
                ? e.putImageData(c, 0, 0)
                : (k(), (c = e.getImageData(0, 0, b.size * f, b.size * f)))
              : (this.clear(), k())
            : this.clear(),
            (e.lineCap = b.lineCap);
          var d;
          (d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor),
            h(d, b.lineWidth, a / 100);
        }.bind(this)),
        (this.animate = function (a, c) {
          var d = Date.now();
          b.onStart(a, c);
          var e = function () {
            var f = Math.min(Date.now() - d, b.animate.duration),
              g = b.easing(this, f, a, c - a, b.animate.duration);
            this.draw(g),
              b.onStep(a, c, g),
              f >= b.animate.duration ? b.onStop(a, c) : j(e);
          }.bind(this);
          j(e);
        }.bind(this));
    },
    c = function (a, c) {
      var d = {
        barColor: "#ef1e25",
        trackColor: "#f9f9f9",
        scaleColor: "#dfe0e0",
        scaleLength: 5,
        lineCap: "round",
        lineWidth: 3,
        trackWidth: void 0,
        size: 110,
        rotate: 0,
        animate: { duration: 1e3, enabled: !0 },
        easing: function (a, b, c, d, e) {
          return (
            (b /= e / 2),
            1 > b ? (d / 2) * b * b + c : (-d / 2) * (--b * (b - 2) - 1) + c
          );
        },
        onStart: function (a, b) {},
        onStep: function (a, b, c) {},
        onStop: function (a, b) {},
      };
      if ("undefined" != typeof b) d.renderer = b;
      else {
        if ("undefined" == typeof SVGRenderer)
          throw new Error("Please load either the SVG- or the CanvasRenderer");
        d.renderer = SVGRenderer;
      }
      var e = {},
        f = 0,
        g = function () {
          (this.el = a), (this.options = e);
          for (var b in d)
            d.hasOwnProperty(b) &&
              ((e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b]),
              "function" == typeof e[b] && (e[b] = e[b].bind(this)));
          "string" == typeof e.easing &&
          "undefined" != typeof jQuery &&
          jQuery.isFunction(jQuery.easing[e.easing])
            ? (e.easing = jQuery.easing[e.easing])
            : (e.easing = d.easing),
            "number" == typeof e.animate &&
              (e.animate = { duration: e.animate, enabled: !0 }),
            "boolean" != typeof e.animate ||
              e.animate ||
              (e.animate = { duration: 1e3, enabled: e.animate }),
            (this.renderer = new e.renderer(a, e)),
            this.renderer.draw(f),
            a.dataset && a.dataset.percent
              ? this.update(parseFloat(a.dataset.percent))
              : a.getAttribute &&
                a.getAttribute("data-percent") &&
                this.update(parseFloat(a.getAttribute("data-percent")));
        }.bind(this);
      (this.update = function (a) {
        return (
          (a = parseFloat(a)),
          e.animate.enabled
            ? this.renderer.animate(f, a)
            : this.renderer.draw(a),
          (f = a),
          this
        );
      }.bind(this)),
        (this.disableAnimation = function () {
          return (e.animate.enabled = !1), this;
        }),
        (this.enableAnimation = function () {
          return (e.animate.enabled = !0), this;
        }),
        g();
    };
  a.fn.easyPieChart = function (b) {
    return this.each(function () {
      var d;
      a.data(this, "easyPieChart") ||
        ((d = a.extend({}, b, a(this).data())),
        a.data(this, "easyPieChart", new c(this, d)));
    });
  };
});

/**
 * Countdown
 * downCount
 * Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function (e) {
  e.fn.downCount = function (t, n) {
    function o() {
      var e = new Date(r.date),
        t = s();
      var o = e - t;
      if (o < 0) {
        clearInterval(u);
        if (n && typeof n === "function") n();
        return;
      }
      var a = 1e3,
        f = a * 60,
        l = f * 60,
        c = l * 24;
      var h = Math.floor(o / c),
        p = Math.floor((o % c) / l),
        d = Math.floor((o % l) / f),
        v = Math.floor((o % f) / a);
      h = String(h).length >= 2 ? h : "0" + h;
      p = String(p).length >= 2 ? p : "0" + p;
      d = String(d).length >= 2 ? d : "0" + d;
      v = String(v).length >= 2 ? v : "0" + v;
      var m = h === 1 ? "day" : "days",
        g = p === 1 ? "hour" : "hours",
        y = d === 1 ? "minute" : "minutes",
        b = v === 1 ? "second" : "seconds";
      i.find(".days").text(h);
      i.find(".hours").text(p);
      i.find(".minutes").text(d);
      i.find(".seconds").text(v);
      i.find(".days_ref").text(m);
      i.find(".hours_ref").text(g);
      i.find(".minutes_ref").text(y);
      i.find(".seconds_ref").text(b);
    }
    var r = e.extend({ date: null, offset: null }, t);
    if (!r.date) {
      e.error("Date is not defined.");
    }
    if (!Date.parse(r.date)) {
      e.error(
        "Incorrect date format, it should look like this, 12/24/2012 12:00:00."
      );
    }
    var i = this;
    var s = function () {
      var e = new Date();
      var t = e.getTime() + e.getTimezoneOffset() * 6e4;
      var n = new Date(t + 36e5 * r.offset);
      return n;
    };
    var u = setInterval(o, 1e3);
  };
})(jQuery);

/**
 * Greyscale
 *
 * Black & White
 *
 * 0.3.7 |  Gianluca Guarini | http://www.gianlucaguarini.com/
 **/
!(function (a) {
  a.fn.extend({
    BlackAndWhite: function (b) {
      "use strict";
      var c = this,
        d = a.extend(
          {
            hoverEffect: !0,
            webworkerPath: !1,
            invertHoverEffect: !1,
            speed: 500,
            onImageReady: null,
            intensity: 1,
          },
          b
        ),
        e = d.hoverEffect,
        f = d.webworkerPath,
        g = d.invertHoverEffect,
        h =
          "number" == typeof d.intensity && d.intensity < 1 && d.intensity > 0
            ? d.intensity
            : 1,
        i = a.isPlainObject(d.speed) ? d.speed.fadeIn : d.speed,
        j = a.isPlainObject(d.speed) ? d.speed.fadeOut : d.speed,
        k = a(window),
        l = ".BlackAndWhite",
        m =
          (document.all && !window.opera && window.XMLHttpRequest ? !0 : !1,
          " -webkit- -moz- -o- -ms- ".split(" ")),
        n = {},
        o = function (a) {
          if (n[a] || "" === n[a]) return n[a] + a;
          var b = document.createElement("div"),
            c = ["", "Moz", "Webkit", "O", "ms", "Khtml"];
          for (var d in c)
            if ("undefined" != typeof b.style[c[d] + a])
              return (n[a] = c[d]), c[d] + a;
          return a.toLowerCase();
        },
        p = (function () {
          var a = document.createElement("div");
          return (
            (a.style.cssText = m.join("filter:blur(2px); ")),
            !!a.style.length &&
              (void 0 === document.documentMode || document.documentMode > 9)
          );
        })(),
        q = !!document.createElement("canvas").getContext,
        r = (function () {
          return "undefined" != typeof Worker ? !0 : !1;
        })(),
        s = o("Filter"),
        t = [],
        u = r && f ? new Worker(f + "BnWWorker.js") : !1,
        v = function (b) {
          a(b.currentTarget)
            .find(".BWfade")
            .stop(!0, !0)
            .animate({ opacity: g ? 0 : 1 }, j);
        },
        w = function (b) {
          a(b.currentTarget)
            .find(".BWfade")
            .stop(!0, !0)
            .animate({ opacity: g ? 1 : 0 }, i);
        },
        x = function (a) {
          "function" == typeof d.onImageReady && d.onImageReady(a);
        },
        y = function (a) {
          u && q && !p && !a && z();
        },
        z = function () {
          return t.length
            ? (u.postMessage({ imgData: t[0].imageData, intensity: h }),
              void (u.onmessage = function (a) {
                t[0].ctx.putImageData(a.data, 0, 0),
                  x(t[0].img),
                  t.splice(0, 1),
                  z();
              }))
            : (u.terminate && u.terminate(), void (u.close && u.close()));
        },
        A = function (a) {
          return (
            a.complete ||
            ("undefined" != typeof a.naturalWidth && a.naturalWidth)
          );
        },
        B = function (a, b, c, d) {
          var e = b.getContext("2d"),
            f = 0;
          e.drawImage(a, 0, 0, c, d);
          var g = e.getImageData(0, 0, c, d),
            i = g.data,
            j = i.length;
          if (u) t.push({ imageData: g, ctx: e, img: a });
          else {
            for (; j > f; f += 4) {
              var k = 0.3 * i[f] + 0.59 * i[f + 1] + 0.11 * i[f + 2];
              (i[f] = ~~(k * h + i[f] * (1 - h))),
                (i[f + 1] = ~~(k * h + i[f + 1] * (1 - h))),
                (i[f + 2] = ~~(k * h + i[f + 2] * (1 - h)));
            }
            e.putImageData(g, 0, 0), x(a);
          }
        },
        C = function (b, c) {
          var d,
            e = b[0],
            f = (e.src, b.position()),
            i = {
              top: f.top,
              left: f.left,
              position: "absolute",
              "-webkit-transform": "translate3d(0,0,0)",
              opacity: g ? 0 : 1,
            };
          (e.crossOrigin = "anonymous"),
            q && !p
              ? ((d = a(
                  '<canvas width="' +
                    e.naturalWidth +
                    '" height="' +
                    e.naturalHeight +
                    '" class="BWfade"></canvas>'
                )),
                (i.width = b.width()),
                (i.height = b.height()),
                B(e, d.get(0), e.naturalWidth, e.naturalHeight))
              : (q
                  ? (i[s] = "grayscale(" + 100 * h + "%)")
                  : (i.filter =
                      "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"),
                (d = b.clone().addClass("BWFilter BWfade")),
                x(e)),
            d.css(i).prependTo(c),
            !a.support.opacity && g && d.animate({ opacity: 0 }, 0);
        },
        D = function () {
          c.each(function (b, c) {
            var d = a(c).find("img"),
              e = a(d).width(),
              f = a(d).height();
            a(this).find("canvas").css({ width: e, height: f });
          });
        },
        E = function () {
          var b = c.find("img").filter(function () {
            return !a(this).data("_b&w");
          }).length;
          c.each(function (c, d) {
            var e = a(d),
              f = e.find("img");
            f.data("_b&w") ||
              (A(f[0])
                ? (b--, C(f, e))
                : f
                    .on("load", function () {
                      return f.data("_b&w_loaded") || !f[0].complete
                        ? void setTimeout(function () {
                            f.load();
                          }, 20)
                        : (C(f, e), f.data("_b&w_loaded", !0), b--, void y(b));
                    })
                    .load(),
              f.data("_b&w", !0));
          }),
            y(b),
            e &&
              c
                .unbind(l)
                .on("mouseleave" + l, v)
                .on("mouseenter" + l, w),
            q &&
              !p &&
              k.unbind(l).on("resize" + l + " orientationchange" + l, D);
        },
        F = function () {
          c.off(l), k.off(l);
        };
      return E(), { destroy: F };
    },
  });
})(jQuery);

/**
 * imagesLoaded
 * required for: Isotope
 * 4.1.4 | http://imagesloaded.desandro.com/
 */

!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return n.indexOf(t) == -1 && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return n != -1 && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        (i = i.slice(0)), (t = t || []);
        for (
          var n = this._onceEvents && this._onceEvents[e], o = 0;
          o < i.length;
          o++
        ) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(e, r), delete n[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      if (Array.isArray(e)) return e;
      var t = "object" == typeof e && "number" == typeof e.length;
      return t ? d.call(e) : [e];
    }
    function o(e, t, r) {
      if (!(this instanceof o)) return new o(e, t, r);
      var s = e;
      return (
        "string" == typeof e && (s = document.querySelectorAll(e)),
        s
          ? ((this.elements = n(s)),
            (this.options = i({}, this.options)),
            "function" == typeof t ? (r = t) : i(this.options, t),
            r && this.on("always", r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (s || e))
      );
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

/**
 * Isotope
 * 3.0.6 | https://isotope.metafizzy.co
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, s, a) {
    function u(t, e, o) {
      var n,
        s = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, u) {
          var h = a.data(u, i);
          if (!h)
            return void r(
              i + " not initialized. Cannot call methods, i.e. " + s
            );
          var d = h[e];
          if (!d || "_" == e.charAt(0))
            return void r(s + " is not a valid method");
          var l = d.apply(h, o);
          n = void 0 === n ? l : n;
        }),
        void 0 !== n ? n : t
      );
    }
    function h(t, e) {
      t.each(function (t, o) {
        var n = a.data(o, i);
        n ? (n.option(e), n._init()) : ((n = new s(o, e)), a.data(o, i, n));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = n.call(arguments, 1);
            return u(this, t, e);
          }
          return h(this, t), this;
        }),
        o(a));
  }
  function o(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var n = Array.prototype.slice,
    s = t.console,
    r =
      "undefined" == typeof s
        ? function () {}
        : function (t) {
            s.error(t);
          };
  return o(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            o = (i[t] = i[t] || []);
          return o.indexOf(e) == -1 && o.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            o = (i[t] = i[t] || {});
          return (o[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var o = i.indexOf(e);
          return o != -1 && i.splice(o, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var o = this._onceEvents && this._onceEvents[t], n = 0;
            n < i.length;
            n++
          ) {
            var s = i[n],
              r = o && o[s];
            r && (this.off(t, s), delete o[s]), s.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = t.indexOf("%") == -1 && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        e < h;
        e++
      ) {
        var i = u[e];
        t[i] = 0;
      }
      return t;
    }
    function o(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function n() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var n = o(e);
        (r = 200 == Math.round(t(n.width))),
          (s.isBoxSizeOuter = r),
          i.removeChild(e);
      }
    }
    function s(e) {
      if (
        (n(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var s = o(e);
        if ("none" == s.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == s.boxSizing), l = 0;
          l < h;
          l++
        ) {
          var f = u[l],
            c = s[f],
            m = parseFloat(c);
          a[f] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          y = a.paddingTop + a.paddingBottom,
          g = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          I = d && r,
          x = t(s.width);
        x !== !1 && (a.width = x + (I ? 0 : p + _));
        var S = t(s.height);
        return (
          S !== !1 && (a.height = S + (I ? 0 : y + z)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (y + z)),
          (a.outerWidth = a.width + g),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var r,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      u = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      h = u.length,
      d = !1;
    return s;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var o = e[i],
          n = o + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var o = Array.prototype.slice;
    (i.makeArray = function (t) {
      if (Array.isArray(t)) return t;
      if (null === t || void 0 === t) return [];
      var e = "object" == typeof t && "number" == typeof t.length;
      return e ? o.call(t) : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, o) {
        t = i.makeArray(t);
        var n = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!o) return void n.push(t);
              e(t, o) && n.push(t);
              for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
                n.push(i[s]);
            }
          }),
          n
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var o = t.prototype[e],
          n = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[n];
          clearTimeout(t);
          var e = arguments,
            s = this;
          this[n] = setTimeout(function () {
            o.apply(s, e), delete s[n];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var s = i.toDashed(o),
            r = "data-" + s,
            a = document.querySelectorAll("[" + r + "]"),
            u = document.querySelectorAll(".js-" + s),
            h = i.makeArray(a).concat(i.makeArray(u)),
            d = r + "-options",
            l = t.jQuery;
          h.forEach(function (t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(d);
            try {
              i = s && JSON.parse(s);
            } catch (a) {
              return void (
                n &&
                n.error("Error parsing " + r + " on " + t.className + ": " + a)
              );
            }
            var u = new e(t, i);
            l && l.data(t, o, u);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function o(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function n(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[r],
      h = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay",
      },
      d = (o.prototype = Object.create(t.prototype));
    (d.constructor = o),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var o = h[i] || i;
          e[o] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          o = t[e ? "left" : "right"],
          n = t[i ? "top" : "bottom"],
          s = parseFloat(o),
          r = parseFloat(n),
          a = this.layout.size;
        o.indexOf("%") != -1 && (s = (s / 100) * a.width),
          n.indexOf("%") != -1 && (r = (r / 100) * a.height),
          (s = isNaN(s) ? 0 : s),
          (r = isNaN(r) ? 0 : r),
          (s -= e ? a.paddingLeft : a.paddingRight),
          (r -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = s),
          (this.position.y = r);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop"),
          n = i ? "paddingLeft" : "paddingRight",
          s = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[n];
        (e[s] = this.getXValue(a)), (e[r] = "");
        var u = o ? "paddingTop" : "paddingBottom",
          h = o ? "top" : "bottom",
          d = o ? "bottom" : "top",
          l = this.position.y + t[u];
        (e[h] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), n && !this.isTransitioning))
          return void this.layoutPosition();
        var s = t - i,
          r = e - o,
          a = {};
        (a.transform = this.getTranslate(s, r)),
          this.transition({
            to: a,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = o ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var o = this.element.offsetHeight;
          o = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + n(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(u, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          o = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[o],
          i(e.ingProperties) && this.disableTransition(),
          o in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[o]),
          o in e.onEnd)
        ) {
          var n = e.onEnd[o];
          n.call(this), delete e.onEnd[o];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var c = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(c);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, o, n, s) {
            return e(t, i, o, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, o, n) {
    "use strict";
    function s(t, e) {
      var i = o.getQueryElement(t);
      if (!i)
        return void (
          u &&
          u.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = o.extend({}, this.constructor.defaults)),
        this.option(e);
      var n = ++l;
      (this.element.outlayerGUID = n), (f[n] = this), this._create();
      var s = this._getOption("initLayout");
      s && this.layout();
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        o = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var n = m[o] || 1;
      return i * n;
    }
    var u = t.console,
      h = t.jQuery,
      d = function () {},
      l = 0,
      f = {};
    (s.namespace = "outlayer"),
      (s.Item = n),
      (s.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var c = s.prototype;
    o.extend(c, e.prototype),
      (c.option = function (t) {
        o.extend(this.options, t);
      }),
      (c._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (c._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (c.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (c._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0;
          n < e.length;
          n++
        ) {
          var s = e[n],
            r = new i(s, this);
          o.push(r);
        }
        return o;
      }),
      (c._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector);
      }),
      (c.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (c._init = c.layout),
      (c._resetLayout = function () {
        this.getSize();
      }),
      (c.getSize = function () {
        this.size = i(this.element);
      }),
      (c._getMeasurement = function (t, e) {
        var o,
          n = this.options[t];
        n
          ? ("string" == typeof n
              ? (o = this.element.querySelector(n))
              : n instanceof HTMLElement && (o = n),
            (this[t] = o ? i(o)[e] : n))
          : (this[t] = 0);
      }),
      (c.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (c._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var o = this._getItemLayoutPosition(t);
            (o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (c._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (c._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (c.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (c._positionItem = function (t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
      }),
      (c._postLayout = function () {
        this.resizeContainer();
      }),
      (c.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (c._getContainerSize = d),
      (c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (c._emitCompleteOnItems = function (t, e) {
        function i() {
          n.dispatchEvent(t + "Complete", null, [e]);
        }
        function o() {
          r++, r == s && i();
        }
        var n = this,
          s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function (e) {
          e.once(t, o);
        });
      }),
      (c.dispatchEvent = function (t, e, i) {
        var o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var n = h.Event(e);
            (n.type = t), this.$element.trigger(n, i);
          } else this.$element.trigger(t, i);
      }),
      (c.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (c.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (c.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (c.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              o.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (c._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = o.makeArray(t))
          );
      }),
      (c._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (c._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (c._manageStamp = d),
      (c._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          o = this._boundingRect,
          n = i(t),
          s = {
            left: e.left - o.left - n.marginLeft,
            top: e.top - o.top - n.marginTop,
            right: o.right - e.right - n.marginRight,
            bottom: o.bottom - e.bottom - n.marginBottom,
          };
        return s;
      }),
      (c.handleEvent = o.handleEvent),
      (c.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (c.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (c.onresize = function () {
        this.resize();
      }),
      o.debounceMethod(s, "onresize", 100),
      (c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (c.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (c.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (c.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (c.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (c.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (c.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (c.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (c.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (c.getItems = function (t) {
        t = o.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (c.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), o.removeFrom(this.items, t);
            }, this);
      }),
      (c.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e];
      }),
      (s.create = function (t, e) {
        var i = r(s);
        return (
          (i.defaults = o.extend({}, s.defaults)),
          o.extend(i.defaults, e),
          (i.compatOptions = o.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(n)),
          o.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (s.Item = n), s;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      o = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var n = i.destroy;
    return (
      (i.destroy = function () {
        n.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var o = i.prototype,
      n = [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ];
    return (
      n.forEach(function (t) {
        o[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (o.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element),
          i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight;
      }),
      (o._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (o.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (o.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (o.getSegmentSize = function (t, e) {
        var i = t + e,
          o = "outer" + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.isotope.size["inner" + e];
        }
      }),
      (o.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (o.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (o.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function n() {
          i.apply(this, arguments);
        }
        return (
          (n.prototype = Object.create(o)),
          (n.prototype.constructor = n),
          e && (n.options = e),
          (n.prototype.namespace = t),
          (i.modes[t] = n),
          n
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "masonry-layout/masonry",
          ["outlayer/outlayer", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return (
      (o._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (o.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          s = n / o,
          r = o - (n % o),
          a = r && r < 1 ? "round" : "floor";
        (s = Math[a](s)), (this.cols = Math.max(s, 1));
      }),
      (o.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          o = e(i);
        this.containerWidth = o && o.innerWidth;
      }),
      (o._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && e < 1 ? "round" : "ceil",
          o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (
          var n = this.options.horizontalOrder
              ? "_getHorizontalColPosition"
              : "_getTopColPosition",
            s = this[n](o, t),
            r = { x: this.columnWidth * s.col, y: s.y },
            a = s.y + t.size.outerHeight,
            u = o + s.col,
            h = s.col;
          h < u;
          h++
        )
          this.colYs[h] = a;
        return r;
      }),
      (o._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (o._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
          e[o] = this._getColGroupY(o, t);
        return e;
      }),
      (o._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (o._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (o._manageStamp = function (t) {
        var i = e(t),
          o = this._getElementOffset(t),
          n = this._getOption("originLeft"),
          s = n ? o.left : o.right,
          r = s + i.outerWidth,
          a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        (u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
        for (
          var h = this._getOption("originTop"),
            d = (h ? o.top : o.bottom) + i.outerHeight,
            l = a;
          l <= u;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (o._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (o._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-modes/masonry",
          ["../layout-mode", "masonry-layout/masonry"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      o = i.prototype,
      n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var a = o._getOption;
    return (
      (o._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var o = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          o
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "desandro-matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope-layout/js/item",
            "isotope-layout/js/layout-mode",
            "isotope-layout/js/layout-modes/masonry",
            "isotope-layout/js/layout-modes/fit-rows",
            "isotope-layout/js/layout-modes/vertical",
          ],
          function (i, o, n, s, r, a) {
            return e(t, i, o, n, s, r, a);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope-layout/js/item"),
          require("isotope-layout/js/layout-mode"),
          require("isotope-layout/js/layout-modes/masonry"),
          require("isotope-layout/js/layout-modes/fit-rows"),
          require("isotope-layout/js/layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, o, n, s, r) {
    function a(t, e) {
      return function (i, o) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n],
            r = i.sortData[s],
            a = o.sortData[s];
          if (r > a || r < a) {
            var u = void 0 !== e[s] ? e[s] : e,
              h = u ? 1 : -1;
            return (r > a ? 1 : -1) * h;
          }
        }
        return 0;
      };
    }
    var u = t.jQuery,
      h = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (d.Item = s), (d.LayoutMode = r);
    var l = d.prototype;
    (l._create = function () {
      (this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        e.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ["original-order"]);
      for (var t in r.modes) this._initLayoutMode(t);
    }),
      (l.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (l._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        ) {
          var o = t[i];
          o.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (l._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (l.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout")
          ? void this.arrange()
          : void this._layout();
      }),
      (l._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (l.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (l._init = l.arrange),
      (l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (l._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e), e;
      }),
      (l._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            o &&
            n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (o = !0), t();
          });
      }),
      (l._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r];
          if (!a.isIgnored) {
            var u = s(a);
            u && i.push(a),
              u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return o(e.element, t);
            };
      }),
      (l.updateSortData = function (t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (l._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = f(i);
        }
      }),
      (l._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
          var o = t[i];
          o.updateSortData();
        }
      });
    var f = (function () {
      function t(t) {
        if ("string" != typeof t) return t;
        var i = h(t).split(" "),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          s = n && n[1],
          r = e(s, o),
          a = d.sortDataParsers[i[1]];
        return (t = a
          ? function (t) {
              return t && a(r(t));
            }
          : function (t) {
              return t && r(t);
            });
      }
      function e(t, e) {
        return t
          ? function (e) {
              return e.getAttribute(t);
            }
          : function (t) {
              var i = t.querySelector(e);
              return i && i.textContent;
            };
      }
      return t;
    })();
    (d.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (l._sort = function () {
        if (this.options.sortBy) {
          var t = n.makeArray(this.options.sortBy);
          this._getIsSameSortBy(t) ||
            (this.sortHistory = t.concat(this.sortHistory));
          var e = a(this.sortHistory, this.options.sortAscending);
          this.filteredItems.sort(e);
        }
      }),
      (l._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++)
          if (t[e] != this.sortHistory[e]) return !1;
        return !0;
      }),
      (l._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (l._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (l._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (l.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (l._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (l.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            o,
            n = e.length;
          for (i = 0; i < n; i++)
            (o = e[i]), this.element.appendChild(o.element);
          var s = this._filter(e).matches;
          for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
          this.reveal(s);
        }
      });
    var c = l.remove;
    return (
      (l.remove = function (t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
          var s = e[o];
          n.removeFrom(this.filteredItems, s);
        }
      }),
      (l.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
          var e = this.items[t];
          e.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (l._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return (this.options.transitionDuration = i), o;
      }),
      (l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      d
    );
  });

/**
 * Parallax
 *
 * enllax.js
 *
 * 1.1.0 | copyright 2015, MMK Jony | https://github.com/mmkjony/enllax.js
 */
!(function (t) {
  "use strict";
  t.fn.enllax = function (r) {
    var a = t(window).height(),
      n = t(document).height(),
      o = t.extend({ ratio: 0, type: "background", direction: "vertical" }, r),
      e = t("[data-enllax-ratio]");
    e.each(function () {
      var r,
        e,
        s,
        i = t(this),
        c = i.offset().top,
        l = i.outerHeight(),
        p = i.data("enllax-ratio"),
        d = i.data("enllax-type"),
        x = i.data("enllax-direction");
      (r = p ? p : o.ratio), (e = d ? d : o.type), (s = x ? x : o.direction);
      var f = Math.round(c * r),
        u = Math.round((c - a / 2 + l) * r);
      "background" == e
        ? "vertical" == s
          ? i.css({ "background-position": "center " + -f + "px" })
          : "horizontal" == s &&
            i.css({ "background-position": -f + "px center" })
        : "foreground" == e &&
          ("vertical" == s
            ? i.css({
                "-webkit-transform": "translateY(" + u + "px)",
                "-moz-transform": "translateY(" + u + "px)",
                transform: "translateY(" + u + "px)",
              })
            : "horizontal" == s &&
              i.css({
                "-webkit-transform": "translateX(" + u + "px)",
                "-moz-transform": "translateX(" + u + "px)",
                transform: "translateX(" + u + "px)",
              })),
        t(window).on("scroll", function () {
          var o = t(this).scrollTop();
          (f = Math.round((c - o) * r)),
            (u = Math.round((c - a / 2 + l - o) * r)),
            "background" == e
              ? "vertical" == s
                ? i.css({ "background-position": "center " + -f + "px" })
                : "horizontal" == s &&
                  i.css({ "background-position": -f + "px center" })
              : "foreground" == e &&
                n > o &&
                ("vertical" == s
                  ? i.css({
                      "-webkit-transform": "translateY(" + u + "px)",
                      "-moz-transform": "translateY(" + u + "px)",
                      transform: "translateY(" + u + "px)",
                    })
                  : "horizontal" == s &&
                    i.css({
                      "-webkit-transform": "translateX(" + u + "px)",
                      "-moz-transform": "translateX(" + u + "px)",
                      transform: "translateX(" + u + "px)",
                    }));
        });
    });
  };
})(jQuery);

/**
 * prettyPhoto
 *
 * 3.1.6 | Stephane Caron | http://www.no-margin-for-errors.com
 */
!(function (e) {
  function t() {
    var e = location.href;
    return (
      (hashtag =
        -1 !== e.indexOf("#prettyPhoto")
          ? decodeURI(e.substring(e.indexOf("#prettyPhoto") + 1, e.length))
          : !1),
      hashtag && (hashtag = hashtag.replace(/<|>/g, "")),
      hashtag
    );
  }
  function i() {
    "undefined" != typeof theRel &&
      (location.hash = theRel + "/" + rel_index + "/");
  }
  function p() {
    -1 !== location.href.indexOf("#prettyPhoto") &&
      (location.hash = "prettyPhoto");
  }
  function o(e, t) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = "[\\?&]" + e + "=([^&#]*)",
      p = new RegExp(i),
      o = p.exec(t);
    return null == o ? "" : o[1];
  }
  (e.prettyPhoto = { version: "3.1.6" }),
    (e.fn.prettyPhoto = function (a) {
      function s() {
        e(".pp_loaderIcon").hide(),
          (projectedTop =
            scroll_pos.scrollTop + (I / 2 - f.containerHeight / 2)),
          projectedTop < 0 && (projectedTop = 0),
          $ppt.fadeTo(settings.animation_speed, 1),
          $pp_pic_holder
            .find(".pp_content")
            .animate(
              { height: f.contentHeight, width: f.contentWidth },
              settings.animation_speed
            ),
          $pp_pic_holder.animate(
            {
              top: projectedTop,
              left:
                j / 2 - f.containerWidth / 2 < 0
                  ? 0
                  : j / 2 - f.containerWidth / 2,
              width: f.containerWidth,
            },
            settings.animation_speed,
            function () {
              $pp_pic_holder
                .find(".pp_hoverContainer,#fullResImage")
                .height(f.height)
                .width(f.width),
                $pp_pic_holder
                  .find(".pp_fade")
                  .fadeIn(settings.animation_speed),
                isSet && "image" == h(pp_images[set_position])
                  ? $pp_pic_holder.find(".pp_hoverContainer").show()
                  : $pp_pic_holder.find(".pp_hoverContainer").hide(),
                settings.allow_expand &&
                  (f.resized
                    ? e("a.pp_expand,a.pp_contract").show()
                    : e("a.pp_expand").hide()),
                !settings.autoplay_slideshow ||
                  P ||
                  v ||
                  e.prettyPhoto.startSlideshow(),
                settings.changepicturecallback(),
                (v = !0);
            }
          ),
          m(),
          a.ajaxcallback();
      }
      function n(t) {
        $pp_pic_holder
          .find("#pp_full_res object,#pp_full_res embed")
          .css("visibility", "hidden"),
          $pp_pic_holder
            .find(".pp_fade")
            .fadeOut(settings.animation_speed, function () {
              e(".pp_loaderIcon").show(), t();
            });
      }
      function r(t) {
        t > 1 ? e(".pp_nav").show() : e(".pp_nav").hide();
      }
      function l(e, t) {
        if (
          ((resized = !1),
          d(e, t),
          (imageWidth = e),
          (imageHeight = t),
          (k > j || b > I) && doresize && settings.allow_resize && !$)
        ) {
          for (resized = !0, fitting = !1; !fitting; )
            k > j
              ? ((imageWidth = j - 200), (imageHeight = (t / e) * imageWidth))
              : b > I
              ? ((imageHeight = I - 200), (imageWidth = (e / t) * imageHeight))
              : (fitting = !0),
              (b = imageHeight),
              (k = imageWidth);
          (k > j || b > I) && l(k, b), d(imageWidth, imageHeight);
        }
        return {
          width: Math.floor(imageWidth),
          height: Math.floor(imageHeight),
          containerHeight: Math.floor(b),
          containerWidth: Math.floor(k) + 2 * settings.horizontal_padding,
          contentHeight: Math.floor(y),
          contentWidth: Math.floor(w),
          resized: resized,
        };
      }
      function d(t, i) {
        (t = parseFloat(t)),
          (i = parseFloat(i)),
          ($pp_details = $pp_pic_holder.find(".pp_details")),
          $pp_details.width(t),
          (detailsHeight =
            parseFloat($pp_details.css("marginTop")) +
            parseFloat($pp_details.css("marginBottom"))),
          ($pp_details = $pp_details
            .clone()
            .addClass(settings.theme)
            .width(t)
            .appendTo(e("body"))
            .css({ position: "absolute", top: -1e4 })),
          (detailsHeight += $pp_details.height()),
          (detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight),
          $pp_details.remove(),
          ($pp_title = $pp_pic_holder.find(".ppt")),
          $pp_title.width(t),
          (titleHeight =
            parseFloat($pp_title.css("marginTop")) +
            parseFloat($pp_title.css("marginBottom"))),
          ($pp_title = $pp_title
            .clone()
            .appendTo(e("body"))
            .css({ position: "absolute", top: -1e4 })),
          (titleHeight += $pp_title.height()),
          $pp_title.remove(),
          (y = i + detailsHeight),
          (w = t),
          (b =
            y +
            titleHeight +
            $pp_pic_holder.find(".pp_top").height() +
            $pp_pic_holder.find(".pp_bottom").height()),
          (k = t);
      }
      function h(e) {
        return e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i)
          ? "youtube"
          : e.match(/vimeo\.com/i)
          ? "vimeo"
          : e.match(/\b.mov\b/i)
          ? "quicktime"
          : e.match(/\b.swf\b/i)
          ? "flash"
          : e.match(/\biframe=true\b/i)
          ? "iframe"
          : e.match(/\bajax=true\b/i)
          ? "ajax"
          : e.match(/\bcustom=true\b/i)
          ? "custom"
          : "#" == e.substr(0, 1)
          ? "inline"
          : "image";
      }
      function c() {
        if (doresize && "undefined" != typeof $pp_pic_holder) {
          if (
            ((scroll_pos = _()),
            (contentHeight = $pp_pic_holder.height()),
            (contentwidth = $pp_pic_holder.width()),
            (projectedTop = I / 2 + scroll_pos.scrollTop - contentHeight / 2),
            projectedTop < 0 && (projectedTop = 0),
            contentHeight > I)
          )
            return;
          $pp_pic_holder.css({
            top: projectedTop,
            left: j / 2 + scroll_pos.scrollLeft - contentwidth / 2,
          });
        }
      }
      function _() {
        return self.pageYOffset
          ? { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset }
          : document.documentElement && document.documentElement.scrollTop
          ? {
              scrollTop: document.documentElement.scrollTop,
              scrollLeft: document.documentElement.scrollLeft,
            }
          : document.body
          ? {
              scrollTop: document.body.scrollTop,
              scrollLeft: document.body.scrollLeft,
            }
          : void 0;
      }
      function g() {
        (I = e(window).height()),
          (j = e(window).width()),
          "undefined" != typeof $pp_overlay &&
            $pp_overlay.height(e(document).height()).width(j);
      }
      function m() {
        isSet &&
        settings.overlay_gallery &&
        "image" == h(pp_images[set_position])
          ? ((itemWidth = 57),
            (navWidth =
              "facebook" == settings.theme || "pp_default" == settings.theme
                ? 50
                : 30),
            (itemsPerPage = Math.floor(
              (f.containerWidth - 100 - navWidth) / itemWidth
            )),
            (itemsPerPage =
              itemsPerPage < pp_images.length
                ? itemsPerPage
                : pp_images.length),
            (totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1),
            0 == totalPage
              ? ((navWidth = 0),
                $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide())
              : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(),
            (galleryWidth = itemsPerPage * itemWidth),
            (fullGalleryWidth = pp_images.length * itemWidth),
            $pp_gallery
              .css("margin-left", -(galleryWidth / 2 + navWidth / 2))
              .find("div:first")
              .width(galleryWidth + 5)
              .find("ul")
              .width(fullGalleryWidth)
              .find("li.selected")
              .removeClass("selected"),
            (goToPage =
              Math.floor(set_position / itemsPerPage) < totalPage
                ? Math.floor(set_position / itemsPerPage)
                : totalPage),
            e.prettyPhoto.changeGalleryPage(goToPage),
            $pp_gallery_li
              .filter(":eq(" + set_position + ")")
              .addClass("selected"))
          : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave");
      }
      function u() {
        if (
          (settings.social_tools &&
            (facebook_like_link = settings.social_tools.replace(
              "{location_href}",
              encodeURIComponent(location.href)
            )),
          (settings.markup = settings.markup.replace("{pp_social}", "")),
          e("body").append(settings.markup),
          ($pp_pic_holder = e(".pp_pic_holder")),
          ($ppt = e(".ppt")),
          ($pp_overlay = e("div.pp_overlay")),
          isSet && settings.overlay_gallery)
        ) {
          (currentGalleryPage = 0), (toInject = "");
          for (var t = 0; t < pp_images.length; t++)
            pp_images[t].match(/\b(jpg|jpeg|png|gif)\b/gi)
              ? ((classname = ""), (img_src = pp_images[t]))
              : ((classname = "default"), (img_src = "")),
              (toInject +=
                "<li class='" +
                classname +
                "'><a href='#'><img src='" +
                img_src +
                "' width='50' alt='' /></a></li>");
          (toInject = settings.gallery_markup.replace(/{gallery}/g, toInject)),
            $pp_pic_holder.find("#pp_full_res").after(toInject),
            ($pp_gallery = e(".pp_pic_holder .pp_gallery")),
            ($pp_gallery_li = $pp_gallery.find("li")),
            $pp_gallery.find(".pp_arrow_next").click(function () {
              return (
                e.prettyPhoto.changeGalleryPage("next"),
                e.prettyPhoto.stopSlideshow(),
                !1
              );
            }),
            $pp_gallery.find(".pp_arrow_previous").click(function () {
              return (
                e.prettyPhoto.changeGalleryPage("previous"),
                e.prettyPhoto.stopSlideshow(),
                !1
              );
            }),
            $pp_pic_holder.find(".pp_content").hover(
              function () {
                $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn();
              },
              function () {
                $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut();
              }
            ),
            (itemWidth = 57),
            $pp_gallery_li.each(function (t) {
              e(this)
                .find("a")
                .click(function () {
                  return (
                    e.prettyPhoto.changePage(t),
                    e.prettyPhoto.stopSlideshow(),
                    !1
                  );
                });
            });
        }
        settings.slideshow &&
          ($pp_pic_holder
            .find(".pp_nav")
            .prepend('<a href="#" class="pp_play">Play</a>'),
          $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
            return e.prettyPhoto.startSlideshow(), !1;
          })),
          $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme),
          $pp_overlay
            .css({
              opacity: 0,
              height: e(document).height(),
              width: e(window).width(),
            })
            .bind("click", function () {
              settings.modal || e.prettyPhoto.close();
            }),
          e("a.pp_close").bind("click", function () {
            return e.prettyPhoto.close(), !1;
          }),
          settings.allow_expand &&
            e("a.pp_expand").bind("click", function () {
              return (
                e(this).hasClass("pp_expand")
                  ? (e(this).removeClass("pp_expand").addClass("pp_contract"),
                    (doresize = !1))
                  : (e(this).removeClass("pp_contract").addClass("pp_expand"),
                    (doresize = !0)),
                n(function () {
                  e.prettyPhoto.open();
                }),
                !1
              );
            }),
          $pp_pic_holder
            .find(".pp_previous, .pp_nav .pp_arrow_previous")
            .bind("click", function () {
              return (
                e.prettyPhoto.changePage("previous"),
                e.prettyPhoto.stopSlideshow(),
                !1
              );
            }),
          $pp_pic_holder
            .find(".pp_next, .pp_nav .pp_arrow_next")
            .bind("click", function () {
              return (
                e.prettyPhoto.changePage("next"),
                e.prettyPhoto.stopSlideshow(),
                !1
              );
            }),
          c();
      }
      a = jQuery.extend(
        {
          hook: "rel",
          animation_speed: "fast",
          ajaxcallback: function () {},
          slideshow: 5e3,
          autoplay_slideshow: !1,
          opacity: 0.8,
          show_title: !0,
          allow_resize: !0,
          allow_expand: !0,
          default_width: 500,
          default_height: 344,
          counter_separator_label: "/",
          theme: "pp_default",
          horizontal_padding: 20,
          hideflash: !1,
          wmode: "opaque",
          autoplay: !0,
          modal: !1,
          deeplinking: !0,
          overlay_gallery: !0,
          overlay_gallery_max: 30,
          keyboard_shortcuts: !0,
          changepicturecallback: function () {},
          callback: function () {},
          ie6_fallback: !0,
          markup:
            '<div class="pp_pic_holder"> 						<div class="ppt">&nbsp;</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',
          gallery_markup:
            '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',
          image_markup: '<img id="fullResImage" src="{path}" />',
          flash_markup:
            '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
          quicktime_markup:
            '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
          iframe_markup:
            '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
          inline_markup: '<div class="pp_inline">{content}</div>',
          custom_markup: "",
          social_tools:
            '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="../../../platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>',
        },
        a
      );
      var f,
        v,
        y,
        w,
        b,
        k,
        P,
        x = this,
        $ = !1,
        I = e(window).height(),
        j = e(window).width();
      return (
        (doresize = !0),
        (scroll_pos = _()),
        e(window)
          .unbind("resize.prettyphoto")
          .bind("resize.prettyphoto", function () {
            c(), g();
          }),
        a.keyboard_shortcuts &&
          e(document)
            .unbind("keydown.prettyphoto")
            .bind("keydown.prettyphoto", function (t) {
              if (
                "undefined" != typeof $pp_pic_holder &&
                $pp_pic_holder.is(":visible")
              )
                switch (t.keyCode) {
                  case 37:
                    e.prettyPhoto.changePage("previous"), t.preventDefault();
                    break;
                  case 39:
                    e.prettyPhoto.changePage("next"), t.preventDefault();
                    break;
                  case 27:
                    settings.modal || e.prettyPhoto.close(), t.preventDefault();
                }
            }),
        (e.prettyPhoto.initialize = function () {
          return (
            (settings = a),
            "pp_default" == settings.theme &&
              (settings.horizontal_padding = 16),
            (theRel = e(this).attr(settings.hook)),
            (galleryRegExp = /\[(?:.*)\]/),
            (isSet = galleryRegExp.exec(theRel) ? !0 : !1),
            (pp_images = isSet
              ? jQuery.map(x, function (t) {
                  return -1 != e(t).attr(settings.hook).indexOf(theRel)
                    ? e(t).attr("href")
                    : void 0;
                })
              : e.makeArray(e(this).attr("href"))),
            (pp_titles = isSet
              ? jQuery.map(x, function (t) {
                  return -1 != e(t).attr(settings.hook).indexOf(theRel)
                    ? e(t).find("img").attr("alt")
                      ? e(t).find("img").attr("alt")
                      : ""
                    : void 0;
                })
              : e.makeArray(e(this).find("img").attr("alt"))),
            (pp_descriptions = isSet
              ? jQuery.map(x, function (t) {
                  return -1 != e(t).attr(settings.hook).indexOf(theRel)
                    ? e(t).attr("title")
                      ? e(t).attr("title")
                      : ""
                    : void 0;
                })
              : e.makeArray(e(this).attr("title"))),
            pp_images.length > settings.overlay_gallery_max &&
              (settings.overlay_gallery = !1),
            (set_position = jQuery.inArray(e(this).attr("href"), pp_images)),
            (rel_index = isSet
              ? set_position
              : e("a[" + settings.hook + "^='" + theRel + "']").index(e(this))),
            u(this),
            settings.allow_resize &&
              e(window).bind("scroll.prettyphoto", function () {
                c();
              }),
            e.prettyPhoto.open(),
            !1
          );
        }),
        (e.prettyPhoto.open = function (t) {
          return (
            "undefined" == typeof settings &&
              ((settings = a),
              (pp_images = e.makeArray(arguments[0])),
              (pp_titles = e.makeArray(arguments[1] ? arguments[1] : "")),
              (pp_descriptions = e.makeArray(arguments[2] ? arguments[2] : "")),
              (isSet = pp_images.length > 1 ? !0 : !1),
              (set_position = arguments[3] ? arguments[3] : 0),
              u(t.target)),
            settings.hideflash &&
              e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css(
                "visibility",
                "hidden"
              ),
            r(e(pp_images).size()),
            e(".pp_loaderIcon").show(),
            settings.deeplinking && i(),
            settings.social_tools &&
              ((facebook_like_link = settings.social_tools.replace(
                "{location_href}",
                encodeURIComponent(location.href)
              )),
              $pp_pic_holder.find(".pp_social").html(facebook_like_link)),
            $ppt.is(":hidden") && $ppt.css("opacity", 0).show(),
            $pp_overlay
              .show()
              .fadeTo(settings.animation_speed, settings.opacity),
            $pp_pic_holder
              .find(".currentTextHolder")
              .text(
                set_position +
                  1 +
                  settings.counter_separator_label +
                  e(pp_images).size()
              ),
            "undefined" != typeof pp_descriptions[set_position] &&
            "" != pp_descriptions[set_position]
              ? $pp_pic_holder
                  .find(".pp_description")
                  .show()
                  .html(unescape(pp_descriptions[set_position]))
              : $pp_pic_holder.find(".pp_description").hide(),
            (movie_width = parseFloat(o("width", pp_images[set_position]))
              ? o("width", pp_images[set_position])
              : settings.default_width.toString()),
            (movie_height = parseFloat(o("height", pp_images[set_position]))
              ? o("height", pp_images[set_position])
              : settings.default_height.toString()),
            ($ = !1),
            -1 != movie_height.indexOf("%") &&
              ((movie_height = parseFloat(
                (e(window).height() * parseFloat(movie_height)) / 100 - 150
              )),
              ($ = !0)),
            -1 != movie_width.indexOf("%") &&
              ((movie_width = parseFloat(
                (e(window).width() * parseFloat(movie_width)) / 100 - 150
              )),
              ($ = !0)),
            $pp_pic_holder.fadeIn(function () {
              switch (
                ($ppt.html(
                  settings.show_title &&
                    "" != pp_titles[set_position] &&
                    "undefined" != typeof pp_titles[set_position]
                    ? unescape(pp_titles[set_position])
                    : "&nbsp;"
                ),
                (imgPreloader = ""),
                (skipInjection = !1),
                h(pp_images[set_position]))
              ) {
                case "image":
                  (imgPreloader = new Image()),
                    (nextImage = new Image()),
                    isSet &&
                      set_position < e(pp_images).size() - 1 &&
                      (nextImage.src = pp_images[set_position + 1]),
                    (prevImage = new Image()),
                    isSet &&
                      pp_images[set_position - 1] &&
                      (prevImage.src = pp_images[set_position - 1]),
                    ($pp_pic_holder.find("#pp_full_res")[0].innerHTML =
                      settings.image_markup.replace(
                        /{path}/g,
                        pp_images[set_position]
                      )),
                    (imgPreloader.onload = function () {
                      (f = l(imgPreloader.width, imgPreloader.height)), s();
                    }),
                    (imgPreloader.onerror = function () {
                      alert(
                        "Image cannot be loaded. Make sure the path is correct and image exist."
                      ),
                        e.prettyPhoto.close();
                    }),
                    (imgPreloader.src = pp_images[set_position]);
                  break;
                case "youtube":
                  (f = l(movie_width, movie_height)),
                    (movie_id = o("v", pp_images[set_position])),
                    "" == movie_id &&
                      ((movie_id = pp_images[set_position].split("youtu.be/")),
                      (movie_id = movie_id[1]),
                      movie_id.indexOf("?") > 0 &&
                        (movie_id = movie_id.substr(0, movie_id.indexOf("?"))),
                      movie_id.indexOf("&") > 0 &&
                        (movie_id = movie_id.substr(0, movie_id.indexOf("&")))),
                    (movie = "https://www.youtube.com/embed/" + movie_id),
                    (movie += o("rel", pp_images[set_position])
                      ? "?rel=" + o("rel", pp_images[set_position])
                      : "?rel=1"),
                    settings.autoplay && (movie += "&autoplay=1"),
                    (toInject = settings.iframe_markup
                      .replace(/{width}/g, f.width)
                      .replace(/{height}/g, f.height)
                      .replace(/{wmode}/g, settings.wmode)
                      .replace(/{path}/g, movie));
                  break;
                case "vimeo":
                  (f = l(movie_width, movie_height)),
                    (movie_id = pp_images[set_position]);
                  var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/,
                    i = movie_id.match(t);
                  (movie =
                    "http://player.vimeo.com/video/" +
                    i[3] +
                    "?title=0&byline=0&portrait=0"),
                    settings.autoplay && (movie += "&autoplay=1;"),
                    (vimeo_width = f.width + "/embed/?moog_width=" + f.width),
                    (toInject = settings.iframe_markup
                      .replace(/{width}/g, vimeo_width)
                      .replace(/{height}/g, f.height)
                      .replace(/{path}/g, movie));
                  break;
                case "quicktime":
                  (f = l(movie_width, movie_height)),
                    (f.height += 15),
                    (f.contentHeight += 15),
                    (f.containerHeight += 15),
                    (toInject = settings.quicktime_markup
                      .replace(/{width}/g, f.width)
                      .replace(/{height}/g, f.height)
                      .replace(/{wmode}/g, settings.wmode)
                      .replace(/{path}/g, pp_images[set_position])
                      .replace(/{autoplay}/g, settings.autoplay));
                  break;
                case "flash":
                  (f = l(movie_width, movie_height)),
                    (flash_vars = pp_images[set_position]),
                    (flash_vars = flash_vars.substring(
                      pp_images[set_position].indexOf("flashvars") + 10,
                      pp_images[set_position].length
                    )),
                    (filename = pp_images[set_position]),
                    (filename = filename.substring(0, filename.indexOf("?"))),
                    (toInject = settings.flash_markup
                      .replace(/{width}/g, f.width)
                      .replace(/{height}/g, f.height)
                      .replace(/{wmode}/g, settings.wmode)
                      .replace(/{path}/g, filename + "?" + flash_vars));
                  break;
                case "iframe":
                  (f = l(movie_width, movie_height)),
                    (frame_url = pp_images[set_position]),
                    (frame_url = frame_url.substr(
                      0,
                      frame_url.indexOf("iframe") - 1
                    )),
                    (toInject = settings.iframe_markup
                      .replace(/{width}/g, f.width)
                      .replace(/{height}/g, f.height)
                      .replace(/{path}/g, frame_url));
                  break;
                case "ajax":
                  (doresize = !1),
                    (f = l(movie_width, movie_height)),
                    (doresize = !0),
                    (skipInjection = !0),
                    e.get(pp_images[set_position], function (e) {
                      (toInject = settings.inline_markup.replace(
                        /{content}/g,
                        e
                      )),
                        ($pp_pic_holder.find("#pp_full_res")[0].innerHTML =
                          toInject),
                        s();
                    });
                  break;
                case "custom":
                  (f = l(movie_width, movie_height)),
                    (toInject = settings.custom_markup);
                  break;
                case "inline":
                  (myClone = e(pp_images[set_position])
                    .clone()
                    .append('<br clear="all" />')
                    .css({ width: settings.default_width })
                    .wrapInner(
                      '<div id="pp_full_res"><div class="pp_inline"></div></div>'
                    )
                    .appendTo(e("body"))
                    .show()),
                    (doresize = !1),
                    (f = l(e(myClone).width(), e(myClone).height())),
                    (doresize = !0),
                    e(myClone).remove(),
                    (toInject = settings.inline_markup.replace(
                      /{content}/g,
                      e(pp_images[set_position]).html()
                    ));
              }
              imgPreloader ||
                skipInjection ||
                (($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject),
                s());
            }),
            !1
          );
        }),
        (e.prettyPhoto.changePage = function (t) {
          (currentGalleryPage = 0),
            "previous" == t
              ? (set_position--,
                set_position < 0 && (set_position = e(pp_images).size() - 1))
              : "next" == t
              ? (set_position++,
                set_position > e(pp_images).size() - 1 && (set_position = 0))
              : (set_position = t),
            (rel_index = set_position),
            doresize || (doresize = !0),
            settings.allow_expand &&
              e(".pp_contract")
                .removeClass("pp_contract")
                .addClass("pp_expand"),
            n(function () {
              e.prettyPhoto.open();
            });
        }),
        (e.prettyPhoto.changeGalleryPage = function (e) {
          "next" == e
            ? (currentGalleryPage++,
              currentGalleryPage > totalPage && (currentGalleryPage = 0))
            : "previous" == e
            ? (currentGalleryPage--,
              currentGalleryPage < 0 && (currentGalleryPage = totalPage))
            : (currentGalleryPage = e),
            (slide_speed =
              "next" == e || "previous" == e ? settings.animation_speed : 0),
            (slide_to = currentGalleryPage * itemsPerPage * itemWidth),
            $pp_gallery.find("ul").animate({ left: -slide_to }, slide_speed);
        }),
        (e.prettyPhoto.startSlideshow = function () {
          "undefined" == typeof P
            ? ($pp_pic_holder
                .find(".pp_play")
                .unbind("click")
                .removeClass("pp_play")
                .addClass("pp_pause")
                .click(function () {
                  return e.prettyPhoto.stopSlideshow(), !1;
                }),
              (P = setInterval(
                e.prettyPhoto.startSlideshow,
                settings.slideshow
              )))
            : e.prettyPhoto.changePage("next");
        }),
        (e.prettyPhoto.stopSlideshow = function () {
          $pp_pic_holder
            .find(".pp_pause")
            .unbind("click")
            .removeClass("pp_pause")
            .addClass("pp_play")
            .click(function () {
              return e.prettyPhoto.startSlideshow(), !1;
            }),
            clearInterval(P),
            (P = void 0);
        }),
        (e.prettyPhoto.close = function () {
          $pp_overlay.is(":animated") ||
            (e.prettyPhoto.stopSlideshow(),
            $pp_pic_holder
              .stop()
              .find("object,embed")
              .css("visibility", "hidden"),
            e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(
              settings.animation_speed,
              function () {
                e(this).remove();
              }
            ),
            $pp_overlay.fadeOut(settings.animation_speed, function () {
              settings.hideflash &&
                e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css(
                  "visibility",
                  "visible"
                ),
                e(this).remove(),
                e(window).unbind("scroll.prettyphoto"),
                p(),
                settings.callback(),
                (doresize = !0),
                (v = !1),
                delete settings;
            }));
        }),
        !pp_alreadyInitialized &&
          t() &&
          ((pp_alreadyInitialized = !0),
          (hashIndex = t()),
          (hashRel = hashIndex),
          (hashIndex = hashIndex.substring(
            hashIndex.indexOf("/") + 1,
            hashIndex.length - 1
          )),
          (hashRel = hashRel.substring(0, hashRel.indexOf("/"))),
          setTimeout(function () {
            e(
              "a[" + a.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")"
            ).trigger("click");
          }, 50)),
        this.unbind("click.prettyphoto").bind(
          "click.prettyphoto",
          e.prettyPhoto.initialize
        )
      );
    });
})(jQuery);
var pp_alreadyInitialized = !1;

/**
 * Resize
 *
 * debouncedresize
 *
 * @louis_remi | https://github.com/louisremi/jquery-smartresize | Licensed under the MIT license.
 */
(function (e) {
  var t = e.event,
    n,
    r;
  n = t.special.debouncedresize = {
    setup: function () {
      e(this).on("resize", n.handler);
    },
    teardown: function () {
      e(this).off("resize", n.handler);
    },
    handler: function (e, i) {
      var s = this,
        o = arguments,
        u = function () {
          e.type = "debouncedresize";
          t.dispatch.apply(s, o);
        };
      if (r) {
        clearTimeout(r);
      }
      i ? u() : (r = setTimeout(u, n.threshold));
    },
    threshold: 150,
  };
})(jQuery);

/**
 * Scroll
 * Nice Scroll
 * 3.7.6 | InuYaksa | 2015 MIT | http://nicescroll.areaaperta.com
 */

!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? (module.exports = e(require("jquery")))
    : e(jQuery);
})(function (e) {
  "use strict";
  var o = !1,
    t = !1,
    r = 0,
    i = 2e3,
    s = 0,
    n = e,
    l = document,
    a = window,
    c = n(a),
    d = [],
    u =
      a.requestAnimationFrame ||
      a.webkitRequestAnimationFrame ||
      a.mozRequestAnimationFrame ||
      !1,
    h =
      a.cancelAnimationFrame ||
      a.webkitCancelAnimationFrame ||
      a.mozCancelAnimationFrame ||
      !1;
  if (u) a.cancelAnimationFrame || (h = function (e) {});
  else {
    var p = 0;
    (u = function (e, o) {
      var t = new Date().getTime(),
        r = Math.max(0, 16 - (t - p)),
        i = a.setTimeout(function () {
          e(t + r);
        }, r);
      return (p = t + r), i;
    }),
      (h = function (e) {
        a.clearTimeout(e);
      });
  }
  var m = a.MutationObserver || a.WebKitMutationObserver || !1,
    f =
      Date.now ||
      function () {
        return new Date().getTime();
      },
    g = {
      zindex: "auto",
      cursoropacitymin: 0,
      cursoropacitymax: 1,
      cursorcolor: "#424242",
      cursorwidth: "6px",
      cursorborder: "1px solid #fff",
      cursorborderradius: "5px",
      scrollspeed: 40,
      mousescrollstep: 27,
      touchbehavior: !1,
      emulatetouch: !1,
      hwacceleration: !0,
      usetransition: !0,
      boxzoom: !1,
      dblclickzoom: !0,
      gesturezoom: !0,
      grabcursorenabled: !0,
      autohidemode: !0,
      background: "",
      iframeautoresize: !0,
      cursorminheight: 32,
      preservenativescrolling: !0,
      railoffset: !1,
      railhoffset: !1,
      bouncescroll: !0,
      spacebarenabled: !0,
      railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
      disableoutline: !0,
      horizrailenabled: !0,
      railalign: "right",
      railvalign: "bottom",
      enabletranslate3d: !0,
      enablemousewheel: !0,
      enablekeyboard: !0,
      smoothscroll: !0,
      sensitiverail: !0,
      enablemouselockapi: !0,
      cursorfixedheight: !1,
      directionlockdeadzone: 6,
      hidecursordelay: 400,
      nativeparentscrolling: !0,
      enablescrollonselection: !0,
      overflowx: !0,
      overflowy: !0,
      cursordragspeed: 0.3,
      rtlmode: "auto",
      cursordragontouch: !1,
      oneaxismousemode: "auto",
      scriptpath: (function () {
        var e =
            l.currentScript ||
            (function () {
              var e = l.getElementsByTagName("script");
              return !!e.length && e[e.length - 1];
            })(),
          o = e ? e.src.split("?")[0] : "";
        return o.split("/").length > 0
          ? o.split("/").slice(0, -1).join("/") + "/"
          : "";
      })(),
      preventmultitouchscrolling: !0,
      disablemutationobserver: !1,
      enableobserver: !0,
      scrollbarid: !1,
    },
    v = !1,
    w = function () {
      if (v) return v;
      var e = l.createElement("DIV"),
        o = e.style,
        t = navigator.userAgent,
        r = navigator.platform,
        i = {};
      return (
        (i.haspointerlock =
          "pointerLockElement" in l ||
          "webkitPointerLockElement" in l ||
          "mozPointerLockElement" in l),
        (i.isopera = "opera" in a),
        (i.isopera12 = i.isopera && "getUserMedia" in navigator),
        (i.isoperamini =
          "[object OperaMini]" === Object.prototype.toString.call(a.operamini)),
        (i.isie = "all" in l && "attachEvent" in e && !i.isopera),
        (i.isieold = i.isie && !("msInterpolationMode" in o)),
        (i.isie7 =
          i.isie &&
          !i.isieold &&
          (!("documentMode" in l) || 7 === l.documentMode)),
        (i.isie8 = i.isie && "documentMode" in l && 8 === l.documentMode),
        (i.isie9 = i.isie && "performance" in a && 9 === l.documentMode),
        (i.isie10 = i.isie && "performance" in a && 10 === l.documentMode),
        (i.isie11 = "msRequestFullscreen" in e && l.documentMode >= 11),
        (i.ismsedge = "msCredentials" in a),
        (i.ismozilla = "MozAppearance" in o),
        (i.iswebkit = !i.ismsedge && "WebkitAppearance" in o),
        (i.ischrome = i.iswebkit && "chrome" in a),
        (i.ischrome38 = i.ischrome && "touchAction" in o),
        (i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock),
        (i.ischrome26 = !i.ischrome38 && i.ischrome && "transition" in o),
        (i.cantouch =
          "ontouchstart" in l.documentElement || "ontouchstart" in a),
        (i.hasw3ctouch =
          (a.PointerEvent || !1) &&
          (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)),
        (i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1)),
        (i.ismac = /^mac$/i.test(r)),
        (i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r)),
        (i.isios4 = i.isios && !("seal" in Object)),
        (i.isios7 = i.isios && "webkitHidden" in l),
        (i.isios8 = i.isios && "hidden" in l),
        (i.isios10 = i.isios && a.Proxy),
        (i.isandroid = /android/i.test(t)),
        (i.haseventlistener = "addEventListener" in e),
        (i.trstyle = !1),
        (i.hastransform = !1),
        (i.hastranslate3d = !1),
        (i.transitionstyle = !1),
        (i.hastransition = !1),
        (i.transitionend = !1),
        (i.trstyle = "transform"),
        (i.hastransform =
          "transform" in o ||
          (function () {
            for (
              var e = [
                  "msTransform",
                  "webkitTransform",
                  "MozTransform",
                  "OTransform",
                ],
                t = 0,
                r = e.length;
              t < r;
              t++
            )
              if (void 0 !== o[e[t]]) {
                i.trstyle = e[t];
                break;
              }
            i.hastransform = !!i.trstyle;
          })()),
        i.hastransform &&
          ((o[i.trstyle] = "translate3d(1px,2px,3px)"),
          (i.hastranslate3d = /translate3d/.test(o[i.trstyle]))),
        (i.transitionstyle = "transition"),
        (i.prefixstyle = ""),
        (i.transitionend = "transitionend"),
        (i.hastransition =
          "transition" in o ||
          (function () {
            i.transitionend = !1;
            for (
              var e = [
                  "webkitTransition",
                  "msTransition",
                  "MozTransition",
                  "OTransition",
                  "OTransition",
                  "KhtmlTransition",
                ],
                t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"],
                r = [
                  "webkitTransitionEnd",
                  "msTransitionEnd",
                  "transitionend",
                  "otransitionend",
                  "oTransitionEnd",
                  "KhtmlTransitionEnd",
                ],
                s = 0,
                n = e.length;
              s < n;
              s++
            )
              if (e[s] in o) {
                (i.transitionstyle = e[s]),
                  (i.prefixstyle = t[s]),
                  (i.transitionend = r[s]);
                break;
              }
            i.ischrome26 && (i.prefixstyle = t[1]),
              (i.hastransition = i.transitionstyle);
          })()),
        (i.cursorgrabvalue = (function () {
          var e = ["grab", "-webkit-grab", "-moz-grab"];
          ((i.ischrome && !i.ischrome38) || i.isie) && (e = []);
          for (var t = 0, r = e.length; t < r; t++) {
            var s = e[t];
            if (((o.cursor = s), o.cursor == s)) return s;
          }
          return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize";
        })()),
        (i.hasmousecapture = "setCapture" in e),
        (i.hasMutationObserver = !1 !== m),
        (e = null),
        (v = i),
        i
      );
    },
    b = function (e, p) {
      function v() {
        var e = T.doc.css(P.trstyle);
        return (
          !(!e || "matrix" != e.substr(0, 6)) &&
          e
            .replace(/^.*\((.*)\)$/g, "$1")
            .replace(/px/g, "")
            .split(/, +/)
        );
      }
      function b() {
        var e = T.win;
        if ("zIndex" in e) return e.zIndex();
        for (; e.length > 0; ) {
          if (9 == e[0].nodeType) return !1;
          var o = e.css("zIndex");
          if (!isNaN(o) && 0 !== o) return parseInt(o);
          e = e.parent();
        }
        return !1;
      }
      function x(e, o, t) {
        var r = e.css(o),
          i = parseFloat(r);
        if (isNaN(i)) {
          var s =
            3 == (i = I[r] || 0)
              ? t
                ? T.win.outerHeight() - T.win.innerHeight()
                : T.win.outerWidth() - T.win.innerWidth()
              : 1;
          return T.isie8 && i && (i += 1), s ? i : 0;
        }
        return i;
      }
      function S(e, o, t, r) {
        T._bind(
          e,
          o,
          function (r) {
            var i = {
              original: (r = r || a.event),
              target: r.target || r.srcElement,
              type: "wheel",
              deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
              deltaX: 0,
              deltaZ: 0,
              preventDefault: function () {
                return (
                  r.preventDefault ? r.preventDefault() : (r.returnValue = !1),
                  !1
                );
              },
              stopImmediatePropagation: function () {
                r.stopImmediatePropagation
                  ? r.stopImmediatePropagation()
                  : (r.cancelBubble = !0);
              },
            };
            return (
              "mousewheel" == o
                ? (r.wheelDeltaX && (i.deltaX = -0.025 * r.wheelDeltaX),
                  r.wheelDeltaY && (i.deltaY = -0.025 * r.wheelDeltaY),
                  !i.deltaY && !i.deltaX && (i.deltaY = -0.025 * r.wheelDelta))
                : (i.deltaY = r.detail),
              t.call(e, i)
            );
          },
          r
        );
      }
      function z(e, o, t, r) {
        T.scrollrunning ||
          ((T.newscrolly = T.getScrollTop()),
          (T.newscrollx = T.getScrollLeft()),
          (D = f()));
        var i = f() - D;
        if (
          ((D = f()),
          i > 350 ? (A = 1) : (A += (2 - A) / 10),
          (e = (e * A) | 0),
          (o = (o * A) | 0),
          e)
        ) {
          if (r)
            if (e < 0) {
              if (T.getScrollLeft() >= T.page.maxw) return !0;
            } else if (T.getScrollLeft() <= 0) return !0;
          var s = e > 0 ? 1 : -1;
          X !== s &&
            (T.scrollmom && T.scrollmom.stop(),
            (T.newscrollx = T.getScrollLeft()),
            (X = s)),
            (T.lastdeltax -= e);
        }
        if (o) {
          if (
            (function () {
              var e = T.getScrollTop();
              if (o < 0) {
                if (e >= T.page.maxh) return !0;
              } else if (e <= 0) return !0;
            })()
          ) {
            if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive)
              return !0;
            var n = T.view.h >> 1;
            T.newscrolly < -n
              ? ((T.newscrolly = -n), (o = -1))
              : T.newscrolly > T.page.maxh + n
              ? ((T.newscrolly = T.page.maxh + n), (o = 1))
              : (o = 0);
          }
          var l = o > 0 ? 1 : -1;
          B !== l &&
            (T.scrollmom && T.scrollmom.stop(),
            (T.newscrolly = T.getScrollTop()),
            (B = l)),
            (T.lastdeltay -= o);
        }
        (o || e) &&
          T.synched("relativexy", function () {
            var e = T.lastdeltay + T.newscrolly;
            T.lastdeltay = 0;
            var o = T.lastdeltax + T.newscrollx;
            (T.lastdeltax = 0), T.rail.drag || T.doScrollPos(o, e);
          });
      }
      function k(e, o, t) {
        var r, i;
        return (
          !(t || !q) ||
          (0 === e.deltaMode
            ? ((r = (-e.deltaX * (M.mousescrollstep / 54)) | 0),
              (i = (-e.deltaY * (M.mousescrollstep / 54)) | 0))
            : 1 === e.deltaMode &&
              ((r = ((-e.deltaX * M.mousescrollstep * 50) / 80) | 0),
              (i = ((-e.deltaY * M.mousescrollstep * 50) / 80) | 0)),
          o &&
            M.oneaxismousemode &&
            0 === r &&
            i &&
            ((r = i),
            (i = 0),
            t &&
              (r < 0
                ? T.getScrollLeft() >= T.page.maxw
                : T.getScrollLeft() <= 0) &&
              ((i = r), (r = 0))),
          T.isrtlmode && (r = -r),
          z(r, i, t, !0)
            ? void (t && (q = !0))
            : ((q = !1), e.stopImmediatePropagation(), e.preventDefault()))
        );
      }
      var T = this;
      (this.version = "3.7.6"), (this.name = "nicescroll"), (this.me = p);
      var E = n("body"),
        M = (this.opt = { doc: E, win: !1 });
      if ((n.extend(M, g), (M.snapbackspeed = 80), e))
        for (var L in M) void 0 !== e[L] && (M[L] = e[L]);
      if (
        (M.disablemutationobserver && (m = !1),
        (this.doc = M.doc),
        (this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : ""),
        (this.ispage = /^BODY|HTML/.test(
          M.win ? M.win[0].nodeName : this.doc[0].nodeName
        )),
        (this.haswrapper = !1 !== M.win),
        (this.win = M.win || (this.ispage ? c : this.doc)),
        (this.docscroll = this.ispage && !this.haswrapper ? c : this.win),
        (this.body = E),
        (this.viewport = !1),
        (this.isfixed = !1),
        (this.iframe = !1),
        (this.isiframe =
          "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName),
        (this.istextarea = "TEXTAREA" == this.win[0].nodeName),
        (this.forcescreen = !1),
        (this.canshowonmouseevent = "scroll" != M.autohidemode),
        (this.onmousedown = !1),
        (this.onmouseup = !1),
        (this.onmousemove = !1),
        (this.onmousewheel = !1),
        (this.onkeypress = !1),
        (this.ongesturezoom = !1),
        (this.onclick = !1),
        (this.onscrollstart = !1),
        (this.onscrollend = !1),
        (this.onscrollcancel = !1),
        (this.onzoomin = !1),
        (this.onzoomout = !1),
        (this.view = !1),
        (this.page = !1),
        (this.scroll = { x: 0, y: 0 }),
        (this.scrollratio = { x: 0, y: 0 }),
        (this.cursorheight = 20),
        (this.scrollvaluemax = 0),
        "auto" == M.rtlmode)
      ) {
        var C = this.win[0] == a ? this.body : this.win,
          N =
            C.css("writing-mode") ||
            C.css("-webkit-writing-mode") ||
            C.css("-ms-writing-mode") ||
            C.css("-moz-writing-mode");
        "horizontal-tb" == N || "lr-tb" == N || "" === N
          ? ((this.isrtlmode = "rtl" == C.css("direction")),
            (this.isvertical = !1))
          : ((this.isrtlmode =
              "vertical-rl" == N || "tb" == N || "tb-rl" == N || "rl-tb" == N),
            (this.isvertical =
              "vertical-rl" == N || "tb" == N || "tb-rl" == N));
      } else (this.isrtlmode = !0 === M.rtlmode), (this.isvertical = !1);
      if (
        ((this.scrollrunning = !1),
        (this.scrollmom = !1),
        (this.observer = !1),
        (this.observerremover = !1),
        (this.observerbody = !1),
        !1 !== M.scrollbarid)
      )
        this.id = M.scrollbarid;
      else
        do {
          this.id = "ascrail" + i++;
        } while (l.getElementById(this.id));
      (this.rail = !1),
        (this.cursor = !1),
        (this.cursorfreezed = !1),
        (this.selectiondrag = !1),
        (this.zoom = !1),
        (this.zoomactive = !1),
        (this.hasfocus = !1),
        (this.hasmousefocus = !1),
        (this.railslocked = !1),
        (this.locked = !1),
        (this.hidden = !1),
        (this.cursoractive = !0),
        (this.wheelprevented = !1),
        (this.overflowx = M.overflowx),
        (this.overflowy = M.overflowy),
        (this.nativescrollingarea = !1),
        (this.checkarea = 0),
        (this.events = []),
        (this.saved = {}),
        (this.delaylist = {}),
        (this.synclist = {}),
        (this.lastdeltax = 0),
        (this.lastdeltay = 0),
        (this.detected = w());
      var P = n.extend({}, this.detected);
      (this.canhwscroll = P.hastransform && M.hwacceleration),
        (this.ishwscroll = this.canhwscroll && T.haswrapper),
        this.isrtlmode
          ? this.isvertical
            ? (this.hasreversehr = !(P.iswebkit || P.isie || P.isie11))
            : (this.hasreversehr = !(
                P.iswebkit ||
                (P.isie && !P.isie10 && !P.isie11)
              ))
          : (this.hasreversehr = !1),
        (this.istouchcapable = !1),
        P.cantouch || (!P.hasw3ctouch && !P.hasmstouch)
          ? !P.cantouch ||
            P.isios ||
            P.isandroid ||
            (!P.iswebkit && !P.ismozilla) ||
            (this.istouchcapable = !0)
          : (this.istouchcapable = !0),
        M.enablemouselockapi ||
          ((P.hasmousecapture = !1), (P.haspointerlock = !1)),
        (this.debounced = function (e, o, t) {
          T &&
            (T.delaylist[e] ||
              !1 ||
              ((T.delaylist[e] = {
                h: u(function () {
                  T.delaylist[e].fn.call(T), (T.delaylist[e] = !1);
                }, t),
              }),
              o.call(T)),
            (T.delaylist[e].fn = o));
        }),
        (this.synched = function (e, o) {
          T.synclist[e]
            ? (T.synclist[e] = o)
            : ((T.synclist[e] = o),
              u(function () {
                T &&
                  (T.synclist[e] && T.synclist[e].call(T),
                  (T.synclist[e] = null));
              }));
        }),
        (this.unsynched = function (e) {
          T.synclist[e] && (T.synclist[e] = !1);
        }),
        (this.css = function (e, o) {
          for (var t in o) T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t]);
        }),
        (this.scrollTop = function (e) {
          return void 0 === e ? T.getScrollTop() : T.setScrollTop(e);
        }),
        (this.scrollLeft = function (e) {
          return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e);
        });
      var R = function (e, o, t, r, i, s, n) {
        (this.st = e),
          (this.ed = o),
          (this.spd = t),
          (this.p1 = r || 0),
          (this.p2 = i || 1),
          (this.p3 = s || 0),
          (this.p4 = n || 1),
          (this.ts = f()),
          (this.df = o - e);
      };
      if (
        ((R.prototype = {
          B2: function (e) {
            return 3 * (1 - e) * (1 - e) * e;
          },
          B3: function (e) {
            return 3 * (1 - e) * e * e;
          },
          B4: function (e) {
            return e * e * e;
          },
          getPos: function () {
            return (f() - this.ts) / this.spd;
          },
          getNow: function () {
            var e = (f() - this.ts) / this.spd,
              o = this.B2(e) + this.B3(e) + this.B4(e);
            return e >= 1 ? this.ed : (this.st + this.df * o) | 0;
          },
          update: function (e, o) {
            return (
              (this.st = this.getNow()),
              (this.ed = e),
              (this.spd = o),
              (this.ts = f()),
              (this.df = this.ed - this.st),
              this
            );
          },
        }),
        this.ishwscroll)
      ) {
        (this.doc.translate = { x: 0, y: 0, tx: "0px", ty: "0px" }),
          P.hastranslate3d &&
            P.isios &&
            this.doc.css("-webkit-backface-visibility", "hidden"),
          (this.getScrollTop = function (e) {
            if (!e) {
              var o = v();
              if (o) return 16 == o.length ? -o[13] : -o[5];
              if (T.timerscroll && T.timerscroll.bz)
                return T.timerscroll.bz.getNow();
            }
            return T.doc.translate.y;
          }),
          (this.getScrollLeft = function (e) {
            if (!e) {
              var o = v();
              if (o) return 16 == o.length ? -o[12] : -o[4];
              if (T.timerscroll && T.timerscroll.bh)
                return T.timerscroll.bh.getNow();
            }
            return T.doc.translate.x;
          }),
          (this.notifyScrollEvent = function (e) {
            var o = l.createEvent("UIEvents");
            o.initUIEvent("scroll", !1, !1, a, 1),
              (o.niceevent = !0),
              e.dispatchEvent(o);
          });
        var _ = this.isrtlmode ? 1 : -1;
        P.hastranslate3d && M.enabletranslate3d
          ? ((this.setScrollTop = function (e, o) {
              (T.doc.translate.y = e),
                (T.doc.translate.ty = -1 * e + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate3d(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ",0)"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }),
            (this.setScrollLeft = function (e, o) {
              (T.doc.translate.x = e),
                (T.doc.translate.tx = e * _ + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate3d(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ",0)"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }))
          : ((this.setScrollTop = function (e, o) {
              (T.doc.translate.y = e),
                (T.doc.translate.ty = -1 * e + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ")"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }),
            (this.setScrollLeft = function (e, o) {
              (T.doc.translate.x = e),
                (T.doc.translate.tx = e * _ + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ")"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }));
      } else
        (this.getScrollTop = function () {
          return T.docscroll.scrollTop();
        }),
          (this.setScrollTop = function (e) {
            T.docscroll.scrollTop(e);
          }),
          (this.getScrollLeft = function () {
            return T.hasreversehr
              ? T.detected.ismozilla
                ? T.page.maxw - Math.abs(T.docscroll.scrollLeft())
                : T.page.maxw - T.docscroll.scrollLeft()
              : T.docscroll.scrollLeft();
          }),
          (this.setScrollLeft = function (e) {
            return setTimeout(function () {
              if (T)
                return (
                  T.hasreversehr &&
                    (e = T.detected.ismozilla
                      ? -(T.page.maxw - e)
                      : T.page.maxw - e),
                  T.docscroll.scrollLeft(e)
                );
            }, 1);
          });
      (this.getTarget = function (e) {
        return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement);
      }),
        (this.hasParent = function (e, o) {
          if (!e) return !1;
          for (var t = e.target || e.srcElement || e || !1; t && t.id != o; )
            t = t.parentNode || !1;
          return !1 !== t;
        });
      var I = { thin: 1, medium: 3, thick: 5 };
      (this.getDocumentScrollOffset = function () {
        return {
          top: a.pageYOffset || l.documentElement.scrollTop,
          left: a.pageXOffset || l.documentElement.scrollLeft,
        };
      }),
        (this.getOffset = function () {
          if (T.isfixed) {
            var e = T.win.offset(),
              o = T.getDocumentScrollOffset();
            return (e.top -= o.top), (e.left -= o.left), e;
          }
          var t = T.win.offset();
          if (!T.viewport) return t;
          var r = T.viewport.offset();
          return { top: t.top - r.top, left: t.left - r.left };
        }),
        (this.updateScrollBar = function (e) {
          var o, t;
          if (T.ishwscroll)
            T.rail.css({
              height:
                T.win.innerHeight() -
                (M.railpadding.top + M.railpadding.bottom),
            }),
              T.railh &&
                T.railh.css({
                  width:
                    T.win.innerWidth() -
                    (M.railpadding.left + M.railpadding.right),
                });
          else {
            var r = T.getOffset();
            if (
              ((o = {
                top: r.top,
                left: r.left - (M.railpadding.left + M.railpadding.right),
              }),
              (o.top += x(T.win, "border-top-width", !0)),
              (o.left += T.rail.align
                ? T.win.outerWidth() -
                  x(T.win, "border-right-width") -
                  T.rail.width
                : x(T.win, "border-left-width")),
              (t = M.railoffset) &&
                (t.top && (o.top += t.top), t.left && (o.left += t.left)),
              T.railslocked ||
                T.rail.css({
                  top: o.top,
                  left: o.left,
                  height:
                    (e ? e.h : T.win.innerHeight()) -
                    (M.railpadding.top + M.railpadding.bottom),
                }),
              T.zoom &&
                T.zoom.css({
                  top: o.top + 1,
                  left:
                    1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4,
                }),
              T.railh && !T.railslocked)
            ) {
              (o = { top: r.top, left: r.left }),
                (t = M.railhoffset) &&
                  (t.top && (o.top += t.top), t.left && (o.left += t.left));
              var i = T.railh.align
                  ? o.top +
                    x(T.win, "border-top-width", !0) +
                    T.win.innerHeight() -
                    T.railh.height
                  : o.top + x(T.win, "border-top-width", !0),
                s = o.left + x(T.win, "border-left-width");
              T.railh.css({
                top: i - (M.railpadding.top + M.railpadding.bottom),
                left: s,
                width: T.railh.width,
              });
            }
          }
        }),
        (this.doRailClick = function (e, o, t) {
          var r, i, s, n;
          T.railslocked ||
            (T.cancelEvent(e),
            "pageY" in e ||
              ((e.pageX = e.clientX + l.documentElement.scrollLeft),
              (e.pageY = e.clientY + l.documentElement.scrollTop)),
            o
              ? ((r = t ? T.doScrollLeft : T.doScrollTop),
                (s = t
                  ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) *
                    T.scrollratio.x
                  : (e.pageY - T.rail.offset().top - T.cursorheight / 2) *
                    T.scrollratio.y),
                T.unsynched("relativexy"),
                r(0 | s))
              : ((r = t ? T.doScrollLeftBy : T.doScrollBy),
                (s = t ? T.scroll.x : T.scroll.y),
                (n = t
                  ? e.pageX - T.railh.offset().left
                  : e.pageY - T.rail.offset().top),
                (i = t ? T.view.w : T.view.h),
                r(s >= n ? i : -i)));
        }),
        (T.newscrolly = T.newscrollx = 0),
        (T.hasanimationframe = "requestAnimationFrame" in a),
        (T.hascancelanimationframe = "cancelAnimationFrame" in a),
        (T.hasborderbox = !1),
        (this.init = function () {
          if (((T.saved.css = []), P.isoperamini)) return !0;
          if (P.isandroid && !("hidden" in l)) return !0;
          (M.emulatetouch = M.emulatetouch || M.touchbehavior),
            (T.hasborderbox =
              a.getComputedStyle &&
              "border-box" === a.getComputedStyle(l.body)["box-sizing"]);
          var e = { "overflow-y": "hidden" };
          if (
            ((P.isie11 || P.isie10) && (e["-ms-overflow-style"] = "none"),
            T.ishwscroll &&
              (this.doc.css(
                P.transitionstyle,
                P.prefixstyle + "transform 0ms ease-out"
              ),
              P.transitionend &&
                T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)),
            (T.zindex = "auto"),
            T.ispage || "auto" != M.zindex
              ? (T.zindex = M.zindex)
              : (T.zindex = b() || "auto"),
            !T.ispage && "auto" != T.zindex && T.zindex > s && (s = T.zindex),
            T.isie &&
              0 === T.zindex &&
              "auto" == M.zindex &&
              (T.zindex = "auto"),
            !T.ispage || !P.isieold)
          ) {
            var i = T.docscroll;
            T.ispage && (i = T.haswrapper ? T.win : T.doc),
              T.css(i, e),
              T.ispage && (P.isie11 || P.isie) && T.css(n("html"), e),
              !P.isios ||
                T.ispage ||
                T.haswrapper ||
                T.css(E, { "-webkit-overflow-scrolling": "touch" });
            var d = n(l.createElement("div"));
            d.css({
              position: "relative",
              top: 0,
              float: "right",
              width: M.cursorwidth,
              height: 0,
              "background-color": M.cursorcolor,
              border: M.cursorborder,
              "background-clip": "padding-box",
              "-webkit-border-radius": M.cursorborderradius,
              "-moz-border-radius": M.cursorborderradius,
              "border-radius": M.cursorborderradius,
            }),
              d.addClass("nicescroll-cursors"),
              (T.cursor = d);
            var u = n(l.createElement("div"));
            u.attr("id", T.id),
              u.addClass("nicescroll-rails nicescroll-rails-vr");
            var h,
              p,
              f = ["left", "right", "top", "bottom"];
            for (var g in f)
              (p = f[g]),
                (h = M.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
            u.append(d),
              (u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth())),
              u.css({
                width: u.width + "px",
                zIndex: T.zindex,
                background: M.background,
                cursor: "default",
              }),
              (u.visibility = !0),
              (u.scrollable = !0),
              (u.align = "left" == M.railalign ? 0 : 1),
              (T.rail = u),
              (T.rail.drag = !1);
            var v = !1;
            !M.boxzoom ||
              T.ispage ||
              P.isieold ||
              ((v = l.createElement("div")),
              T.bind(v, "click", T.doZoom),
              T.bind(v, "mouseenter", function () {
                T.zoom.css("opacity", M.cursoropacitymax);
              }),
              T.bind(v, "mouseleave", function () {
                T.zoom.css("opacity", M.cursoropacitymin);
              }),
              (T.zoom = n(v)),
              T.zoom.css({
                cursor: "pointer",
                zIndex: T.zindex,
                backgroundImage: "url(" + M.scriptpath + "zoomico.png)",
                height: 18,
                width: 18,
                backgroundPosition: "0 0",
              }),
              M.dblclickzoom && T.bind(T.win, "dblclick", T.doZoom),
              P.cantouch &&
                M.gesturezoom &&
                ((T.ongesturezoom = function (e) {
                  return (
                    e.scale > 1.5 && T.doZoomIn(e),
                    e.scale < 0.8 && T.doZoomOut(e),
                    T.cancelEvent(e)
                  );
                }),
                T.bind(T.win, "gestureend", T.ongesturezoom))),
              (T.railh = !1);
            var w;
            if (
              (M.horizrailenabled &&
                (T.css(i, { overflowX: "hidden" }),
                (d = n(l.createElement("div"))).css({
                  position: "absolute",
                  top: 0,
                  height: M.cursorwidth,
                  width: 0,
                  backgroundColor: M.cursorcolor,
                  border: M.cursorborder,
                  backgroundClip: "padding-box",
                  "-webkit-border-radius": M.cursorborderradius,
                  "-moz-border-radius": M.cursorborderradius,
                  "border-radius": M.cursorborderradius,
                }),
                P.isieold && d.css("overflow", "hidden"),
                d.addClass("nicescroll-cursors"),
                (T.cursorh = d),
                (w = n(l.createElement("div"))).attr("id", T.id + "-hr"),
                w.addClass("nicescroll-rails nicescroll-rails-hr"),
                (w.height = Math.max(
                  parseFloat(M.cursorwidth),
                  d.outerHeight()
                )),
                w.css({
                  height: w.height + "px",
                  zIndex: T.zindex,
                  background: M.background,
                }),
                w.append(d),
                (w.visibility = !0),
                (w.scrollable = !0),
                (w.align = "top" == M.railvalign ? 0 : 1),
                (T.railh = w),
                (T.railh.drag = !1)),
              T.ispage)
            )
              u.css({ position: "fixed", top: 0, height: "100%" }),
                u.css(u.align ? { right: 0 } : { left: 0 }),
                T.body.append(u),
                T.railh &&
                  (w.css({ position: "fixed", left: 0, width: "100%" }),
                  w.css(w.align ? { bottom: 0 } : { top: 0 }),
                  T.body.append(w));
            else {
              if (T.ishwscroll) {
                "static" == T.win.css("position") &&
                  T.css(T.win, { position: "relative" });
                var x = "HTML" == T.win[0].nodeName ? T.body : T.win;
                n(x).scrollTop(0).scrollLeft(0),
                  T.zoom &&
                    (T.zoom.css({
                      position: "absolute",
                      top: 1,
                      right: 0,
                      "margin-right": u.width + 4,
                    }),
                    x.append(T.zoom)),
                  u.css({ position: "absolute", top: 0 }),
                  u.css(u.align ? { right: 0 } : { left: 0 }),
                  x.append(u),
                  w &&
                    (w.css({ position: "absolute", left: 0, bottom: 0 }),
                    w.css(w.align ? { bottom: 0 } : { top: 0 }),
                    x.append(w));
              } else {
                T.isfixed = "fixed" == T.win.css("position");
                var S = T.isfixed ? "fixed" : "absolute";
                T.isfixed || (T.viewport = T.getViewport(T.win[0])),
                  T.viewport &&
                    ((T.body = T.viewport),
                    /fixed|absolute/.test(T.viewport.css("position")) ||
                      T.css(T.viewport, { position: "relative" })),
                  u.css({ position: S }),
                  T.zoom && T.zoom.css({ position: S }),
                  T.updateScrollBar(),
                  T.body.append(u),
                  T.zoom && T.body.append(T.zoom),
                  T.railh && (w.css({ position: S }), T.body.append(w));
              }
              P.isios &&
                T.css(T.win, {
                  "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                  "-webkit-touch-callout": "none",
                }),
                M.disableoutline &&
                  (P.isie && T.win.attr("hideFocus", "true"),
                  P.iswebkit && T.win.css("outline", "none"));
            }
            if (
              (!1 === M.autohidemode
                ? ((T.autohidedom = !1),
                  T.rail.css({ opacity: M.cursoropacitymax }),
                  T.railh && T.railh.css({ opacity: M.cursoropacitymax }))
                : !0 === M.autohidemode || "leave" === M.autohidemode
                ? ((T.autohidedom = n().add(T.rail)),
                  P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)),
                  T.railh && (T.autohidedom = T.autohidedom.add(T.railh)),
                  T.railh &&
                    P.isie8 &&
                    (T.autohidedom = T.autohidedom.add(T.cursorh)))
                : "scroll" == M.autohidemode
                ? ((T.autohidedom = n().add(T.rail)),
                  T.railh && (T.autohidedom = T.autohidedom.add(T.railh)))
                : "cursor" == M.autohidemode
                ? ((T.autohidedom = n().add(T.cursor)),
                  T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh)))
                : "hidden" == M.autohidemode &&
                  ((T.autohidedom = !1), T.hide(), (T.railslocked = !1)),
              P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch)
            ) {
              T.scrollmom = new y(T);
              (T.ontouchstart = function (e) {
                if (T.locked) return !1;
                if (
                  e.pointerType &&
                  ("mouse" === e.pointerType ||
                    e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                )
                  return !1;
                if (
                  ((T.hasmoving = !1),
                  T.scrollmom.timer &&
                    (T.triggerScrollEnd(), T.scrollmom.stop()),
                  !T.railslocked)
                ) {
                  var o = T.getTarget(e);
                  if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type))
                    return T.stopPropagation(e);
                  var t = "mousedown" === e.type;
                  if (
                    (!("clientX" in e) &&
                      "changedTouches" in e &&
                      ((e.clientX = e.changedTouches[0].clientX),
                      (e.clientY = e.changedTouches[0].clientY)),
                    T.forcescreen)
                  ) {
                    var r = e;
                    ((e = { original: e.original ? e.original : e }).clientX =
                      r.screenX),
                      (e.clientY = r.screenY);
                  }
                  if (
                    ((T.rail.drag = {
                      x: e.clientX,
                      y: e.clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      st: T.getScrollTop(),
                      sl: T.getScrollLeft(),
                      pt: 2,
                      dl: !1,
                      tg: o,
                    }),
                    T.ispage || !M.directionlockdeadzone)
                  )
                    T.rail.drag.dl = "f";
                  else {
                    var i = { w: c.width(), h: c.height() },
                      s = T.getContentSize(),
                      l = s.h - i.h,
                      a = s.w - i.w;
                    T.rail.scrollable && !T.railh.scrollable
                      ? (T.rail.drag.ck = l > 0 && "v")
                      : !T.rail.scrollable && T.railh.scrollable
                      ? (T.rail.drag.ck = a > 0 && "h")
                      : (T.rail.drag.ck = !1);
                  }
                  if (M.emulatetouch && T.isiframe && P.isie) {
                    var d = T.win.position();
                    (T.rail.drag.x += d.left), (T.rail.drag.y += d.top);
                  }
                  if (
                    ((T.hasmoving = !1),
                    (T.lastmouseup = !1),
                    T.scrollmom.reset(e.clientX, e.clientY),
                    o && t)
                  ) {
                    if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName))
                      return (
                        P.hasmousecapture && o.setCapture(),
                        M.emulatetouch
                          ? (o.onclick &&
                              !o._onclick &&
                              ((o._onclick = o.onclick),
                              (o.onclick = function (e) {
                                if (T.hasmoving) return !1;
                                o._onclick.call(this, e);
                              })),
                            T.cancelEvent(e))
                          : T.stopPropagation(e)
                      );
                    /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) &&
                      (T.preventclick = { tg: o, click: !1 });
                  }
                }
              }),
                (T.ontouchend = function (e) {
                  if (!T.rail.drag) return !0;
                  if (2 == T.rail.drag.pt) {
                    if (
                      e.pointerType &&
                      ("mouse" === e.pointerType ||
                        e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                    )
                      return !1;
                    T.rail.drag = !1;
                    var o = "mouseup" === e.type;
                    if (
                      T.hasmoving &&
                      (T.scrollmom.doMomentum(),
                      (T.lastmouseup = !0),
                      T.hideCursor(),
                      P.hasmousecapture && l.releaseCapture(),
                      o)
                    )
                      return T.cancelEvent(e);
                  } else if (1 == T.rail.drag.pt) return T.onmouseup(e);
                });
              var z = M.emulatetouch && T.isiframe && !P.hasmousecapture,
                k = (0.3 * M.directionlockdeadzone) | 0;
              (T.ontouchmove = function (e, o) {
                if (!T.rail.drag) return !0;
                if (
                  e.targetTouches &&
                  M.preventmultitouchscrolling &&
                  e.targetTouches.length > 1
                )
                  return !0;
                if (
                  e.pointerType &&
                  ("mouse" === e.pointerType ||
                    e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                )
                  return !0;
                if (2 == T.rail.drag.pt) {
                  "changedTouches" in e &&
                    ((e.clientX = e.changedTouches[0].clientX),
                    (e.clientY = e.changedTouches[0].clientY));
                  var t, r;
                  if (((r = t = 0), z && !o)) {
                    var i = T.win.position();
                    (r = -i.left), (t = -i.top);
                  }
                  var s = e.clientY + t,
                    n = s - T.rail.drag.y,
                    a = e.clientX + r,
                    c = a - T.rail.drag.x,
                    d = T.rail.drag.st - n;
                  if (T.ishwscroll && M.bouncescroll)
                    d < 0
                      ? (d = Math.round(d / 2))
                      : d > T.page.maxh &&
                        (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));
                  else if (
                    (d < 0
                      ? ((d = 0), (s = 0))
                      : d > T.page.maxh && ((d = T.page.maxh), (s = 0)),
                    0 === s && !T.hasmoving)
                  )
                    return T.ispage || (T.rail.drag = !1), !0;
                  var u = T.getScrollLeft();
                  if (
                    (T.railh &&
                      T.railh.scrollable &&
                      ((u = T.isrtlmode
                        ? c - T.rail.drag.sl
                        : T.rail.drag.sl - c),
                      T.ishwscroll && M.bouncescroll
                        ? u < 0
                          ? (u = Math.round(u / 2))
                          : u > T.page.maxw &&
                            (u =
                              T.page.maxw + Math.round((u - T.page.maxw) / 2))
                        : (u < 0 && ((u = 0), (a = 0)),
                          u > T.page.maxw && ((u = T.page.maxw), (a = 0)))),
                    !T.hasmoving)
                  ) {
                    if (
                      T.rail.drag.y === e.clientY &&
                      T.rail.drag.x === e.clientX
                    )
                      return T.cancelEvent(e);
                    var h = Math.abs(n),
                      p = Math.abs(c),
                      m = M.directionlockdeadzone;
                    if (
                      (T.rail.drag.ck
                        ? "v" == T.rail.drag.ck
                          ? p > m && h <= k
                            ? (T.rail.drag = !1)
                            : h > m && (T.rail.drag.dl = "v")
                          : "h" == T.rail.drag.ck &&
                            (h > m && p <= k
                              ? (T.rail.drag = !1)
                              : p > m && (T.rail.drag.dl = "h"))
                        : h > m && p > m
                        ? (T.rail.drag.dl = "f")
                        : h > m
                        ? (T.rail.drag.dl = p > k ? "f" : "v")
                        : p > m && (T.rail.drag.dl = h > k ? "f" : "h"),
                      !T.rail.drag.dl)
                    )
                      return T.cancelEvent(e);
                    T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                      (T.hasmoving = !0);
                  }
                  return (
                    T.preventclick &&
                      !T.preventclick.click &&
                      ((T.preventclick.click = T.preventclick.tg.onclick || !1),
                      (T.preventclick.tg.onclick = T.onpreventclick)),
                    T.rail.drag.dl &&
                      ("v" == T.rail.drag.dl
                        ? (u = T.rail.drag.sl)
                        : "h" == T.rail.drag.dl && (d = T.rail.drag.st)),
                    T.synched("touchmove", function () {
                      T.rail.drag &&
                        2 == T.rail.drag.pt &&
                        (T.prepareTransition && T.resetTransition(),
                        T.rail.scrollable && T.setScrollTop(d),
                        T.scrollmom.update(a, s),
                        T.railh && T.railh.scrollable
                          ? (T.setScrollLeft(u), T.showCursor(d, u))
                          : T.showCursor(d),
                        P.isie10 && l.selection.clear());
                    }),
                    T.cancelEvent(e)
                  );
                }
                return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0;
              }),
                (T.ontouchstartCursor = function (e, o) {
                  if (!T.rail.drag || 3 == T.rail.drag.pt) {
                    if (T.locked) return T.cancelEvent(e);
                    T.cancelScroll(),
                      (T.rail.drag = {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                        sx: T.scroll.x,
                        sy: T.scroll.y,
                        pt: 3,
                        hr: !!o,
                      });
                    var t = T.getTarget(e);
                    return (
                      !T.ispage && P.hasmousecapture && t.setCapture(),
                      T.isiframe &&
                        !P.hasmousecapture &&
                        ((T.saved.csspointerevents =
                          T.doc.css("pointer-events")),
                        T.css(T.doc, { "pointer-events": "none" })),
                      T.cancelEvent(e)
                    );
                  }
                }),
                (T.ontouchendCursor = function (e) {
                  if (T.rail.drag) {
                    if (
                      (P.hasmousecapture && l.releaseCapture(),
                      T.isiframe &&
                        !P.hasmousecapture &&
                        T.doc.css("pointer-events", T.saved.csspointerevents),
                      3 != T.rail.drag.pt)
                    )
                      return;
                    return (T.rail.drag = !1), T.cancelEvent(e);
                  }
                }),
                (T.ontouchmoveCursor = function (e) {
                  if (T.rail.drag) {
                    if (3 != T.rail.drag.pt) return;
                    if (((T.cursorfreezed = !0), T.rail.drag.hr)) {
                      (T.scroll.x =
                        T.rail.drag.sx +
                        (e.touches[0].clientX - T.rail.drag.x)),
                        T.scroll.x < 0 && (T.scroll.x = 0);
                      var o = T.scrollvaluemaxw;
                      T.scroll.x > o && (T.scroll.x = o);
                    } else {
                      (T.scroll.y =
                        T.rail.drag.sy +
                        (e.touches[0].clientY - T.rail.drag.y)),
                        T.scroll.y < 0 && (T.scroll.y = 0);
                      var t = T.scrollvaluemax;
                      T.scroll.y > t && (T.scroll.y = t);
                    }
                    return (
                      T.synched("touchmove", function () {
                        T.rail.drag &&
                          3 == T.rail.drag.pt &&
                          (T.showCursor(),
                          T.rail.drag.hr
                            ? T.doScrollLeft(
                                Math.round(T.scroll.x * T.scrollratio.x),
                                M.cursordragspeed
                              )
                            : T.doScrollTop(
                                Math.round(T.scroll.y * T.scrollratio.y),
                                M.cursordragspeed
                              ));
                      }),
                      T.cancelEvent(e)
                    );
                  }
                });
            }
            if (
              ((T.onmousedown = function (e, o) {
                if (!T.rail.drag || 1 == T.rail.drag.pt) {
                  if (T.railslocked) return T.cancelEvent(e);
                  T.cancelScroll(),
                    (T.rail.drag = {
                      x: e.clientX,
                      y: e.clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      pt: 1,
                      hr: o || !1,
                    });
                  var t = T.getTarget(e);
                  return (
                    P.hasmousecapture && t.setCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      ((T.saved.csspointerevents = T.doc.css("pointer-events")),
                      T.css(T.doc, { "pointer-events": "none" })),
                    (T.hasmoving = !1),
                    T.cancelEvent(e)
                  );
                }
              }),
              (T.onmouseup = function (e) {
                if (T.rail.drag)
                  return (
                    1 != T.rail.drag.pt ||
                    (P.hasmousecapture && l.releaseCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      T.doc.css("pointer-events", T.saved.csspointerevents),
                    (T.rail.drag = !1),
                    (T.cursorfreezed = !1),
                    T.hasmoving && T.triggerScrollEnd(),
                    T.cancelEvent(e))
                  );
              }),
              (T.onmousemove = function (e) {
                if (T.rail.drag) {
                  if (1 !== T.rail.drag.pt) return;
                  if (P.ischrome && 0 === e.which) return T.onmouseup(e);
                  if (
                    ((T.cursorfreezed = !0),
                    T.hasmoving ||
                      T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                    (T.hasmoving = !0),
                    T.rail.drag.hr)
                  ) {
                    (T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x)),
                      T.scroll.x < 0 && (T.scroll.x = 0);
                    var o = T.scrollvaluemaxw;
                    T.scroll.x > o && (T.scroll.x = o);
                  } else {
                    (T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y)),
                      T.scroll.y < 0 && (T.scroll.y = 0);
                    var t = T.scrollvaluemax;
                    T.scroll.y > t && (T.scroll.y = t);
                  }
                  return (
                    T.synched("mousemove", function () {
                      T.cursorfreezed &&
                        (T.showCursor(),
                        T.rail.drag.hr
                          ? T.scrollLeft(
                              Math.round(T.scroll.x * T.scrollratio.x)
                            )
                          : T.scrollTop(
                              Math.round(T.scroll.y * T.scrollratio.y)
                            ));
                    }),
                    T.cancelEvent(e)
                  );
                }
                T.checkarea = 0;
              }),
              P.cantouch || M.emulatetouch)
            )
              (T.onpreventclick = function (e) {
                if (T.preventclick)
                  return (
                    (T.preventclick.tg.onclick = T.preventclick.click),
                    (T.preventclick = !1),
                    T.cancelEvent(e)
                  );
              }),
                (T.onclick =
                  !P.isios &&
                  function (e) {
                    return (
                      !T.lastmouseup || ((T.lastmouseup = !1), T.cancelEvent(e))
                    );
                  }),
                M.grabcursorenabled &&
                  P.cursorgrabvalue &&
                  (T.css(T.ispage ? T.doc : T.win, {
                    cursor: P.cursorgrabvalue,
                  }),
                  T.css(T.rail, { cursor: P.cursorgrabvalue }));
            else {
              var L = function (e) {
                if (T.selectiondrag) {
                  if (e) {
                    var o = T.win.outerHeight(),
                      t = e.pageY - T.selectiondrag.top;
                    t > 0 && t < o && (t = 0),
                      t >= o && (t -= o),
                      (T.selectiondrag.df = t);
                  }
                  if (0 !== T.selectiondrag.df) {
                    var r = ((-2 * T.selectiondrag.df) / 6) | 0;
                    T.doScrollBy(r),
                      T.debounced(
                        "doselectionscroll",
                        function () {
                          L();
                        },
                        50
                      );
                  }
                }
              };
              (T.hasTextSelected =
                "getSelection" in l
                  ? function () {
                      return l.getSelection().rangeCount > 0;
                    }
                  : "selection" in l
                  ? function () {
                      return "None" != l.selection.type;
                    }
                  : function () {
                      return !1;
                    }),
                (T.onselectionstart = function (e) {
                  T.ispage || (T.selectiondrag = T.win.offset());
                }),
                (T.onselectionend = function (e) {
                  T.selectiondrag = !1;
                }),
                (T.onselectiondrag = function (e) {
                  T.selectiondrag &&
                    T.hasTextSelected() &&
                    T.debounced(
                      "selectionscroll",
                      function () {
                        L(e);
                      },
                      250
                    );
                });
            }
            if (
              (P.hasw3ctouch
                ? (T.css(T.ispage ? n("html") : T.win, {
                    "touch-action": "none",
                  }),
                  T.css(T.rail, { "touch-action": "none" }),
                  T.css(T.cursor, { "touch-action": "none" }),
                  T.bind(T.win, "pointerdown", T.ontouchstart),
                  T.bind(l, "pointerup", T.ontouchend),
                  T.delegate(l, "pointermove", T.ontouchmove))
                : P.hasmstouch
                ? (T.css(T.ispage ? n("html") : T.win, {
                    "-ms-touch-action": "none",
                  }),
                  T.css(T.rail, { "-ms-touch-action": "none" }),
                  T.css(T.cursor, { "-ms-touch-action": "none" }),
                  T.bind(T.win, "MSPointerDown", T.ontouchstart),
                  T.bind(l, "MSPointerUp", T.ontouchend),
                  T.delegate(l, "MSPointerMove", T.ontouchmove),
                  T.bind(T.cursor, "MSGestureHold", function (e) {
                    e.preventDefault();
                  }),
                  T.bind(T.cursor, "contextmenu", function (e) {
                    e.preventDefault();
                  }))
                : P.cantouch &&
                  (T.bind(T.win, "touchstart", T.ontouchstart, !1, !0),
                  T.bind(l, "touchend", T.ontouchend, !1, !0),
                  T.bind(l, "touchcancel", T.ontouchend, !1, !0),
                  T.delegate(l, "touchmove", T.ontouchmove, !1, !0)),
              M.emulatetouch &&
                (T.bind(T.win, "mousedown", T.ontouchstart, !1, !0),
                T.bind(l, "mouseup", T.ontouchend, !1, !0),
                T.bind(l, "mousemove", T.ontouchmove, !1, !0)),
              (M.cursordragontouch || (!P.cantouch && !M.emulatetouch)) &&
                (T.rail.css({ cursor: "default" }),
                T.railh && T.railh.css({ cursor: "default" }),
                T.jqbind(T.rail, "mouseenter", function () {
                  if (!T.ispage && !T.win.is(":visible")) return !1;
                  T.canshowonmouseevent && T.showCursor(), (T.rail.active = !0);
                }),
                T.jqbind(T.rail, "mouseleave", function () {
                  (T.rail.active = !1), T.rail.drag || T.hideCursor();
                }),
                M.sensitiverail &&
                  (T.bind(T.rail, "click", function (e) {
                    T.doRailClick(e, !1, !1);
                  }),
                  T.bind(T.rail, "dblclick", function (e) {
                    T.doRailClick(e, !0, !1);
                  }),
                  T.bind(T.cursor, "click", function (e) {
                    T.cancelEvent(e);
                  }),
                  T.bind(T.cursor, "dblclick", function (e) {
                    T.cancelEvent(e);
                  })),
                T.railh &&
                  (T.jqbind(T.railh, "mouseenter", function () {
                    if (!T.ispage && !T.win.is(":visible")) return !1;
                    T.canshowonmouseevent && T.showCursor(),
                      (T.rail.active = !0);
                  }),
                  T.jqbind(T.railh, "mouseleave", function () {
                    (T.rail.active = !1), T.rail.drag || T.hideCursor();
                  }),
                  M.sensitiverail &&
                    (T.bind(T.railh, "click", function (e) {
                      T.doRailClick(e, !1, !0);
                    }),
                    T.bind(T.railh, "dblclick", function (e) {
                      T.doRailClick(e, !0, !0);
                    }),
                    T.bind(T.cursorh, "click", function (e) {
                      T.cancelEvent(e);
                    }),
                    T.bind(T.cursorh, "dblclick", function (e) {
                      T.cancelEvent(e);
                    })))),
              M.cursordragontouch &&
                (this.istouchcapable || P.cantouch) &&
                (T.bind(T.cursor, "touchstart", T.ontouchstartCursor),
                T.bind(T.cursor, "touchmove", T.ontouchmoveCursor),
                T.bind(T.cursor, "touchend", T.ontouchendCursor),
                T.cursorh &&
                  T.bind(T.cursorh, "touchstart", function (e) {
                    T.ontouchstartCursor(e, !0);
                  }),
                T.cursorh &&
                  T.bind(T.cursorh, "touchmove", T.ontouchmoveCursor),
                T.cursorh && T.bind(T.cursorh, "touchend", T.ontouchendCursor)),
              M.emulatetouch || P.isandroid || P.isios
                ? (T.bind(
                    P.hasmousecapture ? T.win : l,
                    "mouseup",
                    T.ontouchend
                  ),
                  T.onclick && T.bind(l, "click", T.onclick),
                  M.cursordragontouch
                    ? (T.bind(T.cursor, "mousedown", T.onmousedown),
                      T.bind(T.cursor, "mouseup", T.onmouseup),
                      T.cursorh &&
                        T.bind(T.cursorh, "mousedown", function (e) {
                          T.onmousedown(e, !0);
                        }),
                      T.cursorh && T.bind(T.cursorh, "mouseup", T.onmouseup))
                    : (T.bind(T.rail, "mousedown", function (e) {
                        e.preventDefault();
                      }),
                      T.railh &&
                        T.bind(T.railh, "mousedown", function (e) {
                          e.preventDefault();
                        })))
                : (T.bind(
                    P.hasmousecapture ? T.win : l,
                    "mouseup",
                    T.onmouseup
                  ),
                  T.bind(l, "mousemove", T.onmousemove),
                  T.onclick && T.bind(l, "click", T.onclick),
                  T.bind(T.cursor, "mousedown", T.onmousedown),
                  T.bind(T.cursor, "mouseup", T.onmouseup),
                  T.railh &&
                    (T.bind(T.cursorh, "mousedown", function (e) {
                      T.onmousedown(e, !0);
                    }),
                    T.bind(T.cursorh, "mouseup", T.onmouseup)),
                  !T.ispage &&
                    M.enablescrollonselection &&
                    (T.bind(T.win[0], "mousedown", T.onselectionstart),
                    T.bind(l, "mouseup", T.onselectionend),
                    T.bind(T.cursor, "mouseup", T.onselectionend),
                    T.cursorh && T.bind(T.cursorh, "mouseup", T.onselectionend),
                    T.bind(l, "mousemove", T.onselectiondrag)),
                  T.zoom &&
                    (T.jqbind(T.zoom, "mouseenter", function () {
                      T.canshowonmouseevent && T.showCursor(),
                        (T.rail.active = !0);
                    }),
                    T.jqbind(T.zoom, "mouseleave", function () {
                      (T.rail.active = !1), T.rail.drag || T.hideCursor();
                    }))),
              M.enablemousewheel &&
                (T.isiframe ||
                  T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel),
                T.mousewheel(T.rail, T.onmousewheel),
                T.railh && T.mousewheel(T.railh, T.onmousewheelhr)),
              T.ispage ||
                P.cantouch ||
                /HTML|^BODY/.test(T.win[0].nodeName) ||
                (T.win.attr("tabindex") || T.win.attr({ tabindex: ++r }),
                T.bind(T.win, "focus", function (e) {
                  (o = T.getTarget(e).id || T.getTarget(e) || !1),
                    (T.hasfocus = !0),
                    T.canshowonmouseevent && T.noticeCursor();
                }),
                T.bind(T.win, "blur", function (e) {
                  (o = !1), (T.hasfocus = !1);
                }),
                T.bind(T.win, "mouseenter", function (e) {
                  (t = T.getTarget(e).id || T.getTarget(e) || !1),
                    (T.hasmousefocus = !0),
                    T.canshowonmouseevent && T.noticeCursor();
                }),
                T.bind(T.win, "mouseleave", function (e) {
                  (t = !1),
                    (T.hasmousefocus = !1),
                    T.rail.drag || T.hideCursor();
                })),
              (T.onkeypress = function (e) {
                if (T.railslocked && 0 === T.page.maxh) return !0;
                e = e || a.event;
                var r = T.getTarget(e);
                if (
                  r &&
                  /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) &&
                  (!(r.getAttribute("type") || r.type || !1) ||
                    !/submit|button|cancel/i.tp)
                )
                  return !0;
                if (n(r).attr("contenteditable")) return !0;
                if (
                  T.hasfocus ||
                  (T.hasmousefocus && !o) ||
                  (T.ispage && !o && !t)
                ) {
                  var i = e.keyCode;
                  if (T.railslocked && 27 != i) return T.cancelEvent(e);
                  var s = e.ctrlKey || !1,
                    l = e.shiftKey || !1,
                    c = !1;
                  switch (i) {
                    case 38:
                    case 63233:
                      T.doScrollBy(72), (c = !0);
                      break;
                    case 40:
                    case 63235:
                      T.doScrollBy(-72), (c = !0);
                      break;
                    case 37:
                    case 63232:
                      T.railh &&
                        (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72),
                        (c = !0));
                      break;
                    case 39:
                    case 63234:
                      T.railh &&
                        (s
                          ? T.doScrollLeft(T.page.maxw)
                          : T.doScrollLeftBy(-72),
                        (c = !0));
                      break;
                    case 33:
                    case 63276:
                      T.doScrollBy(T.view.h), (c = !0);
                      break;
                    case 34:
                    case 63277:
                      T.doScrollBy(-T.view.h), (c = !0);
                      break;
                    case 36:
                    case 63273:
                      T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0),
                        (c = !0);
                      break;
                    case 35:
                    case 63275:
                      T.railh && s
                        ? T.doScrollPos(T.page.maxw, T.page.maxh)
                        : T.doScrollTo(T.page.maxh),
                        (c = !0);
                      break;
                    case 32:
                      M.spacebarenabled &&
                        (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h),
                        (c = !0));
                      break;
                    case 27:
                      T.zoomactive && (T.doZoom(), (c = !0));
                  }
                  if (c) return T.cancelEvent(e);
                }
              }),
              M.enablekeyboard &&
                T.bind(
                  l,
                  P.isopera && !P.isopera12 ? "keypress" : "keydown",
                  T.onkeypress
                ),
              T.bind(l, "keydown", function (e) {
                (e.ctrlKey || !1) && (T.wheelprevented = !0);
              }),
              T.bind(l, "keyup", function (e) {
                e.ctrlKey || !1 || (T.wheelprevented = !1);
              }),
              T.bind(a, "blur", function (e) {
                T.wheelprevented = !1;
              }),
              T.bind(a, "resize", T.onscreenresize),
              T.bind(a, "orientationchange", T.onscreenresize),
              T.bind(a, "load", T.lazyResize),
              P.ischrome && !T.ispage && !T.haswrapper)
            ) {
              var C = T.win.attr("style"),
                N = parseFloat(T.win.css("width")) + 1;
              T.win.css("width", N),
                T.synched("chromefix", function () {
                  T.win.attr("style", C);
                });
            }
            if (
              ((T.onAttributeChange = function (e) {
                T.lazyResize(T.isieold ? 250 : 30);
              }),
              M.enableobserver &&
                (T.isie11 ||
                  !1 === m ||
                  ((T.observerbody = new m(function (e) {
                    if (
                      (e.forEach(function (e) {
                        if ("attributes" == e.type)
                          return E.hasClass("modal-open") &&
                            E.hasClass("modal-dialog") &&
                            !n.contains(n(".modal-dialog")[0], T.doc[0])
                            ? T.hide()
                            : T.show();
                      }),
                      T.me.clientWidth != T.page.width ||
                        T.me.clientHeight != T.page.height)
                    )
                      return T.lazyResize(30);
                  })),
                  T.observerbody.observe(l.body, {
                    childList: !0,
                    subtree: !0,
                    characterData: !1,
                    attributes: !0,
                    attributeFilter: ["class"],
                  })),
                !T.ispage && !T.haswrapper))
            ) {
              var R = T.win[0];
              !1 !== m
                ? ((T.observer = new m(function (e) {
                    e.forEach(T.onAttributeChange);
                  })),
                  T.observer.observe(R, {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1,
                  }),
                  (T.observerremover = new m(function (e) {
                    e.forEach(function (e) {
                      if (e.removedNodes.length > 0)
                        for (var o in e.removedNodes)
                          if (T && e.removedNodes[o] === R) return T.remove();
                    });
                  })),
                  T.observerremover.observe(R.parentNode, {
                    childList: !0,
                    characterData: !1,
                    attributes: !1,
                    subtree: !1,
                  }))
                : (T.bind(
                    R,
                    P.isie && !P.isie9 ? "propertychange" : "DOMAttrModified",
                    T.onAttributeChange
                  ),
                  P.isie9 &&
                    R.attachEvent("onpropertychange", T.onAttributeChange),
                  T.bind(R, "DOMNodeRemoved", function (e) {
                    e.target === R && T.remove();
                  }));
            }
            !T.ispage && M.boxzoom && T.bind(a, "resize", T.resizeZoom),
              T.istextarea &&
                (T.bind(T.win, "keydown", T.lazyResize),
                T.bind(T.win, "mouseup", T.lazyResize)),
              T.lazyResize(30);
          }
          if ("IFRAME" == this.doc[0].nodeName) {
            var _ = function () {
              T.iframexd = !1;
              var o;
              try {
                (o =
                  "contentDocument" in this
                    ? this.contentDocument
                    : this.contentWindow._doc).domain;
              } catch (e) {
                (T.iframexd = !0), (o = !1);
              }
              if (T.iframexd)
                return (
                  "console" in a &&
                    console.log("NiceScroll error: policy restriced iframe"),
                  !0
                );
              if (
                ((T.forcescreen = !0),
                T.isiframe &&
                  ((T.iframe = {
                    doc: n(o),
                    html: T.doc.contents().find("html")[0],
                    body: T.doc.contents().find("body")[0],
                  }),
                  (T.getContentSize = function () {
                    return {
                      w: Math.max(
                        T.iframe.html.scrollWidth,
                        T.iframe.body.scrollWidth
                      ),
                      h: Math.max(
                        T.iframe.html.scrollHeight,
                        T.iframe.body.scrollHeight
                      ),
                    };
                  }),
                  (T.docscroll = n(T.iframe.body))),
                !P.isios && M.iframeautoresize && !T.isiframe)
              ) {
                T.win.scrollTop(0), T.doc.height("");
                var t = Math.max(
                  o.getElementsByTagName("html")[0].scrollHeight,
                  o.body.scrollHeight
                );
                T.doc.height(t);
              }
              T.lazyResize(30),
                T.css(n(T.iframe.body), e),
                P.isios &&
                  T.haswrapper &&
                  T.css(n(o.body), {
                    "-webkit-transform": "translate3d(0,0,0)",
                  }),
                "contentWindow" in this
                  ? T.bind(this.contentWindow, "scroll", T.onscroll)
                  : T.bind(o, "scroll", T.onscroll),
                M.enablemousewheel && T.mousewheel(o, T.onmousewheel),
                M.enablekeyboard &&
                  T.bind(o, P.isopera ? "keypress" : "keydown", T.onkeypress),
                P.cantouch
                  ? (T.bind(o, "touchstart", T.ontouchstart),
                    T.bind(o, "touchmove", T.ontouchmove))
                  : M.emulatetouch &&
                    (T.bind(o, "mousedown", T.ontouchstart),
                    T.bind(o, "mousemove", function (e) {
                      return T.ontouchmove(e, !0);
                    }),
                    M.grabcursorenabled &&
                      P.cursorgrabvalue &&
                      T.css(n(o.body), { cursor: P.cursorgrabvalue })),
                T.bind(o, "mouseup", T.ontouchend),
                T.zoom &&
                  (M.dblclickzoom && T.bind(o, "dblclick", T.doZoom),
                  T.ongesturezoom && T.bind(o, "gestureend", T.ongesturezoom));
            };
            this.doc[0].readyState &&
              "complete" === this.doc[0].readyState &&
              setTimeout(function () {
                _.call(T.doc[0], !1);
              }, 500),
              T.bind(this.doc, "load", _);
          }
        }),
        (this.showCursor = function (e, o) {
          if (
            (T.cursortimeout &&
              (clearTimeout(T.cursortimeout), (T.cursortimeout = 0)),
            T.rail)
          ) {
            if (
              (T.autohidedom &&
                (T.autohidedom.stop().css({ opacity: M.cursoropacitymax }),
                (T.cursoractive = !0)),
              (T.rail.drag && 1 == T.rail.drag.pt) ||
                (void 0 !== e &&
                  !1 !== e &&
                  (T.scroll.y = (e / T.scrollratio.y) | 0),
                void 0 !== o && (T.scroll.x = (o / T.scrollratio.x) | 0)),
              T.cursor.css({ height: T.cursorheight, top: T.scroll.y }),
              T.cursorh)
            ) {
              var t = T.hasreversehr
                ? T.scrollvaluemaxw - T.scroll.x
                : T.scroll.x;
              T.cursorh.css({
                width: T.cursorwidth,
                left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t,
              }),
                (T.cursoractive = !0);
            }
            T.zoom && T.zoom.stop().css({ opacity: M.cursoropacitymax });
          }
        }),
        (this.hideCursor = function (e) {
          T.cursortimeout ||
            (T.rail &&
              T.autohidedom &&
              ((T.hasmousefocus && "leave" === M.autohidemode) ||
                (T.cursortimeout = setTimeout(function () {
                  (T.rail.active && T.showonmouseevent) ||
                    (T.autohidedom
                      .stop()
                      .animate({ opacity: M.cursoropacitymin }),
                    T.zoom &&
                      T.zoom.stop().animate({ opacity: M.cursoropacitymin }),
                    (T.cursoractive = !1)),
                    (T.cursortimeout = 0);
                }, e || M.hidecursordelay))));
        }),
        (this.noticeCursor = function (e, o, t) {
          T.showCursor(o, t), T.rail.active || T.hideCursor(e);
        }),
        (this.getContentSize = T.ispage
          ? function () {
              return {
                w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
                h: Math.max(
                  l.body.scrollHeight,
                  l.documentElement.scrollHeight
                ),
              };
            }
          : T.haswrapper
          ? function () {
              return { w: T.doc[0].offsetWidth, h: T.doc[0].offsetHeight };
            }
          : function () {
              return {
                w: T.docscroll[0].scrollWidth,
                h: T.docscroll[0].scrollHeight,
              };
            }),
        (this.onResize = function (e, o) {
          if (!T || !T.win) return !1;
          var t = T.page.maxh,
            r = T.page.maxw,
            i = T.view.h,
            s = T.view.w;
          if (
            ((T.view = {
              w: T.ispage ? T.win.width() : T.win[0].clientWidth,
              h: T.ispage ? T.win.height() : T.win[0].clientHeight,
            }),
            (T.page = o || T.getContentSize()),
            (T.page.maxh = Math.max(0, T.page.h - T.view.h)),
            (T.page.maxw = Math.max(0, T.page.w - T.view.w)),
            T.page.maxh == t &&
              T.page.maxw == r &&
              T.view.w == s &&
              T.view.h == i)
          ) {
            if (T.ispage) return T;
            var n = T.win.offset();
            if (T.lastposition) {
              var l = T.lastposition;
              if (l.top == n.top && l.left == n.left) return T;
            }
            T.lastposition = n;
          }
          return (
            0 === T.page.maxh
              ? (T.hideRail(),
                (T.scrollvaluemax = 0),
                (T.scroll.y = 0),
                (T.scrollratio.y = 0),
                (T.cursorheight = 0),
                T.setScrollTop(0),
                T.rail && (T.rail.scrollable = !1))
              : ((T.page.maxh -= M.railpadding.top + M.railpadding.bottom),
                (T.rail.scrollable = !0)),
            0 === T.page.maxw
              ? (T.hideRailHr(),
                (T.scrollvaluemaxw = 0),
                (T.scroll.x = 0),
                (T.scrollratio.x = 0),
                (T.cursorwidth = 0),
                T.setScrollLeft(0),
                T.railh && (T.railh.scrollable = !1))
              : ((T.page.maxw -= M.railpadding.left + M.railpadding.right),
                T.railh && (T.railh.scrollable = M.horizrailenabled)),
            (T.railslocked =
              T.locked || (0 === T.page.maxh && 0 === T.page.maxw)),
            T.railslocked
              ? (T.ispage || T.updateScrollBar(T.view), !1)
              : (T.hidden ||
                  (T.rail.visibility || T.showRail(),
                  T.railh && !T.railh.visibility && T.showRailHr()),
                T.istextarea &&
                  T.win.css("resize") &&
                  "none" != T.win.css("resize") &&
                  (T.view.h -= 20),
                (T.cursorheight = Math.min(
                  T.view.h,
                  Math.round(T.view.h * (T.view.h / T.page.h))
                )),
                (T.cursorheight = M.cursorfixedheight
                  ? M.cursorfixedheight
                  : Math.max(M.cursorminheight, T.cursorheight)),
                (T.cursorwidth = Math.min(
                  T.view.w,
                  Math.round(T.view.w * (T.view.w / T.page.w))
                )),
                (T.cursorwidth = M.cursorfixedheight
                  ? M.cursorfixedheight
                  : Math.max(M.cursorminheight, T.cursorwidth)),
                (T.scrollvaluemax =
                  T.view.h -
                  T.cursorheight -
                  (M.railpadding.top + M.railpadding.bottom)),
                T.hasborderbox ||
                  (T.scrollvaluemax -=
                    T.cursor[0].offsetHeight - T.cursor[0].clientHeight),
                T.railh &&
                  ((T.railh.width =
                    T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w),
                  (T.scrollvaluemaxw =
                    T.railh.width -
                    T.cursorwidth -
                    (M.railpadding.left + M.railpadding.right))),
                T.ispage || T.updateScrollBar(T.view),
                (T.scrollratio = {
                  x: T.page.maxw / T.scrollvaluemaxw,
                  y: T.page.maxh / T.scrollvaluemax,
                }),
                T.getScrollTop() > T.page.maxh
                  ? T.doScrollTop(T.page.maxh)
                  : ((T.scroll.y = (T.getScrollTop() / T.scrollratio.y) | 0),
                    (T.scroll.x = (T.getScrollLeft() / T.scrollratio.x) | 0),
                    T.cursoractive && T.noticeCursor()),
                T.scroll.y &&
                  0 === T.getScrollTop() &&
                  T.doScrollTo((T.scroll.y * T.scrollratio.y) | 0),
                T)
          );
        }),
        (this.resize = T.onResize);
      var O = 0;
      (this.onscreenresize = function (e) {
        clearTimeout(O);
        var o = !T.ispage && !T.haswrapper;
        o && T.hideRails(),
          (O = setTimeout(function () {
            T && (o && T.showRails(), T.resize()), (O = 0);
          }, 120));
      }),
        (this.lazyResize = function (e) {
          return (
            clearTimeout(O),
            (e = isNaN(e) ? 240 : e),
            (O = setTimeout(function () {
              T && T.resize(), (O = 0);
            }, e)),
            T
          );
        }),
        (this.jqbind = function (e, o, t) {
          T.events.push({ e: e, n: o, f: t, q: !0 }), n(e).on(o, t);
        }),
        (this.mousewheel = function (e, o, t) {
          var r = "jquery" in e ? e[0] : e;
          if ("onwheel" in l.createElement("div"))
            T._bind(r, "wheel", o, t || !1);
          else {
            var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";
            S(r, i, o, t || !1),
              "DOMMouseScroll" == i && S(r, "MozMousePixelScroll", o, t || !1);
          }
        });
      var Y = !1;
      if (P.haseventlistener) {
        try {
          var H = Object.defineProperty({}, "passive", {
            get: function () {
              Y = !0;
            },
          });
          a.addEventListener("test", null, H);
        } catch (e) {}
        (this.stopPropagation = function (e) {
          return (
            !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
          );
        }),
          (this.cancelEvent = function (e) {
            return (
              e.cancelable && e.preventDefault(),
              e.stopImmediatePropagation(),
              e.preventManipulation && e.preventManipulation(),
              !1
            );
          });
      } else
        (Event.prototype.preventDefault = function () {
          this.returnValue = !1;
        }),
          (Event.prototype.stopPropagation = function () {
            this.cancelBubble = !0;
          }),
          (a.constructor.prototype.addEventListener =
            l.constructor.prototype.addEventListener =
            Element.prototype.addEventListener =
              function (e, o, t) {
                this.attachEvent("on" + e, o);
              }),
          (a.constructor.prototype.removeEventListener =
            l.constructor.prototype.removeEventListener =
            Element.prototype.removeEventListener =
              function (e, o, t) {
                this.detachEvent("on" + e, o);
              }),
          (this.cancelEvent = function (e) {
            return (
              (e = e || a.event) &&
                ((e.cancelBubble = !0), (e.cancel = !0), (e.returnValue = !1)),
              !1
            );
          }),
          (this.stopPropagation = function (e) {
            return (e = e || a.event) && (e.cancelBubble = !0), !1;
          });
      (this.delegate = function (e, o, t, r, i) {
        var s = d[o] || !1;
        s ||
          ((s = {
            a: [],
            l: [],
            f: function (e) {
              for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
                if (!1 === (t = o[r].call(e.target, e))) return !1;
              return t;
            },
          }),
          T.bind(e, o, s.f, r, i),
          (d[o] = s)),
          T.ispage
            ? ((s.a = [T.id].concat(s.a)), (s.l = [t].concat(s.l)))
            : (s.a.push(T.id), s.l.push(t));
      }),
        (this.undelegate = function (e, o, t, r, i) {
          var s = d[o] || !1;
          if (s && s.l)
            for (var n = 0, l = s.l.length; n < l; n++)
              s.a[n] === T.id &&
                (s.a.splice(n),
                s.l.splice(n),
                0 === s.a.length && (T._unbind(e, o, s.l.f), (d[o] = null)));
        }),
        (this.bind = function (e, o, t, r, i) {
          var s = "jquery" in e ? e[0] : e;
          T._bind(s, o, t, r || !1, i || !1);
        }),
        (this._bind = function (e, o, t, r, i) {
          T.events.push({ e: e, n: o, f: t, b: r, q: !1 }),
            Y && i
              ? e.addEventListener(o, t, { passive: !1, capture: r })
              : e.addEventListener(o, t, r || !1);
        }),
        (this._unbind = function (e, o, t, r) {
          d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r);
        }),
        (this.unbindAll = function () {
          for (var e = 0; e < T.events.length; e++) {
            var o = T.events[e];
            o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b);
          }
        }),
        (this.showRails = function () {
          return T.showRail().showRailHr();
        }),
        (this.showRail = function () {
          return (
            0 === T.page.maxh ||
              (!T.ispage && "none" == T.win.css("display")) ||
              ((T.rail.visibility = !0), T.rail.css("display", "block")),
            T
          );
        }),
        (this.showRailHr = function () {
          return (
            T.railh &&
              (0 === T.page.maxw ||
                (!T.ispage && "none" == T.win.css("display")) ||
                ((T.railh.visibility = !0), T.railh.css("display", "block"))),
            T
          );
        }),
        (this.hideRails = function () {
          return T.hideRail().hideRailHr();
        }),
        (this.hideRail = function () {
          return (T.rail.visibility = !1), T.rail.css("display", "none"), T;
        }),
        (this.hideRailHr = function () {
          return (
            T.railh &&
              ((T.railh.visibility = !1), T.railh.css("display", "none")),
            T
          );
        }),
        (this.show = function () {
          return (T.hidden = !1), (T.railslocked = !1), T.showRails();
        }),
        (this.hide = function () {
          return (T.hidden = !0), (T.railslocked = !0), T.hideRails();
        }),
        (this.toggle = function () {
          return T.hidden ? T.show() : T.hide();
        }),
        (this.remove = function () {
          T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout);
          for (var e in T.delaylist) T.delaylist[e] && h(T.delaylist[e].h);
          T.doZoomOut(),
            T.unbindAll(),
            P.isie9 &&
              T.win[0].detachEvent("onpropertychange", T.onAttributeChange),
            !1 !== T.observer && T.observer.disconnect(),
            !1 !== T.observerremover && T.observerremover.disconnect(),
            !1 !== T.observerbody && T.observerbody.disconnect(),
            (T.events = null),
            T.cursor && T.cursor.remove(),
            T.cursorh && T.cursorh.remove(),
            T.rail && T.rail.remove(),
            T.railh && T.railh.remove(),
            T.zoom && T.zoom.remove();
          for (var o = 0; o < T.saved.css.length; o++) {
            var t = T.saved.css[o];
            t[0].css(t[1], void 0 === t[2] ? "" : t[2]);
          }
          (T.saved = !1), T.me.data("__nicescroll", "");
          var r = n.nicescroll;
          r.each(function (e) {
            if (this && this.id === T.id) {
              delete r[e];
              for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
              --r.length && delete r[r.length];
            }
          });
          for (var i in T) (T[i] = null), delete T[i];
          T = null;
        }),
        (this.scrollstart = function (e) {
          return (this.onscrollstart = e), T;
        }),
        (this.scrollend = function (e) {
          return (this.onscrollend = e), T;
        }),
        (this.scrollcancel = function (e) {
          return (this.onscrollcancel = e), T;
        }),
        (this.zoomin = function (e) {
          return (this.onzoomin = e), T;
        }),
        (this.zoomout = function (e) {
          return (this.onzoomout = e), T;
        }),
        (this.isScrollable = function (e) {
          var o = e.target ? e.target : e;
          if ("OPTION" == o.nodeName) return !0;
          for (
            ;
            o &&
            1 == o.nodeType &&
            o !== this.me[0] &&
            !/^BODY|HTML/.test(o.nodeName);

          ) {
            var t = n(o),
              r =
                t.css("overflowY") ||
                t.css("overflowX") ||
                t.css("overflow") ||
                "";
            if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
            o = !!o.parentNode && o.parentNode;
          }
          return !1;
        }),
        (this.getViewport = function (e) {
          for (
            var o = !(!e || !e.parentNode) && e.parentNode;
            o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);

          ) {
            var t = n(o);
            if (/fixed|absolute/.test(t.css("position"))) return t;
            var r =
              t.css("overflowY") ||
              t.css("overflowX") ||
              t.css("overflow") ||
              "";
            if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight)
              return t;
            if (t.getNiceScroll().length > 0) return t;
            o = !!o.parentNode && o.parentNode;
          }
          return !1;
        }),
        (this.triggerScrollStart = function (e, o, t, r, i) {
          if (T.onscrollstart) {
            var s = {
              type: "scrollstart",
              current: { x: e, y: o },
              request: { x: t, y: r },
              end: { x: T.newscrollx, y: T.newscrolly },
              speed: i,
            };
            T.onscrollstart.call(T, s);
          }
        }),
        (this.triggerScrollEnd = function () {
          if (T.onscrollend) {
            var e = T.getScrollLeft(),
              o = T.getScrollTop(),
              t = {
                type: "scrollend",
                current: { x: e, y: o },
                end: { x: e, y: o },
              };
            T.onscrollend.call(T, t);
          }
        });
      var B = 0,
        X = 0,
        D = 0,
        A = 1,
        q = !1;
      if (
        ((this.onmousewheel = function (e) {
          if (T.wheelprevented || T.locked) return !1;
          if (T.railslocked)
            return T.debounced("checkunlock", T.resize, 250), !1;
          if (T.rail.drag) return T.cancelEvent(e);
          if (
            ("auto" === M.oneaxismousemode &&
              0 !== e.deltaX &&
              (M.oneaxismousemode = !1),
            M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable)
          )
            return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);
          var o = f(),
            t = !1;
          if (
            (M.preservenativescrolling &&
              T.checkarea + 600 < o &&
              ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
            (T.checkarea = o),
            T.nativescrollingarea)
          )
            return !0;
          var r = k(e, !1, t);
          return r && (T.checkarea = 0), r;
        }),
        (this.onmousewheelhr = function (e) {
          if (!T.wheelprevented) {
            if (T.railslocked || !T.railh.scrollable) return !0;
            if (T.rail.drag) return T.cancelEvent(e);
            var o = f(),
              t = !1;
            return (
              M.preservenativescrolling &&
                T.checkarea + 600 < o &&
                ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
              (T.checkarea = o),
              !!T.nativescrollingarea ||
                (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
            );
          }
        }),
        (this.stop = function () {
          return (
            T.cancelScroll(),
            T.scrollmon && T.scrollmon.stop(),
            (T.cursorfreezed = !1),
            (T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y))),
            T.noticeCursor(),
            T
          );
        }),
        (this.getTransitionSpeed = function (e) {
          return (80 + (e / 72) * M.scrollspeed) | 0;
        }),
        M.smoothscroll)
      )
        if (
          T.ishwscroll &&
          P.hastransition &&
          M.usetransition &&
          M.smoothscroll
        ) {
          var j = "";
          (this.resetTransition = function () {
            (j = ""), T.doc.css(P.prefixstyle + "transition-duration", "0ms");
          }),
            (this.prepareTransition = function (e, o) {
              var t = o ? e : T.getTransitionSpeed(e),
                r = t + "ms";
              return (
                j !== r &&
                  ((j = r),
                  T.doc.css(P.prefixstyle + "transition-duration", r)),
                t
              );
            }),
            (this.doScrollLeft = function (e, o) {
              var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
              T.doScrollPos(e, t, o);
            }),
            (this.doScrollTop = function (e, o) {
              var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
              T.doScrollPos(t, e, o);
            }),
            (this.cursorupdate = {
              running: !1,
              start: function () {
                var e = this;
                if (!e.running) {
                  e.running = !0;
                  var o = function () {
                    e.running && u(o),
                      T.showCursor(T.getScrollTop(), T.getScrollLeft()),
                      T.notifyScrollEvent(T.win[0]);
                  };
                  u(o);
                }
              },
              stop: function () {
                this.running = !1;
              },
            }),
            (this.doScrollPos = function (e, o, t) {
              var r = T.getScrollTop(),
                i = T.getScrollLeft();
              if (
                (((T.newscrolly - r) * (o - r) < 0 ||
                  (T.newscrollx - i) * (e - i) < 0) &&
                  T.cancelScroll(),
                M.bouncescroll
                  ? (o < 0
                      ? (o = (o / 2) | 0)
                      : o > T.page.maxh &&
                        (o = (T.page.maxh + (o - T.page.maxh) / 2) | 0),
                    e < 0
                      ? (e = (e / 2) | 0)
                      : e > T.page.maxw &&
                        (e = (T.page.maxw + (e - T.page.maxw) / 2) | 0))
                  : (o < 0 ? (o = 0) : o > T.page.maxh && (o = T.page.maxh),
                    e < 0 ? (e = 0) : e > T.page.maxw && (e = T.page.maxw)),
                T.scrollrunning && e == T.newscrollx && o == T.newscrolly)
              )
                return !1;
              (T.newscrolly = o), (T.newscrollx = e);
              var s = T.getScrollTop(),
                n = T.getScrollLeft(),
                l = {};
              (l.x = e - n), (l.y = o - s);
              var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
                c = T.prepareTransition(a);
              T.scrollrunning ||
                ((T.scrollrunning = !0),
                T.triggerScrollStart(n, s, e, o, c),
                T.cursorupdate.start()),
                (T.scrollendtrapped = !0),
                P.transitionend ||
                  (T.scrollendtrapped && clearTimeout(T.scrollendtrapped),
                  (T.scrollendtrapped = setTimeout(
                    T.onScrollTransitionEnd,
                    c
                  ))),
                T.setScrollTop(T.newscrolly),
                T.setScrollLeft(T.newscrollx);
            }),
            (this.cancelScroll = function () {
              if (!T.scrollendtrapped) return !0;
              var e = T.getScrollTop(),
                o = T.getScrollLeft();
              return (
                (T.scrollrunning = !1),
                P.transitionend || clearTimeout(P.transitionend),
                (T.scrollendtrapped = !1),
                T.resetTransition(),
                T.setScrollTop(e),
                T.railh && T.setScrollLeft(o),
                T.timerscroll &&
                  T.timerscroll.tm &&
                  clearInterval(T.timerscroll.tm),
                (T.timerscroll = !1),
                (T.cursorfreezed = !1),
                T.cursorupdate.stop(),
                T.showCursor(e, o),
                T
              );
            }),
            (this.onScrollTransitionEnd = function () {
              if (T.scrollendtrapped) {
                var e = T.getScrollTop(),
                  o = T.getScrollLeft();
                if (
                  (e < 0 ? (e = 0) : e > T.page.maxh && (e = T.page.maxh),
                  o < 0 ? (o = 0) : o > T.page.maxw && (o = T.page.maxw),
                  e != T.newscrolly || o != T.newscrollx)
                )
                  return T.doScrollPos(o, e, M.snapbackspeed);
                T.scrollrunning && T.triggerScrollEnd(),
                  (T.scrollrunning = !1),
                  (T.scrollendtrapped = !1),
                  T.resetTransition(),
                  (T.timerscroll = !1),
                  T.setScrollTop(e),
                  T.railh && T.setScrollLeft(o),
                  T.cursorupdate.stop(),
                  T.noticeCursor(!1, e, o),
                  (T.cursorfreezed = !1);
              }
            });
        } else
          (this.doScrollLeft = function (e, o) {
            var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
            T.doScrollPos(e, t, o);
          }),
            (this.doScrollTop = function (e, o) {
              var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
              T.doScrollPos(t, e, o);
            }),
            (this.doScrollPos = function (e, o, t) {
              var r = T.getScrollTop(),
                i = T.getScrollLeft();
              ((T.newscrolly - r) * (o - r) < 0 ||
                (T.newscrollx - i) * (e - i) < 0) &&
                T.cancelScroll();
              var s = !1;
              if (
                ((T.bouncescroll && T.rail.visibility) ||
                  (o < 0
                    ? ((o = 0), (s = !0))
                    : o > T.page.maxh && ((o = T.page.maxh), (s = !0))),
                (T.bouncescroll && T.railh.visibility) ||
                  (e < 0
                    ? ((e = 0), (s = !0))
                    : e > T.page.maxw && ((e = T.page.maxw), (s = !0))),
                T.scrollrunning && T.newscrolly === o && T.newscrollx === e)
              )
                return !0;
              (T.newscrolly = o),
                (T.newscrollx = e),
                (T.dst = {}),
                (T.dst.x = e - i),
                (T.dst.y = o - r),
                (T.dst.px = i),
                (T.dst.py = r);
              var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y),
                l = T.getTransitionSpeed(n);
              T.bzscroll = {};
              var a = s ? 1 : 0.58;
              (T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1)),
                (T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1));
              f();
              var c = function () {
                if (T.scrollrunning) {
                  var e = T.bzscroll.y.getPos();
                  T.setScrollLeft(T.bzscroll.x.getNow()),
                    T.setScrollTop(T.bzscroll.y.getNow()),
                    e <= 1
                      ? (T.timer = u(c))
                      : ((T.scrollrunning = !1),
                        (T.timer = 0),
                        T.triggerScrollEnd());
                }
              };
              T.scrollrunning ||
                (T.triggerScrollStart(i, r, e, o, l),
                (T.scrollrunning = !0),
                (T.timer = u(c)));
            }),
            (this.cancelScroll = function () {
              return (
                T.timer && h(T.timer),
                (T.timer = 0),
                (T.bzscroll = !1),
                (T.scrollrunning = !1),
                T
              );
            });
      else
        (this.doScrollLeft = function (e, o) {
          var t = T.getScrollTop();
          T.doScrollPos(e, t, o);
        }),
          (this.doScrollTop = function (e, o) {
            var t = T.getScrollLeft();
            T.doScrollPos(t, e, o);
          }),
          (this.doScrollPos = function (e, o, t) {
            var r = e > T.page.maxw ? T.page.maxw : e;
            r < 0 && (r = 0);
            var i = o > T.page.maxh ? T.page.maxh : o;
            i < 0 && (i = 0),
              T.synched("scroll", function () {
                T.setScrollTop(i), T.setScrollLeft(r);
              });
          }),
          (this.cancelScroll = function () {});
      (this.doScrollBy = function (e, o) {
        z(0, e);
      }),
        (this.doScrollLeftBy = function (e, o) {
          z(e, 0);
        }),
        (this.doScrollTo = function (e, o) {
          var t = o ? Math.round(e * T.scrollratio.y) : e;
          t < 0 ? (t = 0) : t > T.page.maxh && (t = T.page.maxh),
            (T.cursorfreezed = !1),
            T.doScrollTop(e);
        }),
        (this.checkContentSize = function () {
          var e = T.getContentSize();
          (e.h == T.page.h && e.w == T.page.w) || T.resize(!1, e);
        }),
        (T.onscroll = function (e) {
          T.rail.drag ||
            T.cursorfreezed ||
            T.synched("scroll", function () {
              (T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y)),
                T.railh &&
                  (T.scroll.x = Math.round(
                    T.getScrollLeft() / T.scrollratio.x
                  )),
                T.noticeCursor();
            });
        }),
        T.bind(T.docscroll, "scroll", T.onscroll),
        (this.doZoomIn = function (e) {
          if (!T.zoomactive) {
            (T.zoomactive = !0), (T.zoomrestore = { style: {} });
            var o = [
                "position",
                "top",
                "left",
                "zIndex",
                "backgroundColor",
                "marginTop",
                "marginBottom",
                "marginLeft",
                "marginRight",
              ],
              t = T.win[0].style;
            for (var r in o) {
              var i = o[r];
              T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : "";
            }
            (T.zoomrestore.style.width = T.win.css("width")),
              (T.zoomrestore.style.height = T.win.css("height")),
              (T.zoomrestore.padding = {
                w: T.win.outerWidth() - T.win.width(),
                h: T.win.outerHeight() - T.win.height(),
              }),
              P.isios4 &&
                ((T.zoomrestore.scrollTop = c.scrollTop()), c.scrollTop(0)),
              T.win.css({
                position: P.isios4 ? "absolute" : "fixed",
                top: 0,
                left: 0,
                zIndex: s + 100,
                margin: 0,
              });
            var n = T.win.css("backgroundColor");
            return (
              ("" === n ||
                /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) &&
                T.win.css("backgroundColor", "#fff"),
              T.rail.css({ zIndex: s + 101 }),
              T.zoom.css({ zIndex: s + 102 }),
              T.zoom.css("backgroundPosition", "0 -18px"),
              T.resizeZoom(),
              T.onzoomin && T.onzoomin.call(T),
              T.cancelEvent(e)
            );
          }
        }),
        (this.doZoomOut = function (e) {
          if (T.zoomactive)
            return (
              (T.zoomactive = !1),
              T.win.css("margin", ""),
              T.win.css(T.zoomrestore.style),
              P.isios4 && c.scrollTop(T.zoomrestore.scrollTop),
              T.rail.css({ "z-index": T.zindex }),
              T.zoom.css({ "z-index": T.zindex }),
              (T.zoomrestore = !1),
              T.zoom.css("backgroundPosition", "0 0"),
              T.onResize(),
              T.onzoomout && T.onzoomout.call(T),
              T.cancelEvent(e)
            );
        }),
        (this.doZoom = function (e) {
          return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e);
        }),
        (this.resizeZoom = function () {
          if (T.zoomactive) {
            var e = T.getScrollTop();
            T.win.css({
              width: c.width() - T.zoomrestore.padding.w + "px",
              height: c.height() - T.zoomrestore.padding.h + "px",
            }),
              T.onResize(),
              T.setScrollTop(Math.min(T.page.maxh, e));
          }
        }),
        this.init(),
        n.nicescroll.push(this);
    },
    y = function (e) {
      var o = this;
      (this.nc = e),
        (this.lastx = 0),
        (this.lasty = 0),
        (this.speedx = 0),
        (this.speedy = 0),
        (this.lasttime = 0),
        (this.steptime = 0),
        (this.snapx = !1),
        (this.snapy = !1),
        (this.demulx = 0),
        (this.demuly = 0),
        (this.lastscrollx = -1),
        (this.lastscrolly = -1),
        (this.chkx = 0),
        (this.chky = 0),
        (this.timer = 0),
        (this.reset = function (e, t) {
          o.stop(),
            (o.steptime = 0),
            (o.lasttime = f()),
            (o.speedx = 0),
            (o.speedy = 0),
            (o.lastx = e),
            (o.lasty = t),
            (o.lastscrollx = -1),
            (o.lastscrolly = -1);
        }),
        (this.update = function (e, t) {
          var r = f();
          (o.steptime = r - o.lasttime), (o.lasttime = r);
          var i = t - o.lasty,
            s = e - o.lastx,
            n = o.nc.getScrollTop() + i,
            l = o.nc.getScrollLeft() + s;
          (o.snapx = l < 0 || l > o.nc.page.maxw),
            (o.snapy = n < 0 || n > o.nc.page.maxh),
            (o.speedx = s),
            (o.speedy = i),
            (o.lastx = e),
            (o.lasty = t);
        }),
        (this.stop = function () {
          o.nc.unsynched("domomentum2d"),
            o.timer && clearTimeout(o.timer),
            (o.timer = 0),
            (o.lastscrollx = -1),
            (o.lastscrolly = -1);
        }),
        (this.doSnapy = function (e, t) {
          var r = !1;
          t < 0
            ? ((t = 0), (r = !0))
            : t > o.nc.page.maxh && ((t = o.nc.page.maxh), (r = !0)),
            e < 0
              ? ((e = 0), (r = !0))
              : e > o.nc.page.maxw && ((e = o.nc.page.maxw), (r = !0)),
            r
              ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed)
              : o.nc.triggerScrollEnd();
        }),
        (this.doMomentum = function (e) {
          var t = f(),
            r = e ? t + e : o.lasttime,
            i = o.nc.getScrollLeft(),
            s = o.nc.getScrollTop(),
            n = o.nc.page.maxh,
            l = o.nc.page.maxw;
          (o.speedx = l > 0 ? Math.min(60, o.speedx) : 0),
            (o.speedy = n > 0 ? Math.min(60, o.speedy) : 0);
          var a = r && t - r <= 60;
          (s < 0 || s > n || i < 0 || i > l) && (a = !1);
          var c = !(!o.speedy || !a) && o.speedy,
            d = !(!o.speedx || !a) && o.speedx;
          if (c || d) {
            var u = Math.max(16, o.steptime);
            if (u > 50) {
              var h = u / 50;
              (o.speedx *= h), (o.speedy *= h), (u = 50);
            }
            (o.demulxy = 0),
              (o.lastscrollx = o.nc.getScrollLeft()),
              (o.chkx = o.lastscrollx),
              (o.lastscrolly = o.nc.getScrollTop()),
              (o.chky = o.lastscrolly);
            var p = o.lastscrollx,
              m = o.lastscrolly,
              g = function () {
                var e = f() - t > 600 ? 0.04 : 0.02;
                o.speedx &&
                  ((p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy))),
                  (o.lastscrollx = p),
                  (p < 0 || p > l) && (e = 0.1)),
                  o.speedy &&
                    ((m = Math.floor(
                      o.lastscrolly - o.speedy * (1 - o.demulxy)
                    )),
                    (o.lastscrolly = m),
                    (m < 0 || m > n) && (e = 0.1)),
                  (o.demulxy = Math.min(1, o.demulxy + e)),
                  o.nc.synched("domomentum2d", function () {
                    if (o.speedx) {
                      o.nc.getScrollLeft();
                      (o.chkx = p), o.nc.setScrollLeft(p);
                    }
                    if (o.speedy) {
                      o.nc.getScrollTop();
                      (o.chky = m), o.nc.setScrollTop(m);
                    }
                    o.timer || (o.nc.hideCursor(), o.doSnapy(p, m));
                  }),
                  o.demulxy < 1
                    ? (o.timer = setTimeout(g, u))
                    : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m));
              };
            g();
          } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop());
        });
    },
    x = e.fn.scrollTop;
  (e.cssHooks.pageYOffset = {
    get: function (e, o, t) {
      var r = n.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollTop() : x.call(e);
    },
    set: function (e, o) {
      var t = n.data(e, "__nicescroll") || !1;
      return (
        t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this
      );
    },
  }),
    (e.fn.scrollTop = function (e) {
      if (void 0 === e) {
        var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
        return o && o.ishwscroll ? o.getScrollTop() : x.call(this);
      }
      return this.each(function () {
        var o = n.data(this, "__nicescroll") || !1;
        o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e);
      });
    });
  var S = e.fn.scrollLeft;
  (n.cssHooks.pageXOffset = {
    get: function (e, o, t) {
      var r = n.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollLeft() : S.call(e);
    },
    set: function (e, o) {
      var t = n.data(e, "__nicescroll") || !1;
      return (
        t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this
      );
    },
  }),
    (e.fn.scrollLeft = function (e) {
      if (void 0 === e) {
        var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
        return o && o.ishwscroll ? o.getScrollLeft() : S.call(this);
      }
      return this.each(function () {
        var o = n.data(this, "__nicescroll") || !1;
        o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e);
      });
    });
  var z = function (e) {
    var o = this;
    if (
      ((this.length = 0),
      (this.name = "nicescrollarray"),
      (this.each = function (e) {
        return n.each(o, e), o;
      }),
      (this.push = function (e) {
        (o[o.length] = e), o.length++;
      }),
      (this.eq = function (e) {
        return o[e];
      }),
      e)
    )
      for (var t = 0; t < e.length; t++) {
        var r = n.data(e[t], "__nicescroll") || !1;
        r && ((this[this.length] = r), this.length++);
      }
    return this;
  };
  !(function (e, o, t) {
    for (var r = 0, i = o.length; r < i; r++) t(e, o[r]);
  })(
    z.prototype,
    [
      "show",
      "hide",
      "toggle",
      "onResize",
      "resize",
      "remove",
      "stop",
      "doScrollPos",
    ],
    function (e, o) {
      e[o] = function () {
        var e = arguments;
        return this.each(function () {
          this[o].apply(this, e);
        });
      };
    }
  ),
    (e.fn.getNiceScroll = function (e) {
      return void 0 === e
        ? new z(this)
        : (this[e] && n.data(this[e], "__nicescroll")) || !1;
    }),
    ((e.expr.pseudos || e.expr[":"]).nicescroll = function (e) {
      return void 0 !== n.data(e, "__nicescroll");
    }),
    (n.fn.niceScroll = function (e, o) {
      void 0 !== o ||
        "object" != typeof e ||
        "jquery" in e ||
        ((o = e), (e = !1));
      var t = new z();
      return (
        this.each(function () {
          var r = n(this),
            i = n.extend({}, o);
          if (e) {
            var s = n(e);
            (i.doc = s.length > 1 ? n(e, r) : s), (i.win = r);
          }
          !("doc" in i) || "win" in i || (i.win = r);
          var l = r.data("__nicescroll") || !1;
          l ||
            ((i.doc = i.doc || r),
            (l = new b(i, r)),
            r.data("__nicescroll", l)),
            t.push(l);
        }),
        1 === t.length ? t[0] : t
      );
    }),
    (a.NiceScroll = {
      getjQuery: function () {
        return e;
      },
    }),
    n.nicescroll || ((n.nicescroll = new z()), (n.nicescroll.options = g));
});

/**
 * @deprecated since 15.7 !!!!!
 *
 * Slider
 *
 * carouFredSel
 *
 * 6.2.1 | caroufredsel.dev7studios.com | Copyright (c) 2013 Fred Heusschen | Dual licensed under the MIT and GPL licenses.
 */
(function ($) {
  function sc_setScroll(a, b, c) {
    return (
      "transition" == c.transition && "swing" == b && (b = "ease"),
      {
        anims: [],
        duration: a,
        orgDuration: a,
        easing: b,
        startTime: getTime(),
      }
    );
  }
  function sc_startScroll(a, b) {
    for (var c = 0, d = a.anims.length; d > c; c++) {
      var e = a.anims[c];
      e && e[0][b.transition](e[1], a.duration, a.easing, e[2]);
    }
  }
  function sc_stopScroll(a, b) {
    is_boolean(b) || (b = !0), is_object(a.pre) && sc_stopScroll(a.pre, b);
    for (var c = 0, d = a.anims.length; d > c; c++) {
      var e = a.anims[c];
      e[0].stop(!0), b && (e[0].css(e[1]), is_function(e[2]) && e[2]());
    }
    is_object(a.post) && sc_stopScroll(a.post, b);
  }
  function sc_afterScroll(a, b, c) {
    switch ((b && b.remove(), c.fx)) {
      case "fade":
      case "crossfade":
      case "cover-fade":
      case "uncover-fade":
        a.css("opacity", 1), a.css("filter", "");
    }
  }
  function sc_fireCallbacks(a, b, c, d, e) {
    if ((b[c] && b[c].call(a, d), e[c].length))
      for (var f = 0, g = e[c].length; g > f; f++) e[c][f].call(a, d);
    return [];
  }
  function sc_fireQueue(a, b, c) {
    return b.length && (a.trigger(cf_e(b[0][0], c), b[0][1]), b.shift()), b;
  }
  function sc_hideHiddenItems(a) {
    a.each(function () {
      var a = $(this);
      a.data("_cfs_isHidden", a.is(":hidden")).hide();
    });
  }
  function sc_showHiddenItems(a) {
    a &&
      a.each(function () {
        var a = $(this);
        a.data("_cfs_isHidden") || a.show();
      });
  }
  function sc_clearTimers(a) {
    return (
      a.auto && clearTimeout(a.auto), a.progress && clearInterval(a.progress), a
    );
  }
  function sc_mapCallbackArguments(a, b, c, d, e, f, g) {
    return {
      width: g.width,
      height: g.height,
      items: { old: a, skipped: b, visible: c },
      scroll: { items: d, direction: e, duration: f },
    };
  }
  function sc_getDuration(a, b, c, d) {
    var e = a.duration;
    return "none" == a.fx
      ? 0
      : ("auto" == e
          ? (e = (b.scroll.duration / b.scroll.items) * c)
          : 10 > e && (e = d / e),
        1 > e ? 0 : ("fade" == a.fx && (e /= 2), Math.round(e)));
  }
  function nv_showNavi(a, b, c) {
    var d = is_number(a.items.minimum) ? a.items.minimum : a.items.visible + 1;
    if ("show" == b || "hide" == b) var e = b;
    else if (d > b) {
      debug(
        c,
        "Not enough items (" +
          b +
          " total, " +
          d +
          " needed): Hiding navigation."
      );
      var e = "hide";
    } else var e = "show";
    var f = "show" == e ? "removeClass" : "addClass",
      g = cf_c("hidden", c);
    a.auto.button && a.auto.button[e]()[f](g),
      a.prev.button && a.prev.button[e]()[f](g),
      a.next.button && a.next.button[e]()[f](g),
      a.pagination.container && a.pagination.container[e]()[f](g);
  }
  function nv_enableNavi(a, b, c) {
    if (!a.circular && !a.infinite) {
      var d = "removeClass" == b || "addClass" == b ? b : !1,
        e = cf_c("disabled", c);
      if ((a.auto.button && d && a.auto.button[d](e), a.prev.button)) {
        var f = d || 0 == b ? "addClass" : "removeClass";
        a.prev.button[f](e);
      }
      if (a.next.button) {
        var f = d || b == a.items.visible ? "addClass" : "removeClass";
        a.next.button[f](e);
      }
    }
  }
  function go_getObject(a, b) {
    return is_function(b) ? (b = b.call(a)) : is_undefined(b) && (b = {}), b;
  }
  function go_getItemsObject(a, b) {
    return (
      (b = go_getObject(a, b)),
      is_number(b)
        ? (b = { visible: b })
        : "variable" == b
        ? (b = { visible: b, width: b, height: b })
        : is_object(b) || (b = {}),
      b
    );
  }
  function go_getScrollObject(a, b) {
    return (
      (b = go_getObject(a, b)),
      is_number(b)
        ? (b = 50 >= b ? { items: b } : { duration: b })
        : is_string(b)
        ? (b = { easing: b })
        : is_object(b) || (b = {}),
      b
    );
  }
  function go_getNaviObject(a, b) {
    if (((b = go_getObject(a, b)), is_string(b))) {
      var c = cf_getKeyCode(b);
      b = -1 == c ? $(b) : c;
    }
    return b;
  }
  function go_getAutoObject(a, b) {
    return (
      (b = go_getNaviObject(a, b)),
      is_jquery(b)
        ? (b = { button: b })
        : is_boolean(b)
        ? (b = { play: b })
        : is_number(b) && (b = { timeoutDuration: b }),
      b.progress &&
        (is_string(b.progress) || is_jquery(b.progress)) &&
        (b.progress = { bar: b.progress }),
      b
    );
  }
  function go_complementAutoObject(a, b) {
    return (
      is_function(b.button) && (b.button = b.button.call(a)),
      is_string(b.button) && (b.button = $(b.button)),
      is_boolean(b.play) || (b.play = !0),
      is_number(b.delay) || (b.delay = 0),
      is_undefined(b.pauseOnEvent) && (b.pauseOnEvent = !0),
      is_boolean(b.pauseOnResize) || (b.pauseOnResize = !0),
      is_number(b.timeoutDuration) ||
        (b.timeoutDuration = 10 > b.duration ? 2500 : 5 * b.duration),
      b.progress &&
        (is_function(b.progress.bar) &&
          (b.progress.bar = b.progress.bar.call(a)),
        is_string(b.progress.bar) && (b.progress.bar = $(b.progress.bar)),
        b.progress.bar
          ? (is_function(b.progress.updater) ||
              (b.progress.updater = $.fn.carouFredSel.progressbarUpdater),
            is_number(b.progress.interval) || (b.progress.interval = 50))
          : (b.progress = !1)),
      b
    );
  }
  function go_getPrevNextObject(a, b) {
    return (
      (b = go_getNaviObject(a, b)),
      is_jquery(b) ? (b = { button: b }) : is_number(b) && (b = { key: b }),
      b
    );
  }
  function go_complementPrevNextObject(a, b) {
    return (
      is_function(b.button) && (b.button = b.button.call(a)),
      is_string(b.button) && (b.button = $(b.button)),
      is_string(b.key) && (b.key = cf_getKeyCode(b.key)),
      b
    );
  }
  function go_getPaginationObject(a, b) {
    return (
      (b = go_getNaviObject(a, b)),
      is_jquery(b)
        ? (b = { container: b })
        : is_boolean(b) && (b = { keys: b }),
      b
    );
  }
  function go_complementPaginationObject(a, b) {
    return (
      is_function(b.container) && (b.container = b.container.call(a)),
      is_string(b.container) && (b.container = $(b.container)),
      is_number(b.items) || (b.items = !1),
      is_boolean(b.keys) || (b.keys = !1),
      is_function(b.anchorBuilder) ||
        is_false(b.anchorBuilder) ||
        (b.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder),
      is_number(b.deviation) || (b.deviation = 0),
      b
    );
  }
  function go_getSwipeObject(a, b) {
    return (
      is_function(b) && (b = b.call(a)),
      is_undefined(b) && (b = { onTouch: !1 }),
      is_true(b) ? (b = { onTouch: b }) : is_number(b) && (b = { items: b }),
      b
    );
  }
  function go_complementSwipeObject(a, b) {
    return (
      is_boolean(b.onTouch) || (b.onTouch = !0),
      is_boolean(b.onMouse) || (b.onMouse = !1),
      is_object(b.options) || (b.options = {}),
      is_boolean(b.options.triggerOnTouchEnd) ||
        (b.options.triggerOnTouchEnd = !1),
      b
    );
  }
  function go_getMousewheelObject(a, b) {
    return (
      is_function(b) && (b = b.call(a)),
      is_true(b)
        ? (b = {})
        : is_number(b)
        ? (b = { items: b })
        : is_undefined(b) && (b = !1),
      b
    );
  }
  function go_complementMousewheelObject(a, b) {
    return b;
  }
  function gn_getItemIndex(a, b, c, d, e) {
    if (
      (is_string(a) && (a = $(a, e)),
      is_object(a) && (a = $(a, e)),
      is_jquery(a)
        ? ((a = e.children().index(a)), is_boolean(c) || (c = !1))
        : is_boolean(c) || (c = !0),
      is_number(a) || (a = 0),
      is_number(b) || (b = 0),
      c && (a += d.first),
      (a += b),
      d.total > 0)
    ) {
      for (; a >= d.total; ) a -= d.total;
      for (; 0 > a; ) a += d.total;
    }
    return a;
  }
  function gn_getVisibleItemsPrev(a, b, c) {
    for (var d = 0, e = 0, f = c; f >= 0; f--) {
      var g = a.eq(f);
      if (
        ((d += g.is(":visible") ? g[b.d.outerWidth](!0) : 0),
        d > b.maxDimension)
      )
        return e;
      0 == f && (f = a.length), e++;
    }
  }
  function gn_getVisibleItemsPrevFilter(a, b, c) {
    return gn_getItemsPrevFilter(a, b.items.filter, b.items.visibleConf.org, c);
  }
  function gn_getScrollItemsPrevFilter(a, b, c, d) {
    return gn_getItemsPrevFilter(a, b.items.filter, d, c);
  }
  function gn_getItemsPrevFilter(a, b, c, d) {
    for (var e = 0, f = 0, g = d, h = a.length; g >= 0; g--) {
      if ((f++, f == h)) return f;
      var i = a.eq(g);
      if (i.is(b) && (e++, e == c)) return f;
      0 == g && (g = h);
    }
  }
  function gn_getVisibleOrg(a, b) {
    return (
      b.items.visibleConf.org ||
      a.children().slice(0, b.items.visible).filter(b.items.filter).length
    );
  }
  function gn_getVisibleItemsNext(a, b, c) {
    for (var d = 0, e = 0, f = c, g = a.length - 1; g >= f; f++) {
      var h = a.eq(f);
      if (
        ((d += h.is(":visible") ? h[b.d.outerWidth](!0) : 0),
        d > b.maxDimension)
      )
        return e;
      if ((e++, e == g + 1)) return e;
      f == g && (f = -1);
    }
  }
  function gn_getVisibleItemsNextTestCircular(a, b, c, d) {
    var e = gn_getVisibleItemsNext(a, b, c);
    return b.circular || (c + e > d && (e = d - c)), e;
  }
  function gn_getVisibleItemsNextFilter(a, b, c) {
    return gn_getItemsNextFilter(
      a,
      b.items.filter,
      b.items.visibleConf.org,
      c,
      b.circular
    );
  }
  function gn_getScrollItemsNextFilter(a, b, c, d) {
    return gn_getItemsNextFilter(a, b.items.filter, d + 1, c, b.circular) - 1;
  }
  function gn_getItemsNextFilter(a, b, c, d) {
    for (var f = 0, g = 0, h = d, i = a.length - 1; i >= h; h++) {
      if ((g++, g >= i)) return g;
      var j = a.eq(h);
      if (j.is(b) && (f++, f == c)) return g;
      h == i && (h = -1);
    }
  }
  function gi_getCurrentItems(a, b) {
    return a.slice(0, b.items.visible);
  }
  function gi_getOldItemsPrev(a, b, c) {
    return a.slice(c, b.items.visibleConf.old + c);
  }
  function gi_getNewItemsPrev(a, b) {
    return a.slice(0, b.items.visible);
  }
  function gi_getOldItemsNext(a, b) {
    return a.slice(0, b.items.visibleConf.old);
  }
  function gi_getNewItemsNext(a, b, c) {
    return a.slice(c, b.items.visible + c);
  }
  function sz_storeMargin(a, b, c) {
    b.usePadding &&
      (is_string(c) || (c = "_cfs_origCssMargin"),
      a.each(function () {
        var a = $(this),
          d = parseInt(a.css(b.d.marginRight), 10);
        is_number(d) || (d = 0), a.data(c, d);
      }));
  }
  function sz_resetMargin(a, b, c) {
    if (b.usePadding) {
      var d = is_boolean(c) ? c : !1;
      is_number(c) || (c = 0),
        sz_storeMargin(a, b, "_cfs_tempCssMargin"),
        a.each(function () {
          var a = $(this);
          a.css(
            b.d.marginRight,
            d ? a.data("_cfs_tempCssMargin") : c + a.data("_cfs_origCssMargin")
          );
        });
    }
  }
  function sz_storeOrigCss(a) {
    a.each(function () {
      var a = $(this);
      a.data("_cfs_origCss", a.attr("style") || "");
    });
  }
  function sz_restoreOrigCss(a) {
    a.each(function () {
      var a = $(this);
      a.attr("style", a.data("_cfs_origCss") || "");
    });
  }
  function sz_setResponsiveSizes(a, b) {
    var d = (a.items.visible, a.items[a.d.width]),
      e = a[a.d.height],
      f = is_percentage(e);
    b.each(function () {
      var b = $(this),
        c = d - ms_getPaddingBorderMargin(b, a, "Width");
      b[a.d.width](c), f && b[a.d.height](ms_getPercentage(c, e));
    });
  }
  function sz_setSizes(a, b) {
    var c = a.parent(),
      d = a.children(),
      e = gi_getCurrentItems(d, b),
      f = cf_mapWrapperSizes(ms_getSizes(e, b, !0), b, !1);
    if ((c.css(f), b.usePadding)) {
      var g = b.padding,
        h = g[b.d[1]];
      b.align && 0 > h && (h = 0);
      var i = e.last();
      i.css(b.d.marginRight, i.data("_cfs_origCssMargin") + h),
        a.css(b.d.top, g[b.d[0]]),
        a.css(b.d.left, g[b.d[3]]);
    }
    return (
      a.css(b.d.width, f[b.d.width] + 2 * ms_getTotalSize(d, b, "width")),
      a.css(b.d.height, ms_getLargestSize(d, b, "height")),
      f
    );
  }
  function ms_getSizes(a, b, c) {
    return [
      ms_getTotalSize(a, b, "width", c),
      ms_getLargestSize(a, b, "height", c),
    ];
  }
  function ms_getLargestSize(a, b, c, d) {
    return (
      is_boolean(d) || (d = !1),
      is_number(b[b.d[c]]) && d
        ? b[b.d[c]]
        : is_number(b.items[b.d[c]])
        ? b.items[b.d[c]]
        : ((c =
            c.toLowerCase().indexOf("width") > -1
              ? "outerWidth"
              : "outerHeight"),
          ms_getTrueLargestSize(a, b, c))
    );
  }
  function ms_getTrueLargestSize(a, b, c) {
    for (var d = 0, e = 0, f = a.length; f > e; e++) {
      var g = a.eq(e),
        h = g.is(":visible") ? g[b.d[c]](!0) : 0;
      h > d && (d = h);
    }
    return d;
  }
  function ms_getTotalSize(a, b, c, d) {
    if ((is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d))
      return b[b.d[c]];
    if (is_number(b.items[b.d[c]])) return b.items[b.d[c]] * a.length;
    for (
      var e =
          c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight",
        f = 0,
        g = 0,
        h = a.length;
      h > g;
      g++
    ) {
      var i = a.eq(g);
      f += i.is(":visible") ? i[b.d[e]](!0) : 0;
    }
    return f;
  }
  function ms_getParentSize(a, b, c) {
    var d = a.is(":visible");
    d && a.hide();
    var e = a.parent()[b.d[c]]();
    return d && a.show(), e;
  }
  function ms_getMaxDimension(a, b) {
    return is_number(a[a.d.width]) ? a[a.d.width] : b;
  }
  function ms_hasVariableSizes(a, b, c) {
    for (var d = !1, e = !1, f = 0, g = a.length; g > f; f++) {
      var h = a.eq(f),
        i = h.is(":visible") ? h[b.d[c]](!0) : 0;
      d === !1 ? (d = i) : d != i && (e = !0), 0 == d && (e = !0);
    }
    return e;
  }
  function ms_getPaddingBorderMargin(a, b, c) {
    return a[b.d["outer" + c]](!0) - a[b.d[c.toLowerCase()]]();
  }
  function ms_getPercentage(a, b) {
    if (is_percentage(b)) {
      if (((b = parseInt(b.slice(0, -1), 10)), !is_number(b))) return a;
      a *= b / 100;
    }
    return a;
  }
  function cf_e(a, b, c, d, e) {
    return (
      is_boolean(c) || (c = !0),
      is_boolean(d) || (d = !0),
      is_boolean(e) || (e = !1),
      c && (a = b.events.prefix + a),
      d && (a = a + "." + b.events.namespace),
      d && e && (a += b.serialNumber),
      a
    );
  }
  function cf_c(a, b) {
    return is_string(b.classnames[a]) ? b.classnames[a] : a;
  }
  function cf_mapWrapperSizes(a, b, c) {
    is_boolean(c) || (c = !0);
    var d = b.usePadding && c ? b.padding : [0, 0, 0, 0],
      e = {};
    return (
      (e[b.d.width] = a[0] + d[1] + d[3]),
      (e[b.d.height] = a[1] + d[0] + d[2]),
      e
    );
  }
  function cf_sortParams(a, b) {
    for (var c = [], d = 0, e = a.length; e > d; d++)
      for (var f = 0, g = b.length; g > f; f++)
        if (b[f].indexOf(typeof a[d]) > -1 && is_undefined(c[f])) {
          c[f] = a[d];
          break;
        }
    return c;
  }
  function cf_getPadding(a) {
    if (is_undefined(a)) return [0, 0, 0, 0];
    if (is_number(a)) return [a, a, a, a];
    if (
      (is_string(a) &&
        (a = a.split("px").join("").split("em").join("").split(" ")),
      !is_array(a))
    )
      return [0, 0, 0, 0];
    for (var b = 0; 4 > b; b++) a[b] = parseInt(a[b], 10);
    switch (a.length) {
      case 0:
        return [0, 0, 0, 0];
      case 1:
        return [a[0], a[0], a[0], a[0]];
      case 2:
        return [a[0], a[1], a[0], a[1]];
      case 3:
        return [a[0], a[1], a[2], a[1]];
      default:
        return [a[0], a[1], a[2], a[3]];
    }
  }
  function cf_getAlignPadding(a, b) {
    var c = is_number(b[b.d.width])
      ? Math.ceil(b[b.d.width] - ms_getTotalSize(a, b, "width"))
      : 0;
    switch (b.align) {
      case "left":
        return [0, c];
      case "right":
        return [c, 0];
      case "center":
      default:
        return [Math.ceil(c / 2), Math.floor(c / 2)];
    }
  }
  function cf_getDimensions(a) {
    for (
      var b = [
          [
            "width",
            "innerWidth",
            "outerWidth",
            "height",
            "innerHeight",
            "outerHeight",
            "left",
            "top",
            "marginRight",
            0,
            1,
            2,
            3,
          ],
          [
            "height",
            "innerHeight",
            "outerHeight",
            "width",
            "innerWidth",
            "outerWidth",
            "top",
            "left",
            "marginBottom",
            3,
            2,
            1,
            0,
          ],
        ],
        c = b[0].length,
        d = "right" == a.direction || "left" == a.direction ? 0 : 1,
        e = {},
        f = 0;
      c > f;
      f++
    )
      e[b[0][f]] = b[d][f];
    return e;
  }
  function cf_getAdjust(a, b, c, d) {
    var e = a;
    if (is_function(c)) e = c.call(d, e);
    else if (is_string(c)) {
      var f = c.split("+"),
        g = c.split("-");
      if (g.length > f.length)
        var h = !0,
          i = g[0],
          j = g[1];
      else
        var h = !1,
          i = f[0],
          j = f[1];
      switch (i) {
        case "even":
          e = 1 == a % 2 ? a - 1 : a;
          break;
        case "odd":
          e = 0 == a % 2 ? a - 1 : a;
          break;
        default:
          e = a;
      }
      (j = parseInt(j, 10)), is_number(j) && (h && (j = -j), (e += j));
    }
    return (!is_number(e) || 1 > e) && (e = 1), e;
  }
  function cf_getItemsAdjust(a, b, c, d) {
    return cf_getItemAdjustMinMax(
      cf_getAdjust(a, b, c, d),
      b.items.visibleConf
    );
  }
  function cf_getItemAdjustMinMax(a, b) {
    return (
      is_number(b.min) && b.min > a && (a = b.min),
      is_number(b.max) && a > b.max && (a = b.max),
      1 > a && (a = 1),
      a
    );
  }
  function cf_getSynchArr(a) {
    is_array(a) || (a = [[a]]), is_array(a[0]) || (a = [a]);
    for (var b = 0, c = a.length; c > b; b++)
      is_string(a[b][0]) && (a[b][0] = $(a[b][0])),
        is_boolean(a[b][1]) || (a[b][1] = !0),
        is_boolean(a[b][2]) || (a[b][2] = !0),
        is_number(a[b][3]) || (a[b][3] = 0);
    return a;
  }
  function cf_getKeyCode(a) {
    return "right" == a
      ? 39
      : "left" == a
      ? 37
      : "up" == a
      ? 38
      : "down" == a
      ? 40
      : -1;
  }
  function cf_setCookie(a, b, c) {
    if (a) {
      var d = b.triggerHandler(cf_e("currentPosition", c));
      $.fn.carouFredSel.cookie.set(a, d);
    }
  }
  function cf_getCookie(a) {
    var b = $.fn.carouFredSel.cookie.get(a);
    return "" == b ? 0 : b;
  }
  function in_mapCss(a, b) {
    for (var c = {}, d = 0, e = b.length; e > d; d++) c[b[d]] = a.css(b[d]);
    return c;
  }
  function in_complementItems(a, b, c, d) {
    return (
      is_object(a.visibleConf) || (a.visibleConf = {}),
      is_object(a.sizesConf) || (a.sizesConf = {}),
      0 == a.start && is_number(d) && (a.start = d),
      is_object(a.visible)
        ? ((a.visibleConf.min = a.visible.min),
          (a.visibleConf.max = a.visible.max),
          (a.visible = !1))
        : is_string(a.visible)
        ? ("variable" == a.visible
            ? (a.visibleConf.variable = !0)
            : (a.visibleConf.adjust = a.visible),
          (a.visible = !1))
        : is_function(a.visible) &&
          ((a.visibleConf.adjust = a.visible), (a.visible = !1)),
      is_string(a.filter) ||
        (a.filter = c.filter(":hidden").length > 0 ? ":visible" : "*"),
      a[b.d.width] ||
        (b.responsive
          ? (debug(!0, "Set a " + b.d.width + " for the items!"),
            (a[b.d.width] = ms_getTrueLargestSize(c, b, "outerWidth")))
          : (a[b.d.width] = ms_hasVariableSizes(c, b, "outerWidth")
              ? "variable"
              : c[b.d.outerWidth](!0))),
      a[b.d.height] ||
        (a[b.d.height] = ms_hasVariableSizes(c, b, "outerHeight")
          ? "variable"
          : c[b.d.outerHeight](!0)),
      (a.sizesConf.width = a.width),
      (a.sizesConf.height = a.height),
      a
    );
  }
  function in_complementVisibleItems(a, b) {
    return (
      "variable" == a.items[a.d.width] && (a.items.visibleConf.variable = !0),
      a.items.visibleConf.variable ||
        (is_number(a[a.d.width])
          ? (a.items.visible = Math.floor(a[a.d.width] / a.items[a.d.width]))
          : ((a.items.visible = Math.floor(b / a.items[a.d.width])),
            (a[a.d.width] = a.items.visible * a.items[a.d.width]),
            a.items.visibleConf.adjust || (a.align = !1)),
        ("Infinity" == a.items.visible || 1 > a.items.visible) &&
          (debug(!0, 'Not a valid number of visible items: Set to "variable".'),
          (a.items.visibleConf.variable = !0))),
      a
    );
  }
  function in_complementPrimarySize(a, b, c) {
    return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerWidth")), a;
  }
  function in_complementSecondarySize(a, b, c) {
    return (
      "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerHeight")),
      a || (a = b.items[b.d.height]),
      a
    );
  }
  function in_getAlignPadding(a, b) {
    var c = cf_getAlignPadding(gi_getCurrentItems(b, a), a);
    return (a.padding[a.d[1]] = c[1]), (a.padding[a.d[3]] = c[0]), a;
  }
  function in_getResponsiveValues(a, b) {
    var d = cf_getItemAdjustMinMax(
      Math.ceil(a[a.d.width] / a.items[a.d.width]),
      a.items.visibleConf
    );
    d > b.length && (d = b.length);
    var e = Math.floor(a[a.d.width] / d);
    return (
      (a.items.visible = d), (a.items[a.d.width] = e), (a[a.d.width] = d * e), a
    );
  }
  function bt_pauseOnHoverConfig(a) {
    if (is_string(a))
      var b = a.indexOf("immediate") > -1 ? !0 : !1,
        c = a.indexOf("resume") > -1 ? !0 : !1;
    else var b = (c = !1);
    return [b, c];
  }
  function bt_mousesheelNumber(a) {
    return is_number(a) ? a : null;
  }
  function is_null(a) {
    return null === a;
  }
  function is_undefined(a) {
    return is_null(a) || a === void 0 || "" === a || "undefined" === a;
  }
  function is_array(a) {
    return a instanceof Array;
  }
  function is_jquery(a) {
    return a instanceof jQuery;
  }
  function is_object(a) {
    return (
      (a instanceof Object || "object" == typeof a) &&
      !is_null(a) &&
      !is_jquery(a) &&
      !is_array(a) &&
      !is_function(a)
    );
  }
  function is_number(a) {
    return (a instanceof Number || "number" == typeof a) && !isNaN(a);
  }
  function is_string(a) {
    return (
      (a instanceof String || "string" == typeof a) &&
      !is_undefined(a) &&
      !is_true(a) &&
      !is_false(a)
    );
  }
  function is_function(a) {
    return a instanceof Function || "function" == typeof a;
  }
  function is_boolean(a) {
    return (
      a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a)
    );
  }
  function is_true(a) {
    return a === !0 || "true" === a;
  }
  function is_false(a) {
    return a === !1 || "false" === a;
  }
  function is_percentage(a) {
    return is_string(a) && "%" == a.slice(-1);
  }
  function getTime() {
    return new Date().getTime();
  }
  function deprecated(a, b) {
    debug(
      !0,
      a +
        " is DEPRECATED, support for it will be removed. Use " +
        b +
        " instead."
    );
  }
  function debug(a, b) {
    if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
      if (is_object(a)) {
        var c = " (" + a.selector + ")";
        a = a.debug;
      } else var c = "";
      if (!a) return !1;
      (b = is_string(b)
        ? "carouFredSel" + c + ": " + b
        : ["carouFredSel" + c + ":", b]),
        window.console.log(b);
    }
    return !1;
  }
  $.fn.carouFredSel ||
    (($.fn.caroufredsel = $.fn.carouFredSel =
      function (options, configs) {
        if (0 == this.length)
          return (
            debug(!0, 'No element found for "' + this.selector + '".'), this
          );
        if (this.length > 1)
          return this.each(function () {
            $(this).carouFredSel(options, configs);
          });
        var $cfs = this,
          $tt0 = this[0],
          starting_position = !1;
        $cfs.data("_cfs_isCarousel") &&
          ((starting_position = $cfs.triggerHandler(
            "_cfs_triggerEvent",
            "currentPosition"
          )),
          $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {};
        (FN._init = function (a, b, c) {
          (a = go_getObject($tt0, a)),
            (a.items = go_getItemsObject($tt0, a.items)),
            (a.scroll = go_getScrollObject($tt0, a.scroll)),
            (a.auto = go_getAutoObject($tt0, a.auto)),
            (a.prev = go_getPrevNextObject($tt0, a.prev)),
            (a.next = go_getPrevNextObject($tt0, a.next)),
            (a.pagination = go_getPaginationObject($tt0, a.pagination)),
            (a.swipe = go_getSwipeObject($tt0, a.swipe)),
            (a.mousewheel = go_getMousewheelObject($tt0, a.mousewheel)),
            b && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, a)),
            (opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, a)),
            (opts.d = cf_getDimensions(opts)),
            (crsl.direction =
              "up" == opts.direction || "left" == opts.direction
                ? "next"
                : "prev");
          var d = $cfs.children(),
            e = ms_getParentSize($wrp, opts, "width");
          if (
            (is_true(opts.cookie) &&
              (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber),
            (opts.maxDimension = ms_getMaxDimension(opts, e)),
            (opts.items = in_complementItems(opts.items, opts, d, c)),
            (opts[opts.d.width] = in_complementPrimarySize(
              opts[opts.d.width],
              opts,
              d
            )),
            (opts[opts.d.height] = in_complementSecondarySize(
              opts[opts.d.height],
              opts,
              d
            )),
            opts.responsive &&
              (is_percentage(opts[opts.d.width]) ||
                (opts[opts.d.width] = "100%")),
            is_percentage(opts[opts.d.width]) &&
              ((crsl.upDateOnWindowResize = !0),
              (crsl.primarySizePercentage = opts[opts.d.width]),
              (opts[opts.d.width] = ms_getPercentage(
                e,
                crsl.primarySizePercentage
              )),
              opts.items.visible || (opts.items.visibleConf.variable = !0)),
            opts.responsive
              ? ((opts.usePadding = !1),
                (opts.padding = [0, 0, 0, 0]),
                (opts.align = !1),
                (opts.items.visibleConf.variable = !1))
              : (opts.items.visible ||
                  (opts = in_complementVisibleItems(opts, e)),
                opts[opts.d.width] ||
                  (!opts.items.visibleConf.variable &&
                  is_number(opts.items[opts.d.width]) &&
                  "*" == opts.items.filter
                    ? ((opts[opts.d.width] =
                        opts.items.visible * opts.items[opts.d.width]),
                      (opts.align = !1))
                    : (opts[opts.d.width] = "variable")),
                is_undefined(opts.align) &&
                  (opts.align = is_number(opts[opts.d.width]) ? "center" : !1),
                opts.items.visibleConf.variable &&
                  (opts.items.visible = gn_getVisibleItemsNext(d, opts, 0))),
            "*" == opts.items.filter ||
              opts.items.visibleConf.variable ||
              ((opts.items.visibleConf.org = opts.items.visible),
              (opts.items.visible = gn_getVisibleItemsNextFilter(d, opts, 0))),
            (opts.items.visible = cf_getItemsAdjust(
              opts.items.visible,
              opts,
              opts.items.visibleConf.adjust,
              $tt0
            )),
            (opts.items.visibleConf.old = opts.items.visible),
            opts.responsive)
          )
            opts.items.visibleConf.min ||
              (opts.items.visibleConf.min = opts.items.visible),
              opts.items.visibleConf.max ||
                (opts.items.visibleConf.max = opts.items.visible),
              (opts = in_getResponsiveValues(opts, d, e));
          else
            switch (
              ((opts.padding = cf_getPadding(opts.padding)),
              "top" == opts.align
                ? (opts.align = "left")
                : "bottom" == opts.align && (opts.align = "right"),
              opts.align)
            ) {
              case "center":
              case "left":
              case "right":
                "variable" != opts[opts.d.width] &&
                  ((opts = in_getAlignPadding(opts, d)),
                  (opts.usePadding = !0));
                break;
              default:
                (opts.align = !1),
                  (opts.usePadding =
                    0 == opts.padding[0] &&
                    0 == opts.padding[1] &&
                    0 == opts.padding[2] &&
                    0 == opts.padding[3]
                      ? !1
                      : !0);
            }
          is_number(opts.scroll.duration) || (opts.scroll.duration = 500),
            is_undefined(opts.scroll.items) &&
              (opts.scroll.items =
                opts.responsive ||
                opts.items.visibleConf.variable ||
                "*" != opts.items.filter
                  ? "visible"
                  : opts.items.visible),
            (opts.auto = $.extend(!0, {}, opts.scroll, opts.auto)),
            (opts.prev = $.extend(!0, {}, opts.scroll, opts.prev)),
            (opts.next = $.extend(!0, {}, opts.scroll, opts.next)),
            (opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination)),
            (opts.auto = go_complementAutoObject($tt0, opts.auto)),
            (opts.prev = go_complementPrevNextObject($tt0, opts.prev)),
            (opts.next = go_complementPrevNextObject($tt0, opts.next)),
            (opts.pagination = go_complementPaginationObject(
              $tt0,
              opts.pagination
            )),
            (opts.swipe = go_complementSwipeObject($tt0, opts.swipe)),
            (opts.mousewheel = go_complementMousewheelObject(
              $tt0,
              opts.mousewheel
            )),
            opts.synchronise &&
              (opts.synchronise = cf_getSynchArr(opts.synchronise)),
            opts.auto.onPauseStart &&
              ((opts.auto.onTimeoutStart = opts.auto.onPauseStart),
              deprecated("auto.onPauseStart", "auto.onTimeoutStart")),
            opts.auto.onPausePause &&
              ((opts.auto.onTimeoutPause = opts.auto.onPausePause),
              deprecated("auto.onPausePause", "auto.onTimeoutPause")),
            opts.auto.onPauseEnd &&
              ((opts.auto.onTimeoutEnd = opts.auto.onPauseEnd),
              deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")),
            opts.auto.pauseDuration &&
              ((opts.auto.timeoutDuration = opts.auto.pauseDuration),
              deprecated("auto.pauseDuration", "auto.timeoutDuration"));
        }),
          (FN._build = function () {
            $cfs.data("_cfs_isCarousel", !0);
            var a = $cfs.children(),
              b = in_mapCss($cfs, [
                "textAlign",
                "float",
                "position",
                "top",
                "right",
                "bottom",
                "left",
                "zIndex",
                "width",
                "height",
                "marginTop",
                "marginRight",
                "marginBottom",
                "marginLeft",
              ]),
              c = "relative";
            switch (b.position) {
              case "absolute":
              case "fixed":
                c = b.position;
            }
            "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(b),
              $wrp.css({ overflow: "hidden", position: c }),
              sz_storeOrigCss($cfs),
              $cfs.data("_cfs_origCssZindex", b.zIndex),
              $cfs.css({
                textAlign: "left",
                float: "none",
                position: "absolute",
                top: 0,
                right: "auto",
                bottom: "auto",
                left: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
              }),
              sz_storeMargin(a, opts),
              sz_storeOrigCss(a),
              opts.responsive && sz_setResponsiveSizes(opts, a);
          }),
          (FN._bind_events = function () {
            FN._unbind_events(),
              $cfs.bind(cf_e("stop", conf), function (a, b) {
                return (
                  a.stopPropagation(),
                  crsl.isStopped ||
                    (opts.auto.button &&
                      opts.auto.button.addClass(cf_c("stopped", conf))),
                  (crsl.isStopped = !0),
                  opts.auto.play &&
                    ((opts.auto.play = !1),
                    $cfs.trigger(cf_e("pause", conf), b)),
                  !0
                );
              }),
              $cfs.bind(cf_e("finish", conf), function (a) {
                return (
                  a.stopPropagation(),
                  crsl.isScrolling && sc_stopScroll(scrl),
                  !0
                );
              }),
              $cfs.bind(cf_e("pause", conf), function (a, b, c) {
                if (
                  (a.stopPropagation(),
                  (tmrs = sc_clearTimers(tmrs)),
                  b && crsl.isScrolling)
                ) {
                  scrl.isStopped = !0;
                  var d = getTime() - scrl.startTime;
                  (scrl.duration -= d),
                    scrl.pre && (scrl.pre.duration -= d),
                    scrl.post && (scrl.post.duration -= d),
                    sc_stopScroll(scrl, !1);
                }
                if (
                  (crsl.isPaused ||
                    crsl.isScrolling ||
                    (c && (tmrs.timePassed += getTime() - tmrs.startTime)),
                  crsl.isPaused ||
                    (opts.auto.button &&
                      opts.auto.button.addClass(cf_c("paused", conf))),
                  (crsl.isPaused = !0),
                  opts.auto.onTimeoutPause)
                ) {
                  var e = opts.auto.timeoutDuration - tmrs.timePassed,
                    f = 100 - Math.ceil((100 * e) / opts.auto.timeoutDuration);
                  opts.auto.onTimeoutPause.call($tt0, f, e);
                }
                return !0;
              }),
              $cfs.bind(cf_e("play", conf), function (a, b, c, d) {
                a.stopPropagation(), (tmrs = sc_clearTimers(tmrs));
                var e = [b, c, d],
                  f = ["string", "number", "boolean"],
                  g = cf_sortParams(e, f);
                if (
                  ((b = g[0]),
                  (c = g[1]),
                  (d = g[2]),
                  "prev" != b && "next" != b && (b = crsl.direction),
                  is_number(c) || (c = 0),
                  is_boolean(d) || (d = !1),
                  d && ((crsl.isStopped = !1), (opts.auto.play = !0)),
                  !opts.auto.play)
                )
                  return (
                    a.stopImmediatePropagation(),
                    debug(conf, "Carousel stopped: Not scrolling.")
                  );
                crsl.isPaused &&
                  opts.auto.button &&
                  (opts.auto.button.removeClass(cf_c("stopped", conf)),
                  opts.auto.button.removeClass(cf_c("paused", conf))),
                  (crsl.isPaused = !1),
                  (tmrs.startTime = getTime());
                var h = opts.auto.timeoutDuration + c;
                return (
                  (dur2 = h - tmrs.timePassed),
                  (perc = 100 - Math.ceil((100 * dur2) / h)),
                  opts.auto.progress &&
                    (tmrs.progress = setInterval(function () {
                      var a = getTime() - tmrs.startTime + tmrs.timePassed,
                        b = Math.ceil((100 * a) / h);
                      opts.auto.progress.updater.call(
                        opts.auto.progress.bar[0],
                        b
                      );
                    }, opts.auto.progress.interval)),
                  (tmrs.auto = setTimeout(function () {
                    opts.auto.progress &&
                      opts.auto.progress.updater.call(
                        opts.auto.progress.bar[0],
                        100
                      ),
                      opts.auto.onTimeoutEnd &&
                        opts.auto.onTimeoutEnd.call($tt0, perc, dur2),
                      crsl.isScrolling
                        ? $cfs.trigger(cf_e("play", conf), b)
                        : $cfs.trigger(cf_e(b, conf), opts.auto);
                  }, dur2)),
                  opts.auto.onTimeoutStart &&
                    opts.auto.onTimeoutStart.call($tt0, perc, dur2),
                  !0
                );
              }),
              $cfs.bind(cf_e("resume", conf), function (a) {
                return (
                  a.stopPropagation(),
                  scrl.isStopped
                    ? ((scrl.isStopped = !1),
                      (crsl.isPaused = !1),
                      (crsl.isScrolling = !0),
                      (scrl.startTime = getTime()),
                      sc_startScroll(scrl, conf))
                    : $cfs.trigger(cf_e("play", conf)),
                  !0
                );
              }),
              $cfs.bind(
                cf_e("prev", conf) + " " + cf_e("next", conf),
                function (a, b, c, d, e) {
                  if (
                    (a.stopPropagation(), crsl.isStopped || $cfs.is(":hidden"))
                  )
                    return (
                      a.stopImmediatePropagation(),
                      debug(conf, "Carousel stopped or hidden: Not scrolling.")
                    );
                  var f = is_number(opts.items.minimum)
                    ? opts.items.minimum
                    : opts.items.visible + 1;
                  if (f > itms.total)
                    return (
                      a.stopImmediatePropagation(),
                      debug(
                        conf,
                        "Not enough items (" +
                          itms.total +
                          " total, " +
                          f +
                          " needed): Not scrolling."
                      )
                    );
                  var g = [b, c, d, e],
                    h = ["object", "number/string", "function", "boolean"],
                    i = cf_sortParams(g, h);
                  (b = i[0]), (c = i[1]), (d = i[2]), (e = i[3]);
                  var j = a.type.slice(conf.events.prefix.length);
                  if (
                    (is_object(b) || (b = {}),
                    is_function(d) && (b.onAfter = d),
                    is_boolean(e) && (b.queue = e),
                    (b = $.extend(!0, {}, opts[j], b)),
                    b.conditions && !b.conditions.call($tt0, j))
                  )
                    return (
                      a.stopImmediatePropagation(),
                      debug(conf, 'Callback "conditions" returned false.')
                    );
                  if (!is_number(c)) {
                    if ("*" != opts.items.filter) c = "visible";
                    else
                      for (
                        var k = [c, b.items, opts[j].items],
                          i = 0,
                          l = k.length;
                        l > i;
                        i++
                      )
                        if (
                          is_number(k[i]) ||
                          "page" == k[i] ||
                          "visible" == k[i]
                        ) {
                          c = k[i];
                          break;
                        }
                    switch (c) {
                      case "page":
                        return (
                          a.stopImmediatePropagation(),
                          $cfs.triggerHandler(cf_e(j + "Page", conf), [b, d])
                        );
                      case "visible":
                        opts.items.visibleConf.variable ||
                          "*" != opts.items.filter ||
                          (c = opts.items.visible);
                    }
                  }
                  if (scrl.isStopped)
                    return (
                      $cfs.trigger(cf_e("resume", conf)),
                      $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]]),
                      a.stopImmediatePropagation(),
                      debug(conf, "Carousel resumed scrolling.")
                    );
                  if (b.duration > 0 && crsl.isScrolling)
                    return (
                      b.queue &&
                        ("last" == b.queue && (queu = []),
                        ("first" != b.queue || 0 == queu.length) &&
                          $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]])),
                      a.stopImmediatePropagation(),
                      debug(conf, "Carousel currently scrolling.")
                    );
                  if (
                    ((tmrs.timePassed = 0),
                    $cfs.trigger(cf_e("slide_" + j, conf), [b, c]),
                    opts.synchronise)
                  )
                    for (
                      var m = opts.synchronise, n = [b, c], o = 0, l = m.length;
                      l > o;
                      o++
                    ) {
                      var p = j;
                      m[o][2] || (p = "prev" == p ? "next" : "prev"),
                        m[o][1] ||
                          (n[0] = m[o][0].triggerHandler("_cfs_triggerEvent", [
                            "configuration",
                            p,
                          ])),
                        (n[1] = c + m[o][3]),
                        m[o][0].trigger("_cfs_triggerEvent", ["slide_" + p, n]);
                    }
                  return !0;
                }
              ),
              $cfs.bind(cf_e("slide_prev", conf), function (a, b, c) {
                a.stopPropagation();
                var d = $cfs.children();
                if (!opts.circular && 0 == itms.first)
                  return (
                    opts.infinite &&
                      $cfs.trigger(cf_e("next", conf), itms.total - 1),
                    a.stopImmediatePropagation()
                  );
                if ((sz_resetMargin(d, opts), !is_number(c))) {
                  if (opts.items.visibleConf.variable)
                    c = gn_getVisibleItemsPrev(d, opts, itms.total - 1);
                  else if ("*" != opts.items.filter) {
                    var e = is_number(b.items)
                      ? b.items
                      : gn_getVisibleOrg($cfs, opts);
                    c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, e);
                  } else c = opts.items.visible;
                  c = cf_getAdjust(c, opts, b.items, $tt0);
                }
                if (
                  (opts.circular ||
                    (itms.total - c < itms.first &&
                      (c = itms.total - itms.first)),
                  (opts.items.visibleConf.old = opts.items.visible),
                  opts.items.visibleConf.variable)
                ) {
                  var f = cf_getItemsAdjust(
                    gn_getVisibleItemsNext(d, opts, itms.total - c),
                    opts,
                    opts.items.visibleConf.adjust,
                    $tt0
                  );
                  f >= opts.items.visible + c &&
                    itms.total > c &&
                    (c++,
                    (f = cf_getItemsAdjust(
                      gn_getVisibleItemsNext(d, opts, itms.total - c),
                      opts,
                      opts.items.visibleConf.adjust,
                      $tt0
                    ))),
                    (opts.items.visible = f);
                } else if ("*" != opts.items.filter) {
                  var f = gn_getVisibleItemsNextFilter(d, opts, itms.total - c);
                  opts.items.visible = cf_getItemsAdjust(
                    f,
                    opts,
                    opts.items.visibleConf.adjust,
                    $tt0
                  );
                }
                if ((sz_resetMargin(d, opts, !0), 0 == c))
                  return (
                    a.stopImmediatePropagation(),
                    debug(conf, "0 items to scroll: Not scrolling.")
                  );
                for (
                  debug(conf, "Scrolling " + c + " items backward."),
                    itms.first += c;
                  itms.first >= itms.total;

                )
                  itms.first -= itms.total;
                opts.circular ||
                  (0 == itms.first && b.onEnd && b.onEnd.call($tt0, "prev"),
                  opts.infinite || nv_enableNavi(opts, itms.first, conf)),
                  $cfs
                    .children()
                    .slice(itms.total - c, itms.total)
                    .prependTo($cfs),
                  itms.total < opts.items.visible + c &&
                    $cfs
                      .children()
                      .slice(0, opts.items.visible + c - itms.total)
                      .clone(!0)
                      .appendTo($cfs);
                var d = $cfs.children(),
                  g = gi_getOldItemsPrev(d, opts, c),
                  h = gi_getNewItemsPrev(d, opts),
                  i = d.eq(c - 1),
                  j = g.last(),
                  k = h.last();
                sz_resetMargin(d, opts);
                var l = 0,
                  m = 0;
                if (opts.align) {
                  var n = cf_getAlignPadding(h, opts);
                  (l = n[0]), (m = n[1]);
                }
                var o = 0 > l ? opts.padding[opts.d[3]] : 0,
                  p = !1,
                  q = $();
                if (
                  c > opts.items.visible &&
                  ((q = d.slice(opts.items.visibleConf.old, c)),
                  "directscroll" == b.fx)
                ) {
                  var r = opts.items[opts.d.width];
                  (p = q),
                    (i = k),
                    sc_hideHiddenItems(p),
                    (opts.items[opts.d.width] = "variable");
                }
                var s = !1,
                  t = ms_getTotalSize(d.slice(0, c), opts, "width"),
                  u = cf_mapWrapperSizes(
                    ms_getSizes(h, opts, !0),
                    opts,
                    !opts.usePadding
                  ),
                  v = 0,
                  w = {},
                  x = {},
                  y = {},
                  z = {},
                  A = {},
                  B = {},
                  C = {},
                  D = sc_getDuration(b, opts, c, t);
                switch (b.fx) {
                  case "cover":
                  case "cover-fade":
                    v = ms_getTotalSize(
                      d.slice(0, opts.items.visible),
                      opts,
                      "width"
                    );
                }
                p && (opts.items[opts.d.width] = r),
                  sz_resetMargin(d, opts, !0),
                  m >= 0 && sz_resetMargin(j, opts, opts.padding[opts.d[1]]),
                  l >= 0 && sz_resetMargin(i, opts, opts.padding[opts.d[3]]),
                  opts.align &&
                    ((opts.padding[opts.d[1]] = m),
                    (opts.padding[opts.d[3]] = l)),
                  (B[opts.d.left] = -(t - o)),
                  (C[opts.d.left] = -(v - o)),
                  (x[opts.d.left] = u[opts.d.width]);
                var E = function () {},
                  F = function () {},
                  G = function () {},
                  H = function () {},
                  I = function () {},
                  J = function () {},
                  K = function () {},
                  L = function () {},
                  M = function () {},
                  N = function () {},
                  O = function () {};
                switch (b.fx) {
                  case "crossfade":
                  case "cover":
                  case "cover-fade":
                  case "uncover":
                  case "uncover-fade":
                    s = $cfs.clone(!0).appendTo($wrp);
                }
                switch (b.fx) {
                  case "crossfade":
                  case "uncover":
                  case "uncover-fade":
                    s.children().slice(0, c).remove(),
                      s.children().slice(opts.items.visibleConf.old).remove();
                    break;
                  case "cover":
                  case "cover-fade":
                    s.children().slice(opts.items.visible).remove(), s.css(C);
                }
                if (
                  ($cfs.css(B),
                  (scrl = sc_setScroll(D, b.easing, conf)),
                  (w[opts.d.left] = opts.usePadding
                    ? opts.padding[opts.d[3]]
                    : 0),
                  ("variable" == opts[opts.d.width] ||
                    "variable" == opts[opts.d.height]) &&
                    ((E = function () {
                      $wrp.css(u);
                    }),
                    (F = function () {
                      scrl.anims.push([$wrp, u]);
                    })),
                  opts.usePadding)
                ) {
                  switch (
                    (k.not(i).length &&
                      ((y[opts.d.marginRight] = i.data("_cfs_origCssMargin")),
                      0 > l
                        ? i.css(y)
                        : ((K = function () {
                            i.css(y);
                          }),
                          (L = function () {
                            scrl.anims.push([i, y]);
                          }))),
                    b.fx)
                  ) {
                    case "cover":
                    case "cover-fade":
                      s.children()
                        .eq(c - 1)
                        .css(y);
                  }
                  k.not(j).length &&
                    ((z[opts.d.marginRight] = j.data("_cfs_origCssMargin")),
                    (G = function () {
                      j.css(z);
                    }),
                    (H = function () {
                      scrl.anims.push([j, z]);
                    })),
                    m >= 0 &&
                      ((A[opts.d.marginRight] =
                        k.data("_cfs_origCssMargin") + opts.padding[opts.d[1]]),
                      (I = function () {
                        k.css(A);
                      }),
                      (J = function () {
                        scrl.anims.push([k, A]);
                      }));
                }
                O = function () {
                  $cfs.css(w);
                };
                var P = opts.items.visible + c - itms.total;
                N = function () {
                  if (
                    (P > 0 &&
                      ($cfs.children().slice(itms.total).remove(),
                      (g = $(
                        $cfs
                          .children()
                          .slice(itms.total - (opts.items.visible - P))
                          .get()
                          .concat($cfs.children().slice(0, P).get())
                      ))),
                    sc_showHiddenItems(p),
                    opts.usePadding)
                  ) {
                    var a = $cfs.children().eq(opts.items.visible + c - 1);
                    a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"));
                  }
                };
                var Q = sc_mapCallbackArguments(g, q, h, c, "prev", D, u);
                switch (
                  ((M = function () {
                    sc_afterScroll($cfs, s, b),
                      (crsl.isScrolling = !1),
                      (clbk.onAfter = sc_fireCallbacks(
                        $tt0,
                        b,
                        "onAfter",
                        Q,
                        clbk
                      )),
                      (queu = sc_fireQueue($cfs, queu, conf)),
                      crsl.isPaused || $cfs.trigger(cf_e("play", conf));
                  }),
                  (crsl.isScrolling = !0),
                  (tmrs = sc_clearTimers(tmrs)),
                  (clbk.onBefore = sc_fireCallbacks(
                    $tt0,
                    b,
                    "onBefore",
                    Q,
                    clbk
                  )),
                  b.fx)
                ) {
                  case "none":
                    $cfs.css(w), E(), G(), I(), K(), O(), N(), M();
                    break;
                  case "fade":
                    scrl.anims.push([
                      $cfs,
                      { opacity: 0 },
                      function () {
                        E(),
                          G(),
                          I(),
                          K(),
                          O(),
                          N(),
                          (scrl = sc_setScroll(D, b.easing, conf)),
                          scrl.anims.push([$cfs, { opacity: 1 }, M]),
                          sc_startScroll(scrl, conf);
                      },
                    ]);
                    break;
                  case "crossfade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([s, { opacity: 0 }]),
                      scrl.anims.push([$cfs, { opacity: 1 }, M]),
                      F(),
                      G(),
                      I(),
                      K(),
                      O(),
                      N();
                    break;
                  case "cover":
                    scrl.anims.push([
                      s,
                      w,
                      function () {
                        G(), I(), K(), O(), N(), M();
                      },
                    ]),
                      F();
                    break;
                  case "cover-fade":
                    scrl.anims.push([$cfs, { opacity: 0 }]),
                      scrl.anims.push([
                        s,
                        w,
                        function () {
                          G(), I(), K(), O(), N(), M();
                        },
                      ]),
                      F();
                    break;
                  case "uncover":
                    scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
                    break;
                  case "uncover-fade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([$cfs, { opacity: 1 }]),
                      scrl.anims.push([s, x, M]),
                      F(),
                      G(),
                      I(),
                      K(),
                      O(),
                      N();
                    break;
                  default:
                    scrl.anims.push([
                      $cfs,
                      w,
                      function () {
                        N(), M();
                      },
                    ]),
                      F(),
                      H(),
                      J(),
                      L();
                }
                return (
                  sc_startScroll(scrl, conf),
                  cf_setCookie(opts.cookie, $cfs, conf),
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]),
                  !0
                );
              }),
              $cfs.bind(cf_e("slide_next", conf), function (a, b, c) {
                a.stopPropagation();
                var d = $cfs.children();
                if (!opts.circular && itms.first == opts.items.visible)
                  return (
                    opts.infinite &&
                      $cfs.trigger(cf_e("prev", conf), itms.total - 1),
                    a.stopImmediatePropagation()
                  );
                if ((sz_resetMargin(d, opts), !is_number(c))) {
                  if ("*" != opts.items.filter) {
                    var e = is_number(b.items)
                      ? b.items
                      : gn_getVisibleOrg($cfs, opts);
                    c = gn_getScrollItemsNextFilter(d, opts, 0, e);
                  } else c = opts.items.visible;
                  c = cf_getAdjust(c, opts, b.items, $tt0);
                }
                var f = 0 == itms.first ? itms.total : itms.first;
                if (!opts.circular) {
                  if (opts.items.visibleConf.variable)
                    var g = gn_getVisibleItemsNext(d, opts, c),
                      e = gn_getVisibleItemsPrev(d, opts, f - 1);
                  else
                    var g = opts.items.visible,
                      e = opts.items.visible;
                  c + g > f && (c = f - e);
                }
                if (
                  ((opts.items.visibleConf.old = opts.items.visible),
                  opts.items.visibleConf.variable)
                ) {
                  for (
                    var g = cf_getItemsAdjust(
                      gn_getVisibleItemsNextTestCircular(d, opts, c, f),
                      opts,
                      opts.items.visibleConf.adjust,
                      $tt0
                    );
                    opts.items.visible - c >= g && itms.total > c;

                  )
                    c++,
                      (g = cf_getItemsAdjust(
                        gn_getVisibleItemsNextTestCircular(d, opts, c, f),
                        opts,
                        opts.items.visibleConf.adjust,
                        $tt0
                      ));
                  opts.items.visible = g;
                } else if ("*" != opts.items.filter) {
                  var g = gn_getVisibleItemsNextFilter(d, opts, c);
                  opts.items.visible = cf_getItemsAdjust(
                    g,
                    opts,
                    opts.items.visibleConf.adjust,
                    $tt0
                  );
                }
                if ((sz_resetMargin(d, opts, !0), 0 == c))
                  return (
                    a.stopImmediatePropagation(),
                    debug(conf, "0 items to scroll: Not scrolling.")
                  );
                for (
                  debug(conf, "Scrolling " + c + " items forward."),
                    itms.first -= c;
                  0 > itms.first;

                )
                  itms.first += itms.total;
                opts.circular ||
                  (itms.first == opts.items.visible &&
                    b.onEnd &&
                    b.onEnd.call($tt0, "next"),
                  opts.infinite || nv_enableNavi(opts, itms.first, conf)),
                  itms.total < opts.items.visible + c &&
                    $cfs
                      .children()
                      .slice(0, opts.items.visible + c - itms.total)
                      .clone(!0)
                      .appendTo($cfs);
                var d = $cfs.children(),
                  h = gi_getOldItemsNext(d, opts),
                  i = gi_getNewItemsNext(d, opts, c),
                  j = d.eq(c - 1),
                  k = h.last(),
                  l = i.last();
                sz_resetMargin(d, opts);
                var m = 0,
                  n = 0;
                if (opts.align) {
                  var o = cf_getAlignPadding(i, opts);
                  (m = o[0]), (n = o[1]);
                }
                var p = !1,
                  q = $();
                if (
                  c > opts.items.visibleConf.old &&
                  ((q = d.slice(opts.items.visibleConf.old, c)),
                  "directscroll" == b.fx)
                ) {
                  var r = opts.items[opts.d.width];
                  (p = q),
                    (j = k),
                    sc_hideHiddenItems(p),
                    (opts.items[opts.d.width] = "variable");
                }
                var s = !1,
                  t = ms_getTotalSize(d.slice(0, c), opts, "width"),
                  u = cf_mapWrapperSizes(
                    ms_getSizes(i, opts, !0),
                    opts,
                    !opts.usePadding
                  ),
                  v = 0,
                  w = {},
                  x = {},
                  y = {},
                  z = {},
                  A = {},
                  B = sc_getDuration(b, opts, c, t);
                switch (b.fx) {
                  case "uncover":
                  case "uncover-fade":
                    v = ms_getTotalSize(
                      d.slice(0, opts.items.visibleConf.old),
                      opts,
                      "width"
                    );
                }
                p && (opts.items[opts.d.width] = r),
                  opts.align &&
                    0 > opts.padding[opts.d[1]] &&
                    (opts.padding[opts.d[1]] = 0),
                  sz_resetMargin(d, opts, !0),
                  sz_resetMargin(k, opts, opts.padding[opts.d[1]]),
                  opts.align &&
                    ((opts.padding[opts.d[1]] = n),
                    (opts.padding[opts.d[3]] = m)),
                  (A[opts.d.left] = opts.usePadding
                    ? opts.padding[opts.d[3]]
                    : 0);
                var C = function () {},
                  D = function () {},
                  E = function () {},
                  F = function () {},
                  G = function () {},
                  H = function () {},
                  I = function () {},
                  J = function () {},
                  K = function () {};
                switch (b.fx) {
                  case "crossfade":
                  case "cover":
                  case "cover-fade":
                  case "uncover":
                  case "uncover-fade":
                    (s = $cfs.clone(!0).appendTo($wrp)),
                      s.children().slice(opts.items.visibleConf.old).remove();
                }
                switch (b.fx) {
                  case "crossfade":
                  case "cover":
                  case "cover-fade":
                    $cfs.css("zIndex", 1), s.css("zIndex", 0);
                }
                if (
                  ((scrl = sc_setScroll(B, b.easing, conf)),
                  (w[opts.d.left] = -t),
                  (x[opts.d.left] = -v),
                  0 > m && (w[opts.d.left] += m),
                  ("variable" == opts[opts.d.width] ||
                    "variable" == opts[opts.d.height]) &&
                    ((C = function () {
                      $wrp.css(u);
                    }),
                    (D = function () {
                      scrl.anims.push([$wrp, u]);
                    })),
                  opts.usePadding)
                ) {
                  var L = l.data("_cfs_origCssMargin");
                  n >= 0 && (L += opts.padding[opts.d[1]]),
                    l.css(opts.d.marginRight, L),
                    j.not(k).length &&
                      (z[opts.d.marginRight] = k.data("_cfs_origCssMargin")),
                    (E = function () {
                      k.css(z);
                    }),
                    (F = function () {
                      scrl.anims.push([k, z]);
                    });
                  var M = j.data("_cfs_origCssMargin");
                  m > 0 && (M += opts.padding[opts.d[3]]),
                    (y[opts.d.marginRight] = M),
                    (G = function () {
                      j.css(y);
                    }),
                    (H = function () {
                      scrl.anims.push([j, y]);
                    });
                }
                K = function () {
                  $cfs.css(A);
                };
                var N = opts.items.visible + c - itms.total;
                J = function () {
                  N > 0 && $cfs.children().slice(itms.total).remove();
                  var a = $cfs.children().slice(0, c).appendTo($cfs).last();
                  if (
                    (N > 0 && (i = gi_getCurrentItems(d, opts)),
                    sc_showHiddenItems(p),
                    opts.usePadding)
                  ) {
                    if (itms.total < opts.items.visible + c) {
                      var b = $cfs.children().eq(opts.items.visible - 1);
                      b.css(
                        opts.d.marginRight,
                        b.data("_cfs_origCssMargin") + opts.padding[opts.d[1]]
                      );
                    }
                    a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"));
                  }
                };
                var O = sc_mapCallbackArguments(h, q, i, c, "next", B, u);
                switch (
                  ((I = function () {
                    $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")),
                      sc_afterScroll($cfs, s, b),
                      (crsl.isScrolling = !1),
                      (clbk.onAfter = sc_fireCallbacks(
                        $tt0,
                        b,
                        "onAfter",
                        O,
                        clbk
                      )),
                      (queu = sc_fireQueue($cfs, queu, conf)),
                      crsl.isPaused || $cfs.trigger(cf_e("play", conf));
                  }),
                  (crsl.isScrolling = !0),
                  (tmrs = sc_clearTimers(tmrs)),
                  (clbk.onBefore = sc_fireCallbacks(
                    $tt0,
                    b,
                    "onBefore",
                    O,
                    clbk
                  )),
                  b.fx)
                ) {
                  case "none":
                    $cfs.css(w), C(), E(), G(), K(), J(), I();
                    break;
                  case "fade":
                    scrl.anims.push([
                      $cfs,
                      { opacity: 0 },
                      function () {
                        C(),
                          E(),
                          G(),
                          K(),
                          J(),
                          (scrl = sc_setScroll(B, b.easing, conf)),
                          scrl.anims.push([$cfs, { opacity: 1 }, I]),
                          sc_startScroll(scrl, conf);
                      },
                    ]);
                    break;
                  case "crossfade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([s, { opacity: 0 }]),
                      scrl.anims.push([$cfs, { opacity: 1 }, I]),
                      D(),
                      E(),
                      G(),
                      K(),
                      J();
                    break;
                  case "cover":
                    $cfs.css(opts.d.left, $wrp[opts.d.width]()),
                      scrl.anims.push([$cfs, A, I]),
                      D(),
                      E(),
                      G(),
                      J();
                    break;
                  case "cover-fade":
                    $cfs.css(opts.d.left, $wrp[opts.d.width]()),
                      scrl.anims.push([s, { opacity: 0 }]),
                      scrl.anims.push([$cfs, A, I]),
                      D(),
                      E(),
                      G(),
                      J();
                    break;
                  case "uncover":
                    scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
                    break;
                  case "uncover-fade":
                    $cfs.css({ opacity: 0 }),
                      scrl.anims.push([$cfs, { opacity: 1 }]),
                      scrl.anims.push([s, x, I]),
                      D(),
                      E(),
                      G(),
                      K(),
                      J();
                    break;
                  default:
                    scrl.anims.push([
                      $cfs,
                      w,
                      function () {
                        K(), J(), I();
                      },
                    ]),
                      D(),
                      F(),
                      H();
                }
                return (
                  sc_startScroll(scrl, conf),
                  cf_setCookie(opts.cookie, $cfs, conf),
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]),
                  !0
                );
              }),
              $cfs.bind(cf_e("slideTo", conf), function (a, b, c, d, e, f, g) {
                a.stopPropagation();
                var h = [b, c, d, e, f, g],
                  i = [
                    "string/number/object",
                    "number",
                    "boolean",
                    "object",
                    "string",
                    "function",
                  ],
                  j = cf_sortParams(h, i);
                return (
                  (e = j[3]),
                  (f = j[4]),
                  (g = j[5]),
                  (b = gn_getItemIndex(j[0], j[1], j[2], itms, $cfs)),
                  0 == b
                    ? !1
                    : (is_object(e) || (e = !1),
                      "prev" != f &&
                        "next" != f &&
                        (f = opts.circular
                          ? itms.total / 2 >= b
                            ? "next"
                            : "prev"
                          : 0 == itms.first || itms.first > b
                          ? "next"
                          : "prev"),
                      "prev" == f && (b = itms.total - b),
                      $cfs.trigger(cf_e(f, conf), [e, b, g]),
                      !0)
                );
              }),
              $cfs.bind(cf_e("prevPage", conf), function (a, b, c) {
                a.stopPropagation();
                var d = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [
                  d - 1,
                  b,
                  "prev",
                  c,
                ]);
              }),
              $cfs.bind(cf_e("nextPage", conf), function (a, b, c) {
                a.stopPropagation();
                var d = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [
                  d + 1,
                  b,
                  "next",
                  c,
                ]);
              }),
              $cfs.bind(cf_e("slideToPage", conf), function (a, b, c, d, e) {
                a.stopPropagation(),
                  is_number(b) ||
                    (b = $cfs.triggerHandler(cf_e("currentPage", conf)));
                var f = opts.pagination.items || opts.items.visible,
                  g = Math.ceil(itms.total / f) - 1;
                return (
                  0 > b && (b = g),
                  b > g && (b = 0),
                  $cfs.triggerHandler(cf_e("slideTo", conf), [
                    b * f,
                    0,
                    !0,
                    c,
                    d,
                    e,
                  ])
                );
              }),
              $cfs.bind(cf_e("jumpToStart", conf), function (a, b) {
                if (
                  (a.stopPropagation(),
                  (b = b ? gn_getItemIndex(b, 0, !0, itms, $cfs) : 0),
                  (b += itms.first),
                  0 != b)
                ) {
                  if (itms.total > 0) for (; b > itms.total; ) b -= itms.total;
                  $cfs.prepend($cfs.children().slice(b, itms.total));
                }
                return !0;
              }),
              $cfs.bind(cf_e("synchronise", conf), function (a, b) {
                if ((a.stopPropagation(), b)) b = cf_getSynchArr(b);
                else {
                  if (!opts.synchronise)
                    return debug(conf, "No carousel to synchronise.");
                  b = opts.synchronise;
                }
                for (
                  var c = $cfs.triggerHandler(cf_e("currentPosition", conf)),
                    d = !0,
                    e = 0,
                    f = b.length;
                  f > e;
                  e++
                )
                  b[e][0].triggerHandler(cf_e("slideTo", conf), [
                    c,
                    b[e][3],
                    !0,
                  ]) || (d = !1);
                return d;
              }),
              $cfs.bind(cf_e("queue", conf), function (a, b, c) {
                return (
                  a.stopPropagation(),
                  is_function(b)
                    ? b.call($tt0, queu)
                    : is_array(b)
                    ? (queu = b)
                    : is_undefined(b) || queu.push([b, c]),
                  queu
                );
              }),
              $cfs.bind(cf_e("insertItem", conf), function (a, b, c, d, e) {
                a.stopPropagation();
                var f = [b, c, d, e],
                  g = [
                    "string/object",
                    "string/number/object",
                    "boolean",
                    "number",
                  ],
                  h = cf_sortParams(f, g);
                if (
                  ((b = h[0]),
                  (c = h[1]),
                  (d = h[2]),
                  (e = h[3]),
                  is_object(b) && !is_jquery(b)
                    ? (b = $(b))
                    : is_string(b) && (b = $(b)),
                  !is_jquery(b) || 0 == b.length)
                )
                  return debug(conf, "Not a valid object.");
                is_undefined(c) && (c = "end"),
                  sz_storeMargin(b, opts),
                  sz_storeOrigCss(b);
                var i = c,
                  j = "before";
                "end" == c
                  ? d
                    ? (0 == itms.first
                        ? ((c = itms.total - 1), (j = "after"))
                        : ((c = itms.first), (itms.first += b.length)),
                      0 > c && (c = 0))
                    : ((c = itms.total - 1), (j = "after"))
                  : (c = gn_getItemIndex(c, e, d, itms, $cfs));
                var k = $cfs.children().eq(c);
                return (
                  k.length
                    ? k[j](b)
                    : (debug(
                        conf,
                        "Correct insert-position not found! Appending item to the end."
                      ),
                      $cfs.append(b)),
                  "end" == i ||
                    d ||
                    (itms.first > c && (itms.first += b.length)),
                  (itms.total = $cfs.children().length),
                  itms.first >= itms.total && (itms.first -= itms.total),
                  $cfs.trigger(cf_e("updateSizes", conf)),
                  $cfs.trigger(cf_e("linkAnchors", conf)),
                  !0
                );
              }),
              $cfs.bind(cf_e("removeItem", conf), function (a, b, c, d) {
                a.stopPropagation();
                var e = [b, c, d],
                  f = ["string/number/object", "boolean", "number"],
                  g = cf_sortParams(e, f);
                if (
                  ((b = g[0]),
                  (c = g[1]),
                  (d = g[2]),
                  b instanceof $ && b.length > 1)
                )
                  return (
                    (i = $()),
                    b.each(function () {
                      var e = $cfs.trigger(cf_e("removeItem", conf), [
                        $(this),
                        c,
                        d,
                      ]);
                      e && (i = i.add(e));
                    }),
                    i
                  );
                if (is_undefined(b) || "end" == b) i = $cfs.children().last();
                else {
                  b = gn_getItemIndex(b, d, c, itms, $cfs);
                  var i = $cfs.children().eq(b);
                  i.length && itms.first > b && (itms.first -= i.length);
                }
                return (
                  i &&
                    i.length &&
                    (i.detach(),
                    (itms.total = $cfs.children().length),
                    $cfs.trigger(cf_e("updateSizes", conf))),
                  i
                );
              }),
              $cfs.bind(
                cf_e("onBefore", conf) + " " + cf_e("onAfter", conf),
                function (a, b) {
                  a.stopPropagation();
                  var c = a.type.slice(conf.events.prefix.length);
                  return (
                    is_array(b) && (clbk[c] = b),
                    is_function(b) && clbk[c].push(b),
                    clbk[c]
                  );
                }
              ),
              $cfs.bind(cf_e("currentPosition", conf), function (a, b) {
                if ((a.stopPropagation(), 0 == itms.first)) var c = 0;
                else var c = itms.total - itms.first;
                return is_function(b) && b.call($tt0, c), c;
              }),
              $cfs.bind(cf_e("currentPage", conf), function (a, b) {
                a.stopPropagation();
                var e,
                  c = opts.pagination.items || opts.items.visible,
                  d = Math.ceil(itms.total / c - 1);
                return (
                  (e =
                    0 == itms.first
                      ? 0
                      : itms.first < itms.total % c
                      ? 0
                      : itms.first != c || opts.circular
                      ? Math.round((itms.total - itms.first) / c)
                      : d),
                  0 > e && (e = 0),
                  e > d && (e = d),
                  is_function(b) && b.call($tt0, e),
                  e
                );
              }),
              $cfs.bind(cf_e("currentVisible", conf), function (a, b) {
                a.stopPropagation();
                var c = gi_getCurrentItems($cfs.children(), opts);
                return is_function(b) && b.call($tt0, c), c;
              }),
              $cfs.bind(cf_e("slice", conf), function (a, b, c, d) {
                if ((a.stopPropagation(), 0 == itms.total)) return !1;
                var e = [b, c, d],
                  f = ["number", "number", "function"],
                  g = cf_sortParams(e, f);
                if (
                  ((b = is_number(g[0]) ? g[0] : 0),
                  (c = is_number(g[1]) ? g[1] : itms.total),
                  (d = g[2]),
                  (b += itms.first),
                  (c += itms.first),
                  items.total > 0)
                ) {
                  for (; b > itms.total; ) b -= itms.total;
                  for (; c > itms.total; ) c -= itms.total;
                  for (; 0 > b; ) b += itms.total;
                  for (; 0 > c; ) c += itms.total;
                }
                var i,
                  h = $cfs.children();
                return (
                  (i =
                    c > b
                      ? h.slice(b, c)
                      : $(
                          h
                            .slice(b, itms.total)
                            .get()
                            .concat(h.slice(0, c).get())
                        )),
                  is_function(d) && d.call($tt0, i),
                  i
                );
              }),
              $cfs.bind(
                cf_e("isPaused", conf) +
                  " " +
                  cf_e("isStopped", conf) +
                  " " +
                  cf_e("isScrolling", conf),
                function (a, b) {
                  a.stopPropagation();
                  var c = a.type.slice(conf.events.prefix.length),
                    d = crsl[c];
                  return is_function(b) && b.call($tt0, d), d;
                }
              ),
              $cfs.bind(cf_e("configuration", conf), function (e, a, b, c) {
                e.stopPropagation();
                var reInit = !1;
                if (is_function(a)) a.call($tt0, opts);
                else if (is_object(a))
                  (opts_orig = $.extend(!0, {}, opts_orig, a)),
                    b !== !1
                      ? (reInit = !0)
                      : (opts = $.extend(!0, {}, opts, a));
                else if (!is_undefined(a))
                  if (is_function(b)) {
                    var val = eval("opts." + a);
                    is_undefined(val) && (val = ""), b.call($tt0, val);
                  } else {
                    if (is_undefined(b)) return eval("opts." + a);
                    "boolean" != typeof c && (c = !0),
                      eval("opts_orig." + a + " = b"),
                      c !== !1 ? (reInit = !0) : eval("opts." + a + " = b");
                  }
                if (reInit) {
                  sz_resetMargin($cfs.children(), opts),
                    FN._init(opts_orig),
                    FN._bind_buttons();
                  var sz = sz_setSizes($cfs, opts);
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz]);
                }
                return opts;
              }),
              $cfs.bind(cf_e("linkAnchors", conf), function (a, b, c) {
                return (
                  a.stopPropagation(),
                  is_undefined(b)
                    ? (b = $("body"))
                    : is_string(b) && (b = $(b)),
                  is_jquery(b) && 0 != b.length
                    ? (is_string(c) || (c = "a.caroufredsel"),
                      b.find(c).each(function () {
                        var a = this.hash || "";
                        a.length > 0 &&
                          -1 != $cfs.children().index($(a)) &&
                          $(this)
                            .unbind("click")
                            .click(function (b) {
                              b.preventDefault(),
                                $cfs.trigger(cf_e("slideTo", conf), a);
                            });
                      }),
                      !0)
                    : debug(conf, "Not a valid object.")
                );
              }),
              $cfs.bind(cf_e("updatePageStatus", conf), function (a, b) {
                if ((a.stopPropagation(), opts.pagination.container)) {
                  var d = opts.pagination.items || opts.items.visible,
                    e = Math.ceil(itms.total / d);
                  b &&
                    (opts.pagination.anchorBuilder &&
                      (opts.pagination.container.children().remove(),
                      opts.pagination.container.each(function () {
                        for (var a = 0; e > a; a++) {
                          var b = $cfs
                            .children()
                            .eq(gn_getItemIndex(a * d, 0, !0, itms, $cfs));
                          $(this).append(
                            opts.pagination.anchorBuilder.call(b[0], a + 1)
                          );
                        }
                      })),
                    opts.pagination.container.each(function () {
                      $(this)
                        .children()
                        .unbind(opts.pagination.event)
                        .each(function (a) {
                          $(this).bind(opts.pagination.event, function (b) {
                            b.preventDefault(),
                              $cfs.trigger(cf_e("slideTo", conf), [
                                a * d,
                                -opts.pagination.deviation,
                                !0,
                                opts.pagination,
                              ]);
                          });
                        });
                    }));
                  var f =
                    $cfs.triggerHandler(cf_e("currentPage", conf)) +
                    opts.pagination.deviation;
                  return (
                    f >= e && (f = 0),
                    0 > f && (f = e - 1),
                    opts.pagination.container.each(function () {
                      $(this)
                        .children()
                        .removeClass(cf_c("selected", conf))
                        .eq(f)
                        .addClass(cf_c("selected", conf));
                    }),
                    !0
                  );
                }
              }),
              $cfs.bind(cf_e("updateSizes", conf), function () {
                var b = opts.items.visible,
                  c = $cfs.children(),
                  d = ms_getParentSize($wrp, opts, "width");
                if (
                  ((itms.total = c.length),
                  crsl.primarySizePercentage
                    ? ((opts.maxDimension = d),
                      (opts[opts.d.width] = ms_getPercentage(
                        d,
                        crsl.primarySizePercentage
                      )))
                    : (opts.maxDimension = ms_getMaxDimension(opts, d)),
                  opts.responsive
                    ? ((opts.items.width = opts.items.sizesConf.width),
                      (opts.items.height = opts.items.sizesConf.height),
                      (opts = in_getResponsiveValues(opts, c, d)),
                      (b = opts.items.visible),
                      sz_setResponsiveSizes(opts, c))
                    : opts.items.visibleConf.variable
                    ? (b = gn_getVisibleItemsNext(c, opts, 0))
                    : "*" != opts.items.filter &&
                      (b = gn_getVisibleItemsNextFilter(c, opts, 0)),
                  !opts.circular && 0 != itms.first && b > itms.first)
                ) {
                  if (opts.items.visibleConf.variable)
                    var e =
                      gn_getVisibleItemsPrev(c, opts, itms.first) - itms.first;
                  else if ("*" != opts.items.filter)
                    var e =
                      gn_getVisibleItemsPrevFilter(c, opts, itms.first) -
                      itms.first;
                  else var e = opts.items.visible - itms.first;
                  debug(
                    conf,
                    "Preventing non-circular: sliding " + e + " items backward."
                  ),
                    $cfs.trigger(cf_e("prev", conf), e);
                }
                (opts.items.visible = cf_getItemsAdjust(
                  b,
                  opts,
                  opts.items.visibleConf.adjust,
                  $tt0
                )),
                  (opts.items.visibleConf.old = opts.items.visible),
                  (opts = in_getAlignPadding(opts, c));
                var f = sz_setSizes($cfs, opts);
                return (
                  $cfs.trigger(cf_e("updatePageStatus", conf), [!0, f]),
                  nv_showNavi(opts, itms.total, conf),
                  nv_enableNavi(opts, itms.first, conf),
                  f
                );
              }),
              $cfs.bind(cf_e("destroy", conf), function (a, b) {
                return (
                  a.stopPropagation(),
                  (tmrs = sc_clearTimers(tmrs)),
                  $cfs.data("_cfs_isCarousel", !1),
                  $cfs.trigger(cf_e("finish", conf)),
                  b && $cfs.trigger(cf_e("jumpToStart", conf)),
                  sz_restoreOrigCss($cfs.children()),
                  sz_restoreOrigCss($cfs),
                  FN._unbind_events(),
                  FN._unbind_buttons(),
                  "parent" == conf.wrapper
                    ? sz_restoreOrigCss($wrp)
                    : $wrp.replaceWith($cfs),
                  !0
                );
              }),
              $cfs.bind(cf_e("debug", conf), function () {
                return (
                  debug(conf, "Carousel width: " + opts.width),
                  debug(conf, "Carousel height: " + opts.height),
                  debug(conf, "Item widths: " + opts.items.width),
                  debug(conf, "Item heights: " + opts.items.height),
                  debug(conf, "Number of items visible: " + opts.items.visible),
                  opts.auto.play &&
                    debug(
                      conf,
                      "Number of items scrolled automatically: " +
                        opts.auto.items
                    ),
                  opts.prev.button &&
                    debug(
                      conf,
                      "Number of items scrolled backward: " + opts.prev.items
                    ),
                  opts.next.button &&
                    debug(
                      conf,
                      "Number of items scrolled forward: " + opts.next.items
                    ),
                  conf.debug
                );
              }),
              $cfs.bind("_cfs_triggerEvent", function (a, b, c) {
                return (
                  a.stopPropagation(), $cfs.triggerHandler(cf_e(b, conf), c)
                );
              });
          }),
          (FN._unbind_events = function () {
            $cfs.unbind(cf_e("", conf)),
              $cfs.unbind(cf_e("", conf, !1)),
              $cfs.unbind("_cfs_triggerEvent");
          }),
          (FN._bind_buttons = function () {
            if (
              (FN._unbind_buttons(),
              nv_showNavi(opts, itms.total, conf),
              nv_enableNavi(opts, itms.first, conf),
              opts.auto.pauseOnHover)
            ) {
              var a = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
              $wrp
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), a);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (
              (opts.auto.button &&
                opts.auto.button.bind(
                  cf_e(opts.auto.event, conf, !1),
                  function (a) {
                    a.preventDefault();
                    var b = !1,
                      c = null;
                    crsl.isPaused
                      ? (b = "play")
                      : opts.auto.pauseOnEvent &&
                        ((b = "pause"),
                        (c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent))),
                      b && $cfs.trigger(cf_e(b, conf), c);
                  }
                ),
              opts.prev.button &&
                (opts.prev.button.bind(
                  cf_e(opts.prev.event, conf, !1),
                  function (a) {
                    a.preventDefault(), $cfs.trigger(cf_e("prev", conf));
                  }
                ),
                opts.prev.pauseOnHover))
            ) {
              var a = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
              opts.prev.button
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), a);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (
              opts.next.button &&
              (opts.next.button.bind(
                cf_e(opts.next.event, conf, !1),
                function (a) {
                  a.preventDefault(), $cfs.trigger(cf_e("next", conf));
                }
              ),
              opts.next.pauseOnHover)
            ) {
              var a = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
              opts.next.button
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), a);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (opts.pagination.container && opts.pagination.pauseOnHover) {
              var a = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
              opts.pagination.container
                .bind(cf_e("mouseenter", conf, !1), function () {
                  $cfs.trigger(cf_e("pause", conf), a);
                })
                .bind(cf_e("mouseleave", conf, !1), function () {
                  $cfs.trigger(cf_e("resume", conf));
                });
            }
            if (
              ((opts.prev.key || opts.next.key) &&
                $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (a) {
                  var b = a.keyCode;
                  b == opts.next.key &&
                    (a.preventDefault(), $cfs.trigger(cf_e("next", conf))),
                    b == opts.prev.key &&
                      (a.preventDefault(), $cfs.trigger(cf_e("prev", conf)));
                }),
              opts.pagination.keys &&
                $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (a) {
                  var b = a.keyCode;
                  b >= 49 &&
                    58 > b &&
                    ((b = (b - 49) * opts.items.visible),
                    itms.total >= b &&
                      (a.preventDefault(),
                      $cfs.trigger(cf_e("slideTo", conf), [
                        b,
                        0,
                        !0,
                        opts.pagination,
                      ])));
                }),
              $.fn.swipe)
            ) {
              var b = "ontouchstart" in window;
              if ((b && opts.swipe.onTouch) || (!b && opts.swipe.onMouse)) {
                var c = $.extend(!0, {}, opts.prev, opts.swipe),
                  d = $.extend(!0, {}, opts.next, opts.swipe),
                  e = function () {
                    $cfs.trigger(cf_e("prev", conf), [c]);
                  },
                  f = function () {
                    $cfs.trigger(cf_e("next", conf), [d]);
                  };
                switch (opts.direction) {
                  case "up":
                  case "down":
                    (opts.swipe.options.swipeUp = f),
                      (opts.swipe.options.swipeDown = e);
                    break;
                  default:
                    (opts.swipe.options.swipeLeft = f),
                      (opts.swipe.options.swipeRight = e);
                }
                crsl.swipe && $cfs.swipe("destroy"),
                  $wrp.swipe(opts.swipe.options),
                  $wrp.css("cursor", "move"),
                  (crsl.swipe = !0);
              }
            }
            if ($.fn.mousewheel && opts.mousewheel) {
              var g = $.extend(!0, {}, opts.prev, opts.mousewheel),
                h = $.extend(!0, {}, opts.next, opts.mousewheel);
              crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)),
                $wrp.bind(cf_e("mousewheel", conf, !1), function (a, b) {
                  a.preventDefault(),
                    b > 0
                      ? $cfs.trigger(cf_e("prev", conf), [g])
                      : $cfs.trigger(cf_e("next", conf), [h]);
                }),
                (crsl.mousewheel = !0);
            }
            if (
              (opts.auto.play &&
                $cfs.trigger(cf_e("play", conf), opts.auto.delay),
              crsl.upDateOnWindowResize)
            ) {
              var i = function () {
                  $cfs.trigger(cf_e("finish", conf)),
                    opts.auto.pauseOnResize &&
                      !crsl.isPaused &&
                      $cfs.trigger(cf_e("play", conf)),
                    sz_resetMargin($cfs.children(), opts),
                    $cfs.trigger(cf_e("updateSizes", conf));
                },
                j = $(window),
                k = null;
              if ($.debounce && "debounce" == conf.onWindowResize)
                k = $.debounce(200, i);
              else if ($.throttle && "throttle" == conf.onWindowResize)
                k = $.throttle(300, i);
              else {
                var l = 0,
                  m = 0;
                k = function () {
                  var a = j.width(),
                    b = j.height();
                  (a != l || b != m) && (i(), (l = a), (m = b));
                };
              }
              j.bind(cf_e("resize", conf, !1, !0, !0), k);
            }
          }),
          (FN._unbind_buttons = function () {
            var b = (cf_e("", conf), cf_e("", conf, !1));
            (ns3 = cf_e("", conf, !1, !0, !0)),
              $(document).unbind(ns3),
              $(window).unbind(ns3),
              $wrp.unbind(b),
              opts.auto.button && opts.auto.button.unbind(b),
              opts.prev.button && opts.prev.button.unbind(b),
              opts.next.button && opts.next.button.unbind(b),
              opts.pagination.container &&
                (opts.pagination.container.unbind(b),
                opts.pagination.anchorBuilder &&
                  opts.pagination.container.children().remove()),
              crsl.swipe &&
                ($cfs.swipe("destroy"),
                $wrp.css("cursor", "default"),
                (crsl.swipe = !1)),
              crsl.mousewheel && (crsl.mousewheel = !1),
              nv_showNavi(opts, "hide", conf),
              nv_enableNavi(opts, "removeClass", conf);
          }),
          is_boolean(configs) && (configs = { debug: configs });
        var crsl = {
            direction: "next",
            isPaused: !0,
            isScrolling: !1,
            isStopped: !1,
            mousewheel: !1,
            swipe: !1,
          },
          itms = { total: $cfs.children().length, first: 0 },
          tmrs = {
            auto: null,
            progress: null,
            startTime: getTime(),
            timePassed: 0,
          },
          scrl = {
            isStopped: !1,
            duration: 0,
            startTime: 0,
            easing: "",
            anims: [],
          },
          clbk = { onBefore: [], onAfter: [] },
          queu = [],
          conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
          opts = {},
          opts_orig = $.extend(!0, {}, options),
          $wrp =
            "parent" == conf.wrapper
              ? $cfs.parent()
              : $cfs
                  .wrap(
                    "<" +
                      conf.wrapper.element +
                      ' class="' +
                      conf.wrapper.classname +
                      '" />'
                  )
                  .parent();
        if (
          ((conf.selector = $cfs.selector),
          (conf.serialNumber = $.fn.carouFredSel.serialNumber++),
          (conf.transition =
            conf.transition && $.fn.transition ? "transition" : "animate"),
          FN._init(opts_orig, !0, starting_position),
          FN._build(),
          FN._bind_events(),
          FN._bind_buttons(),
          is_array(opts.items.start))
        )
          var start_arr = opts.items.start;
        else {
          var start_arr = [];
          0 != opts.items.start && start_arr.push(opts.items.start);
        }
        if (
          (opts.cookie &&
            start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)),
          start_arr.length > 0)
        )
          for (var a = 0, l = start_arr.length; l > a; a++) {
            var s = start_arr[a];
            if (0 != s) {
              if (s === !0) {
                if (((s = window.location.hash), 1 > s.length)) continue;
              } else
                "random" === s && (s = Math.floor(Math.random() * itms.total));
              if (
                $cfs.triggerHandler(cf_e("slideTo", conf), [
                  s,
                  0,
                  !0,
                  { fx: "none" },
                ])
              )
                break;
            }
          }
        var siz = sz_setSizes($cfs, opts),
          itm = gi_getCurrentItems($cfs.children(), opts);
        return (
          opts.onCreate &&
            opts.onCreate.call($tt0, {
              width: siz.width,
              height: siz.height,
              items: itm,
            }),
          $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]),
          $cfs.trigger(cf_e("linkAnchors", conf)),
          conf.debug && $cfs.trigger(cf_e("debug", conf)),
          $cfs
        );
      }),
    ($.fn.carouFredSel.serialNumber = 1),
    ($.fn.carouFredSel.defaults = {
      synchronise: !1,
      infinite: !0,
      circular: !0,
      responsive: !1,
      direction: "left",
      items: { start: 0 },
      scroll: {
        easing: "swing",
        duration: 500,
        pauseOnHover: !1,
        event: "click",
        queue: !1,
      },
    }),
    ($.fn.carouFredSel.configs = {
      debug: !1,
      transition: !1,
      onWindowResize: "throttle",
      events: { prefix: "", namespace: "cfs" },
      wrapper: { element: "div", classname: "caroufredsel_wrapper" },
      classnames: {},
    }),
    ($.fn.carouFredSel.pageAnchorBuilder = function (a) {
      return '<a href="#"><span>' + a + "</span></a>";
    }),
    ($.fn.carouFredSel.progressbarUpdater = function (a) {
      $(this).css("width", a + "%");
    }),
    ($.fn.carouFredSel.cookie = {
      get: function (a) {
        a += "=";
        for (
          var b = document.cookie.split(";"), c = 0, d = b.length;
          d > c;
          c++
        ) {
          for (var e = b[c]; " " == e.charAt(0); ) e = e.slice(1);
          if (0 == e.indexOf(a)) return e.slice(a.length);
        }
        return 0;
      },
      set: function (a, b, c) {
        var d = "";
        if (c) {
          var e = new Date();
          e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c),
            (d = "; expires=" + e.toGMTString());
        }
        document.cookie = a + "=" + b + d + "; path=/";
      },
      remove: function (a) {
        $.fn.carouFredSel.cookie.set(a, "", -1);
      },
    }),
    $.extend($.easing, {
      quadratic: function (a) {
        var b = a * a;
        return a * (-b * a + 4 * b - 6 * a + 4);
      },
      cubic: function (a) {
        return a * (4 * a * a - 9 * a + 6);
      },
      elastic: function (a) {
        var b = a * a;
        return a * (33 * b * b - 106 * b * a + 126 * b - 67 * a + 15);
      },
    }));
})(jQuery);

/**
 * @deprecated since 15.7 !!!!!
 *
 * Touch
 * required for: carouFredSel
 *
 * TouchSwipe
 *
 * 1.6.6 | Matt Bryson | http://www.github.com/mattbryson | https://github.com/mattbryson/TouchSwipe-Jquery-Plugin | Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function (a) {
  if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function (f) {
  var p = "left",
    o = "right",
    e = "up",
    x = "down",
    c = "in",
    z = "out",
    m = "none",
    s = "auto",
    l = "swipe",
    t = "pinch",
    A = "tap",
    j = "doubletap",
    b = "longtap",
    y = "hold",
    D = "horizontal",
    u = "vertical",
    i = "all",
    r = 10,
    g = "start",
    k = "move",
    h = "end",
    q = "cancel",
    a = "ontouchstart" in window,
    v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
    d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    B = "TouchSwipe";
  var n = {
    fingers: 1,
    threshold: 75,
    cancelThreshold: null,
    pinchThreshold: 20,
    maxTimeThreshold: null,
    fingerReleaseThreshold: 250,
    longTapThreshold: 500,
    doubleTapThreshold: 200,
    swipe: null,
    swipeLeft: null,
    swipeRight: null,
    swipeUp: null,
    swipeDown: null,
    swipeStatus: null,
    pinchIn: null,
    pinchOut: null,
    pinchStatus: null,
    click: null,
    tap: null,
    doubleTap: null,
    longTap: null,
    hold: null,
    triggerOnTouchEnd: true,
    triggerOnTouchLeave: false,
    allowPageScroll: "auto",
    fallbackToMouseEvents: true,
    excludedElements: "label, button, input, select, textarea, a, .noSwipe",
    preventDefaultEvents: true,
  };
  f.fn.swipe = function (G) {
    var F = f(this),
      E = F.data(B);
    if (E && typeof G === "string") {
      if (E[G]) {
        return E[G].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        f.error("Method " + G + " does not exist on jQuery.swipe");
      }
    } else {
      if (!E && (typeof G === "object" || !G)) {
        return w.apply(this, arguments);
      }
    }
    return F;
  };
  f.fn.swipe.defaults = n;
  f.fn.swipe.phases = {
    PHASE_START: g,
    PHASE_MOVE: k,
    PHASE_END: h,
    PHASE_CANCEL: q,
  };
  f.fn.swipe.directions = { LEFT: p, RIGHT: o, UP: e, DOWN: x, IN: c, OUT: z };
  f.fn.swipe.pageScroll = { NONE: m, HORIZONTAL: D, VERTICAL: u, AUTO: s };
  f.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: i };
  function w(E) {
    if (
      E &&
      E.allowPageScroll === undefined &&
      (E.swipe !== undefined || E.swipeStatus !== undefined)
    ) {
      E.allowPageScroll = m;
    }
    if (E.click !== undefined && E.tap === undefined) {
      E.tap = E.click;
    }
    if (!E) {
      E = {};
    }
    E = f.extend({}, f.fn.swipe.defaults, E);
    return this.each(function () {
      var G = f(this);
      var F = G.data(B);
      if (!F) {
        F = new C(this, E);
        G.data(B, F);
      }
    });
  }
  function C(a4, av) {
    var az = a || d || !av.fallbackToMouseEvents,
      J = az
        ? d
          ? v
            ? "MSPointerDown"
            : "pointerdown"
          : "touchstart"
        : "mousedown",
      ay = az
        ? d
          ? v
            ? "MSPointerMove"
            : "pointermove"
          : "touchmove"
        : "mousemove",
      U = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
      S = az ? null : "mouseleave",
      aD = d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel";
    var ag = 0,
      aP = null,
      ab = 0,
      a1 = 0,
      aZ = 0,
      G = 1,
      aq = 0,
      aJ = 0,
      M = null;
    var aR = f(a4);
    var Z = "start";
    var W = 0;
    var aQ = null;
    var T = 0,
      a2 = 0,
      a5 = 0,
      ad = 0,
      N = 0;
    var aW = null,
      af = null;
    try {
      aR.bind(J, aN);
      aR.bind(aD, a9);
    } catch (ak) {
      f.error("events not supported " + J + "," + aD + " on jQuery.swipe");
    }
    this.enable = function () {
      aR.bind(J, aN);
      aR.bind(aD, a9);
      return aR;
    };
    this.disable = function () {
      aK();
      return aR;
    };
    this.destroy = function () {
      aK();
      aR.data(B, null);
      aR = null;
    };
    this.option = function (bc, bb) {
      if (av[bc] !== undefined) {
        if (bb === undefined) {
          return av[bc];
        } else {
          av[bc] = bb;
        }
      } else {
        f.error("Option " + bc + " does not exist on jQuery.swipe.options");
      }
      return null;
    };
    function aN(bd) {
      if (aB()) {
        return;
      }
      if (f(bd.target).closest(av.excludedElements, aR).length > 0) {
        return;
      }
      var be = bd.originalEvent ? bd.originalEvent : bd;
      var bc,
        bb = a ? be.touches[0] : be;
      Z = g;
      if (a) {
        W = be.touches.length;
      } else {
        bd.preventDefault();
      }
      ag = 0;
      aP = null;
      aJ = null;
      ab = 0;
      a1 = 0;
      aZ = 0;
      G = 1;
      aq = 0;
      aQ = aj();
      M = aa();
      R();
      if (!a || W === av.fingers || av.fingers === i || aX()) {
        ai(0, bb);
        T = at();
        if (W == 2) {
          ai(1, be.touches[1]);
          a1 = aZ = au(aQ[0].start, aQ[1].start);
        }
        if (av.swipeStatus || av.pinchStatus) {
          bc = O(be, Z);
        }
      } else {
        bc = false;
      }
      if (bc === false) {
        Z = q;
        O(be, Z);
        return bc;
      } else {
        if (av.hold) {
          af = setTimeout(
            f.proxy(function () {
              aR.trigger("hold", [be.target]);
              if (av.hold) {
                bc = av.hold.call(aR, be, be.target);
              }
            }, this),
            av.longTapThreshold
          );
        }
        ao(true);
      }
      return null;
    }
    function a3(be) {
      var bh = be.originalEvent ? be.originalEvent : be;
      if (Z === h || Z === q || am()) {
        return;
      }
      var bd,
        bc = a ? bh.touches[0] : bh;
      var bf = aH(bc);
      a2 = at();
      if (a) {
        W = bh.touches.length;
      }
      if (av.hold) {
        clearTimeout(af);
      }
      Z = k;
      if (W == 2) {
        if (a1 == 0) {
          ai(1, bh.touches[1]);
          a1 = aZ = au(aQ[0].start, aQ[1].start);
        } else {
          aH(bh.touches[1]);
          aZ = au(aQ[0].end, aQ[1].end);
          aJ = ar(aQ[0].end, aQ[1].end);
        }
        G = a7(a1, aZ);
        aq = Math.abs(a1 - aZ);
      }
      if (W === av.fingers || av.fingers === i || !a || aX()) {
        aP = aL(bf.start, bf.end);
        al(be, aP);
        ag = aS(bf.start, bf.end);
        ab = aM();
        aI(aP, ag);
        if (av.swipeStatus || av.pinchStatus) {
          bd = O(bh, Z);
        }
        if (!av.triggerOnTouchEnd || av.triggerOnTouchLeave) {
          var bb = true;
          if (av.triggerOnTouchLeave) {
            var bg = aY(this);
            bb = E(bf.end, bg);
          }
          if (!av.triggerOnTouchEnd && bb) {
            Z = aC(k);
          } else {
            if (av.triggerOnTouchLeave && !bb) {
              Z = aC(h);
            }
          }
          if (Z == q || Z == h) {
            O(bh, Z);
          }
        }
      } else {
        Z = q;
        O(bh, Z);
      }
      if (bd === false) {
        Z = q;
        O(bh, Z);
      }
    }
    function L(bb) {
      var bc = bb.originalEvent;
      if (a) {
        if (bc.touches.length > 0) {
          F();
          return true;
        }
      }
      if (am()) {
        W = ad;
      }
      a2 = at();
      ab = aM();
      if (ba() || !an()) {
        Z = q;
        O(bc, Z);
      } else {
        if (
          av.triggerOnTouchEnd ||
          (av.triggerOnTouchEnd == false && Z === k)
        ) {
          bb.preventDefault();
          Z = h;
          O(bc, Z);
        } else {
          if (!av.triggerOnTouchEnd && a6()) {
            Z = h;
            aF(bc, Z, A);
          } else {
            if (Z === k) {
              Z = q;
              O(bc, Z);
            }
          }
        }
      }
      ao(false);
      return null;
    }
    function a9() {
      W = 0;
      a2 = 0;
      T = 0;
      a1 = 0;
      aZ = 0;
      G = 1;
      R();
      ao(false);
    }
    function K(bb) {
      var bc = bb.originalEvent;
      if (av.triggerOnTouchLeave) {
        Z = aC(h);
        O(bc, Z);
      }
    }
    function aK() {
      aR.unbind(J, aN);
      aR.unbind(aD, a9);
      aR.unbind(ay, a3);
      aR.unbind(U, L);
      if (S) {
        aR.unbind(S, K);
      }
      ao(false);
    }
    function aC(bf) {
      var be = bf;
      var bd = aA();
      var bc = an();
      var bb = ba();
      if (!bd || bb) {
        be = q;
      } else {
        if (
          bc &&
          bf == k &&
          (!av.triggerOnTouchEnd || av.triggerOnTouchLeave)
        ) {
          be = h;
        } else {
          if (!bc && bf == h && av.triggerOnTouchLeave) {
            be = q;
          }
        }
      }
      return be;
    }
    function O(bd, bb) {
      var bc = undefined;
      if (I() || V() || P() || aX()) {
        if (I() || V()) {
          bc = aF(bd, bb, l);
        }
        if ((P() || aX()) && bc !== false) {
          bc = aF(bd, bb, t);
        }
      } else {
        if (aG() && bc !== false) {
          bc = aF(bd, bb, j);
        } else {
          if (ap() && bc !== false) {
            bc = aF(bd, bb, b);
          } else {
            if (ah() && bc !== false) {
              bc = aF(bd, bb, A);
            }
          }
        }
      }
      if (bb === q) {
        a9(bd);
      }
      if (bb === h) {
        if (a) {
          if (bd.touches.length == 0) {
            a9(bd);
          }
        } else {
          a9(bd);
        }
      }
      return bc;
    }
    function aF(be, bb, bd) {
      var bc = undefined;
      if (bd == l) {
        aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]);
        if (av.swipeStatus) {
          bc = av.swipeStatus.call(
            aR,
            be,
            bb,
            aP || null,
            ag || 0,
            ab || 0,
            W,
            aQ
          );
          if (bc === false) {
            return false;
          }
        }
        if (bb == h && aV()) {
          aR.trigger("swipe", [aP, ag, ab, W, aQ]);
          if (av.swipe) {
            bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ);
            if (bc === false) {
              return false;
            }
          }
          switch (aP) {
            case p:
              aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]);
              if (av.swipeLeft) {
                bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
            case o:
              aR.trigger("swipeRight", [aP, ag, ab, W, aQ]);
              if (av.swipeRight) {
                bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
            case e:
              aR.trigger("swipeUp", [aP, ag, ab, W, aQ]);
              if (av.swipeUp) {
                bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
            case x:
              aR.trigger("swipeDown", [aP, ag, ab, W, aQ]);
              if (av.swipeDown) {
                bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ);
              }
              break;
          }
        }
      }
      if (bd == t) {
        aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]);
        if (av.pinchStatus) {
          bc = av.pinchStatus.call(
            aR,
            be,
            bb,
            aJ || null,
            aq || 0,
            ab || 0,
            W,
            G,
            aQ
          );
          if (bc === false) {
            return false;
          }
        }
        if (bb == h && a8()) {
          switch (aJ) {
            case c:
              aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
              if (av.pinchIn) {
                bc = av.pinchIn.call(
                  aR,
                  be,
                  aJ || null,
                  aq || 0,
                  ab || 0,
                  W,
                  G,
                  aQ
                );
              }
              break;
            case z:
              aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
              if (av.pinchOut) {
                bc = av.pinchOut.call(
                  aR,
                  be,
                  aJ || null,
                  aq || 0,
                  ab || 0,
                  W,
                  G,
                  aQ
                );
              }
              break;
          }
        }
      }
      if (bd == A) {
        if (bb === q || bb === h) {
          clearTimeout(aW);
          clearTimeout(af);
          if (Y() && !H()) {
            N = at();
            aW = setTimeout(
              f.proxy(function () {
                N = null;
                aR.trigger("tap", [be.target]);
                if (av.tap) {
                  bc = av.tap.call(aR, be, be.target);
                }
              }, this),
              av.doubleTapThreshold
            );
          } else {
            N = null;
            aR.trigger("tap", [be.target]);
            if (av.tap) {
              bc = av.tap.call(aR, be, be.target);
            }
          }
        }
      } else {
        if (bd == j) {
          if (bb === q || bb === h) {
            clearTimeout(aW);
            N = null;
            aR.trigger("doubletap", [be.target]);
            if (av.doubleTap) {
              bc = av.doubleTap.call(aR, be, be.target);
            }
          }
        } else {
          if (bd == b) {
            if (bb === q || bb === h) {
              clearTimeout(aW);
              N = null;
              aR.trigger("longtap", [be.target]);
              if (av.longTap) {
                bc = av.longTap.call(aR, be, be.target);
              }
            }
          }
        }
      }
      return bc;
    }
    function an() {
      var bb = true;
      if (av.threshold !== null) {
        bb = ag >= av.threshold;
      }
      return bb;
    }
    function ba() {
      var bb = false;
      if (av.cancelThreshold !== null && aP !== null) {
        bb = aT(aP) - ag >= av.cancelThreshold;
      }
      return bb;
    }
    function ae() {
      if (av.pinchThreshold !== null) {
        return aq >= av.pinchThreshold;
      }
      return true;
    }
    function aA() {
      var bb;
      if (av.maxTimeThreshold) {
        if (ab >= av.maxTimeThreshold) {
          bb = false;
        } else {
          bb = true;
        }
      } else {
        bb = true;
      }
      return bb;
    }
    function al(bb, bc) {
      if (av.preventDefaultEvents === false) {
        return;
      }
      if (av.allowPageScroll === m) {
        bb.preventDefault();
      } else {
        var bd = av.allowPageScroll === s;
        switch (bc) {
          case p:
            if ((av.swipeLeft && bd) || (!bd && av.allowPageScroll != D)) {
              bb.preventDefault();
            }
            break;
          case o:
            if ((av.swipeRight && bd) || (!bd && av.allowPageScroll != D)) {
              bb.preventDefault();
            }
            break;
          case e:
            if ((av.swipeUp && bd) || (!bd && av.allowPageScroll != u)) {
              bb.preventDefault();
            }
            break;
          case x:
            if ((av.swipeDown && bd) || (!bd && av.allowPageScroll != u)) {
              bb.preventDefault();
            }
            break;
        }
      }
    }
    function a8() {
      var bc = aO();
      var bb = X();
      var bd = ae();
      return bc && bb && bd;
    }
    function aX() {
      return !!(av.pinchStatus || av.pinchIn || av.pinchOut);
    }
    function P() {
      return !!(a8() && aX());
    }
    function aV() {
      var be = aA();
      var bg = an();
      var bd = aO();
      var bb = X();
      var bc = ba();
      var bf = !bc && bb && bd && bg && be;
      return bf;
    }
    function V() {
      return !!(
        av.swipe ||
        av.swipeStatus ||
        av.swipeLeft ||
        av.swipeRight ||
        av.swipeUp ||
        av.swipeDown
      );
    }
    function I() {
      return !!(aV() && V());
    }
    function aO() {
      return W === av.fingers || av.fingers === i || !a;
    }
    function X() {
      return aQ[0].end.x !== 0;
    }
    function a6() {
      return !!av.tap;
    }
    function Y() {
      return !!av.doubleTap;
    }
    function aU() {
      return !!av.longTap;
    }
    function Q() {
      if (N == null) {
        return false;
      }
      var bb = at();
      return Y() && bb - N <= av.doubleTapThreshold;
    }
    function H() {
      return Q();
    }
    function ax() {
      return (W === 1 || !a) && (isNaN(ag) || ag < av.threshold);
    }
    function a0() {
      return ab > av.longTapThreshold && ag < r;
    }
    function ah() {
      return !!(ax() && a6());
    }
    function aG() {
      return !!(Q() && Y());
    }
    function ap() {
      return !!(a0() && aU());
    }
    function F() {
      a5 = at();
      ad = event.touches.length + 1;
    }
    function R() {
      a5 = 0;
      ad = 0;
    }
    function am() {
      var bb = false;
      if (a5) {
        var bc = at() - a5;
        if (bc <= av.fingerReleaseThreshold) {
          bb = true;
        }
      }
      return bb;
    }
    function aB() {
      return !!(aR.data(B + "_intouch") === true);
    }
    function ao(bb) {
      if (bb === true) {
        aR.bind(ay, a3);
        aR.bind(U, L);
        if (S) {
          aR.bind(S, K);
        }
      } else {
        aR.unbind(ay, a3, false);
        aR.unbind(U, L, false);
        if (S) {
          aR.unbind(S, K, false);
        }
      }
      aR.data(B + "_intouch", bb === true);
    }
    function ai(bc, bb) {
      var bd = bb.identifier !== undefined ? bb.identifier : 0;
      aQ[bc].identifier = bd;
      aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX;
      aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY;
      return aQ[bc];
    }
    function aH(bb) {
      var bd = bb.identifier !== undefined ? bb.identifier : 0;
      var bc = ac(bd);
      bc.end.x = bb.pageX || bb.clientX;
      bc.end.y = bb.pageY || bb.clientY;
      return bc;
    }
    function ac(bc) {
      for (var bb = 0; bb < aQ.length; bb++) {
        if (aQ[bb].identifier == bc) {
          return aQ[bb];
        }
      }
    }
    function aj() {
      var bb = [];
      for (var bc = 0; bc <= 5; bc++) {
        bb.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
      }
      return bb;
    }
    function aI(bb, bc) {
      bc = Math.max(bc, aT(bb));
      M[bb].distance = bc;
    }
    function aT(bb) {
      if (M[bb]) {
        return M[bb].distance;
      }
      return undefined;
    }
    function aa() {
      var bb = {};
      bb[p] = aw(p);
      bb[o] = aw(o);
      bb[e] = aw(e);
      bb[x] = aw(x);
      return bb;
    }
    function aw(bb) {
      return { direction: bb, distance: 0 };
    }
    function aM() {
      return a2 - T;
    }
    function au(be, bd) {
      var bc = Math.abs(be.x - bd.x);
      var bb = Math.abs(be.y - bd.y);
      return Math.round(Math.sqrt(bc * bc + bb * bb));
    }
    function a7(bb, bc) {
      var bd = (bc / bb) * 1;
      return bd.toFixed(2);
    }
    function ar() {
      if (G < 1) {
        return z;
      } else {
        return c;
      }
    }
    function aS(bc, bb) {
      return Math.round(
        Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2))
      );
    }
    function aE(be, bc) {
      var bb = be.x - bc.x;
      var bg = bc.y - be.y;
      var bd = Math.atan2(bg, bb);
      var bf = Math.round((bd * 180) / Math.PI);
      if (bf < 0) {
        bf = 360 - Math.abs(bf);
      }
      return bf;
    }
    function aL(bc, bb) {
      var bd = aE(bc, bb);
      if (bd <= 45 && bd >= 0) {
        return p;
      } else {
        if (bd <= 360 && bd >= 315) {
          return p;
        } else {
          if (bd >= 135 && bd <= 225) {
            return o;
          } else {
            if (bd > 45 && bd < 135) {
              return x;
            } else {
              return e;
            }
          }
        }
      }
    }
    function at() {
      var bb = new Date();
      return bb.getTime();
    }
    function aY(bb) {
      bb = f(bb);
      var bd = bb.offset();
      var bc = {
        left: bd.left,
        right: bd.left + bb.outerWidth(),
        top: bd.top,
        bottom: bd.top + bb.outerHeight(),
      };
      return bc;
    }
    function E(bb, bc) {
      return (
        bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom
      );
    }
  }
});

/**
 * Visible
 * required for: One Page Active
 *
 * Sam Sehnert, samatdf, TeamDF | https://github.com/teamdf/jquery-visible/
 */
(function (e) {
  e.fn.visible = function (t, n, r) {
    var i = e(this).eq(0),
      s = i.get(0),
      o = e(window),
      u = o.scrollTop(),
      a = u + o.height(),
      f = o.scrollLeft(),
      l = f + o.width(),
      c = i.offset().top,
      h = c + i.height(),
      p = i.offset().left,
      d = p + i.width(),
      v = t === true ? h : c,
      m = t === true ? c : h,
      g = t === true ? d : p,
      y = t === true ? p : d,
      b = n === true ? s.offsetWidth * s.offsetHeight : true,
      r = r ? r : "both";
    if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
    else if (r === "vertical") return !!b && m <= a && v >= u;
    else if (r === "horizontal") return !!b && y <= l && g >= f;
  };
})(jQuery);

/**
 * Waypoint
 * required for: Chart, Progress, Skills
 *
 * Copyright (c) 2011-2013 Caleb Troughton | https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */
//(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
/**
 * Waypoints
 * required for: Chart, Progress, Skills
 * 4.0.1 | Caleb Troughton | https://github.com/imakewebthings/waypoints | Licensed under the MIT license.
 */

!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.context.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        n.windowContext ||
          ((n.windowContext = !0), (n.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                : g &&
                  s.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();

/**
 * Retina
 *
 * Retina.js
 *
 * 1.3.0 | Copyright 2014 Imulus, LLC | Released under the MIT license
 */
//if( window.mfn.retina_js ){	!function(){function a(){}function b(a){return f.retinaImageSuffix+a}function c(a,c){if(this.path=a||"","undefined"!=typeof c&&null!==c)this.at_2x_path=c,this.perform_check=!1;else{if(void 0!==document.createElement){var d=document.createElement("a");d.href=this.path,d.pathname=d.pathname.replace(g,b),this.at_2x_path=d.href}else{var e=this.path.split("?");e[0]=e[0].replace(g,b),this.at_2x_path=e.join("?")}this.perform_check=!0}}function d(a){this.el=a,this.path=new c(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var b=this;this.path.check_2x_variant(function(a){a&&b.swap()})}var e="undefined"==typeof exports?window:exports,f={retinaImageSuffix:"@2x",check_mime_type:!0,force_original_dimensions:!0};e.Retina=a,a.configure=function(a){null===a&&(a={});for(var b in a)a.hasOwnProperty(b)&&(f[b]=a[b])},a.init=function(a){null===a&&(a=e);var b=a.onload||function(){};a.onload=function(){var a,c,e=document.getElementsByTagName("img"),f=[];for(a=0;a<e.length;a+=1)c=e[a],c.getAttributeNode("data-no-retina")||f.push(new d(c));b()}},a.isRetina=function(){var a="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return e.devicePixelRatio>1?!0:e.matchMedia&&e.matchMedia(a).matches?!0:!1};var g=/\.\w+$/;e.RetinaImagePath=c,c.confirmed_paths=[],c.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},c.prototype.check_2x_variant=function(a){var b,d=this;return this.is_external()?a(!1):this.perform_check||"undefined"==typeof this.at_2x_path||null===this.at_2x_path?this.at_2x_path in c.confirmed_paths?a(!0):(b=new XMLHttpRequest,b.open("HEAD",this.at_2x_path),b.onreadystatechange=function(){if(4!==b.readyState)return a(!1);if(b.status>=200&&b.status<=399){if(f.check_mime_type){var e=b.getResponseHeader("Content-Type");if(null===e||!e.match(/^image/i))return a(!1)}return c.confirmed_paths.push(d.at_2x_path),a(!0)}return a(!1)},b.send(),void 0):a(!0)},e.RetinaImage=d,d.prototype.swap=function(a){function b(){c.el.complete?(f.force_original_dimensions&&(c.el.setAttribute("width",c.el.offsetWidth),c.el.setAttribute("height",c.el.offsetHeight)),c.el.setAttribute("src",a)):setTimeout(b,5)}"undefined"==typeof a&&(a=this.path.at_2x_path);var c=this;b()},a.isRetina()&&a.init(e)}();}
