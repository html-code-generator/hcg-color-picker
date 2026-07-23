# Changelog

All notable changes to hcg-color-picker are documented here.

## [2.0.6] - 2026-07-23

### Added

- `setColor(color, silent)` - pass `true` as the second argument to update the swatch and panel without firing the `change` event.

## [2.0.5] - 2026-07-18

### Added

- `hcgColor.get(element | selector)` - return the picker instance for a trigger element, or `null`.
- `hcgColor.destroy(element | selector)` - destroy a picker by element without keeping an instance reference.
- `hcgColor.destroyAll()` - destroy every active picker instance.
- Instance registry on `element._hcgColor` for element-based lookup.
