import Excel from './components/excel/Excel'
import HeaderComponent from './components/header/HeaderComponent'
import TollbarComponent from './components/toolbar/TollbarComponent'
import FormulaComponent from './components/formula/FormulaComponent'
import TableComponent from './components/table/TableComponent'
import {createStore} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {storage, debounce} from './core/utils'
import {initialState} from './redux/initialState'

import './scss/index.scss'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [
        HeaderComponent,
        TollbarComponent,
        FormulaComponent,
        TableComponent
    ],
    store
})

excel.render()
