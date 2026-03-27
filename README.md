# Google Web Designer Textarea Component

A custom Google Web Designer (GWD) component that adds a missing `textarea` UI element.

This component provides:
- A resizable multiline text input (`<my-textarea>`)
- `input` and `change` events with behavior similar to GWD text field components
- Public methods to select a text range or all text

## Why this component exists

Google Web Designer does not provide a native textarea component in the UI.
This project fills that gap with a lightweight custom element that can be dropped into GWD projects.

## Files

- `manifest.json` - component metadata for Google Web Designer
- `my-textarea.js` - custom element implementation
- `my-textarea.css` - default styling for the element

## Features

- Supports common textarea attributes:
  - `placeholder`
  - `value`
  - `maxlength`
  - `disabled`
  - `readonly`
  - `resize` (`both`, `vertical`, `horizontal`, `none`)
- Fires events:
  - `input` on every keystroke
  - `change` when focus leaves the field after value modification
- Exposes methods:
  - `selectRange(startIndex, endIndex)`
  - `selectAll()`

## Installation in Google Web Designer

1. ZIP three project files into one zip archive.
2. Open Google Web Designer.
3. Locate Custom Components in Components palette and click on PLUS sign, pick zipped file with these files.
4. Insert the component into your design and configure attributes in the Properties panel.

## Usage Notes

- The component reads initial host dimensions from GWD and applies them to the internal textarea.
- After initialization, the host size switches to `fit-content` to follow user resizing.
- Styling inherits from the host so GWD visual settings propagate into the textarea.

