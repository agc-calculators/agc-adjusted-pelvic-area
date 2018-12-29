/*! Built with http://stenciljs.com */
import { h } from '../agc-adjusted-pelvic-area.core.js';

class AgcAdjustedPelvicAreaResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.adjusted-pelvic-area" }, "Adjusted 365 Day Pelvic Area"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.adjustment" }, "Adjustment"),
                    placeholder()))));
    }
    static get is() { return "agc-adjusted-pelvic-area-results-placeholder"; }
}

export { AgcAdjustedPelvicAreaResultsPlaceholder };
