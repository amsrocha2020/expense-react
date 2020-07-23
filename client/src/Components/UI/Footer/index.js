import React from 'react';

import './Footer.css';

const Footer = () => {
    return(
        <div className="footer">
            <span>Copyright © 2020 Miguel Rocha. All rights reserved.</span>
            <span>
              <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
            </span>
            <span className="ml-auto hidden-xs">
              Made with{' '}
              <span role="img" aria-label="taco">
                🌮🌮🌮
              </span>
            </span>
        </div>
    )
}

export default Footer;