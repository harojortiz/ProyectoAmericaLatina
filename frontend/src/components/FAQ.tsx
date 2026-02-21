'use client';

import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="border border-slate-200 rounded-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-lg text-slate-800 pr-8">{question}</span>
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-[#AA0F16] font-black transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#AA0F16] text-white' : ''}`}>
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50">
                    {answer}
                </div>
            </div>
        </div>
    );
}

const STATIC_FAQS = [
    {
        question: "¿Cuál es el proceso de admisión para nuevos estudiantes?",
        answer: "El proceso inicia con la compra del formulario en secretaría. Luego se agenda una entrevista familiar y una prueba académica para el estudiante. Las fechas de inscripción suelen abrirse en septiembre de cada año."
    },
    {
        question: "¿Cuáles son los horarios de clase?",
        answer: "Primaria: 6:30 AM - 1:30 PM. Bachillerato: 6:15 AM - 2:00 PM. Los horarios de atención a padres son los martes y jueves de 7:00 AM a 8:00 AM con cita previa."
    },
    {
        question: "¿La institución cuenta con servicio de transporte?",
        answer: "La institución no ofrece servicio de transporte directo, pero existen rutas escolares privadas recomendadas por la asociación de padres de familia que cubren las principales zonas aledañas."
    },
    {
        question: "¿Qué documentos necesito para matricular a mi hijo?",
        answer: "Se requiere: registro civil, fotocopia de tarjeta de identidad (si aplica), certificados de notas de años anteriores, paz y salvo del colegio anterior, certificado médico reciente y fotocopia de cédula de los padres."
    },
    {
        question: "¿Tienen convenios con universidades?",
        answer: "Sí, mantenemos convenios con diversas universidades para facilitar el ingreso de nuestros egresados, incluyendo la Universidad Javeriana y la Uniminuto, especialmente para estudiantes destacados académicamente."
    },
    {
        question: "¿Cuál es el costo de la pensión y matrícula?",
        answer: "Los costos educativos se ajustan anualmente según las disposiciones del Ministerio de Educación. Para consultar las tarifas vigentes del año en curso, por favor comuníquese directamente con secretaría o tesorería."
    },
    {
        question: "¿Ofrecen actividades extracurriculares?",
        answer: "Contamos con diversas lúdicas y escuelas deportivas en jornada contraria: fútbol, baloncesto, danzas folclóricas, banda marcial y grupo de teatro. Estas tienen un costo adicional simbólico para mantenimiento."
    }
];

export default function FAQ() {
    const [faqs, setFaqs] = useState(STATIC_FAQS);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Fetch FAQs from API
    useState(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/faqs/public');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setFaqs(data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch FAQs', error);
            }
        };
        fetchFaqs();
    });

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq: { question: string, answer: string }, index: number) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
}
