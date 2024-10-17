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
      let now:Date = new Date();
      
      let not:Date=data.datum
  
      let errors:string[]= [];
      if(!data.datum || !data.email || !data.név || !data.nézök){
        errors.push("mindent meg kell adini")
      }
      if(data.nézök<1 || data.nézök>10 ){
        errors.push("1 és 10 fő közöt kell lenie")
      }
      if(!/\b\w+@\w+\.\w+\b/.test(data.email)){
        errors.push("nem jó email formátum")
      }
      if( not<now ){
        errors.push("nem lehet réggebi mint a mostani idő")
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
