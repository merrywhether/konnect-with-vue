<script lang="ts" setup>
import { ref, inject, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { CoreBox } from '#core'
import { MODAL_APP_ROOT_KEY } from './plugin'
import { useSwipeToDismiss } from './useSwipeToDismiss'

const props = defineProps<{
  open: boolean
  labelledBy: string
  width?: string
}>()

const emit = defineEmits<{
  close: []
  afterLeave: []
}>()

const contentEl = ref<HTMLElement | null>(null)

let previouslyFocused: HTMLElement | null = null

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusable(): HTMLElement[] {
  if (!contentEl.value) return []
  return Array.from(
    contentEl.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  )
}

function focusFirstElement() {
  const focusable = getFocusable()
  if (focusable.length > 0) {
    focusable[0].focus()
  } else if (contentEl.value) {
    // Fallback: focus the content container itself, then remove tabindex so it
    // doesn't persist in the tab order after the modal closes.
    contentEl.value.setAttribute('tabindex', '-1')
    contentEl.value.focus()
    contentEl.value.removeAttribute('tabindex')
  }
}

const appRoot = inject(MODAL_APP_ROOT_KEY, null)

// Setting `inert` on the app root prevents focus, clicks, and AT interaction
// with everything behind the modal — native browser behavior, no JS trap needed.
function setAppInert(value: boolean) {
  appRoot?.toggleAttribute('inert', value)
}

const {
  dragOffsetY,
  suppressTransition,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  reset: resetSwipe,
} = useSwipeToDismiss(contentEl, () => emit('close'))

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return

  if (e.key === 'Escape') {
    emit('close')
    return
  }

  if (e.key === 'Tab') {
    const focusable = getFocusable()
    e.preventDefault()
    if (focusable.length === 0) return
    // Take full ownership of Tab so Safari (which skips checkboxes/buttons by
    // default) and Chrome both cycle through the same complete focusable set.
    const current = focusable.indexOf(
      document.activeElement as HTMLElement,
    )
    if (e.shiftKey) {
      const prev =
        current <= 0
          ? focusable[focusable.length - 1]
          : focusable[current - 1]
      prev.focus()
    } else {
      const next =
        current >= focusable.length - 1
          ? focusable[0]
          : focusable[current + 1]
      next.focus()
    }
  }
}

watch(
  () => props.open,
  (val) => {
    if (val) {
      previouslyFocused = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      setAppInert(true)
      nextTick(() => {
        resetSwipe()
        focusFirstElement()
      })
    } else {
      document.body.style.overflow = ''
      setAppInert(false)
      if (previouslyFocused) {
        nextTick(() => {
          previouslyFocused?.focus()
          previouslyFocused = null
        })
      }
    }
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  setAppInert(false)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      name="modal"
      @after-leave="emit('afterLeave')"
    >
      <div
        v-if="open"
        :aria-labelledby="labelledBy"
        aria-modal="true"
        class="modal-backdrop"
        role="dialog"
        @click.self="emit('close')"
      >
        <CoreBox
          bg="bgPrimary"
          class="modal-content"
          :class="{ 'no-transition': suppressTransition }"
          radius="sm"
          :style="
            dragOffsetY > 0
              ? { transform: `translateY(${dragOffsetY}px)` }
              : undefined
          "
          :tabindex="-1"
          @touchend="onTouchEnd"
          @touchmove="onTouchMove"
          @touchstart.passive="onTouchStart"
        >
          <div class="sheet-handle-area">
            <div class="sheet-handle" />
          </div>
          <div
            ref="contentEl"
            class="modal-body"
            :style="
              width ? { '--modal-body-width': width } : undefined
            "
          >
            <div
              v-if="$slots.title"
              class="modal-title-area"
            >
              <slot name="title" />
            </div>
            <slot />
            <div
              v-if="$slots.actions"
              class="modal-actions-area"
            >
              <slot name="actions" />
            </div>
          </div>
        </CoreBox>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-backdrop {
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    inset: 0;
    justify-content: center;
    position: fixed;
    z-index: 1000;
}

.modal-content {
    box-shadow: var(--shadow-modal);
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: auto;
    will-change: transform;
}

.sheet-handle-area {
    display: none;
}

.modal-body {
    max-width: 100%;
    padding: var(--spacing-xl);
    width: var(--modal-body-width, auto);
}

.modal-title-area {
    margin-bottom: var(--spacing-lg);
}

.modal-actions-area {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
    margin-top: var(--spacing-base);
}

/* Desktop transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-content {
    transform: translateY(16px);
}

.modal-leave-to .modal-content {
    transform: translateY(-8px);
}

/* ---- Mobile bottom-sheet mode ---- */
@media (max-width: $bp-sm) {
    .modal-backdrop {
        align-items: flex-end;
        /* Lift the sheet slightly off the bottom edge */
        padding-bottom: var(--spacing-sm);
    }

    .modal-content {
        border-radius: 12px;
        max-height: 85vh;
        max-width: none;
        min-height: 30vh;
        transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
        width: calc(100% - 16px);

        &.no-transition {
            transition: none;
        }
    }

    .modal-body {
        padding: var(--spacing-base);
        width: 100%;
        padding-bottom: calc(
            var(--spacing-base) + env(safe-area-inset-bottom, 0px)
        );

        /* Slot content can't overflow the sheet */
        :deep(> *) {
            max-width: 100%;
        }
    }

    .sheet-handle-area {
        align-items: center;
        cursor: grab;
        display: flex;
        justify-content: center;
        padding: var(--spacing-md) 0 var(--spacing-xs);
        touch-action: none;
        user-select: none;
    }

    .sheet-handle {
        background: #d0d0d0;
        border-radius: 3px;
        height: 5px;
        width: 36px;
    }

    /* Slide-up entrance */
    .modal-enter-from .modal-content {
        transform: translateY(100%);
    }

    .modal-enter-active .modal-content {
        transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* Slide-down exit */
    .modal-leave-to .modal-content {
        transform: translateY(100%);
    }

    .modal-leave-active .modal-content {
        transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
    }
}
</style>
