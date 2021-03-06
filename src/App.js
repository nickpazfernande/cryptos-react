import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TableCoins from "./components/TableCoins";
import NavBar from "./components/NavBar";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSerch] = useState("");
  const [LastUpdate, setLastUpdate] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1"
    );
    setCoins(res.data);
    setLastUpdate(res.data[1].last_updated);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <input
          type="text"
          placeholder="Buscar moneda..."
          className="form-control bg-dark text-light border-0 mt-4 text-center"
          onChange={(e) => setSerch(e.target.value)}
        />
        <div className="text-muted">
          Ultima fecha de actualización: {LastUpdate} * Como referencia la
          moneda Bitcoin*
        </div>
        <TableCoins coins={coins} search={search} />
      </div>
    </div>
  );
}

export default App;
