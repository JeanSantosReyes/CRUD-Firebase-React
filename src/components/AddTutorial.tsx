// Hooks React
import { ChangeEvent, useState } from "react";
// Interfaces
import { TutorialInterface } from "../interfaces/tutorial";
// Services
import { createItem } from "../services/TutorialService";

const initialTutorialState: TutorialInterface = {
  title: "",
  description: "",
  published: false
};

export const AddTutorial = () => {

  const [tutorial, setTutorial] = useState<TutorialInterface>(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      published: false
    };

    createItem(data)
      .then(() => setSubmitted(true))
      .catch((e) => console.log(e))
  }

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {
        submitted
          ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newTutorial}>
                Add
              </button>
            </div>
          )
          : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={tutorial.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={tutorial.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>

              <button onClick={saveTutorial} className="btn btn-success mt-2">
                Submit
              </button>
            </div>
          )}
    </div>
  )
}