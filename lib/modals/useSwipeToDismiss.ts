import { ref, type Ref } from 'vue'

const NARROW_BREAKPOINT = 768
const DISMISS_VELOCITY_THRESHOLD = 0.5 // px/ms
const DISMISS_FLICK_MIN_OFFSET = 50 // px

export function useSwipeToDismiss(
  contentEl: Ref<HTMLElement | null>,
  onDismiss: () => void,
) {
  const isDragging = ref(false)
  const dragOffsetY = ref(0)
  const dragStartY = ref(0)
  const dragStartTime = ref(0)
  const suppressTransition = ref(false)

  function isNarrow() {
    return window.innerWidth <= NARROW_BREAKPOINT
  }

  function isScrolledToTop() {
    return !contentEl.value || contentEl.value.scrollTop <= 0
  }

  function onTouchStart(e: TouchEvent) {
    if (!isNarrow()) return

    const target = e.target as HTMLElement
    const isHandle = target.closest('.sheet-handle-area') !== null
    if (!isHandle && !isScrolledToTop()) return

    isDragging.value = true
    suppressTransition.value = true
    dragStartY.value = e.touches[0].clientY
    dragOffsetY.value = 0
    dragStartTime.value = Date.now()
  }

  function onTouchMove(e: TouchEvent) {
    if (!isDragging.value) return

    const delta = e.touches[0].clientY - dragStartY.value
    if (delta < 0) {
      dragOffsetY.value = 0
      return
    }

    dragOffsetY.value = delta
    e.preventDefault()
  }

  function onTouchEnd() {
    if (!isDragging.value) return

    isDragging.value = false
    suppressTransition.value = false

    const elapsed = Date.now() - dragStartTime.value
    const velocity = dragOffsetY.value / Math.max(elapsed, 1)
    const threshold = window.innerHeight * 0.3
    const isFlick = velocity > DISMISS_VELOCITY_THRESHOLD && dragOffsetY.value > DISMISS_FLICK_MIN_OFFSET

    if (dragOffsetY.value > threshold || isFlick) {
      dragOffsetY.value = window.innerHeight
      // Fire dismiss early so the backdrop fade (200ms) overlaps the card slide (250ms).
      // dragOffsetY is intentionally left at innerHeight — reset() clears it on next open
      // once the leave transition has fully removed the element.
      setTimeout(onDismiss, 50)
    } else {
      dragOffsetY.value = 0
    }
  }

  function reset() {
    dragOffsetY.value = 0
    isDragging.value = false
    suppressTransition.value = false
  }

  return { dragOffsetY, suppressTransition, onTouchStart, onTouchMove, onTouchEnd, reset }
}
