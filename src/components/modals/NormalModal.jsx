import React from 'react'

const NormalModal = ({ isOpen, setisOpen, children }) => {
    if (isOpen)
        return (
            <div className='my-modal' onClick={()=>setisOpen(false)}>
              <div onClick={(e)=>e?.stopPropagation()}>
                {children}</div>  
            </div>
        )
    else return null
}

export default NormalModal