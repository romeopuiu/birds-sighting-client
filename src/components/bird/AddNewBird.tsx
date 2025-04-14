import { useState } from "react";

export const AddNewBird = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewBird() {
    if (!name || !color || weight <= 0 || height <= 0) {
      setDisplayWarning(true);
      setDisplaySuccess(false);
      return;
    }

    const url = `http://localhost:8080/api/birds/save`;

    const bird = {
      name,
      color,
      weight,
      height,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bird),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setName("");
      setColor("");
      setWeight(0);
      setHeight(0);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } catch (error) {
      console.error(error);
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Bird added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out
        </div>
      )}
      <div className="card">
        <div className="card-header">Add bird</div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  className="form-control"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Weight (g)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  min={0}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={0}
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitNewBird}
              >
                Save Bird
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
