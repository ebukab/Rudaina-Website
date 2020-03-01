import React from 'react';
import './donatePage.css';
import ScriptTag from 'react-script-tag';

export default () => {
    return (
        <div className="donatePageContainer">
            <div className="donatePage">
                <div>
                    <div className="donatePageInstructions">
                        {/*<p><span className="arrow">&#8601;</span>Scroll With Sides</p>
                        <p>Scroll With Sides <span className="arrow">&#8600;</span></p> */}
                    </div>
                </div>
                <ScriptTag isHydrating={false} id="ch_cdn_embed" type="text/javascript" data-page-id="32254" data-cfasync="false" data-formtype="1" src="https://www.canadahelps.org/services/wa/js/apps/donatenow/embed.min.js" /> 
            </div>
        </div>
    )
}

