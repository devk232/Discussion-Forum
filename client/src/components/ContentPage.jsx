import React from 'react'
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { useState } from 'react';
function ContentPage() {

//  Quiz Generation
const [quizSearch,setQuizSearch]=useState("");

// const [toQuiz,setToQuiz]=useState(0);
    const [obj,setobj]=useState({});
    const [userSearch,setUserSearch]=useState("hello");
    const [content,setContent]=useState("");
    const MODEL_NAME = "gemini-pro";
    const API_KEY = "AIzaSyCaGAhM12gInhJSVkdeu6Z6oHN_EIwf9PQ";    
    async function run(userString,type) {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
   
      const parts = [{ text:  userString }];
    
      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };
    
      const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ];
    
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
    
      const response = result.response;
      if(type==="Content"){
        setContent(response.text());
        // console.log(response.text());
      }
      else{
        let newString = response.text();
        // setContent(response.text());
        console.log(newString);
        
        const cur_json=JSON.parse(newString);
    
        // setobj(cur_json);
       const content=cur_json;  
       setobj(cur_json);  
       content.Questions.forEach((item,index)=>{
        const ques=`Question ${index+1}: ${item.Question}`;
         const ans=`answer :${item.Correct_Answer}`;
         console.log(ques);
          
         item.Options.forEach((curOption,index1)=>{
          console.log(`${String.fromCharCode(97+index1) })  ${curOption}`);
         })
        
        //  console.log(ans);
     })

      }
     
    }
    
    const handleSubmit=()=>{
     run(userSearch,"Content");
     setQuizSearch(`Generate 4 medium-level MCQ questions on ${userSearch} along with options. Also, mention the correct answer at the end of all questions along with the question number. Please generate questions and answers in the JSON format given below:'Question: .....Options: ....Correct_Answer: ....'ALERT: Don't use any markdowns. Give output in JSON format. Enclose all the questions in an additional curly brace.`)
     run(quizSearch,"Quiz")
     setUserSearch("");
     quizSearch("");

    }
   
    

  return (
    <>
    {/* <div>Hello World</div> */}
     <div>
      <input type="text" 
        onInput={(e)=>setUserSearch(e.target.value)}      
      />

      <button 
      onClick={handleSubmit}>Submit</button>

 <textarea  name="postContent" 
         rows={40}
         cols={40}
        value={content} // ...force the input's value to match the state variable...
        onChange={(e) => setContent(e.target.value)} 

      />
<Link to="QuizPage" state={{ from: "obj" }} > <button type='button' >Quiz</button></Link>
</div>
    </>
  )
}


export default ContentPage;