/*!
 * hcg-color-picker — TypeScript declarations
 * https://github.com/html-code-generator/hcg-color-picker
 */

// -- Color output object returned by getColor() / onChange -------

export interface HcgColorSet {
    /** 6-digit HEX, no alpha  — e.g. "#ff0000"          */
    hex:  string;
    /** 8-digit HEX with alpha — e.g. "#ff0000ff"         */
    hexa: string;
    /** e.g. "rgb(255, 0, 0)"                             */
    rgb:  string;
    /** e.g. "rgba(255, 0, 0, 1)"                         */
    rgba: string;
    /** e.g. "hsl(0, 100%, 50%)"                          */
    hsl:  string;
    /** e.g. "hsla(0, 100%, 50%, 1)"                      */
    hsla: string;
}

// -- Source string passed as second arg to onChange --------------

export type HcgColorSource =
    | 'drag'        // dragging the color box, hue or alpha slider
    | 'input'       // typing into HEX / RGBA / HSLA inputs
    | 'api'         // calling .setColor() programmatically
    | 'eyedropper'; // picking with the EyeDropper API

// -- Callback types ----------------------------------------------

export type HcgChangeCallback = (colors: HcgColorSet, source: HcgColorSource) => void;
export type HcgOpenCallback   = (hex: string) => void;
export type HcgCloseCallback  = (hex: string) => void;

// -- Constructor options -----------------------------------------

export interface HcgColorOptions {
    /** Initial color — HEX, RGB, or HSL format. Defaults to '#ff0000'. */
    color?:    string;
    /** Shorthand change callback — same as .on('change', fn). */
    onChange?: HcgChangeCallback;
    /** Shorthand open callback — same as .on('open', fn). */
    onOpen?:   HcgOpenCallback;
    /** Shorthand close callback — same as .on('close', fn). */
    onClose?:  HcgCloseCallback;
    /** Enable alpha / opacity control. Default: true. */
    alpha?:    boolean;
    /** Debounce the change event by this many ms (0 = off). Default: 0. */
    debounce?: number;
    /** Start in disabled state. Also reads element.disabled. Default: false. */
    disabled?: boolean;
}

// -- Main class --------------------------------------------------

export declare class hcgColor {
    constructor(element: HTMLElement, options?: HcgColorOptions);

    /** True if this picker is currently open. */
    readonly isOpen: boolean;

    // - Event subscription --------------------------------------

    on(event: 'change', callback: HcgChangeCallback): this;
    on(event: 'open',   callback: HcgOpenCallback):   this;
    on(event: 'close',  callback: HcgCloseCallback):  this;

    off(event: 'change', callback: HcgChangeCallback): this;
    off(event: 'open',   callback: HcgOpenCallback):   this;
    off(event: 'close',  callback: HcgCloseCallback):  this;

    // - Color API ------------------------------------------------

    /** Set the color programmatically. Fires the change event. */
    setColor(color: string): this;

    /** Returns the current color in all formats. */
    getColor(): HcgColorSet;

    /** Show or hide the alpha slider at runtime. */
    setAlphaEnabled(enabled: boolean): this;

    // - Open / close --------------------------------------------

    /** Programmatically open the picker. No-op if disabled. */
    open(): this;

    /** Programmatically close the picker. */
    close(): this;

    // - Enable / disable ----------------------------------------

    /** Re-enable a previously disabled picker. */
    enable(): this;

    /** Prevent the picker from opening on click. */
    disable(): this;

    // - Cleanup -------------------------------------------------

    /** Remove the instance, clean up all listeners and state. */
    destroy(): void;
}

export default hcgColor;
