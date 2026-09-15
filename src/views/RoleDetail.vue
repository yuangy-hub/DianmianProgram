<template>
  <div class="role-detail-page">
    <!-- 顶部导航 -->
    <div class="nav-section">
      <router-link to="/role-list" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        返回IP总览
      </router-link>

      <div class="ip-badge">
        <span class="badge-number">#{{ String(ipId).padStart(2, '0') }}</span>
        <span class="badge-icon">{{ getIpIcon(ipId) }}</span>
      </div>
    </div>

    <!-- 主内容区 - 紧凑布局 -->
    <div class="main-content">
      <!-- 左侧：3D模型展示 -->
      <div class="model-section">
        <div class="model-wrapper">
          <Role3dViewer
            :model-path="modelUrl"
            :show-controls="true"
            :auto-rotate="false"
            :is-mini="false"
          />
        </div>

        <!-- 模型下方的快捷信息 -->
        <div class="model-quick-info">
          <div class="quick-item">
            <span class="quick-label">角色</span>
            <span class="quick-value">{{ currentIp.name }}</span>
          </div>
          <div class="quick-item">
            <span class="quick-label">象征</span>
            <span class="quick-value">{{ getSymbol(ipId) }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧：内容区域 -->
      <div class="content-section">
        <!-- IP标题 -->
        <div class="ip-header">
          <h1 class="ip-name">{{ currentIp.name }}</h1>
          <div class="ip-divider"></div>
        </div>

        <!-- 简短介绍 -->
        <div class="short-desc-wrapper">
          <p class="short-desc">{{ currentIp.shortDesc }}</p>
        </div>

        <!-- 故事区域 -->
        <div class="story-wrapper">
          <div class="story-header">
            <span class="story-icon">📖</span>
            <h3 class="story-title">人物原型故事</h3>
          </div>
          <div class="story-content">
            <p>{{ currentIp.story }}</p>
          </div>
        </div>

        <!-- 底部导航标签 -->
        <div class="bottom-nav">
          <router-link
            v-if="prevIp"
            :to="`/role-detail/${prevIp.id}`"
            class="nav-btn nav-prev"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            {{ prevIp.name }}
          </router-link>
          <span class="nav-counter">{{ ipId }} / {{ roleList.length }}</span>
          <router-link
            v-if="nextIp"
            :to="`/role-detail/${nextIp.id}`"
            class="nav-btn nav-next"
          >
            {{ nextIp.name }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { roleList } from '../data/role'
import Role3dViewer from '../components/Role3dViewer.vue'

const route = useRoute()
const ipId = computed(() => Number(route.params.id))

const currentIp = computed(() => roleList.find(item => item.id === ipId.value))

const modelUrl = computed(() => `${import.meta.env.BASE_URL}models/role-${ipId.value}.glb`)

// 上一个IP
const prevIp = computed(() => {
  const index = roleList.findIndex(item => item.id === ipId.value)
  return index > 0 ? roleList[index - 1] : null
})

// 下一个IP
const nextIp = computed(() => {
  const index = roleList.findIndex(item => item.id === ipId.value)
  return index < roleList.length - 1 ? roleList[index + 1] : null
})

// Emoji图标
const getIpIcon = (id) => {
  const icons = {
    1: '🐘', 2: '🐘', 3: '🐴', 4: '🐺', 5: '🐼', 6: '🦅'
  }
  return icons[id] || '🌟'
}

// 象征词
const getSymbol = (id) => {
  const symbols = {
    1: '力量 · 奉献 · 坚韧',
    2: '纯真 · 希望 · 传承',
    3: '耐力 · 负重 · 前行',
    4: '勇毅 · 忠诚 · 无畏',
    5: '记录 · 洞察 · 真相',
    6: '翱翔 · 守护 · 国际'
  }
  return symbols[id] || '——'
}
</script>

<style scoped>
/* ===== 页面整体 ===== */
.role-detail-page {
  min-height: 100vh;
  background: linear-gradient(160deg, #f7f2ed 0%, #ede5de 50%, #e8dfd7 100%);
  padding: 24px 32px 32px;
}

/* ===== 顶部导航 ===== */
.nav-section {
  max-width: 1300px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8b7355;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateX(-3px);
  color: #5a4a3a;
}

.ip-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  padding: 6px 16px 6px 12px;
  border-radius: 20px;
}

.badge-number {
  font-size: 13px;
  font-weight: 600;
  color: #8b7355;
  font-family: 'Georgia', serif;
}

.badge-icon {
  font-size: 20px;
  line-height: 1;
}

/* ===== 主内容 - 两栏布局 ===== */
.main-content {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 28px;
  align-items: start;
}

/* ===== 左侧 - 3D模型区 ===== */
.model-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.model-wrapper {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: box-shadow 0.3s ease;
}

.model-wrapper:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.10);
}

/* 覆盖3D组件的高度 */
.model-wrapper :deep(.role-3d-viewer),
.model-wrapper :deep([ref="canvasWrap"]) {
  height: 420px !important;
  min-height: 420px !important;
}

/* ===== 模型下方快捷信息 ===== */
.model-quick-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.quick-item {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quick-label {
  font-size: 11px;
  color: #a09080;
  letter-spacing: 2px;
  font-weight: 500;
  text-transform: uppercase;
}

.quick-value {
  font-size: 15px;
  font-weight: 600;
  color: #3d2c1e;
}

/* ===== 右侧 - 内容区 ===== */
.content-section {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 32px 36px 28px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ===== IP标题 ===== */
.ip-header {
  margin-bottom: 2px;
}

.ip-name {
  font-size: 28px;
  font-weight: 700;
  color: #3d2c1e;
  margin: 0 0 6px 0;
  letter-spacing: 1px;
}

.ip-divider {
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, #c4b5a5, #8b7355);
  border-radius: 4px;
}

/* ===== 简短介绍 ===== */
.short-desc-wrapper {
  background: rgba(255, 247, 240, 0.5);
  border-radius: 12px;
  padding: 14px 18px;
  border-left: 3px solid #c4b5a5;
}

.short-desc {
  font-size: 15px;
  line-height: 1.7;
  color: #5a4a3a;
  margin: 0;
}

/* ===== 故事区域 ===== */
.story-wrapper {
  flex: 1;
  background: rgba(255, 252, 250, 0.4);
  border-radius: 14px;
  padding: 18px 20px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.story-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.story-icon {
  font-size: 18px;
}

.story-title {
  font-size: 16px;
  font-weight: 600;
  color: #5a4a3a;
  margin: 0;
  letter-spacing: 1px;
}

.story-content {
  max-height: 240px;
  overflow-y: auto;
  padding-right: 4px;
}

.story-content::-webkit-scrollbar {
  width: 4px;
}

.story-content::-webkit-scrollbar-track {
  background: transparent;
}

.story-content::-webkit-scrollbar-thumb {
  background: #d5c8bc;
  border-radius: 4px;
}

.story-content p {
  font-size: 14px;
  line-height: 1.9;
  color: #4a3a2a;
  margin: 0;
  white-space: pre-wrap;
}

/* ===== 底部导航 ===== */
.bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding-top: 16px;
  border-top: 1px solid rgba(200, 185, 170, 0.3);
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  color: #8b7355;
  padding: 6px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: #3d2c1e;
  transform: translateY(-1px);
}

.nav-prev:hover {
  transform: translateX(-3px);
}

.nav-next:hover {
  transform: translateX(3px);
}

.nav-counter {
  font-size: 13px;
  color: #b0a090;
  font-weight: 500;
  letter-spacing: 2px;
  font-family: 'Georgia', serif;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .content-section {
    padding: 24px 28px 20px;
  }

  .ip-name {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .role-detail-page {
    padding: 16px;
  }

  .main-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .model-wrapper :deep(.role-3d-viewer),
  .model-wrapper :deep([ref="canvasWrap"]) {
    height: 320px !important;
    min-height: 320px !important;
  }

  .content-section {
    padding: 20px 18px 18px;
    gap: 14px;
  }

  .ip-name {
    font-size: 22px;
  }

  .short-desc {
    font-size: 14px;
  }

  .story-content p {
    font-size: 13px;
  }

  .model-quick-info {
    grid-template-columns: 1fr 1fr;
  }

  .nav-btn {
    font-size: 12px;
    max-width: 80px;
    padding: 4px 10px;
  }

  .nav-section {
    flex-wrap: wrap;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .role-detail-page {
    padding: 12px;
  }

  .model-wrapper :deep(.role-3d-viewer),
  .model-wrapper :deep([ref="canvasWrap"]) {
    height: 260px !important;
    min-height: 260px !important;
  }

  .content-section {
    padding: 16px 14px 14px;
  }

  .ip-name {
    font-size: 19px;
  }

  .short-desc-wrapper {
    padding: 10px 14px;
  }

  .story-wrapper {
    padding: 12px 14px 14px;
  }

  .story-content {
    max-height: 180px;
  }

  .model-quick-info {
    grid-template-columns: 1fr;
  }

  .bottom-nav {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  .nav-btn {
    max-width: 100px;
  }
}
</style>