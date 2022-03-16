"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withHooksHOC = void 0;
var react_1 = __importDefault(require("react"));
/**
 * Adds hooks to class component through props
 * @example
 *
 * class ClassComponent extends React.Component {
 *    componentDidUpdate() {
 *      console.log(this.props.data);
 *    }
 * }
 * const withApiData = withHooksHOC(() => {
 *   const [apiData, setApiData] = useState();
 *
 *   useEffect(() => {
 *     fetch("https://some-api.com").then(payload => {
 *        setApiData(payload);
 *     });
 *   }, []);
 *
 *   return {
 *      data: apiData
 *   }
 * }
 *
 * export default withApiData(ClassComponent)
 * @param {Function} {hookCallback} that uses hook inside and return goes to component through props
 * @return {Function} function that accepts react class component that should receive data from hook
 */
var withHooksHOC = function (hookCallback) { return function (Component) { return function (props) {
    var data = hookCallback();
    return react_1.default.createElement(Component, __assign({}, data, props));
}; }; };
exports.withHooksHOC = withHooksHOC;
//# sourceMappingURL=withHooks.js.map