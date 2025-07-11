import GithubIcon from "../../assets/icons/github.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import EmailIcon from "../../assets/icons/mail.svg?react";
import type { JSX } from "react";

/**
 * Componente de sección de contacto para la página principal del software 4Pets.
 * Muestra información de contacto y un formulario para enviar mensajes.
 * @returns {JSX.Element} Componente de sección de contacto que muestra información de contacto y un formulario para enviar mensajes.
 */
export default function ContactUsSection(): JSX.Element {
    return (
        <section id="contactUs" className="py-16 px-6 bg-gray-50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Contactanos</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Estamos aquí para ayudarte. Contáctanos para agendar una demostración totalmente gratuita o resolver cualquier duda que tengas sobre nuestros servicios.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Información de contacto */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                                    <GithubIcon className="w-8 h-8 icon-on-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Github</h4>
                                    <p className="text-gray-600">
                                        josue10dv<br />
                                        Erick Toapanta
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                                    <PhoneIcon className="w-8 h-8 icon-on-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Celular</h4>
                                    <p className="text-gray-600">
                                        General: 0998348113
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center mr-4">
                                    <EmailIcon className="w-8 h-8 icon-on-tertiary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <p className="text-gray-600">
                                        josue.et.9910@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tu nombre completo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Teléfono</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Mensaje</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full btn-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};