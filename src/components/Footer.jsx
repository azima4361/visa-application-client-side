import React from "react";
import logo from "../assets/logo3.png";
import useTheme from "../hooks/UseTheme";


const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      } px-6 py-10 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
       
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img className="w-24" src={logo} alt="Smart Visa Logo" />
          <p className="font-bold text-lg">Smart Visa</p>
          <p className="text-sm">Providing reliable visa tech since 1992</p>
          <p className="text-xs mt-2">
            &copy; {new Date().getFullYear()} - All rights reserved
          </p>
        </div>

        
        <div>
          <h6 className="text-lg font-semibold mb-3">Services</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline" href="#">Branding</a></li>
            <li><a className="hover:underline" href="#">Design</a></li>
            <li><a className="hover:underline" href="#">Marketing</a></li>
            <li><a className="hover:underline" href="#">Advertisement</a></li>
          </ul>
        </div>

        
        <div>
          <h6 className="text-lg font-semibold mb-3">Company</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline" href="#">About us</a></li>
            <li><a className="hover:underline" href="#">Contact</a></li>
            <li><a className="hover:underline" href="#">Jobs</a></li>
            <li><a className="hover:underline" href="#">Press kit</a></li>
          </ul>
        </div>

        
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h6 className="text-lg font-semibold">Follow us</h6>
          <div className="flex gap-4">
            
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 
                  1.017-.609 1.798-1.574 2.165-2.724
                  -.951.564-2.005.974-3.127 1.195
                  -.897-.957-2.178-1.555-3.594-1.555
                  -3.179 0-5.515 2.966-4.797 6.045
                  -4.091-.205-7.719-2.165-10.148-5.144
                  -1.29 2.213-.669 5.108 1.523 6.574
                  -.806-.026-1.566-.247-2.229-.616
                  -.054 2.281 1.581 4.415 3.949 4.89
                  -.693.188-1.452.232-2.224.084
                  .626 1.956 2.444 3.379 4.6 3.419
                  -2.07 1.623-4.678 2.348-7.29 2.04
                  2.179 1.397 4.768 2.212 7.548 2.212
                  9.142 0 14.307-7.721 13.995-14.646
                  .962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>

            
            <a href="#" aria-label="YouTube" className="hover:text-red-500 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0
                  -3.897.266-4.356 2.62-4.385 8.816
                  .029 6.185.484 8.549 4.385 8.816
                  3.6.245 11.626.246 15.23 0
                  3.897-.266 4.356-2.62 4.385-8.816
                  -.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8
                  l8 3.993-8 4.007z" />
              </svg>
            </a>

           
            <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4
                  h-4v-1.667c0-.955.192-1.333 1.115-1.333
                  h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
