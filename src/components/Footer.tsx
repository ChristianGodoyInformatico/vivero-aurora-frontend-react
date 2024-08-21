import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-6 text-center w-full mt-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <span className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              <span>+56 9 5206 6997</span>
            </span>
            <a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              <FaWhatsapp className="mr-2" />
              Contactar por WhatsApp
            </a>
          </div>
          <div className="text-sm">
            <p>© 2024 Vivero. Todos los derechos reservados.</p>
            <p>
              Página creada por <strong>Christian Godoy</strong>. Para impulsar tu negocio con su propia página web, comunícate al{' '}
              <span className="hover:text-gray-300">+56 9 1234 5678</span>.
            </p>
          </div>
        </div>
      </footer>
    );
}

export default Footer
