<template>
  <div
    ref="canvasWrap"
    :style="{
      width: '100%',
      height: props.isMini ? '260px' : '420px',
      border: 'none',
      borderRadius: props.isMini ? '0' : '0',
      overflow: 'hidden',
      background: 'transparent',
      position: 'relative'
    }"
  >
    <div v-if="loading" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;color:#999;">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
  modelPath: {
    type: String,
    required: true,
    default: '/models/role-1.glb'
  },
  showControls: {
    type: Boolean,
    default: true
  },
  autoRotate: {
    type: Boolean,
    default: false
  },
  isMini: {
    type: Boolean,
    default: false
  }
})

const canvasWrap = ref(null)
const loading = ref(true)

let scene, camera, renderer, controls, rafId
let currentModel = null

// ====== 加载模型的函数 ======
function loadModel(modelPath) {
  console.log('开始加载模型:', modelPath)
  try {
      const loader = new GLTFLoader()
      loader.load(modelPath, onLoad, onProgress, onError)
    } catch (e) {
      console.error('❌ loadModel 抛出异常:', e)
    }
  loading.value = true

  console.log('开始加载模型:', modelPath)

  // 清除旧模型
  if (currentModel) {
    scene.remove(currentModel)
    currentModel = null
  }

  // 移除所有辅助对象
  const toRemove = []
  scene.children.forEach(child => {
    if (child.isMesh && child.name === 'testBox') {
      toRemove.push(child)
    }
    if (child.isGridHelper || child.isAxesHelper) {
      toRemove.push(child)
    }
  })
  toRemove.forEach(child => scene.remove(child))

  const loader = new GLTFLoader()

  loader.load(
    modelPath,
    (gltf) => {
      console.log('模型加载成功:', modelPath)
      console.log('模型结构:', gltf.scene)

      loading.value = false

      const model = gltf.scene

      // 计算包围盒
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      console.log('原始模型尺寸:', size)
      console.log('原始模型中心:', center)

      // 重置模型位置到原点
      model.position.set(0, 0, 0)

      // 计算合适的缩放和位置
      const maxDim = Math.max(size.x, size.y, size.z)

      // 根据是否为mini模式调整目标大小
      const targetSize = props.isMini ? 1.5 : 2.5
      const scale = targetSize / maxDim

      console.log('缩放比例:', scale)

      // 应用缩放
      model.scale.set(scale, scale, scale)

      // 计算缩放后的中心偏移
      const scaledBox = new THREE.Box3().setFromObject(model)
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3())

      // 将模型居中
      model.position.x = -scaledCenter.x
      model.position.y = -scaledCenter.y
      model.position.z = -scaledCenter.z

      // 添加到场景
      scene.add(model)
      currentModel = model

      // 自动调整相机
      adjustCamera(model)

      console.log('模型已添加到场景')
    },
    (progress) => {
      console.log(`加载进度: ${Math.round((progress.loaded / progress.total) * 100)}%`)
    },
    (err) => {
      console.error('模型加载失败:', err)
      loading.value = false
      // 显示备用立方体
      showFallbackCube()
    }
  )
}

function showFallbackCube() {
  const fallbackBox = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x4299e1 })
  )
  fallbackBox.name = 'testBox'
  scene.add(fallbackBox)
  // 调整相机看到立方体
  camera.position.set(2, 2, 3)
  controls.target.set(0, 0, 0)
  controls.update()
}

function adjustCamera(model) {
  // 计算模型包围盒
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  // 计算合适距离
  const maxDim = Math.max(size.x, size.y, size.z)
  const distance = maxDim * (props.isMini ? 2.5 : 2)

  console.log('调整相机，距离:', distance)

  // 设置相机位置
  camera.position.set(distance * 0.6, distance * 0.6, distance)
  controls.target.copy(center)
  controls.update()
}

// ====== 初始化3D场景 ======
function initScene() {
console.log('🔧 WebGL 上下文数量:', document.querySelectorAll('canvas').length)
  const dom = canvasWrap.value
  if (!dom) {
    console.error('canvasWrap 容器不存在')
    return
  }

  const width = dom.clientWidth
  const height = dom.clientHeight

  console.log('初始化3D场景, 容器尺寸:', width, 'x', height)

  // 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xe8e8e8)

  // 相机 - 使用更合适的位置
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(3, 3, 5)
  camera.lookAt(0, 0, 0)

  // 渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  dom.appendChild(renderer.domElement)

  console.log('渲染器已创建')

  // 灯光 - 增加更多灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.0)
  mainLight.position.set(5, 10, 7)
  scene.add(mainLight)

  const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
  backLight.position.set(-5, 0, -5)
  scene.add(backLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
  fillLight.position.set(0, -5, 5)
  scene.add(fillLight)

  // 添加环境光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
  scene.add(hemiLight)

  // 轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.autoRotate = props.autoRotate
  controls.autoRotateSpeed = 2.0
  controls.enableZoom = !props.isMini
  controls.enablePan = !props.isMini
  controls.target.set(0, 0, 0)
  controls.update()

  // 加载模型
  loadModel(props.modelPath)

  // 渲染循环
  function animate() {
    rafId = requestAnimationFrame(animate)
    if (controls) {
      controls.update()
    }
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }
  animate()

  console.log('3D场景初始化完成')
}

function onResize() {
  const dom = canvasWrap.value
  if (!dom || !camera || !renderer) return
  const width = dom.clientWidth
  const height = dom.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// ====== 监听模型路径变化 ======
watch(() => props.modelPath, (newPath, oldPath) => {
  if (newPath && newPath !== oldPath && scene) {
    console.log('模型路径变化:', oldPath, '->', newPath)
    loadModel(newPath)
  }
})

// ====== 生命周期 ======
onMounted(() => {
  nextTick(() => {
    initScene()
  })
})

onBeforeUnmount(() => {
  console.log('清理3D资源')
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  controls?.dispose()
  renderer?.dispose()
  if (scene) {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose())
        } else {
          child.material?.dispose()
        }
      }
    })
  }
})
</script>

<style scoped>
div[ref="canvasWrap"] {
  min-height: 200px;
}
</style>