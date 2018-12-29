/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface AgcAdjustedPelvicAreaProgress {
    'socket': string;
  }
  interface AgcAdjustedPelvicAreaProgressAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcAdjustedPelvicAreaResultsPlaceholder {}
  interface AgcAdjustedPelvicAreaResultsPlaceholderAttributes extends StencilHTMLAttributes {}

  interface AgcAdjustedPelvicAreaResults {
    'socket': string;
  }
  interface AgcAdjustedPelvicAreaResultsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcAdjustedPelvicArea {
    'mode': 'full' | 'step';
    'socket': string;
    'tract': string;
    'units': any;
  }
  interface AgcAdjustedPelvicAreaAttributes extends StencilHTMLAttributes {
    'mode'?: 'full' | 'step';
    'onAgcCalculated'?: (event: CustomEvent) => void;
    'onAgcStepChanged'?: (event: CustomEvent) => void;
    'socket'?: string;
    'tract'?: string;
    'units'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AgcAdjustedPelvicAreaProgress': Components.AgcAdjustedPelvicAreaProgress;
    'AgcAdjustedPelvicAreaResultsPlaceholder': Components.AgcAdjustedPelvicAreaResultsPlaceholder;
    'AgcAdjustedPelvicAreaResults': Components.AgcAdjustedPelvicAreaResults;
    'AgcAdjustedPelvicArea': Components.AgcAdjustedPelvicArea;
  }

  interface StencilIntrinsicElements {
    'agc-adjusted-pelvic-area-progress': Components.AgcAdjustedPelvicAreaProgressAttributes;
    'agc-adjusted-pelvic-area-results-placeholder': Components.AgcAdjustedPelvicAreaResultsPlaceholderAttributes;
    'agc-adjusted-pelvic-area-results': Components.AgcAdjustedPelvicAreaResultsAttributes;
    'agc-adjusted-pelvic-area': Components.AgcAdjustedPelvicAreaAttributes;
  }


  interface HTMLAgcAdjustedPelvicAreaProgressElement extends Components.AgcAdjustedPelvicAreaProgress, HTMLStencilElement {}
  var HTMLAgcAdjustedPelvicAreaProgressElement: {
    prototype: HTMLAgcAdjustedPelvicAreaProgressElement;
    new (): HTMLAgcAdjustedPelvicAreaProgressElement;
  };

  interface HTMLAgcAdjustedPelvicAreaResultsPlaceholderElement extends Components.AgcAdjustedPelvicAreaResultsPlaceholder, HTMLStencilElement {}
  var HTMLAgcAdjustedPelvicAreaResultsPlaceholderElement: {
    prototype: HTMLAgcAdjustedPelvicAreaResultsPlaceholderElement;
    new (): HTMLAgcAdjustedPelvicAreaResultsPlaceholderElement;
  };

  interface HTMLAgcAdjustedPelvicAreaResultsElement extends Components.AgcAdjustedPelvicAreaResults, HTMLStencilElement {}
  var HTMLAgcAdjustedPelvicAreaResultsElement: {
    prototype: HTMLAgcAdjustedPelvicAreaResultsElement;
    new (): HTMLAgcAdjustedPelvicAreaResultsElement;
  };

  interface HTMLAgcAdjustedPelvicAreaElement extends Components.AgcAdjustedPelvicArea, HTMLStencilElement {}
  var HTMLAgcAdjustedPelvicAreaElement: {
    prototype: HTMLAgcAdjustedPelvicAreaElement;
    new (): HTMLAgcAdjustedPelvicAreaElement;
  };

  interface HTMLElementTagNameMap {
    'agc-adjusted-pelvic-area-progress': HTMLAgcAdjustedPelvicAreaProgressElement
    'agc-adjusted-pelvic-area-results-placeholder': HTMLAgcAdjustedPelvicAreaResultsPlaceholderElement
    'agc-adjusted-pelvic-area-results': HTMLAgcAdjustedPelvicAreaResultsElement
    'agc-adjusted-pelvic-area': HTMLAgcAdjustedPelvicAreaElement
  }

  interface ElementTagNameMap {
    'agc-adjusted-pelvic-area-progress': HTMLAgcAdjustedPelvicAreaProgressElement;
    'agc-adjusted-pelvic-area-results-placeholder': HTMLAgcAdjustedPelvicAreaResultsPlaceholderElement;
    'agc-adjusted-pelvic-area-results': HTMLAgcAdjustedPelvicAreaResultsElement;
    'agc-adjusted-pelvic-area': HTMLAgcAdjustedPelvicAreaElement;
  }


}
