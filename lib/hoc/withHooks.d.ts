import { ComponentClass } from "react";
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
export declare const withHooksHOC: (hookCallback: () => any) => (Component: ComponentClass) => (props: any) => JSX.Element;
//# sourceMappingURL=withHooks.d.ts.map