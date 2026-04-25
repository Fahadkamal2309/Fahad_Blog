import Post from '../models/post.js';
const ALLOWED_CATEGORIES = [
    "Technology",
    "Web Development",
    "Programming",
    "AI & Machine Learning",
    "Cyber Security",
    "Data Science",
    "Mobile Apps",
    "UI/UX Design",
    "Career & Jobs",
    "Life Style",
    "Health & Fitness",
    "Travel",
    "Education",
    "Finance",
    "Entertainment"
];

export const createPost = async (req, res) => {
    try {
        console.log("BODY:", req.body); // 🔥 DEBUG

        let { category } = req.body;

        // ❌ SAFE CHECK (IMPORTANT)
        if (!category) {
            return res.status(400).json({
                message: "Category is required"
            });
        }

        category = category.trim();

        // ❌ VALIDATION
        if (!ALLOWED_CATEGORIES.includes(category)) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }

        const postData = {
            ...req.body,
            username: req.user.username,
            category
        };

        const newPost = new Post(postData);
        await newPost.save();

        res.status(200).json("Post saved successfully");

    } catch (error) {
        console.log("CREATE POST ERROR:", error); // 🔥 IMPORTANT
        res.status(500).json({ message: error.message });
    }
};
export const updatePost = async (req, res) => {
    try {
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ message: "Post not found" });
        }

        await Post.findByIdAndDelete(request.params.id);

        response.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.log("DELETE ERROR:", error); // 🔥 VERY IMPORTANT
        response.status(500).json({ message: "Server error", error });
    }
};
export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const username = req.query.username;
        const category = req.query.category;

        let posts;

        if (username) {
            posts = await Post.find({ username });
        }
        else if (category) {
            posts = await Post.find({
                category: category.toLowerCase()
            });
        }
        else {
            posts = await Post.find({});
        }

        res.status(200).json(posts);
    } catch (error) {
        console.log("FETCH ERROR:", error);
        res.status(500).json(error);
    }
};
export const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = {
            username: req.body.username,
            text: req.body.text,
            createdDate: new Date()
        };

        post.comments.push(comment);

        await post.save();

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error);
    }
};
export const deleteComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { commentId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // remove comment
        post.comments = post.comments.filter(
            (c, index) => index.toString() !== commentId
        );

        await post.save();

        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json(error);
    }
};