<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sceneContainer = ref<HTMLElement | null>(null)



onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(sceneContainer.value?.offsetWidth ?? window.innerWidth, sceneContainer.value?.offsetHeight ??window.innerHeight)

  sceneContainer.value?.appendChild(renderer.domElement)

  // ✅ LOAD MODEL
  const loader = new GLTFLoader()

  let model : null | THREE.Group<THREE.Object3DEventMap> = null;

  loader.load(
      '/models/Floor.glb',
      (gltf) => {
        console.log('LOADED', gltf)

        model = gltf.scene
        scene.add(model)

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3()).length()
        const center = box.getCenter(new THREE.Vector3())

        model.position.sub(center)

// move camera based on model size
        camera.position.set(0, size / 2, size * 1.5)
        camera.lookAt(0, 0, 0)
      },
      (progress) => {
        console.log('progress', progress.loaded / progress.total)
      },
      (error) => {
        console.error('ERROR', error)
      }
  )

  const timer = new THREE.Timer()

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(5, 5, 5)

  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 1))

  const animate = (timestamp : number) => {
    requestAnimationFrame(animate)
    timer.update(timestamp)
    if(model !== null)
      model.rotation.y += 0.1 * timer.getDelta();
    controls.update()
    renderer.render(scene, camera)
  }

  animate(0)
})

</script>

<template>
  <div ref="sceneContainer" class="ma-0 flex-grow-1">

  </div>
</template>

<style scoped>

</style>