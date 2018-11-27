import React from 'react'

export const Bus = (props) => 
<div>
  <div className="battery">
    { props.battery >= 65 &&
    <div className="battery-status" style={{width:`${props.battery}%`, backgroundColor:`green`}}></div>
    }
    { props.battery >= 30 && props.battery <65 &&
    <div className="battery-status" style={{width:`${props.battery}%`, backgroundColor:`#f4a742`}}></div>
    }
    { props.battery < 30 &&
    <div className="battery-status" style={{width:`${props.battery}%`, backgroundColor:`#e54b4b`}}></div>
    }
  </div>
  <img className="bus-image" src='https://image.flaticon.com/icons/png/512/2/2322.png' alt="bus icon"/>
</div>