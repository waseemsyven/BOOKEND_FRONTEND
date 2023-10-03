"use client";
import Image from "next/image";

function ModelStateLoader({ status = 'TRAINING' }: any) {
    return (
        <>
            <section className="flex m-6 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
                <div className="flex flex-col justify-between p-4 px-16 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-500 dark:text-white">
                        {status == null && <span>Model Overview: View, deploy, train, and manage models.</span>}
                        {status == 'TRAINING' && <span>Model training is underway..</span>}
                        {status == 'COMPLETED' && <span>Model training is complete.</span>}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Performance and Resource metrics will be available once model is deployed.</p>
                </div>
                <div className="ml-auto model_state_image">
                    {status == 'TRAINING' &&
                        <Image
                            src="/model_training.gif"
                            alt="Replica Count"
                            width={250}
                            height={250}
                            className="object-contain ml-2 "
                        />
                    }
                    { status == 'COMPLETED' &&
                        <Image
                            src="/nodata.gif"
                            alt="Replica Count"
                            width={250}
                            height={250}
                            className="object-contain ml-2 "
                        />
                    }
                    { !status &&
                        <Image
                            src="/nodata.gif"
                            alt="Replica Count"
                            width={250}
                            height={250}
                            className="object-contain ml-2 "
                        />
                    }
                </div>
            </section>
        </>
    )
}

export default ModelStateLoader;