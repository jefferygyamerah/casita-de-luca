const KEYS = {
  lucaPhoto: 'casita_luca_photo',
  huespedcitos: 'casita_huespedcitos',
  galleryPhotos: 'casita_gallery_photos',
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

// --- Luca Photo ---

export function getLucaPhoto() {
  return load(KEYS.lucaPhoto, '')
}

export function setLucaPhoto(url) {
  save(KEYS.lucaPhoto, url)
}

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
