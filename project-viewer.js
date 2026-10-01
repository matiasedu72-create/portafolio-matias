(() => {
  const dialog = document.getElementById('project-dialog');
  const title = document.getElementById('project-dialog-title');
  const body = dialog.querySelector('.project-dialog-body');
  const assetBase = new URL('.', document.currentScript?.src || document.baseURI);
  const projects = {
    mc: { title: 'M&C Mi Casa — Gestión Inmobiliaria', images: [['mc-mi-casa.png', 'Mockup del sitio en computador y teléfono', 1618, 972]] },
    alsacia: { title: 'ALSACIA — Tríptico corporativo', images: [['alsacia-cara-1.png', 'Cara exterior del tríptico original', 2400, 1571], ['alsacia-cara-2.png', 'Cara interior del tríptico original', 2400, 1571]] }
  };
  let opener;
  document.querySelectorAll('[data-project-view]').forEach(button => {
    button.addEventListener('click', () => {
      const project = projects[button.dataset.projectView];
      if (!project || dialog.open) return;
      opener = button;
      title.textContent = project.title;
      body.replaceChildren();
      project.images.forEach(([src, caption, width, height]) => {
        const figure = document.createElement('figure');
        const label = document.createElement('figcaption');
        label.textContent = caption;
        const img = document.createElement('img');
        const status = document.createElement('p');
        status.className = 'project-image-status';
        status.setAttribute('role', 'status');
        status.textContent = 'Cargando imagen…';
        img.addEventListener('load', () => status.remove(), { once: true });
        img.addEventListener('error', () => {
          status.textContent = 'No se pudo cargar la imagen. Cierra el visor y vuelve a intentarlo.';
        }, { once: true });
        Object.assign(img, { alt: caption, width, height, decoding: 'async' });
        img.src = new URL(src, assetBase).href;
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', caption + '. Ampliar o ajustar imagen');
        img.setAttribute('aria-pressed', 'false');
        const imageFrame = document.createElement('div');
        imageFrame.className = 'project-image-frame';
        const toggleZoom = () => {
          const zoomed = imageFrame.classList.toggle('is-zoomed');
          img.setAttribute('aria-pressed', String(zoomed));
        };
        img.addEventListener('click', toggleZoom);
        img.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleZoom(); }
        });
        imageFrame.append(img);
        figure.append(label, status, imageFrame);
        body.append(figure);
      });
      dialog.showModal();
      dialog.querySelector('.project-dialog-close').focus();
      document.body.classList.add('project-view-open');
      body.scrollTop = 0;
    });
  });
  dialog.querySelector('.project-dialog-close').addEventListener('click', () => dialog.close());
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  let downOutside = false;
  dialog.addEventListener('pointerdown', event => { downOutside = event.target === dialog && outside(event); });
  dialog.addEventListener('click', event => {
    if (downOutside && event.target === dialog && outside(event)) dialog.close();
    downOutside = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('project-view-open');
    opener?.focus({ preventScroll: true });
  });
})();
