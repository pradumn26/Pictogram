import React from 'react';

const LoginFormField = ({label, meta: {touched, error}, input}) => {
    return (
        <div style={{padding: '0', marginTop: '20px'}}
             className="row col-12">
            <div style={{padding: '0', position: 'relative', left: '30px'}}
                 className="input-group input-group-md row col-12">
                <span className="input-group-addon col-4">{label}</span>
                <input {...input}
                       type={input.name === 'password' ? 'password' : ''}
                       className="col-8"/>
            </div>
            <div style={{padding: '0', position: 'relative', left: '15px'}}
                 className="col-12">{touched && error}</div>
        </div>
    );
};

export default LoginFormField;