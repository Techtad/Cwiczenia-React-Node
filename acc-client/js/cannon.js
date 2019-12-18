class Cannon extends THREE.Object3D {
  constructor(x, z, color) {
    super();

    this.color = color;
    let mat = new THREE.MeshBasicMaterial({ color: color });

    let wheelGeom = new THREE.CylinderGeometry(5, 5, 2, 16);
    this.leftWheel = new THREE.Mesh(wheelGeom, mat);
    this.leftWheel.add(new THREE.Mesh(wheelGeom, Materials.Wireframe));
    this.leftWheel.rotation.set(0, 0, Math.PI / 2);
    this.leftWheel.position.set(-4, 0, 0);
    this.add(this.leftWheel);
    this.rightWheel = new THREE.Mesh(wheelGeom, mat);
    this.rightWheel.add(new THREE.Mesh(wheelGeom, Materials.Wireframe));
    this.rightWheel.rotation.set(0, 0, Math.PI / 2);
    this.rightWheel.position.set(4, 0, 0);
    this.add(this.rightWheel);

    let barrelGeom = new THREE.CylinderGeometry(3, 3, 15, 16);
    barrelGeom.translate(0, 7.5, 0);
    this.barrel = new THREE.Mesh(barrelGeom, mat);
    this.barrel.add(new THREE.Mesh(barrelGeom, Materials.Wireframe));
    this.add(this.barrel);

    this.axes = new THREE.AxesHelper(25);
    this.add(this.axes);

    this.position.set(x, 5, z);

    this.ball = new Ball(this, 0xffffff - color);
    Game.scene.add(this.ball);
    this.ball.placeInBarrel(
      this.position,
      15,
      -(this.rotation.y + Math.PI / 2),
      this.barrel.rotation.x + Math.PI / 2
    );

    this.index = 0;
  }

  changeColor(color) {
    this.color = color;
    let mat = new THREE.MeshBasicMaterial({ color: color });
    this.leftWheel.material = mat;
    this.rightWheel.material = mat;
    this.barrel.material = mat;
    this.ball.changeColor(0xffffff - color);
  }

  setCannonRotation(radians) {
    if (Game.fired) return;
    this.rotation.y = radians;
    $("#cannon-rot").val(radians);
    this.leftWheel.rotation.x = radians;
    this.rightWheel.rotation.x = -radians;
    this.ball.placeInBarrel(
      this.position,
      15,
      -(this.rotation.y + Math.PI / 2),
      this.barrel.rotation.x + Math.PI / 2
    );
  }

  setBarrelRotation(radians) {
    if (Game.fired) return;
    this.barrel.rotation.x = radians;
    $("#barrel-rot").val(radians);
    this.ball.placeInBarrel(
      this.position,
      15,
      -(this.rotation.y + Math.PI / 2),
      this.barrel.rotation.x + Math.PI / 2
    );
  }

  update(delta) {
    this.ball.update(delta);
  }

  shoot(velocity) {
    this.ball.shoot(-this.barrel.rotation.x + Math.PI / 2, velocity);
    if (this.index == Game.cannonIndex) {
      let dirVector = new THREE.Vector3();
      this.getWorldDirection(dirVector);
      dirVector.multiplyScalar(this.barrel.rotation.x).normalize();
      //let followVector = this.ball.position.clone().sub(this.position.clone()).normalize().multiplyScalar(30)
      let followVector = new THREE.Vector3(
        -dirVector.x * 50,
        15,
        -dirVector.z * 50
      );
      CameraControl.followObject(this.ball, followVector);
    }
  }

  setPosition(x, z) {
    this.position.set(x, 5, z);
    this.ball.placeInBarrel(
      this.position,
      15,
      -(this.rotation.y + Math.PI / 2),
      this.barrel.rotation.x + Math.PI / 2
    );
  }
}
