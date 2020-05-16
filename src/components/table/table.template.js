import {toInlineStyles} from '../../core/utils'
import {defaultStyles} from '../../constants'
import {parse} from '../../core/parse'

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, col) {
    return (state[col] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, row) {
    return (state[row] || DEFAULT_HEIGHT) + 'px'
}
function toCell(row) {
    return function({char, index, size, state}) {
        const id = `${row + 1}:${char}`
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })

        return `
        <div
            class="cell"
            contenteditable
            data-col="${index}"
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles};width: ${size}"
        >
            ${parse(data) || ''}
        </div>
        `
    }
}
function toColum({char, index, size}) {
    return `
    <div
        class="column"
        data-type="resizable"
        data-col="${index}"
        data-name="${char}"
        style="width: ${size}"
    >
        ${char}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}
function createRow(state, content, index = '') {
    const size = getHeight(state.cellSizeState, index)
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''

    return `
    <div
        class="row"
        data-type="resizable"
        data-row="${index}"
        data-name="${index}"
        style="height: ${size}"
    >
        <div class="row-info">
            ${index}
            ${resize}
        </div>
        <div class="row-data">${content}</div>    
    </div>
    `
}
function withWidthFrom(state) {
    return function(_, index) {
        const char = String.fromCharCode(CODES.A + index)

        return {
            char, index, size: getWidth(state.cellSizeState, char), state
        }
    }
}
export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(withWidthFrom(state))
        .map(toColum)
        .join('')

    rows.push(createRow(state, cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(withWidthFrom(state))
        .map(toCell(row))
        .join('')

        rows.push(createRow(state, cells, row + 1))
    }

    return rows.join('')
}
