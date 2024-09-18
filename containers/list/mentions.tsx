'use client';

import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/input';
import TextArea from '@/components/atoms/textarea';
import { getKeywords, getMentions, generateAIContext, deleteArticle, saveArticle, removeArticle, editArticle, publishArticle } from '@/services/api';
interface IMentionsProps { }

interface SelectData {
    keywords: string;
}

const keywordsData: SelectData[] = [
    { keywords: 'keyword A' },
    { keywords: 'Keyword B' },
];


const Mentions: FC<IMentionsProps> = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [updateText, setUpdateText] = useState<any>();
    const [keywordData, setKeywordData] = useState([]);
    const [mentionKeyword, setMentionKeyword] = useState('');
    const [mentionData, setMentionData] = useState([]);
    const indexOfLastMention = currentPage * itemsPerPage;
    const indexOfFirstMention = indexOfLastMention - itemsPerPage;
    const currentMentions = mentionData?.slice(indexOfFirstMention, indexOfLastMention);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBar, setIsLoadingbar] = useState(false);
    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        setIsLoadingbar(true);
        const keyword = await getKeywords();
        if (keyword.length > 0) {
            setMentionKeyword(keyword[0].keywords);
        }
        const mention = await getMentions(keyword[0].keywords);
        setKeywordData(keyword);
        if (mention.message == 'error') {
            alert(mention.error)
        } else {
            console.log(mention.resultData, 'mention')
            setMentionData(mention.resultData);
            setIsLoadingbar(false);
        }
    }

    const handleKeyword = async (val: string) => {
        setIsLoadingbar(true);
        setMentionKeyword(val);
        console.log(val);
        const mention = await getMentions(val);
        if (mention.message == 'error') {
            alert(mention.error)
        } else {
            console.log(mention.resultData, 'mention')
            setMentionData(mention.resultData);
            setIsLoadingbar(false);
        }
    }

    const generateContext = async (id: string, title: string, userId: string, selftext: string, keyword: string) => {
        const data = await generateAIContext(id, title, userId, selftext, keyword);
        setMentionData(data.resultData);
    }

    const handleUpdateText = (id, value) => {
        setUpdateText({
            id,
            value
        })
    }

    const handleDelete = async (id) => {
        const data = await deleteArticle(id, mentionKeyword);
        setMentionData(data.resultData);
    }

    const handleSave = async (id, defaultValue) => {
        let value;
        if (updateText && updateText?.id == id) {
            value = updateText.value;
        } else {
            value = defaultValue;
        }
        console.log(value, 'value')
        const data = await saveArticle(id, mentionKeyword, value);
        setMentionData(data.resultData)
    }

    const articleCopy = async (val) => {
        copyToClipboard(val);
    }

    const handlePublish = async (id) => {
        const data = await publishArticle(id, mentionKeyword);
        // setMentionData(data.resultData);
    }
    const handleDeleteArticle = async (id) => {
        const data = await removeArticle(id, mentionKeyword);
        setMentionData(data.resultData);
    }
    const handleEdit = async (id) => {
        const data = await editArticle(id, mentionKeyword);
        setMentionData(data.resultData);
    }
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard:', text);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    function formatRelativeTime(dateString) {
        let now: any = new Date();
        let date: any = new Date(dateString);
        const seconds = Math.floor((now - date) / 1000);

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hr', seconds: 3600 },
            { label: 'min', seconds: 60 },
            { label: 'sec', seconds: 1 },
        ];

        let result = [];
        let remainingSeconds = seconds;

        for (const interval of intervals) {
            const count = Math.floor(remainingSeconds / interval.seconds);
            if (count > 0) {
                result.push(`${count} ${interval.label}${count > 1 ? 's' : ''}`);
                remainingSeconds %= interval.seconds;
            }
            if (result.length === 2) break;
        }
        return result.length > 0 ? `${result.join(' ')} ago` : 'just now';
    }
    return (
        <><div className='max-w-[1200] mx-auto'>
            <div className='flex justify-between items-center w-full'>
                <p className=' font-lato text-[22px] font-semibold text-white'>Mentions</p>
            </div>

            <div className='bg-[#151E36] px-7 py-4 mt-4 rounded-2xl flex items-center justify-between border-[0.5px] border-[#2c344a] whitespace-nowrap md:whitespace-normal overflow-auto md:gap-8 gap-5 no-scrollbar'>
                <select className='bg-[#232b42] text-white py-2 h-10 px-4 rounded' onChange={(e: any) => handleKeyword(e.target.value)}>
                    {keywordData?.map((row, index) => (
                        <option key={index} value={row.keywords}>{row.projectName} - {row.keywords}</option>
                    ))}
                </select>
                <div className='flex items-center gap-3'>
                    <Input
                        className=""
                        type="checkbox"
                        name="insightsCheckbox"
                        value={checkboxValue}
                        setValue={setCheckboxValue}
                    />
                    <label className='font-inter font-normal text-l text-white'>Reddit</label>
                </div>
                <div className='flex items-center gap-3'>
                    <Input
                        className="bg-[#232b42]"
                        type="checkbox"
                        name="insightsCheckbox"
                        value={checkboxValue}
                        setValue={setCheckboxValue}
                    />
                    <label className='font-inter font-normal text-l text-white'>X</label>
                </div>
                <div className='flex items-center gap-3'>
                    <Input
                        className="bg-[#232b42]"
                        type="checkbox"
                        name="insightsCheckbox"
                        value={checkboxValue}
                        setValue={setCheckboxValue}
                    />
                    <label className='font-inter font-normal text-l text-white'>Facebook Groups</label>
                </div>
                <div className='flex items-center gap-3'>
                    <Input
                        className="bg-[#232b42]"
                        type="checkbox"
                        name="insightsCheckbox"
                        value={checkboxValue}
                        setValue={setCheckboxValue}
                    />
                    <label className='font-inter font-normal text-l text-white'>Youtube Comments</label>
                </div>
            </div>
            {isLoadingBar ?
                <div className="flex justify-center mt-10">
                    <svg className="animate-spin h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div> : <>

                    {
                        currentMentions?.map((row, index) => (
                            <div key={index} className='bg-[#151E36] rounded-2xl grid grid-cols-10 items-center justify-between border-[0.5px] border-[#2c344a] mt-6'>
                                <div className='col-span-6 p-4 border-r-[#2c344a] border-r-[0.5px]'>
                                    <div className='md:flex justify-between'>
                                        <div>
                                            <div className='flex items-center gap-3'>
                                                <p className='font-lato text-2xl text-white font-bold'>Keywords:</p>
                                                <p className='font-inter font-normal text-l text-white'>{mentionKeyword == "" ? keywordData[0].keywords : mentionKeyword}</p>
                                            </div>
                                            <p className='font-light text-s text-white font-inter mt-2'>{row.title}</p>
                                            <p className='font-poppins font-normal text-s text-white italic mt-6 flex gap-3 w-full'>{row.socialType} &nbsp; Author:  {row.authorName} <span><a href={row.url} target='_blank'>View</a></span></p>
                                        </div>
                                        <p className='font-poppins font-normal text-s text-white italic min-w-[100px] text-right'>{formatRelativeTime(row.updatedDate)}</p>
                                    </div>
                                </div>
                                <div className='col-span-4 text-center items-center px-4'>
                                    {
                                        row.generatedText == "" ? (
                                            <>
                                                <button
                                                    className={`font-lato px-5 max-w-[219px] w-full py-2 rounded-md text-white font-medium md:text-[14px] text-[12px] ${isLoading === row._id ? 'bg-red-500' : 'bg-[#108bf6]'}`}
                                                    onClick={(e) => {
                                                        setIsLoading(row._id);
                                                        generateContext(row._id, row.title, row.authorName, row.selfText, mentionKeyword)
                                                            .finally(() => setIsLoading(null));
                                                    }}
                                                    disabled={isLoading === row._id}
                                                >
                                                    {isLoading === row._id ? 'Generating...' : 'Generate Reply'}
                                                </button>
                                            </>
                                        ) : (
                                            <div className='bg-[#232b42] px-2 py-1 my-2 rounded-lg'>
                                                {
                                                    row.isGenerated == false ? <TextArea
                                                        name="proposition"
                                                        placeholder=""
                                                        value={row.generatedText}
                                                        setValue={(val) => handleUpdateText(row._id, val)}
                                                        rows={3}
                                                    /> : <p className='text-black bg-white rounded p-1 text-left text-[12px] max-h-[100px] overflow-auto'>{row.generatedText}</p>
                                                }
                                                {
                                                    row.isGenerated == false ? <div className='flex justify-end mt-5 gap-1 px-2 mb-3'>
                                                        <Image
                                                            src='/icons/save.svg'
                                                            className='cursor-pointer'
                                                            width={22}
                                                            height={22}
                                                            alt='Menu icon'
                                                            onClick={() => handleSave(row._id, row.generatedText)}
                                                        />
                                                        <Image
                                                            src='/icons/cancel.svg'
                                                            className='cursor-pointer'
                                                            width={22}
                                                            height={22}
                                                            alt='Menu icon'
                                                            onClick={() => handleDelete(row._id)}
                                                        />
                                                    </div> : <div className='flex justify-end my-2 md:gap-3 gap-1'>
                                                        <Image
                                                            src='/icons/copy.svg'
                                                            className='cursor-pointer'
                                                            width={22}
                                                            height={22}
                                                            alt='Menu icon'
                                                            onClick={() => articleCopy(row.generatedText)}
                                                        />
                                                        <Image
                                                            src='/icons/upload.svg'
                                                            className='cursor-pointer'
                                                            width={22}
                                                            height={22}
                                                            alt='Menu icon'
                                                            onClick={() => handlePublish(row._id)}

                                                        />
                                                        <Image
                                                            src='/icons/edit.svg'
                                                            className='cursor-pointer'
                                                            width={22}
                                                            height={22}
                                                            alt='Menu icon'
                                                            onClick={() => handleEdit(row._id)}
                                                        />
                                                        <Image
                                                            src='/icons/trash.svg'
                                                            className='cursor-pointer'
                                                            width={22}
                                                            height={22}
                                                            alt='Menu icon'
                                                            onClick={() => handleDeleteArticle(row._id)}
                                                        />
                                                    </div>
                                                }

                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <div className='flex justify-between items-center mt-4'>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className='text-white px-3 py-1 bg-[#232b42] rounded disabled:opacity-50'
                        >
                            Previous
                        </button>
                        <div className='flex items-center'>
                            {(() => {
                                const totalPages = Math.ceil(mentionData.length / itemsPerPage);
                                const maxButtons = 5;
                                let startPage, endPage;

                                if (totalPages <= maxButtons) {
                                    startPage = 1;
                                    endPage = totalPages;
                                } else {
                                    const middleButtons = maxButtons - 2;
                                    const halfMiddle = Math.floor(middleButtons / 2);

                                    if (currentPage <= halfMiddle + 1) {
                                        startPage = 1;
                                        endPage = maxButtons - 1;
                                    } else if (currentPage >= totalPages - halfMiddle) {
                                        startPage = totalPages - (maxButtons - 2);
                                        endPage = totalPages;
                                    } else {
                                        startPage = currentPage - halfMiddle;
                                        endPage = currentPage + halfMiddle;
                                    }
                                }

                                return [
                                    <button
                                        key="first"
                                        onClick={() => setCurrentPage(1)}
                                        className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-[#108bf6] text-white' : 'bg-[#232b42] text-white'}`}
                                    >
                                        1
                                    </button>,
                                    startPage > 2 && <span key="ellipsis1" className="mx-1 text-white">...</span>,
                                    ...Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                                        const pageNumber = startPage + index;
                                        return (pageNumber !== 1 && pageNumber !== totalPages) && (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`mx-1 px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-[#108bf6] text-white' : 'bg-[#232b42] text-white'}`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }),
                                    endPage < totalPages - 1 && <span key="ellipsis2" className="mx-1 text-white">...</span>,
                                    totalPages > 1 && (
                                        <button
                                            key="last"
                                            onClick={() => setCurrentPage(totalPages)}
                                            className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-[#108bf6] text-white' : 'bg-[#232b42] text-white'}`}
                                        >
                                            {totalPages}
                                        </button>
                                    )
                                ];
                            })()}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(mentionData.length / itemsPerPage)))}
                            disabled={currentPage === Math.ceil(mentionData.length / itemsPerPage)}
                            className='text-white px-3 py-1 bg-[#232b42] rounded disabled:opacity-50'
                        >
                            Next
                        </button>
                    </div>
                    {/* <div className='bg-[#151E36] rounded-2xl grid grid-cols-10 items-center justify-between border-[0.5px] border-[#2c344a] mt-6'>
                    <div className='col-span-6 p-4 border-r-[#2c344a] border-r-[0.5px]'>
                        <div className='md:flex justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <p className='font-lato text-2xl text-white font-bold'>Keywords:</p>
                                    <p className='font-inter font-normal text-l text-white'>Text-To-Video</p>
                                </div>
                                <p className='font-light text-s text-white font-inter mt-2'>“Title of post or comment”</p>
                                <p className='font-poppins font-normal text-s text-white italic mt-6'>Gunnar</p>
                            </div>

                            <p className='font-poppins font-normal text-s text-white italic'>1 day ago</p>
                        </div>
                    </div>
                    <div className='col-span-4 text-center items-center px-4'>
                        <button className='bg-[#108bf6] font-lato px-5 max-w-[219px] w-full py-2 rounded-md text-white font-medium md:text-[14px] text-[12px]'>Generate Reply</button>
                    </div>
                </div>
                <div className='bg-[#151E36] rounded-2xl grid grid-cols-10 justify-between border-[0.5px] border-[#2c344a] mt-6'>
                    <div className='col-span-6 p-4 border-r-[#2c344a] border-r-[0.5px]'>
                        <div className='md:flex justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <p className='font-lato text-2xl text-white font-bold'>Keywords:</p>
                                    <p className='font-inter font-normal text-l text-white'>Text-To-Video</p>
                                </div>
                                <p className='font-light text-s text-white font-inter mt-2'>“Title of post or comment”</p>
                                <p className='font-poppins font-normal text-s text-white italic mt-6'>Gunnar</p>
                            </div>

                            <p className='font-poppins font-normal text-s text-white italic'>1 day ago</p>
                        </div>
                    </div>
                    <div className='col-span-4 px-4'>
                        <p className='font-light text-s text-white font-inter mt-7'>“AI generated Reply message here”</p>
                        <div className='flex justify-end mt-10 md:gap-3 gap-1'>
                            <Image
                                src='/icons/copy.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />
                            <Image
                                src='/icons/upload.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />
                            <Image
                                src='/icons/edit.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />
                            <Image
                                src='/icons/repeat.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />
                            <Image
                                src='/icons/trash.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-[#151E36] rounded-2xl grid grid-cols-10 justify-between border-[0.5px] border-[#2c344a] mt-6'>
                    <div className='col-span-6 p-4 border-r-[#2c344a] border-r-[0.5px]'>
                        <div className='md:flex justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <p className='font-lato text-2xl text-white font-bold'>Keywords:</p>
                                    <p className='font-inter font-normal text-l text-white'>Text-To-Video</p>
                                </div>
                                <p className='font-light text-s text-white font-inter mt-2'>“Title of post or comment”</p>
                                <p className='font-poppins font-normal text-s text-white italic mt-6'>Gunnar</p>
                            </div>

                            <p className='font-poppins font-normal text-s text-white italic'>1 day ago</p>
                        </div>
                    </div>
                    <div className='col-span-4 px-2 mt-2'>
                        <div className='bg-[#232b42] p-2 rounded-lg'>
                            <TextArea
                                name="proposition"
                                placeholder=""
                                value={`“AI generated Reply message here”`}
                                setValue={(val) => setUpdateText(val)}
                                rows={3}
                            />
                        </div>
                        <div className='flex justify-end mt-5 gap-1 px-2 mb-3'>
                            <Image
                                src='/icons/save.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />
                            <Image
                                src='/icons/cancel.svg'
                                className='cursor-pointer'
                                width={24}
                                height={24}
                                alt='Menu icon'
                            />

                        </div>
                    </div>
                </div>

                <div className='bg-[#151E36] rounded-2xl grid grid-cols-10 items-center justify-between border-[0.5px] border-[#2c344a] mt-6'>
                    <div className='col-span-6 p-4 border-r-[#2c344a] border-r-[0.5px]'>
                        <div className='md:flex justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <p className='font-lato text-2xl text-white font-bold'>Keywords:</p>
                                    <p className='font-inter font-normal text-l text-white'>Text-To-Video</p>
                                </div>
                                <p className='font-light text-s text-white font-inter mt-2'>“Title of post or comment”</p>
                                <p className='font-poppins font-normal text-s text-white italic mt-6'>Gunnar</p>
                            </div>

                            <p className='font-poppins font-normal text-s text-white italic'>1 day ago</p>
                        </div>
                    </div>
                    <div className='col-span-4 text-center items-center px-4'>
                        <button className='bg-[#108bf6] font-lato px-5 max-w-[219px] w-full py-2 rounded-md text-white font-medium md:text-[14px] text-[12px]'>Generate Reply</button>
                    </div>
                </div>
                <div className='bg-[#151E36] rounded-2xl grid grid-cols-10 items-center justify-between border-[0.5px] border-[#2c344a] mt-6'>
                    <div className='col-span-6 p-4 border-r-[#2c344a] border-r-[0.5px]'>
                        <div className='md:flex justify-between'>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <p className='font-lato text-2xl text-white font-bold'>Keywords:</p>
                                    <p className='font-inter font-normal text-l text-white'>Text-To-Video</p>
                                </div>
                                <p className='font-light text-s text-white font-inter mt-2'>“Title of post or comment”</p>
                                <p className='font-poppins font-normal text-s text-white italic mt-6'>Gunnar</p>
                            </div>

                            <p className='font-poppins font-normal text-s text-white italic'>1 day ago</p>
                        </div>
                    </div>
                    <div className='col-span-4 text-center items-center px-4'>
                        <button className='bg-[#108bf6] font-lato px-5 max-w-[219px] w-full py-2 rounded-md text-white font-medium md:text-[14px] text-[12px]'>Generate Reply</button>
                    </div>
                </div> */}
                </>
            }
        </div >
        </>
    )
};

export default Mentions;
