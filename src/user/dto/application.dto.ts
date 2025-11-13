import { IsString, IsNotEmpty } from 'class-validator';

export class Application {
  @IsString()
  @IsNotEmpty()
  title: string;
  titleone: string;
  content:string;
  description:string;
}

// در سرویس

