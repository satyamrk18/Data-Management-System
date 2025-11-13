import Staff from "./../Model/Staff.js";
//add staff
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
//check staff log in
const staffLogIn = async (req,res)=>
{
  
  try{
    const {email,password}= req.body;
  const response = await Staff.findOne({email,password})
  if(response)
  {
    res.status(200).json({
      success:true,
      data:response,
      message:"staff found successfully"
    })
  }
  else{
    res.status(401).json({
      success:false,
      message:"please reenter email and password correctly."
    })
  }
  }
  catch(error)
  {
    res.status(500).json({
      success:false,
      message:"internal server error, please try again letter"
    })
  }
}
export { postStaff,staffLogIn };
