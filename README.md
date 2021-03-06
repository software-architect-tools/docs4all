# Docs4all

<img src="https://static2.cbrimages.com/wordpress/wp-content/uploads/2019/10/My-Hero-Academia-All-Might-Header.jpg" width="100%">

Doc4all is a very lightweight web server to convert your markdown files into a usable wiki or Knowledge base for your company.

# Basic Usage

- Create a new npm project
- add this package.json
```json
{
  "name": "acme-docs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "supervisor -e 'js|md' index.js"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "docs4all": "software-architect-tools/docs4all",
    "supervisor": "^0.12.0"
  }
}
```
- create this index.js

```
const Docs4All = require("docs4all");
var docs4All = new Docs4All();
docs4All.start({
  "documentsLocation":__dirname+"/docs",
  "design":{
    "title":"ACME Docs",
    "navHeaderFontSize":"18",
  }
});
```

- create a folder called "docs" and put inside any markdown file (*.md)
- npm install
- npm run dev
- go to `http://localhost:2708` to view the home page

# Production

- npm install
- set you desired port with `export PORT=8080`
- npm run start


# Inspiration

- https://github.com/gilbitron/Raneto

# Assets

- https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.0.4/markdown-it.min.js
- https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css
- https://code.jquery.com/ui/1.12.1/jquery-ui.js
- https://code.jquery.com/jquery-1.12.4.js
