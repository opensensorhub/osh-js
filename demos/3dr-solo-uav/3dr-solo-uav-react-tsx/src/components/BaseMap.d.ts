import * as React from "react";
declare type CustomValue = any;
interface Props {
    propA: CustomValue;
}
declare class BaseMap extends React.PureComponent {
    readonly token: string;
    divId: string;
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default BaseMap;
