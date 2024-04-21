
const Footer = () => {
    return (
        <section className="bg-gray-100 pb-6 px-4 md:px-8"> 
            <div className="container mx-auto max-w-screen-lg flex flex-col gap-16 md:flex-row md:items-center"> 
                <div className="col flex-1 space-y-4"> 
                    <h2 className="text-2xl font-bold text-gray-800">About Us Title</h2>  
                    <ul className="list text-gray-700"> 
                        <li className="workingTime">Working Time: 9AM - 5PM</li> 
                        <li className="workingTime">Weekdays only</li> 
                    </ul>
                </div>
                <div className="col flex-1 space-y-4 text-gray-700"> {/* Merged classes */}
                    <p className="text-lg">
                        Descriptive paragraph about your company or team.
                    </p>
                    <a href="#" className="text-blue-500 hover:text-blue-700 underline">Learn More</a>
                </div>
            </div>
            <div className="attribution mx-auto text-center mt-16 md:mt-0"> {/* Merged classes */}
                <p>Designed and Developed by Me</p>
            </div>
        </section>
    );
};

export default Footer;
