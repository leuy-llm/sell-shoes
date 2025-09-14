import { brands } from "../db/data"
interface RecommendProps {
    selectedBrand: string;
    onBrandChange: (brand: string) => void;
}


function Recommend({selectedBrand, onBrandChange}: RecommendProps) {
    return (
        <div className="max-w-7xl mx-auto mt-10 p-5">
           <h2 className="text-2xl font-epunda font-bold mb-6 text-gray-800">Recommended</h2>
           <div className="flex flex-wrap gap-2">
               {brands.map((b) => (
                   <button key={b} onClick={() => onBrandChange(b)}
                   className={`px-6 py-2 font-lato rounded-full border text-sm transition-all duration-200 hover:scale-105 ${selectedBrand === b ? 'bg-gray-800 text-white border-gray-800 shadow-lg' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:shadow-md'}`}
                   >{b}</button>
               ))}
           </div>
        </div>
    )
}
export default Recommend