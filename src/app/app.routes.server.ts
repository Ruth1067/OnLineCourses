import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'courses/edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'courses/:courseId/lessons/edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'courses/:courseId/lessons',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
