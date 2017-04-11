# Div Collider

Testing out [MDN's collision detection algo](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box) without using any kind of canvas

```js
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision detected!
}
```

### Notes

Both `rect1` & `rect2` are objects that look like this:

```js
var rect1 = {
  x: 5, 
  y: 5, 
  width: 50, 
  height: 50
}
var rect2 = {
  x: 20, 
  y: 10, 
  width: 10, 
  height: 10
}
```