const Create = async (req, res) => {
  try {
    res.send("hello from blogs route");
  } catch (error) {
    console.log(error);
  }
};

export { Create };
