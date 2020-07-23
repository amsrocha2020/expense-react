import React, { Fragment } from 'react';

import './CardModule.css';

const CardModule = (props) => (
   <Fragment>
    <div className="module-card-wrap">
        <div className="module-card">
        <div className="module-card-title">{props.title}</div>
        <div className="module-card-meta">     
        </div> 
        <div className="module-card-bottom">
            {props.children}
        </div>
        </div>
    </div>
  </Fragment>
);

export default CardModule;