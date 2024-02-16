/*!
 * 匿龙组件库 @nyloong/components v0.2.0
 * (c) 2023-2024 猛火Fierflame
 * @license MIT
 */
declare class Angle extends HTMLElement {
    /** @readonly */
    static readonly formAssociated: true;
    /**
     * @param {number | string | null} [v]
     */
    set value(v: number);
    /** @type {number} */
    get value(): number;
    connectedCallback(): void;
    #private;
}

export { Angle as default };
