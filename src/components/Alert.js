import React from 'react'

function Alert(props) {
   


    return (

            <div style={{height: '50px'}} className="mb-4">
  
  { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissiable fade show`} role="alert">
      
      <strong>
     { 
    props.alert.type=="danger"?"Error":"Success"
     }
        
      </strong>:{props.alert.msg}
      
      </div> }

            </div>

    )
    }

export default Alert
