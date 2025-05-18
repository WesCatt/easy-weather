const Bar = ({value = 0, maxValue = 100}) => {

    return (
        <div
            className={`w-full h-[10px] bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 rounded-full relative`}>
            <div
                className={"h-[10px] w-[10px] bg-[#fff]  rounded-full border border-2 border-slate-500 absolute"}
                style={{left: `${Math.min((value / maxValue) * 100, 100)}%`}}></div>
        </div>

    )
}

export default Bar;