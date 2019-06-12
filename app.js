const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(bodyParser.json({ limit: '20mb' })); //设置前端post提交最大内容
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(8888, () => {
  console.log('Example app listening on port 8888!');
});
