import { Router } from "express";
import { CreateAdminController } from './modules/users/useCases/createAdmin/createAdminController';
import { CreateUserController } from './modules/users/useCases/createUser/createUserController';
import { CreatePostController } from './modules/posts/useCases/createPost/createPostController';
import { EnsureAuthenticateUser } from './middlewares/ensureAuthenticateUser';
import { ReadAllPostsController } from './modules/posts/useCases/readPosts/readAllPostsController';
import { AuthenticateUserController } from "./modules/account/authenticateUser/AuthenticateUserController";
import { ReadOnePostController } from "./modules/posts/useCases/readPosts/readOnePostController";
import { LikeController } from "./modules/posts/useCases/opine/likeController";
import { DislikeController } from "./modules/posts/useCases/opine/dislikeController";
import { ReadUsersController } from "./modules/users/useCases/readUsers/readUsersController";
import { EnsureAdmin } from "./middlewares/ensureAdmin";
import { ReadUserController } from "./modules/users/useCases/readUser/readUserController";
import { UpdateUserController } from "./modules/users/useCases/updateUser/updateUserController";
import { DeleteUserController } from "./modules/users/useCases/deleteUser/deleteUserController";
import { UploadImagesController } from "./modules/posts/useCases/uploadImages/uploadImagesController";
import { CreateCommentController } from "./modules/comments/useCases/createComment/createCommentController";
import { ReadCommentsController } from "./modules/comments/useCases/readComment/readCommentsController";
import { UpdateCommentController } from "./modules/comments/useCases/updateComment/updateCommentController";
import { DeleteCommentController } from "./modules/comments/useCases/deleteComment/deleteCommentController";
import { HideCommentController } from "./modules/comments/useCases/hideComment/hideCommentController";
import { UpdatePostController } from "./modules/posts/useCases/updatePost/updatePostController";
import { DeletePostController } from "./modules/posts/useCases/deletePost/deletePostController";

const upload = require('./utils/multer');

const routes = Router();

// Auth
const authenticateUserController = new AuthenticateUserController(); 
routes.post('/auth', authenticateUserController.handle);

// Admin
const createAdminController = new CreateAdminController();
routes.post('/admin', createAdminController.handle);

// User
const createUserController = new CreateUserController();
routes.post('/user', createUserController.handle);

const readUsersController = new ReadUsersController();
routes.get('/users', EnsureAdmin, readUsersController.handle);

const readUserController = new ReadUserController();
routes.get('/user/me', EnsureAuthenticateUser, readUserController.handle);

const updateUserController = new UpdateUserController();
routes.put('/user', EnsureAuthenticateUser, updateUserController.handle);

const deleteUserController = new DeleteUserController();
routes.delete('/user/:id', EnsureAuthenticateUser, deleteUserController.handle);

// Post
const createPostController = new CreatePostController();
routes.post('/post', EnsureAuthenticateUser, createPostController.handle);

const readAllPostsController = new ReadAllPostsController();
routes.get('/posts', EnsureAuthenticateUser, readAllPostsController.handle);

const readOndePostController = new ReadOnePostController();
routes.get('/post/:id', EnsureAuthenticateUser, readOndePostController.handle);

const updatePostController = new UpdatePostController();
routes.put('/post/:id', EnsureAuthenticateUser, updatePostController.handle);

const deletePostController = new DeletePostController();
routes.delete('/post/:id', EnsureAuthenticateUser, deletePostController.handle);

const likeController = new LikeController();
routes.patch('/post/:id/like', EnsureAuthenticateUser, likeController.handle);

const dislikeController = new DislikeController();
routes.patch('/post/:id/dislike', EnsureAuthenticateUser, dislikeController.handle);

const uploadImagesController = new UploadImagesController();
routes.post('/post/:id/upload', upload.array('image'), uploadImagesController.handle);

// Comments
const createCommentController = new CreateCommentController();
routes.post('/post/:id/comment', EnsureAuthenticateUser, createCommentController.handle);

const readCommentsController = new ReadCommentsController();
routes.get('/post/:id/comments', EnsureAuthenticateUser, readCommentsController.handle);

const updateCommentController = new UpdateCommentController();
routes.put('/comment/:id', EnsureAuthenticateUser, updateCommentController.handle);

const deleteCommentController = new DeleteCommentController();
routes.delete('/comment/:id', EnsureAuthenticateUser, deleteCommentController.handle);

const hideCommentController = new HideCommentController();
routes.patch('/comment/:id/hide', EnsureAuthenticateUser, hideCommentController.handle);


export { routes };