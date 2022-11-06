import { InjectionKey } from 'vue'

export interface GlobalConfig {
  ElIcons: string[]
  optionsDicts?: (type?: string) => API.Options
  [x: string]: any
}

export const AppState: InjectionKey<GlobalConfig> = Symbol()

export interface SysProps {
  [x: string]: any
}

export const SysState: InjectionKey<SysProps> = Symbol()
