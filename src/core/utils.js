export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export function range(start, end) {
    if (isNaN(start)) {
        if (start.charCodeAt() > end.charCodeAt()) {
            [end, start] = [start, end]
        }
        return new Array(end.charCodeAt() - start.charCodeAt() + 1)
            .fill('')
            .map((_, index) => String.fromCharCode(start.charCodeAt() + index))
    } else {
        if (start > end) {
            [end, start] = [start, end]
        }

        return new Array(end - start + 1)
            .fill('')
            .map((_, index) => start + index)
    }
}
