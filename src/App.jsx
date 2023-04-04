import { useEffect, useState } from 'react'
import './modal.css'

function App() {

  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])

  useEffect(() => {
    const Data = async () => {
      try {

        const result = await fetch('https://countriesnow.space/api/v0.1/countries/currency')
        const countries = await result.json()

        const countriesState = countries.data.map(countrie => countrie.name)
        setData(countriesState)

      } catch (error) {
        console.log(error)
      }
    }
    Data()
  }, [])


  const handleChange = e => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = data.filter((elemento) => {
      if (elemento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCountriesFilter(resultadosBusqueda);
  }

  console.log(countriesFilter)

  useEffect(() => {
    if (search.length > 0) {
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
        onChange={handleChange}
      />

      <div>
        <button onClick={handleModal}>Open Modal</button>

        <div id="myModal" className={openModal ? 'modal' : 'hidden'}>
          <div className="modal-content">
            <span className="close" onClick={handleModal}>&times;</span>
            <p>Ciudad</p>
            <span>{countriesFilter}</span>
            <input
              type='search'
              placeholder='Ingrese el BL'
              onChange={handleChange}
              value={search}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
