import { AiOutlineSearch } from "react-icons/ai";


const SearchButton = (props: any) => {
   const {onSubmit, onChange} = props
  return (
    <div>
      {/* <div className="w-full md:w-5/12"> */}
        <div className="w-full">
          <form
            className="border-2 h-10 md:h-14 md:ml-7 mt-4 m-4 flex"
            onSubmit={onSubmit}
          >
            <input
              className="p-4 w-[65%] border-t mr-0 text-sm outline-none border-gray-200 bg-white"
              placeholder="Enter email/Phone number"
                onChange={onChange}
            />
            <button className="w-[35%] bg-[#ff5722] font-bold border-2 border-[#b52b00]">
              <span className="flex flex-row items-center justify-center gap-x-2">
                <span className="">
                  <AiOutlineSearch className="text-white text-2xl" />
                </span>
                <span className="text-white text-lg font-semibold mb-[2px]">
                  Search
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>
    // </div>
  );
};

export default SearchButton;
