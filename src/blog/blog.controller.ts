import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

import data from './data/news.json';
import { Response } from 'express';
import { BlogService } from './blog.service';
import { CreatePostDto } from './create.post.dto';
import dataOne from './data/sony.json'
@Controller('blog')
export class BlogController {
  constructor(private blogService:BlogService){

  }
    @Get('news')
    application(@Res() res: Response): void {
      res.status(HttpStatus.OK).json(data);
    }
    @Get('sony')
    sony(@Res() res: Response): void {
      res.status(HttpStatus.OK).json(dataOne);
    }
    @Post()
    createPost(@Body() createPostDto: CreatePostDto) {
      const { title, content } = createPostDto;
      return this.blogService.createPost(title, content);
    }
}
