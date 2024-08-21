import React, { useState, useEffect } from 'react';

type CarouselProps = {
	items: React.JSX.Element[];
	itemsPerSlide?: number; // Number of items to display per slide
};

export default function Carousel({ items, itemsPerSlide = 3 }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Calculate the number of slides
	const totalSlides = Math.ceil(items.length / itemsPerSlide) + 1;

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="relative w-full max-w-4xl justify-self-center flex flex-col">
			<div className="overflow-hidden h-64">
				<div
					className="flex transition-transform duration-700 ease-in-out space-x-5"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{items.map((item, index) => (
						<div key={index} className="min-w-40 min-h-40">{item}</div>
					))}
				</div>
			</div>

			<div className='relative flex items-center my-6'>
				{/* Left Arrow */}
				<button
					onClick={prevSlide}
					className="absolute left-0 text-white p-2 text-4xl"
				>
					&#10094;
				</button>

				{/* Right Arrow */}
				<button
					onClick={nextSlide}
					className="absolute right-0 text-white p-2 text-4xl"
				>
					&#10095;
				</button>
			</div>

		</div>
	);
}
