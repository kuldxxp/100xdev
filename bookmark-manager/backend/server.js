import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { addBookmark, deleteBookmark, getAllBookmarks, getFavoriteBookmarks, getUnfavoriteBookmarks, searchBookmark, toggleFavorite } from './routes/bookmarks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/bookmarks', getAllBookmarks);

app.post('/bookmarks', addBookmark);

app.delete('/bookmarks/:id', deleteBookmark);

app.get('/search', searchBookmark);

app.patch('/bookmarks/:id', toggleFavorite);

app.get('/favorite', getFavoriteBookmarks);

app.get('/unfavorite', getUnfavoriteBookmarks);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT} !`);
});
