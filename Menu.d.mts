/*!
 * 匿龙组件库 @nyloong/components v0.2.0
 * (c) 2023-2024 猛火Fierflame
 * @license MIT
 */
declare class Menu extends HTMLElement {
    static observedAttributes: string[];
    close(): void;
    show(): void;
    set open(open: boolean);
    get open(): boolean;
    set disabled(disabled: boolean);
    get disabled(): boolean;
    set modal(modal: boolean);
    get modal(): boolean;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set target(target: string | null);
    get target(): string | null;
    set direction(v: string[]);
    get direction(): string[];
    set align(v: string[]);
    get align(): string[];
    set targetElement(el: Element | null);
    get targetElement(): Element | null;
    get parentMenu(): Menu | null;
    update(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} attrName
     * @param {string | null} oldVal
     * @param {string | null} newVal
     * @returns {void}
     */
    attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void;
    #private;
}

export { Menu as default };
