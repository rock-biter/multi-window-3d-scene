import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'

/**
 * Debug
 */
// const gui = new dat.GUI()

/**
 * Scene
 */
const scene = new THREE.Scene()

const world = new THREE.Object3D()

const win = {
	shape: {
		x: window.screenLeft,
		y: window.screenTop,
		w: window.innerWidth,
		h: window.innerHeight,
		dy: window.outerHeight - window.innerHeight,
	},
}

console.log(win.shape.dy)

function updateWin() {
	win.shape = {
		x: window.screenLeft,
		y: window.screenTop,
		w: window.innerWidth,
		h: window.innerHeight,
		dy: window.outerHeight - window.innerHeight,
	}
}

/**
 * Manhattan
 */
const material = new THREE.MeshNormalMaterial()
const geometry = new THREE.BoxGeometry(200, 200, 200)
const size = 350
for (let i = 0; i < 20; i++) {
	const x = i % 5
	const y = Math.floor(i / 5)

	const mesh = new THREE.Mesh(geometry, material)

	mesh.position.set(x * size - (4 * size) / 2, y * size - (3 * size) / 2, 0)

	world.add(mesh)
}

world.add(new THREE.AxesHelper(300))
// world.add()
scene.add(world)

/**
 * render sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}
/**
 * Camera
 */
// const fov = 60
const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10000, 30000)
camera.position.set(0, 0, 2)
// camera.lookAt(new THREE.Vector3(0, 2.5, 0))

/**
 * Show the axes of coordinates system
 */
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

/**
 * renderer
 */
const renderer = new THREE.WebGLRenderer({
	antialias: window.devicePixelRatio < 2,
	logarithmicDepthBuffer: true,
})
document.body.appendChild(renderer.domElement)
handleResize()

/**
 * OrbitControls
 */
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

/**
 * Three js Clock
 */
// const clock = new THREE.Clock()

/**
 * frame loop
 */
function tic() {
	updateWin()
	/**
	 * tempo trascorso dal frame precedente
	 */
	// const deltaTime = clock.getDelta()
	/**
	 * tempo totale trascorso dall'inizio
	 */
	// const time = clock.getElapsedTime()

	// controls.update()
	const destination = new THREE.Vector3(
		-win.shape.x - win.shape.w / 2 + window.screen.width / 2,
		win.shape.y + win.shape.h / 2 - window.screen.height / 2 + win.shape.dy,
		0
	)
	world.position.lerp(destination, 0.075)

	renderer.render(scene, camera)

	requestAnimationFrame(tic)
}

requestAnimationFrame(tic)

window.addEventListener('resize', handleResize)

function handleResize() {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// camera.aspect = sizes.width / sizes.height
	camera.left = -sizes.width / 2
	camera.right = sizes.width / 2
	camera.top = sizes.height / 2
	camera.bottom = -sizes.height / 2
	camera.updateProjectionMatrix()

	renderer.setSize(sizes.width, sizes.height)

	const pixelRatio = Math.min(window.devicePixelRatio, 2)
	renderer.setPixelRatio(pixelRatio)
}
