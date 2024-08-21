import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import Location from './Location';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sobre Nosotros</h1>
      <p className="text-lg my-4">
        Bienvenidos a nuestro vivero, un lugar donde la pasión por la naturaleza y el compromiso con el medio ambiente se unen en armonía. Nuestro vivero es el sueño y la dedicación de una persona especial, quien a sus largos años, ha dedicado más de una década a cultivar y promover la belleza de los árboles nativos.
      </p>
      <p className="text-lg my-4">
        Desde sus humildes comienzos, su fundador ha trabajado incansablemente para crear un oasis de biodiversidad en nuestra comunidad. Con un profundo amor por la tierra y una visión clara, decidió emprender este viaje con un propósito noble: incentivar el cultivo de árboles nativos en los alrededores y contribuir a la restauración del equilibrio ecológico.
      </p>
      <p className="text-lg my-4">
        Cada planta que ofrecemos ha sido cuidada con esmero y dedicación, reflejando nuestra creencia de que cada árbol plantado es un paso hacia un futuro más verde y sostenible. Aquí, en nuestro vivero, no solo cultivamos plantas, sino también sueños y esperanzas para un mañana mejor.
      </p>
      <p className="text-lg my-4">
        Invitamos a todos a unirse a nuestra misión y descubrir la alegría de plantar y cuidar árboles nativos. Juntos, podemos hacer una diferencia, un árbol a la vez. Gracias por ser parte de nuestra comunidad y apoyar nuestro trabajo. ¡Esperamos que disfruten de su visita!
      </p>


      <h1 className="text-2xl font-bold mb-4 mt-10">Contacto</h1>
      <span className="flex items-center">
        <FaPhoneAlt className="mr-2" />
        <span>+56 9 5206 6997</span>
      </span>

      <Location />
    </div>
  );
};

export default About;