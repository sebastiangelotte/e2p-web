import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import {
    Card,
} from 'semantic-ui-react'

const CouseLeader = (props) => {
    const description = props.data.description !== undefined ? documentToReactComponents(props.data.description.json) : null
    return ( 
        <Card
            fluid
            image={props.data.image.fixed.src}
            header={props.data.name}
            meta={props.data.title}
            description={description}
        />
     )
}
 
export default CouseLeader;
