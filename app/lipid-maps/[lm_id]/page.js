import lmsd from 'public/lmsd_long.json'
import Link from 'next/link'
import Image from 'next/image'

const lipids = lmsd

export async function generateStaticParams() {
    const lmsd = lipids
    return lmsd.map((item) => ({
      lm_id: item.lm_id,
    }))
  }

  const ChemicalFormula = ({ formula }) => {
    const elements = formula.split(/(?=[A-Z])/);
  
    return (
      <div className="chemical-formula">
        {elements.map((element, index) => (
          <span key={index} className="chemical-element inline-block mr-2 font-bold text-2xl">
            {element.match(/\d+|[A-Z][a-z]*/g).map((subElement, subIndex) => (
              <span key={subIndex} className={`sub-element inline-block text-sm ${/\d+/.test(subElement) ? 'subscript' : ''}`}>
                {/\d+/.test(subElement) ? <sub>{subElement}</sub> : subElement}
              </span>
            ))}
          </span>
        ))}
      </div>
    );
  };

export default function LipidMapsID ( { params } ) {
  const { lm_id } = params

  const new_lipid = lipids.find(a=> a.lm_id == lm_id )
  const similar_weight = lipids.filter(a=> {
    return (a.exactmass > new_lipid.exactmass * 0.98 && a.exactmass < new_lipid.exactmass * 1.02 && a.lm_id != new_lipid.lm_id && a.name.indexOf("[iso")==-1 )
  }
  )
  const new_weight = similar_weight.map(a=> {
    return { ...a, differ:Math.abs(a.exactmass-new_lipid.exactmass)}
  })
  .sort((a, b) => {
    return a.differ - b.differ;
  })
  .slice(0,5)
 

  return (
    <main>
      <div className="flex flex-row justify-between">
        <div>{new_lipid.lm_id}</div>
        <div>{new_lipid.core}/{new_lipid.main_class}/{new_lipid.sub_class}</div>
      </div>
      <div className="flex flex-col items-center m-15">
        <p className="text-3xl justify-center"> {new_lipid.name} </p>
        <p className="text-2xl justify-center"> {new_lipid.sys_name} </p>
        <ChemicalFormula formula = {new_lipid.formula} /> 
      </div>
      <div className="flex flex-row items-center justify-center gap-4 m-5">
      <img
              priority
              src={`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?sid=${new_lipid.pubchem_cid}&deposited=t&version=1&t=l`}
              className="border"
              alt=""
            />

    <div className="flex-col">
      <div className="info-item flex justify-between items-center mb-4">
        <span className="text-sm">Mass:</span>
        <span className="text-xl">{new_lipid.exactmass}</span>
      </div>
      <div className="info-item flex justify-between items-center mb-4">
        <span className="text-sm">Inchi key:</span>
        <a className="text-xl" href={`https://www.ebi.ac.uk/unichem/compoundsources?type=inchikey&compound=${new_lipid.inchi_key}`}>
          <span>{new_lipid.inchi_key}</span>
        </a>
      </div>
      <div className="info-item flex justify-between items-center mb-4">
        <span className="text-sm">Pubchem cid:</span>
        <a className="text-xl" href={`https://pubchem.ncbi.nlm.nih.gov/substance/${new_lipid.pubchem_cid}`}>
          <span>{new_lipid.pubchem_cid}</span>
        </a>
      </div>
      <div className="info-item flex justify-between items-center">
        <span className="text-sm">Chebi id:</span>
        <a className="text-xl" href={`https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${new_lipid.chebi_id}`}>
          <span>{new_lipid.chebi_id}</span>
        </a>
      </div>
    </div>

      </div>


      <div className="flex flex-col items-center justify-around gap-4 m-10">
        <p className="text-2xl">Molecules with similar weight</p>
      <div className="flex flex-row items-center justify-around gap-4">
      {new_weight.map(lipid=> {
        return <div key={lipid.lm_id} className="col-span-1 border p-5 bg-white">
                <Link href={`${lipid.lm_id}`}>
          
          <p className="text-sm bold">{lipid.name}</p>
          <p>{lipid.exactmass}</p>
          <ChemicalFormula formula = {lipid.formula} /> 
          <Image
              priority
              src={`/lmsd_images/${lipid.lm_id}.png`}
              className="border"
              width="100"
              height="100"
              alt=""
            />
         </Link>
         </div>
      })}
      </div>
      </div>

    </main>
  )
}