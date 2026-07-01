import { useState } from "react";

const GovernancePanel = () => {
  const [votes, setVotes] = useState(0);

  const approve = () => setVotes((v) => v + 1);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 space-y-6">

      <h2 className="text-3xl font-bold">
        Governance Validation
      </h2>

      <p className="text-zinc-400">
        Validators Required: 3
      </p>

      <h1 className="text-6xl font-bold text-cyan-400">
        {votes}/3
      </h1>

      <button
        onClick={approve}
        disabled={votes >= 3}
        className="bg-green-500 px-8 py-4 rounded-xl font-bold hover:bg-green-400 disabled:opacity-50"
      >
        Validator Approve
      </button>

      {votes >= 3 && (
        <div className="rounded-xl bg-green-500/20 p-4 border border-green-500">
          Governance Passed
        </div>
      )}

    </div>
  );
};

export default GovernancePanel;