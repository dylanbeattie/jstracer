import { MAX_DEPTH } from './settings.js';
import { Color } from './material.js';

export class Ray {
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