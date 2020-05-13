import ExcelComponent from '../../core/ExcelComponent'

class FormulaComponent extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        })
    }
    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }
    onInput(event) {
        console.log(this.$root);
        console.log('Formula: onInput', event.target.textContent.trim());
    }
    onClick(event) {
        console.log('Formula: onClick');
    }
}

export default FormulaComponent
