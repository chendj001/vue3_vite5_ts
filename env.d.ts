import './auto-imports'
import './components'
declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite/client" />