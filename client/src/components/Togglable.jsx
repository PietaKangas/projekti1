import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {visible
        ? <div>{children}<button onClick={toggleVisibility}>Peruuta</button></div>
        : <button onClick={toggleVisibility}>{buttonLabel}</button>
      }
    </div>
  )
})

export default Togglable