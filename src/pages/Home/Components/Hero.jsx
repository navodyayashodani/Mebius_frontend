

function Hero() {
  return (
    <div className="pb-6">
    <section className="p-8 ml-12 mr-12 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] rounded-lg">
      <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9] " >
        <div className="flex flex-col justify-center p-16 gap-4">
          <span className="inline-block rounded-full px-2 py-1 text-xs w-fit bg-[#febc26]">WEEKLY DISCOUNT</span>
          <h1 className="text-5xl font-semibold leading-none">Premium Product Online Shop</h1>
          <p>
          Mebius is a leading e-commerce platform specializing in high-quality electronic products. From the latest gadgets to essential tech accessories, we provide a seamless shopping experience with secure payments and fast delivery. Explore top brands and upgrade your tech effortlessly with Mebius!
          </p>
          <a to="/shop" className="inline-block px-4 py-2 text-white font-medium bg-black rounded-md w-fit">
            Shop Now
          </a>
        </div>
        <div className="relative">
          <img
            
            className="w-full h-full object-cover" src="https://fee-storefront.vercel.app/assets/hero/hero.jpg" alt="image"
          />
        </div>
      </div>
    </section>
    </div>
  );
}

export default Hero;
