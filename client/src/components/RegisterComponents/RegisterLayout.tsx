import { Link } from "react-router-dom";

const RegisterLayout: React.FC = () => {
    return(<>
            {/* Email */}
        <div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">Let's start with your work email</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>

        {/* First name*/}
        <div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">Great, what is your first name?</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <div className="flex flex-row gap-4">
                <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>        

        {/* Last name*/}
        <div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">and your last?</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <div className="flex flex-row gap-4">
                <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>    

        <div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">Thanks Saad! What is your phone number?</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <div className="flex flex-row gap-4">
                <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>    

        <div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">What is your job title?</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <div className="flex flex-row gap-4">
                <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>    

        <div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">What company do you work for?</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <div className="flex flex-row gap-4">
                <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>    

        <div className="flex flex-col px-4 py-8 gap-y-6 sm:flex-col sm:px-40 md:px-30 ld:px-20">
    <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
    <h2 className="pt-3 text-lg font-medium text-pursuit-black">And how many employees are there in your company?</h2>
    <div className="flex flex-col gap-14">
        <select className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24">
            <option value="" disabled selected>Select</option>
            <option value="1-9">1-9</option>
            <option value="10-49">10-49</option>
            <option value="50-100">50-100</option>
            <option value="101-250">101-250</option>
            <option value="251-500">251-500</option>
            <option value="501+">501+</option>
        </select>
        <div className="flex flex-row gap-4">
            <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
            <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Next</button>
        </div>
    </div>
    <div className="text-center">
        <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
    </div>
</div>

<div className="flex flex-col px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
            <h1 className="text-2xl font-semibold text-pursuit-black">Start your journey with Pursuit</h1>
            <h2 className="pt-3 text-lg font-medium text-pursuit-black">Lastly, create a password:</h2>
            <div className="flex flex-col gap-14">
                <input className="w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"/>
                <div className="flex flex-row gap-4">
                <button className="w-full px-6 py-3 rounded-full border-pursuit-black border-2 text-pursuit-black font-semibold text-sm hover:bg-pursuit-black hover:text-white sm:min-w-10 md:min-w-12 lg:min-w-14">Back</button>
                <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">Get Started</button>
                </div>
            </div>
            <div className="text-center">
                <Link to="/signin"><p className="text-sm text-pursuit-black">Sign in</p></Link>
            </div>
        </div>    
        </>
    )
}

export default RegisterLayout;