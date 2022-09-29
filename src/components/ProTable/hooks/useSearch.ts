import { ColumnProps, SearchParams } from '../types'

const useSearch = (columns: Partial<ColumnProps>[], span?: number) => {
  const state = reactive<SearchParams>({
    expand: false,
    searchColumns: [],
    searchModel: {}
  })

  const expandCount = computed((): number => 24 / span!)

  const initSearch = () => {
    state.searchModel = {}
    state.searchColumns = []

    state.searchColumns = columns.filter((item) => item.showInSearch)
    state.searchColumns.forEach((item) => {
      state.searchModel[item.prop!] = item.searchValue ? item.searchValue : item.value
    })
  }

  return {
    ...toRefs(state),
    expandCount,
    initSearch
  }
}

export default useSearch
