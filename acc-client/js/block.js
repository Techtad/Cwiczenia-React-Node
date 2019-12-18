class Block extends THREE.Mesh {
    constructor(x, y, z, mass) {
        let material = new THREE.MeshBasicMaterial({ color: 0xbb0000 })
        let geometry = new THREE.CubeGeometry(10, 10, 10)
        super(geometry, material)
        let wireframe = new THREE.Mesh(geometry, Materials.Wireframe)
        this.add(wireframe)
        this.position.set(x, y, z)
        this.mass = mass
        this.velocity = new THREE.Vector3()
        this.acceleration = []

        this.bottom = 5

        this.active = true
        this.hitBox = new THREE.Box3(new THREE.Vector3(this.position.x - 5, this.position.y - 5, this.position.z - 5), new THREE.Vector3(this.position.x + 5, this.position.y + 5, this.position.z + 5))
    }

    update(delta) {
        if (!this.active) return

        if (this.velocity.length() < 1.5 && CameraControl.isFollowing && CameraControl.followObj.id == this.id) {
            CameraControl.stopFollowing()
            CameraControl.setCameraPosition(PlayerViews[Game.cannonIndex])
        }

        if (this.velocity.length() < 0.2)
            this.velocity = new THREE.Vector3()

        //opór powietrza i tarcie
        if (this.velocity.length() > 0) {
            this.applyForce(this.velocity.clone().normalize().multiplyScalar(-Settings.AirResistance))
            if (this.position.y == this.bottom) this.applyForce(this.velocity.clone().normalize().multiplyScalar(-Settings.Friction))
        }

        //grawitacja
        if (this.position.y > this.bottom) this.acceleration.push(new THREE.Vector3(0, -Settings.Gravity, 0))

        for (let a of this.acceleration) {
            this.velocity.add(a)
        }
        this.acceleration = []

        if (this.velocity.length() > 0.2) this.position.add(this.velocity.clone().multiplyScalar(delta / 240))

        //kolizja z ziemią
        if (this.position.y < this.bottom) {
            this.position.y = this.bottom
            this.velocity.y = 0
        }
    }

    applyForce(f) {
        this.acceleration.push(f.multiplyScalar(1 / this.mass))
    }

    collideWithSphere(obj, radius) {
        if (this.hitBox.intersectsSphere(obj.hitSphere)) {
            this.active = true
            //this.applyForce(this.position.clone().sub(obj.position.clone()).multiplyScalar(7.5))
            this.applyForce(obj.velocity.multiplyScalar(5.25))
            if (obj.cannon.index == Game.cannonIndex) {
                let dirVector = obj.velocity.clone()
                dirVector.y = 0
                dirVector.normalize()
                let followVector = new THREE.Vector3(-dirVector.x * 50, 15, -dirVector.z * 50)
                CameraControl.followObject(this, followVector)
            }
        }
    }

    collideWithBlock(other) {
        if (this.position.distanceTo(other.position) < 10) {
            if (this.position.y - other.position.y > 0) {
                this.position.y += 10 - (this.position.y - other.position.y)
                let fallV = 0
                for (let a of this.acceleration) fallV += a.y
                this.acceleration.push(new THREE.Vector3(0, -fallV + Settings.Gravity, 0))
            }
        }
    }
}

class Wall extends THREE.Object3D {
    constructor(x, y, z, angle, length, height) {
        super()
        this.position.set(x, y, z)
        this.rotation.y = angle
        this.blocks = []
        for (let i = 0; i < length; i++) {
            this.blocks.push([])
            for (let j = 0; j < height; j++) {
                let block = new Block((i - Math.floor(length / 2)) * 10, 5 + j * 10, 0, 1)
                this.add(block)
                this.blocks[i][j] = block
            }
        }
    }

    update(delta) {
        for (let column of this.blocks) {
            for (let b of column) {
                for (let other of column) {
                    if (other.id == b.id) continue
                    b.collideWithBlock(other)
                }
                b.update(delta)
            }
        }
    }

    collideWithSphere(obj, radius) {
        for (let column of this.blocks) {
            for (let b of column) b.collideWithSphere(obj, radius)
        }
    }
}