import Page from '../core/Page'
import {createStore} from '../core/createStore'
import {debounce, storage} from '../core/utils'
import {rootReducer} from '../redux/rootReducer'
import {normalizeInitialState} from '../redux/initialState'
import Excel from '../components/excel/Excel'
import HeaderComponent from '../components/header/HeaderComponent'
import TollbarComponent from '../components/toolbar/TollbarComponent'
import FormulaComponent from '../components/formula/FormulaComponent'
import TableComponent from '../components/table/TableComponent'

function storageName(param) {
    return 'excel:' + param
}

class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()
        const state = storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state))

        const stateListener = debounce(state => {
            storage(storageName(params), state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [
                HeaderComponent,
                TollbarComponent,
                FormulaComponent,
                TableComponent
            ],
            store
        })

        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy() {
        this.excel.destroy()
    }
}

export default ExcelPage
