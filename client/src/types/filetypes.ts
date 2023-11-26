// declare module "*.svg" {
//     import * as React from "react";

//     const ReactComponent: React.FunctionComponent<
//       React.SVGProps<SVGSVGElement> & { title?: string }
//     >;

//     export default ReactComponent;
//   }

/**
 * Import SVG files as text and use with the img src attribute.
 */
declare module '*.svg' {
    const value: string
    export default value
}

declare module '*.png' {
    const value: string
    export default value
}

declare module '*.jpg' {
    const value: string
    export default value
}
