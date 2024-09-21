import React from 'react'

const Button = ({text,py='2',px='4',width = '30',height='12',tcolor='white',bcolor = 'blue',textsize='16',mt='0'}) => {
  return (
    <button
      className={`w-${width} h-${height} bg-${bcolor}-400 text-${tcolor} mt-${mt} text-${textsize} px-${px} py-${py} rounded-md hover:bg-${bcolor}-500`}
            
          >
            {text}
          </button>
  )
}

export default Button