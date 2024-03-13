import React from 'react'


function Card(props) {
  return (
    <div className={`m-3 p-3 card ${props.className}`}><button className='btn m-auto' onClick={props.onClick}><h1 className='text-success '>{props.title}</h1></button></div>
    
  )
}

export default Card