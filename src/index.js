import { start } from './server'
import express from "express";
import { config } from "dotenv"
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webConfig from '../webpack.config.js'

config()

start(process.env.ConnectionString)

const app = express()
const compiler = webpack(webConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: webConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile('index.html', (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}...`)
})
