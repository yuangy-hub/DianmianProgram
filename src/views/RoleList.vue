<template>
  <div class="role-list-page">
    <!-- 顶部标题区域 -->
    <div class="header-section">
      <router-link to="/" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        返回项目首页
      </router-link>
      <div class="title-wrapper">
        <h1 class="page-title">六大IP形象总览</h1>
        <p class="page-subtitle">点击任一IP形象，了解其背后的历史故事</p>
      </div>
    </div>

    <!-- IP卡片网格 - 3行2列 -->
    <div class="ip-grid">
      <router-link
        v-for="item in roleList"
        :key="item.id"
        :to="`/role-detail/${item.id}`"
        class="ip-card"
        :class="{ 'ip-card-1': item.id === 1, 'ip-card-2': item.id === 2, 'ip-card-3': item.id === 3, 'ip-card-4': item.id === 4, 'ip-card-5': item.id === 5, 'ip-card-6': item.id === 6 }"
      >
        <div class="ip-card-inner">
          <!-- 3D模型区域 -->
          <div class="model-container">
            <Role3dViewer
              :model-path="`${baseUrl}models/role-${item.id}.glb`"
              :show-controls="false"
              :auto-rotate="true"
              :is-mini="true"
            />
            <!-- 序号标签 -->
            <div class="ip-number">#{{ String(item.id).padStart(2, '0') }}</div>
          </div>

          <!-- IP信息区域 -->
          <div class="ip-info">
            <div class="ip-name-wrapper">
              <span class="ip-icon">{{ getIpIcon(item.id) }}</span>
              <h3 class="ip-name">{{ item.name }}</h3>
            </div>
            <p class="ip-short-desc">{{ truncateText(item.shortDesc, 30) }}</p>
            <div class="ip-tag">
              <span class="tag-dot"></span>
              点击查看详情 →
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { roleList } from '../data/role'
import Role3dViewer from '../components/Role3dViewer.vue'
const baseUrl = import.meta.env.BASE_URL

// 为每个IP配一个emoji图标
const getIpIcon = (id) => {
  const icons = {
    1: '🐘', // 母象
    2: '🐘', // 小象
    3: '🐴', // 滇马
    4: '🐺', // 母狼
    5: '🐼', // 小熊猫
    6: '🦅'  // 老鹰
  }
  return icons[id] || '🌟'
}

// 截断文本
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

<style scoped>
/* ===== 页面整体 ===== */
.role-list-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%);
  padding: 40px 20px;
}

/* ===== 顶部标题 ===== */
.header-section {
  max-width: 1200px;
  margin: 0 auto 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #8b7355;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(-4px);
  color: #5a4a3a;
}

.title-wrapper {
  text-align: center;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: #3d2c1e;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #5a4a3a, #8b7355);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 16px;
  color: #8b7355;
  margin: 0;
  font-weight: 400;
  letter-spacing: 4px;
}

/* ===== IP网格 - 3行2列 ===== */
.ip-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

/* ===== IP卡片 ===== */
.ip-card {
  text-decoration: none;
  display: block;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ip-card:hover {
  transform: translateY(-8px);
}

.ip-card-inner {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ip-card:hover .ip-card-inner {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.98);
}

/* ===== 3D模型容器 ===== */
.model-container {
  position: relative;
  background: linear-gradient(180deg, #f0ebe6 0%, #e0d8d0 100%);
  overflow: hidden;
  min-height: 260px;
  flex-shrink: 0;
}

/* 每个卡片不同的顶部装饰色 */
.ip-card-1 .model-container { background: linear-gradient(180deg, #fce4d6 0%, #f5d5c6 100%); }
.ip-card-2 .model-container { background: linear-gradient(180deg, #d6f0e4 0%, #c6e5d6 100%); }
.ip-card-3 .model-container { background: linear-gradient(180deg, #e8dcc8 0%, #dcd0b8 100%); }
.ip-card-4 .model-container { background: linear-gradient(180deg, #e8d8d8 0%, #dcc8c8 100%); }
.ip-card-5 .model-container { background: linear-gradient(180deg, #f0e8d8 0%, #e5dcc8 100%); }
.ip-card-6 .model-container { background: linear-gradient(180deg, #d8e0e8 0%, #c8d4dc 100%); }

.ip-number {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
  font-family: 'Georgia', serif;
}

/* ===== IP信息区域 ===== */
.ip-info {
  padding: 18px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ip-name-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.ip-icon {
  font-size: 22px;
  line-height: 1;
}

.ip-name {
  font-size: 18px;
  font-weight: 700;
  color: #3d2c1e;
  margin: 0;
  letter-spacing: 1px;
}

.ip-short-desc {
  font-size: 13px;
  color: #7a6a5a;
  line-height: 1.6;
  margin: 0 0 12px 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ip-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #8b7355;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.ip-card:hover .ip-tag {
  opacity: 1;
  transform: translateX(4px);
}

.tag-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8b7355;
  transition: width 0.3s ease;
}

.ip-card:hover .tag-dot {
  width: 16px;
  border-radius: 3px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .role-list-page {
    padding: 20px 12px;
  }

  .page-title {
    font-size: 26px;
  }

  .page-subtitle {
    font-size: 13px;
    letter-spacing: 2px;
  }

  .ip-grid {
    gap: 16px;
  }

  .model-container {
    min-height: 180px;
  }

  .ip-name {
    font-size: 15px;
  }

  .ip-short-desc {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }

  .ip-info {
    padding: 12px 14px 14px;
  }

  .ip-icon {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .ip-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .model-container {
    min-height: 200px;
  }

  .page-title {
    font-size: 22px;
  }

  .header-section {
    margin-bottom: 24px;
  }
}
</style>
