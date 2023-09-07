import React from 'react'

const GradientBox = ({ gradient }) => {
    const boxStyle = {
      background: gradient,
      width: '100%',
    //   height: '100vh',
    };
  
    return <div className="gradient-box rounded-lg lg:h-40 xl:h-56 h-48 border-white border-2 relative" style={boxStyle}></div>
  };

export default GradientBox