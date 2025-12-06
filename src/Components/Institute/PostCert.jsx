import React, { useContext, useState } from "react";
import "./institute.css";
import toast from "react-hot-toast";
import SmallLoader from "../SmallLoader/SmallLoader";
import { EdubukContexts } from "../../Context/EdubukContext";
import CryptoJS from "crypto-js";
import { getReferralTag, submitReferral } from "@divvi/referral-sdk";
const consumerAddress = process.env.REACT_APP_DIVVI_CONSUMER || "0x177073570f9ac28aec0074340e193a3a71454aea";

const regCertValue = {
  studentName: "",
  studentAdd: "",
  certType: "",
  issuerName: "",
};

const PostCert = () => {
  const [fileHash, setFileHash] = useState(null);
  const [uri, setUri] = useState(null);
  const [values, setValues] = useState(regCertValue);
  const { connectingWithContract, account, loading, setLoading } = useContext(EdubukContexts);
  const [inputFile, setInputFile] = useState();
  const [txHash, setTxHash] = useState(null);
  const [uploadLoader, setUploadLoader] = useState(false);
  //upload docs to IPFS
  const uploadToIpfs = async (e) => {
    e.preventDefault();
    if(!account)
      return toast.error("Please connect your wallet")
    try {
      if (!inputFile) {
        return toast.error("No file selected !");
      }
      const formData = new FormData();
      formData.append("file", inputFile);
      setUploadLoader(true);
      console.log("form data : ", formData);
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATAJWT}`,
          },
          body: formData,
        }
      );

      console.log("data processed")
      const upload = await response.json();
      if (upload?.IpfsHash) {
        toast.success("File uploaded successfully");
        setUri(upload.IpfsHash);
        setUploadLoader(false);
      }
      console.log(upload);
    } catch (error) {
      setUploadLoader(false);
      toast.error("Error in uploading file");
      console.error("Error uploading file:", error);
    }
  };

  //generate hash of a file
  const getHash = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(fileData);
      const hash = CryptoJS.SHA256(wordArray).toString();
      setFileHash(hash);
      console.log("hash : ", hash);
    };

    reader.readAsArrayBuffer(file);
  };

  // upload data on blockchain
  const regCert = async (e) => {
    e.preventDefault();
    if(!values.studentName || !values.studentAdd || !values.certType || !values.issuerName)
      {
        return toast.error("Please provide all input values..")
      }
      if(!uri)
      {
        return toast.error("Please upload the document before registration")
      }
    try {
      setLoading(true);
      const contract = await connectingWithContract();
      const iface = contract.interface;
      const data = iface.encodeFunctionData("postCertificate", [
        values.studentName,
        values.studentAdd?.trim(),
        uri,
        fileHash,
        values.certType,
        values.issuerName,
      ]);

      const tag = getReferralTag({
        user: account,
        consumer: consumerAddress,
      });

      const dataWithReferral = `${data}${tag}`;

      const signer = contract.signer;
      const txResponse = await signer.sendTransaction({
        to: contract.address,
        data: dataWithReferral,
      });
      setLoading(true);
      await txResponse.wait();
      if (txResponse?.hash) {
        setTxHash(txResponse.hash);
        setLoading(false);
        toast.success("Certificated Posted successfully");
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
      setValues(regCertValue);
      setUri(null);
      setInputFile(null);
      setFileHash(null);
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.message);
      console.error("Error in certificate Registration: ", error);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // function to handle input file
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      getHash(file);
      setInputFile(file);
    }
  };

  return (
    <div className="form-container">
      <form>
        <h2>Issue Single Certificate</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="Student Name"
            required
            name="studentName"
            value={values.studentName}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Student Name</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Student Wallet Address"
            name="studentAdd"
            required
            value={values.studentAdd}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Student Wallet Address</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            required
            placeholder="Certificate Type"
            name="certType"
            value={values.certType}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Certificate Type</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            required
            placeholder="Issuer Name"
            name="issuerName"
            value={values.issuerName}
            onChange={onChangeHandler}
          ></input>
          <label htmlFor="name">Issuer Name</label>
        </div>
        <div className="upload-section">
          <input
            type="file"
            id="fileInput"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          ></input>
          <label htmlFor="fileInput">
            {inputFile ? inputFile.name : <span>choose file</span>}
          </label>
          Accepted:Pdf/jpg/jpeg/png
          {uploadLoader ? (
            <SmallLoader />
          ) : (
            <button onClick={uploadToIpfs}>Upload</button>
          )}
          {uri && (
            <a
              href={`${process.env.REACT_APP_BaseURL}/api/v1/getDocByUri/${uri}`}
              target="_blank"
              rel="noreferrer"
            >
              View Certificate
            </a>
          )}
        </div>
        {fileHash &&
          <div className="fileHash">
            <p><strong>FileHash : </strong><span>{fileHash}</span></p>
          </div>
        }
        {loading ? (
          <SmallLoader />
        ) : (
          <div className="multi-btn">
            {" "}
            <button id="register-btn" onClick={regCert}>{txHash?"Register New Certificate":"Register Certificate"}</button>{" "}
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

export default PostCert;