import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Input from "../widgets/input";
import _ from "lodash";

const handleSubmit = (e, props) => {
    const {id, title} = props;
    e.preventDefault();

    console.log(`handleSubmit: ${id} ${title}`)
};

const SampleForm = props => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [idErrors, setIdErrors] = useState({});
    const [titleErrors, setTitleErrors] = useState({});

    const submitProps = {id, setId, title, setTitle};

    const addingService = (
        <div className='w-100'>
            <form className="w-100 text-start" onSubmit={e => {
                handleSubmit(e, submitProps);
            }}>
                <div className="form-group">
                    <label className="control-label">id<span className='pl-4'>*</span></label>
                    <Input setInput={setId}
                           errors={idErrors}
                           setErrors={setIdErrors}/>
                    {!_.isEmpty(idErrors) ? <p className="text-danger">{idErrors.title}</p> : null}
                </div>
                <div className="form-group mt-4">
                    <label className="control-label">title<span className='pl-4'>*</span></label>
                    <Input setInput={setTitle}
                           errors={titleErrors}
                           setErrors={setTitleErrors}/>
                    {!_.isEmpty(titleErrors) ? <p className="text-danger">{titleErrors.title}</p> : null}
                </div>
                <div className="mt-5 form-group d-flex justify-content-center">
                    <button className="btn w-75 btn-outline-danger btn-lg rounded-pill">Submit
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <>
            <h3>{props.title}</h3>
            <p>ID: {id}</p>
            <p>title: {title}</p>
            <div className='row justify-content-center mt-3 pb-5'>
                <div className="d-flex flex-row">
                    {addingService}
                </div>
            </div>
        </>
    );
};

SampleForm.propTypes = {
    title: PropTypes.string
};

SampleForm.defaultProps = {
    title: 'Sample Form'
}

export default React.memo(SampleForm);