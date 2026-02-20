'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
    fontSize: number; // 0 = normal, 1 = +2px, 2 = +4px
    highContrast: boolean;
    grayscale: boolean;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    toggleHighContrast: () => void;
    toggleGrayscale: () => void;
    resetaccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSize] = useState(0);
    const [highContrast, setHighContrast] = useState(false);
    const [grayscale, setGrayscale] = useState(false);

    // Apply classes/styles based on state
    useEffect(() => {
        const html = document.documentElement;

        // Font Size
        html.classList.remove('text-lg', 'text-xl');
        if (fontSize === 1) html.classList.add('text-lg');
        if (fontSize === 2) html.classList.add('text-xl');

        // High Contrast
        if (highContrast) {
            html.classList.add('high-contrast');
        } else {
            html.classList.remove('high-contrast');
        }

        // Grayscale
        if (grayscale) {
            html.classList.add('grayscale-mode');
        } else {
            html.classList.remove('grayscale-mode');
        }

    }, [fontSize, highContrast, grayscale]);

    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 2));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 0));
    const toggleHighContrast = () => setHighContrast(prev => !prev);
    const toggleGrayscale = () => setGrayscale(prev => !prev);
    const resetaccessibility = () => {
        setFontSize(0);
        setHighContrast(false);
        setGrayscale(false);
    };

    return (
        <AccessibilityContext.Provider value={{
            fontSize,
            highContrast,
            grayscale,
            increaseFontSize,
            decreaseFontSize,
            toggleHighContrast,
            toggleGrayscale,
            resetaccessibility
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
}
