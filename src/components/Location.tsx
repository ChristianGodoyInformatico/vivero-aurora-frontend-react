function Location() {
    return (
        <div>
            <div className='flex justify-center'>
                <p>Nuestra ubicacion. Comuna de Coihueco, Sector Bureo Bajo</p>
            </div>
            <div className="flex justify-center mb-8">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d725.0685048235072!2d-71.7744651328547!3d-36.5563524355595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2scl!4v1723078770000!5m2!1ses!2scl"
                    width="600"
                    height="450"
                    className="border-0"
                    loading="lazy">
                </iframe>
            </div>
            {/* Texto adicional debajo de Google Maps */}
            <div className="text-center my-8">
                <p className="text-lg">Comunícate a nuestro número de teléfono o WhatsApp para agendar tu visita. Estaremos felices de recibirte.</p>
            </div>
        </div>
    )
}

export default Location
