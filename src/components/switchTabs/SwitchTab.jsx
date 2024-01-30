import React, { useState } from 'react'
import './switchTab.scss'
function SwitchTab({data,onTabChange}) {
    const[left,setLeft]=useState(0)
    const[activeTab,setActiveTab]=useState(0)
    function handleLeft(item,i){
        setLeft(100*i)
        setTimeout(() => {
            onTabChange(item)
        }, 300);
        setActiveTab(i)
    }
  return (
<div className="switchTab">
    <div className="tabItems">
    {
        data.map((item,index)=>{
            return (
                <span key={index} className={`tabItem ${activeTab==index?"active":""}`}
                onClick={()=>handleLeft(item,index)}
                >
                    {item}
                </span>
            )
        })
    }
    <span className="activeTabbg" style={{left}}></span>
    </div>
</div>  )
}

export default SwitchTab