let bookmarks = [], currentId = 1;

export async function addBookmark(req, res, next) {
    try {
        const { category, url } = req.body;

        if (!category || !url) {
            return res.status(400).json({
                error: 'Category and Url are required'
            });
        }

        const newBookmark = {
            id: currentId++,
            category,
            url,
            favorite: false
        }

        bookmarks.push(newBookmark);

        return res.status(200).json({
            message: 'Bookmark added successfully',
            newBookmark
        });
    } catch (err) {
        return res.status(500).json({
            error_msg: 'An error occured while adding the bookmark',
            error: err
        });
    }
}

export async function deleteBookmark(req, res, next) {
    try {
        const { id } = req.params;
        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id);

        if (bookmarkIndex === -1) {
            return res.status(404).json({ error: 'Bookmark not found' });
        }

        bookmarks.splice(bookmarkIndex, 1);

        return res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (err) {
        return res.status(500).json({
            error_msg: 'An error occured while deleting the bookmark',
            error: err
        });
    }
}

export async function getAllBookmarks(req, res, next) {
    res.status(200).json(bookmarks);
}

function searchBookmarks(q) {
    const searchResults = [];
    
    for (let i = 0; i < bookmarks.length; i++) {
        const currBookmark = bookmarks[i];
        const currUrl = currBookmark.url

        if (q.length > currUrl.length) {
            continue;
        }

        if (currUrl.includes(q)) {
            searchResults.push(currBookmark);
        }
    }

    return searchResults;
}

export async function searchBookmark(req, res, next) {
    try {
        if (!Array.isArray(bookmarks) || bookmarks.length === 0) {
            return res.status(200).json({
                result: [],
                total: 0
            });
        }

        const rawQ = (req.query?.q ?? '').toString();
        const q = rawQ.trim();

        if (!q) {
            return res.status(400).json({
                error: 'Search text required',
                code: 'BAD_QUERY'
            });
        }

        const searchResults = searchBookmarks(q);
        
        return res.status(200).json({
            searchResults,
            total: searchResults.length,
        });
    } catch (err) {
        return next(err);
    }
}

export async function toggleFavorite(req, res, next) {
    const status = req.body.status;

    try {
        const { id } = req.params;

        if (Number.isNaN(id) || !id) {
            return res.status(400).json({ error: 'Id is not a number or needs to be mentioned' });
        }

        if (!status) {
            return res.status(400).json({ error: 'Favorite/Unfavorite not selected' });
        }

        const bookmark = bookmarks.find(bookmark => bookmark.id == id);

        if (!bookmark) {
            return res.status(400).json({ error: `Bookmark with id ${id} does not exist` });
        }

        bookmark.favorite = status;
        
        res.status(200).json({
            message: `Set to ${status} !`,
            bookmark
        });
    } catch (err) {
        res.status(400).json({
            error_msg: `Error while toggling the bookmark to ${status}`,
            error: err
        });
    }
}

export async function getFavoriteBookmarks(req, res, next) {
    const favBookmarks = bookmarks.filter((bookmark) => {
        if (bookmark.favorite === true) {
            return bookmark;
        }
    });

    res.status(200).json(favBookmarks);
}

export async function getUnfavoriteBookmarks(req, res, next) {
    const unfavBookmarks = bookmarks.filter((bookmark) => {
        if (bookmark.favorite === false) {
            return bookmark;
        }
    });

    res.status(200).json(unfavBookmarks);
}