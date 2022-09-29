import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import useAppStore from './appStore'
import usePublicStore from './publicStore'

const pinia = createPinia()
pinia.use(piniaPersist)

export { useAppStore, usePublicStore }
export default pinia
