匿龙组件库 @Nyloong/components
==============================

角度输入 `<nl-angle>`
------------------------

角度输入 `<nl-angle>` 是一个 HTML 是输入，支持基本的输入组件属性

### 实例

```html
<form>
	<nl-angle name="angle" value="30" style="font-size: 5em;"></nl-angle>
	<button>提交</button>
</form>
```

面包屑 `<nl-breadcrumb>`
------------------------

### 属性

| HTML属性    | JS 属性     | 等价自定义属性              | 类型     | 默认值 | 说明           |
| ----------- | ----------- | --------------------------- | -------- | ------ | -------------- |
| `separator` | `separator` | `--nl-breadcrumb-separator` | `string` | ` / `  | 面包屑的分隔符 |

### 实例

```html
<nl-breadcrumb>
	<span><a href="#">带链接1</a></span>
	<span>普通2</span>
	<span><a href="#">带链接3</a></span>
	<span>普通4</span>
	<span>最后一项5</span>
</nl-breadcrumb>
```

菜单 `<nl-menu>`
------------------------

支持多层嵌套

### 属性

| HTML属性    | JS 属性     | 类型     | 说明           |
| ----------- | ----------- | -------- | -------------- |
| `open` | `open` | `boolean` | 菜单是否为打开状态，仅根菜单有效 |
| modal | `modal` | `boolean` | 是否采用覆盖层，如果浏览器不支持 `showPopover()` 方法，则强制使用覆盖层，仅根菜单有效 |
| `target` | `target` | `string` | 菜单的显示位置(目标元素选择器)，仅根菜单有效 |
|   | `targetElement` | `Element?` | 菜单的显示位置(目标元素)，仅根菜单有效 |
| x | `x` | `number` | 菜单的显示位置(X)，仅根菜单有效 |
| y | `y` | `number` | 菜单的显示位置(Y)，仅根菜单有效 |
| direction | `direction` | `'inlineStart', 'inlineEnd', 'blockStart', 'blockEnd'` 中的一个或多个， HTML 属性中`,`隔开, js 属性中为数组 | 菜单的显示方向，仅根菜单有效 |
| align | `align` | `'start', 'end', 'center'` 中的一个或多个， HTML 属性中`,`隔开, js 属性中为数组 | 菜单的对其方式，仅根菜单有效 |
| disabled | `disabled` | `boolean` | 是否禁用当前菜单，仅子菜单有效 |

### 插槽

| 插槽 | 说明 |
| ---- | ---- |
| _默认插槽_ | 菜单内容 | 
| `label` | 子菜单在父菜单中的标签，仅子菜单有效 | 

### 菜单的显示位置说明

当配置有多种菜单的显示位置时，将按照以下优先级优先选择:
- `targetElement`
- `target`
- `x` `y`

可移动区域 `<nl-movable>` `<nl-movable-area>` `<nl-movable-target>`
------------------------

`<nl-movable>` 可以在 `<nl-movable-area>` 内进行移动、缩放，如果 `<nl-movable>` 的后代中包含 `<nl-movable-target>`，则只有在作用于 `<nl-movable-target>` 上时，才能移动、缩放

### `<nl-movable>` 属性

| 属性      | JS 属性   | 类型      | 默认值   | 说明         |
| --------- | --------- | --------- | -------- | ------------ |
| `inertia` | `inertia` | `boolean` | ` false` | 是否拥有惯性 |
| `touch-movable` | `touchMovable` | `boolean` | ` false` | 是否支持触屏移动 |
| `touch-scalable` | `touchScalable` | `boolean` | ` false` | 是否支持触屏缩放 |
| `roller-movable` | `rollerMovable` | `boolean` | ` false` | 是否支持鼠标滚论移动 |
| `roller-scalable` | `rollerScalable` | `boolean` | ` false` | 是否支持鼠标滚论缩放 |
| `left-mouse-movable` | `leftMouseMovable` | `boolean` | ` false` | 是否支持鼠标左键移动 |
| `auto-adaptively` | `autoAdaptively` | `boolean` | ` false` | 是否自动自适应 |
| `global` | `global` | `boolean` | ` false` | 是否在整个 `<nl-movable-area>` 区域内操作都有效 |

### `<nl-movable>` 方法

#### `movable.adaptively()`

进行自适应处理

### 实例

```html
<nl-movable-area style="background-color: #666; width: 500px; height: 500px;">
	<nl-movable
	style="background-color: #88F; width: 100px; height: 100px;"
	roller-movable roller-scalable left-mouse-movable></nl-movable>
</nl-movable-area>
```

滚动数字 `<nl-roll-digit>`
------------------------

### 属性

| HTML属性    | JS 属性     | 类型     | 默认值 | 说明           |
| ----------- | ----------- | -------- | ------ | -------------- |
| `digit` | `digit` | `number` | `0`  | 要显示的数字 |

### 实例

```html
<nl-roll-digit digit="5" style="
	background-color: #88F;
	line-height: 2em;
	inline-size: .8em;
	border-radius: .2em;
"></nl-roll-digit>
```

### 其他

- 不支持 CSS `writing-mode` 属性
