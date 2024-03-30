import React from 'react'



function Card(props) {
  return (
 
  
    <div className={` homeCard` } onClick={props.onClick}>
    <img src={props.src}/>
    <h1 className='text-muted text-center '>{props.title}</h1></div>  
  )
}

export default Card