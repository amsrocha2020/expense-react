import React from 'react';

const cards = (props) => (
   <div>
    <div className={"card " + props.cardClass}>
      <div className="card-body text-center">
        <div className="row">
          <div className="col card-logo mx-auto">
            <div className="cards-description">{props.cardDescription}</div>
            <div className="cards-subdescription">{props.cardDescriptionsub}</div>
          </div>
          <div className="col card-info mx-auto">
            <div className="money">€ {props.money}</div> 
          </div>
        </div>
      </div>
    </div>
  </div>
    );

    export default cards;