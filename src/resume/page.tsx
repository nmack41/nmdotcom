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
        <div className="flex flex-col items-start text-left md:flex-row md:mt-6 p-8">
          <div className="md:w-1/3 relative">
            <div className="flex flex-col items-center mb-8">
              <h1 className="mb-8 text-3xl">Nick Mackowski</h1>
                <Image
                    src="/images/Nick_resume_pic.png"
                    alt="profile-pic"
                    width={500}
                    height={500}
                />
            </div>
          </div>
          <div className="md:w-2/3">
              <h2 className="mb-4 text-2xl">Technical Skills</h2>
              <div className="grid grid-cols-3 gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <div key={index} className={index === data.skills.length - 1 ? 'col-span-3' : ''}>
                    <p>{skill}</p>
                  </div>
                ))}
            </div>

              <h2 className="mt-8 mb-4 text-2xl">Certifications</h2>
              <div className="grid grid-cols-3 gap-2">
                {data.certs.map((cert: string, index: number) => (
                  <div key={index} className={index === data.certs.length - 1 ? 'col-span-3' : ''}>
                    <p>{cert}</p>
                  </div>
                ))}
              </div>

    
              <h2 className="mt-8 mb-4 text-2xl">Publications</h2>
              <div className="gap-2">
                {data.pub.map((pub: string, index: number) => (
                  <div key={index} className={index === data.pub.length - 1 ? 'col-span-3' : ''}>
                    <p className="mb-4">{pub}</p>
                  </div>
                ))}
              </div>
  
              <h2 className="mt-8 mb-4 text-2xl">Abstracts</h2>
              <div className="gap-2">
                {data.abstracts.map((abstract: string, index: number) => (
                  <div key={index} className={index === data.abstracts.length - 1 ? 'col-span-3' : ''}>
                    <p className="mb-4">{abstract}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-8 mb-4 text-2xl">Thesis</h2>
              <div className="gap-2">
                {data.thesis.map((thesis: string, index: number) => (
                  <div key={index} className={index === data.thesis.length - 1 ? 'col-span-3' : ''}>
                    <p>{thesis}</p>
                  </div>
                ))}
              </div>
              <h2 className="mt-8 mb-4 text-2xl">Experience</h2>
              <div className="gap-2">
                {data.exp.map((exp, index: number) => (
                  <div key={index} className={index === data.exp.length - 1 ? 'col-span-3' : ''}>
                    <h2 className=" text-base">{exp.exptitle}</h2>
                    <p className="mb-4">{exp.expdesc}</p>
                  </div>
                ))}
              </div>
              <h2 className="mt-8 mb-4 text-2xl">Education</h2>
              <div className="gap-2">
                {data.school.map((school: string, index: number) => (
                  <div key={index} className={index === data.school.length - 1 ? 'col-span-3' : ''}>
                    <p>{school}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
    </main>
  );
};
