import React, {useMemo, useRef} from "react";
import debounce from "lodash.debounce";
import filterIconURL from "../assets/images/icons/filter.png";
import {Form} from "react-bootstrap";
import PropTypes from 'prop-types';
import '../assets/styles/widgets/filterForm.scss';

function FilterForm({setInput}) {
    const value = useRef('');

    const changeHandler = (event) => {
        setInput(event.target.value);
        value.current = event.target.value;
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Form onSubmit={e => {
                e.preventDefault();
                setInput(value.current)
            }}>
                <Form.Group controlId="formFilter">
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={filterIconURL} width="14" height="15" alt=""/>
                    </div>
                    <Form.Control className='filterInput d-flex'
                                  placeholder="filter"
                                  onChange={debouncedChangeHandler}/>
                </Form.Group>
            </Form>
        </>
    );
}

FilterForm.propTypes = {
    setInput: PropTypes.func.isRequired
};

export default React.memo(FilterForm);