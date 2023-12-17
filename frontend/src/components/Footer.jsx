

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6 mt-auto">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Blog.All rights reserved.
      </p>
    </div>
  </footer>
    
  )
}

export default Footer