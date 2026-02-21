'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-fade-in-up');
                            entry.target.classList.remove('opacity-0', 'translate-y-8');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const node = ref.current;
        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
            {children}
        </div>
    );
}
