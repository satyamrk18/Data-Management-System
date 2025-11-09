const loginForm = ({ college_ID, mother_name }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <input
        type="text"
        placeholder="Enter college ID"
        value={college_ID}
        className="border-1 rounded-lg p-0.5 w-3xs"
        required
      />
      <input
        type="text"
        placeholder="Enter Mother Name"
        required
        value={mother_name}
        className="border-1 rounded-lg p-0.5 w-3xs"
      />
      <button type="button" className="p-1 rounded-lg w-[100px] text-white bg-blue-400 cursor-pointer hover:text-black">Log In</button>
    </div>
  );
};
export default loginForm;
