import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { RouteConfig } from '@nestjs/platform-fastify';
import { RouteConfig, RouteConstraints } from 'fastify-decorators';

@Controller('users')
@RouteConstraints({ version: '1.2.x' }) 
export class UsersController {

  private users = [
    { id: 1, name: 'Airam rodrigo', email: 'airam@example.com' },
    { id: 2, name: 'Victor Salazar', email: 'victor@example.com' }
  ];

  @RouteConfig({ get: '/', output: 'Get all users' })
  @Get()
  getAllUsers() {
    return this.users;
  }

  @RouteConfig({ get: '/:id', output: 'Get user by ID' })
  @Get(':id')
  getUserById(@Req() req) {
    const userId = +req.params.id;
    return this.users.find(user => user.id === userId);
  }

  @RouteConfig({ post: '/', output: 'Create user' })
  @Post()
  createUser(@Body() user) {
    user.id = this.users.length + 1; 
    this.users.push(user);
    return user;
  }

  @RouteConstraints({ version: '1.2.x' }) 
  @RouteConfig({ get: '/new-feature', output: 'This works only for version >= 1.2.x' })
  @Get('new-feature')
  newFeature() {
    return 'This works only for version >= 1.2.x';
  }
}
