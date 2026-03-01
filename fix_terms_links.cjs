const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

c = c.replace(
  '<a href="/privacy" class="footer-bottom-link">Privacy</a>',
  '<a href="/privacy" class="footer-bottom-link" onclick="event.preventDefault();window.history.pushState({},\'\',\'/privacy\');window.dispatchEvent(new PopStateEvent(\'popstate\'))">Privacy</a>'
);

fs.writeFileSync('index.html', c, 'utf8');
console.log('Feito!');
