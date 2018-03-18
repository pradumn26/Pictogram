import React from 'react';

const ContentNotFound = () => {
    return (
        <div>
            <img src="/images/Instagram-grey.png"
                 style={{
                     width: '200px',
                     height: 'auto',
                     display: 'block',
                     marginLeft: 'auto',
                     marginRight: 'auto'
                 }}/>
            <div style={{
                color: 'grey',
                fontSize: '40px',
                textAlign: 'center'
            }}>
                No content
                <br/>
                Available
            </div>
        </div>
    );
};

export default ContentNotFound;