import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api";
import "../styles/ResourceRental.css";

function ResourceRental() {
  const { projectId } = useParams();
  const [hardwareList, setHardwareList] = useState([]);
  const [projectHwSets, setProjectHwSets] = useState({});
  const [returnQty, setReturnQty] = useState({});
  const [requestQty, setRequestQty] = useState({});

  const loadData = () => {
    Promise.all([
      apiFetch("/api/hardware").then((res) => res.json()),
      apiFetch(`/api/projects/${projectId}`).then((res) => res.json()),
    ]).then(([hwData, projData]) => {
      setHardwareList(hwData);
      setProjectHwSets(projData.hwSets || {});
      const initReturn = {};
      const initRequest = {};
      hwData.forEach((hw) => {
        initReturn[hw.name] = 0;
        initRequest[hw.name] = 0;
      });
      setReturnQty(initReturn);
      setRequestQty(initRequest);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckout = () => {
    const promises = [];
    hardwareList.forEach((hw) => {
      const checkoutAmt = requestQty[hw.name] || 0;
      if (checkoutAmt > 0) {
        promises.push(
          apiFetch("/api/hardware/checkout", {
            method: "POST",
            body: JSON.stringify({ name: hw.name, quantity: checkoutAmt, projectId }),
          })
        );
      }
    });
    Promise.all(promises).then(() => {
      loadData();
    });
  };

  const handleCheckin = () => {
    const promises = [];
    hardwareList.forEach((hw) => {
      const returnAmt = returnQty[hw.name] || 0;
      if (returnAmt > 0) {
        promises.push(
          apiFetch("/api/hardware/checkin", {
            method: "POST",
            body: JSON.stringify({ name: hw.name, quantity: returnAmt, projectId }),
          })
        );
      }
    });
    Promise.all(promises).then(() => {
      loadData();
    });
  };

  return (
    <div>
      <main className="resource-main">
        <h2>Project {projectId}</h2>

        <table className="resource-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Available</th>
              <th>Currently Rented</th>
              <th>Return</th>
              <th>Request Qty</th>
            </tr>
          </thead>
          <tbody>
            {hardwareList.map((hw) => (
              <tr key={hw.name}>
                <td>{hw.name}</td>
                <td>{hw.available}</td>
                <td>{projectHwSets[hw.name] || 0}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={projectHwSets[hw.name] || 0}
                    value={returnQty[hw.name] || 0}
                    onChange={(e) =>
                      setReturnQty({ ...returnQty, [hw.name]: parseInt(e.target.value) || 0 })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={hw.available}
                    value={requestQty[hw.name] || 0}
                    onChange={(e) =>
                      setRequestQty({ ...requestQty, [hw.name]: parseInt(e.target.value) || 0 })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="checkout-actions">
          <button className="checkin-submit-btn" onClick={handleCheckin}>
            Check In
          </button>
          <button className="checkout-submit-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResourceRental;
