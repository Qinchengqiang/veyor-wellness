import React, {useMemo} from "react";
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';
import classname from "classnames";
import _ from 'lodash';
import '../../assets/styles/widgets/input.scss';

const Input = ({input, setInput, errors, setErrors, name}) => {

    const changeHandler = (event) => {
        setInput(event.target.value);
        setErrors({});
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <input
                onChange={debouncedChangeHandler}
                type="text"
                defaultValue={input}
                className={classname('form-control', {'isValid': errors.type !== name},
                    {'isInvalid': errors.type === name})}
            />
            {!_.isEmpty(errors) &&  errors.type === name ? <p className="error-danger">{errors.title}</p> : null}
        </>
    );
};


Input.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired
};


export default React.memo(Input);