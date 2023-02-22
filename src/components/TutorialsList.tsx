// Hooks React
import { useEffect, useState } from 'react';
// Firebase
import { DataSnapshot, off, onValue } from 'firebase/database';
// Services
import { deleteAllItem, getAllItems } from '../services/TutorialService';
// Components
import { Tutorial } from './Tutorial';
import { Loading } from './Loading';
// Interfaces
import { TutorialApi } from '../interfaces/tutorial';

export const TutorialsList = () => {

    const [tutorials, setTutorials] = useState<TutorialApi[]>([]);
    const [currentTutorial, setCurrentTutorial] = useState<TutorialApi | null>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const onDataChange = (items: DataSnapshot) => {
        let tutorials: TutorialApi[] = [];

        items.forEach((item: DataSnapshot) => {
            let key = item.key;
            let data = item.val();
            tutorials.push({
                key: key,
                title: data.title,
                description: data.description,
                published: data.published,
            });
        });

        setTutorials(tutorials);
    };

    useEffect(() => {
        onValue(getAllItems(), onDataChange)
        return () => off(getAllItems(), 'value', onDataChange)
    }, [tutorials]);

    const refreshList = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial: TutorialApi, index: number) => {
        const { title, description, published } = tutorial;

        setCurrentTutorial({
            key: tutorial.key,
            title,
            description,
            published,
        });

        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        deleteAllItem()
            .then(() => refreshList())
            .catch(err => console.log(err))
    };

    return (
        <div className='container'>
            <div className="row list">
                <div className="col-12 col-sm-6 col-md-6 py-4 py-sm-4">
                    <h4 className='text-center'>Tutorials List</h4>
                    {
                        tutorials.length === 0 && <Loading />
                    }
                    <ul className="list-group">
                        {
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.title}
                                </li>
                            ))
                        }
                    </ul>
                    {
                        tutorials.length! >= 2
                            ? (
                                <button
                                    className="m-3 btn btn-danger"
                                    onClick={removeAllTutorials}
                                >
                                    Remove All
                                </button>
                            )
                            : ''
                    }
                </div>
                <div className="col-12 col-sm-6 col-md-6 py-4 py-sm-4">
                    {
                        currentTutorial
                            ? (
                                <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
                            )
                            : (
                                <div className='text-center'>
                                    <br />
                                    <p>Please click on a Tutorial...</p>
                                </div>
                            )
                    }
                </div>
            </div >
        </div>
    )
}
