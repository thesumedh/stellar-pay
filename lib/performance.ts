// Performance optimizations for StellarPay

/**
 * Debounce function for search and filtering
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Memoization for expensive calculations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

/**
 * Lazy loading for components
 */
export const lazyLoad = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc)
}

/**
 * Virtual scrolling for large lists
 */
export class VirtualScroller {
  private itemHeight: number
  private containerHeight: number
  private scrollTop: number = 0

  constructor(itemHeight: number, containerHeight: number) {
    this.itemHeight = itemHeight
    this.containerHeight = containerHeight
  }

  getVisibleRange(totalItems: number): { start: number; end: number } {
    const start = Math.floor(this.scrollTop / this.itemHeight)
    const visibleCount = Math.ceil(this.containerHeight / this.itemHeight)
    const end = Math.min(start + visibleCount + 1, totalItems)
    
    return { start: Math.max(0, start - 1), end }
  }

  updateScrollTop(scrollTop: number): void {
    this.scrollTop = scrollTop
  }
}

/**
 * Image optimization and lazy loading
 */
export const optimizeImage = (src: string, width?: number, height?: number): string => {
  if (!src) return ''
  
  // For production, integrate with image optimization service
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('q', '80') // Quality
  
  return `${src}?${params.toString()}`
}

/**
 * Bundle splitting and code optimization
 */
export const preloadRoute = (route: string): void => {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = route
  document.head.appendChild(link)
}

/**
 * Service Worker for caching
 */
export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration)
      })
      .catch(error => {
        console.log('SW registration failed:', error)
      })
  }
}