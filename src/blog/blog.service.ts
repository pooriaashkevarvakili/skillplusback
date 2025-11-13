import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogService {
    createPost(title: string, content: string) {
        const slug = this.generateSlug(title);
        // ذخیره‌سازی پست با عنوان، محتوا و slug
      }
    
      private generateSlug(title: string): string {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      }
}
