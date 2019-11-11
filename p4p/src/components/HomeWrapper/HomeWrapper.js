import React from 'react';
import 'components/HomeWrapper/HomeWrapper.scss'

const HomeWrapper = (props) => {
    return ( 
        <div className="homeWrapper">
            {props.children}
        </div>
        
     );
}
 
export default HomeWrapper;