const Table = (props: any) => {
  const { data } = props;
  return (
    <div className="border-2 shadow-lg">
      {/* <table className="w-full h-[482px] border-2  divide-y divide-border table-fixed shadow-lg"> */}
      <table className="w-full h-[482px] divide-y divide-border table-auto ">
        <tbody className="bg-white divide-y w-full">
          {data &&
            Object.keys(data).map((key, index) => {
              return (
                <tr className="" key={index}>
                  <td className="py-4 px-4 md:px-4 w-1/5 text-sm font-semibold text-black whitespace-normal ">
                    {key}:
                  </td>
                  <td className="py-4 px-1 w-4/5 text-sm font-sm text-[#666666] whitespace-normal">
                    {data[key]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* </table> */}
    </div>
  );
};

export default Table;
