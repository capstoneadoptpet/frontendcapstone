import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { motion } from 'framer-motion';

const Accordition = ({
    title,
    description1,
    description2,
    description3,
}) => {
    const [accorditionOpen, setAccortditionOpen] = useState(false);

    return (
        <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.7 }} className="py-2">
                <Accordion collapseAll className="bg-[var(--white)] border-[var(--black)]">
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
        </motion.div>
    )
}

export default Accordition;