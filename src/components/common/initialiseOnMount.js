import { useEffect } from 'react';

const initialiseOnMount = ComposedComponent =>
    function HOC(props) {
        // eslint-disable-next-line react/prop-types
        const { initialise, itemId } = props;
        useEffect(() => {
            if (initialise && itemId) {
                initialise({ itemId });
            } else if (initialise) {
                initialise(props);
            }
        }, [initialise, itemId]);

        return <ComposedComponent {...props} />;
    };

export default initialiseOnMount;
