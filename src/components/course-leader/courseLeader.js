import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const CouseLeader = (props) => {
    return ( 
        <div className="teaser">
            <h3 className="teaser__heading">Kursledare</h3>
            <div className="contact-card">
                {/* <img className="contact-card__image" 
                    src={props.data.image.fixed.src} 
                    height={props.data.image.fixed.width}
                    width={props.data.image.fixed.height}
                    alt={props.data.image.title} /> */}
                <div className="contact-card__text">
                    <h4>{props.data.name}</h4>
                </div>
            </div>
            <br />
            {documentToReactComponents(props.data.description.json)}
        </div>
     )
}
 
export default CouseLeader;
