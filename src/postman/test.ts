// @ts-nocheck
import * as Collection from 'postman-collection';
import * as Sandbox from 'postman-sandbox';

import {Request,Response} from 'express'
export function test(req:Request,expressRes:Response) {
    const params = req.body
    Sandbox.createContext({ debug: true }, function (err, ctx) {
        let assestions = [];
        ctx.on('execution.assertion', function (cursor, results) {
            assestions = assestions.concat(results);
        });
        ctx.execute(
            params.code,
            {
                context: {
                    request: params.request,
                    response: new Collection.Response({
                        code: params.responseCode,
                        body: JSON.stringify(params.responseData),
                    }),
                },
            },
            function (err, res) {
                if (err) {
                    expressRes.send(err);
                }
                expressRes.send({ assestions, res });
            },
        );
    });

}
