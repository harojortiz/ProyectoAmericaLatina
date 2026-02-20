'use client';

import { useState, useCallback } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';

interface ImageCropperProps {
    imageSrc: string;
    aspectRatio?: number; // Default 16/9
    onCropComplete: (croppedImageBlob: Blob) => void;
    onCancel: () => void;
}

export default function ImageCropper({ imageSrc, aspectRatio = 16 / 9, onCropComplete, onCancel }: ImageCropperProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropChange = (crop: Point) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const handleSave = async () => {
        if (croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
                onCropComplete(croppedImage);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
                {/* Header */}
                <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center z-10 relative">
                    <h3 className="font-black uppercase text-lg text-black tracking-tight">Recortar Imagen</h3>
                    <button onClick={onCancel} className="text-slate-400 hover:text-black transition">
                        ✕
                    </button>
                </div>

                {/* Cropper Container */}
                <div className="relative flex-1 bg-slate-900 overflow-hidden">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={onZoomChange}
                        classes={{
                            containerClassName: 'w-full h-full'
                        }}
                    />
                </div>

                {/* Controls Footer */}
                <div className="p-6 bg-white border-t border-slate-100 flex flex-col gap-4 z-10 relative">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase text-slate-400">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#AA0F16]"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 border border-slate-200 rounded-xl font-bold uppercase text-xs hover:bg-slate-50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 bg-[#AA0F16] text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-black transition shadow-lg shadow-red-100"
                        >
                            Confirmar Recorte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
