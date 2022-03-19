import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes.js';

let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
let shapes = [
  new Sphere(new Vector(-2, 1, 0), 1, new Color("#f00")),
  new Sphere(new Vector(0, 1, 0), 1, new Color("rgb(0,255,0)")),
  new Sphere(new Vector(2, 1, 0), 1, new Color("#006699")),
  new Sphere(new Vector(-2, 0.5, -2), 0.5, new Color(0xFF, 0, 0xFF)),
  new Sphere(new Vector(-3, 0.25, -3), 0.25, new Color(127, 32, 96))
]
let scene = new Scene(camera, shapes);
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);
tracer.trace(scene, (x, y, color, step) => {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, step, step);
});
