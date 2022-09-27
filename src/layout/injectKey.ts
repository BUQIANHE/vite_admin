import { ComputedRef, InjectionKey } from 'vue'

export interface asideMenuState {
  activeClr: ComputedRef<string>
  isCollapse: ComputedRef<boolean>
  menuList: ComputedRef<API.MenuListItem[]>
}

export const menuStatus: InjectionKey<asideMenuState> = Symbol()
