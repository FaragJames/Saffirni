import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
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

// node_modules/@mui/system/esm/RtlProvider/index.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["value"];
var RtlContext = React.createContext();
function RtlProvider(_ref) {
  let {
    value
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return (0, import_jsx_runtime.jsx)(RtlContext.Provider, _extends({
    value: value != null ? value : true
  }, props));
}
true ? RtlProvider.propTypes = {
  children: import_prop_types.default.node,
  value: import_prop_types.default.bool
} : void 0;
var useRtl = () => {
  const value = React.useContext(RtlContext);
  return value != null ? value : false;
};
var RtlProvider_default = RtlProvider;

export {
  useRtl,
  RtlProvider_default
};
//# sourceMappingURL=chunk-LN63CCGL.js.map
