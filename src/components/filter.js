import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FilterForm from '../widgets/FilterForm';

const Filter = props => {
    const [input, setInput] = useState('');

    return (
        <div>
            <h5>{props.title}</h5>
            <p>filtering word: {input}</p>
            <FilterForm setInput={setInput}/>
        </div>
    );
};

Filter.propTypes = {
    title: PropTypes.string
};

Filter.defaultProps = {
    title: 'Sample Filter'
}

export default Filter;