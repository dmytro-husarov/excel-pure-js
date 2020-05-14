import {range} from '../../core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const rows = range(current.row, target.row)
    const cols = range(current.col, target.col)

    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {row, col}) {
    const MIN_VALUE_ROW = 1
    const MIN_VALUE_COL = 65
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case '`':
        case 'ArrowRight':
            col = String.fromCharCode(col.charCodeAt() + 1)
            break
        case 'ArrowLeft':
            col = col.charCodeAt() - 1 < MIN_VALUE_COL
                ? String.fromCharCode(MIN_VALUE_COL)
                : String.fromCharCode(col.charCodeAt() - 1)
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE_ROW ? MIN_VALUE_ROW : row - 1
            break
    }
    return `[data-id="${row}:${col}"]`
}
