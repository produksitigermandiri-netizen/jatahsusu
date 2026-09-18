(function () {
  'use strict';

  const scene = document.createElement('div');
  scene.id = 'pearl-cove-scene';
  scene.setAttribute('aria-hidden', 'true');
  scene.innerHTML = `
    <div class="pearl-surface-light"></div>
    <div class="pearl-caustics pearl-caustics-one"></div>
    <div class="pearl-caustics pearl-caustics-two"></div>
    <div class="pearl-bubble-field" data-pearl-bubbles></div>
    <div class="pearl-jelly pearl-jelly-one">
      <span class="pearl-jelly-cap"></span>
      <span class="pearl-jelly-tentacle t-one"></span>
      <span class="pearl-jelly-tentacle t-two"></span>
      <span class="pearl-jelly-tentacle t-three"></span>
    </div>
    <div class="pearl-jelly pearl-jelly-two">
      <span class="pearl-jelly-cap"></span>
      <span class="pearl-jelly-tentacle t-one"></span>
      <span class="pearl-jelly-tentacle t-two"></span>
      <span class="pearl-jelly-tentacle t-three"></span>
    </div>
    <div class="pearl-jelly pearl-jelly-three">
      <span class="pearl-jelly-cap"></span>
      <span class="pearl-jelly-tentacle t-one"></span>
      <span class="pearl-jelly-tentacle t-two"></span>
      <span class="pearl-jelly-tentacle t-three"></span>
    </div>
    <div class="pearl-seabed">
      <span class="pearl-grass grass-one"></span>
      <span class="pearl-grass grass-two"></span>
      <span class="pearl-grass grass-three"></span>
      <span class="pearl-grass grass-four"></span>
      <span class="pearl-coral coral-one"></span>
      <span class="pearl-coral coral-two"></span>
      <span class="pearl-shell"></span>
    </div>`;

  document.body.prepend(scene);

  const bubbleField = scene.querySelector('[data-pearl-bubbles]');
  const isCompact = window.matchMedia('(max-width: 700px)').matches;
  const bubbleCount = isCompact ? 10 : 22;

  for (let index = 0; index < bubbleCount; index += 1) {
    const bubble = document.createElement('span');
    const size = 5 + ((index * 9) % 19);
    bubble.className = index % 6 === 0 ? 'pearl-bubble pearl-bubble-glow' : 'pearl-bubble';
    bubble.style.setProperty('--pearl-left', `${2 + ((index * 23) % 96)}%`);
    bubble.style.setProperty('--pearl-size', `${size}px`);
    bubble.style.setProperty('--pearl-delay', `${-((index * 1.37) % 18)}s`);
    bubble.style.setProperty('--pearl-time', `${14 + ((index * 5) % 13)}s`);
    bubble.style.setProperty('--pearl-drift', `${-32 + ((index * 13) % 65)}px`);
    bubbleField.appendChild(bubble);
  }

  const app = document.getElementById('app');
  if (app) {
    const observer = new MutationObserver(() => {
      const homeHeadline = app.querySelector('.home-left-headline');
      if (homeHeadline) homeHeadline.dataset.oceanEdition = 'Pearl Cove Edition';
    });
    observer.observe(app, { childList: true, subtree: true });
  }
})();
