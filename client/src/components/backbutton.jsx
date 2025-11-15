import { Link } from "react-router-dom";
const backbutton = ({goTo})=>
{
    return (
        <Link to={goTo} className="p-0.5 w-[85px] rounded-lg font-semibold bg-blue-600 text-white text-center cursor-pointer hover:bg-blue-500 hover:text-black fixed top-5 left-5">
          Back
        </Link>
    )
}
export default backbutton;