import React from 'react'

import { Dropdown } from 'semantic-ui-react'

const Filter = (props) => {
    // Extract the tags and put the into structure that <Dropdown /> expects
    let uniqueTags = new Set()
    props.data.forEach(edge => {
        edge.node.tags && edge.node.tags.forEach(tag => uniqueTags.add(tag))
    })
    let filterOptions = Array.from(uniqueTags).map(tag => {
        return {
            key: tag,
            text: tag,
            value: tag
        }
    })


    const filterItems = (event, data) => {
        doFiltering(data.value)
    }

    function doFiltering (activeTags) {
        if (activeTags.length < 1) {
            props.onChange([])
        } else {
            const data = props.data
            const result = data.filter(item => 
                itemHasMatchingTag(item, activeTags)
            )

            props.onChange(result)
        }
    }

    function itemHasMatchingTag (item, activeTags) {
        if (item.node.tags === null) return false
        let matchingTags = item.node.tags.filter(tag => activeTags.includes(tag))
        if (matchingTags.length > 0) return true
        return false
    }

    return (
        <Dropdown 
            placeholder='Filtrera på område' 
            multiple selection 
            options={filterOptions} 
            onChange={filterItems} />
    )
}

export default Filter


