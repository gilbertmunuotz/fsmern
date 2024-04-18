

const Home = () => {
    return (
        <section className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-16 px-4 md:px-8"> 
            <div className="container mx-auto max-w-2xl flex flex-col items-center text-center space-y-8"> 
                <h1 className="text-4xl font-bold text-red-500">Hero Title</h1> 
                <p className="text-2xl text-gray-700">
                    This is a captivating first message with <span className="text-red-500 font-bold">emphasis</span>. 
                </p>
                <p className="text-xl text-gray-500">
                    This is a secondary message with <span className="font-bold text-red-300">emphasis</span>. 
                </p>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                    A descriptive paragraph goes here. Line breaks are respected with the `line-height: 30px` class. 
                </p>
                <div className="flex items-center space-x-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-75">Button 1</button>
                </div>
            </div>
        </section>
    );
};

export default Home;
