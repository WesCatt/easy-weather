import Header from "@/components/Header";

const Search = async ({params}) => {
    const {location} = await params;
    return (
        <>
            <Header/>
            <div className="grid grid-rows-12 grid-cols-12">

            </div>
        </>
    )
}


export default Search;