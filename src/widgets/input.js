import React, {useMemo, useState} from "react";
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';
import classname from "classnames";
import _ from 'lodash';
import '../assets/styles/widgets/input.scss';

const ModalInput = ({setInput, errors, setErrors}) => {
    const [value, setValue] = useState('');

    const changeHandler = (event) => {
        setInput(event.target.value);
        setErrors({});
        setValue(event.target.value);
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
        // eslint-disable-next-line
    }, []);

    return (
        <input
            onChange={debouncedChangeHandler}
            type="text"
            className={classname('form-control', {'is-valid': !errors.title && value},
                {'is-invalid': errors.title || _.isEmpty(value)})}
        />
    );
};


ModalInput.propTypes = {
    setInput: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired
};


export default React.memo(ModalInput);