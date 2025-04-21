# Assets Directory

This directory contains all the image assets used in the project. It is organized into subdirectories for better management and accessibility.

## Structure

- **logo/**: Contains logo images in various formats such as PNG and SVG.
- **pictures/**: Contains additional images used throughout the project.

## Usage

To use any of the images in this directory, you can import them directly from the `assets` directory. The `index.ts` file in the `assets` directory exports all images, making them easily accessible.

### Example

Here's how you can import and use an image in your component:

```javascript
import React from "react";
import { bime, zahra } from "./assets";

const MyComponent = () => (
  <div>
    <img src={bime} alt="Bime Logo" />
    <img src={zahra} alt="Zahra" />
  </div>
);

export default MyComponent;
```

## Adding New Images

To add new images, place them in the appropriate subdirectory (`logo` or `pictures`) and update the `index.ts` file to export the new images. This ensures that all images remain accessible from a single point of import.

## Notes

- Ensure that image names are unique across the entire `assets` directory to avoid conflicts.
- Use descriptive names for images to make it easier to identify their purpose.
