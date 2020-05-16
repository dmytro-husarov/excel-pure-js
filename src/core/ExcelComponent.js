import DOMListener from './DOMListener'

class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []
        this.prepare()
    }

    prepare() {}
    toHTML() {
        return ''
    }
    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }
    $on(eventName, fn) {
        const unsub = this.emitter.subscribe(eventName, fn)
        this.unsubscribers.push(unsub)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    storeChanged() {}
    isWatching(key) {
        return this.subscribe.includes(key)
    }
    init() {
        this.initDOMListeners()
    }
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}

export default ExcelComponent
