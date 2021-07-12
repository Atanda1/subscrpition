import React from 'react'

const MessageBox = ({message}) => (
 <div className="pet">
    <div className="pet-name">{message.user}</div>
    <div className="pet-type">{message.content}</div>
  </div>
)

export default MessageBox 
