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
    <div className="flex flex-col gap-4 py-20 px-4 sm:px-0 items-center min-h-screen">
      <h3 className="font-bold  text-3xl text-[#111827] md:min-w-full text-center">
        {heading}
      </h3>
      <h4 className="text-[1rem] font-serif text-[#4B5563] text-center">
        {" "}
        {subheading}
      </h4>
      {children}
    </div>
  );
};

export default FormContainer;
