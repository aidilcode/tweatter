const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

let app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));
// app.use(expressCspHeader({
//     directives: {
//         'default-src': [SELF],
//         'script-src': [SELF, INLINE, 'somehost.com'],
//         'style-src': [SELF, 'mystyles.net'],
//         'img-src': ['data:', 'images.com'],
//         'worker-src': [NONE],
//         'block-all-mixed-content': true
//     }
// }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});
