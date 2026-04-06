import { describe, it, expect, beforeEach } from 'vitest'
import {
  getPageContent, setPageContent,
  getLucaPhoto, setLucaPhoto,
  getHuespedcitos, addHuespedcito, removeHuespedcito,
  getGalleryPhotos, addGalleryPhoto, removeGalleryPhoto,
} from '../data/contentStore'

beforeEach(() => {
  localStorage.clear()
})

describe('getPageContent / setPageContent', () => {
  it('returns defaults when nothing stored', () => {
    const c = getPageContent()
    expect(c.heroHeadline).toContain('hogar')
    expect(c.whatsapp).toBe('50766746941')
  })

  it('persists partial updates', () => {
    setPageContent({ heroHeadline: 'Nuevo titulo' })
    expect(getPageContent().heroHeadline).toBe('Nuevo titulo')
    // other defaults preserved
    expect(getPageContent().whatsapp).toBe('50766746941')
  })
})

describe('luca photo', () => {
  it('defaults to empty string', () => {
    expect(getLucaPhoto()).toBe('')
  })

  it('persists URL', () => {
    setLucaPhoto('https://example.com/luca.jpg')
    expect(getLucaPhoto()).toBe('https://example.com/luca.jpg')
  })
})

describe('huespedcitos', () => {
  it('starts empty', () => {
    expect(getHuespedcitos()).toHaveLength(0)
  })

  it('adds and retrieves a dog', () => {
    addHuespedcito({ name: 'Lola', photoUrl: 'https://x.com/lola.jpg', breed: 'Poodle' })
    const list = getHuespedcitos()
    expect(list).toHaveLength(1)
    expect(list[0].name).toBe('Lola')
    expect(list[0].id).toBeTruthy()
  })

  it('removes a dog by id', () => {
    addHuespedcito({ name: 'Max', photoUrl: 'https://x.com/max.jpg', breed: '' })
    const id = getHuespedcitos()[0].id
    removeHuespedcito(id)
    expect(getHuespedcitos()).toHaveLength(0)
  })
})

describe('gallery', () => {
  it('starts empty', () => {
    expect(getGalleryPhotos()).toHaveLength(0)
  })

  it('adds a photo', () => {
    addGalleryPhoto({ url: 'https://x.com/p.jpg', caption: 'Fun day' })
    expect(getGalleryPhotos()[0].caption).toBe('Fun day')
  })

  it('removes a photo', () => {
    addGalleryPhoto({ url: 'https://x.com/p.jpg', caption: '' })
    const id = getGalleryPhotos()[0].id
    removeGalleryPhoto(id)
    expect(getGalleryPhotos()).toHaveLength(0)
  })
})
