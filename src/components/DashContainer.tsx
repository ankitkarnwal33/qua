const DashContainer = ({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <div>
        <h3 className=" text-[20px] text-[#111827] font-bold">{heading}</h3>
        <h4 className=" text-[15px] text-[#64748B]"> {subheading}</h4>
      </div>
      {children}
    </div>
  );
};

export default DashContainer;
