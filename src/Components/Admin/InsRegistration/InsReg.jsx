import React, { useContext, useState } from "react";
import "../admin.css";
import { EdubukContexts } from "../../../Context/EdubukContext";
import toast from "react-hot-toast";
import SmallLoader from "../../SmallLoader/SmallLoader";
import { getReferralTag, submitReferral } from "@divvi/referral-sdk";
const consumerAddress = process.env.REACT_APP_DIVVI_CONSUMER || "0x177073570f9ac28aec0074340e193a3a71454aea";

const InstRegValue = {
  instName: "",
  instAcronym: "",
  witness: "",
};

const InsReg = () => {
  const [values, setValues] = useState(InstRegValue);
  const [txHash, setTxHash] = useState(null);
  const { account, connectingWithContract } = useContext(EdubukContexts);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const instRegistration = async (e) => {
    e.preventDefault();

    const adminAcc = process.env.REACT_APP_ADMIN.toLowerCase();
    const currAccount = account.toLowerCase();
    try {
      if (adminAcc !== currAccount) return toast.error("You are not Admin");
      setLoading(true);
      const contract = await connectingWithContract();
      console.log("contract", contract);
      const iface = contract.interface;
      const data = iface.encodeFunctionData("registerInstitute", [
        values.instName,
        values.instAcronym,
        values.witness,
      ]);

      const tag = getReferralTag({ user: account, consumer: consumerAddress });
      const dataWithReferral = `${data}${tag}`;

      const signer = contract.signer;
      const txResponse = await signer.sendTransaction({
        to: contract.address,
        data: dataWithReferral,
      });
      await txResponse.wait();
      if (txResponse?.hash) {
        setTxHash(txResponse.hash)
        setLoading(false);
        toast.success("Institute Register Successfully");
      }

      try {
        const provider = signer.provider;
        const network = await provider.getNetwork();
        console.log("network", network);
        console.log("txResponse", txResponse.hash);
        await submitReferral({
          txHash: txResponse.hash,
          chainId: Number(network.chainId),
        });
      } catch (refErr) {
        console.error("Divvi referral submission failed:", refErr);
      }
      setValues(InstRegValue);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", error);
      console.error("Error in Institute registration: ", error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={instRegistration}>
        <h2>Institute Registration</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="Institute Name"
            required
            name="instName"
            value={values.instName}
            onChange={changeHandler}
          ></input>
          <label htmlFor="name">Institute Name</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Institute's Acronym"
            required
            name="instAcronym"
            value={values.instAcronym}
            onChange={changeHandler}
          ></input>
          <label htmlFor="name">Institute's Acronym</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Institute Witness Address"
            required
            name="witness"
            value={values.witness}
            onChange={changeHandler}
          ></input>
          <label htmlFor="name">Institute Witness Address</label>
        </div>
        {loading === true ? (
          <SmallLoader />
        ) : (
          <div className="multi-btn">
            {" "}
            <button id="register-btn">Register Institute</button>{" "}
            {txHash && (
              <a
                href={`https://blockscout.lisk.com/tx/${txHash}`}
                id="xdc-explorer"
                target="_blank"
                rel="noreferrer"
              >
                View Transaction
              </a>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default InsReg;
