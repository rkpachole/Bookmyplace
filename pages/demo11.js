// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Demo11 = () => {
//     const [CustomData, setCustomData] = useState([])

//     useEffect(()=>{
//         get();
//         },[])
//     const get = () => {

//         var headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',

//         };
//         fetch(`https://teammember.techpanda.art/api/user/menu/`, {
//             method: 'GET',
//             // credentials: 'same-origin',
//             headers: headers,
//         })
//             .then((Response) => Response.json())
//             .then((Response) => {
//                 setCustomData(Response)
//                 console.log('RESPONS TARUNget api-------------->>>>', Response)
//                 var states = Object.keys(Response).length;
//                 console.log('length api data states----->>>>>', states)
//                 let CityArray = [];
//                 for (var i = 0; i < states; i++) {
//                     // console.log('for loop',states)
//                     CityArray.push({

//                         group: Response[i].group,
//                         submenu: Response[i].submenu, 

//                     })
//                 }
//                 console.log('custom aray data', CityArray)
//                 setCustomData(CityArray)
//             })
//             .catch((error) => {
//                 console.error("ERROR FOUND" + error);
//             })
//     }
//     return (
//         <>
//              <nav>
//                 {CustomData.map((items,index)=>( 

             
//     <div class="navbar">
//       <i class='bx bx-menu'></i>
//       <div class="logo"><a href="#">logo</a></div>
//       {/* <div class="logo"><a href="#">{items.group}</a></div> */}
//       <div class="nav-links">
//         <div class="sidebar-logo">
//           <span class="logo-name">Logo1</span>
//           <i class='bx bx-x' ></i>
//         </div>
        
//         <ul class="links">
//           <li><a href="#">HOME</a></li>
//           <li>
//             <a href="#">{items.group}</a>
//             <i class='bx bxs-chevron-down htmlcss-arrow arrow  '></i>
//             <ul class="htmlCss-sub-menu sub-menu">  
//             { items.submenu.map((data)=>
                                 
//                             <li><a href="#">{data.subsubname}</a></li>
                         
//                                  )}
//             </ul>
//           </li>
         
//       </div>
//     </div>
// ))}
//   </nav>
           
//         </>

//     )
// }

// export default Demo11;