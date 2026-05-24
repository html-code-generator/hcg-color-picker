# Google Chrome Style Color Picker

A lightweight, dependency-free color picker widget inspired by Google Chrome's built-in color picker. Supports multiple instances, alpha control, touch input, and the EyeDropper API.

---

## Features

- **No dependencies** — pure vanilla JavaScript, no libraries required
- **Multiple instances** — attach a picker to any number of buttons, each remembers its own color
- **Single shared UI** — one picker element is reused across all instances, keeping memory usage minimal
- **Three color modes** — switch between HEX, RGBA, and HSLA input formats
- **Alpha / opacity control** — full transparency support, can be enabled or disabled per instance
- **EyeDropper API** — pick any color from the screen (supported browsers only)
- **Touch support** — works on mobile and tablet devices
- **Color preview swatch** — live preview inside the picker
- **Keyboard accessible** — color text inputs are fully keyboard navigable
- **`data-color` attribute** — current color is always available on the trigger element via `element.dataset.color`
- **Event system** — subscribe and unsubscribe to color change events
- **Programmatic API** — set color, open/close, enable/disable, and destroy instances at runtime
- **`open` / `close` events** — listen for when the picker is shown or hidden
- **Debounce option** — built-in change event throttling for expensive handlers

---

## Installation

Include the script in your HTML file:

```html
<link rel="stylesheet" href="hcg-color.css">
<script src="hcg-color.js"></script>
```

---

## Basic Usage

```html
<button id="my-color-btn">Pick Color</button>

<script>
    const picker = new hcgColor(
        document.getElementById('my-color-btn'),
        { color: '#ff0000' }
    );

    picker.on('change', function (colors, source) {
        console.log(colors.hex);   // "#ff0000"
        console.log(source);       // "drag" | "input" | "api" | "eyedropper"
    });
</script>
```

---

## Constructor

```js
new hcgColor(element, options)
```

| Parameter | Type          | Required | Description                |
|-----------|---------------|----------|----------------------------|
| `element` | `HTMLElement` | ✅        | The trigger button element |
| `options` | `object`      | ❌        | Configuration (see below)  |

---

## Options

| Option     | Type       | Default     | Description                                         |
|------------|------------|-------------|-----------------------------------------------------|
| `color`    | `string`   | `data-color` attr or `'#ff0000'` | Initial color — HEX, RGB, HSL formats |
| `onChange` | `function` | —           | Shorthand change callback (same as `.on('change')`) |
| `onOpen`   | `function` | —           | Shorthand open callback (same as `.on('open')`)     |
| `onClose`  | `function` | —           | Shorthand close callback (same as `.on('close')`)   |
| `alpha`    | `boolean`  | `true`      | Set to `false` to disable alpha control             |
| `debounce` | `number`   | `0`         | ms to debounce the change event during drag (0 = off) |
| `disabled` | `boolean`  | `false`     | Start in disabled state — also reads `element.disabled` |

```js
const picker = new hcgColor(btn, {
    color:    '#ff0000',
    onChange: colors => console.log(colors.hex),
    alpha:    true,
    debounce: 150,
    disabled: false
});
```

---

## Initial Color Formats

The `color` option accepts any of the following formats:

```js
new hcgColor(el, { color: '#ff0000' });               // 6-digit HEX
new hcgColor(el, { color: '#ff0000ff' });              // 8-digit HEX with alpha
new hcgColor(el, { color: '#f00' });                   // 3-digit HEX shorthand
new hcgColor(el, { color: '#f00a' });                  // 4-digit HEX shorthand with alpha
new hcgColor(el, { color: 'rgb(255, 0, 0)' });         // RGB
new hcgColor(el, { color: 'rgba(255, 0, 0, 0.5)' });   // RGBA
new hcgColor(el, { color: 'hsl(0, 100%, 50%)' });      // HSL
new hcgColor(el, { color: 'hsla(0, 100%, 50%, 1)' });  // HSLA
```

---

## Instance Methods

### `.on(event, callback)`
Subscribe to an event.
```js
picker.on('change', function (colors, source) {
    console.log(colors.hex);   // "#ff0000"
    console.log(colors.rgb);   // "rgb(255, 0, 0)"
    console.log(colors.rgba);  // "rgba(255, 0, 0, 1)"
    console.log(colors.hsl);   // "hsl(0, 100%, 50%)"
    console.log(colors.hsla);  // "hsla(0, 100%, 50%, 1)"
    console.log(source);       // "drag" | "input" | "api" | "eyedropper"
});
```

### `.off(event, callback)`
Unsubscribe a specific listener.
```js
function onChange(colors) { console.log(colors.hex); }

picker.on('change', onChange);
picker.off('change', onChange);
```

### `.setColor(color)`
Programmatically set the color. Fires the `change` event.
```js
picker.setColor('#00ff00');
picker.setColor('rgb(0, 255, 0)');
```

### `.getColor()`
Returns the current color as an object with all formats:

```js
picker.getColor();
// {
//     hex:  "#ff0000",
//     hexa: "#ff0000ff",
//     rgb:  "rgb(255, 0, 0)",
//     rgba: "rgba(255, 0, 0, 1)",
//     hsl:  "hsl(0, 100%, 50%)",
//     hsla: "hsla(0, 100%, 50%, 1)"
// }

picker.getColor().hex   // "#ff0000"
picker.getColor().rgba  // "rgba(255, 0, 0, 1)"
picker.getColor().hsla  // "hsla(0, 100%, 50%, 1)"
```

### `.setAlphaEnabled(boolean)`
Enable or disable the alpha slider at runtime.
```js
picker.setAlphaEnabled(false); // hide alpha controls
picker.setAlphaEnabled(true);  // show alpha controls
```

### `.open()`
Programmatically open the picker. Has no effect if the picker is disabled.
```js
picker.open();
```

### `.close()`
Programmatically close the picker.
```js
picker.close();
```

### `.isOpen` *(getter)*
Returns `true` if this picker is currently open, `false` otherwise.
```js
if (picker.isOpen) {
    picker.close();
}
```

### `.disable()`
Disable the picker — prevents the picker from opening on click.
```js
picker.disable();
```

### `.enable()`
Re-enable a previously disabled picker.
```js
picker.enable();
```

### `.destroy()`
Fully remove the picker instance — cleans up event listeners, clears state, and removes the color from the element.
```js
picker.destroy();
```

---

## Events

| Event    | Callback args    | Description                        |
|----------|------------------|------------------------------------|
| `change` | `colors, source` | Fired every time the color changes |
| `open`   | `hex`            | Fired when the picker opens        |
| `close`  | `hex`            | Fired when the picker closes       |

```js
picker.on('open',  hex => console.log('opened with:', hex));
picker.on('close', hex => console.log('closed with:', hex));
```

### `colors` object

```js
{
    hex:  "#ff0000",
    hexa: "#ff0000ff",
    rgb:  "rgb(255, 0, 0)",
    rgba: "rgba(255, 0, 0, 1)",
    hsl:  "hsl(0, 100%, 50%)",
    hsla: "hsla(0, 100%, 50%, 1)"
}
```

### `source` string

The second argument to the `change` callback identifies what triggered the change:

| Value          | Triggered by                              |
|----------------|-------------------------------------------|
| `"drag"`       | Dragging the color box, hue, or alpha slider |
| `"input"`      | Typing into HEX, RGBA, or HSLA inputs     |
| `"api"`        | Calling `.setColor()` programmatically    |
| `"eyedropper"` | Picking a color with the EyeDropper API   |

```js
picker.on('change', (colors, source) => {
    if (source === 'drag') { /* update live preview only */ }
    if (source === 'api')  { /* skip — we triggered this */ }
});
```

---

## Multiple Instances

Each instance is independent — they share one picker UI but each stores its own color state.

```js
const picker1 = new hcgColor(document.getElementById('btn1'), { color: '#ff0000' });
const picker2 = new hcgColor(document.getElementById('btn2'), { color: '#0000ff' });
const picker3 = new hcgColor(document.getElementById('btn3'), { color: '#00ff00', alpha: false });

picker1.on('change', colors => console.log('Picker 1:', colors.hex));
picker2.on('change', colors => console.log('Picker 2:', colors.hex));
```

---

## Reading Color Without an Instance Reference

The current color is always stored on the trigger element via `data-color`, so you can read it anywhere without keeping a reference to the picker instance:

```js
// On form submit, collect all picker colors
document.querySelectorAll('.color-btn').forEach(btn => {
    console.log(btn.dataset.color); // "#ff0000"
});
```

---

## Usage in React

A dedicated React component is available as a separate package.

### Installation

```bash
npm install hcg-color-picker-react
```

### Import

```jsx
import ColorPicker from 'hcg-color-picker-react';
import 'hcg-color-picker-react/ColorPicker.css';
```

> `createPortal` is used internally and imported from `react-dom` — no extra setup needed.

---

### Props

| Prop        | Type       | Default     | Description                                       |
|-------------|------------|-------------|---------------------------------------------------|
| `color`     | `string`   | `'#ff0000'` | Initial color — HEX, RGB, HSL formats             |
| `onChange`  | `function` | —           | Called with `(colors, source)` every time the color changes |
| `onOpen`    | `function` | —           | Called with the current hex when the picker opens |
| `onClose`   | `function` | —           | Called with the final hex when the picker closes  |
| `alpha`     | `boolean`  | `true`      | Set to `false` to disable alpha control           |
| `debounce`  | `number`   | `0`         | ms to debounce the change event (0 = off)         |
| `disabled`  | `boolean`  | `false`     | Prevents the picker from opening                  |
| `className` | `string`   | —           | CSS class applied to the trigger button           |
| `style`     | `object`   | —           | Inline styles for the trigger button              |

---

### Basic usage

```jsx
import ColorPicker from 'hcg-color-picker-react';
import 'hcg-color-picker-react/ColorPicker.css';

function App() {
    function handleChange(colors, source) {
        console.log(colors.hex);   // "#ff0000"
        console.log(colors.rgba);  // "rgba(255, 0, 0, 1)"
        console.log(colors.hsla);  // "hsla(0, 100%, 50%, 1)"
        console.log(source);       // "drag" | "input" | "api" | "eyedropper"
    }

    return (
        <div>
            {/* Basic */}
            <ColorPicker color="#ff0000" onChange={handleChange} />

            {/* No alpha */}
            <ColorPicker color="#0000ff" alpha={false} onChange={handleChange} />

            {/* Debounced — change fires 200ms after the user stops dragging */}
            <ColorPicker color="#9c27b0" debounce={200} onChange={handleChange} />

            {/* Disabled */}
            <ColorPicker color="#00ff00" disabled={true} />
        </div>
    );
}

export default App;
```

---

### Programmatic API via `ref`

Use `ref` to call methods directly from a parent component:

```jsx
import { useRef } from 'react';
import ColorPicker from 'hcg-color-picker-react';
import 'hcg-color-picker-react/ColorPicker.css';

function App() {
    const pickerRef = useRef(null);

    return (
        <div>
            <ColorPicker
                ref={pickerRef}
                color="#ff9800"
                onChange={colors => console.log(colors.hex)}
            />

            <button onClick={() => pickerRef.current.setColor('#e91e63')}>Set Pink</button>
            <button onClick={() => alert(pickerRef.current.getColor().hex)}>Get Color</button>
            <button onClick={() => pickerRef.current.open()}>Open</button>
            <button onClick={() => pickerRef.current.close()}>Close</button>
            <button onClick={() => pickerRef.current.setAlphaEnabled(false)}>Disable Alpha</button>
        </div>
    );
}

export default App;
```

### Ref methods

| Method                   | Description                              |
|--------------------------|------------------------------------------|
| `.setColor(color)`       | Programmatically set the color           |
| `.getColor()`            | Returns current color as an object       |
| `.setAlphaEnabled(bool)` | Show or hide the alpha slider at runtime |
| `.open()`                | Programmatically open the picker         |
| `.close()`               | Programmatically close the picker        |
| `.enable()`              | Enable the picker                        |
| `.disable()`             | Disable the picker                       |

---

### Multiple instances

Each `<ColorPicker>` is a fully independent instance — no shared state between them:

```jsx
function App() {
    return (
        <div>
            <ColorPicker color="#f44336" onChange={c => console.log('Red picker:', c.hex)} />
            <ColorPicker color="#4caf50" onChange={c => console.log('Green picker:', c.hex)} />
            <ColorPicker color="#2196f3" alpha={false} onChange={c => console.log('Blue picker:', c.hex)} />
        </div>
    );
}
```

---

### React — Key notes

| | Reason |
|---|---|
| `forwardRef` | Allows parent components to access ref methods |
| `useImperativeHandle` | Exposes `setColor`, `getColor` etc. via ref |
| `createPortal` (from `react-dom`) | Renders picker popup at `document.body` level to avoid overflow/z-index issues |
| Unique SVG IDs per instance | Each picker generates unique gradient IDs — no conflicts with multiple instances |

---

## Browser Support

| Feature         | Support                                   |
|-----------------|-------------------------------------------|
| Color picker UI | All modern browsers                       |
| Touch events    | iOS Safari, Android Chrome               |
| EyeDropper API  | Chrome 95+, Edge 95+ (not Firefox/Safari) |

---

## License

MIT
