import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email: 'krushna@gmail.com',
            password: 'Krushn@#1739',
        },
        {
            userId: 2,
            email: 'brainerhub@gmail.com',
            password: 'Brainer@#1739',
        },
    ];

    async findOne(email: string) {
        return this.users.find(user => user.email === email);
    }
}
