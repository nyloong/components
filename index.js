(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NyLoongComponents = {}));
})(this, (function (exports) { 'use strict';

	/*!
	 * 匿龙组件库 @nyloong/components v0.2.0
	 * (c) 2023-2024 猛火Fierflame
	 * @license MIT
	 */
	const style$5 = `\
:host {
	display: inline-block;
	color: #000;
	margin: auto;
	position: relative;
	border-radius: 100%;
	border: 1px solid;
	width: 1em;
	height: 1em;
}
:host([hidden]) {
	display: none;
}
div {
	height: 1px;
	width: 50%;
	position: absolute;
	background: currentColor;
	margin: auto 0 auto auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	transform-origin: left;
}
`;
	class Angle extends HTMLElement {
		/** @readonly */
		static formAssociated = true;
		/** @readonly */
		#printer = document.createElement('div');
		/** @readonly */
		#internals = this.attachInternals();
		constructor() {
			super();
			const root = this.attachShadow({mode: 'closed'});
			root.appendChild(document.createElement('style')).textContent = style$5;
			root.appendChild(this.#printer);
			/**
			 *
			 * @param {PointerEvent} event
			 * @returns {void}
			 */
			const onTouch = event => {
				if (!(event.buttons & 1)) { return; }
				const { left, width, top, height } = this.getBoundingClientRect();
				const x = event.clientX - left - width / 2;
				const y = event.clientY - top - height / 2;
				const value = Math.atan2(y, x) / Math.PI * 180;
				this.value = Math.round(value);
				this.dispatchEvent(new InputEvent('input'));
				this.dispatchEvent(new InputEvent('change'));
			};
			this.addEventListener('pointerdown', onTouch);
			this.addEventListener('pointermove', onTouch);
			this.value = this.getAttribute('value');
		}
		#value = 0;
		/** @type {number} */
		get value() {
			return this.#value;
		}
		/**
		 * @param {number | string | null} [v]
		 */
		set value(v) {
			const a = parseInt(String(v));
			if (!Number.isFinite(a)) { return; }
			this.#value = a;
			this.#printer.style.transform = `rotate(${a}deg)`;
			this.#internals.setFormValue(String(a));
		}
		connectedCallback() {
			if (this.getAttribute('tabindex') === null) {
				this.setAttribute('tabindex', '0');
			}
		}
	}

	customElements.define('nl-angle', Angle);

	/*!
	 * 匿龙组件库 @nyloong/components v0.2.0
	 * (c) 2023-2024 猛火Fierflame
	 * @license MIT
	 */
	const style$4 = `::slotted(*)::after {content: var(--nl-breadcrumb-separator, ' / ');}`;
	const styleOfLast = `::slotted(:last-child)::after {content: none}`;

	class Breadcrumb extends HTMLElement {
		static observedAttributes = ['separator'];
		#style = document.createElement('style');
		/**
		 *
		 * @param {string | null} newVal
		 * @returns {void}
		 */
		#separator(newVal) {
			if (newVal === null) {
				this.#style.textContent = '';
				return;
			}
			const content = JSON.stringify(newVal);
			const style = `::slotted(*)::after {content: ${content}; }`;
			this.#style.textContent = style;
		}
		constructor() {
			super();
			const shadow = this.attachShadow({mode:'closed'});
			shadow.appendChild(document.createElement('style'))
				.textContent = style$4;
			shadow.appendChild(this.#style);
			shadow.appendChild(document.createElement('style'))
				.textContent = styleOfLast;
			shadow.appendChild(document.createElement('slot'));
		}
		/**
		 * 分隔符
		 * @type {string | null}
		 */
		get separator() { return this.getAttribute('separator'); }
		set separator(separator) {
			if (separator === undefined || separator === null) {
				this.removeAttribute('separator');
			} else {
				this.setAttribute('separator', separator);
			}
		}
		connectedCallback() {
			this.#separator(this.separator);
		}
		/**
		 * @param {string} attrName
		 * @param {string | null} oldVal
		 * @param {string | null} newVal
		 * @returns {void}
		 */
		attributeChangedCallback(attrName, oldVal, newVal) {
			if (oldVal === newVal) { return; }
			switch (attrName) {
				case 'separator': {
					this.#separator(newVal);
					break;
				}
			}
		}
	}

	customElements.define('nl-breadcrumb', Breadcrumb);

	/*!
	 * 匿龙组件库 @nyloong/components v0.2.0
	 * (c) 2023-2024 猛火Fierflame
	 * @license MIT
	 */
	const style$3 = `
:host {
	display: contexts;
}
div {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	align-items: stretch;
}
div[hidden] {
	display: none;
}
div slot {
	display: inline;
	flex: 1;
}
div::after {
	content: '';
	width: 0;
	height: 0;
	box-sizing: content-box;
	border: transparent solid 0.3em;
	border-inline-start-color: currentColor;
	margin: auto;
	margin-inline-start: 0.3em;
}
dialog {
	position: fixed;
	margin: 0;
	box-sizing: border-box;
	max-width: calc(100% - 36px);
	max-height: calc(100% - 36px);
	user-select: none;
	padding: .2em;
	border: 1px solid;
	outline: none;
}
div, dialog ::slotted(*) {
	color: var(--nyloong-menu-fg, #000);
	background: var(--nyloong-menu-bg, #FFF);
}
div.open, div:hover, div:focus, dialog ::slotted(:hover), dialog ::slotted(:focus) {
	color: var(--nyloong-menu-fg-highlight, #000);
	background: var(--nyloong-menu-bg-highlight, #6666);
}
:host([disabled]) div, dialog ::slotted([disabled]) {
	color: var(--nyloong-menu-fg-disabled, #AAA);
	background: var(--nyloong-menu-bg-disabled, #FFF);
}

dialog::backdrop {
	background: transparent;
}
`;

	const openMenus = new Set();
	document.addEventListener('pointerdown', e => {
		if (!e.isPrimary) { return; }
		const els = new Set(e.composedPath());
		for (const menu of [...openMenus]) {
			if (els.has(menu)) { continue; }
			menu.close();
		}
	});
	const verticalWritingMode = new Set([
		'vertical-lr', 'vertical-rl', 'sideways-lr', 'sideways-rl',
	]);

	const hasPopover = typeof HTMLElement.prototype.showPopover === 'function';
	/**
	 *
	 * @param {object} option
	 * @param {number} option.left
	 * @param {number} option.top
	 * @param {number} option.width
	 * @param {number} option.height
	 * @param {boolean} rowVertical
	 * @param {boolean} rowReverse
	 * @param {boolean} colReverse
	 * @returns {[[number, number, number], [number, number, number]]}
	 */
	function getSize({left, top, width, height}, rowVertical, rowReverse, colReverse) {
		const right = window.innerWidth - left - width;
		const bottom = window.innerHeight - top - height;
		/** @type {[[number, number, number], [number, number, number]]} */
		const size = [
			[left, width, right],
			[top, height, bottom],
		];
		if (rowVertical) { size.reverse(); }
		if (rowReverse) { size[1].reverse(); }
		if (colReverse) { size[0].reverse(); }

		return size;

	}
	const directionDefault = ['blockEnd', 'blockStart', 'inlineEnd', 'inlineStart'];
	const alignDefault = ['start', 'end', 'center'];

	const subMenuDirection = ['inlineEnd', 'inlineStart'];
	const subMenuAlign = ['start', 'end'];

	/**
	 *
	 * @param {string?} [val]
	 * @returns {string[]}
	 */
	function getDirections(val) {
		/** @type {string[]} */
		const direction = [];
		/**
		 *
		 * @param {string} v
		 */
		function add(v) {
			if (direction.includes(v)) { return; }
			direction.push(v);
		}
		for (const v of (val || '').replace(/\n|\s|-/g, '').toLowerCase().split(/,/)) {
			if (v === 'inlineend' || v === 'inline') { add('inlineEnd'); }
			if (v === 'inlinestart' || v === 'inline') { add('inlineStart'); }
			if (v === 'blockend' || v === 'block') { add('blockEnd'); }
			if (v === 'blockstart' || v === 'block') { add('blockStart'); }
		}
		return direction.length ? direction : directionDefault;
	}
	/**
	 *
	 * @param {string?} [val]
	 * @returns {string[]}
	 */
	function getAligns(val) {
		/** @type {string[]} */
		const align = [];
		for (const v of (val || '').replace(/\n|\s|-/g, '').toLowerCase().split(/,/)) {
			if (!['start', 'end', 'center'].includes(v)) { continue; }
			if (align.includes(v)) { continue; }
			align.push(v);
		}
		return align.length ? align : alignDefault;
	}
	/**
	 *
	 * @param {Element} root
	 * @returns {[boolean, boolean, boolean]}
	 */
	function getLayout(root) {
		const style = getComputedStyle(root);
		const writingMode = style.writingMode?.toLowerCase();
		const vertical = verticalWritingMode.has(writingMode);
		const rowReverse = ['vertical-rl', 'sideways-rl'].includes(writingMode);
		const colReverse = style.direction.toLowerCase() === 'rtl' !== (writingMode === 'sideways-lr');
		return [vertical, rowReverse, colReverse];
	}

	class Menu extends HTMLElement {
		static observedAttributes = ['open', 'hidden', 'target', 'x', 'y', 'direction', 'align', 'modal', 'disabled'];
		close() { this.removeAttribute('open'); }
		show() { this.setAttribute('open', ''); }
		get open() { return this.hasAttribute('open'); }
		set open(open) { if (open) { this.show(); } else { this.close(); } }
		get disabled() { return this.hasAttribute('disabled'); }
		set disabled(disabled) {
			if (disabled) {
				this.setAttribute('disabled', '');
			} else {
				this.removeAttribute('disabled');
			}
		}
		get modal() { return this.hasAttribute('modal'); }
		set modal(modal) {
			if (modal) {
				this.setAttribute('modal', '');
			} else {
				this.removeAttribute('modal');
			}
		}
		get x() { return parseFloat(this.getAttribute('x') || '') || 0; }
		set x(x) {
			if (x && typeof x === 'number' && Number.isFinite(x)) {
				this.setAttribute('x', String(x));
			} else {
				this.removeAttribute('x');
			}
		}
		get y() { return parseFloat(this.getAttribute('y') || '') || 0; }
		set y(y) {
			if (y && typeof y === 'number' && Number.isFinite(y)) {
				this.setAttribute('y', String(y));
			} else {
				this.removeAttribute('y');
			}
		}
		get target() { return this.getAttribute('target'); }
		set target(target) {
			if (typeof target !== 'string') {
				this.removeAttribute('target');
			} else {
				this.setAttribute('target', target);
			}
		}
		#direction = directionDefault;
		#align = alignDefault;
		get direction() { return [...this.#direction]; }
		set direction(v) {
			const direction = Array.isArray(v) ? v.filter(Boolean).join(',') : v;
			if (direction !== null && typeof direction !== 'string') { return; }
			if (!direction) {
				this.removeAttribute('direction');
			} else {
				this.setAttribute('direction', direction);
			}
		}
		get align() { return [...this.#align]; }
		set align(v) {
			const align = Array.isArray(v) ? v.filter(Boolean).join(',') : v;
			if (align !== null && typeof align !== 'string') { return; }
			if (!align) {
				this.removeAttribute('direction');
			} else {
				this.setAttribute('direction', align);
			}
		}

		#label = document.createElement('div');
		#dialog = document.createElement('dialog');
		/** @type {Menu} */
		#root = this;
		constructor() {
			super();
			const shadow = this.attachShadow({ mode: 'closed' });
			shadow.appendChild(document.createElement('style')).textContent = style$3;

			const label = shadow.appendChild(this.#label);
			label.appendChild(document.createElement('slot')).name = 'label';

			label.addEventListener('pointerenter', e=> {
				if (!this.#parentMenu) { return; }
				if (!e.isPrimary) { return; }
				this.#show();
			});
			label.addEventListener('click', e=> { e.stopPropagation(); });

			const dialog = shadow.appendChild(this.#dialog);
			const dialogSlot = dialog.appendChild(document.createElement('slot'));
			dialog.addEventListener('click', e => {
				if (this.#parentMenu) { return; }
				const list = e.composedPath();
				const index = list.indexOf(dialog);
				if (index >= 0 && list.slice(0, index).find(v => v instanceof Element && v.getAttribute('disabled') !== null || v instanceof HTMLHRElement)) {
					return;
				}
				this.close();
			});
			dialog.addEventListener('close', e=> { this.close(); });
			dialogSlot.addEventListener('pointermove', e => {
				if (!e.isPrimary) { return; }
				const currentSubMenu = this.#currentSubMenu;
				if (!currentSubMenu) { return; }
				if (e.composedPath().includes(currentSubMenu)) { return; }
				currentSubMenu.#close();
			});
			dialog.addEventListener('scroll', e=> {
				if (!this.#mounted) { return; }
				const currentSubMenu = this.#currentSubMenu;
				if (currentSubMenu) {
					currentSubMenu.#update();
				}
			});
			this.addEventListener('contextmenu', e=> {
				e.stopPropagation();
				e.preventDefault();
			}, {capture: true});
		}

		/** @type {Element?} */
		#target = null;
		get targetElement() { return this.#target; }
		set targetElement(el) { this.#target = el instanceof Element ? el : null; }
		#open = false;
		#mounted = false;
		/** @type {Menu?} */
		#currentSubMenu = null;
		/** @type {Menu?} */
		#parentMenu = null;
		get parentMenu() { return this.#parentMenu; }
		#close() {
			if (!this.#open) { return; }
			const subMenu = this.#currentSubMenu;
			if (subMenu) { subMenu.#close(); }
			const parent = this.#parentMenu;
			if (parent && parent.#currentSubMenu === this) {
				parent.#currentSubMenu = null;
			} else {
				openMenus.delete(this);
			}
			const dialog = this.#dialog;
			dialog.close();

			this.#label.classList.remove('open');
			dialog.removeAttribute('popover');
			this.#open = false;
		}
		#show() {
			if (this.#open || !this.#mounted) { return; }
			const parent = this.#parentMenu;
			const dialog = this.#dialog;
			if (parent) {
				if (!parent.#open || this.disabled) { return; }
				const currentSubMenu = parent.#currentSubMenu;
				if (currentSubMenu) {
					currentSubMenu.#close();
				}
				parent.#currentSubMenu = this;
				if (hasPopover) {
					dialog.popover = 'manual';
					dialog.showPopover();
				} else {
					dialog.show();
				}
			} else {
				this.#updateLayout();
				const subMenu = this.#currentSubMenu;
				if (subMenu) { subMenu.#close(); }
				if (hasPopover && !this.hasAttribute('modal')) {
					dialog.popover = 'manual';
					dialog.showPopover();
					openMenus.add(this);
				} else {
					dialog.showModal();
				}
			}
			this.#label.classList.add('open');
			requestAnimationFrame(() => { if (this.#mounted) { this.#update(); } });
			this.#open = true;
		}
		#rowVertical = false;
		#rowReverse = false;
		#colReverse = false;
		#getTarget() {
			if (this.#parentMenu) { return this.#label; }
			const targetElement = this.#target;
			if (targetElement) { return targetElement; }
			const {target} = this;
			if (target === '') { return this.parentElement; }
			if (!target) { return null; }
			try { return document.querySelector(target); } catch {}
			return null;
		}
		#update() {
			if (!this.#mounted) { return; }
			const dialog = this.#dialog;
			const target = this.#getTarget();
			const root = this.#root;
			const rowVertical = root.#rowVertical;
			const size = getSize(
				target?.getBoundingClientRect() || {top: this.y, left: this.x, width: 0, height: 0},
				root.#rowVertical,
				root.#rowReverse,
				root.#colReverse,
			);
			const [[inlineStart, inlineSize, inlineEnd], [blockStart, blockSize, blockEnd]] = size;
			const [d, s] = this.#parentMenu ? [subMenuDirection, subMenuAlign] : [this.#direction, this.#align];
			const rect = dialog.getBoundingClientRect();
			const inline = rowVertical ? rect.height : rect.width;
			const block = rowVertical ? rect.width : rect.height;
			/** @type {[string, number, number][]} */
			const dirs = d.map(d => {
				switch (d) {
					case 'blockStart': return [d, blockStart / block, 1];
					case 'blockEnd': return [d, blockEnd / block, 1];
					case 'inlineStart': return [d, 1, inlineStart / inline];
					default: return ['inlineEnd', 1, inlineEnd / inline];
				}
			});

			const [dir] = dirs.reduce((r, d) => {
				if (r[1] < 1 && d[1] < 1) { return r[1] >= d[1] ? r : d; }
				if (r[1] >= 1 && d[1] < 1) { return r; }
				if (d[1] >= 1 && r[1] < 1) { return d; }
				if (r[2] >= 1 || r[2] >= d[2]) { return r; }
				return d;
			});
			const blockDir = dir === 'blockEnd' || dir === 'blockStart';
			if (blockDir) { size.reverse(); }
			const [[inlineStartX, inlineSizeX, inlineEndX], [blockStartX, blockSizeX, blockEndX]] = size;
			const [rowSize, colSize] = blockDir ? [inline, block] : [block, inline];
			const align = s.find(a => a === 'start' ? blockSizeX + blockEndX > rowSize : a === 'start' ? blockSizeX + blockStartX > rowSize : true) || '';

			let insetInlineStart = dir === 'inlineStart' || dir === 'blockStart' ? inlineStartX - colSize : inlineStartX + inlineSizeX;
			let insetBlockStart = 0;
			switch (align) {
				case 'start':
					insetBlockStart = blockStartX;
					break;
				case 'end':
					insetBlockStart = blockStartX + blockSizeX - rowSize;
					break;
				default:
					insetBlockStart = Math.max(18, Math.min(blockStartX + blockSizeX / 2 - rowSize / 2, blockStartX + blockSizeX + blockEndX - 18 - rowSize));
					break;
			}

			if (blockDir) {
				[insetInlineStart, insetBlockStart] = [insetBlockStart, insetInlineStart];
			}
			dialog.style.insetBlockStart = `${insetBlockStart}px`;
			dialog.style.insetInlineStart = `${insetInlineStart}px`;

			const currentSubMenu = this.#currentSubMenu;
			if (!currentSubMenu) { return; }
			currentSubMenu.#update();
		}
		update() {
			if (!this.#mounted) { return; }
			return this.#update();

		}
		#updateLayout() {
			const [rowVertical, rowReverse, colReverse] = getLayout(this);
			this.#rowVertical = rowVertical;
			this.#rowReverse = rowReverse;
			this.#colReverse = colReverse;
		}
		connectedCallback() {
			this.#mounted = true;
			const parent = this.parentNode;
			const parentMenu = parent instanceof Menu ? parent : null;
			this.#parentMenu = parentMenu;
			this.#root = parentMenu ? parentMenu.#root : this;

			this.#label.hidden = !parentMenu;
			const open = !this.hidden && (parentMenu ? parentMenu.#open : false);
			if (open) {
				this.#show();
			}
		}
		disconnectedCallback() {
			this.close();
			this.#root = this;
			this.#mounted = false;
			this.#parentMenu = null;
		}
		/**
		 * @param {string} attrName
		 * @param {string | null} oldVal
		 * @param {string | null} newVal
		 * @returns {void}
		 */
		attributeChangedCallback(attrName, oldVal, newVal) {
			if (!this.#mounted) { return; }
			if (oldVal === newVal) { return; }
			switch (attrName) {
				case 'disabled': {
					if (this.#mounted && this.open && newVal !== null) {
						this.close();
					}
					break;
				}
				case 'open': {
					if (!this.#parentMenu && !this.hidden) {
						if (newVal === null) {
							this.#close();
						} else {
							this.#show();
						}
					}
					break;
				}
				case 'modal': {
					if (newVal !== null) {
						const dialog = this.#dialog;
						if (dialog.getAttribute('popover') !== null) {
							dialog.removeAttribute('popover');
							this.close();
						}
					}
					break;
				}
				case 'hidden': {
					if (newVal !== null) {
						this.#close();
					} else if (this.open && !this.#parentMenu) {
						this.#show();
					}
					break;
				}
				case 'direction': {
					this.#direction = getDirections(newVal);
					if (this.#mounted && !this.#parentMenu) { this.#update(); }
					break;
				}
				case 'align': {
					this.#align = getAligns(newVal);
					if (this.#mounted && !this.#parentMenu) { this.#update(); }
					break;
				}
				case 'target': case 'x': case 'y': {
					if (this.#mounted && !this.#parentMenu) { this.#update(); }
					break;
				}
			}
		}
	}

	customElements.define('nl-menu', Menu);

	/*!
	 * 匿龙组件库 @nyloong/components v0.2.0
	 * (c) 2023-2024 猛火Fierflame
	 * @license MIT
	 */
	const style$1 = `:host {
	display: block;
	overflow: hidden;
	position: relative;
}
:host([hidden]) { display: none; }`;

	/**
	 *
	 * @param {MovableArea} el
	 * @param {Set<import('./index.mjs').Interface>} children
	 * @returns {[() => void, () => void]}
	 */
	function init$1(el, children) {
		const shadow = el.attachShadow({ mode: 'closed' });
		shadow.appendChild(document.createElement('style')).textContent = style$1;
		shadow.appendChild(document.createElement('slot'));
		const observer = new ResizeObserver(e => {
			const last = e.pop();
			if (!last) { return; }
			const { contentRect: { width, height } } = last;

			for (const t of children) {
				t.resize(width, height);
			}
		});
		/**
		 *
		 * @param {Event} event
		 * @returns {import('./index.mjs').Interface | null}
		 */
		function getTarget(event) {
			const list = event.composedPath();

			const k = list.findIndex(t => t === el);
			const e = k < 0 ? [] : list.slice(0, k).reverse();
			for (const child of [...children]) {
				const r = child.match(e);
				if (r) { return child; }
				if (r === null) { return null; }
			}
			return null;
		}
		/** @type {Record<number, import('./index.mjs').Interface>} */
		const touchTargets = {};

		/**
		 *
		 * @param {PointerEvent} event
		 * @returns {void}
		 */
		function pointerdown(event) {
			const target = getTarget(event);
			if (!target) { return; }
			const { pageX, pageY, pointerId } = event;
			const { x: OffX, y: OffY } = el.getBoundingClientRect();
			const x = pageX - OffX;
			const y = pageY - OffY;
			/** @type {boolean?} */
			let state = null;
			if (event.pointerType === 'mouse') {
				state = target.mouseBegin(x, y, event.buttons);
			} else if (event.pointerType === 'touch') {
				state = target.touchBegin(pointerId, x, y);
			}
			if (typeof state !== 'boolean') { return; }
			if (state) { el.setPointerCapture(pointerId); }
			touchTargets[pointerId] = target;
		}
		/**
		 *
		 * @param {PointerEvent} event
		 * @returns {void}
		 */
		function pointermove(event) {
			const { pointerId } = event;
			const target = touchTargets[pointerId];
			if (!target) { return; }
			const { pageX, pageY } = event;
			const { x: OffX, y: OffY } = el.getBoundingClientRect();
			const x = pageX - OffX;
			const y = pageY - OffY;
			if (event.pointerType === 'mouse') {
				target?.mouseMove(x, y, event.buttons);
				return;
			}
			if (event.pointerType === 'touch') {
				target.touchMove(pointerId, x, y);
			}
		}
		/**
		 *
		 * @param {PointerEvent} event
		 * @returns {void}
		 */
		function pointerup(event) {
			const { pointerId } = event;
			if (el.hasPointerCapture(pointerId)) {
				el.releasePointerCapture(pointerId);
			}
			const target = touchTargets[pointerId];
			if (!target) { return; }
			if (event.pointerType === 'mouse') {
				target.mouseEnd();
			}
			if (event.pointerType === 'touch') {
				delete touchTargets[pointerId];
				target.touchEnd(pointerId);
			}
		}
		/**
		 *
		 * @param {WheelEvent} event
		 * @returns {void}
		 */
		function wheel(event) {
			const target = getTarget(event);
			if (!target) { return; }
			const { deltaMode, deltaX, deltaY, pageX, pageY } = event;
			const { x: OffX, y: OffY } = el.getBoundingClientRect();
			const x = pageX - OffX;
			const y = pageY - OffY;
			target.wheel(deltaMode, deltaX, deltaY, x, y);
		}

		el.addEventListener('wheel', wheel, true);

		el.addEventListener('pointermove', pointermove);
		el.addEventListener('pointerdown', pointerdown);
		el.addEventListener('pointerup', pointerup);
		el.addEventListener('pointercancel', pointerup);
		el.addEventListener('lostpointercapture', pointerup);
		el.addEventListener('touchmove', e => e.preventDefault());
		return [() => {
			observer.observe(el);
		}, () => {
			observer.unobserve(el);
		}];

	}

	class MovableArea extends HTMLElement {
		/** @type {Set<import('./index.mjs').Interface>} */
		#children = new Set();
		/** @type {() => void} */
		#connect;
		/** @type {() => void} */
		#disconnect;
		constructor() {
			super();
			[this.#connect, this.#disconnect] = init$1(this, this.#children);
		}
		/**
		 *
		 * @param {import('./index.mjs').Interface} o
		 * @returns {() => void}
		 */
		register(o) {
			const children = this.#children;
			children.add(o);
			const { width, height } = this.getBoundingClientRect();
			o.resize(width, height);
			return () => {
				children.delete(o);
			};

		}
		/**
		 * @returns {void}
		 */
		connectedCallback() { this.#connect(); }
		/**
		 * @returns {void}
		 */
		disconnectedCallback() { this.#disconnect(); }
		/**
		 * @returns {void}
		 */
		adoptedCallback() { }
	}

	/**
	 * 线性回归求斜率
	 * @param {number[]} t
	 * @param {number[]} v
	 * @returns {number}
	 */
	function regression(t, v) {
		const tb = t.reduce((a, b) => a + b) / t.length;
		const vb = v.reduce((a, b) => a + b) / v.length;
		return t.map((_, i) => (t[i] - tb) * (v[i] - vb)).reduce((a, b) => a + b)
			/ t.map(a => (a - tb) ** 2).reduce((a, b) => a + b);
	}

	/**
	 *
	 * @param {number[][]} frame
	 * @returns {(() => [number, number, boolean]) | undefined }
	 */
	function getInertiaFn(frame) {
		const time = performance.now() / 1000;
		let last = time;
		for (let i = 0; i < frame.length; i++) {
			const [,, that] = frame[i];
			if (last - that > 0.05) { frame.length = i; break; }
			last = that;
		}
		if (frame.length < 3) { return; }
		// 时间（s）
		const times = frame.map(f => f[2]);
		// 方向速度(px/s)
		const xb = regression(times, frame.map(f => f[0]));
		const yb = regression(times, frame.map(f => f[1]));
		// 方向符号
		const xs = Math.sign(xb);
		const ys = Math.sign(yb);
		// 方向速度绝对值(px/s)
		const xv = Math.abs(xb);
		const yv = Math.abs(yb);
		// 和速度(px/s)
		const v = (xv ** 2 + yv ** 2) ** 0.5;
		// 方向速度比
		const xp = xv / v;
		const yp = yv / v;
		// 加速度(px/s²)
		const a = 1000;
		// 最后帧(px, px, s)
		const [[xf, yf, b]] = frame;
		/**
		 * @returns {[number, number, boolean]}
		 */
		function calc() {
			const t = performance.now() / 1000;
			// 时间差(s)
			const tt = t - b;
			// 新的速度(px/s)
			let nv = v - tt * a;
			if (nv <= 0) {
				const x = xf + xs * xv * v / a / 2;
				const y = yf + ys * yv * v / a / 2;
				return [x, y, true];
			}
			const x = xf + xs * (xv + xv - a * xp * tt) * tt / 2;
			const y = yf + ys * (yv + yv - a * yp * tt) * tt / 2;
			return [x, y, false];

		}
		return calc;
	}

	class MovableTarget extends HTMLElement {
		/** @type {() => void} */
		#disconnect;
		/** @type {() => void} */
		#connect;
		constructor() {
			super();
			/** @type {() => void} */
			let unregister = () => {};
			this.#connect = () => {
				let parent = this.parentNode;
				while (parent) {
					if (parent instanceof Movable$1) { break; }
					parent = parent.parentNode;
				}
				if (parent) { unregister = parent.register(this); }
			};
			this.#disconnect = () => { unregister(); };
		}
		/**
		 * @returns {void}
		 */
		connectedCallback() { this.#connect(); }
		/**
		 * @returns {void}
		 */
		disconnectedCallback() { this.#disconnect(); }
	}

	/**
	 * @typedef {object} Interface
	 * @property {(e: EventTarget[]) => boolean | null} match
	 * @property {(width: number, height: number) => void} resize
	 * @property {(id: number, x: number, y: number) => boolean?} touchBegin
	 * @property {(id: number, x: number, y: number) => void} touchMove
	 * @property {(id: number) => void} touchEnd
	 * @property {(x: number, y: number, keys: number) => boolean?} mouseBegin
	 * @property {(x: number, y: number, keys: number) => void} mouseMove
	 * @property {() => void} mouseEnd
	 * @property {(deltaMode: number, deltaX: number, deltaY: number, pageX: number, pageY: number) => void} wheel
	 */

	/**
	 *
	 * @param {number} x1
	 * @param {number} x2
	 * @param {number} y1
	 * @param {number} y2
	 * @returns {number}
	 */
	function getLength(x1, x2, y1, y2) {
		return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
	}


	/**
	 *
	 * @param {number} v
	 * @param {number} area
	 * @param {number} target
	 * @returns {number}
	 */
	function calc(v, area, target) {
		const differential = area - target;
		const min = Math.min(differential, 0);
		const max = Math.max(differential, 0);
		return Math.min(Math.max(min, v), max);
	}

	const style$2 = `
:host{display: block; position: absolute; transform-origin: 0 0; }
:host([hidden]) { display: none; }
`;

	/**
	 *
	 * @param {Movable} el
	 * @param {Set<EventTarget>} targets
	 * @returns {[() => void, () => void, () => void]}
	 */
	function init(el, targets) {
		const shadow = el.attachShadow({ mode: 'closed' });
		shadow.appendChild(document.createElement('style')).textContent = style$2;
		shadow.appendChild(document.createElement('slot'));

		let needAdaptively = false;

		/**
		 *
		 * @returns {void}
		 */
		function adaptively() {
			needAdaptively = true;
			const [aWidth, aHeight] = areaSize;
			if (!aWidth || !aHeight) { return; }
			needAdaptively = false;
			zoom = Math.min(aWidth / el.clientWidth, aHeight / el.clientHeight);
			x = (aWidth - el.clientWidth * zoom) / 2;
			y = (aHeight - el.clientHeight * zoom) / 2;
			el.style.transform = `translate(${x}px,${y}px)scale(${zoom})`;
		}

		/** @type {Record<number, [number, number]>} */
		const touches = {};
		/** @type {[number, number]} */
		let areaSize = [0, 0];
		let x = 0;
		let y = 0;
		let zoom = 1;
		/**
		 *
		 * @param {number} newZoom
		 * @returns {number}
		 */
		function getZoom(newZoom) {
			const elWidth = el.clientWidth;
			const elHeight = el.clientHeight;
			const [areaWidth, areaHeight] = areaSize;
			if (!areaWidth || !areaHeight) { return newZoom; }
			const w = areaWidth / elWidth;
			const h = areaHeight / elHeight;
			const max = Math.max(w, h, 5);
			const min = Math.min(w, h, 0.5);
			return Math.max(min, Math.min(newZoom, max));
		}

		/** @type {'touch' | ''} */
		let scaleType = '';
		/** @type {undefined | { x: number; y: number; s: number; }} */
		let scaleInfo;

		/**
		 *
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} x2
		 * @param {number} y2
		 * @returns {void}
		 */
		function scaleBegin(x1, y1, x2, y2) {
			const l = getLength(x1, x2, y1, y2);
			const z = zoom;
			if (!l || !z) {
				scaleInfo = undefined;
				return;
			}
			scaleInfo = {
				x: (x - (x1 + x2) / 2) / z,
				y: (y - (y1 + y2) / 2) / z,
				s: z / l,
			};
		}
		/**
		 *
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number} x2
		 * @param {number} y2
		 * @returns {void}
		 */
		function scaleMove(x1, y1, x2, y2) {
			if (!scaleInfo) { return; }
			const l = getLength(x1, x2, y1, y2);
			if (!l) { return; }
			const { s, x: ox, y: oy } = scaleInfo;
			const newZoom = getZoom(l * s);
			zoom = newZoom;
			x = ox * newZoom + (x1 + x2) / 2;
			y = oy * newZoom + (y1 + y2) / 2;
			update();
		}
		/**
		 *
		 * @returns {void}
		 */
		function scaleStop() {
			scaleType = '';
			scaleInfo = undefined;
		}


		/** @type {'touch' | 'roller'| 'leftMouse' | ''} */
		let moveType = '';
		/**
		 * @typedef {object} MoveInfo
		 * @property {number} x
		 * @property {number} y
		 * @property {number} bx
		 * @property {number} by
		 * @property {[x: number, y: number, t: number][]} frame
		 */
		/**
		 * @type {MoveInfo | undefined}
		 */
		let moveInfo;
		let moveAnimation = 0;
		/**
		 *
		 * @param {number} pageX
		 * @param {number} pageY
		 * @returns {void}
		 */
		function moveBegin(pageX, pageY) {
			cancelAnimationFrame(moveAnimation);
			moveInfo = undefined;
			moveInfo = {
				x,
				y,
				frame: [[x, y, performance.now() / 1000]],
				bx: pageX,
				by: pageY,
			};

		}
		/**
		 *
		 * @param {number} pageX
		 * @param {number} pageY
		 * @returns {void}
		 */
		function moveMove(pageX, pageY) {
			if (!moveInfo) { return; }
			const { x: ox, y: oy, bx, by } = moveInfo;
			x = ox + pageX - bx;
			y = oy + pageY - by;
			/** @type {[x: number, y: number, t: number]} */
			const current = [x, y, performance.now() / 1000];
			moveInfo.frame = [current, ...moveInfo.frame].slice(0, 20);
			update();
		}
		/**
		 *
		 * @returns {void}
		 */
		function moveEnd() {
			if (!moveInfo) { return; }
			moveType = '';
			const { frame } = moveInfo;
			moveInfo = undefined;
			if (!el.inertia) { return; }
			const calc = getInertiaFn(frame);
			if (!calc) { return; }
			/**
			 *
			 * @returns {void}
			 */
			const run = () => {
				/** @type {boolean} */
				let stop;
				[x, y, stop] = calc();
				update();
				if (!el.inertia) { return; }
				if (stop) { return; }
				moveAnimation = requestAnimationFrame(run);
			};
			run();
		}
		/**
		 *
		 * @returns {void}
		 */
		function moveStop() {
			cancelAnimationFrame(moveAnimation);
			moveType = '';
			moveInfo = undefined;
		}

		/** @type {Interface} */
		const movableAreaMember = {
			resize(width, height) {
				areaSize = [width, height];
				if (el.autoAdaptively || needAdaptively) { adaptively(); }
			},
			match(e) {
				if (!e.length) { return el.global || false; }
				if (e[0] !== el) { return false; }
				if (!targets.size) { return true; }
				const list = new Set(e);
				for (const t of targets) { if (list.has(t)) { return true; } }
				return null;
			},

			touchMove(id, x, y) {
				touches[id] = [x, y];
				const touchList = Object.values(touches);
				if (moveType === 'touch') {
					if (touchList.length !== 1) { return moveStop(); }
					const [t1] = touchList;
					moveMove(t1[0], t1[1]);
				}
				if (scaleType !== 'touch') { return; }
				if (!el.touchScalable || touchList.length !== 2) {
					return scaleStop();
				}
				const [t1, t2] = touchList;
				scaleMove(t1[0], t1[1], t2[0], t2[1]);
			},
			touchBegin(id, x, y) {
				touches[id] = [x, y];
				const touchList = Object.values(touches);
				if (touchList.length === 1) {
					if (!moveType && el.touchMovable) {
						scaleStop();
						moveType = 'touch';
						moveBegin(x, y);
						return el.touchCapture;
					}
				} else if (touchList.length === 2) {
					if (!scaleType && el.touchScalable) {
						moveStop();
						scaleType = 'touch';
						const [t1, t2] = touchList;
						scaleBegin(t1[0], t1[1], t2[0], t2[1]);
						return el.touchCapture;
					}

				}
				return null;
			},
			touchEnd(id) {
				delete touches[id];
				if (scaleType === 'touch') { scaleStop(); }
				if (moveType === 'touch') { moveEnd(); }
			},
			mouseMove(x, y, keys) {
				if (moveType === 'leftMouse' && !(keys & 1) || moveType === 'roller' && !(keys & 4)) {
					moveEnd();
					return;
				}
				if (!moveType) { return; }
				moveMove(x, y);
			},
			mouseBegin(x, y, keys) {
				if (moveType) { return null; }
				/** @type {'leftMouse' | 'roller' | ''} */
				let type = '';
				/** @type {boolean?} */
				let res = null;
				if (keys & 1) {
					if (!el.leftMouseMovable) { return null; }
					type = 'leftMouse';
					res = el.leftMouseMovableCapture;
				} else if (keys & 4) {
					if (!el.rollerMovable) { return null; }
					type = 'roller';
					res = el.rollerMovableCapture;
				}
				scaleStop();
				moveType = type;
				moveBegin(x, y);
				return res;
			},
			mouseEnd() {
				if (!moveType) { return; }
				moveEnd();
			},
			wheel(mode, dx, dy, px, py) {
				if (!el.rollerScalable) { return; }
				const v = Math.abs(dx) > Math.abs(dy) ? dx : dy;
				if (v === 0) { return; }
				scaleStop();
				const abs = Math.abs(v);
				let base = 0;
				if (v > 0) {
					switch (mode) {
						case 0: base = 1.01; break;
						case 1: base = 1.25; break;
						case 2: base = 1.6; break;
					}
				} else {
					switch (mode) {
						case 0: base = 1 / 1.01; break;
						case 1: base = 1 / 1.25; break;
						case 2: base = 1 / 1.6; break;
					}
				}

				const oldZoom = zoom;
				const newZoom = getZoom(base ** abs * oldZoom);
				zoom = newZoom;
				x = (x - px) / oldZoom * newZoom + px;
				y = (y - py) / oldZoom * newZoom + py;
				update();
			},
		};

		/** @type {() => void} */
		let unregister = () => { };

		/**
		 *
		 * @returns {void}
		 */
		function update() {
			const [areaWidth, areaHeight] = areaSize;
			if (!areaWidth || !areaHeight) {
				el.style.transform = `translate(${x}px,${y}px)scale(${zoom})`;
			}
			x = calc(x, areaWidth, el.clientWidth * zoom);
			y = calc(y, areaHeight, el.clientHeight * zoom);
			el.style.transform = `translate(${x}px,${y}px)scale(${zoom})`;
		}
		return [() => {
			if (el.autoAdaptively) { requestAnimationFrame(adaptively); }

			let parent = el.parentNode;
			while (parent) {
				if (parent instanceof MovableArea) { break; }
				parent = parent.parentNode;
			}
			if (parent) {
				unregister = parent.register(movableAreaMember);
			}
			// TODO: 绑定到页面中
		}, () => {
			unregister();
		}, adaptively];
	}
	/**
	 *
	 * @param {HTMLElement} el
	 * @param {string} name
	 * @param {string | boolean} value
	 * @returns {void}
	 */
	function setBoolAttr(el, name, value) {
		if (!value && value !== '') {
			el.removeAttribute(name);
			return;
		}
		el.setAttribute(name, value === true ? '' : value);
	}

	class Movable extends HTMLElement {
		static get Area() { return MovableArea; }
		static get Target() { return MovableTarget; }
		/**
		 * 是否拥有惯性
		 * @type {boolean}
		 */
		get inertia() { return this.getAttribute('inertia') !== null; }
		set inertia(v) { setBoolAttr(this, 'inertia', v); }
		/**
		 * 触屏是否捕获
		 * @type {boolean}
		 */
		get touchCapture() { return this.getAttribute('touch-capture') !== null; }
		set touchCapture(v) { setBoolAttr(this, 'touch-capture', v); }
		/**
		 * 是否支持触屏移动
		 * @type {boolean}
		 */
		get touchMovable() { return this.getAttribute('touch-movable') !== null; }
		set touchMovable(v) { setBoolAttr(this, 'touch-movable', v); }
		/**
		 * 是否支持触屏缩放
		 * @type {boolean}
		 */
		get touchScalable() { return this.getAttribute('touch-scalable') !== null; }
		set touchScalable(v) { setBoolAttr(this, 'touch-scalable', v); }
		/**
		 * 是否支持鼠标滚论移动
		 * @type {boolean}
		 */
		get rollerMovable() { return this.getAttribute('roller-movable') !== null; }
		set rollerMovable(v) { setBoolAttr(this, 'roller-movable', v); }
		/**
		 * 鼠标滚论移动是否捕获
		 * @type {boolean}
		 */
		get rollerMovableCapture() { return this.getAttribute('roller-movable-capture') !== null; }
		set rollerMovableCapture(v) { setBoolAttr(this, 'roller-movable-capture', v); }
		/**
		 * 是否支持鼠标滚论缩放
		 * @type {boolean}
		 */
		get rollerScalable() { return this.getAttribute('roller-scalable') !== null; }
		set rollerScalable(v) { setBoolAttr(this, 'roller-scalable', v); }
		/**
		 * 是否支持鼠标左键移动
		 * @type {boolean}
		 */
		get leftMouseMovable() { return this.getAttribute('left-mouse-movable') !== null; }
		set leftMouseMovable(v) { setBoolAttr(this, 'left-mouse-movable', v); }
		/**
		 * 鼠标左键移动是否捕获
		 * @type {boolean}
		 */
		get leftMouseMovableCapture() { return this.getAttribute('left-mouse-movable-capture') !== null; }
		set leftMouseMovableCapture(v) { setBoolAttr(this, 'left-mouse-movable-capture', v); }
		/**
		 * 是否自动自适应
		 * @type {boolean}
		 */
		get autoAdaptively() { return this.getAttribute('adaptively') !== null; }
		set autoAdaptively(v) { setBoolAttr(this, 'adaptively', v); }
		/**
		 * 是否在整个 `<nl-movable-area>` 区域内操作都有效
		 * @type {boolean}
		 */
		get global() { return this.getAttribute('global') !== null; }
		set global(v) { setBoolAttr(this, 'global', v); }
		/** @type {Set<EventTarget>} */
		#targets = new Set();
		/** @type {() => void} */
		#connect;
		/** @type {() => void} */
		#disconnect;
		/** @type {() => void} */
		#adaptively;
		constructor() {
			super();
			[
				this.#connect,
				this.#disconnect,
				this.#adaptively,
			] = init(this, this.#targets);
		}
		/**
		 *
		 * @param {EventTarget} o
		 * @returns {() => void}
		 */
		register(o) {
			const targets = this.#targets;
			targets.add(o);
			return () => { targets.delete(o); };
		}
		/**
		 * 自适应
		 * @returns {void}
		 */
		adaptively() { this.#adaptively(); }
		/**
		 * @returns {void}
		 */
		connectedCallback() { this.#connect(); }
		/**
		 * @returns {void}
		 */
		disconnectedCallback() { this.#disconnect(); }
		/**
		 * @returns {void}
		 */
		adoptedCallback() { }
	}

	customElements.define('nl-movable-area', MovableArea);
	customElements.define('nl-movable', Movable);
	customElements.define('nl-movable-target', MovableTarget);

	/** @typedef {MovableArea} Movable.Area */
	/** @typedef {MovableTarget} Movable.Target */
	var Movable$1 = Movable;

	/*!
	 * 匿龙组件库 @nyloong/components v0.2.0
	 * (c) 2023-2024 猛火Fierflame
	 * @license MIT
	 */
	const style = `
:host {
	display: inline-block;
	overflow: hidden;

	position: relative;
	container-name: host;
}
:host([hidden]) { display: none; }

.value {
	color: transparent;
	text-align: center;
	text-orientation: upright;
	inline-size: 100%;
	block-size: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.root {
	counter-reset: nl-roll-digit -1;
	position: absolute;
	text-align: center;
	text-orientation: upright;
	inline-size: 100%;
	block-size: 1000%;
	transition: all 1.5s;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	overflow: hidden;
	user-select: none;
	pointer-events: none;
}
.root span {
	flex: 1;
	overflow: hidden;
	counter-increment: nl-roll-digit;
}
.root span::before {
	content: counter(nl-roll-digit)
}
`;

	/**
	 * 数字滚动组件
	 * 不支持 CSS `writing-mode`
	 */
	class RollDigit extends HTMLElement {
		static observedAttributes = ['digit'];
		#style = document.createElement('style');
		#value = document.createElement('span');
		#digit() {
			const n = this.digit;
			const style = `.root { translate: 0 -${n * 10}%; }`;
			this.#value.innerText = `${n}`;
			this.#style.textContent = style;
		}
		constructor() {
			super();
			const shadow = this.attachShadow({mode:'closed'});
			shadow.appendChild(this.#style);
			shadow.appendChild(document.createElement('style')).textContent = style;
			const main = shadow.appendChild(document.createElement('span'));
			main.className = 'root';
			for (let i = 0; i < 10; i++) {
				main.appendChild(document.createElement('span'));
			}
			shadow.appendChild(this.#value).className = 'value';
		}
		/**
		 * 显示的数字
		 * @type {number}
		 */
		get digit() {
			return (parseInt(this.getAttribute('digit') || '') || 0) % 10;
		}
		/** @type {number | string | null | undefined} */
		set digit(digit) {
			if (digit === undefined || digit === null) {
				this.removeAttribute('digit');
			} else {
				this.setAttribute('digit', String(digit));
			}
		}
		connectedCallback() {
			this.#digit();
		}
		/**
		 * @param {string} attrName
		 * @param {string | null} oldVal
		 * @param {string | null} newVal
		 * @returns {void}
		 * @protected
		 */
		attributeChangedCallback(attrName, oldVal, newVal) {
			if (oldVal === newVal) { return; }
			switch (attrName) {
				case 'digit': {
					this.#digit();
					break;
				}
			}
		}
	}

	customElements.define('nl-roll-digit', RollDigit);

	exports.Angle = Angle;
	exports.Breadcrumb = Breadcrumb;
	exports.Menu = Menu;
	exports.Movable = Movable$1;
	exports.RollDigit = RollDigit;

}));
//# sourceMappingURL=index.js.map
