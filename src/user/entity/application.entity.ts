import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    titleone: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'text', nullable: true })
    description: string;
}