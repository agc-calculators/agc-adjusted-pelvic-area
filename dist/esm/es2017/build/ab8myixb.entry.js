/*! Built with http://stenciljs.com */
import { h } from '../agc-adjusted-pelvic-area.core.js';

const validate = (form, name) => {
    let el = form.querySelector(`[name="${name}"]`);
    let message = form.querySelector(`[data-validates="${name}"`);
    if (!el.checkValidity()) {
        if (el.className.indexOf('invalid') === -1) {
            el.className += " invalid";
        }
        message.style.display = 'block';
        return false;
    }
    else {
        el.className = el.className.replace(" invalid", "");
        message.style.display = 'none';
    }
    return true;
};
const round = (num, places) => {
    return +(Math.round(new Number(`${num}e+${places}`).valueOf()) + "e-" + places);
};

class AgcAdjustedPelvicArea {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.units = { pelvicArea: 'cm2' };
        this.mode = 'step';
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-adjusted-pelvic-area", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.gender" }, "Gender"),
                        h("select", { name: "gender" },
                            h("option", { value: "male", "data-i18n": "options.gender.male" }, "Male"),
                            h("option", { value: "female", "data-i18n": "options.gender.female" }, "Female")),
                        h("p", { "data-i18n": "hints.gender" }, "\u2BA4 Select a gender.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.pelvic-area" }, "Pelvic Area Measurement"),
                        h("input", { name: "pelvicArea", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.pelvic-area.required", "data-validates": "pelvicArea" }, "Please enter a value."),
                        h("p", { "data-i18n": `hints.pelvic-area.${this.units['pelvicArea']}` },
                            "\u2BA4 Enter the actual pelvic area measurement in cm",
                            h("sup", null, "2"),
                            ".")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.age" }, "Current Age"),
                        h("input", { name: "age", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.age.required", "data-validates": "age" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.age" }, "\u2BA4 Enter the current age in days."),
                        h("p", { "data-i18n": "hints.age.range" }, "\uD83D\uDEC8 Most accurate results occur in a range of 160 - 440 days.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'pelvicArea')) {
                valid = false;
            }
        }
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'age')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache['sections'].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        const adjustments = {
            'male': 0.25,
            'female': 0.27
        };
        let gender = this.form.querySelector('[name="gender"').value;
        let pelvicArea = round(this.form.querySelector('[name="pelvicArea"]').value, 2);
        let age = parseInt(this.form.querySelector('[name="age"]').value);
        let adjustment = round(adjustments[gender] * (365 - age * 1), 2);
        let adjustedPelvicArea = round(pelvicArea * 1 + adjustment, 2);
        let results = {
            socket: this.socket,
            tract: this.tract,
            gender,
            pelvicArea,
            age,
            adjustment,
            adjustedPelvicArea,
            units: this.units
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.form.querySelector('[name="gender"]').options[1].defaultSelected = true;
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-adjusted-pelvic-area"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}

export { AgcAdjustedPelvicArea };
