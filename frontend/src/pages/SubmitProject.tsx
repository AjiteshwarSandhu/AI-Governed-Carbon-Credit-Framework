import { useState } from "react";
import { evaluateProject } from "@/services/evaluateService";
import Stepper from "@/components/forms/Stepper";
import { submitGovernanceReview } from "@/services/governanceService";
import { mintCredits } from "@/services/blockchainService";
import toast from "react-hot-toast";


const SubmitProject = () => {

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [decision, setDecision] = useState("APPROVE");
 const reviewers = [
  "Government Authority",
  "Environmental Auditor",
  "Carbon Registry",
  "AI Governance Officer",
  "Blockchain Authority"
];

const [reviewerIndex, setReviewerIndex] = useState(0);

const [reviewer, setReviewer] = useState(reviewers[0]);
  const [comments, setComments] = useState("");

const [validatorVotes, setValidatorVotes] = useState<(string | null)[]>([
  null,
  null,
  null,
  null,
  null,
]);

const [showMintModal, setShowMintModal] = useState(false);

const [minting, setMinting] = useState(false);

const [mintProgress, setMintProgress] = useState(0);

  const [result, setResult] = useState<any>(null);
  

  const [formData, setFormData] = useState({

    industryType: "",
    fuelType: "",
    energyDemand: "",
    emissionProduced: "",
    emissionAllowance: "",
    carbonPrice: "",

    transactionType: "Compliance",

    creditsTraded: "",
    complianceCost: "",

    optimizationScenario: "Emission Reduction",

    carbonCostSavings: "",

    projectDescription: "",

    monitoringReport: "",

    additionalityStatement: ""

  });

    const resetSubmission = () => {

    console.log("Resetting...");

    setStep(1);

    setResult(null);

    setDecision("Approve");

    setReviewerIndex(0);
    setReviewer(reviewers[0]);

    setComments("");

    setFormData({
    industryType: "",
    fuelType: "",
    energyDemand: "",
    emissionProduced: "",
    emissionAllowance: "",
    carbonPrice: "",

    transactionType: "Compliance",

    creditsTraded: "",
    complianceCost: "",

    optimizationScenario: "Emission Reduction",

    carbonCostSavings: "",

    projectDescription: "",

    monitoringReport: "",

    additionalityStatement: ""
    });

  };

  


  async function handleEvaluation() {

    try {

      setLoading(true);

      const response = await evaluateProject({
        Industry_Type: formData.industryType,
        Fuel_Type: formData.fuelType,

        Energy_Demand_MWh: Number(formData.energyDemand),

        Emission_Produced_tCO2: Number(formData.emissionProduced),

        Emission_Allowance_tCO2: Number(formData.emissionAllowance),

        Carbon_Price_USD_per_t: Number(formData.carbonPrice),

        Transaction_Type: formData.transactionType,

        Credits_Traded_tCO2: Number(formData.creditsTraded),

        Compliance_Cost_USD: Number(formData.complianceCost),

        Optimization_Scenario: formData.optimizationScenario,

        Carbon_Cost_Savings_USD: Number(formData.carbonCostSavings),

        project_description: formData.projectDescription,

        monitoring_report: formData.monitoringReport,

        additionality_statement: formData.additionalityStatement
      });

      setResult(response);

      setStep(2);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  }

  return (

<div className="space-y-8">

<div>

<div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

<div>

<p className="text-cyan-400 uppercase tracking-[0.35em] text-xs font-semibold">

CARBON REGISTRY

</p>

<h1 className="mt-3 text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

Submit Carbon Project

</h1>

<p className="mt-4 max-w-3xl text-lg text-zinc-400">

Submit a carbon reduction project for AI-powered validation,
governance review and blockchain-based ERC-1155 carbon credit issuance.

</p>

</div>

<div className="grid grid-cols-2 gap-4">

<div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 px-5 py-4">

<p className="text-xs text-cyan-300">

AI Validation

</p>

<p className="text-2xl font-bold text-white">

Ready

</p>

</div>

<div className="rounded-2xl bg-green-500/10 border border-green-500/20 px-5 py-4">

<p className="text-xs text-green-300">

Blockchain

</p>

<p className="text-2xl font-bold text-white">

Online

</p>

</div>

</div>

</div>

</div>

<Stepper step={step} />

<div
className="
relative
overflow-hidden
rounded-3xl
border
border-cyan-500/10
bg-gradient-to-br
from-zinc-900
via-zinc-900
to-black
p-10
shadow-2xl
"
>

<div
className="
absolute
-right-24
-top-0
h-72
w-72
rounded-full
bg-cyan-500/10
blur-3xl
pointer-events-none
"
/>

{step===1 && (

<div className="space-y-6">

<div className="flex items-center justify-between">

<div>

<p className="text-cyan-400 uppercase tracking-[0.25em] text-xs">

PROJECT INFORMATION

</p>

<h2 className="mt-2 text-4xl font-black text-white">

Carbon Project Details

</h2>

<p className="mt-2 text-zinc-400">

Provide complete information for AI and Blockchain validation.

</p>

</div>

<div className="rounded-2xl bg-cyan-500/10 px-5 py-4">

<p className="text-xs text-cyan-300">

Completion

</p>

<p className="text-3xl font-black text-white">

Step 1 / 4

</p>

</div>

</div>

<div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">

<input
placeholder="Industry Type"
value={formData.industryType}
onChange={(e)=>setFormData({...formData,industryType:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Fuel Type"
value={formData.fuelType}
onChange={(e)=>setFormData({...formData,fuelType:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Energy Demand (MWh)"
value={formData.energyDemand}
onChange={(e)=>setFormData({...formData,energyDemand:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Emission Produced (tCO₂)"
value={formData.emissionProduced}
onChange={(e)=>setFormData({...formData,emissionProduced:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Emission Allowance (tCO₂)"
value={formData.emissionAllowance}
onChange={(e)=>setFormData({...formData,emissionAllowance:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Carbon Price (USD)"
value={formData.carbonPrice}
onChange={(e)=>setFormData({...formData,carbonPrice:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Credits Traded"
value={formData.creditsTraded}
onChange={(e)=>setFormData({...formData,creditsTraded:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Compliance Cost"
value={formData.complianceCost}
onChange={(e)=>setFormData({...formData,complianceCost:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<input
placeholder="Carbon Cost Savings"
value={formData.carbonCostSavings}
onChange={(e)=>setFormData({...formData,carbonCostSavings:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
"/>

<select
value={formData.transactionType}
onChange={(e)=>setFormData({...formData,transactionType:e.target.value})}
className="
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-5
py-4
text-white
placeholder:text-zinc-500
transition
duration-300
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/20
outline-none
">

<option>Compliance</option>
<option>Voluntary</option>

</select>

<select
value={formData.optimizationScenario}
onChange={(e)=>setFormData({...formData,optimizationScenario:e.target.value})}
className="rounded-xl bg-zinc-950 p-4 border border-zinc-800">

<option>Emission Reduction</option>
<option>Carbon Offset</option>

</select>

</div>

<textarea
rows={6}
placeholder="Project Description"
value={formData.projectDescription}
onChange={(e)=>setFormData({...formData,projectDescription:e.target.value})}
className="w-full rounded-xl bg-zinc-950 p-4 border border-zinc-800"/>

<textarea
rows={5}
placeholder="Monitoring Report"
value={formData.monitoringReport}
onChange={(e)=>setFormData({...formData,monitoringReport:e.target.value})}
className="w-full rounded-xl bg-zinc-950 p-4 border border-zinc-800"/>

<textarea
rows={5}
placeholder="Additionality Statement"
value={formData.additionalityStatement}
onChange={(e)=>setFormData({...formData,additionalityStatement:e.target.value})}
className="w-full rounded-xl bg-zinc-950 p-4 border border-zinc-800"/>

<div className="flex justify-end">

<button
onClick={handleEvaluation}
disabled={loading}
className="
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-blue-600
px-10
py-4
font-bold
text-white
shadow-lg
shadow-cyan-500/30
transition-all
duration-300
hover:scale-105
hover:shadow-cyan-400/40
disabled:opacity-50
">

{loading ? "Validating..." : "Validate with AI →"}

</button>

</div>

</div>

)}

        {step === 2 && result && (

<div className="space-y-8">

  <h2 className="text-3xl font-bold">
    AI Validation Report
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

      <p className="text-zinc-400">ML Risk Score</p>

      <h1 className="text-5xl font-bold text-cyan-400 mt-3">
        {result.numerical_validation.numerical_risk_score}
      </h1>

      <p className="mt-3 text-green-400">
        {result.numerical_validation.risk_level}
      </p>

    </div>

    <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

      <p className="text-zinc-400">LLM Risk Score</p>

      <h1 className="text-5xl font-bold text-cyan-400 mt-3">
        {result.semantic_validation.semantic_risk_score}
      </h1>

      <p className="mt-3 text-yellow-400">
        {result.semantic_validation.risk_level}
      </p>

    </div>

    <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

      <p className="text-zinc-400">Overall Risk</p>

      <h1 className="text-5xl font-bold text-orange-400 mt-3">
        {result.governance_decision.overall_risk_score}
      </h1>

    </div>

    <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

      <p className="text-zinc-400">Decision</p>

      <h1 className={`text-4xl font-bold mt-3 ${
        result.governance_decision.recommendation==="APPROVE"
        ? "text-green-400"
        : result.governance_decision.recommendation==="REVIEW"
        ? "text-yellow-400"
        : "text-red-400"
      }`}>
        {result.governance_decision.recommendation}
      </h1>

    </div>

  </div>

  <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

    <h2 className="text-xl font-bold mb-3">
      AI Summary
    </h2>

    <p className="text-zinc-300 leading-7">
      {result.semantic_validation.summary}
    </p>

  </div>

  <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

    <h2 className="text-xl font-bold mb-3">
      Issues Found
    </h2>

    <ul className="space-y-3">

      {result.semantic_validation.issues.map((issue:string,index:number)=>(

        <li key={index} className="text-red-400">
          • {issue}
        </li>

      ))}

    </ul>

  </div>

  <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6">

    <h2 className="text-xl font-bold mb-2">
      Governance Reason
    </h2>

    <p className="text-zinc-300">
      {result.governance_decision.reason}
    </p>

  </div>

  <div className="flex justify-end">

    <button
      onClick={() => setStep(3)}
      className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-bold"
    >
      Continue to Governance →
    </button>

  </div>

</div>

)}

{step === 3 && result && (

<div className="space-y-8">

<h2 className="text-3xl font-bold">
Governance Review
</h2>

<div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-8 space-y-6">

<p className="text-zinc-400">
AI Recommendation
</p>

<h1 className="text-4xl font-bold text-green-400">
{result.governance_decision.recommendation}
</h1>

<select
value={decision}
onChange={(e)=>setDecision(e.target.value)}
className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-4">

<option value="APPROVE">Approve</option>
<option value="REJECT">Reject</option>

</select>

<input
value={reviewer}
onChange={(e)=>setReviewer(e.target.value)}
placeholder="Reviewer Name"
className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-4"
/>

<div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

<p className="text-sm text-cyan-300">

Governance Consensus

</p>

<div className="mt-4 flex items-center gap-3">

{reviewers.map((item,index)=>(

<div

key={item}

className={`flex-1 rounded-xl py-3 text-center font-semibold transition-all ${
validatorVotes[index] === "APPROVE"
  ? "bg-green-500 text-white"

  : validatorVotes[index] === "REJECT"
  ? "bg-red-500 text-white"

  : index === reviewerIndex
  ? "bg-cyan-500 text-white"

  : "bg-zinc-800 text-zinc-400"
}`}

>

{item}

</div>

))}

</div>

<p className="mt-4 text-zinc-400">

Current Validator:

<span className="ml-2 font-bold text-white">

{reviewer}

</span>

</p>

</div>

<textarea
rows={5}
value={comments}
onChange={(e)=>setComments(e.target.value)}
placeholder="Governance Comments"
className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-4"
/>

<div className="flex justify-end">

<button

onClick={async()=>{

try{

const response = await submitGovernanceReview(

result.submission_id,

decision,

reviewer,

comments

);

const updatedVotes = [...validatorVotes];

updatedVotes[reviewerIndex] = decision.toUpperCase();

setValidatorVotes(updatedVotes);


if (response.decision === "REJECT") {

    toast.error("Consensus Reached (Rejected)");

    resetSubmission();

    return;

}


toast.success(

`${reviewer} Approved (${response.approve_count}/3)`

);


if(response.decision==="APPROVE"){

toast.success("Consensus Achieved (3/3)");

setStep(4);

return;

}


const nextReviewer = reviewerIndex + 1;

if(nextReviewer < reviewers.length){

setReviewerIndex(nextReviewer);

setReviewer(reviewers[nextReviewer]);

setComments("");

}

}catch(err){

console.error(err);

toast.error("Governance review failed.");

}

}}

className="rounded-xl bg-green-500 hover:bg-green-400 px-8 py-4 font-bold">

Submit Governance Decision

</button>

</div>

</div>

</div>

)}

{step === 4 && result && (

<div className="space-y-8">

<h2 className="text-3xl font-bold">
Blockchain
</h2>

<div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-8">

<p className="text-2xl text-green-400 font-bold">
✔ Governance Completed
</p>

<p className="text-zinc-400 mt-3">
Project is ready for blockchain minting.
</p>

<button

onClick={() => setShowMintModal(true)}

className="mt-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-bold">

Mint Carbon Credits

</button>

</div>

</div>

)}

</div>

{showMintModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

<div className="w-full max-w-xl overflow-hidden rounded-3xl border border-green-500/20 bg-zinc-900 shadow-2xl">

{/* HEADER */}

<div className="border-b border-green-500/20 bg-gradient-to-r from-green-500/10 to-transparent p-8">

<p className="text-xs uppercase tracking-[0.35em] text-green-400">

BLOCKCHAIN MINTING

</p>

<h2 className="mt-3 text-5xl font-black">

✔ Confirm Mint

</h2>

<p className="mt-4 text-zinc-400">

This project has successfully passed AI validation and governance review.

Carbon Credits will now be minted permanently on the Polygon Amoy Blockchain.

</p>

</div>

{/* BODY */}

<div className="space-y-6 p-8">

<div className="rounded-2xl border border-zinc-700 p-5">

<p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

Submission

</p>

<h2 className="mt-2 text-5xl font-black text-cyan-400">

#{result.submission_id}

</h2>

</div>

{minting && (

<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

<p className="font-semibold text-cyan-300">

Writing Transaction to Blockchain...

</p>

<div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">

<div

style={{width:`${mintProgress}%`}}

className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 transition-all duration-500"

/>

</div>

<p className="mt-2 text-right text-sm text-zinc-400">

{mintProgress}%

</p>

</div>

)}

<div className="flex justify-end gap-3">

<button

disabled={minting}

onClick={()=>setShowMintModal(false)}

className="rounded-xl border border-zinc-700 px-8 py-3"

>

Cancel

</button>

<button

disabled={minting}

onClick={async()=>{

try{

setMinting(true);

setMintProgress(20);

await new Promise(r=>setTimeout(r,700));

setMintProgress(45);

await new Promise(r=>setTimeout(r,700));

setMintProgress(70);

await new Promise(r=>setTimeout(r,700));

const data=await mintCredits(result.submission_id);

console.log(data);

setMintProgress(100);

await new Promise(r=>setTimeout(r,700));

toast.success("Carbon Credits Minted Successfully!");

setShowMintModal(false);

resetSubmission();

}catch(err:any){

toast.error(err.message || "Mint Failed");

}

finally{

setMinting(false);

setMintProgress(0);

}

}}

className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 font-bold"

>

{minting ? "Minting..." : "Mint Carbon Credits"}

</button>

</div>

</div>

</div>

</div>

)}

</div>

);

};





export default SubmitProject;