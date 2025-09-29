import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    // For now, we'll hardcode a user ID
    // Later we'll get this from JWT token
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll() {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    return this.taskService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    return this.taskService.remove(id, userId);
  }

  @Patch(':id/complete')
  markAsCompleted(@Param('id') id: string) {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    return this.taskService.markAsCompleted(id, userId);
  }
}
