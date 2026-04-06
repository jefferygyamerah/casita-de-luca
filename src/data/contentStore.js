const KEYS = {
  lucaPhoto: 'casita_luca_photo',
  huespedcitos: 'casita_huespedcitos',
  galleryPhotos: 'casita_gallery_photos',
  pageContent: 'casita_page_content',
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

// ─── Page content (editable text) ─────────────────────────────────────────────

const DEFAULT_CONTENT = {
  heroHeadline: 'Un hogar lleno de amor, juego y cuidado para tu perrito.',
  heroSubtext: 'Cuidamos a tu perrito como si fuera nuestro Luca.',
  whatsapp: '50766746941',
  contactNote: 'Hablemos. Respondemos rápido.',
}

export function getPageContent() {
  return { ...DEFAULT_CONTENT, ...load(KEYS.pageContent, {}) }
}

export function setPageContent(updates) {
  save(KEYS.pageContent, { ...load(KEYS.pageContent, {}), ...updates })
}

// ─── Luca Photo ───────────────────────────────────────────────────────────────
// --- Luca Photo ---

export function getLucaPhoto() {
  return load(KEYS.lucaPhoto, '')
}

export function setLucaPhoto(url) {
  save(KEYS.lucaPhoto, url)
}

// ─── Huespedcitos ─────────────────────────────────────────────────────────────
// --- Huespedcitos ---

export function getHuespedcitos() {
  return load(KEYS.huespedcitos, [])
}

export function addHuespedcito({ name, photoUrl, breed }) {
  const list = getHuespedcitos()
  list.push({ id: makeId(), name, photoUrl, breed: breed || '' })
  save(KEYS.huespedcitos, list)
}

export function removeHuespedcito(id) {
  const list = getHuespedcitos().filter((d) => d.id !== id)
  save(KEYS.huespedcitos, list)
}

// ─── Gallery Photos ───────────────────────────────────────────────────────────
// --- Gallery Photos ---

export function getGalleryPhotos() {
  return load(KEYS.galleryPhotos, [])
}

export function addGalleryPhoto({ url, caption }) {
  const list = getGalleryPhotos()
  list.push({ id: makeId(), url, caption: caption || '' })
  save(KEYS.galleryPhotos, list)
}

export function removeGalleryPhoto(id) {
  const list = getGalleryPhotos().filter((p) => p.id !== id)
  save(KEYS.galleryPhotos, list)
}
