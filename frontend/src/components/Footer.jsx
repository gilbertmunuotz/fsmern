
const Footer = () => {
    return (
        <section className="bg-gray-100 py-16 px-4 md:px-8"> {/* Merged classes */}
            <div className="container mx-auto max-w-screen-lg flex flex-col gap-16 md:flex-row md:items-center"> {/* Merged classes */}
                <div className="col flex-1 space-y-4"> {/* Merged classes */}
                    <h2 className="text-2xl font-bold text-gray-800">About Us Title</h2>  {/* Tailwind classes */}
                    <ul className="list text-gray-700"> {/* Merged classes */}
                        <li>List item 1</li>
                        <li>List item 2</li>
                        <li className="workingTime">Working Time: 9AM - 5PM</li> {/* Tailwind classes */}
                        <li className="workingTime">Weekdays only</li> {/* Tailwind classes */}
                    </ul>
                    <div className="iconList flex text-gray-500 hover:text-gray-700"> {/* Merged classes */}
                        <i className="fas fa-phone"></i> {/* Replace with actual icon component */}
                        <i className="fas fa-envelope"></i> {/* Replace with actual icon component */}
                        <i className="fas fa-map-marker-alt"></i> {/* Replace with actual icon component */}
                    </div>
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
