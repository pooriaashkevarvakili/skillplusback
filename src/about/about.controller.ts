import { Controller, Get, HttpStatus, Res, } from '@nestjs/common';

import data from "./data/about.json"
import dataOne from './data/userFriendly.json'
import { Response } from 'express';
import dataTwo from "./data/Technology.json"
import dataThree from './data/upgrade.json'
import dataFour from './data/update.json'
import dataFive from './data/teamWork.json'
@Controller('about')
export class AboutController {
    constructor() { }

    @Get('about')
    about(@Res() res: Response): void {
        res.status(HttpStatus.OK).json(data);
    }
    @Get('userFriendly')
    userFriendly(@Res() res: Response): void {
        res.status(HttpStatus.OK).json(dataOne);
    }
    @Get('teknology')
    teknology(@Res()res:Response ):void{
        res.status(HttpStatus.OK).json(dataTwo)
    }
    @Get('upgrade')
    upgrade(@Res()res:Response ):void{
        res.status(HttpStatus.OK).json(dataThree)
    }
    @Get('update')
    update(@Res()res:Response ):void{
        res.status(HttpStatus.OK).json(dataFour)
    }
    @Get('teamwork')
    teamWork(@Res()res:Response ):void{
        res.status(HttpStatus.OK).json(dataFive)
    }
}
