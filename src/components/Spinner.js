import React from 'react';
import loading from './loading.gif.gif';

const Spinner = () =>{

    return (
      <div>
            <img className='my-4' src={loading} alt='loading' 
            style={{display:"block", margin:"0 auto", width:"75px", height:"auto"}}/>
      </div>
    )
}

export default Spinner;
