async function loadGames() {
  const res = await fetch('games.json', { cache: 'no-store' });
  if (!res.ok) {
    console.error('Failed to load games.json');
    return [];
  }
  return res.json();
}

function cardTemplate(game) {
  return `
    <article class="card">
      <h3>${game.title}</h3>
      <p>${game.description ?? ''}</p>
      <div class="row">
        <a class="btn" href="${game.url}" target="_blank" rel="noopener">Open</a>
        <button class="btn btn-secondary" data-preview="${game.url}" data-title="${game.title}">Preview</button>
      </div>
      <small>${game.slug ? `/games/${game.slug}/` : game.url}</small>
    </article>
  `;
}

function initPreview() {
  const grid = document.getElementById('games-grid');
  const preview = document.getElementById('preview');
  const title = document.getElementById('preview-title');
  const frame = document.getElementById('preview-frame');
  const openFull = document.getElementById('open-full');
  const closeBtn = document.getElementById('close-preview');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-preview]');
    if (!btn) return;
    const url = btn.getAttribute('data-preview');
    const gameTitle = btn.getAttribute('data-title');
    title.textContent = gameTitle;
    frame.src = url;
    openFull.href = url;
    preview.classList.remove('hidden');
    window.scrollTo({ top: preview.offsetTop - 12, behavior: 'smooth' });
  });

  closeBtn.addEventListener('click', () => {
    frame.src = 'about:blank';
    preview.classList.add('hidden');
  });
}

(async function main() {
  const games = await loadGames();
  const grid = document.getElementById('games-grid');
  grid.innerHTML = games.map(cardTemplate).join('');
  initPreview();
})();

