/*!
 * 匿龙组件库 @nyloong/components v0.2.0
 * (c) 2023-2024 猛火Fierflame
 * @license MIT
 */
declare class Breadcrumb extends HTMLElement {
    static observedAttributes: string[];
    set separator(separator: string | null);
    /**
     * 分隔符
     * @type {string | null}
     */
    get separator(): string | null;
    connectedCallback(): void;
    /**
     * @param {string} attrName
     * @param {string | null} oldVal
     * @param {string | null} newVal
     * @returns {void}
     */
    attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void;
    #private;
}

export { Breadcrumb as default };
