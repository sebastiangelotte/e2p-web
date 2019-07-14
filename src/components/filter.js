import React from "react"

import { Dropdown } from "semantic-ui-react"

const Filter = props => {
  let uniqueTags = new Set()
  let activeTags = []

  props.data.forEach(edge => {
    edge.node.tags && edge.node.tags.forEach(tag => uniqueTags.add(tag))
  })

  const filterOptions = Array.from(uniqueTags).map(tag => {
    return {
      key: tag,
      text: tag,
      value: tag,
    }
  })

  const filterItems = (event, dropdownData) => {
    activeTags = dropdownData.value

    props.onChange(
      activeTags.length
        ? props.data.filter(item => itemHasMatchingTag(item, activeTags))
        : [] // Tells parent component to reset its state if no tags are active
    )
  }

  const itemHasMatchingTag = item =>
    item.node.tags &&
    item.node.tags.filter(tag => activeTags.includes(tag)).length > 0

  return (
    <Dropdown
      placeholder="Filtrera på område"
      multiple
      selection
      options={filterOptions}
      onChange={filterItems}
    />
  )
}

export default Filter
