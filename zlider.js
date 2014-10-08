
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

    this.setStyles();
    this.bindEvents();

    //setInterval(function () {
    //  this.next();
    //}.bind(this), 1000);
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

    document.addEventListener('touchstart', function (e) {
      this.next();
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

    curr.style.top = this.height + 'px';
  }

  Zlider.prototype.next = function () {
    if (this.page == this.max) {
      return;
    }

    this.page += 1;

    var curr = this.sliders[this.page - 1];
    var next = this.sliders[this.page];

    next.style.top = 0;
  }

  var slider = new Zlider('.zlider');
})();
