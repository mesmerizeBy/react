/** path.join(__dirname, 'src/dist')*
 *  */

'use strict';
var path = require('path');

module.exports = {
    entry: './src/app.js' ,
    output: {
        path: 'D:\\www\\php\\myProject\\tp5\\public\\static\\js\\',
        publicPath:'/dist/',
        filename: 'bundle.js' },
    module: {
    rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react','stage-0'],
                        plugins: [
                        ['import', {

                            libraryName: 'antd',

                            style: 'css'

                        }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader",
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }]  
            }
        ]
  },
    
};