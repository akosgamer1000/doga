import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { error } from 'console';
import { mozi } from './mozi.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };


  }
  @Get("mozifog")
  @Render('mozif')
  fog(){
    return{
      errors:[],
      data:{}
    }
  }
  @Post("mozifog")
  moziff(@Body() data:mozi,@Res() res:Response){
      let errors:string[]= [];
      if(!data.datum || !data.email || !data.név || !data.nézök){
        errors.push("mindent meg kell adini")
      }
      if(errors.length>0){
          res.render('mozif',{errors,data})
      }
      res.redirect(303,'/succes')
  }
  @Get("succes")
  @Render("succes")
  suss(){

  }
}
