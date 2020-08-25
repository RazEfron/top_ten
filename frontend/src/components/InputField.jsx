// import React from "react";

// function InputField(props) {
//     
//     const { type, name } = props
//     switch (type) {
//       case "TextString":
//         return (
//             <label>
//               {name}
//               <input
//                 type="text"
//                 value={formState[name]["hebrew"]}
//                 name={type}
//                 id={name}
//                 //   key={}
//                 onChange={update("hebrew")}
//                 placeholder={name}
//               />
//               <input
//                 type="text"
//                 value={formState[name]["english"]}
//                 name={type}
//                 id={name}
//                 //   key={}
//                 onChange={update("english")}
//                 placeholder={name}
//               />
//             </label>
//         );
//       case "string":
//         return (
//             <label>
//               {name}
//               <input
//                 type="text"
//                 value={formState[name]}
//                 // key={}
//                 onChange={update(name)}
//                 placeholder={name}
//               />
//             </label>
//         );
//       case "date":
//         return (
//             <label>
//               {name}
//               <input
//                 type="date"
//                 value={formState[name]}
//                 // key={}
//                 onChange={update(name)}
//               />
//             </label>
//         );
//       case "boolean":
//         return (
//             <label>
//               {name}
//               <input
//                 type="checkbox"
//                 checked={formState[name]}
//                 name={type}
//                 // key={}
//                 onChange={update(name)}
//               />
//             </label>
//         );
//       case "number":
//         return (
//             <label>
//               {name}
//               <input
//                 type="number"
//                 value={formState[name]}
//                 // key={}
//                 onChange={update(name)}
//                 placeholder={name}
//               />
//             </label>
//         );
//       case "image":
//         return (
//             <label>
//               {name}
//               <input
//                 type="file"
//                 name="myImage"
//                 onChange={update("image")}
//                 accept="image/*"
//               />
//             </label>
//         );
//       default:
//         break;
//     }
// }

// export default InputField;
