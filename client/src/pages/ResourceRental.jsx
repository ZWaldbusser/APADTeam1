import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "../styles/ResourceRental.css";

function ResourceRental() {
  const { projectId } = useParams();
  const [hardwareList, setHardwareList] = useState([]);
  const [returnQty, setReturnQty] = useState({});
  const [requestQty, setRequestQty] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hardware`)
      .then((res) => res.json())
      .then((data) => {
        setHardwareList(data);
        const initReturn = {};
        const initRequest = {};
        data.forEach((hw) => {
          initReturn[hw.name] = 0;
          initRequest[hw.name] = 0;
        });
        setReturnQty(initReturn);
        setRequestQty(initRequest);
      });
  }, []);

  const handleCheckout = () => {
    const promises = [];

    hardwareList.forEach((hw) => {
      const checkoutAmt = requestQty[hw.name] || 0;
      const returnAmt = returnQty[hw.name] || 0;

      if (checkoutAmt > 0) {
        promises.push(
          fetch(`${API_BASE_URL}/api/hardware/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: hw.name, quantity: checkoutAmt }),
          })
        );
      }

      if (returnAmt > 0) {
        promises.push(
          fetch(`${API_BASE_URL}/api/hardware/checkin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: hw.name, quantity: returnAmt }),
          })
        );
      }
    });

    Promise.all(promises).then(() => {
      fetch(`${API_BASE_URL}/api/hardware`)
        .then((res) => res.json())
        .then((data) => {
          setHardwareList(data);
          const resetReturn = {};
          const resetRequest = {};
          data.forEach((hw) => {
            resetReturn[hw.name] = 0;
            resetRequest[hw.name] = 0;
          });
          setReturnQty(resetReturn);
          setRequestQty(resetRequest);
        });
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
                <td>{hw.capacity - hw.available}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={hw.capacity - hw.available}
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
          <button className="checkout-submit-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResourceRental;
