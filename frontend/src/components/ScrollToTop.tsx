'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#AA0F16] text-white flex items-center justify-center shadow-2xl hover:bg-red-800 transition-all duration-300 hover:scale-110 group"
                    aria-label="Volver arriba"
                >
                    <span className="text-2xl group-hover:-translate-y-1 transition-transform">↑</span>
                </button>
            )}
        </>
    );
}
