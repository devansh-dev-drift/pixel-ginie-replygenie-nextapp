"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import { createUser, verifyEmail } from "@/services/api";
import Logo_Image from '@/public/logo/logo.png'
import BotAlert from '@/components/BotAlert'

const SignUp = () => {
    const today = new Date;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [fullName, setFullName] = useState<string>('');
    const [emailError, setEmailError] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [variant, setVariant] = useState('');

    const onClickSignUp = async (action: string) => {
        if (action == "credentials") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid email address.');
            } else {
                setEmailError('');
            }

            if (fullName == "") {
                setFullNameError('Please enter a valid name.');
            } else {
                setFullNameError('');
            }

            if (password.length < 8) {
                setPasswordError('Must be at least 8 characters.');
            } else {
                setPasswordError('');
            }

            if (emailError == "" && fullNameError == "" && passwordError == "") {
                const userInfo = await createUser(fullName, email, password, 'credentials');
                if (userInfo) {
                    if (userInfo.message == 'exist') {
                        setAlertMessage('A username with this email already exists. Please log in.');
                        setVariant('error');
                        setAlert(true);
                    } else {
                        setAlertMessage('Successfully Signed Up!');
                        setVariant('success');
                        setAlert(true);
                        setTimeout(() => {
                            window.location.href = '/verify';
                        }, 2000)
                    }
                }
            }
        } else {

        }
    }

    return (
        <div className="flex w-full">
            <div className="xl:w-2/5 w-full relative bg-[#151E36] min-h-[100vh]">
                <div className="sm:p-14 p-5">
                    <Link href='/'><Image src={Logo_Image} width={166} height={45} alt="logo_file" /></Link>
                    <div className="xl:w-[75%] w-full ">
                        <div className="text-left py-10">
                            <h1 className="text-white xl:text-[50px] text-[40px] font-[900] leading-12">Start generating </h1>
                            <h1 className="text-white xl:text-[50px] text-[40px] font-[900] leading-10"><span className="text-[#4A60D5]">organic</span> leads today</h1>
                        </div>
                        <Input type="text" label="Full Name" name="email-input" placeholder="Full Name" value={fullName} setValue={setFullName} />
                        {fullNameError != '' && (<p className="text-[red] mt-1">{fullNameError}</p>)}
                        <Input type="email" label="Email" name="password-input" placeholder="Email Adress" value={email} setValue={setEmail} />
                        {emailError != '' && (<p className="text-[red] mt-1">{emailError}</p>)}
                        <Input type="password" label="Password" name="password-input" placeholder="Password" value={password} setValue={setPassword} />
                        {passwordError != '' && (<p className="text-[red] mt-1">{passwordError}</p>)}
                        <Button label="Create Account" className="w-full mt-10" onClick={() => onClickSignUp("credentials")} />
                        <button onClick={() => onClickSignUp("google")} className='w-full flex justify-center gap-2 mt-3 bg-gradient-to-r from-[#ffffff] to-[#ffffff]  text-black rounded-[32px] text-lg py-[10px] px-4 hover:opacity-75 duration-300 transition-all'>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_23015_1187)">
                                    <path d="M24.2663 12.2764C24.2663 11.4607 24.2001 10.6406 24.059 9.83807H12.7402V14.4591H19.222C18.953 15.9494 18.0888 17.2678 16.8233 18.1056V21.1039H20.6903C22.9611 19.0139 24.2663 15.9274 24.2663 12.2764Z" fill="#4285F4" />
                                    <path d="M12.7401 24.0008C15.9766 24.0008 18.7059 22.9382 20.6945 21.1039L16.8276 18.1055C15.7517 18.8375 14.3627 19.252 12.7445 19.252C9.61388 19.252 6.95946 17.1399 6.00705 14.3003H2.0166V17.3912C4.05371 21.4434 8.2029 24.0008 12.7401 24.0008Z" fill="#34A853" />
                                    <path d="M6.00277 14.3003C5.50011 12.8099 5.50011 11.1961 6.00277 9.70575V6.61481H2.01674C0.314734 10.0056 0.314734 14.0004 2.01674 17.3912L6.00277 14.3003Z" fill="#FBBC04" />
                                    <path d="M12.7401 4.74966C14.4509 4.7232 16.1044 5.36697 17.3434 6.54867L20.7695 3.12262C18.6001 1.0855 15.7208 -0.034466 12.7401 0.000808666C8.2029 0.000808666 4.05371 2.55822 2.0166 6.61481L6.00264 9.70575C6.95064 6.86173 9.60947 4.74966 12.7401 4.74966Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_23015_1187">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Sign Up with Google</span>
                        </button>
                        <div className="flex items-center w-full justify-center mt-5 gap-3">
                            <p className="text-white">Already have an account?</p>  <Link href='/sign-in' className="block"><p className="text-[#5596E5] w-full text-center">Log In</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:flex hidden w-3/5 bg-gradient-to-r from-[#569BE7] to-[#4A60D5] h-screen">
                <video
                    className=" w-[80%] m-auto object-cover rounded"
                    controls
                    loop
                    muted
                    playsInline
                >
                    <source src="/video/background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <BotAlert message={alertMessage} show={alert} setShow={setAlert} variant={variant} />
        </div>
    )
}

export default SignUp;