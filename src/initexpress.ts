import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'
import {test} from "./postman/test";
import {preTest} from "./postman/preTest";
const app = express()
app.use(cors())
app.use(bodyParser.json());

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

// 预请求与真实请求
app.post('/proxy',(req,res)=>{
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
app.post('/proxy/pretest',preTest)
app.post('/proxy/test',test)

app.listen(16888,()=>{
    console.log('hi')
})
