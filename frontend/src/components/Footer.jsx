

const Footer = () => {
  return (
    <footer className=" bg-black text-white p-9 mt-10">
      <div className="mt-4 container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
