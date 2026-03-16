// import { useState } from 'react'
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import QuizPage from './QuizPage.jsx';


// function Quiz() {

//   const MODEL_NAME = "gemini-pro";
//   const API_KEY = "AIzaSyCaGAhM12gInhJSVkdeu6Z6oHN_EIwf9PQ";    
  
//   async function run(userString) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });
 
//     const parts = [{ text:  userString }];
  
//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };
  
//     const safetySettings = [
//       { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//       { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//       { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//       { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//     ];
  
//     const result = await model.generateContent({
//       contents: [{ role: "user", parts }],
//       generationConfig,
//       safetySettings,
//     });
  
//     const response = result.response;
   
   
    
//     // obj.forEach((item,index)=>{
//     //   console.log(index);
//     //    console.log(item);
//     // })

//     // console.log(typeof(response.text().json()));
//   }
  
//   const handleSubmit=()=>{
//    run(userSearch);
//    setToQuiz(true);
//   }
 
  
//   return (
//     <>

// {toQuiz?<></>:<>

// <div>
//       <button 
//       onClick={handleSubmit}>Submit</button>
//      </div>
// </>}

// {(!toQuiz)?<></>:<>

// <QuizPage data={obj.Questions}/>
// </>}

//     </>
//   )
// }

// export default Quiz