import type { App, InjectionKey } from 'vue'

export const MODAL_APP_ROOT_KEY: InjectionKey<HTMLElement> = Symbol('modalAppRoot')

export const modalsPlugin = {
  install(app: App, rootEl?: HTMLElement) {
    const el = rootEl ?? document.getElementById('app')
    if (el) app.provide(MODAL_APP_ROOT_KEY, el)
  },
}
