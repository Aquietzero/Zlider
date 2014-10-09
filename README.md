# Zlider

Usage is dead simple.

Template is just simple as the following.

```html
<div class="zlider">
  <div class="zlider-wrapper">
    <p class="title">Zlider 1</p>
  </div>
  <div class="zlider-wrapper">
    <p class="title">Zlider 2</p>
  </div>
  <div class="zlider-pagination">
  </div>
</div>
```

Add the following javascript to where it belongs.

```javascript
var zlider = new Zlider('.zlider', {
  threshold: 0.1,
  duration: 0.7
});
```
