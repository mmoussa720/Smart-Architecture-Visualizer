import {plant} from "../constants/assets.ts";

const HomePage = () => {
  return (
    <div className="flex">
        <div className="flex-col w-70">
            <img src={plant} className="w-70 h-70 rounded-xl my-5" />
            <div>
                <div className="flex justify-between">
                    <p className="text-primary-dark font">Foundation Phase</p>
                    <p className="text-primary-dark font">25%</p>
                </div>
                <div className="w-full bg-neutral rounded-full h-8 my-2">
                    <div className="bg-primary h-8 rounded-full" style={{width:"24%"}}></div>
                </div>
            </div>
            <p className="text-neutral-600"> We're tailoring your <span className="text-neutral-950">Atelier</span> experience </p>
        </div>
        <div className="flex-col w-1/2 px-16">
            <div className="text-secondary text-sm">
                <li>AI ADVISOR INSIGHT</li>
            </div>
            <div>
                <div className="text-4xl">
                    What's your <span className="text-primary">#1</span>
                    <br/>
                    <span className="text-primary">financial goal</span> right
                    <br/>
                    now?
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;