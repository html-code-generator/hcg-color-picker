/*!
 * hcg-color-picker v2.0.0
 * Google Chrome style color picker — vanilla JS, lightweight, alpha support, EyeDropper API
 *
 * @author   HTML Code Generator
 * @website  https://www.html-code-generator.com/
 * @github   https://github.com/html-code-generator
 * @license  MIT
 */
(function (global) {
    'use strict';

    // -- HTML template ----------------------------------------------
    const template = `
        <svg id="hcg_color_box" width="230" height="130">
            <defs>
                <linearGradient id="hcg_saturation" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#fff"></stop>
                    <stop id="hcg_saturation_stop" offset="100%" stop-color="hsl(0,100%,50%)"></stop>
                </linearGradient>
                <linearGradient id="hcg_brightness" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(0,0,0,0)"></stop>
                    <stop offset="100%" stop-color="#000"></stop>
                </linearGradient>
                <pattern id="hcg_pattern" width="100%" height="100%">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#hcg_saturation)"></rect>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#hcg_brightness)"></rect>
                </pattern>
            </defs>
            <rect width="230" height="130" stroke="#fff" fill="url(#hcg_pattern)" cursor="crosshair"></rect>
            <g id="hcg_box_dragger" style="transform: translate3d(219px, 14px, 0);">
                <circle r="9" fill="none" stroke="#000" stroke-width="2"></circle>
                <circle r="7" fill="none" stroke="#fff" stroke-width="2"></circle>
            </g>
        </svg>
        <br>
        <div class="hcg_slider_container">
        <div class="hcg_eye_dropper">
            <button id="hcg_eye_dropper_btn" style="display:none;" title="Eye dropper [C]"><svg width="22" height="22" fill="#333"><path d="m20.71 5.63-2.34-2.34a.996.996 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42M6.92 19 5 17.08l8.06-8.06 1.92 1.92z"/></svg></button>
            <div class="hcg_preview_wrap">
                <svg width="35" height="35">
                    <rect rx="33" ry="33" x="1" y="1" width="33" height="33" fill="url(#hcg_checkerboard)"></rect>
                    <rect rx="33" ry="33" x="1" y="1" width="33" height="33" id="hcg_color_preview" stroke="#ddd" stroke-width="1"></rect>
                </svg>
                <button id="hcg_copy_btn" title="Copy color"><svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"/></svg></button>
            </div>
        </div>
        <div id="hcg_color_sliders">

            <svg id="hcg_hue_slider" width="148" height="22">
                <defs>
                    <filter id="hcg_rect_shadow" x="-10%" y="-20%" width="120%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation=".5" flood-color="rgba(0,0,0,0.9)"></feDropShadow>
                    </filter>
                    <linearGradient id="hcg_hue" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%"      stop-color="#f00"></stop>
                        <stop offset="16.666%" stop-color="#ff0"></stop>
                        <stop offset="33.333%" stop-color="#0f0"></stop>
                        <stop offset="50%"     stop-color="#0ff"></stop>
                        <stop offset="66.666%" stop-color="#00f"></stop>
                        <stop offset="83.333%" stop-color="#f0f"></stop>
                        <stop offset="100%"    stop-color="#f00"></stop>
                    </linearGradient>
                </defs>
                <g transform="translate(9, 4.5)">
                    <rect rx="2" ry="2" width="130" height="13" fill="url(#hcg_hue)" cursor="crosshair"></rect>
                    <g id="hcg_hue_dragger" style="transform: translate3d(130px, 6.5px, 0);">
                        <circle r="7.5" fill="none" stroke="#fff" stroke-width="2" filter="url(#hcg_rect_shadow)"></circle>
                    </g>
                </g>
            </svg>
            <svg id="hcg_alpha_slider" class="hcg_alpha_control" width="148" height="22">
                <defs>
                    <pattern id="hcg_checkerboard" width="13" height="13" patternUnits="userSpaceOnUse">
                        <rect width="13" height="13" fill="#fff"></rect>
                        <rect width="6.5" height="6.5" fill="#d7d7d7"></rect>
                        <rect x="6.5" y="6.5" width="6.5" height="6.5" fill="#d7d7d7"></rect>
                    </pattern>
                    <linearGradient id="hcg_opacity" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop id="hcg_opacity_stop" offset="0%" stop-color="#000"></stop>
                        <stop offset="100%" stop-color="transparent"></stop>
                    </linearGradient>
                </defs>
                <g transform="translate(9, 4.5)">
                    <rect rx="2" ry="2" x="0" y="0" width="130" height="13" fill="url(#hcg_checkerboard)"></rect>
                    <rect rx="2" ry="2" x="0" y="0" width="130" height="13" fill="url(#hcg_opacity)" cursor="crosshair"></rect>
                    <g id="hcg_alpha_dragger" style="transform: translate3d(130px, 6.5px, 0);">
                        <circle r="7.5" fill="none" stroke="#fff" stroke-width="2" filter="url(#hcg_rect_shadow)"></circle>
                    </g>
                </g>
            </svg>
        </div>
        </div>

        <div id="hcg_color_values" tabindex="0">
            <div class="hcg_color_input">
                <div id="hcg_hexa_row">
                    <div class="hcg_color_col">
                        <label><input id="hcg_hex_input" type="text" maxlength="9" spellcheck="false" value="#ff0000" aria-label="Hex color value">HEX</label>
                    </div>
                </div>
                <div id="hcg_rgba_row" style="display:none;">
                    <div class="hcg_color_col">
                        <label><input class="hcg_rgba_input" type="number" min="0" max="255" aria-label="Red">R</label>
                    </div>
                    <div class="hcg_color_col">
                        <label><input class="hcg_rgba_input" type="number" min="0" max="255" aria-label="Green">G</label>
                    </div>
                    <div class="hcg_color_col">
                        <label><input class="hcg_rgba_input" type="number" min="0" max="255" aria-label="Blue">B</label>
                    </div>
                    <div class="hcg_color_col hcg_alpha_control">
                        <label><input class="hcg_rgba_input hcg_alpha_input" type="number" step="0.01" min="0" max="1" aria-label="Alpha">A</label>
                    </div>
                </div>
                <div id="hcg_hsla_row" style="display:none;">
                    <div class="hcg_color_col">
                        <label><input class="hcg_hsla_input" type="number" min="0" max="360" aria-label="Hue">H</label>
                    </div>
                    <div class="hcg_color_col">
                        <label><input class="hcg_hsla_input" type="number" min="0" max="100" aria-label="Saturation">S%</label>
                    </div>
                    <div class="hcg_color_col">
                        <label><input class="hcg_hsla_input" type="number" min="0" max="100" aria-label="Lightness">L%</label>
                    </div>
                    <div class="hcg_color_col hcg_alpha_control">
                        <label><input class="hcg_hsla_input hcg_alpha_input" type="number" step="0.01" min="0" max="1" aria-label="Alpha">A</label>
                    </div>
                </div>
            </div>
            <button id="hcg_switch_color_type" title="change color format">
                <svg width="25" height="25" fill="none" stroke="#9b9b9b" stroke-width="2"><path d="m7 15 5 5 5-5M7 9l5-5 5 5"/></svg>
            </button>
        </div>
    `;

    // -- DOM elements (populated on first use) ----------------------
    const els = {
        picker:          null,
        colorBox:        null,
        colorPreview:    null,
        boxDragger:      null,
        saturationStop:  null,
        opacityStop:     null,
        hueSlider:       null,
        hueDragger:      null,
        alphaSlider:     null,
        alphaDragger:    null,
        colorTextValues: null,
        hexa:            null,
        rgba:            null,
        hsla:            null,
        hexInput:        null,
        rgbaInputs:      null,
        hslaInputs:      null,
        switchBtn:       null,
        eyeDropperBtn:   null,
        copyBtn:         null,
        alphaControls:   null,
    };

    // -- Shared state ----------------------------------------------
    const state = {
        instance:         null,
        pickerOpen:       false,
        activeDrag:       null,      // 'box' | 'hue' | 'alpha' | null
        currentPointerId: null,      // pointerId of the active drag, for explicit capture release
        colorMode:  'HEXA',
        hue:        0,
        saturation: 100,
        lightness:  50,
        alpha:      1,
    };

    // -- Performance helpers ---------------------------------------
    const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
    let prevHue    = -1;       // guard redundant gradient repaints
    let activeRect = null;     // cached getBoundingClientRect on pointerdown

    // -- Compiled regexes ------------------------------------------
    const HEX_RE = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

    // -- Color converters ------------------------------------------
    function HSLAToRGBA(h, s, l, a, toHex) {
        h = ((h % 360) + 360) % 360;   // normalise any finite hue to [0, 360)
        s /= 100; l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;
        if      (h < 60)  { r = c; g = x; }
        else if (h < 120) { r = x; g = c; }
        else if (h < 180) { g = c; b = x; }
        else if (h < 240) { g = x; b = c; }
        else if (h < 300) { r = x; b = c; }
        else              { r = c; b = x; }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return toHex ? RGBAToHexA(r, g, b, a) : { r, g, b, a };
    }

    function RGBAToHSLA(r, g, b, a) {
        a = (a === undefined) ? 1 : +a;
        r /= 255; g /= 255; b /= 255;
        const cmin  = Math.min(r, g, b);
        const cmax  = Math.max(r, g, b);
        const delta = cmax - cmin;
        let h = 0, s = 0;
        const l = (cmax + cmin) / 2;
        if (delta !== 0) {
            s = delta / (1 - Math.abs(2 * l - 1));
            if      (cmax === r) h = ((g - b) / delta) % 6;
            else if (cmax === g) h = (b - r) / delta + 2;
            else                 h = (r - g) / delta + 4;
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        return { h, s: parseFloat((s * 100).toFixed(4)), l: parseFloat((l * 100).toFixed(4)), a };
    }

    function RGBAToHexA(r, g, b, a) {
        const pad   = n => n.toString(16).padStart(2, '0');
        const rgb   = pad(r) + pad(g) + pad(b);
        const alpha = pad(Math.round(a * 255));
        return '#' + (alpha === 'ff' ? rgb : rgb + alpha);
    }

    function parseColor(color) {
        const fallback = { h: 0, s: 100, l: 50, a: 1 };
        if (!isValidColorString(color)) return fallback;
        color = color.trim().toLowerCase();
        if (color[0] === '#') {
            let hex = color;
            if (hex.length === 4) hex = '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];           // #rgb  → #rrggbb
            if (hex.length === 5) hex = '#' + hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3]+hex[4]+hex[4]; // #rgba → #rrggbbaa
            if (hex.length === 7) hex += 'ff';                                                      // #rrggbb → #rrggbbff
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const a = +(parseInt(hex.slice(7, 9), 16) / 255).toFixed(3);
            return RGBAToHSLA(r, g, b, a);
        }
        const parts = color.match(/-?\d*\.?\d+%?/g);
        const nums  = parts.map(parseFloat);
        if (color.startsWith('rgb')) {
            const isPercent = parts[0].endsWith('%');
            const r = isPercent ? Math.round(nums[0] * 2.55) : nums[0];
            const g = isPercent ? Math.round(nums[1] * 2.55) : nums[1];
            const b = isPercent ? Math.round(nums[2] * 2.55) : nums[2];
            const a = parts[3] ? (parts[3].endsWith('%') ? nums[3] / 100 : nums[3]) : 1;
            return RGBAToHSLA(r, g, b, a);
        }
        if (color.startsWith('hsl')) {
            const h = ((nums[0] % 360) + 360) % 360;
            const a = parts[3] ? (parts[3].endsWith('%') ? nums[3] / 100 : nums[3]) : 1;
            return { h, s: nums[1], l: nums[2], a };
        }
        return fallback;
    }

    function isValidColorString(color) {
        if (!color || typeof color !== 'string') return false;
        color = color.trim().toLowerCase();
        if (color[0] === '#') return HEX_RE.test(color);
        const parts = color.match(/-?\d*\.?\d+%?/g);
        if (!parts) return false;
        const nums = parts.map(parseFloat);
        if (nums.some(n => !Number.isFinite(n))) return false;
        if (color.startsWith('rgb')) {
            const isPercent = parts[0].endsWith('%');
            const [r, g, b] = nums;
            const a = parts[3] ? (parts[3].endsWith('%') ? nums[3] / 100 : nums[3]) : 1;
            const max = isPercent ? 100 : 255;
            return parts.length >= 3 && r >= 0 && r <= max && g >= 0 && g <= max && b >= 0 && b <= max && a >= 0 && a <= 1;
        }
        if (color.startsWith('hsl')) {
            const [h, s, l] = nums;
            const a = parts[3] ? (parts[3].endsWith('%') ? nums[3] / 100 : nums[3]) : 1;
            return parts.length >= 3 && Number.isFinite(h) && s >= 0 && s <= 100 && l >= 0 && l <= 100 && a >= 0 && a <= 1;
        }
        return false;
    }

    // -- Build full color set from state or explicit h/s/l/a -------
    function buildColorSet(h, s, l, a) {
        if (h === undefined) { h = state.hue; s = state.saturation; l = state.lightness; a = state.alpha; }
        const rgba = HSLAToRGBA(h, s, l, a);
        const hexa = RGBAToHexA(rgba.r, rgba.g, rgba.b, a);
        const hex  = '#' + hexa.slice(1, 7);   // always 6-digit, no alpha
        return {
            hex,
            hexa,
            rgb:  `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`,
            rgba: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${a})`,
            hsl:  `hsl(${h}, ${s}%, ${l}%)`,
            hsla: `hsla(${h}, ${s}%, ${l}%, ${a})`,
        };
    }

    // -- UI updaters ------------------------------------------------
    function updateDisplays(color) {
        state.hue        = +color.h;
        state.saturation = +color.s;
        state.lightness  = +color.l;
        state.alpha      = +color.a;
        setHueGradient(state.hue);
        updateInputValues();
        updateDraggers();
    }

    function updateDraggers() {
        const { hue: h, saturation: s, lightness: l, alpha: a } = state;

        const s_hsl = s / 100, l_hsl = l / 100;
        const b_hsb = l_hsl + s_hsl * Math.min(l_hsl, 1 - l_hsl);
        const s_hsb = b_hsb === 0 ? 0 : 2 * (1 - l_hsl / b_hsb);
        const bx = clamp(s_hsb * 227 + 3, 3, 230);
        const by = clamp((1 - b_hsb) * 127 + 3, 3, 130);
        els.boxDragger.style.transform = `translate3d(${bx}px, ${by}px, 0)`;

        const hueX   = clamp((1 - h / 360) * 130, 0, 130);
        const alphaX = clamp(a * 130, 0, 130);
        els.hueDragger.style.transform   = `translate3d(${hueX}px, 6.5px, 0)`;
        els.alphaDragger.style.transform = `translate3d(${alphaX}px, 6.5px, 0)`;
    }

    function updateInputValues() {
        const skip = document.activeElement;   // never overwrite the field being edited
        const { hue: h, saturation: s, lightness: l, alpha: a } = state;
        if (state.colorMode === 'HEXA') {
            if (els.hexInput !== skip)
                els.hexInput.value = HSLAToRGBA(h, s, l, a, true);
        } else if (state.colorMode === 'RGBA') {
            const rgba = HSLAToRGBA(h, s, l, a);
            if (els.rgbaInputs[0] !== skip) els.rgbaInputs[0].value = rgba.r;
            if (els.rgbaInputs[1] !== skip) els.rgbaInputs[1].value = rgba.g;
            if (els.rgbaInputs[2] !== skip) els.rgbaInputs[2].value = rgba.b;
            if (els.rgbaInputs[3] !== skip) els.rgbaInputs[3].value = rgba.a;
        } else {
            if (els.hslaInputs[0] !== skip) els.hslaInputs[0].value = h;
            if (els.hslaInputs[1] !== skip) els.hslaInputs[1].value = Math.round(s);
            if (els.hslaInputs[2] !== skip) els.hslaInputs[2].value = Math.round(l);
            if (els.hslaInputs[3] !== skip) els.hslaInputs[3].value = a;
        }
    }

    // -- Apply color to active instance ----------------------------
    function applyColor() {
        if (!state.instance) return;
        const colors = buildColorSet();
        if (colors.hexa === state.instance.lastChange) return;
        state.instance.lastChange            = colors.hexa;
        state.instance.element.dataset.color = colors.hexa;
        state.instance.element.style.background = colors.hexa;
        els.colorPreview.setAttribute('fill', colors.hexa);
        const inst = state.instance;
        if (inst._debounce > 0) {
            inst._pendingColors = colors;
            clearTimeout(inst._debounceTimer);
            inst._debounceTimer = setTimeout(() => {
                inst._debounceTimer = null;
                inst._emit('change', inst._pendingColors);
                inst._pendingColors = null;
            }, inst._debounce);
        } else {
            inst._emit('change', colors);
        }
    }

    function setAlphaControlsVisible(visible) {
        els.alphaControls.forEach(el => { el.style.display = visible ? '' : 'none'; });
    }

    function setHueGradient(h) {
        if (h === prevHue) return;
        prevHue = h;
        const c = `hsl(${h}, 100%, 50%)`;
        els.saturationStop.setAttribute('stop-color', c);
        els.opacityStop.setAttribute('stop-color', c);
    }

    // -- RAF drag throttle ------------------------------------------
    let rafId = null;

    const queueUpdate = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            updateInputValues();
            applyColor();
        });
    };

    // -- Position picker relative to trigger button ----------------
    let scrollHandler = null;
    let resizeHandler = null;

    function positionPicker(instance) {
        const rect = instance.element.getBoundingClientRect();
        const ph   = els.picker.offsetHeight;
        const pw   = els.picker.offsetWidth;

        // Flip above if not enough space below but enough space above
        let top;
        if (rect.bottom + ph > window.innerHeight && rect.top >= ph) {
            top = rect.top + window.scrollY - ph - 2;
        } else {
            top = rect.bottom + window.scrollY + 2;
        }

        let left = rect.left + window.scrollX;
        if (left + pw > window.innerWidth - 20) {
            left -= (left + pw - window.innerWidth) + 20;
        }

        els.picker.style.top  = top + 'px';
        els.picker.style.left = left + 'px';
    }

    // -- Outside-click handler (attached/detached dynamically) -----
    function onOutsideClick(e) {
        if (state.instance && state.instance.element.contains(e.target)) return;
        let target = e.target;
        while (target) {
            if (target === els.picker) return;
            if (target === document.documentElement) { closePicker(); return; }
            target = target.parentNode;
        }
    }

    // -- Open / close ----------------------------------------------
    function openPicker(instance) {
        state.instance   = instance;
        state.pickerOpen = true;
        els.picker.style.display = 'block';

        // Restore this instance's color mode
        state.colorMode = instance._colorMode || 'HEXA';
        els.hexa.style.display = state.colorMode === 'HEXA' ? 'flex' : 'none';
        els.rgba.style.display = state.colorMode === 'RGBA' ? 'flex' : 'none';
        els.hsla.style.display = state.colorMode === 'HSLA' ? 'flex' : 'none';

        const alphaEnabled = instance._alphaEnabled !== false;
        setAlphaControlsVisible(alphaEnabled);
        if (!alphaEnabled) {
            state.alpha            = 1;
            instance.alpha         = 1;
            instance.alphaPosition = 130;
        }

        positionPicker(instance);

        // Reposition on scroll while picker is open
        scrollHandler = () => positionPicker(state.instance);
        document.addEventListener('scroll', scrollHandler, { capture: true, passive: true });
        resizeHandler = () => positionPicker(state.instance);
        window.addEventListener('resize', resizeHandler, { passive: true });
        document.addEventListener('pointerdown', onOutsideClick);

        updateDisplays(parseColor(instance.lastChange));
        els.colorTextValues.focus();
        els.colorPreview.setAttribute('fill', instance.lastChange);
        instance._emit('open', instance.lastChange);
    }

    function closePicker() {
        if (!state.pickerOpen) return;
        state.pickerOpen = false;
        els.picker.style.display = 'none';
        if (scrollHandler) {
            document.removeEventListener('scroll', scrollHandler, { capture: true });
            scrollHandler = null;
        }
        if (resizeHandler) {
            window.removeEventListener('resize', resizeHandler);
            resizeHandler = null;
        }
        document.removeEventListener('pointerdown', onOutsideClick);
        stopDrag();                                 // release any active pointer capture
        const hadPending = rafId !== null;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        const closing = state.instance;
        if (closing) {
            closing._colorMode = state.colorMode;
            if (hadPending) applyColor();   // flush only if a RAF was pending
            if (closing._debounceTimer) {   // flush any pending debounced change immediately
                clearTimeout(closing._debounceTimer);
                closing._debounceTimer = null;
                closing._emit('change', closing._pendingColors);
                closing._pendingColors = null;
            }
        }
        if (closing) closing._emit('close', closing.lastChange);
    }

    // -- Drag handlers ----------------------------------------------
    function boxHandler(clientX, clientY) {
        const ex = clamp(clientX - activeRect.left, 3, 230);
        const ey = clamp(clientY - activeRect.top,  3, 130);
        els.boxDragger.style.transform = `translate3d(${ex}px, ${ey}px, 0)`;
        const s_hsb = (ex - 3) / 227;
        const b     = 1 - (ey - 3) / 127;
        const l     = b * (1 - s_hsb / 2);
        const s_hsl = (l === 0 || l === 1) ? 0 : (b - l) / Math.min(l, 1 - l);

        state.instance.colorPosition = { x: ex, y: ey };
        state.saturation = Math.round(s_hsl * 100);
        state.lightness  = Math.round(l * 100);

        queueUpdate();
    }

    function hueHandler(clientX) {
        const ex      = clamp(clientX - activeRect.left - 9, 0, 130);
        const percent = ex / 130;
        state.instance.huePosition = ex;
        els.hueDragger.style.transform = `translate3d(${ex}px, 6.5px, 0)`;
        state.hue = Math.round(360 - 360 * percent) % 360;
        setHueGradient(state.hue);
        queueUpdate();
    }

    function alphaHandler(clientX) {
        const ex = clamp(clientX - activeRect.left - 9, 0, 130);
        els.alphaDragger.style.transform = `translate3d(${ex}px, 6.5px, 0)`;
        state.alpha = parseFloat((ex / 130).toFixed(2));
        state.instance.alphaPosition = ex;
        state.instance.alpha         = state.alpha;
        queueUpdate();
    }

    // -- Release pointer capture and reset drag state ---------------
    function stopDrag() {
        if (state.currentPointerId !== null) {
            const el = state.activeDrag === 'box'   ? els.colorBox
                     : state.activeDrag === 'hue'   ? els.hueSlider
                     : state.activeDrag === 'alpha' ? els.alphaSlider
                     : null;
            if (el) { try { el.releasePointerCapture(state.currentPointerId); } catch (_) {} }
            state.currentPointerId = null;
        }
        state.activeDrag = null;
    }

    // -- Event helper and drag binder ------------------------------
    const on = (el, ev, fn) => el.addEventListener(ev, fn);

    function bindDrag(el, type, handler) {
        on(el, 'pointerdown', e => {
            el.setPointerCapture(e.pointerId);
            state.currentPointerId = e.pointerId;
            activeRect = el.getBoundingClientRect();
            state.activeDrag = type;
            handler(e.clientX, e.clientY);
        });
        on(el, 'pointermove', e => {
            if (state.activeDrag !== type) return;
            handler(e.clientX, e.clientY);
        });
        on(el, 'pointerup',          stopDrag);
        on(el, 'pointercancel',      stopDrag);
        on(el, 'lostpointercapture', stopDrag);
    }

    // -- Inject picker UI and bind all events (called once) --------
    let pickerReady = false;

    function initPicker() {
        if (pickerReady) return;
        pickerReady = true;

        const pickerEl = document.createElement('div');
        pickerEl.id = 'hcg_color_picker';
        pickerEl.innerHTML = template;
        document.body.appendChild(pickerEl);

        // -- Cache all DOM elements --------------------------------
        els.picker          = pickerEl;
        els.colorBox        = pickerEl.querySelector('#hcg_color_box');
        els.colorPreview    = pickerEl.querySelector('#hcg_color_preview');
        els.boxDragger      = pickerEl.querySelector('#hcg_box_dragger');
        els.saturationStop  = pickerEl.querySelector('#hcg_saturation_stop');
        els.opacityStop     = pickerEl.querySelector('#hcg_opacity_stop');
        els.hueSlider       = pickerEl.querySelector('#hcg_hue_slider');
        els.hueDragger      = pickerEl.querySelector('#hcg_hue_dragger');
        els.alphaSlider     = pickerEl.querySelector('#hcg_alpha_slider');
        els.alphaDragger    = pickerEl.querySelector('#hcg_alpha_dragger');
        els.colorTextValues = pickerEl.querySelector('#hcg_color_values');
        els.hexa            = pickerEl.querySelector('#hcg_hexa_row');
        els.rgba            = pickerEl.querySelector('#hcg_rgba_row');
        els.hsla            = pickerEl.querySelector('#hcg_hsla_row');
        els.hexInput        = pickerEl.querySelector('#hcg_hex_input');
        els.rgbaInputs      = pickerEl.querySelectorAll('.hcg_rgba_input');
        els.hslaInputs      = pickerEl.querySelectorAll('.hcg_hsla_input');
        els.switchBtn       = pickerEl.querySelector('#hcg_switch_color_type');
        els.eyeDropperBtn   = pickerEl.querySelector('#hcg_eye_dropper_btn');
        els.copyBtn         = pickerEl.querySelector('#hcg_copy_btn');
        els.alphaControls   = pickerEl.querySelectorAll('.hcg_alpha_control');

        // -- Pointer events (mouse + touch unified) ----------------
        els.colorBox.style.touchAction    = 'none';
        els.hueSlider.style.touchAction   = 'none';
        els.alphaSlider.style.touchAction = 'none';

        bindDrag(els.colorBox,    'box',   boxHandler);
        bindDrag(els.hueSlider,   'hue',   hueHandler);
        bindDrag(els.alphaSlider, 'alpha', alphaHandler);

        // -- Color mode switch --------------------------------------
        const COLOR_MODES = ['HEXA', 'RGBA', 'HSLA'];
        const modeEls     = { HEXA: els.hexa, RGBA: els.rgba, HSLA: els.hsla };

        on(els.switchBtn, 'click', () => {
            modeEls[state.colorMode].style.display = 'none';
            state.colorMode = COLOR_MODES[(COLOR_MODES.indexOf(state.colorMode) + 1) % 3];
            modeEls[state.colorMode].style.display = 'flex';
            if (state.instance) state.instance._colorMode = state.colorMode;
            updateInputValues();
        });

        // -- Hex input ----------------------------------------------
        on(els.hexInput, 'input', function () {
            if (HEX_RE.test(this.value)) {
                updateDisplays(parseColor(this.value));
                applyColor();
            }
        });

        // -- RGBA inputs --------------------------------------------
        els.rgbaInputs.forEach(input => {
            on(input, 'input', () => {
                const [r, g, b, a] = [...els.rgbaInputs].map(i => +i.value);
                if (!isFinite(r + g + b + a)) return;
                if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) return;
                const p = RGBAToHSLA(r, g, b, a);
                state.hue = +p.h; state.saturation = +p.s; state.lightness = +p.l; state.alpha = +p.a;
                setHueGradient(state.hue);
                updateDraggers();
                queueUpdate();
            });
        });

        // -- HSLA inputs --------------------------------------------
        els.hslaInputs.forEach(input => {
            on(input, 'input', () => {
                const [h, s, l, a] = [...els.hslaInputs].map(i => +i.value);
                if (!isFinite(h + s + l + a)) return;
                if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100 || a < 0 || a > 1) return;
                state.hue = h; state.saturation = s; state.lightness = l; state.alpha = a;
                setHueGradient(state.hue);
                updateDraggers();
                queueUpdate();
            });
        });

        // -- EyeDropper --------------------------------------------
        if ('EyeDropper' in window) {
            els.eyeDropperBtn.style.display = 'block';
            on(els.eyeDropperBtn, 'click', async () => {
                try {
                    const result = await new EyeDropper().open();
                    updateDisplays(parseColor(result.sRGBHex));
                    applyColor();
                } catch (_) { }
            });
        }

        // -- Copy color button -------------------------------------
        const COPY_ICON  = els.copyBtn.innerHTML;
        const CHECK_ICON = `<svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
        let   copyTimeout = null;

        on(els.copyBtn, 'click', () => {
            if (!state.instance) return;
            const colors = buildColorSet();
            const text   = state.colorMode === 'RGBA' ? colors.rgba
                         : state.colorMode === 'HSLA' ? colors.hsla
                         : colors.hexa;
            navigator.clipboard?.writeText(text);
            clearTimeout(copyTimeout);
            els.copyBtn.innerHTML = CHECK_ICON;
            copyTimeout = setTimeout(() => {
                els.copyBtn.innerHTML = COPY_ICON;
            }, 1500);
        });
    }

    // -- Calculate positions from color string ----------------------
    function calcPositionsFromColor(color) {
        const parsed = parseColor(color);
        const s_hsl  = parsed.s / 100;
        const l_hsl  = parsed.l / 100;
        const b_hsb  = l_hsl + s_hsl * Math.min(l_hsl, 1 - l_hsl);
        const s_hsb  = b_hsb === 0 ? 0 : 2 * (1 - l_hsl / b_hsb);
        return {
            parsed,
            colorPosition: {
                x: clamp(s_hsb * 227 + 3, 3, 230),
                y: clamp((1 - b_hsb) * 127 + 3, 3, 130),
            },
            huePosition:   clamp((1 - parsed.h / 360) * 130, 0, 130),
            alphaPosition: clamp(parsed.a * 130, 0, 130),
            alpha:         parsed.a,
        };
    }

    // -- Constructor ------------------------------------------------
    /**
     * @param {HTMLElement} element                - The trigger button element
     * @param {object}      [opts]                 - Configuration options
     * @param {string}      [opts.color='#ff0000'] - Initial color (hex, rgb, hsl)
     * @param {Function}    [opts.onChange]         - Shorthand change callback
     * @param {boolean}     [opts.alpha=true]       - Enable alpha channel
     * @param {number}      [opts.debounce=0]       - ms to debounce the change event (0 = off)
     * @param {boolean}     [opts.disabled=false]   - Start in disabled state (also reads the element's disabled attribute)
     *
     * @example
     * const picker = new hcgColor(btn, { color: '#ff0000', debounce: 150 });
     * picker.on('change', colors => console.log(colors.hex));
     */
    function hcgColor(element, opts) {
        opts = opts || {};
        initPicker();

        this.element        = element;
        this._listeners     = {};
        this._alphaEnabled  = opts.alpha !== false;
        this._debounce      = (typeof opts.debounce === 'number' && opts.debounce > 0) ? opts.debounce : 0;
        this._debounceTimer = null;
        this._pendingColors = null;

        const initColor      = isValidColorString(opts.color) ? opts.color : '#ff0000';
        const positions      = calcPositionsFromColor(initColor);
        const { h: ph, s: ps, l: pl, a: pa } = positions.parsed;
        const rgba           = HSLAToRGBA(ph, ps, pl, pa);
        const effectiveAlpha = this._alphaEnabled ? positions.alpha : 1;
        const hex            = RGBAToHexA(rgba.r, rgba.g, rgba.b, effectiveAlpha);

        this.lastChange    = hex;
        this.colorPosition = positions.colorPosition;
        this.huePosition   = positions.huePosition;
        this.alphaPosition = this._alphaEnabled ? positions.alphaPosition : 130;
        this.alpha         = effectiveAlpha;
        this._colorMode    = 'HEXA';

        element.dataset.color    = hex;
        element.style.background = hex;

        this._disabled     = opts.disabled === true || element.hasAttribute('disabled');
        this._clickHandler = () => {
            if (state.instance === this && state.pickerOpen) { closePicker(); return; }
            if (state.pickerOpen) closePicker();
            openPicker(this);
        };
        if (typeof opts.onChange === 'function') this.on('change', opts.onChange);
        if (this._disabled) {
            element.setAttribute('disabled', '');
        } else {
            element.addEventListener('click', this._clickHandler);
        }
    }

    // -- EventEmitter API ------------------------------------------
    hcgColor.prototype.on = function (event, fn) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(fn);
        return this;
    };

    hcgColor.prototype.off = function (event, fn) {
        if (this._listeners[event]) {
            this._listeners[event] = this._listeners[event].filter(f => f !== fn);
        }
        return this;
    };

    hcgColor.prototype._emit = function (event, data) {
        (this._listeners[event] || []).forEach(fn => fn(data));
    };

    // -- Public instance methods ------------------------------------
    hcgColor.prototype.open = function () {
        if (this._disabled) return this;
        if (state.pickerOpen) closePicker();
        openPicker(this);
        return this;
    };

    hcgColor.prototype.close = function () {
        if (state.instance === this) closePicker();
        return this;
    };

    Object.defineProperty(hcgColor.prototype, 'isOpen', {
        get: function () { return state.instance === this && state.pickerOpen; },
    });

    hcgColor.prototype.setColor = function (color) {
        if (!isValidColorString(color)) return this;
        const positions = calcPositionsFromColor(color);
        const parsed    = positions.parsed;
        if (!this._alphaEnabled) parsed.a = 1;
        const rgba      = HSLAToRGBA(parsed.h, parsed.s, parsed.l, parsed.a);
        const hexa      = RGBAToHexA(rgba.r, rgba.g, rgba.b, parsed.a);
        this.element.dataset.color      = hexa;
        this.element.style.background   = hexa;
        this.lastChange    = hexa;
        this.colorPosition = positions.colorPosition;
        this.huePosition   = positions.huePosition;
        this.alphaPosition = this._alphaEnabled ? positions.alphaPosition : 130;
        this.alpha         = parsed.a;
        if (state.instance === this) {
            updateDisplays(parsed);
            els.colorPreview.setAttribute('fill', hexa);
        }
        this._emit('change', buildColorSet(parsed.h, parsed.s, parsed.l, parsed.a));
        return this;
    };

    hcgColor.prototype.getColor = function () {
        const p = parseColor(this.lastChange);
        return buildColorSet(p.h, p.s, p.l, p.a);
    };

    hcgColor.prototype.setAlphaEnabled = function (enabled) {
        this._alphaEnabled = !!enabled;
        if (!this._alphaEnabled) {
            this.alpha         = 1;
            this.alphaPosition = 130;
            const parsed = parseColor(this.element.dataset.color);
            parsed.a = 1;
            const rgba = HSLAToRGBA(parsed.h, parsed.s, parsed.l, 1);
            const hex  = RGBAToHexA(rgba.r, rgba.g, rgba.b, 1);
            this.element.dataset.color    = hex;
            this.element.style.background = hex;
            this.lastChange = hex;
        }
        if (state.instance === this) {
            setAlphaControlsVisible(this._alphaEnabled);
            if (!this._alphaEnabled) {
                state.alpha = 1;
                const parsed = parseColor(this.lastChange);
                parsed.a = 1;
                updateDisplays(parsed);
                els.colorPreview.setAttribute('fill', this.lastChange);
            }
        }
        return this;
    };

    hcgColor.prototype.disable = function () {
        if (this._disabled) return this;
        this._disabled = true;
        this.element.removeEventListener('click', this._clickHandler);
        this.element.setAttribute('disabled', '');
        if (state.instance === this) closePicker();
        return this;
    };

    hcgColor.prototype.enable = function () {
        if (!this._disabled) return this;
        this._disabled = false;
        this.element.addEventListener('click', this._clickHandler);
        this.element.removeAttribute('disabled');
        return this;
    };

    hcgColor.prototype.destroy = function () {
        this.element.removeEventListener('click', this._clickHandler);
        if (state.instance === this) {
            closePicker();
            state.instance = null;
        }
        if (this._debounceTimer) {
            clearTimeout(this._debounceTimer);
            this._debounceTimer = null;
        }
        this._pendingColors = null;
        this.lastChange    = null;
        this.colorPosition = null;
        this.huePosition   = null;
        this.alphaPosition = null;
        this.alpha         = null;
        delete this.element.dataset.color;
        this.element.style.background = '';
        this.element.removeAttribute('disabled');
        this._listeners    = {};
        this._clickHandler = null;
        this._disabled     = false;
    };

    // -- Expose globally --------------------------------------------
    global.hcgColor = hcgColor;

})(window);
