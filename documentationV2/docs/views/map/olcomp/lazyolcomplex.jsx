import React from "react"
import useBaseUrl from '@docusaurus/useBaseUrl';

const Placeholder = () => null

const LazyOlMapComplex = props => {
    // While the component is loading, we'll render a fallback placeholder.
    // (The Placeholder is a component that renders nothing).
    const [Component, setComponent] = React.useState(() => Placeholder)
    // After the initial render, kick off a dynamic import to fetch
    // the real component, and set it into our state.
    React.useEffect(() => {
        import("./OlMapComplex.jsx").then(Thing => setComponent(() => Thing.default))
    }, [])
    return <Component {...{...props, base: useBaseUrl('/')}} />
}

export default LazyOlMapComplex
