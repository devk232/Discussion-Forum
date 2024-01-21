import React, { useRef, useState } from 'react'
import "./QuizPage.css"
import { useLocation } from 'react-router-dom'

function QuizPage({data}) {
    console.log(data);
 const [index,setIndex]=useState(0);
 const [curQ,setcurQ]=useState(data[index]);
 const [lock,setLock]=useState(false); 
 const location = useLocation()
 const { from } = location.state
// console.log(from);
 const option1=useRef(null);
 const option2=useRef(null);
 const option3=useRef(null);
 const option4=useRef(null);

 const option_array=[option1,option2,option3,option4]; 
 const next=()=>{
   if(lock==true){
    setIndex((index)=>index+1);
    setcurQ(data[index]);
    setLock(false);
  
     option_array.map((option)=>{
      option.current.classList.remove("Wrong");
      option.current.classList.remove("Correct");
     })

   }

 
 }

 const checkAns=(e,curOption,optionNo)=>{
  
    if(lock==false){
      if(curQ.Correct_Answer===curOption){
        e.target.classList.add("Correct");
        
      }
     else{
      option_array.map((option)=>{
          
         if(option.current.focus===curQ.Correct_Answer){
          option_array[optionNo].current.classList.add("Correct"); 
         }
         
       })

      e.target.classList.add("Wrong");
     }
     setLock(true);
    }
   
 }

  return (
    <>
      
<div className="container">

 <h1>Q{index+1} : {curQ.Question}</h1>
 <hr />
 <ul >
  <li ref={option1} onClick={(e)=>checkAns(e,curQ.Options[0],0)}>{curQ.Options[0]}</li>
  <li ref={option2} onClick={(e)=>checkAns(e,curQ.Options[1],1)}>{curQ.Options[1]}</li>
  <li ref={option3} onClick={(e)=>checkAns(e,curQ.Options[2],2)}>{curQ.Options[2]}</li>
  <li ref={option4} onClick={(e)=>checkAns(e,curQ.Options[3],3)}>{curQ.Options[3]}</li>
 </ul>
<button onClick={next}>Next</button>
</div>

    </>
  )
}

export default QuizPage