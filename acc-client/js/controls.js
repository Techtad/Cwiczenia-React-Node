var PlayerViews = [
  { x: 0, y: 15, z: -250, rotX: -Math.PI, rotY: 0, rotZ: -Math.PI },
  { x: 0, y: 15, z: 250, rotX: 0, rotY: 0, rotZ: 0 },
  { x: 0, y: 550, z: 0, rotX: Math.PI / 2, rotY: Math.PI, rotZ: 0 }
];

var CameraControl = {
  isFollowing: false,
  followObj: null,
  offsetVector: null,

  setCameraPosition: function(pos) {
    Game.camera.position.set(pos.x, pos.y, pos.z);
    Game.camera.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
    Game.camera.updateProjectionMatrix();
    //Game.orbitControls.update();
  },

  followObject(obj, offsetVector) {
    this.followObj = obj;
    this.offsetVector = offsetVector;
    this.isFollowing = true;
  },

  stopFollowing() {
    this.isFollowing = false;
  },

  update(delta) {
    if (this.isFollowing) {
      let pos = this.followObj.position.clone().add(this.offsetVector);
      Game.camera.position.set(pos.x, pos.y, pos.z);
      Game.camera.lookAt(this.followObj.position);
      Game.camera.updateProjectionMatrix();
    }
  },

  orbitCannon() {
    let cannAngle = -(Game.cannon.rotation.y + Math.PI / 2);
    let barrAngle = Game.cannon.barrel.rotation.x - Math.PI / 2;
    let x =
      Game.cannon.position.x + 50 * Math.cos(cannAngle) * Math.cos(barrAngle);
    let y = Game.cannon.position.y + 50 * Math.sin(barrAngle);
    let z =
      Game.cannon.position.z + 50 * Math.sin(cannAngle) * Math.cos(barrAngle);
    Game.camera.position.set(x, y, z);
    Game.camera.lookAt(Game.cannon.ball.position);
    Game.camera.updateProjectionMatrix();
  }
};

var MouseControl = {
  moving: false
};

/* $(window).on("mousedown", function (event) {
    if (event.button == 0) {
        let raycaster = new THREE.Raycaster()
        let mouseVector = new THREE.Vector2((event.clientX / $(window).width()) * 2 - 1, -(event.clientY / $(window).height()) * 2 + 1)
        console.log(mouseVector)
        raycaster.setFromCamera(mouseVector, Game.camera)
        let intersects = raycaster.intersectObject(Game.cannon.barrel, false)
        if (intersects.length > 0) {
            MouseControl.moving = true
            Game.cannon.barrel.material = new THREE.MeshBasicMaterial({ color: Game.cannon.color, transparent: true, opacity: 0.5 })
        }
    }
})
$(window).on("mouseup", function (event) {
    if (MouseControl.moving && event.button == 0) {
        MouseControl.moving = false
        Game.cannon.barrel.material = new THREE.MeshBasicMaterial({ color: Game.cannon.color })
    } else if (event.button == 2) {
        Game.cannon.shoot(Settings.CannonVelocity)
        //Game.socket.emit("shoot", { cannonIndex: Game.cannonIndex })
    }
})
$(window).on("mousemove", function (event) {
    if (MouseControl.moving) {
        let mouseVector = new THREE.Vector2((event.clientX / $(window).width()) * 2 - 1, -(event.clientY / $(window).height()) * 2 + 1)
        let dirMul = 1
        if (Game.cannonIndex == 1) dirMul = -1
        Game.cannon.setCannonRotation(mouseVector.x * Math.PI / 2)
        $("#cannon-rot").val(mouseVector.x * Math.PI / 2)
        Game.cannon.setBarrelRotation(dirMul * (Math.PI / 2 + mouseVector.y * Math.PI / 2))
        $("#barrel-rot").val(dirMul * (Math.PI / 2 + mouseVector.y * Math.PI / 2))
        CameraControl.orbitCannon()
        //Game.socket.emit("update", { cannonIndex: Game.cannonIndex, cannonRot: Game.cannon.rotation.y, barrelRot: Game.cannon.barrel.rotation.x, velocity: Settings.CannonVelocity })
    }
}) */
