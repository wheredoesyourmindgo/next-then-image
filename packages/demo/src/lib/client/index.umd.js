(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('next/image')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'next/image'], factory) :
  (global = global || self, factory(global.nextThenImage = {}, global.react, global.Image));
}(this, (function (exports, React, Image) {
  var React__default = 'default' in React ? React['default'] : React;
  Image = Image && Object.prototype.hasOwnProperty.call(Image, 'default') ? Image['default'] : Image;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var fallback = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACigAwAEAAAAAQAAABkAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIABkAKAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/3QAEAAP/2gAMAwEAAhEDEQA/APUPDGlIkSfL2rtba1VVHFYXh4Dyk+ldPF0FAB5Ix0qrc2qsp4q/UUvSgDgfE+lI8T/L2rkf7GX+7+lei+IAvlP9K5jC0Af/0PVvDOpK8SfN2rsra4DKOa8v8Jf6tK9AsvuigDY80YqvcXAVTzTe1Ub37poA53xNqSpE/wA3auT/ALWX+9V7xZ/q3rjqAP/Z';

  var ThenImage = function ThenImage(_ref) {
    var _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? fallback : _ref$placeholder,
        _ref$transition = _ref.transition,
        transition = _ref$transition === void 0 ? true : _ref$transition,
        rest = _objectWithoutPropertiesLoose(_ref, ["placeholder", "transition"]);

    var _useState = React.useState(false),
        loaded = _useState[0],
        setLoaded = _useState[1];

    var onLoad = React.useCallback(function () {
      setLoaded(true);
    }, []);
    return /*#__PURE__*/React__default.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        transform: 'translate3d(0, 0, 0)'
      }
    }, /*#__PURE__*/React__default.createElement(Image, _extends({
      layout: "responsive",
      onLoad: onLoad
    }, rest)), /*#__PURE__*/React__default.createElement("img", {
      "aria-hidden": "true",
      alt: "",
      src: placeholder,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        /* Adjust the content to fit */
        objectFit: 'cover',
        objectPosition: 'center',

        /* Blur the image and scale to avoid transparent corners */
        filter: 'blur(2rem)',
        transform: 'scale(1.2)',
        transition: transition ? 'opacity 800ms, filter 1200ms' : 'none',
        opacity: !loaded ? 1 : 0
      }
    }));
  };

  exports.ThenImage = ThenImage;

})));
//# sourceMappingURL=index.umd.js.map
