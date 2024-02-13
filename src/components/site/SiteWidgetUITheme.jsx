// ------------------------------ std libs ------------------------------- //
// ------------------------------ 3rd libs ------------------------------- //
import * as React from "react";
import styled from "styled-components";
// ------------------------------ own libs ------------------------------- //
// ------------------------------ project  ------------------------------- //
import { WidgetUITheme } from "/src/components/widgets/index.js";

/**
 * WidgetUITheme
 * @example
 *
 */

function SiteWidgetUITheme() {
  return <WidgetUITheme style={{ paddingRight: 0 }} size="25" />;
}

export { SiteWidgetUITheme };
