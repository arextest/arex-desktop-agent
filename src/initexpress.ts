import * as express from 'express'
import axios from 'axios'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
const app = express()
app.use(cors())
app.use(bodyParser.json());

app.use(express.static('public'))
app.get('/vi/health',(req,res)=>{
    res.send('365ms')
})
function handleResHeaders(headers:any) {
    const newHeaders:any = []
    for (const k in headers) {
        const v = headers[k]
        newHeaders.push({
            key:k,
            value:v
        })
    }
    return newHeaders
}
app.post('/',(req,res)=>{
    const {body} = req
    axios(body).then(axiosRes=>{
        const {status,data,headers} = axiosRes
        res.send({
            status:status,
            data:data,
            headers: handleResHeaders(headers)
        })
    }).catch(axiosErr=>{
        const {status,data,headers} = axiosErr?.response || {status:500,data:{},headers:{}}
        res.send({
            status:status,
            data:data,
            headers: handleResHeaders(headers)
        })
    })
})
app.listen(16888,()=>{
    console.log('hi')
})
