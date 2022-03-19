import { THRESHOLD, MAX_DEPTH } from './settings.js';

import { Color } from './material.js';
import { Vector } from './vector.js';

class Ray {
    constructor(start, direction) {
        this.start = start;
        this.direction = direction;
    }
    trace = (scene, depth = 0) => {
        if (depth > MAX_DEPTH) return Color.Black;
        let distanceToNearestShape = Infinity;
        let nearestIntersectingShape = null;
        scene.shapes.forEach(shape => {
            let distance = shape.closestDistanceAlongRay(this);
            if (distance < distanceToNearestShape) {
                distanceToNearestShape = distance;
                nearestIntersectingShape = shape;
            }
        });
        if (distanceToNearestShape == Infinity) return Color.Black;
        let intersectionPoint = this.start.add(this.direction.scale(distanceToNearestShape));
        return nearestIntersectingShape.getColorAt(intersectionPoint, this.direction, scene, depth + 1);
    }
}

class Camera {
    constructor(location, look_at, width = 4, height = 3) {
        this.location = location ?? Vector.Z.invert();
        this.look_at = look_at ?? Vector.O;
        // Putting the camera directly above the focal point causes divide-by-zero errors, so we fudge it.
        if (this.location.x == this.look_at.x && this.location.z == this.look_at.z) this.location.z -= THRESHOLD;
        // Work out which way the camera's actually pointing...
        this.direction = this.look_at.add(this.location.invert()).normalize();
        // and then work out which way is "right" and "up" relative to the camera
        this.right = Vector.Y.cross(this.direction).normalize().scale(width / 2);
        this.up = this.right.cross(this.direction).invert().normalize().scale(height / 2);
    }

    trace(scene, x, y) {
        let vx = this.right.scale(x);
        let vy = this.up.scale(y).invert();
        let r = this.direction.add(vx).add(vy);
        let ray = new Ray(this.location, r);
        return ray.trace(scene);
    }
}

class Scene {
    constructor(camera, shapes) {
        this.camera = camera;
        this.shapes = shapes ?? [];
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}

class Tracer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    trace(scene, callback) {
        const STEP = 1;
        for (let yPixel = 0; yPixel < this.height; yPixel += STEP) {
            for (let xPixel = 0; xPixel < this.width; xPixel += STEP) {
                let x = (xPixel / this.width) - 0.5;
                let y = (yPixel / this.height) - 0.5;
                let pixelColor = scene.trace(x, y);
                callback(xPixel, yPixel, pixelColor, STEP);
            }
        }
    }
}

export { Tracer, Scene, Camera, Color, Vector };