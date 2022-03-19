import { THRESHOLD } from './settings.js';
import { Color } from './material.js';

export class Shape {
    constructor(material) {
        this.material = material;
    }
    findIntersections = ray => [];
    closestDistanceAlongRay = (ray) => {
        var intersections = this.findIntersections(ray).filter(distance => distance > THRESHOLD);
        return Math.min.apply(Math, intersections);
    }
    getColorAt = (point, scene) => {
        let materialColor = this.material.getColorAt(point);
        let colorToReturn = Color.Black;
        let normal = this.getNormalAt(point);
        scene.lights.forEach(light => {
            let direction = light.position.add(point.invert()).normalize();
            let brightness = normal.dot(direction);
            if (brightness > 0) {
                let illumination = materialColor.multiply(light.color).scale(brightness);
                colorToReturn = colorToReturn.add(illumination);
            }
        });
        return colorToReturn;
    }
    getNormalAt = point => Vector.O;
}
