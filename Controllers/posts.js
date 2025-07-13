const postModel = require('../Models/postModel')


exports.post=async(req,res)=>{
    try{
        const {userId,name,post} = req.body;
        const response = await postModel.create({userId,name,post})
        res.status(200).json("Posted successfully")
    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}




exports.getPost = async (req, res) => {
  try {
    // Get the most recent post
    const newestPost = await postModel.findOne().sort({ createdAt: -1 });

    const randomPosts = await postModel.aggregate([
      { $match: { _id: { $ne: newestPost._id } } },
      { $sample: { size: 19 } },
    ]);

    
    const combinedPosts = [newestPost, ...randomPosts];

    res.status(200).json(combinedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json("Internal Server Error");
  }
};





exports.postLike = async (req, res) => {
  const { postId } = req.params;
  const {userId} = req.body

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

  
    const alreadyLiked = post.like.some((likeObj) => likeObj.lid === userId);

    if (alreadyLiked) {
      return res.status(400).json({ message: "User already liked this post" });
    }

    
    post.like.push({ lid : userId });
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.postComment = async (req, res) => {
  const { postId } = req.params;
  const {userId,userName,text} = req.body

  
  try {
    const post = await postModel.findById({_id:postId});
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

  
    post.comment.push({ cid : userId,cname:userName,comment:text });
    await post.save();

    res.status(200).json({ message: "Commented successfully", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




exports.getNotification = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await postModel.aggregate([
      { $match: { userId } }, 
      { $unwind: "$comment" }, 
      { $sort: { "comment.commentedAt": -1 } }, // ✅ sort by correct field
      {
        $project: {
          _id: 0,
          postId: "$_id",
          commenterName: "$comment.cname",
          commentText: "$comment.comment",
          commentedAt: "$comment.commentedAt" // ✅ use correct field
        }
      }
    ]);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json("Internal Server Error");
  }
};

exports.getOnePost = async(req,res) =>{
  try{
    const {postId} = req.params;

    const post = await postModel.find({_id:postId})
    res.status(200).json(post)
  }catch(error){
    res.status(500).json("Internal Server Error")
  }
}
