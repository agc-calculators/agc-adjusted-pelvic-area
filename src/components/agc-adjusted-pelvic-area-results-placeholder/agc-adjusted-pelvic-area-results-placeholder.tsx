
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-adjusted-pelvic-area-results-placeholder'
})
export class AgcAdjustedPelvicAreaResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.adjusted-pelvic-area">Adjusted 365 Day Pelvic Area</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.adjustment">Adjustment</h2>
                        {placeholder()}
                    </li>                                       
                </ul>
            </section>
        );
    }
}