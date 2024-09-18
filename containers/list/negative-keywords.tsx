'use client';

import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/input';
interface INegativeKeywordsProps { }
import { createNegativeKeyword, getProjectDetails, getNegativeKeywords, deleteNegativeKeyword } from '@/services/api';
interface TableData {
    project: string;
    negativeKeywords: string;
}

const data: TableData[] = [
    { project: 'Project A', negativeKeywords: 'text to video' },
    { project: 'Project B', negativeKeywords: 'text to video' },
];

const NegativeKeywords: FC<INegativeKeywordsProps> = (props: any) => {
    const [negativeKeywords, setNegativeKeywords] = useState("");
    const [negativeKeywordData, setNegativeKeywordData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [projectId, setProjectId] = useState('');
    const init = async () => {
        const project = await getProjectDetails();
        const negativeKeyword = await getNegativeKeywords();
        setNegativeKeywordData(negativeKeyword);
        setProjectData(project);
    }
    const handleProject = (val: string) => {
        setProjectId(val);
    }

    useEffect(() => {
        init();
    }, [])

    const handleDelete = async (id: string) => {
        const data = await deleteNegativeKeyword(id);
        init();
    }

    const handleCreate = async () => {
        let id;
        if (projectId == '') {
            id = projectData[0]?._id
        } else {
            id = projectId
        }
        const data = await createNegativeKeyword(id, negativeKeywords);
        console.log('data', data);
        init();
    }
    return (
        <>
            <div className='max-w-[1200] mx-auto'>
                <p className=' font-lato text-[22px] font-semibold text-white'>Negative Keywords</p>
                <div className="overflow-x-auto rounded-2xl border-[0.5px] border-[#2c344a] mt-6 font-inter overflow-auto flex no-scrollbar">
                    <table className="w-full rounded-2xl bg-[#151E36] text-white overflow-auto md:min-w-0 min-w-[600px] no-scrollbar">
                        <thead className='text-xl'>
                            <tr className="">
                                <th className="border-r-[0.5px] border-[#2c344a] py-4">PROJECT</th>
                                <th className="border-r-[0.5px] border-[#2c344a] py-4">NEGATIVE KEYWORDS</th>
                                <th className="border-[#2c344a] max-w-[228px]">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {negativeKeywordData?.map((row, index) => (
                                <tr key={index} className="border-t-[0.5px] border-[#2c344a] text-xl font-normal">
                                    <td className="border-r-[0.5px] border-[#2c344a] py-4 text-center underline">{row.projectName}</td>
                                    <td className="border-r-[0.5px] border-[#2c344a] py-4 text-center">{row.negativeKeywords}</td>
                                    <td className="border-[#2c344a] py-4 text-center flex gap-2 justify-center">
                                        <Image
                                            src='/icons/edit.svg'
                                            className='cursor-pointer'
                                            width={16}
                                            height={19}
                                            alt='Menu icon'
                                        />
                                        <Image
                                            src='/icons/trash.svg'
                                            className='cursor-pointer'
                                            width={16}
                                            height={19}
                                            onClick={() => handleDelete(row._id)}
                                            alt='Menu icon'
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr className="border-t-[0.5px] border-[#2c344a] text-xl font-normal ">
                                <td className="border-r-[0.5px] border-[#2c344a] text-center px-2 underline  max-w-[174px]">
                                    <select className='bg-[#232b42] text-white w-full text-center border-none h-10 px-4 rounded' onChange={(e) => handleProject(e.target.value)}>
                                        {projectData?.map((row, index) => (
                                            <option key={index} value={row._id}>{row.projectName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border-r-[0.5px] border-[#2c344a] items-center text-center px-2">
                                    <Input
                                        name="keywords"
                                        className="bg-[#232b42] text-center rounded border-none mb-2"
                                        type="input"
                                        value={negativeKeywords}
                                        setValue={(val) => setNegativeKeywords(val)}
                                        placeholder="Keywords (Max 20 letters)"
                                    />
                                </td>

                                <td className="border-[#2c344a] text-center">
                                    <button onClick={() => {
                                        handleCreate();
                                    }} className='bg-[#108bf6] font-lato text-[16px] min-w-[219px] max-w-[219px] w-full py-2 rounded-lg text-white font-bold'>Create</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default NegativeKeywords;
