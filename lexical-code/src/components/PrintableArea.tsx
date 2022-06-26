import html2canvas from 'html2canvas'
import React, { LegacyRef, useRef } from 'react'

type props = {
  children: React.ReactElement
}
const PrintableArea: React.FC<props> = ({
  children
}) => {
  const ref = React.createRef<HTMLDivElement>()
  const print = async () => {
    const element = ref.current
    if (element === null) return

    const canvas = await html2canvas(element)
    const data = canvas.toDataURL('image/jpg')
    const link = document.createElement('a')
    if (typeof link.download === 'string') {
      link.href = data
      link.download = 'image.jpg'
      document.body.appendChild(link)
      link.click()
      document.removeChild(link)
    }
  }

  return (
    <div>
      <button onClick={print}>
        Print
      </button>
      <div ref={ref}>
        {children}
      </div>
    </div>
  )
}


export default PrintableArea