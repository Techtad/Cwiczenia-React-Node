class Ball extends THREE.Mesh {
    constructor(cannon, color) {
        let ballGeom = new THREE.SphereGeometry(2, 16, 16)
        super(ballGeom, new THREE.MeshBasicMaterial({ color: color }))
        this.add(new THREE.Mesh(ballGeom, Materials.Wireframe))

        this.flying = false
        this.flyTime = 0
        this.angle = 0
        this.startingVelocity = 0
        this.startX = 0
        this.startY = 0
        this.startZ = 0
        this.dirVector = new THREE.Vector3(0, 0, 0)

        this.cannon = cannon

        this.velocity = new THREE.Vector3(0, 0, 0)
        this.hitSphere = new THREE.Sphere(this.position, 2)
    }

    update(delta) {
        if (this.flying) {
            this.flyTime += delta * 2 * 0.016
            let y = this.startingVelocity * this.flyTime * Math.sin(this.angle) - ((Settings.Gravity * this.flyTime * this.flyTime) / 2)
            let z = this.startingVelocity * this.flyTime * Math.cos(this.angle)
            let oldPos = this.position.clone()
            this.position.set(this.startX + z * this.dirVector.x, this.startY + y, this.startZ + z * this.dirVector.z)
            this.velocity = this.position.clone().sub(oldPos)

            if (this.position.y <= 0) {
                this.flying = false
                this.placeInBarrel(this.cannon.position, 15, -(this.cannon.rotation.y + Math.PI / 2), this.cannon.barrel.rotation.x + Math.PI / 2)
                if (this.cannon.index == Game.cannonIndex && CameraControl.isFollowing && CameraControl.followObj.id == this.id) {
                    CameraControl.stopFollowing()
                    CameraControl.setCameraPosition(PlayerViews[Game.cannonIndex])
                }
            }
        }
    }

    shoot(angle, velocity) {
        if (this.flying) return
        this.angle = angle
        this.startingVelocity = velocity
        this.flyTime = 0
        this.flying = true
        this.startX = this.position.x
        this.startY = this.position.y
        this.startZ = this.position.z
        this.cannon.getWorldDirection(this.dirVector)
        this.velocity = new THREE.Vector3(0, 0, 0)
    }

    placeInBarrel(centerPos, radius, cannonAngle, barrelAngle) {
        let x = centerPos.x + radius * Math.cos(cannonAngle) * Math.cos(barrelAngle)
        let y = centerPos.y + radius * Math.sin(barrelAngle)
        let z = centerPos.z + radius * Math.sin(cannonAngle) * Math.cos(barrelAngle)
        this.position.set(x, y, z)
    }

    changeColor(color) {
        this.material = new THREE.MeshBasicMaterial({ color: color })
    }
}