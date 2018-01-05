import React from 'react';

const SignUpFormField = ({input, meta: {touched, error}, elementType, inputType, placeHolder}) => {
    if (elementType == 'input')
        return (
            <div className="col-sm form-group">
                <input
                    type={inputType}
                    className="form-control"
                    placeholder={placeHolder}
                    name={input.name}
                    {...input}
                />
                <div style={{color: '#ea3001'}}>{touched && error}</div>
            </div>
        );
    else if (elementType == 'select')
        return (
            <div className="col-sm form-group">
                <select className="form-control" name={input.name}>
                    <option>male</option>
                    <option>female</option>
                </select>
            </div>
        );
};

export default SignUpFormField;