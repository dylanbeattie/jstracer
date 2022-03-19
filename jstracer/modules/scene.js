export class Scene {
    constructor(camera, shapes) {
        this.camera = camera;
        this.shapes = shapes ?? [];
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}
