(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('sharp')) :
  typeof define === 'function' && define.amd ? define(['exports', 'sharp'], factory) :
  (global = global || self, factory(global.nextThenImageUtil = {}, global.sharp));
}(this, (function (exports, sharp) {
  sharp = sharp && Object.prototype.hasOwnProperty.call(sharp, 'default') ? sharp['default'] : sharp;

  function _catch(body, recover) {
    try {
      var result = body();
    } catch (e) {
      return recover(e);
    }

    if (result && result.then) {
      return result.then(void 0, recover);
    }

    return result;
  }

  function _settle(pact, state, value) {
    if (!pact.s) {
      if (value instanceof _Pact) {
        if (value.s) {
          if (state & 1) {
            state = value.s;
          }

          value = value.v;
        } else {
          value.o = _settle.bind(null, pact, state);
          return;
        }
      }

      if (value && value.then) {
        value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
        return;
      }

      pact.s = state;
      pact.v = value;
      var observer = pact.o;

      if (observer) {
        observer(pact);
      }
    }
  }

  var transform = function transform(ab, mimeType) {
    try {
      return Promise.resolve(new Promise(function (resolve, reject) {
        var buffer = Buffer.from(ab);
        sharp(buffer).normalise().modulate({
          saturation: 1.2,
          brightness: 1
        }).removeAlpha().resize(30, 30, {
          fit: "inside"
        }).jpeg().toBuffer(function (err, buffer) {
          if (err) return reject(err);
          resolve(toBase64(buffer, mimeType));
        });
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var _Pact = /*#__PURE__*/function () {
    function _Pact() {}

    _Pact.prototype.then = function (onFulfilled, onRejected) {
      var result = new _Pact();
      var state = this.s;

      if (state) {
        var callback = state & 1 ? onFulfilled : onRejected;

        if (callback) {
          try {
            _settle(result, 1, callback(this.v));
          } catch (e) {
            _settle(result, 2, e);
          }

          return result;
        } else {
          return this;
        }
      }

      this.o = function (_this) {
        try {
          var value = _this.v;

          if (_this.s & 1) {
            _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
          } else if (onRejected) {
            _settle(result, 1, onRejected(value));
          } else {
            _settle(result, 2, value);
          }
        } catch (e) {
          _settle(result, 2, e);
        }
      };

      return result;
    };

    return _Pact;
  }();

  function _isSettledPact(thenable) {
    return thenable instanceof _Pact && thenable.s & 1;
  }

  function _forTo(array, body, check) {
    var i = -1,
        pact,
        reject;

    function _cycle(result) {
      try {
        while (++i < array.length && (!check || !check())) {
          result = body(i);

          if (result && result.then) {
            if (_isSettledPact(result)) {
              result = result.v;
            } else {
              result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
              return;
            }
          }
        }

        if (pact) {
          _settle(pact, 1, result);
        } else {
          pact = result;
        }
      } catch (e) {
        _settle(pact || (pact = new _Pact()), 2, e);
      }
    }

    _cycle();

    return pact;
  }

  var sequenceArray = function sequenceArray(array, fn) {
    try {
      var results = [];

      var _temp2 = _forTo(array, function (i) {
        return Promise.resolve(fn(array[i])).then(function (r) {
          results.push(r);
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {
        return results;
      }) : results);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var getLqip = function getLqip(url) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(fetch("" + url)).then(function (imageRes) {
          return Promise.resolve(imageRes.blob()).then(function (blob) {
            var mimeType = blob.type;
            return Promise.resolve(blob.arrayBuffer()).then(function (arrayBuffer) {
              return Promise.resolve(transform(arrayBuffer, mimeType));
            });
          });
        });
      }, function (e) {
        console.log("Failed to fetch base64 image", url);
        throw e;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var getLqips = function getLqips(urls) {
    return Promise.resolve(sequenceArray(urls, function (url) {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(getLqip(url)); // return {
        //   lqip: b64,
        //   src: url,
        // };
      }, function () {
        return null;
      }));
    })); // const reduced = lqips.reduce((prev, curr) => {
    //   const {src, lqip} = curr;
    //   return {
    //     ...prev,
    //     [src]: lqip,
    //   };
    // });
    // return reduced;
  };

  function toBase64(buffer, mimeType) {
    return "data:" + mimeType + ";base64," + buffer.toString("base64");
  }

  exports.getLqip = getLqip;
  exports.getLqips = getLqips;

})));
//# sourceMappingURL=index.umd.js.map
