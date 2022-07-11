const Table = (props: any) => {
  const { data } = props;
  return (
    <div>
      {/* <table className="w-full h-[482px] border-2  divide-y divide-border table-fixed shadow-lg"> */}

      <tbody className="bg-white divide-y w-full">
        {data &&
          Object.keys(data).map((key, index) => {
            return (
              <tr className="" key={index}>
                <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap ">
                  {key}
                </td>
                <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                  {data[key]}
                </td>
              </tr>
            );
          })}
      </tbody>
      {/* </table> */}
    </div>
  );
};

export default Table;
