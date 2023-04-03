import { useEffect, useState } from 'react'
import './modal.css'

function App() {

  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if(search.length > 0){
      setOpenModal(true)
    }
  }, [search])

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  window.onclick = function (e) {
    if (e.target.className === 'modal') {
      setOpenModal(false)
    }
  }

  console.log(search)

  return (
    <div>
      <h1>Modal Search</h1>
      <input
        type='search'
        placeholder='Ingrese el BL'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div>
        <button onClick={handleModal}>Open Modal</button>

        <div id="myModal" className={openModal ? 'modal' : 'hidden'}>
          <div className="modal-content">
            <span className="close" onClick={handleModal}>&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
