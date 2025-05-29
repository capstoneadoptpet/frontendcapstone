import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

const Accordition = ({
    title,
    description1,
    description2,
    description3,
}) => {
    const [accorditionOpen, setAccortditionOpen] = useState(false);

    return (
        <div className="py-2">

            <Accordion className="bg-[var(--white)] border-[var(--black)]">
                <AccordionPanel>
                    <AccordionTitle className="text-(--black)"><strong>{title}</strong></AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-(--black) ">
                            {description1}
                        </p>
                        <p className="mb-2 text-(--black) ">
                            {description2}
                        </p>
                        <p className="text-(--black)">
                            {description3}
                        </p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>

            {/* <button onClick={() => setAccortditionOpen(!accorditionOpen)} className="flex justify-between w-full">
                <span>{title}</span>
                {accorditionOpen ? <span>-</span> : <span>+</span>}

            </button>

            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-(--black) text-sm ${accorditionOpen ? `grid-rows-[1fr] opacity-100` : `grid-rows-[0fr] opacity-0`
                }`}>
                <div className="overflow-hidden">
                    {description}
                </div>
            </div> */}
        </div>
    )
}

export default Accordition;