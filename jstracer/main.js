import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes.js';

let camera = new Camera(new Vector(-3, 2, -3), new Vector(0, 1, 0));
let shapes = [
  new Sphere(new Vector(-2, 1, 0), 1, new Color(1, 0, 0)),
  new Sphere(new Vector(0, 1, 0), 1, new Color(0, 1, 0)),
  new Sphere(new Vector(2, 1, 0), 1, new Color(0, 0, 1))
]
let scene = new Scene(camera, shapes);
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);
tracer.trace(scene, (x, y, color, step) => {
  var rgb = `rgb(${color.r * 255},${color.g * 255},${color.b * 255})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, step, step);
});
