import Content from "../../components/content";
import { content1, content2, content3 } from "./data";

const About = () => {
    return (
        <div className="max-w-7xl mx-auto md:mx-[3rem] p-4">

            <div className="justify-items-center border-b-2 my-[2rem]">
                <h1 className="text-3xl font-semibold my-[2rem]">Tentang Kami</h1>
            </div>

            <Content {...content1} />
            <Content {...content2} />
            <Content {...content3} />

        </div>
    )
}

export default About;