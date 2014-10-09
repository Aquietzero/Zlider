
/*
 * config: {
 *   threshold: 0.2 (Multiplied by window height.)
 *   duration: 0.5s (Time duration of the whole slide animation.)
 * }
 */
(function () {
  var prefixes = ['-webkit', '-moz'];
  var prefixAttrs = ['transition-duration', 'transition-property'];

  var Zlider = function (selector, config) {
    this.el = document.querySelector(selector);
    this.init(config || {});
  }
  
  Zlider.prototype.init = function (config) {
    this.page = 0;
    this.max = this.getMax();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.config = {};
    this.config.threshold = (config.threshold || 0.2) * this.height;
    this.config.duration = (config.duration || 0.5) + 's';

    this.touching = false;

    // Begin position of each series of touch events.
    this.beginPosition = {
      x: 0,
      y: 0
    }
    // Previous position of each touch move.
    this.touchingPosition = {
      x: 0,
      y: 0
    };

    this.direction = null;

    this.setStyles();
    this.bindEvents();
  }

  Zlider.prototype.setStyles = function () {
    this.sliders = document.querySelectorAll('.zlider-wrapper');

    for (var i = 1; i < this.sliders.length; ++i) {
      var slider = this.sliders[i];
      slider.style.top = this.height + 'px';
    }
  }

  Zlider.prototype.bindEvents = function () {
    // Keyboard events are only used for debug.
    document.addEventListener('keyup', function (e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 37:
        case 38:
          this.prev();
          break;
        case 39:
        case 40:
          this.next();
          break;
      }
    }.bind(this));

    document.addEventListener('touchmove', function (e) {
      e.preventDefault();

      var y = e.touches[0].clientY;
      var delta = y - this.touchingPosition.y;

      if (!this.direction) {
        this.direction = delta > 0 ? 'down' : 'up';
      }

      this.move(this.direction, delta);

      this.touchingPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    }.bind(this));

    document.addEventListener('touchstart', function (e) {
      this.touching = true;
      this.beginPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
      this.touchingPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    }.bind(this));

    document.addEventListener('touchend', function (e) {
      var delta = Math.abs(this.touchingPosition.y - this.beginPosition.y);
      if (delta > this.config.threshold) {
        if (this.direction == 'up') {
          this.next();
        } else {
          this.prev();
        }
      } else {
        this.reset(this.direction);
      }

      this.touching = false;
      this.direction = null;
    }.bind(this));
  }

  Zlider.prototype.getMax = function () {
    return document.querySelectorAll('.zlider-wrapper').length - 1;
  }

  Zlider.prototype.css = function (el, styles) {
    for (var attr in styles) {
      el.style[attr] = styles[attr];
      // Setup prefixes for those attributes which need to be prefixed.
      if (prefixAttrs.indexOf(attr) > 0) {
        for (var i = 0; i < prefixes.length; ++i) {
          el.style[[prefixes[i], attr].join('-')] = styles[attr];
        }
      }
    }
  },

  Zlider.prototype.prev = function () {
    if (this.page == 0) {
      return;
    }

    this.page -= 1;

    var curr = this.sliders[this.page + 1];
    var next = this.sliders[this.page];

    this.css(curr, {
      'transition-duration': this.config.duration,
      'top': this.height + 'px'
    });
  }

  Zlider.prototype.next = function () {
    if (this.page == this.max) {
      return;
    }

    this.page += 1;

    var curr = this.sliders[this.page - 1];
    var next = this.sliders[this.page];

    this.css(next, {
      'transition-duration': this.config.duration,
      'top': '0px'
    });
  }

  Zlider.prototype.reset = function (direction) {
    var top, slider;
    if (direction == 'up') {
      if (this.page == this.max) return;
      slider = this.sliders[this.page + 1];
      top = this.height + 'px';
    } else {
      if (this.page == 0) return;
      slider = this.sliders[this.page];
      top = '0px';
    }

    this.css(slider, {
      'transition-duration': this.config.duration,
      'top': top
    });
  }

  Zlider.prototype.move = function (direction, delta) {
    var slider;
    if (direction == 'up') {
      if (this.page == this.max) return;
      slider = this.sliders[this.page + 1];
    } else {
      if (this.page == 0) return;
      slider = this.sliders[this.page];
    }

    var top = parseInt(slider.style.top.replace('px', ''));
    this.css(slider, {
      'transition-duration': '0s',
      'top': top + delta + 'px'
    });
  }

  var slider = new Zlider('.zlider');
})();

