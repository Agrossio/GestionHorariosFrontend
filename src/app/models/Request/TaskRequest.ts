import { Priority } from '../Priority';
import { ProjectResponse } from '../Response/ProjectResponse';
import { Status } from '../Status';

export class TaskRequest {
  title: string;
  description: string;
  story_points: number;
  hours_estimate: number;
  start_date: Date;
  end_date: Date;
  priority_name: Priority;
  status_name: Status;
  project_id: number;
  constructor(
    title: string,
    description: string,
    story_points: number,
    hours_estimate: number,
    start_date: Date,
    end_date: Date,
    priority_name: Priority,
    status_name: Status,
    project_id: number
  ) {
    this.title = title;
    this.description = description;
    this.story_points = story_points;
    this.start_date = start_date;
    this.end_date = end_date;
    this.hours_estimate = hours_estimate;
    this.project_id = project_id;
    this.priority_name = priority_name;
    this.status_name = status_name;
  }
}
