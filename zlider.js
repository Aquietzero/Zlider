
(function () {
  var Zlider = function (selector) {
    this.el = document.querySelector(selector);

    this.init();
  }
  
  Zlider.prototype.init = function () {
    this.page = 0;
    this.max = this.getMax();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.touching = false;

    this.beginPosition = {
      x: 0,
      y: 0
    }
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

      if (this.direction == 'up') {
        this.moveNext(delta);
      } else {
        this.moveCurr(delta);
      }

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
      if (delta > this.height / 5) {
        if (this.direction == 'up') {
          this.next();
        } else {
          this.prev();
        }
      } else {
        if (this.direction == 'up') {
          this.resetNext();
        } else {
          this.resetCurr();
        }
      }

      this.touching = false;
      this.direction = null;
    }.bind(this));
  }

  Zlider.prototype.getMax = function () {
    return document.querySelectorAll('.zlider-wrapper').length - 1;
  }

  Zlider.prototype.prev = function () {
    if (this.page == 0) {
      return;
    }

    this.page -= 1;

    var curr = this.sliders[this.page + 1];
    var next = this.sliders[this.page];

    curr.style['transition-duration'] = '0.5s';
    curr.style['-webkit-transition-duration'] = '0.5s';
    curr.style.top = this.height + 'px';
  }

  Zlider.prototype.next = function () {
    if (this.page == this.max) {
      return;
    }

    this.page += 1;

    var curr = this.sliders[this.page - 1];
    var next = this.sliders[this.page];

    next.style['transition-duration'] = '0.5s';
    next.style['-webkit-transition-duration'] = '0.5s';
    next.style.top = 0;
  }

  Zlider.prototype.resetCurr = function () {
    if (this.page == 0) {
      return;
    }

    var curr = this.sliders[this.page];

    curr.style['transition-duration'] = '0.5s';
    curr.style['-webkit-transition-duration'] = '0.5s';
    curr.style.top = '0px';
  }

  Zlider.prototype.resetNext = function () {
    if (this.page == this.max) {
      return;
    }

    var next = this.sliders[this.page + 1];

    next.style['transition-duration'] = '0.5s';
    next.style['-webkit-transition-duration'] = '0.5s';
    next.style.top = this.height + 'px';
  }

  Zlider.prototype.moveCurr = function (delta) {
    if (this.page == 0) {
      return;
    }

    var curr = this.sliders[this.page];

    var top = parseInt(curr.style.top.replace('px', ''));
    curr.style['transition-duration'] = '0s';
    curr.style['-webkit-transition-duration'] = '0s';
    curr.style.top = top + delta + 'px';
  }

  Zlider.prototype.moveNext = function (delta) {
    if (this.page == this.max) {
      return;
    }

    var next = this.sliders[this.page + 1];

    var top = parseInt(next.style.top.replace('px', ''));
    next.style['transition-duration'] = '0s';
    next.style['-webkit-transition-duration'] = '0s';
    next.style.top = top + delta + 'px';
  }

  var slider = new Zlider('.zlider');
})();
