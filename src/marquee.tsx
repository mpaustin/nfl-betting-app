import React, {useState} from 'react';


const Marquee = (props: any) => {

  const [isActive, setIsActive] = useState(true)


  function handleMouseEnter(e: any) {
    setIsActive(false);
  }

  function handleMouseLeave(e: any) {
    setIsActive(true);

  }

  return(
    <div className="marquee-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="marquee">
        <p className={isActive ? 'marquee-content' : 'marquee-content inactive'}>{props.string}</p>     
      </div>
    </div>
  )
}

export default Marquee;