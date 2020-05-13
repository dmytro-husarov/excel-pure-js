import Excel from './components/excel/Excel'
import HeaderComponent from './components/header/HeaderComponent'
import TollbarComponent from './components/toolbar/TollbarComponent'
import FormulaComponent from './components/formula/FormulaComponent'
import TableComponent from './components/table/TableComponent'

import './scss/index.scss'

const excel = new Excel('#app', {
    components: [
        HeaderComponent,
        TollbarComponent,
        FormulaComponent,
        TableComponent
    ]
})

excel.render()
