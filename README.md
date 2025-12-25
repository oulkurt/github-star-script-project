# GitHub Star Button Userscript

一个用于 GitHub 的油猴脚本，在站点头部头像左侧添加一个Star按钮，点击即可直达你的 **/stars** 页面，方便快速查看收藏的仓库。

## 功能亮点
- 在 GitHub 全站生效，自动插入到头部导航
- 空心星形图标，贴合 GitHub 视觉
- 支持 Turbo 导航事件（`turbo:load` / `turbo:render`）
- 失败重试：若初始插入失败，会监听 DOM 变化并在 5 秒内重试

## 安装与使用
1. 安装浏览器扩展：推荐 [Tampermonkey](https://www.tampermonkey.net/) 或兼容的 Userscript 管理器。
2. 新建脚本，将本仓库的 `GitHub_Star.js` 全部内容复制粘贴进去保存。
   - 或者直接在扩展中选择“从文件导入”，指向本仓库的 `GitHub_Star.js`。
3. 打开任意 GitHub 页面，确认头像左侧出现星形按钮，点击即跳转到 `/stars`。

## 开发说明
- 主要文件：`GitHub_Star.js`（核心脚本，含按钮创建、DOM 监听与插入逻辑）
- 运行时：在 GitHub 页面加载完成后执行，且绑定 `turbo:load` / `turbo:render` 事件以适配 GitHub 的 Turbo 导航
- 可调整样式：修改脚本中的按钮 class 或 SVG 以适配个人偏好

## 调试与发布
1. 在本地编辑 `GitHub_Star.js`。
2. 打开 GitHub 任意页面，使用 Tampermonkey 的“重新加载”或“实时预览”功能查看效果。
3. 确认按钮位置与跳转正常后，可将脚本推送到你的 GitHub 仓库。

## 常见问题
- **按钮没出现？** 刷新页面，或检查是否已登录 GitHub、是否安装/启用脚本管理器。
- **样式与主题不一致？** 调整脚本中按钮的 class 或 SVG 颜色以适配浅色/深色主题。

## 版本
- 1.0.0：初始版本，提供头部星标按钮跳转 `/stars`。
