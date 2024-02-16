/*!
 * 匿龙组件库 @nyloong/components v0.2.0
 * (c) 2023-2024 猛火Fierflame
 * @license MIT
 */
declare class MovableArea extends HTMLElement {
    /**
     *
     * @param {import('./index.mjs').Interface} o
     * @returns {() => void}
     */
    register(o: Interface): () => void;
    /**
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * @returns {void}
     */
    adoptedCallback(): void;
    #private;
}

declare class MovableTarget extends HTMLElement {
    /**
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * @returns {void}
     */
    disconnectedCallback(): void;
    #private;
}

type Interface = {
    match: (e: EventTarget[]) => boolean | null;
    resize: (width: number, height: number) => void;
    touchBegin: (id: number, x: number, y: number) => boolean | null;
    touchMove: (id: number, x: number, y: number) => void;
    touchEnd: (id: number) => void;
    mouseBegin: (x: number, y: number, keys: number) => boolean | null;
    mouseMove: (x: number, y: number, keys: number) => void;
    mouseEnd: () => void;
    wheel: (deltaMode: number, deltaX: number, deltaY: number, pageX: number, pageY: number) => void;
};
declare namespace Movable {
    type Area = MovableArea;
    type Target = MovableTarget;
}
declare class Movable extends HTMLElement {
    static get Area(): typeof MovableArea;
    static get Target(): typeof MovableTarget;
    set inertia(v: boolean);
    /**
     * 是否拥有惯性
     * @type {boolean}
     */
    get inertia(): boolean;
    set touchCapture(v: boolean);
    /**
     * 触屏是否捕获
     * @type {boolean}
     */
    get touchCapture(): boolean;
    set touchMovable(v: boolean);
    /**
     * 是否支持触屏移动
     * @type {boolean}
     */
    get touchMovable(): boolean;
    set touchScalable(v: boolean);
    /**
     * 是否支持触屏缩放
     * @type {boolean}
     */
    get touchScalable(): boolean;
    set rollerMovable(v: boolean);
    /**
     * 是否支持鼠标滚论移动
     * @type {boolean}
     */
    get rollerMovable(): boolean;
    set rollerMovableCapture(v: boolean);
    /**
     * 鼠标滚论移动是否捕获
     * @type {boolean}
     */
    get rollerMovableCapture(): boolean;
    set rollerScalable(v: boolean);
    /**
     * 是否支持鼠标滚论缩放
     * @type {boolean}
     */
    get rollerScalable(): boolean;
    set leftMouseMovable(v: boolean);
    /**
     * 是否支持鼠标左键移动
     * @type {boolean}
     */
    get leftMouseMovable(): boolean;
    set leftMouseMovableCapture(v: boolean);
    /**
     * 鼠标左键移动是否捕获
     * @type {boolean}
     */
    get leftMouseMovableCapture(): boolean;
    set autoAdaptively(v: boolean);
    /**
     * 是否自动自适应
     * @type {boolean}
     */
    get autoAdaptively(): boolean;
    set global(v: boolean);
    /**
     * 是否在整个 `<nl-movable-area>` 区域内操作都有效
     * @type {boolean}
     */
    get global(): boolean;
    /**
     *
     * @param {EventTarget} o
     * @returns {() => void}
     */
    register(o: EventTarget): () => void;
    /**
     * 自适应
     * @returns {void}
     */
    adaptively(): void;
    /**
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * @returns {void}
     */
    adoptedCallback(): void;
    #private;
}

export { Interface, Movable, Movable as default };
