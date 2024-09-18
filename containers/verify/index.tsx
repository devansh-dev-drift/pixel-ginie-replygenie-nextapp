"use client"

import { confirmMail } from "@/services/api";
import { useState, useEffect } from "react";

const Verify = () => {
    const [verificationStatus, setVerificationStatus] = useState('pending');
    const [userId, setUserId] = useState('');
    const [secret, setSecret] = useState('');
    const handleConfirmCode = async (userIdParam, secretParam) => {
        const data = await confirmMail(userIdParam, secretParam);
        console.log(data, data)
        if (data.message == 'success') {
            setVerificationStatus('success');
            setTimeout(() => {
                window.location.href = '/sign-in';
            }, 2000)
        } else {
            setVerificationStatus('failed');
        }
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userIdParam = urlParams.get('userid');
        const secretParam = urlParams.get('secret');

        if (userIdParam) setUserId(userIdParam);
        if (secretParam) setSecret(secretParam);

        // You can use these values to verify the email
        if (userIdParam && secretParam) {
            handleConfirmCode(userIdParam, secretParam)
        }
    }, []);

    return (
        <div className="flex w-full">
            <div className="w-full relative bg-[#151E36] min-h-[100vh]">
                <div className="sm:p-14 p-5">
                    <div className="xl:w-[75%] w-full mx-auto">
                        <div className="text-center py-10">
                            <h1 className="text-white xl:text-[50px] text-[40px] font-bold">Verify Your Email</h1>
                        </div>
                        <div className="flex justify-center mb-8">
                            {verificationStatus === 'pending' ? (
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="60" fill="#FFA500" />
                                    <path d="M60 30V60L80 80" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : verificationStatus === 'success' ? (
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="60" fill="#4A60D5" />
                                    <path d="M36 62L52 78L84 46" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="60" fill="#FF0000" />
                                    <path d="M40 40L80 80M80 40L40 80" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <p className="text-white text-center mb-8 mx-auto lg:max-w-[50%] max-w-[90%]">
                            {verificationStatus === 'pending' && "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."}
                            {verificationStatus === 'success' && "Your email has been successfully verified. You can now proceed to use our services."}
                            {verificationStatus === 'error' && "There was an error verifying your email. Please try again or contact support if the problem persists."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify;