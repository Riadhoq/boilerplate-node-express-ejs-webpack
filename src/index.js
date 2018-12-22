var express = require('express');
const app = express();
const path = require('path');
import sass from './static/main.scss';
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

// webpack hmr
app.use(
    require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);

app.use(require('webpack-hot-middleware')(compiler));


app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static('dist'));


app.get('/', (req, res) => {
    res.render('index', (err, html) => {
        if(err) {
            console.log(err);
        }
        res.send(html);
    });
});
app.listen(3000, () => console.log('App listening at 3000'));