'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/input';
import Modal from '@/components/atoms/modal'
import TextArea from '@/components/atoms/textarea';
import { createProject, getProjectDetails, deleteProject } from '@/services/api';

interface IDashboardProps { }
interface TableData {
    project: string;
    replies: string;
    action: string;
}

const DashBoard: FC<IDashboardProps> = (props: any) => {
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [proposition, setProposition] = useState('');
    const [customer, setCustomer] = useState('');
    const [painPoint, setPainPoint] = useState('');
    const [instructions, setInstructions] = useState('');
    const [projectData, setProjectData] = useState<any>([]);

    const [projectError, setProjectError] = useState('');
    const [websiteError, setWebsiteError] = useState('');
    const [productError, setProductError] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCreateProject = async () => {
        if (projectName == '') {
            setProjectError('Please fill the Project Name.');
        } else if (website == '') {
            setWebsiteError('Please fill the Website.')
        } else if (description == "") {
            setProductError('Please fill the Product/Service Description.')
        } else {
            console.log(projectName, website, description, proposition, customer, instructions, painPoint);
            const data = await createProject(projectName, website, description, proposition, customer, instructions, painPoint);
            setProjectName('');
            setWebsite('');
            setDescription('');
            setProposition('');
            setCustomer('');
            setPainPoint('');
            setInstructions('');
            setIsModalOpen(false);
            init();
        }
    }

    const init = async () => {
        const project = await getProjectDetails();
        console.log(project, 'project')
        setProjectData(project);
    }

    useEffect(() => {
        init();
    }, [])

    const handleDelete = async (projectId) => {
        const data = await deleteProject(projectId);
        setProjectData(data);
    }

    const handleView = (id: string) => {
        
    }
    return (
        <>
            <div className='max-w-[1200] mx-auto'>
                <div className='flex justify-between items-center w-full'>
                    <p className=' font-lato text-[22px] font-semibold text-white'>My Project</p>
                    <button onClick={openModal} className='bg-[#008CFC] px-9 py-3 text-white font-lato text-xl font-bold rounded-xl'>Create Project</button>
                </div>

                <div className="overflow-x-auto rounded-2xl border-[0.5px] border-[#2c344a] mt-6 font-inter">
                    <table className="w-full rounded-2xl bg-[#151E36] text-white">
                        <thead className='text-xl'>
                            <tr className="">
                                <th className="border-r-[0.5px] border-[#2c344a] py-4">PROJECT</th>
                                <th className="border-r-[0.5px] border-[#2c344a] py-4">REPLIES</th>
                                <th className="border-[#2c344a] py-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectData?.map((row, index) => (
                                <tr key={index} className="border-t-[0.5px] border-[#2c344a] text-xl font-normal">
                                    <td className="border-r-[0.5px] border-[#2c344a] py-4  cursor-pointer underline text-center" onClick={() => {
                                        handleView(row._id)
                                    }}>{row.projectName}</td>
                                    <td className="border-r-[0.5px] border-[#2c344a] py-4 text-center">{row.replies}</td>
                                    <td className="border-[#2c344a] py-4 text-center">
                                        <Image
                                            src='/icons/trash.svg'
                                            className='mx-auto cursor-pointer'
                                            width={16}
                                            height={19}
                                            alt='Menu icon'
                                            onClick={() => handleDelete(row._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-18'>
                    <p className=' font-lato text-[22px] font-semibold text-white'>Insights</p>
                    <div className='bg-[#151E36] px-7 py-4 mt-4 rounded-2xl flex items-center justify-between border-[0.5px] border-[#2c344a] whitespace-nowrap md:whitespace-normal overflow-auto md:gap-8 gap-5 no-scrollbar'>
                        <select className='bg-[#232b42] min-w-[200px] text-white py-2 h-10 px-1 rounded'>
                            {projectData?.map((row, index) => (
                                <option key={index} value={row._id}>{row.projectName}</option>
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
                </div>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-8'>
                    <div className='bg-[#151E36] rounded-2xl md:col-span-2 col-span-1 border-[0.5px] border-[#2c344a]'>
                        <div className='border-b-[0.5px] border-[#2c344a] pl-7 items-center py-3 w-full'>
                            <p className='font-inter font-medium text-xl text-white'>What is your time worth?</p>
                        </div>
                        <div className='min-h-[176px]'></div>
                    </div>
                    <div className='bg-[#151E36] rounded-2xl md:col-span-1 border-[0.5px] border-[#2c344a]'>
                        <div className='border-b-[0.5px] border-[#2c344a] w-full pl-7 py-3'>
                            <p className='font-inter font-medium text-xl text-white'>Keyword Ranking</p>
                        </div>
                        <div className='min-h-[176px]'></div>
                    </div>
                </div>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-8'>
                    <div className='bg-[#151E36] rounded-2xl col-span-1 border-[0.5px] border-[#2c344a]'>
                        <div className='border-b-[0.5px] border-[#2c344a] pl-7 items-center py-3 w-full'>
                            <p className='font-inter font-medium text-xl text-white'>Trending Topics</p>
                        </div>
                        <div className='min-h-[176px]'></div>
                    </div>
                    <div className='bg-[#151E36] rounded-2xl col-span-1 border-[0.5px] border-[#2c344a]'>
                        <div className='border-b-[0.5px] border-[#2c344a] w-full pl-7 py-3'>
                            <p className='font-inter font-medium text-xl text-white'>Most Engagement</p>
                        </div>
                        <div className='min-h-[176px]'></div>
                    </div>
                    <div className='bg-[#151E36] rounded-2xl col-span-1 border-[0.5px] border-[#2c344a]'>
                        <div className='border-b-[0.5px] border-[#2c344a] w-full pl-7 py-3'>
                            <p className='font-inter font-medium text-xl text-white'>Lowest engagement</p>
                        </div>
                        <div className='min-h-[176px]'></div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Project">
                <div className='max-h-[680px] overflow-auto pr-4'>
                    <p className="text-base leading-relaxed text-gray-500 mb-4 dark:text-gray-400">
                        Please complete the following The more information you provide,  the more useful and natural the
                        response Genie will be. Marked fields are required.
                    </p>
                    <Input
                        name="name"
                        label='Project Name *'
                        className="rounded border-none mb-2"
                        type="input"
                        value={projectName}
                        setValue={(val) => setProjectName(val)}
                        placeholder=""
                    />
                    <Input
                        name="website"
                        label='Website *'
                        className="rounded border-none mb-2"
                        type="input"
                        value={website}
                        setValue={(val) => setWebsite(val)}
                        placeholder=""
                    />
                    <TextArea
                        label="Product/Service Description *"
                        name="description"
                        placeholder=""
                        value={description}
                        setValue={(val) => setDescription(val)}
                        rows={4}
                    />
                    <TextArea
                        label="Unique Selling Proposition:"
                        additionalLabel='What makes you stand out from the competition?'
                        name="proposition"
                        placeholder=""
                        value={proposition}
                        setValue={(val) => setProposition(val)}
                        rows={4}
                    />
                    <TextArea
                        label="Who is your ideal customer?"
                        name="customer"
                        placeholder=""
                        value={customer}
                        setValue={(val) => setCustomer(val)}
                        rows={4}
                    />
                    <TextArea
                        label="What are the pain points of your ideal customers?"
                        name="painpoint"
                        placeholder=""
                        value={painPoint}
                        setValue={(val) => setPainPoint(val)}
                        rows={4}
                    />
                    <TextArea
                        label="Instructions on the tone to use in replies (eg: formal, casual, humorous, authoritative, energetic, empathetic)"
                        name="instructions"
                        placeholder=""
                        value={instructions}
                        setValue={setInstructions}
                        rows={4}
                    />
                    <div className='w-full text-center pb-4'>
                        <button type='button' onClick={() => handleCreateProject()} className='mx-auto bg-[#008CFC] w-[181px] h-[50px] text-center font-inter font-semibold text-[16px] rounded-[13px] text-white'>Save</button>
                    </div>
                </div>
            </Modal>
        </>
    )
};

export default DashBoard;
