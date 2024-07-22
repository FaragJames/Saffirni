import {
  extendSxProp,
  init_styleFunctionSx,
  init_styled_engine,
  init_useTheme,
  styleFunctionSx_default,
  styled,
  useTheme_default
} from "./chunk-VA456JGA.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-AQHXBISI.js";
import {
  ClassNameGenerator_default,
  _extends,
  _objectWithoutPropertiesLoose,
  generateUtilityClasses,
  init_ClassNameGenerator,
  init_extends,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  require_prop_types
} from "./chunk-VTJKSZGF.js";
import {
  require_jsx_runtime
} from "./chunk-JO3Y3TZY.js";
import {
  require_react
} from "./chunk-65KY755N.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/@mui/system/esm/Box/Box.js
var import_prop_types = __toESM(require_prop_types());
init_ClassNameGenerator();

// node_modules/@mui/system/esm/createBox.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
init_clsx();
init_styled_engine();
init_styleFunctionSx();
init_useTheme();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "component"];
function createBox(options = {}) {
  const {
    themeId,
    defaultTheme,
    defaultClassName = "MuiBox-root",
    generateClassName
  } = options;
  const BoxRoot = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as"
  })(styleFunctionSx_default);
  const Box2 = React.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme_default(defaultTheme);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded);
    return (0, import_jsx_runtime.jsx)(BoxRoot, _extends({
      as: component,
      ref,
      className: clsx_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme
    }, other));
  });
  return Box2;
}

// node_modules/@mui/system/esm/Box/boxClasses.js
init_generateUtilityClasses();
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
var boxClasses_default = boxClasses;

// node_modules/@mui/system/esm/Box/Box.js
var Box = createBox({
  defaultClassName: boxClasses_default.root,
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;

export {
  createBox,
  boxClasses_default,
  Box_default
};
//# sourceMappingURL=chunk-5V7EVQKX.js.map
