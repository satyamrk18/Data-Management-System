import Staff from "./../Model/Staff.js"
const postStaff = async (req,res)=>
{
  res.status(200).json({
    success:true,
    message:"staff API working"
  })
}
export {postStaff}
