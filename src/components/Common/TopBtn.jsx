import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const IconButton = styled.div`
  width: 42px;
  height: 42px;
  background-color: #333;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9;
`

const TopBtn = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true)

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true)
    } else {
      if (show) setShow(false)
    }
  }

  useEffect(() => {
    if (showBelow) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} aria-label="to top" component="span">
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  )
}
export default TopBtn
