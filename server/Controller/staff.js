import Staff from "./../Model/Staff.js";
const postStaff = async (req, res) => {
  const { email, password } = req.body;
  try {
    //if field are empty
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //else save the staff
    const saveData = new Staff({
      email,
      password,
    });
    await saveData.save();

    res.status(200).json({
      success: true,
      data: saveData,
      message: "new staff created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "inernal server error",
    });
  }
};
export { postStaff };
