const FormContainer = ({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4 p-20 items-center">
      <h3 className="font-bold text-3xl text-[#111827] min-w-96 text-center">
        {heading}
      </h3>
      <h4 className="text-[1rem] text-[#4B5563]"> {subheading}</h4>
      {children}
    </div>
  );
};

export default FormContainer;
