function SpecificationTable() {
  return (
    <table className="border border-collapse my-3 w-full text-[#444444] text-[0.55rem] s200:text-[0.6rem] s250:text-xs s410:text-sm duration-150">
      <tbody>
        <Tr property={"Title"} value={"Death Note"} />
        <Tr property={"Author"} value={"Ans Anonymo"} />
        <Tr property={"Publisher"} value={"Dimik"} />
        <Tr property={"Pages"} value={124} />
        <Tr property="Published Date" value={"21 Feb 2022"} />
        <Tr property={"Language"} value={"English"} />
      </tbody>
    </table>
  );
}

function Tr({ property, value }) {
  return (
    <tr className="flex">
      <td className="px-1 s410:px-3 py-1 s410:py-2 max-w-[5.2rem] s200:max-w-24 s250:max-w-[7.5rem] s410:max-w-36  w-full  bg-[#eeeeee] flex items-center">
        {property}
      </td>
      <td className="px-3 py-2 flex-grow">{value}</td>
    </tr>
  );
}

export default SpecificationTable;
