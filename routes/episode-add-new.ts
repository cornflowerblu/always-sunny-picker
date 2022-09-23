// import { NextFunction, Request, Response } from "express";
// import { router } from './index';

// router.get('/test', (req: Request, res: Response, next: NextFunction) => {
//   fetch('https://premium-elf-94.hasura.app/v1/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-hasura-admin-secret': 'YYY38EsSmNv5hYcIfhTLCWM1EBObmYJATjc6dab4daPyJ2k3mfavJsnamTpvaU6Q'
//     },
//     body: JSON.stringify({
//       mutation: `{
//         insert_episodes(objects: {
//           season_id: "d04168ed-1282-4ed6-81ba-7e0c8ea6ac14", 
//           episode_number: 4, 
//           title: "Charlie Has Cancer", 
//           description: "The gang learns that Charlie might have cancer; they hatch a scheme to alleviate his pain; Mac proves that he's a narcissist."
//         }){
//           returning {
//             id
//             title
//           }
//         }
//       }`
//     })
//   })
//   Promise.resolve().then(data => console.log('data returned:', data))
//     .finally(() => res.render('test', {
//       data: res.json()
//     }));
// });

