import ExcelComponent from '../../core/ExcelComponent'
import {createTable} from './table.template'

class TableComponent extends ExcelComponent {
    static className = 'excel__table'

    toHTML() {
        return createTable(20)
    }
}

export default TableComponent
