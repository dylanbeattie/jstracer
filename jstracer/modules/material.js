class Material {
    constructor() { }
    getColorAt = point => Color.Gray50;
}

export class Color extends Material {
    static White = new Color(1, 1, 1);
    static Black = new Color(0, 0, 0);
    static Gray50 = new Color(0.5, 0.5, 0.5);
    constructor(r, g, b) {
        super();
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getColorAt = point => this;

    clamp = value => (value > 1 ? 1 : value < 0 ? 0 : value);

    clip = function () {
        let rr = this.r;
        let gg = this.g;
        let bb = this.b;
        var intensity = this.r + this.g + this.b;
        var overflow = intensity - 3;
        if (overflow > 0) {
            rr = rr + overflow * (rr / intensity);
            gg = gg + overflow * (gg / intensity);
            bb = bb + overflow * (bb / intensity);
        }
        return new Color(this.clamp(rr), this.clamp(gg), this.clamp(bb));
    }
}