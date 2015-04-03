var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

//cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial({color: 0xff7755});
var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

//floor
var floorGeometry = new THREE.BoxGeometry(10,0.1,10);
var floorMaterial = new THREE.MeshLambertMaterial({color: 0x555555});
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.5;
floor.receiveShadow = true;
scene.add(floor);

//light (for shadows)
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 50, 0 );
spotLight.castShadow = true;
spotLight.shadowCameraNear = 1;
spotLight.shadowCameraFar = 100;
spotLight.shadowCameraFov = 20;
scene.add( spotLight );

var ambientLight = new THREE.AmbientLight( 0x303030 ); // soft white light
scene.add( ambientLight );

//camera position
cameraDistance = 5
cameraRotation = 0;
cameraHeight = cameraDistance;
updateCamPos();

//variables for storing key states
var rightPress = false;
var leftPress = false;
var upPress = false;
var downPress = false;
var plusPress = false;
var minusPress = false;
var isPaused = false;

function render(){
	cameraControls();
	requestAnimationFrame(render);
	renderer.render(scene, camera);	
	if(!isPaused){
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	}
}
render();

function cameraControls(){
	var madeChange = false;
	if(leftPress){
		cameraRotation = cameraRotation - 0.01;
		madeChange = true;
	}
	if(rightPress){
		cameraRotation = cameraRotation + 0.01;
		madeChange = true;
	}
	if(upPress){
		cameraHeight = cameraHeight + 0.05;
		madeChange = true;
	}
	if(downPress){
		cameraHeight = cameraHeight - 0.05;
		madeChange = true;
	}
	if(plusPress){
		cameraDistance = cameraDistance - 0.05;
		madeChange = true;
	}
	if(minusPress){
		cameraDistance = cameraDistance + 0.05;
		madeChange = true;
	}
	if(madeChange){
		updateCamPos();
	}
}

function updateCamPos(){
	camera.position.x = Math.sin(cameraRotation) * cameraDistance;
	camera.position.z = Math.cos(cameraRotation) * cameraDistance;
	camera.position.y = cameraHeight;
	camera.lookAt({x:0,y:0,z:0});
}

$(document).keydown(function(key){
	switch(key.which){
		case 32: //space
			isPaused = !isPaused;
			break;
		case 37: //left
			leftPress = true;
			break;
		case 38: //up
			upPress = true;
			break;
		case 39: //right
			rightPress = true;
			break;
		case 40: //down
			downPress = true;
			break;
		case 187: //plus
			plusPress = true;
			downPress = true;
			break;
		case 189: //minus
			minusPress = true;
			upPress = true;
			break;
		default:
			return;
	}
	key.preventDefault();
});

$(document).keyup(function(key){
	switch(key.which){
		case 37: //left
			leftPress = false;
			break;
		case 38: //up
			upPress = false;
			break;
		case 39: //right
			rightPress = false;
			break;
		case 40: //down
			downPress = false;
			break;
		case 187: //plus
			plusPress = false;
			downPress = false;
			break;
		case 189: //minus
			minusPress = false;
			upPress = false;
			break;
		default:
			return;
	}
	key.preventDefault();
});