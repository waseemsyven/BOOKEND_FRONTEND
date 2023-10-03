import Image from "next/image";

function NoDataContainer() {
    return (
        <div className="flex flex-col items-center mt-5">
            <Image
                src="/nodata.gif"
                alt="Replica Count"
                width={180}
                height={180}
                className="object-contain ml-2"
            />
            <span className="text-md text-gray-500 mt-5">No Data Available</span>
        </div>
    )
}

export default NoDataContainer;