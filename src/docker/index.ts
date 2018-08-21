import { Rule, SchematicContext, Tree  } from '@angular-devkit/schematics';
import {Schema as DockerOptions} from './schema'

export function docker(options: DockerOptions): Rule {
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
COPY --from=node /app/dist/${options.project} /usr/share/nginx/html
    `);
  };
}
