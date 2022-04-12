import {rest} from 'msw'
import { Urls } from '../config/Urls'
import { photoMockedData, userMockedData } from './mockedData';


export const handlers = [
    rest.get(Urls.USERS,(req,res,ctx)=>{
        return res(ctx.json(userMockedData));
    }),
    rest.get(Urls.PHOTOS,(req,res,ctx)=>{
        return res(ctx.json(photoMockedData))
    })
]