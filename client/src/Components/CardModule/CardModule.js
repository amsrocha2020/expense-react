import React, { Fragment } from 'react';
import './CardModule.css';

const CardModule = (props) => (
   <Fragment>
    <div class="module-card-wrap">
        <div class="module-card">
        <div class="module-card-title">{props.title}</div>
        <div class="module-card-meta">     
        </div> 
        <div class="module-card-bottom">
            {props.children}
        </div>
        </div>
    </div>
  </Fragment>
    );

export default CardModule;