const Footer = () => {
    return (
      <>
        <div className="text-center pb-8">
          <p className="text-sub text-sm">
            <a href="https://github.com/learnwithjacksun/Organiza" target="_blank">
              Gift Jacksun <i className="fa-brands fa-github"></i>
            </a>
            , &copy; {new Date().getFullYear()}
          </p>
          <p>
            Powered by{" "}
            <a href="https://appwrite.io" className="text-primary font-semibold">
              appwrite
            </a>
          </p>
        </div>
      </>
    );
  };
  
  export default Footer;
  