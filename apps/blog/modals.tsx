import { ModalRoutesType } from './models/modals';
import Post from './pages/post/[slug]';

export const ModalRoutes: ModalRoutesType = {
  post_view: {
    component: Post,
    params: ['slug']
  }
};
