// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'node:path';

// // https://vitejs.dev/config/
// export default defineConfig(() =>{
//   const rootPth = path.resolve(process.cwd());
//   const srcPath = `${rootPth}/src`;

//   return{
//     plugins: [react()],
//     resolve:{
//       alias:{
//         "~" : rootPth,
//         "@" : srcPath,
//       },
//     }
//   }
  
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  const rootPth = path.resolve(process.cwd());
  const srcPath = `${rootPth}/src`;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '~': rootPth,
        '@': srcPath,
      },
    },
  };
});
