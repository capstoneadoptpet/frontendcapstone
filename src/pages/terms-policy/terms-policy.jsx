import Accordition from "../../components/accordition";
import { content1, content2 } from "./data";

const TermsPolicy = () => {
    return (
        <div className="terms-policy section max-w-7xl mx-[3rem] p-4">
            <div className="justify-items-center border-b-2 my-[2rem]">
                <h1 className="text-3xl font-semibold my-[2rem]">ini Terms & Policy</h1>
            </div>

            <Accordition {...content1} />
            <Accordition {...content2} />
        </div>
    )
}

export default TermsPolicy;