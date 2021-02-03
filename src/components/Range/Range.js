import React from 'react'
import './Range.scss'
import classnames from 'classnames'

const Range = (props) => {
  const  { className, theme='', size, ...attributes } = props
  let colors = theme.split(' ')
  
  const classes = classnames(
    className, 
    "custom-range",
    colors.length > '1' ? `thumb-${colors[0]} bg-${colors[1]}` : `thumb-${colors[0]}`,
    size && size === 'small' ? "small" : ''

  )

  return (
    <input onChange={()=>props.onChange} { ...attributes } className={classes} type="range"/>
  )
}

export default Range
