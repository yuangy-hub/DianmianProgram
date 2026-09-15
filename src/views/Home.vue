<template>
  <div class="home-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
    </div>

    <!-- 主内容 -->
    <div class="home-content">
      <div class="home-card">
        <!-- 顶部装饰 -->
        <div class="card-decoration">
          <span class="deco-line"></span>
          <span class="deco-diamond">◆</span>
          <span class="deco-line"></span>
        </div>

        <!-- Logo/标题区域 -->
        <div class="header-area">
          <div class="logo-icon">
            <img src="/src/assets/logo.jpg" alt="logo"  />
          </div>
          <h1 class="main-title">
            <span class="title-line2">滇缅公路IP展示厅</span>
          </h1>
          <p class="subtitle">—— 血肉筑成的抗战生命线 ——</p>
        </div>

        <!-- 分隔装饰 -->
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-icon">✦</span>
          <span class="divider-line"></span>
        </div>

        <!-- 简介文字 -->
        <div class="description">
          <p class="desc-text">
            阿妈糯与阿格是母子，老石是他们的筑路战友；<br>
            月英所在的运输车队，曾得到凌云的空中护航；<br>
            记者阿诚则记录下所有人的故事，成为连接不同群体的核心纽带...<br>
            <span class="desc-highlight">快来探寻它们的故事吧</span>
          </p>
        </div>

        <!-- IP形象快速预览 -->
        <div class="ip-preview">
          <div class="preview-item" v-for="item in previewIps" :key="item.id">
            <span class="preview-icon">{{ item.icon }}</span>
            <span class="preview-name">{{ item.name }}</span>
          </div>
        </div>

        <!-- 进入按钮 -->
        <router-link to="/role-list" class="enter-btn">
          <span class="btn-text">进入IP形象展示</span>
          <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </router-link>

        <!-- 底部装饰 -->
        <div class="footer-deco">
          <span class="deco-dot"></span>
          <span class="deco-dot"></span>
          <span class="deco-dot"></span>
          <span class="deco-dot"></span>
          <span class="deco-dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 快速预览的IP形象（精简版）
const previewIps = [
  { id: 1, name: '母象阿妈糯', icon: '🐘' },
  { id: 2, name: '小象阿格', icon: '🐘' },
  { id: 3, name: '滇马老石', icon: '🐴' },
  { id: 4, name: '母狼月英', icon: '🐺' },
  { id: 5, name: '小熊猫阿诚', icon: '🐼' },
  { id: 6, name: '老鹰凌云', icon: '🦅' }
]
</script>

<style scoped>
/* ===== 页面整体 ===== */
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #f7f2ed 0%, #ede5de 40%, #e3d9d0 100%);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

/* ===== 背景装饰 ===== */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
}

.bg-circle-1 {
  width: 400px;
  height: 400px;
  background: #8b7355;
  top: -100px;
  right: -100px;
}

.bg-circle-2 {
  width: 300px;
  height: 300px;
  background: #c4b5a5;
  bottom: -80px;
  left: -80px;
}

.bg-circle-3 {
  width: 200px;
  height: 200px;
  background: #d5c8bc;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ===== 主卡片 ===== */
.home-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 680px;
}

.home-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 48px 52px 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 8px 48px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: box-shadow 0.4s ease;
  text-align: center;
}

.home-card:hover {
  box-shadow:
    0 12px 64px rgba(0, 0, 0, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* ===== 顶部装饰 ===== */
.card-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
}

.deco-line {
  flex: 1;
  max-width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c4b5a5);
}

.deco-line:first-child {
  background: linear-gradient(90deg, transparent, #c4b5a5);
}

.deco-line:last-child {
  background: linear-gradient(90deg, #c4b5a5, transparent);
}

.deco-diamond {
  color: #8b7355;
  font-size: 12px;
  opacity: 0.5;
}

/* ===== 标题区域 ===== */
.header-area {
  margin-bottom: 20px;
}

.logo-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.logo-icon img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  border-radius: 50%;
  /* 柔和光晕，让logo与背景融合 */
  box-shadow:
    0 4px 24px rgba(139, 115, 85, 0.15),
    0 0 0 6px rgba(255, 255, 255, 0.5),
    0 0 0 8px rgba(196, 181, 165, 0.15);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.logo-icon img:hover {
  transform: scale(1.05);
  box-shadow:
    0 6px 32px rgba(139, 115, 85, 0.22),
    0 0 0 6px rgba(255, 255, 255, 0.7),
    0 0 0 8px rgba(196, 181, 165, 0.25);
}

.main-title {
  margin: 0;
  line-height: 1.2;
}

.title-line1 {
  display: block;
  font-size: 20px;
  font-weight: 400;
  color: #8b7355;
  letter-spacing: 6px;
  margin-bottom: 4px;
}

.title-line2 {
  display: block;
  font-size: 34px;
  font-weight: 700;
  color: #3d2c1e;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #5a4a3a, #8b7355);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 14px;
  color: #b0a090;
  letter-spacing: 4px;
  margin: 6px 0 0 0;
  font-weight: 300;
}

/* ===== 分隔装饰 ===== */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 20px auto 24px;
  max-width: 200px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d5c8bc, transparent);
}

.divider-icon {
  color: #c4b5a5;
  font-size: 12px;
  opacity: 0.6;
}

/* ===== 描述文字 ===== */
.description {
  margin-bottom: 28px;
}

.desc-text {
  font-size: 15px;
  line-height: 2;
  color: #5a4a3a;
  margin: 0;
  letter-spacing: 0.5px;
}

.desc-highlight {
  display: inline-block;
  margin-top: 4px;
  font-weight: 600;
  color: #5a4a3a;
  background: linear-gradient(90deg, #f0e8e0, #e8ddd0);
  padding: 2px 16px;
  border-radius: 12px;
  font-size: 15px;
}

/* ===== IP形象快速预览 ===== */
.ip-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 14px;
  margin-bottom: 32px;
  padding: 12px 16px;
  background: rgba(255, 252, 250, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6a5a4a;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.preview-item:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.preview-icon {
  font-size: 18px;
  line-height: 1;
}

.preview-name {
  font-size: 12px;
  font-weight: 500;
  color: #7a6a5a;
}

/* ===== 进入按钮 ===== */
.enter-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 36px;
  background: linear-gradient(135deg, #5a4a3a, #7a6a5a);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(90, 74, 58, 0.25);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.enter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: left 0.6s ease;
}

.enter-btn:hover::before {
  left: 100%;
}

.enter-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 32px rgba(90, 74, 58, 0.35);
  background: linear-gradient(135deg, #6a5a4a, #8a7a6a);
}

.enter-btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-arrow {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.enter-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* ===== 底部装饰 ===== */
.footer-deco {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.deco-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #d5c8bc;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.deco-dot:nth-child(1) { opacity: 0.2; }
.deco-dot:nth-child(2) { opacity: 0.4; }
.deco-dot:nth-child(3) { opacity: 0.6; }
.deco-dot:nth-child(4) { opacity: 0.4; }
.deco-dot:nth-child(5) { opacity: 0.2; }

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .home-card {
    padding: 32px 28px 28px;
    border-radius: 20px;
  }

  .title-line1 {
    font-size: 16px;
    letter-spacing: 4px;
  }

  .title-line2 {
    font-size: 26px;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 2px;
  }

  .desc-text {
    font-size: 14px;
    line-height: 1.9;
  }

  .desc-highlight {
    font-size: 14px;
  }

  .ip-preview {
    gap: 4px 10px;
    padding: 10px 12px;
  }

  .preview-item {
    font-size: 12px;
    padding: 2px 6px;
  }

  .preview-icon {
    font-size: 15px;
  }

  .preview-name {
    font-size: 11px;
  }

  .enter-btn {
    padding: 12px 28px;
    font-size: 14px;
    gap: 10px;
  }

  .logo-icon {
    font-size: 38px;
  }

  .card-decoration {
    margin-bottom: 20px;
  }

  .divider {
    margin: 16px auto 18px;
  }

  .description {
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .home-card {
    padding: 24px 18px 20px;
    border-radius: 16px;
  }

  .title-line1 {
    font-size: 14px;
    letter-spacing: 3px;
  }

  .title-line2 {
    font-size: 20px;
    letter-spacing: 1px;
  }

  .subtitle {
    font-size: 11px;
    letter-spacing: 1px;
  }

  .desc-text {
    font-size: 13px;
    line-height: 1.8;
  }

  .desc-highlight {
    font-size: 13px;
    padding: 1px 12px;
  }

  .ip-preview {
    gap: 4px 8px;
    padding: 8px 10px;
  }

  .preview-item {
    font-size: 11px;
    padding: 2px 4px;
  }

  .preview-icon {
    font-size: 14px;
  }

  .preview-name {
    font-size: 10px;
  }

  .enter-btn {
    padding: 10px 20px;
    font-size: 13px;
    gap: 8px;
    width: 100%;
    justify-content: center;
  }

  .logo-icon {
    font-size: 32px;
  }

  .card-decoration {
    margin-bottom: 16px;
  }

  .divider {
    margin: 12px auto 14px;
    max-width: 120px;
  }

  .description {
    margin-bottom: 16px;
  }

  .footer-deco {
    margin-top: 18px;
  }

  .bg-circle-1 {
    width: 200px;
    height: 200px;
    top: -60px;
    right: -60px;
  }

  .bg-circle-2 {
    width: 150px;
    height: 150px;
    bottom: -40px;
    left: -40px;
  }
}
</style>