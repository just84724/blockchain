async function sendTransaction() {
    const toAddress = document.getElementById("toAddress").value;
    const status = document.getElementById("txStatus");
  
    try {
      const accounts = await web3.eth.getAccounts();
      const from = accounts[0];
  
      const tx = await web3.eth.sendTransaction({
        from: from,
        to: toAddress,
        value: web3.utils.toWei("0.01", "ether")
      });
  
      status.textContent = `Transaction successful! Hash: ${tx.transactionHash}`;
    } catch (err) {
      console.error("Transaction failed:", err);
      status.textContent = "Transaction failed: " + err.message;
    }
  }

  async function readValue() {
    try {
      const result = await contract.methods.get().call();
      document.getElementById("contractValue").textContent = "Stored value: " + result;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function writeValue() {
    try {
      const value = document.getElementById("newValue").value;
      const accounts = await web3.eth.getAccounts();
  
      const receipt = await contract.methods.set(value).send({ from: accounts[0] });
      document.getElementById("writeStatus").textContent = "Write successful! Tx Hash: " + receipt.transactionHash;
    } catch (err) {
      console.error(err);
      document.getElementById("writeStatus").textContent = "Write failed: " + err.message;
    }
  }


const contractABI = [
    {
      "constant": false,
      "inputs": [{"name": "_value", "type": "uint256"}],
      "name": "set",
      "outputs": [],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [{"name": "", "type": "uint256"}],
      "type": "function"
    }
  ];
  
  // 用你自己合約部署後的地址
  const contractAddress = "0x44106369461AdC1Da05Ce0d30F11553DDf3351f7";
  
  const contract = new web3.eth.Contract(contractABI, contractAddress);