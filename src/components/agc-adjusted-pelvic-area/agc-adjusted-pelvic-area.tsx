
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { round, validate } from '../../utils'

@Component({
    tag: 'agc-adjusted-pelvic-area'
})
export class AgcAdjustedPelvicArea {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() units: any = { pelvicArea: 'cm2' }
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-adjusted-pelvic-area" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.gender">Gender</label>
                            <select name="gender">
                                <option value="male" data-i18n="options.gender.male">Male</option>
                                <option value="female" data-i18n="options.gender.female">Female</option>
                            </select>
                            <p data-i18n="hints.gender">⮤ Select a gender.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.pelvic-area">Pelvic Area Measurement</label>
                            <input name="pelvicArea" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.pelvic-area.required" data-validates="pelvicArea">Please enter a value.</p>
                            <p data-i18n={`hints.pelvic-area.${this.units['pelvicArea']}`}>⮤ Enter the actual pelvic area measurement in cm<sup>2</sup>.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.age">Current Age</label>
                            <input name="age" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.age.required" data-validates="age">Please enter a value.</p>
                            <p data-i18n="hints.age">⮤ Enter the current age in days.</p>
                            <p data-i18n="hints.age.range">🛈 Most accurate results occur in a range of 160 - 440 days.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'pelvicArea')) {
                valid = false
            }
        }

        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'age')) {
                valid = false
            }
        }        

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        const adjustments = {
            'male': 0.25,
            'female': 0.27
        }

        let gender =  (this.form.querySelector('[name="gender"') as HTMLSelectElement).value;
        let pelvicArea= round((this.form.querySelector('[name="pelvicArea"]') as HTMLInputElement).value, 2);
        let age = parseInt((this.form.querySelector('[name="age"]') as HTMLInputElement).value)
        let adjustment = round(adjustments[gender] * (365 - age * 1), 2)
        let adjustedPelvicArea = round(pelvicArea * 1 + adjustment, 2)

        let results = {
            socket: this.socket,
            tract: this.tract,
            gender,
            pelvicArea,
            age,
            adjustment,
            adjustedPelvicArea,
            units: this.units
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        (this.form.querySelector('[name="gender"]') as HTMLSelectElement).options[1].defaultSelected = true

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}