const Footer = () => {
  const footerText = "All Rights Reserved. Developed by LeadTech LTD - 0208705290";
  
  return (
    <footer className={"w-full py-4 text-sm text-gray-500 bg-gray-100 border-t"}>
      <div className={"max-w-7xl mx-auto px-4"}>
        <p className={"text-center"}>
          {footerText}
        </p>
      </div>
    </footer>
  );
};

export default Footer; 