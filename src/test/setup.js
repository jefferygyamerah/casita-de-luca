import '@testing-library/jest-dom'

// Mock localStorage and sessionStorage
const storage = {}
const sessionStorageData = {}

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (k) => storage[k] ?? null,
    setItem: (k, v) => { storage[k] = String(v) },
    removeItem: (k) => { delete storage[k] },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]) },
  },
  writable: true,
})

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: (k) => sessionStorageData[k] ?? null,
    setItem: (k, v) => { sessionStorageData[k] = String(v) },
    removeItem: (k) => { delete sessionStorageData[k] },
    clear: () => { Object.keys(sessionStorageData).forEach(k => delete sessionStorageData[k]) },
  },
  writable: true,
})

// Silence window.confirm in tests
window.confirm = () => true

// Mock IntersectionObserver
window.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock scrollTo
window.scrollTo = () => {}
