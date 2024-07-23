import { useState } from "react";

const FAQItem = ({ question, answer, points = null }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <article className="mt-3">
            <div className=' p-5 flex items-center gap-5 cursor-pointer' onClick={toggleOpen}>
                <span className={`bold text-3xl transition transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                <h3>{question}</h3>
            </div>

            {isOpen && 
            <div className={`p-5 answer transition transform bg-[#2b2b2b]`}>
                <div className="p-5">
                    <ol>
                        {points && points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ol>
                    <p>{answer}</p>
                </div>
            </div>}
        </article>
    );
};

export default FAQItem;