// Hooks and Types React
import { ChangeEvent, useState } from "react";
// Interfaces
import { TutorialApi } from "../interfaces/tutorial";
// Services
import { deleteItem, updateItem } from '../services/TutorialService';

interface Props {
  refreshList: () => void;
  tutorial: TutorialApi
}

export const Tutorial = ({ refreshList, tutorial }: Props) => {

  const initialTutorialState: TutorialApi = {
    key: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  if (currentTutorial.key !== tutorial.key) {
    setCurrentTutorial(tutorial);
    setMessage("");
  }

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    updateItem(currentTutorial.key!, { ...currentTutorial, published: status })
      .then(() => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(err => console.log(err))
  }

  const updateTutorial = () => {
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description
    }
    updateItem(currentTutorial.key!, data)
      .then(() => setMessage("The tutorial was updated successfully!"))
      .catch(err => console.log(err))
  }

  const deleteTutorial = () => {
    deleteItem(currentTutorial.key!)
      .then(() => refreshList())
      .catch(err => console.log(err))
  }

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4 className="text-center">Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? " Published" : " Pending"}
            </div>
          </form>

          {
            currentTutorial.published ? (
              <button
                className="btn btn-primary m-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-primary m-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )
          }

          <button
            className="btn btn-danger m-2"
            onClick={deleteTutorial}
          >
            Delete
          </button>

          <button
            className="btn btn-success m-2"
            onClick={updateTutorial}
          >
            Update
          </button>
          <strong className="text-success">{message}</strong>
        </div>
      ) : (
        <div className="text-center">
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  )
}
