var Settings = {
  FrameTime: 0.016,

  INIT_CAM_POS: {
    X: 0,
    Y: 50,
    Z: 100
  },

  Gravity: 9.81,
  AirResistance: 0.01,
  Friction: 0.76,

  CannonVelocity: 44
};

var TextureLoader = new THREE.TextureLoader();

var Materials = {
  BasePlate: new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x000000
  }),
  Wireframe: new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: true }),
  Cannon: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  Ball: new THREE.MeshBasicMaterial({ color: 0x888800 })
};

var CannonColors = [0x0000bb, 0x00bb00, 0xbb0000, 0x009999, 0x880088];

var CannonPositions = [
  { x: 0, z: -200 },
  { x: 0, z: 200 },
  { x: 350, z: 0 },
  { x: -350, z: 0 },
  { x: 350, z: -200 },
  { x: -350, z: 200 }
];

var OtherVelocities = [];

var Game = {
  init: function() {
    this.paused = true;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xeeeeee);
    this.renderer.setSize($(window).width(), $(window).height());

    this.camera = new THREE.PerspectiveCamera(
      45,
      $(window).width() / $(window).height(),
      1,
      10000
    );
    //this.camera.position.set(Settings.INIT_CAM_POS.X, Settings.INIT_CAM_POS.Y, Settings.INIT_CAM_POS.Z)
    //this.camera.lookAt(this.scene.position)
    //this.camera.updateProjectionMatrix()
    this.orbitControls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.enabled = true;
    CameraControl.setCameraPosition(PlayerViews[0]);

    window.addEventListener("resize", e => {
      Game.renderer.setSize($(window).width(), $(window).height());
      Game.camera.aspect = $(window).width() / $(window).height();
      Game.camera.updateProjectionMatrix();
    });

    this.clock = new THREE.Clock();

    this.ws = new WebSocket("ws://localhost:1337");
    this.ws.onopen = () => {
      Game.ws.send(JSON.stringify({ action: "connectClient" }));
    };

    this.cannonIndex = 0;
    this.controllerId = 0;
    this.fired = false;

    $("#cannon-rot").val(0);
    $("#barrel-rot").val(0);
    $("#ball-speed").val(Settings.CannonVelocity);

    this.createScene();

    $("#root").append(this.renderer.domElement);
  },

  createScene: function() {
    this.entities = [];

    this.baseplate = new BasePlate(1000, 1000, 10);
    this.scene.add(this.baseplate);

    this.cannon = new Cannon(
      CannonPositions[0].x,
      CannonPositions[0].z,
      CannonColors[0]
    );
    this.scene.add(this.cannon);

    this.otherCannons = [];

    this.wall = new Wall(0, 0, 0, 0, 7, 4);
    this.scene.add(this.wall);
    this.entities.push(this.wall);

    this.orbitControls.target = Game.cannon.position.clone();
  },

  start: function() {
    //this.orbitControls.enabled = true
    this.resume();

    $("#cannon-rot").on("input", function(event) {
      Game.cannon.setCannonRotation(parseFloat($(this).val()));
      //Game.socket.emit("update", { cannonIndex: Game.cannonIndex, cannonRot: Game.cannon.rotation.y, barrelRot: Game.cannon.barrel.rotation.x, velocity: Settings.CannonVelocity })
    });
    $("#barrel-rot").on("input", function(event) {
      Game.cannon.setBarrelRotation(parseFloat($(this).val()));
      //Game.socket.emit("update", { cannonIndex: Game.cannonIndex, cannonRot: Game.cannon.rotation.y, barrelRot: Game.cannon.barrel.rotation.x, velocity: Settings.CannonVelocity })
    });
    $("#ball-speed").on("input", function(event) {
      Settings.CannonVelocity = parseFloat($(this).val());
      //Game.socket.emit("update", { cannonIndex: Game.cannonIndex, cannonRot: Game.cannon.rotation.y, barrelRot: Game.cannon.barrel.rotation.x, velocity: Settings.CannonVelocity })
    });
    $("#fire-btn").on("click", function(event) {
      Game.cannon.shoot(Settings.CannonVelocity);
      //Game.socket.emit("shoot", { cannonIndex: Game.cannonIndex })
    });

    this.ws.onmessage = e => {
      //console.log(e.data);
      let data = JSON.parse(e.data);
      console.log(data);
      if (data.controller == Game.controllerId) {
        $("#indicator").css("left", `${100 - ((data.x + 1) / 2) * 100 - 5}%`);
        $("#indicator").css("top", `${100 - ((data.y + 1) / 2) * 100 - 5}%`);

        let xRounded = Math.round(data.x * 100) / 100;
        let yRounded = Math.round(data.y * 100) / 100;
        //let zRounded = Math.round(data.z * 100) / 100;

        let barrelRot = (Math.PI / 2) * (1 - yRounded);
        //console.log(barrelRot, (data.y + 1) / 2);
        Game.cannon.setBarrelRotation(barrelRot);
        let cannonRot = (Math.PI / 2) * xRounded;
        //console.log(cannonRot);
        Game.cannon.setCannonRotation(cannonRot);
        if (data.fire) {
          Game.cannon.shoot(Settings.CannonVelocity);
        }
      }
    };
    /* this.socket.on("onconnect", function (data) {
            console.log("socket id", data.id)
            console.log("cannon index", data.cannonIndex)
            console.log(data)
            Game.cannon.changeColor(CannonColors[data.cannonIndex])
            Game.cannon.position.set(data.cannonIndex * 50, 5, 0)
            Game.cannon.setCannonRotation(Game.cannon.rotation.y)
            Game.cannonIndex = data.cannonIndex
            if (PlayerViews[Game.cannonIndex] != undefined)
                CameraControl.setCameraPosition(PlayerViews[Game.cannonIndex])
            else
                CameraControl.setCameraPosition(PlayerViews[2])
            Game.cannon.setPosition(CannonPositions[Game.cannonIndex].x, CannonPositions[Game.cannonIndex].z)
            Game.cannon.index = Game.cannonIndex
            Game.camera.lookAt(Game.cannon.position)
            Game.camera.updateProjectionMatrix()

            for (let i = 0; i < data.cannonCount; i++) {
                if (i == data.cannonIndex) continue

                let other = new Cannon(i * 50, 0, CannonColors[i])
                other.setCannonRotation(data.cannonInfo[i].cannonRot)
                other.setBarrelRotation(data.cannonInfo[i].barrelRot)
                OtherVelocities[i] = data.cannonInfo[i].velocity
                other.setPosition(CannonPositions[i].x, CannonPositions[i].z)
                Game.scene.add(other)
                Game.otherCannons[i] = other
            }
        })
        this.socket.on("onjoined", function (data) {
            console.log("other joined", data)
            if (Game.otherCannons[data.cannonIndex]) {
                Game.scene.remove(Game.otherCannons[data.cannonIndex].ball)
                Game.scene.remove(Game.otherCannons[data.cannonIndex])
                Game.otherCannons[data.cannonIndex] = null
            }
            let other = new Cannon(CannonPositions[data.cannonIndex].x, CannonPositions[data.cannonIndex].z, CannonColors[data.cannonIndex])
            Game.scene.add(other)
            Game.otherCannons[data.cannonIndex] = other
            OtherVelocities[data.cannonIndex] = Settings.CannonVelocity
        })
        this.socket.on("onleft", function (data) {
            console.log("other left", data)
            if (Game.otherCannons[data.cannonIndex]) {
                Game.scene.remove(Game.otherCannons[data.cannonIndex].ball)
                Game.scene.remove(Game.otherCannons[data.cannonIndex])
                Game.otherCannons[data.cannonIndex] = null
            }
        })
        this.socket.on("update", function (data) {
            console.log("update", data)
            let other = Game.otherCannons[data.cannonIndex]
            if (other) {
                other.setCannonRotation(data.cannonRot)
                other.setBarrelRotation(data.barrelRot)
                OtherVelocities[data.cannonIndex] = data.velocity
            }
        })
        this.socket.on("shoot", function (data) {
            console.log("shot", data)
            let other = Game.otherCannons[data.cannonIndex]
            if (other) {
                other.shoot(OtherVelocities[data.cannonIndex])
            }
        }) */
  },

  update: function() {
    let delta = this.clock.getDelta() / Settings.FrameTime;

    for (let entity of this.entities) entity.update(delta);
    this.cannon.update(delta);
    for (let c of this.otherCannons) if (c) c.update(delta);

    this.wall.collideWithSphere(this.cannon.ball, 2);
    for (let c of this.otherCannons)
      if (c) this.wall.collideWithSphere(c.ball, 2);

    CameraControl.update(delta);

    this.render();
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
    if (!this.paused) requestAnimationFrame(this.update.bind(this));
  },

  pause: function() {
    this.paused = true;
  },

  resume: function() {
    this.paused = false;
    requestAnimationFrame(this.update.bind(this));
  }
};
