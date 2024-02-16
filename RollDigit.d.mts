/*!
 * 匿龙组件库 @nyloong/components v0.2.0
 * (c) 2023-2024 猛火Fierflame
 * @license MIT
 */
/**
 * 数字滚动组件
 * 不支持 CSS `writing-mode`
 */
declare class RollDigit extends HTMLElement {
    static observedAttributes: string[];
    /** @type {number | string | null | undefined} */
    set digit(digit: number);
    /**
     * 显示的数字
     * @type {number}
     */
    get digit(): number;
    connectedCallback(): void;
    /**
     * @param {string} attrName
     * @param {string | null} oldVal
     * @param {string | null} newVal
     * @returns {void}
     * @protected
     */
    protected attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void;
    #private;
}

export { RollDigit as default };
