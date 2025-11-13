import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import dataFourteen from './data/callAddress.json';
import data from './data/contact.json';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import dataOne from './data/call.json';
import dataTwo from './data/softskillPrograming.json'; // نام فایل اصلاح شد
import dataThree from './data/mahararatNarm.json'; // نام فایل اصلاح شد
import dataFour from './data/softskillServices.json';
import dataFive from './data/question.json';
import dataSix from './data/personConsulations.json'; // نام فایل اصلاح شد
import dataSeven from './data/padcast.json'; // نام فایل اصلاح شد
import dataEight from './data/packages.json';
import dataNine from './data/learn-online.json';
import dataTen from './data/application.json';
import dataEleven from './data/webinarLearn.json';
import datatweleve from './data/store.json'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import {Application} from './dto/application.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService

    , @InjectRepository(Application)
        private applicationRepository: Repository<Application>
  ) { }

  @Get('callAddress')
  callAddress(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataFourteen);
  }

  @Get('contact')
  contact(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(data);
  }

  @Get('call') // مسیر جدا برای call
  call(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataOne);
  }

  @Get('softskillProgramming') // نام مسیر اصلاح شد
  softskillProgramming(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataTwo);
  }

  @Get('maharatNarm')
  maharatNarm(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataThree);
  }

  @Get('softskillServices')
  softskillServices(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataFour);
  }

  @Get('question')
  question(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataFive);
  }

  @Get('personConsultations') // نام مسیر اصلاح شد
  personConsultations(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataSix);
  }

  @Get('padcast') // نام مسیر اصلاح شد
  podcast(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataSeven);
  }

  @Get('packages') // نام مسیر اصلاح شد
  packages(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataEight);
  }

  @Get('learnOnline') // نام مسیر اصلاح شد
  learnOnline(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataNine);
  }

  @Get('application')
  application(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataTen);
  }

  @Get('webinarLearn') // نام مسیر اصلاح شد
  webinarLearn(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataEleven);
  }
  @Get('store')
  store(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(datatweleve)
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
      throw new Error('ثبت‌نام با خطا مواجه شد'); // مدیریت بهتر خطا
    }
  }

  @Post('login')
  async login(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.find(
      updateUserDto.password,
      updateUserDto.email,
      updateUserDto.username,
    ); // خروجی برگردانده شد
  }
  @Get('getallLogin')
  @ApiOperation({ summary: 'Get all logged-in users' }) // توضیح عملیات
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] }) // پاسخ موفق
  @ApiResponse({ status: 500, description: 'Internal server error' }) // پاسخ خطا
  async getAllUsers() {
    return this.userService.findAll();
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' }) // توضیح عملیات
  @ApiParam({ name: 'id', description: 'User ID', type: Number }) // پارامتر ورودی
  @ApiResponse({ status: 200, description: 'User deleted successfully' }) // پاسخ موفق
  @ApiResponse({ status: 404, description: 'User not found' }) // پاسخ خطا
  @ApiResponse({ status: 500, description: 'Internal server error' }) // پاسخ خطا
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.userService.delete(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
  @Get('search')
  @ApiOperation({ summary: 'Search users by query parameters' }) // توضیح عملیات
  @ApiQuery({ name: 'username', required: false, description: 'Username to search for' })
  @ApiQuery({ name: 'email', required: false, description: 'Email to search for' })
  @ApiQuery({ name: 'name', required: false, description: 'Name to search for' })
  @ApiQuery({ name: 'family', required: false, description: 'Family to search for' })
  @ApiResponse({ status: 200, description: 'List of users matching the search criteria', type: [User] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async searchUsers(
    @Query('username') username?: string,
    @Query('email') email?: string,
    @Query('name') name?: string,
    @Query('family') family?: string,
  ): Promise<User[]> {
    return this.userService.search({ username, email, name, family });
  }
 
  @ApiOperation({ summary: 'داده‌های جدید را ذخیره می‌کند' })
  @ApiCreatedResponse({ type: [Application] })
  @ApiBody({ type: [Application] })
  @Post()
  async saveData() {
      const data = [
          {
            title: "گوشی پرچمدار ۲۰۲۵ سونی",
            titleone: "در زمینه دوربین پیشرفت چشمگیری تجربه می‌کند",
             content: "بر اساس پست یک افشاگر در ویبو، گوشی پرچم‌دار بعدی سونی ممکن است شامل حسگرهای Exmor T برای هر سه دوربین پشتی باشد. این موضوع، ارتقاء قابل توجهی از مدل سال گذشته‌ی گوشی سونی محسوب می‌شود که فقط از یک حسگر Exmor T برای دوربین اصلی استفاده می‌کرد. دوربین‌های فوق عریض و تله‌فوتو در اکسپریا ۱ مارک ۶ از حسگرهای قدیمی‌تر Exmor RS استفاده می‌کردند.",
            description: "اگر شایعه‌ی یادشده درست باشد، به‌نظر می‌رسد که این تنها تغییر بزرگی خواهد بود که در پرچمدار مورد انتظار سونی مشاهده می‌کنیم. گفته می‌شود که ژاپنی‌ها از دوربین اصلی ۵۲ مگاپیکسلی، دوربین اولترا واید ۱۲ مگاپیکسلی و دوربین تله‌فوتو ۱۲ مگاپیکسلی در اکسپریا ۱ مارک ۷ استفاده خواهند کرد. درحال‌حاضر اطلاعات زیادی در مورد اکسپریا یک مارک ۷ دردسترس نیست و باید منتظر افشاگری‌های بیشتری باشیم، زیرا به زمان عرضه نزدیک می‌شویم؛ سونی معمولاً در ماه ژوئن (خرداد و اردیبهشت) گوشی خود را معرفی می‌کند."
          }
      ];
      return await this.applicationRepository.save(data);
  }
  @ApiOperation({ summary: 'داده‌های ذخیره شده را نمایش می‌دهد' })
@ApiOkResponse({ type: [Application] })
@Get()
async getData() {
    return await this.applicationRepository.find();
}
}



