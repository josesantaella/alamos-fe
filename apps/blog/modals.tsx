import { ModalRoutesType } from './models/modals';
import Post from './pages/post/[postId]'; 

export const ModalRoutes : ModalRoutesType = {
    post_view: {
        component: Post
    }
}