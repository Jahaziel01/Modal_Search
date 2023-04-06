import { useEffect, useState } from 'react'
import './modal.css'

function App() {

  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])


  //Api Countries
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

  //Modal
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

  //Filter Countries
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

  //Clear
  const HandleClear = () => {
    setSearch('')
    setCountriesFilter([])
  }


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

        <div id="myModal" className={openModal ? 'modal' : 'modalOff'}>
          <div className="container">
            <span className="close" onClick={handleModal}>&times;</span>
            <div className='search'>
              <div className='search_head'>
                <input
                  type='search'
                  value={search}
                  onChange={handleChange}
                />
                <svg onClick={HandleClear} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="26" height="26" viewBox="0 0 24 24" strokeWidth="2" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </div>
              <div className='content'>

                {countriesFilter.length ?
                  <ul>
                    {
                      countriesFilter.map(countrie => (
                        <li><a href='#'>{countrie}</a></li>
                      ))
                    }
                  </ul>
                  : <p>Sin resultados</p>
                }

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
