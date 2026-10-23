import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1a1a2e)

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
camera.position.set(2, 2, 3)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x6366f1 })
)
scene.add(cube)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(3, 3, 3)
scene.add(light)
scene.add(new THREE.AmbientLight(0xffffff, 0.4))

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.005
  cube.rotation.y += 0.005
  controls.update()
  renderer.render(scene, camera)
})

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})   