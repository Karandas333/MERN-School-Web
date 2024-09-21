import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const CustomMouse = () => {

  document.body.addEventListener('mousemove', (e) => {
    gsap.to('.custom-mouse', {
      y: e.clientY + 5,
      x:  e.clientX + 5
  })
  })

  return (
    <div className='lg:block hidden z-[999] bg-[url("https://png.pngtree.com/png-clipart/20220726/original/pngtree-3d-pencil-yellow-png-image_8416165.png")] top-0 left-0 custom-mouse absolute w-[40px] h-[40px] bg-cover'></div>
  )
}

export default CustomMouse