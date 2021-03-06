import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.js';
import { aboutReducer } from './slices/about.js';
import { userReducer } from './slices/user.js';
import { sliderReducer } from './slices/slider.js';
import { postReducer } from './slices/post.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
    user: userReducer,
    slider: sliderReducer,
    post: postReducer,
  },
});
