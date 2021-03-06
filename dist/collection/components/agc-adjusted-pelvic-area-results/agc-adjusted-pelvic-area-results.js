export class AgcAdjustedPelvicAreaResults {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.adjusted-pelvic-area" }, "Adjusted 365 Day Pelvic Area"),
                    h("span", { class: "agc-results__value" }, this.data['adjustedPelvicArea']),
                    h("sub", { "data-i18n": `units.pelvic-area.${this.data['units']['pelvicArea']}` }, this.data['units']['pelvicArea'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.adjustment" }, "Adjustment"),
                    h("span", { class: "agc-results__value" }, this.data['adjustment']),
                    h("sub", { "data-i18n": `units.pelvic-area.${this.data['units']['pelvicArea']}` }, this.data['units']['pelvicArea'])))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-adjusted-pelvic-area-results"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}
