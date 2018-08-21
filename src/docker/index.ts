import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function docker(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree.create("Dockerfile", 
    `
FROM node:10 as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --prod

FROM nginx:1.13
COPY --from=node /app/dist/App /usr/share/nginx/html
    `);
  };
}
