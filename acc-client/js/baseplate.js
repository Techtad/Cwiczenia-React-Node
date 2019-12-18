class BasePlate extends THREE.Mesh {
    constructor(width, depth, segments) {
        super(new THREE.PlaneGeometry(width, depth, width / segments, depth / segments), Materials.BasePlate)
        this.rotation.set(Math.PI / 2, 0, 0)
    }
}