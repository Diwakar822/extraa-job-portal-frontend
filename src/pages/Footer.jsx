import React, { useState } from 'react';
import { Twitter, Linkedin, Camera, Youtube, Zap, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';

const Footer = () => {

  const [email,setEmail]=useState("");
  const [isSubscribed, setIsSubscribed]=useState(false)

  const socialLinks = [
  { Icon: Twitter, href: "https://twitter.com/yourhandle" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/extraa.in/posts/?feedView=all" },
  { Icon: Instagram, href: "https://www.instagram.com/extraa.in/?hl=en" }, // Camera used for Instagram
  { Icon: Youtube, href: "https://www.youtube.com/@extraamarketing" },
];

   const handleSubscribe=(e)=>{
        e.preventDefault();

        const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti coming from two sides
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => setIsSubscribed(false), 5000);
   }
    return (
        <footer className="bg-[#1a1a0d] text-[#d8d8d1] pt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Brand & Description - 4 Columns on Desktop */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#ffff00] p-1.5 rounded-lg">
                {/* <Zap size={20} className="text-black fill-black" /> */}
                <img src='https://extraaimagesbucket.s3.ap-south-1.amazonaws.com/cropped-extraaLogo-1.png' size={20}/>
              </div>
              <h2 className="text-white text-xl font-semibold tracking-tight">
                Extraa Technologies
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-sm opacity-80">
              Empowering the next generation of digital talent. Join our ecosystem to discover opportunities and scale your technical career.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
  {socialLinks.map((social, index) => (
    <a 
      key={index} 
      href={social.href} 
      target="_blank"   
      rel="noopener noreferrer" 
      className="w-10 h-10 rounded-full bg-[#2b2b1d] border border-[#3f3f2f] flex items-center justify-center hover:bg-[#3f3f2f] transition-colors"
    >
      <social.Icon size={18} className="text-[#d8d8d1]" />
    </a>
  ))}
</div>
          </div>

          {/* Company Links - 2 Columns on Desktop */}
          <div className="lg:col-span-2">
            <h3 className="text-[#c0c000] text-xs font-bold uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-4 text-sm">
              <li><a href="https://extraa.in/about-us/" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://mates.extraa.in/csv/extraa6basic_and_11hr_survey?_gl=1*1nzw8fj*_ga*NDM2NDY5ODQ0LjE3NTM2Nzk2NDQ.*_ga_EBDDCMFJVJ*czE3NzI4OTIwOTYkbzckZzEkdDE3NzI4OTIzNDUkajU1JGwwJGgw" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="https://extraa.in/privacy/" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Support Links - 2 Columns on Desktop */}
          <div className="lg:col-span-2">
            <h3 className="text-[#c0c000] text-xs font-bold uppercase tracking-widest mb-6">
              Support
            </h3>
            <ul className="space-y-4 text-sm">
              <li><a href="https://extraa.in/contact/" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              <li><a href="https://extraa.in/terms/" className="hover:text-white transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          {/* Newsletter - 4 Columns on Desktop */}
          <div className="lg:col-span-4">
            <h3 className="text-[#c0c000] text-xs font-bold uppercase tracking-widest mb-6">
              Stay Updated
            </h3>
            {isSubscribed ? (
              <div className="bg-[#2b2b1d] border border-[#ffff00] text-[#ffff00] p-4 rounded-lg animate-bounce text-center font-bold">
                Thanks for joining! 🌸
              </div>
            ) : (
              <>
                <p className="text-sm mb-4 opacity-80">Subscribe to our newsletter for the latest jobs and platform updates.</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="bg-[#2b2b1d] border border-[#3f3f2f] rounded-lg px-4 py-3 text-sm flex-grow focus:outline-none focus:border-[#ffff00] transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#ffff00] text-black font-bold py-3 px-6 rounded-lg text-sm hover:bg-[#e6e600] transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3f3f2f] py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-[#8c8c80]">
          <div className="flex gap-6">
            <a href="https://www.extraaevents.in/" className="hover:text-white transition-colors">Extraa EVENTS</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="https://maps.app.goo.gl/PZsaZ3yEp6dkd5ME7" target="_blank" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <p>© 2024 Extraa Technologies. All rights reserved. Built with precision.</p>
        </div>
      </div>
    </footer>
    
    );
};

export default Footer;