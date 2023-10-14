import React from 'react';
import resume_data from './data';
import Image from 'next/image';

interface Data {
    skills: string[];
    certs: string[];
    pub: string[];
    abstracts: string[];
    thesis: string[];
    exp: { exptitle: string; expdesc: string }[];
    school: string[];
  }

export default function Resume() {
    const data: Data = resume_data();
    return (
        <main>
          <div className="p-10 ">
            <h1>Nick Mackowski</h1>
            <div className="flex flex-col items-start text-left md:flex-row p-2 mb-8">
                <div className="md:w-1/3">
                    <Image
                        src="/images/Nick_resume_pic.png"
                        alt="profile-pic"
                        width={500}
                        height={500}
                        />
                </div>
                    <div className="mt-4 md:mt-0 md:w-2/3 md:px-8 p-10">
                        <div className="mb-8">
                        <h2 className="mb-4">Technical Skills</h2>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {data.skills.map((skill: string, index: number) => (
                            <div
                                key={index}
                                className={index === data.skills.length - 1 ? 'col-span-3' : ''}
                            >
                                <p>{skill}</p>
                                <div className="w-full bg-gray-200 mt-2"></div>
                            </div>
                            ))}
                        </div>
                        </div>
                <div className="mb-8">
                <h2 className="mb-4">Certifications</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {data.certs.map((cert: string, index: number) => (
                    <div
                        key={index}
                        className={index === data.certs.length - 1 ? 'col-span-3' : ''}
                    >
                        <p>{cert}</p>
                        <div className="w-full bg-gray-200 mt-2"></div>
                    </div>
                    ))}
                </div>
                </div>
                {/* ... rest of your JSX */}
                <div className="mb-8">
                <h2 className="mb-4">Publications</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {data.pub.map((pub: string, index: number) => (
                    <div
                        key={index}
                        className={index === data.pub.length - 1 ? 'col-span-3' : ''}
                    >
                        <p>{pub}</p>
                        <div className="w-full bg-gray-200 mt-2"></div>
                    </div>
                    ))}
                </div>
                </div>
            <div className="mb-8">
                <h2 className="mb-4">Abstracts</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                {data.abstracts.map((abstract: string, index: number) => (
                    <div
                    key={index}
                    className={index === data.abstracts.length - 1 ? 'col-span-3' : ''}
                    >
                    <p>{abstract}</p>
                    <div className="w-full bg-gray-200 mt-2"></div>
                    </div>
                ))}
                </div>
            </div>
            <div className="mb-8">
                <h2 className="mb-4">Thesis</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                {data.thesis.map((thesis: string, index: number) => (
                    <div
                    key={index}
                    className={index === data.thesis.length - 1 ? 'col-span-3' : ''}
                    >
                    <p>{thesis}</p>
                    <div className="w-full bg-gray-200 mt-2"></div>
                    </div>
                ))}
                </div>
            </div>
            <div className="mb-8">
                <h2 className="mb-4">Experience</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                {data.exp.map((exp, index: number) => (
                    <div
                    key={index}
                    className={index === data.exp.length - 1 ? 'col-span-3' : ''}
                    >
                    <h2>{exp.exptitle}</h2>
                    <p>{exp.expdesc}</p>
                    <div className="w-full bg-gray-200 mt-2"></div>
                    </div>
                ))}
                </div>
            </div>
            <div className="mb-8"></div>
                <h2 className="mb-4">Education</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                {data.school.map((school: string, index: number) => (
                    <div
                    key={index}
                    className={index === data.school.length - 1 ? 'col-span-3' : ''}
                    >
                    <p>{school}</p>
                    <div className="w-full bg-gray-200 mt-2"></div>
                    </div>
                ))}
                </div>
            </div>      
            </div>
            </div>
        </main>
    );
};