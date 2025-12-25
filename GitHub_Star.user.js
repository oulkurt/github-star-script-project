// ==UserScript==
// @name         GitHub Star Button (header)
// @namespace    https://github.com/oulkurt
// @version      1.0.2
// @description  在 GitHub 头部头像左侧添加一个空心星形按钮，直达个人 stars 页
// @author       You
// @match        https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.png
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==
console.log('[Star Button] script loaded');

(function () {
  'use strict';

  const BUTTON_ID = 'tm-star-button';
  const TOOLTIP_ID = 'tm-star-button-tooltip';

  function createIcon() {
    // 空心星：显式在 path 上设定 fill="none" 且使用描边
    return `
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" data-view-component="true" class="octicon Button-visual" fill="none">
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.814 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.979a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.373a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
          fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"></path>
      </svg>
    `;
  }

  function getUserLogin() {
    const meta = document.querySelector('meta[name="user-login"]');
    return meta ? meta.getAttribute('content') || '' : '';
  }

  function getStarsHref() {
    const login = getUserLogin();
    return login ? `/${login}?tab=stars` : '/stars';
  }

  function getActionsContainer() {
    return (
      document.querySelector('.AppHeader-actions') ||
      document.querySelector('.AppHeader-actions.position-relative') ||
      document.querySelector('.AppHeader-globalBar-end') ||
      document.querySelector('.AppHeader-globalBar') ||
      null
    );
  }

  function addStarButton() {
    const actionsContainer = getActionsContainer();
    if (!actionsContainer) return false;

    if (document.getElementById(BUTTON_ID)) return true;

    const starButton = document.createElement('a');
    starButton.id = BUTTON_ID;
    starButton.href = getStarsHref();
    starButton.className = 'Button Button--iconOnly Button--secondary Button--medium AppHeader-button color-fg-muted';
    starButton.setAttribute('aria-label', 'Your stars');
    starButton.innerHTML = createIcon();

    // tooltip（可选，保持与参考脚本一致）
    const tooltip = document.createElement('tool-tip');
    tooltip.id = TOOLTIP_ID;
    tooltip.setAttribute('for', BUTTON_ID);
    tooltip.setAttribute('popover', 'manual');
    tooltip.setAttribute('data-direction', 's');
    tooltip.setAttribute('data-type', 'label');
    tooltip.setAttribute('data-view-component', 'true');
    tooltip.className = 'sr-only position-absolute';
    tooltip.textContent = 'Your stars';

    const refNode =
      actionsContainer.querySelector('notification-indicator') ||
      actionsContainer.querySelector('.AppHeader-user');

    if (refNode) {
      actionsContainer.insertBefore(starButton, refNode);
      actionsContainer.insertBefore(tooltip, refNode);
    } else {
      actionsContainer.appendChild(starButton);
      actionsContainer.appendChild(tooltip);
    }

    return true;
  }

  function main() {
    if (addStarButton()) return;

    const observer = new MutationObserver((mutations, obs) => {
      if (addStarButton()) {
        obs.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 5 秒后停止监听，节省资源
    setTimeout(() => observer.disconnect(), 5000);
  }

  main();
  document.addEventListener('turbo:load', main);
  document.addEventListener('turbo:render', main);
})();