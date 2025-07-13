const bookModel = require('../Models/bookModel');

exports.uploadBook = async (req, res) => {
  try {
    const { seller,title, author, price, condition,status } = req.body;
    const image = req.file;

    
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBook = await bookModel.create({
      seller,
      title,
      author,
      price,
      condition,
      image: image.path, 
      status
    });

    res.status(200).json({
      message: "Book uploaded successfully",
      data: newBook,
    });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};



exports.getBooks = async (req, res) => {
  const { search } = req.query;

  const query = {
    status: true, // only return books with status === true
    ...(search && {
      title: { $regex: search, $options: "i" }
    })
  };

  try {
    const books = await bookModel.find(query);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json("Internal server error");
  }
};

exports.getBookByUser = async(req,res)=>{
  try{
    const {userId} = req.params;

    const books = await bookModel.find({seller : userId})
    res.status(200).json(books);
  }catch(error){
    res.status(500).json("Internal server error")
  }
}

exports.deleteBook = async(req,res)=>{
  try{
    const {bookId} = req.params;

    const response = await bookModel.deleteOne({_id:bookId})
    res.status(200).json("Deleted Successfully!")
  }catch(error){
    res.status(500).json("Internal Server Error")
  }
}


exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ status: 1 }); 
    // status: false (0) comes before true (1)
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};



exports.updateBookStatus = async (req, res) => {
  try {
    const { bookId } = req.params;

   
    const updatedBook = await bookModel.findByIdAndUpdate(
      {_id : bookId},
      { status: true },
      { new: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book status updated successfully", book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};



