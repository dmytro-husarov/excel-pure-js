import ExcelComponent from './ExcelComponent'

class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args)
    }

    get template() {
        return JSON.stringify(this.state, null, 4)
    }
    initState(initialState = {}) {
        this.state = {...initialState}
    }
    setState(newState) {
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)
    }
}

export default ExcelStateComponent
