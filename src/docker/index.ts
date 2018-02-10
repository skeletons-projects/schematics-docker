import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

export function docker(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(
      "Dockerfile",
      `
FROM node:9.5 as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.13
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    `
    );
    tree.create(
      ".dockerignore",
      `
.git
node_modules
npm-debug
config
    `
    );
    tree.create(
      "nginx.conf",
      `
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
    `
    );
    return tree;
  };
}
