// React Router Dom
import { Navigate, Route, Routes } from 'react-router-dom'
// Components
import { Navbar } from './components/Navbar'
import { AddTutorial } from './components/AddTutorial'
import { TutorialsList } from './components/TutorialsList'

export const App = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-3'>
        <h2>CRUD Firebase</h2>
        <hr />
        <Routes>
          <Route path='/tutorials' element={<TutorialsList />} />
          <Route path='/add' element={<AddTutorial />} />
          <Route path='/*' element={<Navigate to='/tutorials' replace />} />
        </Routes>
      </div>
    </>
  )
}
