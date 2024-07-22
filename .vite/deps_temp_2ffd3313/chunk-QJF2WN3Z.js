import {
  init_useTheme,
  useTheme_default
} from "./chunk-VA456JGA.js";
import {
  init_resolveProps,
  resolveProps
} from "./chunk-OLXF3J6S.js";
import {
  __esm
} from "./chunk-V4OQ3NZ2.js";

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}
var init_getThemeProps = __esm({
  "node_modules/@mui/system/esm/useThemeProps/getThemeProps.js"() {
    init_resolveProps();
  }
});

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId
}) {
  let theme = useTheme_default(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}
var init_useThemeProps = __esm({
  "node_modules/@mui/system/esm/useThemeProps/useThemeProps.js"() {
    "use client";
    init_getThemeProps();
    init_useTheme();
  }
});

// node_modules/@mui/system/esm/useThemeProps/index.js
var init_useThemeProps2 = __esm({
  "node_modules/@mui/system/esm/useThemeProps/index.js"() {
    "use client";
    init_useThemeProps();
    init_getThemeProps();
  }
});

export {
  getThemeProps,
  useThemeProps,
  init_useThemeProps2 as init_useThemeProps
};
//# sourceMappingURL=chunk-QJF2WN3Z.js.map
